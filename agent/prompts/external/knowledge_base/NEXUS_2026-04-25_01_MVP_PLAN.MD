
# 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-25_01_mvp_plan.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-25_01_mvp_plan.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-25_01_mvp_plan.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # Rencana Implementasi: NEXUS LORE (MVP & Fondasi Jangka Panjang)
*Tanggal: 25 April 2026*

Visi utama proyek ini adalah membangun ekosistem Kekayaan Intelektual (IP) yang terus berkembang, mulai dari **Novel (Teks)** -> **Komik** -> **Animasi** -> **Game**, terinspirasi dari model bisnis HoYoverse.

Fokus kita saat ini adalah membangun **MVP (Minimum Viable Product)** untuk tahap pertama: **Platform Penulisan dan Pembacaan Novel**.

## Visi Jangka Panjang & Persiapan Arsitektur
Untuk mendukung transisi dari teks ke media lain (komik, animasi), arsitektur *database* MVP ini harus dirancang agar fleksibel. Daripada hanya membuat entitas `Novel`, kita akan menggunakan konsep `Project` atau `IP` (Intellectual Property) yang memiliki `MediaType` (Novel, Comic, Animation). Untuk MVP ini, kita akan menguncinya di tipe `Novel`, tetapi strukturnya sudah siap untuk masa depan.

---

## Rencana Eksekusi (MVP)

Berdasarkan *feedback* Anda, berikut adalah spesifikasi arsitektur yang akan kita bangun untuk tahap MVP ini:

### 1. Sistem Autentikasi & Manajemen Role
Kita menggunakan **`spatie/laravel-permission`** untuk mengelola hak akses.
- **Roles:** `reader` dan `writer` (beserta `admin` untuk mengelola web).
- **Alur Pendaftaran:** Saat *user* mendaftar pertama kali via Jetstream, mereka akan secara otomatis diberikan role `reader`.
- Hanya *user* dengan role `writer` yang dapat mengakses *Author Dashboard* untuk membuat/mengelola novel. Akan ada mekanisme (misal tombol di profile/dashboard) bagi `reader` untuk mengajukan diri menjadi `writer`.

### 2. Manajemen Aset & Konversi WebP
Untuk mengelola gambar sampul (Cover) agar *load* halaman tetap cepat:
- Menggunakan *library* **`intervention/image`** (v3).
- Ketika *writer* mengunggah gambar format JPG/PNG, *backend* akan secara otomatis mengompresi dan mengubah ekstensinya menjadi `.webp` sebelum menyimpannya ke *storage*.

### 3. Database & Models (Fondasi IP & Interaksi)
Kita akan membuat struktur tabel untuk fitur utama dan interaksi pengguna:

#### Tabel Utama:
- **`Franchise` (Judul/Novel):** Menyimpan data IP utama (Judul, Sinopsis, *Cover Image* `.webp`, ID Author).
- **`Chapter` (Bab):** Berelasi dengan `Franchise`. Menyimpan konten teks. Editor menggunakan format **Markdown (MD)** (seperti Wattpad) untuk *formatting* sederhana dan efisien.
- **`Genre` & `Franchise_Genre`:** Untuk kategorisasi novel.

#### Tabel Interaksi User:
- **`Bookmark`:** Tabel untuk menyimpan daftar novel yang disimpan/favoritkan oleh *user* (Relasi: User ID & Franchise ID).
- **`Like` / `Rating`:** Tabel untuk menyimpan interaksi apresiasi *user* terhadap novel tertentu.
- **`Comment`:** Tabel untuk menyimpan diskusi/komentar *user* di tiap `Chapter`.

### 4. Author Dashboard (Livewire)
- *Route group* yang diproteksi oleh *middleware* `role:writer`.
- **Form Pembuatan Novel:** Integrasi dengan *Image Uploader* (WebP conversion).
- **Teks Editor (Markdown):** Menggunakan library editor *Markdown* (seperti EasyMDE atau UI Jetstream kustom) agar *writer* bisa menulis bab dengan format tebal, miring, dsb.

