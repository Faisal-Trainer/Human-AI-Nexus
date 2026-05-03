#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const chalk = require('chalk');

/**
 * Main Entry Point for Human-AI Nexus CLI
 */
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    // If command is 'run', 'audit', or 'skills', delegate to Nexus Engine
    const engineCommands = ['run', 'audit', 'skills', 'harvest', 'refactor', 'update-skills', 'distill', 'help'];
    
    if (engineCommands.includes(command) || (args.includes('nexus') && args.includes('run'))) {
        const cleanArgs = args.filter(a => a !== 'nexus');
        const enginePath = path.join(__dirname, 'agent', 'main.js');
        
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

    if (command === 'update') {
        await updateEngine(args);
        return;
    }

    // Default to installation logic
    await install(args);
}

async function updateEngine(args) {
    const targetFlag = args.includes('--target') ? args[args.indexOf('--target') + 1] : (args.includes('-t') ? args[args.indexOf('-t') + 1] : null);
    const targetDir = targetFlag ? path.resolve(process.cwd(), targetFlag) : process.cwd();
    
    console.log(chalk.cyan(`🔄 Updating Nexus Engine in ${targetDir}...`));

    try {
        const components = [
            { src: 'agent/prompts/external', dest: 'agent/prompts/external' },
            { src: 'agent/workflows/external', dest: 'agent/workflows/external' },
            { src: 'agent/core', dest: 'agent/core' },
            { src: 'agent/tools', dest: 'agent/tools' }
        ];

        for (const item of components) {
            const src = path.join(__dirname, item.src);
            const dest = path.join(targetDir, item.dest);
            if (await fs.pathExists(src)) {
                await fs.copy(src, dest, { overwrite: true });
                console.log(chalk.green(`   ✅ Updated: ${item.dest}`));
            }
        }

        console.log(chalk.bold.green('\n✨ Update Complete! Nexus Engine components are now in sync.'));
    } catch (err) {
        console.error(chalk.red('❌ Update failed:'), err.message);
    }
}

async function uninstall(args) {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const isYes = args.includes('--yes') || args.includes('-y');
    const targetFlag = args.includes('--target') ? args[args.indexOf('--target') + 1] : (args.includes('-t') ? args[args.indexOf('-t') + 1] : null);
    const targetDir = targetFlag ? path.resolve(process.cwd(), targetFlag) : process.cwd();

    console.log(chalk.red.bold(`⚠️ PERINGATAN: Anda akan menghapus folder 'agent/' dari ${targetDir}`));
    
    const confirm = isYes ? true : await new Promise(resolve => {
        rl.question('Apakah Anda yakin ingin melanjutkan? (y/N): ', answer => {
            rl.close();
            resolve(answer.toLowerCase() === 'y');
        });
    });

    if (!confirm) {
        if (!isYes) rl.close();
        console.log('Uninstall dibatalkan.');
        return;
    }

    try {
        const agentPath = path.join(targetDir, 'agent');
        if (await fs.pathExists(agentPath)) {
            await fs.remove(agentPath);
            console.log(chalk.green(`   ✅ Folder 'agent/' telah dihapus.`));
        }

        console.log(chalk.green.bold('Nexus Engine (Brain) berhasil dilepas.'));
    } catch (err) {
        console.error(chalk.red('❌ Gagal melepas Nexus:'), err.message);
    }
}

