// tests/TDD/setup_section2.js
// Section 2 — Dashboard & Admin Panel (10 projects)
// Pipeline: Fresh Laravel Install → Configure → Blueprint → Migrate → Nexus Cycle → Harvest
// v3.0: Menggunakan SandboxProjectSetup shared module + Laravel murni dari composer

const fs = require("fs-extra");
const path = require("path");
const EvolutionPiper = require("../../agent/core/EvolutionPiper");
const SandboxProjectSetup = require("./SandboxProjectSetup");
const ResourceMonitor = require("../../agent/core/ResourceMonitor"); // FIX #28

const SANDBOXES_DIR = path.join(__dirname, "..", "sandboxes");
const ROOT_PATH = path.join(__dirname, "..", "..");

const SECTION_2_PROJECTS = [
  {
    name: "admin-dashboard-analytics",
    tags: ["dashboard", "analytics", "admin", "phase-2"],
  },
  {
    name: "user-management-system",
    tags: ["crud", "auth", "admin", "phase-2"],
  },
  {
    name: "role-permission-manager",
    tags: ["auth", "rbac", "admin", "phase-2"],
  },
  {
    name: "audit-log-dashboard",
    tags: ["dashboard", "logs", "security", "phase-2"],
  },
  {
    name: "system-monitoring-dashboard",
    tags: ["dashboard", "monitoring", "phase-2"],
  },
  {
    name: "inventory-dashboard",
    tags: ["crud", "dashboard", "inventory", "phase-2"],
  },
  {
    name: "multi-tenant-admin-panel",
    tags: ["admin", "multi-tenant", "saas", "phase-2"],
  },
  {
    name: "subscription-management-dashboard",
    tags: ["saas", "billing", "dashboard", "phase-2"],
  },
  { name: "crm-sederhana", tags: ["crm", "crud", "business", "phase-2"] },
  { name: "erp-mini-system", tags: ["erp", "crud", "business", "phase-2"] },
];

async function setupSection2() {
  console.log("\n╔══════════════════════════════════════════════════════╗");
  console.log("║  🏗️  NEXUS — Section 2: Dashboard & Admin Panel      ║");
  console.log("║  10 Projects | Fresh Laravel | Autonomous Pipeline    ║");
  console.log("╚══════════════════════════════════════════════════════╝\n");

  const setup = new SandboxProjectSetup(ROOT_PATH, SANDBOXES_DIR, {
    sectionLabel: "SECTION 2",
    mode: "efficient",
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
  const total = SECTION_2_PROJECTS.length; // FIX #28

  for (let i = 0; i < total; i++) {
    // FIX #28 — Use index for progress bar
    const project = SECTION_2_PROJECTS[i];

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
        sectionDescription: "Section 2 (Dashboard & Admin Panel)",
      });
      success++;
    } catch (err) {
      console.error(`\n❌ GAGAL [${project.name}]: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n${"=".repeat(56)}`);
  console.log(`📊 SECTION 2 SELESAI: ${success} berhasil, ${failed} gagal`);
  console.log(`${"=".repeat(56)}\n`);

  if (failed > 0) process.exit(1);
  process.exit(0);
}

setupSection2().catch((err) => {
  console.error("❌ Fatal error di setup_section2.js:", err);
  process.exit(1);
});
