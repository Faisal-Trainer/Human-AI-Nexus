const fs = require('fs-extra');
const path = require('path');
const NexusClock = require('./NexusClock');

class Logger {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.logPath = path.join(this.rootPath, 'logs');
        this.ensureDirectories();
        this._writeQueue = Promise.resolve();
    }

    ensureDirectories() {
        const dirs = ['agents', 'orchestration', 'memory', 'scanners', 'plugins', 'errors'];
        dirs.forEach(dir => {
            fs.ensureDirSync(path.join(this.logPath, dir));
        });
    }

    async log(category, level, agent, task_id, event, message, duration_ms = 0, metadata = {}, trace_id = 'N/A') {
        const validCategories = ['agents', 'orchestration', 'memory', 'scanners', 'plugins', 'errors'];
        const validLevels = ['INFO', 'WARNING', 'ERROR', 'CRITICAL'];

        if (!validCategories.includes(category)) category = 'orchestration';
        if (!validLevels.includes(level)) level = 'INFO';

        const logDir = path.join(this.logPath, category);
        const logFile = path.join(logDir, `${NexusClock.getDateString()}.ndjson`);

        const logEntry = {
            trace_id: trace_id,
            timestamp: NexusClock.getISOTimestamp(),
            level: level,
            agent: agent,
            task_id: task_id,
            event: event,
            message: message,
            duration_ms: duration_ms,
            metadata: metadata
        };

        try {
            await fs.ensureDir(logDir);
            await fs.appendFile(logFile, JSON.stringify(logEntry) + '\n');
        } catch (e) {
            console.error(`Logger Failed: ${e.message}`);
        }
    }
}

module.exports = Logger;
