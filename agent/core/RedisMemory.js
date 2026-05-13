// agent/core/RedisMemory.js
// NEXUS Redis Interface v1.0 — High-speed In-Memory State & Cache
// Optimization for 8GB RAM environments

const { createClient } = require('redis');

class RedisMemory {
    constructor() {
        this.client = createClient();
        this.isConnected = false;
        
        this.client.on('error', (err) => {
            console.error('❌ Redis Error:', err.message);
            this.isConnected = false;
        });
    }

    async connect() {
        if (this.isConnected) return;
        try {
            await this.client.connect();
            this.isConnected = true;
            console.log('🚀 Redis: Connected to in-memory memory bank.');
        } catch (e) {
            console.warn('⚠️ Redis: Connection failed. Falling back to file-based memory.');
            this.isConnected = false;
        }
    }

    async set(key, value, expirySeconds = 3600) {
        if (!this.isConnected) return false;
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
        await this.client.set(key, stringValue, {
            EX: expirySeconds
        });
        return true;
    }

    async get(key) {
        if (!this.isConnected) return null;
        const val = await this.client.get(key);
        try {
            return JSON.parse(val);
        } catch (e) {
            return val;
        }
    }

    async flush() {
        if (!this.isConnected) return;
        await this.client.flushAll();
        console.log('🗑️ Redis: Memory bank cleared.');
    }

    async disconnect() {
        if (this.isConnected) {
            await this.client.disconnect();
            this.isConnected = false;
        }
    }
}

// Export a singleton instance
module.exports = new RedisMemory();
