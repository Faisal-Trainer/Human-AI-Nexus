// Variabel untuk dynamic import module ESM
let getLlama;
let LlamaChatSession;
let LlamaJsonSchemaGrammar;
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.resolve(__dirname, "..", "..", ".env") });

// ⛔ PAGAR 1: Whitelist task yang diizinkan — tidak boleh diperluas secara programatik
const ALLOWED_TASKS = [
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
];

// Prompt size guard: Increased to 150000 chars to avoid breaking complex JSON blueprints during skill enhancement
const MAX_PROMPT_CHARS = 150000;

class LocalIntelligence {
  constructor() {
    this.projectRoot = path.resolve(__dirname, "..", "..");
    this.modelPath = this.getModelPath();

    this.isAvailable = false;

    // ⛔ HARD LIMIT: Disesuaikan untuk RAM 8GB (Dinaikkan untuk mengakomodasi JSON blueprint yang besar)
    this.MAX_TOKENS = 65536;
    this.MAX_OUTPUT_LENGTH = 150000;

    // Availability TTL cache: hindari race condition pada singleton
    this._availabilityCache = { value: false, expiresAt: 0 };

    // circuit breaker: cegah cascade failure
    this.cb = { state: "CLOSED", failures: 0, openedAt: null };

    // node-llama-cpp instances
    this.llama = null;
    this.model = null;

    // Predefined GBNF / JSON Schemas (Pilar 5)
    this.schemas = this.initSchemas();
  }

