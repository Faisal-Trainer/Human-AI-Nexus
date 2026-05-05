# 🔴 NEXUS TDD IRON LAWS

Dokumen ini menetapkan standar pengujian berbasis **Test-Driven Development (TDD)** untuk menjamin kebenaran kode sejak baris pertama.

## 1. Hukum Utama (The Iron Law)
> **TIDAK ADA KODE PRODUKSI TANPA TEST YANG GAGAL TERLEBIH DAHULU.**

Jika Anda menulis kode sebelum test? **Hapus kodenya. Mulai dari awal.**

## 2. Siklus Red-Green-Refactor
1. **RED (Gagal)**: Tulis satu test minimal untuk perilaku yang diinginkan. Jalankan test dan pastikan ia **GAGAL** dengan alasan yang benar.
2. **GREEN (Berhasil)**: Tulis kode **paling sederhana** hanya untuk meloloskan test tersebut. Jangan melakukan optimasi atau menambahkan fitur tambahan.
3. **REFACTOR (Bersihkan)**: Setelah test berhasil (Green), bersihkan kode dari duplikasi, perbaiki penamaan, dan optimalkan struktur tanpa merubah perilaku.

## 3. Aturan Debugging dengan TDD
Bug ditemukan? 
1. Tulis test yang mereproduksi bug tersebut (Test Gagal).
2. Terapkan siklus TDD untuk memperbaikinya.
3. Test tersebut kini berfungsi sebagai pelindung regresi (mencegah bug muncul kembali).

---
*Status: Institutional Knowledge (TDD Discipline).*
*Referenced from: Superpowers TDD Skill.*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [tdd]
