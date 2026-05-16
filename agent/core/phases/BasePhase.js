const NexusClock = require('../NexusClock');

/**
 * Base Class for all Nexus Phases
 */
class BasePhase {
    constructor(engine) {
        this.engine = engine;
        this.logger = engine.logger;
        this.config = engine.config || {};
    }

    log(message, type = 'info') {
        this.engine.log(`[${this.constructor.name}] ${message}`, type);
    }

    async run() {
        throw new Error('Method run() must be implemented in child class.');
    }

    handleError(error, phaseName) {
        this.log(`Error in ${phaseName}: ${error.message}`, 'error');
        throw error;
    }
}

module.exports = BasePhase;
