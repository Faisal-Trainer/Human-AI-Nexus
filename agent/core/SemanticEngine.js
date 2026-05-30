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
    this.ollamaFailures = 0;
    this.useNewEmbedAPI = true; // Ollama v0.24+ uses /api/embed instead of /api/embeddings

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
      laravel: [
        "artisan", "blade", "eloquent", "filament", "livewire",
        "provider", "facade", "middleware", "sanctum", "route",
        "controller", "migration", "seeder", "request", "policy",
        "pennant", "horizon", "telescope", "sail", "octane"
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

    // 🚀 Check if Ollama embeddings are available + warmup model
    try {
        const axios = require('axios');
        const tags = await axios.get(`${this.baseUrl}/tags`, { timeout: 5000 });
        if (tags.data.models.some(m => m.name.includes(this.ollamaModel))) {
            // FIX #26 — Warmup: preload the embedding model before batch processing
            // This prevents 500 errors from model contention (e.g. qwen3:30b still loaded)
            console.log(`   💎 Ollama: Warming up ${this.ollamaModel} for embeddings...`);
            const warmupOk = await this._warmupEmbeddingModel();
            if (warmupOk) {
                this.useOllamaEmbeddings = true;
                console.log(`   💎 Ollama: ${this.ollamaModel} ready for high-precision embeddings.`);
            } else {
                console.warn(`   ⚠️ Ollama: ${this.ollamaModel} warmup failed, falling back to TF-IDF.`);
            }
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

    let embeddedCount = 0;
    for (const file of files) {
      const filePath = path.join(this.knowledgePath, file);
      try {
        const content = await fs.readFile(filePath, "utf8");
        const cleaned = this.cleanContent(content);

        this.tfidf.addDocument(cleaned);
        
        let embedding = null;
        if (this.useOllamaEmbeddings) {
            // FIX #28 — Truncate to 3000 chars to avoid 400 Bad Request (token limit exceeded)
            embedding = await this.getEmbedding(cleaned.substring(0, 3000));
            if (embedding) embeddedCount++;
            // FIX #26 — Small delay between embeddings to reduce Ollama contention
            if (embeddedCount % 5 === 0) await this._sleep(200);
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

    const embeddingStatus = this.useOllamaEmbeddings ? `(${embeddedCount} with vector embeddings)` : '(TF-IDF only)';
    console.log(
      `   ✅ Index built: ${this.fileIndex.length} knowledge nodes vectorized ${embeddingStatus}.`,
    );
    return this.fileIndex.length;
  }

  /**
   * Simpan index ke disk (cache)
   */
  async saveIndex() {
    const indexPath = path.join(
      this.knowledgePath,
      "short_term",
      "cache",
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
      "short_term",
      "cache",
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

  /**
   * FIX #26 — Warmup the embedding model by sending a tiny probe request.
   * This forces Ollama to unload any other model (e.g. qwen3:30b) and load
   * nomic-embed-text BEFORE we start batch embedding. Prevents 500 contention errors.
   */
  async _warmupEmbeddingModel() {
    const axios = require('axios');
    const MAX_WARMUP_RETRIES = 3;
    for (let attempt = 1; attempt <= MAX_WARMUP_RETRIES; attempt++) {
        try {
            // Try new API first (/api/embed), fallback to legacy (/api/embeddings)
            try {
                const resp = await axios.post(`${this.baseUrl}/embed`, {
                    model: this.ollamaModel,
                    input: 'warmup'
                }, { timeout: 120000 }); // 2 min timeout for cold model load
                if (resp.data.embeddings?.[0]?.length > 0) {
                    this.useNewEmbedAPI = true;
                    return true;
                }
            } catch (newApiErr) {
                // Fallback to legacy endpoint
                const resp = await axios.post(`${this.baseUrl}/embeddings`, {
                    model: this.ollamaModel,
                    prompt: 'warmup'
                }, { timeout: 120000 });
                if (resp.data.embedding?.length > 0) {
                    this.useNewEmbedAPI = false;
                    return true;
                }
            }
        } catch (e) {
            const isTransient = e.response?.status === 500 || e.code === 'ECONNRESET';
            if (isTransient && attempt < MAX_WARMUP_RETRIES) {
                const delay = attempt * 3000; // 3s, 6s backoff
                console.warn(`   ⚠️ Ollama: Warmup attempt ${attempt}/${MAX_WARMUP_RETRIES} failed (${e.message}). Retrying in ${delay/1000}s...`);
                await this._sleep(delay);
            } else {
                console.error(`   ❌ Ollama: Warmup failed after ${attempt} attempts: ${e.message}`);
                return false;
            }
        }
    }
    return false;
  }

  /**
   * FIX #26 — Get embedding with retry + exponential backoff for transient 500 errors.
   * Uses /api/embed (Ollama v0.24+) with /api/embeddings fallback.
   */
  async getEmbedding(text) {
    if (this.ollamaFailures >= 5) return null; // Raised threshold from 3 to 5
    
    const axios = require('axios');
    const MAX_RETRIES = 3;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            let embedding;
            if (this.useNewEmbedAPI) {
                // Ollama v0.24+ /api/embed endpoint
                const response = await axios.post(`${this.baseUrl}/embed`, {
                    model: this.ollamaModel,
                    input: text
                }, { timeout: 60000 });
                embedding = response.data.embeddings?.[0];
            } else {
                // Legacy /api/embeddings endpoint
                const response = await axios.post(`${this.baseUrl}/embeddings`, {
                    model: this.ollamaModel,
                    prompt: text
                }, { timeout: 60000 });
                embedding = response.data.embedding;
            }
            
            this.ollamaFailures = 0;
            return embedding || null;
        } catch (e) {
            const isTransient = e.response?.status === 500 || e.response?.status === 503 || e.code === 'ECONNRESET';
            
            if (isTransient && attempt < MAX_RETRIES) {
                // FIX #26 — Exponential backoff: 1s, 2s, 4s for transient server errors
                const delay = Math.pow(2, attempt - 1) * 1000;
                console.warn(`   ⚠️ Ollama: Embedding attempt ${attempt}/${MAX_RETRIES} got ${e.response?.status || e.code}. Retrying in ${delay/1000}s...`);
                await this._sleep(delay);
                continue;
            } else if (e.response?.status === 400 && attempt < MAX_RETRIES && text.length > 500) {
                // FIX #28 — 400 Bad Request usually means token limit exceeded.
                // Halve the text and retry immediately.
                console.warn(`   ⚠️ Ollama: Got 400 Bad Request (likely token limit). Truncating text from ${text.length} to ${Math.floor(text.length / 2)} chars and retrying...`);
                text = text.substring(0, Math.floor(text.length / 2));
                continue;
            }
            
            this.ollamaFailures++;
            if (this.ollamaFailures >= 5) {
                console.error(`   ❌ Ollama: Embedding failed ${this.ollamaFailures} times (${e.message}). Disabling Ollama embeddings for this session.`);
                this.useOllamaEmbeddings = false;
            } else {
                console.error(`   ❌ Ollama: Embedding failed: ${e.message}`);
            }
            return null;
        }
    }
    return null;
  }

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // FIX #15 — Zero-norm guard: jika salah satu vektor nol (embedding gagal/dokumen kosong),
  // kembalikan 0 (tidak ada kesamaan) bukan NaN yang menginfeksi seluruh ranking
  cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    const denom = Math.sqrt(normA) * Math.sqrt(normB);
    if (denom === 0) return 0; // Zero vector = no similarity (avoid NaN/Infinity)
    return dotProduct / denom;
  }

  /**
   * Extract multi-label tags dari konten file
   * Lebih akurat dari identifyCategory() karena support multi-tag
   */
  extractMultiTags(content) {
    const lowerContent = content.toLowerCase();
    const tags = new Set();
    const VALID_DOMAINS = new Set(Object.keys(this.domainVocab).concat(['other', 'standards', 'academics', 'planning', 'audit']));

    // 1. Cek existing NEXUS metadata tags dulu
    const metaMatch = content.match(/METADATA.*\[([^\]]+)\]/i);
    if (metaMatch) {
      metaMatch[1].split(",")
        .map(t => t.trim().toLowerCase())
        .filter(t => VALID_DOMAINS.has(t))
        .forEach((t) => tags.add(t));
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
   * Extract multi-label tags with scores
   * Berguna untuk menentukan priority folder saat shelving
   */
  extractMultiTagsWithScores(content) {
    const lowerContent = content.toLowerCase();
    const tagScores = [];
    const VALID_DOMAINS = new Set(Object.keys(this.domainVocab).concat(['other', 'standards', 'academics', 'planning', 'audit']));

    const metaMatch = content.match(/METADATA.*\[([^\]]+)\]/i);
    if (metaMatch) {
      metaMatch[1].split(",")
        .map(t => t.trim().toLowerCase())
        .filter(t => VALID_DOMAINS.has(t))
        .forEach(t => tagScores.push({ tag: t, score: 50 })); // Base score for explicit tags
    }

    for (const [domain, keywords] of Object.entries(this.domainVocab)) {
      const hits = keywords.filter((kw) => lowerContent.includes(kw)).length;
      if (hits > 0) {
        const existing = tagScores.find(t => t.tag === domain);
        if (existing) {
          existing.score += hits;
        } else {
          tagScores.push({ tag: domain, score: hits });
        }
      }
    }

    return tagScores;
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
      "short_term",
      "cache",
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
