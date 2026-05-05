const NexusEngine = require('../../agent/core/NexusEngine');

/**
 * 🧪 TDD Test Case: Nexus Engine wrapAsConditional
 */
async function testWrapAsConditional() {
    console.log('🧪 Running NexusEngine.wrapAsConditional Test...');
    const engine = new NexusEngine({ rootPath: process.cwd() });

    const existing = "Standard security protocol: use HSTS and CSP.";
    const similar = "Standard security protocol: use HSTS and CSP. Also rotate keys.";
    const different = "Performance protocol: use Redis for caching.";

    const consolidated = engine.wrapAsConditional(existing, similar, 'Test Consolidation');
    const collision = engine.wrapAsConditional(existing, different, 'Test Collision');

    if (!consolidated.includes('KNOWLEDGE CONSOLIDATED')) {
        throw new Error('Should have triggered consolidation for similar strings');
    }

    if (!collision.includes('COLLISION RESOLVED')) {
        throw new Error('Should have triggered collision resolution for different strings');
    }

    console.log('✅ NexusEngine.wrapAsConditional Test Passed!\n');
}

testWrapAsConditional().catch(err => {
    console.error('❌ NexusEngine.wrapAsConditional Test Failed:', err.message);
    process.exit(1);
});
