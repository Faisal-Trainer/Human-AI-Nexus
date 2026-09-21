const assert = require("assert");
const path = require("path");
const SemanticEngine = require("../../agent/core/SemanticEngine");

async function testAgenticRAGHyDECRAG() {
  console.log("🧪 Testing Agentic RAG dengan HyDE & CRAG (Pilar 4)...");

  const memoryPath = path.resolve(__dirname, "../../memory");
  const engine = new SemanticEngine(memoryPath);

  // 1. Test HyDE Generator
  console.log("  Testing HyDE Hypothetical Document Generation...");
  const dbDoc = engine.generateHypotheticalDocument("Buatkan tabel transaksi pesanan");
  assert.ok(dbDoc.includes("Schema::create"), "HyDE database doc should synthesize Schema::create");
  assert.ok(dbDoc.includes("foreignId"), "HyDE database doc should synthesize foreignId");

  const uiDoc = engine.generateHypotheticalDocument("Komponen Livewire pencarian realtime");
  assert.ok(uiDoc.includes("Livewire"), "HyDE UI doc should mention Livewire");
  assert.ok(uiDoc.includes("wire:"), "HyDE UI doc should contain wire: directives");

  const secDoc = engine.generateHypotheticalDocument("Otentikasi multi-tenant dengan role dan policy");
  assert.ok(secDoc.includes("authorize") || secDoc.includes("sanctum"), "HyDE security doc should synthesize authorization/sanctum");
  console.log("  ✅ HyDE correctly synthesizes technical code patterns across all domains");

  // 2. Test CRAG Confidence Evaluator
  console.log("  Testing CRAG Confidence Scoring...");
  // High confidence mock
  const highConfDocs = [{
    file: "laravel_database_rules.md",
    content: "Schema::create guidelines for laravel migration and eloquent models",
    score: 0.05,
    simScore: 0.88
  }];
  const highEval = engine.evaluateRetrievalConfidence(highConfDocs, "laravel migration");
  assert.strictEqual(highEval.action, "DIRECT", "High similarity should yield DIRECT action");
  assert.ok(highEval.confidence >= 0.60, "Confidence should be >= 0.60");

  // Empty / low confidence mock
  const lowEval = engine.evaluateRetrievalConfidence([], "something obscure not in database");
  assert.strictEqual(lowEval.action, "REFORMULATE_EXPAND", "Empty results should yield REFORMULATE_EXPAND");
  assert.strictEqual(lowEval.confidence, 0.0, "Confidence should be 0.0");
  console.log("  ✅ CRAG confidence evaluation accurately separates DIRECT from REFORMULATE_EXPAND");

  // 3. Test CRAG End-to-End Execution
  console.log("  Testing CRAG End-to-End Execution...");
  // Gunakan fast TF-IDF mode untuk unit test agar tidak blocking embedding ratusan file
  engine.useOllamaEmbeddings = false;
  await engine.buildGraphOnly();

  const cragResult = await engine.searchWithCrag("laravel eloquent relationship", { topK: 3 });
  assert.ok(cragResult, "CRAG result must not be null");
  assert.ok(["DIRECT", "ENRICH_GRAPH_HYDE", "REFORMULATE_EXPAND"].includes(cragResult.cragAction), "Must choose valid CRAG action");
  assert.ok(typeof cragResult.confidenceScore === "number", "Confidence score must be numeric");
  assert.ok(typeof cragResult.finalContext === "string", "Final context must be formatted string");
  console.log(`  ✅ CRAG executed successfully (Action: ${cragResult.cragAction}, Confidence: ${cragResult.confidenceScore}, Context length: ${cragResult.finalContext.length} chars)`);

  console.log("🎉 All Agentic RAG (HyDE + CRAG) (Pilar 4) unit tests passed!\n");
  process.exit(0);
}

testAgenticRAGHyDECRAG().catch(err => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
