# 🧠 NEXUS AI — Pipeline Architecture Map
> **VERSION**: v1 | **Last Updated**: 26/05/2026


> **Scan Date**: 2026-05-11 | **Engine**: Antigravity AI Engineer  
> **Version**: Human-AI Nexus v3.1.0 | **Mode**: Extreme Scan

---

## 1. 📦 Struktur Makro Project

```
NEXUS AI/
├── cli.js                      ← Entry Point (Global CLI: `nexus <cmd>`)
├── agent/
│   ├── main.js                 ← Command Router (run/audit/harvest/distill/forge)
│   ├── core/                   ← OTAK UTAMA ENGINE
│   ├── prompts/                ← Agent Prompt Bank (internal + external)
│   ├── tools/                  ← Specialized Tools & Scanners
│   ├── workflows/              ← Skill Workflow Definitions
│   └── scripts/                ← Automated Loop Scripts
├── memory/
│   ├── raw/                    ← Audit mentah masuk di sini
│   ├── normalized/             ← Data setelah sanitasi
│   ├── semantic/               ← Indexed data berdasarkan tag
│   ├── distilled/              ← KNOWLEDGE HUB (master wisdom)
│   ├── operational/            ← Records, sessions, link cache
│   ├── archived/               ← Backup & rotasi file
│   └── short_term/             ← Cache sementara (link_cache.json)
├── knowledge/                  ← Session archives TDD & test logs
├── golden/harvest/             ← Zona staging harvest dari project external
├── documentation/              ← Output laporan (audit, planning, summary)
├── logs/                       ← Observability (agents/orchestration/errors)
├── tests/
│   ├── TDD/                    ← Test runner
│   └── sandboxes/              ← Lab environment (EvolutionPiper)
└── config/.env.example         ← Konfigurasi dasar
```

---

## 2. 🔄 PIPELINE UTAMA: Full Cycle

```mermaid
flowchart TD
    A["👤 USER / CLI\n`nexus run`"] --> B["cli.js\n(Entry Point)"]
    B --> C["agent/main.js\n(Command Router)"]

    C --> D["NexusEngine\n(Core Orchestrator)"]

    subgraph INIT["🔷 FASE INIT"]
        D --> D1["discoverSkills()\nScan workflows/internal & external"]
        D --> D2["readMemory()\nLoad distilled/ + semantic index"]
        D --> D3["ResourceMonitor.checkStress()\nThrottle jika RAM kritis"]
    end

    INIT --> P1

    subgraph P1["⚡ FASE 1: AUDIT"]
        P1A["Structural Scan\n(folder existence check)"]
        P1B["Specialist Agents x6\n(Parallel Promise.all)"]
        P1C["SandboxExecutor\n(jalankan scanner .js sandboxed)"]
        P1D["Hardcoded Machine Audit\n(SchemaGuard, QueryOptimizer, A11yScanner)"]
        P1E["Dynamic Forged Scanners\n(tools/scanners/*.js)"]
        P1F["AuditReport object\n+ .json + .md ke memory/raw"]
        P1A --> P1B --> P1C --> P1D --> P1E --> P1F
    end

    P1 --> P2

    subgraph P2["📋 FASE 2: PLANNING"]
        P2A["engine.plan(auditReport)"]
        P2B["Map findings → Task objects\n+ AUTO-ACTION generation"]
        P2C["ImplementationPlan object\n+ .json + .md ke documentation/planning"]
        P2D["👤 DEV APPROVAL GATE\n(interactive y/n loop)"]
        P2A --> P2B --> P2C --> P2D
    end

    P2 --> P3

    subgraph P3["🚀 FASE 3: EXECUTION"]
        P3A["engine.execute(plan)"]
        P3B["TDDGuard.validate()\nBlokir jika test belum ada"]
        P3C["TDDScaffolder.generate()\nAuto-buat test jika diblokir"]
        P3D["Modifier.apply()\nFILE_REPLACE / FILE_APPEND / RESOLVE_OPTIONS"]
        P3E["AssetEngine.process()\nAsset optimization"]
        P3F["Self-Healing Doc Update\nupdateRecapStatus()"]
        P3A --> P3B --> P3C --> P3D --> P3E --> P3F
    end

    P3 --> P4

    subgraph P4["🔍 FASE 4: VERIFICATION"]
        P4A["engine.verify(plan)"]
        P4B["Validator.verifyAction()\nCek apakah aksi benar-benar berdampak"]
        P4C["Task marked: done / failed_verification"]
        P4A --> P4B --> P4C
    end

    P4 --> P5

    subgraph P5["📝 FASE 5: RECORDING & MEMORY"]
        P5A["engine.record(cycleID)"]
        P5B["session_TIMESTAMP.json\n→ memory/operational/records"]
        P5C["MemoryPipeline.optimize()"]
        P5D["archiveAuditReports()\narchiveImplementationPlans()"]
        P5E["processHarvestData()\ngolden/harvest → memory/distilled"]
        P5F["generateCycleSummary()\n→ documentation/summary"]
        P5A --> P5B --> P5C --> P5D --> P5E --> P5F
    end

    P5 --> END["✅ SIKLUS SELESAI\nSTATE: COMPLETED"]
```

