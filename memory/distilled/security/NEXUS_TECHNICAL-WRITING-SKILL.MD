> **VERSION**: v1 | **Last Updated**: 6/24/2026

---
name: technical-writing
description: Panduan lengkap untuk menulis dokumentasi teknis proyek software — README, dokumentasi API, dan changelog — dengan struktur dan standar industri yang konsisten. Gunakan skill ini setiap kali user minta dibuatkan "README", "dokumentasi", "docs", "API documentation", "changelog", "release notes", "CHANGELOG.md", "contributing guide", atau saat user baru selesai membuat fitur/endpoint/proyek dan butuh dokumentasinya ditulis. Cocok juga dipakai saat user bertanya cara mendokumentasikan kode, menulis docstring/comment yang baik, atau menyusun dokumentasi versi rilis software.
---

# Technical Writing — Dokumentasi Proyek Software

Skill ini berisi panduan menulis tiga jenis dokumentasi teknis paling umum dalam proyek software: **README**, **dokumentasi API**, dan **changelog**. Setiap jenis dokumen punya audiens dan tujuan berbeda — jangan campur aduk gayanya.

## Daftar Isi
1. Prinsip Umum Menulis Dokumentasi Teknis
2. README — Struktur & Cara Menulis
3. Dokumentasi API — Struktur & Cara Menulis
4. Changelog — Struktur & Cara Menulis (mengikuti Keep a Changelog + SemVer)
5. Docstring & Inline Comment yang Baik
6. Contributing Guide (CONTRIBUTING.md)
7. Checklist Sebelum Publish

---

## 1. Prinsip Umum Menulis Dokumentasi Teknis

Sebelum menulis apapun, tentukan dulu **siapa pembacanya** — ini menentukan tingkat detail dan istilah yang dipakai.

| Dokumen | Audiens utama | Tujuan |
|---|---|---|
| README | Orang baru (developer/user) yang baru menemukan proyek | Bikin mereka paham apa ini dan bisa mulai pakai dalam <5 menit |
| API docs | Developer yang akan integrasi dengan sistem kamu | Referensi teknis presisi: endpoint, parameter, response |
| Changelog | Existing user/developer yang upgrade versi | Tahu apa yang berubah dan apakah ada breaking change |

**Aturan menulis yang berlaku di semua jenis dokumen:**
- Tulis kalimat pendek, aktif, langsung ke poin. Hindari basa-basi pembuka seperti "Dalam dokumen ini akan dijelaskan...".
- Gunakan **contoh konkret** (kode, command, output) daripada penjelasan abstrak panjang.
- Konsisten dalam istilah — kalau menyebut "endpoint" di satu tempat, jangan ganti jadi "route" di tempat lain tanpa alasan.
- Asumsikan pembaca **tidak punya konteks** dari kepala kamu — jangan skip langkah yang menurutmu "obvious".
- Update dokumentasi di commit/PR yang sama dengan perubahan kode — dokumentasi yang terlambat di-update lebih berbahaya daripada tidak ada dokumentasi sama sekali (karena menyesatkan).

---

## 2. README — Struktur & Cara Menulis

README adalah halaman pertama yang dilihat orang. Tugasnya menjawab 3 pertanyaan dalam beberapa detik: **Apa ini? Kenapa saya butuh? Bagaimana cara mulai?**

### Struktur Standar

```markdown
# Nama Proyek

Satu-dua kalimat: apa proyek ini dan masalah apa yang diselesaikan.

[badges: build status, versi, lisensi — opsional]

## Fitur

- Fitur utama 1
- Fitur utama 2
- Fitur utama 3

## Instalasi

\`\`\`bash
npm install nama-paket
\`\`\`

## Penggunaan Cepat (Quick Start)

\`\`\`js
import { fungsiUtama } from 'nama-paket';

fungsiUtama({ contoh: 'parameter' });
// Output: hasil yang diharapkan
\`\`\`

## Konfigurasi

Tabel atau daftar opsi konfigurasi yang tersedia, beserta default value.

## Dokumentasi Lengkap

Link ke dokumentasi API lebih detail (jika ada), atau folder /docs.

## Kontribusi

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) — atau ringkasan singkat cara kontribusi.

## Lisensi

MIT / Apache 2.0 / dll
```

