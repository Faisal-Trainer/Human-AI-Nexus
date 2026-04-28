# SKILL: OFFENSIVE & CHAOS STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis penyerangan dan pengujian ketahanan untuk **Red Team**.

## 1. Penetration Testing (Attack)
- **OWASP Top 10**: Lakukan pengujian terhadap 10 celah keamanan paling kritis (Broken Access Control, Cryptographic Failures, Injection, dll.).
- **XSS Payloads**: Uji setiap form dengan berbagai payload XSS (Stored, Reflected, DOM-based).
- **Session Hijacking**: Uji keamanan cookie dan token session.

## 2. Chaos Engineering (Resilience)
- **Latency Injection**: Gunakan tools atau script untuk menambah delay 200ms - 2000ms pada response API untuk menguji perilaku UI saat lambat.
- **Error Injection**: Simulasikan error 404, 403, dan 500 pada endpoint kritis.
- **Resource Stress**: Simulasikan kondisi CPU atau Memory tinggi pada lingkungan test untuk melihat perilaku aplikasi.

## 3. Reporting
- Setiap keberhasilan eksploitasi harus disertai dengan:
  - `Reproducible Steps` (Langkah mengulang).
  - `Impact Analysis` (Dampak serangan).
  - `Evidence` (Bukti/Screenshot/Log).

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `agent/chaos-engineering.md`.*
