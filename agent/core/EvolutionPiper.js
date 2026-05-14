const fs = require('fs-extra');
const path = require('path');
const NexusClock = require('./NexusClock');

/**
 * EvolutionPiper - The Laboratory Manager for Nexus AI.
 * Handles the recursive PBL cycle: Spawn -> Execute -> Harvest.
 * ⛔ GUARDRAIL v2.0: Hard cycle limit + session time limit enforced.
 */
class EvolutionPiper {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.sandboxPath = path.join(this.rootPath, 'tests', 'sandboxes');

        // ⛔ HARD LIMIT: Maksimal iterasi per session — TIDAK BOLEH diubah programatik
        this.MAX_EVOLUTION_CYCLES = 25; // Satu phase = max 25 project
        this.currentCycle = 0;

        // ⛔ HARD LIMIT: Maksimal waktu eksekusi total (dalam menit)
        this.MAX_SESSION_MINUTES = 120; // 2 jam
        this.sessionStartTime = null;
    }

    /**
     * ⛔ GUARDRAIL: Cek batas sebelum setiap operasi evolusi.
     * Harus dipanggil di awal setiap spawnSandbox / spawnRealLaravel.
     */
    async checkEvolutionBoundary() {
        // Inisialisasi waktu mulai session pada cycle pertama
        if (this.currentCycle === 0) {
            this.sessionStartTime = Date.now();
        }

        // Cek cycle limit
        if (this.currentCycle >= this.MAX_EVOLUTION_CYCLES) {
            throw new Error(
                `🚧 EVOLUTION BOUNDARY: Reached maximum cycles (${this.MAX_EVOLUTION_CYCLES}). ` +
                `Manual review required before next phase. ` +
                `Run 'nexus distill' then reset cycle counter manually.`
            );
        }

        // Cek session time limit
        if (this.sessionStartTime) {
            const elapsedMinutes = (Date.now() - this.sessionStartTime) / 60000;
            if (elapsedMinutes > this.MAX_SESSION_MINUTES) {
                throw new Error(
                    `🚧 EVOLUTION BOUNDARY: Session exceeded ${this.MAX_SESSION_MINUTES} minutes ` +
                    `(elapsed: ${elapsedMinutes.toFixed(1)} min). ` +
                    `Session paused for resource safety. Restart a new session to continue.`
                );
            }
        }

        this.currentCycle++;
        console.log(`🔄 Evolution Cycle: ${this.currentCycle}/${this.MAX_EVOLUTION_CYCLES}`);
    }

    /**
     * Reset cycle counter — harus dipanggil manual setelah distill selesai.
     * Tidak bisa dipanggil dari dalam loop evolusi.
     */
    resetCycleCounter() {
        console.log(`🔁 EvolutionPiper: Cycle counter reset (was ${this.currentCycle}). New session started.`);
        this.currentCycle = 0;
        this.sessionStartTime = null;
    }

    /**
     * Phase 2: Spawn a new project sandbox with a specific scenario.
     */
    async spawnSandbox(name, scenarioType = 'chaos') {
        // ⛔ GUARDRAIL: Wajib cek boundary sebelum spawn
        await this.checkEvolutionBoundary();

        const targetPath = path.join(this.sandboxPath, name);
        await fs.ensureDir(targetPath);
        
        console.log(`🧪 EvolutionPiper: Spawning sandbox [${name}] - Scenario: ${scenarioType}`);

        const dummyFiles = {
            'chaos': [
                { name: 'app.js', content: 'let data = []; setInterval(() => { data.push(new Array(1000000).fill("chaos")); }, 100);' },
                { name: 'README.md', content: '# Project Chaos\nA project designed to test resource limits.' }
            ],
            'vulnerable': [
                { name: 'db.js', content: 'function getUser(id) { return query("SELECT * FROM users WHERE id = " + id); }' },
                { name: 'auth.js', content: 'if (pass == "admin") return true;' }
            ],
            'crud': [
                { name: 'app/Http/Controllers/ItemController.php', content: '<?php\nnamespace App\\Http\\Controllers;\nclass ItemController extends Controller {\n    public function index() { return view("items.index"); }\n}' },
                { name: 'routes/web.php', content: '<?php\nuse Illuminate\\Support\\Facades\\Route;\nuse App\\Http\\Controllers\\ItemController;\nRoute::resource("items", ItemController::class);' },
                { name: 'database/migrations/create_items_table.php', content: '<?php\nuse Illuminate\\Database\\Migrations\\Migration;\nuse Illuminate\\Database\\Schema\\Blueprint;\nuse Illuminate\\Support\\Facades\\Schema;\nreturn new class extends Migration {\n    public function up() {\n        Schema::create("items", function (Blueprint $table) {\n            $table->id();\n            $table->string("name");\n            $table->timestamps();\n        });\n    }\n};' },
                { name: '.env', content: 'APP_NAME=Laravel\nDB_CONNECTION=sqlite\nAPP_KEY=base64:a7gkNyQZZ4HamHeiMoQ2gFJygojiFUCyzXDTKQ3YwG4=' }
            ]
        };

        const files = dummyFiles[scenarioType] || dummyFiles['chaos'];
        
        for (const file of files) {
            const filePath = path.join(targetPath, file.name);
            await fs.ensureDir(path.dirname(filePath));
            await fs.writeFile(filePath, file.content);
        }

        return targetPath;
    }

    /**
     * Phase 2 (Advanced): Spawn a real Laravel project using Composer.
     */
    async spawnRealLaravel(name) {
        // ⛔ GUARDRAIL: Wajib cek boundary sebelum spawn
        await this.checkEvolutionBoundary();

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
        const mainHubPath = path.join(this.rootPath, 'memory', 'distilled');

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

    /**
     * Get current evolution status.
     */
    getStatus() {
        const elapsedMinutes = this.sessionStartTime
            ? ((Date.now() - this.sessionStartTime) / 60000).toFixed(1)
            : 0;
        return {
            currentCycle: this.currentCycle,
            maxCycles: this.MAX_EVOLUTION_CYCLES,
            remainingCycles: this.MAX_EVOLUTION_CYCLES - this.currentCycle,
            sessionElapsedMinutes: elapsedMinutes,
            maxSessionMinutes: this.MAX_SESSION_MINUTES
        };
    }
}

module.exports = EvolutionPiper;
