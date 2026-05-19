const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const { AuditReport, ImplementationPlan } = require('./Contract');
const Modifier = require('./Modifier');
const LaravelArchitect = require('./LaravelArchitect');
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
const Logger = require('./Logger');
const MemoryGovernor = require('./MemoryGovernor');
const EventBus = require('./EventBus');
const SandboxExecutor = require('./SandboxExecutor');
const NexusClock = require('./NexusClock');
const Orchestrator = require('./Orchestrator');
const ResourceMonitor = require('./ResourceMonitor');
const EvolutionPiper = require('./EvolutionPiper');
const DecisionEngine = require('./DecisionEngine');
const SemanticEngine = require('./SemanticEngine');
const redis = require('./RedisMemory');
const localAI = require('./LocalIntelligence');
const AgentRegistry = require('./AgentRegistry');
const NexusError = require('./NexusError');
const CoreUtils = require('./phases/CoreUtils');
const ParallelRunner = require('./ParallelRunner');
const NativeBridge = require('./NativeBridge');

const AuditPhase = require('./phases/AuditPhase');
const PlanningPhase = require('./phases/PlanningPhase');
const ImplementationPhase = require('./phases/ImplementationPhase');
const ExecutionPhase = require('./phases/ExecutionPhase');
const KnowledgePhase = require('./phases/KnowledgePhase');

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
 * NexusEngine - Core Orchestrator for the Human-AI Nexus Framework.
 */
class NexusEngine {
    constructor(config = {}) {
        this.rootPath = config.rootPath || process.cwd();
        
        const possibleNexusPath = path.join(this.rootPath, 'nexus');
        this.nexusDataPath = fs.pathExistsSync(possibleNexusPath) ? possibleNexusPath : this.rootPath;
        
        const hasDocsFolder = fs.pathExistsSync(path.join(this.nexusDataPath, 'docs'));
        const docsBase = hasDocsFolder ? path.join(this.nexusDataPath, 'docs') : this.nexusDataPath;

        // 🛡️ INTERNAL RESOURCE PATHS
        const engineBase = path.join(__dirname, '..');
        this.agentPath = path.join(engineBase, 'prompts');
        this.skillPath = path.join(engineBase, 'workflows');
        
        if (!fs.existsSync(this.agentPath)) {
            this.agentPath = path.join(this.nexusDataPath, 'agent', 'prompts');
            this.skillPath = path.join(this.nexusDataPath, 'workflow');
        }

        // 📂 PROJECT DATA PATHS
        this.auditPath = CoreUtils.resolvePath(this.rootPath, this.nexusDataPath, docsBase, 'memory', 'raw');
        this.logPath = CoreUtils.resolvePath(this.rootPath, this.nexusDataPath, docsBase, 'logs');
        this.planningPath = CoreUtils.resolvePath(this.rootPath, this.nexusDataPath, docsBase, 'planning');
        this.recordsPath = CoreUtils.resolvePath(this.rootPath, this.nexusDataPath, docsBase, 'memory', 'operational');
        this.summaryPath = CoreUtils.resolvePath(this.rootPath, this.nexusDataPath, docsBase, 'memory', 'summary');
        this.knowledgePath = CoreUtils.resolvePath(this.rootPath, this.nexusDataPath, docsBase, 'memory', 'distilled');
        this.algorithmsPath = CoreUtils.resolvePath(this.rootPath, this.nexusDataPath, docsBase, 'algorithms');

        this.architect = new LaravelArchitect(this.rootPath);
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
        // FIX #07 — Komponen mahal/jarang dipakai TIDAK diinstansiasi di constructor
        // Gunakan lazy getter di bawah class: designer, a11yScanner, queryOptimizer,
        // worktreeManager, evolutionPiper, native
        this.schemaGuard = new SchemaGuard(this.rootPath);
        this.rcAnalyzer = new RootCauseAnalyzer();
        this.machinist = new Machinist(this.rootPath, this.tddScaffolder);
        this.distiller = new Distiller(this.knowledgePath);
        this.decisionEngine = new DecisionEngine();
        this.parallel = ParallelRunner;

        this.currentAudit = null; 
        this.currentPlan = null;
        this.activeRack = null;
        this.orchestrator = new Orchestrator(this.rootPath);
        this.redisConnected = false;
        this.ollamaAvailable = false;

        this.logger = new Logger(this.rootPath);
        this.memoryGovernor = new MemoryGovernor(this.rootPath);
        this.currentCorrelationId = `CORR-${Date.now()}`;
        this.resourceMonitor = new ResourceMonitor();
        this.sandbox = new SandboxExecutor();
        this.semanticEngine = new SemanticEngine(this.knowledgePath);
        this.localAI = localAI;
        this.agentRegistry = AgentRegistry;

        // Initialize Specialized Phases
        this.auditPhase = new AuditPhase(this);
        this.planningPhase = new PlanningPhase(this);
        this.implementationPhase = new ImplementationPhase(this);
        this.executionPhase = new ExecutionPhase(this);
        this.knowledgePhase = new KnowledgePhase(this);

        this.initRedis();
    }

