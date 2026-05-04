# ⚡ NEXUS LIVEWIRE & UI GUIDELINES (Distilled from Golden Standard)

Panduan ini ditujukan untuk pengembangan UI modern menggunakan stack TALL (Tailwind, Alpine, Laravel, Livewire).

## 1. Component Definition
- **PHP Attributes**: Gunakan `#[Layout]` attribute di atas method `render()` untuk mendefinisikan layout. Hindari method chaining `->layout()` untuk mencegah *Undefined Method* linting error di IDE.
- **Atomic Components**: Pecah UI besar menjadi komponen-komponen kecil (Livewire) yang dapat digunakan kembali.

## 2. Interaction Security
- **Explicit Authorizations**: Setiap aksi dalam komponen Livewire (seperti `delete()`, `update()`) harus melewati pengecekan `Gate` atau `$user->can()`.

## 3. UI Aesthetics
- Gunakan **Rich Aesthetics**: Vibrant colors, dark modes, glassmorphism, dan micro-animations.
- Pastikan LCP (Largest Contentful Paint) tetap berada di bawah 2.5 detik melalui lazy loading komponen.

---
*Status: Institutional Knowledge (UI/UX Layer).*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, ui-ux]
