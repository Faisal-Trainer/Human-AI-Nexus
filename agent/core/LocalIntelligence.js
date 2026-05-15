// agent/core/LocalIntelligence.js
// NEXUS Local AI Interface v2.0 — Powered by Ollama
// Enables autonomous code review and reasoning without cloud costs
// ⛔ GUARDRAIL v2.0: Task whitelist + output validation enforced

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

class LocalIntelligence {
    constructor() {
        this.baseUrl = 'http://localhost:11434/api';
        // 🚀 RYZEN 2500U OPTIMIZED: Menggunakan model Q4_K_M yang lebih ringan & cepat
        this.model = 'qwen2.5-coder:7b-instruct-q4_K_M'; 
        this.fallbackModels = ['qwen2.5-coder:7b', 'qwen3:8b', 'deepseek-coder'];
        this.isAvailable = false;

        // ⛔ HARD LIMIT: Disesuaikan untuk memori laptop (Ryzen 2500U)
        this.MAX_TOKENS = 4096; 
        this.MAX_OUTPUT_LENGTH = 20000; 
    }

    async checkAvailability() {
        try {
            const tagsResponse = await axios.get(`${this.baseUrl}/tags`);
            const availableModels = tagsResponse.data.models.map(m => m.name);
            
            // Auto-select best model (Ryzen 2500U Preference: Q4_K_M)
            if (availableModels.includes('qwen2.5-coder:7b-instruct-q4_K_M')) {
                this.model = 'qwen2.5-coder:7b-instruct-q4_K_M';
            } else if (availableModels.includes('qwen2.5-coder:7b')) {
                this.model = 'qwen2.5-coder:7b';
            }

            this.isAvailable = true;
            console.log(`🤖 Ollama: Ryzen 2500U Active (Model: ${this.model}).`);
            return true;
        } catch (e) {
            console.warn('⚠️ Ollama: Local AI server not found.');
            this.isAvailable = false;
            return false;
        }
    }

    async generate(prompt, taskType = 'analyze_code', _systemPrompt = null) {
        // ... (kode validasi task tetap sama) ...
        if (!ALLOWED_TASKS.includes(taskType)) {
            throw new Error(`Boundary Violation: Task "${taskType}" not allowed.`);
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
            const response = await axios.post(`${this.baseUrl}/generate`, {
                model: this.model,
                prompt: prompt,
                system: LOCKED_SYSTEM_PROMPT,
                stream: false,
                options: {
                    // ⚡ RYZEN 2500U TURBO PARAMETERS
                    temperature: 0.1,
                    num_ctx: this.MAX_TOKENS,
                    num_thread: 6,            // 8 logical cores, gunakan 6 agar laptop tetap responsif
                    num_batch: 256,           // Batch kecil agar tidak membebani memory bandwidth Vega 8
                    use_mmap: true,
                    num_gpu: 0,               // Matikan GPU offload jika Vega 8 tidak di-set ROCm/OpenCL (lebih stabil di CPU)
                    low_vram: true            // Menghemat RAM sistem yang dishare ke Vega 8
                }
            });

            return this.validateOutput(response.data.response, taskType);
        } catch (e) {
            console.error('❌ Ollama: Generation failed:', e.message);
            return null;
        }
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
}

module.exports = new LocalIntelligence();
