# ⚙️ Alur Kerja Tim Internal: Human-AI Nexus (Protocol v2.2)

Dokumen ini mengatur protokol operasional untuk ekspansi pengetahuan dan pemeliharaan sistem Nexus.

---

## ⚡ 1. Protokol: "Mass Refactor" (Golden ➔ HUB)
**Deskripsi**: Proses pembersihan dan integrasi pengetahuan skala besar dari folder `golden/` ke pusat memori (HUB).

*   **Trigger**: Perintah User ("Mass Refactor").
*   **Aktor**: `Golden Crawler` & `Memory Architect`.
*   **Algoritma Kerja**:
    1.  **Deep Batch Scan**: Memindai seluruh file jurnal, riset, dan pola di `golden/` tanpa kecuali.
    2.  **Universal Collision Logic**: Jika ditemukan kesamaan antara isi Golden dan HUB, wajib menerapkan format:
        `IF { Hub_Knowledge } ELSE { Golden_New_Insight }`
    3.  **Integration**: Pembaruan dokumen HUB secara massal untuk mencakup seluruh temuan baru.

---

## ⚡ 2. Protokol: "Mass Update" (HUB ➔ Skill)
**Deskripsi**: Proses transformasi seluruh standar dokumentasi di HUB menjadi keahlian teknis (Skills) bagi Agen Spesialis.

*   **Trigger**: Perintah User ("Mass Update").
*   **Aktor**: `Nexus Guru`.
*   **Algoritma Kerja**:
    1.  **Full Brain Sync**: Guru memindai seluruh perubahan terbaru di folder `knowledge/`.
    2.  **Actionable Refactor**: Mengubah prinsip abstrak menjadi instruksi operasional di folder `skill/`.
    3.  **Collision Resolution (Skill-level)**: Jika update Skill bertabrakan dengan pola lama, wajib menggunakan format:
        `IF { Legacy_Skill } ELSE { New_Hub_Skill }`

---

## ⚡ 3. Protokol: "Update Engine" (Nexus Maintenance)
**Deskripsi**: Penyesuaian perangkat lunak inti (Engine) dan instruksi dasar Agen Nexus terhadap fitur atau teknologi baru.

*   **Trigger**: Kebutuhan integrasi fitur baru (misal: if-else logic baru).
*   **Algoritma Kerja**:
    1.  **NexusEngine Adjustment**: Modifikasi kode di `src/core/NexusEngine.js` untuk mendukung fitur baru dan pemetaan folder `documentation/`.
    2.  **Internal Brain Tuning**: Memperbarui file `.md` di folder `agent/internal/` (Orchestrator, Guru, dsb).
    3.  **External-Only Enforcement**: Memastikan installer (`cli.js`) hanya mengekspor komponen `external/` guna menjaga privasi IP pusat.
    4.  **Zero-Breach Collision Logic**: Fitur baru harus diintegrasikan tanpa merusak fitur lama menggunakan pendekatan `IF-ELSE`.

## ⚡ 4. Protokol: "Ecosystem Synchronization" (README & Public Docs)
**Deskripsi**: Sinkronisasi seluruh dokumentasi publik agar mencerminkan kemampuan terbaru sistem (Zero-Gap Documentation).

*   **Trigger**: Perubahan versi Protokol atau penambahan fitur besar (misal: IF-ELSE Logic).
*   **Aktor**: `Nexus Orchestrator`.
*   **Algoritma Kerja**:
    1.  **Documentation Audit**: Memeriksa `README.md`, `PANDUAN_CEPAT.md`, dan file root lainnya untuk mencari informasi yang sudah usang (Outdated).
    2.  **Alignment Refactor**: Memperbarui deskripsi fitur, diagram alur, dan panduan perintah agar selaras dengan `INTERNAL_WORKFLOW.md` terbaru.
    3.  **Transparency Injection**: Memastikan User memahami evolusi sistem dengan mencantumkan pembaruan logika (seperti Universal Collision Logic) pada dokumentasi utama.

---
*Status: Protokol v2.2 Aktif*
*Target: Seamless Knowledge-to-Action Evolution*
