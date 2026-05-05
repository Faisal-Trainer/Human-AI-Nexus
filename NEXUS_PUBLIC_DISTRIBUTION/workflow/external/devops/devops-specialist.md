# SKILL: DEVOPS & SERVER STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk operasional deployment, konfigurasi server, dan kepatuhan etika.

## 1. Standar Deployment & Server Config (.htaccess)
- **Force HTTPS & Non-WWW:** Gunakan `mod_rewrite` untuk memaksa koneksi HTTPS dan merutekan traffic `www` ke `non-www`.
- **Headers Handling:** Pastikan `Authorization` dan `X-XSRF-Token` diteruskan ke environment (terutama untuk API/Passport).
- **Content Compression:** Aktifkan `mod_deflate` untuk kompresi GZIP pada `text/html`, `css`, `js`, `json`, dan `svg`.
- **Browser Caching:** Konfigurasi `mod_expires` (Images 1 tahun, Assets 1 bulan).
- **File Access Restrictions:** Blokir akses publik ke file sensitif (`.env`, `.git`, `composer.json`, `composer.lock`).
- **Zero Downtime:** Upayakan strategi deployment yang tidak mematikan layanan (misal: Blue-Green).

## 2. Security Headers (Server-Level)
- Implementasikan `X-Content-Type-Options: nosniff`.
- Implementasikan `X-Frame-Options: SAMEORIGIN`.
- Implementasikan `X-XSS-Protection: 1; mode=block`.
- Implementasikan `HSTS (Strict-Transport-Security)` dengan `preload`.
- Hapus header `X-Powered-By` untuk menyembunyikan teknologi server.

## 3. Standar Kepatuhan (Ethics & Legal)
- **GDPR/PDPA**: Wajib menyediakan halaman Privacy Policy dan mekanisme persetujuan Cookie.
- **Copyright**: Gunakan aset berlisensi Creative Commons (CC0) atau hasil generate AI yang bebas hak cipta.
- **Accessibility (WCAG)**: Gunakan atribut `alt` pada gambar dan pastikan kontras warna memenuhi standar aksesibilitas.

---
*Dokumen diperbarui berdasarkan [NEXUS_SERVER_CONFIG_HTACCESS.MD](../../../memory/long_term/NEXUS_SERVER_CONFIG_HTACCESS.MD).*
