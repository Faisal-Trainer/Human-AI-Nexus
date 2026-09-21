const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");
const { spawn } = require("child_process");
const { AuditReport, ImplementationPlan } = require("./Contract");
const Modifier = require("./Modifier");
const LaravelArchitect = require("./LaravelArchitect");
const MemoryPipeline = require("./MemoryPipeline");
const TDDGuard = require("./../tools/TDDGuard");
const AssetEngine = require("./../tools/AssetEngine");
const Validator = require("./../tools/Validator");
const BugHunter = require("./../tools/BugHunter");
const Designer = require("./../tools/Designer");
const AccessibilityScanner = require("./../tools/AccessibilityScanner");
const SchemaGuard = require("./../tools/SchemaGuard");
const QueryOptimizer = require("./../tools/QueryOptimizer");
const WorktreeManager = require("./WorktreeManager");
const RootCauseAnalyzer = require("./../tools/RootCauseAnalyzer");
const Machinist = require("./Machinist");
const Distiller = require("./Distiller");
const TDDScaffolder = require("./../tools/TDDScaffolder");
const Logger = require("./Logger");
const MemoryGovernor = require("./MemoryGovernor");
const EventBus = require("./EventBus");
const SandboxExecutor = require("./SandboxExecutor");
const NexusClock = require("./NexusClock");
const Orchestrator = require("./Orchestrator");
const ResourceMonitor = require("./ResourceMonitor");
const EvolutionPiper = require("./EvolutionPiper");
const DecisionEngine = require("./DecisionEngine");
const SemanticEngine = require("./SemanticEngine");
const redis = require("./RedisMemory");
const localAI = require("./LocalIntelligence");
const AgentRegistry = require("./AgentRegistry");
const NexusError = require("./NexusError");
const CoreUtils = require("./phases/CoreUtils");
const ParallelRunner = require("./ParallelRunner");
const NativeBridge = require("./NativeBridge");
const ObsidianBridge = require("./ObsidianBridge");

const AuditPhase = require("./phases/AuditPhase");
const PlanningPhase = require("./phases/PlanningPhase");
const ImplementationPhase = require("./phases/ImplementationPhase");
const ExecutionPhase = require("./phases/ExecutionPhase");
const KnowledgePhase = require("./phases/KnowledgePhase");

/**
 * Lifecycle States as per system-spec.md
 */
const STATES = {
  INIT: "INIT",
  PROCESSING: "PROCESSING",
  EXECUTING: "EXECUTING",
  LOGGING: "LOGGING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
};

function deepMergeBlueprint(base, enhancement) {
  if (!enhancement) return base;
  const result = { ...base };
  
  const deterministicStringify = (obj) => {
    if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
    if (Array.isArray(obj)) return `[${obj.map(deterministicStringify).join(',')}]`;
    const sortedKeys = Object.keys(obj).sort();
    let str = '{';
    for (let i = 0; i < sortedKeys.length; i++) {
      const k = sortedKeys[i];
      str += `"${k}":${deterministicStringify(obj[k])}`;
      if (i < sortedKeys.length - 1) str += ',';
    }
    str += '}';
    return str;
  };

  for (const key in enhancement) {
    if (Array.isArray(enhancement[key])) {
      const combined = [...(base[key] || []), ...enhancement[key]];
      const unique = [];
      const seen = new Set();
      for (const item of combined) {
        const identifier = typeof item === 'object' && item !== null ? deterministicStringify(item) : item;
        if (!seen.has(identifier)) {
          seen.add(identifier);
          unique.push(item);
        }
      }
      result[key] = unique;
    } else if (typeof enhancement[key] === "object" && enhancement[key] !== null) {
      result[key] = deepMergeBlueprint(base[key] || {}, enhancement[key]);
    } else {
      result[key] = enhancement[key];
    }
  }
  return result;
}

/**
 * Robust JSON parser with auto-bracket repair for truncated LLM responses.
 */
function repairAndParseJson(raw) {
  if (!raw || typeof raw !== "string") return null;
  let str = raw.trim();

  // Strip TRUNCATED boundary guard if present
  str = str.replace(/\n?\.\.\.\[TRUNCATED BY BOUNDARY GUARD\]/g, "");

  // Strip markdown fences
  const codeBlockMatch = str.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (codeBlockMatch) {
    str = codeBlockMatch[1].trim();
  } else {
    str = str.replace(/^```(?:json|JSON)?\s*\n?/, "").replace(/\n?```\s*$/, "").trim();
  }

  // Find first {
  const firstBrace = str.indexOf("{");
  if (firstBrace === -1) return null;
  str = str.slice(firstBrace);

  // 1. Direct parse attempt
  try {
    return JSON.parse(str);
  } catch (_) {}

  // Strip line comments & block comments that LLMs sometimes insert
  str = str.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");

  // Clean LLM ellipses (dots) that break JSON syntax
  str = str.replace(/,\s*\.\.\.\s*(?=[}\]])/g, "");
  str = str.replace(/(?<=[{\[])\s*\.\.\.\s*,?/g, "");
  str = str.replace(/,\s*\.\.\./g, "");
  str = str.replace(/\.\.\./g, "");
  str = str.replace(/,\s*([}\]])/g, "$1");

  try {
    return JSON.parse(str);
  } catch (_) {}

  // 2. Regex matching attempt
  const match = str.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (_) {}
  }

  // 3. Auto-balancer & structure repair for truncated JSON
  let inString = false;
  let escape = false;
  let cleaned = "";
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (escape) {
      escape = false;
      cleaned += char;
      continue;
    }
    if (char === "\\") {
      escape = true;
      cleaned += char;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      cleaned += char;
      continue;
    }
    if (inString) {
      cleaned += char;
      continue;
    }

    // Outside string
    if (char === "{" || char === "[") {
      stack.push(char);
      cleaned += char;
    } else if (char === "}") {
      if (stack.length && stack[stack.length - 1] === "{") {
        stack.pop();
        cleaned += char;
      } else if (stack.length && stack[stack.length - 1] === "[") {
        // LLM emitted '}' while inside array '[' -> close array first
        stack.pop();
        cleaned += "]";
        if (stack.length && stack[stack.length - 1] === "{") {
          stack.pop();
          cleaned += "}";
        }
      }
    } else if (char === "]") {
      if (stack.length && stack[stack.length - 1] === "[") {
        stack.pop();
        cleaned += char;
      } else if (stack.length && stack[stack.length - 1] === "{") {
        // LLM emitted ']' while inside object '{' -> close object first
        stack.pop();
        cleaned += "}";
        if (stack.length && stack[stack.length - 1] === "[") {
          stack.pop();
          cleaned += "]";
        }
      }
    } else {
      cleaned += char;
    }
  }

  // If truncated inside string, close the quote
  if (inString) {
    cleaned += '"';
  }

  // Clean trailing incomplete tokens before closing (e.g. trailing comma or `"key": ` without value)
  cleaned = cleaned.replace(/,\s*$/g, "");
  cleaned = cleaned.replace(/(?:,\s*)?"[^"]*"\s*:\s*$/g, "");
  cleaned = cleaned.replace(/,\s*$/g, "");

  // Recompute accurate unclosed bracket stack on cleaned string
  const finalStack = [];
  inString = false;
  escape = false;
  for (let i = 0; i < cleaned.length; i++) {
    const c = cleaned[i];
    if (escape) { escape = false; continue; }
    if (c === "\\") { escape = true; continue; }
    if (c === '"') { inString = !inString; continue; }
    if (!inString) {
      if (c === "{" || c === "[") finalStack.push(c);
      else if (c === "}" && finalStack.length && finalStack[finalStack.length - 1] === "{") finalStack.pop();
      else if (c === "]" && finalStack.length && finalStack[finalStack.length - 1] === "[") finalStack.pop();
    }
  }

  // Strip trailing commas before closing brackets
  cleaned = cleaned.replace(/,\s*([}\]])/g, "$1").replace(/,\s*$/, "");

  // Close remaining brackets in reverse order
  while (finalStack.length > 0) {
    const last = finalStack.pop();
    if (last === "{") cleaned += "}";
    else if (last === "[") cleaned += "]";
  }

  cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Aggressive cleanup: progressively drop to the last valid closing bracket
    let lastValidIdx = Math.max(cleaned.lastIndexOf("}"), cleaned.lastIndexOf("]"));
    while (lastValidIdx > 0) {
      let sub = cleaned.slice(0, lastValidIdx + 1);
      if (!sub.endsWith("}")) sub += "}";
      try {
        return JSON.parse(sub);
      } catch (_) {
        lastValidIdx = Math.max(cleaned.lastIndexOf("}", lastValidIdx - 1), cleaned.lastIndexOf("]", lastValidIdx - 1));
      }
    }
    throw err;
  }
}


/**
 * NexusEngine - Core Orchestrator for the Human-AI Nexus Framework.
 */
class NexusEngine {
  // ⚡ OPTIMIZATION: Static caches shared across all NexusEngine instances
  // Persists across 100 sandbox projects within the same process
  static _globalMemoryCache = null;
  static _globalMemoryCacheExpiry = 0;
  static _skillContentCache = null;

  getEngineRoot() {
    let currentDir = path.resolve(this.rootPath);
    while (currentDir !== path.parse(currentDir).root) {
      if (fs.existsSync(path.join(currentDir, "agent", "core", "NexusEngine.js"))) {
         return currentDir;
      }
      currentDir = path.resolve(currentDir, "..");
    }
    return path.resolve(process.cwd());
  }

