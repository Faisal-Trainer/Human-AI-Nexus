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

    static validate(data) {
        const required = ['id', 'target', 'findings'];
        const missing = required.filter(field => !data[field]);
        if (missing.length > 0) throw new Error(`Contract Violation: Missing fields [${missing.join(', ')}] in AuditReport.`);
        return true;
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

    static validate(data) {
        const required = ['id', 'auditRef', 'tasks'];
        const missing = required.filter(field => !data[field]);
        if (missing.length > 0) throw new Error(`Contract Violation: Missing fields [${missing.join(', ')}] in ImplementationPlan.`);
        return true;
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
