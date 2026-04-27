# 🛠 ALGORITMA INTEGRASI: Human-AI Nexus

Gunakan panduan ini untuk memasukkan framework dokumentasi **Human-AI Nexus** ke dalam proyek perangkat lunak Anda.

## 📋 Langkah-Langkah (Step-by-Step)

### 1. Persiapan Folder
- Salin folder `nexus/` dan file `ALGORITMA_INTEGRASI.md` ini ke direktori utama (root) proyek Anda.
- Struktur folder Anda seharusnya terlihat seperti ini:
  ```text
  Proyek-Anda/
  ├── nexus/            <-- (Framework Dokumentasi)
  ├── ALGORITMA_INTEGRASI.md
  ├── README.md         <-- (README Proyek Anda)
  └── [File Proyek Anda lainnya]
  ```

### 2. Kalibrasi AI Assistant
Saat Anda memulai chat dengan AI (seperti Cursor, Claude, atau GPT), berikan perintah awal berikut:

> "Saya menggunakan framework **Human-AI Nexus**. Tolong baca aturan main di `nexus/agent/ai-assistant.md`, lalu panggil **Nexus Orchestrator** untuk memulai audit project."

### 3. Alur Kerja Utama (Nexus Workflow)
Setiap kali ingin memulai pengembangan atau pemeliharaan, ikuti alur ini:

1. **Audit Phase**: User meminta `Orchestrator` melakukan audit. Agent spesialis akan menscan project dan menulis temuan ke `nexus/audit/`.
2. **Review & Planning**: `Project Manager (PM)` meninjau hasil audit, membuat dokumen di `nexus/planning/`, dan menyarankan Agent yang cocok untuk tugas tersebut.
3. **Approval**: Anda (Human) meninjau Planning dan Agent yang disarankan. Berikan persetujuan (ketik: "OKE" atau "APPROVE").
4. **Execution**: `Orchestrator` membagi tugas ke Agent spesialis dan memastikan eksekusi berjalan tanpa konflik.
5. **Recursive Audit Loop**: Setelah eksekusi, PM memicu audit ulang. Jika ditemukan cacat, dilakukan simulasi **Security War Games** (Red vs Blue Team) hingga mencapai status **Zero Flaws**.
6. **Finalization**: AI mencatat penyelesaian di `nexus/records/`, mengupdate memori di `nexus/knowledge/`, dan membuat rangkuman di `nexus/summary/`.

### 4. Penyesuaian Standar (Opsional)
- Buka folder `nexus/skill/`.
- Edit file `.md` di dalamnya untuk menyesuaikan dengan stack teknologi yang Anda gunakan.

## ⚠️ Aturan Emas (Golden Rules)
1. **No Documentation, No Code**: Jangan biarkan AI menulis kode sebelum ada dokumen rencana yang disetujui.
2. **Traceability**: Pastikan AI selalu merujuk pada dokumen yang sudah dibuat sebelumnya.
3. **Daily Summary & Knowledge Update**: Pastikan AI membuat rangkuman dan mengupdate folder `nexus/knowledge/` agar pelajaran berharga tersimpan permanen.
4. **Zero Flaws Enforcement**: Jangan menghentikan sesi pengembangan sebelum audit menyatakan "Zero Flaws" sesuai [Standar Konkret](STANDAR_ZERO_FLAWS.md).

---
*Dibuat untuk memfasilitasi kolaborasi Manusia & AI yang aman dan terstruktur.*
