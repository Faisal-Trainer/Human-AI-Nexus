const fs = require("fs-extra");
const path = require("path");
const BasePhase = require("./BasePhase");
const localAI = require("../LocalIntelligence");
const NexusError = require("../NexusError");

class ImplementationPhase extends BasePhase {
  async run() {
    this.log(`🏗️ Phase 2.5: Implementation (Code Generation)...`, "info");

    const blueprintPath = path.join(
      this.engine.rootPath,
      "NEXUS_BLUEPRINT.json",
    );
    if (!(await fs.pathExists(blueprintPath))) {
      this.log(`⚠️ No blueprint found. Skipping implementation.`, "warning");
      return;
    }

    const blueprint = await fs.readJson(blueprintPath);

    // TypeSafe Blueprint Gate (fail-open validation before code generation)
    if (
      this.engine.typeSafeValidator &&
      this.engine.typeSafeValidator.enabled
    ) {
      this.log(
        `🛡️ Validating blueprint with TypeSafe before code generation...`,
        "info",
      );
      try {
        const tvResult =
          await this.engine.typeSafeValidator.validateBlueprint(blueprint);
        if (!tvResult.skipped) {
          if (!tvResult.ok) {
            this.log(
              `⚠️ TypeSafeValidator detected blueprint potential issues: ${tvResult.issues.join("; ")}`,
              "warning",
            );
          } else {
            this.log(
              `✅ TypeSafeValidator: Blueprint confirmed ready for implementation.`,
              "success",
            );
          }
        }
      } catch (err) {
        this.log(
          `⚠️ TypeSafeValidator check skipped: ${err.message}`,
          "warning",
        );
      }
    }

    // 1. Generate Models, Policies, and API Controllers
    const models = blueprint.models || [];
    for (const model of models) {
      await this.generateModel(model, blueprint);
      await this.generatePolicy(model, blueprint);
      await this.generateApiController(model, blueprint);
    }

    // 2. Generate Migrations
    const migrations = blueprint.migrations || [];
    for (const migration of migrations) {
      await this.generateMigration(migration, blueprint);
    }

    // Generate Factories
    const factories = blueprint.factories || [];
    for (const factory of factories) {
      await this.generateFactory(factory, blueprint);
    }

    // Generate Seeders
    const seeders = blueprint.seeders || [];
    for (const seeder of seeders) {
      await this.generateSeeder(seeder, blueprint);
    }
    // Wire DatabaseSeeder to invoke all individual seeders
    await this.wireDatabaseSeeder(seeders);

    // Generate Layout (Shell foundation before Livewire components & views)
    await this.generateLayout(blueprint);

    // 3. Generate Livewire Components
    const components = blueprint.livewire_components || [];
    for (const component of components) {
      await this.generateLivewireComponent(component, blueprint);
    }

    // Generate Routes
    const routes = blueprint.routes || [];
    if (routes.length > 0) {
      await this.generateRoutes(routes, blueprint);
    }

    // R-02: Bootstrap application dependencies, migrations, and assets
    await this.bootstrapApplication();

    this.log(`✅ Implementation Phase complete. Web app realized.`, "success");
  }

  async bootstrapApplication() {
    const root = this.engine.rootPath;

    // FIX #29 — Bootstrap cache: skip redundant installs if deps haven't changed
    const bootstrapCachePath = path.join(
      root,
      "memory",
      "cache",
      "bootstrap_state.json",
    );
    let lastBootstrap = null;
    try {
      if (await fs.pathExists(bootstrapCachePath)) {
        lastBootstrap = await fs.readJson(bootstrapCachePath);
      }
    } catch (_) {}

    // Check if composer.lock and package-lock.json haven't changed since last bootstrap
    const composerLockPath = path.join(root, "composer.lock");
    const packageLockPath = path.join(root, "package-lock.json");
    let currentHash = "";
    try {
      const crypto = require("crypto");
      const hash = crypto.createHash("md5");
      if (await fs.pathExists(composerLockPath))
        hash.update(await fs.readFile(composerLockPath));
      if (await fs.pathExists(packageLockPath))
        hash.update(await fs.readFile(packageLockPath));
      currentHash = hash.digest("hex");
    } catch (_) {}

    const depsUnchanged =
      lastBootstrap && lastBootstrap.lock_hash === currentHash;

    // Ensure sqlite database exists if DB_CONNECTION is sqlite (standard in Laravel 11)
    const envPath = path.join(root, ".env");
    if (await fs.pathExists(envPath)) {
      try {
        const envContent = await fs.readFile(envPath, "utf8");
        if (envContent.includes("DB_CONNECTION=sqlite")) {
          const dbPath = path.join(root, "database", "database.sqlite");
          await fs.ensureFile(dbPath);
          this.log(
            `      ✅ Ensured database/database.sqlite exists.`,
            "success",
          );
        }
      } catch (err) {
        this.log(
          `      ⚠️ Could not check/create database.sqlite: ${err.message}`,
          "warning",
        );
      }
    }

    this.log(
      `   📦 Bootstrapping Application (Composer, NPM, Auth, Migrations)...`,
      "info",
    );
    try {
      const hasVendor = await fs.pathExists(
        path.join(root, "vendor", "autoload.php"),
      );
      const hasBreeze = await fs.pathExists(
        path.join(root, "vendor", "laravel", "breeze"),
      );
      const hasNodeModules = await fs.pathExists(
        path.join(root, "node_modules"),
      );
      const hasBuildManifest = await fs.pathExists(
        path.join(root, "public", "build", "manifest.json"),
      );

      // FIX #29 — Skip composer install if deps unchanged and vendor exists
      if (!hasVendor) {
        this.log(`      Running 'composer install'...`, "info");
        await this._run("composer", ["install", "--no-interaction"], root);
      } else if (depsUnchanged) {
        this.log(
          `      ✅ Skipping 'composer install' (deps unchanged, lock hash matched).`,
          "success",
        );
      } else {
        this.log(
          `      ✅ Skipping 'composer install' (already installed).`,
          "success",
        );
      }

      // Phase B #8: Auth Scaffolding — deterministic guard for laravel/ui
      // BUGFIX: Auth::routes() belongs to laravel/ui (UiServiceProvider), NOT Breeze.
      // The NEXUS template uses Breeze (require routes/auth.php). When the LLM
      // hallucinates Auth::routes() into web.php while laravel/ui is absent,
      // `artisan route:list` / migrate boot crashes with RuntimeException.
      // So we must strip Auth::routes() whenever laravel/ui is NOT installed,
      // INDEPENDENT of whether Breeze is present (previously keyed on !hasBreeze,
      // which wrongly skipped the strip for every Breeze project).
      const hasUi = await fs.pathExists(
        path.join(root, "vendor", "laravel", "ui"),
      );
      if (!hasUi) {
        try {
          const webPath = path.join(root, "routes", "web.php");
          if (await fs.pathExists(webPath)) {
            let web = await fs.readFile(webPath, "utf8");
            const orig = web;
            web = web.replace(
              /Auth::routes\s*\([^;]*\)\s*;/g,
              "// Auth::routes() removed — laravel/ui not installed (Breeze uses routes/auth.php)",
            );
            if (web !== orig) {
              await fs.writeFile(webPath, web, "utf8");
              this.log(
                `      🔧 Stripped Auth::routes() from routes/web.php (laravel/ui not installed)`,
                "warning",
              );
            }
          }
        } catch (_) {}
      }

      if (!hasBreeze) {
        this.log(
          `      ⚠️ Laravel Breeze installation skipped per user request.`,
          "warning",
        );
      } else {
        this.log(
          `      ✅ Skipping Breeze scaffolding (already installed).`,
          "success",
        );
      }

      this.log(`      Running 'php artisan key:generate'...`, "info");
      await this._run("php", ["artisan", "key:generate", "--force"], root);

      this.log(`      Running 'php artisan migrate'...`, "info");
      try {
        const dbPath = path.join(root, "database", "database.sqlite");
        // Hardening: Absolute physical reset before bootstrap migration
        if (await fs.pathExists(dbPath)) {
          await fs.remove(dbPath);
        }
        await fs.ensureFile(dbPath);

        await this._run(
          "php",
          ["artisan", "migrate:fresh", "--force", "--seed"],
          root,
        );
      } catch (migrateErr) {
        this.log(
          `      ⚠️ migrate:fresh failed, attempting regular migrate...`,
          "warning",
        );
        await this._run("php", ["artisan", "migrate", "--force"], root);
      }

      // FIX #29 — Skip npm install if deps unchanged and node_modules exists
      if (!hasNodeModules) {
        this.log(`      Running 'npm install'...`, "info");
        await this._run("npm", ["install"], root);
      } else if (depsUnchanged) {
        this.log(
          `      ✅ Skipping 'npm install' (deps unchanged, lock hash matched).`,
          "success",
        );
      } else {
        this.log(
          `      ✅ Skipping 'npm install' (already installed).`,
          "success",
        );
      }

      if (!hasBuildManifest) {
        this.log(`      Running 'npm run build'...`, "info");
        await this._run("npm", ["run", "build"], root);
      } else {
        this.log(
          `      ✅ Skipping 'npm run build' (build manifest exists).`,
          "success",
        );
      }

      // FIX #29 — Save bootstrap state for next cycle
      await fs.ensureDir(path.dirname(bootstrapCachePath));
      await fs.writeJson(bootstrapCachePath, {
        lock_hash: currentHash,
        bootstrapped_at: Date.now(),
      });

      this.log("✅ Application bootstrapped and ready.", "success");
    } catch (e) {
      this.log(
        `⚠️ Bootstrapping partial success / failed: ${e.message}`,
        "warning",
      );
    }
  }

  // ── Lesson RAG ─────────────────────────────────────────────────────
  /**
   * Kumpulkan lesson NEXUS_LESSON_*.md terbaru dari knowledge local + Obsidian
   * "Update/Lessons", lalu pilih yang paling relevan dengan taskType.
   * Pool di-cache 5 menit per sesi agar tidak ada re-scan disk per generate.
   */
  async _collectLessonGuidance(taskType, maxLessons = 2) {
    try {
      const now = Date.now();
      if (!this._lessonPool || this._lessonPool.expiresAt < now) {
        const fg = require("fast-glob");
        const files = [];
        const scan = async (dir) => {
          if (!dir) return;
          const found = await fg("**/NEXUS_LESSON_*.md", {
            cwd: dir.replace(/\\/g, "/"),
            absolute: true,
            onlyFiles: true,
          }).catch(() => []);
          files.push(...found);
        };
        await scan(this.engine.knowledgePath);
        if (this.engine.obsidianBridge?.isActive?.()) {
          const updateRoot = this.engine.obsidianBridge.getUpdateVaultPath?.();
          if (updateRoot) await scan(path.join(updateRoot, "Lessons"));
        }
        // Dedup basename → mtime terbaru dulu → excerpt ringkas.
        const byBase = new Map();
        for (const f of files) {
          const base = path.basename(f);
          const mtime = (await fs.stat(f).catch(() => ({ mtimeMs: 0 })))
            .mtimeMs;
          const prev = byBase.get(base);
          if (!prev || mtime > prev.mtime) byBase.set(base, { f, mtime });
        }
        const list = [];
        for (const { f } of [...byBase.values()].sort(
          (a, b) => b.mtime - a.mtime,
        )) {
          const content = await fs.readFile(f, "utf8").catch(() => null);
          if (!content) continue;
          list.push({
            title: path.basename(f, ".md"),
            excerpt: content.replace(/\s+/g, " ").slice(0, 260),
          });
          if (list.length >= 8) break; // cukup pool 8 lesson terbaru
        }
        this._lessonPool = { expiresAt: now + 300000, list };
      }
      if (this._lessonPool.list.length === 0) return null;
      // Relevansi longgar: keyword taskType yang muncul di judul lesson.
      const kw = (taskType || "")
        .split("_")
        .filter((w) => w.length > 3 && w !== "build");
      const scored = this._lessonPool.list.map((l) => ({
        l,
        s: kw.reduce(
          (n, k) =>
            n +
            (l.title.toLowerCase().includes(k) ||
            l.excerpt.toLowerCase().includes(k)
              ? 1
              : 0),
          0,
        ),
      }));
      scored.sort((a, b) => b.s - a.s);
      const top = scored.slice(0, maxLessons).map((x) => x.l);
      const block = top.map((l) => `- ${l.title}: ${l.excerpt}`).join("\n");
      return `PAST LESSONS FROM PREVIOUS RUNS (do NOT repeat these mistakes):\n${block}`;
    } catch {
      return null; // fail-open: lesson injection tidak boleh mematikan generate
    }
  }

  async getCachedOrGenerate(prompt, taskType) {
    const crypto = require("crypto");
    const hash = crypto
      .createHash("md5")
      .update(prompt + taskType)
      .digest("hex");

    // FIX: Use GLOBAL cache directory (NEXUS-AI root level) instead of per-project path.
    // Per-project cache gets wiped when SandboxProjectSetup removes the project folder.
    // Global path: <nexus-root>/memory/cache/generated_code/
    const nexusRoot = path.resolve(__dirname, "..", "..", "..");
    const globalCacheDir = path.join(
      nexusRoot,
      "memory",
      "cache",
      "generated_code",
    );
    const globalCacheFile = path.join(globalCacheDir, `${hash}.txt`);

    // Also check the backup directory as secondary fallback
    const backupCacheDir = path.join(
      nexusRoot,
      "memory",
      "cache",
      "generated_code_backup",
    );
    const backupCacheFile = path.join(backupCacheDir, `${hash}.txt`);

    // Check global cache first
    if (await fs.pathExists(globalCacheFile)) {
      this.log(`      🎁 Code retrieved from global cache.`, "success");
      return await fs.readFile(globalCacheFile, "utf8");
    }

    // Check backup cache as fallback
    if (await fs.pathExists(backupCacheFile)) {
      this.log(`      🎁 Code retrieved from backup cache.`, "success");
      const content = await fs.readFile(backupCacheFile, "utf8");
      // Promote backup to active global cache for next time
      await fs.ensureDir(globalCacheDir);
      await fs.writeFile(globalCacheFile, content, "utf8");
      return content;
    }

    // Check per-project cache (legacy compatibility)
    const localCacheDir = path.join(
      this.engine.rootPath,
      "memory",
      "cache",
      "generated_code",
    );
    const localCacheFile = path.join(localCacheDir, `${hash}.txt`);
    if (await fs.pathExists(localCacheFile)) {
      this.log(`      🎁 Code retrieved from local project cache.`, "success");
      const content = await fs.readFile(localCacheFile, "utf8");
      // Promote to global cache
      await fs.ensureDir(globalCacheDir);
      await fs.writeFile(globalCacheFile, content, "utf8");
      return content;
    }

    // Cache MISS — generate via AI.
    // Lesson RAG: blok lesson ditempel HANYA ke prompt efektif yang dikirim ke
    // model — hash cache tetap dari prompt asli, jadi cache lintas proyek utuh.
    const lessonBlock = await this._collectLessonGuidance(taskType);
    const effectivePrompt = lessonBlock
      ? `${lessonBlock}\n\n${prompt}`
      : prompt;
    const response = await localAI.generate(effectivePrompt, taskType);
    if (response) {
      await fs.ensureDir(globalCacheDir);
      await fs.writeFile(globalCacheFile, response, "utf8");

      // Save dataset for SFT fine-tuning
      const datasetFile = path.join(globalCacheDir, `${hash}.json`);
      const datasetEntry = {
        prompt,
        output: response,
        taskType,
        timestamp: Date.now(),
      };
      await fs.writeFile(
        datasetFile,
        JSON.stringify(datasetEntry, null, 2),
        "utf8",
      );
    }
    return response;
  }

