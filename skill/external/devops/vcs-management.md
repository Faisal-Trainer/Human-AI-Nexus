# SKILL: VCS ARCHITECTURE & GIT MANAGEMENT

Dokumen ini berisi standar teknis untuk pengelolaan Version Control System (VCS) dalam proyek Nexus.

## 1. Branching Strategy
- **Main**: Branch produksi yang stabil.
- **Develop**: Branch integrasi fitur.
- **Feature/[name]**: Branch untuk pengembangan fitur spesifik.
- **Hotfix/[name]**: Branch untuk perbaikan mendesak di produksi.

## 2. Commit Standards
- **Atomic Commits**: Setiap commit harus berisi satu unit perubahan logis.
- **Conventional Commits**: Gunakan format `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.
- **Descriptive Messages**: Jelaskan "Mengapa" perubahan dilakukan, bukan hanya "Apa".

## 3. Workflow Discipline (Nexus Golden Standard)
- **Worktree Isolation:** Gunakan `git worktree` untuk mengerjakan fitur secara terisolasi guna menjaga stabilitas workspace utama.
- **Two-Stage Review:** Setiap PR wajib melalui dua tahap:
    1. **Spec Review**: Validasi kesesuaian dengan rencana (Planning).
    2. **Quality Review**: Validasi kebersihan kode (Clean Code) dan standar Nexus.
- **Merge Integrity:** Selalu lakukan `git pull --rebase` dan pastikan seluruh test Hijau sebelum melakukan push/merge.

---
*Dokumen ini adalah referensi teknis untuk VCS Architect.*
