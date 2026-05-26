# NEXUS — Multi-Agent Stabilization Plan
> **VERSION**: v2 | **Last Updated**: 26/05/2026


## Final Output Planning (Loop Scan Result)

> **Target Akhir:** Stable Multi-Agent Framework
> **Bukan:** AGI / Autonomous Intelligence / Self-Evolving System
> **Tanggal Scan:** 2026-05-07

---

## Scan Result Summary

| Area | Status Saat Ini | Gap |
| ---- | -------------- | --- |
| Core Engine (NexusEngine.js) | Ada, berfungsi | Direct invocation, belum Event Bus |
| Contract System | Ada (2 kontrak) | Belum Universal Task Protocol |
| Memory Layer | long_term / short_term | Belum granular (raw/normalized/semantic) |
| Agent Workflows | Folder kosong | Belum ada agent workflow terdefinisi |
| Logging | Tidak ada logs/ folder | Belum observability standard |
| Plugin/Scanner | Ada di agent/tools/ | Belum ada sandbox isolation |
| Orchestration | NexusEngine langsung calls tools | Belum ada event-driven layer |
| Agent Isolation | Mixed (engine = orchestrator + runner) | Belum strict boundary |

---

# PHASE 1 — Agent Contract & Isolation

> **Tujuan:** Setiap agent memiliki boundary yang jelas dan kontrak yang ketat.

## 1.1 Universal Task Protocol

Buat `agent/core/TaskProtocol.js` sebagai standar komunikasi universal:

```json
{
  "task_id": "UUID",
  "agent": "agent_name",
  "priority": "low | normal | high | critical",
  "input": {},
  "context": {},
  "status": "pending | running | done | failed",
  "timestamp": "ISO8601",
  "timeout_ms": 30000
}
```

**File yang perlu dibuat:**
- `agent/core/TaskProtocol.js` — definisi dan validator protokol
- Update semua scanner di `agent/tools/scanners/` untuk menggunakan protokol ini

---

## 1.2 Agent Boundary Enforcement

Setiap agent di `agent/tools/` wajib memiliki manifest:

```json
{
  "name": "cyber-security",
  "responsibility": "Scan keamanan dan autentikasi",
  "allowed_inputs": ["targetPath"],
  "allowed_outputs": ["findings[]"],
  "permissions": ["read_files"],
  "execution_scope": "agent/tools/scanners/",
  "timeout_ms": 30000
}
```

**File yang perlu dibuat:**
- `agent/tools/scanners/manifest.json` — manifest untuk semua scanner
- `agent/tools/manifest.json` — manifest untuk semua tools

---

## 1.3 Agent Role Isolation (Pisahkan NexusEngine)

Saat ini `NexusEngine.js` merangkap: Orchestrator + Runner + Memory + Logging.
Ini melanggar Single Responsibility Principle.

**Pemisahan yang diperlukan:**

```text
agent/core/
├── NexusEngine.js        → HANYA Lifecycle Controller (audit → plan → execute → verify)
├── Orchestrator.js       → Baru: Koordinasi antar agent, routing task
├── Contract.js           → Existing: Kontrak data (perlu diperluas)
├── TaskProtocol.js       → Baru: Universal task schema & validator
├── MemoryPipeline.js     → Existing: OK, tapi perlu event hooks
├── Machinist.js          → Existing: Forge/build capability
└── Distiller.js          → Existing: Knowledge distillation
```

---

# PHASE 2 — Memory Governance

> **Tujuan:** Memory menjadi single source of truth dengan konsistensi penuh.

## 2.1 Restrukturisasi Memory Folder

Ubah dari:
```text
memory/
├── long_term/
└── short_term/
```

Menjadi:
```text
memory/
├── raw/          ← input mentah, belum diproses
├── normalized/   ← data yang sudah dibersihkan & diformat
├── semantic/     ← index semantik berdasarkan tag
├── distilled/    ← knowledge final yang sudah diverifikasi (pindah dari long_term)
├── operational/  ← data kerja aktif (pindah dari short_term)
└── archived/     ← history lama (SESSION_HISTORY_ARCHIVE)
```

