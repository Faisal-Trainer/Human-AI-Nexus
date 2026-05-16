// agent/core/SandboxExecutor.js — v2.1.0
// FIX #04 — Path traversal ditutup: gunakan path.resolve + startsWith(allowedDir)
// FIX #04 — readJsonSync diganti readJson async (tidak memblok event loop)

const { Worker } = require('worker_threads');
const path = require('path');
const fs = require('fs-extra');

class SandboxExecutor {
    constructor() {
        this.defaultTimeout = 30000;
        // FIX #04 — Direktori yang diizinkan, resolved absolute path
        this._allowedDir = path.resolve(path.join(__dirname, '..', 'tools', 'scanners'));
    }

    execute(pluginPath, args, options = {}) {
        const timeout = options.timeout || this.defaultTimeout;

        return new Promise(async (resolve, reject) => {
            try {
                // FIX #04 — Path traversal: resolve path dulu, baru cek startsWith
                const resolvedPlugin = path.resolve(pluginPath);
                if (!resolvedPlugin.startsWith(this._allowedDir + path.sep) &&
                    resolvedPlugin !== this._allowedDir) {
                    return reject(new Error(
                        `SandboxExecutor: Plugin path "${resolvedPlugin}" is outside allowed directory. ` +
                        `Only plugins under "${this._allowedDir}" are permitted.`
                    ));
                }

                // FIX #04 — Gunakan async readJson (tidak memblok event loop)
                const manifestPath = path.join(this._allowedDir, 'manifest.json');
                if (await fs.pathExists(manifestPath)) {
                    const manifest = await fs.readJson(manifestPath);
                    const isAllowed = manifest.scanners.some(s =>
                        resolvedPlugin === path.resolve(path.join(this._allowedDir, s.entrypoint))
                    );
                    if (!isAllowed) {
                        return reject(new Error(
                            `SandboxExecutor: Plugin "${path.basename(resolvedPlugin)}" is not registered in manifest.json`
                        ));
                    }
                }

                const workerPath = path.join(__dirname, 'workers', 'plugin-worker.js');
                const worker = new Worker(workerPath, { workerData: { pluginPath: resolvedPlugin, args } });

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
