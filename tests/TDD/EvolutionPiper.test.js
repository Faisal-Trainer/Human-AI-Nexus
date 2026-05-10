const EvolutionPiper = require('../../agent/core/EvolutionPiper');
const fs = require('fs-extra');
const path = require('path');

/**
 * 🧪 TDD Test Case: EvolutionPiper Sandbox Spawning
 */
async function testEvolutionSpawning() {
    console.log('🧪 Running EvolutionPiper.test.js...');
    
    const rootPath = process.cwd();
    const piper = new EvolutionPiper(rootPath);
    const projectName = 'tdd-evolution-test';
    
    // 1. Spawn Sandbox
    const sandboxPath = await piper.spawnSandbox(projectName, 'vulnerable');
    
    // 2. Verify files
    const dbExists = await fs.pathExists(path.join(sandboxPath, 'db.js'));
    const authExists = await fs.pathExists(path.join(sandboxPath, 'auth.js'));
    
    if (!dbExists || !authExists) {
        throw new Error('EvolutionPiper failed to spawn files correctly');
    }

    console.log('✅ EvolutionPiper Sandbox Spawning Test Passed!');
    
    // Cleanup
    await fs.remove(sandboxPath);
    console.log('   🧹 Cleanup: Sandbox removed.\n');
}

testEvolutionSpawning().catch(err => {
    console.error('❌ EvolutionPiper Test Failed:', err.message);
    process.exit(1);
});
