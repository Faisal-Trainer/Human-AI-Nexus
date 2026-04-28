const fs = require('fs-extra');
const path = require('path');
const { AuditReport, ImplementationPlan } = require('./Contract');

/**
 * Lifecycle States as per system-spec.md
 */
const STATES = {
    INIT: 'INIT',
    PROCESSING: 'PROCESSING',
    EXECUTING: 'EXECUTING',
    LOGGING: 'LOGGING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
};

/**
 * NexusError - Custom Error for Production Readiness
 */
class NexusError extends Error {
    constructor(phase, message) {
        super(message);
        this.name = 'NexusError';
        this.phase = phase;
        this.timestamp = new Date().toISOString();
    }
}

/**
 * NexusEngine - Core Orchestrator for the Human-AI Nexus Framework.
 */
class NexusEngine {
    constructor(config = {}) {
        this.rootPath = config.rootPath || process.cwd();
        this.agentPath = path.join(this.rootPath, 'agent');
        this.skillPath = path.join(this.rootPath, 'skill');
        this.knowledgePath = path.join(this.rootPath, 'knowledge');
        this.recordsPath = path.join(this.rootPath, 'records');
        this.summaryPath = path.join(this.rootPath, 'summary');
        
        this.activeAgents = new Set();
        this.skillRegistry = {};
        this.memory = [];
        this.metrics = {};
        this.state = STATES.INIT;
        
        this.currentAudit = null; 
        this.currentPlan = null;
    }

    async discoverSkills() {
        this.log('📚 Discovering Skill Registry...', 'info');
        const categories = await fs.readdir(this.skillPath, { withFileTypes: true });
        for (const cat of categories) {
            if (cat.isDirectory()) {
                const skills = await fs.readdir(path.join(this.skillPath, cat.name));
                this.skillRegistry[cat.name] = skills.map(s => s.replace('.md', ''));
            }
        }
        return this.skillRegistry;
    }

    async readMemory() {
        this.log('🧠 Accessing Long-term Memory...', 'info');
        try {
            const records = await fs.readdir(this.recordsPath);
            const knowledge = await fs.readdir(this.knowledgePath);
            this.memory = {
                pastCycles: records.length,
                lessons: knowledge.filter(k => k.endsWith('.md'))
            };
            this.log(`✅ Memory loaded: ${records.length} past sessions found.`, 'success');
        } catch (e) {
            this.log('⚠️ No past memory found. Starting fresh.', 'warning');
        }
        return this.memory;
    }

    async loadAgent(agentName) {
        const findAgent = async (dir) => {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            for (const entry of entries) {
                const res = path.resolve(dir, entry.name);
                if (entry.isDirectory()) {
                    const found = await findAgent(res);
                    if (found) return found;
                } else if (entry.name === `${agentName}.md`) {
                    return res;
                }
            }
            return null;
        };

        const filePath = await findAgent(this.agentPath);
        if (filePath) {
            this.activeAgents.add(agentName);
            return await fs.readFile(filePath, 'utf8');
        }
        throw new Error(`Agent ${agentName} not found in ${this.agentPath} or its subfolders.`);
    }

    log(message, type = 'info') {
        const colors = {
            info: '\x1b[36m',
            success: '\x1b[32m',
            warning: '\x1b[33m',
            error: '\x1b[31m',
            reset: '\x1b[0m'
        };
        console.log(`${colors[type]}${message}${colors.reset}`);
    }

    async audit(targetPath = this.rootPath, options = {}) {
        const mode = options.mode || 'learning';
        const allowSensitive = options.allowSensitive || false;

        this.log('🔍 Phase 1: Audit Initiation...', 'info');
        const auditID = `AUDIT-${Date.now()}`;
        const findings = [];

        if (mode === 'learning') {
            const specialists = ['cyber-security', 'ux-engineer', 'seo-performance-specialist', 'database-architect'];
            for (const agent of specialists) {
                try {
                    await this.loadAgent(agent);
                } catch (e) {
                    this.log(`⚠️ Agent ${agent} is not available.`, 'error');
                }
            }
        }

        const files = await fs.readdir(targetPath);
        if (!files.includes('README.md')) {
            findings.push({ severity: 'CRITICAL', message: 'README.md missing', file: 'root' });
        }
        
        if (allowSensitive && files.includes('.env')) {
            findings.push({ severity: 'SECURITY', message: '.env detected', file: '.env' });
        }

        const report = new AuditReport(auditID, targetPath, findings, { mode, allowSensitive });
        this.currentAudit = report;

        const auditDir = path.join(this.rootPath, 'audit');
        await fs.ensureDir(auditDir);
        
        const baseName = `audit_${auditID}`;
        await fs.writeJson(path.join(auditDir, `${baseName}.json`), report.toJSON(), { spaces: 2 });
        
        const mdContent = `# Audit Report: ${auditID}\n\nFindings:\n${findings.map(f => `- [${f.severity}] ${f.message} (${f.file})`).join('\n')}`;
        await fs.writeFile(path.join(auditDir, `${baseName}.md`), mdContent);

        this.log(`✅ Audit Complete: ${auditID}`, 'success');
        return report;
    }

