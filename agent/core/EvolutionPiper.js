const fs = require('fs-extra');
const path = require('path');
const NexusClock = require('./NexusClock');

/**
 * EvolutionPiper - The Laboratory Manager for Nexus AI.
 * Handles the recursive PBL cycle: Spawn -> Execute -> Harvest.
 */
class EvolutionPiper {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.sandboxPath = path.join(this.rootPath, 'tests', 'sandboxes');
    }

    /**
     * Phase 2: Spawn a new project sandbox with a specific scenario.
     */
    async spawnSandbox(name, scenarioType = 'chaos') {
        const targetPath = path.join(this.sandboxPath, name);
        await fs.ensureDir(targetPath);
        
        console.log(`🧪 EvolutionPiper: Spawning sandbox [${name}] - Scenario: ${scenarioType}`);

        // Initial "Broken" files based on scenario
        const dummyFiles = {
            'chaos': [
                { name: 'app.js', content: 'let data = []; setInterval(() => { data.push(new Array(1000000).fill("chaos")); }, 100);' },
                { name: 'README.md', content: '# Project Chaos\nA project designed to test resource limits.' }
            ],
            'vulnerable': [
                { name: 'db.js', content: 'function getUser(id) { return query("SELECT * FROM users WHERE id = " + id); }' },
                { name: 'auth.js', content: 'if (pass == "admin") return true;' }
            ]
        };

        const files = dummyFiles[scenarioType] || dummyFiles['chaos'];
        
        for (const file of files) {
            await fs.writeFile(path.join(targetPath, file.name), file.content);
        }

        return targetPath;
    }

    /**
     * Phase 2 (Advanced): Spawn a real Laravel project using Composer.
     */
    async spawnRealLaravel(name) {
        const targetPath = path.join(this.sandboxPath, name);
        await fs.ensureDir(targetPath);
        
        console.log(`🚀 EvolutionPiper: Installing real Laravel framework in [${name}]...`);
        
        // This will be executed via run_command in the main flow
        return targetPath;
    }

    /**
     * Phase 5: Harvest logs and wisdom from sandbox back to the main HUB.
     */
    async harvestWisdom(name) {
        const targetPath = path.join(this.sandboxPath, name);
        const logPath = path.join(targetPath, 'memory', 'operational');
        const mainHubPath = path.join(this.rootPath, 'memory', 'long_term', 'distilled');

        if (await fs.pathExists(logPath)) {
            console.log(`🌾 EvolutionPiper: Harvesting wisdom from [${name}]...`);
            const logs = await fs.readdir(logPath);
            for (const log of logs) {
                const source = path.join(logPath, log);
                const destination = path.join(mainHubPath, `EVO_${name}_${log}`);
                await fs.copy(source, destination);
            }
            console.log(`   ✅ Wisdom absorbed into main HUB.`);
        }
    }
}

module.exports = EvolutionPiper;
