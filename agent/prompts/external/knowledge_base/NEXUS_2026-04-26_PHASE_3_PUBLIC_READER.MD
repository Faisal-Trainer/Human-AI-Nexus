
# 🛠 NEXUS AUTO-MERGE: NEXUS_2026-04-26_PHASE_3_PUBLIC_READER.MD
> Gabungan otomatis antara file lama (2026-04-26_phase_3_public_reader.md) dan file eksisting.

### 🧩 Pilihan Opsi Tak Terbatas:

#### Opsi A: Konten Eksisting
# 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-26_phase_3_public_reader.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-26_phase_3_public_reader.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in 2026-04-26_phase_3_public_reader.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # Algoritma & Log Eksekusi: Fase 3 (Public Reader Frontend)
*Tanggal: 26 April 2026*

Dokumen ini merancang algoritma dan alur fitur yang akan dikerjakan pada **Fase 3**, yaitu membangun antarmuka publik bagi para pembaca (*Reader*) untuk menjelajahi dan membaca novel (Franchise).

## 1. Alur Eksplorasi Novel (Homepage)
**Komponen:** Livewire `Public\Franchise\Index` (Bisa menggantikan rute `/` atau `/explore`).
1. Mengambil data `Franchise` dari *database* yang memiliki setidaknya 1 Bab (*Chapter*) yang berstatus `is_published = true`.
2. Menampilkan daftar novel dalam bentuk *grid*.
3. Fitur filter sederhana (opsional untuk MVP: berdasarkan *Genre* atau *Latest Update*).

## 2. Alur Detail Karya (Franchise Show)
**Komponen:** Livewire `Public\Franchise\Show`
1. Rute: `/novel/{slug}`
2. Menampilkan informasi detail:
   - Sampul (*Cover Image* berformat WebP).
   - Judul & Penulis.
   - Sinopsis.
3. Menampilkan daftar Bab (*Chapter List*):
   - Hanya memuat bab yang `is_published = true`.
   - Diurutkan berdasarkan `chapter_number` (Ascending).
4. **Interaksi Dasar (UX):** Tombol *Bookmark* atau *Like* (akan dibangun sebagai sub-komponen Livewire agar reaktif tanpa *reload*).

## 3. Alur Membaca Bab (Chapter Reader)
**Komponen:** Livewire `Public\Chapter\Show`
1. Rute: `/novel/{franchise_slug}/chapter/{chapter_slug}`
2. Memuat konten bab.
3. **Konversi Markdown:** Karena *Writer* menulis menggunakan Markdown (via SimpleMDE di Fase 2), maka sistem harus melakukan *parsing* dari teks Markdown menjadi HTML menggunakan fungsi bawaan Laravel `Str::markdown($chapter->content)` agar tampil indah bagi pembaca.
4. **Navigasi UX:** Tombol "Bab Sebelumnya" dan "Bab Selanjutnya".
5. **Komentar:** Di bagian bawah halaman, menyediakan kolom interaksi (*Comment Section*) bagi *user* yang sudah *login*.

## 4. Parser Markdown & Keamanan (Sanitization)
- Fungsi `Str::markdown()` milik Laravel akan secara otomatis mengubah karakter `**teks**` menjadi `<strong>teks</strong>` dan seterunsnya.
- **Penting:** Pastikan untuk menonaktifkan tag HTML mentah (*escape HTML*) agar penulis tidak bisa menyisipkan skrip XSS (*Cross-Site Scripting*) berbahaya ke dalam cerita mereka.
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Algoritma & Log Eksekusi: Fase 3 (Public Reader Frontend)
*Tanggal: 26 April 2026*

Dokumen ini merancang algoritma dan alur fitur yang akan dikerjakan pada **Fase 3**, yaitu membangun antarmuka publik bagi para pembaca (*Reader*) untuk menjelajahi dan membaca novel (Franchise).

## 1. Alur Eksplorasi Novel (Homepage)
**Komponen:** Livewire `Public\Franchise\Index` (Bisa menggantikan rute `/` atau `/explore`).
1. Mengambil data `Franchise` dari *database* yang memiliki setidaknya 1 Bab (*Chapter*) yang berstatus `is_published = true`.
2. Menampilkan daftar novel dalam bentuk *grid*.
3. Fitur filter sederhana (opsional untuk MVP: berdasarkan *Genre* atau *Latest Update*).

## 2. Alur Detail Karya (Franchise Show)
**Komponen:** Livewire `Public\Franchise\Show`
1. Rute: `/novel/{slug}`
2. Menampilkan informasi detail:
   - Sampul (*Cover Image* berformat WebP).
   - Judul & Penulis.
   - Sinopsis.
3. Menampilkan daftar Bab (*Chapter List*):
   - Hanya memuat bab yang `is_published = true`.
   - Diurutkan berdasarkan `chapter_number` (Ascending).
4. **Interaksi Dasar (UX):** Tombol *Bookmark* atau *Like* (akan dibangun sebagai sub-komponen Livewire agar reaktif tanpa *reload*).

