const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * 🚀 Nexus TDD Runner
 * Executes all tests in the tests/TDD directory.
 */
async function runAllTests() {
    console.log('🚀 NEXUS TDD RUNNER: Starting execution...\n');
    
    const testDir = __dirname;
    const files = fs.readdirSync(testDir).filter(f => f.endsWith('.test.js'));
    
    let total = files.length;
    let passed = 0;

    for (const file of files) {
        const filePath = path.join(testDir, file);
        const result = await runTest(filePath);
        if (result) passed++;
    }

    console.log(`\n📊 TEST SUMMARY:`);
    console.log(`   - Total Tests: ${total}`);
    console.log(`   - Passed: ${passed}`);
    console.log(`   - Failed: ${total - passed}`);

    if (passed < total) {
        process.exit(1);
    }
}

function runTest(filePath) {
    return new Promise((resolve) => {
        let command = 'bun';
        let spawnArgs = [filePath];
        let shellOpt = false;
        
        if (process.platform === 'win32') {
            command = `bun "${filePath}"`;
            spawnArgs = [];
            shellOpt = true;
        }
        
        const child = spawn(command, spawnArgs, { stdio: 'inherit', shell: shellOpt });
        child.on('exit', (code) => {
            resolve(code === 0);
        });
    });
}

runAllTests();