### 5. Public Frontend
- **Homepage:** Daftar novel populer, terbaru, dan daftar `Bookmark` milik *user* yang sedang *login*.
- **Halaman Detail Novel:** Info sinopsis, jumlah *Like*, tombol *Bookmark*, dan daftar bab.
- **Halaman Pembaca (Reader):** Konten *Markdown* di-*render* ke HTML, UI responsif untuk baca, dan diakhiri dengan seksi **Komentar** pembaca.
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Rencana Implementasi: NEXUS LORE (MVP & Fondasi Jangka Panjang)
*Tanggal: 25 April 2026*

Visi utama proyek ini adalah membangun ekosistem Kekayaan Intelektual (IP) yang terus berkembang, mulai dari **Novel (Teks)** -> **Komik** -> **Animasi** -> **Game**, terinspirasi dari model bisnis HoYoverse.

Fokus kita saat ini adalah membangun **MVP (Minimum Viable Product)** untuk tahap pertama: **Platform Penulisan dan Pembacaan Novel**.

## Visi Jangka Panjang & Persiapan Arsitektur
Untuk mendukung transisi dari teks ke media lain (komik, animasi), arsitektur *database* MVP ini harus dirancang agar fleksibel. Daripada hanya membuat entitas `Novel`, kita akan menggunakan konsep `Project` atau `IP` (Intellectual Property) yang memiliki `MediaType` (Novel, Comic, Animation). Untuk MVP ini, kita akan menguncinya di tipe `Novel`, tetapi strukturnya sudah siap untuk masa depan.

---

## Rencana Eksekusi (MVP)

Berdasarkan *feedback* Anda, berikut adalah spesifikasi arsitektur yang akan kita bangun untuk tahap MVP ini:

### 1. Sistem Autentikasi & Manajemen Role
Kita menggunakan **`spatie/laravel-permission`** untuk mengelola hak akses.
- **Roles:** `reader` dan `writer` (beserta `admin` untuk mengelola web).
- **Alur Pendaftaran:** Saat *user* mendaftar pertama kali via Jetstream, mereka akan secara otomatis diberikan role `reader`.
- Hanya *user* dengan role `writer` yang dapat mengakses *Author Dashboard* untuk membuat/mengelola novel. Akan ada mekanisme (misal tombol di profile/dashboard) bagi `reader` untuk mengajukan diri menjadi `writer`.

### 2. Manajemen Aset & Konversi WebP
Untuk mengelola gambar sampul (Cover) agar *load* halaman tetap cepat:
- Menggunakan *library* **`intervention/image`** (v3).
- Ketika *writer* mengunggah gambar format JPG/PNG, *backend* akan secara otomatis mengompresi dan mengubah ekstensinya menjadi `.webp` sebelum menyimpannya ke *storage*.

### 3. Database & Models (Fondasi IP & Interaksi)
Kita akan membuat struktur tabel untuk fitur utama dan interaksi pengguna:

#### Tabel Utama:
- **`Franchise` (Judul/Novel):** Menyimpan data IP utama (Judul, Sinopsis, *Cover Image* `.webp`, ID Author).
- **`Chapter` (Bab):** Berelasi dengan `Franchise`. Menyimpan konten teks. Editor menggunakan format **Markdown (MD)** (seperti Wattpad) untuk *formatting* sederhana dan efisien.
- **`Genre` & `Franchise_Genre`:** Untuk kategorisasi novel.

#### Tabel Interaksi User:
- **`Bookmark`:** Tabel untuk menyimpan daftar novel yang disimpan/favoritkan oleh *user* (Relasi: User ID & Franchise ID).
- **`Like` / `Rating`:** Tabel untuk menyimpan interaksi apresiasi *user* terhadap novel tertentu.
- **`Comment`:** Tabel untuk menyimpan diskusi/komentar *user* di tiap `Chapter`.

### 4. Author Dashboard (Livewire)
- *Route group* yang diproteksi oleh *middleware* `role:writer`.
- **Form Pembuatan Novel:** Integrasi dengan *Image Uploader* (WebP conversion).
- **Teks Editor (Markdown):** Menggunakan library editor *Markdown* (seperti EasyMDE atau UI Jetstream kustom) agar *writer* bisa menulis bab dengan format tebal, miring, dsb.

### 5. Public Frontend
- **Homepage:** Daftar novel populer, terbaru, dan daftar `Bookmark` milik *user* yang sedang *login*.
- **Halaman Detail Novel:** Info sinopsis, jumlah *Like*, tombol *Bookmark*, dan daftar bab.
- **Halaman Pembaca (Reader):** Konten *Markdown* di-*render* ke HTML, UI responsif untuk baca, dan diakhiri dengan seksi **Komentar** pembaca.
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Rencana Implementasi: NEXUS LORE (MVP & Fondasi Jangka Panjang)
*Tanggal: 25 April 2026*