## 3. Alur Membaca Bab (Chapter Reader)
**Komponen:** Livewire `Public\Chapter\Show`
1. Rute: `/novel/{franchise_slug}/chapter/{chapter_slug}`
2. Memuat konten bab.
3. **Konversi Markdown:** Karena *Writer* menulis menggunakan Markdown (via SimpleMDE di Fase 2), maka sistem harus melakukan *parsing* dari teks Markdown menjadi HTML menggunakan fungsi bawaan Laravel `Str::markdown($chapter->content)` agar tampil indah bagi pembaca.
4. **Navigasi UX:** Tombol "Bab Sebelumnya" dan "Bab Selanjutnya".
5. **Komentar:** Di bagian bawah halaman, menyediakan kolom interaksi (*Comment Section*) bagi *user* yang sudah *login*.

## 4. Parser Markdown & Keamanan (Sanitization)
- Fungsi `Str::markdown()` milik Laravel akan secara otomatis mengubah karakter `**teks**` menjadi `<strong>teks</strong>` dan seterunsnya.
- **Penting:** Pastikan untuk menonaktifkan tag HTML mentah (*escape HTML*) agar penulis tidak bisa menyisipkan skrip XSS (*Cross-Site Scripting*) berbahaya ke dalam cerita mereka.
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Algoritma & Log Eksekusi: Fase 3 (Public Reader Frontend)
*Tanggal: 26 April 2026*

Dokumen ini merancang algoritma dan alur fitur yang akan dikerjakan pada **Fase 3**, yaitu membangun antarmuka publik bagi para pembaca (*Reader*) untuk menjelajahi dan membaca novel (Franchise).

## 1. Alur Eksplorasi Novel (Homepage)
**Komponen:** Livewire `Public\Franchise\Index` (Bisa menggantikan rute `/` atau `/explore`).
1. Mengambil data `Franchise` dari *database* yang memiliki setidaknya 1 Bab (*Chapter*) yang berstatus `is_published = true`.
2. Menampilkan daftar novel dalam bentuk *grid*.
3. Fitur filter sederhana (opsional untuk MVP: berdasarkan *Genre* atau *Latest Update*).

## 2. Alur Detail Karya (Franchise Show)
**Komponen:** Livewire `Public\Franchise\Show`
1. Rute: `/novel/{slug}`
2. Menampilkan informasi detail:
   - Sampul (*Cover Image* berformat WebP).
   - Judul & Penulis.
   - Sinopsis.
3. Menampilkan daftar Bab (*Chapter List*):
   - Hanya memuat bab yang `is_published = true`.
   - Diurutkan berdasarkan `chapter_number` (Ascending).
4. **Interaksi Dasar (UX):** Tombol *Bookmark* atau *Like* (akan dibangun sebagai sub-komponen Livewire agar reaktif tanpa *reload*).

## 3. Alur Membaca Bab (Chapter Reader)
**Komponen:** Livewire `Public\Chapter\Show`
1. Rute: `/novel/{franchise_slug}/chapter/{chapter_slug}`
2. Memuat konten bab.
3. **Konversi Markdown:** Karena *Writer* menulis menggunakan Markdown (via SimpleMDE di Fase 2), maka sistem harus melakukan *parsing* dari teks Markdown menjadi HTML menggunakan fungsi bawaan Laravel `Str::markdown($chapter->content)` agar tampil indah bagi pembaca.
4. **Navigasi UX:** Tombol "Bab Sebelumnya" dan "Bab Selanjutnya".
5. **Komentar:** Di bagian bawah halaman, menyediakan kolom interaksi (*Comment Section*) bagi *user* yang sudah *login*.

## 4. Parser Markdown & Keamanan (Sanitization)
- Fungsi `Str::markdown()` milik Laravel akan secara otomatis mengubah karakter `**teks**` menjadi `<strong>teks</strong>` dan seterunsnya.
- **Penting:** Pastikan untuk menonaktifkan tag HTML mentah (*escape HTML*) agar penulis tidak bisa menyisipkan skrip XSS (*Cross-Site Scripting*) berbahaya ke dalam cerita mereka.
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # Algoritma & Log Eksekusi: Fase 3 (Public Reader Frontend)
*Tanggal: 26 April 2026*

Dokumen ini merancang algoritma dan alur fitur yang akan dikerjakan pada **Fase 3**, yaitu membangun antarmuka publik bagi para pembaca (*Reader*) untuk menjelajahi dan membaca novel (Franchise).

## 1. Alur Eksplorasi Novel (Homepage)
**Komponen:** Livewire `Public\Franchise\Index` (Bisa menggantikan rute `/` atau `/explore`).
1. Mengambil data `Franchise` dari *database* yang memiliki setidaknya 1 Bab (*Chapter*) yang berstatus `is_published = true`.
2. Menampilkan daftar novel dalam bentuk *grid*.
3. Fitur filter sederhana (opsional untuk MVP: berdasarkan *Genre* atau *Latest Update*).

