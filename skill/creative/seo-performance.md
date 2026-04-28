# SKILL: SEO & PERFORMANCE STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk optimasi mesin pencari dan performa web.

## 1. Technical SEO
- **Semantic HTML:** Gunakan tag `<h1>` hingga `<h6>` secara hierarkis.
- **Meta Tags:** Pastikan setiap halaman unik memiliki Title Tag (< 60 karakter) dan Meta Description (< 160 karakter).
- **Structured Data:** Gunakan JSON-LD (Schema.org) untuk Rich Snippets (misal: Article, Breadcrumb, FAQ).
- **Canonical:** Gunakan tag canonical untuk mencegah konten duplikat.

## 2. Web Performance (Core Web Vitals)
- **Image Optimization:** Gunakan format WebP/Avif, terapkan Lazy Loading, dan tentukan Width/Height untuk mencegah Layout Shift (CLS).
- **Font Loading:** Gunakan `font-display: swap` untuk mencegah teks tidak muncul saat loading.
- **Code Splitting:** Minimalkan ukuran file JS/CSS yang dimuat di awal (Above the fold).
- **Caching:** Gunakan strategi caching yang tepat (Browser Cache, Server Cache).

## 3. Checklist Performa
- [ ] Skor Lighthouse (Mobile/Desktop) > 90.
- [ ] Gambar sudah dikompresi tanpa mengurangi kualitas secara signifikan.
- [ ] Link internal menggunakan struktur URL yang ramah SEO (Slug-based).
- [ ] Sitemap.xml dan Robots.txt dikonfigurasi dengan benar.

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `docs/agent/seo-performance-specialist.md`.*
