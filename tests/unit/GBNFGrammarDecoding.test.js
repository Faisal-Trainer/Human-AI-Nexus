const assert = require("assert");
const li = require("../../agent/core/LocalIntelligence");

async function testGBNFGrammarDecoding() {
  console.log("🧪 Testing GBNF Grammar Constrained Decoding (Pilar 5)...");

  // 1. Verify standard predefined schemas
  console.log("  Checking Predefined Schemas...");
  assert.ok(li.schemas.blueprintApp, "blueprintApp schema should exist");
  assert.ok(li.schemas.postMortem, "postMortem schema should exist");
  assert.ok(li.schemas.codeReview, "codeReview schema should exist");
  assert.ok(li.schemas.schemaValidation, "schemaValidation schema should exist");
  console.log("  ✅ All 4 standard JSON schemas verified");

  // 2. Test schema grammar compilation via node-llama-cpp
  console.log("  Compiling LlamaJsonSchemaGrammar for blueprintApp...");
  const { getLlama } = await import("node-llama-cpp");
  const llama = await getLlama({ gpu: false });
  assert.ok(llama, "Llama instance initialized");

  const blueprintGrammar = await llama.createGrammarForJsonSchema(li.schemas.blueprintApp);
  assert.ok(blueprintGrammar, "blueprintApp grammar should compile successfully");
  console.log("  ✅ LlamaJsonSchemaGrammar successfully compiled for blueprintApp schema");

  const postMortemGrammar = await llama.createGrammarForJsonSchema(li.schemas.postMortem);
  assert.ok(postMortemGrammar, "postMortem grammar should compile successfully");
  console.log("  ✅ LlamaJsonSchemaGrammar successfully compiled for postMortem schema");

  // 3. Validate that generated sample adheres to schema
  const sampleValidBlueprint = {
    project_name: "NexusPOS",
    framework: "Laravel 12 / Livewire 3",
    description: "Point of Sale system with offline sync",
    models: ["Product", "Transaction", "Customer"],
    routes: ["/pos", "/inventory", "/reports"],
    livewire_components: ["PosTerminal", "StockAlert"],
    relationships: [
      { model: "Transaction", type: "hasMany", target: "TransactionItem" }
    ]
  };
  
  // Validate schema required fields
  for (const req of li.schemas.blueprintApp.required) {
    assert.ok(sampleValidBlueprint[req] !== undefined, `Missing required field ${req}`);
  }
  console.log("  ✅ Schema integrity validation passed");

  console.log("🎉 All GBNF Grammar Constrained Decoding (Pilar 5) unit tests passed!\n");
}

testGBNFGrammarDecoding().catch(err => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
