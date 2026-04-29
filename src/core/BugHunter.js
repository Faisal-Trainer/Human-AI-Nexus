/**
 * BugHunter - Strategy Pivot Machine.
 * Codifies the '3 Fixes Rule' from NEXUS_VERIFICATION_CHECKLIST.md.
 */
class BugHunter {
    constructor() {
        this.attemptLog = new Map();
        this.MAX_ATTEMPTS = 3;
    }

    /**
     * Track a task attempt.
     * @param {string} taskId - Unique task ID or description.
     */
    trackAttempt(taskId) {
        const current = this.attemptLog.get(taskId) || 0;
        this.attemptLog.set(taskId, current + 1);
        
        if (current + 1 >= this.MAX_ATTEMPTS) {
            return { 
                shouldPivot: true, 
                message: `CRITICAL: Task '${taskId}' has failed ${this.MAX_ATTEMPTS} times. Strategy Pivot REQUIRED. Stop and discuss with user.` 
            };
        }

        return { shouldPivot: false, attempts: current + 1 };
    }

    reset(taskId) {
        this.attemptLog.delete(taskId);
    }
}

module.exports = BugHunter;
