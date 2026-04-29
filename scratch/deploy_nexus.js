const fs = require('fs-extra');
const path = require('path');

const targets = [
    'C:\\xampp\\htdocs\\F-Novel',
    'C:\\xampp\\htdocs\\portofolio',
    'C:\\xampp\\htdocs\\talent-umkm-app',
    'C:\\xampp\\htdocs\\php native'
];

const sourceDir = 'C:\\Users\\ACER\\Desktop\\NEXUS AI';
const foldersToCopy = ['agent', 'algorithms', 'design', 'planning', 'skill', 'records', 'summary', 'legal', 'audit', 'knowledge'];
const mainFile = 'ALGORITMA_INTEGRASI.md';

async function deploy() {
    for (const target of targets) {
        console.log(`🚀 Deploying Nexus to: ${target}...`);
        const nexusDir = path.join(target, 'nexus');
        
        try {
            await fs.ensureDir(nexusDir);
            for (const folder of foldersToCopy) {
                const src = path.join(sourceDir, folder);
                const dest = path.join(nexusDir, folder);
                if (await fs.pathExists(src)) {
                    await fs.copy(src, dest, { overwrite: true });
                }
            }
            
            const mainSrc = path.join(sourceDir, mainFile);
            const mainDest = path.join(target, mainFile);
            if (await fs.pathExists(mainSrc)) {
                await fs.copy(mainSrc, mainDest, { overwrite: true });
            }
            
            console.log(`✅ Success for ${target}`);
        } catch (err) {
            console.error(`❌ Failed for ${target}: ${err.message}`);
        }
    }
}

deploy();
