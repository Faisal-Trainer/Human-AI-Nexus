# NEXUS AI — Architecture Audit Report
> **VERSION**: v1 | **Last Updated**: 26/05/2026


**Version:** 3.3.0  
**Auditor:** AI Engineering Review  
**Tanggal:** 16 Mei 2026  
**Cakupan:** Seluruh `agent/core/`, `agent/phases/`, `agent/tools/`, `agent/main.js`, `.github/`, `.env`

---

## Ringkasan Eksekutif

Proyek NEXUS AI memiliki fondasi arsitektur yang solid: EventBus schema-validated, Dead Letter Queue di Orchestrator, guardrail whitelist di LocalIntelligence, versioned write di MemoryPipeline, dan circuit-aware ResourceMonitor. Namun setelah audit menyeluruh terhadap **27 file core**, ditemukan **27 isu** yang terdiri dari bug aktif, potensi crash, celah keamanan, dan technical debt yang perlu diselesaikan sebelum roadmap 100-project dapat berjalan stabil.

---

## Indeks Isu

| No | Komponen | Kategori | Severity |
|----|----------|----------|----------|
| 01 | `LocalIntelligence` | Prompt OOM | 🔴 Critical |
| 02 | `Orchestrator.executeTask` | Hanging Promise | 🔴 Critical |
| 03 | `NativeBridge` | Cross-platform | 🔴 Critical |
| 04 | `SandboxExecutor` | Security | 🔴 Critical |
| 05 | `RedisMemory` | Data Loss | 🔴 Critical |
| 06 | `Logger` | Data Corruption | 🔴 Critical |
| 07 | `NexusEngine` | God Object | 🟠 High |
| 08 | `LocalIntelligence` | Race Condition | 🟠 High |
| 09 | Ollama / LocalIntelligence | No Circuit Breaker | 🟠 High |
| 10 | `EventBus` | Memory Leak | 🟠 High |
| 11 | `AgentRegistry` | Not Wired | 🟠 High |
| 12 | `EvolutionPiper` | State Lost on Crash | 🟠 High |
| 13 | `WorktreeManager` | Blocking Event Loop | 🟠 High |
| 14 | `AuditPhase` | No Concurrency Limit | 🟠 High |
| 15 | `SemanticEngine` | NaN Corruption | 🟠 High |
| 16 | `RedisMemory` | Lazy Connect Bug | 🟠 High |
| 17 | `NexusEngine.runCycle` | No Global Timeout | 🟡 Medium |
| 18 | `EventBus` | Aggressive Dedup | 🟡 Medium |
| 19 | `MemoryPipeline` vs `SemanticEngine` | Duplicate Index | 🟡 Medium |
| 20 | `MemoryGovernor` vs `MemoryPipeline` | Overlapping Ownership | 🟡 Medium |
| 21 | `Contract.js` | Timestamp Inconsistency | 🟡 Medium |
| 22 | `ExecutionPhase` | Hardcoded Legacy Patterns | 🟡 Medium |
| 23 | `main.js` | Duplicate Orchestrator | 🟡 Medium |
| 24 | `EvolutionPiper.spawnRealLaravel` | Dead Code | 🟡 Medium |
| 25 | `Distiller` | Unused NativeBridge Instance | 🟡 Medium |
| 26 | `ExecutionPhase.getAvailablePort` | Unbounded Recursion | 🟡 Medium |
| 27 | `ci.yml` + `.env` | Security & CI Gap | 🟡 Medium |

---

## Detail Isu

---

### 🔴 01 — Prompt Files ~2MB Per File → OOM pada 7B Model

**File:** `agent/prompts/internal/guru.md`, `orchestrator.md`, `pipeline-architect.md`  
**Ukuran:** Masing-masing ~2MB  

**Masalah:**  
`LocalIntelligence.generate()` menggunakan `num_ctx: 4096` token dan model `qwen2.5-coder:7b-instruct-q4_K_M`. Prompt 2MB setara ±500k token — jauh melampaui context window. Ollama akan truncate atau crash dengan OOM. Pada mesin 8GB RAM yang dishare dengan Vega 8, ini hampir pasti fatal.

**Dampak:** Engine crash sebelum menghasilkan output apapun.

**Solusi:**
```
agent/prompts/internal/orchestrator/
  ├── core.md          (~30KB - instruksi inti + persona)
  ├── planning.md      (~20KB - hanya diload saat fase planning)
  ├── execution.md     (~20KB - hanya diload saat fase execution)
  └── recovery.md      (~10KB - error handling)
```

Di `LocalIntelligence.generate()`, pilih sub-prompt berdasarkan `taskType`, bukan satu file monolitik.

