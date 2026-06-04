// tests/TDD/upgrade_to_tall.js
// Upgrade existing sandboxes ke Laravel murni (dari template composer)
// v3.0: Pakai laravel-fresh-template (bukan url-shortener)

const fs = require('fs-extra');
const path = require('path');
const SandboxProjectSetup = require('./SandboxProjectSetup');

const SANDBOXES_DIR = path.join(__dirname, '..', 'sandboxes');
const ROOT_PATH     = path.join(__dirname, '..', '..');

const PHASE_1_PROJECTS = [
    'todo-app-realtime',
    'notes-app-tagging',
    'bookmark-manager',
    'habit-tracker',
    'expense-tracker',
    'daily-journal',
    'contact-manager',
    'password-manager-ui',
    'personal-portfolio'
];

async function upgradeToLaravel() {
    console.log('🚀 Upgrading all Phase 1 Sandboxes to Fresh Laravel...');

    const setup = new SandboxProjectSetup(ROOT_PATH, SANDBOXES_DIR, {
        sectionLabel: 'UPGRADE'
    });

    // Pastikan template Laravel murni tersedia
    const templateReady = await setup.ensureTemplate();
    if (!templateReady) {
        console.error('❌ Template Laravel murni tidak tersedia.');
        process.exit(1);
    }

    for (const project of PHASE_1_PROJECTS) {
        const targetPath = path.join(SANDBOXES_DIR, project);

        console.log(`\n======================================================`);
        console.log(`⚡ Upgrading PROJECT: ${project}`);
        console.log(`======================================================`);

        try {
            // Backup the nexus folder if it exists to preserve knowledge/logs
            const nexusBackup = path.join(targetPath, 'nexus_backup');
            const nexusPath = path.join(targetPath, 'nexus');
            if (await fs.pathExists(nexusPath)) {
                await fs.copy(nexusPath, nexusBackup);
            }

            // Remove the old sandbox
            await fs.emptyDir(targetPath);

            // Copy dari template Laravel murni
            console.log(`   📂 Copying fresh Laravel template...`);
            await fs.copy(path.join(SANDBOXES_DIR, 'laravel-fresh-template'), targetPath, {
                filter: (src) => {
                    if (src.includes(path.join('laravel-fresh-template', 'nexus'))) return false;
                    return true;
                }
            });

            // Restore the nexus folder
            if (await fs.pathExists(nexusBackup)) {
                console.log(`   🧠 Restoring Nexus Knowledge Base...`);
                await fs.copy(nexusBackup, nexusPath);
                await fs.remove(nexusBackup);
            }

            // Update .env with project name
            const envPath = path.join(targetPath, '.env');
            if (await fs.pathExists(envPath)) {
                let env = await fs.readFile(envPath, 'utf8');
                env = env.replace(/APP_NAME=.*/g, `APP_NAME=${project}`);
                await fs.writeFile(envPath, env);
            }

            console.log(`   ✅ Fresh Laravel installed successfully.`);
        } catch (error) {
            console.error(`❌ Gagal meng-upgrade project [${project}]:`, error);
        }
    }

    console.log('\n🎉 Seluruh project Phase 1 telah di-upgrade ke Laravel murni!');
}

upgradeToLaravel().catch(console.error);
