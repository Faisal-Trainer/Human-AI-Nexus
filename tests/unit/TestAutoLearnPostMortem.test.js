// tests/unit/TestAutoLearnPostMortem.test.js
// Integration test verifying the Autonomous Continuous Learning Loop & Write-Back to Obsidian Vault (NEXUS Update/Lessons)

const path = require("path");
const fs = require("fs-extra");
const ExecutionPhase = require("../../agent/core/phases/ExecutionPhase");
const ObsidianBridge = require("../../agent/core/ObsidianBridge");
const SemanticEngine = require("../../agent/core/SemanticEngine");
const GraphEngine = require("../../agent/core/GraphEngine");

async function runAutoLearnTests() {
  console.log("🧪 Running Autonomous Continuous Learning Loop (Write-Back) Tests...\n");

  const tempRoot = path.join(__dirname, "temp_autolearn_test");
  const tempMemory = path.join(tempRoot, "memory", "distilled");
  await fs.ensureDir(tempMemory);

  try {
    // 1. Setup Mock Engine with ObsidianBridge & SemanticEngine
    console.log("🔹 Step 1: Initializing Engine components...");
    const bridge = new ObsidianBridge(path.resolve(__dirname, "..", ".."));
    const semanticEngine = new SemanticEngine(tempMemory);
    semanticEngine.graphEngine = new GraphEngine();
    semanticEngine.isBuilt = true;

    const mockEngine = {
      rootPath: tempRoot,
      knowledgePath: tempMemory,
      obsidianBridge: bridge,
      semanticEngine: semanticEngine,
      log: (msg, type) => console.log(`   [Engine] ${msg}`),
      rcAnalyzer: {
        analyze: (err) => ({
          file: "app/Models/Order.php",
          line: 42,
          insight: "Call to undefined relationship 'customer' on Order model",
        }),
      },
    };

    const executionPhase = new ExecutionPhase(mockEngine);

    // 2. Trigger Autonomous Post-Mortem Lesson Formulation
    console.log("🔹 Step 2: Triggering _formulateAndPersistLesson for simulated error...");
    const projectName = "ECommerceSandbox";
    const projectPath = path.join(tempRoot, "sandbox", projectName);
    const mockFailureOutput = `
   FAIL  Tests\\Feature\\OrderProcessingTest
  ⨯ order can be processed with customer relation
  ---
  BadMethodCallException: Call to undefined relationship [customer] on model [App\\Models\\Order].
  at app/Models/Order.php:42
    `;

    await executionPhase._formulateAndPersistLesson(
      projectName,
      projectPath,
      mockFailureOutput,
      { category: "RELATION_COLLISION", targetFile: "app/Models/Order.php" }
    );

    // 3. Verify Local Memory Persistence
    console.log("🔹 Step 3: Verifying local memory persistence...");
    const expectedLocalLesson = path.join(
      tempMemory,
      "NEXUS_LESSON_ECOMMERCESANDBOX_RELATION_COLLISION.md"
    );
    const localExists = await fs.pathExists(expectedLocalLesson);
    if (!localExists) {
      throw new Error(`Local lesson file not found at: ${expectedLocalLesson}`);
    }
    const localContent = await fs.readFile(expectedLocalLesson, "utf8");
    if (!localContent.includes("Post-Mortem Lesson") && !localContent.includes("ECOMMERCESANDBOX")) {
      throw new Error("Local lesson content header mismatch");
    }
    if (!localContent.includes("[[")) {
      throw new Error("Local lesson missing wikilinks");
    }
    console.log("  ✅ Local lesson file created with valid markdown & wikilinks.");

    // 4. Verify Obsidian Vault Write-Back Target
    console.log("🔹 Step 4: Verifying Obsidian Vault Write-Back (NEXUS Update/Lessons/)...");
    if (bridge.isActive()) {
      const vaultUpdatePath = bridge.getUpdateVaultPath();
      const expectedVaultFile = path.join(
        vaultUpdatePath,
        "Lessons",
        "NEXUS_LESSON_ECOMMERCESANDBOX_RELATION_COLLISION.md"
      );
      const vaultExists = await fs.pathExists(expectedVaultFile);
      if (!vaultExists) {
        throw new Error(`Vault lesson file not found at: ${expectedVaultFile}`);
      }
      const vaultContent = await fs.readFile(expectedVaultFile, "utf8");
      if (!vaultContent.includes("BadMethodCallException")) {
        throw new Error("Vault lesson missing error diagnostic trace");
      }
      console.log(`  ✅ Successfully verified file in Obsidian Vault:`);
      console.log(`     📁 ${expectedVaultFile}`);

      // Clean up test file in vault
      await fs.remove(expectedVaultFile).catch(() => {});
    } else {
      console.log("  ⚠️ ObsidianBridge is inactive; skipped physical vault check.");
    }

    console.log("\n🎉 CONTINUOUS LEARNING LOOP TEST PASSED SUCCESSFULLY!\n");
  } finally {
    await fs.remove(tempRoot).catch(() => {});
  }
}

runAutoLearnTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Test failed:", err);
    process.exit(1);
  });
