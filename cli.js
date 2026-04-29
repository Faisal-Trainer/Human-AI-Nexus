#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');

/**
 * Main Entry Point for Human-AI Nexus CLI
 */
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    // If command is 'run', 'audit', or 'skills', delegate to Nexus Engine
    const engineCommands = ['run', 'audit', 'skills', 'harvest', 'refactor', 'update-skills', 'help'];

    
    if (engineCommands.includes(command) || (args.includes('nexus') && args.includes('run'))) {
        // Remove 'nexus' if present in args (e.g. npx human-ai-nexus nexus run)
        const cleanArgs = args.filter(a => a !== 'nexus');
        const enginePath = path.join(__dirname, 'src', 'index.js');
        
        const child = spawn('node', [`"${enginePath}"`, ...cleanArgs], {
            stdio: 'inherit',
            shell: true
        });

        child.on('exit', (code) => process.exit(code));
        return;
    }

    if (command === 'dell' || command === 'uninstall') {
        await uninstall(args);
        return;
    }

    // Default to installation logic
    await install(args);
}

async function uninstall(args) {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const cleanArgs = args.filter(arg => !arg.startsWith('-') && arg !== 'dell' && arg !== 'uninstall');
    const relativeNexusPath = cleanArgs[0] || 'nexus';
    const targetDir = process.cwd();
    const nexusPath = path.resolve(targetDir, relativeNexusPath);

    console.log('\x1b[31m%s\x1b[0m', `⚠️ PERINGATAN: Anda akan menghapus Nexus Framework dari ./${relativeNexusPath}`);
    
    const confirm = await new Promise(resolve => {
        rl.question('Apakah Anda yakin ingin melanjutkan? (y/N): ', answer => {
            rl.close();
            resolve(answer.toLowerCase() === 'y');
        });
    });

    if (!confirm) {
        console.log('Uninstall dibatalkan.');
        return;
    }

    try {
        const brainFolders = ['agent', 'skill'];
        
        if (await fs.pathExists(nexusPath)) {
            console.log(`🧹 Membersihkan komponen Engine dari ${relativeNexusPath}...`);
            
            for (const folder of brainFolders) {
                const folderPath = path.join(nexusPath, folder);
                if (await fs.pathExists(folderPath)) {
                    await fs.remove(folderPath);
                    console.log(`   ✅ Folder Brain ./${relativeNexusPath}/${folder} telah dihapus.`);
                }
            }
        }

        console.log('\x1b[32m%s\x1b[0m', 'Nexus Engine (Brain) berhasil dilepas. Seluruh DOKUMENTASI tetap terjaga untuk tim Anda.');
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', '❌ Gagal melepas Nexus:', err.message);
    }
}

async function install(args) {
    const isForce = args.includes('--force') || args.includes('-f');
    const cleanArgs = args.filter(arg => !arg.startsWith('-'));
    const relativeNexusPath = cleanArgs[0] || 'nexus';
    const docPathName = 'documentation';
    
    const targetDir = process.cwd();
    const sourceDir = __dirname;
    const nexusPath = path.resolve(targetDir, relativeNexusPath);
    const docPath = path.resolve(targetDir, docPathName);
    
    console.log('\x1b[36m%s\x1b[0m', '🤖 Menginstall Human-AI Nexus Framework (External Deployment)...');

    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const ask = (q) => new Promise(res => rl.question(q, res));

    try {
        // 1. Brain Installation (Agent & Skill Eksternal)
        if (await fs.pathExists(nexusPath) && !isForce) {
            console.log('\x1b[33m%s\x1b[0m', `⚠️ Folder Brain /${relativeNexusPath} sudah ada. Gunakan --force untuk menimpa.`);
        } else {
            const confirmBrain = await ask(`Pasang Brain (Agent & Skill Eksternal) di ./${relativeNexusPath}? (y/N): `);
            if (confirmBrain.toLowerCase() === 'y') {
                await fs.ensureDir(nexusPath);
                
                // Hanya copy folder eksternal
                const brainTargets = [
                    { src: 'agent/external', dest: 'agent/external' },
                    { src: 'skill/external', dest: 'skill/external' }
                ];

                for (const target of brainTargets) {
                    const src = path.join(sourceDir, target.src);
                    const dest = path.join(nexusPath, target.dest);
                    if (await fs.pathExists(src)) {
                        await fs.copy(src, dest);
                        console.log(`   ✅ Brain Component: ${target.dest} terpasang.`);
                    }
                }
            }
        }

        // 2. Documentation Folder Creation/Sync
        if (await fs.pathExists(docPath)) {
            const confirmSync = await ask(`⚠️ Folder /${docPathName} sudah ada. Izinkan sinkronisasi standar dokumentasi? (y/N): `);
            if (confirmSync.toLowerCase() === 'y') {
                await setupDocFolders(docPath);
                console.log(`   ✅ Folder /${docPathName} telah disinkronkan.`);
            }
        } else {
            const confirmDoc = await ask(`Buat folder /${docPathName} untuk output tim eksternal? (y/N): `);
            if (confirmDoc.toLowerCase() === 'y') {
                await fs.ensureDir(docPath);
                await setupDocFolders(docPath);
                console.log(`   ✅ Folder /${docPathName} telah dibuat.`);
            }
        }

        // 3. Root Files
        const mainFile = 'ALGORITMA_INTEGRASI.md';
        const mainSrc = path.join(sourceDir, 'algorithms', mainFile);
        if (await fs.pathExists(mainSrc)) {
            await fs.copy(mainSrc, path.join(targetDir, mainFile));
        }

        console.log('\x1b[32m%s\x1b[0m', '\n✅ Instalasi Berhasil!');
        console.log(`🚀 Brain: ./${relativeNexusPath} | Docs: ./${docPathName}`);
        console.log('🚀 Jalankan "nexus run" untuk memulai.');

    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', '❌ Terjadi kesalahan:', err.message);
    } finally {
        rl.close();
    }
}

async function setupDocFolders(basePath) {
    const subfolders = ['summary', 'algorithms', 'audit', 'knowledge', 'planning', 'records'];
    for (const folder of subfolders) {
        await fs.ensureDir(path.join(basePath, folder));
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
