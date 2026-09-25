# 🤖 Human-AI Nexus

A modular semantic multi-agent operating framework  
with dynamic capability orchestration and production-grade stability guardrails.

> **Version**: v3.4.0 (LLM + RAG Architecture)
> **Updated**: 21/09/2026

[![Quick Guide](https://img.shields.io/badge/PANDUAN-BACA%20DULU-blueviolet?style=for-the-badge)](documentation/nexus_rules/PANDUAN_CEPAT.md)
[![Status](https://img.shields.io/badge/STATUS-PRODUCTION%20STABLE-brightgreen?style=for-the-badge)]()

---

## 📌 Pendahuluan: Mengapa Human-AI Nexus?

Banyak developer terjebak dalam alur kerja AI yang kacau: AI langsung menulis kode tanpa rencana, menghasilkan bug yang sulit dilacak, atau mengabaikan aspek keamanan dan hukum.

**Human-AI Nexus** hadir untuk mengatasi masalah tersebut. Ini adalah pusat kendali dan dokumentasi terstruktur yang dirancang untuk menjembatani kolaborasi antara **Human Developer** dan **AI Assistant**. Framework ini memastikan setiap tahap pengembangan terdokumentasi dengan ketat melalui prinsip **"Documentation-First"** sebelum satu baris kode pun ditulis.

### 🎯 Target Pengguna

- **Web Developers**: Untuk menjaga kualitas kode dan keamanan arsitektur.
- **Project Managers**: Untuk memantau progres dan dokumentasi teknis secara otomatis.
- **AI Enthusiasts**: Untuk bereksperimen dengan orkestrasi agent AI yang kompleks.
- **Trainers/Mentors**: Sebagai standar pembelajaran pengembangan perangkat lunak yang disiplin.

---

## 🗺️ Daftar Isi

- [⚙️ Core Machines](#️-core-machines--modul-utama)
- [🏛️ 5 Pilar Arsitektur LLM + RAG](#️-5-pilar-arsitektur-llm--rag-baru)
- [🛡️ Stability Guardrails v2.0](#️-stability-guardrails-v20-baru)
- [🏗️ Arsitektur Sistem](#️-arsitektur-sistem)
- [📂 Struktur Folder](#-struktur-folder)
- [🛠️ Cara Penggunaan & Perintah CLI](#️-cara-penggunaan)
- [🌟 Prinsip Utama](#-prinsip-utama)
- [📜 Changelog](CHANGELOG.md)
- [🤝 Cara Berkontribusi](#-cara-berkontribusi)

---

## ⚙️ Core Machines — Modul Utama

Sistem ditenagai oleh modul spesialis yang bekerja secara independen dan terkoordinasi:

| # | Modul | Fungsi |
|---|---|---|
| 1 | `Validator.js` | Verifikasi bukti fisik keberhasilan tugas |
| 2 | `BugHunter.js` | Penegak "Aturan 3 Perbaikan" anti-loop halusinasi |
| 3 | `Designer.js` | Automasi penalaran desain (Warna, Font, Style) |
| 4 | `AccessibilityScanner.js` | Pemindaian standar WCAG/A11y otomatis |
| 5 | `SchemaGuard.js` | Penegak standar database (UUID/Fillable) |
| 6 | `QueryOptimizer.js` | Deteksi foreign key tanpa index |
| 7 | `WorktreeManager.js` | Isolasi workspace via Git Worktree (**isActive guard**) |
| 8 | `RootCauseAnalyzer.js` | Analisis akar masalah dari stack trace |
| 9 | `LaravelArchitect.js` | Spesialis otomasi Laravel (Traits, Migrations, Env) |
| 10 | `TDDScaffolder.js` | Pembangun scaffold pengujian otomatis |
| 11 | `NexusClock.js` | Penegak standarisasi waktu UTC+8 untuk Docker |
| 12 | `SemanticEngine.js` | 🆕 Vector Search + Hybrid Seeding + CRAG & HyDE Engine |
| 13 | `LocalIntelligence.js` | 🆕 Fast Local GGUF Engine + GBNF Grammar Constrained Decoding |
| 14 | `GraphEngine.js` | 🆕 In-Memory Knowledge Graph & Wikilink-Aware Traversal |
| 15 | `ObsidianBridge.js` | 🆕 Bidirectional Vault Integration (Read & Self-Learning Write-Back) |
| 16 | `AgentRegistry.js` | 🆕 Health monitor & stuck agent detection |
| 17 | `EventBus.js` | Event bus dengan schema validation |
| 18 | `ResourceMonitor.js` | CPU + RAM monitor (real measurement, tiered alerts) |
| 19 | `MemoryGovernor.js` | File locking dengan stale lock detection |
| 20 | `EvolutionPiper.js` | Lab manager dengan cycle + session hard limits |
| 21 | `DecisionEngine.js` | Conflict resolver dengan 7 context weight profiles |

---

## 🏛️ 5 Pilar Arsitektur LLM + RAG (Baru)

NEXUS AI v3.4.0 memperkenalkan **5 Pilar Arsitektur LLM + RAG** untuk menjamin penalaran kode lokal yang deterministik, self-learning, dan bebas halusinasi:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               NEXUS AI ENGINE CORE                                     │
├───────────────────────────────┬───────────────────────────────┬────────────────────────┤
│ 1. GraphRAG Topology          │ 2. Continuous Learning Loop   │ 3. Tiered Model Router │
│  • Wikilinks & Backlinks      │  • TDD Failure Post-Mortem    │  • Tier 0: Heuristics  │
│  • Hybrid Seeding (RRF K=60)  │  • Obsidian Vault Write-Back  │  • Tier 1: Fast Local  │
│  • 3.5k-4.5k Token Budget     │  • Real-time Graph Re-index   │  • VRAM/CPU Fallback   │
├───────────────────────────────┴───────────────────────────────┴────────────────────────┤
│ 4. Agentic RAG (HyDE + CRAG)                                                           │
│  • HyDE: Zero-shot code expansion untuk query pendek                                   │
│  • CRAG: Confidence Guard (≥0.60 DIRECT | 0.35-0.60 ENRICH | <0.35 REFORMULATE)        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. GBNF Grammar Constrained Decoding                                                   │
│  • LlamaJsonSchemaGrammar sampling layer (100% valid JSON guarantee)                   │
│  • Predefined schemas: blueprintApp, postMortem, codeReview, schemaValidation          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1. GraphRAG (Wikilink & In-Memory Network Graph)
- **Komponen**: `GraphEngine.js` & `SemanticEngine.js`
- **Kapabilitas**:
  - Rekonstruksi topologi pengetahuan dari file markdown & Obsidian vault via parsing regex `[[Target|Alias]]`, resolusi alias, dan ekstraksi `#tags`.
  - 2-pass graph builder: pencatatan outlinks, backlinks, degree centrality, dan pembobotan edge dua arah (*bidirectional weight 2.0*).
  - **Hybrid Seeding**: Memadukan pencocokan entitas langsung (*Direct Entity Match*) dengan penelusuran semantik Vector / TF-IDF menggunakan algoritma *Reciprocal Rank Fusion* (RRF, $K = 60$).
  - **Token Budget Protection**: Pembatasan ketat 3.500–4.500 karakter traversal context window, aman untuk environment RAM 8GB.

### 2. Continuous Learning Loop (Obsidian Write-Back v1.1)
- **Komponen**: `ExecutionPhase.js` & `ObsidianBridge.js`
- **Kapabilitas**:
  - **Automated TDD Feedback Loop**: Menjalankan test suite PHPUnit/Artisan otomatis. Jika terdeteksi failure, `RootCauseAnalyzer` memetakan koordinat file/line dan `LocalIntelligence` menghasilkan analisis post-mortem.
  - **Obsidian Vault Sync**: Menyimpan catatan post-mortem secara otomatis ke Obsidian Vault (`NEXUS Update/Lessons/NEXUS_LESSON_*.md`) lengkap dengan Frontmatter YAML, tags, dan `[[wikilinks]]`.
  - **Real-Time Graph Re-Indexing**: Memicu pembaruan inkremental Knowledge Graph secara real-time saat pelajaran baru tersimpan.
  - **CUDA Fine-Tuning Dataset**: Mencatat sampel self-correction ke file JSONL di `3 qwen/colab_cuda_training_dataset.jsonl` untuk fine-tuning Google Colab CUDA.

### 3. Hierarchical / Tiered Model Routing (Focused Local)
- **Komponen**: `LocalIntelligence.js` & `NexusEngine.js`
- **Kapabilitas**:
  - **Tier 0 (Instant Heuristic Engine)**: Eksekusi validator regex dan aturan AST statis (< 1ms, 0 MB VRAM) untuk skema migrasi database dan review sintaks umum tanpa membebani LLM.
  - **Tier 1 (Fast Local Model)**: Model Qwen GGUF via `node-llama-cpp` (Qwen3-4B / Qwen2.5-Coder-3B) dengan alokasi context dinamis (512–1024), kontrol thread CPU, dan otomatisasi fallback dari GPU Vulkan ke pure CPU jika VRAM exhausted.
  - Fokus pada inferensi lokal cepat dan efisien tanpa latensi multi-tier cloud.

### 4. Agentic RAG (HyDE + Corrective RAG / CRAG)
- **Komponen**: `SemanticEngine.js`
- **Kapabilitas**:
  - **HyDE (Hypothetical Document Embeddings)**: Menghasilkan sintesis pseudo-code teknis zero-shot sesuai domain query untuk menjembatani *vocabulary gap* antara pertanyaan singkat user dengan catatan codebase yang padat.
  - **CRAG Confidence Guard**: Evaluasi skor keyakinan retrieval berbasis bobot gabungan ranking dokumen dan rasio keyword coverage:
    - $\ge 0.60$ (**DIRECT**): Dokumen relevan langsung digunakan sebagai prompt context.
    - $0.35 - 0.60$ (**ENRICH_GRAPH_HYDE**): Ekspansi 1-hop GraphRAG + sintesis konteks HyDE.
    - $< 0.35$ (**REFORMULATE_EXPAND**): Pembersihan query + 2-hop Graph network expansion.

### 5. GBNF Grammar Constrained Decoding
- **Komponen**: `LocalIntelligence.js`
- **Kapabilitas**:
  - Injeksi constraint grammar pada sampling layer model lokal menggunakan `LlamaJsonSchemaGrammar`.
  - **100% Jaminan Validitas JSON**: Mencegah syntax error, trailing commas, atau markdown fences corrupt (` ```json `) yang sering merusak parsing downstream.
  - **Predefined Schemas**: Skema siap pakai untuk `blueprintApp`, `postMortem`, `codeReview`, dan `schemaValidation`.

---

## 🛡️ Stability Guardrails v2.0 (Baru)

Versi 3.2.0 mengimplementasikan **guardrail di level kode** — bukan hanya dokumentasi.

### 🔴 Critical Fixes

| Masalah | Fix |
|---|---|
| `Promise.all` — 1 agent gagal = seluruh audit crash | **Circuit Breaker** via `Promise.allSettled` — partial failure dilanjutkan |
| `ResourceMonitor` CPU selalu 0% | Real CPU measurement via 2-snapshot delta |
| `MemoryGovernor` stale lock = permanent deadlock | Stale lock detection (30s threshold) + exponential backoff |

### 🛡️ Guardrail (Anti-Runaway)

| Modul | Pagar |
|---|---|
| `LocalIntelligence` | Task whitelist, locked system prompt, model auto-selection (Qwen 2.5/3), max 30k chars output |
| `EvolutionPiper` | Max 25 cycles/session, max 120 menit, auto-throw kalau batas tercapai |
| `Machinist` | Path whitelist (`agent/tools/scanners/` only), blacklist core folders, forbidden import check |
| `WorktreeManager` | `isActive=false` — semua method return early dengan warning jelas |

### 🟡 Reliability

| Modul | Fix |
|---|---|
| `EventBus` | Schema registry — event tidak terdaftar di-drop, missing fields throw error |
| `Orchestrator` | Dead Letter Queue — task gagal permanen disimpan ke `logs/dead_letter_queue.json` |
| `MemoryPipeline` | `versionedWrite()` — backup otomatis ke `memory/archived/` sebelum overwrite |
| `DecisionEngine` | 7 weight profiles: default, saas, security, performance, refactor, api, learning |

---

## 🏗️ Arsitektur Sistem

```
nexus run
    │
    ▼
NexusEngine (Lazy-aware orchestrator)
    │
    ├── Orchestrator ──► EventBus [Schema-Validated] ──► SandboxExecutor
    │        │                                                │
    │        └── Dead Letter Queue                    6 Specialist Agents
    │                                                  (Circuit Breaker)
    ├── AgentRegistry [NEW] ── Health/Stuck Detection
    │
    ├── ResourceMonitor [Fixed] ── Real CPU + Tiered Alerts
    │
    ├── MemoryGovernor [Fixed] ── Stale Lock Detection
    │
    ├── MemoryPipeline [Fixed] ── Versioned Write
    │
    ├── SemanticEngine ── TF-IDF + Redis Cache
    │
    └── LocalIntelligence [Guardrailed] ── Task Whitelist + Output Validation
```

---

## 📂 Struktur Folder

| Folder | Deskripsi |
| :--- | :--- |
| `📂 agent/core/` | **Core Logic**: NexusEngine, Orchestrator, semua modul inti |
| `📂 agent/tools/` | **Tools & Specialists**: Auditor, TDDGuard, Machinist, Distiller |
| `📂 agent/tools/scanners/` | **Forged Scanners**: Hanya folder ini yang boleh ditulis Machinist |
| `📂 agent/prompts/` | **The Brain**: Library Agent MD (Internal & External) |
| `📂 workflow/` | **Skill Rack**: Aturan main berbasis kategori |
| `📂 memory/distilled/` | **Smart HUB**: Knowledge yang sudah distandarisasi |
| `📂 memory/archived/` | **Backup Zone**: Versioned write backups otomatis |
| `📂 memory/short_term/` | **Cache**: Vector index & session data |
| `📂 logs/` | **Observability**: Agent logs, orchestration, errors, DLQ |
| `📂 documentation/nexus_rules/` | **Governance**: Instruksi operasional permanen |
| `📂 tests/` | **TDD Lab**: Pengujian otomatis berbasis Iron Laws |

---

## 🛠️ Cara Penggunaan

### 1. Instalasi

```bash
# Via NPM (direkomendasikan):
npx @faisal-trainer/human-ai-nexus

# Via GitHub:
npx github:Faisal-Trainer/Human-AI-Nexus

# Force update (jika sudah terinstall):
npx github:Faisal-Trainer/Human-AI-Nexus --force
```

### 2. PowerShell (Windows, tanpa Node.js):

```powershell
# Download dan jalankan installer PowerShell:
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Faisal-Trainer/Human-AI-Nexus/main/install.ps1" -OutFile "install.ps1"
.\install.ps1
```

### 3. Perintah CLI Lengkap

```bash
# ── CORE LIFECYCLE ─────────────────────────────────────────
nexus run                      # Full cycle: Audit → Plan → Execute → Record
nexus audit                    # Hanya fase Audit (scan + findings)
nexus run --mode efficient     # Mode ringkas tanpa ADIK SIMBA detail
nexus run --yes                # Auto-approve semua prompt (CI/CD mode)

# ── OBSERVABILITY ──────────────────────────────────────────
nexus status                   # 🆕 Real-time system health (CPU, RAM, agents, cycles)
nexus dlq                      # 🆕 Lihat Dead Letter Queue (task gagal permanen)

# ── KNOWLEDGE PIPELINE ─────────────────────────────────────
nexus harvest <dir>            # Panen dokumen dari proyek lain ke Golden HUB
nexus distill                  # Shelving → Hub Index → Neural Map
nexus distill --rack <name>    # Distilasi hanya pada rak tertentu (e.g. security)
nexus refactor                 # Sinkronisasi massal Golden → HUB
nexus update-skills            # Sinkronisasi massal HUB → Agent Skills

# ── AI TOOLING ─────────────────────────────────────────────
nexus forge <Name> <file.md>   # Forge scanner baru dari wisdom file (path-guarded)
nexus think <query>            # Tanya local AI (Qwen) untuk saran arsitektur
nexus review <file>            # Review kode spesifik via local AI (Qwen Coder)

# ── SANDBOX PIPELINE ───────────────────────────────────────
nexus sandbox                  # 🆕 Jalankan seluruh 100 project sandbox secara mandiri
nexus sandbox --section <1-10> # Jalankan section tertentu (e.g. Fundamental CRUD)
nexus sandbox --distill        # Jalankan + distilasi otomatis ke Golden HUB

# ── MANAGEMENT ─────────────────────────────────────────────
nexus skills                   # List semua skill yang tersedia
nexus dell                     # Lepas Nexus Engine (dokumentasi tetap aman)
nexus help                     # Tampilkan semua perintah
```

### 4. Ikuti Alur Kerja

1. **Audit** → AI memeriksa kesehatan proyek
2. **Plan** → Setujui rencana di `documentation/planning/`
3. **Execute** → AI eksekusi sesuai rencana dengan TDD enforcement
4. **Verify** → Bukti fisik diverifikasi otomatis
5. **Record** → Hasil disimpan ke `memory/` dengan versioned backup

### 5. Uninstall

```bash
nexus dell        # Hapus engine, dokumentasi tetap ada
nexus dell --yes  # Non-interactive (untuk automation)
```

---

## 🌟 Prinsip Utama

| Prinsip | Deskripsi |
|---|---|
| **Documentation-First** | Tidak ada kode tanpa rencana terdokumentasi |
| **Deep Wisdom Injection** | Setiap agent membawa workflow "buku saku" dalam system prompt |
| **Knowledge Portability** | Skill dan pengetahuan institusional ikut ter-install via `workflow/` |
| **Deterministic Contracts** | Interface data terstandar — AI bekerja konsisten |
| **Boundary by Code** | Guardrail diimplementasi sebagai `throw new Error()`, bukan hanya dokumentasi |
| **Stability Rule #1** | Satu agent gagal **TIDAK BOLEH** crash agent lain |
| **Stability Rule #2** | Satu write gagal **TIDAK BOLEH** corrupt knowledge yang sudah ada |
| **Stability Rule #3** | Sistem **HARUS** bisa melaporkan kondisi dirinya sendiri kapanpun |

---

## 🤝 Cara Berkontribusi

1. **Fork** repository ini.
2. Buat **Branch** baru (`git checkout -b feature/FiturKeren`).
3. **Commit** perubahan (`git commit -m 'feat: Menambahkan fitur keren'`).
4. **Push** ke branch (`git push origin feature/FiturKeren`).
5. Buat **Pull Request**.

---

_Dikelola oleh Faisal-Trainer & AI Assistant. Mari bangun masa depan kolaborasi Human-AI yang lebih disiplin dan stabil!_

---

_Terakhir Dioptimasi: 25/09/2026 (v3.4.0 - LLM + RAG Architecture)_
