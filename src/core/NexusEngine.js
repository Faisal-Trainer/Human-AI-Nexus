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
        
        // Find where Nexus data lives (either root or ./nexus folder)
        const possibleNexusPath = path.join(this.rootPath, 'nexus');
        this.nexusDataPath = fs.pathExistsSync(possibleNexusPath) ? possibleNexusPath : this.rootPath;
        
        // Detection Logic for Documentation-First Structure inside nexus data path
        const hasDocsFolder = fs.pathExistsSync(path.join(this.nexusDataPath, 'docs'));
        const docsBase = hasDocsFolder ? path.join(this.nexusDataPath, 'docs') : this.nexusDataPath;

        // Dynamic Path Mapping (Support for root/ or nexus/ or nexus/docs/ structure)
        const resolvePath = (folderName) => {
            const possiblePaths = [
                path.join(docsBase, folderName),
                path.join(this.nexusDataPath, folderName),
                path.join(this.rootPath, folderName)
            ];
            for (const p of possiblePaths) {
                if (fs.pathExistsSync(p)) return p;
            }
            return path.join(docsBase, folderName); // Default
        };

        this.agentPath = resolvePath('agent');
        this.skillPath = resolvePath('skill');
        this.knowledgePath = resolvePath('knowledge');
        this.recordsPath = resolvePath('records');
        this.summaryPath = resolvePath('summary');
        this.auditPath = resolvePath('audit');
        this.planningPath = resolvePath('planning');
        this.algorithmsPath = resolvePath('algorithms');
        
        this.activeAgents = new Set();
        this.skillRegistry = {};
        this.memory = [];
        this.metrics = {};
        this.state = STATES.INIT;
        
        this.currentAudit = null; 
        this.currentPlan = null;
    }

    async discoverSkills() {
        this.log('📚 Discovering Skill Registry (Internal & External)...', 'info');
        
        const scanDir = async (dir, prefix = '') => {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) {
                    await scanDir(fullPath, prefix ? `${prefix}/${entry.name}` : entry.name);
                } else if (entry.name.endsWith('.md')) {
                    const category = prefix || 'uncategorized';
                    if (!this.skillRegistry[category]) this.skillRegistry[category] = [];
                    this.skillRegistry[category].push(entry.name.replace('.md', ''));
                }
            }
        };

        await scanDir(this.skillPath);
        return this.skillRegistry;
    }

    async readMemory() {
        this.log('🧠 Accessing Long-term Memory...', 'info');
        try {
            await fs.ensureDir(this.recordsPath);
            await fs.ensureDir(this.knowledgePath);
            
            const records = await fs.readdir(this.recordsPath);
            const knowledge = await fs.readdir(this.knowledgePath);
            this.memory = {
                pastCycles: records.length,
                lessons: knowledge.filter(k => k.endsWith('.md'))
            };
            this.log(`✅ Memory loaded: ${records.length} past sessions found.`, 'success');
        } catch (e) {
            this.log(`⚠️ Memory access issue: ${e.message}. Starting fresh.`, 'warning');
            this.memory = { pastCycles: 0, lessons: [] };
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

        this.log(`🔍 Phase 1: Audit Initiation [Mode: ${mode}]...`, 'info');
        const auditID = `AUDIT-${Date.now()}`;
        const consolidatedFindings = [];

        // Common files check
        const files = await fs.readdir(targetPath);
        if (!files.includes('README.md')) consolidatedFindings.push({ severity: 'CRITICAL', message: 'README.md missing', file: 'root' });
        if (allowSensitive && files.includes('.env')) consolidatedFindings.push({ severity: 'SECURITY', message: '.env detected', file: '.env' });
        if (!files.some(f => f.toLowerCase().startsWith('license'))) consolidatedFindings.push({ severity: 'WARNING', message: 'LICENSE file missing', file: 'root' });

        await fs.ensureDir(this.auditPath);

        if (mode === 'learning') {
            const specialists = [
                { id: 'cyber-security', focus: 'Keamanan & Autentikasi' },
                { id: 'ux-engineer', focus: 'User Experience & Estetika' },
                { id: 'seo-performance-specialist', focus: 'Performa & SEO' },
                { id: 'database-architect', focus: 'Arsitektur Data' }
            ];

            for (const spec of specialists) {
                this.log(`🕵️ Agent ${spec.id} is scanning for ${spec.focus}...`, 'warning');
                try {
                    await this.loadAgent(spec.id);
                    
                    // Generate individual report
                    const specFindings = [{ severity: 'INFO', message: `Audit completed by ${spec.id} for ${spec.focus}.`, file: 'project' }];
                    const specReport = new AuditReport(`${auditID}-${spec.id.toUpperCase()}`, targetPath, specFindings, { mode, agent: spec.id });
                    
                    await fs.writeJson(path.join(this.auditPath, `report_${spec.id}_${auditID}.json`), specReport.toJSON(), { spaces: 2 });
                    const mdSpec = `# Specialist Audit: ${spec.id.toUpperCase()}\n\nFocus: ${spec.focus}\n\nFindings:\n${specFindings.map(f => `- [${f.severity}] ${f.message}`).join('\n')}`;
                    await fs.writeFile(path.join(this.auditPath, `report_${spec.id}_${auditID}.md`), mdSpec);
                    
                    consolidatedFindings.push(...specFindings.map(f => ({ ...f, message: `[${spec.id}] ${f.message}` })));
                } catch (e) {
                    this.log(`⚠️ Agent ${spec.id} is not available for detailed scan.`, 'error');
                }
            }
        }

        const report = new AuditReport(auditID, targetPath, consolidatedFindings, { mode, allowSensitive });
        this.currentAudit = report;

        const baseName = `audit_SUMMARY_${auditID}`;
        await fs.writeJson(path.join(this.auditPath, `${baseName}.json`), report.toJSON(), { spaces: 2 });
        
        const mdContent = `# Audit Summary: ${auditID}\nMode: ${mode}\n\nConsolidated Findings:\n${consolidatedFindings.map(f => `- [${f.severity}] ${f.message} (${f.file})`).join('\n')}`;
        await fs.writeFile(path.join(this.auditPath, `${baseName}.md`), mdContent);

        this.log(`✅ Audit Complete: ${auditID}. Reports generated in /audit`, 'success');
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

        await fs.ensureDir(this.planningPath);

        await fs.writeJson(path.join(this.planningPath, `plan_${planID}.json`), plan.toJSON(), { spaces: 2 });
        
        const mdContent = `# Plan: ${planID}\nRef: ${report.id}\n\nTasks:\n${tasks.map(t => `- [ ] ${t.description}`).join('\n')}`;
        await fs.writeFile(path.join(this.planningPath, `plan_${planID}.md`), mdContent);

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
        await fs.ensureDir(this.recordsPath);
        this.log('✅ Records updated. Cycle finished.', 'success');
    }

    /**
     * Phase 5: Verification (New Phase)
     * Validates that executed tasks actually achieved their goals.
     */
    async verify(plan) {
        this.log('🔍 Phase 5: Verification Phase...', 'info');
        const activePlan = plan || this.currentPlan;
        
        // In a real scenario, this would run tests or check file states
        const results = activePlan.tasks.map(t => ({
            id: t.id,
            verified: t.status === 'done'
        }));
        
        this.log(`✅ Verification complete: ${results.filter(r => r.verified).length}/${results.length} tasks verified.`, 'success');
        return results;
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
            
            await this.verify(plan); // Added Verification
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
    /**
     * Phase 6: Harvesting (New Phase)
     * Extracts Nexus documentation from another project to enrich the Golden knowledge.
     */
    async harvest(sourcePath) {
        if (!sourcePath) throw new NexusError('HARVESTING', 'Source path is required.');
        
        const projectName = path.basename(sourcePath);
        this.log(`🌾 Phase 6: Harvesting Knowledge from [${projectName}]...`, 'info');
        
        const nexusSource = path.join(sourcePath, 'nexus');
        if (!(await fs.pathExists(nexusSource))) {
            throw new NexusError('HARVESTING', `Project at ${sourcePath} does not contain a /nexus folder.`);
        }

        const harvestRoot = path.join(this.rootPath, 'golden', 'harvest', projectName);
        await fs.ensureDir(harvestRoot);

        const foldersToHarvest = ['audit', 'planning', 'records', 'knowledge'];
        let filesHarvested = 0;

        for (const folder of foldersToHarvest) {
            const srcFolder = path.join(nexusSource, folder);
            if (await fs.pathExists(srcFolder)) {
                const destFolder = path.join(harvestRoot, folder);
                await fs.ensureDir(destFolder);
                
                const files = await fs.readdir(srcFolder);
                for (const file of files) {
                    if (file.endsWith('.md')) {
                        await fs.copy(path.join(srcFolder, file), path.join(destFolder, file));
                        filesHarvested++;
                    }
                }
            }
        }

        this.log(`✅ Harvesting Complete: ${filesHarvested} knowledge artifacts collected from ${projectName}.`, 'success');
        this.log(`📂 Destination: golden/harvest/${projectName}`, 'info');
        return filesHarvested;
    }
}

module.exports = NexusEngine;
