
# 🛠 NEXUS AUTO-MERGE: NEXUS_2026-04-25_PHASE_2_AUTHOR_DASHBOARD.MD
> Gabungan otomatis antara file lama (2026-04-25_phase_2_author_dashboard.md) dan file eksisting.

### 🧩 Pilihan Opsi Tak Terbatas:

#### Opsi A: Konten Eksisting
# 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-25_phase_2_author_dashboard.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-25_phase_2_author_dashboard.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-25_phase_2_author_dashboard.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # Algoritma & Log Eksekusi: Fase 2 (Author Dashboard)
*Tanggal: 25 April 2026*

Dokumen ini merancang algoritma dan alur fitur yang akan dikerjakan pada **Fase 2**, yaitu membangun UI/UX khusus bagi Kreator (*Writer*).

## 1. Algoritma Proteksi Route (Middleware)
- Membuat *Route Group* di `routes/web.php` dengan *prefix* `/author`.
- Melindungi *Route Group* tersebut dengan *middleware* `auth` dan `role:writer`.
- *Reader* (Pembaca biasa) yang mencoba mengakses *link* ini akan dilempar (*redirect*) ke halaman 403 (Unauthorized) atau halaman "Upgrade to Writer".

## 2. Alur Pembuatan IP (Franchise / Novel Baru)
**Komponen:** Livewire `Author\Franchise\Create`
1. *Writer* membuka halaman **"Buat Karya Baru"**.
2. Mengisi formulir: Judul, Sinopsis, dan memilih *Cover Image* (file input).
3. **Validasi Backend:** 
   - Gambar harus berupa `png/jpg/jpeg`, max 2MB.
   - Teks tidak boleh kosong.
4. **Algoritma Konversi WebP (Intervention v4):**
   - File sementara yang diunggah (`$this->cover_image`) diproses oleh `ImageManager`.
   - Gambar di-*scale down* proporsional agar ukurannya tidak terlalu raksasa (misal batas lebar maksimal 800px).
   - Di-*encode* ke format WebP (kualitas 80%).
   - Disimpan ke `storage/app/public/covers/{franchise_uuid}.webp`.
5. Data Franchise disimpan ke database, relasi `author_id` diisi dengan UUID *Writer* yang sedang *login*.

## 3. Alur Manajemen Bab (Chapter Editor)
**Komponen:** Livewire `Author\Chapter\Editor`
1. Menampilkan daftar Bab dari *Franchise* tertentu.
2. *Writer* menekan tombol **"Tulis Bab Baru"**.
3. UI menggunakan **SimpleMDE** (atau editor berbasis teks biasa dengan preview Markdown) agar terasa familier bagi penulis fiksi.
4. Menyimpan *draft* secara *real-time* atau lewat tombol "Simpan Draft" (status `is_published = false`).
5. Tombol **"Publish"** akan merubah status bab dan memperbarui `published_at` menjadi waktu sekarang.

## 4. UI/UX Author Dashboard
- Terintegrasi secara halus dengan *Layout* Jetstream bawaan.
- Menyediakan indikator *View/Like* (untuk MVP ini disimulasikan dari tabel interaksi).
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Algoritma & Log Eksekusi: Fase 2 (Author Dashboard)
*Tanggal: 25 April 2026*

Dokumen ini merancang algoritma dan alur fitur yang akan dikerjakan pada **Fase 2**, yaitu membangun UI/UX khusus bagi Kreator (*Writer*).

## 1. Algoritma Proteksi Route (Middleware)
- Membuat *Route Group* di `routes/web.php` dengan *prefix* `/author`.
- Melindungi *Route Group* tersebut dengan *middleware* `auth` dan `role:writer`.
- *Reader* (Pembaca biasa) yang mencoba mengakses *link* ini akan dilempar (*redirect*) ke halaman 403 (Unauthorized) atau halaman "Upgrade to Writer".

## 2. Alur Pembuatan IP (Franchise / Novel Baru)
**Komponen:** Livewire `Author\Franchise\Create`
1. *Writer* membuka halaman **"Buat Karya Baru"**.
2. Mengisi formulir: Judul, Sinopsis, dan memilih *Cover Image* (file input).
3. **Validasi Backend:** 
   - Gambar harus berupa `png/jpg/jpeg`, max 2MB.
   - Teks tidak boleh kosong.
4. **Algoritma Konversi WebP (Intervention v4):**
   - File sementara yang diunggah (`$this->cover_image`) diproses oleh `ImageManager`.
   - Gambar di-*scale down* proporsional agar ukurannya tidak terlalu raksasa (misal batas lebar maksimal 800px).
   - Di-*encode* ke format WebP (kualitas 80%).
   - Disimpan ke `storage/app/public/covers/{franchise_uuid}.webp`.
