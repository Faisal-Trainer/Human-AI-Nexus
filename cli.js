#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function install() {
    const targetDir = process.cwd();
    const sourceDir = __dirname;
    
    console.log('\x1b[36m%s\x1b[0m', '🤖 Menginstall Human-AI Nexus Framework via NPX...');

    try {
        // 1. Cek apakah folder docs sudah ada
        const docsPath = path.join(targetDir, 'docs');
        if (await fs.pathExists(docsPath)) {
            console.log('\x1b[33m%s\x1b[0m', '⚠️ Folder /docs sudah ada. Instalasi dibatalkan.');
            process.exit(0);
        }

        // 2. Buat folder docs
        await fs.ensureDir(docsPath);

        // 3. Daftar folder framework yang akan disalin
        const folders = ['agent', 'algorithms', 'design', 'planning', 'skill', 'records', 'summary', 'legal'];
        
        console.log('📂 Menata folder dokumentasi...');
        for (const folder of folders) {
            const srcFolder = path.join(sourceDir, folder);
            if (await fs.pathExists(srcFolder)) {
                await fs.copy(srcFolder, path.join(docsPath, folder));
            }
        }

        // 4. Salin file utama
        const mainFile = 'ALGORITMA_INTEGRASI.md';
        const srcFile = path.join(sourceDir, mainFile);
        if (await fs.pathExists(srcFile)) {
            await fs.copy(srcFile, path.join(targetDir, mainFile));
        }

        console.log('\x1b[32m%s\x1b[0m', '✅ Instalasi Berhasil!');
        console.log('🚀 Siap berkolaborasi dengan AI! Silakan baca ALGORITMA_INTEGRASI.md untuk memulai.');

    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', '❌ Terjadi kesalahan saat instalasi:', err.message);
        process.exit(1);
    }
}

install();
