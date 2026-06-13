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

    // Generate Layout
    await this.generateLayout(blueprint);

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

      // Phase B #8: Auth Scaffolding
      if (!hasBreeze) {
        this.log(`      ⚠️ Laravel Breeze installation skipped per user request.`, "warning");
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

  async getCachedOrGenerate(prompt, taskType) {
    const crypto = require("crypto");
    const hash = crypto
      .createHash("md5")
      .update(prompt + taskType)
      .digest("hex");
    const cacheDir = path.join(
      this.engine.rootPath,
      "memory",
      "cache",
      "generated_code",
    );
    const cacheFile = path.join(cacheDir, `${hash}.txt`);

    if (await fs.pathExists(cacheFile)) {
      this.log(`      🎁 Code retrieved from template cache.`, "success");
      return await fs.readFile(cacheFile, "utf8");
    }

    const response = await localAI.generate(prompt, taskType);
    if (response) {
      await fs.ensureDir(cacheDir);
      await fs.writeFile(cacheFile, response, "utf8");

      // Save dataset for SFT fine-tuning
      const datasetFile = path.join(cacheDir, `${hash}.json`);
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

    // RELATIONSHIPS only using BelongsTo, HasMany, BelongsToMany from Eloquent
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
    const modelPath = path.join(
      this.engine.rootPath,
      "app",
      "Models",
      `${modelName}.php`,
    );
    await fs.ensureDir(path.dirname(modelPath));

    if (response) {
      const cleanCode = this.cleanLLMOutput(response);
      await fs.writeFile(modelPath, cleanCode);
      const syntaxOk = await this.validatePHPSyntax(modelPath);
      if (!syntaxOk) {
        this.log(
          `      ⚠️ Syntax error in generated model. Writing safe fallback for ${modelName}.php`,
          "warning",
        );
        await fs.writeFile(
          modelPath,
          this._safeFallbackModel(modelName, tableName),
        );
      }
      this.log(`      ✅ Saved ${modelName}.php`, "success");
    } else {
      this.log(
        `      ⚠️ LLM returned empty. Writing safe fallback for ${modelName}.php`,
        "warning",
      );
      await fs.writeFile(
        modelPath,
        this._safeFallbackModel(modelName, tableName),
      );
    }
  }

  _safeFallbackModel(modelName, tableName) {
    return `<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\HasFactory;\nuse Illuminate\\Database\\Eloquent\\Model;\nuse Illuminate\\Database\\Eloquent\\SoftDeletes;\nuse Illuminate\\Database\\Eloquent\\Concerns\\HasUuids;\n\nclass ${modelName} extends Model\n{\n    use HasFactory, HasUuids, SoftDeletes;\n\n    protected $table = '${tableName}';\n    protected $primaryKey = 'id';\n    public $incrementing = false;\n    protected $keyType = 'string';\n\n    protected $fillable = ['name'];\n\n    protected $casts = ['id' => 'string'];\n}\n`;
  }

  async generateMigration(migrationName, blueprint) {
    this.log(`   🗄️ Generating Migration: ${migrationName}...`, "info");
    const tableName = migrationName
      .replace(/^create_/, "")
      .replace(/_table$/, "");

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
          "laravel_database_rules.md",
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

MIGRATION SYNTAX (use anonymous class — never use named class):
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('${tableName}', function (Blueprint $table) {
            $table->uuid('id')->primary();      // UUID primary key
            $table->foreignUuid('user_id')      // FK to users (if applicable)
                  ->constrained()->cascadeOnDelete();
            // add columns relevant to the project here
            $table->string('column_name');      // varchar 255
            $table->text('column_name');        // long text
            $table->unsignedBigInteger('col'); // integer
            $table->boolean('is_active')->default(true);
            $table->decimal('amount', 10, 2);  // money/decimal
            $table->enum('status', ['active','inactive']);
            $table->index(['column_name']);     // add index for searchable columns
            $table->timestamps();              // created_at, updated_at
            $table->softDeletes();             // deleted_at for soft delete
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('${tableName}');
    }
};

COLUMN RULES:
- Use uuid('id')->primary() NOT id() for UUID PKs
- Use foreignUuid() NOT unsignedBigInteger() for UUID FKs
- Use constrained()->cascadeOnDelete() for all foreign keys
- Always add softDeletes() for data that should be recoverable
- Always add index() on columns used in WHERE/ORDER BY
- Use nullable() only when the column is truly optional
- String columns default to varchar(255); use text() for long content

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
        await fs.writeFile(
          migrationPath,
          this._safeFallbackMigration(tableName),
        );
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
    const fullSchema = blueprint.schema
      ? JSON.stringify(blueprint.schema, null, 2)
      : "No schema";

    // Generate PHP Class
    const phpPrompt = `Write a complete Livewire component class for '${className}'. Namespace: App\\Livewire. It should handle the logic for a ${blueprint.project_name}. Include public properties and basic methods (like save/delete). 
    
SCHEMA REFERENCE:
${fullSchema}
Make sure public properties match the columns in the schema if this component manages a model.
    
Output ONLY the raw PHP code, starting with <?php. No markdown blocks.`;
    const phpResponse = await this.getCachedOrGenerate(
      phpPrompt,
      "build_livewire_component",
    );

    if (phpResponse) {
      const cleanPhp = this.cleanLLMOutput(phpResponse);
      const phpPath = path.join(
        this.engine.rootPath,
        "app",
        "Livewire",
        `${className}.php`,
      );
      await fs.ensureDir(path.dirname(phpPath));
      await fs.writeFile(phpPath, cleanPhp);
      await this.validatePHPSyntax(phpPath);
      this.log(`      ✅ Saved ${className}.php`, "success");
    }

    // Generate Blade View
    const bladePrompt = `Write a complete Livewire blade view for the '${className}' component. Use Tailwind CSS for styling and Alpine.js where appropriate. Make it look professional and beautiful. Use wire:model and wire:click for interactions. 
    
SCHEMA REFERENCE:
${fullSchema}
Ensure your wire:model attributes match the properties corresponding to the schema.
    
Output ONLY the raw HTML/Blade code. No markdown blocks.`;
    const bladeResponse = await this.getCachedOrGenerate(
      bladePrompt,
      "build_view",
    );

    if (bladeResponse) {
      const cleanBlade = this.cleanLLMOutput(bladeResponse);
      const bladePath = path.join(
        this.engine.rootPath,
        "resources",
        "views",
        "livewire",
        `${this.toKebabCase(componentName)}.blade.php`,
      );
      await fs.ensureDir(path.dirname(bladePath));
      await fs.writeFile(bladePath, cleanBlade);
      this.log(
        `      ✅ Saved ${this.toKebabCase(componentName)}.blade.php`,
        "success",
      );
    }
  }

  async generateFactory(factoryName, blueprint) {
    this.log(`   🏭 Generating Factory: ${factoryName}...`, "info");
    const prompt = `Write a complete Laravel Factory class for '${factoryName}'. Namespace: Database\\Factories. Output ONLY the raw PHP code, starting with <?php.`;
    const response = await this.getCachedOrGenerate(
      prompt,
      "build_model_migration",
    );
    if (response) {
      const cleanCode = this.cleanLLMOutput(response);
      const p = path.join(
        this.engine.rootPath,
        "database",
        "factories",
        `${factoryName}.php`,
      );
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
    const prompt = `Write a complete Laravel Seeder class for '${seederName}'. Namespace: Database\\Seeders. Use the fake() global helper ONLY (e.g., fake()->name()). DO NOT use an uninitialized $faker variable in the run() method. Output ONLY raw PHP code.`;
    const response = await this.getCachedOrGenerate(
      prompt,
      "build_model_migration",
    );
    if (response) {
      const cleanCode = this.cleanLLMOutput(response);
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
        await fs.writeFile(p, this._safeFallbackSeeder(seederName));
      }
    }
  }

  async generateRoutes(routesList, blueprint) {
    this.log(`   🛣️ Generating Routes...`, "info");
    const prompt = `Write the content for routes/web.php in Laravel for a ${blueprint.project_name} application. Include these routes: ${routesList.join(", ")}. Use Volt or Livewire syntax if applicable. Output ONLY the raw PHP code, starting with <?php.`;
    const response = await this.getCachedOrGenerate(
      prompt,
      "build_model_migration",
    );
    if (response) {
      const cleanCode = this.cleanLLMOutput(response);
      const p = path.join(this.engine.rootPath, "routes", "web.php");
      await fs.writeFile(p, cleanCode);
      const syntaxOk = await this.validatePHPSyntax(p);
      if (!syntaxOk) {
        this.log(
          `      ⚠️ Syntax error in generated routes. Writing safe fallback for web.php`,
          "warning",
        );
        await fs.writeFile(p, this._safeFallbackRoutes(routesList, blueprint));
      }
    }

    // Also generate API routes if models exist
    const models = blueprint.models || [];
    if (models.length > 0) {
      this.log(`   🛣️ Generating API Routes...`, "info");
      const apiPrompt = `Write the content for routes/api.php in Laravel. Create apiResource routes for these models: ${models.join(", ")}. Output ONLY the raw PHP code, starting with <?php.`;
      const apiResponse = await this.getCachedOrGenerate(
        apiPrompt,
        "build_model_migration",
      );
      if (apiResponse) {
        const apiCleanCode = this.cleanLLMOutput(apiResponse);
        const apiP = path.join(this.engine.rootPath, "routes", "api.php");
        await fs.ensureDir(path.dirname(apiP));
        await fs.writeFile(apiP, apiCleanCode);
        const apiSyntaxOk = await this.validatePHPSyntax(apiP);
        if (!apiSyntaxOk) {
          this.log(
            `      ⚠️ Syntax error in generated API routes. Writing safe fallback for api.php`,
            "warning",
          );
          const apiRoutes = models
            .map((m) => {
              const ctrl = `App\\Http\\Controllers\\Api\\${m}Controller`;
              return `Route::apiResource('${this._toSnakePlural(m)}', \\${ctrl}::class);`;
            })
            .join("\n");
          await fs.writeFile(
            apiP,
            `<?php\n\nuse Illuminate\\Support\\Facades\\Route;\n\n${apiRoutes}\n`,
          );
        }
      }
    }
  }

  async generatePolicy(modelName, blueprint) {
    this.log(`   🛡️ Generating Policy: ${modelName}Policy...`, "info");
    // STRICT TEMPLATE PROMPT: prevents LLM from hallucinating fake Illuminate\Auth imports
    const prompt = `Write a Laravel 11 Policy PHP class. Follow this EXACT template structure:

<?php

namespace App\\Policies;

${modelName === "User" ? "" : "use App\\Models\\User;\n"}use App\\Models\\${modelName};

class ${modelName}Policy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, ${modelName} $model): bool
    {
        return $user->id === $model->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, ${modelName} $model): bool
    {
        return $user->id === $model->user_id;
    }

    public function delete(User $user, ${modelName} $model): bool
    {
        return $user->id === $model->user_id;
    }
}

RULES:
- Use EXACTLY the namespace: App\\Policies
- Use EXACTLY these two imports: App\\Models\\User and App\\Models\\${modelName}
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
    return `<?php\n\nuse Illuminate\\Database\\Migrations\\Migration;\nuse Illuminate\\Database\\Schema\\Blueprint;\nuse Illuminate\\Support\\Facades\\Schema;\n\nreturn new class extends Migration\n{\n    public function up(): void\n    {\n        Schema::create('${tableName}', function (Blueprint $table) {\n            $table->uuid('id')->primary();\n            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();\n            $table->string('name')->nullable();\n            $table->timestamps();\n            $table->softDeletes();\n        });\n    }\n\n    public function down(): void\n    {\n        Schema::dropIfExists('${tableName}');\n    }\n};\n`;
  }

  _safeFallbackRoutes(routesList, blueprint) {
    const routeEntries = (routesList || [])
      .map(
        (r) => `Route::get('${r}', function () { return view('welcome'); });`,
      )
      .join("\n");
    return `<?php\n\nuse Illuminate\\Support\\Facades\\Route;\n\nRoute::get('/', function () {\n    return view('welcome');\n});\n\n${routeEntries}\n`;
  }

  _safeFallbackFactory(factoryName) {
    // Extract model name from factory name (e.g. "UserFactory" -> "User")
    const modelName = factoryName.replace(/Factory$/, "");
    return `<?php\n\nnamespace Database\\Factories;\n\nuse App\\Models\\${modelName};\nuse Illuminate\\Database\\Eloquent\\Factories\\Factory;\n\nclass ${factoryName} extends Factory\n{\n    protected $model = ${modelName}::class;\n\n    public function definition(): array\n    {\n        return [\n            'name' => fake()->name(),\n        ];\n    }\n}\n`;
  }

  _safeFallbackSeeder(seederName) {
    return `<?php\n\nnamespace Database\\Seeders;\n\nuse Illuminate\\Database\\Seeder;\n\nclass ${seederName} extends Seeder\n{\n    public function run(): void\n    {\n        // Safe fallback: no data seeded\n    }\n}\n`;
  }

  async generateLayout(blueprint) {
    this.log(`   🎨 Generating Layouts...`, "info");
    const prompt = `Write a complete Blade layout file (app.blade.php) for a ${blueprint.project_name} application. Include a modern Tailwind CSS sidebar, navigation, and footer. The content should be injected via {!! $slot ?? '' !!} or @yield('content'). Output ONLY the raw HTML/Blade code. No markdown blocks.`;
    const response = await this.getCachedOrGenerate(prompt, "build_view");
    if (response) {
      const cleanCode = this.cleanLLMOutput(response);
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
      return match[1].trim();
    }

    // If there is an opening code block but no closing one (cut-off)
    if (clean.startsWith("```")) {
      return clean.replace(/^```(?:[a-zA-Z0-9_-]+)?\n?/i, "").trim();
    }

    // If it has a php tag, it's a PHP file content. Discard anything before <?php and anything after the first subsequent ```
    if (clean.includes("<?php")) {
      const phpStart = clean.indexOf("<?php");
      let phpCode = clean.slice(phpStart);
      // If there's a closing ``` after the PHP code, strip it and everything after
      if (phpCode.includes("```")) {
        phpCode = phpCode.split("```")[0];
      }
      return phpCode.trim();
    }

    // If it's a HTML/Blade file and has a trailing ``` followed by text
    if (clean.includes("```")) {
      return clean.split("```")[0].trim();
    }

    return clean;
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
}

module.exports = ImplementationPhase;
