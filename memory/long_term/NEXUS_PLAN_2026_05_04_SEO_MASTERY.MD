# PLANNING: Phase 7 — SEO Mastery (NexusLore Visibility)

## 1. Konteks & Tujuan
Dengan akuisisi domain resmi **NEXUSLORE.NET**, proyek ini memasuki fase visibilitas publik. Tujuan dari fase ini adalah mengoptimalkan infrastruktur aplikasi agar ramah terhadap mesin pencari (Search Engine Friendly) dan memiliki performa sharing media sosial yang superior melalui metadata dinamis dan data terstruktur.

## 2. Rincian Perubahan

### Fase 1: Dynamic Metadata Engine
- **Global Layouts**: Mengupdate `app.blade.php` dan `guest.blade.php` untuk mendukung `@yield('meta')` atau `@stack('meta')`.
- **Livewire Integration**: Menambahkan logic pada komponen `Franchise\Show`, `Chapter\Show`, dan `Author\Profile` untuk mengirimkan metadata spesifik (Title, Description, Keywords).

### Fase 2: Social Discovery (OpenGraph & Twitter Cards)
- **Rich Previews**: Implementasi tag `og:image`, `og:title`, dan `og:description`.
- **Dynamic Assets**: Menggunakan cover novel sebagai `og:image` utama saat halaman novel dibagikan.
- **Twitter Optimization**: Mengaktifkan `twitter:card` (summary_large_image).

### Fase 3: Structured Data (Schema.org)
- **JSON-LD Implementation**: Menambahkan skema data terstruktur pada halaman novel:
  - `Book`: Untuk informasi detail buku.
  - `BreadcrumbList`: Untuk navigasi hirarki.
  - `Author`: Untuk profil penulis.

### Fase 4: URL & Image Optimization
- **Force WWW**: Mengatur konfigurasi `APP_URL` dan middleware untuk memastikan akses selalu melalui `www.nexuslore.net`.
- **Canonical Tags**: Menambahkan `<link rel="canonical">` di setiap halaman.
- **Image Alt Tags**: Memastikan semua gambar (terutama cover novel) memiliki atribut `alt` yang deskriptif.

### Fase 5: Sitemap & Robots.txt
- **Auto-Sitemap**: Membuat route `/sitemap.xml` yang mengindeks otomatis semua novel yang dipublikasikan.
- **Robots.txt**: Konfigurasi akses crawler untuk area publik dan pembatasan pada area dashboard/admin.

## 3. Langkah Verifikasi
1. Menggunakan **Google Rich Results Test** untuk memverifikasi Schema.org.
2. Menggunakan **Facebook Sharing Debugger** untuk memverifikasi tampilan OpenGraph.
3. Memastikan semua halaman memiliki satu tag `<h1>` yang unik.
4. Cek validitas URL Canonical melalui browser inspector.

---
**STATUS**: MENUNGGU PERSETUJUAN  
**ACTION**: Approve / Revise / Reject
