const NexusEngine = require('../src/index');

/**
 * Basic Workflow Example
 * This script demonstrates how to use the NexusEngine programmatically.
 */
async function runExample() {
    console.log('--- Starting Basic Workflow Example ---\n');
    
    const engine = new NexusEngine({
        verbose: true
    });

    try {
        // Step 1: Manual Audit
        const auditFile = await engine.audit();
        
        // Step 2: Planning
        const planFile = await engine.plan(auditFile);
        
        // Step 3: Execution (Mock)
        await engine.execute(planFile);
        
        // Step 4: Record keeping
        await engine.record();
        
        console.log('\n--- Example Completed Successfully ---');
    } catch (err) {
        console.error('Example Failed:', err);
    }
}

runExample();
