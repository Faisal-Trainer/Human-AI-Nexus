/**
 * 🧪 TDD Test Case: TDDGuard Validation
 * Target: agent/tools/TDDGuard.js
 */

const TDDGuard = require('../../agent/tools/TDDGuard');
const path = require('path');

async function runTest() {
    console.log('🚀 Running TDDGuard Validation Test...');
    const guard = new TDDGuard(process.cwd());

    // Case 1: Testing a file that is in TDD_LIST.md
    const result1 = await guard.validate('documentation/docs/NEXUS_EXTERNAL_PIPELINE_RECAP.md');
    console.log(`Test 1 (Exempted File): ${result1.allowed ? '✅ PASSED' : '❌ FAILED'} - ${result1.reason}`);

    // Case 2: Testing a file that has no test and not in list
    const result2 = await guard.validate('cli.js');
    console.log(`Test 2 (Unauthorized Mod): ${!result2.allowed ? '✅ PASSED (Blocked as expected)' : '❌ FAILED'} - ${result2.reason}`);
}

runTest().catch(console.error);
