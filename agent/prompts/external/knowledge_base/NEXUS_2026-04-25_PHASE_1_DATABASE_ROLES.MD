
# 🛠 NEXUS AUTO-MERGE: NEXUS_2026-04-25_PHASE_1_DATABASE_ROLES.MD
> Gabungan otomatis antara file lama (2026-04-25_phase_1_database_roles.md) dan file eksisting.

### 🧩 Pilihan Opsi Tak Terbatas:

#### Opsi A: Konten Eksisting
# 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-25_phase_1_database_roles.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-25_phase_1_database_roles.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-25_phase_1_database_roles.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # Algoritma & Log Eksekusi: Fase 1 (Database & Roles)
*Tanggal: 25 April 2026*

Dokumen ini mencatat detail teknis, algoritma, dan *flow* (alur) dari fitur-fitur yang dibangun pada **Fase 1**.

## 1. Algoritma Autentikasi & Role (Spatie)
- **Library:** `spatie/laravel-permission`
- **Alur Pendaftaran User Baru:**
  1. *User* mendaftar melalui form Fortify (Jetstream).
  2. *Event* atau `Fortify::createUsersUsing` mencegat (*intercept*) pendaftaran.
  3. Setelah *user* terbuat di database, sistem menjalankan `$user->assignRole('reader')`.
- **Proteksi Rute (Middleware):**
  - Rute membaca novel bersifat publik (bebas diakses).
  - Rute membuat/mengedit novel dibungkus dengan `middleware(['role:writer'])`.

## 2. Struktur Database UUID (Persiapan Web 3.0)
Untuk memastikan data bisa dipetakan ke *Smart Contract* di masa depan:
- **Tipe Data Primary Key:** Bukan lagi `id() / auto_increment`, melainkan `uuid()`.
- **Implementasi di Laravel Model:**
  - Menambahkan *trait* `Illuminate\Database\Eloquent\Concerns\HasUuids` pada setiap model utama (`Franchise`, `Chapter`, `User`).

## 3. Algoritma Konversi Gambar (WebP)
- **Library:** `intervention/image` (v3)
- **Alur Upload Cover:**
  1. *Writer* mengunggah file gambar (bisa berupa PNG, JPG, JPEG).
  2. Sistem membaca file tersebut di memori menggunakan *ImageManager*.
  3. Gambar di-*resize* ke dimensi standar (misal: rasio 2:3, maksimal lebar 800px) agar konsisten.
  4. Gambar di-*encode* menjadi format WebP dengan kualitas 80%.
  5. File WebP disimpan ke *disk storage* (misal: `public/covers/uuid_name.webp`).
  6. Path file disimpan ke dalam kolom `cover_image` pada tabel `Franchises`.

## 4. Struktur Relasi (IP-First)
- **Franchise (Novel) $\rightarrow$ Chapters:** `1 to Many` (Satu novel memiliki banyak bab).
- **User $\rightarrow$ Franchise (Bookmark):** `Many to Many` melalui tabel pivot `bookmarks`.
- **User $\rightarrow$ Franchise (Like/Rating):** `Many to Many` melalui tabel pivot `ratings`.
- **User $\rightarrow$ Chapter (Comment):** `1 to Many` (User bisa berkomentar di bab tertentu).
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Algoritma & Log Eksekusi: Fase 1 (Database & Roles)
*Tanggal: 25 April 2026*

Dokumen ini mencatat detail teknis, algoritma, dan *flow* (alur) dari fitur-fitur yang dibangun pada **Fase 1**.

## 1. Algoritma Autentikasi & Role (Spatie)
- **Library:** `spatie/laravel-permission`
- **Alur Pendaftaran User Baru:**
  1. *User* mendaftar melalui form Fortify (Jetstream).
  2. *Event* atau `Fortify::createUsersUsing` mencegat (*intercept*) pendaftaran.
  3. Setelah *user* terbuat di database, sistem menjalankan `$user->assignRole('reader')`.
- **Proteksi Rute (Middleware):**
  - Rute membaca novel bersifat publik (bebas diakses).
  - Rute membuat/mengedit novel dibungkus dengan `middleware(['role:writer'])`.

## 2. Struktur Database UUID (Persiapan Web 3.0)
Untuk memastikan data bisa dipetakan ke *Smart Contract* di masa depan:
- **Tipe Data Primary Key:** Bukan lagi `id() / auto_increment`, melainkan `uuid()`.
- **Implementasi di Laravel Model:**
  - Menambahkan *trait* `Illuminate\Database\Eloquent\Concerns\HasUuids` pada setiap model utama (`Franchise`, `Chapter`, `User`).

