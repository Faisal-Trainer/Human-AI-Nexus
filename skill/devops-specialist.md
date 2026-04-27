# SKILL: DEVOPS & ETHICS STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk operasional deployment dan kepatuhan etika.

## 1. Standar Deployment (DevOps)
- **CI/CD**: Gunakan GitHub Actions, GitLab CI, atau Jenkins untuk pengujian otomatis sebelum deployment.
- **Environment**: Pisahkan `config` dari kode menggunakan `.env` file. Pastikan `.env` terdaftar di `.gitignore`.
- **Zero Downtime**: Upayakan strategi deployment yang tidak mematikan layanan (misal: Blue-Green Deployment).

## 2. Standar Kepatuhan (Ethics & Legal)
- **GDPR/PDPA**: Wajib menyediakan halaman Privacy Policy dan mekanisme persetujuan Cookie.
- **Copyright**: Gunakan aset berlisensi Creative Commons (CC0) atau hasil generate AI yang bebas hak cipta.
- **Accessibility (WCAG)**: Gunakan atribut `alt` pada gambar dan pastikan kontras warna memenuhi standar aksesibilitas.

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `agent/devops-specialist.md` dan `agent/ethics-compliance.md`.*