Visi utama proyek ini adalah membangun ekosistem Kekayaan Intelektual (IP) yang terus berkembang, mulai dari **Novel (Teks)** -> **Komik** -> **Animasi** -> **Game**, terinspirasi dari model bisnis HoYoverse.

Fokus kita saat ini adalah membangun **MVP (Minimum Viable Product)** untuk tahap pertama: **Platform Penulisan dan Pembacaan Novel**.

## Visi Jangka Panjang & Persiapan Arsitektur
Untuk mendukung transisi dari teks ke media lain (komik, animasi), arsitektur *database* MVP ini harus dirancang agar fleksibel. Daripada hanya membuat entitas `Novel`, kita akan menggunakan konsep `Project` atau `IP` (Intellectual Property) yang memiliki `MediaType` (Novel, Comic, Animation). Untuk MVP ini, kita akan menguncinya di tipe `Novel`, tetapi strukturnya sudah siap untuk masa depan.

---

## Rencana Eksekusi (MVP)

Berdasarkan *feedback* Anda, berikut adalah spesifikasi arsitektur yang akan kita bangun untuk tahap MVP ini:

### 1. Sistem Autentikasi & Manajemen Role
Kita menggunakan **`spatie/laravel-permission`** untuk mengelola hak akses.
- **Roles:** `reader` dan `writer` (beserta `admin` untuk mengelola web).
- **Alur Pendaftaran:** Saat *user* mendaftar pertama kali via Jetstream, mereka akan secara otomatis diberikan role `reader`.
- Hanya *user* dengan role `writer` yang dapat mengakses *Author Dashboard* untuk membuat/mengelola novel. Akan ada mekanisme (misal tombol di profile/dashboard) bagi `reader` untuk mengajukan diri menjadi `writer`.

### 2. Manajemen Aset & Konversi WebP
Untuk mengelola gambar sampul (Cover) agar *load* halaman tetap cepat:
- Menggunakan *library* **`intervention/image`** (v3).
- Ketika *writer* mengunggah gambar format JPG/PNG, *backend* akan secara otomatis mengompresi dan mengubah ekstensinya menjadi `.webp` sebelum menyimpannya ke *storage*.

### 3. Database & Models (Fondasi IP & Interaksi)
Kita akan membuat struktur tabel untuk fitur utama dan interaksi pengguna:

#### Tabel Utama:
- **`Franchise` (Judul/Novel):** Menyimpan data IP utama (Judul, Sinopsis, *Cover Image* `.webp`, ID Author).
- **`Chapter` (Bab):** Berelasi dengan `Franchise`. Menyimpan konten teks. Editor menggunakan format **Markdown (MD)** (seperti Wattpad) untuk *formatting* sederhana dan efisien.
- **`Genre` & `Franchise_Genre`:** Untuk kategorisasi novel.

#### Tabel Interaksi User:
- **`Bookmark`:** Tabel untuk menyimpan daftar novel yang disimpan/favoritkan oleh *user* (Relasi: User ID & Franchise ID).
- **`Like` / `Rating`:** Tabel untuk menyimpan interaksi apresiasi *user* terhadap novel tertentu.
- **`Comment`:** Tabel untuk menyimpan diskusi/komentar *user* di tiap `Chapter`.

### 4. Author Dashboard (Livewire)
- *Route group* yang diproteksi oleh *middleware* `role:writer`.
- **Form Pembuatan Novel:** Integrasi dengan *Image Uploader* (WebP conversion).
- **Teks Editor (Markdown):** Menggunakan library editor *Markdown* (seperti EasyMDE atau UI Jetstream kustom) agar *writer* bisa menulis bab dengan format tebal, miring, dsb.

### 5. Public Frontend
- **Homepage:** Daftar novel populer, terbaru, dan daftar `Bookmark` milik *user* yang sedang *login*.
- **Halaman Detail Novel:** Info sinopsis, jumlah *Like*, tombol *Bookmark*, dan daftar bab.
- **Halaman Pembaca (Reader):** Konten *Markdown* di-*render* ke HTML, UI responsif untuk baca, dan diakhiri dengan seksi **Komentar** pembaca.
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Rencana Implementasi: NEXUS LORE (MVP & Fondasi Jangka Panjang)
*Tanggal: 25 April 2026*