## 3. Algoritma Konversi Gambar (WebP)
- **Library:** `intervention/image` (v3)
- **Alur Upload Cover:**
  1. *Writer* mengunggah file gambar (bisa berupa PNG, JPG, JPEG).
  2. Sistem membaca file tersebut di memori menggunakan *ImageManager*.
  3. Gambar di-*resize* ke dimensi standar (misal: rasio 2:3, maksimal lebar 800px) agar konsisten.
  4. Gambar di-*encode* menjadi format WebP dengan kualitas 80%.
  5. File WebP disimpan ke *disk storage* (misal: `public/covers/uuid_name.webp`).
  6. Path file disimpan ke dalam kolom `cover_image` pada tabel `Franchises`.

## 4. Struktur Relasi (IP-First)
- **Franchise (Novel) $\rightarrow$ Chapters:** `1 to Many` (Satu novel memiliki banyak bab).
- **User $\rightarrow$ Franchise (Bookmark):** `Many to Many` melalui tabel pivot `bookmarks`.
- **User $\rightarrow$ Franchise (Like/Rating):** `Many to Many` melalui tabel pivot `ratings`.
- **User $\rightarrow$ Chapter (Comment):** `1 to Many` (User bisa berkomentar di bab tertentu).
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Algoritma & Log Eksekusi: Fase 1 (Database & Roles)
*Tanggal: 25 April 2026*

Dokumen ini mencatat detail teknis, algoritma, dan *flow* (alur) dari fitur-fitur yang dibangun pada **Fase 1**.

## 1. Algoritma Autentikasi & Role (Spatie)
- **Library:** `spatie/laravel-permission`
- **Alur Pendaftaran User Baru:**
  1. *User* mendaftar melalui form Fortify (Jetstream).
  2. *Event* atau `Fortify::createUsersUsing` mencegat (*intercept*) pendaftaran.
  3. Setelah *user* terbuat di database, sistem menjalankan `$user->assignRole('reader')`.
- **Proteksi Rute (Middleware):**
  - Rute membaca novel bersifat publik (bebas diakses).
  - Rute membuat/mengedit novel dibungkus dengan `middleware(['role:writer'])`.

## 2. Struktur Database UUID (Persiapan Web 3.0)
Untuk memastikan data bisa dipetakan ke *Smart Contract* di masa depan:
- **Tipe Data Primary Key:** Bukan lagi `id() / auto_increment`, melainkan `uuid()`.
- **Implementasi di Laravel Model:**
  - Menambahkan *trait* `Illuminate\Database\Eloquent\Concerns\HasUuids` pada setiap model utama (`Franchise`, `Chapter`, `User`).

## 3. Algoritma Konversi Gambar (WebP)
- **Library:** `intervention/image` (v3)
- **Alur Upload Cover:**
  1. *Writer* mengunggah file gambar (bisa berupa PNG, JPG, JPEG).
  2. Sistem membaca file tersebut di memori menggunakan *ImageManager*.
  3. Gambar di-*resize* ke dimensi standar (misal: rasio 2:3, maksimal lebar 800px) agar konsisten.
  4. Gambar di-*encode* menjadi format WebP dengan kualitas 80%.
  5. File WebP disimpan ke *disk storage* (misal: `public/covers/uuid_name.webp`).
  6. Path file disimpan ke dalam kolom `cover_image` pada tabel `Franchises`.

## 4. Struktur Relasi (IP-First)
- **Franchise (Novel) $\rightarrow$ Chapters:** `1 to Many` (Satu novel memiliki banyak bab).
- **User $\rightarrow$ Franchise (Bookmark):** `Many to Many` melalui tabel pivot `bookmarks`.
- **User $\rightarrow$ Franchise (Like/Rating):** `Many to Many` melalui tabel pivot `ratings`.
- **User $\rightarrow$ Chapter (Comment):** `1 to Many` (User bisa berkomentar di bab tertentu).
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Algoritma & Log Eksekusi: Fase 1 (Database & Roles)
*Tanggal: 25 April 2026*

Dokumen ini mencatat detail teknis, algoritma, dan *flow* (alur) dari fitur-fitur yang dibangun pada **Fase 1**.

## 1. Algoritma Autentikasi & Role (Spatie)
- **Library:** `spatie/laravel-permission`
- **Alur Pendaftaran User Baru:**
  1. *User* mendaftar melalui form Fortify (Jetstream).
  2. *Event* atau `Fortify::createUsersUsing` mencegat (*intercept*) pendaftaran.
  3. Setelah *user* terbuat di database, sistem menjalankan `$user->assignRole('reader')`.
- **Proteksi Rute (Middleware):**
  - Rute membaca novel bersifat publik (bebas diakses).
  - Rute membuat/mengedit novel dibungkus dengan `middleware(['role:writer'])`.

