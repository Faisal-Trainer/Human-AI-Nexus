# 🏗️ NEXUS Multi-Agent Stability Guide
> **Reviewer**: Senior AI Engineer  
> **Tanggal**: 2026-05-13  
> **Basis**: Full source code scan — NexusEngine, EventBus, Orchestrator, MemoryGovernor, ResourceMonitor, DecisionEngine  
> **Tujuan**: Panduan konkret untuk membuat NEXUS stabil sebagai Multi-Agent Framework

---

## Gambaran Besar — Apa Yang Sedang Terjadi

Sebelum masuk ke detail, ini visualisasi sistem saat ini:

```
nexus run
    │
    ▼
NexusEngine (God Object — 20+ dependency)
    │
    ├── Orchestrator ──► EventBus ──► SandboxExecutor
    │                                     │
    ├── MemoryPipeline                     ▼
    │                              6 Specialist Agents
    ├── Distiller                   (Promise.all — parallel)
    │
    ├── SemanticEngine
    │
    ├── LocalIntelligence
    │
    └── ... 15 modul lainnya
```

Masalah utama: **semuanya terhubung langsung ke NexusEngine**. Kalau satu modul bermasalah, seluruh sistem terancam.

---

## 10 Masalah Stabilitas Yang Ditemukan

### 1. NexusEngine adalah God Object 🔴

**Diagnosis:**
```javascript
// NexusEngine.js constructor — 20+ dependency langsung
this.modifier = new Modifier(this.rootPath);
this.memoryPipeline = new MemoryPipeline(...);
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
this.evolutionPiper = new EvolutionPiper(this.rootPath);
this.decisionEngine = new DecisionEngine();
this.semanticEngine = new SemanticEngine(this.knowledgePath);
this.localAI = localAI;
```

**Dampak**: Single Point of Failure. Kalau satu konstruktor throw, seluruh engine tidak bisa start.

**Solusi — Lazy Loading:**
```javascript
// Ganti inisialisasi langsung dengan lazy loader
class NexusEngine {
    constructor(config = {}) {
        this.rootPath = config.rootPath || process.cwd();
        this._modules = {}; // Registry modul, diload saat dibutuhkan
    }

    // Modul hanya diload saat pertama kali diakses
    get modifier() {
        if (!this._modules.modifier) {
            const Modifier = require('./Modifier');
            this._modules.modifier = new Modifier(this.rootPath);
        }
        return this._modules.modifier;
    }

    get semanticEngine() {
        if (!this._modules.semanticEngine) {
            const SemanticEngine = require('./SemanticEngine');
            this._modules.semanticEngine = new SemanticEngine(this.knowledgePath);
        }
        return this._modules.semanticEngine;
    }
    
    // ...dan seterusnya untuk semua modul
}
```

**Benefit**: Engine bisa start meski beberapa modul gagal. Modul yang tidak dipakai tidak memakan RAM.

---

### 2. ResourceMonitor CPU Selalu 0% 🔴

**Diagnosis:**
```javascript
// ResourceMonitor.js — ini adalah bug nyata
getMetrics() {
    return {
        cpu_usage_pct: 0, // ← PLACEHOLDER! Tidak pernah diisi
        mem_usage_pct: memUsage.toFixed(2),
        // ...
    };
}
```

`checkStress()` hanya cek memory dan load_avg. CPU usage tidak pernah diukur. Di kondisi seperti tadi (CPU 100%), sistem tidak tahu kalau CPU sedang penuh.

**Solusi — Real CPU Measurement:**
```javascript
class ResourceMonitor {
    constructor(thresholds = {}) {
        this.cpuThreshold = thresholds.cpu || 80;
        this.memThreshold = thresholds.mem || 85; // Turunkan dari 90 ke 85 untuk safety margin
        this._lastCpuMeasure = null;
    }

    async getCpuUsage() {
        // CPU usage butuh 2 snapshot dengan delay — ini cara yang benar
        const measure = () => {
            const cpus = os.cpus();
            let idle = 0, total = 0;
            cpus.forEach(cpu => {
                for (const type in cpu.times) total += cpu.times[type];
                idle += cpu.times.idle;
            });
            return { idle, total };
        };

        const start = measure();
        await new Promise(r => setTimeout(r, 200)); // tunggu 200ms
        const end = measure();

        const idleDiff = end.idle - start.idle;
        const totalDiff = end.total - start.total;
        return totalDiff === 0 ? 0 : (100 - (idleDiff / totalDiff) * 100);
    }

    async checkStress() {
        const freeMem = os.freemem();
        const totalMem = os.totalmem();
        const memPct = ((totalMem - freeMem) / totalMem) * 100;
        const cpuPct = await this.getCpuUsage();

        const isMemStressed = memPct > this.memThreshold;
        const isCpuStressed = cpuPct > this.cpuThreshold;
        const isStressed = isMemStressed || isCpuStressed;

        // Throttle recommendation berdasarkan severity
        let recommendation = 'PROCEED';
        if (memPct > 95 || cpuPct > 95) recommendation = 'PAUSE';       // Darurat
        else if (isStressed) recommendation = 'THROTTLE';                // Kurangi paralel
        
        return {
            stressed: isStressed,
            metrics: { cpu_usage_pct: cpuPct.toFixed(1), mem_usage_pct: memPct.toFixed(1) },
            recommendation
        };
    }
}
```