---

## 3. 🧬 PIPELINE DISTILLATION (Perintah: `nexus distill`)

```mermaid
flowchart LR
    DI["engine.distill()"] --> DA["Distiller.run()"]

    subgraph DISTILL["Distillation Pipeline (7 Steps)"]
        direction TB
        S1["1. distillAcademics()\nExtract insights dari file academic\n→ memory/distilled/academics/NEXUS_DISTILLATION_*.md"]
        S2["2. standardizeNames()\nRename semua file → NEXUS_ prefix"]
        S3["3. applySemanticTagging()\nInject METADATA TAGS ke setiap file"]
        S4["4. shelve()\nPindahkan file ke rack semantic:\nsecurity/ performance/ ui-ux/ database/ tdd/ vcs/"]
        S5["5. applySemanticLinking()\nCross-link antar file (path-aware)\n+ link_cache.json untuk efisiensi"]
        S6["6. generateHubIndex()\nBuat NEXUS_HUB_INDEX.md\n+ NEXUS_SEMANTIC_INDEX.json"]
        S7["7. generateNeuralMap()\nBuat NEXUS_NEURAL_MAP.md\n(Mermaid graph TD dari semua koneksi)"]
        S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7
    end

    DA --> DISTILL
```

---

## 4. 🌾 PIPELINE HARVESTING (Perintah: `nexus harvest <path>`)

```mermaid
flowchart TD
    H1["nexus harvest /path/to/project"] --> H2["engine.harvest(sourcePath)"]
    H2 --> H3["Deteksi: nexus/ atau documentation/ di source"]
    H3 --> H4["Copy audit/ planning/ summary/ records/\n→ golden/harvest/ProjectName/"]
    H4 --> H5["MemoryPipeline.processHarvestData()"]
    H5 --> H6["cleanseContent()\nRedact: API keys, credentials, IPs"]
    H6 --> H7{"isRecords?"}
    H7 -->|Ya| H8["→ memory/operational/records/"]
    H7 -->|Tidak| H9["→ memory/distilled/ (Knowledge HUB)"]
    H8 --> H10["emptyDir(golden/harvest)\nRecycle zona staging"]
    H9 --> H10
```

---

## 5. 🔥 PIPELINE FORGE (Perintah: `nexus forge <Name> <wisdom.md>`)

```mermaid
flowchart TD
    F1["nexus forge BrandingScanner\n  memory/distilled/NEXUS_BRANDING.md"] --> F2["Machinist.forge(name, wisdomPath)"]
    F2 --> F3["Baca wisdom file\nExtract 'Actionable Steps' / 'Core Insights'"]
    F3 --> F4["getScannerTemplate()\nGenerate .js scanner dari rules"]
    F4 --> F5["Tulis ke agent/tools/scanners/branding-scanner.js"]
    F5 --> F6["TDDScaffolder.generate()\nAuto-scaffold test untuk scanner baru"]
    F6 --> F7["Scanner siap dipakai di Audit Cycle berikutnya\n(Dynamic Forged Scanners)"]
```

---

## 6. 🧠 LAYER MEMORI — Hierarki & Alur Data

```
INPUT DATA
    │
    ▼
memory/raw/                  ← Audit reports mentah (report_agentid_AUDITID.json/md)
    │
    ▼ [MemoryPipeline.archiveAuditReports()]
memory/operational/          ← Session records, archive index
    │
    ▼ [Harvest → cleanseContent()]
memory/distilled/            ← KNOWLEDGE HUB (sumber kebenaran)
    │
    ├── standards/           ← Prinsip, protokol, kontrak
    ├── security/            ← Wisdom keamanan
    ├── performance/         ← Wisdom performa
    ├── ui-ux/              ← Wisdom desain
    ├── database/            ← Wisdom database
    ├── tdd/                 ← Wisdom pengujian
    ├── vcs/                 ← Wisdom version control
    └── academics/           ← Hasil distilasi paper/artikel
    │
    ▼ [Distiller.generateHubIndex()]
memory/distilled/NEXUS_HUB_INDEX.md       ← Master index
memory/distilled/NEXUS_SEMANTIC_INDEX.json ← Semantic search index
memory/distilled/NEXUS_NEURAL_MAP.md       ← Mermaid connection graph
    │
    ▼ [NexusEngine.readMemory() → searchKnowledge(tag)]
SEMANTIC SEARCH             ← Engine query HUB berdasarkan tag
memory/short_term/link_cache.json ← Cache linking untuk efisiensi
```

