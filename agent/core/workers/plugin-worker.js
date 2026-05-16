const { workerData, parentPort } = require('worker_threads');
const path = require('path');

/**
 * Isolated Worker for Plugin Execution
 * Prevents main process crashes and provides security isolation.
 */
async function run() {
    try {
        const plugin = require(workerData.pluginPath);
        
        // Find executable action (standardized in Nexus)
        const action = plugin.scan || plugin.execute;
        
        if (typeof action !== 'function') {
            throw new Error(`Plugin at ${workerData.pluginPath} must export a scan() or execute() function.`);
        }

        // Execute action with provided args
        const result = await Promise.resolve(action(workerData.args));
        
        parentPort.postMessage({ ok: true, result });
    } catch (err) {
        parentPort.postMessage({ ok: false, error: err.message });
    }
}

run();
