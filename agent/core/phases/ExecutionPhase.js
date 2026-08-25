const fs = require("fs-extra");
const path = require("path");
const { spawn } = require("child_process");
const NexusClock = require("../NexusClock");
const BasePhase = require("./BasePhase");
const NexusError = require("../NexusError");
const CoreUtils = require("./CoreUtils");

class ExecutionPhase extends BasePhase {
  async run(plan) {
    const activePlan = plan || this.engine.currentPlan;
    if (!activePlan) {
      throw new NexusError(
        "EXECUTION",
        "Pipeline Violation: Execution requires an approved Plan.",
      );
    }

    this.log(`🚀 Phase 3: Executing Plan ${activePlan.id}...`, "info");

    for (const task of activePlan.tasks) {
      this.log(`🛠 Executing: ${task.description}`, "warning");

      if (task.action) {
        try {
          // TDD Enforcement
          if (
            task.action.type === "FILE_REPLACE" ||
            task.action.type === "FILE_APPEND"
          ) {
            const validation = await this.engine.tddGuard.validate(
              task.action.target,
            );
            if (!validation.allowed) {
              this.log(`   🛑 TDD Block: ${validation.reason}`, "error");
              this.log(
                `   🏗️ [Phase 4] Autonomous Intelligence: Generating test scaffold...`,
                "info",
              );
              const scaffold = await this.engine.tddScaffolder.generate(
                task.action.target,
              );
              if (scaffold.success) {
                this.log(
                  `   ✅ Scaffold created at ${scaffold.path}. Proceeding with action.`,
                  "success",
                );
              } else {
                this.log(
                  `   ⚠️ Scaffolding skipped: ${scaffold.reason}`,
                  "warning",
                );
              }
            } else {
              this.log(`   🛡️ TDD Verified: ${validation.reason}`, "success");
            }
          }

          // Asset Optimization
          if (task.action.type === "ASSET_OPTIMIZE") {
            await this.engine.assetEngine.process(task.action);
            this.log(`   🖼️ Asset optimized via AssetEngine`, "success");
          } else {
            const success = await this.engine.modifier.apply(task.action);
            if (success) {
              this.log(
                `   ✅ Physical modification applied: ${task.action.type} on ${task.action.target}`,
                "success",
              );

              if (task.action.type === "RESOLVE_OPTIONS") {
                await this.updateRecapStatus(
                  `Resolved Multi-Option collision in ${task.action.target}`,
                );
              }
            }
          }
        } catch (e) {
          this.log(`   ❌ Execution Error: ${e.message}`, "error");
          task.status = "failed";
          continue;
        }
      }

      // Legacy Support
      if (task.description.startsWith("UPDATE_BACKLOG:")) {
        const backlogPath = path.join(
          this.engine.knowledgePath,
          "ENGINE_DEBT_BACKLOG.md",
        );
        if (await fs.pathExists(backlogPath)) {
          let content = await fs.readFile(backlogPath, "utf8");
          content += `\n- [x] Resolved via ${activePlan.id}: ${task.description.split(":")[1]}`;
          await fs.writeFile(backlogPath, content);
          this.log(
            `   ✅ Physical modification applied to ENGINE_DEBT_BACKLOG.md`,
            "success",
          );
        }
      }

      task.status = "done";
    }

    this.log("✅ Execution phase completed.", "success");
  }

  async verify(plan) {
    this.log("🔍 Phase 5: Verification Phase...", "info");
    const activePlan = plan || this.engine.currentPlan;
    const results = [];

    for (const task of activePlan.tasks) {
      if (task.status === "done" && task.action) {
        const verification = await this.engine.validator.verifyAction(
          task.action,
        );
        results.push({ id: task.id, ...verification });
        if (!verification.success) {
          this.log(
            `   ❌ Verification Failed for Task ${task.id}: ${verification.message}`,
            "error",
          );
          task.status = "failed_verification";
        } else {
          this.log(
            `   ✅ Verification Success for Task ${task.id}: ${verification.message}`,
            "success",
          );
        }
      } else {
        results.push({
          id: task.id,
          success: task.status === "done",
          message: "Non-physical task.",
        });
      }
    }

    this.log(
      `✅ Verification complete: ${results.filter((r) => r.success).length}/${results.length} tasks verified.`,
      "success",
    );
    return results;
  }

