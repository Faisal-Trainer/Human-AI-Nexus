## 1. Design Reasoning Loop
Sebelum mulai membangun UI, Agent wajib menjalankan siklus penalaran:
1. **Identify Product**: Tentukan kategori (misal: B2B SaaS, Fintech, Healthcare).
2. **Select Style**: Pilih dari 67 gaya (Minimalism, Aurora UI, Bento, Glassmorphism, dll) yang paling sesuai.
3. **Typography & Color**: Pilih pairing font dan palet warna yang mewakili "Mood" industri tersebut.
4. **UX Phase Check**: Identifikasi apakah user berada pada fase **Orientation** (butuh estetika klasik) atau **Incorporation** (butuh efisiensi fungsional).
5. **Anti-Pattern Check**: Pastikan tidak ada elemen visual yang dilarang untuk industri tersebut.

## 2. Master + Overrides Pattern
Gunakan struktur hierarkis untuk konsistensi:
- **`MASTER.md`**: Global Source of Truth (Colors, Typography, Spacing, Core Components).
- **`pages/*.md`**: Overrides (Hanya mencatat deviasi dari Master untuk halaman spesifik).

## 3. Pre-Delivery Checklist (Zero Flaws UI)
- [ ] **Contrast**: Minimal 4.5:1 untuk teks (WCAG AA).
- [ ] **Aesthetics**: Hover states dengan transisi halus (150-300ms).
- [ ] **Icons**: SVG berkualitas (Lucide/Heroicons), dilarang menggunakan emoji.
- [ ] **Accessibility**: Focus states terlihat untuk navigasi keyboard.
- [ ] **Mobile-First**: Prioritaskan layout 375px sebelum scaling ke desktop (Responsive Priority).
- [ ] **First-Click Success**: Pastikan elemen aksi utama (Visual/Playback) terlihat tanpa scrolling berlebih.
- [ ] **Responsive**: Uji pada breakpoints 375px, 768px, 1024px, 1440px.

---
*Status: Institutional Knowledge (Design Intelligence).*
*Referenced from: UI UX Pro Max Skill.*

---
*Status: Institutional Knowledge (Design Intelligence).*
*Referenced from: ui-ux-pro-max-skill.*
