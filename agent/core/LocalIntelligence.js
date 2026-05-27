// agent/core/LocalIntelligence.js
// NEXUS Local AI Interface v3.0 — Powered by node-llama-cpp
// Enables autonomous code review and reasoning without cloud costs
// ⛔ GUARDRAIL v3.0: Task whitelist + output validation + circuit breaker enforced

// Variabel untuk dynamic import module ESM
let getLlama;
let LlamaChatSession;
const path = require("path");
const fs = require("fs");

// ⛔ PAGAR 1: Whitelist task yang diizinkan — tidak boleh diperluas secara programatik
const ALLOWED_TASKS = [
  "review_code_quality",
  "suggest_refactor",
  "explain_error",
  "validate_migration_schema",
  "analyze_code",
  "generate_architecture",
  "build_model_migration",
  "build_livewire_component",
  "build_view",
  "build_application",
];

// Prompt size guard: ~30KB ≈ 7500 tokens (safe for 4096 num_ctx with system prompt overhead)
const MAX_PROMPT_CHARS = 30000;

class LocalIntelligence {
  constructor() {
    // Lokasi default model (bisa diubah via env variable)
    this.modelPath =
      process.env.NEXUS_MODEL_PATH ||
      path.join(
        process.cwd(),
        "models",
        "qwen2.5-coder-1.5b-instruct-q4_k_m.gguf",
      );

    this.isAvailable = false;

    // ⛔ HARD LIMIT: Disesuaikan untuk memori laptop (Ryzen 2500U)
    this.MAX_TOKENS = 16384;
    this.MAX_OUTPUT_LENGTH = 20000;

    // Availability TTL cache: hindari race condition pada singleton
    this._availabilityCache = { value: false, expiresAt: 0 };

    // Circuit breaker: cegah cascade failure
    this.cb = { state: "CLOSED", failures: 0, openedAt: null };

    // node-llama-cpp instances
    this.llama = null;
    this.model = null;
  }

