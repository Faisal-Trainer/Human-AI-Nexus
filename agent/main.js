const NexusEngine = require('./core/NexusEngine');
// FIX #23 — Orchestrator dihapus dari main.js; NexusEngine sudah membuat instance internal
// Menggunakan engine.orchestrator jika perlu akses dari luar
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
        root: args.includes('--root') ? args[args.indexOf('--root') + 1] : (args.includes('-r') ? args[args.indexOf('-r') + 1] : (args[1] && !args[1].startsWith('-') ? args[1] : process.cwd())),
        yes: args.includes('--yes') || args.includes('-y'),
        command: args[0] && !args[0].startsWith('-') ? args[0] : 'run'
    };

    // FIX #23 — Hanya satu instance engine; gunakan engine.orchestrator jika perlu
    const engine = new NexusEngine({ rootPath: path.resolve(flags.root) });

    switch (flags.command) {
        case 'run':
            console.log('\x1b[36m%s\x1b[0m', '🛡️ Nexus Orchestrator: "Selamat datang di Fase Audit."');
            
            let mode = flags.mode || 'learning';
            let allowSensitive = true;

            if (!flags.yes) {
                console.log('\n--- I/O DASAR NEXUS (CODER-FOCUSED) ---');
                console.log('1. [Learning Mode] Saya developer baru/ingin belajar dari temuan tiap agent spesialis.');
                console.log('2. [Efficient Mode] Saya sudah senior/ingin laporan ringkas yang dikonsolidasi PM.');
                
                const choice = await ask('\nPilih mode audit (1/2): ');
                mode = choice === '2' ? 'efficient' : 'learning';
                
                const allowSensitiveChoice = await ask('Izinkan scan file sensitif (package.json, composer.json, .env)? (y/n): ');
                allowSensitive = allowSensitiveChoice.toLowerCase() === 'y';
            } else {
                console.log(`⚡ Mode Otomatis Aktif: Menggunakan mode "${mode}" dan mengizinkan scan file sensitif.`);
            }
            
            // --- CORE I/O LOOP ---
            console.log('\n🧠 Inisialisasi Environment & Memory...');
            await engine.discoverSkills();
            await engine.readMemory();

            console.log('\n🏗️ [0.5/4] Memulai Fase Blueprint & Scaffolding...');
            await engine.blueprintApp({ mode, allowSensitive });

            console.log('\n🔍 [1/4] Memulai Fase Audit Seluruh Project...');
            const report = await engine.audit(flags.root, { mode, allowSensitive });
            
            let approved = false;
            let plan;
            
            while (!approved) {
                console.log('\n📅 [2/4] Menyusun Planning Pengembangan...');
                plan = await engine.plan(report);
                
                console.log('\n=========================================');
                console.log('📑 USULAN PENGEMBANGAN (PLANNING)');
                console.log('=========================================');
                plan.tasks.forEach(t => {
                    console.log(`\n📌 Task ${t.id}: ${t.description}`);
                    console.log(`   💡 Saran Perbaikan: ${t.recommendation}`);
                });
                console.log('=========================================\n');
                
                if (flags.yes) {
                    console.log('⚡ Mode Otomatis Aktif: Planning disetujui oleh sistem.');
                    approved = true;
                } else {
                    const response = await ask('🧑‍💻 DEV APPROVAL: Apakah Anda menyetujui planning pengembangan ini? (y/n): ');
                    if (response.toLowerCase() === 'y') {
                        approved = true;
                        console.log('✅ Planning disetujui. Melanjutkan eksekusi...');
                    } else {
                        console.log('❌ Planning ditolak oleh Dev.');
                        const feedback = await ask('Tolong berikan feedback/alasan penolakan untuk menyesuaikan planning: ');
                        console.log('🔄 Memproses ulang planning berdasarkan feedback Dev...');
                        // Inject feedback to influence next planning loop
                        report.findings.push({ severity: 'INFO', message: `USER FEEDBACK: ${feedback}`, rationale: 'Feedback dari Developer untuk iterasi planning.', recommendation: 'Sesuaikan rencana berdasarkan feedback ini.' });
                    }
                }
            }
            
            console.log('\n🏗️ [2.5/4] Memulai Fase Implementasi (Generasi Kode)...');
            await engine.implement();

            console.log('\n🚀 [3/4] Memulai Fase Eksekusi Perubahan...');
            await engine.execute(plan);
            await engine.verify(plan);

            console.log('\n🧹 [3.5/4] Memulai Fase Clean Code & Verifikasi Stabilitas...');
            await engine.cleanCodeAndVerify(flags.root);
            
            console.log('\n📝 [4/4] Memulai Fase Dokumentasi (Laporan untuk Dev)...');
            const cycleID = `CYCLE-${Date.now()}`;
            await engine.record(cycleID);
            await engine.generateCycleSummary(cycleID);
            
            console.log('\n✅ SIKLUS SELESAI.');
            console.log(`Laporan perubahan & dokumentasi telah disimpan di memory/operational. Sangat disarankan untuk membaca file MD terkait.`);
            
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
        case 'status':
            await engine.getSystemStatus();
            rl.close();
            break;
        case 'sandbox': {
            // nexus sandbox [--section 1|2|3] [--distill]
            const { spawn: spawnChild } = require('child_process');
            const fs = require('fs-extra');
            const runnerPath = path.join(__dirname, '..', 'tests', 'TDD', 'sandbox-master-runner.js');
            const sandboxArgs = args.slice(1); // --section X, --distill, etc.

            if (!fs.existsSync(runnerPath)) {
                console.error(`\x1b[31m❌ Sandbox runner tidak ditemukan: ${runnerPath}\x1b[0m`);
                console.error(`   Pastikan folder tests/TDD/ tersedia di instalasi Nexus.`);
                rl.close();
                process.exit(1);
            }

            console.log('\x1b[36m%s\x1b[0m', '🧪 Nexus Sandbox Master Runner: Starting...');
            const sandboxProc = spawnChild('node', [runnerPath, ...sandboxArgs], { stdio: 'inherit', shell: false });
            
            sandboxProc.on('error', (err) => {
                console.error(`\x1b[31m❌ Gagal menjalankan sandbox: ${err.message}\x1b[0m`);
                rl.close();
                process.exit(1);
            });

            sandboxProc.on('exit', code => { 
                rl.close(); 
                process.exit(code || 0); 
            });
            return; // Handled in exit callback
        }
        case 'dlq': {
            // nexus dlq — tampilkan Dead Letter Queue (task gagal permanen)
            const fs = require('fs-extra');
            const dlqPath = path.join(path.resolve(flags.root), 'logs', 'dead_letter_queue.json');
            if (!(await fs.pathExists(dlqPath))) {
                console.log('✅ Dead Letter Queue: kosong (file tidak ditemukan).');
            } else {
                const dlq = await fs.readJson(dlqPath).catch(() => []);
                if (dlq.length === 0) {
                    console.log('✅ Dead Letter Queue: kosong — tidak ada task yang gagal permanen.');
                } else {
                    console.log(`\n💀 Dead Letter Queue — ${dlq.length} task gagal permanen:\n`);
                    dlq.forEach((t, i) => {
                        console.log(`  [${i + 1}] Task ID  : ${t.task_id}`);
                        console.log(`       Agent    : ${t.error?.agent || 'unknown'}`);
                        console.log(`       Error    : ${t.error?.message || t.error}`);
                        console.log(`       Waktu    : ${t.failed_at}`);
                        console.log('');
                    });
                    console.log(`  Hapus DLQ: rm logs/dead_letter_queue.json`);
                }
            }
            rl.close();
            break;
        }
        case 'think':
            const question = args.slice(1).join(' ');
            if (!question) {
                console.log('Usage: nexus think <your question>');
            } else {
                console.log('\x1b[36m%s\x1b[0m', '🤔 Nexus is thinking...');
                // taskType 'explain_error' — paling relevan untuk pertanyaan arsitektur
                const answer = await engine.localAI.generate(question, 'explain_error');
                console.log('\n\x1b[32m%s\x1b[0m', '🤖 Answer:');
                console.log(answer || 'No response from local AI.');
            }
            rl.close();
            break;
        case 'review':
            const filePath = args[1];
            if (!filePath) {
                console.log('Usage: nexus review <file_path>');
            } else {
                const absolutePath = path.resolve(filePath);
                if (await fs.pathExists(absolutePath)) {
                    const code = await fs.readFile(absolutePath, 'utf8');
                    console.log('\x1b[36m%s\x1b[0m', `🔍 Reviewing ${filePath}...`);
                    const review = await engine.localAI.analyzeCode(code);
                    console.log('\n\x1b[32m%s\x1b[0m', '📊 Code Review:');
                    console.log(review || 'No response from local AI.');
                } else {
                    console.log(`Error: File ${filePath} not found.`);
                }
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
  nexus status        - Show real-time system health (CPU, RAM, agents, evolution)
  nexus dlq           - View Dead Letter Queue (permanently failed tasks)
  nexus sandbox       - 🆕 Run all 100 sandbox projects autonomously
  nexus sandbox --section <1-10> - Run a specific Section only
  nexus sandbox --distill     - Run all + distill knowledge to HUB
  nexus harvest <dir> - Harvest Nexus docs from another project to Golden HUB
  nexus refactor      - [Protocol 1] Mass Refactor from Golden to HUB
  nexus update-skills - [Protocol 2] Mass Update from HUB to Skills
  nexus skills        - List available agent skills
  nexus distill       - Distill and standardize the HUB (NEXUS_ prefix)
  nexus forge <name> <file> - Forge a new machine from wisdom file
  nexus think <query> - Ask local AI for architectural advice
  nexus review <file> - Review specific code using local AI
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
