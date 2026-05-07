const EventBus = require('./EventBus');
const Logger = require('./Logger');
const TaskProtocol = require('./TaskProtocol');
const SandboxExecutor = require('./SandboxExecutor');
const { NexusErrorPayload } = require('./Contract');

class Orchestrator {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.logger = new Logger(this.rootPath);
        this.sandbox = new SandboxExecutor();
        this.activeTasks = new Map();

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
}

module.exports = Orchestrator;
