class TaskProtocol {
    constructor(task_id, agent, priority = 'normal', input = {}, context = {}, timeout_ms = 30000) {
        this.task_id = task_id;
        this.agent = agent;
        this.priority = priority;
        this.input = input;
        this.context = context;
        this.status = 'pending';
        this.timestamp = new Date().toISOString();
        this.timeout_ms = timeout_ms;
        this.trace_id = `TRACE-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        this.correlation_id = context.correlation_id || this.trace_id;
    }

    static validate(data) {
        const required = ['task_id', 'agent', 'priority', 'status', 'timestamp'];
        const missing = required.filter(field => !data[field]);
        if (missing.length > 0) {
            throw new Error(`TaskProtocol Violation: Missing fields [${missing.join(', ')}]`);
        }
        
        const validPriorities = ['low', 'normal', 'high', 'critical'];
        if (!validPriorities.includes(data.priority)) {
            throw new Error(`TaskProtocol Violation: Invalid priority '${data.priority}'`);
        }

        const validStatuses = ['pending', 'running', 'done', 'failed'];
        if (!validStatuses.includes(data.status)) {
            throw new Error(`TaskProtocol Violation: Invalid status '${data.status}'`);
        }

        return true;
    }

    toJSON() {
        return {
            task_id: this.task_id,
            agent: this.agent,
            priority: this.priority,
            input: this.input,
            context: this.context,
            status: this.status,
            timestamp: this.timestamp,
            timeout_ms: this.timeout_ms,
            trace_id: this.trace_id,
            correlation_id: this.correlation_id
        };
    }
}

module.exports = TaskProtocol;