---

### 🔴 02 — `Orchestrator.executeTask`: Promise Tanpa Timeout → Hanging Forever

**File:** `agent/core/Orchestrator.js`  

**Masalah:**
```js
return new Promise((resolve, reject) => {
    EventBus.subscribe('SCANNER_FINISHED', onFinished);
    EventBus.subscribe('TASK_FAILED', onFailed);
    EventBus.publish('SCANNER_TRIGGERED', { ... });
    // ⚠️ Jika event tidak pernah fire → Promise nangkring selamanya
    // Tidak ada setTimeout, tidak ada cleanup
});
```

Jika Ollama crash atau plugin exit tanpa mengirim pesan, Promise tidak pernah resolve/reject. Ini menyebabkan `AuditPhase.run()` hang selamanya dan seluruh cycle tidak pernah selesai.

**Dampak:** Engine deadlock permanen.

**Solusi:**
```js
const timeout = setTimeout(() => {
    EventBus.unsubscribe('SCANNER_FINISHED', onFinished);
    EventBus.unsubscribe('TASK_FAILED', onFailed);
    reject(new Error(`Task ${taskId} timed out after ${task.timeout_ms}ms`));
}, task.timeout_ms || 30000);

// Tambahkan clearTimeout(timeout) di onFinished dan onFailed
```

---

### 🔴 03 — `NativeBridge.callCpp`: Hardcode `.exe` → Gagal di Docker/Linux

**File:** `agent/core/NativeBridge.js`

**Masalah:**
```js
const fullPath = path.join(this.binPath,
    binaryName.endsWith('.exe') ? binaryName : `${binaryName}.exe`
);
```

`docker-compose.yml` ada di repo, artinya proyek ini dirancang untuk jalan di Linux container. Tapi `NativeBridge` selalu mencari `.exe` — binary Linux tidak punya extension ini. Setiap panggilan ke C++ module akan throw `binary not found`.

**Dampak:** Seluruh NativeBridge layer non-functional di Docker.

**Solusi:**
```js
const ext = process.platform === 'win32' ? '.exe' : '';
const fullPath = path.join(this.binPath, `${binaryName}${ext}`);
```

Tambahkan juga timeout untuk spawn process agar tidak hang:
```js
const timer = setTimeout(() => { proc.kill(); reject(new Error('C++ timeout')); }, 60000);
proc.on('close', () => clearTimeout(timer));
```

---

### 🔴 04 — `SandboxExecutor`: Path Traversal via Substring Check

**File:** `agent/core/SandboxExecutor.js`

**Masalah:**
```js
const isAllowed = manifest.scanners.some(s => pluginPath.includes(s.entrypoint));
```

Pengecekan ini adalah **substring match**, bukan path normalization. Path berikut akan **lolos** validasi:
```
../../malicious/cyber-security.js   ← includes "cyber-security.js" ✓ (SALAH LOLOS)
```

Selain itu, manifest dibaca dengan `readJsonSync` di dalam Promise — memblok event loop.

**Dampak:** Arbitrary code execution jika attacker bisa memanipulasi `pluginPath`.

**Solusi:**
```js
const allowedDir = path.resolve(path.join(__dirname, '..', 'tools', 'scanners'));
const resolvedPlugin = path.resolve(pluginPath);

if (!resolvedPlugin.startsWith(allowedDir)) {
    return reject(new Error(`SandboxExecutor: Plugin path not in allowed directory`));
}

// Gunakan fs.readJson async
const manifest = await fs.readJson(manifestPath);
const isAllowed = manifest.scanners.some(s =>
    resolvedPlugin === path.resolve(path.join(allowedDir, s.entrypoint))
);
```

---

### 🔴 05 — `RedisMemory.flush()` Memanggil `flushAll()` → Menghapus Seluruh Redis

**File:** `agent/core/RedisMemory.js`

**Masalah:**
```js
async flush() {
    if (!this.isConnected) return;
    await this.client.flushAll();  // ⚠️ Hapus SEMUA data di Redis
}
```

`flushAll()` menghapus **semua database** di Redis server, bukan hanya key milik NEXUS. Jika Redis dishare dengan Laravel app (sessions, cache, queue), maka saat `nexus distill` dipanggil, seluruh data Laravel ikut terhapus — termasuk user sessions yang aktif.

**Dampak:** Data loss pada aplikasi lain yang berbagi Redis server.

