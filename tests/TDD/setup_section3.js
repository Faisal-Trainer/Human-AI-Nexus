// tests/TDD/setup_section3.js
// Section 3 — Security & Realtime (11 projects)
// Pipeline: Fresh Laravel Install → Configure → Blueprint → Migrate → Nexus Cycle → Harvest
// v3.0: Menggunakan SandboxProjectSetup shared module + Laravel murni dari composer

const fs = require("fs-extra");
const path = require("path");
const EvolutionPiper = require("../../agent/core/EvolutionPiper");
const SandboxProjectSetup = require("./SandboxProjectSetup");
const ResourceMonitor = require("../../agent/core/ResourceMonitor"); // FIX #28

const SANDBOXES_DIR = path.join(__dirname, "..", "sandboxes");
const ROOT_PATH = path.join(__dirname, "..", "..");

const SECTION_3_PROJECTS = [
  {
    name: "two-factor-auth-system",
    tags: ["security", "auth", "2fa", "phase-3"],
  },
  {
    name: "magic-link-authentication",
    tags: ["security", "auth", "magic-link", "phase-3"],
  },
  {
    name: "oauth-login-integration",
    tags: ["security", "auth", "oauth", "phase-3"],
  },
  {
    name: "login-anomaly-detector",
    tags: ["security", "monitoring", "ai", "phase-3"],
  },
  {
    name: "session-management-dashboard",
    tags: ["security", "session", "dashboard", "phase-3"],
  },
  {
    name: "device-activity-tracker",
    tags: ["security", "tracking", "audit", "phase-3"],
  },
  {
    name: "email-verification-workflow",
    tags: ["security", "auth", "email", "phase-3"],
  },
  {
    name: "password-reset-flow-custom",
    tags: ["security", "auth", "password", "phase-3"],
  },
  {
    name: "secure-file-vault",
    tags: ["security", "storage", "encrypt", "phase-3"],
  },
  { name: "api-token-manager", tags: ["security", "api", "token", "phase-3"] },
  { name: "demo-sandbox", tags: ["demo", "test", "general", "phase-3"] },
];

async function setupSection3() {
  console.log("\n╔══════════════════════════════════════════════════════╗");
  console.log("║  🔒 NEXUS — Section 3: Security & Realtime           ║");
  console.log("║  11 Projects | Fresh Laravel | Autonomous Pipeline    ║");
  console.log("╚══════════════════════════════════════════════════════╝\n");

  const setup = new SandboxProjectSetup(ROOT_PATH, SANDBOXES_DIR, {
    sectionLabel: "SECTION 3",
    mode: "learning",
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
  const resourceMonitor = new ResourceMonitor(); // FIX #28
  let success = 0,
    failed = 0;
  const startTime = Date.now(); // FIX #28
  const total = SECTION_3_PROJECTS.length; // FIX #28

  for (let i = 0; i < total; i++) {
    // FIX #28 — Use index for progress bar
    const project = SECTION_3_PROJECTS[i];

    // FIX #28 — Progress bar + ResourceMonitor
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const pct = Math.round(((i + 1) / total) * 100);
    const bar =
      "█".repeat(Math.floor(pct / 5)) + "░".repeat(20 - Math.floor(pct / 5));

    try {
      const stress = await resourceMonitor.checkStress();
      if (stress.recommendation === "PAUSE") {
        console.log(
          `\n⛔ [PAUSE] RAM=${stress.metrics.mem_usage_pct}% — Menunggu 30s...`,
        );
        await new Promise((r) => setTimeout(r, 30000));
      }
    } catch (_) {}

    console.log(
      `\n\x1b[35m[${bar}] ${pct}% | ✅ ${success} ❌ ${failed} | Project ${i + 1}/${total}: ${project.name}\x1b[0m`,
    );

    try {
      await setup.setupProject(project, piper, {
        sectionDescription: "Section 3 (Security & Realtime)",
      });
      success++;
    } catch (err) {
      console.error(`\n❌ GAGAL [${project.name}]: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n${"=".repeat(56)}`);
  console.log(`📊 SECTION 3 SELESAI: ${success} berhasil, ${failed} gagal`);
  console.log(`${"=".repeat(56)}\n`);

  if (failed > 0) process.exit(1);
  process.exit(0);
}

setupSection3().catch((err) => {
  console.error("❌ Fatal error di setup_section3.js:", err);
  process.exit(1);
});