---

### 3. EventBus Tidak Punya Schema Validation 🟡

**Diagnosis:**
```javascript
// EventBus.js — siapapun bisa publish event apapun
publish(event, payload) {
    // Tidak ada validasi event name
    // Tidak ada validasi payload structure
    this.emit(event, payload);
}
```

Dalam multi-agent, ini artinya agent yang buggy bisa publish event dengan format salah dan meng-crash agent lain yang subscribe.

**Solusi — Event Schema Registry:**
```javascript
// Tambahkan di EventBus.js

const EVENT_SCHEMA = {
    'SCANNER_TRIGGERED': { required: ['agent', 'pluginPath', 'input'] },
    'SCANNER_FINISHED':  { required: ['task_id', 'result'] },
    'TASK_FAILED':       { required: ['task_id', 'error'] },
    'CYCLE_FINISHED':    { required: [] },
    'MEMORY_UPDATED':    { required: ['category', 'filename'] },
    'AGENT_READY':       { required: ['agent_id'] },
    'AGENT_BUSY':        { required: ['agent_id', 'task_id'] },
};

publish(event, payload) {
    // Validasi event terdaftar
    if (!EVENT_SCHEMA[event]) {
        console.warn(`⚠️ EventBus: Unknown event "${event}". Register it in EVENT_SCHEMA first.`);
        // Di development: throw. Di production: warn saja agar tidak crash.
        return;
    }

    // Validasi required fields
    const schema = EVENT_SCHEMA[event];
    const missing = schema.required.filter(field => !payload || payload[field] === undefined);
    if (missing.length > 0) {
        throw new Error(
            `EventBus Schema Violation: Event "${event}" missing fields [${missing.join(', ')}]`
        );
    }

    // Existing duplicate prevention logic...
    const payloadStr = JSON.stringify(payload);
    const eventKey = `${event}-${payloadStr}`;
    if (this._recentEvents.has(eventKey)) return;
    // ... rest sama
}
```

---

### 4. Tidak Ada Circuit Breaker untuk Agent Failure 🔴

**Diagnosis:**
```javascript
// NexusEngine — audit phase
const agentResults = await Promise.all(
    specialists.map(agent => this.runSpecialistAgent(agent, context))
);
```

Kalau 1 dari 6 agent timeout atau throw, `Promise.all` akan menggantung atau crash seluruh audit.

**Solusi — Circuit Breaker Pattern:**
```javascript
// Tambahkan method ini di NexusEngine.js

async runWithCircuitBreaker(agentName, fn, timeoutMs = 30000) {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Agent "${agentName}" timed out after ${timeoutMs}ms`)), timeoutMs)
    );

    try {
        const result = await Promise.race([fn(), timeoutPromise]);
        return { agent: agentName, status: 'success', result };
    } catch (err) {
        // Agent gagal — catat tapi jangan crash seluruh sistem
        await this.logger.log('agents', 'ERROR', agentName, 'N/A', 'AGENT_FAILED', err.message);
        return { agent: agentName, status: 'failed', error: err.message, result: null };
    }
}

