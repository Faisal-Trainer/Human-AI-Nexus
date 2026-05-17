// agent/core/LocalIntelligence.js
// NEXUS Local AI Interface v2.1 — Powered by Ollama
// Enables autonomous code review and reasoning without cloud costs
// ⛔ GUARDRAIL v2.1: Task whitelist + output validation + circuit breaker enforced

const axios = require('axios');

// ⛔ PAGAR 1: Whitelist task yang diizinkan — tidak boleh diperluas secara programatik
const ALLOWED_TASKS = [
    'review_code_quality',
    'suggest_refactor',
    'explain_error',
    'validate_migration_schema',
    'analyze_code',
    'generate_architecture',
    'build_model_migration',
    'build_livewire_component',
    'build_view',
    'build_application'
];

// FIX #01 — Prompt size guard: ~30KB ≈ 7500 tokens (safe for 4096 num_ctx with system prompt overhead)
const MAX_PROMPT_CHARS = 30000;

class LocalIntelligence {
    constructor() {
        this.baseUrl = 'http://localhost:11434/api';
        // 🚀 RYZEN 2500U OPTIMIZED: Menggunakan model Q4_K_M yang lebih ringan & cepat
        this.model = 'qwen3:8b'; 
        this.fallbackModels = ['qwen2.5-coder:7b-instruct-q4_K_M', 'qwen2.5-coder:7b', 'deepseek-coder'];
        this.isAvailable = false;

        // ⛔ HARD LIMIT: Disesuaikan untuk memori laptop (Ryzen 2500U)
        this.MAX_TOKENS = 4096; 
        this.MAX_OUTPUT_LENGTH = 20000;

        // FIX #08 — Availability TTL cache: hindari race condition pada singleton
        this._availabilityCache = { value: false, expiresAt: 0 };

        // FIX #09 — Circuit breaker: cegah cascade failure saat Ollama overload
        this.cb = { state: 'CLOSED', failures: 0, openedAt: null };
    }

    // FIX #08 — checkAvailability dengan TTL cache (60s jika sukses, 10s jika gagal)
    async checkAvailability() {
        const now = Date.now();
        if (now < this._availabilityCache.expiresAt) {
            this.isAvailable = this._availabilityCache.value;
            return this._availabilityCache.value;
        }

        try {
            const tagsResponse = await axios.get(`${this.baseUrl}/tags`, { timeout: 5000 });
            const availableModels = tagsResponse.data.models.map(m => m.name);
            
            // Auto-select best model (Prioritaskan qwen3:8b)
            if (availableModels.includes('qwen3:8b')) {
                this.model = 'qwen3:8b';
            } else if (availableModels.includes('qwen2.5-coder:7b-instruct-q4_K_M')) {
                this.model = 'qwen2.5-coder:7b-instruct-q4_K_M';
            } else if (availableModels.includes('qwen2.5-coder:7b')) {
                this.model = 'qwen2.5-coder:7b';
            }

            this.isAvailable = true;
            this._availabilityCache = { value: true, expiresAt: now + 60000 }; // 60s TTL
            console.log(`🤖 Ollama: Ryzen 2500U Active (Model: ${this.model}).`);
            return true;
        } catch (e) {
            console.warn('⚠️ Ollama: Local AI server not found.');
            this.isAvailable = false;
            this._availabilityCache = { value: false, expiresAt: now + 10000 }; // 10s TTL on failure
            return false;
        }
    }

