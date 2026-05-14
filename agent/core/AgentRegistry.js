/**
 * AgentRegistry - The "Control Tower" of Nexus AI.
 * Tracks health, status, and activity of all active agents.
 * v1.0: New module — solves "blind spot" where stuck agents are undetectable.
 */
class AgentRegistry {
    constructor() {
        // { agentId => { name, status, startedAt, lastActivity, taskCount, errorCount, currentTask, lastError } }
        this._agents = new Map();
    }

    /**
     * Register a new agent into the registry.
     * @param {string} agentId - Unique agent identifier.
     * @param {string} name - Human-readable agent name.
     */
    register(agentId, name) {
        this._agents.set(agentId, {
            name,
            status: 'idle',       // idle | busy | failed | timeout
            startedAt: null,
            lastActivity: new Date().toISOString(),
            taskCount: 0,
            errorCount: 0,
            currentTask: null,
            lastError: null
        });
    }

    /**
     * Mark agent as busy with a specific task.
     * @param {string} agentId
     * @param {string} taskId
     */
    markBusy(agentId, taskId) {
        const agent = this._agents.get(agentId);
        if (agent) {
            agent.status = 'busy';
            agent.startedAt = new Date().toISOString();
            agent.currentTask = taskId;
            agent.taskCount++;
            agent.lastActivity = new Date().toISOString();
        }
    }

    /**
     * Mark agent as idle (task completed).
     * @param {string} agentId
     */
    markIdle(agentId) {
        const agent = this._agents.get(agentId);
        if (agent) {
            agent.status = 'idle';
            agent.startedAt = null;
            agent.currentTask = null;
            agent.lastActivity = new Date().toISOString();
        }
    }

    /**
     * Mark agent as failed.
     * @param {string} agentId
     * @param {string} error - Error message.
     */
    markFailed(agentId, error) {
        const agent = this._agents.get(agentId);
        if (agent) {
            agent.status = 'failed';
            agent.errorCount++;
            agent.lastError = error;
            agent.lastActivity = new Date().toISOString();
        }
    }

    /**
     * Detect agents that have been busy beyond a time threshold (stuck).
     * @param {number} [thresholdMs=60000] - Time threshold in ms (default: 60s).
     * @returns {Array} List of stuck agent objects.
     */
    getStuckAgents(thresholdMs = 60000) {
        const now = Date.now();
        return Array.from(this._agents.entries())
            .filter(([, a]) => a.status === 'busy' && a.startedAt &&
                (now - new Date(a.startedAt).getTime()) > thresholdMs)
            .map(([id, a]) => ({ id, ...a, stuckForMs: now - new Date(a.startedAt).getTime() }));
    }

    /**
     * Get a full health report of all registered agents.
     * @returns {Object} Health summary.
     */
    getHealthReport() {
        const agents = Array.from(this._agents.values());
        const stuck = this.getStuckAgents();
        return {
            total: agents.length,
            idle: agents.filter(a => a.status === 'idle').length,
            busy: agents.filter(a => a.status === 'busy').length,
            failed: agents.filter(a => a.status === 'failed').length,
            stuck: stuck.length,
            stuck_agents: stuck.map(a => `${a.name} (${Math.round(a.stuckForMs / 1000)}s)`),
            agents: Object.fromEntries(this._agents)
        };
    }

    /**
     * Remove an agent from the registry.
     * @param {string} agentId
     */
    deregister(agentId) {
        this._agents.delete(agentId);
    }

    /**
     * Clear all agents (useful for test resets).
     */
    clear() {
        this._agents.clear();
    }
}

// Export as singleton — satu registry untuk seluruh sistem
module.exports = new AgentRegistry();
