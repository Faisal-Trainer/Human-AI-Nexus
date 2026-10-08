"use strict";

const path = require("path");
const fs = require("fs");
const { performance } = require("perf_hooks");

const PROJECT_ROOT = path.resolve(__dirname, "..", "..");
require("dotenv").config({ path: path.join(PROJECT_ROOT, ".env") });

// ════════════════════════════════════════════════════════════════
// Konstanta & konfigurasi
// ════════════════════════════════════════════════════════════════

// ⛔ PAGAR 1: Whitelist task yang diizinkan — dibekukan agar tidak bisa diperluas secara programatik
const ALLOWED_TASKS = Object.freeze([
  "review_code_quality",
  "suggest_refactor",
  "explain_error",
  "validate_migration_schema",
  "analyze_code",
  "generate_architecture",
  "enhance_architecture",
  "build_model_migration",
  "build_livewire_component",
  "build_view",
  "build_application",
  "build_routes",
  "generate_post_mortem",
]);

// Task yang menghasilkan kode/blueprint (temperature & budget token lebih besar)
const BUILDER_TASKS = Object.freeze([
  "generate_architecture",
  "build_model_migration",
  "build_livewire_component",
  "build_view",
  "build_application",
  "build_routes",
]);
const REVIEWER_TASKS = ALLOWED_TASKS.filter((t) => !BUILDER_TASKS.includes(t));

// Batas kasar (karakter) sebelum prompt di-tokenisasi. Pemotongan presisi dilakukan per-token
// di _fitToContext() sesuai ukuran context yang benar-benar berhasil dibuat.
const MAX_PROMPT_CHARS = 150000;
const MAX_OUTPUT_LENGTH = 150000;

// Context window
const DEFAULT_CONTEXT_SIZE = 4096;
const MIN_CONTEXT_SIZE = 512;
const FALLBACK_CONTEXT_SIZES = Object.freeze([4096, 2048, 1024, 768, 512]);
const CONTEXT_OVERHEAD_TOKENS = 96; // ruang untuk chat template / special token
const MIN_PROMPT_TOKENS = 32;
const DEFAULT_THREADS = 2;

// Output & inferensi
const MAX_TOKENS_BUILDER = 4096;
const MAX_TOKENS_DEFAULT = 2048;
const TEMPERATURE_BUILDER = 0.7;
const TEMPERATURE_DEFAULT = 0.1;
const DEFAULT_TIMEOUT_MS = 120000;

// Cache ketersediaan model
const AVAILABILITY_TTL_OK_MS = 60000;
const AVAILABILITY_TTL_FAIL_MS = 10000;

// Circuit breaker
const BREAKER_FAILURE_THRESHOLD = 3;
const BREAKER_COOLDOWN_MS = 30000;

// Routing tier
const TIER0_THRESHOLD = 20;
const TIER0_LABEL = "tier_0_heuristic";
const DEFAULT_BASE_SCORE = 30;
const TASK_BASE_SCORES = Object.freeze({
  validate_migration_schema: 15,
  review_code_quality: 25,
  explain_error: 30,
  analyze_code: 35,
  suggest_refactor: 45,
  build_model_migration: 50,
  build_routes: 55,
  generate_post_mortem: 55,
  build_livewire_component: 70,
  build_view: 70,
  enhance_architecture: 80,
  generate_architecture: 85,
  build_application: 95,
});
const COMPLEX_KEYWORDS = ["multi-tenant", "architecture", "full stack"];
const SIMPLE_KEYWORDS = ["syntax", "regex", "assert"];

const TRUNCATION_MARKER = "\n\n...[PROMPT TRUNCATED TO FIT CONTEXT]...\n\n";

// ════════════════════════════════════════════════════════════════
// Helper kecil
// ════════════════════════════════════════════════════════════════

const log = {
  info: (msg) => console.log(`🧠 LocalIntelligence: ${msg}`),
  warn: (msg) => console.warn(`⚠️ LocalIntelligence: ${msg}`),
  error: (msg) => console.error(`❌ LocalIntelligence: ${msg}`),
};

const toText = (value) => {
  if (typeof value === "string") return value;
  if (value === undefined || value === null) return "";
  return JSON.stringify(value);
};

