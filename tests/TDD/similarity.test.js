const NexusEngine = require('../../agent/core/NexusEngine');

/**
 * 🧪 TDD Test Case: Similarity Logic
 */
async function testSimilarity() {
    console.log('🧪 Running Similarity Logic Test...');
    const engine = new NexusEngine({ rootPath: process.cwd() });

    const str1 = "The quick brown fox jumps over the lazy dog";
    const str2 = "The quick brown fox jumps over the lazy dog";
    const str3 = "A completely different sentence";
    const str4 = "The quick brown fox jumps over a lazy cat";

    const sim1 = engine.calculateSimilarity(str1, str2);
    const sim2 = engine.calculateSimilarity(str1, str3);
    const sim3 = engine.calculateSimilarity(str1, str4);

    console.log(`   - Identity Similarity: ${sim1}`);
    console.log(`   - Different Similarity: ${sim2}`);
    console.log(`   - Partial Similarity: ${sim3}`);

    if (sim1 !== 1) throw new Error('Identity similarity should be 1');
    if (sim2 > 0.3) throw new Error('Different strings should have low similarity');
    if (sim3 < 0.5) throw new Error('Partial strings should have higher similarity');

    console.log('✅ Similarity Logic Test Passed!\n');
}

testSimilarity()
    .then(async () => {
        const redis = require('../../agent/core/RedisMemory');
        await redis.disconnect().catch(() => {});
        process.exit(0);
    })
    .catch(async (err) => {
        console.error('❌ Similarity Logic Test Failed:', err.message);
        const redis = require('../../agent/core/RedisMemory');
        await redis.disconnect().catch(() => {});
        process.exit(1);
    });
