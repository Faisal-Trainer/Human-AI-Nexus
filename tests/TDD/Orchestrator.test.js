const EventBus = require('../../agent/core/EventBus');
const Orchestrator = require('../../agent/core/Orchestrator');
const path = require('path');
const fs = require('fs-extra');

/**
 * 🧪 TDD Test Case: Orchestrator Lifecycle & Task Routing
 */
async function testOrchestratorLifecycle() {
    console.log('🧪 Running Orchestrator.test.js...');
    
    const rootPath = process.cwd();
    const orchestrator = new Orchestrator(rootPath);
    
    // 🛡️ Mock Logger to avoid file system hangs/I/O issues during tests
    orchestrator.logger.log = async () => Promise.resolve();

    // 🛡️ Mock SandboxExecutor to avoid manifest check & physical file requirements
    orchestrator.sandbox.execute = async (pluginPath, args) => {
        console.log(`   🛠️ Mock Sandbox: Executing ${path.basename(pluginPath)}`);
        return {
            success: true,
            message: 'Mock scan completed',
            data: args
        };
    };

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Test timed out: Orchestrator did not finish task in time.'));
        }, 5000);

        // 1. Subscribe to result
        EventBus.subscribe('SCANNER_FINISHED', (payload) => {
            try {
                console.log(`   ✅ Event Received: SCANNER_FINISHED for task ${payload.task_id}`);
                
                if (!payload.result || !payload.result.success) {
                    throw new Error('Task execution result was not successful');
                }
                
                if (payload.result.message !== 'Mock scan completed') {
                    throw new Error(`Unexpected message: ${payload.result.message}`);
                }

                console.log('✅ Orchestrator Lifecycle & Task Routing Test Passed!\n');
                clearTimeout(timeout);
                resolve();
            } catch (err) {
                clearTimeout(timeout);
                reject(err);
            }
        });

        // 2. Trigger task
        console.log('   🚀 Routing test task to Orchestrator...');
        orchestrator.routeTask('test-agent', 'mock-path.js', { foo: 'bar' }, 'high').catch(reject);
    });
}

// Execute test
testOrchestratorLifecycle().catch(err => {
    console.error('❌ Orchestrator.test.js Failed:', err.message);
    process.exit(1);
});
