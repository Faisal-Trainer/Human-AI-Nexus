// agent/core/SemanticEngine.js
// NEXUS Semantic Engine v1.0 — TF-IDF Based Knowledge Retrieval
// Replaces regex-based tagging with intelligent vector scoring

const natural = require("natural");
const fs = require("fs-extra");
const path = require("path");
const redis = require("./RedisMemory");
const GraphEngine = require("./GraphEngine");

class SemanticEngine {
    constructor(knowledgePath) {
    this.knowledgePath = knowledgePath;
    this.tfidf = new natural.TfIdf();
    this.fileIndex = []; // [{ file, path, tags, embedding }]
    this.graphEngine = new GraphEngine(); // 🌐 Obsidian Knowledge Graph & Wikilink Engine
    this.isBuilt = false;
    this.useOllamaEmbeddings = false;
    this.ollamaModel = 'nomic-embed-text';
    this.baseUrl = 'http://localhost:11434/api';
    this.ollamaFailures = 0;
    this.useNewEmbedAPI = true; // Ollama v0.24+ uses /api/embed instead of /api/embeddings
    this.additionalPaths = []; // 🧠 Support for Obsidian Vault dual-indexing

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
        "tabel",
        "migrasi",
        "relasi",
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
   * Add additional path (like Obsidian Vault) for dual-source indexing.
   */
  addAdditionalPath(extraPath) {
    if (extraPath && !this.additionalPaths.includes(extraPath)) {
      this.additionalPaths.push(extraPath);
    }
  }

  /**
   * Scan and deduplicate all markdown files from local memory + Obsidian Vault
   */
  scanAllKnowledgeFiles() {
    const fg = require("fast-glob");
    
    // 1. Scan Local Memory
    const localFiles = fg.sync("**/*.{md,MD}", {
      cwd: this.knowledgePath.replace(/\\/g, "/"),
      ignore: [
        "NEXUS_HUB_INDEX.md",
        "NEXUS_NEURAL_MAP.md",
        "INDEX_NEURAL_MAP.md",
        "NEXUS_SEMANTIC_INDEX.json",
        "short_term/**",
        "cache/**",
        "operational/indexes/**",
        "references/**"
      ],
      onlyFiles: true,
    }).map(f => ({ file: f, fullPath: path.join(this.knowledgePath, f), source: "local" }));

    // 2. Scan Vault Paths
    const vaultFiles = [];
    for (const extraPath of this.additionalPaths) {
      const vFiles = fg.sync("**/*.{md,MD}", {
        cwd: extraPath.replace(/\\/g, "/"),
        ignore: ["**/node_modules/**", "**/.obsidian/**", "**/*MOC*"],
        onlyFiles: true,
      }).map(f => ({ file: f, fullPath: path.join(extraPath, f), source: "obsidian-vault" }));
      vaultFiles.push(...vFiles);
    }

    // Merge and deduplicate (local takes priority)
    const seenBasenames = new Set();
    const allFiles = [];
    for (const item of localFiles) {
      seenBasenames.add(path.basename(item.file).toLowerCase());
      allFiles.push(item);
    }
    for (const item of vaultFiles) {
      if (!seenBasenames.has(path.basename(item.file).toLowerCase())) {
        seenBasenames.add(path.basename(item.file).toLowerCase());
        allFiles.push(item);
      }
    }
    return allFiles;
  }

  /**
   * Fast build of knowledge graph only (bypasses heavy Ollama vector embeddings)
   */
  async buildGraphOnly() {
    const graphCachePath = path.join(
      this.knowledgePath,
      "short_term",
      "cache",
      "nexus_graph_index.json"
    );

    if (await this.graphEngine.loadCache(graphCachePath)) {
      return this.graphEngine.getStats();
    }

    const allFiles = this.scanAllKnowledgeFiles();
    await this.graphEngine.buildGraph(allFiles);
    await this.graphEngine.saveCache(graphCachePath);
    return this.graphEngine.getStats();
  }

  /**
   * Build TF-IDF index dari semua file di knowledge HUB
   * Dipanggil sekali saat startup atau setelah distill
   */
  async buildIndex() {
    console.log("🔬 SemanticEngine: Building vector index...");

    // 🚀 Check if Ollama embeddings are enabled and available
    if (this.forceTfIdf || process.env.NEXUS_FORCE_TFIDF === 'true' || this.useOllamaEmbeddings === false) {
      this.useOllamaEmbeddings = false;
      console.log("   ⚡ SemanticEngine: Fast TF-IDF mode active (bypassing Ollama batch embedding).");
    } else {
      try {
        const axios = require('axios');
        const tags = await axios.get(`${this.baseUrl}/tags`, { timeout: 5000 });
        if (tags.data.models.some(m => m.name.includes(this.ollamaModel))) {
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
    }

    this.tfidf = new natural.TfIdf(); // Reset
    this.fileIndex = [];

    const allFiles = this.scanAllKnowledgeFiles();

    // 🌐 Build Knowledge Graph (Wikilinks, Backlinks, Tags)
    try {
        await this.graphEngine.buildGraph(allFiles);
        const gStats = this.graphEngine.getStats();
        console.log(`   🌐 GraphEngine: Indexed ${gStats.totalNodes} nodes, ${gStats.totalEdges} edges (${gStats.bidirectionalEdges} bidirectional).`);
    } catch (gErr) {
        console.warn(`   ⚠️ GraphEngine build failed: ${gErr.message}`);
    }

    // ⚡ DELTA INDEXING: Load previous index cache if available
    const indexPath = path.join(this.knowledgePath, "short_term", "cache", "vector_index.json");
    const cachedChunksByPath = new Map(); // fullPath -> { mtime, chunks: [] }
    if (await fs.pathExists(indexPath)) {
      try {
        const cachedData = await fs.readJson(indexPath);
        if (Array.isArray(cachedData.index)) {
          for (const item of cachedData.index) {
            if (item.path && item.mtime) {
              if (!cachedChunksByPath.has(item.path)) {
                cachedChunksByPath.set(item.path, { mtime: item.mtime, chunks: [] });
              }
              cachedChunksByPath.get(item.path).chunks.push(item);
            }
          }
        }
      } catch (_) {}
    }

    const pendingEmbeddingChunks = [];
    let cacheHits = 0;
    let newFilesCount = 0;

    for (const entry of allFiles) {
      try {
        const stat = await fs.stat(entry.fullPath);
        const mtime = stat.mtimeMs;
        const cached = cachedChunksByPath.get(entry.fullPath);

        // Check if file is unchanged and has valid cached chunks
        if (cached && Math.abs(cached.mtime - mtime) < 1000 && cached.chunks.length > 0) {
          // CACHE HIT! Reuse cached chunks directly
          for (const chunk of cached.chunks) {
            this.tfidf.addDocument(chunk.content);
            this.fileIndex.push(chunk);
          }
          cacheHits++;
          continue;
        }

        // File is new or modified: slice into heading-aware chunks!
        const rawContent = await fs.readFile(entry.fullPath, "utf8");
        const chunks = this.chunkMarkdown(entry, rawContent);

        for (const chunk of chunks) {
          chunk.mtime = mtime;
          chunk.index = this.fileIndex.length + pendingEmbeddingChunks.length;
          this.tfidf.addDocument(chunk.content);

          if (this.useOllamaEmbeddings) {
            pendingEmbeddingChunks.push(chunk);
          } else {
            chunk.embedding = null;
            this.fileIndex.push(chunk);
          }
        }
        newFilesCount++;
      } catch (e) {
        // Skip unreadable files
      }
    }

    // Process batch embeddings for new/modified chunks
    let embeddedCount = 0;
    if (pendingEmbeddingChunks.length > 0 && this.useOllamaEmbeddings) {
      console.log(`   ⚡ Delta Indexing: Embedding ${pendingEmbeddingChunks.length} new/modified chunks in batches...`);
      const BATCH_SIZE = 10;
      for (let i = 0; i < pendingEmbeddingChunks.length; i += BATCH_SIZE) {
        const batch = pendingEmbeddingChunks.slice(i, i + BATCH_SIZE);
        const texts = batch.map((c) => c.content);
        const embeddings = await this.getBatchEmbeddings(texts);

        for (let j = 0; j < batch.length; j++) {
          batch[j].embedding = embeddings[j] || null;
          if (batch[j].embedding) embeddedCount++;
          this.fileIndex.push(batch[j]);
        }

        if (i % 30 === 0 && i > 0) await this._sleep(500);
      }
    }

    this.isBuilt = true;

    // Simpan index ke disk untuk reuse
    await this.saveIndex();

    const embeddingStatus = this.useOllamaEmbeddings ? `(${embeddedCount} new embeddings)` : '(TF-IDF only)';
    console.log(
      `   ✅ Index ready: ${this.fileIndex.length} chunks (${cacheHits} files cached, ${newFilesCount} files re-indexed) ${embeddingStatus}.`,
    );
    return this.fileIndex.length;
  }

  /**
   * Slice a markdown document into heading-aware chunks (## and ###)
   * @param {Object} entry - { file, fullPath, source }
   * @param {string} rawContent - full markdown text
   * @returns {Array<Object>}
   */
  chunkMarkdown(entry, rawContent) {
    if (!rawContent || rawContent.trim().length === 0) return [];

    const basename = path.basename(entry.file, path.extname(entry.file));
    const clean = this.cleanContent(rawContent);
    // If no markdown headings or very tiny (< 250 chars), keep as single document
    const headingMatches = rawContent.match(/^#{2,3}\s+/gm);
    if (!headingMatches || headingMatches.length < 2 || clean.length < 250) {
      return [{
        chunkId: `${basename}#root`,
        file: entry.file,
        path: entry.fullPath,
        source: entry.source,
        title: basename,
        heading: basename,
        content: clean,
        tags: this.extractMultiTags(rawContent),
      }];
    }

    const lines = rawContent.split(/\r?\n/);
    const chunks = [];
    let currentHeading = basename;
    let currentLines = [];

    for (const line of lines) {
      const headingMatch = line.match(/^(#{2,3})\s+(.+)$/);
      if (headingMatch) {
        if (currentLines.length > 0) {
          const body = currentLines.join("\n").trim();
          const cleanedBody = this.cleanContent(body);
          if (cleanedBody.length > 40) {
            chunks.push({
              chunkId: `${basename}#${this._slugify(currentHeading)}`,
              file: entry.file,
              path: entry.fullPath,
              source: entry.source,
              title: basename,
              heading: currentHeading,
              content: cleanedBody,
              tags: this.extractMultiTags(body),
            });
          }
        }
        currentHeading = headingMatch[2].trim();
        currentLines = [line];
      } else {
        currentLines.push(line);
      }
    }

    if (currentLines.length > 0) {
      const body = currentLines.join("\n").trim();
      const cleanedBody = this.cleanContent(body);
      if (cleanedBody.length > 40) {
        chunks.push({
          chunkId: `${basename}#${this._slugify(currentHeading)}`,
          file: entry.file,
          path: entry.fullPath,
          source: entry.source,
          title: basename,
          heading: currentHeading,
          content: cleanedBody,
          tags: this.extractMultiTags(body),
        });
      }
    }

    if (chunks.length === 0) {
      chunks.push({
        chunkId: `${basename}#root`,
        file: entry.file,
        path: entry.fullPath,
        source: entry.source,
        title: basename,
        heading: basename,
        content: clean,
        tags: this.extractMultiTags(rawContent),
      });
    }

    return chunks;
  }

  _slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  /**
   * Batch embedding retrieval from Ollama
   * @param {string[]} texts
   * @returns {Promise<Array<Array<number>|null>>}
   */
  async getBatchEmbeddings(texts) {
    if (!texts || texts.length === 0) return [];
    if (!this.useOllamaEmbeddings) return texts.map(() => null);

    const axios = require('axios');
    try {
      if (this.useNewEmbedAPI) {
        const resp = await axios.post(`${this.baseUrl}/embed`, {
          model: this.ollamaModel,
          input: texts.map(t => t.substring(0, 3000)),
        }, { timeout: 60000 });
        if (resp.data.embeddings && resp.data.embeddings.length > 0) {
          return resp.data.embeddings;
        }
      }
    } catch (_) {
      // Fallback to sequential
    }

    const embeddings = [];
    for (const text of texts) {
      const emb = await this.getEmbedding(text);
      embeddings.push(emb);
    }
    return embeddings;
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

    const graphCachePath = path.join(
      this.knowledgePath,
      "short_term",
      "cache",
      "nexus_graph_index.json"
    );
    await this.graphEngine.saveCache(graphCachePath);
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

      const graphCachePath = path.join(
        this.knowledgePath,
        "short_term",
        "cache",
        "nexus_graph_index.json"
      );
      await this.graphEngine.loadCache(graphCachePath);

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

    const queryLower = query.toLowerCase();
    let vectorRanked = [];
    if (this.useOllamaEmbeddings && this.fileIndex.some(f => f.embedding)) {
        console.log(`   🔍 Semantic Search: Using vector similarity...`);
        const queryEmbedding = await this.getEmbedding(query);
        
        if (queryEmbedding) {
            vectorRanked = this.fileIndex
                .filter(doc => doc.embedding)
                .map(doc => ({
                    ...doc,
                    simScore: this.cosineSimilarity(queryEmbedding, doc.embedding),
                }))
                .filter(r => r.simScore > 0.15)
                .sort((a, b) => b.simScore - a.simScore);
        }
    }

    // Always compute TF-IDF for robust hybrid search
    const tfidfRanked = [];
    this.tfidf.tfidfs(query, (i, measure) => {
        if (measure > 0 && this.fileIndex[i]) {
            tfidfRanked.push({
                ...this.fileIndex[i],
                tfidfScore: measure,
            });
        }
    });
    tfidfRanked.sort((a, b) => b.tfidfScore - a.tfidfScore);

    // Reciprocal Rank Fusion (RRF) with K = 60
    const RRF_K = 60;
    const scoreMap = new Map();

    vectorRanked.slice(0, 50).forEach((item, rank) => {
        const id = item.chunkId || item.file;
        const rrf = 1.0 / (RRF_K + rank + 1);
        scoreMap.set(id, { doc: item, score: rrf });
    });

    tfidfRanked.slice(0, 50).forEach((item, rank) => {
        const id = item.chunkId || item.file;
        const rrf = 1.0 / (RRF_K + rank + 1);
        if (scoreMap.has(id)) {
            scoreMap.get(id).score += rrf;
        } else {
            scoreMap.set(id, { doc: item, score: rrf });
        }
    });

    let results = Array.from(scoreMap.values()).map(v => ({
        ...v.doc,
        score: v.score,
    }));

    // Fallback if no results matched
    if (results.length === 0 && this.fileIndex.length > 0) {
        results = this.fileIndex.slice(0, topK).map(d => ({ ...d, score: 0.01 }));
    }

    // Domain vocab boost — tambahkan score kalau query match domain keyword
    for (const result of results) {
      for (const [domain, keywords] of Object.entries(this.domainVocab)) {
        const domainMatch = keywords.some((kw) => queryLower.includes(kw));
        const fileMatch = result.tags && result.tags.includes(domain);
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
   * Search knowledge with GraphRAG enrichment (1-hop/2-hop wikilink traversal)
   * @param {string} query
   * @param {Object} options
   * @param {number} options.topK - Number of initial seed notes (default: 3)
   * @param {number} options.maxHops - Max graph traversal hops (default: 1)
   * @param {number} options.maxNeighborsPerSeed - Max neighbors per seed (default: 3)
   * @param {number} options.maxTotalChars - Character budget (default: 4500)
   * @returns {Promise<{ query: string, seeds: Object[], connectedNotes: Object[], graphContextString: string }>}
   */
  async searchWithGraph(query, options = {}) {
    const topK = options.topK || 3;

    // 1. Ensure Graph Engine is ready (fast build from vault/cache without waiting for full vector embedding)
    if (!this.graphEngine.isBuilt) {
      await this.buildGraphOnly();
    }

    // 2. Hybrid Seeding: Combine Direct Entity/Tag Matching with Vector/TF-IDF Search
    const directMatches = this.graphEngine.findNodes(query);
    const combinedSeeds = [];
    const seenNodeIds = new Set();

    // Prioritize direct entity matches (exact/near match on title, alias, tags)
    for (const dm of directMatches) {
      const id = dm.id || this.graphEngine.normalizeId(dm.title);
      if (id && !seenNodeIds.has(id)) {
        seenNodeIds.add(id);
        combinedSeeds.push(dm);
      }
      if (combinedSeeds.length >= topK) break;
    }

    // Complement with semantic hybrid search (vector / TF-IDF) if seed budget allows
    if (combinedSeeds.length < topK) {
      try {
        const hybridResults = await this.search(query, topK);
        for (const hr of hybridResults) {
          const id = hr.id || this.graphEngine.normalizeId(path.basename(hr.file || hr.path || ""));
          if (id && !seenNodeIds.has(id) && this.graphEngine.nodes.has(id)) {
            seenNodeIds.add(id);
            combinedSeeds.push(this.graphEngine.nodes.get(id));
          } else if (id && !seenNodeIds.has(id)) {
            seenNodeIds.add(id);
            combinedSeeds.push(hr);
          }
          if (combinedSeeds.length >= topK) break;
        }
      } catch (searchErr) {
        // Graceful fallback if vector search has issues
      }
    }

    const traversal = this.graphEngine.traverse(combinedSeeds, {
      maxHops: options.maxHops || 1,
      maxNeighborsPerSeed: options.maxNeighborsPerSeed || 3,
      maxTotalChars: options.maxTotalChars || 4500,
    });

    return {
      query,
      seeds: traversal.seeds,
      connectedNotes: traversal.connectedNotes,
      graphContextString: traversal.graphContextString,
      stats: {
        directMatches: directMatches.length,
        totalSeeds: combinedSeeds.length,
        traversedNeighbors: traversal.connectedNotes.length,
      },
    };
  }

  /**
   * HyDE (Hypothetical Document Embeddings) Query Expansion (Pilar 4)
   * Synthesizes a high-probability technical code/doc snippet matching the user query
   * to bridge the vocabulary gap between short natural language questions and dense codebase notes.
   * @param {string} query
   * @param {string} domain
   * @returns {string}
   */
  generateHypotheticalDocument(query, domain = null) {
    const qLower = (query || "").toLowerCase();
    const snippets = [];

    // Determine domain category if not specified
    let matchedDomain = domain;
    if (!matchedDomain) {
      for (const [dom, kws] of Object.entries(this.domainVocab)) {
        if (kws.some(k => qLower.includes(k))) {
          matchedDomain = dom;
          break;
        }
      }
    }

    snippets.push(`# Technical Implementation Note: ${query.trim()}`);

    if (matchedDomain === "database" || qLower.includes("table") || qLower.includes("tabel") || qLower.includes("migration") || qLower.includes("migrasi") || qLower.includes("model")) {
      snippets.push(`## Schema & Eloquent Architecture
- Migration: Schema::create with proper foreignId('...')->constrained()->cascadeOnDelete()
- Indexes: composite indexes on frequently filtered columns
- Model: protected $fillable, typed casts, and inverse Eloquent relationships (hasMany, belongsTo)
\`\`\`php
Schema::create('entity_records', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->string('name')->index();
    $table->json('metadata')->nullable();
    $table->timestamps();
});
\`\`\``);
    } else if (matchedDomain === "ui-ux" || qLower.includes("livewire") || qLower.includes("blade") || qLower.includes("component")) {
      snippets.push(`## Livewire Reactive Component Architecture
- State: protected rules, lifecycle hooks (mount, updated)
- Interactivity: Alpine.js x-data, wire:model.live, wire:click actions
- View: semantic Tailwind CSS layout with dark mode classes
\`\`\`blade
<div x-data="{ open: false }" class="p-4 bg-slate-900 rounded-lg">
    <button wire:click="save" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
        Execute
    </button>
</div>
\`\`\``);
    } else if (matchedDomain === "security" || qLower.includes("auth") || qLower.includes("permission") || qLower.includes("role")) {
      snippets.push(`## Security & Authorization Policy
- Middleware: auth:sanctum, throttle rate-limiting
- Policy: Gate authorization checks via $this->authorize(...)
- CSRF & Sanitization: strictly validated request inputs
\`\`\`php
public function update(Request $request, Model $model) {
    $this->authorize('update', $model);
    $validated = $request->validate(['status' => 'required|string']);
}
\`\`\``);
    } else if (matchedDomain === "tdd" || qLower.includes("pest") || qLower.includes("test")) {
      snippets.push(`## TDD Scenario Specification (Pest PHP)
- Feature Test with arrange-act-assert pattern
- DatabaseRefresh trait, factory models, authenticated user state
\`\`\`php
it('validates business workflow under test', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->postJson('/api/resource', [...]);
    $response->assertStatus(200)->assertJson(['success' => true]);
});
\`\`\``);
    } else {
      snippets.push(`## Standard Architectural Contract
- Architecture: strict separation of concerns, single responsibility
- Interface: strongly typed contracts, error handling with custom exceptions
- Caching: Redis TTL caching for heavy operations`);
    }

    return snippets.join("\n\n");
  }

  /**
   * Search knowledge with HyDE query expansion (Pilar 4)
   * Combines user query with synthesized hypothetical technical document.
   * @param {string} query
   * @param {Object} options
   * @returns {Promise<Array>}
   */
  async searchWithHyDE(query, options = {}) {
    const topK = options.topK || 5;
    const hypotheticalDoc = this.generateHypotheticalDocument(query);
    const enrichedQuery = `${query}\n\n${hypotheticalDoc}`;

    // Perform hybrid search with enriched technical query
    const results = await this.search(enrichedQuery, topK);
    return results;
  }

  /**
   * Evaluates retrieval confidence for Corrective RAG (CRAG) (Pilar 4)
   * Calculates score based on top similarity, rank drop-off, and domain coverage.
   * @param {Array} results
   * @param {string} query
   * @returns {{ confidence: number, action: "DIRECT"|"ENRICH_GRAPH_HYDE"|"REFORMULATE_EXPAND", reasons: string[] }}
   */
  evaluateRetrievalConfidence(results, query) {
    if (!results || results.length === 0) {
      return {
        confidence: 0.0,
        action: "REFORMULATE_EXPAND",
        reasons: ["No matching documents found in index"]
      };
    }

    const topDoc = results[0];
    const topScore = topDoc.score || 0;
    const reasons = [];

    // Normalize score to 0..1 scale (RRF scores typically range 0.01..0.04)
    let normalizedScore = Math.min(1.0, topScore * 25);
    if (topDoc.simScore) {
      // If vector similarity score is available, combine it
      normalizedScore = Math.max(normalizedScore, topDoc.simScore);
    }

    // Keyword coverage check
    const qWords = (query || "").toLowerCase().split(/\s+/).filter(w => w.length > 2);
    let matchedKeywords = 0;
    const topContent = ((topDoc.content || "") + " " + (topDoc.file || "")).toLowerCase();
    for (const w of qWords) {
      if (topContent.includes(w)) matchedKeywords++;
    }
    const keywordRatio = qWords.length > 0 ? (matchedKeywords / qWords.length) : 0;
    
    // Confidence is a weighted composite of retrieval score and keyword ratio
    const confidence = parseFloat((normalizedScore * 0.6 + keywordRatio * 0.4).toFixed(3));

    if (confidence >= 0.60) {
      reasons.push(`High confidence match (${confidence}): Top document strongly aligns with query terms`);
      return { confidence, action: "DIRECT", reasons };
    } else if (confidence >= 0.35) {
      reasons.push(`Medium confidence match (${confidence}): Documents partially match, triggering HyDE & GraphRAG enrichment`);
      return { confidence, action: "ENRICH_GRAPH_HYDE", reasons };
    } else {
      reasons.push(`Low confidence match (${confidence}): Query terms scattered or ambiguous, triggering query reformulation & 2-hop expansion`);
      return { confidence, action: "REFORMULATE_EXPAND", reasons };
    }
  }

  /**
   * Corrective RAG (CRAG) with Self-Healing Retrieval Loop (Pilar 4)
   * Direct retrieval if confidence >= 0.60
   * HyDE + 1-hop Graph enrichment if 0.35 <= confidence < 0.60
   * Query Reformulation + 2-hop Graph expansion if confidence < 0.35
   * @param {string} query
   * @param {Object} options
   * @returns {Promise<Object>}
   */
  async searchWithCrag(query, options = {}) {
    const topK = options.topK || 4;
    console.log(`🧭 CRAG: Initiating Corrective RAG for query "${query}"...`);

    // Step 1: Initial Hybrid Retrieval
    let initialResults = await this.search(query, topK);

    // Step 2: Confidence Evaluation
    const evalResult = this.evaluateRetrievalConfidence(initialResults, query);
    console.log(`🧭 CRAG Confidence: ${evalResult.confidence} -> Action: [${evalResult.action}]`);

    // Branch 1: DIRECT (High Confidence)
    if (evalResult.action === "DIRECT") {
      return {
        query,
        cragAction: "DIRECT",
        confidenceScore: evalResult.confidence,
        documents: initialResults,
        seeds: initialResults.slice(0, 2),
        connectedNotes: [],
        finalContext: initialResults.map(d => `### ${d.file || d.heading || "Document"}\n${d.content}`).join("\n\n---\n\n")
      };
    }

    // Branch 2: ENRICH_GRAPH_HYDE (Medium Confidence / Ambiguous)
    if (evalResult.action === "ENRICH_GRAPH_HYDE") {
      console.log(`🧭 CRAG: Running HyDE query expansion and 1-hop Graph traversal...`);
      const hydeResults = await this.searchWithHyDE(query, { topK });
      const graphResult = await this.searchWithGraph(query, { topK: 2, maxHops: 1, maxTotalChars: 3500 });

      // Merge and deduplicate documents
      const mergedDocs = [];
      const seenIds = new Set();
      for (const d of [...initialResults, ...hydeResults]) {
        const id = d.chunkId || d.file || d.path;
        if (!seenIds.has(id)) {
          seenIds.add(id);
          mergedDocs.push(d);
        }
      }

      const combinedContext = [
        ...mergedDocs.slice(0, topK).map(d => `### ${d.file || d.heading || "Document"}\n${d.content}`),
        graphResult.graphContextString ? `### Graph Knowledge (Wikilink Relations)\n${graphResult.graphContextString}` : ""
      ].filter(Boolean).join("\n\n---\n\n");

      return {
        query,
        cragAction: "ENRICH_GRAPH_HYDE",
        confidenceScore: evalResult.confidence,
        documents: mergedDocs.slice(0, topK),
        seeds: graphResult.seeds,
        connectedNotes: graphResult.connectedNotes,
        finalContext: combinedContext
      };
    }

    // Branch 3: REFORMULATE_EXPAND (Low Confidence / Corrective Recovery)
    console.log(`🧭 CRAG: Low confidence detected. Triggering Query Reformulation & 2-hop Graph expansion...`);
    // Reformulate query: extract domain entities, strip noisy stop words
    const cleanTokens = query
      .replace(/[^a-zA-Z0-9_\-\s]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 2 && !["tolong", "buatkan", "lanjut", "bagaimana", "dengan", "untuk", "please", "make", "create"].includes(w.toLowerCase()));
    const reformulatedQuery = cleanTokens.join(" ");

    const expandedGraphResult = await this.searchWithGraph(reformulatedQuery || query, {
      topK: 3,
      maxHops: 2,
      maxNeighborsPerSeed: 4,
      maxTotalChars: 4500
    });

    const hydeDoc = this.generateHypotheticalDocument(reformulatedQuery || query);
    const retryDocs = await this.search(reformulatedQuery || query, topK);

    const recoveryContext = [
      `### Synthesized Architectural Baseline (HyDE Guidance)\n${hydeDoc}`,
      expandedGraphResult.graphContextString ? `### 2-Hop Graph Knowledge Network\n${expandedGraphResult.graphContextString}` : "",
      ...retryDocs.map(d => `### Retrieved Reference: ${d.file || d.heading}\n${d.content}`)
    ].filter(Boolean).join("\n\n---\n\n");

    return {
      query,
      reformulatedQuery,
      cragAction: "REFORMULATE_EXPAND",
      confidenceScore: evalResult.confidence,
      documents: retryDocs,
      seeds: expandedGraphResult.seeds,
      connectedNotes: expandedGraphResult.connectedNotes,
      finalContext: recoveryContext
    };
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
