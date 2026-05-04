# PLANNING: Profile Mobile Responsiveness & Premium Layout Refactor

## 1. Konteks & Tujuan
User melaporkan bahwa pada lebar layar 360px (mobile), halaman profile memiliki struktur grid yang tidak jelas dan kurang responsif. Tujuan planning ini adalah melakukan modernisasi komponen layout profile (Form Section, Action Section, Section Title) agar sepenuhnya optimal untuk layar kecil sekaligus memberikan tampilan yang lebih premium.

## 2. Rincian Perubahan

### Komponen Layout (`components/`):
1.  **`section-title.blade.php`**:
    - Peningkatan tipografi judul ke `text-xl` dan `font-bold`.
    - Sinkronisasi warna teks dengan tokens (`on-surface`, `outline`).
2.  **`form-section.blade.php`**:
    - Perubahan grid dari `grid-cols-6` (statis) menjadi `grid-cols-1 sm:grid-cols-6`. Hal ini memastikan input field mengambil lebar penuh secara natural di layar 360px.
    - Penyesuaian padding mobile dari `px-md` menjadi `px-4` untuk memaksimalkan ruang konten.
    - Penambahan border halus dan shadow untuk kesan kartu yang lebih modern.
3.  **`action-section.blade.php`**:
    - Sinkronisasi style dengan `form-section`.
4.  **`section-border.blade.php`**:
    - Mengganti border standar menjadi `border-outline/10` yang lebih halus.

### Halaman Utama (`profile/show.blade.php`):
- Menghapus pembatas garis (`section-border`) dan menggantinya dengan sistem spacing vertikal `space-y-xl`.
- Penambahan **Micro-Animations** (fade-in slide) saat halaman dimuat untuk meningkatkan user experience.
- Optimasi padding container utama untuk perangkat mobile.

## 3. Langkah Verifikasi
1. Simulasi browser pada lebar 360px (Mobile S).
2. Pastikan tidak ada elemen yang terpotong (overflow) dan padding kiri-kanan seimbang.
3. Pastikan transisi antar section terlihat bersih dan modern.

---
**STATUS**: MENUNGGU PERSETUJUAN  
**ACTION**: Approve / Revise / Reject
