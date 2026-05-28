# NEXUS — Post-Stabilization Hardening Plan
> **VERSION**: v1 | **Last Updated**: 26/05/2026


## Dari Stable → Robust → Autonomous-Ready

> **Source of Truth**: Dibuat dari 4x loop scanning terhadap kondisi aktual kode  
> **Target**: Deterministic, Observable, Resilient System  
> **Prinsip**: Stability > Intelligence. Jika tidak bisa di-debug, tidak bisa di-scale.

---

## 📊 Gap Analysis (Kondisi Aktual vs Target)

| Komponen | Ada? | Gap Kritis |
|---|---|---|
| `TaskProtocol.js` | ✅ | Tidak ada `trace_id` / `correlation_id` |
| `Logger.js` | ✅ | Log tidak terhubung antar siklus, tidak ada `trace_id` |
| `MemoryGovernor.js` | ✅ | Tidak ada locking, tidak ada rollback mechanism |
| `EventBus.js` | ✅ | Tidak ada event audit log, tidak ada duplicate detection |
| `Orchestrator.js` | ✅ | Tidak ada retry logic, tidak ada fallback, tidak ada error type |
| `SandboxExecutor.js` | ✅ | Tidak dipakai di `audit()` — scanner masih dipanggil langsung |
| `Contract.js` | ✅ | Tidak ada structured error schema |
| `NexusEngine.audit()` | ✅ | Scanner bypass EventBus — direct `require()` + `scanner.scan()` |
| `NexusEngine.execute()` | ✅ | Error hanya `continue`, tidak ada retry/fallback/error classification |
| Performance Profiling | ⚠️ | Ada di level siklus, belum ada di per-agent |
| Stress/Chaos Testing | ❌ | Tidak ada sama sekali |

---

## 🗺️ Fase Hardening (Berurutan)

---

### 🔴 PHASE H1: Observability Foundation
**Priority**: CRITICAL — Harus dikerjakan pertama  
**Target dokumen hardening**: §3.5

#### H1.1 — Tambah `trace_id` dan `correlation_id`

**File**: `agent/core/TaskProtocol.js`  
Tambahkan field:
```js
this.trace_id = `TRACE-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
this.correlation_id = options.correlation_id || this.trace_id; // link ke siklus parent
```

**File**: `agent/core/Logger.js`  
Update signature `log()` untuk menerima `trace_id`:
```js
async log(category, level, agent, task_id, event, message, duration_ms = 0, metadata = {}, trace_id = 'N/A')
```
Dan masukkan `trace_id` ke dalam `logEntry`.

#### H1.2 — Cycle-Level Correlation

**File**: `agent/core/NexusEngine.js`  
Di awal `runCycle()`, generate satu `cycleCorrelationId`:
```js
const cycleCorrelationId = `CORR-${Date.now()}`;
```
Teruskan ID ini ke setiap pemanggilan `this.logger.log()` sebagai `trace_id`.

**Definition of Done H1**:  
- [ ] Setiap log entry memiliki `trace_id`  
- [ ] Seluruh log dalam satu siklus audit→plan→execute memiliki `correlation_id` yang sama  

---

### 🔴 PHASE H2: Failure Handling (Retry + Structured Error)
**Priority**: CRITICAL  
**Target dokumen hardening**: §3.4

#### H2.1 — Structured Error Schema di `Contract.js`

Tambahkan class `NexusErrorPayload`:
```js
class NexusErrorPayload {
    constructor(type, message, retryable = false, agent = 'unknown') {
        this.status = 'error';
        this.type = type; // e.g. 'MEMORY_CONFLICT', 'SCANNER_TIMEOUT'
        this.message = message;
        this.retryable = retryable;
        this.agent = agent;
        this.timestamp = new Date().toISOString();
    }
}
```

#### H2.2 — Retry Logic di `Orchestrator.js`

Ganti blok `catch` dengan mekanisme retry:
```js
const MAX_RETRY = 3;
let attempt = 0;
while (attempt < MAX_RETRY) {
    try {
        const result = await this.sandbox.execute(...);
        // success path
        break;
    } catch (err) {
        attempt++;
        const errPayload = new NexusErrorPayload('AGENT_FAILURE', err.message, attempt < MAX_RETRY, payload.agent);
        await this.logger.log('errors', 'WARNING', 'Orchestrator', task.task_id, 'RETRY', `Retry ${attempt}/${MAX_RETRY}`);
        if (attempt >= MAX_RETRY) {
            task.status = 'failed';
            EventBus.publish('TASK_FAILED', { task_id: task.task_id, error: errPayload });
        }
    }
}
```

**Definition of Done H2**:  
- [ ] Setiap kegagalan punya `type`, `retryable`, `agent`  
- [ ] Orchestrator mencoba ulang max 3x sebelum menyerah  
- [ ] Event `TASK_FAILED` dipublish agar komponen lain bisa bereaksi  

---

### 🔴 PHASE H3: Memory Integrity (Lock + Rollback)
**Priority**: CRITICAL  
**Target dokumen hardening**: §3.3

#### H3.1 — File-Based Soft Locking di `MemoryGovernor.js`

Tambahkan metode `acquireLock()` dan `releaseLock()`:
```js
async acquireLock(filename, timeoutMs = 5000) {
    const lockFile = path.join(this.memoryPath, `${filename}.lock`);
    const start = Date.now();
    while (await fs.pathExists(lockFile)) {
        if (Date.now() - start > timeoutMs) {
            throw new Error(`MemoryGovernor: Lock timeout on ${filename}`);
        }
        await new Promise(r => setTimeout(r, 100)); // poll every 100ms
    }
    await fs.writeJson(lockFile, { locked_at: new Date().toISOString() });
}

