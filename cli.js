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
    const engineCommands = ['run', 'audit', 'skills', 'harvest', 'refactor', 'update-skills', 'distill', 'forge', 'help'];
    
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
    const nexusPath = path.join(targetDir, 'nexus');
    
    console.log(chalk.cyan(`🔄 Updating Nexus Brain (External) in ${nexusPath}...`));

    try {
        const components = [
            { src: 'agent/prompts/external', dest: 'agent/prompts' },
            { src: 'agent/workflows/external', dest: 'agent/workflows' },
            { src: 'workflow', dest: 'workflow' }
        ];

        for (const item of components) {
            const src = path.join(__dirname, item.src);
            const dest = path.join(nexusPath, item.dest);
            if (await fs.pathExists(src)) {
                await fs.copy(src, dest, { overwrite: true });
                console.log(chalk.green(`   ✅ Updated: ${item.dest}`));
            }
        }

        console.log(chalk.bold.green('\n✨ Update Complete! External prompts and workflows are in sync.'));
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
    const nexusPath = path.join(targetDir, 'nexus');

    console.log(chalk.red.bold(`⚠️ PERINGATAN: Anda akan menghapus folder 'nexus/' dari ${targetDir}`));
    
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
        if (await fs.pathExists(nexusPath)) {
            console.log(chalk.yellow(`\n🚀 Memulai Safe Uninstall...`));
            
            // Safe Uninstall: Delete everything except documentation
            const items = await fs.readdir(nexusPath);
            for (const item of items) {
                if (item !== 'documentation') {
                    await fs.remove(path.join(nexusPath, item));
                    console.log(chalk.gray(`   🗑️ Deleted: nexus/${item}`));
                }
            }
            
            console.log(chalk.green(`   ✅ Nexus Engine & Memory telah dihapus.`));
            console.log(chalk.cyan(`   ℹ️ Folder 'nexus/documentation/' tetap dipertahankan untuk riwayat audit.`));
        }

        console.log(chalk.green.bold('\n✨ Nexus components berhasil dilepas (Dokumentasi Aman).'));
    } catch (err) {
        console.error(chalk.red('❌ Gagal melepas Nexus:'), err.message);
    }
}

