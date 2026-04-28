const NexusEngine = require('./core/NexusEngine');

const readline = require('readline');

// Create engine instance
const engine = new NexusEngine();

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
    const command = args[0] || 'run';

    switch (command) {
        case 'run':
            console.log('\x1b[36m%s\x1b[0m', '🛡️ Nexus Orchestrator: "Selamat datang di Fase Audit."');
            console.log('1. [Learning Mode] Saya developer baru/ingin belajar dari temuan tiap agent spesialis.');
            console.log('2. [Efficient Mode] Saya sudah senior/ingin laporan ringkas yang dikonsolidasi PM.');
            
            const choice = await ask('\nPilih mode audit (1/2): ');
            const mode = choice === '2' ? 'efficient' : 'learning';
            
            const allowSensitiveChoice = await ask('Izinkan scan file sensitif (package.json, composer.json, .env)? (y/n): ');
            const allowSensitive = allowSensitiveChoice.toLowerCase() === 'y';
            
            await engine.runCycle({ mode, allowSensitive });
            rl.close();
            break;
        case 'audit':
            await engine.audit();
            break;
        case 'skills':
            const registry = await engine.discoverSkills();
            console.log('\n📚 Nexus Skill Registry:');
            Object.entries(registry).forEach(([cat, skills]) => {
                console.log(`- \x1b[33m${cat.toUpperCase()}\x1b[0m: ${skills.join(', ')}`);
            });
            rl.close();
            break;
        case 'plan':
            // Logic to plan based on latest audit
            console.log('Planning requires a target audit file.');
            break;
        case 'help':
        default:
            console.log(`
Human-AI Nexus Core Engine
Usage:
  nexus run     - Start a full Audit -> Plan -> Execute cycle
  nexus audit   - Run only the Audit phase
  nexus help    - Show this help
            `);
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
