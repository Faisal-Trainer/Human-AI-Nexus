// tests/TDD/setup_section2.js
// Section 2 — Dashboard & Admin Panel (10 projects)
// Pipeline: Copy TALL Template → Configure → Migrate → Nexus Cycle → Harvest
// Fixed v2.0: resetCycleCounter() per project, error handling lebih robust

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const NexusEngine = require('../../agent/core/NexusEngine');
const EvolutionPiper = require('../../agent/core/EvolutionPiper');

const TEMPLATE_SOURCE = path.join(__dirname, '..', 'sandboxes', 'url-shortener');
const SANDBOXES_DIR   = path.join(__dirname, '..', 'sandboxes');
const ROOT_PATH       = path.join(__dirname, '..', '..');

const SECTION_2_PROJECTS = [
    { name: 'admin-dashboard-analytics',       tags: ['dashboard', 'analytics', 'admin', 'phase-2'] },
    { name: 'user-management-system',           tags: ['crud', 'auth', 'admin', 'phase-2'] },
    { name: 'role-permission-manager',          tags: ['auth', 'rbac', 'admin', 'phase-2'] },
    { name: 'audit-log-dashboard',              tags: ['dashboard', 'logs', 'security', 'phase-2'] },
    { name: 'system-monitoring-dashboard',      tags: ['dashboard', 'monitoring', 'phase-2'] },
    { name: 'inventory-dashboard',              tags: ['crud', 'dashboard', 'inventory', 'phase-2'] },
    { name: 'multi-tenant-admin-panel',         tags: ['admin', 'multi-tenant', 'saas', 'phase-2'] },
    { name: 'subscription-management-dashboard', tags: ['saas', 'billing', 'dashboard', 'phase-2'] },
    { name: 'crm-sederhana',                    tags: ['crm', 'crud', 'business', 'phase-2'] },
    { name: 'erp-mini-system',                  tags: ['erp', 'crud', 'business', 'phase-2'] },
];

