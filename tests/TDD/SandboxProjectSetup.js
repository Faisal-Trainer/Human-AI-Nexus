// tests/TDD/SandboxProjectSetup.js
// NEXUS SHARED SANDBOX PROJECT SETUP MODULE
// Menggantikan duplikasi setupTALLProject() di phase1_testing.js, setup_section2.js,
// setup_section3.js, dan setup_dynamic_section.js.
//
// Perubahan utama:
// - Template: Laravel murni dari composer (bukan copy url-shortener)
// - Blueprint: Selalu regenerate (Opsi A)
// - DRY: Satu module untuk semua section

const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");
const NexusEngine = require("../../agent/core/NexusEngine");

const TEMPLATE_NAME = "laravel-fresh-template";

class SandboxProjectSetup {
  /**
   * @param {string} rootPath — Root path Nexus AI (e.g. tests/../..)
   * @param {string} sandboxesDir — Path ke folder sandboxes (e.g. tests/sandboxes)
   * @param {object} options
   * @param {string} options.sectionLabel — Label section untuk logging (e.g. "SECTION 1")
   * @param {string} options.mode — Audit mode: 'learning' | 'efficient'
   * @param {boolean} options.skipCleanCode — Skip clean code phase (default: false)
   */
  constructor(rootPath, sandboxesDir, options = {}) {
    this.rootPath = rootPath;
    this.sandboxesDir = sandboxesDir;
    this.templatePath = path.join(sandboxesDir, TEMPLATE_NAME);
    this.sectionLabel = options.sectionLabel || "SANDBOX";
    this.mode = options.mode || "learning";
    this.skipCleanCode = options.skipCleanCode || false;
  }

  /**
   * Pastikan template Laravel murni tersedia di sandboxes/laravel-fresh-template.
   * Jika belum ada, jalankan `composer create-project laravel/laravel`.
   * @returns {Promise<boolean>} true jika template tersedia
   */
  async ensureTemplate() {
    if (await fs.pathExists(path.join(this.templatePath, "artisan"))) {
      console.log(
        `   ✅ Template Laravel murni sudah tersedia: ${TEMPLATE_NAME}`,
      );
      return true;
    }

    console.log(`   🔧 Membuat template Laravel murni via composer...`);
    console.log(`   📍 Target: ${this.templatePath}`);

    try {
      await fs.ensureDir(this.sandboxesDir);

      // Hapus folder setengah jadi jika ada
      if (await fs.pathExists(this.templatePath)) {
        await fs.remove(this.templatePath);
      }

      execSync(
        `composer create-project laravel/laravel "${this.templatePath}" --prefer-dist --no-interaction`,
        {
          stdio: "inherit",
          timeout: 300000, // 5 menit timeout
          cwd: this.sandboxesDir,
        },
      );

      // Verifikasi artisan file ada
      if (!(await fs.pathExists(path.join(this.templatePath, "artisan")))) {
        throw new Error("artisan file not found after composer create-project");
      }

      // Setup SQLite default di template
      const envPath = path.join(this.templatePath, ".env");
      if (await fs.pathExists(envPath)) {
        let env = await fs.readFile(envPath, "utf8");
        env = env.replace(/DB_CONNECTION=.*/g, "DB_CONNECTION=sqlite");
        // Hapus DB config yang tidak perlu untuk SQLite
        env = env.replace(/DB_HOST=.*/g, "# DB_HOST=127.0.0.1");
        env = env.replace(/DB_PORT=.*/g, "# DB_PORT=3306");
        env = env.replace(/DB_DATABASE=.*/g, "# DB_DATABASE=laravel");
        env = env.replace(/DB_USERNAME=.*/g, "# DB_USERNAME=root");
        env = env.replace(/DB_PASSWORD=.*/g, "# DB_PASSWORD=");
        await fs.writeFile(envPath, env);
      }

      // Buat SQLite database file kosong
      const dbDir = path.join(this.templatePath, "database");
      await fs.ensureDir(dbDir);
      await fs.writeFile(path.join(dbDir, "database.sqlite"), "");

      console.log(`   ✅ Template Laravel murni berhasil dibuat.`);
      return true;
    } catch (err) {
      console.error(`   ❌ Gagal membuat template Laravel: ${err.message}`);
      console.error(
        `   💡 Pastikan 'composer' dan 'php' terinstall dan ada di PATH.`,
      );
      return false;
    }
  }

