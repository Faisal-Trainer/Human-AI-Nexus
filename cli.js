#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// TODO: Implement multi-platform folder support
// TODO: Add progress bar for copy operation

async function install() {
    // Ambil argumen target directory jika ada, default ke 'nexus'
    const args = process.argv.slice(2);
    const relativeNexusPath = args[0] || 'nexus';
    
    const targetDir = process.cwd();
    const sourceDir = __dirname;
    const nexusPath = path.resolve(targetDir, relativeNexusPath);
    
    console.log('\x1b[36m%s\x1b[0m', '🤖 Menginstall Human-AI Nexus Framework...');

    try {
        // 1. Cek apakah folder target sudah ada
        if (await fs.pathExists(nexusPath)) {
            console.log('\x1b[33m%s\x1b[0m', `⚠️ Folder /${relativeNexusPath} sudah ada. Instalasi dibatalkan.`);
            process.exit(0);
        }

        // 2. Buat folder nexus
        await fs.ensureDir(nexusPath);

        // 3. Daftar folder framework yang akan disalin
        const folders = ['agent', 'algorithms', 'design', 'planning', 'skill', 'records', 'summary', 'legal', 'audit'];
        
        console.log(`📂 Menata folder dokumentasi di ${relativeNexusPath}...`);
        for (const folder of folders) {
            const srcFolder = path.join(sourceDir, folder);
            if (await fs.pathExists(srcFolder)) {
                await fs.copy(srcFolder, path.join(nexusPath, folder));
            }
        }

        // 4. Salin file utama
        const mainFile = 'ALGORITMA_INTEGRASI.md';
        const srcFile = path.join(sourceDir, mainFile);
        const targetFile = path.join(targetDir, mainFile);
        
        if (await fs.pathExists(srcFile) && srcFile !== targetFile) {
            // Letakkan ALGORITMA_INTEGRASI.md di root targetDir
            await fs.copy(srcFile, targetFile);
        }

        console.log('\x1b[32m%s\x1b[0m', '✅ Instalasi Berhasil!');
        console.log(`🚀 Framework terpasang di: ./${relativeNexusPath}`);
        console.log('💡 Tip: Jika ingin memasang di tempat lain, gunakan: npx human-ai-nexus <path>');
        console.log('🚀 Siap berkolaborasi dengan AI! Silakan baca ALGORITMA_INTEGRASI.md untuk memulai.');

    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', '❌ Terjadi kesalahan saat instalasi:', err.message);
        process.exit(1);
    }
}

install();
