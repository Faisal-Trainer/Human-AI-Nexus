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
        this.MAX_EVOLUTION_CYCLES = 25;
        this.currentCycle = 0;

        // ⛔ HARD LIMIT: Maksimal waktu eksekusi total (dalam menit)
        this.MAX_SESSION_MINUTES = 120;
        this.sessionStartTime = null;

        // FIX #12 — Path untuk persistensi cycle state
        this._statePath = path.join(this.rootPath, 'nexus', '.evolution_state.json');
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
        // FIX #12 — Persist setelah increment agar crash tidak reset counter
        await this.persistCycleState();
    }

    // FIX #12 — Load cycle state dari disk (panggil di awal session)
    async loadCycleState() {
        try {
            if (await fs.pathExists(this._statePath)) {
                const state = await fs.readJson(this._statePath);
                this.currentCycle = state.currentCycle || 0;
                this.sessionStartTime = state.sessionStartTime || null;
                console.log(`♻️ EvolutionPiper: Resumed from cycle ${this.currentCycle}/${this.MAX_EVOLUTION_CYCLES}.`);
            }
        } catch (e) {
            console.warn(`⚠️ EvolutionPiper: Could not load cycle state: ${e.message}`);
        }
    }

    // FIX #12 — Persist counter ke disk
    async persistCycleState() {
        try {
            await fs.ensureDir(path.dirname(this._statePath));
            await fs.writeJson(this._statePath, {
                currentCycle: this.currentCycle,
                sessionStartTime: this.sessionStartTime
            });
        } catch (e) {
            console.warn(`⚠️ EvolutionPiper: Could not persist cycle state: ${e.message}`);
        }
    }

    /**
     * Reset cycle counter — harus dipanggil manual setelah distill selesai.
     * Tidak bisa dipanggil dari dalam loop evolusi.
     */
    // FIX #12 — resetCycleCounter juga hapus file state
    resetCycleCounter() {
        console.log(`🔁 EvolutionPiper: Cycle counter reset (was ${this.currentCycle}). New session started.`);
        this.currentCycle = 0;
        this.sessionStartTime = null;
        // Best-effort delete persisted state
        fs.remove(this._statePath).catch(() => {});
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
                // FIX #27B — APP_KEY dibuat dinamis, bukan hardcoded di source code
                { name: '.env', content: `APP_NAME=Laravel\nDB_CONNECTION=sqlite\nAPP_KEY=base64:${require('crypto').randomBytes(32).toString('base64')}` }
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
    // FIX #24 — spawnRealLaravel tidak menghasilkan direktori kosong yang menyesatkan.
    // Gunakan spawnSandbox() dengan scenario 'crud' atau implementasikan composer create-project.
    async spawnRealLaravel(name) {
        throw new Error(
            'spawnRealLaravel: Not yet implemented. ' +
            'Use spawnSandbox(name, "crud") sebagai gantinya, atau jalankan ' +
            '`composer create-project laravel/laravel <name>` secara langsung.'
        );
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
