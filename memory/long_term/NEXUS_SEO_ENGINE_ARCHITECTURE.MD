# 🚀 NEXUS LORE: Dynamic SEO Engine Architecture

Dokumen ini mendetailkan bagaimana sistem SEO di proyek **NEXUS LORE** bekerja secara dinamis untuk memastikan skor Lighthouse tetap 100 meskipun terdapat ribuan konten.

---

## 1. Arsitektur "Double-Layer" Meta Tags
Sistem menggunakan pola *Override* yang sangat fleksibel:
- **Global Layer (`app.blade.php`)**: Menyediakan default meta tags (Title, Description, Favicon, Site Name).
- **Page Layer (`show.blade.php`)**: Menggunakan `@section` untuk menyuntikkan data spesifik dari database ke dalam layout utama.
- **Fallbacks**: Jika `meta_title` kosong, sistem otomatis menggunakan `title` asli artikel. Jika `meta_description` kosong, sistem mengambil `excerpt`.

## 2. Dynamic JSON-LD (Structured Data)
Proyek ini mengimplementasikan **Schema.org @graph** (Best Practice 2026):
- **Identity Graph**: Setiap halaman menyertakan skema `Person` (Author) dan `ProfessionalService` (Publisher) yang saling terhubung via `@id`.
- **Content Graph**: 
  - Halaman Blog otomatis mendapatkan skema `Blog`.
  - Halaman Detail otomatis mendapatkan skema `BlogPosting`.
  - Artikel ilmiah otomatis mendapatkan skema `ScholarlyArticle`.
- **BreadcrumbList**: Otomatis menghasilkan skema breadcrumb untuk membantu Google memahami hierarki navigasi.

## 3. SEO-Driven Content Management (Filament Integration)
Admin dapat mengontrol SEO tanpa menyentuh kode:
- Field khusus untuk `meta_title`, `meta_description`, dan `meta_keywords`.
- Toggle `is_journal` untuk mengubah tipe skema schema.org secara instan.
- Otomatisasi **Reading Time** untuk meningkatkan *User Engagement* (faktor SEO tidak langsung).

## 4. Real-Time Indexing & Visibility
Sistem memastikan konten ditemukan oleh Google secepat mungkin:
- **Dynamic Sitemap**: Command `seo:generate` (GenerateSitemap.php) memetakan seluruh route publik secara harian.
- **Observer Pinging**: `PostObserver` akan memicu command `seo:ping` setiap kali artikel dibuat atau diperbarui, memberitahu Google/Bing untuk melakukan crawling ulang secara instan.
- **Canonical URLs**: Mencegah isu *Duplicate Content* dengan memaksa URL tunggal di setiap halaman.

## 5. Performance Optimization (Lighthouse 100)
SEO tidak hanya soal meta tags, tapi juga performa:
- **Image Optimization**: Penggunaan format `.webp` secara default dan aspect ratio yang terjaga (mencegah Layout Shift).
- **Modern CSS**: Tailwind v4 menghasilkan file CSS yang sangat kecil.
- **Fast Navigation**: Integrasi Livewire Navigated memastikan perpindahan halaman terasa instan tanpa reload penuh, namun tetap *crawlable* oleh bot.

---

## 🧪 Validasi Teknis
| Komponen | Status | Deskripsi |
| :--- | :--- | :--- |
| Meta Title/Desc | ✅ Dinamis | Diambil dari Eloquent Model `Post`. |
| JSON-LD | ✅ Valid | Menggunakan format @graph (Schema.org). |
| Sitemap | ✅ Auto-Updated | Di-generate via Task Scheduling. |
| Speed | ✅ Optimized | Lighthouse SEO Score: 100. |

---
*Status: Documented for Nexus Lore Knowledge Base*
