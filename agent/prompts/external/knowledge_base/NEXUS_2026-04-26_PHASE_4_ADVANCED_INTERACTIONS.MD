
# 🛠 NEXUS AUTO-MERGE: NEXUS_2026-04-26_PHASE_4_ADVANCED_INTERACTIONS.MD
> Gabungan otomatis antara file lama (2026-04-26_phase_4_advanced_interactions.md) dan file eksisting.

### 🧩 Pilihan Opsi Tak Terbatas:

#### Opsi A: Konten Eksisting
# 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-26_phase_4_advanced_interactions.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-26_phase_4_advanced_interactions.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-26_phase_4_advanced_interactions.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # Algoritma & Log Eksekusi: Fase 4 (Advanced Interactions & Reader Dashboard)
*Tanggal: 26 April 2026*

Dokumen ini merancang algoritma dan alur fitur untuk **Fase 4**, yaitu sistem interaksi lanjutan bagi para pembaca (Reader) agar aplikasi NEXUS LORE terasa hidup dan personal.

## 1. Fitur Bookmark (Perpustakaan Pribadi)
**Konsep:** Pembaca dapat menyimpan novel ke dalam profil mereka untuk dibaca nanti atau untuk melacak daftar bacaan.
**Komponen:** Livewire `Public\Interactions\BookmarkButton`
1. Ditempatkan di halaman Detail Karya (`Public\Franchise\Show`).
2. Jika *user* belum *login*, arahkan ke halaman *Login*.
3. Jika sudah *login*, tombol bersifat *toggle* (Simpan / Hapus dari Perpustakaan).
4. Menyimpan data relasi *Many-to-Many* di tabel `bookmarks` (user_id, franchise_id).

## 2. Fitur Rating (Like/Dislike)
**Konsep:** Pembaca dapat memberikan apresiasi berupa Like atau Dislike pada sebuah novel untuk memengaruhi peringkat keseluruhan novel tersebut di katalog.
**Komponen:** Livewire `Public\Interactions\RatingWidget`
1. Ditempatkan di halaman Detail Karya (`Public\Franchise\Show`).
2. Menyimpan data di tabel `ratings` (user_id, franchise_id, rating_value). Nilai: 1 untuk Like, 0 untuk Dislike.
3. Sistem akan menampilkan total jumlah Like dan Dislike secara reaktif.

## 3. Reader Dashboard (Perpustakaan Pengguna)
**Konsep:** Sebuah ruang khusus (*Dashboard*) bagi pengguna berstatus `reader` untuk melihat novel apa saja yang mereka ikuti.
**Komponen:** Livewire `Reader\Library\Index`
1. Menimpa atau memodifikasi rute `/dashboard` bawaan Jetstream khusus untuk pengguna `reader`.
2. Melakukan *query* dari model `User` -> `bookmarks` -> `Franchise` beserta informasi bab terbarunya.
3. Menampilkan daftar novel dalam format *grid/list* dengan tautan langsung untuk "Lanjutkan Membaca".

## 4. Persiapan Logika Masa Depan (IP-First Web 3.0)
- Menambahkan tab khusus di *Author Dashboard* bernama "Derivative Works" (Karya Turunan) yang kelak akan memungkinkan penulis untuk menerima atau menolak tawaran adaptasi komik/animasi dari *user* lain. (Opsional untuk MVP saat ini, sekadar persiapan struktur *route*).
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Algoritma & Log Eksekusi: Fase 4 (Advanced Interactions & Reader Dashboard)
*Tanggal: 26 April 2026*

Dokumen ini merancang algoritma dan alur fitur untuk **Fase 4**, yaitu sistem interaksi lanjutan bagi para pembaca (Reader) agar aplikasi NEXUS LORE terasa hidup dan personal.

## 1. Fitur Bookmark (Perpustakaan Pribadi)
**Konsep:** Pembaca dapat menyimpan novel ke dalam profil mereka untuk dibaca nanti atau untuk melacak daftar bacaan.
**Komponen:** Livewire `Public\Interactions\BookmarkButton`
1. Ditempatkan di halaman Detail Karya (`Public\Franchise\Show`).
2. Jika *user* belum *login*, arahkan ke halaman *Login*.
3. Jika sudah *login*, tombol bersifat *toggle* (Simpan / Hapus dari Perpustakaan).
4. Menyimpan data relasi *Many-to-Many* di tabel `bookmarks` (user_id, franchise_id).

## 2. Fitur Rating (Like/Dislike)
**Konsep:** Pembaca dapat memberikan apresiasi berupa Like atau Dislike pada sebuah novel untuk memengaruhi peringkat keseluruhan novel tersebut di katalog.
**Komponen:** Livewire `Public\Interactions\RatingWidget`
1. Ditempatkan di halaman Detail Karya (`Public\Franchise\Show`).
2. Menyimpan data di tabel `ratings` (user_id, franchise_id, rating_value). Nilai: 1 untuk Like, 0 untuk Dislike.
3. Sistem akan menampilkan total jumlah Like dan Dislike secara reaktif.

