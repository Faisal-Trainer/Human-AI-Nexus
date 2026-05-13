// agent/core/LocalIntelligence.js
// NEXUS Local AI Interface v1.0 — Powered by Ollama
// Enables autonomous code review and reasoning without cloud costs

const axios = require('axios');

class LocalIntelligence {
    constructor() {
        this.baseUrl = 'http://localhost:11434/api';
        this.model = 'deepseek-coder'; // Default model
        this.isAvailable = false;
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

    async generate(prompt, systemPrompt = "You are Nexus AI, a senior software architect.") {
        if (!this.isAvailable) await this.checkAvailability();
        if (!this.isAvailable) return null;

        try {
            const response = await axios.post(`${this.baseUrl}/generate`, {
                model: this.model,
                prompt: prompt,
                system: systemPrompt,
                stream: false,
                options: {
                    temperature: 0.2,
                    num_ctx: 4096
                }
            });
            return response.data.response;
        } catch (e) {
            console.error('❌ Ollama: Generation failed:', e.message);
            return null;
        }
    }

    async analyzeCode(code, task = "Review this code for TALL stack best practices.") {
        const prompt = `Task: ${task}\n\nCode:\n\`\`\`php\n${code}\n\`\`\``;
        return await this.generate(prompt);
    }
}

module.exports = new LocalIntelligence();
