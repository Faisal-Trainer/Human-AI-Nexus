const path = require('path');
const fs = require('fs-extra');
const Orchestrator = require('../core/Orchestrator');
const EventBus = require('../core/EventBus');

async function runStressTest() {
    console.log("🚀 Starting NEXUS Stress Test (H7)...");
    
    const rootPath = path.join(__dirname, '..', '..');
    const orchestrator = new Orchestrator(rootPath);
    
    // Create a dummy scanner
    const dummyScannerPath = path.join(__dirname, 'dummy-scanner.js');
    const dummyScannerCode = `
module.exports = {
    scan: async (targetPath) => {
        await new Promise(r => setTimeout(r, Math.random() * 500 + 100)); // random delay 100-600ms
        if (Math.random() > 0.8) {
            throw new Error("Simulated random failure");
        }
        return [{ severity: 'INFO', message: 'Stress test dummy finding', file: 'dummy.txt' }];
    }
};
    `;
    await fs.writeFile(dummyScannerPath, dummyScannerCode);
    
    // Add to manifest.json so SandboxExecutor allows it
    const manifestPath = path.join(__dirname, '..', 'tools', 'scanners', 'manifest.json');
    let originalManifest = null;
    if (await fs.pathExists(manifestPath)) {
        originalManifest = await fs.readJson(manifestPath);
        const manifest = await fs.readJson(manifestPath);
        if (!manifest.scanners.some(s => s.entrypoint.includes('dummy-scanner'))) {
            manifest.scanners.push({
                id: "dummy-scanner",
                entrypoint: "dummy-scanner.js" // Sandbox uses .includes() check
            });
            await fs.writeJson(manifestPath, manifest, { spaces: 2 });
        }
    }

    let completedTasks = 0;
    let failedTasks = 0;
    const NUM_TASKS = 10;
    
    EventBus.subscribe('SCANNER_FINISHED', () => completedTasks++);
    EventBus.subscribe('TASK_FAILED', () => failedTasks++);

    console.log(`🔄 Routing ${NUM_TASKS} tasks simultaneously...`);
    const promises = [];
    for (let i = 0; i < NUM_TASKS; i++) {
        promises.push(orchestrator.routeTask('dummy-agent', dummyScannerPath, { root: rootPath, _testId: i }, 'high'));
    }
    await Promise.all(promises);

    console.log("⏳ Waiting for tasks to complete (including retries)...");
    // Wait for all to finish since routeTask just publishes event
    await new Promise(resolve => {
        const checkInterval = setInterval(() => {
            console.log(`[Interval] Completed: ${completedTasks}, Failed: ${failedTasks}`);
            if (completedTasks + failedTasks === NUM_TASKS) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 1000);
    });

    console.log(`\n✅ Stress test finished!`);
    console.log(`📊 Completed successfully: ${completedTasks}`);
    console.log(`❌ Failed (after 3 retries): ${failedTasks}`);
    console.log(`📜 EventBus Audit Log Size: ${EventBus.getAuditLog().length} events`);
    
    // Cleanup
    await fs.remove(dummyScannerPath);
    if (originalManifest) {
        await fs.writeJson(manifestPath, originalManifest, { spaces: 2 });
    }
    
    console.log("🧹 Cleanup complete.");
    process.exit(0);
}

runStressTest().catch(console.error);
