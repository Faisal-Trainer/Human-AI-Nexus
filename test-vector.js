// test-vector.js
// NEXUS Vector Search Verification Script

const SemanticEngine = require("./agent/core/SemanticEngine");
const path = require("path");

async function test() {
  console.log("🚀 Starting Vector Search Verification...");
  
  const hubPath = path.join(__dirname, "memory", "distilled");
  const engine = new SemanticEngine(hubPath);

  // 1. Build Index
  console.log("\n--- STEP 1: Building Index ---");
  await engine.buildIndex();

  // 2. Search Tests
  console.log("\n--- STEP 2: Semantic Search Tests ---");

  // Test 1: Security query
  const r1 = await engine.search("authentication token security", 3);
  console.log('\n🔎 Query: "authentication token security"');
  if (r1.length === 0) console.log("   ❌ No results found.");
  r1.forEach((r) => console.log(`   [${r.score.toFixed(2)}] — ${r.file}`));

  // Test 2: Database query
  const r2 = await engine.search("migration schema eloquent", 3);
  console.log('\n🔎 Query: "migration schema eloquent"');
  if (r2.length === 0) console.log("   ❌ No results found.");
  r2.forEach((r) => console.log(`   [${r.score.toFixed(2)}] — ${r.file}`));

  // Test 3: Multi-domain query
  const r3 = await engine.search("livewire form validation security", 3);
  console.log('\n🔎 Query: "livewire form validation security"');
  if (r3.length === 0) console.log("   ❌ No results found.");
  r3.forEach((r) =>
    console.log(`   [${r.score.toFixed(2)}] — ${r.file} [${r.tags.join(", ")}]`),
  );

  console.log("\n✨ Verification Complete.");
}

test().catch(err => {
    console.error("\n❌ Verification Failed:");
    console.error(err);
});
