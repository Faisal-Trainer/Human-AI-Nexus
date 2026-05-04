# PLANNING: Profile Photo Path Resolution Fix

## 1. Konteks & Tujuan
User melaporkan bahwa foto profil tidak muncul setelah di-update. Hasil investigasi menunjukkan bahwa file berhasil diunggah ke `storage/app/public/profile-photos/`, namun rendering gagal karena variabel `APP_URL` di file `.env` masih bernilai `http://localhost`, sedangkan user mengakses aplikasi melalui `http://127.0.0.1:8000` (via artisan serve).

## 2. Rincian Perubahan

### Konfigurasi Lingkungan (`.env`):
- Update `APP_URL` dari `http://localhost` menjadi `http://127.0.0.1:8000`.
- Hal ini akan memastikan link yang dihasilkan oleh `Storage::url()` atau `HasProfilePhoto` trait merujuk ke alamat server yang benar.

### Sinkronisasi (Opsional tapi Direkomendasikan):
- Menjalankan `php artisan config:clear` untuk memastikan perubahan `.env` terbaca oleh aplikasi.

## 3. Langkah Verifikasi
1. Refresh halaman Profile.
2. Cek apakah foto profil muncul di bagian "Profile Information" dan Navigation Bar.
3. Pastikan tidak ada error 404 pada resource gambar di browser console.

---
**STATUS**: MENUNGGU PERSETUJUAN  
**ACTION**: Approve / Revise / Reject
