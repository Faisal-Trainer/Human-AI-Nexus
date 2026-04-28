# SKILL: TESTING & QUALITY STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk pengujian aplikasi dan penjaminan kualitas.

## 1. TDD Iron Laws (Nexus Golden Standard)
> **TIDAK ADA KODE PRODUKSI TANPA TEST YANG GAGAL TERLEBIH DAHULU.**
- **RED (Gagal):** Tulis test minimal dan saksikan ia GAGAL dengan alasan yang benar.
- **GREEN (Berhasil):** Tulis kode paling sederhana hanya untuk meloloskan test tersebut.
- **REFACTOR (Bersihkan):** Bersihkan kode tanpa mengubah perilaku. Tetap pastikan test tetap Hijau.

## 2. Verification & Evidence (Nexus Golden Standard)
- **Evidence-Based:** Dilarang mengklaim tugas selesai tanpa bukti (Log eksekusi/Hasil test).
- **"3 Fixes" Rule:** Jika perbaikan gagal sebanyak 3x, BERHENTI dan pertanyakan arsitektur sistem.
- **Regression Guard:** Setiap bug yang ditemukan wajib memiliki test case reproduksi sebelum diperbaiki.

## 4. Checklist QA
- [ ] Test coverage mencakup minimal 80% logika bisnis utama.
- [ ] Pengujian mencakup pengecekan autentikasi dan otorisasi (Role access).
- [ ] Validasi input diuji dengan berbagai variasi data (valid & invalid).
- [ ] Test dapat dijalankan dengan satu perintah tunggal secara otomatis.

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `docs/agent/qa-specialist.md`.*