## 3. Reader Dashboard (Perpustakaan Pengguna)
**Konsep:** Sebuah ruang khusus (*Dashboard*) bagi pengguna berstatus `reader` untuk melihat novel apa saja yang mereka ikuti.
**Komponen:** Livewire `Reader\Library\Index`
1. Menimpa atau memodifikasi rute `/dashboard` bawaan Jetstream khusus untuk pengguna `reader`.
2. Melakukan *query* dari model `User` -> `bookmarks` -> `Franchise` beserta informasi bab terbarunya.
3. Menampilkan daftar novel dalam format *grid/list* dengan tautan langsung untuk "Lanjutkan Membaca".

## 4. Persiapan Logika Masa Depan (IP-First Web 3.0)
- Menambahkan tab khusus di *Author Dashboard* bernama "Derivative Works" (Karya Turunan) yang kelak akan memungkinkan penulis untuk menerima atau menolak tawaran adaptasi komik/animasi dari *user* lain. (Opsional untuk MVP saat ini, sekadar persiapan struktur *route*).
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Algoritma & Log Eksekusi: Fase 4 (Advanced Interactions & Reader Dashboard)
*Tanggal: 26 April 2026*

Dokumen ini merancang algoritma dan alur fitur untuk **Fase 4**, yaitu sistem interaksi lanjutan bagi para pembaca (Reader) agar aplikasi NEXUS LORE terasa hidup dan personal.

## 1. Fitur Bookmark (Perpustakaan Pribadi)
**Konsep:** Pembaca dapat menyimpan novel ke dalam profil mereka untuk dibaca nanti atau untuk melacak daftar bacaan.
**Komponen:** Livewire `Public\Interactions\BookmarkButton`
1. Ditempatkan di halaman Detail Karya (`Public\Franchise\Show`).
2. Jika *user* belum *login*, arahkan ke halaman *Login*.
3. Jika sudah *login*, tombol bersifat *toggle* (Simpan / Hapus dari Perpustakaan).
4. Menyimpan data relasi *Many-to-Many* di tabel `bookmarks` (user_id, franchise_id).

## 2. Fitur Rating (Like/Dislike)
**Konsep:** Pembaca dapat memberikan apresiasi berupa Like atau Dislike pada sebuah novel untuk memengaruhi peringkat keseluruhan novel tersebut di katalog.
**Komponen:** Livewire `Public\Interactions\RatingWidget`
1. Ditempatkan di halaman Detail Karya (`Public\Franchise\Show`).
2. Menyimpan data di tabel `ratings` (user_id, franchise_id, rating_value). Nilai: 1 untuk Like, 0 untuk Dislike.
3. Sistem akan menampilkan total jumlah Like dan Dislike secara reaktif.

## 3. Reader Dashboard (Perpustakaan Pengguna)
**Konsep:** Sebuah ruang khusus (*Dashboard*) bagi pengguna berstatus `reader` untuk melihat novel apa saja yang mereka ikuti.
**Komponen:** Livewire `Reader\Library\Index`
1. Menimpa atau memodifikasi rute `/dashboard` bawaan Jetstream khusus untuk pengguna `reader`.
2. Melakukan *query* dari model `User` -> `bookmarks` -> `Franchise` beserta informasi bab terbarunya.
3. Menampilkan daftar novel dalam format *grid/list* dengan tautan langsung untuk "Lanjutkan Membaca".

## 4. Persiapan Logika Masa Depan (IP-First Web 3.0)
- Menambahkan tab khusus di *Author Dashboard* bernama "Derivative Works" (Karya Turunan) yang kelak akan memungkinkan penulis untuk menerima atau menolak tawaran adaptasi komik/animasi dari *user* lain. (Opsional untuk MVP saat ini, sekadar persiapan struktur *route*).
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Algoritma & Log Eksekusi: Fase 4 (Advanced Interactions & Reader Dashboard)
*Tanggal: 26 April 2026*

Dokumen ini merancang algoritma dan alur fitur untuk **Fase 4**, yaitu sistem interaksi lanjutan bagi para pembaca (Reader) agar aplikasi NEXUS LORE terasa hidup dan personal.

## 1. Fitur Bookmark (Perpustakaan Pribadi)
**Konsep:** Pembaca dapat menyimpan novel ke dalam profil mereka untuk dibaca nanti atau untuk melacak daftar bacaan.
**Komponen:** Livewire `Public\Interactions\BookmarkButton`
1. Ditempatkan di halaman Detail Karya (`Public\Franchise\Show`).
2. Jika *user* belum *login*, arahkan ke halaman *Login*.
3. Jika sudah *login*, tombol bersifat *toggle* (Simpan / Hapus dari Perpustakaan).
4. Menyimpan data relasi *Many-to-Many* di tabel `bookmarks` (user_id, franchise_id).

