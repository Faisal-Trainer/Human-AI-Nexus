# 🤖 Human-AI Nexus: Documentation-First Framework

[![Quick Guide](https://img.shields.io/badge/PANDUAN-BACA%20DULU-blueviolet?style=for-the-badge)](PANDUAN_CEPAT.md)

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

Human-AI Nexus bukan sekadar kumpulan folder, melainkan sebuah **Self-Evolving Framework**. Di dalamnya terdapat **Nexus Engine** yang secara otomatis mengoordinasikan berbagai Agent AI (Orchestrator, PM, Security Specialist, dll) untuk melakukan audit, perencanaan, hingga eksekusi tugas.

Sistem ini kini dilengkapi dengan **Universal Collision Logic**, yang memungkinkan AI untuk menyimpan beberapa alternatif solusi (`IF-ELSE`) dalam satu dokumen, memungkinkan pengambilan keputusan (Decision Making) yang lebih cerdas dan kontekstual.

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

| Folder                                 | Deskripsi                                                                    |
| :------------------------------------- | :--------------------------------------------------------------------------- |
| `📂 src/core/orchestrator/`            | **Internal Logic**: Manajemen pipeline, memori, dan orkestrasi sistem.       |
| `📂 src/core/auditor/`                 | **External Specialists**: Scanner keamanan, UX, database, dan validator.     |
| `📂 nexus/`                            | **The Brain**: Berisi komponen AI (Agent & Skill) yang terpasang di proyek.  |
| `📂 documentation/`                    | **The HUB**: Folder output tim (Knowledge Hub, Audit, Planning).             |
| `📂 golden/`                           | **Central Storage**: Tempat penyimpanan hasil panen (harvest) dari proyek.    |

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

# Lokal/Alias (Jika sudah terpasang):
nexus run           # Menjalankan siklus Audit -> Plan -> Execute
nexus audit         # Hanya melakukan pemindaian (Audit)
nexus harvest <dir> # Memanen dokumen Nexus dari proyek lain ke Golden HUB
nexus distill       # [Pipeline Utama] Ingestion (Harvest) -> HUB Distillation -> Cleanup
nexus refactor      # Sinkronisasi massal dari Golden ke HUB
nexus update-skills # Sinkronisasi massal dari HUB ke Agent Skills

### 4. Uninstall (Lepas Engine)

Jika ingin melepas Nexus Engine dari proyek Anda tanpa menghapus dokumentasi:

```bash
npx github:Faisal-Trainer/Human-AI-Nexus dell
```

_Perintah ini menghapus folder `nexus/` (otak AI), namun tetap menjaga folder `documentation/` agar tetap bisa diakses oleh tim pengembang._

### 3. Ikuti Alur Kerja

1. **Audit**: Biarkan AI memeriksa kesehatan proyek Anda.
2. **Plan**: Setujui rencana yang dibuat oleh Project Manager di folder `planning/`.
3. **Execute**: Biarkan AI mengeksekusi tugas sesuai rencana.
4. **Finalize**: Simpan hasil ke dalam `records/` untuk memori jangka panjang.

---

## 🌟 Prinsip Utama

- **Documentation First**: No plan, no code.
- **Stateless Harvest**: Pipeline "Zero-Waste" di mana data sementara dibersihkan setelah masuk HUB.
- **Universal Collision Logic**: Sistem **IF { A } ELSE { B }** otomatis untuk menjaga variasi solusi.
- **Deterministic Contracts**: Standar interface data untuk menjamin AI bekerja secara konsisten.
- **Standardized Knowledge**: Seluruh HUB menggunakan pola `NEXUS_...` untuk kemudahan pengindeksan.

---

## 🤝 Cara Berkontribusi

Kami menyambut kontribusi dari siapa saja!

1. **Fork** repository ini.
2. Buat **Branch** baru untuk fitur Anda (`git checkout -b feature/FiturKeren`).
3. **Commit** perubahan Anda (`git commit -m 'Menambahkan fitur keren'`).
4. **Push** ke branch tersebut (`git push origin feature/FiturKeren`).
5. Buat **Pull Request**.

---

_Dikelola oleh Faisal-Trainer & AI Assistant. Mari bangun masa depan kolaborasi Human-AI yang lebih disiplin!_


---
_Terakhir Dioptimasi: 30/04/2026, 14.20.35_