**Solusi:** Gunakan namespace prefix dan hapus hanya key NEXUS:
```js
const NEXUS_PREFIX = 'nexus:';

async flush() {
    if (!this.isConnected) return;
    const keys = await this.client.keys(`${NEXUS_PREFIX}*`);
    if (keys.length > 0) {
        await this.client.del(keys);
    }
}

async set(key, value, expirySeconds = 3600) {
    const namespacedKey = `${NEXUS_PREFIX}${key}`;
    // ... gunakan namespacedKey
}
```

---

### 🔴 06 — `Logger._writeQueue` Dideklarasikan Tapi Tidak Digunakan → Race Condition

**File:** `agent/core/Logger.js`

**Masalah:**
```js
constructor(rootPath) {
    // ...
    this._writeQueue = Promise.resolve(); // ← dideklarasikan
}

async log(...) {
    // ...
    await fs.appendFile(logFile, JSON.stringify(logEntry) + '\n'); // ← tidak melalui _writeQueue
}
```

`this._writeQueue` ada tapi tidak pernah digunakan. Dengan 6 specialist agent berjalan paralel, semuanya bisa `appendFile` ke file `.ndjson` yang sama secara bersamaan. Di Node.js, concurrent `appendFile` ke file yang sama **tidak atomic** — baris JSON bisa terinterleave menghasilkan log yang corrupt.

**Dampak:** Log file corrupt, audit trail tidak dapat diandalkan.

**Solusi:**
```js
async log(...args) {
    this._writeQueue = this._writeQueue.then(() => this._doLog(...args));
    return this._writeQueue;
}

async _doLog(category, level, agent, task_id, event, message, ...) {
    // ... logika appendFile yang sudah ada
}
```

---

### 🟠 07 — `NexusEngine` adalah God Object: 20+ Dependency di Constructor

**File:** `agent/core/NexusEngine.js`

**Masalah:**
Constructor langsung menginstansiasi: `Modifier`, `MemoryPipeline`, `TDDGuard`, `TDDScaffolder`, `AssetEngine`, `Validator`, `BugHunter`, `Designer`, `AccessibilityScanner`, `SchemaGuard`, `QueryOptimizer`, `WorktreeManager`, `RootCauseAnalyzer`, `Machinist`, `Distiller`, `EvolutionPiper`, `DecisionEngine`, `ParallelRunner`, `NativeBridge`, `Orchestrator`, `ResourceMonitor`. Semua diinstansiasi tanpa kondisi, bahkan yang jarang dipakai.

**Dampak:** Memory overhead tinggi sejak startup; unit testing hampir mustahil tanpa mocking seluruh tree.

**Solusi:** Lazy initialization untuk komponen jarang dipakai:
```js
// Ganti: this.designer = new Designer();
get designer() {
    if (!this._designer) this._designer = new Designer();
    return this._designer;
}

// Komponen yang perlu lazy: NativeBridge, Designer, AccessibilityScanner,
// QueryOptimizer, WorktreeManager, EvolutionPiper
```

---

### 🟠 08 — `LocalIntelligence` Singleton dengan `isAvailable` Mutable → Race Condition

**File:** `agent/core/LocalIntelligence.js`

**Masalah:**
```js
module.exports = new LocalIntelligence(); // ← singleton
// this.isAvailable = false (mutable state)
```

Dengan `ParallelRunner` limit=3, tiga concurrent task bisa memanggil `generate()` bersamaan. Semua berbagi `this.isAvailable` yang sama — satu goroutine bisa mengubahnya di tengah pengecekan goroutine lain.

**Dampak:** Task bisa melewati pengecekan availability lalu fail di tengah jalan.

**Solusi:** Caching TTL untuk availability check:
```js
this._availabilityCache = { value: false, expiresAt: 0 };

async checkAvailability() {
    if (Date.now() < this._availabilityCache.expiresAt) {
        return this._availabilityCache.value;
    }
    try {
        // ... actual check
        this._availabilityCache = { value: true, expiresAt: Date.now() + 60000 };
        return true;
    } catch {
        this._availabilityCache = { value: false, expiresAt: Date.now() + 10000 };
        return false;
    }
}
```

---

### 🟠 09 — Ollama Tanpa Circuit Breaker → Death Spiral saat Overload

**File:** `agent/core/LocalIntelligence.js`

**Masalah:**
Tidak ada circuit breaker. Jika Ollama overload atau crash, tiap `generate()` menunggu hingga timeout, kemudian retry. Dengan 3 concurrent workers × 3 retry = 9 request menumpuk. CPU + RAM meledak.

**Dampak:** Cascade failure seluruh engine saat model overload.

