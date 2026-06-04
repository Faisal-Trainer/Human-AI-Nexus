// tests/TDD/phase1_testing.js
// Section 1 — Fundamental CRUD & Auth (10 projects)
// Pipeline: Fresh Laravel Install → Configure → Blueprint → Migrate → Nexus Cycle → Harvest
// v3.0: Menggunakan SandboxProjectSetup shared module + Laravel murni dari composer

const fs = require('fs-extra');
const path = require('path');
const NexusEngine = require('../../agent/core/NexusEngine');
const EvolutionPiper = require('../../agent/core/EvolutionPiper');
const SandboxProjectSetup = require('./SandboxProjectSetup');

const SANDBOXES_DIR = path.join(__dirname, '..', 'sandboxes');
const ROOT_PATH     = path.join(__dirname, '..', '..');

const PHASE_1_PROJECTS = [
    { name: 'url-shortener-app',   tags: ['crud', 'auth', 'routing',  'phase-1'] },
    { name: 'todo-app-realtime',   tags: ['crud', 'auth', 'realtime', 'phase-1'] },
    { name: 'notes-app-tagging',   tags: ['crud', 'auth', 'tagging',  'phase-1'] },
    { name: 'bookmark-manager',    tags: ['crud', 'auth', 'basic',    'phase-1'] },
    { name: 'habit-tracker',       tags: ['crud', 'auth', 'basic',    'phase-1'] },
    { name: 'expense-tracker',     tags: ['crud', 'auth', 'finance',  'phase-1'] },
    { name: 'daily-journal',       tags: ['crud', 'auth', 'basic',    'phase-1'] },
    { name: 'contact-manager',     tags: ['crud', 'auth', 'basic',    'phase-1'] },
    { name: 'password-manager-ui', tags: ['crud', 'auth', 'security', 'phase-1'] },
    { name: 'personal-portfolio',  tags: ['crud', 'auth', 'basic',    'phase-1'] },
];

async function runPhase1() {
    console.log('\n╔══════════════════════════════════════════════════════╗');
    console.log('║  🚀 NEXUS — Section 1: Fundamental CRUD & Auth       ║');
    console.log('║  10 Projects | Fresh Laravel | Autonomous Pipeline    ║');
    console.log('╚══════════════════════════════════════════════════════╝\n');

    const setup = new SandboxProjectSetup(ROOT_PATH, SANDBOXES_DIR, {
        sectionLabel: 'SECTION 1',
        mode: 'learning'
    });

    // Pastikan template Laravel murni sudah ada
    const templateReady = await setup.ensureTemplate();
    if (!templateReady) {
        console.error('❌ Template Laravel murni tidak tersedia. Tidak bisa melanjutkan.');
        process.exit(1);
    }

    const piper = new EvolutionPiper(ROOT_PATH);
    const total = PHASE_1_PROJECTS.length;
    let success = 0, failed = 0;
    const startTime = Date.now();

    console.log(`\x1b[35m⚡ Starting Sequential Evolution (One by one)...\x1b[0m`);

    for (const project of PHASE_1_PROJECTS) {
        try {
            await setup.setupProject(project, piper, {
                sectionDescription: 'Section 1 (Fundamental CRUD & Auth)'
            });
            success++;
        } catch (err) {
            console.error(`\n\x1b[31m❌ GAGAL [${project.name}]: ${err.message}\x1b[0m`);
            failed++;
            const logFile = path.join(ROOT_PATH, 'logs', 'sandbox-errors.log');
            await fs.ensureDir(path.dirname(logFile));
            await fs.appendFile(logFile, `[${new Date().toISOString()}] [Section 1] [${project.name}] ${err.message}\n`);
        }
    }

    const totalElapsed = Math.round((Date.now() - startTime) / 1000);

    console.log(`\n${'='.repeat(56)}`);
    console.log(`📊 SECTION 1 SELESAI: ${success} berhasil, ${failed} gagal`);
    console.log(`⏱  Total waktu: ${totalElapsed}s`);
    console.log(`${'='.repeat(56)}\n`);

    const args = process.argv.slice(2);
    const runPostAudit = args.includes('--post-audit');

    if (runPostAudit && success > 0) {
        console.log(`\n🔍 Memulai POST-GENERATION AUDIT EXTREME untuk ${success} Web App...\n`);
        for (const project of PHASE_1_PROJECTS) {
            const targetPath = path.join(SANDBOXES_DIR, project.name);
            if (await fs.pathExists(targetPath)) {
                try {
                    console.log(`   🕵️‍♂️ Mengaudit [${project.name}] dengan 6 Spesialis AI...`);
                    const auditEngine = new NexusEngine({ rootPath: targetPath });
                    await auditEngine.audit(targetPath, { mode: 'learning' });
                    console.log(`      ✅ Laporan audit ekstensif tersimpan di dalam folder nexus/docs/memory/raw/`);
                } catch (e) {
                    console.log(`      ⚠️ Gagal mengaudit ${project.name}: ${e.message}`);
                }
            }
        }
    } else {
        console.log(`\n⚡ Skipping POST-GENERATION AUDIT to optimize execution time (run with --post-audit to enable).\n`);
    }

    if (failed > 0) process.exit(1);
    process.exit(0);
}

runPhase1().catch(err => {
    console.error('❌ Fatal error di phase1_testing.js:', err);
    process.exit(1);
});
