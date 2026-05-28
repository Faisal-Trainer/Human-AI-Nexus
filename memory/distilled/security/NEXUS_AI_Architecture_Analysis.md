# NEXUS AI — Analisis Arsitektur & Audit Pipeline Sandbox
> **VERSION**: v2 | **Last Updated**: 28/05/2026


**Versi Dokumen:** 1.0  
**Tanggal:** 18 Mei 2026  
**Scope:** Full architecture review + extreme sandbox pipeline inspection  
**Fokus Utama:** Apakah output akhir adalah web app yang bisa digunakan, dan apakah knowledge tersimpan ke memory inti NEXUS.

---

## Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Peta Arsitektur Keseluruhan](#2-peta-arsitektur-keseluruhan)
3. [Temuan: Kekuatan Arsitektur](#3-temuan-kekuatan-arsitektur)
4. [Temuan: Risiko & Bug Kritis](#4-temuan-risiko--bug-kritis)
5. [Audit Ekstrem: Sandbox Pipeline End-to-End](#5-audit-ekstrem-sandbox-pipeline-end-to-end)
6. [Gap Analysis: "Web App yang Bisa Digunakan"](#6-gap-analysis-web-app-yang-bisa-digunakan)
7. [Gap Analysis: "Memory Inti Nexus"](#7-gap-analysis-memory-inti-nexus)
8. [Rekomendasi Perbaikan Prioritas](#8-rekomendasi-perbaikan-prioritas)
9. [Peta Jalan (Roadmap)](#9-peta-jalan-roadmap)

---

## 1. Ringkasan Eksekutif

NEXUS AI adalah framework orkestrasi multi-agent berbasis Node.js yang dirancang untuk membangun, mengaudit, dan mengevolusi project TALL Stack (Laravel + Livewire + Alpine.js + Tailwind CSS) secara otonom. Arsitekturnya terstruktur dengan baik, namun terdapat **6 gap kritis** yang menyebabkan dua tujuan utama — menghasilkan web app yang dapat digunakan dan menyimpan knowledge ke memory inti — **belum terpenuhi secara penuh**.

**Status Pipeline Saat Ini:**
- `spawnRealLaravel()` → **SENGAJA di-throw Error** (belum diimplementasikan)
- `WorktreeManager.isActive` → **hardcoded `false`** (Git isolation tidak aktif)
- `docker-compose.yml` → **tidak mendefinisikan Redis service** (memory backbone hilang)
- `KnowledgePhase.harvest()` → **berjalan, tapi sumber data seringkali kosong** karena sandbox tidak menghasilkan dokumentasi

---

## 2. Peta Arsitektur Keseluruhan

```
┌─────────────────────────────────────────────────────────────────┐
│  ENTRY LAYER                                                     │
│  cli.js ──► agent/main.js                                        │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  CORE ORCHESTRATOR: NexusEngine                                  │
│  State Machine: INIT → PROCESSING → EXECUTING → LOGGING → END   │
└──────────┬──────────────┬──────────────┬────────────────────────┘
           │              │              │
    ┌──────▼──────┐ ┌─────▼──────┐ ┌───▼──────────────────────┐
    │ Orchestrator│ │EvolutionP. │ │MemoryPipeline + Distiller│
    │ DLQ + Retry │ │Spawn/Harv. │ │Redis + KnowledgeHUB      │
    └──────┬──────┘ └─────┬──────┘ └──────────────────────────┘
           │              │
    ┌──────▼──────────────▼───────────────────────────────────┐
    │  PHASES PIPELINE (Sequential)                            │
    │  1. AuditPhase   → 6 specialist scanner, parallel-2     │
    │  2. PlanningPhase → findings → tasks → plan JSON        │
    │  2.5 ImplementationPhase → LLM generates PHP code       │
    │  3. ExecutionPhase → Modifier applies FILE_REPLACE etc  │
    │  4. VerificationPhase → Validator checks each task      │
    │  5. KnowledgePhase → Harvest → MemoryPipeline → HUB    │
    └─────────────────────────────────────────────────────────┘
           │
    ┌──────▼───────────────────────────────────────────────────┐
    │  INTELLIGENCE LAYER                                       │
    │  LocalIntelligence (Ollama: qwen3:8b)                    │
    │  Circuit Breaker + Task Whitelist + Prompt Size Guard    │
    └──────────────────────────────────────────────────────────┘
           │
    ┌──────▼───────────────────────────────────────────────────┐
    │  EXTERNAL SERVICES                                        │
    │  Ollama (LLM lokal) │ Redis (vector) │ Docker │ TALL Stack│
    └──────────────────────────────────────────────────────────┘
```

---

## 3. Temuan: Kekuatan Arsitektur

### 3.1 State Machine yang Eksplisit
`NexusEngine` mendefinisikan 6 lifecycle states secara eksplisit (`INIT`, `PROCESSING`, `EXECUTING`, `LOGGING`, `COMPLETED`, `FAILED`). Ini memudahkan debugging dan mencegah partial-state corruption.

### 3.2 Dead Letter Queue (DLQ) dengan Persistensi Disk
`Orchestrator` menyimpan task gagal ke `logs/dead_letter_queue.json` dengan retry otomatis ×3. Ini adalah pola production-grade yang jarang ditemukan di framework eksperimental sejenis.

### 3.3 Circuit Breaker pada LocalIntelligence
`LocalIntelligence` mengimplementasikan circuit breaker (CLOSED → OPEN → HALF_OPEN) untuk mencegah cascade failure saat Ollama overload. Dikombinasikan dengan TTL availability cache (60s sukses / 10s gagal), ini mencegah blocking calls yang sia-sia.

### 3.4 Guardrail EvolutionPiper
Hard cap `MAX_EVOLUTION_CYCLES = 25` dan `MAX_SESSION_MINUTES = 120` dengan persistensi ke `.evolution_state.json` adalah safety mechanism yang kritis untuk sistem otonom. Mencegah infinite loop yang bisa menghabiskan resource.

### 3.5 Path Traversal Protection di SandboxExecutor
`SandboxExecutor` menggunakan `path.resolve() + startsWith(allowedDir)` untuk mencegah path traversal, dan memvalidasi plugin terhadap `manifest.json`. Ini menutup vektor serangan yang umum.

### 3.6 Versioned Write di MemoryPipeline
Sebelum overwrite file knowledge, `MemoryPipeline.versionedWrite()` membuat backup bernama `basename_backup_{timestamp}.ext`. Tidak ada data knowledge yang hilang tanpa backup.

### 3.7 Task Whitelist di LocalIntelligence
Hanya 10 task type yang diizinkan memanggil LLM. Ini mencegah prompt injection atau penyalahgunaan API Ollama dari task yang tidak terdefinisi.

### 3.8 Parallel Audit dengan Concurrency Limit
`AuditPhase` menggunakan `ParallelRunner` dengan batas 2 concurrent specialist untuk mencegah OOM pada hardware terbatas (Ryzen 2500U, 8GB RAM). Ini adalah design decision yang sadar dan tepat.

### 3.9 Dynamic APP_KEY Generation
`EvolutionPiper.spawnSandbox()` menggunakan `crypto.randomBytes(32).toString('base64')` untuk APP_KEY, bukan hardcoded value. Ini menghindari security vulnerability umum pada project Laravel template.

---

## 4. Temuan: Risiko & Bug Kritis

### 🔴 KRITIS-1: `spawnRealLaravel()` Sengaja Di-throw
**File:** `agent/core/EvolutionPiper.js`  
**Kode:**
```javascript
async spawnRealLaravel(name) {
    throw new Error(
        'spawnRealLaravel: Not yet implemented. ' +
        'Use spawnSandbox(name, "crud") sebagai gantinya...'
    );
}
```
**Dampak:** Tidak ada project Laravel nyata yang pernah di-scaffold. Sandbox 'crud' hanya membuat 4 file stub (Controller, routes, migration, .env). Tidak ada `composer install`, tidak ada `npm install`, tidak ada server yang berjalan. **Output akhir bukan web app yang bisa digunakan.**

**Fix:** Implementasikan `composer create-project laravel/laravel` via `spawn()` dengan penanganan error dan timeout.

---

### 🔴 KRITIS-2: `WorktreeManager.isActive = false` (Hardcoded)
**File:** `agent/core/WorktreeManager.js`  
**Kode:**
```javascript
// ⛔ GUARD: Set ke true hanya setelah git commands diuji
this.isActive = false;
```
**Dampak:** Seluruh Git isolation layer tidak aktif. Perubahan dari sandbox berbeda bisa saling overwrite. Tidak ada branching, tidak ada merge strategy. Saat 100 project dijalankan paralel, race condition pada filesystem tidak terlindungi.

---

### 🔴 KRITIS-3: Redis Tidak Ada di `docker-compose.yml`
**File:** `docker-compose.yml`  
**Kondisi:** Hanya `nexus-ai` service yang didefinisikan. Tidak ada Redis service.
```yaml
services:
  nexus-ai:
    build: .
    # ... tidak ada redis service
```
**Dampak:** `RedisMemory` akan selalu gagal terkoneksi saat dijalankan via Docker. Seluruh vector memory backbone tidak tersedia. `MemoryPipeline` akan jatuh ke mode degraded tanpa fallback eksplisit.

---

### 🔴 KRITIS-4: `ImplementationPhase` Tidak Memanggil `artisan` atau `composer`
**File:** `agent/core/phases/ImplementationPhase.js`  
**Kondisi:** Phase ini hanya menulis file PHP (Model, Migration, Livewire Component) ke filesystem. Tidak ada:
- `composer install` untuk install dependencies
- `php artisan migrate` untuk membuat tabel database
- `php artisan key:generate` untuk APP_KEY
- `npm install && npm run build` untuk Vite/Tailwind compilation

**Dampak:** File PHP yang dihasilkan ada di folder yang benar, tapi aplikasi tidak bisa dijalankan karena tidak ada vendor directory, tidak ada database tables, dan tidak ada compiled assets.

---

### 🟡 SEDANG-5: Prompt 2MB Berpotensi Silent Truncation
**File:** `agent/prompts/internal/guru.md` (2.08MB), `orchestrator.md` (2.08MB), `pipeline-architect.md` (2.08MB)  
**Kondisi:** `LocalIntelligence` punya `MAX_PROMPT_CHARS = 30000` (~7500 tokens), tapi file prompt ini jauh lebih besar.
```javascript
const MAX_PROMPT_CHARS = 30000;
// ...
if (prompt.length > MAX_PROMPT_CHARS) {
    // truncated — tapi apakah ada handling?
}
```
**Dampak:** Konteks yang paling penting (bagian akhir prompt, instruksi spesifik) mungkin terpotong secara diam-diam. LLM menghasilkan output yang tidak sesuai ekspektasi tanpa error yang jelas.

---

### 🟡 SEDANG-6: `KnowledgePhase.harvest()` Sumber Data Seringkali Kosong
**File:** `agent/core/phases/KnowledgePhase.js`  
**Kondisi:** Harvest mencari folder `memory/operational`, `docs/summary`, `nexus/knowledge`, dll. di dalam sandbox. Tapi sandbox 'crud' yang di-spawn `EvolutionPiper` hanya berisi 4 file stub. Tidak ada folder `memory/` yang pernah dibuat di dalam sandbox.

**Dampak:** `filesHarvested = 0` hampir selalu terjadi. Tidak ada knowledge yang masuk ke HUB. Memory inti NEXUS tidak berkembang dari pengalaman sandbox.

---

### 🟡 SEDANG-7: `docker-compose.yml` Tidak Mount `nexus/native/`
**File:** `docker-compose.yml`  
**Kondisi:**
```yaml
volumes:
  - ./memory:/app/memory
  - ./documentation:/app/documentation
  - ./agent/prompts:/app/agent/prompts
  # nexus/native/ TIDAK di-mount
```
**Dampak:** Binary C++ (`sandbox_orchestrator`) tidak tersedia di dalam container. `NativeBridge.callCpp()` selalu throw "binary not found".

---

### 🟢 MINOR-8: Cycle Counter Tidak Thread-Safe untuk Multi-Instance
**File:** `agent/core/EvolutionPiper.js`  
**Kondisi:** Persistensi cycle ke `.evolution_state.json` tidak menggunakan atomic lock. Jika dua proses NEXUS berjalan bersamaan, mereka bisa membaca nilai lama dan sama-sama increment ke nilai yang sama.

---

### 🟢 MINOR-9: `NexusError` Terlalu Minimal (353 bytes)
**File:** `agent/core/NexusError.js`  
**Kondisi:** Tidak ada error codes, tidak ada severity levels, tidak ada stack enrichment. 30+ komponen throw error dengan format message yang berbeda-beda.

---

## 5. Audit Ekstrem: Sandbox Pipeline End-to-End

Berikut tracing lengkap jalur eksekusi dari `nexus run` hingga output, berdasarkan pembacaan source code aktual:

### 5.1 Entry Point
```
cli.js
  └─► NexusEngine.constructor()
        ├─ resolve paths (auditPath, logPath, planningPath, ...)
        ├─ new Modifier(), new MemoryPipeline(), new TDDGuard()
        ├─ new Orchestrator(), new EvolutionPiper()
        ├─ new LocalIntelligence(), new SemanticEngine()
        └─ new Distiller()
```

### 5.2 Phase 1: AuditPhase
```
AuditPhase.run(targetPath)
  ├─ Scan 6 standard Nexus folders → WARNING jika missing
  ├─ Cek [README.md](../vcs/NEXUS_README.MD), .env, LICENSE
  └─ ParallelRunner (concurrency=2):
        ├─ cyber-security scanner
        ├─ ux-engineer scanner
        ├─ seo-performance-specialist scanner
        ├─ database-architect scanner
        ├─ vcs-architect scanner
        └─ documentation-architect scanner
        ▼ setiap scanner: SandboxExecutor.execute(scannerPath)
             └─ Worker Thread (plugin-worker.js)
                  └─ require(scannerPath)(targetPath)
                  └─ result → message → resolve
        ▼
        Tulis: memory/raw/report_{spec}_{auditID}.json
```

**⚠️ Gap Ditemukan:** Scanner berjalan di Worker Thread tapi `timeout = 30000ms` default. Scanner yang berat (database-architect melakukan recursive file scan) bisa timeout sebelum selesai pada project besar.

### 5.3 Phase 2: PlanningPhase
```
PlanningPhase.run(auditReport)
  ├─ Filter findings (hilangkan INFO)
  ├─ Map findings → tasks (dengan auto-action untuk kasus sederhana)
  │    Contoh: '.env detected' → task.action = FILE_APPEND(.gitignore)
  └─ Tulis: planning/plan_{planID}.json + plan_{planID}.md
```

**⚠️ Gap Ditemukan:** Auto-action hanya mencakup satu kasus (`.env detected`). Mayoritas findings tidak punya `task.action`, sehingga ExecutionPhase tidak melakukan modifikasi fisik apapun untuk temuan tersebut. Plan dibuat tapi tidak dieksekusi secara nyata.

### 5.4 Phase 2.5: ImplementationPhase
```
ImplementationPhase.run()
  ├─ Baca NEXUS_BLUEPRINT.json
  ├─ Untuk setiap model → LocalIntelligence.generate(prompt, 'build_model_migration')
  │    └─ Ollama HTTP POST /api/generate
  │    └─ Tulis: app/Models/{Model}.php
  ├─ Untuk setiap migration → generate + tulis ke database/migrations/
  └─ Untuk setiap Livewire component:
        ├─ generate PHP class → app/Livewire/{Class}.php
        └─ generate Blade view → resources/views/livewire/{name}.blade.php
```

**🔴 Gap Kritis:** Tidak ada langkah `composer install`, `php artisan migrate`, `php artisan key:generate`, atau `npm run build`. File dihasilkan tapi aplikasi tidak bisa dijalankan.

### 5.5 Phase 3: ExecutionPhase
```
ExecutionPhase.run(plan)
  ├─ Untuk setiap task dengan task.action:
  │    ├─ Jika FILE_REPLACE/FILE_APPEND → TDDGuard.validate()
  │    │    └─ Jika tidak ada test → TDDScaffolder.generate()
  │    ├─ Jika ASSET_OPTIMIZE → AssetEngine.process()
  │    └─ Else → Modifier.apply(task.action)
  │         ├─ FILE_REPLACE: baca file, replace konten, tulis kembali
  │         ├─ FILE_APPEND: append ke akhir file
  │         ├─ FILE_CREATE: buat file baru
  │         └─ RESOLVE_OPTIONS: handle collision markers
  └─ ExecutionPhase.verify(plan)
        └─ Validator.verifyAction(task.action) untuk setiap task done
```

**⚠️ Gap Ditemukan:** `cleanCodeAndVerify()` mencari `NEXUS_BLUEPRINT.json` untuk mendapatkan `legacy_patterns`. Jika blueprint tidak ada (yang terjadi pada sandbox baru), method ini membuat `legacyPatterns = []` dan tidak membersihkan apapun. Tidak ada error, tapi juga tidak ada verifikasi real.

### 5.6 Phase 5: KnowledgePhase (Memory Internalization)
```
KnowledgePhase.run()
  ├─ memoryPipeline.optimize()
  │    ├─ archiveAuditReports() → pindah JSON audit ke memory/archived/
  │    ├─ archiveImplementationPlans() → pindah JSON plan ke archived/
  │    ├─ processHarvestData()
  │    │    └─ Baca golden/harvest/{project}/**/*.md
  │    │    └─ Merge/deduplicate ke memory/distilled/
  │    └─ writeSemanticIndex() → buat NEXUS_INDEX.md
  └─ distiller.run()
        ├─ standardizeNames() → prefix NEXUS_ pada semua file HUB
        ├─ simplifyContent() → summarize file panjang via LLM
        └─ applySemanticLinking() → tambah cross-references antar file
```

**🔴 Gap Kritis:** `KnowledgePhase.harvest(sourcePath)` harus dipanggil secara eksplisit SETELAH sandbox selesai dibangun. Tidak ada mekanisme otomatis yang memastikan harvest dipanggil di akhir setiap sandbox lifecycle. Jika tidak dipanggil, `processHarvestData()` menemukan `golden/harvest/` kosong dan tidak ada yang diproses.

---

## 6. Gap Analysis: "Web App yang Bisa Digunakan"

Definisi "web app yang bisa digunakan": aplikasi yang dapat diakses melalui browser, memiliki UI, koneksi database, dan fungsionalitas dasar.

| Komponen | Status | Kondisi Aktual |
|---|---|---|
| File PHP (Model, Controller, Routes) | ✅ Dibuat | `ImplementationPhase` menulis file via LLM |
| Blade Views | ✅ Dibuat | `ImplementationPhase` menulis Blade templates |
| `composer install` | ❌ Tidak ada | Tidak pernah dipanggil |
| `vendor/` directory | ❌ Tidak ada | Autoload tidak tersedia |
| Database migration | ❌ Tidak ada | `php artisan migrate` tidak pernah dipanggil |
| APP_KEY | ⚠️ Parsial | Ada di `.env` tapi `artisan key:generate` tidak dipanggil |
| Compiled CSS/JS | ❌ Tidak ada | `npm run build` tidak pernah dipanggil |
| Dev server | ❌ Tidak ada | `php artisan serve` tidak pernah dipanggil |
| **Hasil Akhir** | ❌ **Tidak Bisa Digunakan** | Kumpulan file PHP tanpa runtime |

**Kesimpulan:** Saat ini NEXUS AI menghasilkan *scaffold* file PHP, bukan *web app yang berjalan*. Gap utama ada di antara "file dihasilkan" dan "aplikasi dijalankan".

---

## 7. Gap Analysis: "Memory Inti Nexus"

Definisi "memory inti": pengalaman, dokumentasi, dan knowledge dari tiap sandbox tersimpan permanen dan dapat diakses untuk project berikutnya.

| Komponen | Status | Kondisi Aktual |
|---|---|---|
| Audit reports ke disk | ✅ Berjalan | `AuditPhase` menulis JSON ke `memory/raw/` |
| Plan ke disk | ✅ Berjalan | `PlanningPhase` menulis JSON + MD ke `planning/` |
| MemoryPipeline archiving | ✅ Berjalan | Archive audit/plan ke `memory/archived/` |
| Distiller standardization | ✅ Berjalan | Prefix NEXUS_ pada file HUB |
| KnowledgePhase harvest | ⚠️ Parsial | Berjalan hanya jika dipanggil eksplisit |
| Harvest source (sandbox docs) | ❌ Kosong | Sandbox 'crud' tidak menghasilkan docs |
| Redis vector memory | ❌ Tidak aktif | Service tidak ada di docker-compose |
| LLM semantic linking | ⚠️ Parsial | Berjalan tapi sumber data minimal |
| **Hasil Akhir** | ⚠️ **Parsial** | Metadata tersimpan, knowledge tidak tumbuh |

**Kesimpulan:** Memory pipeline sudah terstruktur dengan baik, tapi "pakan" (knowledge dari sandbox) tidak mengalir karena sandbox tidak menghasilkan dokumentasi dan harvest tidak dipanggil otomatis.

---

## 8. Rekomendasi Perbaikan Prioritas

### R-01: Implementasikan `spawnRealLaravel()` [KRITIS]
Ganti throw Error dengan implementasi nyata:

```javascript
async spawnRealLaravel(name) {
    await this.checkEvolutionBoundary();
    const targetPath = path.join(this.sandboxPath, name);
    
    // Step 1: composer create-project
    await this._spawn('composer', [
        'create-project', 'laravel/laravel', name, '--no-interaction'
    ], { cwd: this.sandboxPath, timeout: 300000 });

    // Step 2: Install TALL Stack
    await this._spawn('composer', [
        'require', 'livewire/livewire', 'laravel/sanctum'
    ], { cwd: targetPath, timeout: 120000 });

    // Step 3: Tailwind + Alpine via npm
    await this._spawn('npm', ['install'], { cwd: targetPath, timeout: 120000 });

    return targetPath;
}
```

### R-02: Tambah Post-Implementation Runner [KRITIS]
Di akhir `ImplementationPhase.run()`, tambahkan:

```javascript
async bootstrapApplication() {
    const root = this.engine.rootPath;
    
    await this._run('composer', ['install', '--no-interaction'], root);
    await this._run('php', ['artisan', 'key:generate', '--force'], root);
    await this._run('php', ['artisan', 'migrate', '--force', '--seed'], root);
    await this._run('npm', ['install'], root);
    await this._run('npm', ['run', 'build'], root);
    
    this.log('✅ Application bootstrapped and ready.', 'success');
}
```

### R-03: Tambah Redis ke `docker-compose.yml` [KRITIS]
```yaml
services:
  redis:
    image: redis:7-alpine
    container_name: nexus_redis
    restart: unless-stopped
    networks:
      - nexus-internal
    volumes:
      - redis_data:/data

  nexus-ai:
    # ...existing config...
    depends_on:
      - redis
    environment:
      - REDIS_URL=redis://redis:6379

volumes:
  redis_data:
```

### R-04: Aktifkan `WorktreeManager` [KRITIS]
Ubah `isActive = true` setelah menambahkan error handling:

```javascript
this.isActive = process.env.NEXUS_GIT_ISOLATION === 'true';
```

Dan tambahkan di `.env`:
```
NEXUS_GIT_ISOLATION=true
```

### R-05: Auto-Trigger KnowledgePhase Harvest [SEDANG]
Di `EvolutionPiper.harvestWisdom()`, setelah copy logs, tambahkan trigger:

```javascript
async harvestWisdom(name) {
    // ... existing harvest logic ...
    
    // Auto-trigger KnowledgePhase untuk internalisasi
    const knowledgePhase = new KnowledgePhase(this.engine);
    await knowledgePhase.harvest(targetPath);
    await knowledgePhase.run(); // distill ke HUB
    
    console.log(`✅ Knowledge from [${name}] internalized to NEXUS core memory.`);
}
```

### R-06: Implementasikan Sandbox Documentation Writer [SEDANG]
Di akhir setiap sandbox build, generate dokumentasi yang menjadi "pakan" harvest:

```javascript
async generateSandboxDocumentation(targetPath, buildResult) {
    const docsPath = path.join(targetPath, 'nexus', 'memory', 'operational');
    await fs.ensureDir(docsPath);
    
    const doc = `# Sandbox Build Report
**Project:** ${path.basename(targetPath)}
**Date:** ${new Date().toISOString()}
**Status:** ${buildResult.success ? 'SUCCESS' : 'FAILED'}

## Files Generated
${buildResult.files.map(f => `- ${f}`).join('\n')}

## Lessons Learned
${buildResult.lessons.join('\n')}
`;
    await fs.writeFile(path.join(docsPath, 'BUILD_REPORT.md'), doc);
}
```

### R-07: Mount Native Binary di Docker [MINOR]
Tambahkan ke `docker-compose.yml`:
```yaml
volumes:
  - ./nexus/native:/app/nexus/native
```

### R-08: Perluas `NexusError` dengan Error Codes [MINOR]
```javascript
class NexusError extends Error {
    constructor(domain, message, code = 'NEXUS_UNKNOWN') {
        super(`[${domain}] ${message}`);
        this.code = code;
        this.domain = domain;
        this.timestamp = new Date().toISOString();
    }
}

// Usage:
throw new NexusError('EXECUTION', 'Binary not found', 'NEXUS_E001_BINARY_NOT_FOUND');
```

---

## 9. Peta Jalan (Roadmap)

### Fase A — Foundation Fix (1-2 minggu)
Fokus: Pipeline menghasilkan aplikasi yang bisa dibuka di browser.

1. Implementasikan `spawnRealLaravel()` dengan composer
2. Tambahkan `bootstrapApplication()` di akhir ImplementationPhase
3. Fix `docker-compose.yml` (Redis + volume native)
4. Aktifkan `WorktreeManager` via env flag

**Kriteria sukses:** `nexus run` → `php artisan serve` → browser menampilkan halaman Laravel

### Fase B — Knowledge Loop (2-3 minggu)
Fokus: Setiap sandbox build memperkaya memory inti NEXUS.

1. Implementasikan Sandbox Documentation Writer
2. Auto-trigger KnowledgePhase.harvest() di akhir setiap sandbox
3. Sambungkan Redis sebagai vector store yang aktif
4. Verifikasi distiller berjalan setelah setiap harvest

**Kriteria sukses:** Setelah 3 sandbox selesai, `memory/distilled/` memiliki knowledge yang terstruktur dari ketiga project

### Fase C — Quality & Scale (3-4 minggu)
Fokus: Stabilitas untuk 100 project target.

1. Implementasikan atomic Redis counter untuk EvolutionPiper
2. Implementasikan chunking untuk prompt >30KB
3. Perluas NexusError dengan error codes
4. Tambahkan health-check startup (python, C++, Redis, Ollama)
5. Implementasikan ConcurrencyGovernor global

**Kriteria sukses:** `nexus run` berhasil pada 10 project berturut-turut tanpa crash atau data corruption

---

*Dokumen ini dihasilkan berdasarkan analisis source code langsung dari file: `NexusEngine.js`, `Orchestrator.js`, `EvolutionPiper.js`, `Distiller.js`, `NativeBridge.js`, `SandboxExecutor.js`, `LocalIntelligence.js`, `WorktreeManager.js`, `MemoryPipeline.js`, `KnowledgePhase.js`, `ExecutionPhase.js`, `ImplementationPhase.js`, `PlanningPhase.js`, `AuditPhase.js`, `docker-compose.yml`, `package.json`.*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, vcs, api]
