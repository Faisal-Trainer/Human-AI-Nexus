const EventEmitter = require('events');

class EventBus extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(50); // Support many agents
    }

    publish(event, payload) {
        this.emit(event, payload);
    }

    subscribe(event, callback) {
        this.on(event, callback);
    }

    unsubscribe(event, callback) {
        this.removeListener(event, callback);
    }
}

// Export as singleton
const instance = new EventBus();
module.exports = instance;
