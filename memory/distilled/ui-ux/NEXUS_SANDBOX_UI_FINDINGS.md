# Sandbox UI/UX Distilled Findings
> **VERSION**: v1 | **Last Updated**: 25/05/2026



**Date**: 2026-05-23
**Context**: NEXUS Sandbox Section 1 generated 11 TALL Stack web applications, all of which failed the UX/UI quality check. The resulting applications were merely default Laravel boilerplate pages with haphazardly injected Livewire components.

## Critical Findings
1. **Broken Boilerplate**: Agen tidak menghapus halaman dokumentasi bawaan Laravel (`welcome.blade.php` dengan link ke Laracasts/Laravel News). Hal ini membuat aplikasi terlihat seperti *scaffold* awal, bukan produk akhir (MVP).
2. **Missing Application Shell**: Tidak ada satupun aplikasi yang menggunakan struktur `layouts/app.blade.php`. Akibatnya, aplikasi tidak memiliki *navbar*, *footer*, navigasi, atau kerangka UI (Shell) yang layak.
3. **Mangled HTML Injection**: Karena struktur HTML yang kacau, injeksi tag `<livewire:...>` malah merusak *tag* `<body>` dan `<div>`.

## TALL Stack UI/UX Guardrails
Untuk generasi kode selanjutnya (terutama agen `ux-engineer` dan `pipeline-architect`), **patuhi aturan ketat berikut**:

1. **Wajib Hapus Boilerplate**: Setiap kali membuat aplikasi baru, halaman bawaan `welcome.blade.php` **HARUS DIHAPUS TOTAL** isinya dan diganti dengan desain halaman depan/Dashboard yang relevan dengan aplikasi (menggunakan Tailwind CSS murni atau desain modern).
2. **Wajib Gunakan Layout**: Selalu pastikan aplikasi memiliki sebuah layout utama (contoh: `resources/views/components/layouts/app.blade.php`). Layout ini harus memiliki `<head>`, `<body>`, Navbar/Header yang berfungsi, slot utama (`{{ $slot }}`), dan footer.
3. **Routing yang Layak**: Halaman utama (`/`) tidak boleh sekadar me-*render* komponen acak. Halaman utama harus berupa `Dashboard` atau `Landing Page` yang memiliki tautan menuju fitur-fitur lainnya.
4. **Desain Elegan & Premium**: Gunakan komponen modern dari skill `modern-web-guidance`. Jangan biarkan halaman berwarna putih polos dengan sebuah form di tengah layar tanpa styling padding/margin yang proporsional. Gunakan Glassmorphism, animasi mikro, dan skema warna (*color palette*) yang harmoni.

*Catatan: Kesalahan teknis di sisi Engine (auto-wiring yang merusak tag HTML) telah diselesaikan secara fisik di `ExecutionPhase.js`.*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux]
