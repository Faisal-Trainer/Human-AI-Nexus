const fs = require('fs-extra');
const path = require('path');

class Logger {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.logsDir = path.join(this.rootPath, 'logs');
        this.ensureDirectories();
    }

    ensureDirectories() {
        const dirs = ['agents', 'orchestration', 'memory', 'scanners', 'plugins', 'errors'];
        dirs.forEach(dir => {
            fs.ensureDirSync(path.join(this.logsDir, dir));
        });
    }

    async log(category, level, agent, task_id, event, message, duration_ms = 0, metadata = {}) {
        const validCategories = ['agents', 'orchestration', 'memory', 'scanners', 'plugins', 'errors'];
        const validLevels = ['INFO', 'WARNING', 'ERROR', 'CRITICAL'];

        if (!validCategories.includes(category)) {
            category = 'orchestration'; // fallback
        }
        
        if (!validLevels.includes(level)) {
            level = 'INFO'; // fallback
        }

        const logEntry = {
            timestamp: new Date().toISOString(),
            level: level,
            agent: agent,
            task_id: task_id,
            duration_ms: duration_ms,
            event: event,
            message: message,
            metadata: metadata
        };

        const dateStr = new Date().toISOString().split('T')[0];
        const logFile = path.join(this.logsDir, category, `${dateStr}.json`);

        try {
            let logs = [];
            if (await fs.pathExists(logFile)) {
                logs = await fs.readJson(logFile);
            }
            logs.push(logEntry);
            await fs.writeJson(logFile, logs, { spaces: 2 });
        } catch (e) {
            console.error(`Logger Failed: ${e.message}`);
        }
    }
}

module.exports = Logger;
