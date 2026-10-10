const fs = require("fs-extra");
const path = require("path");
const { AuditReport } = require("../Contract");
const NexusClock = require("../NexusClock");
const BasePhase = require("./BasePhase");
const CoreUtils = require("./CoreUtils");

class AuditPhase extends BasePhase {
  async run(options = {}) {
    const targetPath = options.targetPath || this.engine.rootPath;
    const mode = options.mode || "learning";
    const allowSensitive = options.allowSensitive || false;

    this.log(`🔍 Phase 1: Audit Initiation [Mode: ${mode}]...`, "info");
    const auditID = `AUDIT-${Date.now()}`;
    const consolidatedFindings = [];

    // Core Structure Scan (Orchestration & Memory Paths)
    const pathMapping = [
      { name: "knowledge", path: this.engine.knowledgePath },
      { name: "records", path: this.engine.recordsPath },
      { name: "planning", path: this.engine.planningPath },
      { name: "summary", path: this.engine.summaryPath },
    ];

    for (const item of pathMapping) {
      if (item.path && !(await fs.pathExists(item.path))) {
        consolidatedFindings.push({
          severity: "WARNING",
          message: `Nexus standard folder [${item.name}/] is missing or path is invalid.`,
          file: "root",
        });
      }
    }

    const files = await fs.readdir(targetPath);
    if (!files.includes("README.md"))
      consolidatedFindings.push({
        severity: "CRITICAL",
        message: "README.md missing",
        file: "root",
      });
    if (allowSensitive && files.includes(".env"))
      consolidatedFindings.push({
        severity: "SECURITY",
        message: ".env detected",
        file: ".env",
      });
    if (!files.some((f) => f.toLowerCase().includes("license")))
      consolidatedFindings.push({
        severity: "WARNING",
        message: "LICENSE file missing (Standard compliance)",
        file: "root",
      });

    await fs.ensureDir(this.engine.auditPath);

    if (mode === "learning") {
      // Dynamic Orchestrated Scanner Plugin Loader
      const scannerDir = path.join(__dirname, "..", "..", "tools", "scanners");
      let specialists = [];

      if (await fs.pathExists(scannerDir)) {
        const scannerFiles = await fs.readdir(scannerDir);
        for (const file of scannerFiles) {
          if (file.endsWith(".js")) {
            const id = path.basename(file, ".js");
            const focus =
              id
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ") + " Verification";
            specialists.push({ id, focus });
          }
        }
      }

      if (specialists.length === 0) {
        specialists.push(
          { id: "cyber-security", focus: "Keamanan & Autentikasi" },
          { id: "ux-engineer", focus: "User Experience & Estetika" },
          { id: "seo-performance-specialist", focus: "Performa & SEO" },
          { id: "database-architect", focus: "Arsitektur Data" },
          { id: "vcs-architect", focus: "Version Control & Repository Health" },
          {
            id: "documentation-architect",
            focus: "Dokumentasi & Standar Kode",
          },
        );
      }

      // 6️⃣ NEXUS_EXCLUDE_SPECIALISTS — skip non-essential specialists for sandbox speed
      const rawExclude = (process.env.NEXUS_EXCLUDE_SPECIALISTS || "").trim();
      if (rawExclude) {
        const excludeSet = new Set(
          rawExclude
            .split(",")
            .map((s) => s.trim().toLowerCase())
            .filter(Boolean),
        );
        const before = specialists.length;
        specialists = specialists.filter(
          (s) => !excludeSet.has(s.id.toLowerCase()),
        );
        if (specialists.length !== before) {
          this.log(
            `⏭️ [AuditPhase] Skipping ${before - specialists.length} scanner(s) via NEXUS_EXCLUDE_SPECIALISTS: ${[...excludeSet].join(", ")}`,
            "warning",
          );
        }
        if (specialists.length === 0) {
          this.log(
            "⚠️ All scanners excluded — audit will run only deterministic machine guards.",
            "warning",
          );
        }
      }

      this.log("🛡️ Activating Orchestrated Parallel Scanners...", "info");

      // FIX #14 — Batasi concurrency ke 2 agar tidak OOM pada 8GB RAM
      const ParallelRunner = require("../ParallelRunner");

      const auditResults = await ParallelRunner.run(
        specialists,
        async (spec) => {
          try {
            const scannerPath = path.join(
              __dirname,
              "..",
              "..",
              "tools",
              "scanners",
              `${spec.id}.js`,
            );
            let specFindings = [];

            const scanStart = Date.now();
            if (await fs.pathExists(scannerPath)) {
              specFindings = await this.engine.orchestrator.executeTask(
                spec.id,
                scannerPath,
                targetPath,
              );
              this.log(
                `   🔍 [${spec.id}] Deep Scan: ${specFindings.length} findings found.`,
                "success",
              );
            }
            const scanDuration = Date.now() - scanStart;
            this.engine.metrics[spec.id] = {
              duration_ms: scanDuration,
              findings: specFindings.length,
            };
            await this.engine.logger.log(
              "orchestration",
              "INFO",
              "Orchestrator",
              auditID,
              "SCANNER_EXECUTED",
              `Completed ${spec.id} in ${scanDuration}ms`,
              scanDuration,
              {},
              this.engine.currentCorrelationId,
            );

            if (specFindings.length === 0) {
              specFindings.push({
                severity: "INFO",
                message: `Scan completed by orchestrator for ${spec.focus}.`,
                file: "project",
              });
            }

            const specReport = new AuditReport(
              `${auditID}-${spec.id.toUpperCase()}`,
              targetPath,
              specFindings,
              { mode, task: spec.id },
            );
            await fs.writeJson(
              path.join(
                this.engine.auditPath,
                `report_${spec.id}_${auditID}.json`,
              ),
              specReport.toJSON(),
              { spaces: 2 },
            );

            const mdSpec = this.generateMarkdownReport(
              spec,
              auditID,
              specFindings,
            );
            await fs.writeFile(
              path.join(
                this.engine.auditPath,
                `report_${spec.id}_${auditID}.md`,
              ),
              mdSpec,
              "utf8",
            );

            return specFindings.map((f) => ({
              ...f,
              message: `[${spec.id}] ${f.message}`,
            }));
          } catch (e) {
            this.log(`⚠️ Scanner ${spec.id} skipped: ${e.message}`, "error");
            return [];
          }
        },
        2, // FIX #14 — concurrency limit: maksimal 2 scanner paralel (RAM 8GB)
      );

      auditResults.forEach((result) => {
        if (result && Array.isArray(result)) {
          consolidatedFindings.push(...result);
        }
      });
    }

    // Autonomous Machine Audit
    this.log("🤖 Activating Autonomous Machine Audit...", "warning");

    const withTimeout = (promise, ms) =>
      Promise.race([
        promise,
        new Promise((resolve) => setTimeout(() => resolve([]), ms)), // default empty finding on timeout
      ]);

    const schemaFindings = await withTimeout(
      this.engine.schemaGuard.validateModels(),
      30000,
    );
    if (schemaFindings.length > 0) {
      consolidatedFindings.push(
        ...schemaFindings.map((f) => ({
          ...f,
          message: `[SchemaGuard] ${f.message}`,
        })),
      );
    }

    const queryFindings = await withTimeout(
      this.engine.queryOptimizer.scanMigrations(),
      30000,
    );
    if (queryFindings.length > 0) {
      consolidatedFindings.push(
        ...queryFindings.map((f) => ({
          ...f,
          message: `[QueryOptimizer] ${f.message}`,
        })),
      );
    }

    const viewFiles = await CoreUtils.globRecursive(
      this.engine.rootPath,
      "resources/views/**/*.blade.php",
    );
    for (const file of viewFiles.slice(0, 5)) {
      const a11yFindings = await withTimeout(
        this.engine.a11yScanner.scan(path.relative(this.engine.rootPath, file)),
        15000,
      );
      if (a11yFindings.length > 0) {
        consolidatedFindings.push(
          ...a11yFindings.map((f) => ({
            ...f,
            message: `[A11yScanner] ${f.message}`,
          })),
        );
      }
    }

    const report = new AuditReport(auditID, targetPath, consolidatedFindings, {
      mode,
      allowSensitive,
    });
    this.engine.currentAudit = report;

    const baseName = `audit_SUMMARY_${auditID}`;
    await fs.writeJson(
      path.join(this.engine.auditPath, `${baseName}.json`),
      report.toJSON(),
      { spaces: 2 },
    );

    const mdContent = `
# Audit Summary: ${auditID}
**Mode**: ${mode}
**Timestamp**: ${NexusClock.getLocalTimestamp()}

## 📊 Consolidated Findings
${consolidatedFindings.map((f) => `- [${f.severity}] ${f.message} (\`${f.file}\`)`).join("\n")}

---
*Generated by Nexus Autonomous Governance Engine*
`;
    await fs.writeFile(
      path.join(this.engine.auditPath, `${baseName}.md`),
      mdContent,
      "utf8",
    );

    this.log(`✅ Audit Complete: ${auditID}.`, "success");
    return report;
  }

  generateMarkdownReport(spec, auditID, specFindings) {
    return `
# 🛡️ Orchestration Scan: ${spec.id.toUpperCase()}
**Focus**: ${spec.focus}
**Task ID**: ${spec.id}

---

## 🔍 Findings & Recommendations
${specFindings
  .map(
    (f) => `
### [${f.severity}] ${f.message}
- **Apa**: ${f.message}
- **Di mana**: \`${f.file}\`
- **Mengapa**: ${f.rationale || "N/A"}
- **Bagaimana**: ${f.recommendation || "N/A"}
`,
  )
  .join("\n")}

---
*Generated by Nexus Orchestrator*
`;
  }
}

module.exports = AuditPhase;