**Solusi — State machine sederhana:**
```js
this.cb = { state: 'CLOSED', failures: 0, openedAt: null };

async generate(prompt, taskType) {
    if (this.cb.state === 'OPEN') {
        if (Date.now() - this.cb.openedAt < 30000) return null; // fail fast
        this.cb.state = 'HALF-OPEN';
    }
    try {
        const result = await this._doGenerate(prompt, taskType);
        this.cb = { state: 'CLOSED', failures: 0, openedAt: null };
        return result;
    } catch (e) {
        this.cb.failures++;
        this.cb.openedAt = Date.now();
        if (this.cb.failures >= 3) this.cb.state = 'OPEN';
        return null;
    }
}
```

---

### 🟠 10 — `EventBus`: Subscription Listener Tidak Pernah Dibersihkan → Memory Leak

**File:** `agent/core/EventBus.js`, `agent/core/Orchestrator.js`

**Masalah:**
`setupEventHandlers()` di Orchestrator mendaftarkan listener permanent untuk `SCANNER_TRIGGERED`, `TASK_FAILED`, dan `CYCLE_FINISHED`. Listener ini tidak pernah dihapus. Di lingkungan long-running (100 project cycle), listener menumpuk di EventEmitter.

`setMaxListeners(50)` hanya menekan warning, bukan solusi kebocoran.

**Dampak:** Memory leak progresif; performa menurun setelah banyak cycle.

**Solusi:** Tracking listener dan cleanup method:
```js
this._handlers = [];

_subscribe(event, fn) {
    EventBus.subscribe(event, fn);
    this._handlers.push({ event, fn });
}

destroy() {
    this._handlers.forEach(({ event, fn }) => EventBus.unsubscribe(event, fn));
    this._handlers = [];
}
```

---

### 🟠 11 — `AgentRegistry` Tidak Terhubung ke `Orchestrator` → Selalu Kosong

**File:** `agent/core/AgentRegistry.js`, `agent/core/Orchestrator.js`

**Masalah:**
`AgentRegistry` menyediakan `markBusy()`, `markIdle()`, `markFailed()`, dan `getStuckAgents()`. Tapi di `Orchestrator.setupEventHandlers()`, tidak ada satu pun panggilan ke registry:
```js
// Orchestrator.js — TIDAK ada:
// agentRegistry.markBusy(agentId, taskId);
// agentRegistry.markIdle(agentId);
```

`NexusEngine.getSystemStatus()` memanggil `agentRegistry.getHealthReport()` tapi selalu menghasilkan `{ total: 0, idle: 0, busy: 0 }` karena tidak ada yang pernah mendaftar.

**Dampak:** Stuck agent detection tidak berfungsi. Monitoring buta.

**Solusi:** Tambahkan di dalam `SCANNER_TRIGGERED` handler:
```js
EventBus.subscribe('SCANNER_TRIGGERED', async (payload) => {
    agentRegistry.markBusy(payload.agent, taskId);
    // ... existing logic
});

// Setelah task selesai:
agentRegistry.markIdle(payload.agent);
// Jika fail:
agentRegistry.markFailed(payload.agent, err.message);
```

---

### 🟠 12 — `EvolutionPiper.currentCycle` In-Memory → Reset saat Crash

**File:** `agent/core/EvolutionPiper.js`

**Masalah:**
```js
this.currentCycle = 0; // hanya ada di memory
```

Jika engine crash di cycle ke-23, saat restart `currentCycle` kembali ke 0. Guardrail `MAX_EVOLUTION_CYCLES = 25` menjadi tidak efektif — sistem bisa menjalankan jauh lebih dari 25 cycle sebenarnya.

**Dampak:** Guardrail bypass; resource exhaustion tanpa batas.

**Solusi:** Persist counter ke disk:
```js
async loadCycleState() {
    const statePath = path.join(this.rootPath, 'nexus', '.evolution_state.json');
    if (await fs.pathExists(statePath)) {
        const state = await fs.readJson(statePath);
        this.currentCycle = state.currentCycle || 0;
        this.sessionStartTime = state.sessionStartTime || null;
    }
}

async persistCycleState() {
    const statePath = path.join(this.rootPath, 'nexus', '.evolution_state.json');
    await fs.writeJson(statePath, {
        currentCycle: this.currentCycle,
        sessionStartTime: this.sessionStartTime
    });
}
```

---

### 🟠 13 — `WorktreeManager.finalize()` Menggunakan `execSync` → Memblok Event Loop

**File:** `agent/core/WorktreeManager.js`

**Masalah:**
```js
execSync(`git checkout main && git merge feature/${featureName}`, { cwd: this.rootPath });
```

