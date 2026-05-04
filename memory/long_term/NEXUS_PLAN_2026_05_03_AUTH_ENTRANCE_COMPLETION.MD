# PLANNING: Auth Entrance Completion (Secondary Pages)

## 1. Konteks & Tujuan
Setelah Login dan Register berhasil direfactor dengan sistem spasi baru dan desain premium, langkah selanjutnya adalah menuntaskan seluruh halaman di folder `auth/` agar memiliki konsistensi visual dan UX yang sama. Ini mencakup halaman Forgot Password, Reset Password, Email Verification, dan Two-Factor Challenge.

## 2. Rincian Perubahan

### Halaman yang akan Direfactor:
1.  **Forgot Password (`forgot-password.blade.php`)**:
    - Update teks instruksi agar lebih "clean".
    - Terapkan variabel `--spacing-md` untuk padding dan margin.
    - Sinkronisasi dengan komponen `authentication-card` yang sudah di-update.
2.  **Reset Password (`reset-password.blade.php`)**:
    - Optimasi form input (Password & Confirm Password).
    - Pastikan spasi antar field konsisten dengan halaman Register.
3.  **Email Verification (`verify-email.blade.php`)**:
    - Layouting pesan instruksi agar lebih nyaman dibaca (UX-First).
    - Penempatan tombol "Resend" dan "Logout" yang lebih intuitif.
4.  **Confirm Password (`confirm-password.blade.php`)**:
    - Proteksi akses area sensitif dengan desain yang selaras.
5.  **Two-Factor Challenge (`two-factor-challenge.blade.php`)**:
    - Layouting input kode 2FA agar lebih "thumb-friendly" di mobile.

## 3. Strategi Implementasi
- Tetap menggunakan `x-guest-layout` dan `x-authentication-card`.
- Menghapus utility classes Tailwind yang hardcoded (seperti `mb-4`, `mt-4`) dan menggantinya dengan variabel CSS atau utility yang merujuk pada sistem spasi baru jika memungkinkan, atau minimal menjaga konsistensi visual.
- Fokus pada *Cognitive Load* rendah: instruksi jelas, input fokus.

## 4. Langkah Verifikasi
1. Cek setiap rute auth secara manual (`/forgot-password`, `/reset-password`, dll).
2. Pastikan responsivitas mobile tetap terjaga (Thumb-zone optimization).

---
**STATUS**: MENUNGGU PERSETUJUAN  
**ACTION**: Approve / Revise / Reject
