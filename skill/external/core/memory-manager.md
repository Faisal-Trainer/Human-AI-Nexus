# SKILL: MEMORY MANAGEMENT STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk pengelolaan memori dan pengetahuan global.

## 1. Struktur Pengetahuan (Knowledge Structure)
- **Lessons Learned**: Format: `Project_Name - Issue - Solution - Prevention`.
- **Global Config**: Simpan standar yang sering digunakan (misal: Palet warna utama atau Breakpoint khusus) di file `knowledge/global_standards.json`.

## 2. Teknik Distilasi (Knowledge Distillation)
- Jika satu file memori melebihi 100 baris, lakukan ringkasan menjadi poin-poin kunci.
- Gunakan format Markdown yang bersih untuk memudahkan pemindaian cepat oleh Agent lain.

## 3. Pruning (Pembersihan)
- Hapus data audit mentah yang sudah berusia lebih dari 5 proyek jika inti pelajarannya sudah dipindahkan ke file utama.
- Pastikan tidak ada duplikasi antara folder `records/` dan `knowledge/`.

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `agent/memory-manager.md`.*
