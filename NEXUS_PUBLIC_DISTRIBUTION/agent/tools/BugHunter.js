const fs = require('fs-extra');
const path = require('path');

/**
 * BugHunter - Strategy Pivot Machine.
 * Codifies the '3 Fixes Rule' from NEXUS_VERIFICATION_CHECKLIST.md.
 * Persists state to memory/short_term/bug_attempts.json.
 */
class BugHunter {
    constructor(rootPath) {
        this.rootPath = rootPath || process.cwd();
        this.logPath = path.join(this.rootPath, 'memory', 'short_term', 'bug_attempts.json');
        this.attemptLog = new Map();
        this.MAX_ATTEMPTS = 3;
        this.loadLog();
    }

    /**
     * Load existing logs from file
     */
    loadLog() {
        try {
            if (fs.pathExistsSync(this.logPath)) {
                const data = fs.readJsonSync(this.logPath);
                this.attemptLog = new Map(Object.entries(data));
            }
        } catch (err) {
            console.error('⚠️ BugHunter: Failed to load attempt log:', err.message);
        }
    }

    /**
     * Save current logs to file
     */
    saveLog() {
        try {
            fs.ensureDirSync(path.dirname(this.logPath));
            const data = Object.fromEntries(this.attemptLog);
            fs.writeJsonSync(this.logPath, data, { spaces: 2 });
        } catch (err) {
            console.error('⚠️ BugHunter: Failed to save attempt log:', err.message);
        }
    }

    /**
     * Track a task attempt.
     * @param {string} taskId - Unique task ID or description.
     */
    trackAttempt(taskId) {
        const current = this.attemptLog.get(taskId) || 0;
        this.attemptLog.set(taskId, current + 1);
        this.saveLog();
        
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
        this.saveLog();
    }
}

module.exports = BugHunter;