// Ganti Promise.all dengan ini:
async runSpecialistsParallel(specialists, context) {
    const results = await Promise.allSettled(
        specialists.map(agent =>
            this.runWithCircuitBreaker(agent.name, () => this.runSpecialistAgent(agent, context))
        )
    );

    const successful = results.filter(r => r.value?.status === 'success');
    const failed = results.filter(r => r.value?.status === 'failed');

    if (failed.length > 0) {
        this.log(`⚠️ ${failed.length}/${specialists.length} agents failed: ${failed.map(f => f.value.agent).join(', ')}`, 'warning');
    }

    // Lanjutkan dengan hasil yang ada, jangan abort seluruh cycle
    return successful.map(r => r.value.result);
}
```

---

### 5. MemoryGovernor Lock Bisa Cascade Deadlock 🟡

**Diagnosis:**
```javascript
// MemoryGovernor.js
async acquireLock(filename, timeoutMs = 5000) {
    const lockFile = path.join(this.memoryPath, `${filename}.lock`);
    const start = Date.now();
    while (await fs.pathExists(lockFile)) {
        if (Date.now() - start > timeoutMs) {
            throw new Error(`MemoryGovernor: Lock timeout on ${filename}`);
        }
        await new Promise(r => setTimeout(r, 100)); // polling setiap 100ms
    }
    await fs.writeJson(lockFile, { locked_at: NexusClock.getISOTimestamp() });
}
```

Dalam multi-agent parallel, 6 agent bisa coba lock file yang sama bersamaan. Mereka semua akan polling setiap 100ms. Di RAM 8GB yang sudah 94%, ini bisa starvation.

Lebih berbahaya: kalau proses crash setelah `acquireLock` tapi sebelum `releaseLock`, lock file tidak pernah terhapus. **Permanent deadlock**.

**Solusi — Stale Lock Detection:**
```javascript
async acquireLock(filename, timeoutMs = 5000) {
    const lockFile = path.join(this.memoryPath, `${filename}.lock`);
    const start = Date.now();
    
    while (await fs.pathExists(lockFile)) {
        // CEK STALE LOCK: Kalau lock lebih dari 30 detik, anggap prosesnya sudah mati
        try {
            const lockData = await fs.readJson(lockFile);
            const lockAge = Date.now() - new Date(lockData.locked_at).getTime();
            const STALE_THRESHOLD_MS = 30000; // 30 detik
            
            if (lockAge > STALE_THRESHOLD_MS) {
                console.warn(`⚠️ MemoryGovernor: Stale lock detected on "${filename}" (${Math.round(lockAge/1000)}s old). Force releasing.`);
                await fs.remove(lockFile);
                break; // Lock sudah dihapus, lanjut acquire
            }
        } catch (e) {
            // File lock corrupt — hapus saja
            await fs.remove(lockFile).catch(() => {});
            break;
        }

        if (Date.now() - start > timeoutMs) {
            throw new Error(`MemoryGovernor: Lock timeout on "${filename}" after ${timeoutMs}ms`);
        }
        
        // Exponential backoff — kurangi polling pressure
        const elapsed = Date.now() - start;
        const waitMs = Math.min(100 * Math.pow(1.5, Math.floor(elapsed / 500)), 1000);
        await new Promise(r => setTimeout(r, waitMs));
    }

    await fs.writeJson(lockFile, {
        locked_at: new Date().toISOString(),
        process_pid: process.pid // Track siapa yang lock
    });
}
```

---

### 6. DecisionEngine Weight Hardcoded 🟡

**Diagnosis:**
```javascript
// DecisionEngine.js
constructor() {
    this.weights = {
        security: 0.5,   // ← Tidak bisa dikonfigurasi
        stability: 0.3,
        performance: 0.1,
        readability: 0.1
    };
}
```

Weight ini tidak bisa disesuaikan per context. Refactor di SaaS project seharusnya weight `stability` lebih tinggi dari `security`. Scanner di security project sebaliknya.

**Solusi — Context-Aware Weights:**
```javascript
// DecisionEngine.js — Tambahkan weight profiles

const WEIGHT_PROFILES = {
    default:     { security: 0.5, stability: 0.3, performance: 0.1, readability: 0.1 },
    saas:        { security: 0.3, stability: 0.4, performance: 0.2, readability: 0.1 },
    security:    { security: 0.6, stability: 0.3, performance: 0.05, readability: 0.05 },
    performance: { security: 0.2, stability: 0.2, performance: 0.5, readability: 0.1 },
    refactor:    { security: 0.2, stability: 0.3, performance: 0.1, readability: 0.4 },
};

resolve(options, context = 'default') {
    const weights = WEIGHT_PROFILES[context] || WEIGHT_PROFILES.default;
    
    const ranked = options.map(opt => {
        let totalScore = 0;
        for (const criteria in weights) {
            totalScore += (opt.scores[criteria] || 0) * weights[criteria];
        }
        return { ...opt, final_score: totalScore, context_used: context };
    });

    ranked.sort((a, b) => b.final_score - a.final_score);
    return { winner: ranked[0], runner_up: ranked[1] };
}
```

---

### 7. Tidak Ada Agent Health Check 🟡

Saat ini tidak ada cara untuk mengetahui agent mana yang sedang aktif, mana yang idle, mana yang stuck. `activeAgents` di NexusEngine hanya `Set` tanpa status detail.

**Solusi — Agent Registry:**
```javascript
// Tambahkan class baru: agent/core/AgentRegistry.js

