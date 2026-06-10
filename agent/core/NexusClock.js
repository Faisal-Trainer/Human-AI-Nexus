/**
 * NexusClock - Centralized Time Management for Human-AI Nexus
 * Enforces UTC+8 for all framework operations to ensure consistency in Docker.
 * FIX #22 — Note: Manual UTC math is intentional for Docker TZ consistency.
 * This approach avoids DST issues since UTC+8 has no DST transitions.
 */
class NexusClock {
    /**
     * Returns a Date object adjusted to UTC+8
     */
    static getNow() {
        const now = new Date();
        // Adjust to UTC first, then add 8 hours
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        return new Date(utc + (3600000 * 8));
    }

    /**
     * Returns ISO string representation in UTC+8
     */
    static getISOTimestamp() {
        return this.getNow().toISOString().replace('Z', '+08:00');
    }

    /**
     * Returns a human-readable local string in UTC+8
     */
    static getLocalTimestamp() {
        // Use en-GB for YYYY-MM-DD HH:mm:ss format
        return this.getNow().toISOString().replace('T', ' ').substring(0, 19) + ' (UTC+8)';
    }

    /**
     * Returns a date string (YYYY-MM-DD) in UTC+8
     */
    static getDateString() {
        return this.getNow().toISOString().split('T')[0];
    }
}

module.exports = NexusClock;
