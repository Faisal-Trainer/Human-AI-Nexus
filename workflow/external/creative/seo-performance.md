# SKILL: SEO & PERFORMANCE STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk optimasi mesin pencari dan performa web.

## 1. Technical SEO (Dynamic Architecture)
- **Semantic HTML & "Double-Layer" Meta Tags:** Gunakan tag `<h1>` hingga `<h6>` secara hierarkis. Gunakan pola *Override* (Global Layer vs Page Layer) untuk Meta Tags dinamis.
- **Dynamic JSON-LD (Structured Data):** Implementasikan Schema.org `@graph` (Best Practice 2026) untuk entitas yang terhubung (`Person`, `ProfessionalService`, `BlogPosting`, `BreadcrumbList`).
- **SEO-Driven Content:** Integrasikan fitur admin untuk mengontrol `meta_title`, `meta_description`, `is_journal`, dan kalkulasi **Reading Time**.
- **Real-Time Indexing:** Gunakan Sitemap dinamis (`seo:generate`) dan Observer Pinging (`seo:ping`) untuk notifikasi instan ke Google/Bing.
- **Canonical:** Wajib menggunakan URL kanonikal untuk mencegah isu *Duplicate Content*.

## 2. Web Performance & Media Protocol (Nexus Golden Standard)
- **Format WebP:** WAJIB konversi seluruh aset visual ke format WebP secara default.
- **Image Compression:** Kualitas 80% sebagai standar keseimbangan optimal.
- **EXIF Stripping:** Hapus metadata EXIF demi privasi dan bandwidth.
- **Fast Navigation:** Gunakan integrasi yang menjaga *crawler-friendly* namun *instant* bagi user (misal: Livewire Navigated).
- **Storage Hygiene:** Implementasikan pembersihan otomatis aset sementara.

## 3. Checklist Performa
- [ ] Skor Lighthouse (Mobile/Desktop) > 90 (Target: 100).
- [ ] Meta Tags & JSON-LD dinamis di-render dengan valid.
- [ ] Sitemap.xml & Observer pinging beroperasi normal.
- [ ] Transisi halaman tidak mengalami layout shift (aspek rasio gambar terjaga).

---
*Dokumen ini diperbarui berdasarkan [NEXUS_SEO_ENGINE_ARCHITECTURE.MD](../../../memory/long_term/NEXUS_SEO_ENGINE_ARCHITECTURE.MD).*