### Kaidah Penting

- **Quick Start harus benar-benar bisa langsung dicoba copy-paste.** Jangan tulis pseudo-code — tulis kode yang benar-benar jalan.
- Taruh **fitur unggulan** di paling atas, bukan di tengah/bawah — orang scroll cepat dan memutuskan dalam detik pertama.
- Kalau proyeknya CLI tool, sertakan contoh **output terminal**, bukan cuma command-nya.
- Section "Instalasi" harus mencakup *prerequisite* (versi Node/PHP/Python minimum, dependency sistem) kalau ada.
- Hindari menjejalkan semua detail di README — kalau sudah panjang, pecah ke folder `/docs` dan README cukup jadi pintu masuk dengan link.

### Contoh Buruk vs Baik

**Buruk** (terlalu abstrak, tidak bisa langsung dipraktikkan):
> Aplikasi ini memungkinkan pengguna untuk melakukan berbagai operasi data dengan mudah dan efisien menggunakan teknologi modern.

**Baik** (konkret, langsung actionable):
```markdown
## Quick Start

\`\`\`bash
composer require acme/data-toolkit
\`\`\`

\`\`\`php
$toolkit = new DataToolkit();
$result = $toolkit->transform($csvFile, 'json');
// $result berisi array hasil parsing CSV ke JSON
\`\`\`
```

---

## 3. Dokumentasi API — Struktur & Cara Menulis

Dokumentasi API harus **presisi dan lengkap** — developer lain akan copy-paste langsung dari sini, jadi setiap detail (tipe data, status code, format error) penting.

### Struktur per-Endpoint

```markdown
### `POST /api/users`

Membuat user baru.

**Headers**

| Nama | Wajib | Keterangan |
|---|---|---|
| `Authorization` | Ya | `Bearer {token}` |
| `Content-Type` | Ya | `application/json` |

**Request Body**

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `name` | string | Ya | Nama lengkap user, maks 255 karakter |
| `email` | string | Ya | Harus format email valid dan unik |
| `password` | string | Ya | Minimal 8 karakter |

**Contoh Request**

\`\`\`bash
curl -X POST https://api.contoh.com/api/users \\
  -H "Authorization: Bearer eyJhbGc..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Budi Santoso",
    "email": "budi@contoh.com",
    "password": "rahasia123"
  }'
\`\`\`

**Response Sukses — 201 Created**

\`\`\`json
{
  "id": 42,
  "name": "Budi Santoso",
  "email": "budi@contoh.com",
  "created_at": "2026-06-20T10:00:00Z"
}
\`\`\`

**Response Error — 422 Unprocessable Entity**

\`\`\`json
{
  "message": "Data tidak valid",
  "errors": {
    "email": ["Email sudah terdaftar."]
  }
}
\`\`\`
```

### Kaidah Penting

- **Selalu sertakan contoh request DAN response** — jangan cuma deskripsi tipe data tanpa contoh nyata.
- Dokumentasikan **semua kemungkinan status code** yang relevan (200/201, 400, 401, 403, 404, 422, 500), bukan cuma kasus sukses.
- Untuk parameter, selalu jelaskan: nama, tipe, wajib/opsional, constraint (panjang, format, nilai default).
- Kalau API punya autentikasi, jelaskan cara mendapatkan token **sebelum** daftar endpoint, di section terpisah ("Authentication").
- Kalau API berubah antar versi, sertakan **versioning info** (`/v1/`, `/v2/`) dan apa bedanya.
- Gunakan tools seperti **OpenAPI/Swagger** untuk API besar — bisa generate dokumentasi interaktif otomatis dari spec, dan tetap sinkron dengan kode lewat CI.

### Format Alternatif: OpenAPI/Swagger (untuk API besar)

