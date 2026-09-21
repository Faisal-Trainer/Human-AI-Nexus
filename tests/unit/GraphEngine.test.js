const GraphEngine = require("../../agent/core/GraphEngine");
const path = require("path");

async function testGraphEngine() {
  console.log("🧪 Testing GraphEngine...");

  const engine = new GraphEngine();

  // Test normalizeId
  if (engine.normalizeId("Agent/Create.md") !== "create") {
    throw new Error("normalizeId failed");
  }
  console.log("  ✅ normalizeId works");

  // Test parseMarkdown with frontmatter
  const sampleMd = `---
title: Agent System
tags:
  - agent
  - governance
aliases:
  - Agent Rules
category: governance
---
# Agent System
Ini adalah sistem agent.

Baca aturan lengkap di [[Create]] dan juga [[Token-Efficiency|Hemat Token]].
Ada juga tag #architecture dan #security.
`;

  const parsed = engine.parseMarkdown(sampleMd);
  if (parsed.frontmatter.title !== "Agent System") throw new Error("Title parse failed");
  if (!parsed.frontmatter.tags.includes("agent")) throw new Error("Tags parse failed");
  if (!parsed.frontmatter.aliases.includes("Agent Rules")) throw new Error("Aliases parse failed");
  console.log("  ✅ parseMarkdown frontmatter works");

  // Test wikilinks extraction
  const links = engine.extractWikilinks(parsed.body);
  if (links.length !== 2) throw new Error(`Expected 2 wikilinks, got ${links.length}`);
  if (links[0].targetId !== "create") throw new Error("Link targetId failed");
  if (links[1].alias !== "Hemat Token") throw new Error("Link alias failed");
  console.log("  ✅ extractWikilinks works");

  // Test tags extraction
  const tags = engine.extractTags(parsed.body);
  if (!tags.includes("architecture") || !tags.includes("security")) {
    throw new Error("extractTags failed");
  }
  console.log("  ✅ extractTags works");

  console.log("🎉 All basic unit tests passed!");
}

testGraphEngine().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