  /**
   * Pipeline utama untuk setup satu project sandbox.
   *
   * @param {object} project — { name: string, tags: string[] }
   * @param {object} piper — EvolutionPiper instance
   * @param {object} overrides — Override options per project (e.g. { mode: 'efficient' })
   */
  async setupProject(project, piper, overrides = {}) {
    const projectName = typeof project === "string" ? project : project.name;
    const projectTags = typeof project === "string" ? [] : project.tags || [];
    const targetPath = path.join(this.sandboxesDir, projectName);
    const mode = overrides.mode || this.mode;

    console.log(`\n${"=".repeat(56)}`);
    console.log(`🚀 [${this.sectionLabel}] PROJECT: ${projectName}`);
    if (projectTags.length > 0) {
      console.log(`🏷️  Tags: ${projectTags.join(", ")}`);
    }
    console.log(`${"=".repeat(56)}`);

    // ── STEP 1: Backup nexus knowledge (jika ada dari run sebelumnya)
    const nexusPath = path.join(targetPath, "nexus");
    const nexusBackup = path.join(targetPath, "_nexus_backup");
    if (await fs.pathExists(nexusPath)) {
      console.log(`   💾 Backing up existing nexus knowledge...`);
      await fs.copy(nexusPath, nexusBackup);
    }

    // ── STEP 2: Fresh Laravel install dari template
    console.log(`   📂 Installing fresh Laravel project...`);
    await this._installFromTemplate(targetPath, projectName);

    // ── STEP 3: Konfigurasi .env
    console.log(`   ⚙️  Configuring environment...`);
    await this._configureEnv(targetPath, projectName);

    // ── STEP 4: Restore nexus knowledge
    if (await fs.pathExists(nexusBackup)) {
      console.log(`   🧠 Restoring previous nexus knowledge...`);
      await fs.copy(nexusBackup, nexusPath);
      await fs.remove(nexusBackup);
    } else {
      await fs.ensureDir(nexusPath);
    }

    // ── STEP 5: Inject README project-spesifik
    const sectionDesc = overrides.sectionDescription || this.sectionLabel;
    const tagsStr = projectTags.length > 0 ? projectTags.join(", ") : "general";
    await fs.writeFile(
      path.join(targetPath, "README.md"),
      `# ${projectName}\n${sectionDesc} — Laravel TALL Stack Sandbox.\nTags: ${tagsStr}\nGenerated by Nexus Autonomous Pipeline.`,
    );

    // ── STEP 6: Hapus blueprint lama (Opsi A — selalu regenerate)
    const blueprintPath = path.join(targetPath, "NEXUS_BLUEPRINT.json");
    if (await fs.pathExists(blueprintPath)) {
      console.log(`   🔄 Removing old blueprint (always regenerate)...`);
      await fs.remove(blueprintPath);
    }

    // ── STEP 7: Migrate database (fresh + force)
    console.log(`   🗄️  Migrating SQLite database...`);
    await this._migrateDatabase(targetPath);

    // ── STEP 8: Reset cycle counter (guardrail — setiap project = fresh session)
    await piper.resetCycleCounter();

    // ── STEP 9: Nexus Autonomous Cycle
    console.log(`   🤖 Starting Nexus Autonomous Cycle (mode: ${mode})...`);
    const engine = new NexusEngine({ rootPath: targetPath });
    await engine.runCycle({ mode, allowSensitive: true });

    // FIX #3 — cleanCodeAndVerify() SUDAH dipanggil di dalam runCycle() (NexusEngine._doRunCycle).
    // Menghapus panggilan duplikat di sini untuk menghemat ~30-60 detik per project.
    // Step 9.5 removed: was causing double migrate:fresh + double stability loop.

    // ── STEP 10: Harvest wisdom ke Golden HUB
    console.log(`   🌾 Harvesting knowledge to Golden HUB...`);
    await engine.harvest(targetPath);

    console.log(`\n🚀 FULL LARAVEL APP READY - ${projectName}`);
    console.log(`📁 Path: ${targetPath}`);
    console.log(`🌐 Akses: http://localhost:8000 (php artisan serve)`);
    console.log(`✅ [${projectName}] pipeline complete.\n`);

    // FIX #11 — Cooldown antar project: beri sistem napas 2 detik
    // untuk释放 RAM/CPU sebelum project berikutnya
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  /**
   * Install project dari template Laravel murni.
   * Backup dan restore node_modules/vendor untuk efisiensi.
   */
  async _installFromTemplate(targetPath, projectName) {
    const hasDeps = await fs.pathExists(path.join(targetPath, "node_modules"));
    const hasVendor = await fs.pathExists(path.join(targetPath, "vendor"));

    const tempDeps = path.join(
      targetPath,
      "..",
      `${projectName}_node_modules_temp`,
    );
    const tempVendor = path.join(
      targetPath,
      "..",
      `${projectName}_vendor_temp`,
    );

    // Backup deps jika ada (untuk skip re-download)
    if (hasDeps) {
      await fs
        .rename(path.join(targetPath, "node_modules"), tempDeps)
        .catch(() => {});
    }
    if (hasVendor) {
      await fs
        .rename(path.join(targetPath, "vendor"), tempVendor)
        .catch(() => {});
    }

    // Hapus folder project lama
    if (await fs.pathExists(targetPath)) {
      await fs.remove(targetPath).catch(() => {});
    }
    await fs.ensureDir(targetPath);

    // Coba native orchestrator dulu (jika tersedia)
    const orchestratorPath = path.join(
      this.rootPath,
      "nexus",
      "native",
      "sandbox_orchestrator.exe",
    );
    let nativeCopySuccess = false;

    if (await fs.pathExists(orchestratorPath)) {
      try {
        console.log(`   🚀 Invoking C++ Native Sandbox Orchestrator...`);
        execSync(
          `"${orchestratorPath}" setup "${this.templatePath}" "${targetPath}" "${projectName}"`,
          { stdio: "ignore" },
        );
        nativeCopySuccess = true;
      } catch (e) {
        console.warn(
          `   ⚠️ Native copy failed: ${e.message}. Falling back to JS copy.`,
        );
      }
    }

    if (!nativeCopySuccess) {
      // Copy dari template Laravel murni (bukan url-shortener)
      await fs.copy(this.templatePath, targetPath, {
        filter: (src) => {
          // Jangan copy nexus folder dari template
          if (src.includes(path.join(TEMPLATE_NAME, "nexus"))) return false;
          // Skip node_modules dan vendor dari template (pakai yang di-backup)
          if (hasDeps && /(\\|\/)(node_modules)(\\|\/|$)/.test(src))
            return false;
          if (hasVendor && /(\\|\/)(vendor)(\\|\/|$)/.test(src)) return false;
          return true;
        },
      });
    }

    // Restore node_modules & vendor yang di-backup
    if (hasDeps && (await fs.pathExists(tempDeps))) {
      await fs
        .rename(tempDeps, path.join(targetPath, "node_modules"))
        .catch(() => {});
    }
    if (hasVendor && (await fs.pathExists(tempVendor))) {
      await fs
        .rename(tempVendor, path.join(targetPath, "vendor"))
        .catch(() => {});
    }
  }

  /**
   * Configure .env file untuk project sandbox.
   */
  async _configureEnv(targetPath, projectName) {
    const envPath = path.join(targetPath, ".env");
    if (await fs.pathExists(envPath)) {
      let env = await fs.readFile(envPath, "utf8");
      env = env.replace(/APP_NAME=.*/g, `APP_NAME=${projectName}`);
      env = env.replace(/DB_CONNECTION=.*/g, "DB_CONNECTION=sqlite");
      await fs.writeFile(envPath, env);
    }
  }

  /**
   * Setup SQLite database dan jalankan migrate.
   */
  async _migrateDatabase(targetPath) {
    const dbPath = path.join(targetPath, "database", "database.sqlite");
    await fs.remove(dbPath).catch(() => {});
    await fs.writeFile(dbPath, "");
    try {
      execSync("php artisan migrate:fresh --force", {
        cwd: targetPath,
        stdio: "ignore",
      });
      console.log(`   ✅ Database migrated.`);
    } catch (e) {
      console.warn(
        `   ⚠️  Migrate failed (non-fatal): ${e.message.slice(0, 80)}`,
      );
    }
  }
}

module.exports = SandboxProjectSetup;
