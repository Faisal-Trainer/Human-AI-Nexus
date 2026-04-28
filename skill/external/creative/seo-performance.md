# SKILL: SEO & PERFORMANCE STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk optimasi mesin pencari dan performa web.

## 1. Technical SEO
- **Semantic HTML:** Gunakan tag `<h1>` hingga `<h6>` secara hierarkis.
- **Meta Tags:** Pastikan setiap halaman unik memiliki Title Tag (< 60 karakter) dan Meta Description (< 160 karakter).
- **Structured Data:** Gunakan JSON-LD (Schema.org) untuk Rich Snippets (misal: Article, Breadcrumb, FAQ).
- **Canonical:** Gunakan tag canonical untuk mencegah konten duplikat.

## 2. Web Performance & Media Protocol (Nexus Golden Standard)
- **Format WebP:** WAJIB konversi seluruh aset visual ke format WebP. Format JPEG/PNG hanya diperbolehkan sebagai fallback jika mutlak diperlukan.
- **Image Compression:** Gunakan kualitas 80% sebagai standar emas untuk keseimbangan ukuran dan ketajaman.
- **EXIF Stripping:** WAJIB menghapus seluruh metadata EXIF untuk privasi dan efisiensi bandwidth.
- **Resizing & Lazy Loading:** Resize gambar ke dimensi maksimum penggunaan (misal: 800px-1200px) dan terapkan `loading="lazy"` pada elemen di bawah lipatan (*below-the-fold*).
- **Storage Hygiene [UPDATE: 2026-04-28]:** Gunakan standar [NEXUS_MEDIA_HANDLING.md](../../../knowledge/NEXUS_MEDIA_HANDLING.md). Implementasikan skrip pembersihan otomatis untuk aset sementara guna menjaga kebersihan server.

## 3. Checklist Performa
- [ ] Skor Lighthouse (Mobile/Desktop) > 90.
- [ ] Gambar sudah dikompresi tanpa mengurangi kualitas secara signifikan.
- [ ] Link internal menggunakan struktur URL yang ramah SEO (Slug-based).
- [ ] Sitemap.xml dan Robots.txt dikonfigurasi dengan benar.

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `docs/agent/seo-performance-specialist.md`.*
