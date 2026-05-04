const NexusEngine = require('../agent/core/NexusEngine');
const path = require('path');

async function testIntegration() {
    console.log('🧪 Testing Nexus Engine Machine Integration...');
    const engine = new NexusEngine({ rootPath: process.cwd() });
    
    const machines = [
        { name: 'Validator', ref: engine.validator },
        { name: 'BugHunter', ref: engine.bugHunter },
        { name: 'Designer', ref: engine.designer },
        { name: 'AccessibilityScanner', ref: engine.a11yScanner },
        { name: 'SchemaGuard', ref: engine.schemaGuard },
        { name: 'QueryOptimizer', ref: engine.queryOptimizer },
        { name: 'WorktreeManager', ref: engine.worktreeManager },
        { name: 'RootCauseAnalyzer', ref: engine.rcAnalyzer },
        { name: 'TDDGuard', ref: engine.tddGuard },
        { name: 'TDDScaffolder', ref: engine.tddScaffolder }
    ];

    for (const m of machines) {
        if (m.ref) {
            console.log(`✅ Machine [${m.name}] is properly instantiated.`);
        } else {
            console.error(`❌ Machine [${m.name}] is MISSING in NexusEngine.`);
        }
    }

    console.log('\n🧪 Testing Machine Calls...');
    try {
        await engine.validator.verifyAction({ target: 'README.md', type: 'FILE_READ' });
        console.log('✅ Validator call: SUCCESS');
        
        engine.bugHunter.trackAttempt('test-task');
        console.log('✅ BugHunter call: SUCCESS');
        
        await engine.a11yScanner.scan('README.md');
        console.log('✅ AccessibilityScanner call: SUCCESS');
        
        console.log('\n✨ Integration Test: PASSED');
    } catch (e) {
        console.error(`\n❌ Integration Test: FAILED - ${e.message}`);
        process.exit(1);
    }
}

testIntegration();
