# SKILL: DEFENSIVE SECURITY STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis pertahanan untuk **Blue Team**.

## 1. Input Sanitization & Validation
- **Principle**: Trust no user input.
- **Implementation**: Gunakan whitelist validation. Gunakan parameterized queries untuk mencegah SQL Injection.
- **Escape**: Lakukan escaping pada seluruh output data ke HTML untuk mencegah XSS.

## 2. Security Headers (Hardening)
- Implementasikan `Content-Security-Policy` (CSP) untuk membatasi sumber skrip.
- Gunakan `X-Frame-Options: DENY` untuk mencegah Clickjacking.
- Aktifkan `Strict-Transport-Security` (HSTS) untuk memaksa koneksi HTTPS.

## 3. Cryptography Standards
- **At Rest**: Enkripsi data sensitif menggunakan AES-256 GCM.
- **In Transit**: Gunakan TLS 1.3 dengan chiper suite yang kuat.
- **Hashing**: Gunakan Argon2 atau BCrypt (cost factor minimal 12) untuk penyimpanan password.

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `agent/cyber-security.md`.*
