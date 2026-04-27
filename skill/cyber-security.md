# SKILL: CYBER SECURITY STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis dan best practices keamanan yang wajib diterapkan dalam kode.

## 1. Validasi & Sanitasi (Input/Output)
- Semua input user wajib divalidasi menggunakan server-side validation.
- Gunakan sanitasi untuk output guna mencegah XSS (Cross-Site Scripting).
- **Laravel Tip:** Gunakan `{{ e($data) }}` atau `@php echo e($data) @endphp`.

## 2. Autentikasi & Otorisasi
- Pastikan setiap akses data menggunakan pemeriksaan kepemilikan (`IDOR Check`).
- Gunakan middleware untuk proteksi route.
- Verifikasi role/permission di level logic, bukan hanya UI.

## 3. Keamanan Data & File
- **Upload:** Cek mime-type, batasi ukuran, dan gunakan disk storage yang aman.
- **Sensitive Data:** Jangan pernah menyimpan password atau key dalam bentuk teks biasa.
- **Environment:** Pastikan `.env` tidak pernah terekspos.

## 4. Checklist Keamanan Umum
- [ ] Proteksi CSRF aktif.
- [ ] Rate-limiting (Throttling) diterapkan pada endpoint sensitif (login/api).
- [ ] Error message tidak membocorkan detail server (Stack Trace).
- [ ] Proteksi terhadap SQL Injection (Gunakan Eloquent/Query Builder).

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `docs/agent/cyber-security.md`.*
