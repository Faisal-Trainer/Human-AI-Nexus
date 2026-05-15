// tests/TDD/sandbox-master-runner.js
// NEXUS SANDBOX MASTER RUNNER
// Menjalankan seluruh 3 section secara otomatis dan berurutan.
// Penggunaan:
//   node tests/TDD/sandbox-master-runner.js             — semua section
//   node tests/TDD/sandbox-master-runner.js --section 1 — hanya section 1
//   node tests/TDD/sandbox-master-runner.js --section 2 — hanya section 2
//   node tests/TDD/sandbox-master-runner.js --section 3 — hanya section 3
//   node tests/TDD/sandbox-master-runner.js --distill   — distill setelah semua selesai

const { spawn } = require('child_process');
const path = require('path');
const NexusEngine = require('../../agent/core/NexusEngine');

const TDD_DIR   = __dirname;
const ROOT_PATH = path.join(__dirname, '..', '..');

const SECTIONS = [
    { id: 1, file: 'phase1_testing.js',  label: 'Section 1 — Fundamental CRUD & Auth (9 projects)' },
    { id: 2, file: 'setup_section2.js',  label: 'Section 2 — Dashboard & Admin Panel (10 projects)' },
    { id: 3, file: 'setup_section3.js',  label: 'Section 3 — Security & Realtime (11 projects)' },
    { id: 4, file: 'setup_dynamic_section.js', args: ['4'], label: 'Section 4 — Realtime & Livewire Intensive (10 projects)' },
    { id: 5, file: 'setup_dynamic_section.js', args: ['5'], label: 'Section 5 — SaaS-Oriented Projects (10 projects)' },
    { id: 6, file: 'setup_dynamic_section.js', args: ['6'], label: 'Section 6 — E-Commerce Systems (10 projects)' },
    { id: 7, file: 'setup_dynamic_section.js', args: ['7'], label: 'Section 7 — Advanced Livewire Components (10 projects)' },
    { id: 8, file: 'setup_dynamic_section.js', args: ['8'], label: 'Section 8 — API & Integration Heavy (10 projects)' },
    { id: 9, file: 'setup_dynamic_section.js', args: ['9'], label: 'Section 9 — Enterprise-Level Architectures (10 projects)' },
    { id: 10, file: 'setup_dynamic_section.js', args: ['10'], label: 'Section 10 — Expert-Level TALL Stack Challenges (10 projects)' },
];

// ── Parse args
const args      = process.argv.slice(2);
const sectionArg = args.includes('--section') ? parseInt(args[args.indexOf('--section') + 1]) : null;
const doDistill  = args.includes('--distill');

// ── Run a section script as a child process
function runSection(section) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(TDD_DIR, section.file);
        console.log(`\n${'═'.repeat(60)}`);
        console.log(`🚀 Section ${section.id}: ${section.label}`);
        console.log(`${'═'.repeat(60)}`);

        const childArgs = section.args ? [filePath, ...section.args] : [filePath];
        const child = spawn('node', childArgs, { stdio: 'inherit', shell: false });

        child.on('exit', code => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Section ${section.id} exited with code ${code}`));
            }
        });

        child.on('error', err => reject(err));
    });
}

function ask(question) {
    const readline = require('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(res => {
        rl.question(question, (answer) => {
            rl.close();
            res(answer);
        });
    });
}

async function main() {
    const startTime = Date.now();

    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║   🤖 NEXUS SANDBOX MASTER RUNNER                         ║');
    console.log('║   100 Sandboxes | 10 Sections | Full Autonomous Pipeline ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    console.log(`   Started at: ${new Date().toLocaleString()}\n`);

    // Pilih section yang akan dijalankan
    const sectionsToRun = sectionArg
        ? SECTIONS.filter(s => s.id === sectionArg)
        : SECTIONS;

    if (sectionsToRun.length === 0) {
        console.error(`❌ Section ${sectionArg} tidak ditemukan. Pilih 1-10.`);
        process.exit(1);
    }

    const results = { success: [], failed: [] };

    for (const section of sectionsToRun) {
        try {
            await runSection(section);
            results.success.push(section.label);
        } catch (err) {
            console.error(`\x1b[31m\n❌ GAGAL: ${section.label}\x1b[0m`);
            console.error(`   Reason: ${err.message}`);
            results.failed.push(section.label);
        }
    }

    // ── Distill knowledge ke HUB kalau flag --distill aktif
    if (doDistill) {
        const fs = require('fs-extra');
        const hubPath = path.join(ROOT_PATH, 'memory', 'distilled');
        const existingFiles = await fs.readdir(hubPath).catch(() => []);
        
        if (existingFiles.length > 0) {
            console.log(`\n\x1b[33m⚠️  Knowledge HUB saat ini berisi ${existingFiles.length} file.\x1b[0m`);
            console.log(`   Flag --distill akan MENIMPA sebagian file tersebut.\n`);

            if (!args.includes('--yes') && !args.includes('-y')) {
                const confirm = await ask('Lanjutkan distill ke HUB? (y/n): ');
                if (confirm.toLowerCase() !== 'y') {
                    console.log('🚫 Distill dibatalkan.');
                    process.exit(0);
                }
            }
        }

        console.log(`\n${'═'.repeat(60)}`);
        console.log(`🧠 Menjalankan Distilasi Knowledge ke HUB...`);
        console.log(`${'═'.repeat(60)}`);
        try {
            const engine = new NexusEngine({ rootPath: ROOT_PATH });
            await engine.distill();
            console.log(`✅ Distilasi selesai. Wisdom tersimpan di memory/distilled/`);
        } catch (e) {
            console.error(`❌ Distilasi gagal: ${e.message}`);
        }
    }

    // ── Final Report
    const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`📊 MASTER RUNNER — LAPORAN AKHIR`);
    console.log(`${'═'.repeat(60)}`);
    console.log(`   ✅ Berhasil : ${results.success.length} section`);
    results.success.forEach(l => console.log(`      • ${l}`));
    if (results.failed.length > 0) {
        console.log(`   ❌ Gagal   : ${results.failed.length} section`);
        results.failed.forEach(l => console.log(`      • ${l}`));
    }
    console.log(`   ⏱️  Total waktu: ${elapsed} menit`);
    console.log(`${'═'.repeat(60)}\n`);

    if (results.failed.length > 0) process.exit(1);
}

main().catch(err => {
    console.error('❌ Fatal error:', err);
    process.exit(1);
});
