// agent/core/RedisMemory.js — v2.1.0
// FIX #05 — flush() hanya hapus key dengan prefix NEXUS, bukan flushAll()
// FIX #16 — Auto-connect lazy pattern: get/set tidak perlu panggil connect() manual

const { createClient } = require('redis');

// FIX #05 — Semua key NEXUS menggunakan prefix ini agar tidak konflik dengan app lain
const NEXUS_PREFIX = 'nexus:';

class RedisMemory {
    constructor() {
        this.client = null;
        this.isConnected = false;
        this._connectingPromise = null;
    }

    async connect() {
        if (this.isConnected) return;
        // FIX #16 — Jika sedang connecting, tunggu promise yang sama (tidak double-connect)
        if (this._connectingPromise) return this._connectingPromise;

        this._connectingPromise = (async () => {
            try {
                if (!this.client) {
                    this.client = createClient();
                    this.client.on('error', (err) => {
                        console.error('❌ Redis Error:', err.message);
                        this.isConnected = false;
                        this._connectingPromise = null;
                    });
                }
                await this.client.connect();
                this.isConnected = true;
                console.log('🚀 Redis: Connected to in-memory memory bank.');
            } catch (e) {
                console.warn('⚠️ Redis: Connection failed. Falling back to file-based memory.');
                this.isConnected = false;
            } finally {
                this._connectingPromise = null;
            }
        })();

        return this._connectingPromise;
    }

    // FIX #16 — Auto-connect: tidak perlu panggil connect() secara eksplisit
    async _ensureConnected() {
        if (!this.isConnected) await this.connect();
    }

    async set(key, value, expirySeconds = 3600) {
        await this._ensureConnected();
        if (!this.isConnected) return false;
        // FIX #05 — Semua key diberi prefix NEXUS
        const namespacedKey = `${NEXUS_PREFIX}${key}`;
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
        await this.client.set(namespacedKey, stringValue, { EX: expirySeconds });
        return true;
    }

    async get(key) {
        await this._ensureConnected();
        if (!this.isConnected) return null;
        // FIX #05 — Gunakan namespaced key
        const namespacedKey = `${NEXUS_PREFIX}${key}`;
        const val = await this.client.get(namespacedKey);
        if (val === null) return null;
        try {
            return JSON.parse(val);
        } catch (e) {
            return val;
        }
    }

    // FIX #05 — Hapus hanya key dengan NEXUS_PREFIX, bukan flushAll() seluruh Redis
    async flush() {
        await this._ensureConnected();
        if (!this.isConnected) return;
        try {
            const keys = await this.client.keys(`${NEXUS_PREFIX}*`);
            if (keys.length > 0) {
                await this.client.del(keys);
                console.log(`🗑️ Redis: Cleared ${keys.length} NEXUS keys (other apps unaffected).`);
            } else {
                console.log('🗑️ Redis: No NEXUS keys to clear.');
            }
        } catch (e) {
            console.warn(`⚠️ Redis flush error: ${e.message}`);
        }
    }

    async disconnect() {
        if (this._connectingPromise) {
            try {
                await this._connectingPromise;
            } catch (e) {}
        }
        try {
            await this.client.disconnect();
        } catch (e) {}
        this.isConnected = false;
    }
}

// Export a singleton instance
module.exports = new RedisMemory();
