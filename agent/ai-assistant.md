# AI ASSISTANT WORKFLOW (Human-AI Nexus)

Dokumen ini mendefinisikan prosedur kerja wajib bagi AI Assistant dalam mengelola siklus pengembangan proyek **Human-AI Nexus**.

---

## 1. Prosedur Kerja Utama

Setiap kali ada tugas baru atau perubahan fitur yang signifikan, AI Assistant **wajib** menggunakan `nexus run` atau mengikuti alur manual berikut:

### A. Tahap Perencanaan (Planning)
1. **Identifikasi Kebutuhan:** Pahami permintaan user dan hubungkan dengan fase proyek saat ini.
2. **Buat Rancangan (Algorithm/Task):** Sebelum menulis kode program, buat dokumen baru di folder `algorithms/` (untuk logika fitur) atau `planning/` (untuk rencana umum).
3. **Minta Persetujuan:** Sajikan rancangan tersebut kepada user dan **STOP** pekerjaan hingga user memberikan persetujuan (approval).

### B. Tahap Eksekusi (Execution)
1. Setelah disetujui, lakukan perubahan kode.
2. Pastikan kode mengikuti standar yang telah ditetapkan di `agent/*.md` dan `skill/*.md`.

### C. Tahap Rekaman (Recording)
1. Setelah fitur/fase dinyatakan selesai dan berfungsi dengan baik:
2. **Wajib** memeriksa apakah fitur baru tersebut memerlukan pembaruan pada **Privacy Policy** atau **Terms of Service**. Jika ya, lakukan pembaruan di folder `legal/`.
3. **Wajib** menuliskan laporan penyelesaian di folder `records/`.
4. Gunakan format penamaan file: `YYYY-MM-DD_XX_nama_fase_completed.md`.
5. **Buat Session Summary harian:** Buat file `YYYY-MM-DD_XX_session_summary.md` di folder `summary/` pada akhir hari.

### D. Tahap Recursive Audit
1. AI Orchestrator memicu **Recursive Audit** melalui perintah `nexus audit`.
2. Seluruh Agent spesialis melakukan audit ulang terhadap hasil eksekusi.
3. **Aturan Audit**: Selama fase ini, Agent **hanya boleh melaporkan bug, cacat, atau kebutuhan optimasi**. Agent dilarang memberikan saran fitur baru.
4. Jika ditemukan cacat, siklus kembali ke tahap Eksekusi hingga audit menyatakan "Zero Flaws".

---

## 2. Prinsip Kerja

- **No Approval, No Code:** Jangan melakukan perubahan besar pada struktur aplikasi atau logika bisnis tanpa dokumen rancangan yang disetujui.
- **Traceability:** Setiap baris kode yang ditulis harus bisa ditelusuri kembali ke dokumen algoritma atau planning yang ada.
- **Documentation First:** Dokumentasi bukan tugas akhir, melainkan panduan utama sebelum dan sesudah eksekusi.

---

## 3. Batas Kerja

- AI Assistant dilarang menghapus atau mengubah dokumen di folder `docs/records/` yang sudah ada, kecuali untuk memperbaiki kesalahan tipografi atau menambah detail atas perintah user.
- **DILARANG KERAS** menghapus file proyek atau file dokumentasi apa pun tanpa izin eksplisit dari User. Jika media penyimpanan penuh, AI wajib memberikan notifikasi dan menunggu instruksi User.
- Setiap sesi kerja baru harus diawali dengan membaca seluruh isi folder `agent/` serta file `STANDAR_ZERO_FLAWS.md` di root proyek untuk memahami konteks dan standar kualitas terakhir.