  async _run(command, args = [], cwd, timeoutMs = 300000) {
    const { spawn } = require("child_process");
    return new Promise((resolve, reject) => {
      let spawnCommand = command;
      let useShell = false; // Hardening: Avoid shell whenever possible

      if (process.platform === "win32") {
        if (command === "php") {
          useShell = false;
        } else if (command === "npm") {
          spawnCommand = "npm.cmd";
          useShell = true;
        } else if (command === "npx") {
          spawnCommand = "npx.cmd";
          useShell = true;
        } else if (command === "composer") {
          useShell = true;
        } else {
          useShell = true;
        }
      } else {
        useShell = false;
      }

      const proc = spawn(spawnCommand, args, { cwd, shell: useShell });
      let out = "",
        err = "";
      const timer = setTimeout(() => {
        proc.kill();
        reject(
          new Error(
            `Command ${command} ${args.join(" ")} timed out after ${timeoutMs}ms`,
          ),
        );
      }, timeoutMs);
      proc.stdout.on("data", (d) => (out += d.toString()));
      proc.stderr.on("data", (d) => (err += d.toString()));
      proc.on("close", (code) => {
        clearTimeout(timer);
        if (code === 0) {
          resolve(out.trim());
        } else {
          reject(
            new Error(
              `Command failed (code ${code}): ${err.trim() || out.trim()}`,
            ),
          );
        }
      });
      proc.on("error", (e) => {
        clearTimeout(timer);
        reject(e);
      });
    });
  }

  async validatePHPSyntax(filePath) {
    try {
      await this._run("php", ["-l", filePath], this.engine.rootPath);
      return true;
    } catch (e) {
      this.log(
        `      ⚠️ Syntax error detected in ${path.basename(filePath)}: ${e.message}`,
        "error",
      );
      return false;
    }
  }

  async generateModel(modelName, blueprint) {
    this.log(`   🧠 Generating Model: ${modelName}...`, "info");
    const modelPath = path.join(
      this.engine.rootPath,
      "app",
      "Models",
      `${modelName}.php`,
    );

    // CRITICAL: Protect Laravel's core Authenticatable User model from corruption
    if (modelName === "User" && (await fs.pathExists(modelPath))) {
      // Preserve the core model, but generically register any extra
      // blueprint-declared User columns (e.g. role) into its fillable, and
      // inject inverse hasMany() relations for blueprint models that carry a
      // user_id FK (views reading $user->shortUrls crash on null chains when
      // the relation does not exist).
      const userSchema = blueprint.schema ? blueprint.schema["User"] : null;
      const extra = this._extraUserColumns(userSchema).map((c) => c.name);
      try {
        const cur = await fs.readFile(modelPath, "utf8");
        let upd = cur;
        if (extra.length > 0) {
          upd = this._ensureUserFillable(upd, extra);
          if (upd !== cur) {
            this.log(
              `      🔧 Registered extra User fillable column(s): ${extra.join(", ")}`,
              "warning",
            );
          }
        }
        const rel = this._ensureUserRelations(upd, blueprint);
        if (rel.code !== upd) {
          upd = rel.code;
          this.log(
            `      🔗 Injected User relation method(s): ${rel.added.join(", ")}`,
            "warning",
          );
        }
        if (upd !== cur) {
          await fs.writeFile(modelPath, upd, "utf8");
        }
      } catch (_) {}
      this.log(
        `      🛡️ Preserving core Laravel Authenticatable User.php model.`,
        "success",
      );
      return;
    }

    const tableName = this._toSnakePlural(modelName);
    const modelSchema =
      blueprint.schema && blueprint.schema[modelName]
        ? JSON.stringify(blueprint.schema[modelName], null, 2)
        : "Guess appropriate columns";
    const prompt = `Write a complete Laravel 11 Eloquent Model class for '${modelName}' following ALL these Laravel conventions:

FILE STRUCTURE:
- Start with: <?php
- Namespace: App\\Models
- Import traits EXPLICITLY with full use statements (never assume auto-import)

REQUIRED USE STATEMENTS (always include all of these, exactly as written):
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\SoftDeletes;
use Illuminate\\Database\\Eloquent\\Concerns\\HasUuids;

DO NOT import or use any other Illuminate classes. DO NOT use any traits other than HasFactory, HasUuids, SoftDeletes.

CLASS DEFINITION:
class ${modelName} extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $table = '${tableName}';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        // list all writable columns except id, created_at, updated_at, deleted_at
    ];

    protected $casts = [
        'id' => 'string',
    ];

    // TODO: Write explicit relationship methods (BelongsTo, HasMany, etc.) based on the schema.
    // Replace this comment with actual relationship methods.
}

APPLICATION CONTEXT:
- Project: ${blueprint.project_name}
- Model: ${modelName}
- Table: ${tableName}
- Schema: ${modelSchema} // USE EXACTLY THESE COLUMNS FOR $fillable

OUTPUT ONLY the raw PHP code starting with <?php. No markdown, no explanation, no extra text.`;

    const response = await this.getCachedOrGenerate(
      prompt,
      "build_model_migration",
    );
    const knownModels = blueprint.models || [];
    const modelSchemaObj = blueprint.schema
      ? blueprint.schema[modelName]
      : null;

    let finalCode = response ? this.cleanLLMOutput(response) : null;
    if (!finalCode) {
      this.log(
        `      ⚠️ LLM returned empty. Writing safe fallback for ${modelName}.php`,
        "warning",
      );
      finalCode = this._safeFallbackModel(modelName, tableName);
    }

    // Deterministic guard: lock $fillable + relationships to blueprint.schema
    finalCode = this._ensureModelFillable(
      modelName,
      modelSchemaObj,
      knownModels,
      finalCode,
    );

    await fs.ensureDir(path.dirname(modelPath));
    await fs.writeFile(modelPath, finalCode);
    let syntaxOk = await this.validatePHPSyntax(modelPath);
    if (!syntaxOk) {
      this.log(
        `      ⚠️ Syntax error in generated model. Writing safe fallback for ${modelName}.php`,
        "warning",
      );
      let fb = this._safeFallbackModel(modelName, tableName);
      fb = this._ensureModelFillable(
        modelName,
        modelSchemaObj,
        knownModels,
        fb,
      );
      await fs.writeFile(modelPath, fb);
    }
    this.log(`      ✅ Saved ${modelName}.php`, "success");
  }

  _safeFallbackModel(modelName, tableName) {
    if (modelName === "User") {
      return `<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\HasFactory;\nuse Illuminate\\Foundation\\Auth\\User as Authenticatable;\nuse Illuminate\\Notifications\\Notifiable;\n\nclass User extends Authenticatable\n{\n    use HasFactory, Notifiable;\n\n    protected $fillable = [\n        'name',\n        'email',\n        'password',\n        'role',\n    ];\n\n    protected $hidden = [\n        'password',\n        'remember_token',\n    ];\n\n    protected function casts(): array\n    {\n        return [\n            'email_verified_at' => 'datetime',\n            'password' => 'hashed',\n        ];\n    }\n}\n`;
    }
    return `<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\HasFactory;\nuse Illuminate\\Database\\Eloquent\\Model;\nuse Illuminate\\Database\\Eloquent\\SoftDeletes;\nuse Illuminate\\Database\\Eloquent\\Concerns\\HasUuids;\n\nclass ${modelName} extends Model\n{\n    use HasFactory, HasUuids, SoftDeletes;\n\n    protected $table = '${tableName}';\n    protected $primaryKey = 'id';\n    public $incrementing = false;\n    protected $keyType = 'string';\n\n    protected $fillable = ['name'];\n\n    protected $casts = ['id' => 'string'];\n}\n`;
  }

