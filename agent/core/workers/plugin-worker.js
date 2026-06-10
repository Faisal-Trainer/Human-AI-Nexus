const { workerData, parentPort } = require("worker_threads");
const path = require("path");

/**
 * Isolated Worker for Plugin Execution
 * Prevents main process crashes and provides security isolation.
 * FIX #12 — Internal timeout (30s default) prevents orphan worker processes
 * if the parent process crashes or SandboxExecutor timeout fails.
 */

const INTERNAL_TIMEOUT_MS = workerData.timeout || 30000;

// Safety net: if parent process dies, this timer kills the worker
const safetyTimer = setTimeout(() => {
  parentPort.postMessage({
    ok: false,
    error: `Plugin worker internal timeout after ${INTERNAL_TIMEOUT_MS}ms`,
  });
  process.exit(1);
}, INTERNAL_TIMEOUT_MS);

// Detect parent disconnect (orphan prevention)
if (parentPort) {
  parentPort.on("close", () => {
    clearTimeout(safetyTimer);
    process.exit(0);
  });
}

async function run() {
  try {
    const plugin = require(workerData.pluginPath);

    // Find executable action (standardized in Nexus)
    const action = plugin.scan || plugin.execute;

    if (typeof action !== "function") {
      throw new Error(
        `Plugin at ${workerData.pluginPath} must export a scan() or execute() function.`,
      );
    }

    // Execute action with provided args
    const result = await Promise.resolve(action(workerData.args));

    clearTimeout(safetyTimer);
    parentPort.postMessage({ ok: true, result });
  } catch (err) {
    clearTimeout(safetyTimer);
    parentPort.postMessage({ ok: false, error: err.message });
  }
}

run();