```yaml
openapi: 3.0.0
info:
  title: Contoh API
  version: 1.0.0
paths:
  /users:
    post:
      summary: Membuat user baru
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [name, email, password]
              properties:
                name:
                  type: string
                  maxLength: 255
                email:
                  type: string
                  format: email
                password:
                  type: string
                  minLength: 8
      responses:
        '201':
          description: User berhasil dibuat
        '422':
          description: Validasi gagal
```

> Gunakan YAML/JSON spec ini kalau proyek butuh dokumentasi interaktif (Swagger UI) atau ingin generate client SDK otomatis.

---

## 4. Changelog — Struktur & Cara Menulis

Changelog mencatat **perubahan yang terlihat oleh user** antar versi. Ikuti standar [Keep a Changelog](https://keepachangelog.com) dan [Semantic Versioning (SemVer)](https://semver.org).

### Struktur Standar

```markdown
# Changelog

Semua perubahan penting pada proyek ini didokumentasikan di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
dan proyek ini mematuhi [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Fitur export laporan ke PDF

## [1.2.0] - 2026-06-15

### Added
- Endpoint `GET /api/reports/summary` untuk ringkasan laporan
- Dukungan filter tanggal pada pencarian transaksi

### Changed
- Response `GET /api/users` sekarang menyertakan field `last_login`

### Fixed
- Bug saldo tidak ter-update setelah refund (#231)

### Deprecated
- Endpoint `GET /api/v1/old-report` akan dihapus di v2.0.0, gunakan `/api/reports/summary`

## [1.1.0] - 2026-05-01

### Added
- Fitur autentikasi dua faktor (2FA)

### Security
- Memperbaiki celah SQL injection pada filter pencarian (#198)

## [1.0.0] - 2026-04-01

### Added
- Rilis publik pertama
```

### Kategori Perubahan (gunakan persis ini, jangan buat istilah baru)

| Kategori | Kapan dipakai |
|---|---|
| `Added` | Fitur baru |
| `Changed` | Perubahan pada fungsi yang sudah ada |
| `Deprecated` | Fitur yang akan dihapus di masa depan |
| `Removed` | Fitur yang sudah dihapus |
| `Fixed` | Perbaikan bug |
| `Security` | Perbaikan kerentanan keamanan |

### Aturan Penomoran Versi (SemVer): `MAJOR.MINOR.PATCH`

- **MAJOR** (`2.0.0`) — perubahan yang **breaking** (tidak kompatibel dengan versi sebelumnya)
- **MINOR** (`1.1.0`) — penambahan fitur baru yang **tetap kompatibel**
- **PATCH** (`1.0.1`) — bug fix yang **tetap kompatibel**, tidak ada fitur baru

### Kaidah Penting

- Selalu punya section **`[Unreleased]`** di paling atas untuk menampung perubahan yang belum dirilis — pindahkan isinya ke versi baru saat rilis.
- Tulis dari sudut pandang **dampak ke user**, bukan detail implementasi internal. 
  - Buruk: "Refactor `UserController` untuk pakai repository pattern"
  - Baik: "Mempercepat waktu respons endpoint user hingga 40%"
- Sertakan **nomor issue/PR** jika ada (`(#231)`) supaya bisa ditelusuri.
- Breaking change **wajib** ditulis jelas dan, jika perlu, sertakan panduan migrasi singkat.
- Jangan masukkan commit message mentah ke changelog — itu beda fungsi. Changelog untuk user, commit log untuk developer history.

---

## 5. Docstring & Inline Comment yang Baik

Dokumentasi tidak berhenti di file `.md` — kode itu sendiri butuh didokumentasikan.

### Kapan menulis comment

✅ Tulis comment untuk: **kenapa** (alasan keputusan desain), bukan **apa** (yang sudah jelas dari kode itu sendiri).

```php
// BURUK — cuma mengulang apa yang sudah jelas dari kode
// Tambah 1 ke counter
$counter++;

// BAIK — menjelaskan alasan/konteks yang tidak terlihat dari kode
// Counter dimulai dari 1 karena API pihak ketiga pakai 1-based index
$counter++;
```

### Format Docstring (contoh PHP/PHPDoc)

```php
/**
 * Menghitung total harga setelah diskon dan pajak.
 *
 * @param float $hargaAwal Harga sebelum diskon dan pajak
 * @param float $persenDiskon Persentase diskon (0-100)
 * @param float $persenPajak Persentase pajak (0-100)
 * @return float Harga akhir setelah diskon dan pajak diterapkan
 *
 * @throws InvalidArgumentException Jika persenDiskon atau persenPajak negatif
 */
function hitungHargaAkhir(float $hargaAwal, float $persenDiskon, float $persenPajak): float
{
    // ...
}
```

### Format Docstring (contoh JS/JSDoc)

```js
/**
 * Mengambil data user dari API berdasarkan ID.
 *
 * @param {number} userId - ID user yang dicari
 * @param {Object} [options] - Opsi tambahan
 * @param {boolean} [options.includeDeleted=false] - Sertakan user yang sudah dihapus
 * @returns {Promise<User>} Data user yang ditemukan
 * @throws {NotFoundError} Jika user tidak ditemukan
 */
async function getUserById(userId, options = {}) {
  // ...
}
```

### Kaidah Penting

- Setiap fungsi **publik** (dipakai dari luar modul/class) sebaiknya punya docstring — fungsi privat/internal opsional kecuali logikanya rumit.
- Docstring harus menyebut: **parameter** (tipe + arti), **return value**, dan **exception/error** yang mungkin dilempar.
- Update docstring **bersamaan** saat signature fungsi berubah — docstring yang salah lebih berbahaya daripada tidak ada sama sekali.

---

## 6. Contributing Guide (CONTRIBUTING.md)

Untuk proyek open-source atau tim yang menerima kontribusi eksternal, sertakan panduan ini:

```markdown
# Contributing

Terima kasih sudah tertarik berkontribusi!

## Cara Mulai

1. Fork repo ini
2. Clone fork kamu: `git clone https://github.com/username/repo.git`
3. Install dependency: `npm install`
4. Buat branch baru: `git checkout -b fitur/nama-fitur`

## Menjalankan Test

\`\`\`bash
npm run test
\`\`\`

## Standar Kode

- Ikuti aturan linting yang ada (`npm run lint`)
- Tulis test untuk setiap fitur/fix baru
- Commit message mengikuti format [Conventional Commits](https://www.conventionalcommits.org/)

## Mengajukan Pull Request

1. Pastikan semua test lulus
2. Update dokumentasi terkait jika perlu
3. Buat PR ke branch `main` dengan deskripsi jelas tentang perubahan
```

---

## 7. Checklist Sebelum Publish

Sebelum menganggap dokumentasi selesai, cek ulang:

- [ ] Apakah orang yang **belum pernah** lihat proyek ini bisa langsung paham dari README?
- [ ] Apakah semua contoh kode di dokumentasi **benar-benar bisa dijalankan** (sudah dicoba, bukan asumsi)?
- [ ] Apakah semua endpoint API punya contoh request **dan** response?
- [ ] Apakah changelog sudah pakai kategori standar (`Added`, `Changed`, `Fixed`, dst) dan versi mengikuti SemVer?
- [ ] Apakah ada breaking change yang **belum** ditulis jelas di changelog?
- [ ] Apakah link internal (ke file docs lain) sudah benar dan tidak broken?
- [ ] Apakah istilah teknis dipakai konsisten di seluruh dokumen?

---

## Ringkasan Cepat (Cheat Sheet)

| Dokumen | Section wajib | Standar yang diikuti |
|---|---|---|
| README | Deskripsi, Instalasi, Quick Start, Lisensi | - |
| API Docs | Endpoint, Request, Response, Error codes | OpenAPI/Swagger (opsional) |
| Changelog | Versi, kategori perubahan, tanggal rilis | Keep a Changelog + SemVer |
| Docstring | Param, return, exception | PHPDoc / JSDoc sesuai bahasa |
| CONTRIBUTING | Setup, test, standar kode, cara PR | Conventional Commits (opsional) |


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, vcs, laravel, api]