**Catatan:** `memory/long_term/` (berisi NEXUS_HUB_INDEX.md) → pindah ke `memory/distilled/`

---

## 2.2 Memory Validation Layer

Tambahkan validasi wajib sebelum data masuk ke memori:

**Fitur yang harus ada:**
- Checksum validation (hash setiap file untuk deteksi perubahan)
- Versioning (setiap update memiliki nomor versi)
- Conflict detection (cegah duplicate semantic yang bertentangan)
- Rollback support (bisa kembali ke versi sebelumnya)
- Memory audit logs (setiap mutasi memori tercatat)

**File yang perlu dibuat:**
- `agent/core/MemoryGovernor.js` — layer validasi memori

---

## 2.3 Selesaikan Collision di Workflow

`workflow/internal/nexus-pipeline.md` masih memiliki konflik `IF { } ELSE { }` yang belum diselesaikan.

**Aksi:** Merge kedua opsi menjadi satu dokumen final yang bersih.

---

# PHASE 3 — Orchestration Hardening

> **Tujuan:** Orkestrasi deterministik, tidak ada direct coupling antar agent.

## 3.1 Event Bus Architecture

Ganti direct invocation di `NexusEngine.js` dengan event-driven pattern:

```text
SEBELUM:
NexusEngine → langsung panggil SchemaGuard, QueryOptimizer, Scanner

SESUDAH:
NexusEngine → emit event → EventBus → route ke agent yang tepat
```

**Event yang didefinisikan:**

```text
AUDIT_REQUESTED
AGENT_TASK_ASSIGNED
AGENT_TASK_COMPLETED
AGENT_TASK_FAILED
MEMORY_UPDATE_REQUESTED
SCANNER_TRIGGERED
SCANNER_FINISHED
PLAN_GENERATED
EXECUTION_STARTED
EXECUTION_COMPLETED
CYCLE_FINISHED
```

**File yang perlu dibuat:**
- `agent/core/EventBus.js` — publisher/subscriber sederhana
- Update `NexusEngine.js` untuk emit event, bukan direct call

---

## 3.2 Retry Logic & Failure Handling

Setiap agent execution wajib memiliki:

```text
- timeout (sudah ada di beberapa tempat, perlu distandarisasi)
- max retry: 3x
- fallback action saat gagal (log + skip vs halt)
- crash isolation (1 agent gagal tidak crash seluruh cycle)
```

---

## 3.3 Pengisian Agent Workflows

Folder `agent/workflows/internal/` dan `agent/workflows/external/` **kosong**.

**Isi yang perlu dibuat:**

```text
agent/workflows/internal/
├── audit-[workflow.md](../standards/NEXUS_WORKFLOW.MD)       ← alur audit standar
├── planning-[workflow.md](../standards/NEXUS_WORKFLOW.MD)    ← alur planning dari audit result
└── execution-[workflow.md](../standards/NEXUS_WORKFLOW.MD)   ← alur eksekusi task

agent/workflows/external/
├── harvest-[workflow.md](../standards/NEXUS_WORKFLOW.MD)     ← alur harvest dari external project
└── distribution-[workflow.md](../standards/NEXUS_WORKFLOW.MD) ← alur distribusi hasil
```

---

# PHASE 4 — Plugin & Scanner Isolation

> **Tujuan:** Scanner dan plugin tidak bisa merusak core system.

## 4.1 Plugin Manifest System

Setiap scanner di `agent/tools/scanners/` wajib memiliki manifest:

```json
{
  "name": "cyber-security",
  "version": "1.0.0",
  "permissions": ["read_files"],
  "entrypoint": "cyber-security.js",
  "execution_timeout": 30000,
  "output_schema": "findings[]"
}
```

**File yang perlu dibuat:**
- `agent/tools/scanners/manifest.json`

---

## 4.2 Execution Sandbox

Scanner dan forged tools WAJIB dijalankan dalam execution context yang terisolasi.

