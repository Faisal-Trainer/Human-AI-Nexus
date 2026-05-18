const NexusClock = require('./NexusClock');

/**
 * NexusError - Custom Error for Production Readiness
 */
class NexusError extends Error {
    constructor(domain, message, code = 'NEXUS_UNKNOWN') {
        super(`[${domain}] ${message}`);
        this.name = 'NexusError';
        this.domain = domain;
        this.phase = domain; // backward compatibility
        this.code = code;
        this.timestamp = NexusClock.getISOTimestamp();
    }
}

module.exports = NexusError;
