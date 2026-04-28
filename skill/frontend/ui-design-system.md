# SKILL: UI DESIGN SYSTEM & STYLING STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk implementasi antarmuka dan sistem desain.

## 1. Sistem Warna & Tema
- **Source of Truth:** Gunakan panduan warna dari `docs/design/DESIGN.md` (Light Mode) dan `docs/design/DARKDESIGN.md` (Dark Mode).
- **Implementation:** Gunakan variabel CSS atau utility classes (Tailwind) untuk konsistensi.
- **Accessibility:** Pastikan kontras warna memenuhi standar WCAG.

## 2. Tipografi & Spacing
- **Typography:** Gunakan skala font yang konsisten (misal: h1, h2, body-sm, body-lg).
- **Spacing:** Gunakan sistem grid atau spacing scale (misal: 4px, 8px, 16px, 32px) untuk margin dan padding.
- **Hierarchy:** Gunakan berat font (font-weight) dan ukuran untuk menciptakan hierarki informasi.

## 3. Komponen & State
- **Reusability:** Bangun komponen yang modular dan dapat digunakan kembali.
- **Interaction States:** Tentukan tampilan untuk Hover, Active, Focus, dan Disabled state.
- **Responsive Design:** Pastikan tampilan optimal di berbagai ukuran layar (Mobile, Tablet, Desktop).

## 4. Checklist UI
- [ ] Warna sudah sesuai dengan `DESIGN.md` / `DARKDESIGN.md`.
- [ ] Elemen UI konsisten di seluruh halaman.
- [ ] Animasi/Transisi terasa halus dan tidak mengganggu UX.
- [ ] Tidak ada elemen yang "tumpang tindih" pada layar kecil.

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `docs/agent/ui-engineer.md`.*
