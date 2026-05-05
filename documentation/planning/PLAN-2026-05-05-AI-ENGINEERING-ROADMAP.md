# 📅 NEXUS PLANNING: AI Engineering Optimization Roadmap (2026-05-05)
**Berdasarkan**: `documentation/audit/AI_ENGINEERING_AUDIT_2026-05-05.md`
**Prioritas**: Bertahap dari Kritis → Struktural → Performa → Roadmap

---

## 🔴 TAHAP 1 — Kritis (Target: Sesi Berikutnya)

### Plan 1.1: Rolling Archive — Anti-Bloat Memory
- **File Target**: `agent/core/MemoryPipeline.js`
- **Perubahan**: Tambah threshold check (>100 KB) sebelum `appendFile()`
- **Output Baru**: `SESSION_HISTORY_ARCHIVE_2.md`, `SESSION_HISTORY_ARCHIVE_3.md` dst.
- **State Counter**: `memory/short_term/archive_index.json`
- **DoD**: File archive tidak pernah melebihi 100 KB
- [ ] Implementasi `checkAndRotateArchive()` method
- [ ] Test rotasi dengan file simulasi

---

### Plan 1.2: Test Suite Minimal
- **File Target**: `tests/TDD/` (3 file baru)
- **Gunakan**: `TDDScaffolder.js` untuk generate skeleton
- **Test Cases**:
  - `distiller.test.js` — test `applySemanticTagging()` & `distillAcademics()`
  - `nexus-engine.test.js` — test `wrapAsConditional()` dengan similarity tinggi/rendah
  - `similarity.test.js` — test `calculateSimilarity()` dengan edge cases
- **Update**: `package.json` scripts.test → `node tests/TDD/runner.js`
- **DoD**: `npm test` menjalankan dan semua test PASS
- [ ] Generate skeleton via TDDScaffolder
- [ ] Tulis assertion nyata
- [ ] Verifikasi `npm test` berjalan

---

### Plan 1.3: Sinkronisasi `package.json`
- **File Target**: `package.json`
- **Perubahan**:
  - `"version"`: `"2.2.1"` → `"3.0.0"`
  - `"main"`: `"src/index.js"` → `"cli.js"`
  - `"scripts.test"`: tambah runner yang nyata
- **DoD**: `node -e "require('./cli.js')"` tidak error
- [ ] Update version & main path
- [ ] Add `nexus forge` ke engineCommands list di cli.js

---

## 🟠 TAHAP 2 — Struktural (Target: Sprint Berikutnya)

### Plan 2.1: Split Distillation per Kategori Semantik
- **File Target**: `agent/core/Distiller.js` → `distillAcademics()`
- **Logika Baru**:
  1. Baca tag semantik setiap file jurnal
  2. Routing ke file distilasi yang sesuai berdasarkan tag
  3. Hapus `NEXUS_ACADEMIC_DISTILLATION.md` monolitik
- **Output**:
  - `NEXUS_DISTILLATION_COLOR.md`
  - `NEXUS_DISTILLATION_UX.md`
  - `NEXUS_DISTILLATION_SEO.md`
  - `NEXUS_DISTILLATION_SECURITY.md`
  - `NEXUS_DISTILLATION_OTHER.md` (fallback)
- **DoD**: File terbesar di HUB < 30 KB setelah split
- [ ] Refactor routing logic
- [ ] Migrasi konten dari file monolitik lama
- [ ] Update referensi di cross-links

---

### Plan 2.2: Persisten BugHunter State
- **File Target**: `agent/tools/BugHunter.js`
- **Perubahan**:
  - Constructor: load `memory/short_term/bug_attempts.json`
  - `trackAttempt()`: save ke JSON setelah update
  - `reset()`: hapus entry dari JSON
- **DoD**: State "3 Perbaikan" bertahan antar restart Node.js
- [ ] Implementasi load/save JSON
- [ ] Test lintas sesi

