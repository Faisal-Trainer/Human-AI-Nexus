const NexusClock = require('./NexusClock');

/**
 * NexusError - Custom Error for Production Readiness
 */
class NexusError extends Error {
    constructor(phase, message) {
        super(message);
        this.name = 'NexusError';
        this.phase = phase;
        this.timestamp = NexusClock.getISOTimestamp();
    }
}

module.exports = NexusError;
