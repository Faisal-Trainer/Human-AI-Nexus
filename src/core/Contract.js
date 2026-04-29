/**
 * Human-AI Nexus: Data Contracts
 * Mendefinisikan standar interface antar modul agar sistem bersifat deterministik.
 */

class AuditReport {
    constructor(id, target, findings = [], metadata = {}) {
        this.id = id;
        this.target = target;
        this.timestamp = new Date().toISOString();
        this.findings = findings; // Array of { severity, message, file }
        this.metadata = metadata;
    }

    toJSON() {
        return {
            id: this.id,
            type: 'AUDIT_REPORT',
            timestamp: this.timestamp,
            target: this.target,
            findings: this.findings,
            metadata: this.metadata
        };
    }
}

class ImplementationPlan {
    constructor(id, auditRef, tasks = []) {
        this.id = id;
        this.auditRef = auditRef; // Wajib merujuk ke Audit ID
        this.timestamp = new Date().toISOString();
        this.tasks = tasks; // Array of { id, description, status: 'pending'|'done', action: { type, target, ... } }
    }

    toJSON() {
        return {
            id: this.id,
            type: 'IMPLEMENTATION_PLAN',
            auditRef: this.auditRef,
            timestamp: this.timestamp,
            tasks: this.tasks
        };
    }
}

module.exports = { AuditReport, ImplementationPlan };
