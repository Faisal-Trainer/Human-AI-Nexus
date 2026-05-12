const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const NexusEngine = require('../../agent/core/NexusEngine');

const source = path.join(__dirname, '..', '..', 'tests', 'sandboxes', 'url-shortener');
const sandboxesDir = path.join(__dirname, '..', '..', 'tests', 'sandboxes');

const SECTION_2_PROJECTS = [
    'admin-dashboard-analytics',
    'user-management-system',
    'role-permission-manager',
    'audit-log-dashboard',
    'system-monitoring-dashboard',
    'inventory-dashboard',
    'multi-tenant-admin-panel',
    'subscription-management-dashboard',
    'crm-sederhana',
    'erp-mini-system'
];

async function setupSection2() {
    console.log('🚀 Memulai Setup untuk Section 2: Dashboard & Admin Panel');
    console.log('Semua project akan dibangun langsung dengan Full TALL Stack (Tailwind, AlpineJS, Laravel, Livewire)\n');
    
    for (const project of SECTION_2_PROJECTS) {
        const targetPath = path.join(sandboxesDir, project);
        
        console.log(`======================================================`);
        console.log(`📦 SETUP PROJECT: ${project}`);
        console.log(`======================================================`);
        
        try {
            // 1. Spawning TALL Stack from template
            console.log(`   📂 Copying TALL stack template...`);
            await fs.emptyDir(targetPath);
            await fs.copy(source, targetPath, {
                filter: (src) => !src.includes(path.join('url-shortener', 'nexus')) // Don't copy specific nexus data
            });

            // 2. Adjusting Project Specifics (.env, package.json, composer.json)
            console.log(`   ⚙️  Configuring environment...`);
            const envPath = path.join(targetPath, '.env');
            if (await fs.pathExists(envPath)) {
                let env = await fs.readFile(envPath, 'utf8');
                env = env.replace(/APP_NAME=.*/g, `APP_NAME=${project}`);
                await fs.writeFile(envPath, env);
            }
            
            // 3. Ensuring SQLite Database is clean
            const dbPath = path.join(targetPath, 'database', 'database.sqlite');
            if (await fs.pathExists(dbPath)) {
                await fs.remove(dbPath);
            }
            await fs.writeFile(dbPath, '');
            // Run migrate fresh to ensure database is clean and working
            console.log(`   🗄️  Migrating database...`);
            execSync('php artisan migrate:fresh --force', { cwd: targetPath, stdio: 'ignore' });

            // 4. Install Nexus Engine & Inject README
            console.log(`   🤖 Injecting Nexus Engine...`);
            const nexusConfigPath = path.join(targetPath, 'nexus');
            await fs.ensureDir(nexusConfigPath);
            await fs.writeFile(path.join(targetPath, 'README.md'), `# ${project}\nSection 2 (Dashboard & Admin) - TALL Stack Sandbox.`);
            
            const engine = new NexusEngine({ rootPath: targetPath });
            
            // 5. Run a quick Nexus Audit Cycle to ensure pipeline integration
            console.log(`   ⏳ Memulai siklus Nexus Pipeline...`);
            await engine.runCycle({ mode: 'efficient', allowSensitive: true });
            
            // 6. Harvesting
            console.log(`   🌾 Harvesting knowledge...`);
            await engine.harvest(targetPath);

            console.log(`   ✅ Project [${project}] siap dijalankan dengan \`php artisan serve\` dan \`npm run dev\`.`);
            console.log('');
        } catch (error) {
            console.error(`❌ Gagal mensetup project [${project}]:`, error);
        }
    }
    
    console.log('🎉 Seluruh project Section 2 telah selesai di-setup sebagai TALL Stack sandboxes!');
}

setupSection2().catch(console.error);