Visi utama proyek ini adalah membangun ekosistem Kekayaan Intelektual (IP) yang terus berkembang, mulai dari **Novel (Teks)** -> **Komik** -> **Animasi** -> **Game**, terinspirasi dari model bisnis HoYoverse.

Fokus kita saat ini adalah membangun **MVP (Minimum Viable Product)** untuk tahap pertama: **Platform Penulisan dan Pembacaan Novel**.

## Visi Jangka Panjang & Persiapan Arsitektur
Untuk mendukung transisi dari teks ke media lain (komik, animasi), arsitektur *database* MVP ini harus dirancang agar fleksibel. Daripada hanya membuat entitas `Novel`, kita akan menggunakan konsep `Project` atau `IP` (Intellectual Property) yang memiliki `MediaType` (Novel, Comic, Animation). Untuk MVP ini, kita akan menguncinya di tipe `Novel`, tetapi strukturnya sudah siap untuk masa depan.

---

## Rencana Eksekusi (MVP)

Berdasarkan *feedback* Anda, berikut adalah spesifikasi arsitektur yang akan kita bangun untuk tahap MVP ini:

### 1. Sistem Autentikasi & Manajemen Role
Kita menggunakan **`spatie/laravel-permission`** untuk mengelola hak akses.
- **Roles:** `reader` dan `writer` (beserta `admin` untuk mengelola web).
- **Alur Pendaftaran:** Saat *user* mendaftar pertama kali via Jetstream, mereka akan secara otomatis diberikan role `reader`.
- Hanya *user* dengan role `writer` yang dapat mengakses *Author Dashboard* untuk membuat/mengelola novel. Akan ada mekanisme (misal tombol di profile/dashboard) bagi `reader` untuk mengajukan diri menjadi `writer`.

### 2. Manajemen Aset & Konversi WebP
Untuk mengelola gambar sampul (Cover) agar *load* halaman tetap cepat:
- Menggunakan *library* **`intervention/image`** (v3).
- Ketika *writer* mengunggah gambar format JPG/PNG, *backend* akan secara otomatis mengompresi dan mengubah ekstensinya menjadi `.webp` sebelum menyimpannya ke *storage*.

### 3. Database & Models (Fondasi IP & Interaksi)
Kita akan membuat struktur tabel untuk fitur utama dan interaksi pengguna:

#### Tabel Utama:
- **`Franchise` (Judul/Novel):** Menyimpan data IP utama (Judul, Sinopsis, *Cover Image* `.webp`, ID Author).
- **`Chapter` (Bab):** Berelasi dengan `Franchise`. Menyimpan konten teks. Editor menggunakan format **Markdown (MD)** (seperti Wattpad) untuk *formatting* sederhana dan efisien.
- **`Genre` & `Franchise_Genre`:** Untuk kategorisasi novel.

#### Tabel Interaksi User:
- **`Bookmark`:** Tabel untuk menyimpan daftar novel yang disimpan/favoritkan oleh *user* (Relasi: User ID & Franchise ID).
- **`Like` / `Rating`:** Tabel untuk menyimpan interaksi apresiasi *user* terhadap novel tertentu.
- **`Comment`:** Tabel untuk menyimpan diskusi/komentar *user* di tiap `Chapter`.

### 4. Author Dashboard (Livewire)
- *Route group* yang diproteksi oleh *middleware* `role:writer`.
- **Form Pembuatan Novel:** Integrasi dengan *Image Uploader* (WebP conversion).
- **Teks Editor (Markdown):** Menggunakan library editor *Markdown* (seperti EasyMDE atau UI Jetstream kustom) agar *writer* bisa menulis bab dengan format tebal, miring, dsb.

### 5. Public Frontend
- **Homepage:** Daftar novel populer, terbaru, dan daftar `Bookmark` milik *user* yang sedang *login*.
- **Halaman Detail Novel:** Info sinopsis, jumlah *Like*, tombol *Bookmark*, dan daftar bab.
- **Halaman Pembaca (Reader):** Konten *Markdown* di-*render* ke HTML, UI responsif untuk baca, dan diakhiri dengan seksi **Komentar** pembaca.
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
