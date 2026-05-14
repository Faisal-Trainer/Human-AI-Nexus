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
        this.MAX_DLQ_SIZE = 100; // Trim otomatis kalau terlalu besar

        this.setupEventHandlers();
    }

    setupEventHandlers() {
        EventBus.subscribe('SCANNER_TRIGGERED', async (payload) => {
            const taskId = `TASK-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
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
                    await this.logger.log('orchestration', 'INFO', 'Orchestrator', task.task_id, 'AGENT_TASK_COMPLETED', `Task completed by ${payload.agent}`);
                    
                    EventBus.publish('SCANNER_FINISHED', { task_id: task.task_id, result: result });
                } catch (err) {
                    attempt++;
                    const errPayload = new NexusErrorPayload('AGENT_FAILURE', err.message, attempt < MAX_RETRY, payload.agent);
                    await this.logger.log('errors', 'WARNING', 'Orchestrator', task.task_id, 'RETRY', `Retry ${attempt}/${MAX_RETRY} for ${payload.agent}: ${err.message}`);
                    
                    if (attempt >= MAX_RETRY) {
                        task.status = 'failed';
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

            // Trim DLQ kalau terlalu besar (FIFO — hapus yang paling lama)
            if (this.deadLetterQueue.length > this.MAX_DLQ_SIZE) {
                this.deadLetterQueue.shift();
            }

            // Persistent: tulis ke disk untuk analisis setelah restart
            try {
                const dlqPath = path.join(this.rootPath, 'logs', 'dead_letter_queue.json');
                await fs.ensureDir(path.dirname(dlqPath));
                await fs.writeJson(dlqPath, this.deadLetterQueue, { spaces: 2 });
            } catch (e) {
                // Jangan crash jika disk write gagal
                console.warn(`⚠️  Orchestrator DLQ: Failed to persist to disk: ${e.message}`);
            }

            console.error(
                `💀 Dead Letter: Task ${payload.task_id} failed permanently. ` +
                `DLQ size: ${this.deadLetterQueue.length}/${this.MAX_DLQ_SIZE}`
            );
        });

        EventBus.subscribe('CYCLE_FINISHED', async () => {
            await this.logger.log('orchestration', 'INFO', 'Orchestrator', 'N/A', 'CYCLE_FINISHED', 'Orchestration cycle finished.');
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

    /**
     * Get a report of all failed tasks in the Dead Letter Queue.
     * @returns {Object} DLQ summary with breakdown by agent.
     */
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

    /**
     * Clear the Dead Letter Queue (manual intervention only).
     */
    clearDLQ() {
        const count = this.deadLetterQueue.length;
        this.deadLetterQueue = [];
        console.log(`🗑️  Orchestrator: Dead Letter Queue cleared (${count} entries removed).`);
    }
}

module.exports = Orchestrator;
