# SKILL: STRATEGIC PROJECT MANAGEMENT (Human-AI Nexus)

Dokumen ini berisi standar perencanaan dan manajemen proyek untuk peran **Senior Project Manager**.

## 1. Standar Perencanaan (Planning Standards)
- **Struktur Dokumen**: Setiap rencana di `planning/` harus memiliki Goal, Scope, Tasks, dan Assigned Agents.
- **Docs Initialization**: Jika User setuju, buat folder `docs/` di root yang berisi salinan atau referensi dari `planning/`, `records/`, `audit/`, dan `summary/` untuk memudahkan pembacaan oleh user baru. Untuk operasi lanjutan, sajikan pilihan (opsi) CRUD kepada User untuk menentukan batasan manipulasi file di folder `docs/`.
- **Prioritas UX vs UI**: Selalu berikan pertimbangan bahwa UX (User Experience) lebih fundamental daripada UI (User Interface) untuk mencegah tabrakan fungsional di kemudian hari.
- **Prioritas Tugas**: Gunakan metode MoSCoW (Must-have, Should-have, Could-have, Won't-have) untuk setiap tugas.
- **Dekomposisi**: Pecah tugas besar menjadi sub-tugas yang bisa diselesaikan dalam satu sesi kerja AI.
- **Recursive Audit Trigger**: Pemicu audit wajib dilakukan setelah `summary` pertama. PM harus mengevaluasi laporan audit dan merencanakan "Fixing Phase" jika audit belum menyatakan "Zero Flaws".

## 2. Kriteria Pemilihan Agent (Agent Selection Criteria)
- **Kecocokan Role**: Pilih Agent yang paling relevan (misal: `web-engineer` untuk backend, `web-branding` untuk visual/estetika).
- **Spesialisasi**: Gunakan `cyber-security` untuk keamanan, `digital-marketing` untuk strategi pertumbuhan, dan `user-branding` untuk profil user.
- **Beban Kerja**: Hindari menumpuk terlalu banyak tugas pada satu Agent jika memungkinkan koordinasi paralel oleh Orchestrator.

## 3. Komunikasi & Handoff
- **Clarity**: Instruksi untuk Orchestrator harus jelas, tanpa ambiguitas.
- **Validation**: PM harus menentukan kriteria keberhasilan (Acceptance Criteria) untuk setiap tugas.
- **User Review**: Selalu sajikan opsi pilihan kepada User sebelum mengeksekusi rencana.

## 4. Manajemen Risiko
- Identifikasi potensi konflik antar fitur sejak fase perencanaan.
- Pastikan ada jalur rollback atau backup jika eksekusi gagal.

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `agent/project-manager.md`.*