async function install(args) {
    const isForce = args.includes('--force') || args.includes('-f');
    const isYes = args.includes('--yes') || args.includes('-y');
    const targetFlag = args.includes('--target') ? args[args.indexOf('--target') + 1] : (args.includes('-t') ? args[args.indexOf('-t') + 1] : null);
    const targetDir = targetFlag ? path.resolve(process.cwd(), targetFlag) : process.cwd();
    
    const sourceDir = __dirname;
    const agentPath = path.join(targetDir, 'agent');
    const memPath = path.join(targetDir, 'memory');
    const docPath = path.join(targetDir, 'documentation');
    
    console.log(chalk.cyan.bold(`🤖 Menginstall Nexus Framework ke: ${targetDir}`));

    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const ask = (q) => isYes ? Promise.resolve('y') : new Promise(res => rl.question(q, res));

    try {
        // 1. Brain Installation (agent/)
        if (await fs.pathExists(agentPath) && !isForce) {
            console.log(chalk.yellow(`⚠️ Folder /agent sudah ada. Gunakan "nexus update" untuk sinkronisasi.`));
        } else {
            const confirmBrain = await ask(`Pasang Brain (Agent Core & Tools) di ./agent? (y/N): `);
            if (confirmBrain.toLowerCase() === 'y') {
                await fs.ensureDir(agentPath);
                
                const components = [
                    { src: 'agent/core', dest: 'core' },
                    { src: 'agent/tools', dest: 'tools' },
                    { src: 'agent/prompts/external', dest: 'prompts/external' },
                    { src: 'agent/workflows/external', dest: 'workflows/external' },
                    { src: 'agent/main.js', dest: 'main.js' }
                ];

                for (const item of components) {
                    const src = path.join(sourceDir, item.src);
                    const dest = path.join(agentPath, item.dest);
                    if (await fs.pathExists(src)) {
                        await fs.copy(src, dest);
                        console.log(chalk.green(`   ✅ Brain Component: ${item.dest} terpasang.`));
                    }
                }
            }
        }

        // 2. Memory Installation (memory/)
        if (!await fs.pathExists(memPath)) {
            const confirmMem = await ask(`Buat folder /memory untuk penyimpanan pengetahuan? (y/N): `);
            if (confirmMem.toLowerCase() === 'y') {
                await fs.ensureDir(path.join(memPath, 'long_term'));
                await fs.ensureDir(path.join(memPath, 'short_term'));
                console.log(chalk.green(`   ✅ Folder /memory (long_term & short_term) telah dibuat.`));
            }
        }

        // 3. Documentation Folder Creation
        if (await fs.pathExists(docPath)) {
            const confirmSync = await ask(`⚠️ Folder /documentation sudah ada. Sinkronkan struktur standar? (y/N): `);
            if (confirmSync.toLowerCase() === 'y') {
                await setupDocFolders(docPath);
            }
        } else {
            const confirmDoc = await ask(`Buat folder /documentation sebagai HUB utama? (y/N): `);
            if (confirmDoc.toLowerCase() === 'y') {
                await fs.ensureDir(docPath);
                await setupDocFolders(docPath);
                console.log(chalk.green(`   ✅ Folder /documentation telah dibuat.`));
            }
        }

        // 4. Root Files
        const algoFile = 'ALGORITMA_INTEGRASI.md';
        const algoSrc = path.join(sourceDir, 'documentation', 'algorithms', algoFile);
        if (await fs.pathExists(algoSrc)) {
            await fs.copy(algoSrc, path.join(targetDir, algoFile));
            console.log(chalk.green(`   ✅ File ${algoFile} terpasang di root.`));
        }

        console.log(chalk.green.bold('\n✅ Instalasi Berhasil!'));
        console.log(chalk.cyan(`🚀 Structure: /agent, /memory, /documentation`));
        console.log('🚀 Jalankan "nexus run" untuk memulai kolaborasi.');

    } catch (err) {
        console.error(chalk.red('❌ Terjadi kesalahan:'), err.message);
    } finally {
        rl.close();
    }
}

async function setupDocFolders(basePath) {
    const subfolders = ['summary', 'algorithms', 'audit', 'knowledge', 'planning', 'records', 'legal', 'docs'];
    for (const folder of subfolders) {
        await fs.ensureDir(path.join(basePath, folder));
    }
    console.log(chalk.green(`   ✅ Struktur /documentation telah diperbarui.`));
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