  async checkAvailability() {
    const now = Date.now();
    if (now < this._availabilityCache.expiresAt) {
      this.isAvailable = this._availabilityCache.value;
      return this._availabilityCache.value;
    }

    try {
      if (!fs.existsSync(this.modelPath)) {
        console.warn(
          `⚠️ LocalIntelligence: Model file not found at ${this.modelPath}. Harap pastikan model sudah terdownload.`,
        );
        this.isAvailable = false;
        this._availabilityCache = { value: false, expiresAt: now + 10000 };
        return false;
      }

      if (!this.llama || !this.model) {
        console.log(
          `🤖 LocalIntelligence: Initializing node-llama-cpp engine...`,
        );
        if (!getLlama) {
          const llamaModule = await import("node-llama-cpp");
          getLlama = llamaModule.getLlama;
          LlamaChatSession = llamaModule.LlamaChatSession;
        }
        this.llama = await getLlama();
        console.log(
          `🤖 LocalIntelligence: Loading model from ${this.modelPath}...`,
        );
        this.model = await this.llama.loadModel({
          modelPath: this.modelPath,
          // Optimasi untuk sistem dengan RAM/VRAM terbatas
          gpuLayers: 0, // Gunakan CPU murni agar stabil (Ryzen 2500U Vega 8)
        });
        console.log(`🤖 LocalIntelligence: Model loaded successfully.`);
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

  async generate(prompt, taskType = "analyze_code", _systemPrompt = null) {
    if (!ALLOWED_TASKS.includes(taskType)) {
      throw new Error(`Boundary Violation: Task "${taskType}" not allowed.`);
    }

    // Chunk prompt jika melebihi batas aman untuk mencegah silent truncation & OOM
    if (typeof prompt === "string" && prompt.length > MAX_PROMPT_CHARS) {
      console.warn(
        `⚠️ LocalIntelligence: Prompt terlalu besar (${prompt.length} chars). ` +
          `Processing in chunks to prevent OOM and silent truncation.`,
      );

      const chunks = [];
      let current = 0;
      while (current < prompt.length) {
        chunks.push(prompt.substring(current, current + MAX_PROMPT_CHARS));
        current += MAX_PROMPT_CHARS;
      }

      console.warn(
        `⚠️ LocalIntelligence: Split prompt into ${chunks.length} chunks.`,
      );

      let combinedResponse = "";
      for (let i = 0; i < chunks.length; i++) {
        console.log(`🤖 Processing prompt chunk ${i + 1}/${chunks.length}...`);
        const chunkResult = await this.generate(
          chunks[i],
          taskType,
          _systemPrompt,
        );
        if (chunkResult) {
          combinedResponse += (combinedResponse ? "\n\n" : "") + chunkResult;
        }
      }
      return combinedResponse;
    }
    let safePrompt = prompt;

    // Circuit breaker: fail fast jika OPEN
    const now = Date.now();
    if (this.cb.state === "OPEN") {
      if (now - this.cb.openedAt < 30000) {
        console.warn(
          "⚡ LocalIntelligence: Circuit breaker OPEN — skipping inference (fail fast).",
        );
        return null;
      }
      // Cooldown finished: transition to HALF-OPEN
      this.cb.state = "HALF-OPEN";
      console.log(
        "⚡ LocalIntelligence: Circuit breaker HALF-OPEN — testing inference availability...",
      );
    }

    if (!this.isAvailable) await this.checkAvailability();
    if (!this.isAvailable) return null;

    const isBuilderTask = [
      "generate_architecture",
      "build_model_migration",
      "build_livewire_component",
      "build_view",
      "build_application",
    ].includes(taskType);

    const LOCKED_SYSTEM_PROMPT = isBuilderTask
      ? `You are an elite TALL Stack Architect (Tailwind, Alpine.js, Laravel, Livewire) for the NEXUS AI framework. ` +
        `Your role is to design and write high-quality, production-ready code. ` +
        `You must generate EXACT, working code based on the user's requirements. ` +
        `Output ONLY the raw code or structured JSON as requested, without any conversational filler or markdown code blocks if the output is meant to be a raw file.`
      : `You are a TALL Stack code reviewer for the NEXUS AI framework. ` +
        `Your role is STRICTLY LIMITED to: ${ALLOWED_TASKS.filter((t) => !["generate_architecture", "build_model_migration", "build_livewire_component", "build_view", "build_application"].includes(t)).join(", ")}. ` +
        `You MUST NOT generate full applications autonomously. ` +
        `Respond in structured format only. Be concise.`;

    try {
      const result = await this._doGenerate(
        safePrompt,
        LOCKED_SYSTEM_PROMPT,
        taskType,
      );
      // Reset circuit breaker on success
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

  // Internal: actual inference using node-llama-cpp
  async _doGenerate(prompt, systemPrompt, taskType) {
    const isBuilderTask = [
      "generate_architecture",
      "build_model_migration",
      "build_livewire_component",
      "build_view",
      "build_application",
    ].includes(taskType);

    const contextSize = isBuilderTask ? 8192 : this.MAX_TOKENS;
    const temperature = isBuilderTask ? 0.7 : 0.1;

    console.log(
      `🧠 LocalIntelligence: Creating context (Size: ${contextSize})...`,
    );
    const context = await this.model.createContext({
      contextSize: contextSize,
      threads: 6, // 6 logical cores to keep laptop responsive
    });

    let responseText = "";
    try {
      const session = new LlamaChatSession({
        contextSequence: context.getSequence(),
        systemPrompt: systemPrompt,
      });

      console.log(`🧠 LocalIntelligence: Prompting model...`);
      responseText = await session.prompt(prompt, {
        temperature: temperature,
        maxTokens: this.MAX_OUTPUT_LENGTH,
      });
    } finally {
      // Selalu bersihkan context setelah selesai agar memori tidak penuh!
      await context.dispose();
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
    const trimmed = output.trim();
    if (trimmed.length === 0) return null;

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