5. Data Franchise disimpan ke database, relasi `author_id` diisi dengan UUID *Writer* yang sedang *login*.

## 3. Alur Manajemen Bab (Chapter Editor)
**Komponen:** Livewire `Author\Chapter\Editor`
1. Menampilkan daftar Bab dari *Franchise* tertentu.
2. *Writer* menekan tombol **"Tulis Bab Baru"**.
3. UI menggunakan **SimpleMDE** (atau editor berbasis teks biasa dengan preview Markdown) agar terasa familier bagi penulis fiksi.
4. Menyimpan *draft* secara *real-time* atau lewat tombol "Simpan Draft" (status `is_published = false`).
5. Tombol **"Publish"** akan merubah status bab dan memperbarui `published_at` menjadi waktu sekarang.

## 4. UI/UX Author Dashboard
- Terintegrasi secara halus dengan *Layout* Jetstream bawaan.
- Menyediakan indikator *View/Like* (untuk MVP ini disimulasikan dari tabel interaksi).
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Algoritma & Log Eksekusi: Fase 2 (Author Dashboard)
*Tanggal: 25 April 2026*

Dokumen ini merancang algoritma dan alur fitur yang akan dikerjakan pada **Fase 2**, yaitu membangun UI/UX khusus bagi Kreator (*Writer*).

## 1. Algoritma Proteksi Route (Middleware)
- Membuat *Route Group* di `routes/web.php` dengan *prefix* `/author`.
- Melindungi *Route Group* tersebut dengan *middleware* `auth` dan `role:writer`.
- *Reader* (Pembaca biasa) yang mencoba mengakses *link* ini akan dilempar (*redirect*) ke halaman 403 (Unauthorized) atau halaman "Upgrade to Writer".

## 2. Alur Pembuatan IP (Franchise / Novel Baru)
**Komponen:** Livewire `Author\Franchise\Create`
1. *Writer* membuka halaman **"Buat Karya Baru"**.
2. Mengisi formulir: Judul, Sinopsis, dan memilih *Cover Image* (file input).
3. **Validasi Backend:** 
   - Gambar harus berupa `png/jpg/jpeg`, max 2MB.
   - Teks tidak boleh kosong.
4. **Algoritma Konversi WebP (Intervention v4):**
   - File sementara yang diunggah (`$this->cover_image`) diproses oleh `ImageManager`.
   - Gambar di-*scale down* proporsional agar ukurannya tidak terlalu raksasa (misal batas lebar maksimal 800px).
   - Di-*encode* ke format WebP (kualitas 80%).
   - Disimpan ke `storage/app/public/covers/{franchise_uuid}.webp`.
5. Data Franchise disimpan ke database, relasi `author_id` diisi dengan UUID *Writer* yang sedang *login*.

## 3. Alur Manajemen Bab (Chapter Editor)
**Komponen:** Livewire `Author\Chapter\Editor`
1. Menampilkan daftar Bab dari *Franchise* tertentu.
2. *Writer* menekan tombol **"Tulis Bab Baru"**.
3. UI menggunakan **SimpleMDE** (atau editor berbasis teks biasa dengan preview Markdown) agar terasa familier bagi penulis fiksi.
4. Menyimpan *draft* secara *real-time* atau lewat tombol "Simpan Draft" (status `is_published = false`).
5. Tombol **"Publish"** akan merubah status bab dan memperbarui `published_at` menjadi waktu sekarang.

## 4. UI/UX Author Dashboard
- Terintegrasi secara halus dengan *Layout* Jetstream bawaan.
- Menyediakan indikator *View/Like* (untuk MVP ini disimulasikan dari tabel interaksi).
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Algoritma & Log Eksekusi: Fase 2 (Author Dashboard)
*Tanggal: 25 April 2026*

Dokumen ini merancang algoritma dan alur fitur yang akan dikerjakan pada **Fase 2**, yaitu membangun UI/UX khusus bagi Kreator (*Writer*).

## 1. Algoritma Proteksi Route (Middleware)
- Membuat *Route Group* di `routes/web.php` dengan *prefix* `/author`.
- Melindungi *Route Group* tersebut dengan *middleware* `auth` dan `role:writer`.
- *Reader* (Pembaca biasa) yang mencoba mengakses *link* ini akan dilempar (*redirect*) ke halaman 403 (Unauthorized) atau halaman "Upgrade to Writer".

