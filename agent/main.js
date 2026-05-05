const NexusEngine = require('./core/NexusEngine');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

/**
 * Main function to handle CLI arguments and execution
 */
async function main() {
    const args = process.argv.slice(2);
    
    // Parse arguments
    const flags = {
        mode: args.includes('--mode') ? args[args.indexOf('--mode') + 1] : (args.includes('-m') ? args[args.indexOf('-m') + 1] : null),
        root: args.includes('--root') ? args[args.indexOf('--root') + 1] : (args.includes('-r') ? args[args.indexOf('-r') + 1] : process.cwd()),
        yes: args.includes('--yes') || args.includes('-y'),
        command: args[0] && !args[0].startsWith('-') ? args[0] : 'run'
    };

    // Initialize engine with specified root
    const engine = new NexusEngine({ rootPath: path.resolve(flags.root) });

    switch (flags.command) {
        case 'run':
            console.log('\x1b[36m%s\x1b[0m', '🛡️ Nexus Orchestrator: "Selamat datang di Fase Audit."');
            
            let mode = flags.mode || 'learning';
            let allowSensitive = true;

            if (!flags.yes) {
                console.log('1. [Learning Mode] Saya developer baru/ingin belajar dari temuan tiap agent spesialis.');
                console.log('2. [Efficient Mode] Saya sudah senior/ingin laporan ringkas yang dikonsolidasi PM.');
                
                const choice = await ask('\nPilih mode audit (1/2): ');
                mode = choice === '2' ? 'efficient' : 'learning';
                
                const allowSensitiveChoice = await ask('Izinkan scan file sensitif (package.json, composer.json, .env)? (y/n): ');
                allowSensitive = allowSensitiveChoice.toLowerCase() === 'y';
            } else {
                console.log(`⚡ Mode Otomatis Aktif: Menggunakan mode "${mode}" dan mengizinkan scan file sensitif.`);
            }
            
            await engine.runCycle({ mode, allowSensitive });
            rl.close();
            break;
        case 'audit':
            await engine.audit();
            rl.close();
            break;
        case 'skills':
            const registry = await engine.discoverSkills();
            console.log('\n📚 Nexus Skill Registry:');
            Object.entries(registry).forEach(([cat, skills]) => {
                console.log(`- \x1b[33m${cat.toUpperCase()}\x1b[0m: ${skills.join(', ')}`);
            });
            rl.close();
            break;
        case 'harvest':
            const sourcePath = args[1];
            if (!sourcePath) {
                console.log('Error: Path sumber proyek (source path) wajib disertakan.');
                console.log('Usage: nexus harvest <path_to_project>');
            } else {
                await engine.harvest(path.resolve(sourcePath));
            }
            rl.close();
            break;
        case 'refactor':
            await engine.massRefactor();
            rl.close();
            break;
        case 'update-skills':
            await engine.massUpdateSkills();
            rl.close();
            break;
        case 'distill':
            const rack = args.includes('--rack') ? args[args.indexOf('--rack') + 1] : null;
            if (rack) engine.setRack(rack);
            await engine.distill();
            rl.close();
            break;
        case 'forge':
            const machineName = args[1];
            const wisdomPath = args[2];
            if (!machineName || !wisdomPath) {
                console.log('Error: Machine name and wisdom path are required.');
                console.log('Usage: nexus forge <MachineName> </path/to/wisdom.md>');
            } else {
                await engine.machinist.forge(machineName, path.resolve(wisdomPath));
            }
            rl.close();
            break;
        case 'help':
        default:
            console.log(`
Human-AI Nexus Core Engine
Usage:
  nexus run           - Start a full Audit -> Plan -> Execute cycle
  nexus audit         - Run only the Audit phase
  nexus harvest <dir> - Harvest Nexus docs from another project to Golden HUB
  nexus refactor      - [Protocol 1] Mass Refactor from Golden to HUB
  nexus update-skills - [Protocol 2] Mass Update from HUB to Skills
  nexus skills        - List available agent skills
  nexus distill       - Distill and standardize the HUB (NEXUS_ prefix)
  nexus forge <name> <file> - Forge a new machine from wisdom file
  nexus help          - Show this help
            `);
            rl.close();
            break;
    }
}

// Export for library use
module.exports = NexusEngine;

// Run if called directly
if (require.main === module) {
    main().catch(err => {
        console.error(err);
        process.exit(1);
    });
}
