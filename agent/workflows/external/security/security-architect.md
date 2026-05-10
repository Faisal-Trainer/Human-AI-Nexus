# SKILL: SECURITY ARCHITECTURE & WAR GAMES (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk koordinasi keamanan dan simulasi serangan-pertahanan.

## 1. Protokol War Games (Security Architect)
- **Phase 1: Recon**: Red Team memetakan celah, Blue Team memperkuat gerbang utama.
- **Phase 2: Attack**: Red Team mengeksekusi serangan, Blue Team mencoba mendeteksi dan memitigasi secara real-time.
- **Phase 3: Analysis**: Architect menganalisis log serangan dan efektivitas pertahanan.
- **Phase 4: Patching**: Blue Team memperbaiki celah permanen, Red Team mencoba menyerang ulang bagian yang sama.

## 2. Standar Pertahanan (Blue Team)
- **Sanitization**: Gunakan whitelist untuk input data.
- **Headers**: Implementasi Content Security Policy (CSP), X-Frame-Options, dan HSTS.
- **Encryption**: Gunakan AES-256 untuk data at rest dan TLS 1.3 untuk data in transit.

## 3. Standar Penyerangan & Chaos (Red Team)
- **Payloads**: Gunakan payload standar OWASP Top 10.
- **Chaos Scenarios**:
  - `Latency Injection`: Menambah delay pada response API.
  - `Error Injection`: Memaksa fungsi mengembalikan error 500.
  - `Resource Exhaustion`: Menghabiskan limit memori/CPU tiruan.

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `agent/security-architect.md`.*
