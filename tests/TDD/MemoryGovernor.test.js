const NexusEngine = require('../../agent/core/NexusEngine');
const MemoryGovernor = require('../../agent/core/MemoryGovernor');

/**
 * 🧪 TDD Test Case: MemoryGovernor health checks
 */
async function testMemoryGovernorHealth() {
    console.log('🧪 Running MemoryGovernor.test.js...');
    const governor = new MemoryGovernor(process.cwd());

    if (governor.rootPath !== process.cwd()) {
        throw new Error('MemoryGovernor root path mismatch');
    }

    const checksum = governor.generateChecksum('test-content');
    if (!checksum || checksum.length !== 64) {
        throw new Error('MemoryGovernor checksum generation failed');
    }

    console.log('✅ MemoryGovernor Checksum Test Passed!\n');
}

testMemoryGovernorHealth().catch(err => {
    console.error('❌ MemoryGovernor Test Failed:', err.message);
    process.exit(1);
});