    // FIX #09 — generate() dibungkus circuit breaker
    async generate(prompt, taskType = 'analyze_code', _systemPrompt = null) {
        if (!ALLOWED_TASKS.includes(taskType)) {
            throw new Error(`Boundary Violation: Task "${taskType}" not allowed.`);
        }

        // FIX #01 — Truncate prompt jika melebihi batas aman
        let safePrompt = prompt;
        if (typeof prompt === 'string' && prompt.length > MAX_PROMPT_CHARS) {
            console.warn(
                `⚠️ LocalIntelligence: Prompt terlalu besar (${prompt.length} chars). ` +
                `Truncating to ${MAX_PROMPT_CHARS} chars untuk mencegah OOM.`
            );
            safePrompt = prompt.substring(0, MAX_PROMPT_CHARS) + '\n...[PROMPT TRUNCATED BY SIZE GUARD]';
        }

        // FIX #09 — Circuit breaker: fail fast jika OPEN
        if (this.cb.state === 'OPEN') {
            if (Date.now() - this.cb.openedAt < 30000) {
                console.warn('⚡ LocalIntelligence: Circuit breaker OPEN — skipping Ollama call (fail fast).');
                return null;
            }
            // Setelah 30 detik, coba HALF-OPEN
            this.cb.state = 'HALF-OPEN';
        }

        if (!this.isAvailable) await this.checkAvailability();
        if (!this.isAvailable) return null;

        const isBuilderTask = ['generate_architecture', 'build_model_migration', 'build_livewire_component', 'build_view', 'build_application'].includes(taskType);
        
        const LOCKED_SYSTEM_PROMPT = isBuilderTask
            ? `You are an elite TALL Stack Architect (Tailwind, Alpine.js, Laravel, Livewire) for the NEXUS AI framework. ` +
              `Your role is to design and write high-quality, production-ready code. ` +
              `You must generate EXACT, working code based on the user's requirements. ` +
              `Output ONLY the raw code or structured JSON as requested, without any conversational filler or markdown code blocks if the output is meant to be a raw file.`
            : `You are a TALL Stack code reviewer for the NEXUS AI framework. ` +
              `Your role is STRICTLY LIMITED to: ${ALLOWED_TASKS.filter(t => !['generate_architecture', 'build_model_migration', 'build_livewire_component', 'build_view', 'build_application'].includes(t)).join(', ')}. ` +
              `You MUST NOT generate full applications autonomously. ` +
              `Respond in structured format only. Be concise.`;

        try {
            const result = await this._doGenerate(safePrompt, LOCKED_SYSTEM_PROMPT, taskType);
            // FIX #09 — Reset circuit breaker pada sukses
            this.cb = { state: 'CLOSED', failures: 0, openedAt: null };
            return result;
        } catch (e) {
            // FIX #09 — Increment failure counter
            this.cb.failures++;
            this.cb.openedAt = Date.now();
            if (this.cb.failures >= 3) {
                this.cb.state = 'OPEN';
                console.error(`🔴 LocalIntelligence: Circuit breaker OPEN setelah ${this.cb.failures} kegagalan. Cooldown 30 detik.`);
            }
            console.error('❌ Ollama: Generation failed:', e.message);
            return null;
        }
    }

    // Internal: actual HTTP call ke Ollama
    async _doGenerate(prompt, systemPrompt, taskType) {
        const response = await axios.post(`${this.baseUrl}/generate`, {
            model: this.model,
            prompt: prompt,
            system: systemPrompt,
            stream: false,
            options: {
                // ⚡ RYZEN 2500U TURBO PARAMETERS
                temperature: 0.1,
                num_ctx: this.MAX_TOKENS,
                num_thread: 6,            // 8 logical cores, gunakan 6 agar laptop tetap responsif
                num_batch: 256,           // Batch kecil agar tidak membebani memory bandwidth Vega 8
                use_mmap: true,
                num_gpu: 0,               // Matikan GPU offload jika Vega 8 tidak di-set ROCm/OpenCL
                low_vram: true            // Menghemat RAM sistem yang dishare ke Vega 8
            }
        }, { timeout: 900000 }); // 5 menit timeout per request

        return this.validateOutput(response.data.response, taskType);
    }

    /**
     * Validate and sanitize output from LLM.
     * @param {string} output - Raw output dari LLM.
     * @param {string} taskType - Task type untuk konteks.
     * @returns {string|null}
     */
    validateOutput(output, taskType) {
        // Output harus ada dan string
        if (!output || typeof output !== 'string') return null;

        // Trim whitespace
        const trimmed = output.trim();
        if (trimmed.length === 0) return null;

        // ⛔ Anti-hallucination: output tidak boleh terlalu panjang
        if (trimmed.length > this.MAX_OUTPUT_LENGTH) {
            console.warn(
                `⚠️ LocalIntelligence: Output terlalu panjang (${trimmed.length} chars) ` +
                `untuk task "${taskType}". Truncated to ${this.MAX_OUTPUT_LENGTH}.`
            );
            return trimmed.substring(0, this.MAX_OUTPUT_LENGTH) + '\n...[TRUNCATED BY BOUNDARY GUARD]';
        }

        return trimmed;
    }

    /**
     * Convenience method: Analyze code against TALL stack best practices.
     * @param {string} code - The code to analyze.
     * @param {string} task - Description of what to review.
     */
    async analyzeCode(code, task = 'Review this code for TALL stack best practices.') {
        const prompt = `Task: ${task}\n\nCode:\n\`\`\`php\n${code}\n\`\`\``;
        return await this.generate(prompt, 'analyze_code');
    }

    /**
     * Get current circuit breaker state (untuk diagnostik).
     */
    getCircuitBreakerStatus() {
        return { ...this.cb };
    }
}

module.exports = new LocalIntelligence();
