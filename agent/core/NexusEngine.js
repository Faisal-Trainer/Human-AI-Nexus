const fs = require('fs-extra');
const path = require('path');
const { AuditReport, ImplementationPlan } = require('./Contract');
const Modifier = require('./Modifier');
const MemoryPipeline = require('./MemoryPipeline');
const TDDGuard = require('./../tools/TDDGuard');
const AssetEngine = require('./../tools/AssetEngine');
const Validator = require('./../tools/Validator');
const BugHunter = require('./../tools/BugHunter');
const Designer = require('./../tools/Designer');
const AccessibilityScanner = require('./../tools/AccessibilityScanner');
const SchemaGuard = require('./../tools/SchemaGuard');
const QueryOptimizer = require('./../tools/QueryOptimizer');
const WorktreeManager = require('./WorktreeManager');
const RootCauseAnalyzer = require('./../tools/RootCauseAnalyzer');
const Machinist = require('./Machinist');
const Distiller = require('./Distiller');

const TDDScaffolder = require('./../tools/TDDScaffolder');

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

        // Dynamic Path Mapping (Support for documentation/ memory/ nexus/ structure)
        const resolvePath = (folderName, alternative) => {
            const possiblePaths = [
                path.join(this.rootPath, 'documentation', folderName),
                path.join(this.rootPath, 'memory', folderName),
                path.join(this.rootPath, 'memory', alternative || folderName),
                path.join(docsBase, folderName),
                path.join(this.nexusDataPath, folderName),
                path.join(this.rootPath, folderName)
            ];
            for (const p of possiblePaths) {
                if (fs.pathExistsSync(p)) return p;
            }
            return path.join(this.rootPath, 'memory', folderName); // Default to memory/
        };

        this.agentPath = resolvePath('agent');
        this.skillPath = resolvePath('workflow', 'skill');
        this.knowledgePath = resolvePath('long_term', 'knowledge');
        this.recordsPath = resolvePath('short_term', 'records');
        this.summaryPath = resolvePath('summary');
        this.auditPath = resolvePath('audit');
        this.planningPath = resolvePath('planning');
        this.algorithmsPath = resolvePath('algorithms');
        
        this.activeAgents = new Set();
        this.skillRegistry = {};
        this.memory = [];
        this.metrics = {};
        this.state = STATES.INIT;
        
        this.modifier = new Modifier(this.rootPath);
        this.memoryPipeline = new MemoryPipeline(this.rootPath, this.knowledgePath, this.auditPath, this.planningPath);
        this.tddGuard = new TDDGuard(this.rootPath);
        this.tddScaffolder = new TDDScaffolder(this.rootPath);
        this.assetEngine = new AssetEngine(this.rootPath);
        this.validator = new Validator(this.rootPath);
        this.bugHunter = new BugHunter(this.rootPath);
        this.designer = new Designer();
        this.a11yScanner = new AccessibilityScanner(this.rootPath);
        this.schemaGuard = new SchemaGuard(this.rootPath);
        this.queryOptimizer = new QueryOptimizer(this.rootPath);
        this.worktreeManager = new WorktreeManager(this.rootPath);
        this.rcAnalyzer = new RootCauseAnalyzer();
        this.machinist = new Machinist(this.rootPath, this.tddScaffolder);
        this.distiller = new Distiller(this.knowledgePath);
        
        this.currentAudit = null; 
        this.currentPlan = null;
        this.activeRack = null;
    }

    /**
     * Focus engine on a specific knowledge rack (sub-folder)
     */
    setRack(rackName) {
        if (rackName) {
            this.activeRack = rackName;
            this.log(`🎯 Engine Focus Shifted to Rack: ${rackName}`, 'info');
        }
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
        this.log('🧠 Accessing Long-term Memory with Semantic Indexing...', 'info');
        try {
            await fs.ensureDir(this.recordsPath);
            await fs.ensureDir(this.knowledgePath);
            
            const records = await fs.readdir(this.recordsPath);
            const knowledgeFiles = await fs.readdir(this.knowledgePath);
            
            const lessons = knowledgeFiles.filter(k => k.endsWith('.md'));
            const semanticIndex = {};

            // Build Semantic Index
            for (const file of lessons) {
                const tags = await this.getSemanticTags(path.join(this.knowledgePath, file));
                tags.forEach(tag => {
                    if (!semanticIndex[tag]) semanticIndex[tag] = [];
                    semanticIndex[tag].push(file);
                });
            }

            this.memory = {
                pastCycles: records.length,
                lessons: lessons,
                semanticIndex: semanticIndex
            };
            this.log(`✅ Memory loaded: ${lessons.length} lessons indexed across ${Object.keys(semanticIndex).length} semantic domains.`, 'success');
        } catch (e) {
            this.log(`⚠️ Memory access issue: ${e.message}. Starting fresh.`, 'warning');
            this.memory = { pastCycles: 0, lessons: [], semanticIndex: {} };
        }
        return this.memory;
    }

    /**
     * Extracts semantic tags from a file's metadata block.
     */
    async getSemanticTags(filePath) {
        try {
            const content = await fs.readFile(filePath, 'utf8');
            const match = content.match(/> \*\*METADATA \(NEXUS SEMANTIC TAGS\)\*\*: \[(.*?)\]/);
            if (match) {
                return match[1].split(',').map(t => t.trim());
            }
        } catch (e) {}
        return [];
    }

    /**
     * Search knowledge HUB based on semantic tags.
     * @param {string} tag - The semantic domain (e.g., 'security', 'ui-ux')
     */
    async searchKnowledge(tag) {
        if (!this.memory.semanticIndex) await this.readMemory();
        const results = this.memory.semanticIndex[tag.toLowerCase()] || [];
        if (results.length > 0) {
            this.log(`🔎 Semantic Search [${tag}]: Found ${results.length} relevant documents.`, 'success');
        }
        return results;
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

        // Core Structure Scan (Dynamic Path Awareness)
        const pathMapping = [
            { name: 'agent', path: this.agentPath },
            { name: 'skill', path: this.skillPath },
            { name: 'knowledge', path: this.knowledgePath },
            { name: 'records', path: this.recordsPath },
            { name: 'planning', path: this.planningPath },
            { name: 'summary', path: this.summaryPath }
        ];

        for (const item of pathMapping) {
            if (!(await fs.pathExists(item.path))) {
                consolidatedFindings.push({ severity: 'WARNING', message: `Nexus standard folder [${item.name}/] is missing or path is invalid.`, file: 'root' });
            }
        }

        const files = await fs.readdir(targetPath);
        if (!files.includes('README.md')) consolidatedFindings.push({ severity: 'CRITICAL', message: 'README.md missing', file: 'root' });
        if (allowSensitive && files.includes('.env')) consolidatedFindings.push({ severity: 'SECURITY', message: '.env detected', file: '.env' });
        if (!files.some(f => f.toLowerCase().includes('license'))) consolidatedFindings.push({ severity: 'WARNING', message: 'LICENSE file missing (Standard compliance)', file: 'root' });

        await fs.ensureDir(this.auditPath);

        if (mode === 'learning') {
            const specialists = [
                { id: 'cyber-security', focus: 'Keamanan & Autentikasi' },
                { id: 'ux-engineer', focus: 'User Experience & Estetika' },
                { id: 'seo-performance-specialist', focus: 'Performa & SEO' },
                { id: 'database-architect', focus: 'Arsitektur Data' },
                { id: 'vcs-architect', focus: 'Version Control & Repository Health' },
                { id: 'documentation-architect', focus: 'Dokumentasi & Standar Kode' }
            ];

            this.log('🕵️ Activating Specialist Parallel Audit...', 'warning');
            
            const auditPromises = specialists.map(async (spec) => {
                try {
                    await this.loadAgent(spec.id);

                    const scannerPath = path.join(__dirname, '..', 'tools', 'scanners', `${spec.id}.js`);
                    let specFindings = [];

                    if (await fs.pathExists(scannerPath)) {
                        const scanner = require(scannerPath);
                        if (scanner.scan) {
                            specFindings = await scanner.scan(targetPath);
                            this.log(`   🔍 [${spec.id}] Deep Scan: ${specFindings.length} findings found.`, 'success');
                        }
                    }

                    if (specFindings.length === 0) {
                        specFindings.push({ severity: 'INFO', message: `Audit completed by ${spec.id} for ${spec.focus}.`, file: 'project' });
                    }

                    // Generate individual report
                    const specReport = new AuditReport(`${auditID}-${spec.id.toUpperCase()}`, targetPath, specFindings, { mode, agent: spec.id });
                    
                    await fs.writeJson(path.join(this.auditPath, `report_${spec.id}_${auditID}.json`), specReport.toJSON(), { spaces: 2 });
                    
                    const mdSpec = `
# 🎓 Specialist Audit: ${spec.id.toUpperCase()}
**Focus**: ${spec.focus}
**Agent**: ${spec.id}
**Standard**: [Educational Audit Protocol](../../skill/internal/educational-audit.md)

---

## 🔍 Findings & Developer Insights

${specFindings.map(f => `
### [${f.severity}] ${f.message}
- **File**: \`${f.file}\`
- **🧐 Why?**: ${f.rationale || '[Place description of WHY this is a problem and what concept is involved here]'}
- **🛡️ Nexus Standard**: [Reference to memory/long_term/ or skill/]
- **🛠️ Recommendation**: ${f.recommendation || '[Systematic fix instructions]'}
`).join('\n')}

---

## 🚀 Saran Strategis & Penambahan Fitur
> Berdasarkan profil Agent **${spec.id}**, berikut adalah saran peningkatan untuk proyek ini:

1. **Optimasi Performa**: [Saran otomatis berdasarkan temuan]
2. **Penambahan Fitur**: [Saran fitur baru yang relevan dengan fokus ${spec.focus}]
3. **Skalabilitas**: [Rekomendasi arsitektur masa depan]

---
*Generated by Nexus Engine | Status: Verified for Learning*
`;
                    await fs.writeFile(path.join(this.auditPath, `report_${spec.id}_${auditID}.md`), mdSpec);
                    
                    return specFindings.map(f => ({ ...f, message: `[${spec.id}] ${f.message}` }));
                } catch (e) {
                    this.log(`⚠️ Agent ${spec.id} skipped: ${e.message}`, 'error');
                    return [];
                }
            });

            const allSpecFindings = await Promise.all(auditPromises);
            allSpecFindings.forEach(findings => consolidatedFindings.push(...findings));
        }

        // 🤖 Phase 1.1: Autonomous Machine Audit
        this.log('🤖 Activating Autonomous Machine Audit...', 'warning');
        
        // 1. Hardcoded Core Machines
        const schemaFindings = await this.schemaGuard.validateModels();
        if (schemaFindings.length > 0) {
            this.log(`   🛡️ [SchemaGuard]: ${schemaFindings.length} findings found.`, 'success');
            consolidatedFindings.push(...schemaFindings.map(f => ({ ...f, message: `[SchemaGuard] ${f.message}` })));
        }

        const queryFindings = await this.queryOptimizer.scanMigrations();
        if (queryFindings.length > 0) {
            this.log(`   ⚡ [QueryOptimizer]: ${queryFindings.length} findings found.`, 'success');
            consolidatedFindings.push(...queryFindings.map(f => ({ ...f, message: `[QueryOptimizer] ${f.message}` })));
        }

        const viewFiles = await this.globRecursive(this.rootPath, 'resources/views/**/*.blade.php');
        for (const file of viewFiles.slice(0, 5)) {
            const a11yFindings = await this.a11yScanner.scan(path.relative(this.rootPath, file));
            if (a11yFindings.length > 0) {
                consolidatedFindings.push(...a11yFindings.map(f => ({ ...f, message: `[A11yScanner] ${f.message}` })));
            }
        }

        // 2. Dynamic Forged Scanners
        const scannerPath = path.join(this.rootPath, 'agent/tools/scanners');
        if (await fs.pathExists(scannerPath)) {
            const forgedScanners = await this.globRecursive(scannerPath, '*.js');
            for (const sFile of forgedScanners) {
                const sName = path.basename(sFile, '.js');
                try {
                    const scanner = require(sFile);
                    if (typeof scanner.scan === 'function') {
                        this.log(`   🔥 [${sName}] Deep Scan (Forged) initiated...`, 'info');
                        const forgedFindings = await scanner.scan(this.rootPath);
                        if (forgedFindings.length > 0) {
                            consolidatedFindings.push(...forgedFindings.map(f => ({ ...f, message: `[${sName}] ${f.message}` })));
                        }
                    }
                } catch (e) {
                    this.log(`   ⚠️ Skipping scanner ${sName}: ${e.message}`, 'error');
                }
            }
        }

        const report = new AuditReport(auditID, targetPath, consolidatedFindings, { mode, allowSensitive });
        this.currentAudit = report;

        const baseName = `audit_SUMMARY_${auditID}`;
        await fs.writeJson(path.join(this.auditPath, `${baseName}.json`), report.toJSON(), { spaces: 2 });
        
        const mdContent = `
# Audit Summary: ${auditID}
**Mode**: ${mode}
**Timestamp**: ${new Date().toLocaleString()}

## 📊 Consolidated Findings
${consolidatedFindings.map(f => `- [${f.severity}] ${f.message} (\`${f.file}\`)`).join('\n')}

---
*Generated by Nexus Autonomous Governance Engine*
`;
        await fs.writeFile(path.join(this.auditPath, `${baseName}.md`), mdContent);

        this.log(`✅ Audit Complete: ${auditID}. Reports generated in /audit`, 'success');
        return report;
    }

    /**
     * Helper for recursive file scanning
     */
    async globRecursive(dir, pattern) {
        const glob = require('glob');
        return new Promise((resolve, reject) => {
            glob(pattern, { cwd: dir, absolute: true }, (err, files) => {
                if (err) reject(err);
                else resolve(files);
            });
        });
    }

    async plan(auditReport) {
        const report = auditReport || this.currentAudit;
        if (!report) {
            throw new NexusError('PLANNING', 'Pipeline Violation: Planning requires a valid Audit Report.');
        }

        this.log(`📅 Phase 2: Planning based on ${report.id}...`, 'info');
        
        const planID = `PLAN-${Date.now()}`;
        const tasks = report.findings
            .filter(f => f.severity !== 'INFO' || !f.message.includes('Audit completed'))
            .map((f, i) => {
                const task = {
                    id: i + 1,
                    description: `${f.severity}: ${f.message}`,
                    status: 'pending',
                    rationale: f.rationale || 'Tidak ada keterangan tambahan.',
                    recommendation: f.recommendation || 'Gunakan praktik terbaik standar industri.'
                };

                // AUTO-ACTION GENERATION (The Muscles)
                if (f.message.includes('.env detected')) {
                    task.action = {
                        type: 'FILE_APPEND',
                        target: '.gitignore',
                        content: '.env'
                    };
                    task.description += ' (Auto-fix enabled)';
                }

                return task;
            });

        const plan = new ImplementationPlan(planID, report.id, tasks);
        this.currentPlan = plan;

        await fs.ensureDir(this.planningPath);

        await fs.writeJson(path.join(this.planningPath, `plan_${planID}.json`), plan.toJSON(), { spaces: 2 });
        
        const mdPlan = `
# 🛠 Implementation Plan: ${planID}
**Ref Audit**: [${report.id}](../audit/audit_SUMMARY_${report.id}.md)
**Status**: Ready for Execution

---

## 📋 Task List & Learning Insights
${tasks.map(t => `
### [ ] Task ${t.id}: ${t.description}
- **🧐 Why?**: ${t.rationale}
- **💡 Action**: ${t.recommendation}
`).join('\n')}

---
*Generated by Nexus Orchestrator | Ready for Developer Approval*
        `;
        await fs.writeFile(path.join(this.planningPath, `plan_${planID}.md`), mdPlan);

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
            
            // ATOMIC EXECUTION (Physical Change)
            if (task.action) {
                try {
                    // TDD Enforcement & Scaffolding (Phase 4)
                    if (task.action.type === 'FILE_REPLACE' || task.action.type === 'FILE_APPEND') {
                        const validation = await this.tddGuard.validate(task.action.target);
                        if (!validation.allowed) {
                            this.log(`   🛑 TDD Block: ${validation.reason}`, 'error');
                            this.log(`   🏗️ [Phase 4] Autonomous Intelligence: Generating test scaffold...`, 'info');
                            const scaffold = await this.tddScaffolder.generate(task.action.target);
                            if (scaffold.success) {
                                this.log(`   ✅ Scaffold created at ${scaffold.path}. Proceeding with action.`, 'success');
                            } else {
                                this.log(`   ⚠️ Scaffolding skipped: ${scaffold.reason}`, 'warning');
                            }
                        } else {
                            this.log(`   🛡️ TDD Verified: ${validation.reason}`, 'success');
                        }
                    }

                    // Asset Optimization
                    if (task.action.type === 'ASSET_OPTIMIZE') {
                        await this.assetEngine.process(task.action);
                        this.log(`   🖼️ Asset optimized via AssetEngine`, 'success');
                    } else {
                        const success = await this.modifier.apply(task.action);
                        if (success) {
                            this.log(`   ✅ Physical modification applied: ${task.action.type} on ${task.action.target}`, 'success');
                            
                            // Self-Healing Documentation (Phase 4)
                            if (task.action.type === 'RESOLVE_OPTIONS') {
                                await this.updateRecapStatus(`Resolved Multi-Option collision in ${task.action.target}`);
                            }
                        }
                    }
                } catch (e) {
                    this.log(`   ❌ Execution Error: ${e.message}`, 'error');
                    task.status = 'failed';
                    continue;
                }
            }

            // Legacy Support (Static Pattern Checks)
            if (task.description.startsWith('UPDATE_BACKLOG:')) {
                const backlogPath = path.join(this.knowledgePath, 'ENGINE_DEBT_BACKLOG.md');
                if (await fs.pathExists(backlogPath)) {
                    let content = await fs.readFile(backlogPath, 'utf8');
                    content += `\n- [x] Resolved via ${activePlan.id}: ${task.description.split(':')[1]}`;
                    await fs.writeFile(backlogPath, content);
                    this.log(`   ✅ Physical modification applied to ENGINE_DEBT_BACKLOG.md`, 'success');
                }
            }

            task.status = 'done';
        }

        this.log('✅ Execution phase completed.', 'success');
    }

    /**
     * Self-Healing Documentation Update (Phase 4)
     */
    async updateRecapStatus(updateMessage) {
        const recapPath = path.join(this.rootPath, 'documentation', 'docs', 'NEXUS_INTERNAL_PIPELINE_RECAP.md');
        if (await fs.pathExists(recapPath)) {
            let content = await fs.readFile(recapPath, 'utf8');
            const timestamp = new Date().toLocaleString();
            const logEntry = `\n- [${timestamp}] **Self-Healing**: ${updateMessage}`;
            
            if (content.includes('## 🧐 Analisis & Rekomendasi Penyempurnaan')) {
                content = content.replace('## 🧐 Analisis & Rekomendasi Penyempurnaan', `## 🧠 Self-Healing Logs${logEntry}\n\n## 🧐 Analisis & Rekomendasi Penyempurnaan`);
            } else {
                content += logEntry;
            }
            await fs.writeFile(recapPath, content);
            this.log(`   📝 Self-Healing: RECAP documentation updated.`, 'success');
        }
    }

    async record(cycleID) {
        this.log('📝 Phase 4: Finalization & Records...', 'info');
        await fs.ensureDir(this.recordsPath);
        
        // Update Records
        const recordsPath = path.join(this.recordsPath, `session_${Date.now()}.json`);
        await fs.writeJson(recordsPath, {
            cycle: cycleID,
            audit: this.currentAudit?.id,
            plan: this.currentPlan?.id,
            timestamp: new Date().toISOString()
        }, { spaces: 2 });

        // RUN MEMORY PIPELINE (Automated Archiving)
        await this.memoryPipeline.optimize();

        this.log('✅ Records updated. Cycle finished.', 'success');
    }

    /**
     * Phase 5: Verification (New Phase)
     * Validates that executed tasks actually achieved their goals.
     */
    async verify(plan) {
        this.log('🔍 Phase 5: Verification Phase...', 'info');
        const activePlan = plan || this.currentPlan;
        const results = [];

        for (const task of activePlan.tasks) {
            if (task.status === 'done' && task.action) {
                const verification = await this.validator.verifyAction(task.action);
                results.push({ id: task.id, ...verification });
                if (!verification.success) {
                    this.log(`   ❌ Verification Failed for Task ${task.id}: ${verification.message}`, 'error');
                    task.status = 'failed_verification';
                } else {
                    this.log(`   ✅ Verification Success for Task ${task.id}: ${verification.message}`, 'success');
                }
            } else {
                results.push({ id: task.id, success: task.status === 'done', message: 'Non-physical task.' });
            }
        }
        
        this.log(`✅ Verification complete: ${results.filter(r => r.success).length}/${results.length} tasks verified.`, 'success');
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

            const cycleID = `CYCLE-${Date.now()}`;
            this.state = STATES.LOGGING;
            this.log(`🔄 System Transition: [${this.state}]`, 'warning');
            
            await this.verify(plan); 
            await this.record(cycleID);
            
            const totalTime = Date.now() - startTime;
            this.metrics.totalDuration = `${totalTime}ms`;

            this.state = STATES.COMPLETED;
            await this.generateCycleSummary(cycleID);
            
            this.log(`\n--- Nexus Engine: Cycle Complete [STATE: ${this.state}] (${totalTime}ms) ---`, 'info');
        } catch (error) {
            this.state = STATES.FAILED;
            const nexusErr = error instanceof NexusError ? error : new NexusError('RUNTIME', error.message);
            this.log(`❌ Engine Critical Failure: [${nexusErr.phase}] ${nexusErr.message} [STATE: ${this.state}]`, 'error');
            await this.logError(nexusErr);
        }
    }

    async generateCycleSummary(cycleID) {
        const summary = {
            cycleID: cycleID || `CYCLE-${Date.now()}`,
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
        
        // Detection Logic: Support for documentation/ or nexus/ structure
        const docSource = path.join(sourcePath, 'documentation');
        const nexusSource = path.join(sourcePath, 'nexus');
        
        let primarySource = null;
        if (await fs.pathExists(nexusSource)) {
            primarySource = nexusSource;
        } else if (await fs.pathExists(docSource)) {
            primarySource = docSource;
        } else {
            primarySource = sourcePath; // Fallback to root
        }

        this.log(`📂 Source base detected: ${path.basename(primarySource)}/`, 'info');

        const harvestRoot = path.join(this.rootPath, 'golden', 'harvest', projectName);
        await fs.ensureDir(harvestRoot);

        // Helper to find folder in multiple possible locations in the remote project
        const findRemoteFolder = async (folderName, altName) => {
            const potentials = [
                path.join(primarySource, folderName),
                path.join(primarySource, 'memory', folderName),
                path.join(primarySource, 'memory', altName || folderName),
                path.join(primarySource, 'documentation', folderName),
                path.join(sourcePath, 'documentation', folderName),
                path.join(sourcePath, 'memory', folderName)
            ];
            for (const p of potentials) {
                if (await fs.pathExists(p)) return p;
            }
            return null;
        };

        const foldersToHarvest = [
            { id: 'audit' },
            { id: 'planning' },
            { id: 'summary' },
            { id: 'algorithms' },
            { id: 'records', alt: 'short_term' },
            { id: 'knowledge', alt: 'long_term' },
            { id: 'nexus_rules' },
            { id: 'legal' }
        ];

        let filesHarvested = 0;

        for (const folder of foldersToHarvest) {
            const srcFolder = await findRemoteFolder(folder.id, folder.alt);
            if (srcFolder) {
                const destFolder = path.join(harvestRoot, folder.id);
                await fs.ensureDir(destFolder);
                
                const files = await fs.readdir(srcFolder);
                for (const file of files) {
                    if (file.endsWith('.md')) {
                        const targetPath = path.join(destFolder, file);
                        
                        // Apply Collision Logic if file already exists in Golden Harvest
                        if (await fs.pathExists(targetPath)) {
                            this.log(`⚠️ Collision detected for ${file}. Applying IF-ELSE logic...`, 'warning');
                            const oldContent = await fs.readFile(targetPath, 'utf8');
                            const newContent = await fs.readFile(path.join(srcFolder, file), 'utf8');
                            const merged = this.wrapAsConditional(oldContent, newContent, `Collision in ${file} during harvest from ${projectName}`);
                            await fs.writeFile(targetPath, merged);
                        } else {
                            await fs.copy(path.join(srcFolder, file), targetPath);
                        }
                        filesHarvested++;
                    }
                }
            }
        }

        this.log(`✅ Harvesting Complete: ${filesHarvested} knowledge artifacts collected from ${projectName}.`, 'success');
        this.log(`📂 Destination: golden/harvest/${projectName}`, 'info');
        return filesHarvested;
    }

    /**
     * Protocol 1: Mass Refactor (Golden -> HUB)
     */
    async massRefactor() {
        this.log('⚡ Starting Mass Refactor: Golden ➔ HUB...', 'info');
        const goldenPath = path.join(this.nexusDataPath, 'golden');
        const hubPath = path.join(this.nexusDataPath, 'knowledge');

        if (!(await fs.pathExists(goldenPath))) {
            this.log('⚠️ Folder golden/ tidak ditemukan. Mass Refactor dibatalkan.', 'warning');
            return;
        }

        const files = await this.globRecursive(goldenPath, '**/*.md');
        let processed = 0;

        for (const file of files) {
            const fileName = path.basename(file);
            const targetPath = path.join(hubPath, fileName);
            const content = await fs.readFile(file, 'utf8');

            if (await fs.pathExists(targetPath)) {
                const oldContent = await fs.readFile(targetPath, 'utf8');
                if (oldContent.trim() !== content.trim()) {
                    const merged = this.wrapAsConditional(oldContent, content, `Refactor from Golden: ${fileName}`);
                    await fs.writeFile(targetPath, merged);
                    this.log(`🔄 Collision Resolved in HUB: ${fileName}`, 'success');
                }
            } else {
                await fs.copy(file, targetPath);
                this.log(`📝 Knowledge Added to HUB: ${fileName}`, 'success');
            }
            processed++;
        }

        this.log(`✅ Mass Refactor Complete: ${processed} knowledge artifacts integrated into HUB.`, 'success');
    }

    /**
     * Protocol 2: Mass Update Skills (HUB -> Skill)
     */
    async massUpdateSkills() {
        const rackSuffix = this.activeRack ? ` [Rack: ${this.activeRack}]` : '';
        this.log(`⚡ Starting Semantic Mass Update: HUB ➔ Skill${rackSuffix}...`, 'info');
        const hubPath = this.activeRack ? path.join(this.knowledgePath, this.activeRack) : this.knowledgePath;
        const skillPath = this.skillPath;

        if (!(await fs.pathExists(hubPath))) {
            this.log('⚠️ Folder HUB tidak ditemukan. Mass Update dibatalkan.', 'warning');
            return;
        }

        const knowledgeFiles = await this.globRecursive(hubPath, '**/*.md');
        const skillFiles = await this.globRecursive(skillPath, '**/*.md');
        
        let updated = 0;

        // Pre-index skill files by category
        const skillMap = {};
        for (const sFile of skillFiles) {
            const category = path.basename(path.dirname(sFile)).toLowerCase();
            const sName = path.basename(sFile, '.md').toLowerCase();
            if (!skillMap[category]) skillMap[category] = [];
            if (!skillMap[sName]) skillMap[sName] = [];
            skillMap[category].push(sFile);
            skillMap[sName].push(sFile);
        }

        for (const kFile of knowledgeFiles) {
            const kContent = await fs.readFile(kFile, 'utf8');
            const tags = await this.getSemanticTags(kFile);
            
            if (tags.length === 0) continue;

            // Cross-Pollination: Find all skill files that match the tags
            const targets = new Set();
            for (const tag of tags) {
                const tagLower = tag.toLowerCase();
                if (skillMap[tagLower]) {
                    skillMap[tagLower].forEach(f => targets.add(f));
                }
            }

            for (const sFile of targets) {
                const sContent = await fs.readFile(sFile, 'utf8');
                const sample = kContent.substring(0, 100);
                
                if (!sContent.includes(sample)) {
                    const merged = this.wrapAsConditional(sContent, kContent, `Semantic Update from HUB: ${path.basename(kFile)}`);
                    await fs.writeFile(sFile, merged);
                    this.log(`🧠 Skill Cross-Pollinated: ${path.basename(sFile)} via ${path.basename(kFile)} [Tag: ${tags.join(', ')}]`, 'success');
                    updated++;
                }
            }
        }

        this.log(`✅ Semantic Mass Update Complete: ${updated} skill injections performed.`, 'success');
    }

    /**
     * Phase 7: Distillation & Memory Optimization
     * Pulls data from harvest, standardizes and simplifies the HUB.
     */
    async distill() {
        this.log('🧪 Starting HUB Distillation & Optimization Pipeline...', 'info');
        
        // 1. Memory Pipeline: Pull data from harvest -> HUB and archive sessions
        await this.memoryPipeline.optimize();
        
        // 2. Distiller: Standardize names and simplify content in HUB
        await this.distiller.run();
        
        this.log('✨ HUB Distillation & Optimization Complete.', 'success');
    }

    /**
     * Extracts semantic tags from a knowledge file
     */
    async getSemanticTags(filePath) {
        const content = await fs.readFile(filePath, 'utf8');
        const match = content.match(/> \*\*METADATA \(NEXUS SEMANTIC TAGS\)\*\*: \[(.*)\]/);
        if (match) {
            return match[1].split(',').map(t => t.trim());
        }
        return [];
    }

    /**
     * Final Phase: Update System Status in README
     */
    async updateStatus() {
        this.log('📝 Updating System Status in README.md...', 'info');
        const readmePath = path.join(this.rootPath, 'README.md');
        await this.distiller.updateReadme(readmePath);
        this.log('✅ System Status Updated.', 'success');
    }

    /**
     * Helper to find files recursively
     */
    async globRecursive(dir, pattern) {
        const glob = require('glob');
        return new Promise((resolve, reject) => {
            glob(path.join(dir, pattern).replace(/\\/g, '/'), (err, files) => {
                if (err) reject(err);
                else resolve(files);
            });
        });
    }

    /**
     * Universal Nexus Collision Logic (Multi-Option Wrapper)
     * Upgraded: Performs consolidation if similarity is high to prevent bloat.
     */
    wrapAsConditional(existing, added, context = 'Nexus Knowledge') {
        const similarity = this.calculateSimilarity(existing, added);
        
        if (similarity > 0.7) {
            this.log(`♻️ Consolidation triggered (Similarity: ${(similarity * 100).toFixed(1)}%). Merging knowledge...`, 'info');
            return this.consolidateKnowledge(existing, added, context);
        }

        return `
# 🛠 NEXUS COLLISION RESOLVED: ${context}
> Logika ini dihasilkan secara otomatis karena adanya alternatif antara dua sumber pengetahuan.

### 🧩 Pilihan Opsi Tak Terbatas:

#### Opsi A: Pola Eksisting (Existing Pattern)
${existing.trim()}

---

#### Opsi B: Pola Baru/Alternatif (New/Alternative Pattern)
${added.trim()}

---
*Generated by Nexus Engine | Protokol: Multi-Option | Date: ${new Date().toLocaleDateString()}*
`;
    }

    /**
     * Consolidate two pieces of knowledge into one cohesive block.
     */
    consolidateKnowledge(existing, added, reason) {
        const timestamp = new Date().toLocaleDateString();
        return `
# 🛠 NEXUS KNOWLEDGE CONSOLIDATED [${timestamp}]: ${reason}
> Berdasarkan tingkat kemiripan tinggi, sistem telah menggabungkan pengetahuan lama dan baru.

${added.trim()}

---
## 📁 Legacy Context (Preserved for Traceability)
<details>
<summary>View Original/Legacy Pattern</summary>

${existing.substring(0, 500)}... (Truncated for readability)
</details>

---
*Consolidation Engine v1.0 | Date: ${timestamp}*
`;
    }

    /**
     * Calculate Jaccard Similarity between two strings
     */
    calculateSimilarity(str1, str2) {
        const s1 = new Set(str1.toLowerCase().split(/\W+/));
        const s2 = new Set(str2.toLowerCase().split(/\W+/));
        const intersection = new Set([...s1].filter(x => s2.has(x)));
        const union = new Set([...s1, ...s2]);
        if (union.size === 0) return 0;
        return intersection.size / union.size;
    }
}

module.exports = NexusEngine;
