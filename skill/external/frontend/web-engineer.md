# SKILL: WEB ENGINEERING STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis pengembangan web dan best practices untuk proyek **Human-AI Nexus**.

## 1. Arsitektur & Struktur Folder
- Ikuti standar struktur folder framework yang digunakan.
- Gunakan penamaan file yang konsisten (PascalCase untuk Class, snake_case untuk view).
- Pisahkan logika bisnis dari UI (Gunakan Service Pattern atau Action jika perlu).

## 2. Database & Eloquent (Laravel Context)
- Gunakan UUID sebagai primary key jika diperlukan untuk skalabilitas.
- Selalu cegah masalah `N+1 Query` dengan Eager Loading (`with()`).
- Gunakan Database Transactions untuk operasi yang melibatkan banyak tabel.

## 3. Frontend & Interaksi (Livewire/Alpine)
- **Livewire Attributes:** WAJIB gunakan PHP Attributes (`#[Layout('layouts.app')]`) untuk mendefinisikan layout. Dilarang menggunakan method chaining `->layout()` untuk menghindari linting error.
- **Interaction Security:** Setiap aksi (update/delete) dalam komponen Livewire wajib melewati pengecekan otorisasi (`Gate` atau `$user->can()`).
- **Feedback:** Gunakan Loading States untuk memberikan feedback ke user.
- **Responsiveness:** Terapkan Throttling/Debouncing pada input yang memicu request server.

## 4. Performance & Quality
- Gunakan Pagination untuk daftar data yang besar.
- Terapkan caching untuk data yang jarang berubah tapi sering diakses.
- Tulis Feature Test minimal untuk alur kerja utama (Happy Path).

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `docs/agent/web-engineer.md`.*
