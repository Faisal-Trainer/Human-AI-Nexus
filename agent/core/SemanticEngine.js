// agent/core/SemanticEngine.js
// NEXUS Semantic Engine v1.0 — TF-IDF Based Knowledge Retrieval
// Replaces regex-based tagging with intelligent vector scoring

const natural = require("natural");
const fs = require("fs-extra");
const path = require("path");
const redis = require("./RedisMemory");

class SemanticEngine {
    constructor(knowledgePath) {
    this.knowledgePath = knowledgePath;
    this.tfidf = new natural.TfIdf();
    this.fileIndex = []; // [{ file, path, tags, embedding }]
    this.isBuilt = false;
    this.useOllamaEmbeddings = false;
    this.ollamaModel = 'nomic-embed-text';
    this.baseUrl = 'http://localhost:11434/api';

    // Domain vocabulary untuk TALL Stack context
    this.domainVocab = {
      security: [
        "auth",
        "authentication",
        "authorization",
        "password",
        "token",
        "oauth",
        "csrf",
        "xss",
        "encryption",
        "bcrypt",
        "guard",
        "middleware",
        "2fa",
        "jwt",
        "session",
        "keamanan",
        "sanctum",
      ],
      database: [
        "migration",
        "schema",
        "eloquent",
        "query",
        "model",
        "pivot",
        "relationship",
        "hasMany",
        "belongsTo",
        "index",
        "uuid",
        "foreign",
        "seeders",
        "factory",
        "database",
        "sql",
      ],
      "ui-ux": [
        "livewire",
        "alpine",
        "blade",
        "component",
        "reactive",
        "design",
        "layout",
        "tailwind",
        "responsive",
        "accessibility",
        "modal",
        "form",
        "validation",
        "frontend",
        "estetika",
        "wire:model",
      ],
      performance: [
        "cache",
        "redis",
        "queue",
        "job",
        "optimize",
        "lazy",
        "eager",
        "n+1",
        "horizon",
        "chunk",
        "pagination",
        "compression",
        "cdn",
        "index",
        "performa",
      ],
      tdd: [
        "test",
        "pest",
        "phpunit",
        "assert",
        "mock",
        "factory",
        "feature",
        "unit",
        "dusk",
        "coverage",
        "tdd",
        "scaffold",
        "pengujian",
      ],
      vcs: [
        "git",
        "commit",
        "branch",
        "merge",
        "rebase",
        "worktree",
        "pull",
        "push",
        "conflict",
        "tag",
        "release",
        "gitflow",
      ],
      saas: [
        "tenant",
        "subscription",
        "billing",
        "stripe",
        "plan",
        "feature-flag",
        "multi-tenant",
        "invoice",
        "webhook",
        "payment",
        "saas",
      ],
      api: [
        "api",
        "rest",
        "endpoint",
        "resource",
        "sanctum",
        "throttle",
        "versioning",
        "response",
        "request",
        "webhook",
        "integration",
      ],
    };
  }

  /**
   * Build TF-IDF index dari semua file di knowledge HUB
   * Dipanggil sekali saat startup atau setelah distill
   */
  async buildIndex() {
    console.log("🔬 SemanticEngine: Building vector index...");

    // 🚀 Check if Ollama embeddings are available
    try {
        const axios = require('axios');
        const tags = await axios.get(`${this.baseUrl}/tags`);
        if (tags.data.models.some(m => m.name.includes(this.ollamaModel))) {
            this.useOllamaEmbeddings = true;
            console.log(`   💎 Ollama: Using ${this.ollamaModel} for high-precision embeddings.`);
        }
    } catch (e) {
        console.warn("   ⚠️ Ollama not found, falling back to TF-IDF.");
    }

    this.tfidf = new natural.TfIdf(); // Reset
    this.fileIndex = [];

    const glob = require("glob");
    const files = glob.sync("**/*.{md,MD}", {
      cwd: this.knowledgePath,
      ignore: [
        "NEXUS_HUB_INDEX.md",
        "NEXUS_NEURAL_MAP.md",
        "NEXUS_SEMANTIC_INDEX.json",
      ],
      nodir: true,
    });

    for (const file of files) {
      const filePath = path.join(this.knowledgePath, file);
      try {
        const content = await fs.readFile(filePath, "utf8");
        const cleaned = this.cleanContent(content);

        this.tfidf.addDocument(cleaned);
        
        let embedding = null;
        if (this.useOllamaEmbeddings) {
            embedding = await this.getEmbedding(cleaned.substring(0, 8000));
        }

        this.fileIndex.push({
          index: this.fileIndex.length,
          file: file,
          path: filePath,
          tags: this.extractMultiTags(content),
          embedding: embedding
        });
      } catch (e) {
        // Skip file yang tidak bisa dibaca
      }
    }

    this.isBuilt = true;

    // Simpan index ke disk untuk reuse
    await this.saveIndex();

    console.log(
      `   ✅ Index built: ${this.fileIndex.length} knowledge nodes vectorized.`,
    );
    return this.fileIndex.length;
  }

  /**
   * Simpan index ke disk (cache)
   */
  async saveIndex() {
    const indexPath = path.join(
      this.knowledgePath,
      "..",
      "short_term",
      "vector_index.json",
    );
    await fs.ensureDir(path.dirname(indexPath));
    await fs.writeJson(
      indexPath,
      {
        built_at: Date.now(),
        file_count: this.fileIndex.length,
        index: this.fileIndex,
      },
      { spaces: 2 },
    );
  }

