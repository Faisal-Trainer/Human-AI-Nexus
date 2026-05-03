# 🌳 NEXUS VCS & WORKTREE STRATEGY (Institutional Memory)

Dokumen ini mengadopsi standar pengelolaan kode dari **Superpowers** untuk memastikan isolasi fitur dan riwayat commit yang bersih.

## 1. Git Worktree Isolation
Gunakan **Git Worktree** untuk mengerjakan fitur baru agar workspace tetap bersih dan tidak mengganggu branch utama:
- **Isolated Workspace**: Setiap fitur memiliki direktori fisik sendiri.
- **Baseline Verification**: Pastikan test lulus pada baseline sebelum mulai menulis kode di worktree baru.

## 2. Commit & Merge Discipline
- **Atomic Commits**: Setiap commit harus mewakili satu perubahan logis yang teruji.
- **Merge/PR Decision**: Sebelum melakukan merge atau Pull Request, wajib melakukan verifikasi akhir (Final Test) terhadap seluruh sistem.
- **Cleanup**: Hapus worktree atau branch sementara segera setelah fitur di-merge ke branch utama.

## 3. Review Loop
- Gunakan **Two-Stage Review**:
    1. **Spec Compliance Review**: Pastikan kode memenuhi persyaratan fungsional.
    2. **Code Quality Review**: Pastikan kode memenuhi standar estetika dan efisiensi.

---
*Status: Institutional Knowledge (VCS Discipline).*
*Referenced from: Superpowers Git Worktree Skill.*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, tdd, vcs]
