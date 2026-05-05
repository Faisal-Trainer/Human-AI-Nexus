# 🔎 NEXUS SYSTEMATIC DEBUGGING PROTOCOL

Dokumen ini menetapkan protokol investigasi akar masalah untuk mencegah perbaikan yang bersifat tebakan atau "Quick Fix" yang berbahaya.

## 1. Hukum Utama (The Iron Law)
> **TIDAK ADA PERBAIKAN (FIX) TANPA INVESTIGASI AKAR MASALAH (ROOT CAUSE) TERLEBIH DAHULU.**

## 2. Empat Fase Debugging
Anda **WAJIB** menyelesaikan setiap fase sebelum lanjut ke fase berikutnya:

### Fase 1: Investigasi Akar Masalah
- Baca pesan error secara utuh (Stack Trace, Line Numbers).
- Reproduksi bug secara konsisten.
- Lacak aliran data (*Data Flow*) hingga menemukan sumber nilai yang salah.

### Fase 2: Analisis Pola
- Cari contoh kode serupa yang bekerja dengan benar.
- Bandingkan perbedaan sekecil apa pun antara kode yang bekerja dan yang rusak.

### Fase 3: Hipotesis & Pengujian
- Buat hipotesis tunggal: "Saya rasa X adalah penyebabnya karena Y".
- Uji secara minimal (satu variabel saja). Jika tidak berhasil, hapus perubahan tersebut dan buat hipotesis baru.

### Fase 4: Implementasi & Verifikasi
- Terapkan perbaikan pada akar masalah, bukan pada gejalanya.
- Verifikasi dengan test dan pastikan tidak ada efek samping pada bagian lain.

---
*Status: Institutional Knowledge (Debugging Framework).*
*Referenced from: Superpowers Systematic Debugging.*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, tdd]
