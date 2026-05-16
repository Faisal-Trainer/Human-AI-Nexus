const { Worker } = require('worker_threads');
const path = require('path');

class SandboxExecutor {
    constructor() {
        // Defines the isolated context limits
        this.defaultTimeout = 30000;
    }

    execute(pluginPath, args, options = {}) {
        const timeout = options.timeout || this.defaultTimeout;

        return new Promise((resolve, reject) => {
            try {
                // Permission Validation (before starting worker)
                const fs = require('fs-extra');
                const manifestPath = path.join(__dirname, '..', 'tools', 'scanners', 'manifest.json');
                if (fs.existsSync(manifestPath)) {
                    const manifest = fs.readJsonSync(manifestPath);
                    const isAllowed = manifest.scanners.some(s => pluginPath.includes(s.entrypoint));
                    if (!isAllowed) {
                        return reject(new Error(`SandboxExecutor: Plugin ${pluginPath} is not registered in manifest.json`));
                    }
                }

                const workerPath = path.join(__dirname, 'workers', 'plugin-worker.js');
                const worker = new Worker(workerPath, { workerData: { pluginPath, args } });

                const timer = setTimeout(() => {
                    worker.terminate();
                    reject(new Error(`SandboxExecutor: Execution timed out after ${timeout}ms`));
                }, timeout);

                worker.on('message', (msg) => {
                    clearTimeout(timer);
                    worker.terminate();
                    msg.ok ? resolve(msg.result) : reject(new Error(msg.error));
                });

                worker.on('error', (err) => {
                    clearTimeout(timer);
                    worker.terminate();
                    reject(err);
                });

                worker.on('exit', (code) => {
                    clearTimeout(timer);
                    if (code !== 0) {
                        reject(new Error(`Worker stopped with exit code ${code}`));
                    }
                });

            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = SandboxExecutor;
