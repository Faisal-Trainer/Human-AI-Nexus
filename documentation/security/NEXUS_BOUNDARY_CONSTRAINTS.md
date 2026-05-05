# NEXUS BOUNDARY CONSTRAINTS (Project Level)

Dokumen ini berisi batasan operasional mutlak yang ditetapkan oleh USER untuk project ini. AI Assistant WAJIB mematuhi aturan ini tanpa pengecualian.

## ⚠️ Batasan Operasional (Golden Rules)

### 1. Larangan Penghapusan Dokumentasi
- **Instruksi**: Seluruh isi folder `documentation/` (termasuk sub-folder `algorithms`, `audit`, `design`, `knowledge`, `planning`, `records`, `summary`) **TIDAK BOLEH DIHAPUS**.
- **Konteks**: Menjaga integritas data dan riwayat pengembangan proyek.

### 2. Larangan Distilasi (No Distillation)
- **Instruksi**: Proses **Distillation** (penyulingan/penggabungan pengetahuan) **DILARANG** dilakukan di dalam folder project ini.
- **Konteks**: Distilasi hanya diperbolehkan untuk dilakukan di **Folder Utama Nexus (Core)**, bukan pada implementasi Nexus di folder project individual.
- **Tujuan**: Memastikan data di level project tetap dalam bentuk aslinya (raw/expanded) agar bisa dipindahkan ke folder utama Nexus oleh USER nantinya.

### 3. Proteksi File Sensitif
- **Instruksi**: AI Assistant **DILARANG** membuka atau membaca isi file sensitif berikut:
    - `.env`
    - `composer.json` & `composer.lock`
    - `package.json` & `package-lock.json`
    - `auth.json`
    - `storage/logs/` (seluruh isi folder log)
    - `storage/*.key` (kunci enkripsi/auth)
    - `.git/` (seluruh riwayat repositori)
- **Pengecualian**: Akses hanya diperbolehkan jika USER memberikan ijin eksplisit dalam pesan saat itu untuk satu kali aksi spesifik (one-time approval).
- **Tujuan**: Menjaga kerahasiaan konfigurasi, kunci API, dan struktur dependensi mendalam kecuali benar-benar diperlukan.

---
*Status: PERMANENT CONSTRAINT | Terdaftar: 2026-05-03*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, ui-ux, database, vcs]