---

## 7. 👥 AGENT REGISTRY — 14 Specialist Prompts

| # | Agent ID | Domain | Type |
|---|----------|--------|------|
| 1 | `orchestrator` | Master orchestration | Internal (~2MB prompt) |
| 2 | `guru` | Senior wisdom | Internal (~2MB prompt) |
| 3 | `pipeline-architect` | Pipeline design | Internal (~2MB prompt) |
| 4 | `agent-manager` | Agent coordination | Internal |
| 5 | `golden-crawler` | Knowledge harvesting | Internal |
| 6 | `looping-tester` | TDD loop automation | Internal |
| 7 | `machinist` | Machine forging | Internal |
| 8 | `memory-manager` | Memory optimization | Internal |
| 9 | `cyber-security` | Security auditing | Internal + Scanner |
| 10 | `ux-engineer` | UX/Design auditing | Internal + Scanner |
| 11 | `seo-performance-specialist` | SEO & performance | Internal + Scanner |
| 12 | `database-architect` | Schema & queries | Internal + Scanner |
| 13 | `vcs-architect` | Git health | Internal + Scanner |
| 14 | `documentation-architect` | Docs compliance | Internal + Scanner |

---

## 8. ⚙️ CORE MODULES — Dependency Map

```mermaid
graph TD
    NE["NexusEngine (God Object)"]
    
    NE --> MOD["Modifier\n(File mutations)"]
    NE --> MEM["MemoryPipeline\n(Archive & harvest data)"]
    NE --> MEMG["MemoryGovernor\n(Locking & validation)"]
    NE --> DIST["Distiller\n(Knowledge HUB ops)"]
    NE --> MACH["Machinist\n(Forge new scanners)"]
    NE --> ORCH["Orchestrator\n(EventBus task routing)"]
    NE --> EVOL["EvolutionPiper\n(Lab sandbox lifecycle)"]
    NE --> SBX["SandboxExecutor\n(Isolated scanner exec)"]
    NE --> LOG["Logger\n(Structured observability)"]
    NE --> CLK["NexusClock\n(Timestamp utils)"]
    NE --> RSM["ResourceMonitor\n(RAM/CPU stress check)"]
    NE --> EB["EventBus (singleton)\n(Pub/Sub event system)"]
    NE --> DC["DecisionEngine\n(Weighted scoring resolver)"]
    
    NE --> T1["TDDGuard\n(Test gate)"]
    NE --> T2["TDDScaffolder\n(Auto-generate tests)"]
    NE --> T3["BugHunter"]
    NE --> T4["Validator\n(Post-exec verification)"]
    NE --> T5["SchemaGuard\n(DB model scanner)"]
    NE --> T6["QueryOptimizer\n(Migration scanner)"]
    NE --> T7["AccessibilityScanner"]
    NE --> T8["AssetEngine"]
    NE --> T9["Designer"]
    NE --> T10["RootCauseAnalyzer"]

    ORCH --> EB
    ORCH --> SBX
```

---

## 9. 🔁 EVOLUSI SKILL — Update Skills Pipeline

```mermaid
flowchart LR
    US1["nexus update-skills"] --> US2["engine.massUpdateSkills()"]
    US2 --> US3["Scan memory/distilled/\n(semua file .md wisdom)"]
    US3 --> US4["Untuk setiap agent di prompts/internal/\nInject distilled wisdom ke prompt"]
    US4 --> US5["Skill terupdate → Agent lebih pintar di cycle berikutnya"]
```

---

## 10. 🔄 REFACTOR PIPELINE (Golden → HUB)

```mermaid
flowchart LR
    R1["nexus refactor"] --> R2["engine.massRefactor()"]
    R2 --> R3["Scan golden/ untuk template terbaik"]
    R3 --> R4["Bandingkan dengan memory/distilled/\ngunakan DecisionEngine scoring"]
    R4 --> R5["Merge atau replace wisdom"]
    R5 --> R6["Update NEXUS_HUB_INDEX.md"]
```

---

## 11. 🚨 SISTEM STATE & ERROR HANDLING

```
INIT → PROCESSING → EXECUTING → LOGGING → COMPLETED
                                              ↓
                                           FAILED (jika throw NexusError)
                                              ↓
                                        logError() → documentation/summary/error_log.json
```