`execSync` memblok seluruh Node.js event loop. Jika git mengalami merge conflict, network issue, atau repository besar, seluruh engine freeze selama operasi berlangsung — tidak ada timeout, tidak ada escape.

**Dampak:** Engine freeze total selama git operations.

**Solusi:** Gunakan `spawn` dengan Promise wrapper (sudah ada pola ini di `NativeBridge`):
```js
const { spawn } = require('child_process');

async _execGit(args, cwd, timeoutMs = 30000) {
    return new Promise((resolve, reject) => {
        const proc = spawn('git', args, { cwd, shell: false });
        let out = '', err = '';
        const timer = setTimeout(() => { proc.kill(); reject(new Error('Git timeout')); }, timeoutMs);
        proc.stdout.on('data', d => out += d);
        proc.stderr.on('data', d => err += d);
        proc.on('close', code => {
            clearTimeout(timer);
            code === 0 ? resolve(out.trim()) : reject(new Error(err));
        });
    });
}
```

---

### 🟠 14 — `AuditPhase`: 6 Scanner Berjalan Bersamaan Tanpa Concurrency Limit

**File:** `agent/core/phases/AuditPhase.js`

**Masalah:**
```js
const auditPromises = specialists.map(async (spec) => {
    // Spawn Worker + Ollama call per specialist
});
await Promise.all(auditPromises); // 6 concurrent Workers + Ollama
```

Enam Workers berjalan sekaligus, masing-masing berpotensi memanggil Ollama. Pada 8GB RAM dengan Vega 8 shared, ini cukup untuk menyebabkan OOM killer melakukan terminasi proses.

**Dampak:** OOM kill di mesin dengan RAM terbatas.

**Solusi:** Gunakan `ParallelRunner` yang sudah ada:
```js
const results = await ParallelRunner.run(
    specialists,
    async (spec) => { /* ... logika audit */ },
    2  // max 2 concurrent scanner untuk 8GB RAM
);
```

---

### 🟠 15 — `SemanticEngine.cosineSimilarity`: Tidak Ada Zero-Norm Guard → NaN Corruption

**File:** `agent/core/SemanticEngine.js`

**Masalah:**
```js
cosineSimilarity(vecA, vecB) {
    // ...
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    // ⚠️ Jika normA atau normB = 0 → NaN
}
```

Jika embedding menghasilkan zero vector (model gagal, dokumen kosong), pembagian dengan 0 menghasilkan `NaN`. `NaN` kemudian menginfeksi seluruh hasil sort dan ranking.

**Dampak:** Semantic search mengembalikan urutan acak / undefined behavior.

**Solusi:**
```js
cosineSimilarity(vecA, vecB) {
    let dotProduct = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    const denom = Math.sqrt(normA) * Math.sqrt(normB);
    if (denom === 0) return 0; // Zero vector = no similarity
    return dotProduct / denom;
}
```

---

### 🟠 16 — `RedisMemory`: `connect()` Tidak Dipanggil Sebelum `get()`/`set()`

**File:** `agent/core/RedisMemory.js`, `agent/core/SemanticEngine.js`

**Masalah:**
```js
// SemanticEngine.js
const cachedResults = await redis.get(cacheKey); // redis.isConnected = false
// → returns null, cache tidak pernah bekerja
```

`RedisMemory` hanya connect jika `connect()` dipanggil secara eksplisit. Tapi `SemanticEngine` dan komponen lain langsung memanggil `redis.get()` / `redis.set()` tanpa `await redis.connect()` terlebih dahulu. Hasilnya: Redis cache **tidak pernah berfungsi** meskipun kode seolah menggunakannya.

**Dampak:** Cache miss 100% → setiap search rebuild TF-IDF dari scratch.

**Solusi:** Auto-connect dengan lazy pattern:
```js
async _ensureConnected() {
    if (!this.isConnected) await this.connect();
}

async get(key) {
    await this._ensureConnected();
    if (!this.isConnected) return null;
    // ...
}
```

---

### 🟡 17 — `NexusEngine.runCycle()`: Tidak Ada Global Timeout

**File:** `agent/core/NexusEngine.js`

**Masalah:**
`runCycle()` tidak memiliki batas waktu global. Jika fase audit, planning, atau execution hang (misalnya karena Ollama lambat), seluruh cycle berjalan tanpa henti.

**Solusi:**
```js
async runCycle(options = {}) {
    const CYCLE_TIMEOUT_MS = 10 * 60 * 1000; // 10 menit
    const cyclePromise = this._doRunCycle(options);
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new NexusError('TIMEOUT', 'Cycle exceeded 10 minutes')), CYCLE_TIMEOUT_MS)
    );
    return Promise.race([cyclePromise, timeoutPromise]);
}
```