---

### Plan 2.3: Post-Forge Injection di Machinist
- **File Target**: `agent/core/Machinist.js` → `getScannerTemplate()`
- **Logika Baru**:
  1. Parse Actionable Steps menjadi array rules
  2. Untuk setiap rule, generate regex check di dalam `scan()`
  3. Hasilkan finding `WARNING` jika pattern ditemukan di codebase
- **DoD**: Mesin yang di-forge menghasilkan minimal 1 finding non-trivial saat dijalankan di proyek yang berisi pola relevan
- [ ] Upgrade `getScannerTemplate()`
- [ ] Test Forge + Scan end-to-end

---

## 🟡 TAHAP 3 — Performa (Target: Optimasi Berkala)

### Plan 3.1: Selective Linking (Timestamp Cache)
- **File Target**: `agent/core/Distiller.js` → `applySemanticLinking()`
- **Perubahan**:
  - Load cache dari `memory/short_term/link_cache.json`
  - Skip file jika `mtime <= last_linked_at`
  - Update cache setelah linking
- **DoD**: Waktu eksekusi `distill` berkurang >70% pada HUB yang matang
- [ ] Implementasi cache load/save
- [ ] Benchmark sebelum dan sesudah

---

### Plan 3.2: `nexus forge` Command
- **File Target**: `agent/main.js` & `cli.js`
- **Perubahan**:
  - Tambah `case 'forge'` di switch `main()`
  - Daftarkan di `engineCommands[]` di `cli.js`
  - Tambah di output `nexus help`
- **Usage**: `nexus forge BrandingScanner memory/long_term/NEXUS_ACADEMIC_DISTILLATION.md`
- **DoD**: `nexus forge <name> <file>` menghasilkan scanner file baru
- [ ] Tambah case ke main.js
- [ ] Tambah ke engineCommands di cli.js
- [ ] Update nexus help text

---

### Plan 3.3: Hub Index Generator
- **File Target**: `agent/core/Distiller.js` → tambah `generateHubIndex()`
- **Output**: `memory/long_term/NEXUS_HUB_INDEX.md`
- **Format**: Tabel Markdown (Nama | Ukuran | Tags | Last Updated)
- **Trigger**: Dijalankan otomatis di akhir `Distiller.run()`
- **DoD**: File index tersedia dan selalu up-to-date setelah `distill`
- [ ] Implementasi method
- [ ] Integrasi ke `run()`
- [ ] Verifikasi output format

---

## 🔵 TAHAP 4 — Roadmap (Target: Versi Masa Depan)

| ID | Item | Deskripsi |
|---|---|---|
| 4.1 | Knowledge Versioning | Header `VERSION: v1` auto-increment di setiap file HUB |
| 4.2 | Auto-TDD Forged Machines | `Machinist.forge()` otomatis panggil `TDDScaffolder` |
| 4.3 | Neural Map Generator | Generate Mermaid diagram dari seluruh cross-link HUB |

---

## ✅ Checklist Master

- [ ] **Tahap 1.1** — Rolling Archive
- [ ] **Tahap 1.2** — Test Suite
- [ ] **Tahap 1.3** — package.json sync
- [ ] **Tahap 2.1** — Split Distillation
- [ ] **Tahap 2.2** — BugHunter Persisten
- [ ] **Tahap 2.3** — Post-Forge Injection
- [ ] **Tahap 3.1** — Selective Linking
- [ ] **Tahap 3.2** — nexus forge CLI
- [ ] **Tahap 3.3** — Hub Index Generator
- [ ] **Tahap 4.1** — Knowledge Versioning
- [ ] **Tahap 4.2** — Auto-TDD Forged
- [ ] **Tahap 4.3** — Neural Map

---
**STATUS: MENUNGGU PERSETUJUAN PER TAHAP**
**Referensi Audit**: `documentation/audit/AI_ENGINEERING_AUDIT_2026-05-05.md`
