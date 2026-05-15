const EventBus = require('./EventBus');
const Logger = require('./Logger');
const TaskProtocol = require('./TaskProtocol');
const SandboxExecutor = require('./SandboxExecutor');
const { NexusErrorPayload } = require('./Contract');
const path = require('path');
const fs = require('fs-extra');

class Orchestrator {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.logger = new Logger(this.rootPath);
        this.sandbox = new SandboxExecutor();
        this.activeTasks = new Map();

        // ⛔ DEAD LETTER QUEUE: Menyimpan task yang gagal permanen untuk analisis
        this.deadLetterQueue = [];
        this.MAX_DLQ_SIZE = 100; 
        this._isWritingDLQ = false;
        this._dlqPendingWrite = false;

        this.initDLQ(); // Async but safe to trigger here
        this.setupEventHandlers();
    }

    async initDLQ() {
        try {
            const dlqPath = path.join(this.rootPath, 'logs', 'dead_letter_queue.json');
            if (await fs.pathExists(dlqPath)) {
                this.deadLetterQueue = await fs.readJson(dlqPath).catch(() => []);
            }
        } catch (e) {
            console.warn(`⚠️  Orchestrator: Failed to initialize DLQ from disk: ${e.message}`);
        }
    }

    setupEventHandlers() {
        EventBus.subscribe('SCANNER_TRIGGERED', async (payload) => {
            const taskId = payload.task_id_override || `TASK-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
            const task = new TaskProtocol(taskId, payload.agent, payload.priority, payload.input);
            this.activeTasks.set(task.task_id, task);
            
            await this.logger.log('orchestration', 'INFO', 'Orchestrator', task.task_id, 'AGENT_TASK_ASSIGNED', `Task assigned to ${payload.agent}`);

            task.status = 'running';
            const MAX_RETRY = 3;
            let attempt = 0;
            let success = false;

            while (attempt < MAX_RETRY && !success) {
                try {
                    const result = await this.sandbox.execute(payload.pluginPath, payload.input, { timeout: task.timeout_ms });
                    
                    task.status = 'done';
                    success = true;
                    this.activeTasks.delete(task.task_id);

                    await this.logger.log('orchestration', 'INFO', 'Orchestrator', task.task_id, 'AGENT_TASK_COMPLETED', `Task completed by ${payload.agent}`);
                    EventBus.publish('SCANNER_FINISHED', { task_id: task.task_id, result: result });
                } catch (err) {
                    attempt++;
                    const errPayload = new NexusErrorPayload('AGENT_FAILURE', err.message, attempt < MAX_RETRY, payload.agent);
                    await this.logger.log('errors', 'WARNING', 'Orchestrator', task.task_id, 'RETRY', `Retry ${attempt}/${MAX_RETRY} for ${payload.agent}: ${err.message}`);
                    
                    if (attempt >= MAX_RETRY) {
                        task.status = 'failed';
                        this.activeTasks.delete(task.task_id);
                        await this.logger.log('orchestration', 'ERROR', 'Orchestrator', task.task_id, 'AGENT_TASK_FAILED', `Task failed by ${payload.agent} after ${MAX_RETRY} attempts.`);
                        EventBus.publish('TASK_FAILED', { task_id: task.task_id, error: errPayload });
                    }
                }
            }
        });

        // ⛔ DEAD LETTER QUEUE HANDLER: Task gagal permanen disimpan untuk analisis
        EventBus.subscribe('TASK_FAILED', async (payload) => {
            const dlqEntry = {
                ...payload,
                failed_at: new Date().toISOString(),
                can_retry: false
            };

            this.deadLetterQueue.push(dlqEntry);

            // Trim DLQ kalau terlalu besar
            if (this.deadLetterQueue.length > this.MAX_DLQ_SIZE) {
                this.deadLetterQueue = this.deadLetterQueue.slice(-this.MAX_DLQ_SIZE);
            }

            await this.persistDLQ();

            console.error(
                `💀 Dead Letter: Task ${payload.task_id} failed permanently. ` +
                `DLQ size: ${this.deadLetterQueue.length}/${this.MAX_DLQ_SIZE}`
            );
        });

        EventBus.subscribe('CYCLE_FINISHED', async () => {
            await this.logger.log('orchestration', 'INFO', 'Orchestrator', 'N/A', 'CYCLE_FINISHED', 'Orchestration cycle finished.');
        });
    }

    /**
     * Persist DLQ to disk with atomic write protection.
     */
    async persistDLQ() {
        if (this._isWritingDLQ) {
            this._dlqPendingWrite = true;
            return;
        }

        this._isWritingDLQ = true;
        try {
            const dlqPath = path.join(this.rootPath, 'logs', 'dead_letter_queue.json');
            await fs.ensureDir(path.dirname(dlqPath));
            await fs.writeJson(dlqPath, this.deadLetterQueue, { spaces: 2 });
        } catch (e) {
            console.warn(`⚠️  Orchestrator DLQ: Failed to persist to disk: ${e.message}`);
        } finally {
            this._isWritingDLQ = false;
            if (this._dlqPendingWrite) {
                this._dlqPendingWrite = false;
                await this.persistDLQ();
            }
        }
    }

    /**
     * Route and wait for a task to complete.
     */
    async executeTask(agentName, pluginPath, inputArgs, priority = 'normal') {
        const taskId = `TASK-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        
        return new Promise((resolve, reject) => {
            const onFinished = (payload) => {
                if (payload.task_id === taskId) {
                    EventBus.unsubscribe('SCANNER_FINISHED', onFinished);
                    EventBus.unsubscribe('TASK_FAILED', onFailed);
                    resolve(payload.result);
                }
            };

            const onFailed = (payload) => {
                if (payload.task_id === taskId) {
                    EventBus.unsubscribe('SCANNER_FINISHED', onFinished);
                    EventBus.unsubscribe('TASK_FAILED', onFailed);
                    reject(new Error(payload.error?.message || 'Task failed permanently.'));
                }
            };

            EventBus.subscribe('SCANNER_FINISHED', onFinished);
            EventBus.subscribe('TASK_FAILED', onFailed);

            EventBus.publish('SCANNER_TRIGGERED', {
                agent: agentName,
                pluginPath: pluginPath,
                input: inputArgs,
                priority: priority,
                task_id_override: taskId // Support custom task ID if Orchestrator allows
            });
        });
    }

    async routeTask(agentName, pluginPath, inputArgs, priority = 'normal') {
        EventBus.publish('SCANNER_TRIGGERED', {
            agent: agentName,
            pluginPath: pluginPath,
            input: inputArgs,
            priority: priority
        });
    }

    getDLQReport() {
        return {
            total_failed: this.deadLetterQueue.length,
            by_agent: this.deadLetterQueue.reduce((acc, t) => {
                const agent = t.error?.agent || 'unknown';
                acc[agent] = (acc[agent] || 0) + 1;
                return acc;
            }, {}),
            tasks: this.deadLetterQueue
        };
    }

    async clearDLQ() {
        const count = this.deadLetterQueue.length;
        this.deadLetterQueue = [];
        await this.persistDLQ();
        console.log(`🗑️  Orchestrator: Dead Letter Queue cleared (${count} entries removed).`);
    }
}

module.exports = Orchestrator;
