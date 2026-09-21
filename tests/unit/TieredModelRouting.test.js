const assert = require("assert");
const li = require("../../agent/core/LocalIntelligence");

async function testTieredModelRouting() {
  console.log("🧪 Testing Tiered Model Routing (Pilar 3)...");

  // 1. Test Complexity Scoring
  console.log("  Checking Task Complexity Scoring...");
  const scoreMigration = li.scoreTaskComplexity("validate_migration_schema", "simple check");
  assert.strictEqual(scoreMigration, 0, "validate_migration_schema should route to Tier 0");

  const scoreCodeReview = li.scoreTaskComplexity("review_code_quality", "small function");
  assert.strictEqual(scoreCodeReview, 1, "review_code_quality should route to Tier 1");

  const scoreLivewire = li.scoreTaskComplexity("build_livewire_component", "Create dynamic datatable");
  assert.strictEqual(scoreLivewire, 1, "build_livewire_component should route to Tier 1 directly");

  const scoreApp = li.scoreTaskComplexity("build_application", "Massive multi-tenant architecture", { tier: 3 });
  assert.strictEqual(scoreApp, 1, "Tier 3 request should fallback directly to Tier 1");
  console.log("  ✅ Complexity Scoring correctly routes tasks directly to Tier 0 or Tier 1");

  // 2. Test Tier 0: Zero-LLM Instant Heuristic for migration schema
  console.log("  Testing Tier 0 Instant Heuristic...");
  const badMigrationCode = `
    Schema::create('orders', function (Blueprint $table) {
      $table->integer('user_id');
      $table->decimal('total', 10, 2);
    });
  `;
  const heuristicResult = await li.generate(badMigrationCode, "validate_migration_schema", null, { tier: 0 });
  assert.ok(heuristicResult, "Tier 0 should produce instant result");
  const parsed = JSON.parse(heuristicResult);
  assert.strictEqual(parsed.tier, "tier_0_heuristic");
  assert.strictEqual(parsed.valid, false, "Should catch missing timestamps and raw foreign key");
  assert.ok(parsed.errors.some(e => e.includes("foreign key primitif")), "Catches unconstrained user_id");
  assert.ok(parsed.warnings.some(w => w.includes("timestamps")), "Catches missing timestamps");
  console.log("  ✅ Tier 0 Heuristic successfully caught schema anti-patterns in < 1ms");

  // 3. Test Tier 0: Zero-LLM Instant Heuristic for code quality
  const badBladeCode = `
    <div>
      @livewire('user-table')
      <?php DB::raw("SELECT * FROM users WHERE id = " . $id); ?>
    </div>
  `;
  const codeQualityRes = await li.generate(badBladeCode, "review_code_quality", null, { tier: 0 });
  assert.ok(codeQualityRes, "Tier 0 should evaluate code quality");
  const parsedCQ = JSON.parse(codeQualityRes);
  assert.strictEqual(parsedCQ.tier, "tier_0_heuristic");
  assert.ok(parsedCQ.issues.some(i => i.severity === "error" && i.message.includes("SQL Injection")), "Catches SQL injection in DB::raw");
  assert.ok(parsedCQ.issues.some(i => i.message.includes("@livewire")), "Catches legacy @livewire tag");
  console.log("  ✅ Tier 0 Heuristic successfully caught security and syntax issues");

  console.log("🎉 All Tiered Model Routing (Pilar 3) unit tests passed!\n");
}

testTieredModelRouting().catch(err => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