## 2. Struktur Database UUID (Persiapan Web 3.0)
Untuk memastikan data bisa dipetakan ke *Smart Contract* di masa depan:
- **Tipe Data Primary Key:** Bukan lagi `id() / auto_increment`, melainkan `uuid()`.
- **Implementasi di Laravel Model:**
  - Menambahkan *trait* `Illuminate\Database\Eloquent\Concerns\HasUuids` pada setiap model utama (`Franchise`, `Chapter`, `User`).

## 3. Algoritma Konversi Gambar (WebP)
- **Library:** `intervention/image` (v3)
- **Alur Upload Cover:**
  1. *Writer* mengunggah file gambar (bisa berupa PNG, JPG, JPEG).
  2. Sistem membaca file tersebut di memori menggunakan *ImageManager*.
  3. Gambar di-*resize* ke dimensi standar (misal: rasio 2:3, maksimal lebar 800px) agar konsisten.
  4. Gambar di-*encode* menjadi format WebP dengan kualitas 80%.
  5. File WebP disimpan ke *disk storage* (misal: `public/covers/uuid_name.webp`).
  6. Path file disimpan ke dalam kolom `cover_image` pada tabel `Franchises`.

## 4. Struktur Relasi (IP-First)
- **Franchise (Novel) $\rightarrow$ Chapters:** `1 to Many` (Satu novel memiliki banyak bab).
- **User $\rightarrow$ Franchise (Bookmark):** `Many to Many` melalui tabel pivot `bookmarks`.
- **User $\rightarrow$ Franchise (Like/Rating):** `Many to Many` melalui tabel pivot `ratings`.
- **User $\rightarrow$ Chapter (Comment):** `1 to Many` (User bisa berkomentar di bab tertentu).
}

---
*Generated by Nexus Engine | Date: 30/04/2026*

---

#### Opsi B: Konten Baru (2026-04-25_phase_1_database_roles.md)
# Algoritma & Log Eksekusi: Fase 1 (Database & Roles)
*Tanggal: 25 April 2026*

Dokumen ini mencatat detail teknis, algoritma, dan *flow* (alur) dari fitur-fitur yang dibangun pada **Fase 1**.

## 1. Algoritma Autentikasi & Role (Spatie)
- **Library:** `spatie/laravel-permission`
- **Alur Pendaftaran User Baru:**
  1. *User* mendaftar melalui form Fortify (Jetstream).
  2. *Event* atau `Fortify::createUsersUsing` mencegat (*intercept*) pendaftaran.
  3. Setelah *user* terbuat di database, sistem menjalankan `$user->assignRole('reader')`.
- **Proteksi Rute (Middleware):**
  - Rute membaca novel bersifat publik (bebas diakses).
  - Rute membuat/mengedit novel dibungkus dengan `middleware(['role:writer'])`.

## 2. Struktur Database UUID (Persiapan Web 3.0)
Untuk memastikan data bisa dipetakan ke *Smart Contract* di masa depan:
- **Tipe Data Primary Key:** Bukan lagi `id() / auto_increment`, melainkan `uuid()`.
- **Implementasi di Laravel Model:**
  - Menambahkan *trait* `Illuminate\Database\Eloquent\Concerns\HasUuids` pada setiap model utama (`Franchise`, `Chapter`, `User`).

## 3. Algoritma Konversi Gambar (WebP)
- **Library:** `intervention/image` (v3)
- **Alur Upload Cover:**
  1. *Writer* mengunggah file gambar (bisa berupa PNG, JPG, JPEG).
  2. Sistem membaca file tersebut di memori menggunakan *ImageManager*.
  3. Gambar di-*resize* ke dimensi standar (misal: rasio 2:3, maksimal lebar 800px) agar konsisten.
  4. Gambar di-*encode* menjadi format WebP dengan kualitas 80%.
  5. File WebP disimpan ke *disk storage* (misal: `public/covers/uuid_name.webp`).
  6. Path file disimpan ke dalam kolom `cover_image` pada tabel `Franchises`.

## 4. Struktur Relasi (IP-First)
- **Franchise (Novel) $\rightarrow$ Chapters:** `1 to Many` (Satu novel memiliki banyak bab).
- **User $\rightarrow$ Franchise (Bookmark):** `Many to Many` melalui tabel pivot `bookmarks`.
- **User $\rightarrow$ Franchise (Like/Rating):** `Many to Many` melalui tabel pivot `ratings`.
- **User $\rightarrow$ Chapter (Comment):** `1 to Many` (User bisa berkomentar di bab tertentu).

---
*Merged by Nexus Distiller | Protokol: Multi-Option | Date: 04/05/2026*
