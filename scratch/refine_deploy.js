const fs = require('fs-extra');
const path = require('path');

const targets = [
    'C:\\xampp\\htdocs\\F-Novel',
    'C:\\xampp\\htdocs\\portofolio',
    'C:\\xampp\\htdocs\\talent-umkm-app',
    'C:\\xampp\\htdocs\\php native',
    'C:\\xampp\\htdocs\\public_html'
];

const sourceDir = 'C:\\Users\\ACER\\Desktop\\NEXUS AI';

async function deploy() {
    for (const target of targets) {
        console.log(`🚀 Refining Nexus Deployment for: ${target}...`);
        
        const nexusDir = path.join(target, 'nexus');
        const docDir = path.join(target, 'documentation');
        
        try {
            // 1. Brain: Hanya agent/external dan skill/external
            await fs.remove(nexusDir); // Clean old install
            await fs.ensureDir(path.join(nexusDir, 'agent/external'));
            await fs.ensureDir(path.join(nexusDir, 'skill/external'));
            
            await fs.copy(path.join(sourceDir, 'agent/external'), path.join(nexusDir, 'agent/external'));
            await fs.copy(path.join(sourceDir, 'skill/external'), path.join(nexusDir, 'skill/external'));
            
            // 2. Documentation: Create standard folders
            const subfolders = ['summary', 'algorithms', 'audit', 'knowledge', 'planning', 'records'];
            for (const folder of subfolders) {
                await fs.ensureDir(path.join(docDir, folder));
            }

            // Move old knowledge/planning if they were in nexus/
            // (Assuming they were just created in the previous step)
            
            console.log(`✅ Success for ${target}`);
        } catch (err) {
            console.error(`❌ Failed for ${target}: ${err.message}`);
        }
    }
}

deploy();