  /**
   * Resolves the configured GGUF model path robustly,
   * stripping quotes and resolving relative paths against the NEXUS project root.
   */
  getModelPath() {
    const projectRoot = this.projectRoot || path.resolve(__dirname, "..", "..");
    const rawEnv = (process.env.NEXUS_MODEL_PATH || "").replace(/^["']|["']$/g, "").trim();

    if (rawEnv) {
      return path.isAbsolute(rawEnv) ? rawEnv : path.resolve(projectRoot, rawEnv);
    }

    // Default fallback to Qwen3-4B if available, otherwise Qwen2.5-3B
    const qwen3Path = path.resolve(projectRoot, "models", "Qwen3-4B-Q4_K_M.gguf");
    if (fs.existsSync(qwen3Path)) {
      return qwen3Path;
    }

    return path.resolve(projectRoot, "models", "qwen2.5-coder-3b-instruct-q4_k_m.gguf");
  }

  async checkAvailability() {
    this.modelPath = this.getModelPath();
    const modelName = process.env.NEXUS_MODEL_NAME || path.basename(this.modelPath, ".gguf");

    const now = Date.now();
    if (now < this._availabilityCache.expiresAt) {
      this.isAvailable = this._availabilityCache.value;
      return this._availabilityCache.value;
    }

    try {
      if (!fs.existsSync(this.modelPath)) {
        console.warn(
          `⚠️ LocalIntelligence: Model file not found at ${this.modelPath} (Model: ${modelName}). Harap pastikan model sudah terdownload.`,
        );
        this.isAvailable = false;
        this._availabilityCache = { value: false, expiresAt: now + 10000 };
        return false;
      }

      if (!this.llama || !this.model) {
        if (!this._initPromise) {
          this._initPromise = (async () => {
            try {
              console.log(
                `🤖 LocalIntelligence: Initializing node-llama-cpp engine...`,
              );
              if (!getLlama) {
                const llamaModule = await import("node-llama-cpp");
                getLlama = llamaModule.getLlama;
                LlamaChatSession = llamaModule.LlamaChatSession;
                LlamaJsonSchemaGrammar = llamaModule.LlamaJsonSchemaGrammar;
              }
              const isCpuTrain = process.env.NEXUS_CPU_ONLY === 'true';
              this.llama = await getLlama(isCpuTrain ? { gpu: false } : {});
              console.log(
                `🤖 LocalIntelligence: Loading model [${modelName}] from ${this.modelPath}...`,
              );
              const rawGpu = process.env.NEXUS_GPU_LAYERS;
              let initialGpuLayers = isCpuTrain ? 0 : "max";
              if (!isCpuTrain && rawGpu !== undefined && rawGpu !== "max" && !isNaN(parseInt(rawGpu))) {
                initialGpuLayers = parseInt(rawGpu);
              }
              this.currentGpuLayers = initialGpuLayers;
              this.model = await this.llama.loadModel({
                modelPath: this.modelPath,
                gpuLayers: initialGpuLayers,
              });
              console.log(`🤖 LocalIntelligence: Model [${modelName}] loaded successfully (gpuLayers: ${initialGpuLayers}).`);
            } catch (err) {
              this._initPromise = null;
              throw err;
            }
          })();
        }
        await this._initPromise;
      }

      this.isAvailable = true;
      this._availabilityCache = { value: true, expiresAt: now + 60000 }; // 60s TTL
      return true;
    } catch (e) {
      console.warn(
        `⚠️ LocalIntelligence: Failed to initialize model. ${e.message}`,
      );
      this.isAvailable = false;
      this._availabilityCache = { value: false, expiresAt: now + 10000 }; // 10s TTL on failure
      return false;
    }
  }

  /**
   * Reload model with custom gpuLayers (e.g. fallback to CPU with gpuLayers = 0)
   * When fallbackToCpuEngine is true, initializes a pure CPU Llama backend to bypass Vulkan completely.
   */
  async _reloadModel(gpuLayers = 0, fallbackToCpuEngine = false) {
    const modelName = process.env.NEXUS_MODEL_NAME || path.basename(this.modelPath, ".gguf");
    console.log(`⚡ LocalIntelligence: Reloading model [${modelName}] with gpuLayers: ${gpuLayers}${fallbackToCpuEngine ? " (pure CPU engine)" : ""}...`);
    
    if (this.model) {
      try {
        await this.model.dispose();
      } catch (_) {}
      this.model = null;
    }

    if (fallbackToCpuEngine) {
      try {
        if (this.llama) {
          await this.llama.dispose();
        }
      } catch (_) {}
      if (!getLlama) {
        const llamaModule = await import("node-llama-cpp");
        getLlama = llamaModule.getLlama;
        LlamaChatSession = llamaModule.LlamaChatSession;
        LlamaJsonSchemaGrammar = llamaModule.LlamaJsonSchemaGrammar;
      }
      this.llama = await getLlama({ gpu: false });
    }

    this.model = await this.llama.loadModel({
      modelPath: this.modelPath,
      gpuLayers: gpuLayers,
    });
    this.currentGpuLayers = gpuLayers;
    console.log(`⚡ LocalIntelligence: Model reloaded successfully with gpuLayers: ${gpuLayers}.`);
  }

  /**
   * Predefined JSON Schemas for GBNF Constrained Decoding (Pilar 5)
   */
  initSchemas() {
    return {
      blueprintApp: {
        type: "object",
        properties: {
          project_name: { type: "string" },
          framework: { type: "string" },
          description: { type: "string" },
          models: { type: "array", items: { type: "string" } },
          routes: { type: "array", items: { type: "string" } },
          livewire_components: { type: "array", items: { type: "string" } },
          relationships: {
            type: "array",
            items: {
              type: "object",
              properties: {
                model: { type: "string" },
                type: { type: "string" },
                target: { type: "string" }
              },
              required: ["model", "type", "target"]
            }
          }
        },
        required: ["project_name", "framework", "models", "routes"]
      },
      postMortem: {
        type: "object",
        properties: {
          title: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          severity: { type: "string", enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
          root_cause: { type: "string" },
          resolution: { type: "string" },
          preventive_measures: { type: "array", items: { type: "string" } }
        },
        required: ["title", "severity", "root_cause", "resolution"]
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
                fix: { type: "string" }
              },
              required: ["severity", "message"]
            }
          },
          suggestions: { type: "array", items: { type: "string" } }
        },
        required: ["valid", "score", "issues"]
      },
      schemaValidation: {
        type: "object",
        properties: {
          valid: { type: "boolean" },
          errors: { type: "array", items: { type: "string" } },
          warnings: { type: "array", items: { type: "string" } },
          recommendations: { type: "array", items: { type: "string" } }
        },
        required: ["valid", "errors", "warnings"]
      }
    };
  }

  /**
   * Task complexity scoring for Model Routing
   * Scores from 0 to 100 and assigns optimal tier:
   *   Tier 0 (< 20): Heuristic / Zero-LLM instant validation (<1ms, 0 MB)
   *   Tier 1 (>= 20): Fast Local Model via node-llama-cpp
   */
  scoreTaskComplexity(taskType, prompt = "", options = {}) {
    if (options.tier !== undefined) {
      if (typeof options.tier === "number") return options.tier === 0 ? 0 : 1;
      if (options.tier === "tier_0_heuristic" || options.tier === "tier_0") return 0;
      return 1;
    }

    let score = 30;
    const taskBaseScores = {
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
    };

    if (taskBaseScores[taskType] !== undefined) {
      score = taskBaseScores[taskType];
    }

    const pLen = typeof prompt === "string" ? prompt.length : 0;
    if (pLen > 2000) score += 15;
    else if (pLen > 5000) score += 25;

    const lowerPrompt = (prompt || "").toLowerCase();
    if (lowerPrompt.includes("multi-tenant") || lowerPrompt.includes("architecture") || lowerPrompt.includes("full stack")) {
      score += 15;
    }
    if (lowerPrompt.includes("syntax") || lowerPrompt.includes("regex") || lowerPrompt.includes("assert")) {
      score -= 10;
    }

    if (score < 20) return 0;
    return 1;
  }

  /**
   * Tier 0: Zero-LLM instant heuristics, regex validator, static TDD assertions (< 1ms, 0 MB)
   */
  executeHeuristic(taskType, prompt = "") {
    if (taskType === "validate_migration_schema") {
      const errors = [];
      const warnings = [];
      const recommendations = [];
      const text = typeof prompt === "string" ? prompt : JSON.stringify(prompt);

      if (text.includes("Schema::create") && !text.includes("timestamps()")) {
        warnings.push("Tabel tidak mendefinisikan $table->timestamps(). Disarankan untuk audit data.");
        recommendations.push("Tambahkan $table->timestamps(); pada migrasi.");
      }

      const rawIntFk = text.match(/\$table->(?:unsigned)?(?:big)?integer\s*\(\s*['"]([a-zA-Z0-9_]+_id)['"]\s*\)/g);
      if (rawIntFk && !text.includes("foreign(") && !text.includes("foreignId(")) {
        errors.push(`Deteksi foreign key primitif (${rawIntFk.join(", ")}) tanpa foreign constraint.`);
        recommendations.push("Gunakan $table->foreignId('...')->constrained()->cascadeOnDelete(); untuk integritas referensial.");
      }

      if (text.includes("Schema::create") && !text.includes("id()") && !text.includes("primary(")) {
        errors.push("Tabel tidak memiliki primary key ($table->id() atau $table->primary()).");
      }

      if (text.includes("function up") && !text.includes("dropIfExists")) {
        warnings.push("Method down() sebaiknya menyertakan Schema::dropIfExists untuk rollback yang aman.");
      }

      const valid = errors.length === 0;
      return JSON.stringify({
        valid,
        tier: "tier_0_heuristic",
        execution_time_ms: 0.5,
        errors,
        warnings,
        recommendations
      }, null, 2);
    }

    if (taskType === "review_code_quality") {
      const text = typeof prompt === "string" ? prompt : JSON.stringify(prompt);
      const issues = [];

      if (text.includes("@livewire(")) {
        issues.push({
          severity: "warning",
          message: "Penggunaan tag legasi @livewire(). Disarankan menggunakan tag modern <livewire:... />.",
          fix: "Ganti @livewire('component-name') menjadi <livewire:component-name />"
        });
      }

      if (/DB::raw\s*\(\s*(?:['"][^'"]*\$|['"][^'"]*['"]\s*\.\s*\$[a-zA-Z0-9_]+)/i.test(text)) {
        issues.push({
          severity: "error",
          message: "Potensi SQL Injection terdeteksi dalam DB::raw() dengan konkatenasi variabel langsung.",
          fix: "Gunakan parameterized query atau Eloquent bindings alih-alih merangkai query langsung."
        });
      }

      if (/env\s*\(\s*['"][A-Z0-9_]+['"]\s*\)/.test(text) && !text.includes("config/")) {
        issues.push({
          severity: "warning",
          message: "Pemanggilan helper env() langsung di luar file konfigurasi berisiko mengembalikan null saat config:cache aktif.",
          fix: "Gunakan helper config('app.key') dan definisikan di file konfigurasi."
        });
      }

      if (issues.length > 0) {
        return JSON.stringify({
          valid: issues.filter(i => i.severity === "error").length === 0,
          tier: "tier_0_heuristic",
          score: Math.max(10, 100 - (issues.length * 20)),
          issues,
          suggestions: issues.map(i => i.fix)
        }, null, 2);
      }
    }

    return null;
  }

  /**
   * Generates output with Model Routing and GBNF Grammar Constraints (Pilar 5).
   * @param {string} prompt - Prompt for the model.
   * @param {string} taskType - Task type (must be in ALLOWED_TASKS).
   * @param {string|null} _systemPrompt - Optional custom system prompt.
   * @param {Object} options - Options: { tier, schema, grammar, model, ... }
   */
  async generate(prompt, taskType = "analyze_code", _systemPrompt = null, options = {}) {
    if (!ALLOWED_TASKS.includes(taskType)) {
      throw new Error(`Boundary Violation: Task "${taskType}" not allowed.`);
    }

    // Resolve schema preset name if passed as string (e.g. options.schema = "blueprintApp")
    if (options.schema && typeof options.schema === "string" && this.schemas[options.schema]) {
      options.schema = this.schemas[options.schema];
    }

    let safePrompt = prompt;
    // Truncate prompt jika melebihi batas (sekarang dinaikkan menjadi 150k karakter)
    if (typeof prompt === "string" && prompt.length > MAX_PROMPT_CHARS) {
      console.warn(
        `⚠️ LocalIntelligence: Prompt terlalu besar (${prompt.length} chars). ` +
          `Truncating to fit in context window to prevent crashes (no chunking).`,
      );
      const halfLimit = Math.floor(MAX_PROMPT_CHARS / 2);
      safePrompt = prompt.substring(0, halfLimit) + 
                   "\n\n...[PROMPT TRUNCATED DUE TO RAM LIMIT]...\n\n" + 
                   prompt.substring(prompt.length - halfLimit);
    }

    const isBuilderTask = [
      "generate_architecture",
      "build_model_migration",
      "build_livewire_component",
      "build_view",
      "build_application",
      "build_routes",
    ].includes(taskType);

    const LOCKED_SYSTEM_PROMPT = isBuilderTask
      ? `You are an elite TALL Stack Architect (Tailwind, Alpine.js, Laravel, Livewire) for the NEXUS AI framework. ` +
        `Your role is to design and write high-quality, production-ready code. ` +
        `You must generate EXACT, working code based on the user's requirements. ` +
        `Output ONLY the raw code or structured JSON as requested, without any conversational filler or markdown code blocks if the output is meant to be a raw file.`
      : `You are a TALL Stack code reviewer for the NEXUS AI framework. ` +
        `Your role is STRICTLY LIMITED to: ${ALLOWED_TASKS.filter((t) => !["generate_architecture", "build_model_migration", "build_livewire_component", "build_view", "build_application", "build_routes"].includes(t)).join(", ")}. ` +
        `You MUST NOT generate full applications autonomously. ` +
        `Respond in structured format only. Be concise.`;

    const systemPrompt = _systemPrompt || LOCKED_SYSTEM_PROMPT;

    // ── MODEL ROUTING ──
    const targetTier = this.scoreTaskComplexity(taskType, safePrompt, options);

    // TIER 0: Heuristic / Zero-LLM instant validation (<1ms, 0 MB)
    if (targetTier === 0 || options.tier === 0 || options.tier === "tier_0_heuristic") {
      console.log(`⚡ LocalIntelligence: Routing task "${taskType}" to Tier 0 (Heuristic Engine)...`);
      const heuristicResult = this.executeHeuristic(taskType, safePrompt);
      if (heuristicResult) {
        return heuristicResult;
      }
      console.log(`ℹ️ LocalIntelligence: Heuristic rule didn't cover task "${taskType}". Routing to Tier 1...`);
    }

    // TIER 1: Fast Local Model via node-llama-cpp (Qwen2.5-Coder + GBNF)
    console.log(`🧠 LocalIntelligence: Routing task "${taskType}" to Tier 1 (Fast Local node-llama-cpp)...`);

    // Circuit breaker: fail fast jika OPEN
    const now = Date.now();
    if (this.cb.state === "OPEN") {
      if (now - this.cb.openedAt < 30000) {
        console.warn(
          "⚡ LocalIntelligence: Circuit breaker OPEN — skipping inference (fail fast).",
        );
        return null;
      }
      this.cb.state = "HALF-OPEN";
      console.log(
        "⚡ LocalIntelligence: Circuit breaker HALF-OPEN — testing inference availability...",
      );
    }

    if (!this.isAvailable) await this.checkAvailability();
    if (!this.isAvailable) return null;

    try {
      const result = await this._doGenerate(
        safePrompt,
        systemPrompt,
        taskType,
        options,
      );
      this.cb = { state: "CLOSED", failures: 0, openedAt: null };
      return result;
    } catch (e) {
      this.cb.openedAt = Date.now();
      if (this.cb.state === "HALF-OPEN") {
        this.cb.state = "OPEN";
        this.cb.failures = 3;
        console.error(
          `🔴 LocalIntelligence: Circuit breaker HALF-OPEN test failed. Returned to OPEN. Cooldown 30 detik.`,
        );
      } else {
        this.cb.failures++;
        if (this.cb.failures >= 3) {
          this.cb.state = "OPEN";
          console.error(
            `🔴 LocalIntelligence: Circuit breaker transitioned to OPEN after ${this.cb.failures} failures. Cooldown 30 detik.`,
          );
        }
      }
      console.error("❌ LocalIntelligence: Generation failed:", e.message);
      return null;
    }
  }

  // Internal: actual inference on local node-llama-cpp (Tier 1)
  async _doGenerate(prompt, systemPrompt, taskType, options = {}) {
    const isBuilderTask = [
      "generate_architecture",
      "build_model_migration",
      "build_livewire_component",
      "build_view",
      "build_application",
      "build_routes",
    ].includes(taskType);

    const temperature = isBuilderTask ? 0.7 : 0.1;
    let responseText = "";

    // ── LOCAL NODE-LLAMA-CPP INFERENCE ──
    let requestedSize = process.env.NEXUS_CONTEXT_SIZE ? parseInt(process.env.NEXUS_CONTEXT_SIZE, 10) : 1024;
    if (!Number.isFinite(requestedSize) || requestedSize < 512) requestedSize = 1024;
    const candidateSizes = [requestedSize, 1024, 768, 512].filter((s, idx, self) => s <= requestedSize && self.indexOf(s) === idx);

    let context = null;
    let threads = parseInt(process.env.NEXUS_CPU_THREADS) || 2;

    for (const size of candidateSizes) {
      try {
        console.log(
          `🧠 LocalIntelligence: Creating context (Size: ${size}) [LOCAL INFERENCE]...`,
        );
        context = await this.model.createContext({
          contextSize: size,
          threads: threads,
        });
        break;
      } catch (err) {
        console.warn(`⚠️ LocalIntelligence: Failed to create context (Size: ${size}): ${err.message}`);
        const isVulkanOom = err.message?.includes("OutOfDeviceMemory") ||
                            err.message?.includes("allocate") ||
                            err.message?.includes("Vulkan") ||
                            err.message?.includes("kv cache");

        if (isVulkanOom && this.currentGpuLayers !== 0) {
          console.warn(`⚡ LocalIntelligence: Vulkan/GPU VRAM exhausted. Falling back to pure CPU engine...`);
          try {
            await this._reloadModel(0, true);
            context = await this.model.createContext({
              contextSize: size,
              threads: threads,
            });
            break;
          } catch (cpuErr) {
            console.warn(`⚠️ LocalIntelligence: CPU Context creation failed (Size: ${size}): ${cpuErr.message}`);
          }
        }
      }
    }

    if (!context) {
      throw new Error("Failed to create context for local LLM after trying all memory/CPU fallback strategies.");
    }

    try {
      const session = new LlamaChatSession({
        contextSequence: context.getSequence(),
        systemPrompt: systemPrompt,
      });

      console.log(
        `🧠 LocalIntelligence: Prompting local model... (Ini akan memakan waktu)`,
      );

      const promptOptions = {
        temperature: temperature,
        maxTokens: options.maxTokens || (isBuilderTask ? 4096 : 2048),
      };

      // 🛡️ GBNF JSON Schema Grammar Constraint (Pilar 5)
      if (options && options.schema && this.llama) {
        try {
          console.log(`🛡️ LocalIntelligence: Enforcing GBNF JSON Schema Grammar...`);
          promptOptions.grammar = await this.llama.createGrammarForJsonSchema(options.schema);
        } catch (gErr) {
          console.warn(`⚠️ LocalIntelligence: Could not compile schema grammar: ${gErr.message}. Proceeding without grammar.`);
        }
      } else if (options && options.grammar) {
        promptOptions.grammar = options.grammar;
      }

      // ⏱️ TIMEOUT PROTECTION: Prevent indefinite hang on local inference
      const timeoutMs = options.timeoutMs || 120000; // 2 minutes default
      let timeoutHandle;
      const timeoutPromise = new Promise((_, reject) => {
        timeoutHandle = setTimeout(
          () => reject(new Error(`LocalIntelligence inference timed out after ${timeoutMs}ms`)),
          timeoutMs
        );
      });

      try {
        responseText = await Promise.race([
          session.prompt(prompt, promptOptions),
          timeoutPromise,
        ]);
      } finally {
        if (timeoutHandle) clearTimeout(timeoutHandle);
      }
    } finally {
      // Selalu bersihkan context setelah selesai agar memori tidak penuh!
      await context.dispose().catch(() => {});
    }

    return this.validateOutput(responseText, taskType);
  }

  /**
   * Validate and sanitize output from LLM.
   * @param {string} output - Raw output dari LLM.
   * @param {string} taskType - Task type untuk konteks.
   * @returns {string|null}
   */
  validateOutput(output, taskType) {
    // Output harus ada dan string
    if (!output || typeof output !== "string") return null;

    // Trim whitespace
    let trimmed = output.trim();
    if (trimmed.length === 0) return null;

    // 🔧 Strip markdown code fences (```json ... ``` or ``` ... ```)
    // Qwen models frequently wrap JSON output in markdown fences which breaks JSON.parse
    if (trimmed.startsWith("```")) {
      // Remove opening fence (```json, ```JSON, ```, etc.)
      trimmed = trimmed.replace(/^```(?:json|JSON)?\s*\n?/, "");
      // Remove closing fence
      trimmed = trimmed.replace(/\n?```\s*$/, "");
      trimmed = trimmed.trim();
    }

    // ⛔ Anti-hallucination: output tidak boleh terlalu panjang
    if (trimmed.length > this.MAX_OUTPUT_LENGTH) {
      console.warn(
        `⚠️ LocalIntelligence: Output terlalu panjang (${trimmed.length} chars) ` +
          `untuk task "${taskType}". Truncated to ${this.MAX_OUTPUT_LENGTH}.`,
      );
      return (
        trimmed.substring(0, this.MAX_OUTPUT_LENGTH) +
        "\n...[TRUNCATED BY BOUNDARY GUARD]"
      );
    }

    return trimmed;
  }

  /**
   * Convenience method: Analyze code against TALL stack best practices.
   * @param {string} code - The code to analyze.
   * @param {string} task - Description of what to review.
   */
  async analyzeCode(
    code,
    task = "Review this code for TALL stack best practices.",
  ) {
    const prompt = `Task: ${task}\n\nCode:\n\`\`\`php\n${code}\n\`\`\``;
    return await this.generate(prompt, "analyze_code");
  }

  /**
   * Get current circuit breaker state (untuk diagnostik).
   */
  getCircuitBreakerStatus() {
    return { ...this.cb };
  }
}

module.exports = new LocalIntelligence();
