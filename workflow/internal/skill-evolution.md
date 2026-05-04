# 🧬 SKILL: AGENT BRAIN EVOLUTION (Skill Internal)

Skill ini memungkinkan AI untuk memperbarui instruksi kerja (Skill) miliknya sendiri berdasarkan pengetahuan terbaru di HUB.

## 1. Trigger (Pemicu)
Evolusi dipicu saat:
- `Golden Crawler` menemukan pola sukses baru.
- User memberikan "OKE" pada pelajaran baru di `LESSONS_LEARNED.md`.
- `Memory Architect` mendeteksi adanya ketidakteraturan antara standar di HUB dengan isi folder `skill/`.

## 2. Protokol Sinkronisasi
1. **Knowledge Retrieval**: Baca dokumen terbaru di `memory/long_term/` (HUB).
2. **Impact Analysis**: Identifikasi Agent/Skill mana yang terdampak.
   - Contoh: Standar UI baru -> Dampak ke `ux-engineer` dan `ui-engineer`.
3. **Refactor Strategy**:
   - Cari bagian `Focus` atau `Standards` di dalam file `.md` target.
   - Tambahkan referensi atau instruksi baru tanpa menghapus instruksi lama yang masih relevan.
   - Gunakan format: `[UPDATE: 2026-04-28] Standar baru: [Link ke HUB]`
4. **Verification**: Jalankan `Nexus Guru` untuk memverifikasi bahwa perubahan skill tersebut tidak melanggar prinsip Zero Flaws.

## 3. Aturan Penulisan (Writing Laws)
- **Non-Destructive**: Jangan menghapus skill dasar kecuali diperintah User.
- **Reference-Heavy**: Selalu sertakan tautan (link) ke file knowledge asli agar Agent bisa membaca konteks lengkapnya.
- **Confirmation Mandatory**: Laporkan rencana perubahan skill kepada User sebelum melakukan `write_to_file`.

---
*Status: Institutional Skill (Internal Maintenance).*
