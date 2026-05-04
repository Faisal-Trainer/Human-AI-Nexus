# PLANNING: Phase 4 — Dashboard Intelligence (Unified Experience)

## 1. Konteks & Tujuan
Dashboard saat ini masih menggunakan template default Jetstream yang tidak mencerminkan identitas visual Nexus dan tidak memiliki fungsionalitas spesifik untuk ekosistem novel. Tujuan fase ini adalah menciptakan pusat kendali yang cerdas bagi Penulis (Author) dan Pembaca (Reader), yang menyajikan data performa dan akses cepat ke konten secara real-time.

## 2. Rincian Perubahan

### Fase 1: Backend Statistics Engine
- **Logic Penulis**: Menghitung agregasi `likes`, `bookmarks`, dan `views` dari semua novel milik user yang sedang login.
- **Logic Pembaca**: Mengambil data novel terbaru yang di-bookmark atau terakhir dibaca.
- **Komponen Livewire**: Membuat `App\Livewire\Dashboard\Index` untuk menangani logika dashboard secara dinamis.

### Fase 2: Dashboard UI (Elite Aesthetic)
- **Stat Cards**: Implementasi kartu statistik dengan ikon modern dan animasi hover.
- **Author Section**: 
  - Widget "Karya Saya" (List novel dengan ringkasan status).
  - Tombol "Buat Novel Baru" yang prominen.
- **Reader Section**:
  - Widget "Lanjut Membaca" (Novel terakhir yang diakses).
  - Widget "Library Preview" (Novel terbaru di bookmark).

### Fase 3: Navigation & Global Search Integration
- Mengupdate `navigation-menu.blade.php` agar selaras dengan desain baru.
- Memastikan `GlobalSearch` tersedia di dashboard melalui layout `app.blade.php`.

## 3. Langkah Verifikasi
1. Login sebagai Author dan memastikan statistik yang muncul akurat sesuai jumlah bookmark/rating pada novel milik author.
2. Login sebagai Reader dan memastikan daftar novel di library muncul dengan benar.
3. Verifikasi visual pada perangkat mobile untuk memastikan grid dashboard responsif.
4. Memastikan transisi antar widget terasa halus tanpa page reload (full Livewire power).

---
**STATUS**: MENUNGGU PERSETUJUAN  
**ACTION**: Approve / Revise / Reject