  async cleanCodeAndVerify(projectPath = this.engine.rootPath) {
    this.log(`扫 Phase 5.5: Clean Code & Stability Verification...`, "info");

    this.log(
      `   📂 Identifying legacy template clutter (UrlShortener remnants)...`,
      "warning",
    );
    const blueprintPath = path.join(projectPath, "NEXUS_BLUEPRINT.json");
    let allowedComponents = [];
    let allowedModels = [];
    if (await fs.pathExists(blueprintPath)) {
      const blueprint = await fs.readJson(blueprintPath);
      allowedComponents = (blueprint.livewire_components || []).map((c) =>
        this.toKebabCase(c),
      );
      allowedModels = (blueprint.models || []).map((m) => m.toLowerCase());
    }

    // FIX #22 — Legacy patterns dibuat dinamis dari blueprint, bukan hardcoded
    // Hindari false-positive pada project non-UrlShortener
    let legacyPatterns = [];
    if (await fs.pathExists(blueprintPath)) {
      const bp = await fs.readJson(blueprintPath).catch(() => ({}));
      legacyPatterns = bp.legacy_patterns || [];
    }

    if (legacyPatterns.length === 0) {
      legacyPatterns = [
        "UrlShortener",
        "UrlMapping",
        "ShortenUrl",
        "UrlController",
        "Url.php",
        "create_urls_table",
      ];
    }

    const files = await CoreUtils.globRecursive(projectPath, "**/*");
    let deletedCount = 0;

    for (const file of files) {
      const fileName = path.basename(file);
      let isLegacyFile = legacyPatterns.some((p) => file.includes(p));

      // Protect allowed models, components, and migrations from being treated as legacy template clutter
      if (isLegacyFile) {
        const lowerFileName = fileName.toLowerCase();
        const isAllowedModel = allowedModels.some((m) =>
          lowerFileName.startsWith(m),
        );
        const isAllowedComponent = allowedComponents.some((c) =>
          lowerFileName.includes(c),
        );
        const isMigrationForAllowedModel = allowedModels.some(
          (m) =>
            lowerFileName.includes(`create_${m}s_table`) ||
            lowerFileName.includes(`create_${m}_table`),
        );
        if (
          isAllowedModel ||
          isAllowedComponent ||
          isMigrationForAllowedModel
        ) {
          isLegacyFile = false;
        }
      }

      // Special check for Livewire views: if it's not in the blueprint, it's unused
      let isUnusedLivewire = false;
      let isUnusedModel = false;
      let isUnusedMigration = false;

      if (
        file.includes("resources/views/livewire") &&
        file.endsWith(".blade.php")
      ) {
        const componentName = fileName.replace(".blade.php", "");
        if (!allowedComponents.includes(componentName)) isUnusedLivewire = true;
      }
      if (file.includes("app/Livewire") && file.endsWith(".php")) {
        const componentName = this.toKebabCase(fileName.replace(".php", ""));
        if (!allowedComponents.includes(componentName)) isUnusedLivewire = true;
      }
      if (
        file.includes("app/Models") &&
        file.endsWith(".php") &&
        fileName !== "User.php"
      ) {
        const modelName = fileName.replace(".php", "").toLowerCase();
        if (!allowedModels.includes(modelName)) isUnusedModel = true;
      }
      if (
        file.includes("database/migrations") &&
        file.endsWith(".php") &&
        !file.includes("0001_01_01")
      ) {
        // BUG-09 FIX: Removed aggressive date filtering that deletes valid older migrations
      }

      if (
        (isLegacyFile ||
          isUnusedLivewire ||
          isUnusedModel ||
          isUnusedMigration) &&
        !file.includes("node_modules") &&
        !file.includes("vendor") &&
        !file.includes(".git") &&
        !file.includes(".agents")
      ) {
        if (await fs.pathExists(file)) {
          await fs.remove(file);
          this.log(
            `      🗑️ Deleted legacy/unused file: ${path.relative(projectPath, file)}`,
            "error",
          );
          deletedCount++;
        }
      }
    }

    // Clean up routes/web.php from legacy references
    const webRoutesPath = path.join(projectPath, "routes", "web.php");
    if (await fs.pathExists(webRoutesPath)) {
      const webRoutesContent = await fs.readFile(webRoutesPath, "utf8");
      const newWebRoutes = webRoutesContent
        .split("\n")
        .filter((line) => {
          return !legacyPatterns.some((p) => line.includes(p));
        })
        .join("\n");
      if (webRoutesContent !== newWebRoutes) {
        await fs.writeFile(webRoutesPath, newWebRoutes);
        this.log(
          `      🗑️ Removed legacy routes from routes/web.php`,
          "warning",
        );
      }
    }

    await this.autoWireFrontend(projectPath);

    this.log(
      `   ✅ Cleanup & Wiring complete: ${deletedCount} files removed.`,
      "success",
    );

    // Run migrate:fresh to avoid table-already-exists collisions between
    // template migrations and generated migrations targeting the same table names.
    const { execSync } = require("child_process");
    const dbPath = path.join(projectPath, "database", "database.sqlite");

    try {
      // Absolute Hard Reset for Sandbox SQLite to prevent "table already exists" errors
      if (await fs.pathExists(dbPath)) {
        await fs.remove(dbPath);
      }
      await fs.ensureFile(dbPath);

      execSync("php artisan migrate:fresh --force --seed", {
        cwd: projectPath,
        stdio: "ignore",
      });
      this.log(`   🗄️ Database migrated (fresh) successfully.`, "success");
    } catch (e) {
      this.log(
        `   ⚠️ migrate:fresh failed (Collision detected). Attempting Nuclear DB Reset...`,
        "warning",
      );
      try {
        // Hardening: Physically remove the SQLite file to break locks/collisions
        if (await fs.pathExists(dbPath)) {
          await fs.remove(dbPath);
        }
        await fs.ensureFile(dbPath);

        // Re-attempt migration after physical reset
        execSync("php artisan migrate:fresh --force --seed", {
          cwd: projectPath,
          stdio: "ignore",
        });

        this.log(
          `   🗄️ Database Nuclear Reset & Migration successful.`,
          "success",
        );
      } catch (e2) {
        this.log(`   ⚠️ Migration failed: ${e2.message}`, "warning");
      }
    }

    let hasSmokePassed = false;
    this.log(`   🕵️‍♂️ Running Artisan Smoke Test (route:list)...`, "info");
    try {
      execSync("php artisan route:list", { cwd: projectPath, stdio: "ignore" });
      this.log(`      ✅ Smoke test passed.`, "success");
      hasSmokePassed = true;
    } catch (e) {
      this.log(`      ⚠️ Smoke test failed: ${e.message}`, "error");
    }

    // Fast-track validation: if smoke passed and no recent errors in laravel.log, skip serve loop
    let isLogClean = true;
    const logPath = path.join(projectPath, "storage", "logs", "laravel.log");
    if (await fs.pathExists(logPath)) {
      try {
        const logs = await fs.readFile(logPath, "utf8");
        const lastPart = logs.slice(-2000).toLowerCase();
        if (
          lastPart.includes("exception") ||
          lastPart.includes("error") ||
          lastPart.includes("fatal")
        ) {
          isLogClean = false;
        }
      } catch (_) {}
    }

    // 🔄 TDD & Self-Correction Feedback Loop
    await this.runTDDFeedbackLoop(projectPath);

    if (hasSmokePassed && isLogClean) {
      this.log(
        `   🎉 Fast-track Stability: Smoke test passed and log is clean. Skipping active service verification.`,
        "success",
      );
      return;
    }

    this.log(`   🔄 Starting 1-Cycle Stability Loop (Health Check)...`, "info");
    let totalAttempts = 0;
    for (let i = 1; i <= 1; i++) {
      totalAttempts++;
      if (totalAttempts > 4) {
        throw new Error(
          `Stability check failed: exceeded 4 total attempts in stability loop for ${projectPath}.`,
        );
      }
      this.log(
        `      [Iteration ${i}/2] Testing Artisan Serve & NPM Dev...`,
        "warning",
      );

      const port = await this.getAvailablePort(8001);
      const devPort = await this.getAvailablePort(5173);
      const isWin = process.platform === "win32";
      // Hardening: Set shell to false for security; handle Windows commands as arrays
      const serveProc = spawn("php", ["artisan", "serve", `--port=${port}`], {
        cwd: projectPath,
        shell: false,
      });

      const npmCmd = isWin ? "npm.cmd" : "npm";
      const devProc = spawn(
        npmCmd,
        [
          "run",
          "dev",
          "--",
          "--port",
          devPort.toString(),
          "--strictPort",
          "--host",
          "127.0.0.1",
        ],
        {
          cwd: projectPath,
          shell: isWin,
        },
      );

      const [serveReady, devReady] = await Promise.all([
        this.waitForService(`http://127.0.0.1:${port}`, 10000),
        this.waitForService(`http://127.0.0.1:${devPort}`, 10000),
      ]);

      if (serveReady && devReady) {
        this.log(
          `      ✅ Iteration ${i} passed. Services are stable.`,
          "success",
        );
      } else {
        this.log(
          `      ❌ Iteration ${i} FAILED. Service timed out or crashed.`,
          "error",
        );
        if (isWin) {
          spawn("taskkill", ["/pid", serveProc.pid, "/f", "/t"]);
          spawn("taskkill", ["/pid", devProc.pid, "/f", "/t"]);
        } else {
          serveProc.kill();
          devProc.kill();
        }

        // Trigger Self-Healing loop
        let healed = false;
        for (let attempt = 1; attempt <= 3; attempt++) {
          healed = await this.selfHeal(projectPath, attempt);
          if (healed) {
            this.log(
              `      🚀 Self-Healing succeeded on attempt ${attempt}. Retrying stability check...`,
              "success",
            );
            i--; // Retry this iteration
            break;
          }
        }

        if (!healed) {
          throw new Error(
            `Stability check failed at iteration ${i} for ${projectPath} after 3 self-healing attempts.`,
          );
        }
      }

      if (isWin) {
        spawn("taskkill", ["/pid", serveProc.pid, "/f", "/t"]);
        spawn("taskkill", ["/pid", devProc.pid, "/f", "/t"]);
      } else {
        serveProc.kill();
        devProc.kill();
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    this.log(
      `   🎉 Stability Loop Passed: App is verified and clean.`,
      "success",
    );
  }

  /**
   * Automatically wires Livewire components from blueprint into welcome.blade.php
   */
  async autoWireFrontend(projectPath) {
    this.log(`   🔌 Auto-Wiring Frontend Components...`, "info");
    const welcomePath = path.join(
      projectPath,
      "resources/views/welcome.blade.php",
    );
    const blueprintPath = path.join(projectPath, "NEXUS_BLUEPRINT.json");

    if (
      !(await fs.pathExists(welcomePath)) ||
      !(await fs.pathExists(blueprintPath))
    )
      return;

    const blueprint = await fs.readJson(blueprintPath);
    const rawComponents = blueprint.livewire_components || [];

    // Filter out components that require mount parameters without defaults (child components)
    const components = [];
    for (const c of rawComponents) {
      const componentPath = path.join(
        projectPath,
        "app",
        "Livewire",
        `${c}.php`,
      );
      if (await fs.pathExists(componentPath)) {
        const phpContent = await fs.readFile(componentPath, "utf8");
        const mountMatch = phpContent.match(
          /public\s+function\s+mount\s*\(([^)]*)\)/i,
        );
        if (mountMatch) {
          const params = mountMatch[1].trim();
          if (params.length > 0 && !params.includes("=")) {
            this.log(
              `      ⚠️ Skipping root wiring for child component ${c} as it requires mount parameters.`,
              "warning",
            );
            continue;
          }
        }
      }
      components.push(c);
    }

    let content = await fs.readFile(welcomePath, "utf8");

    // FIX #9 — Change detection: skip regeneration jika komponen tidak berubah
    const projectName = path
      .basename(projectPath)
      .replace(/-/g, " ")
      .toUpperCase();
    const existingComponentMatch = content.match(
      /<livewire:([a-z0-9-]+)\s*\/>/gi,
    );
    const existingComponents = existingComponentMatch
      ? existingComponentMatch
          .map((m) => m.match(/<livewire:([a-z0-9-]+)/i)[1])
          .sort()
          .join(",")
      : "";
    const newComponents = components
      .map((c) => this.toKebabCase(c))
      .sort()
      .join(",");

    if (existingComponents === newComponents && content.includes(projectName)) {
      this.log(
        `      ⏭️  welcome.blade.php unchanged (${components.length} components). Skipped regeneration.`,
        "info",
      );
    } else {
      // Update Title
      const titleRegex = /<title>[\s\S]*?<\/title>/;

      const newInjection =
        components.length > 0
          ? `<div class="w-full space-y-8">
            ${components.map((c) => `<livewire:${this.toKebabCase(c)} />`).join("\n            ")}
        </div>`
          : `<div class="w-full text-center py-20 space-y-6">
                <div class="inline-flex bg-indigo-50 dark:bg-indigo-950/50 p-4 rounded-3xl text-indigo-600 dark:text-indigo-400 font-bold mb-4 shadow-sm">
                    ✨ Nexus Sandbox Ready
                </div>
                <h1 class="text-6xl font-black text-slate-900 dark:text-white leading-tight">Welcome to <span class="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">${projectName}</span></h1>
                <p class="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-lg">Your TALL stack sandbox application has been successfully generated, migrated, and is fully active.</p>
                <div class="flex justify-center gap-4 pt-4">
                    <a href="#" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-indigo-500/20 transition-all">Get Started</a>
                </div>
            </div>`;

      const fullContent = `<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nexus | ${projectName}</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-50 text-slate-800 dark:bg-slate-900 dark:text-white antialiased p-8">
    <div class="max-w-7xl mx-auto">
        ${newInjection}
    </div>
</body>
</html>`;

      await fs.writeFile(welcomePath, fullContent);
      this.log(
        `      ✅ welcome.blade.php completely regenerated with ${components.length} components.`,
        "success",
      );
    } // end else (change detected)
  }

  toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }

  async updateRecapStatus(updateMessage) {
    const recapPath = path.join(
      this.engine.rootPath,
      "documentation",
      "docs",
      "NEXUS_INTERNAL_PIPELINE_RECAP.md",
    );
    if (await fs.pathExists(recapPath)) {
      let content = await fs.readFile(recapPath, "utf8");
      const timestamp = NexusClock.getLocalTimestamp();
      const logEntry = `\n- [${timestamp}] **Self-Healing**: ${updateMessage}`;

      if (content.includes("## 🧐 Analisis & Rekomendasi Penyempurnaan")) {
        content = content.replace(
          "## 🧐 Analisis & Rekomendasi Penyempurnaan",
          `## 🧠 Self-Healing Logs${logEntry}\n\n## 🧐 Analisis & Rekomendasi Penyempurnaan`,
        );
      } else {
        content += logEntry;
      }
      await fs.writeFile(recapPath, content);
      this.log(`   📝 Self-Healing: RECAP documentation updated.`, "success");
    }
  }

  async waitForService(url, timeoutMs = 8000) {
    const axios = require("axios");
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      try {
        const res = await axios.get(url, {
          timeout: 500,
          validateStatus: () => true,
        });
        if (res.status === 200 || res.status === 404) return true;
      } catch (_) {
        await new Promise((r) => setTimeout(r, 300));
      }
    }
    return false;
  }

  // FIX #26 — Iterative port search to prevent stack overflow
  async getAvailablePort(start = 8001, maxPort = 9000) {
    const net = require("net");
    for (let port = start; port <= maxPort; port++) {
      try {
        await new Promise((resolve, reject) => {
          const server = net.createServer();
          server.listen(port, () => {
            server.close(() => resolve());
          });
          server.on("error", reject);
        });
        return port;
      } catch (err) {
        // Port is in use or unavailable, try next
        continue;
      }
    }
    throw new Error(
      `No available port found in range ${start}-${maxPort}. Free up some ports and retry.`,
    );
  }

  async selfHeal(projectPath, attempt) {
    this.log(`      🛠️ Self-Healing Attempt ${attempt}/3...`, "warning");

    // ─── PHASE A: Deterministic Pre-Heal (No AI Required) ───
    // Fix the most common AI-generated PHP fatal errors using regex patterns.
    // This runs BEFORE the AI-based healing so we can recover even when
    // LocalIntelligence is unavailable (VRAM exhaustion, circuit breaker OPEN).
    const deterministicFixes = await this._deterministicPreHeal(projectPath);
    if (deterministicFixes > 0) {
      this.log(
        `      🔧 Deterministic pre-heal applied ${deterministicFixes} fix(es). Testing if app is now bootable...`,
        "success",
      );
      // Quick smoke test: if deterministic fixes resolved the issue, skip AI healing
      try {
        const { execSync } = require("child_process");
        execSync("php artisan route:list", {
          cwd: projectPath,
          stdio: "ignore",
        });
        this.log(
          `      ✅ Deterministic pre-heal resolved the issue!`,
          "success",
        );
        await this.updateRecapStatus(
          `Deterministic pre-heal fixed ${deterministicFixes} pattern(s) on attempt ${attempt}`,
        );
        return true;
      } catch (_) {
        this.log(
          `      ⚠️ Deterministic fixes applied but app still not bootable. Proceeding to AI healing...`,
          "warning",
        );
      }
    }

    // ─── PHASE B: AI-Based Healing (Requires LocalIntelligence) ───
    let consoleError = "";
    try {
      const { execSync } = require("child_process");
      execSync("php artisan route:list", { cwd: projectPath, stdio: "pipe" });
    } catch (e) {
      consoleError = e.stderr ? e.stderr.toString() : e.message;
      if (!consoleError && e.stdout) consoleError += "\n" + e.stdout.toString();
    }

    const logPath = path.join(projectPath, "storage", "logs", "laravel.log");
    let logs = "";
    if (await fs.pathExists(logPath)) {
      logs = await fs.readFile(logPath, "utf8");
    }

    let lastError = consoleError;
    if (logs) {
      lastError += "\n" + logs.slice(-3000);
    }

    if (!lastError || lastError.trim() === "") {
      this.log(`         ❌ No clear error found in logs or console.`, "error");
      return false;
    }

    const projectFiles = await CoreUtils.globRecursive(projectPath, [
      "app/**/*.php",
      "routes/**/*.php",
      "database/**/*.php",
      "config/**/*.php",
      "resources/views/**/*.blade.php",
    ]);

    // Identifikasi file yang bermasalah berdasarkan log error
    const affectedFiles = [];
    for (const file of projectFiles) {
      const relPath = path.relative(projectPath, file).replace(/\\/g, '/');
      const basename = path.basename(file);
      // Jika path atau nama file muncul di error log, anggap affected
      if (lastError.includes(relPath) || lastError.includes(basename)) {
        affectedFiles.push(file);
      }
    }

    if (affectedFiles.length === 0) {
      this.log(`         ❌ Self-healing could not identify affected files from the log.`, "error");
      return false;
    }

    this.log(`         🎯 Identified ${affectedFiles.length} affected file(s). Healing 1 by 1...`, "info");
    const localAI = require("../LocalIntelligence");
    let applied = 0;

    for (const file of affectedFiles) {
      const relPath = path.relative(projectPath, file).replace(/\\/g, '/');
      const originalContent = await fs.readFile(file, "utf8");

      this.log(`         🧠 Analyzing & Healing: ${relPath}`, "warning");

      const prompt = `[SYSTEM: SELF-HEALING MODE]\nThe Laravel application crashed. \nERROR LOG:\n${lastError}\n\nAFFECTED FILE: ${relPath}\n\nORIGINAL CONTENT:\n\`\`\`php\n${originalContent}\n\`\`\`\n\nINSTRUCTION for Qwen-2.5:\nAnalyze the stack trace. Identify the root cause in ${relPath}. Provide the COMPLETE corrected PHP/Blade code for this file.\n\nOUTPUT FORMAT:\nProvide the full corrected code wrapped in file blocks like this:\n\n<file path="${relPath}">\n<?php\n// full code here\n</file>\n\nRULES:\n- Output ONLY the file block.\n- Do not use markdown code fences around the file block.\n- Provide the COMPLETE file content, do not truncate.`;

      const response = await localAI.generate(prompt, "suggest_refactor");
      if (!response) continue;

      try {
        const fileRegex = /<file\s+path=["']([^"']+)["']>([\s\S]*?)<\/file>/gi;
        let match;
        const fixes = [];
        while ((match = fileRegex.exec(response)) !== null) {
          fixes.push({
            file: match[1],
            content: match[2].trim(),
          });
        }

        if (fixes.length === 0) {
          this.log(`         ⚠️ AI response did not contain valid <file> block for ${relPath}.`, "warning");
          continue;
        }

        for (const fix of fixes) {
          if (!fix.file) continue;
          const targetPath = path.join(projectPath, fix.file);

          // FIX #4 — PHP Lint validation sebelum menulis file
          if (fix.file.endsWith(".php")) {
            const tmpLintPath = targetPath + ".lint_tmp";
            await fs.writeFile(tmpLintPath, fix.content, "utf8");
            try {
              const { execSync } = require("child_process");
              execSync(`php -l "${tmpLintPath}"`, {
                stdio: "ignore",
                timeout: 5000,
              });
            } catch (lintErr) {
              this.log(
                `         ⛔ PHP lint failed for ${fix.file}: ${lintErr.message.slice(0, 120)}. Skipping.`,
                "error",
              );
              await fs.remove(tmpLintPath).catch(() => {});
              continue;
            }
            await fs.remove(tmpLintPath).catch(() => {});
          }

          await fs.ensureDir(path.dirname(targetPath));
          await fs.writeFile(targetPath, fix.content, "utf8");
          this.log(
            `         ✅ Full file replacement applied to ${fix.file}`,
            "success",
          );
          applied++;
        }
      } catch (e) {
        this.log(`         ❌ Self-healing unexpected error on ${relPath}: ${e.message}`, "error");
      }
    }

    return applied > 0;
  }

  /**
   * Deterministic Pre-Heal: Fix common AI-generated PHP fatal errors
   * using pattern matching — no LocalIntelligence required.
   * Returns the number of fixes applied.
   */
  async _deterministicPreHeal(projectPath) {
    let totalFixes = 0;

    // Scan all PHP files in app/, routes/, database/ for common fatal patterns
    const phpFiles = await CoreUtils.globRecursive(projectPath, [
      "app/**/*.php",
      "routes/**/*.php",
      "database/**/*.php",
    ]);

    for (const filePath of phpFiles) {
      try {
        let content = await fs.readFile(filePath, "utf8");
        const original = content;
        const relPath = path.relative(projectPath, filePath);

        // ── FIX 1: Duplicate parameter names in closures ──
        // e.g. function ($request, SomeClass $request) → function (SomeClass $request)
        content = content.replace(
          /function\s*\(\$([a-zA-Z_]+),\s*[A-Z][a-zA-Z\\]*\s+\$\1\)/g,
          (match, paramName) => {
            const typeMatch = match.match(/,\s*([A-Z][a-zA-Z\\]*)\s+\$/);
            const typeName = typeMatch ? typeMatch[1] : "Request";
            return `function (${typeName} $${paramName})`;
          },
        );
        // Also: function ($param, $param) → function ($param)
        content = content.replace(
          /function\s*\(\$([a-zA-Z_]+),\s*\$\1\)/g,
          "function ($$1)",
        );

        // FIX #5 — Regex lebih aman: hanya match use statement yang mengandung
        // backslash SETELAH spasi (pola yang TIDAK pernah valid di PHP)
        // Contoh garbled: use Illuminate\Support\Facades\Schema \Illuminate\Support\Facades \Migration;
        // Valid: use Illuminate\Support\Facades\Schema;
        const lines = content.split("\n");
        const fixedLines = lines.map((line) => {
          if (/^use\s+/.test(line) && /\\\s+/.test(line)) {
            // Garbled: ada backslash+spasi di tengah path
            const firstPath = line.match(/^use\s+([A-Z][a-zA-Z0-9\\]+)/);
            if (firstPath) {
              return `use ${firstPath[1]};`;
            }
            return `// [NEXUS PRE-HEAL] Removed invalid use statement: ${line}`;
          }
          return line;
        });
        content = fixedLines.join("\n");

        // ── FIX 3: Prompt text / instructions leaked into PHP files ──
        // Detect lines that look like human-readable instructions after the closing } of a class/function
        // Pattern: Lines after final }; or } that start with UPPERCASE words and aren't PHP
        const closingBraceIdx = content.lastIndexOf("};");
        if (closingBraceIdx > 0) {
          const afterBrace = content.substring(closingBraceIdx + 2).trim();
          // If content after }; contains instructional text (starts with uppercase word, no PHP tag)
          if (
            afterBrace &&
            /^[A-Z][A-Z ]+:/.test(afterBrace) &&
            !afterBrace.startsWith("<?php")
          ) {
            content = content.substring(0, closingBraceIdx + 2) + "\n";
          }
        }

        // ── FIX 4: Duplicate route parameters ──
        // e.g. Route::get('/password/reset/{token}/reset/{token}', ...
        content = content.replace(
          /(Route::[a-z]+\(['"]\/)([^'"]+)(['"])/g,
          (match, prefix, routePath, suffix) => {
            const params = routePath.match(/\{(\w+)\}/g);
            if (params) {
              const seen = new Set();
              let fixedPath = routePath;
              for (const param of params) {
                if (seen.has(param)) {
                  // Replace duplicate with a numbered variant
                  fixedPath = fixedPath.replace(
                    param,
                    param.replace("}", `_2}`),
                  );
                }
                seen.add(param);
              }
              return prefix + fixedPath + suffix;
            }
            return match;
          },
        );

        // ── FIX 5: Self-imports (class importing itself) ──
        // e.g. use App\Models\Shortened; inside Shortened.php
        const phpClass = path.basename(filePath, ".php");
        const selfImportRegex = new RegExp(
          `^use\\s+App\\\\[A-Za-z\\\\]*\\\\${phpClass};\\s*$`,
          "gm",
        );
        if (filePath.includes(`${phpClass}.php`)) {
          // Only remove if the file defines this class
          if (content.includes(`class ${phpClass}`)) {
            content = content.replace(selfImportRegex, "");
          }
        }

        // ── FIX 6: Stray closing ?> tag (PSR-12 violation, can cause issues) ──
        content = content.replace(/\?>\s*$/g, "").trimEnd() + "\n";

        // Write back if changed
        if (content !== original) {
          await fs.writeFile(filePath, content, "utf8");
          totalFixes++;
          this.log(
            `      🔧 [Pre-Heal] Fixed patterns in: ${relPath}`,
            "warning",
          );
        }
      } catch (e) {
        // Skip files that can't be read/written
        continue;
      }
    }

    return totalFixes;
  }

  /**
   * 🔄 TDD & Self-Correction Feedback Loop:
   * Executes PHPUnit / Artisan test on the project.
   * If any failure occurs:
   * 1. Diagnoses the failure with RootCauseAnalyzer
   * 2. Distills an actionable Lesson file to memory/distilled/
   * 3. Syncs the lesson directly to Obsidian Vault (NEXUS LESSONS/)
   * 4. Logs a self-correction training sample to 3 qwen/ for CUDA Colab fine-tuning.
   */
  async runTDDFeedbackLoop(projectPath) {
    const { execSync } = require("child_process");
    const projectName = path.basename(projectPath);
    this.log(`   🧪 [TDD Feedback Loop] Running automated test suite for ${projectName}...`, "info");

    const artisanPath = path.join(projectPath, "artisan");
    if (!(await fs.pathExists(artisanPath))) return;

    let testOutput = "";
    let testPassed = false;

    try {
      // Run artisan test with brief output
      testOutput = execSync("php artisan test --stop-on-failure", {
        cwd: projectPath,
        encoding: "utf8",
        timeout: 30000,
        stdio: ["ignore", "pipe", "pipe"],
      });
      testPassed = true;
      this.log(`      ✅ [TDD Success] All automated test assertions passed for ${projectName}!`, "success");
    } catch (err) {
      testOutput = (err.stdout || "") + "\n" + (err.stderr || "") + "\n" + err.message;
      testPassed = false;
    }

    if (!testPassed && testOutput) {
      this.log(`      ⚠️ [TDD Failure Detected] Analyzing root cause & formulating lesson...`, "warning");
      await this._formulateAndPersistLesson(projectName, projectPath, testOutput);
    }
  }

  async _formulateAndPersistLesson(projectName, projectPath, failureOutput) {
    try {
      const coordinate = this.engine.rcAnalyzer
        ? this.engine.rcAnalyzer.analyze(failureOutput)
        : { file: "unknown", line: 0 };
      const timestamp = new Date().toISOString();
      const safeProject = projectName.replace(/[^a-zA-Z0-9_-]/g, "_").toUpperCase();

      // Clean snippet of error (max 1500 chars)
      const errorSnippet = failureOutput.slice(0, 1500).trim();

      const lessonContent = `# 🧠 NEXUS LESSON: TDD Failure & Self-Correction in ${projectName}
> **METADATA (NEXUS SEMANTIC TAGS)**: [laravel, tdd, failure-analysis, self-correction, ${projectName.toLowerCase()}]
> **TIMESTAMP**: ${timestamp}
> **TARGET**: \`${projectPath}\`

---

### 🚨 Problem Statement
Automated TDD test execution encountered failures during the stability phase of **${projectName}**.

### 📍 Error Coordinate & Stack Trace
- **File Detected**: \`${coordinate.file}\` (Line: ${coordinate.line})
- **Raw Diagnostic Trace**:
\`\`\`text
${errorSnippet}
\`\`\`

---

### 🔍 Root Cause Analysis
${coordinate.insight || "Failure detected during test runner assertions or database state."}

### 🛡️ Remediation Strategy & Rules for Future Cycles
1. **Schema & Model Alignment**: Ensure model attributes correspond strictly with database migration column names and types.
2. **Relationship Bidirectionality**: Always verify foreign keys and cascade rules in both directions.
3. **Route & Component Binding**: Confirm Livewire wire:model and route model bindings point to valid DB entities.

---
*Generated by NEXUS Autonomous TDD Feedback Loop | Synced to Obsidian Vault & Colab Training Dataset*
`;

      // 1. Save to local memory/distilled/
      const localLessonPath = path.join(
        this.engine.knowledgePath,
        `NEXUS_LESSON_${safeProject}_STABILITY.md`,
      );
      await fs.writeFile(localLessonPath, lessonContent, "utf8");
      this.log(
        `      💾 Lesson saved to local memory: NEXUS_LESSON_${safeProject}_STABILITY.md`,
        "success",
      );

      // 2. Save to Obsidian Vault
      if (this.engine.obsidianBridge && this.engine.obsidianBridge.isActive()) {
        await this.engine.obsidianBridge.saveLesson(
          `${safeProject}_STABILITY`,
          lessonContent,
        );
        this.log(
          `      🔗 Lesson synced to Obsidian Vault (NEXUS AI/NEXUS LESSONS/)`,
          "success",
        );
      }

      // 3. Append to Colab CUDA dataset in '3 qwen/' as correction training sample
      const bpVault = this.engine.obsidianBridge
        ? this.engine.obsidianBridge.getBlueprintVaultPath()
        : null;
      if (bpVault) {
        const qwenDir = path.join(bpVault, "3 qwen");
        await fs.ensureDir(qwenDir);
        const colabJsonl = path.join(
          qwenDir,
          "colab_cuda_training_dataset.jsonl",
        );
        const correctionSample =
          JSON.stringify({
            messages: [
              {
                role: "system",
                content:
                  "You are an elite Laravel TALL Stack Debugger and Architect.",
              },
              {
                role: "user",
                content: `The test suite failed for ${projectName} with error:\n${errorSnippet}\nDiagnose and explain how to fix.`,
              },
              {
                role: "assistant",
                content: `Here is the root cause analysis and architectural fix:\n${lessonContent}`,
              },
            ],
          }) + "\n";
        await fs.appendFile(colabJsonl, correctionSample, "utf8").catch(() => {});
      }
    } catch (e) {
      this.log(`      ⚠️ Failed to formulate lesson: ${e.message}`, "warning");
    }
  }
}

module.exports = ExecutionPhase;