class AgentRegistry {
    constructor() {
        this._agents = new Map();
        // { agentId: { name, status, startedAt, lastActivity, taskCount, errorCount } }
    }

    register(agentId, name) {
        this._agents.set(agentId, {
            name,
            status: 'idle',       // idle | busy | failed | timeout
            startedAt: null,
            lastActivity: new Date().toISOString(),
            taskCount: 0,
            errorCount: 0
        });
    }

    markBusy(agentId, taskId) {
        const agent = this._agents.get(agentId);
        if (agent) {
            agent.status = 'busy';
            agent.startedAt = new Date().toISOString();
            agent.currentTask = taskId;
            agent.taskCount++;
        }
    }

    markIdle(agentId) {
        const agent = this._agents.get(agentId);
        if (agent) {
            agent.status = 'idle';
            agent.startedAt = null;
            agent.currentTask = null;
            agent.lastActivity = new Date().toISOString();
        }
    }

    markFailed(agentId, error) {
        const agent = this._agents.get(agentId);
        if (agent) {
            agent.status = 'failed';
            agent.errorCount++;
            agent.lastError = error;
        }
    }

    // Detect agent yang stuck (busy > threshold)
    getStuckAgents(thresholdMs = 60000) {
        const now = Date.now();
        return Array.from(this._agents.entries())
            .filter(([_, a]) => a.status === 'busy' && (now - new Date(a.startedAt).getTime()) > thresholdMs)
            .map(([id, a]) => ({ id, ...a }));
    }

    getHealthReport() {
        const agents = Array.from(this._agents.values());
        return {
            total: agents.length,
            idle: agents.filter(a => a.status === 'idle').length,
            busy: agents.filter(a => a.status === 'busy').length,
            failed: agents.filter(a => a.status === 'failed').length,
            stuck: this.getStuckAgents().length,
            agents: Object.fromEntries(this._agents)
        };
    }
}

module.exports = new AgentRegistry(); // Singleton
```

---

### 8. Tidak Ada Dead Letter Queue untuk Task Gagal 🟡

Saat ini kalau task gagal setelah 3 retry, event `TASK_FAILED` dipublish tapi tidak ada yang menyimpannya untuk analisis.

**Solusi — Dead Letter Queue:**
```javascript
// Tambahkan di Orchestrator.js

constructor(rootPath) {
    // ... existing code
    this.deadLetterQueue = []; // DLQ untuk task yang gagal permanen
    this.MAX_DLQ_SIZE = 100;
}

// Di handler TASK_FAILED:
EventBus.subscribe('TASK_FAILED', async (payload) => {
    // Simpan ke DLQ
    this.deadLetterQueue.push({
        ...payload,
        failed_at: new Date().toISOString(),
        can_retry: false
    });

    // Trim DLQ kalau terlalu besar
    if (this.deadLetterQueue.length > this.MAX_DLQ_SIZE) {
        this.deadLetterQueue.shift();
    }

    // Tulis ke disk untuk persistent analysis
    const dlqPath = path.join(this.rootPath, 'logs', 'dead_letter_queue.json');
    await fs.writeJson(dlqPath, this.deadLetterQueue, { spaces: 2 }).catch(() => {});
    
    console.error(`💀 Dead Letter: Task ${payload.task_id} failed permanently. Total DLQ: ${this.deadLetterQueue.length}`);
});

// Tambahkan method untuk review DLQ
getDLQReport() {
    return {
        total_failed: this.deadLetterQueue.length,
        by_agent: this.deadLetterQueue.reduce((acc, t) => {
            acc[t.error?.agent || 'unknown'] = (acc[t.error?.agent || 'unknown'] || 0) + 1;
            return acc;
        }, {}),
        tasks: this.deadLetterQueue
    };
}
```

---

### 9. MemoryPipeline Harvest Tanpa Versioning 🟡

**Diagnosis:**
```javascript
// MemoryPipeline.js
const dest = isRecords ? ... : path.join(this.knowledgePath, fileName);
await fs.writeFile(dest, content); // ← Langsung overwrite tanpa backup!
```

Kalau file di `memory/distilled/` sudah ada dan harvest menimpa dengan konten yang lebih buruk, tidak ada cara untuk rollback.

**Solusi — Versioned Write:**
```javascript
async versionedWrite(destPath, content) {
    if (await fs.pathExists(destPath)) {
        // Buat backup sebelum overwrite
        const timestamp = Date.now();
        const backupPath = destPath.replace('.md', `_backup_${timestamp}.md`);
        const archivePath = path.join(this.rootPath, 'memory', 'archived', path.basename(backupPath));
        
        await fs.copy(destPath, archivePath);
        console.log(`   💾 Versioned: ${path.basename(destPath)} → archived/`);
    }
    await fs.writeFile(destPath, content);
}