async function install(args) {
    const isForce = args.includes('--force') || args.includes('-f');
    const isYes = args.includes('--yes') || args.includes('-y');
    const targetFlag = args.includes('--target') ? args[args.indexOf('--target') + 1] : (args.includes('-t') ? args[args.indexOf('-t') + 1] : null);
    const targetDir = targetFlag ? path.resolve(process.cwd(), targetFlag) : process.cwd();
    
    const nexusBaseName = 'nexus';
    const nexusPath = path.join(targetDir, nexusBaseName);
    const sourceDir = __dirname;
    
    const agentPath = path.join(nexusPath, 'agent');
    const memPath = path.join(nexusPath, 'memory');
    const docPath = path.join(nexusPath, 'documentation');
    
    console.log(chalk.cyan.bold(`🤖 Menginstall Nexus External Brain ke: ${nexusPath}`));

    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const ask = (q) => isYes ? Promise.resolve('y') : new Promise(res => rl.question(q, res));

    try {
        await fs.ensureDir(nexusPath);

        // Security Hardening: Auto-Gitignore
        await updateGitignore(targetDir);

        // Security Hardening: Access Protection (.htaccess)
        const htaccessPath = path.join(nexusPath, '.htaccess');
        if (!await fs.pathExists(htaccessPath)) {
            await fs.writeFile(htaccessPath, 'Deny from all');
            console.log(chalk.green(`   ✅ Security: Access Protection (.htaccess) terpasang.`));
        }

        // 1. External Brain Installation (agent/)
        if (await fs.pathExists(agentPath) && !isForce) {
            console.log(chalk.yellow(`⚠️ Folder /agent sudah ada di dalam ${nexusBaseName}.`));
        } else {
            const confirmBrain = await ask(`Pasang Brain (External Prompts & Workflows) di ./${nexusBaseName}/agent? (y/N): `);
            if (confirmBrain.toLowerCase() === 'y') {
                await fs.ensureDir(agentPath);
                
                const components = [
                    { src: 'agent/prompts/external', dest: 'prompts' },
                    { src: 'agent/workflows/external', dest: 'workflows' }
                ];

                for (const item of components) {
                    const src = path.join(sourceDir, item.src);
                    const dest = path.join(agentPath, item.dest);
                    if (await fs.pathExists(src)) {
                        await fs.copy(src, dest);
                        console.log(chalk.green(`   ✅ External Brain: ${item.dest} terpasang.`));
                    }
                }
            }
        }

        // 1.1 Workflow/Skill Installation
        const workflowDest = path.join(nexusPath, 'workflow');
        if (await fs.pathExists(workflowDest) && !isForce) {
            console.log(chalk.yellow(`⚠️ Folder /workflow sudah ada.`));
        } else {
            const confirmSkill = await ask(`Pasang Workflow/Skillset (Wisdom HUB) di ./${nexusBaseName}/workflow? (y/N): `);
            if (confirmSkill.toLowerCase() === 'y') {
                const src = path.join(sourceDir, 'workflow');
                if (await fs.pathExists(src)) {
                    await fs.copy(src, workflowDest);
                    console.log(chalk.green(`   ✅ Workflow/Skillset: Berhasil dipasang.`));
                }
            }
        }

        // 2. Memory Installation (memory/)
        if (!await fs.pathExists(memPath)) {
            const confirmMem = await ask(`Buat folder /memory di dalam ${nexusBaseName}? (y/N): `);
            if (confirmMem.toLowerCase() === 'y') {
                await fs.ensureDir(path.join(memPath, 'raw'));
                await fs.ensureDir(path.join(memPath, 'normalized'));
                await fs.ensureDir(path.join(memPath, 'semantic'));
                await fs.ensureDir(path.join(memPath, 'distilled'));
                await fs.ensureDir(path.join(memPath, 'operational'));
                await fs.ensureDir(path.join(memPath, 'archived'));
                console.log(chalk.green(`   ✅ Folder /memory telah dibuat (Multi-Agent Standard).`));
            }
        }

        // 2.5 Logs Installation (logs/)
        const logsPath = path.join(nexusPath, 'logs');
        if (!await fs.pathExists(logsPath)) {
            await fs.ensureDir(path.join(logsPath, 'agents'));
            await fs.ensureDir(path.join(logsPath, 'orchestration'));
            await fs.ensureDir(path.join(logsPath, 'memory'));
            await fs.ensureDir(path.join(logsPath, 'scanners'));
            await fs.ensureDir(path.join(logsPath, 'plugins'));
            await fs.ensureDir(path.join(logsPath, 'errors'));
            console.log(chalk.green(`   ✅ Folder /logs telah dibuat untuk Observability.`));
        }

        // 3. Documentation Folder Creation
        if (await fs.pathExists(docPath)) {
            const confirmSync = await ask(`⚠️ Folder /documentation sudah ada. Sinkronkan struktur standar? (y/N): `);
            if (confirmSync.toLowerCase() === 'y') {
                await setupDocFolders(docPath);
            }
        } else {
            const confirmDoc = await ask(`Buat folder /documentation di dalam ${nexusBaseName}? (y/N): `);
            if (confirmDoc.toLowerCase() === 'y') {
                await fs.ensureDir(docPath);
                await setupDocFolders(docPath);
                console.log(chalk.green(`   ✅ Folder /documentation telah dibuat.`));
            }
        }

        // 4. Documentation & Guideline Files
        const readmeFile = 'README.md';
        const algoFile = 'ALGORITMA_INTEGRASI.md';
        
        // Copy to project root (for visibility)
        const algoSrc = path.join(sourceDir, 'documentation', 'algorithms', algoFile);
        if (await fs.pathExists(algoSrc)) {
            await fs.copy(algoSrc, path.join(targetDir, algoFile));
            console.log(chalk.green(`   ✅ File ${algoFile} terpasang di root proyek.`));
        }

        // Copy to nexus/ folder (for self-contained structure)
        const readmeSrc = path.join(sourceDir, readmeFile);
        if (await fs.pathExists(readmeSrc)) {
            await fs.copy(readmeSrc, path.join(nexusPath, readmeFile));
            console.log(chalk.green(`   ✅ File ${readmeFile} terpasang di dalam folder nexus.`));
        }
        if (await fs.pathExists(algoSrc)) {
            await fs.copy(algoSrc, path.join(nexusPath, algoFile));
            console.log(chalk.green(`   ✅ File ${algoFile} terpasang di dalam folder nexus.`));
        }

        console.log(chalk.green.bold('\n✅ Instalasi Berhasil!'));
        console.log(chalk.cyan(`🚀 Seluruh komponen disatukan dalam folder: ./${nexusBaseName}/`));
        console.log('🚀 Jalankan "nexus run" untuk memulai.');

    } catch (err) {
        console.error(chalk.red('❌ Terjadi kesalahan:'), err.message);
    } finally {
        rl.close();
    }
}

async function setupDocFolders(basePath) {
    const subfolders = ['algorithms', 'audit', 'planning', 'records', 'summary'];
    for (const folder of subfolders) {
        await fs.ensureDir(path.join(basePath, folder));
    }
    console.log(chalk.green(`   ✅ Struktur /documentation telah diperbarui (Lean Mode).`));
}

async function updateGitignore(targetDir) {
    const gitignorePath = path.join(targetDir, '.gitignore');
    const entry = '\n# Human-AI Nexus\nnexus/\n';

    try {
        if (await fs.pathExists(gitignorePath)) {
            const content = await fs.readFile(gitignorePath, 'utf8');
            if (!content.includes('nexus/')) {
                await fs.appendFile(gitignorePath, entry);
                console.log(chalk.green('   ✅ Security: "nexus/" telah ditambahkan ke .gitignore.'));
            }
        } else {
            await fs.writeFile(gitignorePath, entry);
            console.log(chalk.green('   ✅ Security: File .gitignore baru dibuat dengan entri "nexus/".'));
        }
    } catch (err) {
        console.warn(chalk.yellow('   ⚠️ Warning: Gagal memperbarui .gitignore.'));
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
