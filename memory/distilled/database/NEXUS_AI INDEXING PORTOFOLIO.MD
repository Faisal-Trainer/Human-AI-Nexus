# AI Indexing & Discoverability — faisalyusra.my.id
> **VERSION**: v1 | **Last Updated**: 26/05/2026


> Catatan teknis hasil diskusi dengan AI Engineer · Mei 2026

---

## Konteks

SEO tradisional masih relevan, tapi sekarang ada lapisan baru: **AI Discoverability** — yaitu agar websitemu bisa dibaca, dipahami, dan dikutip oleh sistem AI seperti ChatGPT, Perplexity, Google AI Overview, Claude, dan Bing Copilot.

Website: **https://faisalyusra.my.id**  
Stack: Laravel + Livewire + Filament + Tailwind CSS  
Lokasi: Bukittinggi, Sumatera Barat

---

## Audit Hasil Cek

### ✅ Yang Sudah Ada (Bagus)

| Item | Keterangan |
|------|------------|
| Meta description | Ada, deskriptif |
| Meta keywords | Ada |
| OG Tags | Lengkap (og:title, og:image, og:description, dll) |
| Twitter Card | `summary_large_image` |
| Google Site Verification | Ada |
| `robots: index, follow` | Ada |
| Canonical URL | Dinamis via `url()->current()` |
| **JSON-LD Schema (`@graph`)** | Sudah ada & lengkap di `layout/app.blade.php` |
| **`@stack('schemas')`** | Siap untuk inject schema tambahan per halaman |

### ❌ Yang Belum Ada

| Item | Prioritas |
|------|-----------|
| `llms.txt` | 🔴 Tinggi |
| AI crawler di `robots.txt` | 🔴 Tinggi |
| FAQ Schema di `/service` | 🟡 Medium |
| `ArticleSchema` di halaman blog detail | 🟡 Medium |
| JSON Feed (`/feed.json`) | 🟡 Medium |
| Sitemap blog dinamis | 🟡 Medium |

---

## Detail JSON-LD Schema (Sudah Ada)

Lokasi file: `resources/views/layouts/app.blade.php`  
Pattern: **Satu `<script>` + `@graph`** — best practice 2026

### Schema yang sudah terdaftar:

**1. Person Schema**
```json
{
  "@type": "Person",
  "@id": "https://faisalyusra.my.id/#person",
  "name": "Muhammad Faisal Alyusra",
  "alternateName": "Faisal Yusra",
  "jobTitle": "IT Support Spesialis | Web Developer & Digital Consultant",
  "knowsAbout": ["Laravel", "Livewire", "Filament", "Tailwind CSS", "..."],
  "alumniOf": "UIN Sjech M Djamil Djambek Bukittinggi",
  "sameAs": ["LinkedIn", "Google Maps", "GitHub", "Google Scholar"]
}
```

**2. ProfessionalService Schema**
```json
{
  "@type": "ProfessionalService",
  "@id": "https://faisalyusra.my.id/#service",
  "name": "Faisal Yusra | Web Developer & Digital Consultant Bukittinggi",
  "geo": { "latitude": -0.311639, "longitude": 100.38725 },
  "openingHours": "Senin–Sabtu, 08:00–17:00",
  "founder": { "@id": "https://faisalyusra.my.id/#person" }
}
```

**3. WebPage Schema (Dinamis)**
```json
{
  "@type": "WebPage",
  "@id": "[url()->current()]#webpage",
  "publisher": { "@id": "https://faisalyusra.my.id/#service" }
}
```

**4. Blog Schema (Conditional)**
> Aktif otomatis kalau route = `/blog`
```json
{
  "@type": ["WebPage", "Blog"],
  "mainEntity": {
    "@type": "Blog",
    "name": "Blog Faisal Yusra"
  }
}
```

---

## Yang Perlu Dibuat

### 1. `llms.txt`

**Konsep:** File plain text/markdown yang kasih tau LLM crawler siapa kamu dan konten apa yang relevan. Seperti `robots.txt` tapi untuk AI.

**Lokasi:** `public/llms.txt` → akses via `https://faisalyusra.my.id/llms.txt`

**Opsi implementasi:**
- **Statis** — file `.txt` biasa di folder `public/`
- **Dinamis** — route Laravel yang generate konten dari database (lebih powerful)

