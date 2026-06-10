// tests/TDD/setup_dynamic_section.js
// NEXUS DYNAMIC SANDBOX PIPELINE
// Handles Sections 4 through 10 dynamically.
// v3.0: Menggunakan SandboxProjectSetup shared module + Laravel murni dari composer

const fs = require("fs-extra");
const path = require("path");
const EvolutionPiper = require("../../agent/core/EvolutionPiper");
const SandboxProjectSetup = require("./SandboxProjectSetup");
const ResourceMonitor = require("../../agent/core/ResourceMonitor");

const SANDBOXES_DIR = path.join(__dirname, "..", "sandboxes");
const ROOT_PATH = path.join(__dirname, "..", "..");

const projectsData = require("./100-projects-data.js");

const sectionArg = process.argv[2];
if (!sectionArg || !projectsData[sectionArg]) {
  console.error(`❌ Harap berikan argumen section yang valid (4-10).`);
  process.exit(1);
}

const sectionConfig = projectsData[sectionArg];

async function runSection() {
  console.log("\n╔══════════════════════════════════════════════════════╗");
  console.log(`║  🚀 NEXUS — ${sectionConfig.title} `);
  console.log(
    `║  ${sectionConfig.projects.length} Projects | Fresh Laravel | Autonomous Pipeline`,
  );
  console.log("╚══════════════════════════════════════════════════════╝\n");

  const setup = new SandboxProjectSetup(ROOT_PATH, SANDBOXES_DIR, {
    sectionLabel: `SECTION ${sectionArg}`,
    mode: sectionConfig.mode,
  });

  // Pastikan template Laravel murni sudah ada
  const templateReady = await setup.ensureTemplate();
  if (!templateReady) {
    console.error(
      "❌ Template Laravel murni tidak tersedia. Tidak bisa melanjutkan.",
    );
    process.exit(1);
  }

  const piper = new EvolutionPiper(ROOT_PATH);
  const resourceMonitor = new ResourceMonitor(); // FIX #7 — Active stress monitoring
  const total = sectionConfig.projects.length;
  let success = 0,
    failed = 0;
  const startTime = Date.now();

  for (let i = 0; i < total; i++) {
    const projectName = sectionConfig.projects[i];
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const eta = i > 0 ? Math.round((elapsed / i) * (total - i)) : "?";
    const pct = Math.round(((i + 1) / total) * 100);
    const bar =
      "█".repeat(Math.floor(pct / 5)) + "░".repeat(20 - Math.floor(pct / 5));

    // FIX #7 — Resource stress check sebelum setiap project
    let stressDelay = 0;
    try {
      const stress = await resourceMonitor.checkStress();
      if (stress.recommendation === "PAUSE") {
        console.log(
          `\n⛔ [PAUSE] RAM=${stress.metrics.mem_usage_pct}% CPU=${stress.metrics.cpu_usage_pct}% — Menunggu 30 detik...`,
        );
        await new Promise((r) => setTimeout(r, 30000));
      } else if (stress.recommendation === "THROTTLE") {
        stressDelay = 10; // Extra cooldown
        console.log(
          `\n⚠️  [THROTTLE] RAM=${stress.metrics.mem_usage_pct}% CPU=${stress.metrics.cpu_usage_pct}% — Extra cooldown ${stressDelay}s`,
        );
      }
    } catch (_) {
      /* Non-fatal: continue if monitoring fails */
    }

    console.log(
      `\n\x1b[35m[${bar}] ${pct}% | ✅ ${success} ❌ ${failed} | Project ${i + 1}/${total}: ${projectName} | ETA: ${eta}s\x1b[0m`,
    );

    try {
      await setup.setupProject(
        { name: projectName, tags: sectionConfig.tags },
        piper,
        {
          mode: sectionConfig.mode,
          sectionDescription: sectionConfig.title,
        },
      );
      success++;
    } catch (err) {
      console.error(
        `\n\x1b[31m❌ GAGAL [${projectName}]: ${err.message}\x1b[0m`,
      );
      failed++;
      // Log to error file
      const logFile = path.join(ROOT_PATH, "logs", "sandbox-errors.log");
      await fs.ensureDir(path.dirname(logFile));
      await fs.appendFile(
        logFile,
        `[${new Date().toISOString()}] [Section ${sectionArg}] [${projectName}] ${err.message}\n`,
      );
    }

    // FIX #7 — Extra stress delay jika THROTTLE
    if (stressDelay > 0) {
      await new Promise((r) => setTimeout(r, stressDelay * 1000));
    }
  }

  const totalElapsed = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n${"=".repeat(56)}`);
  console.log(
    `📊 SECTION ${sectionArg} SELESAI: ${success} berhasil, ${failed} gagal`,
  );
  console.log(`⏱  Total waktu: ${totalElapsed}s`);
  console.log(`${"=".repeat(56)}\n`);

  if (failed > 0) process.exit(1);
  process.exit(0);
}

runSection().catch((err) => {
  console.error(`❌ Fatal error di setup_dynamic_section.js:`, err);
  process.exit(1);
});
