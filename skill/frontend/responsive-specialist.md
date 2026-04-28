# SKILL: RESPONSIVE DESIGN STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk menciptakan website yang responsif dan adaptif.

## 1. Standar Breakpoint
- **Mobile Portrait**: `320px - 480px`.
- **Mobile Landscape**: `481px - 600px`.
- **Tablet Portrait**: `601px - 800px`.
- **Tablet Landscape**: `801px - 1024px`.
- **Desktop**: `> 1024px`.
- Gunakan pendekatan **Mobile-First Design** jika memungkinkan.

## 2. Teknik Layout
- **Flexbox & Grid**: Gunakan CSS Grid untuk layout makro dan Flexbox untuk layout mikro.
- **Fluid Sizing**: Gunakan unit relatif seperti `%`, `vw`, `vh`, atau `rem` alih-alih `px` untuk container utama.
- **Images**: Pastikan gambar memiliki `max-width: 100%` agar tidak overflow.

## 3. Interaksi Mobile (Touch)
- **Touch Targets**: Pastikan tombol memiliki ukuran minimal 44x44px untuk menghindari salah klik.
- **Font Scaling**: Jaga agar ukuran font tidak menjadi terlalu kecil di layar mobile (minimal 16px untuk body text).

## 4. Audit Checklist
- Apakah ada elemen yang terpotong (horizontal overflow)?
- Apakah navigasi mudah dibuka di layar kecil (contoh: Hamburger Menu)?
- Apakah jarak antar elemen (spacing) tetap konsisten di semua layar?

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `agent/responsive-specialist.md`.*