**Contoh isi:**
```
# Faisal Yusra — Web Developer & Digital Consultant

> Web Developer dan Digital Consultant berbasis di Bukittinggi, Sumatera Barat.
> Membantu UMKM lokal tumbuh melalui teknologi dan memberdayakan talent muda digital.

## Layanan Utama
- Web Application Development (Laravel, PHP)
- IT Support & Maintenance untuk UMKM
- UI/UX Design fungsional
- Digital Consulting untuk bisnis lokal
- Goes To School Program
- Social Media Handling

## Halaman Penting
- [Tentang](https://faisalyusra.my.id/about)
- [Layanan & Harga](https://faisalyusra.my.id/service)
- [Portofolio](https://faisalyusra.my.id/portfolio)
- [Blog](https://faisalyusra.my.id/blog)
- [Kontak](https://faisalyusra.my.id/contact)
```

---

### 2. Update `robots.txt`

Tambahkan izin untuk AI crawler utama:

```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GoogleExtendedBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://faisalyusra.my.id/sitemap.xml
```

---

### 3. FAQ Schema di `/service`

Inject via `@push('schemas')` di view `service.blade.php`.

```blade
@push('schemas')
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Berapa biaya jasa pembuatan website di Bukittinggi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Harga bervariasi tergantung kebutuhan. Tersedia paket untuk UMKM yang disesuaikan dengan tahap bisnis dan anggaran. Hubungi untuk konsultasi gratis."
      }
    },
    {
      "@type": "Question",
      "name": "Apa saja layanan yang tersedia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Web Application, IT Support, UI/UX Design, Digital Consulting, Goes To School Program, dan Social Media Handling."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah melayani klien di luar Bukittinggi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, melayani seluruh Indonesia secara remote, dengan fokus utama di Sumatera Barat."
      }
    }
  ]
}
</script>
@endpush
```

---

### 4. Article Schema di Blog Detail

Inject di `blog/show.blade.php` atau `post.blade.php`.

```blade
@push('schemas')
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{ $post->title }}",
  "description": "{{ $post->excerpt }}",
  "datePublished": "{{ $post->created_at->toIso8601String() }}",
  "dateModified": "{{ $post->updated_at->toIso8601String() }}",
  "author": { "@id": "https://faisalyusra.my.id/#person" },
  "publisher": { "@id": "https://faisalyusra.my.id/#service" },
  "url": "{{ url()->current() }}",
  "image": "{{ $post->cover_image ?? asset('img/loggo.webp') }}"
}
</script>
@endpush
```

---

### 5. Blog sebagai "DB Publik" yang Bisa Dibaca AI

Supaya konten blog bisa di-consume secara universal oleh AI dan mesin lain:

| Format | Endpoint | Fungsi |
|--------|----------|--------|
| **Sitemap XML** | `/sitemap.xml` | Wajib — yang pertama di-scan AI crawler |
| **JSON Feed** | `/feed.json` | Modern, mudah di-parse AI |
| **RSS Feed** | `/feed.xml` | Standar lama, masih dibaca banyak agregator |
| **Public API** | `/api/posts` | Paling fleksibel, return JSON murni |

**Implementasi di Laravel (routes/web.php):**
```php
// JSON Feed
Route::get('/feed.json', [FeedController::class, 'json']);

// RSS
Route::get('/feed.xml', [FeedController::class, 'rss']);

// Sitemap
Route::get('/sitemap.xml', [SitemapController::class, 'index']);
```

---

## Checklist Pengerjaan

- [ ] Buat `public/llms.txt`
- [ ] Update `public/robots.txt` — tambah AI crawler
- [ ] Tambah FAQ Schema di `service.blade.php` via `@push('schemas')`
- [ ] Tambah Article Schema di halaman blog detail
- [ ] Buat route `/sitemap.xml` dinamis dari DB
- [ ] Buat route `/feed.json` untuk blog
- [ ] (Opsional) Buat route `/api/posts` public

---

## Catatan Penting

> **JSON-LD sudah lengkap** — jangan diubah, sudah best practice.  
> **`@stack('schemas')`** sudah siap — tinggal pakai `@push('schemas')` di tiap view.  
> **Blog** — konten yang dalam dan faktual adalah amunisi utama agar AI mau mengutip websitemu.  
> **llms.txt** bisa dibuat dinamis dari DB supaya selalu up-to-date mengikuti layanan/portofolio terbaru.

---

*Dokumen ini dibuat berdasarkan audit langsung terhadap https://faisalyusra.my.id · Mei 2026*

---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, vcs, api]