---

### 🟡 18 — `EventBus`: Deduplication 1 Detik Terlalu Agresif

**File:** `agent/core/EventBus.js`

**Masalah:**
```js
const eventKey = `${event}-${JSON.stringify(payload)}`;
if (this._recentEvents.has(eventKey)) return; // Drop!
```

Dua task berbeda yang menghasilkan payload identik dalam 1 detik akan di-drop satu di antaranya secara diam-diam. Kasus nyata: dua scanner mengirim `SCANNER_TRIGGERED` untuk file yang sama dalam waktu berdekatan.

**Solusi:** Dedup berdasarkan `task_id`, bukan seluruh payload:
```js
const eventKey = `${event}-${payload?.task_id || JSON.stringify(payload)}`;
```

---

### 🟡 19 — `MemoryPipeline.writeSemanticIndex()` Duplikat dengan `SemanticEngine`

**File:** `agent/core/MemoryPipeline.js`, `agent/core/SemanticEngine.js`

**Masalah:**
Dua sistem index berjalan paralel dan tidak terhubung:
- `MemoryPipeline.writeSemanticIndex()` → regex tag extraction → `semantic_tag_index.json`
- `SemanticEngine.buildIndex()` → TF-IDF + Ollama embeddings → `vector_index.json`

Keduanya menulis ke direktori `semantic/` yang sama dengan format berbeda. SemanticEngine yang digunakan aktif untuk search, sementara MemoryPipeline menghasilkan file yang tidak pernah dibaca.

**Solusi:** Hapus `writeSemanticIndex()` dari `MemoryPipeline`. Delegasikan sepenuhnya ke `SemanticEngine.buildIndex()`. Panggil dari `KnowledgePhase` setelah `memoryPipeline.optimize()` selesai.

---

### 🟡 20 — `MemoryGovernor` vs `MemoryPipeline`: Ownership Tumpang Tindih

**File:** `agent/core/MemoryGovernor.js`, `agent/core/MemoryPipeline.js`

**Masalah:**
Keduanya mengelola direktori `memory/` yang sama:
- `MemoryGovernor`: tulis ke `memory/[category]/`, acquire file lock, versioning
- `MemoryPipeline`: tulis ke `memory/distilled/`, `memory/archived/`, versioned write sendiri

Tidak ada batas kepemilikan yang jelas. `NexusEngine` menginstansiasi `MemoryPipeline` tapi `MemoryGovernor` diimport tapi tidak di-`new` secara eksplisit di constructor `NexusEngine` — kemungkinan besar unused instance.

**Solusi:** Tetapkan boundary yang jelas:
- `MemoryGovernor` → semua write ke `memory/` (owner tunggal, semua lewat sini)
- `MemoryPipeline` → orchestration logic (kapan archive, kapan distill), delegasikan write ke `MemoryGovernor`

---

### 🟡 21 — `Contract.js` Menggunakan `new Date()` Bukan `NexusClock`

**File:** `agent/core/Contract.js`

**Masalah:**
```js
class AuditReport {
    constructor(...) {
        this.timestamp = new Date().toISOString(); // ← UTC (Z suffix)
    }
}
```

`NexusClock` sudah dibuat untuk memastikan konsistensi timestamp UTC+8 di seluruh sistem, tapi `AuditReport` dan `ImplementationPlan` masih menggunakan `new Date().toISOString()` yang menghasilkan format `2026-05-16T07:00:00.000Z`. Hasilnya: timestamp di audit report bertentangan dengan timestamp di log file.

**Solusi:**
```js
const NexusClock = require('./NexusClock');

class AuditReport {
    constructor(...) {
        this.timestamp = NexusClock.getISOTimestamp();
    }
}
```

---

### 🟡 22 — `ExecutionPhase.cleanCodeAndVerify()`: Pola Legacy Hardcoded

**File:** `agent/core/phases/ExecutionPhase.js`

**Masalah:**
```js
const legacyPatterns = ['UrlShortener', 'UrlMapping', 'ShortenUrl', 'UrlController'];
```

Pola ini adalah sisa dari sandbox `url-shortener` yang dijadikan template. Ketika NEXUS dijalankan pada project lain (misal SaaS, e-commerce), fungsi ini akan:
1. Tidak menemukan apa-apa → silent no-op
2. Atau, jika project kebetulan punya class bernama serupa → menghapus file yang valid