  constructor(config = {}) {
    this.rootPath = config.rootPath || process.cwd();

    const possibleNexusPath = path.join(this.rootPath, "nexus");
    this.nexusDataPath = fs.pathExistsSync(possibleNexusPath)
      ? possibleNexusPath
      : this.rootPath;

    const hasDocsFolder = fs.pathExistsSync(
      path.join(this.nexusDataPath, "docs"),
    );
    const docsBase = hasDocsFolder
      ? path.join(this.nexusDataPath, "docs")
      : this.nexusDataPath;

    // 🛡️ INTERNAL RESOURCE PATHS
    const engineBase = path.join(__dirname, "..");
    this.agentPath = path.join(engineBase, "prompts");
    this.skillPath = path.join(engineBase, "workflows");

    if (!fs.existsSync(this.agentPath)) {
      this.agentPath = path.join(this.nexusDataPath, "agent", "prompts");
      this.skillPath = path.join(this.nexusDataPath, "workflow");
    }

    // 📂 PROJECT DATA PATHS
    this.auditPath = CoreUtils.resolvePath(
      this.rootPath,
      this.nexusDataPath,
      docsBase,
      "memory",
      "raw",
      "audits",
    );
    this.logPath = CoreUtils.resolvePath(
      this.rootPath,
      this.nexusDataPath,
      docsBase,
      "logs",
    );
    this.planningPath = CoreUtils.resolvePath(
      this.rootPath,
      this.nexusDataPath,
      docsBase,
      "planning",
    );
    this.recordsPath = CoreUtils.resolvePath(
      this.rootPath,
      this.nexusDataPath,
      docsBase,
      "memory",
      "operational",
      "records",
    );
    this.summaryPath = CoreUtils.resolvePath(
      this.rootPath,
      this.nexusDataPath,
      docsBase,
      "memory",
      "raw",
      "reports",
    );
    this.knowledgePath = CoreUtils.resolvePath(
      this.rootPath,
      this.nexusDataPath,
      docsBase,
      "memory",
      "distilled",
    );
    this.algorithmsPath = CoreUtils.resolvePath(
      this.rootPath,
      this.nexusDataPath,
      docsBase,
      "algorithms",
    );

    this.architect = new LaravelArchitect(this.rootPath);
    this.activeAgents = new Set();
    this.skillRegistry = {};
    this.memory = [];
    this.metrics = {};
    this.state = STATES.INIT;

    this.modifier = new Modifier(this.rootPath);
    this.memoryPipeline = new MemoryPipeline(
      this.rootPath,
      this.knowledgePath,
      this.auditPath,
      this.planningPath,
    );
    this.tddGuard = new TDDGuard(this.rootPath);
    this.tddScaffolder = new TDDScaffolder(this.rootPath);
    this.assetEngine = new AssetEngine(this.rootPath);
    this.validator = new Validator(this.rootPath);
    this.bugHunter = new BugHunter(this.rootPath);
    // FIX #07 — Komponen mahal/jarang dipakai TIDAK diinstansiasi di constructor
    // Gunakan lazy getter di bawah class: designer, a11yScanner, queryOptimizer,
    // worktreeManager, evolutionPiper, native
    this.schemaGuard = new SchemaGuard(this.rootPath);
    this.rcAnalyzer = new RootCauseAnalyzer();
    this.machinist = new Machinist(this.rootPath, this.tddScaffolder);
    this.distiller = new Distiller(this.knowledgePath);
    this.decisionEngine = new DecisionEngine();
    this.parallel = ParallelRunner;

    this.currentAudit = null;
    this.currentPlan = null;
    this.activeRack = null;
    this.orchestrator = new Orchestrator(this.rootPath);
    this.redisConnected = false;
    this.ollamaAvailable = false;

    this.logger = new Logger(this.rootPath);
    this.memoryGovernor = new MemoryGovernor(this.rootPath);
    this.currentCorrelationId = `CORR-${Date.now()}`;
    this.resourceMonitor = new ResourceMonitor();
    this.sandbox = new SandboxExecutor();
    this.semanticEngine = new SemanticEngine(this.knowledgePath);
    this.localAI = localAI;
    this.agentRegistry = AgentRegistry;

    // 🧠 OBSIDIAN VAULT BRIDGE — Read-only knowledge integration
    this.obsidianBridge = new ObsidianBridge(this.rootPath);
    if (this.obsidianBridge.isActive()) {
      this.log(`🔗 Obsidian Vault connected: ${this.obsidianBridge.vaultPath}`, "info");
      // Pass all configured vault read sources to SemanticEngine for dual-source indexing & graph
      const addedPaths = new Set();
      for (const sourceKey of Object.keys(this.obsidianBridge.readSources || {})) {
        const resolved = this.obsidianBridge.resolveSource(sourceKey);
        if (resolved && !addedPaths.has(resolved)) {
          addedPaths.add(resolved);
          this.semanticEngine.addAdditionalPath(resolved);
        }
      }
    }

    // Initialize Specialized Phases
    this.auditPhase = new AuditPhase(this);
    this.planningPhase = new PlanningPhase(this);
    this.implementationPhase = new ImplementationPhase(this);
    this.executionPhase = new ExecutionPhase(this);
    this.knowledgePhase = new KnowledgePhase(this);

    this.initRedis().catch((err) =>
      this.log(`⚠️ Redis init error: ${err.message}`, "warning"),
    );
  }

  // FIX #07 — Lazy-init getters: komponen hanya dibuat saat pertama kali diakses
  get designer() {
    if (!this._designer) this._designer = new Designer();
    return this._designer;
  }
  get a11yScanner() {
    if (!this._a11yScanner)
      this._a11yScanner = new AccessibilityScanner(this.rootPath);
    return this._a11yScanner;
  }
  get queryOptimizer() {
    if (!this._queryOptimizer)
      this._queryOptimizer = new QueryOptimizer(this.rootPath);
    return this._queryOptimizer;
  }
  get worktreeManager() {
    if (!this._worktreeManager)
      this._worktreeManager = new WorktreeManager(this.rootPath);
    return this._worktreeManager;
  }
  get evolutionPiper() {
    if (!this._evolutionPiper) this._evolutionPiper = new EvolutionPiper(this);
    return this._evolutionPiper;
  }
  get native() {
    if (!this._native) this._native = new NativeBridge(this.rootPath);
    return this._native;
  }

  async initRedis() {
    try {
      await redis.connect();
      this.redisConnected = true;
      this.log("✅ Redis connected.", "success");
    } catch (e) {
      this.log(
        `⚠️ Redis unavailable: ${e.message}. Running in file-only mode.`,
        "warning",
      );
    }

    try {
      await localAI.checkAvailability();
      this.ollamaAvailable = true;
    } catch (e) {
      this.log(
        `⚠️ Ollama unavailable: ${e.message}. AI features disabled.`,
        "warning",
      );
    }
  }

  setRack(rackName) {
    if (rackName) {
      this.activeRack = rackName;
      this.log(`🎯 Engine Focus Shifted to Rack: ${rackName}`, "info");
    }
  }