// Ganti fs.writeFile dengan versionedWrite di processHarvestData
```

---

### 10. `nexus status` Belum Ada — Observability Buta 🟡

Saat ini tidak ada cara cepat untuk tahu health sistem secara keseluruhan.

**Solusi — Implementasi `nexus status`:**

```javascript
// Di agent/main.js, tambahkan handler:
case 'status':
    await engine.getSystemStatus();
    break;

// Di NexusEngine.js, tambahkan method:
async getSystemStatus() {
    const stress = await this.resourceMonitor.checkStress();
    const agentHealth = this.agentRegistry ? this.agentRegistry.getHealthReport() : null;
    const dlq = this.orchestrator ? this.orchestrator.getDLQReport() : null;
    const vectorCacheExists = await fs.pathExists(
        path.join(this.knowledgePath, '..', 'short_term', 'vector_index.json')
    );

    console.log('\n╔══════════════════════════════════════╗');
    console.log('║        NEXUS SYSTEM STATUS           ║');
    console.log('╠══════════════════════════════════════╣');
    console.log(`║ RAM Usage   : ${stress.metrics.mem_usage_pct}%`);
    console.log(`║ CPU Usage   : ${stress.metrics.cpu_usage_pct}%`);
    console.log(`║ Status      : ${stress.recommendation}`);
    console.log('╠══════════════════════════════════════╣');
    if (agentHealth) {
        console.log(`║ Agents Total: ${agentHealth.total}`);
        console.log(`║ Idle        : ${agentHealth.idle}`);
        console.log(`║ Busy        : ${agentHealth.busy}`);
        console.log(`║ Stuck       : ${agentHealth.stuck}`);
    }
    console.log('╠══════════════════════════════════════╣');
    if (dlq) {
        console.log(`║ Dead Letter : ${dlq.total_failed} tasks`);
    }
    console.log(`║ Vector Index: ${vectorCacheExists ? '✅ Cached' : '❌ Not built'}`);
    console.log('╚══════════════════════════════════════╝\n');
}
```

---

## Prioritas Implementasi

### 🔴 Lakukan Segera (Stability Blocker)

| # | Fix | Dampak Kalau Tidak Dilakukan |
| :--- | :--- | :--- |
| 1 | Circuit Breaker di `Promise.all` | 1 agent gagal = seluruh audit crash |
| 2 | Fix `ResourceMonitor` CPU = 0% | Sistem tidak tahu kalau CPU 100% |
| 3 | Stale Lock Detection di `MemoryGovernor` | Permanent deadlock kalau process crash |

### 🟡 Sprint Berikutnya (Reliability)

| # | Fix | Dampak Kalau Tidak Dilakukan |
| :--- | :--- | :--- |
| 4 | EventBus Schema Validation | Agent buggy bisa corrupt event stream |
| 5 | AgentRegistry + Health Check | Tidak bisa detect agent yang stuck |
| 6 | Dead Letter Queue | Task gagal hilang tanpa trace |
| 7 | Versioned Write di MemoryPipeline | Harvest bisa overwrite knowledge yang bagus |

### 🟢 Enhancement (Maturity)

| # | Fix | Benefit |
| :--- | :--- | :--- |
| 8 | Lazy Loading di NexusEngine | Startup lebih cepat, RAM lebih hemat |
| 9 | Context-Aware Weights di DecisionEngine | Keputusan lebih akurat per domain |
| 10 | Implementasi `nexus status` | Observability real-time |

---

## Prinsip Akhir

```
Stability Rule #1: Satu agent gagal TIDAK BOLEH crash agent lain.
Stability Rule #2: Satu write gagal TIDAK BOLEH corrupt knowledge yang sudah ada.
Stability Rule #3: Sistem HARUS bisa bilang kondisi dirinya sendiri kapanpun.
```

Kalau tiga aturan ini terpenuhi, NEXUS siap jalan 24 jam autonomous.

---

> **METADATA (NEXUS SEMANTIC TAGS)**: [architecture, performance, stability, tdd, multi-agent, observability]  
> **Status**: READY_FOR_IMPLEMENTATION  
> *Senior AI Engineer Review | NEXUS Multi-Agent Stability v1.0*
