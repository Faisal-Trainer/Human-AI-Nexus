# PLANNING: Tailwind CSS v4 Upgrade

## 1. Konteks & Tujuan
Proyek saat ini menggunakan campuran Tailwind CSS v3.4.0 dan `@tailwindcss/vite` v4.0.0. User meminta untuk melakukan update Tailwind. Tujuan dari planning ini adalah melakukan migrasi penuh ke Tailwind CSS v4.0.0 untuk memastikan kompatibilitas native dengan Vite 6/8 dan meningkatkan performa build.

## 2. Rincian Perubahan

### Fase 1: Update Dependensi
- Melakukan update `tailwindcss` ke versi `^4.0.0`.
- Memastikan `@tailwindcss/vite` tetap di versi `^4.0.0`.
- Menghapus dependensi yang sudah tidak diperlukan lagi oleh Tailwind v4:
  - `autoprefixer`
  - `postcss`

### Fase 2: Konfigurasi Vite
- Memodifikasi `vite.config.js` untuk mengimpor dan menggunakan plugin `@tailwindcss/vite`.
- Memastikan plugin terpasang sebelum plugin Laravel.

### Fase 3: Refactor CSS (Modernisasi)
- Memperbarui `resources/css/app.css`:
  - Mengganti direktif lama (`@tailwind base`, dll) dengan `@import "tailwindcss";`.
  - Migrasi konfigurasi `tailwind.config.js` (seperti font-family) ke dalam blok `@theme` di CSS.
  - Memastikan variabel CSS untuk sistem spasi dan radius yang baru dibuat tetap berfungsi.

### Fase 4: Pembersihan (Cleanup)
- Menghapus `tailwind.config.js` karena v4 menggunakan pendekatan CSS-first.
- Menghapus `postcss.config.js`.

## 3. Langkah Verifikasi
1. `npm install` untuk sinkronisasi library.
2. `npm run dev` untuk memastikan build berjalan tanpa error.
3. Cek visual pada form Login & Register untuk memastikan desain "UX-First" tidak rusak.

---
**STATUS**: MENUNGGU PERSETUJUAN  
**ACTION**: Approve / Revise / Reject
