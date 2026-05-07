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
            // Simulated worker thread for plugin isolation
            let resolved = false;

            const timer = setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    reject(new Error(`SandboxExecutor: Execution timed out after ${timeout}ms`));
                }
            }, timeout);

            try {
                // Permission Validation
                const manifestPath = path.join(__dirname, '..', 'tools', 'scanners', 'manifest.json');
                if (require('fs-extra').existsSync(manifestPath)) {
                    const manifest = require(manifestPath);
                    const isAllowed = manifest.scanners.some(s => pluginPath.includes(s.entrypoint));
                    if (!isAllowed) {
                        throw new Error(`SandboxExecutor: Plugin ${pluginPath} is not registered in manifest.json`);
                    }
                }

                // Restrict dangerous globals if this were a true VM sandbox
                const plugin = require(pluginPath);
                
                if (typeof plugin.scan !== 'function' && typeof plugin.execute !== 'function') {
                    throw new Error('Plugin must export a scan() or execute() function.');
                }

                const action = plugin.scan ? plugin.scan : plugin.execute;
                
                Promise.resolve(action(args)).then(result => {
                    if (!resolved) {
                        resolved = true;
                        clearTimeout(timer);
                        resolve(result);
                    }
                }).catch(err => {
                    if (!resolved) {
                        resolved = true;
                        clearTimeout(timer);
                        reject(err);
                    }
                });

            } catch (err) {
                if (!resolved) {
                    resolved = true;
                    clearTimeout(timer);
                    reject(err);
                }
            }
        });
    }
}

module.exports = SandboxExecutor;
