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
