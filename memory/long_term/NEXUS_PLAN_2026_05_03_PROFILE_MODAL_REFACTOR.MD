# PLANNING: Profile Section & Modal Premium Refactor

## 1. Konteks & Tujuan
User melaporkan tampilan modal "Delete Account" yang terlihat tidak optimal (rendah kontras dan tidak selaras). Tujuan planning ini adalah melakukan refactor pada komponen dasar Jetstream (Modal, Button, Input) agar sepenuhnya kompatibel dengan sistem desain NexusLore dan Tailwind v4.

## 2. Rincian Perubahan

### Komponen Dasar (Base Components):
1.  **`modal.blade.php`**:
    - Implementasi `backdrop-blur-sm` pada overlay.
    - Penggunaan warna overlay yang lebih kontras (`bg-(--color-on-surface)/40`).
    - Update radius menggunakan `rounded-(--radius-lg)`.
2.  **`dialog-modal.blade.php` & `confirmation-modal.blade.php`**:
    - Update spacing menggunakan variabel `--spacing-*`.
    - Update warna teks menggunakan `--color-on-surface` dan `--color-outline`.
    - Penambahan border pemisah yang halus.
3.  **`input.blade.php`**:
    - Sinkronisasi warna border dan focus ring dengan `--color-primary`.
    - Penambahan efek glassmorphism ringan (`bg-white/50 backdrop-blur-sm`).
4.  **Buttons (`button`, `danger-button`, `secondary-button`)**:
    - Update radius ke `--radius-md`.
    - Peningkatan padding untuk kesan lebih premium.
    - Sinkronisasi warna dengan palet proyek.

### Fitur Spesifik:
1.  **`delete-user-form.blade.php`**:
    - Refactor teks dan spacing agar lebih rapi dan terbaca.

## 3. Hasil yang Diharapkan
- Modal memiliki kontras tinggi dan terlihat modern (premium look).
- Konsistensi antara halaman Auth dan halaman Profile.
- Pengalaman pengguna yang lebih baik melalui feedback visual yang jelas.

---
**STATUS**: MENUNGGU PERSETUJUAN  
**ACTION**: Approve / Revise / Reject
