# PLANNING: Tailwind CSS v4 Native Utility Migration

## 1. Konteks & Tujuan
Meskipun migrasi awal ke Tailwind v4 telah dilakukan, penggunaan variabel CSS masih menggunakan sintaks shorthand `utility-(--variable)`. Untuk mencapai level "Production-Grade Elite", kita akan melakukan migrasi ke penggunaan utilitas native Tailwind yang didukung oleh blok `@theme`. Hal ini akan membuat kode lebih bersih dan menghilangkan seluruh warning dari IDE.

## 2. Rincian Perubahan

### Konfigurasi CSS (`app.css`):
- Memindahkan seluruh variabel desain (Color, Spacing, Radius) dari blok `:root` ke blok `@theme`.
- Hal ini memungkinkan Tailwind secara otomatis memetakan variabel tersebut ke utilitas standar (misal: `mb-md` akan merujuk ke `--spacing-md`).

### Refactor Global (Blade Views):
- Mengganti sintaks shorthand `-(--spacing-*)` menjadi standar `-*` (misal: `mb-md`).
- Mengganti sintaks shorthand `-(--radius-*)` menjadi standar `-*` (misal: `rounded-md`).
- Mengganti sintaks shorthand `-(--color-*)` menjadi standar `-*` (misal: `text-outline`).

## 3. Langkah Verifikasi
1. Menjalankan `npm run build` untuk memastikan tidak ada kesalahan pemetaan tema.
2. Memastikan seluruh warning di IDE mengenai "arbitrary values" telah hilang.
3. Cek visual untuk memastikan skala spasi dan warna tetap akurat.

---
**STATUS**: MENUNGGU PERSETUJUAN  
**ACTION**: Approve / Revise / Reject