  async generateMigration(migrationName, blueprint) {
    this.log(`   🗄️ Generating Migration: ${migrationName}...`, "info");
    const tableName = migrationName
      .replace(/^create_/, "")
      .replace(/_table$/, "");

    // STRICT PROTECTION: Preserve core Laravel 11 auth tables (users, user, password_reset_tokens, sessions)
    if (tableName === "users" || tableName === "user") {
      const defaultUsersMigration = path.join(
        this.engine.rootPath,
        "database",
        "migrations",
        "0001_01_01_000000_create_users_table.php",
      );
      if (await fs.pathExists(defaultUsersMigration)) {
        // Generic: realise any blueprint-declared User columns missing from the
        // core table via an ADDITIVE migration (never edit the core 0001 file).
        const userSchema = blueprint.schema ? blueprint.schema["User"] : null;
        const extraCols = this._extraUserColumns(userSchema);
        if (extraCols.length > 0) {
          const migrationDir = path.join(
            this.engine.rootPath,
            "database",
            "migrations",
          );
          const now = new Date();
          const datePrefix = `${now.getFullYear()}_${String(
            now.getMonth() + 1,
          ).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;
          const timestamp = Math.floor(Date.now() / 1000);
          const addFile = `${datePrefix}_${timestamp}_add_attributes_to_users_table.php`;
          if (await fs.pathExists(migrationDir)) {
            for (const f of await fs.readdir(migrationDir)) {
              if (f.includes("add_attributes_to_users_table")) {
                await fs.remove(path.join(migrationDir, f));
              }
            }
          }
          const addPath = path.join(migrationDir, addFile);
          await fs.ensureDir(migrationDir);
          await fs.writeFile(
            addPath,
            this._buildAddColumnsToUsersMigration(extraCols),
          );
          const ok = await this.validatePHPSyntax(addPath);
          if (!ok) await fs.remove(addPath);
          this.log(
            ok
              ? `      ➕ Additive users migration ${addFile} for column(s): ${extraCols
                  .map((c) => c.name)
                  .join(", ")}`
              : `      ⚠️ Additive users migration rejected (syntax) for: ${extraCols
                  .map((c) => c.name)
                  .join(", ")}`,
            ok ? "success" : "warning",
          );
        }
        this.log(
          `      🛡️ Preserving core Laravel 0001_01_01_000000_create_users_table.php. Skipping custom ${tableName} migration.`,
          "success",
        );
        return;
      }
    }

    // Find matching schema
    const models = blueprint.models || [];
    let targetModelName = null;
    for (const m of models) {
      if (this._toSnakePlural(m) === tableName) {
        targetModelName = m;
        break;
      }
    }
    const modelSchema =
      targetModelName && blueprint.schema && blueprint.schema[targetModelName]
        ? JSON.stringify(blueprint.schema[targetModelName], null, 2)
        : "Guess appropriate columns";

    // Read the database rules SOT
    let databaseRules = "";
    try {
      databaseRules = await fs.readFile(
        path.join(
          this.engine.rootPath,
          "memory",
          "distilled",
          "database",
          "NEXUS_DISTILLATION_DATABASE.md",
        ),
        "utf8",
      );
    } catch (e) {}

    const prompt = `Write a complete Laravel 11 database migration for table '${tableName}' following ALL these Laravel conventions:

FILE STRUCTURE:
- Start with: <?php
- NO namespace declaration (migrations NEVER have namespaces)
- Import statements come directly after <?php

REQUIRED USE STATEMENTS (always include exactly these three):
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

// NOTE: ONLY USE a single primary key. Use $table->uuid('id')->primary(); DO NOT add $table->id() OR any other primary key declaration. Do NOT pass length arguments to unsignedBigInteger.
MIGRATION SYNTAX (use anonymous class — never use named class):
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('${tableName}', function (Blueprint $table) {
            $table->uuid('id')->primary();      // THE ONLY primary key. Never add $table->id() or a second primary().
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            // Columns derived strictly from the APPLICATION CONTEXT schema:
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('${tableName}');
    }
};

COLUMN RULES:
- Primary key MUST be: $table->uuid('id')->primary(); (do not use $table->id())
- Foreign key for user_id MUST be: $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
- Other foreign keys MUST be: $table->foreignUuid('xxx_id')->constrained()->cascadeOnDelete();
- Always add softDeletes() for data that should be recoverable
- Always add index() on columns used in WHERE/ORDER BY
- Use nullable() only when the column is truly optional
- String columns default to varchar(255); use text() for long content
- STRICT LARAVEL SYNTAX: NEVER append SQL words like 'NOT NULL' or 'NOT' to column declarations. In Laravel, all columns are NOT NULL by default unless ->nullable() is specified.

DATABASE SOT RULES (MUST FOLLOW STRICTLY):
${databaseRules}

APPLICATION CONTEXT:
- Project: ${blueprint.project_name}
- Table: ${tableName}
- Schema: ${modelSchema} // USE EXACTLY THESE COLUMNS AND NO OTHERS

OUTPUT ONLY the raw PHP code starting with <?php. No markdown, no explanation.`;

    const response = await this.getCachedOrGenerate(
      prompt,
      "build_model_migration",
    );
    if (response) {
      let cleanCode = this.cleanLLMOutput(response);

      // Sanitize SQL keywords and prompt hallucination artifacts that break PHP syntax
      cleanCode = cleanCode.replace(
        /->primary\(\)\s*NOT\s*(?:id|\$table->id)?\(\);?/gi,
        "->primary();",
      );
      cleanCode = cleanCode.replace(/\s+NOT\s+NULL/gi, "");
      cleanCode = cleanCode.replace(/->NOT\s+NULL\(\)/gi, "");
      cleanCode = cleanCode.replace(/->notNull\(\)/gi, "");
      cleanCode = cleanCode.replace(
        /->nullable\(\)\s*NOT\s*NULL/gi,
        "->nullable()",
      );
      cleanCode = cleanCode.replace(
        /->foreignUuid\(['"]user_id['"]\)/gi,
        "->foreignId('user_id')",
      );

      // Auto-convert named migration class to Laravel anonymous class to prevent collisions
      if (
        cleanCode.includes("class ") &&
        cleanCode.includes(" extends Migration")
      ) {
        cleanCode = cleanCode.replace(
          /class\s+\w+\s+extends\s+Migration/i,
          "return new class extends Migration",
        );
      }

      if (
        cleanCode.includes("return new class") &&
        !cleanCode.trimEnd().endsWith(";")
      ) {
        cleanCode = cleanCode.trimEnd() + ";";
      }

      // Ensure essential Laravel migration imports are present programmatically
      let importsToInject = "";
      if (!cleanCode.includes("Illuminate\\Database\\Migrations\\Migration")) {
        importsToInject += "use Illuminate\\Database\\Migrations\\Migration;\n";
      }
      if (!cleanCode.includes("Illuminate\\Support\\Facades\\Schema")) {
        importsToInject += "use Illuminate\\Support\\Facades\\Schema;\n";
      }
      if (!cleanCode.includes("Illuminate\\Database\\Schema\\Blueprint")) {
        importsToInject += "use Illuminate\\Database\\Schema\\Blueprint;\n";
      }

      if (importsToInject) {
        // PHP namespace must be the first statement. If namespace is present, inject imports after it.
        if (cleanCode.match(/namespace\s+[^;]+;/i)) {
          cleanCode = cleanCode.replace(
            /(namespace\s+[^;]+;)/i,
            `$1\n\n${importsToInject}`,
          );
        } else {
          cleanCode = cleanCode.replace(
            /(<\?php)/i,
            `$1\n\n${importsToInject}`,
          );
        }
      }

      // Deterministic guard: inject any blueprint.schema columns the LLM dropped
      if (
        targetModelName &&
        blueprint.schema &&
        blueprint.schema[targetModelName]
      ) {
        const ensured = this._ensureMigrationColumns(
          tableName,
          blueprint.schema[targetModelName],
          cleanCode,
        );
        if (ensured.injected.length > 0) {
          cleanCode = ensured.code;
          this.log(
            `      🔧 Injected ${ensured.injected.length} missing schema column(s) into ${tableName}: ${ensured.injected.join(", ")}`,
            "warning",
          );
        }
      }

      // Deterministic guard: strip hallucinated bare Blueprint column-modifiers
      // (e.g. `$table->nullable();`) — these are column modifiers, NOT Blueprint
      // methods, and crash `php artisan migrate` with BadMethodCallException.
      const sanitizedMigration = this._sanitizeMigration(cleanCode);
      if (sanitizedMigration !== cleanCode) {
        cleanCode = sanitizedMigration;
        this.log(
          `      🧹 Stripped invalid bare Blueprint modifier call(s) from ${tableName} migration`,
          "warning",
        );
      }

      // Deterministic guard: collapse duplicate column/helper calls inside a
      // Schema::create block. The local model frequently emits `$table->timestamps()`
      // twice (once in the body, once appended), and _ensureMigrationColumns can
      // re-add an explicit created_at/updated_at that timestamps() already defines,
      // so `php artisan migrate` fails with "duplicate column name: created_at".
      const dedupedMigration = this._dedupeMigrationColumns(cleanCode);
      if (dedupedMigration !== cleanCode) {
        cleanCode = dedupedMigration;
        this.log(
          `      ♻️ Deduplicated duplicate column/helper calls in ${tableName} migration`,
          "warning",
        );
      }

      // FIX #14 — Dynamic timestamp: gunakan tanggal hari ini, bukan hardcoded '2026_06_01'
      const now = new Date();
      const datePrefix = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;
      const timestamp = Math.floor(Date.now() / 1000);
      const migrationFilename = `${datePrefix}_${timestamp}_${migrationName}.php`;
      const migrationDir = path.join(
        this.engine.rootPath,
        "database",
        "migrations",
      );

      // Prevent duplicate migrations: delete any existing migration that includes this migrationName
      if (await fs.pathExists(migrationDir)) {
        const existingFiles = await fs.readdir(migrationDir);
        for (const file of existingFiles) {
          // STRICT GUARD: NEVER delete Laravel core template migrations (0001_01_01_*)
          if (file.startsWith("0001_01_01_")) continue;
          if (file.includes(migrationName)) {
            await fs.remove(path.join(migrationDir, file));
            this.log(
              `      🗑️ Removed old duplicate migration: ${file}`,
              "warning",
            );
          }
        }
      }

      const migrationPath = path.join(migrationDir, migrationFilename);
      await fs.ensureDir(migrationDir);
      await fs.writeFile(migrationPath, cleanCode);
      const syntaxOk = await this.validatePHPSyntax(migrationPath);
      if (!syntaxOk) {
        this.log(
          `      ⚠️ Syntax error in generated migration. Writing safe fallback for ${migrationFilename}`,
          "warning",
        );
        let fb = this._safeFallbackMigration(tableName);
        if (
          targetModelName &&
          blueprint.schema &&
          blueprint.schema[targetModelName]
        ) {
          fb = this._ensureMigrationColumns(
            tableName,
            blueprint.schema[targetModelName],
            fb,
          ).code;
        }
        await fs.writeFile(migrationPath, fb);
      }
      this.log(`      ✅ Saved ${migrationFilename}`, "success");
    } else {
      this.log(
        `      ❌ Failed to generate migration ${migrationName}.`,
        "error",
      );
    }
  }

  async generateLivewireComponent(componentName, blueprint) {
    this.log(
      `   🔌 Generating Livewire Component: ${componentName}...`,
      "info",
    );
    const className = this.toPascalCase(componentName);
    const kebabName = this.toKebabCase(componentName);
    const fullSchema = blueprint.schema
      ? JSON.stringify(blueprint.schema, null, 2)
      : "No schema";
    const knownModels = blueprint.models || [];
    const contractVars = knownModels.map((mo) => this._camelPlural(mo));
    const exampleVar = contractVars[0] || "items";
    const exampleModel = knownModels[0]
      ? `\\App\\Models\\${knownModels[0]}`
      : "collect";
    const contractLine =
      `\nVIEW VARIABLE CONTRACT (class & view MUST stay consistent):\n` +
      `- Collection variables derived from models: ${contractVars.map((v) => "$" + v).join(", ") || "(none)"}.\n` +
      `- Every variable used in @foreach/@forelse must be provided by render(), e.g. return view('livewire.${kebabName}', ['${exampleVar}' => ${exampleModel}::all()]).\n` +
      `- NEVER declare an empty public property with the same name as a render() view key: Livewire applies public properties AFTER render() data, so the empty property overrides the collection with null. Iterated collections belong in render() ONLY.\n` +
      `- Public properties are only for form-bound scalars. Never reference an undefined view variable, and never read a property on a possibly-null object without the null-safe operator (e.g. $user?->name).\n` +
      `- A typed public property (e.g. public ShortUrl $shortUrl;) MUST be initialized before it is read: give it a default value, declare it nullable with a null default (public ?ShortUrl $shortUrl = null;), or assign it in mount(). NEVER read $this->prop in render()/the view for a typed property that mount() does not initialize — that throws "Typed property must not be accessed before initialization".` +
      "\n" +
      `- Every Livewire action the Blade invokes (wire:click="method(...)", wire:submit="method", wire:change=..., etc.) MUST have a matching public method() on the component class that implements it. NEVER emit a wire directive that calls a method the class does not define — that throws "Unable to call component method" on click.`;

    // Generate PHP Class
    const phpPrompt = `Write a complete Livewire component class for '${className}'. Namespace: App\\Livewire. It should handle the logic for a ${blueprint.project_name}.
Include public properties corresponding to the model, basic methods (save, delete, refresh), and a render() method returning view('livewire.${kebabName}').
Use modern Livewire 3/4 standards.

SCHEMA REFERENCE:
${fullSchema}
Make sure public properties match the columns in the schema if this component manages a model.
${contractLine}
    
Output ONLY the raw PHP code, starting with <?php. No markdown blocks.`;
    const phpResponse = await this.getCachedOrGenerate(
      phpPrompt,
      "build_livewire_component",
    );

    if (phpResponse) {
      let cleanPhp = this.cleanLLMOutput(phpResponse);
      // Ensure render method exists if omitted
      if (!cleanPhp.includes("function render")) {
        const lastBrace = cleanPhp.lastIndexOf("}");
        if (lastBrace !== -1) {
          cleanPhp =
            cleanPhp.slice(0, lastBrace) +
            `\n    public function render()\n    {\n        return view('livewire.${kebabName}');\n    }\n}\n`;
        }
      }
      const phpPath = path.join(
        this.engine.rootPath,
        "app",
        "Livewire",
        `${className}.php`,
      );
      await fs.ensureDir(path.dirname(phpPath));
      await fs.writeFile(phpPath, cleanPhp);
      const syntaxOk = await this.validatePHPSyntax(phpPath);
      if (!syntaxOk) {
        // HARD GATE: never keep an unparseable Livewire class on disk — the
        // reconciler below still heals the safe fallback (stubs actions/vars).
        this.log(
          `      ⚠️ Syntax error in generated Livewire component. Writing safe fallback for ${className}.php`,
          "warning",
        );
        await fs.writeFile(
          phpPath,
          this._safeFallbackLivewire(className, kebabName),
        );
      }
      this.log(`      ✅ Saved ${className}.php`, "success");
    }

    // Generate Blade View
    const bladePrompt = `Write a complete, highly-polished Livewire blade view for the '${className}' component in a ${blueprint.project_name} application.
Use modern Tailwind CSS styling (cards, subtle borders, shadows, inputs, badges, action buttons) and Alpine.js where appropriate.
Use wire:model and wire:click for interactions.

CRITICAL RULES:
1. This is a Livewire component partial, NOT a full HTML page.
2. DO NOT include <!DOCTYPE html>, <html>, <head>, or <body> tags.
3. Wrap all content inside a SINGLE root <div> element.
4. Include realistic mock items, empty states, or table/card listings so the UI looks active and alive.
5. Iterate collections with @forelse($collection as $item) ... @empty ... @endforelse using the exact contract variable names below, and always include an @empty branch. NEVER pair @foreach with @empty or @endforelse — @empty is only valid inside @forelse.

SCHEMA REFERENCE:
${fullSchema}
Ensure your wire:model attributes match the properties corresponding to the schema.
${contractLine}
    
Output ONLY the raw HTML/Blade code. No markdown blocks.`;
    const bladeResponse = await this.getCachedOrGenerate(
      bladePrompt,
      "build_view",
    );

    if (bladeResponse) {
      const cleanBlade = this.cleanLivewireBladeOutput(bladeResponse);
      const bladePath = path.join(
        this.engine.rootPath,
        "resources",
        "views",
        "livewire",
        `${kebabName}.blade.php`,
      );
      await fs.ensureDir(path.dirname(bladePath));
      await fs.writeFile(bladePath, cleanBlade);
      this.log(`      ✅ Saved ${kebabName}.blade.php`, "success");
    }

    // Deterministic reconciliation: guarantee the class provides every variable
    // the view consumes and null-guard property reads, so the rendered page can
    // never 500 with "undefined variable" / "Attempt to read property on null".
    await this._reconcileLivewireOnDisk(className, kebabName, blueprint);
  }

  // camelCase plural of a model name -> view collection variable.
  // ShortUrl -> shortUrls, ClickStat -> clickStats, Category -> categories
  _camelPlural(model) {
    const camel = model.charAt(0).toLowerCase() + model.slice(1);
    if (/(s|x|z|ch|sh)$/i.test(camel)) return camel + "es";
    if (/[^aeiou]y$/i.test(camel)) return camel.slice(0, -1) + "ies";
    return camel + "s";
  }

  _safeFallbackLivewire(className, kebabName) {
    return `<?php\n\nnamespace App\\Livewire;\n\nuse Livewire\\Component;\n\nclass ${className} extends Component\n{\n    public function render()\n    {\n        return view('livewire.${kebabName}');\n    }\n}\n`;
  }

  async _reconcileLivewireOnDisk(className, kebabName, blueprint) {
    const phpPath = path.join(
      this.engine.rootPath,
      "app",
      "Livewire",
      `${className}.php`,
    );
    const bladePath = path.join(
      this.engine.rootPath,
      "resources",
      "views",
      "livewire",
      `${kebabName}.blade.php`,
    );
    if (!(await fs.pathExists(phpPath)) || !(await fs.pathExists(bladePath))) {
      return;
    }
    try {
      const classCode = await fs.readFile(phpPath, "utf8");
      const viewCode = await fs.readFile(bladePath, "utf8");
      const knownModels = (blueprint && blueprint.models) || [];
      const rec = this._reconcileLivewireComponent(
        className,
        kebabName,
        classCode,
        viewCode,
        knownModels,
      );
      if (!rec.changed) return;
      await fs.writeFile(phpPath, rec.classCode);
      await fs.writeFile(bladePath, rec.viewCode);
      const reconciledOk = await this.validatePHPSyntax(phpPath);
      if (!reconciledOk) {
        // HARD GATE: reconciliation must never leave broken syntax on disk —
        // roll back to the pre-reconcile versions (validated at save time).
        await fs.writeFile(phpPath, classCode);
        await fs.writeFile(bladePath, viewCode);
        this.log(
          `      ⛔ Reconcile broke ${className}.php syntax — rolled back to pre-reconcile code.`,
          "warning",
        );
        return;
      }
      this.log(
        `      🔗 Reconciled ${className} <-> view: ${rec.notes.join("; ")}`,
        "info",
      );
    } catch (e) {
      this.log(
        `      ⚠️ Livewire reconcile skipped: ${String(e.message).slice(0, 80)}`,
        "warning",
      );
    }
  }

  _reconcileLivewireComponent(
    className,
    kebabName,
    classCode,
    viewCode,
    knownModels,
  ) {
    const notes = [];
    let changed = false;

    // 0) Repair mismatched loop directives (@foreach ... @empty ... @endforelse)
    // on disk too, so re-runs heal previously generated components.
    const fixedView = this._fixBladeLoopDirectives(viewCode);
    if (fixedView !== viewCode) {
      viewCode = fixedView;
      changed = true;
      notes.push("repaired unbalanced Blade loop directives");
    }

    // 0.5) Add missing `use App\Models\X;` imports for Eloquent models the class
    // references by short name (ShortUrl::all(), ClickStat::paginate(), a typed
    // property, or `new X`). Without the import PHP resolves the bare class under
    // the component's own namespace and throws "Class 'App\Livewire\X' not found".
    const imp = this._ensureLivewireModelImports(classCode, knownModels);
    if (imp.changed) {
      classCode = imp.classCode;
      changed = true;
      notes.push(`imported model(s): ${imp.added.join(", ")}`);
    }

    // 1) Variables the class already provides to the view.
    let m;
    const publicProps = new Set();
    const propRe = /public\s+\$(\w+)/g;
    while ((m = propRe.exec(classCode))) publicProps.add(m[1]);

    const renderBody = this._extractMethodBody(classCode, "render") || "";
    const renderProvided = new Set();
    const keyRe = /['"](\w+)['"]\s*=>/g;
    while ((m = keyRe.exec(renderBody))) renderProvided.add(m[1]);
    const compactRe = /compact\(([^)]*)\)/g;
    let cm;
    while ((cm = compactRe.exec(renderBody))) {
      const nameRe = /['"](\w+)['"]/g;
      let nm;
      while ((nm = nameRe.exec(cm[1]))) renderProvided.add(nm[1]);
    }
    const withRe = /->with\(\s*['"](\w+)['"]/g;
    while ((m = withRe.exec(renderBody))) renderProvided.add(m[1]);

    // 2) Collections the view iterates.
    const foreachVars = new Set();
    const feRe = /@(?:foreach|forelse)\s*\(\s*\$(\w+)\s+as\s+/gi;
    while ((m = feRe.exec(viewCode))) foreachVars.add(m[1]);

    // 2.5) Drop public properties that shadow an iterated collection. Livewire's
    // HandleComponents::getView() applies ->with($publicProperties) AFTER the
    // render() view data, so an unassigned `public $users;` overrides
    // `'users' => User::all()` with null and the view crashes with
    // "foreach() argument must be of type array|object, null given".
    for (const varName of foreachVars) {
      if (!publicProps.has(varName)) continue;
      if (new RegExp(`\\$this->${varName}\\b`).test(classCode)) continue; // property in use elsewhere
      const next = classCode.replace(
        new RegExp(
          `[ \\t]*public\\s+\\$${varName}\\s*(?:=\\s*null)?;[ \\t]*\\r?\\n`,
        ),
        "",
      );
      if (next !== classCode) {
        classCode = next;
        changed = true;
        notes.push(`removed public $${varName} shadowing render() data`);
      }
    }

    // 3) Supply any missing collection from the matching model via render().
    const entries = [];
    for (const varName of foreachVars) {
      if (renderProvided.has(varName)) continue;
      const model = knownModels.find((md) => this._camelPlural(md) === varName);
      const php = model ? `\\App\\Models\\${model}::all()` : "collect([])";
      entries.push({ key: varName, php });
    }
    if (entries.length) {
      const next = this._injectRenderData(classCode, kebabName, entries);
      if (next !== classCode) {
        classCode = next;
        changed = true;
        notes.push(
          `render() supplies ${entries.map((e) => "$" + e.key).join(", ")}`,
        );
      }
    }

    // 3.5) Initialize typed public properties that are read before assignment.
    // A `public SomeModel $x;` with no default and no mount() assignment makes
    // render()/the view throw "Typed property ... must not be accessed before
    // initialization". Model-typed props get `new Model()` in mount(); the rest
    // get a nullable null default so the read yields null (then null-safe below).
    const init = this._ensureLivewirePropertyInit(classCode, knownModels);
    if (init.changed) {
      classCode = init.classCode;
      changed = true;
      notes.push(...init.notes);
    }

    // 3.6) Define action methods the view invokes through Livewire event
    // directives (wire:click="deleteShortUrl(...)", wire:submit="save", ...).
    // When the LLM generates the Blade but omits the matching public method, the
    // click throws "Unable to call component method" at request time. Inject a
    // safe stub so the component never fatals; real logic comes from the prompt.
    const actions = this._ensureLivewireActionMethods(classCode, viewCode);
    if (actions.changed) {
      classCode = actions.classCode;
      changed = true;
      notes.push(`stubbed missing action(s): ${actions.added.join(", ")}`);
    }

    // 4) Null-safe every property read so "Attempt to read property on null"
    //    can never crash the page (a null-safe read on a real object is a no-op).
    const nulled = this._nullSafeViewReads(viewCode);
    if (nulled !== viewCode) {
      viewCode = nulled;
      changed = true;
      notes.push("null-safe property reads");
    }

    return { classCode, viewCode, changed, notes };
  }

  _nullSafeViewReads(viewCode) {
    // Guard EVERY hop, not just the first: `$user->shortUrls->first()->title`
    // must become `$user?->shortUrls?->first()?->title`. A first-hop-only fix
    // still crashes with "Call to a member function first() on null" when an
    // intermediate relation is missing or unpopulated.
    return viewCode.replace(/\$\w+(?:\??->[\w()]+)+/g, (chain) =>
      chain.replace(/(?<!\?)->/g, "?->"),
    );
  }

  _extractMethodBody(classCode, methodName) {
    const sig = new RegExp(`function\\s+${methodName}\\s*\\([^)]*\\)\\s*\\{`);
    const match = sig.exec(classCode);
    if (!match) return null;
    let i = match.index + match[0].length;
    let depth = 1;
    const start = i;
    while (i < classCode.length && depth > 0) {
      const ch = classCode[i];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      i++;
    }
    return depth === 0 ? classCode.slice(start, i - 1) : null;
  }

  _injectRenderData(classCode, kebabName, entries) {
    if (!entries.length) return classCode;
    const dataLiteral = entries.map((e) => `'${e.key}' => ${e.php}`).join(", ");
    const vn = `livewire.${kebabName}`;
    const esc = vn.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // a) view('livewire.x') -> view('livewire.x', [data])
    const noData = new RegExp(`view\\(\\s*(['"])${esc}\\1\\s*\\)`);
    if (noData.test(classCode)) {
      return classCode.replace(
        noData,
        (_m, q) => `view(${q}${vn}${q}, [${dataLiteral}])`,
      );
    }

    // b) view('livewire.x', [ ... ]) -> append into the existing array
    const arrRe = new RegExp(
      `(view\\(\\s*(['"])${esc}\\2\\s*,\\s*)(\\[[\\s\\S]*?\\])`,
    );
    if (arrRe.test(classCode)) {
      return classCode.replace(arrRe, (_m, head, _q, arr) => {
        // Strip the brackets and any trailing comma so an existing
        // `['k' => v,]` (trailing comma) does not become `..., , 'new' => ...`.
        const body = arr.slice(1, -1).replace(/,\s*$/, "");
        const sep = body.trim() ? "," : "";
        return `${head}[${body}${sep} ${dataLiteral}]`;
      });
    }

    // c) view('livewire.x', compact(...)) -> array_merge(compact(...), [data])
    const compRe = new RegExp(
      `(view\\(\\s*(['"])${esc}\\2\\s*,\\s*)(compact\\([^)]*\\))(\\s*\\)))`,
    );
    if (compRe.test(classCode)) {
      return classCode.replace(
        compRe,
        (_m, head, _q, c, tail) =>
          `${head}array_merge(${c}, [${dataLiteral}])${tail}`,
      );
    }

    return classCode;
  }

  _ensureLivewireActionMethods(classCode, viewCode) {
    if (!classCode || !viewCode)
      return { classCode, changed: false, added: [] };
    const EVENT =
      "(?:click|submit|change|input|keydown|keyup|keypress|focus|blur|action|request|dblclick|mouseenter|mouseleave|mousedown|mouseup)";
    const dirRe = new RegExp(
      `wire:${EVENT}(?:\\.[\\w-]+)*\\s*=\\s*"([^"]*)"`,
      "g",
    );
    const needed = new Set();
    let dm;
    while ((dm = dirRe.exec(viewCode))) {
      // The invoked component method is the leading identifier of the value.
      // `$refresh`, `$emit(...)`, `$dispatch(...)` start with `$` and are skipped.
      const im = /^\s*([A-Za-z_]\w*)\s*\(?/.exec(dm[1]);
      if (!im) continue;
      const name = im[1];
      if (name === "if" || name === "true" || name === "false") continue;
      needed.add(name);
    }
    const added = [];
    for (const name of needed) {
      if (new RegExp(`function\\s+${name}\\s*\\(`).test(classCode)) continue;
      added.push(name);
    }
    if (!added.length) return { classCode, changed: false, added };
    const stubs = added
      .map(
        (n) =>
          `\n    public function ${n}()\n    {\n        // TODO: action invoked by a wire directive in the component view.\n    }\n`,
      )
      .join("");
    const lastBrace = classCode.lastIndexOf("}");
    if (lastBrace === -1) return { classCode, changed: false, added: [] };
    classCode =
      classCode.slice(0, lastBrace) + stubs + classCode.slice(lastBrace);
    return { classCode, changed: true, added };
  }

  _ensureLivewireModelImports(classCode, knownModels = []) {
    if (!classCode || !knownModels || !knownModels.length)
      return { classCode, changed: false, added: [] };
    const added = [];
    for (const model of knownModels) {
      if (new RegExp(`use\\s+App\\\\Models\\\\${model}\\s*;`).test(classCode))
        continue;
      // Bare (unqualified) reference: not preceded by a backslash or word char,
      // followed by `::`, `(`, or a `$` (typed-property hint). FQN uses such as
      // \App\Models\X are intentionally skipped (they need no import).
      const used = new RegExp(
        `(?<![\\\\\\w])${model}\\b\\s*(?:::|\\(|\\$)`,
      ).test(classCode);
      if (!used) continue;
      added.push(model);
    }
    if (!added.length) return { classCode, changed: false, added };
    const useLines = added.map((m) => `use App\\Models\\${m};`).join("\n");
    const useMatches = [...classCode.matchAll(/^use\s+[^;]+;/gm)];
    if (useMatches.length) {
      const last = useMatches[useMatches.length - 1];
      const idx = last.index + last[0].length;
      classCode =
        classCode.slice(0, idx) + "\n" + useLines + classCode.slice(idx);
    } else {
      classCode = classCode.replace(
        /(namespace\s+[^;]+;)/,
        `$1\n\n${useLines}`,
      );
    }
    return { classCode, changed: true, added };
  }

  _ensureLivewirePropertyInit(classCode, knownModels = []) {
    const notes = [];
    let changed = false;
    const modelInits = [];
    // Typed public property WITHOUT a default value: `public ?SomeType $name;`.
    // Untyped `public $x;` is intentionally skipped (already defaults to null).
    const re =
      /public\s+(?:static\s+)?(\?)?\s*([A-Za-z_][A-Za-z0-9_\\]*)\s+\$(\w+)\s*;/g;
    let m;
    while ((m = re.exec(classCode))) {
      const type = m[2];
      const name = m[3];
      const shortType = type.split("\\").pop();
      // Skip if the property is already assigned anywhere (mount/constructor/action).
      if (new RegExp(`\\$this->${name}\\s*=`).test(classCode)) continue;
      const isModel =
        knownModels.includes(shortType) ||
        new RegExp(`use\\s+App\\\\Models\\\\${shortType};`).test(classCode);
      if (isModel) {
        modelInits.push({ name, type: shortType });
      } else {
        const declRe = new RegExp(
          `public\\s+(?:static\\s+)?\\??\\s*${type.replace(
            /\\/g,
            "\\\\",
          )}\\s+\\$${name}\\s*;`,
        );
        const next = classCode.replace(
          declRe,
          `public ?${type} $${name} = null;`,
        );
        if (next !== classCode) {
          classCode = next;
          changed = true;
          notes.push(`default null on typed $${name}`);
        }
      }
    }
    if (modelInits.length) {
      const next = this._injectMountInits(classCode, modelInits);
      if (next !== classCode) {
        classCode = next;
        changed = true;
        notes.push(
          `mount() initializes ${modelInits.map((i) => "$" + i.name).join(", ")}`,
        );
      }
    }
    return { classCode, changed, notes };
  }

  _injectMountInits(classCode, assignments) {
    if (!assignments.length) return classCode;
    const lines = assignments
      .map((a) => `        $this->${a.name} = new \\App\\Models\\${a.type}();`)
      .join("\n");
    // Existing mount(): prepend the initializers into its body.
    const mountRe = /public\s+function\s+mount\s*\([^)]*\)\s*\{/;
    if (mountRe.test(classCode)) {
      return classCode.replace(mountRe, (sig) => `${sig}\n${lines}`);
    }
    // Otherwise add a mount() just before render() (keeps lifecycle order clear).
    const renderRe = /([ \t]*)public\s+function\s+render\s*\(/;
    if (renderRe.test(classCode)) {
      return classCode.replace(
        renderRe,
        (_m, ind) =>
          `${ind}public function mount()\n${ind}{\n${lines}\n${ind}}\n\n${ind}public function render(`,
      );
    }
    // Fallback: insert before the class closing brace.
    const idx = classCode.lastIndexOf("}");
    if (idx === -1) return classCode;
    return (
      classCode.slice(0, idx) +
      `\n    public function mount()\n    {\n${lines}\n    }\n` +
      classCode.slice(idx)
    );
  }

  async generateFactory(factoryName, blueprint) {
    this.log(`   🏭 Generating Factory: ${factoryName}...`, "info");
    const p = path.join(
      this.engine.rootPath,
      "database",
      "factories",
      `${factoryName}.php`,
    );

    // CRITICAL: Protect Laravel's core UserFactory.php
    if (factoryName === "UserFactory" && (await fs.pathExists(p))) {
      this.log(`      🛡️ Preserving core Laravel UserFactory.php.`, "success");
      return;
    }

    const modelName = factoryName.replace(/Factory$/, "");
    const knownModels = blueprint.models || [];
    const schemaObj = blueprint.schema ? blueprint.schema[modelName] : null;

    // Deterministic: build the factory definition directly from blueprint.schema
    // so factory columns can NEVER drift from the model/migration columns.
    if (schemaObj) {
      const code = this._buildFactoryClass(
        factoryName,
        modelName,
        schemaObj,
        knownModels,
      );
      await fs.ensureDir(path.dirname(p));
      await fs.writeFile(p, code);
      const ok = await this.validatePHPSyntax(p);
      if (!ok) {
        this.log(
          `      ⚠️ Syntax error in deterministic factory. Writing fallback for ${factoryName}.php`,
          "warning",
        );
        await fs.writeFile(p, this._safeFallbackFactory(factoryName));
      } else {
        this.log(
          `      ✅ Saved ${factoryName}.php (schema-locked)`,
          "success",
        );
      }
      return;
    }

    // No schema available — fall back to LLM with a stricter prompt.
    const prompt = `Write a complete Laravel Factory class for '${factoryName}' (model '${modelName}'). Namespace: Database\\Factories.
Use the fake() global helper ONLY (never an uninitialized $faker). Return an array keyed by the model's real columns.
Output ONLY the raw PHP code, starting with <?php.`;
    const response = await this.getCachedOrGenerate(
      prompt,
      "build_model_migration",
    );
    if (response) {
      const cleanCode = this._sanitizeSeeder(this.cleanLLMOutput(response));
      await fs.ensureDir(path.dirname(p));
      await fs.writeFile(p, cleanCode);
      const syntaxOk = await this.validatePHPSyntax(p);
      if (!syntaxOk) {
        this.log(
          `      ⚠️ Syntax error in generated factory. Writing safe fallback for ${factoryName}.php`,
          "warning",
        );
        await fs.writeFile(p, this._safeFallbackFactory(factoryName));
      }
    }
  }

  async generateSeeder(seederName, blueprint) {
    this.log(`   🌱 Generating Seeder: ${seederName}...`, "info");
    const fullSchema = blueprint.schema
      ? JSON.stringify(blueprint.schema, null, 2)
      : "No schema";
    const prompt = `Write a complete Laravel Seeder class for '${seederName}'. Namespace: Database\\Seeders.
Generate at least 5 to 10 realistic, domain-appropriate sample records so the application UI is populated with rich data.
Use the fake() global helper ONLY (e.g., fake()->name(), fake()->sentence(), fake()->dateTime()). DO NOT use an uninitialized $faker variable.
STRICT FAKER RULES: Only call Faker methods that actually exist — name, email, sentence, paragraph, word, words, text, url, slug, numberBetween, randomDigit, boolean, date, dateTime, unique(), randomElement. NEVER invent methods such as realistic() or realisticText(). For a *unique* column like email use fake()->unique()->safeEmail().
COLUMN RULES: populate ONLY the real schema columns shown below. Skip id, created_at, updated_at, deleted_at, and any relationship pseudo-column whose type is hasMany/hasOne/belongsTo/belongsToMany. For a *_id foreign key, reference an existing parent (e.g. User::inRandomOrder()->first()?->id ?? User::factory()) instead of a fake() string.

SCHEMA REFERENCE:
${fullSchema}

Output ONLY raw PHP code starting with <?php. No markdown blocks.`;
    const response = await this.getCachedOrGenerate(
      prompt,
      "build_model_migration",
    );
    if (response) {
      const cleanCode = this._sanitizeSeeder(this.cleanLLMOutput(response));
      const p = path.join(
        this.engine.rootPath,
        "database",
        "seeders",
        `${seederName}.php`,
      );
      await fs.ensureDir(path.dirname(p));
      await fs.writeFile(p, cleanCode);
      const syntaxOk = await this.validatePHPSyntax(p);
      if (!syntaxOk) {
        this.log(
          `      ⚠️ Syntax error in generated seeder. Writing safe fallback for ${seederName}.php`,
          "warning",
        );
        await fs.writeFile(p, this._safeFallbackSeeder(seederName, blueprint));
      }
    }
  }

  async generateRoutes(routesList, blueprint) {
    this.log(`   🛣️ Generating Routes...`, "info");

    // FIX #30 — Context-aware Livewire 3 and controller discovery
    const existingControllers = await this._discoverExistingControllers();
    const existingLivewire = await this._discoverExistingLivewireComponents();

    const livewireListStr =
      existingLivewire.length > 0
        ? existingLivewire
            .map((c) => `- ${c.fullClass} (Route URL: /${c.kebab})`)
            .join("\n")
        : "None";

    const prompt = `Write the content for routes/web.php in a Laravel 12 application called "${blueprint.project_name}".

Required routes from blueprint: ${(routesList || []).map((r) => (typeof r === "string" ? r : r.path)).join(", ")}

AVAILABLE BLADE VIEWS ON DISK:
- welcome
${existingLivewire.map((c) => `- livewire.${c.kebab}`).join("\n")}

CRITICAL ARCHITECTURE RULES:
1. Livewire pages MUST be full-page component routes so the component class runs render():
   Example: Route::view('/my-route', App\\Livewire\\${existingLivewire[0]?.className || "StaticPage"}::class)->name('my-route');
   NEVER write Route::get('/x', function () { return view('livewire.x'); }) — raw Blade BYPASSES the
   component class, its render() data is lost and the page crashes with "Undefined variable" (HTTP 500).
2. NEVER invent view names like view('dashboard') or view('todos') if they do not exist! Use view('welcome') for non-Livewire pages.
3. ALWAYS include these safe fallback root & auth routes:
   Route::get('/', function () { return view('welcome'); })->name('home');
   Route::get('/login', function () { return redirect('/'); })->name('login');
4. DO NOT add namespace App\\Http; at the top of routes/web.php.
5. Route::view(..., ComponentClass::class) is ONLY for Livewire components listed above; static pages keep closures returning view('welcome').
6. REDIRECT / LOOKUP ROUTES: if a required route contains a path parameter (e.g. /{shortCode}, /{slug}, /{code}) that represents a public short-link or lookup, it MUST be the LAST route and its closure must query the matching model by that key and return redirect()->to(<stored url>) with a 404 fallback, e.g.:
   Route::get('/{shortCode}', function (string $shortCode) { $u = App\\Models\\ShortUrl::where('shortened_url', $shortCode)->first(); return $u ? redirect()->to($u->original_url ?? $u->shortened_url) : abort(404); })->name('short-code');
   Do NOT return a Blade view for such parameterized redirect routes.
7. Start with <?php. Output ONLY raw PHP code, no markdown blocks.`;

    const response = await this.getCachedOrGenerate(prompt, "build_routes");

    let routesSaved = false;
    const p = path.join(this.engine.rootPath, "routes", "web.php");

    if (response) {
      let cleanCode = this.cleanLLMOutput(response);
      // Auto-correct any namespace App\Http; at the top of web.php
      cleanCode = cleanCode.replace(
        /^<\?php\s+namespace\s+[^;]+;\s*/i,
        "<?php\n\n",
      );

      // Deterministic heal FIRST — the global code cache may still serve older
      // generations that used the closure + view('livewire.*') anti-pattern.
      cleanCode = this._healLivewireRoutes(cleanCode, existingLivewire);

      await fs.writeFile(p, cleanCode);
      const syntaxOk = await this.validatePHPSyntax(p);
      const hasMissingViews = this._hasNonExistentViews(cleanCode);
      const phantoms = this._findPhantomControllers(
        cleanCode,
        existingControllers,
      );
      // HARD GATE: closure-rendered livewire.* Blade bypasses the component
      // class (url-shortener-app: 500 "Undefined variable $shortUrls").
      const livewireBypass = this._hasRawLivewireViewRoutes(cleanCode);

      if (
        syntaxOk &&
        !hasMissingViews &&
        phantoms.length === 0 &&
        !livewireBypass
      ) {
        routesSaved = true;
        this.log(
          `      ✅ Validated web routes for ${blueprint.project_name}.`,
          "success",
        );
      } else {
        if (!syntaxOk) {
          this.log(
            `      ⚠️ Syntax error in generated routes. Applying robust fallback for web.php`,
            "warning",
          );
        } else if (hasMissingViews) {
          this.log(
            `      ⚠️ Generated routes referenced non-existent Blade views. Applying robust fallback for web.php`,
            "warning",
          );
        }
        if (phantoms.length > 0) {
          this.log(
            `      ⚠️ Generated routes referenced non-existent controller(s): ${phantoms.join(", ")}. Applying robust fallback for web.php`,
            "warning",
          );
        }
        if (livewireBypass) {
          this.log(
            `      ⚠️ Routes still render livewire Blade rawly (component class bypassed). Applying robust fallback for web.php`,
            "warning",
          );
        }
      }
    }

    if (!routesSaved) {
      const fallbackCode = this._safeFallbackRoutes(routesList, blueprint);
      await fs.writeFile(p, fallbackCode);
      this.log(`      ✅ Applied robust routes for web.php.`, "success");
    }

    // Also generate API routes if models exist
    const models = blueprint.models || [];
    if (models.length > 0) {
      await this._generateApiRoutes(models, blueprint);
    }
  }

  /**
   * Checks if generated code calls view('xxx') where xxx does not exist on disk.
   */
  _hasNonExistentViews(code) {
    const viewMatches = code.match(/view\(\s*['"]([^'"]+)['"]\s*(\)|,)/g);
    if (!viewMatches) return false;
    const viewsDir = path.join(this.engine.rootPath, "resources", "views");
    for (const m of viewMatches) {
      const match = m.match(/view\(\s*['"]([^'"]+)['"]/);
      if (!match) continue;
      const vName = match[1];
      if (vName === "welcome") continue;
      const vPath = path.join(
        viewsDir,
        `${vName.replace(/\./g, path.sep)}.blade.php`,
      );
      if (!fs.existsSync(vPath)) {
        return true; // Found a view() call to a non-existent view file!
      }
    }
    return false;
  }

  /**
   * Deterministic heal: rewrite routes that render Livewire Blade rawly —
   * `Route::get('/x', fn() { return view('livewire.x'); })` bypasses the
   * component class entirely, so render() never runs and every view variable
   * is undefined at runtime (HTTP 500). Rewritten to Livewire full-page
   * component routes: `Route::view('/x', \App\Livewire\X::class)`.
   * Runs on POST-processed output so stale global-cache generations (which
   * were prompted with the old anti-pattern) are healed instead of trusted.
   */
  _healLivewireRoutes(code, existingLivewire) {
    const byKebab = new Map((existingLivewire || []).map((c) => [c.kebab, c]));
    let healed = 0;

    const toFullPage = (routePath, kebab) => {
      const comp = byKebab.get(kebab);
      if (!comp) return null; // unknown class — hard gate will reject below
      if (routePath.includes("{") || routePath.includes(":")) return null; // full-page routes can't bind params
      healed++;
      this._ensureLivewireFullPageLayout(comp.className);
      return `Route::view('${routePath}', \\${comp.fullClass}::class)`;
    };

    // A) closure form: Route::get('/p', function () { return view('livewire.x'); })
    // NOTE: trailing \) consumes the OUTER Route::get(...) paren so the
    // replacement (which already closes Route::view) stays balanced.
    code = code.replace(
      /Route::get\(\s*(['"])((?:(?!\1).)*)\1\s*,\s*(?:function\s*\([^)]*\)|fn\s*\([^)]*\))\s*\{\s*(?:return\s+)?view\(\s*(['"])livewire\.([a-z0-9_-]+)\3\s*\)\s*;?\s*\}\s*\)/gi,
      (m, q1, routePath, q3, kebab) => toFullPage(routePath, kebab) || m,
    );

    // B) arrow form: Route::get('/p', fn() => view('livewire.x'))
    code = code.replace(
      /Route::get\(\s*(['"])((?:(?!\1).)*)\1\s*,\s*fn\s*\([^)]*\)\s*=>\s*view\(\s*(['"])livewire\.([a-z0-9_-]+)\3\s*\)\s*\)/gi,
      (m, q1, routePath, q3, kebab) => toFullPage(routePath, kebab) || m,
    );

    // C) Route::view('/p', 'livewire.x') string-view form → component class
    code = code.replace(
      /Route::view\(\s*(['"])((?:(?!\1).)*)\1\s*,\s*(['"])livewire\.([a-z0-9_-]+)\3\s*\)/gi,
      (m, q1, routePath, q3, kebab) => toFullPage(routePath, kebab) || m,
    );

    if (healed > 0) {
      this.log(
        `      🩹 Repaired ${healed} Livewire route(s): raw view('livewire.*') → Route::view(Component::class)`,
        "warning",
      );
    }
    return code;
  }

  /**
   * True if route code still renders Livewire templates rawly (class bypass).
   */
  _hasRawLivewireViewRoutes(code) {
    return /view\(\s*['"]livewire\./i.test(code);
  }

  /**
   * Full-page components need an HTML shell: inject
   * #[\Livewire\Attributes\Layout('layouts.app')] when the app layout exists
   * and the component has no Layout attribute yet. Idempotent, best-effort.
   */
  _ensureLivewireFullPageLayout(className) {
    try {
      const layoutExists = fs.existsSync(
        path.join(
          this.engine.rootPath,
          "resources",
          "views",
          "layouts",
          "app.blade.php",
        ),
      );
      if (!layoutExists) return;
      const file = path.join(
        this.engine.rootPath,
        "app",
        "Livewire",
        `${className}.php`,
      );
      if (!fs.existsSync(file)) return;
      const src = fs.readFileSync(file, "utf8");
      if (/Attributes\\Layout|\#\[\s*Layout/i.test(src)) return; // already set
      const patched = src.replace(
        /^(\s*(?:final\s+|abstract\s+)?class\s+[A-Za-z0-9_]+)/m,
        "#[\\Livewire\\Attributes\\Layout('layouts.app')]\n$1",
      );
      if (patched !== src) fs.writeFileSync(file, patched);
    } catch {
      /* layout injection is best-effort — never block route generation */
    }
  }

  /**
   * HARD GATE: routes pointing at a Controller class that was never generated
   * crash Laravel at boot with "Invalid route action" (todo-app-realtime case),
   * killing migrate + route:list + the whole project. Returns the short class
   * names referenced in the code but missing on disk.
   */
  _findPhantomControllers(code, existingControllers) {
    const known = new Set(
      existingControllers.map((fq) => fq.split("\\").pop()),
    );
    const refs = new Set();
    const patterns = [
      /([A-Za-z0-9_\\]*Controller)::class/g,
      /['"]([A-Za-z0-9_\\]+Controller)(?:@[A-Za-z0-9_]+)?['"]/g,
    ];
    for (const re of patterns) {
      for (const m of code.matchAll(re)) {
        const short = m[1].split("\\").pop();
        if (short && !known.has(short)) refs.add(short);
      }
    }
    return [...refs];
  }

  /**
   * Deterministic, 100% working safe routes fallback generator.
   */
  _safeFallbackRoutes(routesList, blueprint) {
    const livewireComponents = this._discoverExistingLivewireComponentsSync();
    const viewsDir = path.join(this.engine.rootPath, "resources", "views");

    const routeStatements = [];
    routeStatements.push(
      `// Home & Dashboard\nRoute::get('/', function () {\n    return view('welcome');\n})->name('home');\n\nRoute::get('/dashboard', function () {\n    return view('welcome');\n})->name('dashboard');`,
    );

    const registeredPaths = new Set(["/", "/dashboard", "/login"]);

    // Map each Livewire component to its dedicated URL
    for (const lw of livewireComponents) {
      const p = `/${lw.kebab}`;
      if (!registeredPaths.has(p)) {
        registeredPaths.add(p);
        const viewFile = path.join(
          viewsDir,
          "livewire",
          `${lw.kebab}.blade.php`,
        );
        if (fs.existsSync(viewFile)) {
          // Full-page component route — render() actually executes.
          this._ensureLivewireFullPageLayout(lw.className);
          routeStatements.push(
            `Route::view('${p}', \\${lw.fullClass}::class)->name('${lw.kebab}');`,
          );
        } else {
          routeStatements.push(
            `Route::get('${p}', function () {\n    return view('welcome');\n})->name('${lw.kebab}');`,
          );
        }
      }
    }

    // Map blueprint routes
    for (const rawRoute of routesList || []) {
      const r = typeof rawRoute === "string" ? rawRoute : rawRoute.path;
      if (!r || registeredPaths.has(r)) continue;

      registeredPaths.add(r);
      const cleanName =
        r
          .replace(/^\//, "")
          .replace(/\//g, ".")
          .replace(/[^a-zA-Z0-9.-]/g, "") || "route";

      // Match with Livewire view
      const match = livewireComponents.find(
        (lw) =>
          r.toLowerCase().includes(lw.kebab) ||
          lw.kebab.includes(r.replace(/^\//, "").toLowerCase()),
      );

      let targetView = "welcome";
      let targetClass = null;
      const parameterized = r.includes("{") || r.includes(":");
      if (match && !parameterized) {
        const viewFile = path.join(
          viewsDir,
          "livewire",
          `${match.kebab}.blade.php`,
        );
        if (fs.existsSync(viewFile)) targetClass = match;
      }

      if (targetClass) {
        this._ensureLivewireFullPageLayout(targetClass.className);
        routeStatements.push(
          `Route::view('${r}', \\${targetClass.fullClass}::class)->name('${cleanName}');`,
        );
      } else if (parameterized) {
        const normalized = r.replace(/:([a-zA-Z0-9_]+)/g, "{$1}");
        routeStatements.push(
          `Route::get('${normalized}', function () {\n    return view('${targetView}');\n})->name('${cleanName}');`,
        );
      } else {
        routeStatements.push(
          `Route::get('${r}', function () {\n    return view('${targetView}');\n})->name('${cleanName}');`,
        );
      }
    }

    // Fallback authentication & redirect route
    routeStatements.push(
      `// Fallback Authentication & Redirect Routes\nRoute::get('/login', function () {\n    return redirect('/');\n})->name('login');`,
    );

    return `<?php\n\nuse Illuminate\\Support\\Facades\\Route;\n\n${routeStatements.join("\n\n")}\n`;
  }

  /**
   * FIX #30 — Generate API routes and ensure bootstrap/app.php registers api.php.
   */
  async _generateApiRoutes(models, blueprint) {
    this.log(`   🛣️ Generating API Routes...`, "info");
    await this._ensureApiInBootstrapApp();

    const controllerImports = models
      .map((m) => `use App\\Http\\Controllers\\Api\\${m}Controller;`)
      .join("\n");
    const resourceRoutes = models
      .map(
        (m) =>
          `Route::apiResource('${this._toSnakePlural(m)}', ${m}Controller::class);`,
      )
      .join("\n    ");

    const apiPrompt = `Write the content for routes/api.php in Laravel 12. 

IMPORTANT: Use EXACTLY these imports and routes. Do not change namespaces or use Model classes.

<?php

use Illuminate\\Support\\Facades\\Route;
${controllerImports}

Route::middleware('auth:sanctum')->group(function () {
    ${resourceRoutes}
});

Output ONLY the raw PHP code, starting with <?php. No markdown blocks.`;

    const apiResponse = await this.getCachedOrGenerate(
      apiPrompt,
      "build_routes",
    );
    const apiP = path.join(this.engine.rootPath, "routes", "api.php");
    await fs.ensureDir(path.dirname(apiP));

    if (apiResponse) {
      const apiCleanCode = this.cleanLLMOutput(apiResponse);
      await fs.writeFile(apiP, apiCleanCode);
      const apiSyntaxOk = await this.validatePHPSyntax(apiP);
      const apiPhantoms = this._findPhantomControllers(
        apiCleanCode,
        await this._discoverExistingControllers(),
      );
      if (!apiSyntaxOk) {
        this.log(
          `      ⚠️ Syntax error in generated API routes. Writing deterministic fallback for api.php`,
          "warning",
        );
        await this._writeApiFallback(apiP, models);
      } else if (apiPhantoms.length > 0) {
        this.log(
          `      ⚠️ API routes referenced non-existent controller(s): ${apiPhantoms.join(", ")}. Writing deterministic fallback for api.php`,
          "warning",
        );
        await this._writeApiFallback(apiP, models);
      }
    } else {
      await this._writeApiFallback(apiP, models);
    }
  }

  /**
   * Ensure bootstrap/app.php in Laravel 11/12 registers routes/api.php.
   */
  async _ensureApiInBootstrapApp() {
    const bootstrapApp = path.join(
      this.engine.rootPath,
      "bootstrap",
      "app.php",
    );
    if (await fs.pathExists(bootstrapApp)) {
      let bContent = await fs.readFile(bootstrapApp, "utf8");
      if (
        !bContent.includes("routes/api.php") &&
        bContent.includes("routes/web.php")
      ) {
        bContent = bContent.replace(
          /web:\s*__DIR__\s*\.\s*['"]\/..\/routes\/web\.php['"],/g,
          "web: __DIR__.'/../routes/web.php',\n        api: __DIR__.'/../routes/api.php',",
        );
        await fs.writeFile(bootstrapApp, bContent);
        this.log(`      🔌 Enabled api routing in bootstrap/app.php`, "info");
      }
    }
  }

  /**
   * Write a deterministic API routes fallback that always uses correct namespaces.
   */
  async _writeApiFallback(apiPath, models) {
    // HARD GATE: only route to controllers that actually exist on disk, so the
    // fallback itself can never produce "Invalid route action" at boot.
    const routable = models.filter((m) => {
      const apiC = path.join(
        this.engine.rootPath,
        "app",
        "Http",
        "Controllers",
        "Api",
        `${m}Controller.php`,
      );
      const rootC = path.join(
        this.engine.rootPath,
        "app",
        "Http",
        "Controllers",
        `${m}Controller.php`,
      );
      return fs.existsSync(apiC) || fs.existsSync(rootC);
    });
    if (routable.length === 0) {
      await fs.writeFile(
        apiPath,
        `<?php\n\nuse Illuminate\\Support\\Facades\\Route;\n`,
      );
      return;
    }
    const imports = routable
      .map((m) => `use App\\Http\\Controllers\\Api\\${m}Controller;`)
      .join("\n");
    const routes = routable
      .map(
        (m) =>
          `    Route::apiResource('${this._toSnakePlural(m)}', ${m}Controller::class);`,
      )
      .join("\n");
    await fs.writeFile(
      apiPath,
      `<?php\n\nuse Illuminate\\Support\\Facades\\Route;\n${imports}\n\nRoute::middleware('auth:sanctum')->group(function () {\n${routes}\n});\n`,
    );
  }

  /**
   * FIX #30 — Discover existing controllers in the project to provide context to LLM.
   * Returns array of strings like: "App\\Http\\Controllers\\Api\\UserController"
   */
  async _discoverExistingControllers() {
    const controllersDir = path.join(
      this.engine.rootPath,
      "app",
      "Http",
      "Controllers",
    );
    const controllers = [];
    const scanDir = async (dir, namespace) => {
      if (!(await fs.pathExists(dir))) return;
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          await scanDir(
            path.join(dir, entry.name),
            `${namespace}\\${entry.name}`,
          );
        } else if (
          entry.name.endsWith("Controller.php") &&
          entry.name !== "Controller.php"
        ) {
          controllers.push(`${namespace}\\${entry.name.replace(".php", "")}`);
        }
      }
    };
    await scanDir(controllersDir, "App\\Http\\Controllers");
    return controllers;
  }

  /**
   * FIX #30 — Discover existing Livewire components with class name and kebab name.
   */
  async _discoverExistingLivewireComponents() {
    return this._discoverExistingLivewireComponentsSync();
  }

  _discoverExistingLivewireComponentsSync() {
    const livewireDir = path.join(this.engine.rootPath, "app", "Livewire");
    const components = [];
    if (!fs.existsSync(livewireDir)) return components;
    const entries = fs.readdirSync(livewireDir);
    for (const entry of entries) {
      if (entry.endsWith(".php")) {
        const className = entry.replace(".php", "");
        components.push({
          className,
          fullClass: `App\\Livewire\\${className}`,
          kebab: this.toKebabCase(className),
        });
      }
    }
    return components;
  }

  async generatePolicy(modelName, blueprint) {
    this.log(`   🛡️ Generating Policy: ${modelName}Policy...`, "info");
    const isUser = modelName === "User";
    const imports = isUser
      ? "use App\\Models\\User;"
      : `use App\\Models\\User;\nuse App\\Models\\${modelName};`;
    const rulesImports = isUser
      ? "- Use EXACTLY this import: App\\Models\\User"
      : `- Use EXACTLY these two imports: App\\Models\\User and App\\Models\\${modelName}`;
    const checkOwnership = isUser
      ? "return $user->id === $model->id;"
      : "return $user->id === $model->user_id;";

    // STRICT TEMPLATE PROMPT: prevents LLM from hallucinating fake Illuminate\Auth imports
    const prompt = `Write a Laravel 11 Policy PHP class. Follow this EXACT template structure:

<?php

namespace App\\Policies;

${imports}

class ${modelName}Policy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, ${modelName} $model): bool
    {
        ${checkOwnership}
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, ${modelName} $model): bool
    {
        ${checkOwnership}
    }

    public function delete(User $user, ${modelName} $model): bool
    {
        ${checkOwnership}
    }
}

RULES:
- Use EXACTLY the namespace: App\\Policies
${rulesImports}
- The class MUST NOT extend any base class
- The class MUST NOT use any traits
- DO NOT import any other classes (no Illuminate\\Auth classes)
- Return only bool values from all methods
- Output ONLY the raw PHP code starting with <?php. No markdown, no explanation.`;

    const policyPath = path.join(
      this.engine.rootPath,
      "app",
      "Policies",
      `${modelName}Policy.php`,
    );
    await fs.ensureDir(path.dirname(policyPath));

    const response = await this.getCachedOrGenerate(
      prompt,
      "build_model_migration",
    );
    if (response) {
      const cleanCode = this.cleanLLMOutput(response);
      await fs.writeFile(policyPath, cleanCode);
      const syntaxOk = await this.validatePHPSyntax(policyPath);
      if (!syntaxOk) {
        this.log(
          `      ⚠️ Syntax error in generated policy. Writing safe fallback for ${modelName}Policy.php`,
          "warning",
        );
        await fs.writeFile(policyPath, this._safeFallbackPolicy(modelName));
      }
    } else {
      this.log(
        `      ⚠️ LLM returned empty. Writing safe fallback for ${modelName}Policy.php`,
        "warning",
      );
      await fs.writeFile(policyPath, this._safeFallbackPolicy(modelName));
    }
    this.log(`      ✅ Saved ${modelName}Policy.php`, "success");
  }

  _safeFallbackPolicy(modelName) {
    if (modelName === "User") {
      return `<?php\n\nnamespace App\\Policies;\n\nuse App\\Models\\User;\n\nclass UserPolicy\n{\n    public function viewAny(User $user): bool { return true; }\n    public function view(User $user, User $model): bool { return $user->id === $model->id; }\n    public function create(User $user): bool { return true; }\n    public function update(User $user, User $model): bool { return $user->id === $model->id; }\n    public function delete(User $user, User $model): bool { return $user->id === $model->id; }\n}\n`;
    }
    return `<?php\n\nnamespace App\\Policies;\n\nuse App\\Models\\User;\nuse App\\Models\\${modelName};\n\nclass ${modelName}Policy\n{\n    public function viewAny(User $user): bool { return true; }\n    public function view(User $user, ${modelName} $model): bool { return true; }\n    public function create(User $user): bool { return true; }\n    public function update(User $user, ${modelName} $model): bool { return true; }\n    public function delete(User $user, ${modelName} $model): bool { return true; }\n}\n`;
  }

  async generateApiController(modelName, blueprint) {
    this.log(
      `   📡 Generating API Controller: ${modelName}Controller...`,
      "info",
    );
    const modelSchema =
      blueprint.schema && blueprint.schema[modelName]
        ? JSON.stringify(blueprint.schema[modelName], null, 2)
        : "{}";
    const prompt = `Write a Laravel 11 API Controller. Follow this EXACT template structure:

<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Models\\${modelName};
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class ${modelName}Controller extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(${modelName}::all());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            // Generate validation rules here based on the schema
        ]);
        $model = ${modelName}::create($validated);
        return response()->json($model, 201);
    }

    public function show(${modelName} $${modelName.toLowerCase()}): JsonResponse
    {
        return response()->json($${modelName.toLowerCase()});
    }

    public function update(Request $request, ${modelName} $${modelName.toLowerCase()}): JsonResponse
    {
        $validated = $request->validate([
            // Generate validation rules here based on the schema
        ]);
        $${modelName.toLowerCase()}->update($validated);
        return response()->json($${modelName.toLowerCase()});
    }

    public function destroy(${modelName} $${modelName.toLowerCase()}): JsonResponse
    {
        $${modelName.toLowerCase()}->delete();
        return response()->json(null, 204);
    }
}

SCHEMA REFERENCE FOR VALIDATION:
${modelSchema}

RULES:
- Namespace MUST be App\\Http\\Controllers\\Api
- MUST extend Controller from App\\Http\\Controllers\\Controller
- MUST import Illuminate\\Http\\Request and Illuminate\\Http\\JsonResponse
- Implement the validation inside the controller using $request->validate() based on the schema
- Output ONLY the raw PHP code starting with <?php. No markdown, no explanation.`;

    const controllerPath = path.join(
      this.engine.rootPath,
      "app",
      "Http",
      "Controllers",
      "Api",
      `${modelName}Controller.php`,
    );
    await fs.ensureDir(path.dirname(controllerPath));

    const response = await this.getCachedOrGenerate(
      prompt,
      "build_model_migration",
    );
    if (response) {
      const cleanCode = this.cleanLLMOutput(response);
      await fs.writeFile(controllerPath, cleanCode);
      const syntaxOk = await this.validatePHPSyntax(controllerPath);
      if (!syntaxOk) {
        this.log(
          `      ⚠️ Syntax error in generated controller. Writing safe fallback for ${modelName}Controller.php`,
          "warning",
        );
        await fs.writeFile(
          controllerPath,
          this._safeFallbackController(modelName),
        );
      }
    } else {
      this.log(
        `      ⚠️ LLM returned empty. Writing safe fallback for ${modelName}Controller.php`,
        "warning",
      );
      await fs.writeFile(
        controllerPath,
        this._safeFallbackController(modelName),
      );
    }
    this.log(`      ✅ Saved ${modelName}Controller.php`, "success");
  }

  _safeFallbackController(modelName) {
    const varName = modelName.charAt(0).toLowerCase() + modelName.slice(1);
    return `<?php\n\nnamespace App\\Http\\Controllers\\Api;\n\nuse App\\Http\\Controllers\\Controller;\nuse App\\Models\\${modelName};\nuse Illuminate\\Http\\Request;\nuse Illuminate\\Http\\JsonResponse;\n\nclass ${modelName}Controller extends Controller\n{\n    public function index(): JsonResponse { return response()->json(${modelName}::all()); }\n    public function store(Request $request): JsonResponse { return response()->json(${modelName}::create($request->all()), 201); }\n    public function show(${modelName} $${varName}): JsonResponse { return response()->json($${varName}); }\n    public function update(Request $request, ${modelName} $${varName}): JsonResponse { $${varName}->update($request->all()); return response()->json($${varName}); }\n    public function destroy(${modelName} $${varName}): JsonResponse { $${varName}->delete(); return response()->json(null, 204); }\n}\n`;
  }

  _safeFallbackMigration(tableName) {
    return `<?php\n\nuse Illuminate\\Database\\Migrations\\Migration;\nuse Illuminate\\Database\\Schema\\Blueprint;\nuse Illuminate\\Support\\Facades\\Schema;\n\nreturn new class extends Migration\n{\n    public function up(): void\n    {\n        Schema::create('${tableName}', function (Blueprint $table) {\n            $table->uuid('id')->primary();\n            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();\n            $table->string('name')->nullable();\n            $table->timestamps();\n            $table->softDeletes();\n        });\n    }\n\n    public function down(): void\n    {\n        Schema::dropIfExists('${tableName}');\n    }\n};\n`;
  }

  _safeFallbackFactory(factoryName) {
    // Extract model name from factory name (e.g. "UserFactory" -> "User")
    const modelName = factoryName.replace(/Factory$/, "");
    if (modelName === "User") {
      return `<?php\n\nnamespace Database\\Factories;\n\nuse App\\Models\\User;\nuse Illuminate\\Database\\Eloquent\\Factories\\Factory;\nuse Illuminate\\Support\\Facades\\Hash;\nuse Illuminate\\Support\\Str;\n\nclass UserFactory extends Factory\n{\n    protected $model = User::class;\n\n    public function definition(): array\n    {\n        return [\n            'name' => fake()->name(),\n            'email' => fake()->unique()->safeEmail(),\n            'email_verified_at' => now(),\n            'password' => static::$password ??= Hash::make('password'),\n            'remember_token' => Str::random(10),\n        ];\n    }\n}\n`;
    }
    return `<?php\n\nnamespace Database\\Factories;\n\nuse App\\Models\\${modelName};\nuse Illuminate\\Database\\Eloquent\\Factories\\Factory;\n\nclass ${factoryName} extends Factory\n{\n    protected $model = ${modelName}::class;\n\n    public function definition(): array\n    {\n        return [\n            'name' => fake()->name(),\n        ];\n    }\n}\n`;
  }

  _safeFallbackSeeder(seederName, blueprint) {
    const modelName = seederName.replace(/Seeder$/, "");
    if (modelName === "User") {
      return `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\Hash;
use App\\Models\\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        if (User::count() === 0) {
            User::create([
                'name' => 'Demo User',
                'email' => 'demo@nexus.ai',
                'password' => Hash::make('password'),
            ]);
            for ($i = 1; $i <= 5; $i++) {
                User::create([
                    'name' => fake()->name(),
                    'email' => fake()->unique()->safeEmail(),
                    'password' => Hash::make('password'),
                ]);
            }
        }
    }
}
`;
    }

    return `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Facades\\Schema;

class ${seederName} extends Seeder
{
    public function run(): void
    {
        $modelClass = "\\\\App\\\\Models\\\\${modelName}";
        if (class_exists($modelClass)) {
            $table = (new $modelClass)->getTable();
            if (Schema::hasTable($table) && DB::table($table)->count() === 0) {
                for ($i = 1; $i <= 5; $i++) {
                    $row = ['created_at' => now(), 'updated_at' => now()];
                    if (Schema::hasColumn($table, 'name')) $row['name'] = "${modelName} Item #" . $i;
                    if (Schema::hasColumn($table, 'title')) $row['title'] = "${modelName} Item #" . $i;
                    if (Schema::hasColumn($table, 'description')) $row['description'] = "Realistic sample description for item #" . $i . " demonstrating active state in UI.";
                    if (Schema::hasColumn($table, 'category')) $row['category'] = "General";
                    if (Schema::hasColumn($table, 'user_id')) $row['user_id'] = 1;
                    if (Schema::hasColumn($table, 'is_active')) $row['is_active'] = 1;
                    if (Schema::hasColumn($table, 'is_completed')) $row['is_completed'] = 0;
                    if (Schema::hasColumn($table, 'original_url')) $row['original_url'] = "https://example.com/link-" . $i;
                    if (Schema::hasColumn($table, 'short_code')) $row['short_code'] = "nx" . $i . substr(md5($i), 0, 4);
                    DB::table($table)->insert($row);
                }
            }
        }
    }
}
`;
  }

  async wireDatabaseSeeder(seeders) {
    if (!seeders || seeders.length === 0) return;
    const dbSeederPath = path.join(
      this.engine.rootPath,
      "database",
      "seeders",
      "DatabaseSeeder.php",
    );
    const sortedSeeders = seeders
      .filter((s) => s !== "DatabaseSeeder")
      .sort((a, b) => {
        if (a === "UserSeeder") return -1;
        if (b === "UserSeeder") return 1;
        return 0;
      });
    const callStatements = sortedSeeders
      .map((s) => `        $this->call(${s}::class);`)
      .join("\n");

    const content = `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
${callStatements}
    }
}
`;
    await fs.ensureDir(path.dirname(dbSeederPath));
    await fs.writeFile(dbSeederPath, content);
    this.log(
      `      ✅ Wired DatabaseSeeder with ${seeders.length} seeders.`,
      "success",
    );
  }

  async generateLayout(blueprint) {
    this.log(`   🎨 Generating Layouts...`, "info");
    const prompt = `Write a complete Blade layout file (app.blade.php) for a "${blueprint.project_name}" Laravel TALL Stack application.

MANDATORY REQUIREMENTS:
1. Include a complete <!DOCTYPE html>, <html>, <head>, and <body>.
2. In <head>: include @livewireStyles, a Tailwind v4 browser CDN fallback:
   <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
   (NEVER the legacy https://cdn.tailwindcss.com v3 CDN and never an inline
   tailwind.config JS object — v4 is CSS-first: use
   <style type="text/tailwindcss">@custom-variant dark (&:where(.dark, .dark *));</style> instead)
   and an @if guard for Vite:
   @if(file_exists(public_path('build/manifest.json')))
       @vite(['resources/css/app.css', 'resources/js/app.js'])
   @endif
3. Before </body>: include @livewireScripts.
4. Body content: a sticky top navigation bar with the app name "${blueprint.project_name}", a <main> area with {{ $slot }}, and a minimal footer.
5. Use modern Tailwind CSS utility classes for a clean, professional look.

Output ONLY the raw HTML/Blade code. No markdown blocks.`;
    const response = await this.getCachedOrGenerate(prompt, "build_view");
    if (response) {
      let cleanCode = this.cleanLLMOutput(response);
      // Ensure @livewireStyles and @livewireScripts are present
      if (!cleanCode.includes("@livewireStyles")) {
        cleanCode = cleanCode.replace(
          "</head>",
          "    @livewireStyles\n</head>",
        );
      }
      if (!cleanCode.includes("@livewireScripts")) {
        cleanCode = cleanCode.replace(
          "</body>",
          "    @livewireScripts\n</body>",
        );
      }
      const p = path.join(
        this.engine.rootPath,
        "resources",
        "views",
        "layouts",
        "app.blade.php",
      );
      await fs.ensureDir(path.dirname(p));
      await fs.writeFile(p, cleanCode);
      this.log(`      ✅ Saved app.blade.php`, "success");
    }
  }

  cleanLLMOutput(output) {
    if (!output) return "";
    let clean = output.trim();

    // Check for standard code blocks first
    const codeBlockRegex = /```(?:[a-zA-Z0-9_-]+)?\s*([\s\S]*?)```/i;
    const match = clean.match(codeBlockRegex);
    if (match && match[1]) {
      clean = match[1].trim();
    } else if (clean.startsWith("```")) {
      clean = clean.replace(/^```(?:[a-zA-Z0-9_-]+)?\n?/i, "").trim();
    } else if (clean.includes("<?php")) {
      const phpStart = clean.indexOf("<?php");
      let phpCode = clean.slice(phpStart);
      // If there's a closing ``` after the PHP code, strip it and everything after
      if (phpCode.includes("```")) {
        phpCode = phpCode.split("```")[0];
      }
      clean = phpCode.trim();
    } else if (clean.includes("```")) {
      clean = clean.split("```")[0].trim();
    }

    // Strip raw language tags that LLM might output without backticks (e.g. "blade\n", "html\n", "php\n")
    clean = clean.replace(/^(?:blade|html|php)\s*\n+/i, "").trim();

    return clean;
  }

  cleanLivewireBladeOutput(output) {
    let clean = this.cleanLLMOutput(output);
    if (!clean) return "";

    // Strip any leading language identifiers (e.g. "blade\n", "html\n")
    clean = clean.replace(/^(?:blade|html|php)\s*\n+/i, "").trim();

    // If LLM mistakenly generated a full HTML page, extract body contents
    if (/<body[^>]*>/i.test(clean)) {
      const bodyMatch = clean.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch && bodyMatch[1]) {
        clean = bodyMatch[1].trim();
      }
    }

    // Strip DOCTYPE, html, head, body tags if present
    clean = clean
      .replace(/<!DOCTYPE[^>]*>/gi, "")
      .replace(/<\/?html[^>]*>/gi, "")
      .replace(/<head[\s\S]*?<\/head>/gi, "")
      .replace(/<\/?body[^>]*>/gi, "")
      .trim();

    // Ensure it's wrapped in a single root element
    if (
      !clean.startsWith("<div") &&
      !clean.startsWith("<section") &&
      !clean.startsWith("<main")
    ) {
      clean = `<div class="space-y-6">\n${clean}\n</div>`;
    }

    // Deterministic guard: repair mismatched loop directives before writing.
    clean = this._fixBladeLoopDirectives(clean);

    return clean;
  }

  // Deterministic guard: LLMs frequently mix Blade loop directives, producing
  // `@foreach ... @empty ... @endforelse`. @empty is only valid inside @forelse,
  // and the unbalanced open/close pair corrupts BladeCompiler's loopLevel
  // counter — every view compiled afterwards in the same process (including
  // the framework's exception renderer) emits invalid `$__empty_-N` variables
  // and crashes with ParseError "unexpected token =".
  // Repairs: @foreach topped by @empty/@endforelse -> @forelse;
  //          @forelse closed by @endforeach -> @endforelse.
  _fixBladeLoopDirectives(code) {
    if (!code) return code;
    const re = /@(foreach|forelse|endforeach|endforelse|endempty|empty)\b/g;
    const tokens = [];
    let m;
    while ((m = re.exec(code)) !== null) {
      tokens.push({ name: m[1], index: m.index, len: m[0].length });
    }
    if (tokens.length === 0) return code;

    const renames = [];
    const stack = [];
    for (const t of tokens) {
      if (t.name === "foreach" || t.name === "forelse") {
        stack.push(t);
      } else if (t.name === "empty") {
        const top = stack[stack.length - 1];
        if (top && top.name === "foreach") {
          renames.push({ i: top.index, len: top.len, to: "forelse" });
          top.name = "forelse";
        }
      } else if (t.name === "endforelse") {
        const top = stack[stack.length - 1];
        if (top && top.name === "foreach") {
          renames.push({ i: top.index, len: top.len, to: "forelse" });
          top.name = "forelse";
        }
        if (top) stack.pop();
      } else if (t.name === "endforeach") {
        const top = stack[stack.length - 1];
        if (top && top.name === "forelse") {
          renames.push({ i: t.index, len: t.len, to: "endforelse" });
        }
        if (top) stack.pop();
      }
      // endempty closes a standalone @empty-if; nothing to repair.
    }
    if (renames.length === 0) return code;

    let out = code;
    // Same-length renames (@foreach<->@forelse, @endforeach<->@endforelse),
    // apply right-to-left so earlier offsets stay valid.
    renames
      .sort((a, b) => b.i - a.i)
      .forEach((r) => {
        out = out.slice(0, r.i) + "@" + r.to + out.slice(r.i + r.len);
      });
    return out;
  }

  toPascalCase(str) {
    return str
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  }

  toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }

  // Convert PascalCase model name to snake_case plural table name
  // e.g. UrlShortener -> url_shorteners, ExpenseItem -> expense_items
  _toSnakePlural(modelName) {
    const snake = modelName
      .replace(/([A-Z])/g, "_$1")
      .toLowerCase()
      .replace(/^_/, "");
    // Simple pluralization: add 's', handle common irregular endings
    if (
      snake.endsWith("y") &&
      !["ay", "ey", "iy", "oy", "uy"].some((e) => snake.endsWith(e))
    ) {
      return snake.slice(0, -1) + "ies";
    }
    if (
      snake.endsWith("s") ||
      snake.endsWith("sh") ||
      snake.endsWith("ch") ||
      snake.endsWith("x") ||
      snake.endsWith("z")
    ) {
      return snake + "es";
    }
    return snake + "s";
  }

  // ══════════════════════════════════════════════════════════════════════
  // DETERMINISTIC SCHEMA GUARDS
  // These lock generated code to blueprint.schema so the LLM can never drop
  // columns / invent mismatched fields. Every helper is pure & best-effort:
  // it only ADDS what is missing and never breaks valid output.
  // ══════════════════════════════════════════════════════════════════════

  // Relationship pseudo-types that are NOT real DB columns.
  _isRelationType(baseType) {
    return [
      "hasmany",
      "hasone",
      "belongsto",
      "belongstomany",
      "morphmany",
      "morphone",
      "morphto",
      "hasmanythrough",
      "hasonethrough",
    ].includes(baseType);
  }

  // Parse a model's blueprint.schema object into real columns + relationships.
  _parseSchemaColumns(schemaObj) {
    const columns = [];
    const relationships = [];
    if (!schemaObj || typeof schemaObj !== "object") {
      return { columns, relationships };
    }
    const SKIP_COLS = [
      "id",
      "created_at",
      "updated_at",
      "deleted_at",
      "remember_token",
    ];
    for (const [name, rawType] of Object.entries(schemaObj)) {
      const typeStr = String(rawType || "").trim();
      const [baseType, ...mods] = typeStr.split(":");
      const base = baseType.toLowerCase();
      if (this._isRelationType(base)) {
        relationships.push({ name, type: base, target: mods[0] || null });
        continue;
      }
      if (SKIP_COLS.includes(name)) continue;
      columns.push({ name, baseType: base, mods });
    }
    return { columns, relationships };
  }

  // user_id -> User, short_url_id -> ShortUrl
  _fkToModel(colName) {
    const base = String(colName).replace(/_id$/, "");
    if (!base) return null;
    return base
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");
  }

  // Build a Laravel migration column declaration from a parsed schema column.
  _columnMigrationCall(col) {
    const { name, baseType, mods } = col;
    const modStr = mods.join(":");
    let line;
    switch (baseType) {
      case "foreignid":
      case "foreignuuid":
        line =
          name === "user_id"
            ? "$table->foreignId('user_id')->nullable()->constrained()->nullOnDelete()"
            : `$table->foreignId('${name}')->constrained()`;
        break;
      case "text":
      case "longtext":
        line = `$table->text('${name}')`;
        break;
      case "json":
        line = `$table->json('${name}')`;
        break;
      case "boolean":
        line = `$table->boolean('${name}')->default(false)`;
        break;
      case "integer":
      case "int":
        line = `$table->integer('${name}')->default(0)`;
        break;
      case "biginteger":
        line = `$table->unsignedBigInteger('${name}')->default(0)`;
        break;
      case "decimal":
      case "float":
      case "double":
        line = `$table->decimal('${name}', 10, 2)->default(0)`;
        break;
      case "date":
        line = `$table->date('${name}')->nullable()`;
        break;
      case "datetime":
      case "timestamp":
        line = `$table->timestamp('${name}')->nullable()`;
        break;
      case "enum":
        line = `$table->string('${name}')->nullable()`;
        break;
      case "string":
      default:
        line = `$table->string('${name}')`;
        break;
    }
    if (modStr.includes("nullable") && !line.includes("->nullable()")) {
      line += "->nullable()";
    }
    if (modStr.includes("unique")) line += "->unique()";
    const defMatch = mods.find((m) => m.startsWith("default("));
    if (defMatch) {
      const val = defMatch.slice(8, -1);
      line += `->default('${val}')`;
    }
    if (modStr.includes("index") || modStr.includes("indexed")) {
      line += "->index()";
    }
    return line + ";";
  }

  // Inject any real schema columns missing from a generated migration body.
  _ensureMigrationColumns(tableName, schemaObj, code) {
    if (!code || !code.includes("Schema::create"))
      return { code, injected: [] };
    const { columns } = this._parseSchemaColumns(schemaObj);
    const injected = [];
    const lines = [];
    for (const col of columns) {
      const re = new RegExp(
        `\\$table\\s*->\\s*\\w+\\s*\\(\\s*['"]${col.name}['"]`,
      );
      if (re.test(code)) continue;
      lines.push("            " + this._columnMigrationCall(col));
      injected.push(col.name);
    }
    if (lines.length === 0) return { code, injected };
    const block = lines.join("\n");
    if (/\$table->timestamps\(\);/.test(code)) {
      code = code.replace(/([ \t]*\$table->timestamps\(\);)/, `${block}\n$1`);
    } else {
      code = code.replace(
        /(\}\s*;\s*\n\s*public function down)/,
        `\n${block}\n        $1`,
      );
    }
    return { code, injected };
  }

  // Enforce $fillable + relationship methods on a generated model.
  _ensureModelFillable(modelName, schemaObj, knownModels, code) {
    if (!code) return code;
    const { columns, relationships } = this._parseSchemaColumns(schemaObj);
    let out = code;

    // 1. $fillable = every real schema column
    const fillableNames = columns.map((c) => c.name);
    if (fillableNames.length > 0) {
      const body = fillableNames.map((n) => `'${n}'`).join(", ");
      if (/protected\s+\$fillable\s*=\s*\[[\s\S]*?\]/.test(out)) {
        out = out.replace(
          /protected\s+\$fillable\s*=\s*\[[\s\S]*?\]/,
          `protected $fillable = [${body}]`,
        );
      } else {
        out = out.replace(
          /(class\s+\w+\s+extends\s+\w+[\s\S]*?\{)/,
          `$1\n    protected $fillable = [${body}];\n`,
        );
      }
    }

    // 2. Relationship methods (only when target model is known to exist)
    const methods = [];
    const hasMethod = (name) =>
      new RegExp(`function\\s+${name}\\s*\\(`).test(out);
    for (const c of columns) {
      if (c.baseType === "foreignid" || c.baseType === "foreignuuid") {
        const target = this._fkToModel(c.name);
        if (target && (target === "User" || knownModels.includes(target))) {
          const method = c.name.replace(/_id$/, "").replace(/s$/, "");
          if (method && !hasMethod(method)) {
            methods.push(
              `    public function ${method}()\n    {\n        return $this->belongsTo(${target}::class);\n    }`,
            );
          }
        }
      }
    }
    for (const r of relationships) {
      if (!r.target || !knownModels.includes(r.target)) continue;
      if (hasMethod(r.name)) continue;
      if (r.type === "hasmany") {
        methods.push(
          `    public function ${r.name}()\n    {\n        return $this->hasMany(${r.target}::class);\n    }`,
        );
      } else if (r.type === "hasone") {
        methods.push(
          `    public function ${r.name}()\n    {\n        return $this->hasOne(${r.target}::class);\n    }`,
        );
      } else if (r.type === "belongsto") {
        methods.push(
          `    public function ${r.name}()\n    {\n        return $this->belongsTo(${r.target}::class);\n    }`,
        );
      }
    }

    if (methods.length > 0) {
      // Remove the placeholder relationship TODO comment lines (whole lines).
      out = out.replace(
        /[ \t]*\/\/[^\n]*(?:TODO|relationship methods|Replace this comment)[^\n]*\n/gi,
        "",
      );
      const lastBrace = out.lastIndexOf("}");
      if (lastBrace !== -1) {
        out =
          out.slice(0, lastBrace) +
          "\n" +
          methods.join("\n\n") +
          "\n" +
          out.slice(lastBrace);
      }
    }
    return out;
  }

  // Build a schema-locked Factory class (definition array derived from columns).
  _buildFactoryClass(factoryName, modelName, schemaObj, knownModels) {
    const { columns } = this._parseSchemaColumns(schemaObj);
    const entries = [];
    const extraImports = new Set();
    for (const c of columns) {
      const b = c.baseType;
      if (b === "foreignid" || b === "foreignuuid") {
        const target = this._fkToModel(c.name);
        if (
          target &&
          target !== modelName &&
          (target === "User" || knownModels.includes(target))
        ) {
          extraImports.add(target);
          entries.push(`        '${c.name}' => ${target}::factory(),`);
        } else {
          entries.push(`        '${c.name}' => null,`);
        }
      } else if (b === "boolean") {
        entries.push(`        '${c.name}' => fake()->boolean(),`);
      } else if (["integer", "int", "biginteger"].includes(b)) {
        entries.push(`        '${c.name}' => fake()->numberBetween(1, 100),`);
      } else if (["decimal", "float", "double"].includes(b)) {
        entries.push(`        '${c.name}' => fake()->randomFloat(2, 1, 1000),`);
      } else if (["datetime", "timestamp"].includes(b)) {
        entries.push(`        '${c.name}' => fake()->dateTime(),`);
      } else if (b === "date") {
        entries.push(`        '${c.name}' => fake()->date(),`);
      } else if (b === "text" || b === "longtext") {
        entries.push(`        '${c.name}' => fake()->paragraph(),`);
      } else {
        entries.push(`        '${c.name}' => fake()->word(),`);
      }
    }
    const importBlock =
      [...extraImports].map((t) => `use App\\Models\\${t};`).join("\n") +
      (extraImports.size ? "\n" : "");
    return `<?php\n\nnamespace Database\\Factories;\n\n${importBlock}use App\\Models\\${modelName};\nuse Illuminate\\Database\\Eloquent\\Factories\\Factory;\n\nclass ${factoryName} extends Factory\n{\n    protected $model = ${modelName}::class;\n\n    public function definition(): array\n    {\n        return [\n${entries.join("\n")}\n        ];\n    }\n}\n`;
  }

  // Deterministic cleanup of hallucinated Faker usage in seeders/factories.
  _sanitizeSeeder(code) {
    if (!code) return code;
    let out = code;
    out = out.replace(/\$faker\s*->/g, "fake()->");
    out = out.replace(
      /\$faker\s*=\s*Faker(?:\\Factory)?::create\(\)\s*;?\s*\n?/gi,
      "",
    );
    out = out.replace(/use\s+Faker\\Factory\s*;\s*\n/gi, "");
    out = out.replace(/->realistic\s*\([^)]*\)/gi, "->sentence(3)");
    return out;
  }

  // Deterministic cleanup of hallucinated migration code.
  // Local models sometimes emit column MODIFIERS as standalone Blueprint calls
  // (e.g. `$table->nullable();` with the bogus rationale "nullable for all
  // columns by default"). Those methods live on the column definition, not on
  // Illuminate\Database\Schema\Blueprint, so `php artisan migrate` throws
  // BadMethodCallException. We strip only unambiguous zero-arg bare modifiers
  // and never touch valid no-arg Blueprint helpers (timestamps/softDeletes/id).
  _sanitizeMigration(code) {
    if (!code || !code.includes("Schema::create")) return code;
    const BARE_INVALID =
      /\n[ \t]*\$table\s*->\s*(nullable|unsigned|useCurrent|after|default|comment|charset|collation|change)\s*\(\s*\)\s*;?[^\n]*/gi;
    return code.replace(BARE_INVALID, "");
  }

  // Collapse duplicate column/helper calls inside every Schema::create(...) block.
  // (1) An exact-duplicated `$table->...` call (e.g. timestamps() twice) is always
  //     a migrate error, so keep only the first. (2) When timestamps() is present,
  //     drop explicit created_at/updated_at columns; when softDeletes() is present,
  //     drop an explicit deleted_at column — those helpers already define them.
  _dedupeMigrationColumns(code) {
    if (!code || !code.includes("Schema::create")) return code;
    const lines = code.split(/\r?\n/);
    const CALL =
      /^(\s*)(\$table\s*->\s*\w+\s*\([^)]*\)(?:\s*->\s*\w+\s*\([^)]*\))*\s*;)/;
    const out = [];
    let i = 0;
    while (i < lines.length) {
      out.push(lines[i]);
      if (/Schema::create\s*\(/.test(lines[i])) {
        let j = i + 1;
        const block = [];
        while (j < lines.length && !/^\s*\}\s*\)\s*;/.test(lines[j])) {
          block.push(lines[j]);
          j++;
        }
        out.push(...this._dedupeMigrationBlock(block, CALL));
        i = j; // closing `});` line is emitted on the next loop iteration
        continue;
      }
      i++;
    }
    return out.join("\n");
  }

  _dedupeMigrationBlock(block, CALL) {
    const hasHelper = (name) =>
      block.some((l) => new RegExp(`\\$table\\s*->\\s*${name}\\s*\\(`).test(l));
    const timestamps = hasHelper("timestamps");
    const softDeletes = hasHelper("softDeletes");
    const seen = new Set();
    const result = [];
    for (const line of block) {
      const m = line.match(CALL);
      if (m) {
        const call = m[2].replace(/\s+/g, "");
        const colName = (line.match(
          /\$table\s*->\s*\w+\s*\(\s*['"](\w+)['"]/,
        ) || [])[1];
        if (
          colName &&
          ((timestamps && /^(created_at|updated_at)$/.test(colName)) ||
            (softDeletes && colName === "deleted_at"))
        ) {
          continue; // explicit column collides with a helper that defines it
        }
        if (seen.has(call)) continue; // exact duplicate call
        seen.add(call);
      }
      result.push(line);
    }
    return result;
  }

  // Columns a blueprint declares for User that are NOT in Laravel's core
  // users table. Generic (any extra attribute), never role-specific.
  _extraUserColumns(schemaObj) {
    const RESERVED = new Set([
      "id",
      "name",
      "email",
      "password",
      "email_verified_at",
      "remember_token",
      "created_at",
      "updated_at",
      "deleted_at",
    ]);
    const { columns } = this._parseSchemaColumns(schemaObj);
    return columns.filter((c) => !RESERVED.has(c.name));
  }

  // Build an ADDITIVE migration that appends blueprint-declared User columns
  // to the existing core users table (standard Laravel pattern; the core
  // 0001_01_01 migration is never edited). Additive-safe: forces nullable()
  // for columns without a default so it works even on a populated table.
  _buildAddColumnsToUsersMigration(extraCols) {
    const adds = extraCols
      .map((c) => {
        let call = this._columnMigrationCall(c);
        if (!/->nullable\(\)/.test(call) && !/->default\(/.test(call)) {
          call = call.replace(/;$/, "->nullable();");
        }
        return `            ${call}`;
      })
      .join("\n");
    const drops = extraCols
      .map((c) => `            $table->dropColumn('${c.name}');`)
      .join("\n");
    return `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
${adds}
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
${drops}
        });
    }
};
`;
  }

  // Inject inverse hasMany() relations into the preserved User model for every
  // blueprint model that declares a user_id foreign key. Without these, views
  // reading `$user->shortUrls` get null and chained calls crash with
  // "Call to a member function first() on null". Generic & schema-driven:
  // any model with a *_user_id/user_id FK gets a camelPlural() relation.
  _ensureUserRelations(code, blueprint) {
    const added = [];
    if (!code || !blueprint || !blueprint.schema) return { code, added };
    let out = code;
    const relMethods = [];
    for (const modelName of Object.keys(blueprint.schema)) {
      if (modelName === "User") continue;
      const { columns } = this._parseSchemaColumns(blueprint.schema[modelName]);
      const hasUserFk = columns.some(
        (c) =>
          (c.baseType === "foreignid" || c.baseType === "foreignuuid") &&
          (/(^|_)user_id$/i.test(c.name) || /\buser\b/i.test(c.name)),
      );
      if (!hasUserFk) continue;
      const method = this._camelPlural(modelName);
      if (new RegExp(`function\\s+${method}\\s*\\(`).test(out)) continue;
      relMethods.push(
        `    public function ${method}()\n    {\n        return $this->hasMany(${modelName}::class);\n    }`,
      );
      added.push(`${method}() -> ${modelName}`);
    }
    if (relMethods.length === 0) return { code, added };
    const lastBrace = out.lastIndexOf("}");
    out =
      out.slice(0, lastBrace) +
      "\n" +
      relMethods.join("\n\n") +
      "\n" +
      out.slice(lastBrace);
    return { code: out, added };
  }

  // Additively register extra columns in the preserved User model's fillable,
  // supporting both Laravel 12 `#[Fillable([...])]` and `protected $fillable`.
  _ensureUserFillable(code, extraNames) {
    if (!code || !extraNames || extraNames.length === 0) return code;
    const attrMatch = code.match(/#\[Fillable\(\[([^\]]*)\]\)\]/);
    if (attrMatch) {
      const existing = [...attrMatch[1].matchAll(/'([^']*)'/g)].map(
        (m) => m[1],
      );
      const merged = [...existing];
      for (const n of extraNames) if (!merged.includes(n)) merged.push(n);
      const body = merged.map((n) => `'${n}'`).join(", ");
      return code.replace(
        /#\[Fillable\(\[[^\]]*\]\)\]/,
        `#[Fillable([${body}])]`,
      );
    }
    if (/protected\s+\$fillable\s*=\s*\[[\s\S]*?\]/.test(code)) {
      const block = code.match(
        /protected\s+\$fillable\s*=\s*\[([\s\S]*?)\]/,
      )[1];
      const existing = [...block.matchAll(/'([^']*)'/g)].map((m) => m[1]);
      const merged = [...existing];
      for (const n of extraNames) if (!merged.includes(n)) merged.push(n);
      const body = merged.map((n) => `'${n}'`).join(", ");
      return code.replace(
        /protected\s+\$fillable\s*=\s*\[[\s\S]*?\]/,
        `protected $fillable = [${body}]`,
      );
    }
    return code;
  }
}
module.exports = ImplementationPhase;
