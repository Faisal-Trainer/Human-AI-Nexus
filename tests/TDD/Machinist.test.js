const Machinist = require('../../agent/core/Machinist');

/**
 * 🧪 TDD Test Case: Machinist core validation
 */
async function testMachinistBasics() {
    console.log('🧪 Running Machinist.test.js...');
    const machinist = new Machinist(process.cwd());

    if (!machinist) {
        throw new Error('Machinist failed to initialize');
    }

    if (machinist.rootPath !== process.cwd()) {
        throw new Error('Machinist root path mismatch');
    }

    console.log('✅ Machinist Basics Test Passed!\n');
}

testMachinistBasics().catch(err => {
    console.error('❌ Machinist Test Failed:', err.message);
    process.exit(1);
});
