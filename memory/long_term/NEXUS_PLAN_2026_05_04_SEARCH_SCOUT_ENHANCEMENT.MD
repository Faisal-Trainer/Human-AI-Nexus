# PLANNING: Phase 3 — Search Enhancement (Nexus Scout Evolution)

## 1. Konteks & Tujuan
Sistem saat ini sudah memiliki dasar Laravel Scout pada model `Franchise`, namun fungsinya masih terbatas pada pencarian teks dasar (Judul/Sinopsis). Tujuan dari fase ini adalah meningkatkan kemampuan pencarian agar lebih cerdas, relevan, dan memiliki fitur filter yang komprehensif untuk mendukung pengalaman pengguna "Elite".

## 2. Rincian Perubahan

### Fase 1: Data & Model Refinement
- **Model `Franchise`**: Memperbarui `toSearchableArray()` untuk menyertakan:
  - Relasi `author.name` (Pencarian berdasarkan penulis).
  - List `genres.name` (Pencarian berdasarkan kategori).
  - Status novel (Ongoing/Completed).
- **Model `User`**: Menambahkan trait `Searchable` agar penulis bisa dicari secara spesifik.

### Fase 2: Logic & Indexing Optimization
- Melakukan sinkronisasi ulang indeks: `php artisan scout:import "App\Models\Franchise"`.
- Mengoptimalkan query pencarian di Livewire agar mendukung pencarian parsial dan relevansi tinggi.
- Memastikan novel yang muncul di hasil pencarian hanyalah novel yang memiliki minimal satu chapter terpublikasi.

### Fase 3: Advanced Filtering & UI
- **Livewire Index**: Menambahkan properti filter:
  - `genreIds`: Array genre yang dipilih.
  - `status`: String filter status.
  - `sortBy`: Pilihan pengurutan (Latest, Popular, Trending).
- **UI Enhancement**: 
  - Sidebar atau Modal filter yang elegan dengan animasi CSS halus.
  - Checkbox genre dengan badge hitung (jika memungkinkan).

### Fase 4: Global Integration & UX Polish
- **Global Search Bar**: Membuat komponen Livewire `GlobalSearch` di Navbar.
- **Instant Result Overlay**: Menampilkan hasil pencarian cepat (Top 5 matches) langsung di bawah search bar saat mengetik.
- **Keyboard Shortcut**: Aktivasi `Ctrl + K` untuk membuka search bar.
- **Empty States**: Desain halaman "Hasil Tidak Ditemukan" yang informatif dengan saran novel trending.

## 3. Langkah Verifikasi
1. Melakukan pencarian berdasarkan nama penulis dan memastikan novel karyanya muncul.
2. Melakukan filter berdasarkan genre (misal: "Action") dan memastikan hanya novel bergenre tersebut yang tampil.
3. Memastikan performa pencarian tetap cepat (sub-second) dengan dataset dummy.
4. Verifikasi visual: Loading states dan transisi antar hasil pencarian.

---
**STATUS**: MENUNGGU PERSETUJUAN  
**ACTION**: Approve / Revise / Reject
