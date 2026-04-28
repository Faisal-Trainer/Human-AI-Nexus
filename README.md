# 🤖 Human-AI Nexus: Documentation-First Framework
[![Quick Guide](https://img.shields.io/badge/PANDUAN-BACA%20DULU-blueviolet?style=for-the-badge)](PANDUAN_CEPAT.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

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
- [🤖 Apa itu Human-AI Nexus?](#-apa-itu-human-ai-nexus)
- [🏗️ Arsitektur Sistem](#️-arsitektur-sistem)
- [📂 Struktur Folder (Organized)](#-struktur-folder-organized)
- [🛠️ Cara Penggunaan](#️-cara-penggunaan)
- [🌟 Prinsip Utama](#-prinsip-utama)
- [🤝 Cara Berkontribusi](#-cara-berkontribusi)

---

## 🤖 Apa itu Human-AI Nexus?

Human-AI Nexus bukan sekadar kumpulan folder, melainkan sebuah **Executable Framework**. Di dalamnya terdapat **Nexus Engine** yang secara otomatis mengoordinasikan berbagai Agent AI (Orchestrator, PM, Security Specialist, dll) untuk melakukan audit, perencanaan, hingga eksekusi tugas secara disiplin.

### Visi Utama
Menciptakan ekosistem pengembangan di mana AI bekerja sebagai **Tim Profesional** yang patuh pada standar kualitas manusia, bukan sekadar chatbot yang menulis kode asal-asalan.

---

## 🏗️ Arsitektur Sistem

```mermaid
graph TD
    User([User/Human]) -- Approval --> PM[Project Manager Agent]
    User -- Initial Request --> Orc[Nexus Orchestrator]
    
    subgraph "Core Engine (Executable)"
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

---

## 📂 Struktur Folder (Evolutionary Design)

| Folder | Deskripsi |
| :--- | :--- |
| `📂 agent/` | Definisi Persona AI. |
| &nbsp;&nbsp;&nbsp;&nbsp;`└─ internal/` | **Core Management**: Orchestrator, Guru, Crawler, Memory Architect (Internal Nexus). |
| &nbsp;&nbsp;&nbsp;&nbsp;`└─ external/` | **Dev Tools**: Engineering, Creative, Security, Business (Diinstal untuk pengembang). |
| `📂 skill/` | Modul spesialisasi teknis AI. |
| &nbsp;&nbsp;&nbsp;&nbsp;`└─ internal/` | **Nexus Skills**: Pipeline management, pattern recognition, teacher skills. |
| &nbsp;&nbsp;&nbsp;&nbsp;`└─ external/` | **Project Skills**: Frontend, Backend, Devops, QA, Testing Standards (Wise skills). |
| `📂 knowledge/` | **The HUB**: Memori jangka panjang & standar "Emas" (Single Source of Truth). |
| `📂 audit/` | Laporan audit hasil scanning project oleh Agent. |
| `📂 planning/` | Rencana pengembangan fase demi fase. |
| `📂 records/` | Laporan penyelesaian fitur (History pengembangan). |
| `📂 algorithms/` | Logika fitur dan algoritma sebelum diimplementasikan ke kode. |
| `📂 legal/` | Dokumen hukum (Privacy Policy & Terms of Service). |

---

## 🛠️ Cara Penggunaan

### 1. Instalasi
Gunakan perintah otomatis via `npx` (direkomendasikan):
```bash
# Jika sudah publish ke npm:
npx @faisal-trainer/human-ai-nexus

# Atau jalankan langsung dari GitHub (Jika belum publish):
npx github:Faisal-Trainer/Human-AI-Nexus
```
Atau copy seluruh folder framework ini secara manual ke dalam root proyek Anda.

> **Tip**: Untuk memperbarui framework yang sudah terinstall tanpa menghapusnya, gunakan flag `--force`:
> `npx github:Faisal-Trainer/Human-AI-Nexus --force`

### 3. Jalankan Engine
Jalankan perintah berikut di terminal:
```bash
# Via GitHub (Direkomendasikan jika belum publish):
npx github:Faisal-Trainer/Human-AI-Nexus nexus run

# Via NPM (Jika sudah publish):
npx @faisal-trainer/human-ai-nexus nexus run
```
*(Atau `npm start` jika Anda sedang berada di dalam folder source framework)*

### 4. Uninstall (Lepas Engine)
Jika ingin melepas Nexus Engine dari proyek Anda tanpa menghapus dokumentasi:
```bash
npx github:Faisal-Trainer/Human-AI-Nexus dell
```
*Perintah ini hanya menghapus folder `agent/` dan `skill/` (otak AI), namun tetap menjaga seluruh folder `audit/`, `planning/`, dan `knowledge/` agar tetap bisa dibaca oleh tim pengembang.*

### 3. Ikuti Alur Kerja
1. **Audit**: Biarkan AI memeriksa kesehatan proyek Anda.
2. **Plan**: Setujui rencana yang dibuat oleh Project Manager di folder `planning/`.
3. **Execute**: Biarkan AI mengeksekusi tugas sesuai rencana.
4. **Finalize**: Simpan hasil ke dalam `records/` untuk memori jangka panjang.

---

## 🌟 Prinsip Utama
- **Documentation First**: No plan, no code.
- **Zero Flaws Enforcement**: Audit berulang hingga mencapai kualitas maksimal.
- **Security Guardrails**: Izin eksplisit untuk scan file sensitif (.env, dll).
- **User Final Authority**: Manusia adalah pemegang keputusan tertinggi.

---

## 🤝 Cara Berkontribusi

Kami menyambut kontribusi dari siapa saja!
1. **Fork** repository ini.
2. Buat **Branch** baru untuk fitur Anda (`git checkout -b feature/FiturKeren`).
3. **Commit** perubahan Anda (`git commit -m 'Menambahkan fitur keren'`).
4. **Push** ke branch tersebut (`git push origin feature/FiturKeren`).
5. Buat **Pull Request**.

---
*Dikelola oleh Faisal-Trainer & AI Assistant. Mari bangun masa depan kolaborasi Human-AI yang lebih disiplin!*
