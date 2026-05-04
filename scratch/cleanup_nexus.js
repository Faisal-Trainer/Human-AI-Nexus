const fs = require('fs-extra');
const path = require('path');

const targets = [
    'C:\\xampp\\htdocs\\NEXUS-LORE',
    'C:\\xampp\\htdocs\\portofolio',
    'C:\\xampp\\htdocs\\talent-umkm-app',
    'C:\\xampp\\htdocs\\php native',
    'C:\\xampp\\htdocs\\public_html'
];

const patternsToRemove = [  
    'nexus',
    'documentation/summary',
    'documentation/algorithms',
    'documentation/audit',
    'documentation/knowledge',
    'documentation/planning',
    'documentation/records',
    'documentation/design',
    'node_modules/human-ai-nexus',
    'node_modules/.bin/nexus',
    'node_modules/.bin/nexus.cmd',
    'node_modules/.bin/nexus.ps1'
];

const filesToSearchAndRemove = [
    'ALGORITMA_INTEGRASI.md',
    'implementation_plan*.md'
];

async function cleanup() {
    const { glob } = require('glob');

    for (const target of targets) {
        console.log(`🧹 Comprehensive Cleaning Nexus from: ${target}...`);
        
        try {
            // Remove specific folders/files
            for (const pattern of patternsToRemove) {
                const fullPath = path.join(target, pattern);
                if (await fs.pathExists(fullPath)) {
                    await fs.remove(fullPath);
                    console.log(`   ✅ Removed: ${pattern}`);
                }
            }
            
            // Search and remove by glob
            for (const pattern of filesToSearchAndRemove) {
                const matches = glob.sync(pattern, { cwd: target, absolute: true });
                for (const match of matches) {
                    await fs.remove(match);
                    console.log(`   ✅ Removed: ${path.basename(match)}`);
                }
            }
            
            // Check for any file starting with NEXUS_ in the whole project (shallow search)
            const rootFiles = await fs.readdir(target);
            for (const file of rootFiles) {
                if (file.startsWith('NEXUS_')) {
                    await fs.remove(path.join(target, file));
                    console.log(`   ✅ Removed: ${file}`);
                }
            }

            // Cleanup empty documentation folder
            const docDir = path.join(target, 'documentation');
            if (await fs.pathExists(docDir)) {
                const files = await fs.readdir(docDir);
                if (files.length === 0) {
                    await fs.remove(docDir);
                    console.log(`   ✅ Removed empty documentation folder`);
                }
            }

            console.log(`✨ Cleanup finished for ${target}`);
        } catch (err) {
            console.error(`❌ Cleanup failed for ${target}: ${err.message}`);
        }
    }
}

cleanup();
