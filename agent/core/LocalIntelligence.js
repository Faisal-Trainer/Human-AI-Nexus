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
        this.model = 'deepseek-coder'; // Default model
        this.isAvailable = false;

        // ⛔ HARD LIMIT: Ditingkatkan untuk mendukung Code Generation
        this.MAX_TOKENS = 4096;
        this.MAX_OUTPUT_LENGTH = 15000;
    }

    async checkAvailability() {
        try {
            await axios.get(`${this.baseUrl}/tags`);
            this.isAvailable = true;
            console.log(`🤖 Ollama: Local AI Intelligence active (Model: ${this.model}).`);
            return true;
        } catch (e) {
            console.warn('⚠️ Ollama: Local AI server not found. Falling back to rule-based logic.');
            this.isAvailable = false;
            return false;
        }
    }

    /**
     * Generate a response from the local LLM.
     * @param {string} prompt - The prompt to send to the LLM.
     * @param {string} taskType - WAJIB: Task type yang harus ada di ALLOWED_TASKS.
     * @param {string} [_systemPrompt] - Diabaikan — system prompt dikunci di sini.
     */
    async generate(prompt, taskType = 'analyze_code', _systemPrompt = null) {
        // ⛔ WAJIB: Validate task type sebelum apapun
        if (!ALLOWED_TASKS.includes(taskType)) {
            throw new Error(
                `LocalIntelligence Boundary Violation: ` +
                `Task "${taskType}" tidak ada dalam whitelist. ` +
                `Allowed: [${ALLOWED_TASKS.join(', ')}]`
            );
        }

        if (!this.isAvailable) await this.checkAvailability();
        if (!this.isAvailable) return null;

        // ⛔ System prompt DIKUNCI & DINAMIS — tidak bisa di-override dari luar
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
                    temperature: 0.1,   // Lebih deterministik
                    num_ctx: 512
                }
            });

            // ⛔ WAJIB: Validate output sebelum dikembalikan
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
