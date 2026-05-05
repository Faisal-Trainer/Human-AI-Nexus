const Distiller = require('../../agent/core/Distiller');
const fs = require('fs-extra');
const path = require('path');

/**
 * 🧪 TDD Test Case: Distiller Semantic Tagging
 */
async function testTagging() {
    console.log('🧪 Running Distiller.applySemanticTagging Test...');
    
    // Setup temporary test directory
    const testKnowledgePath = path.join(process.cwd(), 'scratch', 'test_knowledge');
    await fs.ensureDir(testKnowledgePath);
    
    const testFile = path.join(testKnowledgePath, 'test_security.md');
    await fs.writeFile(testFile, '# Security Test\nThis is a file about auth and encryption and secure guards.');
    
    const distiller = new Distiller(testKnowledgePath);
    await distiller.applySemanticTagging();
    
    const content = await fs.readFile(testFile, 'utf8');
    
    // Cleanup
    await fs.remove(testKnowledgePath);

    if (!content.includes('METADATA (NEXUS SEMANTIC TAGS)')) {
        throw new Error('Distiller should have added semantic tags');
    }
    
    if (!content.includes('security')) {
        throw new Error('Distiller should have identified "security" tag');
    }

    console.log('✅ Distiller.applySemanticTagging Test Passed!\n');
}

testTagging().catch(err => {
    console.error('❌ Distiller.applySemanticTagging Test Failed:', err.message);
    process.exit(1);
});