async releaseLock(filename) {
    const lockFile = path.join(this.memoryPath, `${filename}.lock`);
    await fs.remove(lockFile);
}
```

Update `validateAndStore()` untuk menggunakan lock:
```js
await this.acquireLock(filename);
try {
    // ... existing write logic ...
} finally {
    await this.releaseLock(filename);
}
```

#### H3.2 — Rollback Mechanism

Sebelum menulis file baru, simpan versi sebelumnya ke `memory/archived/`:
```js
if (await fs.pathExists(outputPath)) {
    const backupPath = path.join(this.memoryPath, 'archived', `${filename}.v${version - 1}.bak.json`);
    await fs.copy(outputPath, backupPath);
}
```

**Definition of Done H3**:  
- [ ] Tidak ada dua agent bisa menulis file memori yang sama secara bersamaan  
- [ ] Setiap penulisan memori baru memiliki backup versi sebelumnya di `memory/archived/`  

---

### 🟡 PHASE H4: Plugin Safety via SandboxExecutor
**Priority**: HIGH  
**Target dokumen hardening**: §3.8

#### H4.1 — Gunakan SandboxExecutor di `NexusEngine.audit()`

Saat ini scanner dipanggil langsung. Ini harus diganti:

**Sebelum (bermasalah):**
```js
const scanner = require(scannerPath);
if (scanner.scan) {
    specFindings = await scanner.scan(targetPath);
}
```

**Sesudah (via Sandbox):**
```js
// Di constructor, instansiasi sandbox
this.sandbox = new SandboxExecutor();

// Di audit()
specFindings = await this.sandbox.execute(scannerPath, { targetPath }, { timeout: 15000 });
```

#### H4.2 — Permission Validation di `SandboxExecutor.js`

Tambahkan pengecekan terhadap `manifest.json`:
```js
const manifest = require('../../tools/scanners/manifest.json');
const pluginMeta = manifest.scanners.find(s => scannerPath.includes(s.entrypoint));
if (!pluginMeta) throw new Error(`Plugin ${scannerPath} not registered in manifest.`);
```

**Definition of Done H4**:  
- [ ] Semua scanner dieksekusi via `SandboxExecutor` dengan timeout  
- [ ] Plugin yang tidak terdaftar di `manifest.json` ditolak  

---

### 🟡 PHASE H5: EventBus Validation
**Priority**: HIGH  
**Target dokumen hardening**: §3.7

#### H5.1 — Event Audit Log di `EventBus.js`

Update `publish()` untuk mencatat setiap event:
```js
publish(event, payload) {
    const entry = { event, timestamp: new Date().toISOString(), payload_keys: Object.keys(payload || {}) };
    this._auditLog = this._auditLog || [];
    this._auditLog.push(entry);
    this.emit(event, payload);
}