  async discoverSkills() {
    this.log("📚 Discovering Skill Registry...", "info");
    const scanDir = async (dir, prefix = "") => {
      if (!(await fs.pathExists(dir))) return;
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await scanDir(
            fullPath,
            prefix ? `${prefix}/${entry.name}` : entry.name,
          );
        } else if (entry.name === "SKILL.md" || entry.name.endsWith(".md")) {
          const category = prefix || "uncategorized";
          if (!this.skillRegistry[category]) this.skillRegistry[category] = [];
          // Handle special SKILL.md convention from skills-lock.json
          const skillName =
            entry.name === "SKILL.md"
              ? prefix.split("/").pop()
              : entry.name.replace(".md", "");
          if (!this.skillRegistry[category].includes(skillName)) {
            this.skillRegistry[category].push(skillName);
          }
        }
      }
    };
    await scanDir(this.skillPath);

    // Load skills from .agents/skills (e.g. from skills-lock.json)
    const agentSkillsPath = path.join(this.rootPath, ".agents", "skills");
    if (await fs.pathExists(agentSkillsPath)) {
      await scanDir(agentSkillsPath, "external-skills");
    }

    return this.skillRegistry;
  }

  async discoverAgents() {
    this.log("🤖 Discovering Agent Registry...", "info");
    const agentRegistry = {};
    const scanDir = async (dir, prefix = "") => {
      if (!(await fs.pathExists(dir))) return;
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await scanDir(
            fullPath,
            prefix ? `${prefix}/${entry.name}` : entry.name,
          );
        } else if (entry.name.endsWith(".md")) {
          const category = prefix || "uncategorized";
          if (!agentRegistry[category]) agentRegistry[category] = [];
          agentRegistry[category].push(entry.name.replace(".md", ""));
        }
      }
    };
    await scanDir(this.agentPath);
    return agentRegistry;
  }

  async readMemory() {
    this.log("🧠 Accessing Memory HUB...", "info");

    // ⚡ OPTIMIZATION: Use cached memory if available and fresh (within 10 minutes)
    // Avoids 100× redundant vault scans + fast-glob during sandbox runs
    if (NexusEngine._globalMemoryCache && Date.now() < NexusEngine._globalMemoryCacheExpiry) {
      this.memory = NexusEngine._globalMemoryCache;
      this.log(`   ⚡ Memory loaded from cache (${this.memory.lessons.length} lessons)`, "success");
      return this.memory;
    }

    try {
      const sessionPath = path.join(
        this.rootPath,
        "memory",
        "short_term",
        "sessions",
      );
      await fs.ensureDir(sessionPath);
      await fs.ensureDir(this.knowledgePath);
      const records = await fs.readdir(sessionPath);

      // 🧠 OBSIDIAN BRIDGE: Merge local + vault knowledge files
      let allLessons = [];
      if (this.obsidianBridge.isActive()) {
        const merged = await this.obsidianBridge.getMergedFiles(
          this.knowledgePath,
          "knowledge",
          ["NEXUS_HUB_INDEX.md", "NEXUS_NEURAL_MAP.md"],
        );
        allLessons = merged;
        this.log(
          `   🔗 Vault merge: ${merged.filter(f => f.source === "obsidian-vault").length} vault + ${merged.filter(f => f.source === "local").length} local files`,
          "info",
        );
      } else {
        const fg = require("fast-glob");
        const localFiles = await fg("**/*.{md,MD}", {
          cwd: this.knowledgePath.replace(/\\/g, "/"),
          ignore: ["NEXUS_HUB_INDEX.md", "NEXUS_NEURAL_MAP.md"],
          onlyFiles: true,
        });
        allLessons = localFiles.map(f => ({
          file: f,
          fullPath: path.join(this.knowledgePath, f),
          source: "local",
        }));
      }

      const semanticIndex = {};
      const lessonNames = [];
      for (const entry of allLessons) {
        const tags = await this.getSemanticTags(entry.fullPath);
        tags.forEach((tag) => {
          if (!semanticIndex[tag]) semanticIndex[tag] = [];
          semanticIndex[tag].push(entry.file);
        });
        lessonNames.push(entry.file);
      }
      this.memory = {
        pastCycles: records.length,
        lessons: lessonNames,
        semanticIndex: semanticIndex,
      };
      this.log(
        `✅ Memory loaded: ${lessonNames.length} lessons indexed.`,
        "success",
      );

      // Cache for subsequent projects (10 min TTL)
      NexusEngine._globalMemoryCache = this.memory;
      NexusEngine._globalMemoryCacheExpiry = Date.now() + 600000;
    } catch (e) {
      this.log(`⚠️ Memory access issue: ${e.message}.`, "warning");
      this.memory = { pastCycles: 0, lessons: [], semanticIndex: {} };
    }
    return this.memory;
  }

  async getSemanticTags(filePath) {
    try {
      const content = await fs.readFile(filePath, "utf8");
      const regex =
        />\s*\*\*METADATA\s*\(NEXUS\s*SEMANTIC\s*TAGS\)\*\*:\s*\[(.*?)\]/gi;
      const matches = [...content.matchAll(regex)];
      const tags = new Set();
      for (const match of matches) {
        if (match[1]) {
          match[1].split(",").forEach((t) => tags.add(t.trim().toLowerCase()));
        }
      }
      return Array.from(tags);
    } catch (e) {}
    return [];
  }

  async searchKnowledge(query, topK = 5) {
    try {
      const results = await this.semanticEngine.search(query, topK);
      if (results.length > 0) return results.map((r) => r.file);
    } catch (e) {
      this.log(`⚠️ Vector search failed: ${e.message}`, "warning");
    }
    if (!this.memory.semanticIndex) await this.readMemory();
    return this.memory.semanticIndex[query.toLowerCase()] || [];
  }

  async searchKnowledgeGraph(query, options = {}) {
    try {
      return await this.semanticEngine.searchWithGraph(query, options);
    } catch (e) {
      this.log(`⚠️ Graph search failed: ${e.message}`, "warning");
      return { query, seeds: [], connectedNotes: [], graphContextString: "" };
    }
  }

  async searchKnowledgeHyde(query, options = {}) {
    try {
      return await this.semanticEngine.searchWithHyDE(query, options);
    } catch (e) {
      this.log(`⚠️ HyDE search failed: ${e.message}`, "warning");
      return [];
    }
  }

  async searchKnowledgeCrag(query, options = {}) {
    try {
      return await this.semanticEngine.searchWithCrag(query, options);
    } catch (e) {
      this.log(`⚠️ CRAG search failed: ${e.message}`, "warning");
      return { query, confidenceScore: 0, cragAction: "FALLBACK", documents: [], finalContext: "" };
    }
  }

  async loadAgent(agentName) {
    const findAgent = async (dir) => {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const res = path.resolve(dir, entry.name);
        if (entry.isDirectory()) {
          const found = await findAgent(res);
          if (found) return found;
        } else if (entry.name === `${agentName}.md`) {
          return res;
        }
      }
      return null;
    };
    const filePath = await findAgent(this.agentPath);
    if (filePath) {
      this.activeAgents.add(agentName);
      return await fs.readFile(filePath, "utf8");
    }
    throw new Error(`Agent ${agentName} not found.`);
  }

  log(message, type = "info") {
    const colors = {
      info: "\x1b[36m",
      success: "\x1b[32m",
      warning: "\x1b[33m",
      error: "\x1b[31m",
      reset: "\x1b[0m",
    };
    console.log(`${colors[type]}${message}${colors.reset}`);
    const level =
      type.toUpperCase() === "SUCCESS" ? "INFO" : type.toUpperCase();
    this.logger
      .log(
        "orchestration",
        level,
        "NexusEngine",
        "N/A",
        "SYSTEM_LOG",
        message,
        0,
        {},
        this.currentCorrelationId,
      )
      .catch(() => {});
  }

  // Modularized Delegation Methods
  async audit(targetPath = this.rootPath, options = {}) {
    return await this.auditPhase.run({ targetPath, ...options });
  }

  async plan(auditReport) {
    return await this.planningPhase.run(auditReport);
  }

  async implement() {
    return await this.implementationPhase.run();
  }

  async execute(plan) {
    return await this.executionPhase.run(plan);
  }

  async verify(plan) {
    return await this.executionPhase.verify(plan);
  }

  async cleanCodeAndVerify(projectPath = this.rootPath) {
    return await this.executionPhase.cleanCodeAndVerify(projectPath);
  }

  async harvest(sourcePath) {
    return await this.knowledgePhase.harvest(sourcePath);
  }

  async distill() {
    return await this.knowledgePhase.run();
  }

  async updateStatus() {
    return await this.knowledgePhase.updateStatus();
  }

  // FIX #17 — Global timeout 90 menit per cycle (ditingkatkan untuk local AI generation)
  // Jika audit/planning/execution hang (Ollama lambat dll), cycle di-abort otomatis
  async runCycle(options = {}) {
    const CYCLE_TIMEOUT_MS = 90 * 60 * 1000; // 90 menit
    const cyclePromise = this._doRunCycle(options);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () =>
          reject(
            new NexusError(
              "TIMEOUT",
              "Cycle exceeded 90 minutes — aborting to prevent permanent hang",
            ),
          ),
        CYCLE_TIMEOUT_MS,
      ),
    );
    return Promise.race([cyclePromise, timeoutPromise]);
  }

  async _doRunCycle(options = {}) {
    const startTime = Date.now();
    this.state = STATES.INIT;
    this.log(`\n--- Nexus Engine: Modularized Cycle Start ---`, "info");

    try {
      this.state = STATES.PROCESSING;
      await this.discoverSkills();
      await this.readMemory();

      await this.blueprintApp(options);

      const report = await this.audit(this.rootPath, options);
      const plan = await this.plan(report);

      this.state = STATES.EXECUTING;
      await this.implement();
      await this.execute(plan);

      await this.cleanCodeAndVerify();

      const cycleID = `CYCLE-${Date.now()}`;
      this.state = STATES.LOGGING;
      await this.verify(plan);
      await this.record(cycleID);

      this.state = STATES.COMPLETED;
      await this.generateCycleSummary(cycleID);
      this.log(
        `\n--- Nexus Engine: Cycle Complete (${Date.now() - startTime}ms) ---`,
        "info",
      );
    } catch (error) {
      this.state = STATES.FAILED;
      const nexusErr =
        error instanceof NexusError
          ? error
          : new NexusError("RUNTIME", error.message);
      this.log(`❌ Engine Critical Failure: ${nexusErr.message}`, "error");
      await this.logError(nexusErr);
    }
  }

  async _preloadSkillContents(skillNames) {
    if (NexusEngine._skillContentCache) return NexusEngine._skillContentCache;

    const cache = {};
    const engineRoot = this.getEngineRoot();
    for (const name of skillNames) {
      const skillPath = path.join(engineRoot, ".agents", "skills", name, "SKILL.md");
      if (await fs.pathExists(skillPath)) {
        cache[name] = await fs.readFile(skillPath, "utf8");
      }
    }
    NexusEngine._skillContentCache = cache;
    this.log(`   ⚡ Preloaded ${Object.keys(cache).length}/${skillNames.length} skill contents into memory cache.`, "info");
    return cache;
  }

  async blueprintApp(options = {}) {
    this.log(`🏗️ Phase 0.5: Blueprint & Scaffolding...`, "info");
    const readmePath = path.join(this.rootPath, "README.md");
    const blueprintPath = path.join(this.rootPath, "NEXUS_BLUEPRINT.json");

    const projectName = path.basename(this.rootPath);
    const globalCacheDir = path.join(
      this.getEngineRoot(),
      "memory",
      "operational",
      "blueprints",
    );
    const cachePath = path.join(globalCacheDir, `${projectName}.json`);

    let readmeContent = "";
    if (await fs.pathExists(readmePath)) {
      readmeContent = await fs.readFile(readmePath, "utf8");
    }

    const isNexusManaged =
      readmeContent.includes("Generated by Nexus") ||
      readmeContent.includes("Laravel") ||
      (options && options.isNewProject);
    if (!isNexusManaged) return;

    // FIX: Skip blueprint generation for the Nexus framework itself
    // Nexus is a Node.js AI framework, not a Laravel app — generating
    // Laravel migrations/seeders for it causes hallucinated output.
    const packageJsonPath = path.join(this.rootPath, "package.json");
    if (await fs.pathExists(packageJsonPath)) {
      try {
        const pkg = await fs.readJson(packageJsonPath);
        if (pkg.name === "nexus" || pkg.name === "nexus-ai") {
          this.log(
            `   ⏭️  Skipping blueprint generation — Nexus framework detected (not a Laravel target).`,
            "info",
          );
          return;
        }
      } catch (_) {}
    }

    // ⚡ SMART CACHE: Skip LLM generation if cached blueprint exists and README has not changed
    const readmeHash = crypto.createHash("md5").update(readmeContent).digest("hex");
    if (!options.forceRegen) {
      let cached = null;
      if (await fs.pathExists(cachePath)) {
        try {
          cached = await fs.readJson(cachePath);
        } catch (_) {}
      }

      // Fallback: check Obsidian Vault cache if local cache missed
      if ((!cached || cached._readmeHash !== readmeHash) && this.obsidianBridge && this.obsidianBridge.vaultPath) {
        const vaultCachePaths = [
          path.join(this.obsidianBridge.vaultPath, "chace nexus", "V1", "blueprints", `${projectName}.json`),
          path.join(this.obsidianBridge.vaultPath, "chace nexus", "blueprints", `${projectName}.json`),
          path.join(this.obsidianBridge.vaultPath, "NEXUS AI", "BLUEPRINT", "100 project", `${projectName}.json`),
        ];
        for (const vPath of vaultCachePaths) {
          if (await fs.pathExists(vPath)) {
            try {
              const vCached = await fs.readJson(vPath);
              if (vCached && (vCached._readmeHash === readmeHash || (vCached.models && vCached.schema))) {
                cached = vCached;
                cached._readmeHash = readmeHash;
                await fs.ensureDir(globalCacheDir);
                await fs.writeJson(cachePath, cached, { spaces: 2 });
                this.log(
                  `   🏛️ Blueprint restored from Obsidian Vault cache for ${projectName}.`,
                  "success",
                );
                break;
              }
            } catch (_) {}
          }
        }
      }

      if (cached && cached._readmeHash === readmeHash && cached.models && cached.schema) {
        this.log(
          `   ⚡ Blueprint cache HIT for ${projectName} (README unchanged) — skipping regeneration.`,
          "success",
        );
        await fs.writeJson(blueprintPath, cached, { spaces: 2 });

        // 🧠 Sync cached blueprint to Obsidian Vault (100 project & new)
        if (this.obsidianBridge && this.obsidianBridge.isActive()) {
          await this.obsidianBridge.saveBlueprint(projectName, cached, {
            readmeContent,
            isSandboxProject: true,
          });
        }
        return;
      }
    }

    if (await fs.pathExists(blueprintPath)) {
      this.log(
        `   🔄 Blueprint regeneration started for ${projectName}...`,
        "info",
      );
    }

    // 🌐 GRAPHRAG: Retrieve connected architectural patterns & Obsidian knowledge
    let graphContextSection = "";
    try {
      if (this.semanticEngine) {
        if (!this.semanticEngine.graphEngine.isBuilt) {
          await this.semanticEngine.buildGraphOnly();
        }
        const graphQuery = `${projectName} ${readmeContent.slice(0, 300)}`;
        const graphResult = await this.searchKnowledgeGraph(graphQuery, {
          topK: 3,
          maxHops: 1,
          maxNeighborsPerSeed: 3,
          maxTotalChars: 3500,
        });

        if (graphResult && graphResult.graphContextString) {
          this.log(
            `   🌐 GraphRAG: Injected ${graphResult.seeds.length} seed notes & ${graphResult.connectedNotes.length} relational notes from Obsidian Vault.`,
            "info"
          );
          graphContextSection = `\n${graphResult.graphContextString}\n\n`;
        }
      }
    } catch (graphErr) {
      this.log(`   ⚠️ GraphRAG context retrieval skipped: ${graphErr.message}`, "warning");
    }

    const prompt = `You are a Senior Software Architect. We are building a Laravel TALL Stack application.
Analyze the following project README carefully (paying attention to the project name, description, and tags):

${readmeContent}
${graphContextSection}
Identify all the essential features this application MUST have based on its name, tags, and the architectural context above.
For a 100% complete web app, you must generate a comprehensive architecture.

CRITICAL INSTRUCTION: DO NOT use placeholder names like "ModelName1" or "create_table_name1_table".
You MUST INVENT REAL, CONTEXT-APPROPRIATE names based on the project.
For example, if it's an e-commerce app, use "Product", "Order", "Customer". If it's a blog, use "Post", "Comment", "Tag".

Output strictly JSON with this exact structure (do not add any other keys, explanation, or markdown):
{
  "project_name": "...",
  "models": ["User", "YourRealModelName"],
  "schema": {
    "User": {
      "name": "string",
      "email": "string:unique",
      "password": "text",
      "role": "string:default(user)"
    }
  },
  "migrations": ["create_users_table", "create_your_real_tables_table"],
  "livewire_components": ["user-profile", "your-real-component"],
  "seeders": ["UserSeeder", "YourRealModelSeeder"],
  "factories": ["UserFactory", "YourRealModelFactory"],
  "routes": ["/dashboard", "/your-real-route"],
  "pivot_tables": [],
  "relationships": [{"model": "User", "type": "hasMany", "target": "YourRealModelName"}],
  "middleware": ["auth", "verified", "throttle:60,1"],
  "api_endpoints": [
    {"method": "GET", "path": "/api/v1/resource", "controller": "ResourceController@index", "middleware": ["auth:sanctum"]},
    {"method": "POST", "path": "/api/v1/resource", "controller": "ResourceController@store", "middleware": ["auth:sanctum"]}
  ],
  "security_policies": {
    "roles": ["admin", "user"],
    "permissions": ["manage-users", "view-dashboard"],
    "rate_limiting": {"api": "60,1", "auth": "5,1"},
    "middleware_map": {"/admin/*": ["auth", "role:admin"], "/dashboard": ["auth", "verified"]}
  },
  "async_jobs": [
    {"name": "ProcessReport", "queue": "default", "retry": 3, "backoff": 60}
  ],
  "ui_design_system": {
    "color_palette": {"primary": "#1e40af", "secondary": "#64748b", "accent": "#f59e0b", "background": "#f8fafc", "surface": "#ffffff"},
    "typography": {"heading_font": "Inter", "body_font": "Inter", "scale": "1.25"},
    "layout": "sidebar-main",
    "theme": "light",
    "component_style": "rounded-xl shadow-sm border border-gray-200"
  }
}`;
    let blueprint = null;
    const MAX_BLUEPRINT_ATTEMPTS = 3;
    for (let attempt = 1; attempt <= MAX_BLUEPRINT_ATTEMPTS; attempt++) {
      try {
        this.log(`   🧠 Blueprint generation attempt ${attempt}/${MAX_BLUEPRINT_ATTEMPTS} via LocalIntelligence...`, "info");
        const systemPrompt = "You are an elite TALL Stack Architect for the NEXUS AI framework. Output ONLY raw JSON.";
        const response = await localAI.generate(prompt, "generate_architecture", systemPrompt);
        if (!response) {
          this.log(`   ⚠️ LLM returned empty response on attempt ${attempt}.`, "warning");
          continue;
        }
        blueprint = repairAndParseJson(response);
        if (!blueprint || typeof blueprint !== "object") {
          throw new Error("Failed to parse or repair blueprint JSON from LLM response");
        }
        this.log(`   ✅ Blueprint JSON parsed successfully on attempt ${attempt}.`, "success");
        break; // Success — exit retry loop
      } catch (e) {
        this.log(`   ⚠️ Blueprint attempt ${attempt} failed: ${e.message}`, "warning");
        if (attempt === MAX_BLUEPRINT_ATTEMPTS) {
          this.log(`   🛟 All ${MAX_BLUEPRINT_ATTEMPTS} attempts failed. Generating fallback blueprint...`, "warning");
          blueprint = this._generateFallbackBlueprint(projectName, readmeContent);
        }
      }
    }

    if (!blueprint) return;

    try {

      // --- ARCHITECTURE COUNCIL LOGIC (BALANCED BATCHES) ---
      // Consolidated into 5 focused architectural layer prompts:
      // Batch 1: Foundation (Domain Analysis + Blueprint Architecture + DB Schema Optimizer)
      // Batch 2: Frontend & Routing (Livewire State Planner + Laravel Route Architect + Route Rules)
      // Batch 3: Security & API (Security/ACL + API/Integration Designer)
      // Batch 4: Async, DevOps & QA (Async Jobs + DevOps Infrastructure + QA Testing)
      // Batch 5: UI/UX Design System (Design Taste + High-End Visual + Minimalist UI)
      const batches = [
        {
          name: "Foundation Layer (Domain, Blueprint, DB Schema)",
          skills: [
            "domain-driven-design-thinker",
            "nexus-blueprint-architect",
            "database-schema-optimizer",
          ],
        },
        {
          name: "Frontend & Routing Layer (Livewire, Route Architect, Rules)",
          skills: [
            "livewire-state-planner",
            "laravel-route-architect",
            "nexus-route-laravel",
          ],
        },
        {
          name: "Security & API Layer (Security, ACL, API Designer)",
          skills: [
            "security-and-acl-architect",
            "api-and-integration-designer",
          ],
        },
        {
          name: "Async, DevOps & QA Layer (Jobs, Infrastructure, Testing)",
          skills: [
            "async-job-and-queue-architect",
            "devops-and-infrastructure-planner",
            "qa-testing-strategist",
          ],
        },
        {
          name: "UI/UX Design System Layer (Visual Design, Typography, Color)",
          skills: [
            "design-taste-frontend",
            "high-end-visual-design",
            "minimalist-ui",
          ],
        },
      ];

      const allSkillNames = batches.flatMap((b) => b.skills);
      const skillCache = await this._preloadSkillContents(allSkillNames);

      let appliedBatches = 0;
      for (const batch of batches) {
        try {
          let combinedRules = batch.skills
            .map((s) => skillCache[s])
            .filter(Boolean)
            .join("\n\n---\n\n");

          if (!combinedRules) {
            this.log(
              `   ⏭️ Skipping batch [${batch.name}] (no skill definitions found)`,
              "warning",
            );
            continue;
          }

          // Bound rules length to prevent overflowing the 4096 local inference context window
          if (combinedRules.length > 2500) {
            combinedRules =
              combinedRules.slice(0, 2500) +
              "\n...[Rules truncated to fit local context budget]";
          }

          this.log(`   🏗️ Invoking Council Batch: ${batch.name}...`, "info");
          const enhancementPrompt = `
${combinedRules}

Here is the current blueprint:
\`\`\`json
${JSON.stringify(blueprint)}
\`\`\`

Enhance it based on your architectural rules.
CRITICAL FORMAT RULES:
1. Output STRICTLY a valid JSON object containing only modified or added keys (e.g. models, routes, livewire_components, policies).
2. NEVER use ellipses "..." or comments anywhere. Output complete JSON structures only.
3. Start directly with { and end with }. Do not add markdown or conversational text.
`;
          let enhancedResponse = "";
          try {
            this.log(`   🧠 Invoking architect council batch via LocalIntelligence...`, "info");
            enhancedResponse = await localAI.generate(
              enhancementPrompt,
              "enhance_architecture",
              "You are an elite architect council. Output ONLY valid parseable JSON representation of the enhanced blueprint. Never use ellipses (...). Do not add markdown or explanations outside the JSON.",
              { maxTokens: 2048, timeoutMs: 75000 }
            );
          } catch (e) {
            this.log(`   ⚠️ Local architect batch failed: ${e.message}`, "warning");
          }

          if (enhancedResponse) {
            const enhancement = repairAndParseJson(enhancedResponse);
            if (enhancement && typeof enhancement === "object") {
              blueprint = deepMergeBlueprint(blueprint, enhancement);
              appliedBatches++;
              this.log(
                `   ✅ Blueprint successfully enhanced by [${batch.name}].`,
                "success",
              );
            } else {
              throw new Error("Invalid or unparseable JSON received from local intelligence.");
            }
          }
        } catch (err) {
          this.log(
            `   ⚠️ Failed to apply batch [${batch.name}]: ${err.message}`,
            "warning",
          );
        }
      }

      this.log(
        `   ✅ Architecture Council batches applied: ${appliedBatches}/${batches.length}`,
        "success",
      );
      // --- END ARCHITECTURE COUNCIL LOGIC ---

      // Schema Validation (G2-02) — Extended for enriched blueprint fields
      const BLUEPRINT_SCHEMA = {
        required: [
          "project_name",
          "models",
          "schema",
          "migrations",
          "livewire_components",
          "seeders",
          "factories",
        ],
        arrays: [
          "models",
          "migrations",
          "livewire_components",
          "seeders",
          "factories",
        ],
        // Optional array fields — injected with defaults if missing
        optionalArrays: [
          "routes",
          "middleware",
          "api_endpoints",
          "async_jobs",
        ],
        // Optional object fields — injected with defaults if missing
        optionalObjects: {
          security_policies: {
            roles: ["admin", "user"],
            permissions: [],
            rate_limiting: { api: "60,1", auth: "5,1" },
            middleware_map: {},
          },
          ui_design_system: {
            color_palette: { primary: "#1e40af", secondary: "#64748b", accent: "#f59e0b", background: "#f8fafc", surface: "#ffffff" },
            typography: { heading_font: "Inter", body_font: "Inter", scale: "1.25" },
            layout: "sidebar-main",
            theme: "light",
            component_style: "rounded-xl shadow-sm border border-gray-200",
          },
        },
        strings: ["project_name"],
      };

      // Inject defaults for optional arrays if missing
      for (const key of BLUEPRINT_SCHEMA.optionalArrays) {
        if (!(key in blueprint)) {
          blueprint[key] = [];
        }
      }
      // Inject defaults for optional objects if missing
      for (const [key, defaultValue] of Object.entries(BLUEPRINT_SCHEMA.optionalObjects)) {
        if (!(key in blueprint) || typeof blueprint[key] !== "object") {
          blueprint[key] = defaultValue;
        }
      }

      for (const key of BLUEPRINT_SCHEMA.required) {
        if (!(key in blueprint))
          throw new Error(`Blueprint missing required key: ${key}`);
      }
      for (const key of BLUEPRINT_SCHEMA.arrays) {
        if (!Array.isArray(blueprint[key]))
          throw new Error(`Blueprint key "${key}" must be array`);
        // Sanitize: allow alphanumeric + underscore + hyphen for Livewire components, strict alphanumeric + underscore for models/migrations
        const isComponent = key === "livewire_components";
        const regex = isComponent
          ? /^[a-zA-Z0-9_-]+$/
          : /^[a-zA-Z_][a-zA-Z0-9_]*$/;
        blueprint[key] = blueprint[key].filter(
          (v) => typeof v === "string" && regex.test(v),
        );
      }
      if (typeof blueprint.project_name !== "string") {
        blueprint.project_name = String(blueprint.project_name || "nexus_app");
      }
      blueprint.project_name = blueprint.project_name.replace(
        /[^a-zA-Z0-9_-]/g,
        "",
      );

      // Domain-specific schema validations
      if (blueprint.project_name.includes("url-shortener") || blueprint.project_name.includes("url_shortener")) {
        const hasRedirectRoute = blueprint.routes && blueprint.routes.some(r => r.includes("{shortCode}") || r.includes("{code}") || r.includes("{short_code}"));
        if (!hasRedirectRoute) {
           this.log(`   ⚠️ Domain Validation Warning: URL Shortener is missing a /{shortCode} redirect route. Injecting fallback...`, "warning");
           blueprint.routes.push("/{shortCode}");
        }
      }

      // Attach README hash for smart caching
      blueprint._readmeHash = readmeHash;

      await fs.writeJson(blueprintPath, blueprint, { spaces: 2 });

      // Cache globally for future runs
      await fs.ensureDir(globalCacheDir);
      await fs.writeJson(cachePath, blueprint, { spaces: 2 });

      // 🧠 VAULT SYNC: Save to Obsidian Vault (new, archive, 100 project, 3 qwen for CUDA Google Colab)
      if (this.obsidianBridge && this.obsidianBridge.isActive()) {
        const modelName = process.env.NEXUS_MODEL_NAME || "qwen2.5-coder-3b";
        await this.obsidianBridge.saveBlueprint(projectName, blueprint, {
          modelName,
          readmeContent,
          isSandboxProject: true,
        });
        this.log(
          `   🧠 Blueprint synced to Obsidian Vault (new, archive, 100 project, 3 qwen for CUDA Colab).`,
          "success",
        );
      }

      this.log(
        `   ✅ Blueprint generated, validated, and cached globally.`,
        "success",
      );
    } catch (e) {
      this.log(`   ❌ Blueprint failed: ${e.message}`, "error");
    }
  }

  /**
   * FIX #30 — Generate a minimal fallback blueprint when LLM fails to produce valid JSON.
   * Ensures pipeline can continue even if AI generation is unavailable.
   */
  _generateFallbackBlueprint(projectName, readmeContent) {
    this.log(`   🛟 Generating deterministic fallback blueprint for: ${projectName}`, "warning");
    
    // Derive sensible model names from project name
    const cleanName = projectName
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .split(" ")
      .filter(w => !['app', 'system', 'platform', 'ui', 'web'].includes(w.toLowerCase()));
    
    const primaryModel = cleanName
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("") || "Item";
    
    const tableName = primaryModel
      .replace(/([A-Z])/g, "_$1")
      .toLowerCase()
      .replace(/^_/, "") + "s";

    return {
      project_name: projectName,
      models: ["User", primaryModel],
      schema: {
        User: {
          name: "string",
          email: "string:unique",
          password: "text",
          role: "string:default(user)",
        },
        [primaryModel]: {
          title: "string",
          description: "text:nullable",
          user_id: "foreignUuid:constrained",
          is_active: "boolean:default(true)",
        },
      },
      migrations: ["create_users_table", `create_${tableName}_table`],
      livewire_components: [`${projectName}-dashboard`, `${projectName}-manager`],
      seeders: ["UserSeeder", `${primaryModel}Seeder`],
      factories: ["UserFactory", `${primaryModel}Factory`],
      routes: ["/dashboard", `/${tableName}`],
      pivot_tables: [],
      relationships: [
        { model: "User", type: "hasMany", target: primaryModel },
        { model: primaryModel, type: "belongsTo", target: "User" },
      ],
      middleware: ["auth", "verified"],
      api_endpoints: [
        { method: "GET", path: `/api/v1/${tableName}`, controller: `${primaryModel}Controller@index`, middleware: ["auth:sanctum"] },
        { method: "POST", path: `/api/v1/${tableName}`, controller: `${primaryModel}Controller@store`, middleware: ["auth:sanctum"] },
      ],
      security_policies: {
        roles: ["admin", "user"],
        permissions: [`manage-${tableName}`, "view-dashboard"],
        rate_limiting: { api: "60,1", auth: "5,1" },
        middleware_map: {},
      },
      async_jobs: [],
      ui_design_system: {
        color_palette: { primary: "#1e40af", secondary: "#64748b", accent: "#f59e0b", background: "#f8fafc", surface: "#ffffff" },
        typography: { heading_font: "Inter", body_font: "Inter", scale: "1.25" },
        layout: "sidebar-main",
        theme: "light",
        component_style: "rounded-xl shadow-sm border border-gray-200",
      },
    };
  }

  async record(cycleID) {
    this.log("📝 Phase 4: Finalization & Records...", "info");
    const sessionPath = path.join(
      this.rootPath,
      "memory",
      "short_term",
      "sessions",
    );
    await fs.ensureDir(sessionPath);
    const sessionFile = path.join(sessionPath, `session_${Date.now()}.json`);
    await fs.writeJson(
      sessionFile,
      {
        cycle: cycleID,
        audit: this.currentAudit?.id,
        plan: this.currentPlan?.id,
        timestamp: NexusClock.getISOTimestamp(),
      },
      { spaces: 2 },
    );
    await this.memoryPipeline.optimize();
  }

  async generateCycleSummary(cycleID) {
    const summary = {
      cycleID,
      timestamp: NexusClock.getISOTimestamp(),
      finalState: this.state,
      metrics: this.metrics,
      agentsInvolved: Array.from(this.activeAgents),
    };
    await fs.ensureDir(this.summaryPath);
    await fs.writeJson(
      path.join(this.summaryPath, `cycle_summary_${cycleID}.json`),
      summary,
      { spaces: 2 },
    );
  }

  async logError(err) {
    const errorLog = path.join(this.summaryPath, "error_log.json");
    let logs = [];
    try {
      if (await fs.pathExists(errorLog)) logs = await fs.readJson(errorLog);
      logs.push({
        phase: err.phase,
        state: this.state,
        message: err.message,
        timestamp: err.timestamp,
        stack: err.stack,
      });
      await fs.writeJson(errorLog, logs, { spaces: 2 });
    } catch (e) {}
  }

  async getSystemStatus() {
    const stress = await this.resourceMonitor.checkStress();
    const agentHealth = this.agentRegistry
      ? this.agentRegistry.getHealthReport()
      : null;
    console.log(
      `\n--- NEXUS STATUS: ${stress.metrics.mem_usage_pct}% RAM | ${stress.metrics.cpu_usage_pct}% CPU ---\n`,
    );
    return { stress, agentHealth };
  }

  wrapAsConditional(existing, added, context = "Nexus Knowledge") {
    const similarity = this.calculateSimilarity(existing, added);

    if (similarity > 0.75) {
      return `\n# NEXUS KNOWLEDGE CONSOLIDATED: ${context}\n${added}\n`;
    }

    // G2-03: Collision Accumulation Prevention
    if (
      existing.includes("NEXUS COLLISION RESOLVED") ||
      existing.includes("Opsi A:")
    ) {
      const regexA = /Opsi A:\s*\n([\s\S]*?)(?=\nOpsi B:)/i;
      const regexB = /Opsi B:\s*\n([\s\S]*?)(?=\n#|$)/i;
      const matchA = existing.match(regexA);
      const matchB = existing.match(regexB);

      const optA = matchA ? matchA[1].trim() : "";
      const optB = matchB ? matchB[1].trim() : "";
      const optC = added.trim();

      const scoreOption = (content) => {
        if (!content) return 0;
        let score = content.length * 0.1;
        if (content.includes("**METADATA")) score += 100;
        if (content.includes("# ")) score += 50;
        return score;
      };

      const options = [
        { id: "A", content: optA, score: scoreOption(optA) },
        { id: "B", content: optB, score: scoreOption(optB) },
        { id: "C", content: optC, score: scoreOption(optC) },
      ];

      options.sort((x, y) => y.score - x.score);
      const winnerContent = options[0].content;

      return `\n# NEXUS KNOWLEDGE CONSOLIDATED: ${context}\n${winnerContent}\n`;
    }

    return `\n# NEXUS COLLISION RESOLVED: ${context}\nOpsi A:\n${existing}\nOpsi B:\n${added}\n`;
  }

  /**
   * Extract domain tags from an agent prompt file by analyzing:
   * - The agent's filename (e.g., 'cyber-security' → ['cyber', 'security'])
   * - The # ROLE heading
   * - The ## Fokus / Focus section content
   * - Known keyword patterns in the first 2000 chars
   */
  _extractAgentTags(agentName, promptContent) {
    const tags = new Set();

    // 1. Tags from filename (split on hyphens)
    agentName.split("-").forEach((part) => {
      if (part.length > 1) tags.add(part.toLowerCase());
    });

    // 2. Tags from ROLE heading
    const roleMatch = promptContent.match(/^#\s+ROLE:\s*(.+)/im);
    if (roleMatch) {
      roleMatch[1]
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .split(/[\s-]+/)
        .filter((w) => w.length > 2)
        .forEach((w) => tags.add(w));
    }

    // 3. Tags from Focus/Fokus section
    const focusRegex = new RegExp(
      "##\\s*(?:\\d+\\.\\s*)?(?:Fokus|Focus(?:\\s+(?:Utama|Area))?)\\s*\\n([\\s\\S]*?)(?=\\n##|\\n---|\\n$)",
      "i",
    );
    const focusMatch = promptContent.match(focusRegex);
    if (focusMatch) {
      focusMatch[1]
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .split(/[\s-]+/)
        .filter((w) => w.length > 2)
        .forEach((w) => tags.add(w));
    }

    // 4. Keyword extraction from content (first 2000 chars)
    const snippet = promptContent.substring(0, 2000).toLowerCase();
    const DOMAIN_KEYWORDS = [
      "security",
      "cyber",
      "auth",
      "cryptography",
      "protection",
      "permission",
      "encryption",
      "database",
      "migration",
      "eloquent",
      "sql",
      "query",
      "schema",
      "model",
      "documentation",
      "readme",
      "doc",
      "tdd",
      "testing",
      "test",
      "sandbox",
      "assertion",
      "qa",
      "performance",
      "seo",
      "speed",
      "optimization",
      "cache",
      "cdn",
      "lighthouse",
      "ui",
      "ux",
      "frontend",
      "blade",
      "design",
      "tailwind",
      "responsive",
      "accessibility",
      "a11y",
      "css",
      "html",
      "javascript",
      "typescript",
      "react",
      "vue",
      "angular",
      "svelte",
      "git",
      "vcs",
      "version",
      "branch",
      "worktree",
      "commit",
      "laravel",
      "livewire",
      "inertia",
      "filament",
      "alpine",
      "api",
      "rest",
      "graphql",
      "websocket",
      "streaming",
      "docker",
      "devops",
      "ci",
      "deployment",
      "nginx",
      "apache",
      "ssl",
      "mobile",
      "android",
      "ios",
      "capacitor",
      "pwa",
      "email",
      "notification",
      "sms",
      "whatsapp",
      "payment",
      "midtrans",
      "subscription",
      "monetization",
      "image",
      "media",
      "upload",
      "asset",
      "optimization",
      "branding",
      "brand",
      "creative",
      "copywriter",
      "marketing",
      "chrome",
      "extension",
      "web3",
      "blockchain",
      "wasm",
      "redis",
      "caching",
      "queue",
      "job",
      "event",
      "log",
      "monitoring",
      "sentry",
      "error",
      "debug",
      "refactor",
      "architecture",
      "pattern",
      "component",
      "oauth",
      "jwt",
      "sanctum",
      "passport",
      "role",
      "i18n",
      "timezone",
      "locale",
      "currency",
      "search",
      "algolia",
      "elasticsearch",
      "fulltext",
    ];
    DOMAIN_KEYWORDS.forEach((kw) => {
      if (snippet.includes(kw)) tags.add(kw);
    });

    // Remove overly generic words
    [
      "yang",
      "dan",
      "untuk",
      "dari",
      "dengan",
      "ini",
      "anda",
      "akan",
      "human",
      "nexus",
      "agent",
      "role",
      "senior",
      "specialist",
      "engineer",
    ].forEach((w) => tags.delete(w));

    return Array.from(tags);
  }

  /**
   * Extract metadata from a skill file (workflow .md or SKILL.md)
   * Returns { name, description, tags, source }
   */
  _extractSkillMeta(filePath, content) {
    const name = path
      .basename(filePath, ".md")
      .replace(/^SKILL$/i, path.basename(path.dirname(filePath)));
    const tags = new Set();

    // 1. Tags from filename and parent directory names
    const relParts = filePath.replace(/\\/g, "/").split("/");
    relParts.forEach((part) => {
      part
        .replace(/\.md$/i, "")
        .split("-")
        .forEach((seg) => {
          if (seg.length > 2) tags.add(seg.toLowerCase());
        });
    });

    // 2. Parse YAML frontmatter (for .agents/skills SKILL.md files)
    let description = "";
    const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (fmMatch) {
      const nameMatch = fmMatch[1].match(/^name:\s*(.+)/m);
      const descMatch = fmMatch[1].match(/^description:\s*(.+)/m);
      if (nameMatch) {
        nameMatch[1]
          .trim()
          .split(/[-\s]+/)
          .forEach((w) => {
            if (w.length > 2) tags.add(w.toLowerCase());
          });
      }
      if (descMatch) {
        description = descMatch[1].trim();
        // Extract keywords from description
        description
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, " ")
          .split(/[\s-]+/)
          .filter((w) => w.length > 3)
          .forEach((w) => tags.add(w));
      }
    }

    // 3. Extract from NEXUS SEMANTIC TAGS
    const tagRegex =
      />\s*\*\*METADATA\s*\(NEXUS\s*SEMANTIC\s*TAGS\)\*\*:\s*\[(.*?)\]/gi;
    const tagMatches = [...content.matchAll(tagRegex)];
    for (const match of tagMatches) {
      if (match[1]) {
        match[1].split(",").forEach((t) => {
          const tt = t.trim().toLowerCase();
          if (tt.length > 1) tags.add(tt);
        });
      }
    }

    // 4. Extract from first heading for summary if no frontmatter description
    if (!description) {
      const headingMatch = content.match(/^#\s+(.+)/m);
      if (headingMatch) description = headingMatch[1].trim();
    }

    // 5. Extract meaningful keywords from the first 1000 chars of content
    const snippet = content.substring(0, 1000).toLowerCase();
    const SKILL_KEYWORDS = [
      "security",
      "database",
      "testing",
      "performance",
      "seo",
      "ui",
      "ux",
      "frontend",
      "backend",
      "design",
      "branding",
      "brand",
      "css",
      "html",
      "javascript",
      "react",
      "tailwind",
      "animation",
      "motion",
      "responsive",
      "mobile",
      "chrome",
      "extension",
      "devops",
      "docker",
      "deployment",
      "api",
      "graphql",
      "rest",
      "websocket",
      "laravel",
      "livewire",
      "blade",
      "eloquent",
      "image",
      "visual",
      "creative",
      "typography",
      "layout",
      "accessibility",
      "a11y",
      "marketing",
      "copywriter",
      "monetization",
      "payment",
      "subscription",
      "git",
      "vcs",
      "version",
      "architecture",
      "pattern",
      "component",
      "email",
      "notification",
      "search",
      "cache",
      "redis",
      "queue",
      "web3",
      "blockchain",
      "wasm",
      "pwa",
      "android",
      "ios",
      "auth",
      "oauth",
      "jwt",
      "role",
      "permission",
      "encryption",
      "monitoring",
      "logging",
      "error",
      "debug",
      "refactor",
      "i18n",
      "timezone",
      "currency",
      "locale",
    ];
    SKILL_KEYWORDS.forEach((kw) => {
      if (snippet.includes(kw)) tags.add(kw);
    });

    // Remove overly generic words
    [
      "the",
      "and",
      "for",
      "with",
      "that",
      "this",
      "from",
      "your",
      "skill",
      "nexus",
      "human",
      "yang",
      "dan",
      "untuk",
      "dari",
      "dengan",
    ].forEach((w) => tags.delete(w));

    return {
      name: name,
      description: description.substring(0, 500),
      tags: Array.from(tags),
      source: filePath,
    };
  }

  /**
   * Scan all skill sources and return an array of skill metadata objects.
   * Sources: agent/workflows/, .agents/skills/, memory/distilled/
   */
  async _scanAllSkillSources() {
    const fg = require("fast-glob");
    const skills = [];

    // Source 1: agent/workflows/ (internal + external skill files)
    const workflowBasePath = this.skillPath;
    if (await fs.pathExists(workflowBasePath)) {
      const normalizedWf = workflowBasePath.replace(/\\/g, "/");
      const wfFiles = fg.sync("**/*.{md,MD}", {
        cwd: normalizedWf,
        onlyFiles: true,
      });
      for (const file of wfFiles) {
        try {
          const fullPath = path.join(workflowBasePath, file);
          const content = await fs.readFile(fullPath, "utf8");
          const meta = this._extractSkillMeta(fullPath, content);
          meta.sourceType = "workflow";
          meta.relativePath = `agent/workflows/${file}`;
          skills.push(meta);
        } catch (err) {
          this.log(
            `   ⚠️ Failed to read workflow skill ${file}: ${err.message}`,
            "warning",
          );
        }
      }
    }

    // Source 2: .agents/skills/ (external SKILL.md files)
    const externalSkillsPath = path.join(this.rootPath, ".agents", "skills");
    if (await fs.pathExists(externalSkillsPath)) {
      const normalizedExt = externalSkillsPath.replace(/\\/g, "/");
      // Only scan top-level SKILL.md per skill folder
      const extDirs = await fs.readdir(externalSkillsPath, {
        withFileTypes: true,
      });
      for (const dir of extDirs) {
        if (!dir.isDirectory()) continue;
        const skillMdPath = path.join(externalSkillsPath, dir.name, "SKILL.md");
        if (await fs.pathExists(skillMdPath)) {
          try {
            const content = await fs.readFile(skillMdPath, "utf8");
            const meta = this._extractSkillMeta(skillMdPath, content);
            meta.sourceType = "external-skill";
            meta.relativePath = `.agents/skills/${dir.name}/SKILL.md`;
            skills.push(meta);
          } catch (err) {
            this.log(
              `   ⚠️ Failed to read external skill ${dir.name}: ${err.message}`,
              "warning",
            );
          }
        }
      }
    }

    // Source 3: memory/distilled/ (wisdom nodes) — merged with Obsidian Vault
    const mergedDistilled = this.obsidianBridge.isActive()
      ? await this.obsidianBridge.getMergedFiles(
          this.knowledgePath,
          "knowledge",
          ["NEXUS_HUB_INDEX.md", "NEXUS_NEURAL_MAP.md"],
        )
      : (await fs.pathExists(this.knowledgePath))
        ? fg.sync("**/*.{md,MD}", {
            cwd: this.knowledgePath.replace(/\\/g, "/"),
            ignore: ["NEXUS_HUB_INDEX.md", "NEXUS_NEURAL_MAP.md"],
            onlyFiles: true,
          }).map(f => ({ file: f, fullPath: path.join(this.knowledgePath, f), source: "local" }))
        : [];

    for (const entry of mergedDistilled) {
      try {
        const content = await fs.readFile(entry.fullPath, "utf8");
        const meta = this._extractSkillMeta(entry.fullPath, content);
        meta.sourceType = entry.source === "obsidian-vault" ? "vault-knowledge" : "distilled";
        meta.relativePath = entry.source === "obsidian-vault"
          ? `vault://${entry.file}`
          : `memory/distilled/${entry.file}`;
        skills.push(meta);
      } catch (err) {
        this.log(
          `   ⚠️ Failed to read distilled node ${entry.file}: ${err.message}`,
          "warning",
        );
      }
    }

    return skills;
  }

  /**
   * Recursively find all agent .md files in a directory.
   * Returns array of { name, fullPath, relativePath }
   */
  async _findAllAgentFiles(dir, prefix = "") {
    const results = [];
    if (!(await fs.pathExists(dir))) return results;
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.name.startsWith("_")) continue;

      if (entry.isDirectory()) {
        const subResults = await this._findAllAgentFiles(fullPath, relPath);
        results.push(...subResults);
      } else if (entry.name.endsWith(".md")) {
        results.push({
          name: entry.name.replace(".md", ""),
          fullPath: fullPath,
          relativePath: relPath,
        });
      }
    }
    return results;
  }

  async massUpdateSkills() {
    this.log(
      "📚 Initiating Semantic Mass Update (HUB ➔ Skills + Skill Registry)...",
      "info",
    );

    // ═══════════════════════════════════════════════════════════
    // PHASE 1: Scan all skill sources
    // ═══════════════════════════════════════════════════════════
    const allSkills = await this._scanAllSkillSources();
    const workflowSkills = allSkills.filter((s) => s.sourceType === "workflow");
    const externalSkills = allSkills.filter(
      (s) => s.sourceType === "external-skill",
    );
    const distilledSkills = allSkills.filter(
      (s) => s.sourceType === "distilled",
    );

    this.log(
      `   🔍 Found ${workflowSkills.length} workflow skills, ${externalSkills.length} external skills, ${distilledSkills.length} distilled wisdom nodes.`,
      "info",
    );

    // ═══════════════════════════════════════════════════════════
    // PHASE 2: Discover ALL agent prompt files (recursive)
    // ═══════════════════════════════════════════════════════════
    const allAgentFiles = await this._findAllAgentFiles(this.agentPath);
    this.log(`   🤖 Found ${allAgentFiles.length} agent prompt files.`, "info");

    // Wildcard agents — these receive ALL skills
    const WILDCARD_AGENTS = ["guru", "orchestrator", "pipeline-architect"];

    let updatedAgentsCount = 0;
    let totalSkillsInjected = 0;

    // ═══════════════════════════════════════════════════════════
    // PHASE 3: For each agent, extract tags & match skills
    // ═══════════════════════════════════════════════════════════
    const MAX_SKILLS_PER_AGENT = Infinity; // Tanpa batas
    const MAX_SKILL_SUMMARY_CHARS = 500;
    const MAX_INJECT_SKILL_KB = 5000; // Tanpa batas (5MB)

    // LEGACY: Read distilled wisdom for DEEP WISDOM INJECTION (preserved)
    const wisdomNodes = [];
    for (const skill of distilledSkills) {
      try {
        const content = await fs.readFile(skill.source, "utf8");
        const tags = await this.getSemanticTags(skill.source);
        wisdomNodes.push({ name: path.basename(skill.source), content, tags });
      } catch (err) {
        /* already logged during scan */
      }
    }

    // Legacy tag mappings for DEEP WISDOM INJECTION (preserved for backward compat)
    const legacyAgentMappings = {
      "cyber-security": [
        "security",
        "cyber",
        "auth",
        "cryptography",
        "protection",
        "htaccess",
        "permission",
      ],
      "database-architect": [
        "database",
        "db",
        "migration",
        "eloquent",
        "laravel",
        "sql",
        "query",
        "schema",
      ],
      "documentation-architect": ["documentation", "doc", "readme", "recap"],
      "looping-tester": ["tdd", "testing", "test", "sandbox", "assertion"],
      "seo-performance-specialist": [
        "performance",
        "seo",
        "speed",
        "optimization",
        "cache",
        "cdn",
      ],
      "ux-engineer": [
        "ui",
        "ux",
        "frontend",
        "blade",
        "design",
        "tailwind",
        "responsive",
        "a11y",
        "accessibility",
        "chrome-extensions",
        "chrome",
        "extension",
      ],
      "vcs-architect": ["git", "vcs", "version", "branch", "worktree"],
      guru: ["*"],
      orchestrator: ["*"],
      "pipeline-architect": ["*"],
    };

    // ─── NEW: Backup Mechanism for Rollback ───
    const backupDir = path.join(
      this.rootPath,
      ".nexus_backup_prompts_" + Date.now(),
    );
    try {
      this.log(
        `   📦 Creating backup of prompt files at ${backupDir}...`,
        "info",
      );
      await fs.copy(this.agentPath, backupDir);
    } catch (err) {
      this.log(
        `   ❌ Failed to create backup: ${err.message}. Aborting.`,
        "error",
      );
      return;
    }

    try {
      for (const agent of allAgentFiles) {
        let promptContent;
        try {
          promptContent = await fs.readFile(agent.fullPath, "utf8");
        } catch (err) {
          this.log(
            `   ⚠️ Failed to read agent ${agent.name}: ${err.message}`,
            "warning",
          );
          continue;
        }

        const isWildcard = WILDCARD_AGENTS.includes(agent.name);

        // ─── NEW: Dynamic Skill Registry Injection ───
        const agentTags = this._extractAgentTags(agent.name, promptContent);

        // Match skills (workflow + external) to this agent
        const nonDistilledSkills = [...workflowSkills, ...externalSkills];
        let matchedSkills;
        if (isWildcard) {
          matchedSkills = nonDistilledSkills;
        } else {
          matchedSkills = nonDistilledSkills.filter((skill) => {
            const overlap = skill.tags.filter((t) => agentTags.includes(t));
            return overlap.length >= 1;
          });
        }

        // Sort by match score (most matching tags first), then limit
        if (!isWildcard) {
          matchedSkills.sort((a, b) => {
            const scoreA = a.tags.filter((t) => agentTags.includes(t)).length;
            const scoreB = b.tags.filter((t) => agentTags.includes(t)).length;
            return scoreB - scoreA;
          });
        }
        if (MAX_SKILLS_PER_AGENT !== Infinity) {
          matchedSkills = matchedSkills.slice(0, MAX_SKILLS_PER_AGENT);
        }

        // ─── LEGACY: Deep Wisdom Injection (preserved) ───
        const legacyTags = legacyAgentMappings[agent.name];
        let wisdomInjection = "";
        if (legacyTags && wisdomNodes.length > 0) {
          const MAX_NODES_PER_AGENT = 30;
          const MAX_INJECT_KB = 200;

          const matchingWisdom = wisdomNodes
            .filter((node) => {
              if (legacyTags.includes("*")) return true;
              return node.tags.some((tag) => legacyTags.includes(tag));
            })
            .slice(0, MAX_NODES_PER_AGENT);

          if (matchingWisdom.length > 0) {
            wisdomInjection = `## 🧠 DEEP WISDOM INJECTION (Phase 5 Institutionalization)\n> Data ini adalah bagian dari memori inti agen yang diserap dari Knowledge Base.\n\n`;
            for (const node of matchingWisdom) {
              wisdomInjection += `### 📘 KNOWLEDGE: ${node.name.toUpperCase()}\n\n${node.content.trim()}\n\n`;
            }
            const injectionKB =
              Buffer.byteLength(wisdomInjection, "utf8") / 1024;
            if (injectionKB > MAX_INJECT_KB) {
              wisdomInjection =
                wisdomInjection.substring(0, MAX_INJECT_KB * 1024) +
                "\n\n...[truncated]";
              this.log(
                `   ⚠️ Wisdom injection truncated at ${MAX_INJECT_KB}KB for ${agent.name}`,
                "warning",
              );
            }
          }
        }

        // Skip if nothing to inject
        if (matchedSkills.length === 0 && !wisdomInjection) continue;

        // ─── Build Skill Registry section ───
        let skillRegistryContent = "";
        if (matchedSkills.length > 0) {
          skillRegistryContent = `## 🎯 SKILL REGISTRY (Auto-Injected)\n> Skills ini diinjeksikan secara otomatis berdasarkan kecocokan domain agent.\n> Total: ${matchedSkills.length} skills matched untuk agent "${agent.name}"\n\n`;
          for (const skill of matchedSkills) {
            const desc = skill.description
              ? skill.description.substring(0, MAX_SKILL_SUMMARY_CHARS)
              : "(No description)";
            skillRegistryContent += `### 📦 SKILL: ${skill.name}\n> ${desc}\n> Source: \`${skill.relativePath}\`\n\n`;
          }

          // Enforce size limit
          const skillKB =
            Buffer.byteLength(skillRegistryContent, "utf8") / 1024;
          if (skillKB > MAX_INJECT_SKILL_KB) {
            skillRegistryContent =
              skillRegistryContent.substring(0, MAX_INJECT_SKILL_KB * 1024) +
              "\n\n...[truncated]";
            this.log(
              `   ⚠️ Skill registry truncated at ${MAX_INJECT_SKILL_KB}KB for ${agent.name}`,
              "warning",
            );
          }
        }

        // ─── Assemble final prompt content ───
        // Clean out old injected sections
        let cleanPrompt = promptContent
          .replace(
            /\n*## 🎯 SKILL REGISTRY[\s\S]*?(?=\n## 🧠 DEEP WISDOM|$)/,
            "",
          )
          .replace(/\n*## 🧠 DEEP WISDOM INJECTION[\s\S]*/, "")
          .trimEnd();

        // Append new sections
        let newPromptContent = cleanPrompt;
        if (skillRegistryContent) {
          newPromptContent += "\n\n" + skillRegistryContent;
        }
        if (wisdomInjection) {
          newPromptContent += "\n\n" + wisdomInjection;
        }

        await fs.writeFile(agent.fullPath, newPromptContent, "utf8");

        const parts = [];
        if (matchedSkills.length > 0)
          parts.push(`${matchedSkills.length} skills`);
        if (wisdomInjection) parts.push("wisdom");
        this.log(
          `   ✅ Updated agent: ${agent.name} (${parts.join(" + ")})`,
          "success",
        );
        updatedAgentsCount++;
        totalSkillsInjected += matchedSkills.length;
      }

      this.log(
        `✨ Mass Update Complete: ${updatedAgentsCount} agent prompts updated, ${totalSkillsInjected} total skill references injected.`,
        "success",
      );
    } catch (fatalError) {
      this.log(
        `   ❌ Fatal error during update: ${fatalError.message}. Rolling back...`,
        "error",
      );
      try {
        await fs.emptyDir(this.agentPath);
        await fs.copy(backupDir, this.agentPath);
        this.log(`   ✅ Rollback successful. Prompts restored.`, "success");
      } catch (rollbackErr) {
        this.log(
          `   🚨 CRITICAL: Rollback failed: ${rollbackErr.message}. Manual recovery from ${backupDir} required.`,
          "error",
        );
      }
    } finally {
      await fs.remove(backupDir).catch(() => {});
    }
  }

  async massRefactor() {
    this.log("🔄 Initiating Semantic Mass Refactor (Golden ➔ HUB)...", "info");

    const goldenDir = path.join(this.rootPath, "golden");
    if (!(await fs.pathExists(goldenDir))) {
      this.log(
        "⚠️ Golden directory does not exist. Skipping refactor.",
        "warning",
      );
      return;
    }

    // 1. Scan golden/ for all .md files recursively
    const fg = require("fast-glob");
    const normalizedGolden = goldenDir.replace(/\\/g, "/");
    const goldenFiles = fg.sync("**/*.{md,MD}", {
      cwd: normalizedGolden,
      ignore: ["harvest/**"], // ignore harvested project outputs, only process golden templates/standards
      onlyFiles: true,
    });

    this.log(
      `   🔍 Found ${goldenFiles.length} golden template files.`,
      "info",
    );

    let refactoredCount = 0;

    for (const file of goldenFiles) {
      const goldenFullPath = path.join(goldenDir, file);
      const goldenContent = await fs.readFile(goldenFullPath, "utf8");
      const basename = path.basename(file);

      // Standardize name (NEXUS_ prefix and uppercase)
      const cleanBasename = basename
        .replace(/^NEXUS_/i, "")
        .replace(".md", "")
        .toUpperCase();
      const standardizedName = `NEXUS_${cleanBasename}.md`;

      // 2. Search for a matching file in memory/distilled/ recursively
      const normalizedDistilled = this.knowledgePath.replace(/\\/g, "/");
      const distilledFiles = fg.sync("**/*.{md,MD}", {
        cwd: normalizedDistilled,
        ignore: ["NEXUS_HUB_INDEX.md", "NEXUS_NEURAL_MAP.md"],
        onlyFiles: true,
      });

      // Find matching distilled file (by name comparison ignoring NEXUS_ prefix and case)
      let matchedRelPath = null;
      for (const df of distilledFiles) {
        const dfBasename = path
          .basename(df)
          .replace(/^NEXUS_/i, "")
          .replace(".md", "")
          .toUpperCase();
        if (dfBasename === cleanBasename) {
          matchedRelPath = df;
          break;
        }
      }

      const calculateMetrics = (content) => {
        let security = 0.5;
        let stability = 0.5;
        let performance = 0.5;
        let readability = 0.5;

        const headingsCount = (content.match(/^#+ /gm) || []).length;
        if (headingsCount > 5) readability += 0.2;
        const boldCount = (content.match(/\*\*.*?\*\*/g) || []).length;
        if (boldCount > 10) readability += 0.2;

        if (
          /security|guardrail|allow|protect|sanitize|permission|auth|role/i.test(
            content,
          )
        )
          security += 0.3;
        if (/test|tdd|verify|assert|stable|error|exception/i.test(content))
          stability += 0.3;
        if (/performance|speed|optimize|cache|fast|latency/i.test(content))
          performance += 0.3;

        return {
          security: Math.min(1.0, security),
          stability: Math.min(1.0, stability),
          performance: Math.min(1.0, performance),
          readability: Math.min(1.0, readability),
        };
      };

      if (matchedRelPath) {
        const distilledFullPath = path.join(this.knowledgePath, matchedRelPath);
        const distilledContent = await fs.readFile(distilledFullPath, "utf8");

        // 3. Compare them using DecisionEngine resolve
        const options = [
          {
            id: "existing",
            scores: calculateMetrics(distilledContent),
            content: distilledContent,
          },
          {
            id: "golden",
            scores: calculateMetrics(goldenContent),
            content: goldenContent,
          },
        ];

        const result = this.decisionEngine.resolve(options, "refactor");
        this.log(
          `   ⚖️ DecisionEngine: Comparing existing vs golden for ${basename} (Winner: ${result.winner.id})`,
          "info",
        );

        // 4. Merge safely using wrapAsConditional
        const mergedContent = this.wrapAsConditional(
          distilledContent,
          goldenContent,
          `Refactor from Golden: ${basename}`,
        );

        // Update file
        await this.distiller.updateVersionHeader(
          distilledFullPath,
          mergedContent,
        );
        this.log(
          `   🔄 Safely merged and updated: ${matchedRelPath}`,
          "success",
        );
        refactoredCount++;
      } else {
        // 5. No match: Copy to distilled/standards/ (or default distilled category)
        const standardsDir = path.join(this.knowledgePath, "standards");
        await fs.ensureDir(standardsDir);
        const destPath = path.join(standardsDir, standardizedName);

        await fs.writeFile(destPath, goldenContent, "utf8");
        await this.distiller.updateVersionHeader(destPath, goldenContent);
        this.log(
          `   📂 Copied new golden standard: standards/${standardizedName}`,
          "success",
        );
        refactoredCount++;
      }
    }

    // 6. Regenerate index files
    if (refactoredCount > 0) {
      this.log("   📚 Regenerating HUB Master Index & Neural Map...", "info");
      await this.distiller.generateHubIndex();
      await this.distiller.generateNeuralMap();
      // Rebuild vector index
      await this.semanticEngine.invalidateCache();
      await this.semanticEngine.buildIndex();
    }

    this.log(
      `✨ Mass Refactor Complete: ${refactoredCount} files refactored successfully.`,
      "success",
    );
  }

  calculateSimilarity(str1, str2) {
    if (!str1 || !str2) return 0;
    if (str1 === str2) return 1;

    // Fix BUG-13 & BUG-21: Pre-truncate strings by bytes safely to prevent JaroWinklerDistance OOM/hang on huge files
    const len1 = Buffer.byteLength(str1, "utf8");
    const len2 = Buffer.byteLength(str2, "utf8");
    const safe1 =
      len1 > 10000
        ? Buffer.from(str1, "utf8").subarray(0, 10000).toString("utf8")
        : str1;
    const safe2 =
      len2 > 10000
        ? Buffer.from(str2, "utf8").subarray(0, 10000).toString("utf8")
        : str2;

    const natural = require("natural");
    const rawSimilarity = natural.JaroWinklerDistance(safe1, safe2);
    return Math.pow(rawSimilarity, 2);
  }
}

module.exports = NexusEngine;
