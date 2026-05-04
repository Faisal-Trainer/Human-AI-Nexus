const fs = require('fs-extra');
const path = require('path');

async function renameReferences() {
    const rootPath = process.cwd();
    const targets = [
        path.join(rootPath, 'workflow'),
        path.join(rootPath, 'memory'),
        path.join(rootPath, 'agent', 'prompts'),
        path.join(rootPath, 'README.md')
    ];

    console.log('🔄 Renaming all "F-Novel" references to "NEXUS LORE"...');

    for (const target of targets) {
        if (!(await fs.pathExists(target))) continue;

        if ((await fs.stat(target)).isFile()) {
            await replaceInFile(target);
        } else {
            await processDirectory(target);
        }
    }

    console.log('✅ Global Rename Complete.');
}

async function processDirectory(dir) {
    const files = await fs.readdir(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (file.endsWith('.md') || file.endsWith('.MD') || file.endsWith('.js') || file.endsWith('.json')) {
            await replaceInFile(fullPath);
        }
    }
}

async function replaceInFile(filePath) {
    let content = await fs.readFile(filePath, 'utf8');
    const original = content;

    // Handle variations
    content = content.replace(/F-Novel/g, 'NEXUS LORE');
    content = content.replace(/f-novel/g, 'nexus lore');

    if (content !== original) {
        await fs.writeFile(filePath, content);
        console.log(`   ✨ Updated: ${path.relative(process.cwd(), filePath)}`);
    }
}

renameReferences().catch(err => console.error(err));