    // FIX #07 — Lazy-init getters: komponen hanya dibuat saat pertama kali diakses
    get designer() { if (!this._designer) this._designer = new Designer(); return this._designer; }
    get a11yScanner() { if (!this._a11yScanner) this._a11yScanner = new AccessibilityScanner(this.rootPath); return this._a11yScanner; }
    get queryOptimizer() { if (!this._queryOptimizer) this._queryOptimizer = new QueryOptimizer(this.rootPath); return this._queryOptimizer; }
    get worktreeManager() { if (!this._worktreeManager) this._worktreeManager = new WorktreeManager(this.rootPath); return this._worktreeManager; }
    get evolutionPiper() { if (!this._evolutionPiper) this._evolutionPiper = new EvolutionPiper(this); return this._evolutionPiper; }
    get native() { if (!this._native) this._native = new NativeBridge(this.rootPath); return this._native; }

    async initRedis() {
        try {
            await redis.connect();
            this.redisConnected = true;
            this.log('✅ Redis connected.', 'success');
        } catch (e) {
            this.log(`⚠️ Redis unavailable: ${e.message}. Running in file-only mode.`, 'warning');
        }
        
        try {
            await localAI.checkAvailability();
            this.ollamaAvailable = true;
        } catch (e) {
            this.log(`⚠️ Ollama unavailable: ${e.message}. AI features disabled.`, 'warning');
        }
    }

    setRack(rackName) {
        if (rackName) {
            this.activeRack = rackName;
            this.log(`🎯 Engine Focus Shifted to Rack: ${rackName}`, 'info');
        }
    }

    async discoverSkills() {
        this.log('📚 Discovering Skill Registry...', 'info');
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
        this.log('🧠 Accessing Memory HUB...', 'info');
        try {
            await fs.ensureDir(this.recordsPath);
            await fs.ensureDir(this.knowledgePath);
            const records = await fs.readdir(this.recordsPath);
            const knowledgeFiles = await fs.readdir(this.knowledgePath);
            const lessons = knowledgeFiles.filter(k => k.endsWith('.md'));
            const semanticIndex = {};
            for (const file of lessons) {
                const tags = await this.getSemanticTags(path.join(this.knowledgePath, file));
                tags.forEach(tag => {
                    if (!semanticIndex[tag]) semanticIndex[tag] = [];
                    semanticIndex[tag].push(file);
                });
            }
            this.memory = { pastCycles: records.length, lessons: lessons, semanticIndex: semanticIndex };
            this.log(`✅ Memory loaded: ${lessons.length} lessons indexed.`, 'success');
        } catch (e) {
            this.log(`⚠️ Memory access issue: ${e.message}.`, 'warning');
            this.memory = { pastCycles: 0, lessons: [], semanticIndex: {} };
        }
        return this.memory;
    }

    async getSemanticTags(filePath) {
        try {
            const content = await fs.readFile(filePath, 'utf8');
            const regex = />\s*\*\*METADATA\s*\(NEXUS\s*SEMANTIC\s*TAGS\)\*\*:\s*\[(.*?)\]/gi;
            const matches = [...content.matchAll(regex)];
            const tags = new Set();
            for (const match of matches) {
                if (match[1]) {
                    match[1].split(',').forEach(t => tags.add(t.trim().toLowerCase()));
                }
            }
            return Array.from(tags);
        } catch (e) {}
        return [];
    }

