# 🛠 ALGORITMA INTEGRASI: Human-AI Nexus

Gunakan panduan ini untuk memasukkan framework dokumentasi **Human-AI Nexus** ke dalam proyek perangkat lunak Anda.

## 📋 Langkah-Langkah (Step-by-Step)

### 1. Persiapan Folder
- Salin folder `docs/` dan file `ALGORITMA_INTEGRASI.md` ini ke direktori utama (root) proyek Anda.
- Struktur folder Anda seharusnya terlihat seperti ini:
  ```text
  Proyek-Anda/
  ├── docs/             <-- (Framework Dokumentasi)
  ├── ALGORITMA_INTEGRASI.md
  ├── README.md         <-- (README Proyek Anda)
  └── [File Proyek Anda lainnya]
  ```

### 2. Kalibrasi AI Assistant
Saat Anda memulai chat dengan AI (seperti Cursor, Claude, atau GPT), berikan perintah awal berikut:
> *"Saya menggunakan framework dokumentasi Human-AI Nexus. Silakan baca file `docs/agent/ai-assistant.md` sekarang untuk memahami aturan kerja kita. Jangan mulai menulis kode sebelum saya memberikan instruksi spesifik berdasarkan workflow tersebut."*

### 3. Penyesuaian Standar (Opsional tapi Disarankan)
- Buka folder `docs/skill/`.
- Edit file `.md` di dalamnya (seperti `cyber-security.md` atau `web-engineer.md`) untuk mencerminkan teknologi yang Anda gunakan (misal: ganti Laravel dengan Node.js/Python jika perlu).

### 4. Alur Kerja Standar (Workflow)
Setiap kali ingin menambah fitur, ikuti alur ini bersama AI:
1.  **Planning**: AI membuat rencana di `docs/planning/`.
2.  **Algorithm**: AI merancang logika di `docs/algorithms/`.
3.  **Approval**: Anda (Human) meninjau dan memberikan persetujuan (ketik: "OKE" atau "APPROVE").
4.  **Execution**: AI menulis kode program.
5.  **Recording**: AI mencatat penyelesaian di `docs/records/` dan `docs/summary/`.

## ⚠️ Aturan Emas (Golden Rules)
1. **No Documentation, No Code**: Jangan biarkan AI menulis kode sebelum ada dokumen rencana yang disetujui.
2. **Traceability**: Pastikan AI selalu merujuk pada dokumen yang sudah dibuat sebelumnya.
3. **Daily Summary**: Pastikan AI membuat rangkuman di akhir sesi kerja untuk menjaga kesinambungan konteks.

---
*Dibuat untuk memfasilitasi kolaborasi Manusia & AI yang aman dan terstruktur.*
