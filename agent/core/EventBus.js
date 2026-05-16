const EventEmitter = require('events');

// ⛔ EVENT SCHEMA REGISTRY: Semua event wajib terdaftar di sini sebelum bisa di-publish.
// Tambah event baru di sini, BUKAN dengan bypass.
const EVENT_SCHEMA = {
    'SCANNER_TRIGGERED': { required: ['agent', 'pluginPath', 'input'] },
    'SCANNER_FINISHED':  { required: ['task_id', 'result'] },
    'TASK_FAILED':       { required: ['task_id', 'error'] },
    'CYCLE_FINISHED':    { required: [] },
    'MEMORY_UPDATED':    { required: ['category', 'filename'] },
    'AGENT_READY':       { required: ['agent_id'] },
    'AGENT_BUSY':        { required: ['agent_id', 'task_id'] },
    'SYSTEM_PAUSE':      { required: ['reason'] },
    'SYSTEM_RESUME':     { required: [] },
};

class EventBus extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(50); // Support many agents
        this._auditLog = [];
        this._recentEvents = new Set();
    }

    /**
     * Publish an event to all subscribers.
     * ⛔ Event HARUS terdaftar di EVENT_SCHEMA, dan payload HARUS memiliki required fields.
     * @param {string} event - Event name (must be in EVENT_SCHEMA).
     * @param {Object} [payload={}] - Event payload.
     */
    publish(event, payload = {}) {
        // ⛔ Validasi: event harus terdaftar
        if (!EVENT_SCHEMA[event]) {
            console.warn(
                `⚠️  EventBus: Unknown event "${event}". ` +
                `Register it in EVENT_SCHEMA first. Event dropped.`
            );
            return; // Jangan crash — cukup drop event dan warn
        }

        // ⛔ Validasi: required fields harus ada
        const schema = EVENT_SCHEMA[event];
        const missing = schema.required.filter(
            field => !payload || payload[field] === undefined
        );
        if (missing.length > 0) {
            throw new Error(
                `EventBus Schema Violation: Event "${event}" missing required fields: ` +
                `[${missing.join(', ')}]. Got: [${Object.keys(payload || {}).join(', ')}]`
            );
        }

        // FIX #18 — Dedup berdasarkan task_id, bukan seluruh payload JSON
        // Mencegah dua task berbeda (dengan payload mirip) saling men-drop satu sama lain
        const dedupKey = `${event}-${payload?.task_id || JSON.stringify(payload)}`;
        if (this._recentEvents.has(dedupKey)) return;

        this._recentEvents.add(dedupKey);
        setTimeout(() => this._recentEvents.delete(dedupKey), 1000);

        // Audit log
        const entry = {
            event,
            timestamp: new Date().toISOString(),
            payload_keys: Object.keys(payload || {})
        };
        this._auditLog.push(entry);

        this.emit(event, payload);
    }

    subscribe(event, callback) {
        this.on(event, callback);
    }

    unsubscribe(event, callback) {
        this.removeListener(event, callback);
    }

    getAuditLog() { return this._auditLog; }

    clearAuditLog() { this._auditLog = []; }

    /**
     * Get list of all registered event schemas.
     */
    getRegisteredEvents() {
        return Object.keys(EVENT_SCHEMA);
    }
}

// Export as singleton
const instance = new EventBus();
module.exports = instance;