// node-llama-cpp adalah ESM → di-import dinamis sekali saja (cache; reset bila gagal)
let llamaModulePromise = null;
const loadLlamaModule = () => {
  llamaModulePromise ??= import("node-llama-cpp").catch((err) => {
    llamaModulePromise = null;
    throw err;
  });
  return llamaModulePromise;
};

const resolveGpuLayers = (cpuOnly) => {
  if (cpuOnly) return 0;
  const raw = process.env.NEXUS_GPU_LAYERS;
  const parsed = parseInt(raw, 10);
  return raw && raw !== "max" && Number.isFinite(parsed) ? parsed : "max";
};

const isGpuMemoryError = (err) =>
  /OutOfDeviceMemory|out of (?:device )?memory|Vulkan|kv cache|failed to alloc/i.test(err?.message ?? "");

/** Normalisasi override tier: 0 | 1 | null (null = tidak ada override). */
const resolveTierOverride = (tier) => {
  if (tier === undefined) return null;
  if (typeof tier === "number") return tier === 0 ? 0 : 1;
  return tier === TIER0_LABEL || tier === "tier_0" ? 0 : 1;
};

const stripThinking = (text) =>
  text.replace(/<think>[\s\S]*?<\/think>/gi, "").replace(/<think>[\s\S]*$/i, "");

