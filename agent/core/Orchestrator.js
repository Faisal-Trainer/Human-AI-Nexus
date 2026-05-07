const EventBus = require('./EventBus');
const Logger = require('./Logger');
const TaskProtocol = require('./TaskProtocol');
const SandboxExecutor = require('./SandboxExecutor');

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
            const task = new TaskProtocol(`TASK-${Date.now()}`, payload.agent, payload.priority, payload.input);
            this.activeTasks.set(task.task_id, task);
            
            await this.logger.log('orchestration', 'INFO', 'Orchestrator', task.task_id, 'AGENT_TASK_ASSIGNED', `Task assigned to ${payload.agent}`);

            try {
                task.status = 'running';
                const result = await this.sandbox.execute(payload.pluginPath, payload.input, { timeout: task.timeout_ms });
                
                task.status = 'done';
                await this.logger.log('orchestration', 'INFO', 'Orchestrator', task.task_id, 'AGENT_TASK_COMPLETED', `Task completed by ${payload.agent}`);
                
                EventBus.publish('SCANNER_FINISHED', { task_id: task.task_id, result: result });
            } catch (err) {
                task.status = 'failed';
                await this.logger.log('orchestration', 'ERROR', 'Orchestrator', task.task_id, 'AGENT_TASK_FAILED', `Task failed by ${payload.agent}: ${err.message}`);
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
