# SERVER CONFIG: .htaccess Documentation

**File Path**: `public/.htaccess`
**Project**: NEXUS LORE (Portfolio)
**Last Updated**: 2026-05-04

---

## 1. Rewrite Engine (mod_rewrite)

Konfigurasi untuk pengalihan URL dan penanganan request.

### 1.1 Force HTTPS & Non-WWW
- **HTTPS Enforcement**: Memaksa semua koneksi menggunakan protokol aman (HTTPS).
- **Non-WWW Enforcement**: Mengalihkan traffic dari `www.faisalyusra.my.id` ke `faisalyusra.my.id`.
- **Target Domain**: `https://faisalyusra.my.id/`

### 1.2 Headers Handling
- **Authorization**: Melewatkan header `Authorization` ke dalam environment variable `HTTP_AUTHORIZATION` untuk keperluan API/Passport.
- **X-XSRF-Token**: Melewatkan header `x-xsrf-token` untuk keperluan CSRF protection pada framework.

### 1.3 Front Controller
- Mengarahkan semua request yang bukan file atau direktori fisik ke `index.php`.

---

## 2. Content Compression (mod_deflate)

Optimasi performa dengan kompresi GZIP untuk tipe file berikut:
- `text/html`, `text/css`, `text/javascript`
- `application/javascript`, `application/json`
- `image/svg+xml`

---

## 3. Security Headers (mod_headers)

Implementasi header keamanan untuk melindungi platform dari serangan umum:
- **X-Content-Type-Options**: `nosniff` (Mencegah MIME type sniffing).
- **X-Frame-Options**: `SAMEORIGIN` (Mencegah Clickjacking).
- **X-XSS-Protection**: `1; mode=block` (Mencegah Cross-Site Scripting).
- **Referrer-Policy**: `strict-origin-when-cross-origin`.
- **Permissions-Policy**: Mematikan akses ke `geolocation`, `microphone`, dan `camera`.
- **HSTS (Strict-Transport-Security)**: `max-age=31536000; includeSubDomains; preload` (Hanya aktif pada koneksi HTTPS).
- **X-Powered-By**: Unset (Menyembunyikan informasi teknologi server).

---

## 4. Browser Caching (mod_expires)

Kebijakan penyimpanan cache di sisi client:
- **Images (JPEG, PNG, WebP)**: 1 Tahun (`access plus 1 year`).
- **Assets (CSS, JS)**: 1 Bulan (`access plus 1 month`).

---

## 5. File Access Restrictions

Blokir akses publik terhadap file sensitif:
- `.env`
- `.git`
- `composer.json`
- `composer.lock`

---

*Status: Documentation Synchronized | NEXUS LORE Standards*
