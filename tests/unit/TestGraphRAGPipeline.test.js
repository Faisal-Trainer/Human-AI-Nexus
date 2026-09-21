// tests/unit/TestGraphRAGPipeline.test.js
// Integration test verifying End-to-End GraphRAG with Obsidian Wikilink Traversal

const path = require("path");
const fs = require("fs-extra");
const GraphEngine = require("../../agent/core/GraphEngine");
const SemanticEngine = require("../../agent/core/SemanticEngine");

async function runGraphRAGTests() {
  console.log("🧪 Running End-to-End GraphRAG Pipeline Tests...\n");

  const tempDir = path.join(__dirname, "temp_graph_rag_test");
  await fs.ensureDir(tempDir);

  try {
    // 1. Setup Mock Knowledge & Obsidian Vault Markdown Files with Wikilinks
    const mockFiles = [
      {
        name: "Authentication.md",
        content: `---
title: Authentication
tags: [security, auth, laravel]
aliases: [Auth System]
---
# Authentication System
NEXUS uses Laravel Sanctum and session guards for robust authentication.
For password hashing, always use Bcrypt with a work factor of 12.
All auth endpoints must link directly to [[RateLimiting]] to prevent brute force attacks.
Also review [[UserPermissions|RBAC Policies]] for post-login authorization.
`,
      },
      {
        name: "RateLimiting.md",
        content: `---
title: Rate Limiting
tags: [security, redis, throttle]
---
# Rate Limiting & Throttling
Throttle auth requests to 5 attempts per minute using Redis throttle middleware.
Exceeding the threshold triggers HTTP 429 Too Many Requests.
Linked closely to [[Authentication]] and [[SecurityAuditing]].
`,
      },
      {
        name: "UserPermissions.md",
        content: `---
title: User Permissions
tags: [security, rbac, acl]
---
# Role Based Access Control (RBAC)
Every user model has assigned roles and granular permissions.
Super-admin bypasses policy checks via Gate::before.
See [[Authentication]] for initial session initialization.
`,
      },
      {
        name: "OrderProcessing.md",
        content: `---
title: Order Processing
tags: [ecommerce, queue, job]
---
# Order Processing Pipeline
Handles cart checkout, payment capture, and dispatching async jobs.
Relies on database transactions and pessimistic locking for inventory deduction.
Requires [[Authentication]] before placing an order.
`,
      },
    ];

    const fileEntries = [];
    for (const f of mockFiles) {
      const p = path.join(tempDir, f.name);
      await fs.writeFile(p, f.content, "utf8");
      fileEntries.push({
        file: f.name,
        fullPath: p,
        source: "mock-obsidian",
      });
    }

    // 2. Test GraphEngine Build & Node Extraction
    console.log("🔹 Step 1: Testing GraphEngine Node & Content Extraction...");
    const graph = new GraphEngine();
    const stats = await graph.buildGraph(fileEntries);

    if (stats.totalNodes !== 4) {
      throw new Error(`Expected 4 nodes, got ${stats.totalNodes}`);
    }
    if (stats.totalEdges < 4) {
      throw new Error(`Expected at least 4 edges, got ${stats.totalEdges}`);
    }

    const authNode = graph.nodes.get("authentication");
    if (!authNode) throw new Error("Node 'authentication' not found");
    if (!authNode.contentSnippet || !authNode.contentSnippet.includes("Sanctum")) {
      throw new Error("contentSnippet was not properly extracted for 'authentication'");
    }
    if (!authNode.outlinks.has("ratelimiting")) {
      throw new Error("Missing outlink from 'authentication' to 'ratelimiting'");
    }
    console.log("  ✅ Graph built successfully with substantive content snippets.");

    // 3. Test Deep Traversal with Substantive Body & Budget Enforcement
    console.log("🔹 Step 2: Testing 1-Hop Traversal with Substantive Context & Budget...");
    const traversal = graph.traverse(["Authentication"], {
      maxHops: 1,
      maxNeighborsPerSeed: 3,
      maxTotalChars: 1500,
    });

    if (traversal.seeds.length !== 1) {
      throw new Error(`Expected 1 seed, got ${traversal.seeds.length}`);
    }
    if (traversal.connectedNotes.length < 2) {
      throw new Error(`Expected at least 2 connected notes, got ${traversal.connectedNotes.length}`);
    }
    if (!traversal.graphContextString.includes("Sanctum")) {
      throw new Error("graphContextString missing substantive seed content");
    }
    if (!traversal.graphContextString.includes("Rate Limiting")) {
      throw new Error("graphContextString missing connected wikilink neighbor");
    }
    if (traversal.graphContextString.length > 1600) {
      throw new Error(`Budget exceeded! Length is ${traversal.graphContextString.length}`);
    }
    console.log("  ✅ Traversal produced rich relational context within character budget.");

    // 4. Test SemanticEngine Hybrid Seeding with GraphRAG
    console.log("🔹 Step 3: Testing SemanticEngine Hybrid Seeding (Direct + TF-IDF)...");
    const semanticEngine = new SemanticEngine(tempDir);
    semanticEngine.graphEngine = graph;
    semanticEngine.isBuilt = true;
    semanticEngine.fileIndex = fileEntries.map((fe) => ({
      file: fe.file,
      path: fe.fullPath,
      tags: ["security"],
    }));

    const searchResult = await semanticEngine.searchWithGraph("Authentication brute force", {
      topK: 2,
      maxHops: 1,
      maxNeighborsPerSeed: 2,
      maxTotalChars: 2000,
    });

    if (!searchResult || !searchResult.seeds || searchResult.seeds.length === 0) {
      throw new Error("searchWithGraph failed to return seeds");
    }
    if (!searchResult.graphContextString) {
      throw new Error("searchWithGraph failed to produce graphContextString");
    }
    console.log("  ✅ SemanticEngine hybrid seeding works with GraphRAG.");

    // 5. Test Simulated Prompt Injection
    console.log("🔹 Step 4: Testing Prompt Injection formatting...");
    const samplePrompt = `Analyze README.\n${searchResult.graphContextString}\nGenerate Architecture.`;
    if (!samplePrompt.includes("### 🌐 Knowledge Graph Traversal Context")) {
      throw new Error("Prompt injection missing GraphRAG header");
    }
    console.log("  ✅ GraphRAG prompt injection verified.");

    console.log("\n🎉 ALL GRAPHRAG TESTS PASSED SUCCESSFULLY!\n");
  } finally {
    await fs.remove(tempDir).catch(() => {});
  }
}

runGraphRAGTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Test failed:", err);
    process.exit(1);
  });
