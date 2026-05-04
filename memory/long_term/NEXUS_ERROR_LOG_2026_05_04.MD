# POST-MORTEM: Log Kesalahan & Perbaikan (2026-05-04)

## 1. Masalah: Redis Serialization (Incomplete Object)
- **Gejala**: Error `Internal Server Error: The script tried to call a method on an incomplete object`.
- **Penyebab**: Mencoba menyimpan seluruh objek `LengthAwarePaginator` Laravel ke dalam Redis Cache. Beberapa objek internal Laravel tidak dapat di-unserialize dengan sempurna jika kelasnya tidak dimuat dengan urutan yang tepat atau mengandung data kompleks.
- **Tindakan Perbaikan**: Mencoba rekonstruksi manual Paginator.
- **Pelajaran**: Hindari caching objek Paginator utuh; simpan data mentahnya saja atau lakukan query langsung jika tidak terlalu berat.

## 2. Masalah: Property Access on String (Serialization Failure)
- **Gejala**: Error `Attempt to read property "slug" on string` pada file `index.blade.php`.
- **Penyebab**: Setelah mencoba rekonstruksi Paginator, data yang diambil dari Redis kembali sebagai string/array yang tidak ter-cast sempurna kembali ke Model, menyebabkan kegagalan saat mengakses properti objek.
- **Tindakan Perbaikan**: Menonaktifkan cache pada hasil pencarian untuk sementara demi stabilitas 100%.
- **Pelajaran**: Serialisasi Model di Redis memerlukan penanganan `Collection` yang sangat hati-hati.

## 3. Masalah: Syntax Error di SitemapController
- **Gejala**: Error 500 saat mengakses `/sitemap.xml`.
- **Penyebab**: Adanya karakter `}}` (kurung kurawal ganda) yang tidak sengaja tertulis di akhir file controller saat pengeditan cepat.
- **Tindakan Perbaikan**: Menghapus karakter berlebih dan melakukan verifikasi sintaks.
- **Pelajaran**: Selalu periksa penutup kelas/metode setelah melakukan `replace_file_content`.

## 4. Masalah: IDE Linting Warnings (Undefined Methods)
- **Gejala**: Peringatan merah pada IDE untuk metode `->title()` dan `getCollection()`.
- **Penyebab**: Menggunakan metode yang secara teknis valid tapi tidak terdeteksi oleh static analyzer IDE karena masalah type-hinting pada Laravel/Livewire.
- **Tindakan Perbaikan**: Migrasi ke atribut modern `#[Title]` (Livewire 3) dan menggunakan `items()` alih-alih `getCollection()`.
- **Pelajaran**: Gunakan atribut kelas jika tersedia untuk meningkatkan kompatibilitas dengan IDE.

## 5. Masalah: Redundant Layout (Navbar Ganda)
- **Gejala**: Navigasi muncul dua kali atau layout tidak konsisten pada halaman detail novel.
- **Penyebab**: Melewatkan file `Franchise/Show.php` saat melakukan standardisasi layout global.
- **Tindakan Perbaikan**: Membersihkan layout manual di blade terkait dan memastikan penggunaan unified navbar.

## 6. Masalah: Kesalahan Path File
- **Gejala**: Tool error `File not found`.
- **Penyebab**: Typo pada pemanggilan tool (terdapat spasi pada path: `\ .env`).
- **Tindakan Perbaikan**: Koreksi path dan kirim ulang perintah.

---
**OPERATOR**: Nexus AI Assistant  
**DATE**: 2026-05-04  
**STATUS**: ALL RESOLVED
