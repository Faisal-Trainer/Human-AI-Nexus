# SKILL: UI DESIGN SYSTEM & STYLING STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk implementasi antarmuka dan sistem desain.

## 1. Sistem Warna & Tema

- **Source of Truth:** Gunakan [NEXUS_DESIGN_SYSTEM_GUIDELINES.md](../../../knowledge/NEXUS_DESIGN_SYSTEM_GUIDELINES.md).
- **Aesthetic:** Terapkan **Soft-Tech Geometry** (12px radius) dan **Tonal Layering** untuk kedalaman.

## 2. Tipografi & Spacing

- **Typography:** Gunakan **Newsreader/Merriweather** untuk narasi dan **Inter** untuk UI sesuai panduan HUB.
- **Line-height:** Pertahankan 1.6 - 1.7 untuk teks panjang guna mencegah kelelahan mata.

## 3. Komponen & State

- **Interactive UX [UPDATE: 2026-04-28]:** Gunakan standar [NEXUS_INTERACTIVE_UX_PATTERNS.md](../../../knowledge/NEXUS_INTERACTIVE_UX_PATTERNS.md).
- **Livewire Attributes:** WAJIB gunakan `#[Layout]` di atas `render()` untuk performa IDE maksimal.

## 4. Checklist UI

- [ ] Warna sudah sesuai dengan `DESIGN.md` / `DARKDESIGN.md`.
- [ ] Elemen UI konsisten di seluruh halaman.
- [ ] Animasi/Transisi terasa halus dan tidak mengganggu UX.
- [ ] Tidak ada elemen yang "tumpang tindih" pada layar kecil.

---

_Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `docs/agent/ui-engineer.md`._