const stripCodeFences = (text) => {
  if (!text.startsWith("```")) return text;
  const withLanguage = /^```[\w+-]*[ \t]*\r?\n/;
  const opened = withLanguage.test(text) ? text.replace(withLanguage, "") : text.replace(/^```/, "");
  return opened.replace(/\r?\n?```\s*$/, "").trim();
};

const buildSystemPrompt = (taskType) =>
  BUILDER_TASKS.includes(taskType)
    ? "You are an elite TALL Stack Architect (Tailwind, Alpine.js, Laravel, Livewire) for the NEXUS AI framework. " +
      "Your role is to design and write high-quality, production-ready code. " +
      "You must generate EXACT, working code based on the user's requirements. " +
      "Output ONLY the raw code or structured JSON as requested, without any conversational filler or markdown code blocks if the output is meant to be a raw file."
    : "You are a TALL Stack code reviewer for the NEXUS AI framework. " +
      `Your role is STRICTLY LIMITED to: ${REVIEWER_TASKS.join(", ")}. ` +
      "You MUST NOT generate full applications autonomously. " +
      "Respond in structured format only. Be concise.";

// ════════════════════════════════════════════════════════════════
// JSON Schemas untuk GBNF constrained decoding (Pilar 5)
// ════════════════════════════════════════════════════════════════

const stringArray = { type: "array", items: { type: "string" } };

const SCHEMAS = Object.freeze({
  blueprintApp: {
    type: "object",
    properties: {
      project_name: { type: "string" },
      framework: { type: "string" },
      description: { type: "string" },
      models: stringArray,
      routes: stringArray,
      livewire_components: stringArray,
      relationships: {
        type: "array",
        items: {
          type: "object",
          properties: {
            model: { type: "string" },
            type: { type: "string" },
            target: { type: "string" },
          },
          required: ["model", "type", "target"],
        },
      },
    },
    required: ["project_name", "framework", "models", "routes"],
  },
  postMortem: {
    type: "object",
    properties: {
      title: { type: "string" },
      tags: stringArray,
      severity: { type: "string", enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
      root_cause: { type: "string" },
      resolution: { type: "string" },
      preventive_measures: stringArray,
    },
    required: ["title", "severity", "root_cause", "resolution"],
  },
  codeReview: {
    type: "object",
    properties: {
      valid: { type: "boolean" },
      score: { type: "number" },
      issues: {
        type: "array",
        items: {
          type: "object",
          properties: {
            severity: { type: "string", enum: ["info", "warning", "error"] },
            message: { type: "string" },
            line: { type: "number" },
            fix: { type: "string" },
          },
          required: ["severity", "message"],
        },
      },
      suggestions: stringArray,
    },
    required: ["valid", "score", "issues"],
  },
  schemaValidation: {
    type: "object",
    properties: {
      valid: { type: "boolean" },
      errors: stringArray,
      warnings: stringArray,
      recommendations: stringArray,
    },
    required: ["valid", "errors", "warnings"],
  },
});

// ════════════════════════════════════════════════════════════════
// Tier 0: heuristik tanpa LLM
// ════════════════════════════════════════════════════════════════

const TIMESTAMPS_CALL = /\$table->(?:timestamps|timestampsTz|nullableTimestamps)\s*\(/;
const PRIMARY_KEY_CALL = /\$table->(?:id|\w*[Ii]ncrements)\s*\(|primary\s*\(/;
const RAW_INTEGER_FK =
  /\$table->(?:unsigned(?:Big|Small|Tiny|Medium)?Integer|(?:big|small|tiny|medium)?Integer)\s*\(\s*['"](\w+_id)['"]\s*\)/gi;

/** Kolom *_id bertipe integer mentah yang tidak punya $table->foreign('kolom'). */
function findUnconstrainedForeignKeys(text) {
  const columns = [...new Set([...text.matchAll(RAW_INTEGER_FK)].map((m) => m[1]))];
  return columns.filter((col) => !new RegExp(`foreign\\(\\s*['"]${col}['"]`).test(text));
}

function validateMigration(text) {
  const errors = [];
  const warnings = [];
  const recommendations = [];
  const hasCreate = text.includes("Schema::create");

  if (hasCreate && !TIMESTAMPS_CALL.test(text)) {
    warnings.push("Tabel tidak mendefinisikan $table->timestamps(). Disarankan untuk audit data.");
    recommendations.push("Tambahkan $table->timestamps(); pada migrasi.");
  }

  const rawForeignKeys = findUnconstrainedForeignKeys(text);
  if (rawForeignKeys.length > 0) {
    errors.push(`Deteksi foreign key primitif (${rawForeignKeys.join(", ")}) tanpa foreign constraint.`);
    recommendations.push(
      "Gunakan $table->foreignId('...')->constrained()->cascadeOnDelete(); untuk integritas referensial.",
    );
  }

  if (hasCreate && !PRIMARY_KEY_CALL.test(text)) {
    errors.push("Tabel tidak memiliki primary key ($table->id() atau $table->primary()).");
  }

  if (/function\s+up\b/.test(text) && !/dropIfExists|Schema::drop/.test(text)) {
    warnings.push("Method down() sebaiknya menyertakan Schema::dropIfExists untuk rollback yang aman.");
  }

  return { valid: errors.length === 0, errors, warnings, recommendations };
}

const DB_RAW_INTERPOLATION = /DB::raw\s*\(\s*(?:['"][^'"]*\$|['"][^'"]*['"]\s*\.\s*\$[a-zA-Z0-9_]+)/i;
const ENV_CALL = /env\s*\(\s*['"][A-Z0-9_]+['"]\s*\)/;

const CODE_REVIEW_RULES = [
  {
    severity: "warning",
    test: (text) => text.includes("@livewire("),
    message: "Penggunaan tag legasi @livewire(). Disarankan menggunakan tag modern <livewire:... />.",
    fix: "Ganti @livewire('component-name') menjadi <livewire:component-name />",
  },
  {
    severity: "error",
    test: (text) => DB_RAW_INTERPOLATION.test(text),
    message: "Potensi SQL Injection terdeteksi dalam DB::raw() dengan konkatenasi variabel langsung.",
    fix: "Gunakan parameterized query atau Eloquent bindings alih-alih merangkai query langsung.",
  },
  {
    severity: "warning",
    test: (text) => ENV_CALL.test(text) && !text.includes("config/"),
    message:
      "Pemanggilan helper env() langsung di luar file konfigurasi berisiko mengembalikan null saat config:cache aktif.",
    fix: "Gunakan helper config('app.key') dan definisikan di file konfigurasi.",
  },
];

function reviewCode(text) {
  const issues = CODE_REVIEW_RULES.filter((rule) => rule.test(text)).map(({ severity, message, fix }) => ({
    severity,
    message,
    fix,
  }));
  if (issues.length === 0) return null; // tidak ada temuan → serahkan ke Tier 1

  return {
    valid: !issues.some((issue) => issue.severity === "error"),
    score: Math.max(10, 100 - issues.length * 20),
    issues,
    suggestions: issues.map((issue) => issue.fix),
  };
}

const HEURISTICS = Object.freeze({
  validate_migration_schema: validateMigration,
  review_code_quality: reviewCode,
});

// ════════════════════════════════════════════════════════════════
// LocalIntelligence
// ════════════════════════════════════════════════════════════════

class LocalIntelligence {
  constructor() {
    this.projectRoot = PROJECT_ROOT;
    this.modelPath = this.getModelPath();
    this.MAX_OUTPUT_LENGTH = MAX_OUTPUT_LENGTH;
    this.isAvailable = false;

    // Cache TTL ketersediaan model (hindari race condition pada singleton)
    this._availabilityCache = { value: false, expiresAt: 0 };

    // Circuit breaker: cegah cascade failure
    this.cb = { state: "CLOSED", failures: 0, openedAt: null, probing: false };

    // Instance node-llama-cpp
    this.llama = null;
    this.model = null;
    this.currentGpuLayers = null;
    this._initPromise = null;
    this._grammarCache = new Map();

    // Inferensi diserialkan: satu model lokal, RAM terbatas, dan _reloadModel()
    // tidak boleh berjalan saat context lain sedang dipakai.
    this._queue = Promise.resolve();

    this.schemas = this.initSchemas();
  }

  get modelName() {
    return process.env.NEXUS_MODEL_NAME || path.basename(this.modelPath, ".gguf");
  }

  initSchemas() {
    return SCHEMAS;
  }

  /** Resolusi path model GGUF dari env (tanpa tanda kutip, relatif terhadap root proyek). */
  getModelPath() {
    const rawEnv = (process.env.NEXUS_MODEL_PATH || "").replace(/^["']|["']$/g, "").trim();
    if (rawEnv) {
      return path.isAbsolute(rawEnv) ? rawEnv : path.resolve(this.projectRoot, rawEnv);
    }

    // Default: Qwen3-4B bila ada, jika tidak Qwen2.5-Coder-3B
    const qwen3Path = path.resolve(this.projectRoot, "models", "Qwen3-4B-Q4_K_M.gguf");
    if (fs.existsSync(qwen3Path)) return qwen3Path;
    return path.resolve(this.projectRoot, "models", "qwen2.5-coder-3b-instruct-q4_k_m.gguf");
  }

  // ── Ketersediaan & lifecycle model ───────────────────────────

  _setAvailability(value) {
    this.isAvailable = value;
    const ttl = value ? AVAILABILITY_TTL_OK_MS : AVAILABILITY_TTL_FAIL_MS;
    this._availabilityCache = { value, expiresAt: Date.now() + ttl };
    return value;
  }

  /** Paksa pengecekan ulang pada panggilan berikutnya. */
  _invalidateAvailability() {
    this.isAvailable = false;
    this._availabilityCache = { value: false, expiresAt: 0 };
  }

  async checkAvailability() {
    if (Date.now() < this._availabilityCache.expiresAt) {
      this.isAvailable = this._availabilityCache.value;
      return this.isAvailable;
    }

    this.modelPath = this.getModelPath();
    try {
      if (!fs.existsSync(this.modelPath)) {
        log.warn(
          `Model file not found at ${this.modelPath} (Model: ${this.modelName}). Harap pastikan model sudah terdownload.`,
        );
        return this._setAvailability(false);
      }

      if (!this.llama || !this.model) {
        // Satu inisialisasi bersama; dilepas setelah selesai agar init ulang bisa dilakukan
        // (mis. setelah _reloadModel gagal dan model bernilai null).
        this._initPromise ??= this._initialize().finally(() => {
          this._initPromise = null;
        });
        await this._initPromise;
      }
      return this._setAvailability(true);
    } catch (e) {
      log.warn(`Failed to initialize model. ${e.message}`);
      return this._setAvailability(false);
    }
  }

  async _initialize() {
    const { getLlama } = await loadLlamaModule();
    const cpuOnly = process.env.NEXUS_CPU_ONLY === "true";

    log.info("Initializing node-llama-cpp engine...");
    this.llama ??= await getLlama(cpuOnly ? { gpu: false } : {});

    const gpuLayers = resolveGpuLayers(cpuOnly);
    log.info(`Loading model [${this.modelName}] from ${this.modelPath}...`);
    this.model = await this.llama.loadModel({ modelPath: this.modelPath, gpuLayers });
    this.currentGpuLayers = gpuLayers;
    log.info(`Model [${this.modelName}] loaded successfully (gpuLayers: ${gpuLayers}).`);
  }

  /**
   * Muat ulang model dengan gpuLayers tertentu.
   * fallbackToCpuEngine = true → buat backend CPU murni (melewati Vulkan sepenuhnya).
   */
  async _reloadModel(gpuLayers = 0, fallbackToCpuEngine = false) {
    log.info(
      `Reloading model [${this.modelName}] with gpuLayers: ${gpuLayers}${fallbackToCpuEngine ? " (pure CPU engine)" : ""}...`,
    );

    try {
      await this.model?.dispose();
    } catch (_) {
      /* abaikan: model mungkin sudah ter-dispose */
    }
    this.model = null;

    try {
      if (fallbackToCpuEngine) {
        try {
          await this.llama?.dispose();
        } catch (_) {
          /* abaikan */
        }
        this.llama = null;
        this._grammarCache.clear(); // grammar terikat pada instance llama lama

        const { getLlama } = await loadLlamaModule();
        this.llama = await getLlama({ gpu: false });
      }

      this.model = await this.llama.loadModel({ modelPath: this.modelPath, gpuLayers });
      this.currentGpuLayers = gpuLayers;
      log.info(`Model reloaded successfully with gpuLayers: ${gpuLayers}.`);
    } catch (err) {
      this._invalidateAvailability(); // model null → paksa init ulang pada panggilan berikutnya
      throw err;
    }
  }

  // ── Tier routing ─────────────────────────────────────────────

  /**
   * Skor kompleksitas 0–100 → tier:
   *   Tier 0 (< 20): heuristik tanpa LLM
   *   Tier 1 (>= 20): model lokal via node-llama-cpp
   * @returns {0|1}
   */
  scoreTaskComplexity(taskType, prompt = "", options = {}) {
    const override = resolveTierOverride(options?.tier);
    if (override !== null) return override;

    const text = toText(prompt);
    let score = Object.hasOwn(TASK_BASE_SCORES, taskType) ? TASK_BASE_SCORES[taskType] : DEFAULT_BASE_SCORE;

    if (text.length > 5000) score += 25;
    else if (text.length > 2000) score += 15;

    const lowerText = text.toLowerCase();
    if (COMPLEX_KEYWORDS.some((keyword) => lowerText.includes(keyword))) score += 15;
    if (SIMPLE_KEYWORDS.some((keyword) => lowerText.includes(keyword))) score -= 10;

    return score < TIER0_THRESHOLD ? 0 : 1;
  }

  /**
   * Tier 0: heuristik/regex tanpa LLM.
   * @returns {string|null} JSON string, atau null bila tidak ada aturan yang berlaku.
   */
  executeHeuristic(taskType, prompt = "") {
    if (!Object.hasOwn(HEURISTICS, taskType)) return null;

    const startedAt = performance.now();
    const result = HEURISTICS[taskType](toText(prompt));
    if (!result) return null;

    const executionTimeMs = Number((performance.now() - startedAt).toFixed(3));
    return JSON.stringify({ ...result, tier: TIER0_LABEL, execution_time_ms: executionTimeMs }, null, 2);
  }

  // ── Public API ───────────────────────────────────────────────

  /**
   * Generate output dengan model routing dan GBNF grammar constraint (Pilar 5).
   * @param {string|object} prompt
   * @param {string} taskType - harus ada di ALLOWED_TASKS
   * @param {string|null} systemPromptOverride
   * @param {Object} options - { tier, schema, grammar, maxTokens, temperature, timeoutMs }
   * @returns {Promise<string|null>}
   */
  async generate(prompt, taskType = "analyze_code", systemPromptOverride = null, options = {}) {
    if (!ALLOWED_TASKS.includes(taskType)) {
      throw new Error(`Boundary Violation: Task "${taskType}" not allowed.`);
    }

    const opts = this._normalizeOptions(options);
    const safePrompt = this._capPromptChars(toText(prompt));
    const systemPrompt = systemPromptOverride || buildSystemPrompt(taskType);

    // TIER 0: heuristik
    if (this.scoreTaskComplexity(taskType, safePrompt, opts) === 0) {
      log.info(`⚡ Routing task "${taskType}" to Tier 0 (Heuristic Engine)...`);
      const heuristicResult = this.executeHeuristic(taskType, safePrompt);
      if (heuristicResult) return heuristicResult;
      log.info(`Heuristic rule didn't cover task "${taskType}". Routing to Tier 1...`);
    }

    return this._runTier1(safePrompt, systemPrompt, taskType, opts);
  }

  /** Convenience: analisis kode terhadap best practice TALL stack. */
  async analyzeCode(code, task = "Review this code for TALL stack best practices.") {
    const prompt = `Task: ${task}\n\nCode:\n\`\`\`php\n${code}\n\`\`\``;
    return this.generate(prompt, "analyze_code");
  }

  /** Status circuit breaker (diagnostik). */
  getCircuitBreakerStatus() {
    const { state, failures, openedAt } = this.cb;
    return { state, failures, openedAt };
  }

  // ── Input handling ───────────────────────────────────────────

  /** Salin options (tidak memutasi objek milik pemanggil) dan resolusi nama preset schema. */
  _normalizeOptions(options) {
    const opts = { ...(options ?? {}) };
    if (typeof opts.schema === "string") {
      if (Object.hasOwn(this.schemas, opts.schema)) {
        opts.schema = this.schemas[opts.schema];
      } else {
        log.warn(`Unknown schema preset "${opts.schema}". Proceeding without schema.`);
        delete opts.schema;
      }
    }
    return opts;
  }

  /** Guard kasar berbasis karakter (pemotongan presisi per-token ada di _fitToContext). */
  _capPromptChars(prompt) {
    if (prompt.length <= MAX_PROMPT_CHARS) return prompt;

    log.warn(`Prompt terlalu besar (${prompt.length} chars). Truncating (no chunking).`);
    const half = Math.floor(MAX_PROMPT_CHARS / 2);
    return prompt.slice(0, half) + "\n\n...[PROMPT TRUNCATED DUE TO RAM LIMIT]...\n\n" + prompt.slice(-half);
  }

  // ── Circuit breaker ──────────────────────────────────────────

  _breakerAllowsRequest() {
    const cb = this.cb;

    if (cb.state === "OPEN") {
      if (Date.now() - cb.openedAt < BREAKER_COOLDOWN_MS) {
        log.warn("⚡ Circuit breaker OPEN — skipping inference (fail fast).");
        return false;
      }
      cb.state = "HALF-OPEN";
      log.info("⚡ Circuit breaker HALF-OPEN — testing inference availability...");
    }

    if (cb.state === "HALF-OPEN") {
      if (cb.probing) return false; // hanya satu request uji pada satu waktu
      cb.probing = true;
    }
    return true;
  }

  _recordSuccess() {
    this.cb = { state: "CLOSED", failures: 0, openedAt: null, probing: false };
  }

  _recordFailure() {
    const cb = this.cb;
    cb.failures++;

    if (cb.state === "HALF-OPEN" || cb.failures >= BREAKER_FAILURE_THRESHOLD) {
      const reason =
        cb.state === "HALF-OPEN" ? "HALF-OPEN test failed" : `${cb.failures} failures`;
      cb.state = "OPEN";
      cb.openedAt = Date.now();
      log.error(`🔴 Circuit breaker OPEN (${reason}). Cooldown ${BREAKER_COOLDOWN_MS / 1000} detik.`);
    }
  }

  // ── Tier 1: inferensi lokal ──────────────────────────────────

  _enqueue(task) {
    const run = this._queue.then(task);
    this._queue = run.catch(() => {});
    return run;
  }

  async _runTier1(prompt, systemPrompt, taskType, options) {
    log.info(`Routing task "${taskType}" to Tier 1 (Fast Local node-llama-cpp)...`);

    if (!this._breakerAllowsRequest()) return null;

    try {
      if (!(await this.checkAvailability())) return null;

      const result = await this._enqueue(() => this._doGenerate(prompt, systemPrompt, taskType, options));
      this._recordSuccess();
      return result;
    } catch (e) {
      this._recordFailure();
      log.error(`Generation failed: ${e.message}`);
      return null;
    } finally {
      this.cb.probing = false; // lepas slot uji HALF-OPEN apa pun hasilnya
    }
  }

  _contextSizeCandidates() {
    let requested = parseInt(process.env.NEXUS_CONTEXT_SIZE, 10);
    if (!Number.isFinite(requested) || requested < MIN_CONTEXT_SIZE) requested = DEFAULT_CONTEXT_SIZE;
    return [...new Set([requested, ...FALLBACK_CONTEXT_SIZES].filter((size) => size <= requested))];
  }

  /** Buat context dengan ukuran terbesar yang muat; fallback ke CPU bila VRAM habis. */
  async _createContext() {
    const threads = Math.max(1, parseInt(process.env.NEXUS_CPU_THREADS, 10) || DEFAULT_THREADS);
    let cpuFallbackTried = false;

    for (const size of this._contextSizeCandidates()) {
      if (!this.model) break;
      try {
        log.info(`Creating context (Size: ${size}) [LOCAL INFERENCE]...`);
        return await this.model.createContext({ contextSize: size, threads });
      } catch (err) {
        log.warn(`Failed to create context (Size: ${size}): ${err.message}`);

        if (!cpuFallbackTried && this.currentGpuLayers !== 0 && isGpuMemoryError(err)) {
          cpuFallbackTried = true;
          log.warn("⚡ Vulkan/GPU VRAM exhausted. Falling back to pure CPU engine...");
          try {
            await this._reloadModel(0, true);
            return await this.model.createContext({ contextSize: size, threads });
          } catch (cpuErr) {
            log.warn(`CPU context creation failed (Size: ${size}): ${cpuErr.message}`);
          }
        }
      }
    }

    throw new Error("Failed to create context for local LLM after trying all memory/CPU fallback strategies.");
  }

  /**
   * Pastikan prompt + system prompt + output muat di context.
   * Prompt dipotong per-token (kepala + ekor) bila perlu, dan maxTokens disesuaikan.
   */
  _fitToContext(prompt, systemPrompt, contextSize, wantedMaxTokens) {
    const systemTokens = this.model.tokenize(systemPrompt).length;
    const reservedForOutput = Math.min(wantedMaxTokens, Math.floor(contextSize / 2));
    const promptBudget = contextSize - reservedForOutput - systemTokens - CONTEXT_OVERHEAD_TOKENS;

    if (promptBudget < MIN_PROMPT_TOKENS) {
      throw new Error(`Context size ${contextSize} terlalu kecil untuk system prompt + output. Naikkan NEXUS_CONTEXT_SIZE.`);
    }

    const tokens = this.model.tokenize(prompt);
    let fittedPrompt = prompt;
    let promptTokens = tokens.length;

    if (tokens.length > promptBudget) {
      log.warn(`Prompt (${tokens.length} token) melebihi anggaran ${promptBudget} token pada context ${contextSize}. Truncating.`);
      const keep = Math.max(MIN_PROMPT_TOKENS, promptBudget - this.model.tokenize(TRUNCATION_MARKER).length);
      const head = Math.ceil(keep / 2);
      const tail = keep - head;
      fittedPrompt =
        this.model.detokenize(tokens.slice(0, head)) +
        TRUNCATION_MARKER +
        this.model.detokenize(tokens.slice(tokens.length - tail));
      promptTokens = promptBudget;
    }

    const maxTokens = Math.min(wantedMaxTokens, contextSize - systemTokens - CONTEXT_OVERHEAD_TOKENS - promptTokens);
    if (maxTokens < wantedMaxTokens) {
      log.warn(`maxTokens dibatasi ${maxTokens} (diminta ${wantedMaxTokens}) agar muat di context ${contextSize}.`);
    }
    return { prompt: fittedPrompt, maxTokens };
  }

  /** Grammar JSON Schema di-cache per instance llama (kompilasi grammar cukup mahal). */
  async _getSchemaGrammar(schema) {
    const key = JSON.stringify(schema);
    if (!this._grammarCache.has(key)) {
      this._grammarCache.set(key, await this.llama.createGrammarForJsonSchema(schema));
    }
    return this._grammarCache.get(key);
  }

  async _resolveGrammar(options) {
    if (options.schema && this.llama) {
      try {
        log.info("🛡️ Enforcing GBNF JSON Schema Grammar...");
        return await this._getSchemaGrammar(options.schema);
      } catch (err) {
        log.warn(`Could not compile schema grammar: ${err.message}. Proceeding without grammar.`);
      }
    }
    return options.grammar;
  }

  /** Prompt dengan timeout yang benar-benar menghentikan generasi (AbortSignal). */
  async _promptWithTimeout(session, prompt, promptOptions, timeoutMs) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await session.prompt(prompt, { ...promptOptions, signal: controller.signal });
    } catch (err) {
      if (controller.signal.aborted) {
        throw new Error(`LocalIntelligence inference timed out after ${timeoutMs}ms`);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }

  async _doGenerate(prompt, systemPrompt, taskType, options = {}) {
    if (!this.model) throw new Error("Model belum dimuat.");

    const { LlamaChatSession } = await loadLlamaModule();
    const isBuilderTask = BUILDER_TASKS.includes(taskType);
    const context = await this._createContext();

    let responseText;
    try {
      const { prompt: fittedPrompt, maxTokens } = this._fitToContext(
        prompt,
        systemPrompt,
        context.contextSize,
        options.maxTokens || (isBuilderTask ? MAX_TOKENS_BUILDER : MAX_TOKENS_DEFAULT),
      );

      const session = new LlamaChatSession({ contextSequence: context.getSequence(), systemPrompt });
      const promptOptions = {
        temperature: options.temperature ?? (isBuilderTask ? TEMPERATURE_BUILDER : TEMPERATURE_DEFAULT),
        maxTokens,
        grammar: await this._resolveGrammar(options),
      };

      log.info("Prompting local model... (Ini akan memakan waktu)");
      responseText = await this._promptWithTimeout(
        session,
        fittedPrompt,
        promptOptions,
        options.timeoutMs || DEFAULT_TIMEOUT_MS,
      );
    } finally {
      // Selalu bersihkan context agar memori tidak penuh
      await context.dispose().catch(() => {});
    }

    return this.validateOutput(responseText, taskType, { expectJson: Boolean(options.schema) });
  }

  // ── Validasi output ──────────────────────────────────────────

  /**
   * Validasi dan sanitasi output LLM.
   * - Membuang blok <think>…</think> (Qwen3) dan code fence markdown.
   * - expectJson: output harus JSON valid, jika tidak → null (mis. terpotong oleh maxTokens).
   * @returns {string|null}
   */
  validateOutput(output, taskType, { expectJson = false } = {}) {
    if (typeof output !== "string") return null;

    const text = stripCodeFences(stripThinking(output).trim());
    if (!text) return null;

    if (expectJson) {
      try {
        JSON.parse(text);
      } catch (err) {
        log.warn(`Output bukan JSON valid untuk task "${taskType}" (${err.message}). Kemungkinan terpotong oleh maxTokens.`);
        return null;
      }
      return text;
    }

    // ⛔ Anti-hallucination: output tidak boleh terlalu panjang
    if (text.length > this.MAX_OUTPUT_LENGTH) {
      log.warn(
        `Output terlalu panjang (${text.length} chars) untuk task "${taskType}". Truncated to ${this.MAX_OUTPUT_LENGTH}.`,
      );
      return text.slice(0, this.MAX_OUTPUT_LENGTH) + "\n...[TRUNCATED BY BOUNDARY GUARD]";
    }

    return text;
  }
}

module.exports = new LocalIntelligence();
module.exports.LocalIntelligence = LocalIntelligence;
