# AI ASSISTANT WORKFLOW (Human-AI Nexus)

Dokumen ini mendefinisikan prosedur kerja wajib bagi AI Assistant dalam mengelola siklus pengembangan proyek **Human-AI Nexus**.

---

## 1. Prosedur Kerja Utama

Setiap kali ada tugas baru atau perubahan fitur yang signifikan, AI Assistant **wajib** mengikuti alur berikut:

### A. Tahap Perencanaan (Planning)
1. **Identifikasi Kebutuhan:** Pahami permintaan user dan hubungkan dengan fase proyek saat ini.
2. **Buat Rancangan (Algorithm/Task):** Sebelum menulis kode program, buat dokumen baru di folder `docs/algorithms/` (untuk logika fitur) atau `docs/planning/` (untuk rencana umum).
3. **Minta Persetujuan:** Sajikan rancangan tersebut kepada user dan **STOP** pekerjaan hingga user memberikan persetujuan (approval).

### B. Tahap Eksekusi (Execution)
1. Setelah disetujui, lakukan perubahan kode (Laravel, Livewire, CSS, dll).
2. Pastikan kode mengikuti standar yang telah ditetapkan di `docs/agent/*.md` dan `docs/skill/*.md`.

### C. Tahap Rekaman (Recording)
1. Setelah fitur/fase dinyatakan selesai dan berfungsi dengan baik:
2. **Wajib** memeriksa apakah fitur baru tersebut memerlukan pembaruan pada **Privacy Policy** atau **Terms of Service** (misal: fitur yang mengambil data user baru, integrasi API pihak ketiga, atau sistem pembayaran). Jika ya, lakukan pembaruan di folder `docs/legal/`.
3. **Wajib** menuliskan laporan penyelesaian di folder `docs/records/`.
4. Gunakan format penamaan file: `YYYY-MM-DD_XX_nama_fase_completed.md`.
5. **Buat Session Summary harian:** Buat file `YYYY-MM-DD_XX_session_summary.md` di folder `docs/summary/` pada akhir hari untuk merangkum seluruh fase yang diselesaikan pada hari tersebut. Jika dalam satu hari terdapat beberapa fase, rangkum semuanya dalam satu dokumen summary harian ini.

---

## 2. Prinsip Kerja

- **No Approval, No Code:** Jangan melakukan perubahan besar pada struktur aplikasi atau logika bisnis tanpa dokumen rancangan yang disetujui.
- **Traceability:** Setiap baris kode yang ditulis harus bisa ditelusuri kembali ke dokumen algoritma atau planning yang ada.
- **Documentation First:** Dokumentasi bukan tugas akhir, melainkan panduan utama sebelum dan sesudah eksekusi.

---

## 3. Batas Kerja

- AI Assistant dilarang menghapus atau mengubah dokumen di folder `docs/records/` yang sudah ada, kecuali untuk memperbaiki kesalahan tipografi atau menambah detail atas perintah user.
- Setiap sesi kerja baru harus diawali dengan membaca seluruh isi folder `docs/` untuk memahami konteks terakhir.