    async searchKnowledge(query, topK = 5) {
        try {
            const results = await this.semanticEngine.search(query, topK);
            if (results.length > 0) return results.map(r => r.file);
        } catch (e) {
            this.log(`⚠️ Vector search failed: ${e.message}`, 'warning');
        }
        if (!this.memory.semanticIndex) await this.readMemory();
        return this.memory.semanticIndex[query.toLowerCase()] || [];
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
        throw new Error(`Agent ${agentName} not found.`);
    }

    log(message, type = 'info') {
        const colors = { info: '\x1b[36m', success: '\x1b[32m', warning: '\x1b[33m', error: '\x1b[31m', reset: '\x1b[0m' };
        console.log(`${colors[type]}${message}${colors.reset}`);
        const level = type.toUpperCase() === 'SUCCESS' ? 'INFO' : type.toUpperCase();
        this.logger.log('orchestration', level, 'NexusEngine', 'N/A', 'SYSTEM_LOG', message, 0, {}, this.currentCorrelationId).catch(() => {});
    }

    // Modularized Delegation Methods
    async audit(targetPath = this.rootPath, options = {}) {
        return await this.auditPhase.run({ targetPath, ...options });
    }

    async plan(auditReport) {
        return await this.planningPhase.run(auditReport);
    }

    async implement() {
        return await this.implementationPhase.run();
    }

    async execute(plan) {
        return await this.executionPhase.run(plan);
    }

    async verify(plan) {
        return await this.executionPhase.verify(plan);
    }

    async cleanCodeAndVerify(projectPath = this.rootPath) {
        return await this.executionPhase.cleanCodeAndVerify(projectPath);
    }

    async harvest(sourcePath) {
        return await this.knowledgePhase.harvest(sourcePath);
    }

    async distill() {
        return await this.knowledgePhase.run();
    }

    async updateStatus() {
        return await this.knowledgePhase.updateStatus();
    }