  /**
   * Load index dari cache kalau masih fresh (< 1 jam)
   */
  async loadIndex() {
    const indexPath = path.join(
      this.knowledgePath,
      "..",
      "short_term",
      "vector_index.json",
    );
    if (!(await fs.pathExists(indexPath))) return false;

    const cached = await fs.readJson(indexPath);
    const ageMs = Date.now() - cached.built_at;
    const ONE_HOUR = 3600000;

    if (ageMs < ONE_HOUR && cached.index.length > 0) {
      this.fileIndex = cached.index;
      this.isBuilt = true;
      console.log(
        `   ⚡ Vector index loaded from cache (${cached.file_count} nodes, ${Math.round(ageMs / 60000)}m old).`,
      );
      return true;
    }
    return false;
  }

  /**
   * Search knowledge dengan TF-IDF scoring + domain vocab boost
   * @param {string} query - Natural language query atau tag
   * @param {number} topK - Jumlah hasil teratas
   * @returns {Array} - Sorted results dengan score
   */
  async search(query, topK = 5) {
    // 1. Cek Redis Cache
    const cacheKey = `nexus:search:${Buffer.from(query).toString('base64')}:${topK}`;
    const cachedResults = await redis.get(cacheKey);
    if (cachedResults) {
        console.log(`   ⚡ Redis: Cache hit for query "${query}"`);
        return cachedResults;
    }

    if (!this.isBuilt) {
      const cached = await this.loadIndex();
      if (!cached) await this.buildIndex();
    }

    let results = [];
    const queryLower = query.toLowerCase();

    if (this.useOllamaEmbeddings && this.fileIndex.some(f => f.embedding)) {
        console.log(`   🔍 Semantic Search: Using vector similarity...`);
        const queryEmbedding = await this.getEmbedding(query);
        
        if (queryEmbedding) {
            results = this.fileIndex.map(doc => ({
                ...doc,
                score: doc.embedding ? this.cosineSimilarity(queryEmbedding, doc.embedding) : 0
            })).filter(r => r.score > 0.1);
        }
    }

    // Fallback or combine with TF-IDF if results are poor
    if (results.length < topK) {
        const tfidfResults = [];
        this.tfidf.tfidfs(query, (i, measure) => {
            if (measure > 0 && this.fileIndex[i]) {
                tfidfResults.push({
                    ...this.fileIndex[i],
                    score: measure / 10, // Normalize TF-IDF score
                });
            }
        });
        
        // Merge results
        for (const tr of tfidfResults) {
            const existing = results.find(r => r.file === tr.file);
            if (existing) {
                existing.score += tr.score;
            } else {
                results.push(tr);
            }
        }
    }

    // Domain vocab boost — tambahkan score kalau query match domain keyword
    for (const result of results) {
      for (const [domain, keywords] of Object.entries(this.domainVocab)) {
        const domainMatch = keywords.some((kw) => queryLower.includes(kw));
        const fileMatch = result.tags.includes(domain);
        if (domainMatch && fileMatch) {
          result.score *= 1.5; // 50% boost untuk exact domain match
        }
      }
    }

    // Sort by score descending, ambil top K
    const finalResults = results.sort((a, b) => b.score - a.score).slice(0, topK);
    
    // 2. Simpan ke Redis Cache (expire 30 menit)
    await redis.set(cacheKey, finalResults, 1800);
    
    return finalResults;
  }

  async getEmbedding(text) {
    try {
        const axios = require('axios');
        const response = await axios.post(`${this.baseUrl}/embeddings`, {
            model: this.ollamaModel,
            prompt: text
        });
        return response.data.embedding;
    } catch (e) {
        console.error("   ❌ Ollama: Embedding failed:", e.message);
        return null;
    }
  }

  cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Extract multi-label tags dari konten file
   * Lebih akurat dari identifyCategory() karena support multi-tag
   */
  extractMultiTags(content) {
    const lowerContent = content.toLowerCase();
    const tags = new Set();

    // 1. Cek existing NEXUS metadata tags dulu
    const metaMatch = content.match(/METADATA.*\[([^\]]+)\]/i);
    if (metaMatch) {
      metaMatch[1].split(",").forEach((t) => tags.add(t.trim().toLowerCase()));
    }

    // 2. Score setiap domain berdasarkan keyword frequency
    for (const [domain, keywords] of Object.entries(this.domainVocab)) {
      const hits = keywords.filter((kw) => lowerContent.includes(kw)).length;
      const threshold = Math.max(2, Math.floor(keywords.length * 0.15));
      if (hits >= threshold) {
        tags.add(domain);
      }
    }

    return Array.from(tags);
  }

  /**
   * Bersihkan markdown menjadi plain text untuk indexing
   */
  cleanContent(content) {
    return content
      .replace(/```[\s\S]*?```/g, "") // hapus code blocks
      .replace(/#{1,6}\s/g, "") // hapus heading markers
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // hapus links, keep text
      .replace(/[*_`>]/g, "") // hapus markdown formatting
      .replace(/\n+/g, " ") // normalize newlines
      .trim();
  }

  /**
   * Invalidate cache — panggil setelah nexus distill
   */
  async invalidateCache() {
    const indexPath = path.join(
      this.knowledgePath,
      "..",
      "short_term",
      "vector_index.json",
    );
    if (await fs.pathExists(indexPath)) {
      await fs.remove(indexPath);
      this.isBuilt = false;
      
      // Clear Redis search cache
      await redis.flush();
      
      console.log(
        "   🗑️  Vector index & Redis cache invalidated. Will rebuild on next search.",
      );
    }
  }
}

module.exports = SemanticEngine;
