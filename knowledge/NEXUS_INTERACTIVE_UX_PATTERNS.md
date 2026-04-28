# 🔄 NEXUS INTERACTIVE UX PATTERNS (Reactivity Standard)

Standar ini memastikan seluruh interaksi pengguna terasa hidup, cepat, dan personal tanpa perlu memuat ulang halaman.

## 1. Reactive Elements (TALL Stack)
- **Livewire Components**: Gunakan komponen Livewire untuk fitur yang membutuhkan umpan balik instan (Bookmark, Like, Komentar).
- **No-Reload Policy**: Seluruh interaksi mikro (micro-interactions) harus terjadi di sisi klien atau melalui XHR/Livewire tanpa memicu full page reload.

## 2. Interaction Logic
- **Bookmark Button**: State harus berubah secara instan secara visual (*Optimistic UI*) sebelum sinkronisasi ke database selesai.
- **Rating Widget**: Tampilkan total jumlah Like/Dislike secara dinamis. Gunakan animasi transisi halus saat nilai berubah.
- **Comment Section**: Komentar baru harus muncul di bagian atas daftar segera setelah tombol 'Kirim' ditekan.

## 3. User Authorization Flow
- **Guest-to-User Transition**: Komponen interaktif harus tetap terlihat oleh tamu (Guest), namun memicu *modal login* atau *call-to-action* saat ditekan, bukan mengarahkan ke halaman baru yang memutus alur.

## 4. Content Presentation
- **Markdown Rendering**: Gunakan `Str::markdown()` dengan kelas CSS `prose` (Tailwind Typography) untuk merender konten tulisan agar tetap elegan dan konsisten dengan desain Lumina.

---
*Status: Institutional Knowledge (UX Layer).*
