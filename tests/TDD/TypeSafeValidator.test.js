const TypeSafeValidator = require('../../agent/tools/TypeSafeValidator');
const assert = require('assert');

/**
 * 🧪 TDD Test Case: TypeSafeValidator Validation Gate
 */
async function runTests() {
    console.log('🧪 Running TypeSafeValidator Test Suite...\n');

    // ── TEST 1: Disabled by default without API key ──
    console.log('Test 1: Verify disabled & fail-open when no API key is provided');
    const noKeyValidator = new TypeSafeValidator({ apiKey: null });
    assert.strictEqual(noKeyValidator.enabled, false, 'Validator should be disabled when apiKey is null');

    const bpSkip = await noKeyValidator.validateBlueprint({ models: ['User'] });
    assert.strictEqual(bpSkip.skipped, true);
    assert.strictEqual(bpSkip.reason, 'no_api_key');

    const migSkip = await noKeyValidator.validateMigrationOutput('artisan migrate output');
    assert.strictEqual(migSkip.skipped, true);
    assert.strictEqual(migSkip.reason, 'no_api_key');

    const routeSkip = await noKeyValidator.routeSkill('Fix database query', { 'db-architect': 'Optimize SQL' });
    assert.strictEqual(routeSkip.skipped, true);
    assert.strictEqual(routeSkip.reason, 'no_api_key');

    const scoreSkip = await noKeyValidator.scoreSample({ prompt: 'test', output: 'code' });
    assert.strictEqual(scoreSkip.skipped, true);
    assert.strictEqual(scoreSkip.reason, 'no_api_key');
    console.log('   ✅ Test 1 Passed: Correctly skipped all gates with no_api_key.\n');

    // ── TEST 2: Blueprint Gate (Mocked Evaluation) ──
    console.log('Test 2: Blueprint Validation Gate');
    const mockValidator = new TypeSafeValidator({ apiKey: 'mock-key-for-test' });
    
    // Case 2A: Flagged issues in blueprint
    mockValidator.evaluate = async (state, questions) => {
        return {
            has_placeholder: { noul: 0.85 },
            pivot_naming_wrong: { noul: 0.10 },
            routes_incomplete: { noul: 0.70 }
        };
    };

    const bpFailed = await mockValidator.validateBlueprint({ models: ['ModelName1'] });
    assert.strictEqual(bpFailed.skipped, false);
    assert.strictEqual(bpFailed.ok, false);
    assert.strictEqual(bpFailed.issues.length, 2, 'Should flag 2 issues above 0.5 threshold');
    assert(bpFailed.issues.some(i => i.includes('Ada nilai placeholder')));
    assert(bpFailed.issues.some(i => i.includes('Ada route yang tidak lengkap')));
    console.log('   ✅ Test 2A Passed: Accurately caught blueprint placeholders and incomplete routes.');

    // Case 2B: Clean blueprint
    mockValidator.evaluate = async (state, questions) => {
        return {
            has_placeholder: { noul: 0.05 },
            pivot_naming_wrong: { noul: 0.02 },
            routes_incomplete: { noul: 0.08 }
        };
    };

    const bpClean = await mockValidator.validateBlueprint({ models: ['User', 'Post'] });
    assert.strictEqual(bpClean.skipped, false);
    assert.strictEqual(bpClean.ok, true);
    assert.strictEqual(bpClean.issues.length, 0);
    console.log('   ✅ Test 2B Passed: Clean blueprint approved without issues.\n');

    // ── TEST 3: Migration Output Gate ──
    console.log('Test 3: Migration / Sandbox Output Gate (Anti False-Positive)');
    // Case 3A: Migration failure detected
    mockValidator.evaluate = async (state, questions) => {
        return {
            migration_failed: { noul: 0.95 },
            app_ready: { noul: 0.15 }
        };
    };

    const migFail = await mockValidator.validateMigrationOutput('SQLSTATE[HY000]: General error: table already exists');
    assert.strictEqual(migFail.skipped, false);
    assert.strictEqual(migFail.ok, false, 'Should flag failed migration');
    assert.strictEqual(migFail.migrationFailedP, 0.95);
    console.log('   ✅ Test 3A Passed: Successfully caught failed migration.');

    // Case 3B: Successful migration & app ready
    mockValidator.evaluate = async (state, questions) => {
        return {
            migration_failed: { noul: 0.02 },
            app_ready: { noul: 0.98 }
        };
    };

    const migSuccess = await mockValidator.validateMigrationOutput('Migration tables fresh. Seed completed successfully.');
    assert.strictEqual(migSuccess.skipped, false);
    assert.strictEqual(migSuccess.ok, true);
    assert.strictEqual(migSuccess.appReadyP, 0.98);
    console.log('   ✅ Test 3B Passed: Clean migration confirmed app ready.\n');

    // ── TEST 4: Skill Routing ──
    console.log('Test 4: Skill Routing Gate');
    mockValidator.evaluate = async (state, questions) => {
        return {
            skill: {
                choice: 'database-architect',
                confidence: 0.92,
                probabilities: {
                    'database-architect': 0.92,
                    'ux-engineer': 0.08
                }
            }
        };
    };

    const routeRes = await mockValidator.routeSkill('Optimize SQLite indexes and foreign keys', {
        'database-architect': 'Database schemas and migrations',
        'ux-engineer': 'UI components and styling'
    });
    assert.strictEqual(routeRes.skipped, false);
    assert.strictEqual(routeRes.skill, 'database-architect');
    assert.strictEqual(routeRes.confidence, 0.92);
    console.log('   ✅ Test 4 Passed: Accurately routed task to database-architect.\n');

    // ── TEST 5: Sample Quality Scoring ──
    console.log('Test 5: Distillation Sample Quality Scoring');
    mockValidator.evaluate = async (state, questions) => {
        return {
            quality: {
                score: 4,
                confidence: 0.88
            }
        };
    };

    const scoreRes = await mockValidator.scoreSample('Sample prompt and generated Livewire component');
    assert.strictEqual(scoreRes.skipped, false);
    assert.strictEqual(scoreRes.score, 4);
    assert.strictEqual(scoreRes.confidence, 0.88);
    console.log('   ✅ Test 5 Passed: Successfully scored sample quality.\n');

    // ── TEST 6: Fail-Open on API Error ──
    console.log('Test 6: Fail-open behavior when evaluate throws');
    const failingValidator = new TypeSafeValidator({ apiKey: 'mock-key', maxRetries: 0 });
    failingValidator.evaluate = async () => {
        throw new Error('Connection refused / 500 Internal Server Error');
    };

    const failBp = await failingValidator.validateBlueprint({ models: ['User'] });
    assert.strictEqual(failBp.skipped, true);
    assert.strictEqual(failBp.reason, 'api_error');
    assert(failBp.error.includes('Connection refused'));
    console.log('   ✅ Test 6 Passed: Fail-open prevented pipeline crash on API error.\n');

    console.log('🎉 All TypeSafeValidator tests passed successfully!');
}

runTests().catch(err => {
    console.error('❌ TypeSafeValidator Test Failed:', err);
    process.exit(1);
});
