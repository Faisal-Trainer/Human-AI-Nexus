// agent/core/GraphEngine.js
// NEXUS Graph Engine v1.0 — Obsidian Knowledge Graph & Wikilink-Aware Traversal
// Reconstructs the networked topology of markdown vaults into an in-memory graph.

const fs = require("fs-extra");
const path = require("path");

class GraphEngine {
  constructor(options = {}) {
    this.nodes = new Map(); // id -> Node
    this.edges = []; // [{ source, target, bidirectional, weight }]
    this.tagIndex = new Map(); // tag -> Set<nodeId>
    this.aliasIndex = new Map(); // alias -> nodeId
    this.isBuilt = false;
    this.cacheFile = options.cacheFile || null;
  }

  /**
   * Normalize note identifier to canonical ID
   * @param {string} raw
   * @returns {string}
   */
  normalizeId(raw) {
    if (!raw) return "";
    let clean = raw.trim();
    // Remove .md extension if present
    clean = clean.replace(/\.md$/i, "");
    // Remove folder path if only note name is linked (e.g. "Agent/Create" -> "create")
    clean = path.basename(clean).toLowerCase().trim();
    return clean;
  }

  /**
   * Parse frontmatter YAML and markdown body
   * @param {string} content
   * @returns {{ frontmatter: Object, body: string }}
   */
  parseMarkdown(content) {
    if (!content) return { frontmatter: {}, body: "" };

    const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
    const match = content.match(fmRegex);

    if (!match) {
      return { frontmatter: {}, body: content };
    }

    const yamlBlock = match[1];
    const body = match[2];
    const frontmatter = {};

    // Lightweight YAML line parser (avoids external heavy yaml dependencies)
    const lines = yamlBlock.split(/\r?\n/);
    let currentKey = null;
    let isArray = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      if (trimmed.startsWith("- ") && currentKey && isArray) {
        const val = trimmed.slice(2).trim().replace(/^['"]|['"]$/g, "");
        if (val) frontmatter[currentKey].push(val);
        continue;
      }

      const colonIdx = trimmed.indexOf(":");
      if (colonIdx > 0) {
        const key = trimmed.slice(0, colonIdx).trim();
        const rawVal = trimmed.slice(colonIdx + 1).trim();

        if (rawVal === "" || rawVal === "[]") {
          currentKey = key;
          isArray = true;
          frontmatter[key] = [];
        } else {
          currentKey = key;
          isArray = false;
          let val = rawVal.replace(/^['"]|['"]$/g, "");
          if (val.startsWith("[") && val.endsWith("]")) {
            frontmatter[key] = val
              .slice(1, -1)
              .split(",")
              .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
              .filter(Boolean);
          } else {
            frontmatter[key] = val;
          }
        }
      }
    }

    return { frontmatter, body };
  }

  /**
   * Extract wikilinks `[[Target]]` or `[[Target|Alias]]` from content
   * @param {string} content
   * @returns {Array<{ raw: string, target: string, alias: string|null }>}
   */
  extractWikilinks(content) {
    if (!content) return [];
    const links = [];
    // Match [[Target#heading|Display]] or [[Target|Display]] or [[Target]]
    const wikilinkRegex = /\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g;
    let m;
    while ((m = wikilinkRegex.exec(content)) !== null) {
      const target = m[1].trim();
      const alias = m[2] ? m[2].trim() : null;
      if (target) {
        links.push({
          raw: m[0],
          target: target,
          targetId: this.normalizeId(target),
          alias: alias,
        });
      }
    }
    return links;
  }

  /**
   * Extract hashtags `#tag/subtag` from content
   * @param {string} content
   * @returns {string[]}
   */
  extractTags(content) {
    if (!content) return [];
    const tags = new Set();
    const tagRegex = /(?:^|\s)#([a-zA-Z0-9_\-\/]+)/g;
    let m;
    while ((m = tagRegex.exec(content)) !== null) {
      const t = m[1].toLowerCase().trim();
      // Filter out pure hex colors like #fff or #000000
      if (!/^[0-9a-f]{3,6}$/i.test(t)) {
        tags.add(t);
      }
    }
    return Array.from(tags);
  }

  /**
   * Build the complete knowledge graph from an array of file entries
   * @param {Array<{ file: string, fullPath: string, source: string }>} fileEntries
   */
  async buildGraph(fileEntries = []) {
    this.nodes.clear();
    this.edges = [];
    this.tagIndex.clear();
    this.aliasIndex.clear();

    const rawLinkMap = new Map(); // nodeId -> Array of targetId

    // PASS 1: Create all nodes and collect raw outlinks
    for (const entry of fileEntries) {
      try {
        if (!fs.existsSync(entry.fullPath)) continue;
        const content = await fs.readFile(entry.fullPath, "utf8");
        const { frontmatter, body } = this.parseMarkdown(content);

        const basename = path.basename(entry.file, path.extname(entry.file));
        const id = this.normalizeId(basename);

        // Tags from frontmatter + body hashtags
        const fmTags = Array.isArray(frontmatter.tags)
          ? frontmatter.tags.map((t) => String(t).toLowerCase().trim())
          : typeof frontmatter.tags === "string"
            ? [frontmatter.tags.toLowerCase().trim()]
            : [];
        const bodyTags = this.extractTags(body);
        const combinedTags = Array.from(new Set([...fmTags, ...bodyTags]));

        // Aliases
        const aliases = Array.isArray(frontmatter.aliases)
          ? frontmatter.aliases.map((a) => String(a).trim())
          : typeof frontmatter.aliases === "string"
            ? [frontmatter.aliases.trim()]
            : [];

        // Title
        let title = frontmatter.title || null;
        if (!title) {
          const h1Match = body.match(/^#\s+(.+)$/m);
          title = h1Match ? h1Match[1].trim() : basename;
        }

        // Preview snippet (first non-empty 300 characters of body)
        const cleanBody = body.replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1");
        const firstParagraph = cleanBody
          .split(/\r?\n\r?\n/)
          .map((p) => p.trim())
          .find((p) => p.length > 20 && !p.startsWith("#") && !p.startsWith("-")) || "";
        const preview = firstParagraph.slice(0, 300).trim();
        const contentSnippet = cleanBody.replace(/\r?\n{3,}/g, "\n\n").slice(0, 800).trim();

        // Register Node
        const node = {
          id,
          title,
          file: entry.file,
          fullPath: entry.fullPath,
          source: entry.source,
          category: frontmatter.category || "general",
          tags: combinedTags,
          aliases,
          preview,
          contentSnippet,
          contentLength: content.length,
          outlinks: new Set(),
          backlinks: new Set(),
        };

        this.nodes.set(id, node);

        // Register alias lookups
        for (const alias of aliases) {
          this.aliasIndex.set(this.normalizeId(alias), id);
        }

        // Register tag index
        for (const tag of combinedTags) {
          if (!this.tagIndex.has(tag)) this.tagIndex.set(tag, new Set());
          this.tagIndex.get(tag).add(id);
        }

        // Extract wikilinks
        const wikilinks = this.extractWikilinks(content);
        const targetIds = wikilinks.map((wl) => wl.targetId);
        rawLinkMap.set(id, targetIds);
      } catch (err) {
        // Skip unreadable files gracefully
      }
    }

    // PASS 2: Link edges, resolve aliases, and populate backlinks
    for (const [sourceId, targetIds] of rawLinkMap.entries()) {
      const sourceNode = this.nodes.get(sourceId);
      if (!sourceNode) continue;

      for (let targetId of targetIds) {
        // Resolve alias if direct target doesn't match a node
        if (!this.nodes.has(targetId) && this.aliasIndex.has(targetId)) {
          targetId = this.aliasIndex.get(targetId);
        }

        const targetNode = this.nodes.get(targetId);
        if (targetNode && targetId !== sourceId) {
          sourceNode.outlinks.add(targetId);
          targetNode.backlinks.add(sourceId);

          // Check if bidirectional
          const isBidi = rawLinkMap.get(targetId)?.includes(sourceId) || false;

          this.edges.push({
            source: sourceId,
            target: targetId,
            bidirectional: isBidi,
            weight: isBidi ? 2.0 : 1.0,
          });
        }
      }
    }

    this.isBuilt = true;
    return this.getStats();
  }

  /**
   * Traverse graph from seed nodes with token-budget protection
   * @param {string[]|Array<{ id?: string, file?: string }>} seeds - Seed node IDs or file search results
   * @param {Object} options
   * @param {number} options.maxHops - Maximum depth (1 or 2, default: 1)
   * @param {number} options.maxNeighborsPerSeed - Max neighbors to expand per seed (default: 4)
   * @param {number} options.maxTotalChars - Max character budget for graph context (default: 4000)
   * @returns {{ seeds: Object[], connectedNotes: Object[], graphContextString: string }}
   */
  traverse(seeds, options = {}) {
    const maxHops = Math.min(options.maxHops || 1, 2);
    const maxNeighborsPerSeed = options.maxNeighborsPerSeed || 4;
    const maxTotalChars = options.maxTotalChars || 4500;

    const seedNodeIds = seeds
      .map((s) => {
        if (typeof s === "string") return this.normalizeId(s);
        if (s.id) return this.normalizeId(s.id);
        if (s.file) return this.normalizeId(path.basename(s.file));
        return null;
      })
      .filter((id) => id && this.nodes.has(id));

    const visited = new Set(seedNodeIds);
    const resolvedSeeds = seedNodeIds.map((id) => this.nodes.get(id));
    const connectedNotes = [];

    // Hop 1 Traversal
    for (const seedId of seedNodeIds) {
      const seedNode = this.nodes.get(seedId);
      if (!seedNode) continue;

      // Score neighbors: outlinks + backlinks
      const neighborCandidates = [];

      // Outlinks
      for (const outId of seedNode.outlinks) {
        if (!visited.has(outId)) {
          const neighbor = this.nodes.get(outId);
          if (neighbor) {
            const isBidi = neighbor.outlinks.has(seedId);
            const commonTags = seedNode.tags.filter((t) => neighbor.tags.includes(t)).length;
            const score = (isBidi ? 3.0 : 1.5) + commonTags * 0.5;
            neighborCandidates.push({
              node: neighbor,
              direction: isBidi ? "bidirectional" : "outlink",
              score,
              linkedBy: seedNode.title,
            });
          }
        }
      }

      // Backlinks
      for (const backId of seedNode.backlinks) {
        if (!visited.has(backId)) {
          const neighbor = this.nodes.get(backId);
          if (neighbor && !neighborCandidates.some((c) => c.node.id === backId)) {
            const commonTags = seedNode.tags.filter((t) => neighbor.tags.includes(t)).length;
            const score = 1.2 + commonTags * 0.5;
            neighborCandidates.push({
              node: neighbor,
              direction: "backlink",
              score,
              linkedBy: seedNode.title,
            });
          }
        }
      }

      // Sort candidates by connection score
      neighborCandidates.sort((a, b) => b.score - a.score);
      const topNeighbors = neighborCandidates.slice(0, maxNeighborsPerSeed);

      for (const item of topNeighbors) {
        visited.add(item.node.id);
        connectedNotes.push(item);
      }
    }

    // Build structured graph context string within character budget
    let graphContextString = "";
    let budgetLeft = maxTotalChars;

    if (resolvedSeeds.length > 0) {
      const header = `### 🌐 Knowledge Graph Traversal Context (Obsidian & Memory)\n\n`;
      graphContextString += header;
      budgetLeft -= header.length;

      // List Seeds with substantive architectural content
      const seedsHeader = `**Primary Architectural Focus (${resolvedSeeds.length} Seed Notes):**\n`;
      graphContextString += seedsHeader;
      budgetLeft -= seedsHeader.length;

      for (const seed of resolvedSeeds) {
        const tagStr = seed.tags.length > 0 ? ` [Tags: ${seed.tags.map((t) => `#${t}`).join(", ")}]` : "";
        const seedTitleLine = `- 📄 **[[${seed.title}]]** (${seed.file})${tagStr}\n`;
        const bodySnippet = seed.contentSnippet || seed.preview || "";
        const cleanSnippet = bodySnippet ? bodySnippet.replace(/\r?\n+/g, " ").slice(0, 450).trim() : "";
        const seedBody = cleanSnippet ? `  > "${cleanSnippet}..."\n` : "";

        const entryLen = seedTitleLine.length + seedBody.length;
        if (budgetLeft - entryLen < 100) {
          graphContextString += `  *(Remaining seed notes truncated to fit budget)*\n`;
          break;
        }
        graphContextString += seedTitleLine + seedBody;
        budgetLeft -= entryLen;
      }
      graphContextString += `\n`;

      // List Connected Notes with Outlink/Backlink relations and previews
      if (connectedNotes.length > 0 && budgetLeft > 150) {
        const connHeader = `**Connected Concepts via Wikilinks & Backlinks (${connectedNotes.length} Relational Neighbors):**\n`;
        graphContextString += connHeader;
        budgetLeft -= connHeader.length;

        for (const item of connectedNotes) {
          const connTagStr = item.node.tags.length > 0 ? ` (${item.node.tags.map((t) => `#${t}`).join(", ")})` : "";
          const header = `- 🔗 **[[${item.node.title}]]** [${item.direction} from ${item.linkedBy}]${connTagStr}\n`;

          let previewText = item.node.preview ? `  > "${item.node.preview.replace(/\r?\n+/g, " ").slice(0, 250).trim()}"\n` : "";

          const entryLength = header.length + previewText.length;
          if (budgetLeft - entryLength < 0) {
            graphContextString += `  *(Additional ${connectedNotes.length - connectedNotes.indexOf(item)} connected notes truncated to conserve context window)*\n`;
            break;
          }

          graphContextString += header + previewText;
          budgetLeft -= entryLength;
        }
      }
    }

    return {
      seeds: resolvedSeeds,
      connectedNotes,
      graphContextString: graphContextString.trim(),
    };
  }

  /**
   * Return comprehensive graph statistics
   */
  getStats() {
    let bidiCount = 0;
    for (const edge of this.edges) {
      if (edge.bidirectional) bidiCount++;
    }

    // Identify top central nodes (highest total degree)
    const nodeDegrees = Array.from(this.nodes.values()).map((n) => ({
      id: n.id,
      title: n.title,
      totalDegree: n.outlinks.size + n.backlinks.size,
      outlinks: n.outlinks.size,
      backlinks: n.backlinks.size,
      tags: n.tags,
    }));

    nodeDegrees.sort((a, b) => b.totalDegree - a.totalDegree);

    return {
      totalNodes: this.nodes.size,
      totalEdges: this.edges.length,
      bidirectionalEdges: bidiCount,
      totalTags: this.tagIndex.size,
      topHubs: nodeDegrees.slice(0, 10),
      isBuilt: this.isBuilt,
    };
  }

  /**
   * Search graph nodes by title, alias, or tag directly
   * @param {string} query
   * @returns {Object[]}
   */
  findNodes(query) {
    if (!query) return [];
    const q = query.toLowerCase().trim();
    const scoredMatches = [];

    // Stopwords filter for natural language conversational questions
    const STOPWORDS = new Set([
      "apa", "itu", "ini", "dan", "atau", "bagaimana", "dengan", "cara", "kerja", "yang", "di", "ke", "dari", "pada", "untuk",
      "what", "is", "are", "how", "does", "do", "the", "a", "an", "and", "or", "in", "on", "at", "to", "for", "with", "about"
    ]);

    const queryTokens = q
      .replace(/[^a-z0-9\s\-]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 1 && !STOPWORDS.has(t));

    for (const node of this.nodes.values()) {
      let score = 0;
      const titleLower = node.title.toLowerCase();
      const idLower = node.id.toLowerCase();

      // 1. Exact matches
      if (node.id === q || titleLower === q) {
        score = 100;
      } else if (node.aliases.some((a) => a.toLowerCase() === q)) {
        score = 90;
      } else if (node.id.startsWith(q) || titleLower.startsWith(q)) {
        score = 60;
      } else if (node.id.includes(q) || titleLower.includes(q)) {
        score = 40;
      } else if (q.includes(node.id) || (node.id.length > 3 && q.includes(idLower))) {
        score = 45;
      }

      // 2. Tokenized / Keyword matching
      for (const token of queryTokens) {
        if (idLower === token || titleLower === token) {
          score = Math.max(score, 70);
        } else if (idLower.includes(token) || titleLower.includes(token)) {
          score = Math.max(score, 40);
        } else if (node.aliases.some((a) => a.toLowerCase().includes(token))) {
          score = Math.max(score, 35);
        } else if (node.tags.some((t) => t.toLowerCase() === token || t.toLowerCase().includes(token))) {
          score = Math.max(score, 30);
        }
      }

      if (score > 0) {
        // Boost nodes with more connections (centrality boost)
        const degree = node.outlinks.size + node.backlinks.size;
        score += Math.min(degree, 20);
        scoredMatches.push({ node, score });
      }
    }

    scoredMatches.sort((a, b) => b.score - a.score);
    return scoredMatches.map((m) => m.node);
  }

  /**
   * Render ASCII tree visualization of a node and its connections
   * @param {string} rawId
   * @returns {string}
   */
  visualizeTree(rawId) {
    const id = this.normalizeId(rawId);
    const node = this.nodes.get(id);
    if (!node) return `❌ Node not found: "${rawId}"`;

    let out = `📄 [[${node.title}]] (${node.source})\n`;
    out += `   Tags: ${node.tags.map((t) => "#" + t).join(" ") || "(none)"}\n`;
    out += `   Outlinks (${node.outlinks.size}):\n`;
    for (const outId of node.outlinks) {
      const target = this.nodes.get(outId);
      const title = target ? target.title : outId;
      const bidi = target?.outlinks?.has(id) ? " ⮂ (bidirectional)" : "";
      out += `     ├── [[${title}]]${bidi}\n`;
    }
    out += `   Backlinks (${node.backlinks.size}):\n`;
    for (const backId of node.backlinks) {
      const src = this.nodes.get(backId);
      const title = src ? src.title : backId;
      out += `     └── [[${title}]]\n`;
    }

    return out;
  }

  /**
   * Export in-memory graph data to a JSON-serializable object
   */
  toJSON() {
    const nodesObj = {};
    for (const [id, node] of this.nodes.entries()) {
      nodesObj[id] = {
        ...node,
        outlinks: Array.from(node.outlinks),
        backlinks: Array.from(node.backlinks),
      };
    }
    return {
      builtAt: Date.now(),
      totalNodes: this.nodes.size,
      totalEdges: this.edges.length,
      nodes: nodesObj,
      edges: this.edges,
      aliases: Object.fromEntries(this.aliasIndex),
    };
  }

  /**
   * Import graph data from JSON
   */
  fromJSON(data) {
    if (!data || !data.nodes) return false;
    this.nodes.clear();
    this.edges = data.edges || [];
    this.tagIndex.clear();
    this.aliasIndex.clear();

    for (const [id, nodeData] of Object.entries(data.nodes)) {
      const node = {
        ...nodeData,
        outlinks: new Set(nodeData.outlinks || []),
        backlinks: new Set(nodeData.backlinks || []),
      };
      this.nodes.set(id, node);

      // Rebuild tagIndex
      for (const tag of node.tags || []) {
        if (!this.tagIndex.has(tag)) this.tagIndex.set(tag, new Set());
        this.tagIndex.get(tag).add(id);
      }
    }

    if (data.aliases) {
      for (const [alias, id] of Object.entries(data.aliases)) {
        this.aliasIndex.set(alias, id);
      }
    }

    this.isBuilt = true;
    return true;
  }

  async saveCache(cachePath) {
    if (!cachePath) return false;
    try {
      await fs.ensureDir(path.dirname(cachePath));
      await fs.writeJson(cachePath, this.toJSON(), { spaces: 2 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async loadCache(cachePath) {
    if (!cachePath || !(await fs.pathExists(cachePath))) return false;
    try {
      const data = await fs.readJson(cachePath);
      return this.fromJSON(data);
    } catch (e) {
      return false;
    }
  }
}

module.exports = GraphEngine;