getAuditLog() { return this._auditLog || []; }
clearAuditLog() { this._auditLog = []; }
```

#### H5.2 — Duplicate Event Detection

```js
publish(event, payload) {
    const eventKey = `${event}-${JSON.stringify(payload).slice(0, 50)}`;
    if (this._recentEvents && this._recentEvents.has(eventKey)) return; // skip duplicate
    this._recentEvents = this._recentEvents || new Set();
    this._recentEvents.add(eventKey);
    setTimeout(() => this._recentEvents.delete(eventKey), 1000); // clear after 1s
    this.emit(event, payload);
}
```

**Definition of Done H5**:  
- [ ] Setiap event tercatat di audit log  
- [ ] Event duplikat dalam window 1 detik diabaikan  

---

### 🟢 PHASE H6: Performance Profiling Per-Agent
**Priority**: MEDIUM  
**Target dokumen hardening**: §3.6

**File**: `agent/core/NexusEngine.js` — di dalam loop scanner `auditPromises.map()`

```js
const agentStart = Date.now();
specFindings = await this.sandbox.execute(...);
const agentDuration = Date.now() - agentStart;
this.metrics[spec.id] = { duration_ms: agentDuration, findings: specFindings.length };
await this.logger.log('agents', 'INFO', spec.id, auditID, 'AGENT_PROFILED', `Completed in ${agentDuration}ms`, agentDuration);
```

**Definition of Done H6**:  
- [ ] Setiap agent memiliki `duration_ms` di `this.metrics`  
- [ ] Metrics ditulis ke log dan ke `cycle_summary`  

---

### 🟢 PHASE H7: Stress Testing
**Priority**: MEDIUM (setelah H1-H5 selesai)  
**Target dokumen hardening**: §3.9

Buat file `agent/tests/stress-test.js`:
- Kirim 10 task simultan ke `Orchestrator.routeTask()`
- Validasi bahwa tidak ada race condition di memory
- Validasi bahwa semua task dicatat di log
- Validasi bahwa sistem tidak crash saat satu agent timeout

---

## 🏁 Definition of "TRULY ROBUST" (Checklist Akhir)

Sistem dinyatakan **Robust** jika seluruh item ini ✅:

- [ ] **H1**: Setiap log punya `trace_id`. Satu siklus punya satu `correlation_id`.
- [ ] **H2**: Setiap error punya `type` + `retryable`. Orchestrator retry 3x.
- [ ] **H3**: Memory write terlindungi lock. Rollback tersedia di `memory/archived/`.
- [ ] **H4**: Semua scanner dieksekusi via `SandboxExecutor`. Plugin tidak terdaftar ditolak.
- [ ] **H5**: Semua event di EventBus tercatat. Duplikat diabaikan.
- [ ] **H6**: Setiap agent punya profil `duration_ms` di tiap siklus.
- [ ] **H7**: Stress test 10 task paralel berjalan tanpa crash.

---

## 🗺️ Urutan Eksekusi Rekomendasikan

```
H1 (trace_id) → H2 (retry) → H3 (locking) → H4 (sandbox) → H5 (eventbus) → H6 (profiling) → H7 (stress test)
```

> **Alasan urutan**: Tanpa `trace_id` (H1), kita buta saat debug H2-H7.  
> Tanpa retry (H2), crash di H3-H7 tidak bisa pulih.  
> Tanpa locking (H3), stress test (H7) akan menghasilkan false positives.

---

*Generated by: NEXUS Loop Scanning (4 Iterations) | 2026-05-07*  
*Status: FINAL OUTPUT — Siap untuk Eksekusi*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, vcs]
