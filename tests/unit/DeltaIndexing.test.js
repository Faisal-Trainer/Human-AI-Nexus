const SemanticEngine = require("../../agent/core/SemanticEngine");
const path = require("path");

async function testDeltaAndChunking() {
  console.log("🧪 Testing Heading-Aware Chunking & Delta Logic...");

  const engine = new SemanticEngine(path.resolve(__dirname, "../../memory"));

  // 1. Test chunkMarkdown
  const sampleEntry = {
    file: "Redis.md",
    fullPath: "/path/to/Redis.md",
    source: "obsidian-vault",
  };

  const sampleMd = `---
title: Redis Hub
tags:
  - database
  - cache
---
# Redis Hub
Pengenalan ringkas tentang Redis sebagai in-memory database berkecepatan tinggi.

## Konfigurasi Dasar
Untuk mengonfigurasi redis, atur file redis.conf dan bind IP ke localhost.
Pastikan port 6379 terbuka untuk koneksi internal.

## Troubleshooting Memory
Jika RAM habis, atur maxmemory-policy allkeys-lru pada konfigurasi.
Gunakan perintah INFO memory untuk memeriksa penggunaan memori.

### Deteksi Key Besar
Gunakan redis-cli --bigkeys untuk mendeteksi key yang memakan banyak alokasi RAM.
`;

  const chunks = engine.chunkMarkdown(sampleEntry, sampleMd);
  console.log(`  Generated ${chunks.length} chunks from sample markdown.`);

  if (chunks.length < 3) {
    throw new Error(`Expected at least 3 chunks, got ${chunks.length}`);
  }

  const headings = chunks.map((c) => c.heading);
  console.log("  Headings detected:", headings);

  if (!headings.includes("Konfigurasi Dasar")) {
    throw new Error("Missing 'Konfigurasi Dasar' heading chunk");
  }
  if (!headings.includes("Troubleshooting Memory")) {
    throw new Error("Missing 'Troubleshooting Memory' heading chunk");
  }
  if (!headings.includes("Deteksi Key Besar")) {
    throw new Error("Missing 'Deteksi Key Besar' heading chunk");
  }
  console.log("  ✅ Heading-Aware Chunking works perfectly!");

  // 2. Test slugify
  const slug = engine._slugify("Troubleshooting Memory");
  if (slug !== "troubleshooting-memory") {
    throw new Error(`Expected 'troubleshooting-memory', got '${slug}'`);
  }
  console.log("  ✅ Slugify works correctly!");

  console.log("🎉 All Delta & Chunking Unit Tests passed successfully!");
}

testDeltaAndChunking().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
