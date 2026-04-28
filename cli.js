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
    const engineCommands = ['run', 'audit', 'skills', 'help'];
    
    if (engineCommands.includes(command) || (args.includes('nexus') && args.includes('run'))) {
        // Remove 'nexus' if present in args (e.g. npx human-ai-nexus nexus run)
        const cleanArgs = args.filter(a => a !== 'nexus');
        const enginePath = path.join(__dirname, 'src', 'index.js');
        
        const child = spawn('node', [enginePath, ...cleanArgs], {
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
    const mainFile = path.join(targetDir, 'ALGORITMA_INTEGRASI.md');

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

        console.log('\x1b[32m%s\x1b[0m', 'Nexus Engine (Brain) berhasil dilepas. Seluruh DOKUMENTASI (Audit, Plan, Knowledge, dll) tetap terjaga untuk tim Anda.');
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', '❌ Gagal melepas Nexus:', err.message);
    }
}

async function install(args) {
    const isForce = args.includes('--force') || args.includes('-f');
    const cleanArgs = args.filter(arg => !arg.startsWith('-'));
    const relativeNexusPath = cleanArgs[0] || 'nexus';
    
    const targetDir = process.cwd();
    const sourceDir = __dirname;
    const nexusPath = path.resolve(targetDir, relativeNexusPath);
    
    console.log('\x1b[36m%s\x1b[0m', '🤖 Menginstall Human-AI Nexus Framework...');

    try {
        if (await fs.pathExists(nexusPath) && !isForce) {
            console.log('\x1b[33m%s\x1b[0m', `⚠️ Folder /${relativeNexusPath} sudah ada. Gunakan --force untuk menimpa.`);
            console.log('Jika ingin menjalankan engine, gunakan: npx human-ai-nexus run');
            process.exit(0);
        }

        await fs.ensureDir(nexusPath);

        const folders = ['agent', 'algorithms', 'design', 'planning', 'skill', 'records', 'summary', 'legal', 'audit', 'knowledge'];
        
        console.log(`📂 Menata folder dokumentasi di ${relativeNexusPath}...`);
        for (const folder of folders) {
            const srcFolder = path.join(sourceDir, folder);
            if (await fs.pathExists(srcFolder)) {
                await fs.copy(srcFolder, path.join(nexusPath, folder));
            }
        }

        // Copy main file if it exists (check algorithms folder too)
        const mainFile = 'ALGORITMA_INTEGRASI.md';
        const possibleSrcs = [
            path.join(sourceDir, mainFile),
            path.join(sourceDir, 'algorithms', mainFile)
        ];
        
        for (const src of possibleSrcs) {
            if (await fs.pathExists(src)) {
                await fs.copy(src, path.join(targetDir, mainFile));
                break;
            }
        }

        console.log('\x1b[32m%s\x1b[0m', '✅ Instalasi Berhasil!');
        console.log(`🚀 Framework terpasang di: ./${relativeNexusPath}`);
        console.log('🚀 Siap berkolaborasi! Jalankan "npx human-ai-nexus run" untuk memulai.');

    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', '❌ Terjadi kesalahan saat instalasi:', err.message);
        process.exit(1);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
