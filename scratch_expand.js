const fs = require('fs-extra');
const path = require('path');

const rootDir = process.cwd();
const internalPath = path.join(rootDir, 'agent', 'prompts', 'internal');
const externalPath = path.join(rootDir, 'agent', 'prompts', 'external');

async function expandPrompts() {
  console.log('🔄 Expanding external prompts...');
  
  if (!await fs.pathExists(internalPath)) {
    console.error('❌ Internal prompts directory not found.');
    return;
  }

  // Define categories
  const categories = {
    security: ['security', 'auth', 'cyber', 'chaos', 'ethics'],
    creative: ['ui', 'ux', 'seo', 'design', 'responsive', 'copywriter', 'branding'],
    business: ['analytics', 'monetization', 'marketing', 'project-manager'],
    core: ['orchestrator', 'manager', 'guru', 'architect', 'ai-assistant'],
    engineering: [] // Default fallback
  };

  const internalFiles = await fs.readdir(internalPath, { withFileTypes: true });
  
  let copiedCount = 0;

  for (const entry of internalFiles) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;

    const baseName = entry.name.replace('.md', '').toLowerCase();
    
    // Check if it already exists in any external subfolder
    let exists = false;
    for (const cat of Object.keys(categories)) {
      if (await fs.pathExists(path.join(externalPath, cat, entry.name))) {
        exists = true;
        break;
      }
    }

    if (exists) {
      console.log(`   ⏭️ Skipping ${entry.name} (already exists in external)`);
      continue;
    }

    // Determine category
    let targetCat = 'engineering'; // Default
    for (const [cat, keywords] of Object.entries(categories)) {
      if (cat === 'engineering') continue;
      if (keywords.some(kw => baseName.includes(kw))) {
        targetCat = cat;
        break;
      }
    }

    // Copy to external
    const destPath = path.join(externalPath, targetCat, entry.name);
    await fs.ensureDir(path.join(externalPath, targetCat));
    await fs.copy(path.join(internalPath, entry.name), destPath);
    
    console.log(`   ✅ Copied ${entry.name} -> external/${targetCat}`);
    copiedCount++;
  }

  console.log(`\n✨ Successfully expanded ${copiedCount} internal prompts to external categories.`);
}

expandPrompts().catch(console.error);
