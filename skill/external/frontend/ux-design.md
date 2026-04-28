# SKILL: UX & USABILITY STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar usability dan praktik terbaik untuk pengalaman pengguna.

## 1. Design Reasoning Loop (Nexus Golden Standard)
Sebelum mulai membangun UI, Agent wajib menjalankan siklus penalaran:
- **Product Matching:** Identifikasi kategori industri (misal: B2B SaaS, Fintech, Healthcare).
- **Style Selection:** Pilih dari 67 gaya (Minimalism, Aurora UI, Bento, Glassmorphism, dll) yang paling relevan dengan target audiens.
- **Master + Overrides Pattern:** Gunakan file `MASTER.md` untuk desain global dan folder `pages/` untuk deviasi spesifik guna menjaga konsistensi lintas sesi.
- **Aesthetics:** Gunakan *Rich Aesthetics* dengan transisi halus (150-300ms) dan hindari anti-patterns visual untuk industri profesional.
- **Nexus Lumina Integration [UPDATE: 2026-04-28]:** Gunakan standar [NEXUS_DESIGN_SYSTEM_GUIDELINES.md](../../../knowledge/NEXUS_DESIGN_SYSTEM_GUIDELINES.md). Utamakan "Institutional Innovation" dengan **Lumina Dark** (Deep Slate/Indigo) untuk kenyamanan membaca maksimal.

## 2. Accessibility & Quality (WCAG AA)
- **Contrast:** WAJIB menjaga kontras minimal 4.5:1 untuk teks.
- **Icons:** Gunakan SVG berkualitas (Lucide/Heroicons), dilarang menggunakan emoji sebagai ikon UI.
- **Keyboard Nav:** Pastikan seluruh elemen interaktif memiliki *focus state* yang terlihat jelas.

## 3. Microcopy & Messaging
- Pesan error harus deskriptif dan memberikan solusi (bukan hanya "Terjadi kesalahan").
- Gunakan bahasa yang ramah dan konsisten di seluruh aplikasi.
- Hindari jargon teknis untuk user non-teknis.

## 4. Checklist Usability
- [ ] Apakah user tahu di mana mereka berada? (Breadcrumbs/Nav Active).
- [ ] Apakah user tahu apa yang harus dilakukan selanjutnya? (CTA yang jelas).
- [ ] Apakah ada penanganan saat data kosong (Empty State)?
- [ ] Apakah proses yang lama memiliki indikator progres?

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `docs/agent/ux-engineer.md`.*