async function setupTALLProject(project, piper) {
    const targetPath = path.join(SANDBOXES_DIR, project.name);

    console.log(`\n${'='.repeat(56)}`);
    console.log(`🏗️  [SECTION 2] PROJECT: ${project.name}`);
    console.log(`🏷️  Tags: ${project.tags.join(', ')}`);
    console.log(`${'='.repeat(56)}`);

    // ── STEP 1: Backup nexus knowledge kalau ada
    const nexusPath   = path.join(targetPath, 'nexus');
    const nexusBackup = path.join(targetPath, '_nexus_backup');
    if (await fs.pathExists(nexusPath)) {
        console.log(`   💾 Backing up nexus knowledge...`);
        await fs.copy(nexusPath, nexusBackup);
    }

    // ── STEP 2: Copy TALL stack template (url-shortener sebagai base)
    console.log(`   📂 Copying TALL stack template...`);
    const hasDeps = await fs.pathExists(path.join(targetPath, 'node_modules'));
    const hasVendor = await fs.pathExists(path.join(targetPath, 'vendor'));
    
    const tempDeps = path.join(targetPath, '..', `${project.name}_node_modules_temp`);
    const tempVendor = path.join(targetPath, '..', `${project.name}_vendor_temp`);
    
    if (hasDeps) {
        await fs.rename(path.join(targetPath, 'node_modules'), tempDeps).catch(() => {});
    }
    if (hasVendor) {
        await fs.rename(path.join(targetPath, 'vendor'), tempVendor).catch(() => {});
    }

    if (await fs.pathExists(targetPath)) {
        await fs.remove(targetPath).catch(() => {});
    }
    await fs.ensureDir(targetPath);

    const orchestratorPath = path.join(ROOT_PATH, 'nexus', 'native', 'sandbox_orchestrator.exe');
    let nativeCopySuccess = false;

    if (await fs.pathExists(orchestratorPath)) {
        try {
            console.log(`   🚀 Invoking C++ Native Sandbox Orchestrator...`);
            const { execSync } = require('child_process');
            execSync(`"${orchestratorPath}" setup "${TEMPLATE_SOURCE}" "${targetPath}" "${project.name}"`, { stdio: 'ignore' });
            nativeCopySuccess = true;
        } catch (e) {
            console.warn(`   ⚠️ Native copy failed: ${e.message}. Falling back to JS copy.`);
        }
    }

    if (!nativeCopySuccess) {
        await fs.copy(TEMPLATE_SOURCE, targetPath, {
            filter: src => {
                if (src.includes(path.join('url-shortener', 'nexus'))) return false;
                if (hasDeps && /(\\|\/)(node_modules)(\\|\/|$)/.test(src)) return false;
                if (hasVendor && /(\\|\/)(vendor)(\\|\/|$)/.test(src)) return false;
                return true;
            }
        });
    }

    // Restore node_modules & vendor if they were backed up
    if (hasDeps && await fs.pathExists(tempDeps)) {
        await fs.rename(tempDeps, path.join(targetPath, 'node_modules')).catch(() => {});
    }
    if (hasVendor && await fs.pathExists(tempVendor)) {
        await fs.rename(tempVendor, path.join(targetPath, 'vendor')).catch(() => {});
    }

    // ── STEP 3: Konfigurasi .env
    console.log(`   ⚙️  Configuring environment...`);
    const envPath = path.join(targetPath, '.env');
    if (await fs.pathExists(envPath)) {
        let env = await fs.readFile(envPath, 'utf8');
        env = env.replace(/APP_NAME=.*/g, `APP_NAME=${project.name}`);
        await fs.writeFile(envPath, env);
    }

    // ── STEP 4: Restore nexus knowledge
    if (await fs.pathExists(nexusBackup)) {
        await fs.copy(nexusBackup, nexusPath);
        await fs.remove(nexusBackup);
    } else {
        await fs.ensureDir(nexusPath);
    }

    // ── STEP 5: Inject README
    await fs.writeFile(
        path.join(targetPath, 'README.md'),
        `# ${project.name}\nSection 2 (Dashboard & Admin Panel) — TALL Stack Sandbox.\nTags: ${project.tags.join(', ')}\nGenerated by Nexus Autonomous Pipeline.`
    );

    // ── STEP 6: Migrate database
    console.log(`   🗄️  Migrating SQLite database...`);
    const dbPath = path.join(targetPath, 'database', 'database.sqlite');
    await fs.remove(dbPath).catch(() => {});
    await fs.writeFile(dbPath, '');
    try {
        execSync('php artisan migrate:fresh --force', { cwd: targetPath, stdio: 'ignore' });
        console.log(`   ✅ Database migrated.`);
    } catch (e) {
        console.warn(`   ⚠️  Migrate failed (non-fatal): ${e.message.slice(0, 80)}`);
    }

    // ── STEP 7: Reset cycle counter
    piper.resetCycleCounter();

    // ── STEP 8: Nexus Autonomous Cycle (mode: efficient untuk Section 2)
    console.log(`   🤖 Starting Nexus Autonomous Cycle (mode: efficient)...`);
    const engine = new NexusEngine({ rootPath: targetPath });
    await engine.runCycle({ mode: 'efficient', allowSensitive: true });

    // ── STEP 8.5: Clean Code & Stability Verification Loop (5x)
    await engine.cleanCodeAndVerify(targetPath);

    // ── STEP 9: Harvest
    console.log(`   🌾 Harvesting knowledge to Golden HUB...`);
    await engine.harvest(targetPath);

    console.log(`\n🚀 FULL TALL APP READY - ${project.name}`);
    console.log(`📁 Path: ${targetPath}`);
    console.log(`🌐 Akses: http://localhost:8000 (login: admin@example.com / password)`);
    console.log(`💻 Perintah: npm run serve:tall`);
    console.log(`✅ [${project.name}] pipeline complete.\n`);
}

async function setupSection2() {
    console.log('\n╔══════════════════════════════════════════════════════╗');
    console.log('║  🏗️  NEXUS — Section 2: Dashboard & Admin Panel      ║');
    console.log('║  10 Projects | TALL Stack | Autonomous Pipeline       ║');
    console.log('╚══════════════════════════════════════════════════════╝\n');

    if (!(await fs.pathExists(TEMPLATE_SOURCE))) {
        console.error(`❌ Template tidak ditemukan: ${TEMPLATE_SOURCE}`);
        process.exit(1);
    }

    const piper = new EvolutionPiper(ROOT_PATH);
    let success = 0, failed = 0;

    for (const project of SECTION_2_PROJECTS) {
        try {
            await setupTALLProject(project, piper);
            success++;
        } catch (err) {
            console.error(`\n❌ GAGAL [${project.name}]: ${err.message}`);
            failed++;
        }
    }

    console.log(`\n${'='.repeat(56)}`);
    console.log(`📊 SECTION 2 SELESAI: ${success} berhasil, ${failed} gagal`);
    console.log(`${'='.repeat(56)}\n`);

    if (failed > 0) process.exit(1);
    process.exit(0);
}

setupSection2().catch(err => {
    console.error('❌ Fatal error di setup_section2.js:', err);
    process.exit(1);
});