**Solusi:** Bangun `legacyPatterns` secara dinamis dari `NEXUS_BLUEPRINT.json`:
```js
const blueprint = await fs.readJson(blueprintPath).catch(() => ({}));
const allowedComponents = (blueprint.livewire_components || []).map(c => this.toKebabCase(c));
const legacyPatterns = blueprint.legacy_patterns || [];
```

---

### 🟡 23 — `main.js` Membuat Dua Instance `Orchestrator` yang Berbeda

**File:** `agent/main.js`

**Masalah:**
```js
// main.js
const engine = new NexusEngine({ rootPath: ... });        // → this.orchestrator = new Orchestrator(...)
const orchestrator = new Orchestrator(path.resolve(...)); // ← Instance kedua, tidak pernah dipakai
```

`NexusEngine` sudah membuat instance `Orchestrator` internal. Instance kedua di `main.js` memiliki DLQ terpisah, EventBus listeners terpisah, dan tidak pernah digunakan. Ini membuang memori dan bisa menyebabkan dua listener `SCANNER_TRIGGERED` aktif sekaligus.

**Solusi:** Hapus baris `const orchestrator = new Orchestrator(...)` dari `main.js`. Gunakan `engine.orchestrator` jika perlu akses dari luar.

---

### 🟡 24 — `EvolutionPiper.spawnRealLaravel()`: Dead Code

**File:** `agent/core/EvolutionPiper.js`

**Masalah:**
```js
async spawnRealLaravel(name) {
    await this.checkEvolutionBoundary();
    const targetPath = path.join(this.sandboxPath, name);
    await fs.ensureDir(targetPath);
    console.log(`🚀 Installing real Laravel...`);
    
    // This will be executed via run_command in the main flow
    return targetPath; // ← Tidak ada Composer, tidak ada installasi
}
```

Fungsi ini hanya membuat direktori kosong. Tidak ada `composer create-project` atau instalasi apapun. Komentar "will be executed via run_command" menunjukkan ini belum diimplementasikan.

**Dampak:** Siapapun yang memanggil `spawnRealLaravel()` mendapat direktori kosong tanpa Laravel.

**Solusi:** Implementasikan atau tandai sebagai `@throws`:
```js
async spawnRealLaravel(name) {
    throw new Error('spawnRealLaravel: Not yet implemented. Use spawnSandbox() with scenario "crud" instead.');
}
```

---

### 🟡 25 — `Distiller` Menginstansiasi `NativeBridge` yang Tidak Pernah Dipakai

**File:** `agent/core/Distiller.js`

**Masalah:**
```js
class Distiller {
    constructor(knowledgePath) {
        this.semanticEngine = new SemanticEngine(knowledgePath);
        this.native = new NativeBridge(path.join(knowledgePath, '..', '..')); // ← tidak pernah dipanggil
    }
}
```

`this.native` dideklarasikan tapi tidak ada satu pun method `Distiller` yang memanggilnya. Ini membuang memori dan membingungkan — apakah ada rencana integrasi C++ di Distiller yang belum diimplementasikan?

**Solusi:** Hapus baris `this.native = new NativeBridge(...)` sampai ada kebutuhan konkret, atau dokumentasikan tujuannya.

---

### 🟡 26 — `ExecutionPhase.getAvailablePort()`: Rekursi Tanpa Batas Atas

**File:** `agent/core/phases/ExecutionPhase.js`

**Masalah:**
```js
async getAvailablePort(start = 8001) {
    const net = require('net');
    return new Promise((resolve) => {
        const server = net.createServer();
        server.listen(start, () => {
            server.close(() => resolve(start));
        });
        server.on('error', () => {
            resolve(this.getAvailablePort(start + 1)); // ← rekursi tanpa batas
        });
    });
}
```

Jika semua port dari 8001 hingga 65535 terisi (sangat tidak mungkin tapi mungkin di lingkungan container yang terbatas), fungsi ini akan stack overflow. Juga tidak ada cara untuk menghentikan pencarian.

**Solusi:**
```js
async getAvailablePort(start = 8001, maxPort = 9000) {
    if (start > maxPort) throw new Error(`No available port found between 8001-${maxPort}`);
    // ... existing logic dengan maxPort check
}
```

---

### 🟡 27 — CI Tidak Test Redis/Ollama + `.env` dengan APP_KEY di Repo

**File:** `.github/workflows/ci.yml`, `agent/core/EvolutionPiper.js`, `.env`

**Masalah A — CI:**
```yaml
# ci.yml — tidak ada:
# services: redis: ...
# Ollama mock/stub
```

`npm test` dijalankan tanpa Redis atau Ollama. Karena `RedisMemory` dan `LocalIntelligence` keduanya memiliki graceful fallback (`return null`, `return false`), CI selalu hijau meskipun integrasi tersebut broken.