**Retry Logic** (Orchestrator):
- MAX_RETRY = 3 attempts per task
- EventBus: `SCANNER_TRIGGERED` → `SCANNER_FINISHED` / `TASK_FAILED`

**MemoryGovernor Lock System**:
- Setiap operasi tulis ke memory pakai file lock (`.lock`)
- Timeout 5000ms → throw jika deadlock

---

## 12. 🗂️ CLI Commands — Full Map

| Command | Handler | Pipeline |
|---------|---------|----------|
| `nexus` (default) | `install()` | Setup nexus/ di project target |
| `nexus run` | `main.js → runCycle()` | Full: Audit→Plan→Execute→Verify→Record |
| `nexus audit` | `engine.audit()` | Audit only |
| `nexus harvest <dir>` | `engine.harvest()` | Harvest dari project lain |
| `nexus distill` | `engine.distill()` | Distillation pipeline (7 steps) |
| `nexus forge <N> <f>` | `machinist.forge()` | Build scanner dari wisdom |
| `nexus refactor` | `engine.massRefactor()` | Golden → HUB sync |
| `nexus update-skills` | `engine.massUpdateSkills()` | HUB → Agent prompts update |
| `nexus skills` | `engine.discoverSkills()` | List semua skill registry |
| `nexus update` | `updateEngine()` | Sync external prompts/workflows |
| `nexus dell` | `uninstall()` | Safe remove nexus/ (preserve docs) |

---

## 13. ⚠️ GAP ANALYSIS & ISSUES TERIDENTIFIKASI

| # | Issue | File | Severity |
|---|-------|------|----------|
| 1 | `MemoryPipeline.archiveAuditReports()` & `archiveImplementationPlans()` — **auto-delete DISABLED** (hotfix comment) | MemoryPipeline.js:120 | 🟡 MEDIUM |
| 2 | `appendToArchive()` juga **di-comment** — archive tidak pernah ter-trigger | MemoryPipeline.js:129 | 🟡 MEDIUM |
| 3 | `EvolutionPiper.harvestWisdom()` path ke `memory/long_term/distilled` tapi folder ini **tidak exist** (seharusnya `memory/distilled`) | EvolutionPiper.js:64 | 🔴 BUG |
| 4 | `Machinist.integrate()` hardcode path `./../auditor/${name}` tapi folder `auditor/` **tidak exist** di project | Machinist.js:42 | 🔴 BUG |
| 5 | `DecisionEngine` terdefinisi tapi **tidak di-import** di NexusEngine.js — fungsi refactor belum terhubung | DecisionEngine.js | 🟡 MEDIUM |
| 6 | `massRefactor()` & `massUpdateSkills()` **tidak ditemukan** di NexusEngine.js (dipanggil dari main.js tapi tidak ada implementasi) | NexusEngine.js | 🔴 CRITICAL |
| 7 | `memory/semantic/` selalu **kosong** — tidak ada pipeline yang aktif mengisi folder ini | memory/semantic/ | 🟡 MEDIUM |
| 8 | `config/` hanya berisi `.env.example` — tidak ada loader konfigurasi | config/ | 🟢 LOW |
| 9 | `EvolutionPiper` di-define tapi **tidak di-import** di NexusEngine.js | EvolutionPiper.js | 🟡 MEDIUM |
| 10 | Logger structured logging ada tapi **log files di `logs/`** belum terverifikasi isinya | logs/ | 🟢 LOW |

---

## 14. 🎯 REKOMENDASI PRIORITAS

### 🔴 Critical (Segera)
1. **Implementasi `massRefactor()` & `massUpdateSkills()`** di NexusEngine.js — saat ini akan throw "not a function"
2. **Fix path `EvolutionPiper`** dari `memory/long_term/distilled` → `memory/distilled`
3. **Fix path `Machinist.integrate()`** dari `./../auditor/` → path yang valid

### 🟡 Medium (Sprint Berikutnya)
4. **Reaktifkan archiving di MemoryPipeline** — saat ini dead code, memory/raw tidak pernah dibersihkan
5. **Import & gunakan `DecisionEngine`** di refactor flow
6. **Aktifkan `memory/semantic/`** sebagai output dari semantic tagging pipeline
7. **Import `EvolutionPiper`** ke NexusEngine agar lab cycle bisa digunakan

### 🟢 Enhancement
8. Buat `config loader` dari `.env.example` → runtime config
9. Tambah `nexus status` command untuk health check semua pipeline
10. Tambah `nexus test` integrasi ke TDD runner otomatis

---

*Scan dilakukan oleh: Antigravity AI Engineer | Nexus Pipeline Architecture v3.1.0*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, vcs, api]