## 2. Alur Pembuatan IP (Franchise / Novel Baru)
**Komponen:** Livewire `Author\Franchise\Create`
1. *Writer* membuka halaman **"Buat Karya Baru"**.
2. Mengisi formulir: Judul, Sinopsis, dan memilih *Cover Image* (file input).
3. **Validasi Backend:** 
   - Gambar harus berupa `png/jpg/jpeg`, max 2MB.
   - Teks tidak boleh kosong.
4. **Algoritma Konversi WebP (Intervention v4):**
   - File sementara yang diunggah (`$this->cover_image`) diproses oleh `ImageManager`.
   - Gambar di-*scale down* proporsional agar ukurannya tidak terlalu raksasa (misal batas lebar maksimal 800px).
   - Di-*encode* ke format WebP (kualitas 80%).
   - Disimpan ke `storage/app/public/covers/{franchise_uuid}.webp`.
5. Data Franchise disimpan ke database, relasi `author_id` diisi dengan UUID *Writer* yang sedang *login*.

## 3. Alur Manajemen Bab (Chapter Editor)
**Komponen:** Livewire `Author\Chapter\Editor`
1. Menampilkan daftar Bab dari *Franchise* tertentu.
2. *Writer* menekan tombol **"Tulis Bab Baru"**.
3. UI menggunakan **SimpleMDE** (atau editor berbasis teks biasa dengan preview Markdown) agar terasa familier bagi penulis fiksi.
4. Menyimpan *draft* secara *real-time* atau lewat tombol "Simpan Draft" (status `is_published = false`).
5. Tombol **"Publish"** akan merubah status bab dan memperbarui `published_at` menjadi waktu sekarang.

## 4. UI/UX Author Dashboard
- Terintegrasi secara halus dengan *Layout* Jetstream bawaan.
- Menyediakan indikator *View/Like* (untuk MVP ini disimulasikan dari tabel interaksi).
}

---
*Generated by Nexus Engine | Date: 30/04/2026*

---

#### Opsi B: Konten Baru (2026-04-25_phase_2_author_dashboard.md)
# Algoritma & Log Eksekusi: Fase 2 (Author Dashboard)
*Tanggal: 25 April 2026*

Dokumen ini merancang algoritma dan alur fitur yang akan dikerjakan pada **Fase 2**, yaitu membangun UI/UX khusus bagi Kreator (*Writer*).

## 1. Algoritma Proteksi Route (Middleware)
- Membuat *Route Group* di `routes/web.php` dengan *prefix* `/author`.
- Melindungi *Route Group* tersebut dengan *middleware* `auth` dan `role:writer`.
- *Reader* (Pembaca biasa) yang mencoba mengakses *link* ini akan dilempar (*redirect*) ke halaman 403 (Unauthorized) atau halaman "Upgrade to Writer".

## 2. Alur Pembuatan IP (Franchise / Novel Baru)
**Komponen:** Livewire `Author\Franchise\Create`
1. *Writer* membuka halaman **"Buat Karya Baru"**.
2. Mengisi formulir: Judul, Sinopsis, dan memilih *Cover Image* (file input).
3. **Validasi Backend:** 
   - Gambar harus berupa `png/jpg/jpeg`, max 2MB.
   - Teks tidak boleh kosong.
4. **Algoritma Konversi WebP (Intervention v4):**
   - File sementara yang diunggah (`$this->cover_image`) diproses oleh `ImageManager`.
   - Gambar di-*scale down* proporsional agar ukurannya tidak terlalu raksasa (misal batas lebar maksimal 800px).
   - Di-*encode* ke format WebP (kualitas 80%).
   - Disimpan ke `storage/app/public/covers/{franchise_uuid}.webp`.
5. Data Franchise disimpan ke database, relasi `author_id` diisi dengan UUID *Writer* yang sedang *login*.

## 3. Alur Manajemen Bab (Chapter Editor)
**Komponen:** Livewire `Author\Chapter\Editor`
1. Menampilkan daftar Bab dari *Franchise* tertentu.
2. *Writer* menekan tombol **"Tulis Bab Baru"**.
3. UI menggunakan **SimpleMDE** (atau editor berbasis teks biasa dengan preview Markdown) agar terasa familier bagi penulis fiksi.
4. Menyimpan *draft* secara *real-time* atau lewat tombol "Simpan Draft" (status `is_published = false`).
5. Tombol **"Publish"** akan merubah status bab dan memperbarui `published_at` menjadi waktu sekarang.

## 4. UI/UX Author Dashboard
- Terintegrasi secara halus dengan *Layout* Jetstream bawaan.
- Menyediakan indikator *View/Like* (untuk MVP ini disimulasikan dari tabel interaksi).

---
*Merged by Nexus Distiller | Protokol: Multi-Option | Date: 04/05/2026*
