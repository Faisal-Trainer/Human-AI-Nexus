const fs = require('fs-extra');
const path = require('path');

const source = path.join(__dirname, '..', '..', 'tests', 'sandboxes', 'url-shortener');
const sandboxesDir = path.join(__dirname, '..', '..', 'tests', 'sandboxes');

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

async function upgradeToTALL() {
    console.log('🚀 Upgrading all Phase 1 Sandboxes to Full TALL Stack...');
    
    for (const project of PHASE_1_PROJECTS) {
        const targetPath = path.join(sandboxesDir, project);
        
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
            
            // Remove the old dummy sandbox
            await fs.emptyDir(targetPath);
            
            // Copy the TALL template (url-shortener)
            console.log(`   📂 Copying TALL stack from url-shortener...`);
            await fs.copy(source, targetPath, {
                filter: (src) => {
                    // Don't copy its nexus folder or tests that are specific to url-shortener
                    if (src.includes(path.join('url-shortener', 'nexus'))) return false;
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
                // Ensure unique sqlite DB
                await fs.writeFile(envPath, env);
            }
            
            console.log(`   ✅ TALL Stack Installed successfully.`);
        } catch (error) {
            console.error(`❌ Gagal meng-upgrade project [${project}]:`, error);
        }
    }
    
    console.log('\n🎉 Seluruh project Phase 1 telah di-upgrade ke TALL Stack!');
}

upgradeToTALL().catch(console.error);