**Masalah B — APP_KEY hardcoded:**
```js
// EvolutionPiper.spawnSandbox() — hardcoded di source code:
{ name: '.env', content: 'APP_KEY=base64:DUMMYKEYDUMMYKEYDUMMYKEYDUMMYKEYDUMMYKEYDUMMY=' }
```

Laravel APP_KEY hardcoded di source code. Meskipun ini untuk sandbox test, key ini bisa disalahgunakan jika seseorang reuse untuk production.

**Solusi A:**
```yaml
# Tambahkan di ci.yml
services:
  redis:
    image: redis:7-alpine
    ports: ['6379:6379']
# Untuk Ollama: gunakan mock/stub di test environment
```

**Solusi B:**
```js
// Generate key dinamis:
const { execSync } = require('child_process');
const appKey = `base64:${require('crypto').randomBytes(32).toString('base64')}`;
{ name: '.env', content: `APP_KEY=${appKey}` }
```

---

## Rekap & Roadmap Perbaikan

### Phase 1 — Immediate (sebelum cycle berikutnya)
| No | Isu | Effort |
|----|-----|--------|
| 01 | Pecah prompt monolitik 2MB | 2-3 jam |
| 02 | Tambah timeout di `executeTask` | 30 menit |
| 03 | Fix `.exe` hardcode di `NativeBridge` | 15 menit |
| 04 | Fix path traversal di `SandboxExecutor` | 1 jam |
| 05 | Ganti `flushAll()` dengan namespace delete | 30 menit |
| 06 | Implementasi `_writeQueue` di `Logger` | 1 jam |

### Phase 2 — Sprint Berikutnya
| No | Isu | Effort |
|----|-----|--------|
| 07 | Lazy init `NexusEngine` | 3-4 jam |
| 08 | Fix `LocalIntelligence` singleton race | 1 jam |
| 09 | Circuit breaker Ollama | 2 jam |
| 10 | EventBus listener cleanup | 1 jam |
| 11 | Wire `AgentRegistry` ke Orchestrator | 2 jam |
| 12 | Persist `EvolutionPiper` cycle state | 1 jam |
| 13 | Async `WorktreeManager` | 1 jam |
| 14 | Tambah `pLimit` di `AuditPhase` | 30 menit |
| 15 | Zero-norm guard `cosineSimilarity` | 15 menit |
| 16 | Auto-connect `RedisMemory` | 30 menit |

### Phase 3 — Technical Debt
| No | Isu | Effort |
|----|-----|--------|
| 17 | Global timeout `runCycle` | 30 menit |
| 18 | Fix EventBus dedup key | 15 menit |
| 19 | Hapus duplicate semantic index | 1 jam |
| 20 | Tetapkan boundary MemoryGovernor/Pipeline | 2-3 jam |
| 21 | Konsistensi timestamp Contract.js | 15 menit |
| 22 | Dynamic legacy patterns | 1 jam |
| 23 | Hapus duplicate Orchestrator di main.js | 15 menit |
| 24 | Stub atau implementasikan spawnRealLaravel | 2-4 jam |
| 25 | Hapus unused NativeBridge di Distiller | 5 menit |
| 26 | Bounded recursion getAvailablePort | 15 menit |
| 27 | Fix CI + rotate hardcoded APP_KEY | 1 jam |

---

## Hal yang Sudah Baik ✅

Dokumentasi ini bukan sekadar daftar masalah. NEXUS AI memiliki beberapa keputusan arsitektur yang patut dipertahankan:

- **EventBus dengan schema validation** — event schema registry mencegah typo event name
- **Dead Letter Queue di Orchestrator** — task gagal tidak hilang begitu saja
- **Guardrail whitelist di LocalIntelligence** — task whitelist + output length cap
- **Versioned write di MemoryPipeline** — tidak ada data yang overwritten tanpa backup
- **Stale lock detection di MemoryGovernor** — lock file dengan TTL + PID tracking
- **ResourceMonitor tiered recommendation** — PROCEED/THROTTLE/PAUSE berdasarkan CPU+RAM
- **DecisionEngine weight profiles** — context-aware decision making yang extensible
- **Machinist path whitelist** — generated scanner tidak bisa menyentuh core engine
- **TaskProtocol dengan trace_id** — setiap task bisa di-trace end-to-end

---

*Report ini dihasilkan dari analisis statis terhadap source code NEXUS AI v3.3.0.*  
*Total file dianalisis: 27 | Total isu ditemukan: 27 | Critical: 6 | High: 10 | Medium: 11*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, vcs, saas, api]

`