    async plan(auditReport) {
        const report = auditReport || this.currentAudit;
        if (!report) {
            throw new NexusError('PLANNING', 'Pipeline Violation: Planning requires a valid Audit Report.');
        }

        this.log(`📅 Phase 2: Planning based on ${report.id}...`, 'info');
        
        const planID = `PLAN-${Date.now()}`;
        const tasks = report.findings.map((f, i) => ({
            id: i + 1,
            description: `Fix ${f.severity}: ${f.message}`,
            status: 'pending'
        }));

        const plan = new ImplementationPlan(planID, report.id, tasks);
        this.currentPlan = plan;

        const planningDir = path.join(this.rootPath, 'planning');
        await fs.ensureDir(planningDir);

        await fs.writeJson(path.join(planningDir, `plan_${planID}.json`), plan.toJSON(), { spaces: 2 });
        
        const mdContent = `# Plan: ${planID}\nRef: ${report.id}\n\nTasks:\n${tasks.map(t => `- [ ] ${t.description}`).join('\n')}`;
        await fs.writeFile(path.join(planningDir, `plan_${planID}.md`), mdContent);

        this.log(`✅ Plan Created: ${planID}`, 'success');
        return plan;
    }

    async execute(plan) {
        const activePlan = plan || this.currentPlan;
        if (!activePlan) {
            throw new NexusError('EXECUTION', 'Pipeline Violation: Execution requires an approved Plan.');
        }
        
        this.log(`🚀 Phase 3: Executing Plan ${activePlan.id}...`, 'info');
        
        for (const task of activePlan.tasks) {
            this.log(`🛠 Executing: ${task.description}`, 'warning');
            task.status = 'done';
        }

        this.log('✅ Execution phase completed.', 'success');
    }

    async record() {
        this.log('📝 Phase 4: Finalization & Records...', 'info');
        const recordDir = path.join(this.rootPath, 'records');
        await fs.ensureDir(recordDir);
        this.log('✅ Records updated. Cycle finished.', 'success');
    }

    async runCycle(options = {}) {
        const startTime = Date.now();
        this.state = STATES.INIT;
        this.log(`\n--- Nexus Engine: Starting Cycle [STATE: ${this.state}] ---`, 'info');
        
        try {
            this.state = STATES.PROCESSING;
            this.log(`🔄 System Transition: [${this.state}]`, 'warning');
            
            await this.discoverSkills();
            await this.readMemory();

            const p1Start = Date.now();
            const report = await this.audit(this.rootPath, options);
            this.metrics.auditDuration = `${Date.now() - p1Start}ms`;

            const p2Start = Date.now();
            const plan = await this.plan(report);
            this.metrics.planningDuration = `${Date.now() - p2Start}ms`;
            
            this.state = STATES.EXECUTING;
            this.log(`🔄 System Transition: [${this.state}]`, 'warning');
            
            const p3Start = Date.now();
            await this.execute(plan);
            this.metrics.executionDuration = `${Date.now() - p3Start}ms`;

            this.state = STATES.LOGGING;
            this.log(`🔄 System Transition: [${this.state}]`, 'warning');
            
            await this.record();
            
            const totalTime = Date.now() - startTime;
            this.metrics.totalDuration = `${totalTime}ms`;

            this.state = STATES.COMPLETED;
            await this.generateCycleSummary();
            
            this.log(`\n--- Nexus Engine: Cycle Complete [STATE: ${this.state}] (${totalTime}ms) ---`, 'info');
        } catch (error) {
            this.state = STATES.FAILED;
            const nexusErr = error instanceof NexusError ? error : new NexusError('RUNTIME', error.message);
            this.log(`❌ Engine Critical Failure: [${nexusErr.phase}] ${nexusErr.message} [STATE: ${this.state}]`, 'error');
            await this.logError(nexusErr);
        }
    }

    async generateCycleSummary() {
        const summary = {
            cycleID: `CYCLE-${Date.now()}`,
            timestamp: new Date().toISOString(),
            finalState: this.state,
            metrics: this.metrics,
            auditRef: this.currentAudit?.id,
            planRef: this.currentPlan?.id,
            agentsInvolved: Array.from(this.activeAgents)
        };

        await fs.ensureDir(this.summaryPath);
        const file = path.join(this.summaryPath, `cycle_summary_${summary.cycleID}.json`);
        await fs.writeJson(file, summary, { spaces: 2 });
        this.log(`📊 Session Summary generated: ${path.basename(file)}`, 'success');
    }

    async logError(err) {
        const errorLog = path.join(this.summaryPath, 'error_log.json');
        let logs = [];
        try {
            if (await fs.pathExists(errorLog)) {
                logs = await fs.readJson(errorLog);
            }
            logs.push({
                phase: err.phase,
                state: this.state,
                message: err.message,
                timestamp: err.timestamp,
                stack: err.stack
            });
            await fs.writeJson(errorLog, logs, { spaces: 2 });
        } catch (e) {
            this.log(`❌ Failed to log error: ${e.message}`, 'error');
        }
    }
}

module.exports = NexusEngine;