    // FIX #17 — Global timeout 45 menit per cycle (ditingkatkan untuk local AI generation)
    // Jika audit/planning/execution hang (Ollama lambat dll), cycle di-abort otomatis
    async runCycle(options = {}) {
        const CYCLE_TIMEOUT_MS = 45 * 60 * 1000; // 45 menit
        const cyclePromise = this._doRunCycle(options);
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(
                () => reject(new NexusError('TIMEOUT', 'Cycle exceeded 45 minutes — aborting to prevent permanent hang')),
                CYCLE_TIMEOUT_MS
            )
        );
        return Promise.race([cyclePromise, timeoutPromise]);
    }

    async _doRunCycle(options = {}) {
        const startTime = Date.now();
        this.state = STATES.INIT;
        this.log(`\n--- Nexus Engine: Modularized Cycle Start ---`, 'info');
        
        try {
            this.state = STATES.PROCESSING;
            await this.discoverSkills();
            await this.readMemory();

            await this.blueprintApp(options);

            const report = await this.audit(this.rootPath, options);
            const plan = await this.plan(report);
            
            this.state = STATES.EXECUTING;
            await this.implement();
            await this.execute(plan);
            
            await this.cleanCodeAndVerify();

            const cycleID = `CYCLE-${Date.now()}`;
            this.state = STATES.LOGGING;
            await this.verify(plan); 
            await this.record(cycleID);
            
            this.state = STATES.COMPLETED;
            await this.generateCycleSummary(cycleID);
            this.log(`\n--- Nexus Engine: Cycle Complete (${Date.now() - startTime}ms) ---`, 'info');
        } catch (error) {
            this.state = STATES.FAILED;
            const nexusErr = error instanceof NexusError ? error : new NexusError('RUNTIME', error.message);
            this.log(`❌ Engine Critical Failure: ${nexusErr.message}`, 'error');
            await this.logError(nexusErr);
        }
    }

    async blueprintApp(options = {}) {
        this.log(`🏗️ Phase 0.5: Blueprint & Scaffolding...`, 'info');
        const readmePath = path.join(this.rootPath, 'README.md');
        const blueprintPath = path.join(this.rootPath, 'NEXUS_BLUEPRINT.json');
        if (await fs.pathExists(blueprintPath)) return;

        // R-05: Global Blueprint Cache
        const projectName = path.basename(this.rootPath);
        const globalCacheDir = path.join(__dirname, '..', '..', 'memory', 'cache', 'blueprints');
        const cachePath = path.join(globalCacheDir, `${projectName}.json`);

        if (await fs.pathExists(cachePath)) {
            try {
                this.log(`   🎁 Found cached blueprint for ${projectName} in global cache.`, 'success');
                const cachedBlueprint = await fs.readJson(cachePath);
                await fs.writeJson(blueprintPath, cachedBlueprint, { spaces: 2 });
                this.log(`   ✅ Blueprint restored from cache.`, 'success');
                return;
            } catch (err) {
                this.log(`   ⚠️ Failed to read cached blueprint: ${err.message}`, 'warning');
            }
        }

        let readmeContent = '';
        if (await fs.pathExists(readmePath)) {
            readmeContent = await fs.readFile(readmePath, 'utf8');
        }

        const isNexusManaged = readmeContent.includes('Generated by Nexus') || 
                               readmeContent.includes('Laravel') || 
                               (options && options.isNewProject);
        if (!isNexusManaged) return;

        const prompt = `You are a Senior Software Architect. We are building a Laravel TALL Stack application.
Analyze the following project README carefully (paying attention to the project name, description, and tags):

${readmeContent}

Identify all the essential features this application MUST have based on its name and tags.
For a 100% complete web app, you must generate a comprehensive architecture.

Output strictly JSON with this exact structure (do not add any other keys, explanation, or markdown):
{
  "project_name": "...",
  "models": ["ModelName1", "ModelName2"],
  "migrations": ["create_table_name1_table", "create_table_name2_table"],
  "livewire_components": ["component-name-1", "component-name-2"],
  "seeders": ["ModelName1Seeder", "ModelName2Seeder"],
  "factories": ["ModelName1Factory", "ModelName2Factory"],
  "routes": ["/dashboard", "/modelname1"],
  "pivot_tables": [],
  "relationships": [{"model": "ModelName1", "type": "hasMany", "target": "ModelName2"}]
}`;
        const response = await localAI.generate(prompt, 'generate_architecture');
        if (!response) return;

        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            let blueprint = JSON.parse(jsonMatch ? jsonMatch[0] : response);
            
            // Schema Validation (G2-02)
            const BLUEPRINT_SCHEMA = {
                required: ['project_name', 'models', 'migrations', 'livewire_components', 'seeders', 'factories'],
                arrays: ['models', 'migrations', 'livewire_components', 'seeders', 'factories'],
                strings: ['project_name']
            };
            
            for (const key of BLUEPRINT_SCHEMA.required) {
                if (!(key in blueprint)) throw new Error(`Blueprint missing required key: ${key}`);
            }
            for (const key of BLUEPRINT_SCHEMA.arrays) {
                if (!Array.isArray(blueprint[key])) throw new Error(`Blueprint key "${key}" must be array`);
                // Sanitize: allow alphanumeric + underscore + hyphen for Livewire components, strict alphanumeric + underscore for models/migrations
                const isComponent = key === 'livewire_components';
                const regex = isComponent ? /^[a-zA-Z0-9_-]+$/ : /^[a-zA-Z_][a-zA-Z0-9_]*$/;
                blueprint[key] = blueprint[key].filter(v => typeof v === 'string' && regex.test(v));
            }
            if (typeof blueprint.project_name !== 'string') {
                blueprint.project_name = String(blueprint.project_name || 'nexus_app');
            }
            blueprint.project_name = blueprint.project_name.replace(/[^a-zA-Z0-9_-]/g, '');

            await fs.writeJson(blueprintPath, blueprint, { spaces: 2 });
            
            // Cache globally for future runs
            await fs.ensureDir(globalCacheDir);
            await fs.writeJson(cachePath, blueprint, { spaces: 2 });
            this.log(`   ✅ Blueprint generated, validated, and cached globally.`, 'success');
        } catch (e) {
            this.log(`   ❌ Blueprint failed: ${e.message}`, 'error');
        }
    }

    async record(cycleID) {
        this.log('📝 Phase 4: Finalization & Records...', 'info');
        await fs.ensureDir(this.recordsPath);
        const recordsPath = path.join(this.recordsPath, `session_${Date.now()}.json`);
        await fs.writeJson(recordsPath, { cycle: cycleID, audit: this.currentAudit?.id, plan: this.currentPlan?.id, timestamp: NexusClock.getISOTimestamp() }, { spaces: 2 });
        await this.memoryPipeline.optimize();
    }

    async generateCycleSummary(cycleID) {
        const summary = { cycleID, timestamp: NexusClock.getISOTimestamp(), finalState: this.state, metrics: this.metrics, agentsInvolved: Array.from(this.activeAgents) };
        await fs.ensureDir(this.summaryPath);
        await fs.writeJson(path.join(this.summaryPath, `cycle_summary_${cycleID}.json`), summary, { spaces: 2 });
    }

    async logError(err) {
        const errorLog = path.join(this.summaryPath, 'error_log.json');
        let logs = [];
        try {
            if (await fs.pathExists(errorLog)) logs = await fs.readJson(errorLog);
            logs.push({ phase: err.phase, state: this.state, message: err.message, timestamp: err.timestamp, stack: err.stack });
            await fs.writeJson(errorLog, logs, { spaces: 2 });
        } catch (e) {}
    }

    async getSystemStatus() {
        const stress = await this.resourceMonitor.checkStress();
        const agentHealth = this.agentRegistry ? this.agentRegistry.getHealthReport() : null;
        console.log(`\n--- NEXUS STATUS: ${stress.metrics.mem_usage_pct}% RAM | ${stress.metrics.cpu_usage_pct}% CPU ---\n`);
        return { stress, agentHealth };
    }

    wrapAsConditional(existing, added, context = 'Nexus Knowledge') {
        const similarity = this.calculateSimilarity(existing, added);
        
        if (similarity > 0.75) {
            return `\n# NEXUS KNOWLEDGE CONSOLIDATED: ${context}\n${added}\n`;
        }
        
        // G2-03: Collision Accumulation Prevention
        if (existing.includes('NEXUS COLLISION RESOLVED') || existing.includes('Opsi A:')) {
            const regexA = /Opsi A:\s*\n([\s\S]*?)(?=\nOpsi B:)/i;
            const regexB = /Opsi B:\s*\n([\s\S]*?)(?=\n#|$)/i;
            const matchA = existing.match(regexA);
            const matchB = existing.match(regexB);
            
            const optA = matchA ? matchA[1].trim() : '';
            const optB = matchB ? matchB[1].trim() : '';
            const optC = added.trim();
            
            const scoreOption = (content) => {
                if (!content) return 0;
                let score = content.length * 0.1;
                if (content.includes('**METADATA')) score += 100;
                if (content.includes('# ')) score += 50;
                return score;
            };
            
            const options = [
                { id: 'A', content: optA, score: scoreOption(optA) },
                { id: 'B', content: optB, score: scoreOption(optB) },
                { id: 'C', content: optC, score: scoreOption(optC) }
            ];
            
            options.sort((x, y) => y.score - x.score);
            const winnerContent = options[0].content;
            
            return `\n# NEXUS KNOWLEDGE CONSOLIDATED: ${context}\n${winnerContent}\n`;
        }
        
        return `\n# NEXUS COLLISION RESOLVED: ${context}\nOpsi A:\n${existing}\nOpsi B:\n${added}\n`;
    }

    calculateSimilarity(str1, str2) {
        if (!str1 || !str2) return 0;
        if (str1 === str2) return 1;
        const natural = require('natural');
        const rawSimilarity = natural.JaroWinklerDistance(str1, str2);
        return Math.pow(rawSimilarity, 2);
    }
}

module.exports = NexusEngine;
