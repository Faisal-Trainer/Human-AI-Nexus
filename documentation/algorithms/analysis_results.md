# 🔍 Analisis: `agent/prompts/internal/`

## Ringkasan Statistik

| Metric | Nilai |
|---|---|
| Total file | **141** |
| Total ukuran | **5.8 MB** |
| File stub (< 1KB, hampir kosong) | **35 file** (25%) |
| File raksasa (> 100KB) | **8 file** (total ~2.1 MB, 36% dari total) |
| File medium (1KB - 100KB) | **98 file** |

---

## 🔴 Masalah #1: 35 File "Stub" yang Tidak Berguna

25% dari seluruh prompts Anda hanya berisi template kosong seperti ini:

```markdown
# ROLE: WASM SPECIALIST
Anda bertindak sebagai wasm-specialist untuk ekosistem Nexus AI.
## 1. Identitas & Batasan Utama
- **Role**: wasm-specialist
- **Fokus Utama**: WebAssembly integration
*Status: Verified for Internal Infrastructure (Phase 3)*
```

Ini hanya ~265 bytes. **Tidak ada instruksi, tidak ada konteks, tidak ada value.** AI yang memuat prompt ini tidak akan tahu harus berbuat apa.

### Daftar 35 File Stub
`wasm-specialist`, `sms-specialist`, `nik-ktp-validator`, `graphql-specialist`, `pajak-specialist`, `jwt-specialist`, `npm-package-specialist`, `two-factor-specialist`, `bundle-optimizer`, `raja-ongkir-specialist`, `currency-formatter`, `hallucination-detector`, `ssl-domain-specialist`, `pwa-specialist`, `readme-generator`, `smtp-delivery-specialist`, `composer-package-specialist`, `factory-seeder-specialist`, `artisan-command-specialist`, `alpinejs-specialist`, `filament-specialist`, `shared-hosting-specialist`, `meta-agent-evaluator`, `agent-routing-optimizer`, `filament-plugin-specialist`, `failure-recovery-specialist`, `spatie-ecosystem-specialist`, `skill-gap-detector`, `bahasa-indonesia-specialist`, `knowledge-indexer`, `knowledge-validator`, `knowledge-updater`, `knowledge-distillation-agent`, `environment-manager`, `changelog-manager`

> [!WARNING]
> **Saran**: Pindahkan 35 file ini ke subfolder `agent/prompts/internal/_stubs/` atau hapus sepenuhnya. Mereka hanya menambah noise dan memperlambat proses scanning `update-skills`.

---

## 🔴 Masalah #2: 8 File Raksasa (100KB–293KB)

File-file ini berukuran sangat besar karena mengandung **duplikasi masif** dari Governance Rules yang di-*inline* ke setiap file:

| File | Size | Lines |
|---|---|---|
| `orchestrator.md` | 286 KB | 8,383 |
| `pipeline-architect.md` | 283 KB | ~8,200 |
| `guru.md` | 276 KB | 8,731 |
| `seo-performance-specialist.md` | 270 KB | ~8,000 |
| `looping-tester.md` | 268 KB | ~8,000 |
| `database-architect.md` | 267 KB | ~8,000 |
| `cyber-security.md` | 266 KB | ~8,000 |
| `vcs-architect.md` | 266 KB | ~8,000 |

Dari yang saya baca, setiap file ini mengandung blok **identik** yang sangat besar:

```markdown
## 🏛️ NEXUS GOVERNANCE & HARD BOUNDARIES (Institutionalized)
### 📜 RULE: BASH_COMMANDS.md
### 📜 RULE: DEV_COMMANDS.md
### 📜 RULE: INTERNAL_WORKFLOW.md
### 📜 RULE: NEXUS INTERNAL CORE — HARD BOUNDARY ...
### 📜 RULE: NEXUS eksternal boundary.md
```

Blok Governance ini saja memakan **~250KB per file** dan **identik** di semua 8 file. Artinya ada **~2 MB duplikasi murni**.

> [!WARNING]
> **Saran**: Ekstrak blok Governance ke satu file terpisah (`agent/prompts/internal/_shared/governance.md`) lalu referensikan saja dari setiap prompt. Ini akan memangkas ukuran dari ~286KB menjadi ~40KB per file dan menghilangkan ~2MB duplikasi.

---

## 🟡 Masalah #3: Tidak Ada Organisasi / Subfolder

141 file di-*dump* semua dalam satu folder datar. Ini menyulitkan navigasi dan maintenance. 

> [!TIP]
> **Saran**: Kelompokkan berdasarkan domain, misalnya:
> ```
> agent/prompts/internal/
> ├── _shared/           # Governance rules, common blocks
> ├── _stubs/            # Placeholder prompts (belum diisi)
> ├── core/              # orchestrator, guru, pipeline-architect, machinist
> ├── laravel/           # laravel-*, livewire-*, blade-*, sanctum-*, etc.
> ├── testing/           # pest-php, e2e-testing, looping-tester, mutation-testing
> ├── infrastructure/    # docker-*, nginx-*, github-actions, monitoring-*
> ├── security/          # cyber-security, oauth-*, security-code-scanner
> ├── knowledge/         # knowledge-*, memory-*, golden-crawler
> ├── frontend/          # tailwind-*, alpinejs-*, web-components, pwa-*
> ├── payment/           # midtrans-*, rupiah-payment, subscription-*
> └── ai-meta/           # prompt-engineer, llm-orchestrator, token-budget-*
> ```

---

## 🟡 Masalah #4: Duplikasi Fungsional

Beberapa file memiliki domain yang sangat mirip atau bahkan tumpang tindih:

| Kelompok | File yang Tumpang Tindih |
|---|---|
| Media | `media-library-specialist`, `media-manager-specialist`, `image-optimization-agent` |
| Email | `email-template-specialist`, `responsive-email-specialist`, `smtp-delivery-specialist` |
| State | `client-state-specialist`, `server-state-specialist`, `caching-state-manager` |
| Prompt | `prompt-engineer`, `prompt-optimizer-agent`, `prompt-ab-tester` |
| Output | `output-validator`, `output-consistency-checker`, `output-diff-analyzer` |

> [!TIP]
> **Saran**: Merge file-file yang tumpang tindih menjadi satu prompt yang lebih komprehensif. Misalnya `media-library-specialist` + `media-manager-specialist` → `media-specialist.md`.

---

## 📊 Ringkasan Saran

| # | Aksi | Dampak |
|---|---|---|
| 1 | Pindahkan 35 stub ke `_stubs/` | Bersihkan noise, hemat waktu scan |
| 2 | Ekstrak Governance ke `_shared/governance.md` | Hemat **~2MB** duplikasi |
| 3 | Buat subfolder berdasarkan domain | Navigasi & maintenance lebih mudah |
| 4 | Merge prompts yang tumpang tindih | Kurangi dari 141 → ~90 file efektif |

> [!IMPORTANT]
> Apakah Anda ingin saya langsung mengeksekusi saran-saran di atas? Atau ada prioritas tertentu yang ingin dikerjakan dulu?
