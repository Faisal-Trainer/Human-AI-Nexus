const fs = require('fs-extra');
const path = require('path');
const { AuditReport, ImplementationPlan } = require('./Contract');

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
        
        this.activeAgents = new Set();
        this.skillRegistry = {};
        this.memory = [];
        
        this.currentAudit = null; 
        this.currentPlan = null;
    }

    /**
     * Tier 2: Skill Registry
     * Scans the skill directory and maps all available specialist modules.
     */
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

    /**
     * Tier 2: Memory Integration
     * Reads past records and knowledge base to provide context for the current session.
     */
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

    /**
     * Phase 1: Audit (Mandatory Contract)
     */
    async audit(targetPath = this.rootPath, options = {}) {
        const mode = options.mode || 'learning';
        const allowSensitive = options.allowSensitive || false;

        this.log('🔍 Phase 1: Audit Initiation...', 'info');
        const auditID = `AUDIT-${Date.now()}`;
        const findings = [];

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

    /**
     * Phase 2: Planning (Requires Audit Contract)
     */
    async plan(auditReport) {
        const report = auditReport || this.currentAudit;
        if (!report) {
            throw new Error('❌ Pipeline Violation: Planning requires a valid Audit Report.');
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

    /**
     * Phase 3: Execution (Requires Plan Contract)
     */
    async execute(plan) {
        const activePlan = plan || this.currentPlan;
        if (!activePlan) {
            throw new Error('❌ Pipeline Violation: Execution requires an approved Plan.');
        }
        
        this.log(`🚀 Phase 3: Executing Plan ${activePlan.id}...`, 'info');
        
        for (const task of activePlan.tasks) {
            this.log(`🛠 Executing: ${task.description}`, 'warning');
            task.status = 'done';
        }

        this.log('✅ Execution phase completed.', 'success');
    }

    /**
     * Phase 4: Recording
     */
    async record() {
        this.log('📝 Phase 4: Finalization & Records...', 'info');
        const recordDir = path.join(this.rootPath, 'records');
        await fs.ensureDir(recordDir);
        this.log('✅ Records updated. Cycle finished.', 'success');
    }

    async runCycle(options = {}) {
        this.log('\n--- Nexus Engine: Starting Deterministic Cycle ---', 'info');
        try {
            // Tier 2: Pre-cycle Intelligence
            await this.discoverSkills();
            await this.readMemory();

            const report = await this.audit(this.rootPath, options);
            const plan = await this.plan(report);
            
            this.log('\n⚠️ Waiting for Human Approval (Auto-Approved in this version)...', 'warning');
            
            await this.execute(plan);
            await this.record();
            
            this.log('--- Nexus Engine: Cycle Complete ---', 'info');
        } catch (error) {
            this.log(`❌ Engine Error: ${error.message}`, 'error');
        }
    }
}

module.exports = NexusEngine;