**Aturan ketat:**
- Scanner tidak boleh menulis ke `agent/core/`
- Scanner tidak boleh memodifikasi `memory/distilled/`
- Scanner tidak boleh self-register permission baru
- Output scanner HANYA boleh berupa `findings[]` array

**File yang perlu dibuat:**
- `agent/core/SandboxExecutor.js` — wrapper eksekusi terisolasi

---

# PHASE 5 — Logging & Observability

> **Tujuan:** Setiap event dan mutasi sistem tercatat dengan standar yang konsisten.

## 5.1 Dedicated Logging Structure

Buat folder logs/ yang terdedikasi:

```text
logs/
├── agents/         ← log per agent execution
├── orchestration/  ← log siklus orchestration
├── memory/         ← log mutasi memori
├── scanners/       ← log hasil scanner
├── plugins/        ← log forged plugin execution
└── errors/         ← centralized error log
```

---

## 5.2 Mandatory Log Fields

Setiap log entry wajib memiliki:

```json
{
  "timestamp": "ISO8601",
  "level": "INFO | WARNING | ERROR | CRITICAL",
  "agent": "agent_name",
  "task_id": "UUID",
  "duration_ms": 0,
  "event": "event_name",
  "message": "human readable",
  "metadata": {}
}
```

**File yang perlu dibuat:**
- `agent/core/Logger.js` — centralized logger dengan struktur standar

---

# PHASE 6 — Core vs Capability Split

> **Tujuan:** Pemisahan tegas antara sistem inti yang protected dan lapisan kapabilitas yang extensible.

## 6.1 Pembagian Zona

```text
CORE (protected — tidak boleh dimodifikasi oleh forged tools):
agent/core/
├── NexusEngine.js
├── Orchestrator.js       ← baru
├── EventBus.js           ← baru
├── Contract.js
├── TaskProtocol.js       ← baru
├── MemoryGovernor.js     ← baru
├── SandboxExecutor.js    ← baru
├── Logger.js             ← baru
└── MemoryPipeline.js

CAPABILITY LAYER (extensible — boleh ditambah/dimodifikasi):
agent/tools/
├── scanners/
└── [tool files]
```

---

# Urutan Implementasi (Priority Order)

```text
URGENT (Phase 1 & 5 dulu):
1. TaskProtocol.js          ← foundation komunikasi antar agent
2. Logger.js                ← observability sebelum apapun dieksekusi
3. logs/ folder structure   ← tempat log ditulis

PENTING (Phase 2 & 3):
4. MemoryGovernor.js        ← stabilkan memori sebelum scale
5. EventBus.js              ← decoupling orchestration
6. Restrukturisasi memory/  ← folder governance
7. Selesaikan collision di nexus-pipeline.md

PELENGKAP (Phase 4 & 6):
8. SandboxExecutor.js       ← keamanan plugin
9. manifest.json scanner    ← deklarasi permission
10. Isi agent/workflows/    ← dokumentasi alur kerja
```

---

# Definition of Done — "Multi-Agent Stabil"

Sistem dianggap **STABIL** jika semua kondisi ini terpenuhi:

```text
✅ Setiap agent memiliki contract yang jelas (input/output/permission)
✅ Semua komunikasi antar agent melalui TaskProtocol
✅ Orchestrator tidak memanggil agent secara langsung (via EventBus)
✅ Memory memiliki validasi dan versioning
✅ Setiap eksekusi tercatat di logs/ dengan format standar
✅ Scanner tidak bisa merusak core system (sandbox)
✅ 1 agent gagal tidak menghentikan seluruh cycle
✅ Semua agent workflow terdokumentasi di agent/workflows/
```

---

# Final Technical Positioning

```text
NEXUS = Modular Semantic Multi-Agent Framework
Target: Stable Multi-Agent Orchestration
Bukan: AGI / Autonomous Runtime / Self-Evolving System
```

---

*Generated via Loop Scan | Scan Date: 2026-05-07 | Version: 1.0*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, vcs, api]