## 2. Fitur Rating (Like/Dislike)
**Konsep:** Pembaca dapat memberikan apresiasi berupa Like atau Dislike pada sebuah novel untuk memengaruhi peringkat keseluruhan novel tersebut di katalog.
**Komponen:** Livewire `Public\Interactions\RatingWidget`
1. Ditempatkan di halaman Detail Karya (`Public\Franchise\Show`).
2. Menyimpan data di tabel `ratings` (user_id, franchise_id, rating_value). Nilai: 1 untuk Like, 0 untuk Dislike.
3. Sistem akan menampilkan total jumlah Like dan Dislike secara reaktif.

## 3. Reader Dashboard (Perpustakaan Pengguna)
**Konsep:** Sebuah ruang khusus (*Dashboard*) bagi pengguna berstatus `reader` untuk melihat novel apa saja yang mereka ikuti.
**Komponen:** Livewire `Reader\Library\Index`
1. Menimpa atau memodifikasi rute `/dashboard` bawaan Jetstream khusus untuk pengguna `reader`.
2. Melakukan *query* dari model `User` -> `bookmarks` -> `Franchise` beserta informasi bab terbarunya.
3. Menampilkan daftar novel dalam format *grid/list* dengan tautan langsung untuk "Lanjutkan Membaca".

## 4. Persiapan Logika Masa Depan (IP-First Web 3.0)
- Menambahkan tab khusus di *Author Dashboard* bernama "Derivative Works" (Karya Turunan) yang kelak akan memungkinkan penulis untuk menerima atau menolak tawaran adaptasi komik/animasi dari *user* lain. (Opsional untuk MVP saat ini, sekadar persiapan struktur *route*).
}

---
*Generated by Nexus Engine | Date: 30/04/2026*

---

#### Opsi B: Konten Baru (2026-04-26_phase_4_advanced_interactions.md)
# Algoritma & Log Eksekusi: Fase 4 (Advanced Interactions & Reader Dashboard)
*Tanggal: 26 April 2026*

Dokumen ini merancang algoritma dan alur fitur untuk **Fase 4**, yaitu sistem interaksi lanjutan bagi para pembaca (Reader) agar aplikasi NEXUS LORE terasa hidup dan personal.

## 1. Fitur Bookmark (Perpustakaan Pribadi)
**Konsep:** Pembaca dapat menyimpan novel ke dalam profil mereka untuk dibaca nanti atau untuk melacak daftar bacaan.
**Komponen:** Livewire `Public\Interactions\BookmarkButton`
1. Ditempatkan di halaman Detail Karya (`Public\Franchise\Show`).
2. Jika *user* belum *login*, arahkan ke halaman *Login*.
3. Jika sudah *login*, tombol bersifat *toggle* (Simpan / Hapus dari Perpustakaan).
4. Menyimpan data relasi *Many-to-Many* di tabel `bookmarks` (user_id, franchise_id).

## 2. Fitur Rating (Like/Dislike)
**Konsep:** Pembaca dapat memberikan apresiasi berupa Like atau Dislike pada sebuah novel untuk memengaruhi peringkat keseluruhan novel tersebut di katalog.
**Komponen:** Livewire `Public\Interactions\RatingWidget`
1. Ditempatkan di halaman Detail Karya (`Public\Franchise\Show`).
2. Menyimpan data di tabel `ratings` (user_id, franchise_id, rating_value). Nilai: 1 untuk Like, 0 untuk Dislike.
3. Sistem akan menampilkan total jumlah Like dan Dislike secara reaktif.

## 3. Reader Dashboard (Perpustakaan Pengguna)
**Konsep:** Sebuah ruang khusus (*Dashboard*) bagi pengguna berstatus `reader` untuk melihat novel apa saja yang mereka ikuti.
**Komponen:** Livewire `Reader\Library\Index`
1. Menimpa atau memodifikasi rute `/dashboard` bawaan Jetstream khusus untuk pengguna `reader`.
2. Melakukan *query* dari model `User` -> `bookmarks` -> `Franchise` beserta informasi bab terbarunya.
3. Menampilkan daftar novel dalam format *grid/list* dengan tautan langsung untuk "Lanjutkan Membaca".

## 4. Persiapan Logika Masa Depan (IP-First Web 3.0)
- Menambahkan tab khusus di *Author Dashboard* bernama "Derivative Works" (Karya Turunan) yang kelak akan memungkinkan penulis untuk menerima atau menolak tawaran adaptasi komik/animasi dari *user* lain. (Opsional untuk MVP saat ini, sekadar persiapan struktur *route*).

---
*Merged by Nexus Distiller | Protokol: Multi-Option | Date: 04/05/2026*