## 2. Alur Detail Karya (Franchise Show)
**Komponen:** Livewire `Public\Franchise\Show`
1. Rute: `/novel/{slug}`
2. Menampilkan informasi detail:
   - Sampul (*Cover Image* berformat WebP).
   - Judul & Penulis.
   - Sinopsis.
3. Menampilkan daftar Bab (*Chapter List*):
   - Hanya memuat bab yang `is_published = true`.
   - Diurutkan berdasarkan `chapter_number` (Ascending).
4. **Interaksi Dasar (UX):** Tombol *Bookmark* atau *Like* (akan dibangun sebagai sub-komponen Livewire agar reaktif tanpa *reload*).

## 3. Alur Membaca Bab (Chapter Reader)
**Komponen:** Livewire `Public\Chapter\Show`
1. Rute: `/novel/{franchise_slug}/chapter/{chapter_slug}`
2. Memuat konten bab.
3. **Konversi Markdown:** Karena *Writer* menulis menggunakan Markdown (via SimpleMDE di Fase 2), maka sistem harus melakukan *parsing* dari teks Markdown menjadi HTML menggunakan fungsi bawaan Laravel `Str::markdown($chapter->content)` agar tampil indah bagi pembaca.
4. **Navigasi UX:** Tombol "Bab Sebelumnya" dan "Bab Selanjutnya".
5. **Komentar:** Di bagian bawah halaman, menyediakan kolom interaksi (*Comment Section*) bagi *user* yang sudah *login*.

## 4. Parser Markdown & Keamanan (Sanitization)
- Fungsi `Str::markdown()` milik Laravel akan secara otomatis mengubah karakter `**teks**` menjadi `<strong>teks</strong>` dan seterunsnya.
- **Penting:** Pastikan untuk menonaktifkan tag HTML mentah (*escape HTML*) agar penulis tidak bisa menyisipkan skrip XSS (*Cross-Site Scripting*) berbahaya ke dalam cerita mereka.
}

---
*Generated by Nexus Engine | Date: 30/04/2026*

---

#### Opsi B: Konten Baru (2026-04-26_phase_3_public_reader.md)
# Algoritma & Log Eksekusi: Fase 3 (Public Reader Frontend)
*Tanggal: 26 April 2026*

Dokumen ini merancang algoritma dan alur fitur yang akan dikerjakan pada **Fase 3**, yaitu membangun antarmuka publik bagi para pembaca (*Reader*) untuk menjelajahi dan membaca novel (Franchise).

## 1. Alur Eksplorasi Novel (Homepage)
**Komponen:** Livewire `Public\Franchise\Index` (Bisa menggantikan rute `/` atau `/explore`).
1. Mengambil data `Franchise` dari *database* yang memiliki setidaknya 1 Bab (*Chapter*) yang berstatus `is_published = true`.
2. Menampilkan daftar novel dalam bentuk *grid*.
3. Fitur filter sederhana (opsional untuk MVP: berdasarkan *Genre* atau *Latest Update*).

## 2. Alur Detail Karya (Franchise Show)
**Komponen:** Livewire `Public\Franchise\Show`
1. Rute: `/novel/{slug}`
2. Menampilkan informasi detail:
   - Sampul (*Cover Image* berformat WebP).
   - Judul & Penulis.
   - Sinopsis.
3. Menampilkan daftar Bab (*Chapter List*):
   - Hanya memuat bab yang `is_published = true`.
   - Diurutkan berdasarkan `chapter_number` (Ascending).
4. **Interaksi Dasar (UX):** Tombol *Bookmark* atau *Like* (akan dibangun sebagai sub-komponen Livewire agar reaktif tanpa *reload*).

## 3. Alur Membaca Bab (Chapter Reader)
**Komponen:** Livewire `Public\Chapter\Show`
1. Rute: `/novel/{franchise_slug}/chapter/{chapter_slug}`
2. Memuat konten bab.
3. **Konversi Markdown:** Karena *Writer* menulis menggunakan Markdown (via SimpleMDE di Fase 2), maka sistem harus melakukan *parsing* dari teks Markdown menjadi HTML menggunakan fungsi bawaan Laravel `Str::markdown($chapter->content)` agar tampil indah bagi pembaca.
4. **Navigasi UX:** Tombol "Bab Sebelumnya" dan "Bab Selanjutnya".
5. **Komentar:** Di bagian bawah halaman, menyediakan kolom interaksi (*Comment Section*) bagi *user* yang sudah *login*.

## 4. Parser Markdown & Keamanan (Sanitization)
- Fungsi `Str::markdown()` milik Laravel akan secara otomatis mengubah karakter `**teks**` menjadi `<strong>teks</strong>` dan seterunsnya.
- **Penting:** Pastikan untuk menonaktifkan tag HTML mentah (*escape HTML*) agar penulis tidak bisa menyisipkan skrip XSS (*Cross-Site Scripting*) berbahaya ke dalam cerita mereka.

---
*Merged by Nexus Distiller | Protokol: Multi-Option | Date: 04/05/2026*
