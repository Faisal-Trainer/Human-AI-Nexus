const EventEmitter = require('events');

class EventBus extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(50); // Support many agents
        this._auditLog = [];
        this._recentEvents = new Set();
    }

    publish(event, payload) {
        const payloadStr = payload ? JSON.stringify(payload) : 'null';
        const eventKey = `${event}-${payloadStr}`;
        if (this._recentEvents.has(eventKey)) return; // skip duplicate
        
        this._recentEvents.add(eventKey);
        setTimeout(() => this._recentEvents.delete(eventKey), 1000); // clear after 1s
        
        const entry = { event, timestamp: new Date().toISOString(), payload_keys: Object.keys(payload || {}) };
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
}

// Export as singleton
const instance = new EventBus();
module.exports = instance;
