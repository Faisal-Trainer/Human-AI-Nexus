const GraphEngine = require("../../agent/core/GraphEngine");
const fg = require("fast-glob");
const path = require("path");

async function run() {
  console.log("🔍 Scanning Obsidian Vault...");
  const vaultPath = "C:/Users/ACER/Documents/Obsidian Vault";

  const files = fg.sync("**/*.{md,MD}", {
    cwd: vaultPath,
    ignore: ["**/node_modules/**", "**/.obsidian/**", "**/*MOC*"],
    onlyFiles: true,
  }).map(f => ({ file: f, fullPath: path.join(vaultPath, f), source: "obsidian-vault" }));

  console.log(`Found ${files.length} markdown files in Vault.`);

  const graph = new GraphEngine();
  const startTime = Date.now();
  const stats = await graph.buildGraph(files);
  const elapsed = Date.now() - startTime;

  console.log(`\n🎉 Graph built in ${elapsed}ms!`);
  console.log(`📊 Total Nodes: ${stats.totalNodes}`);
  console.log(`🔗 Total Edges: ${stats.totalEdges} (${stats.bidirectionalEdges} bidirectional)`);
  console.log(`🏷️ Total Tags: ${stats.totalTags}`);

  console.log("\n🌟 Top Hubs:");
  stats.topHubs.slice(0, 5).forEach((h, i) => {
    console.log(`  ${i+1}. [[${h.title}]] -> ${h.totalDegree} links (${h.outlinks} out, ${h.backlinks} back)`);
  });

  console.log("\n🌳 Visualizing Tree for 'Agent':");
  console.log(graph.visualizeTree("Agent"));

  console.log("\n🚀 Testing 1-Hop Traversal on 'Agent':");
  const traversal = graph.traverse(["Agent"], { maxHops: 1, maxNeighborsPerSeed: 4 });
  console.log(traversal.graphContextString);
}

run().catch(console.error);
