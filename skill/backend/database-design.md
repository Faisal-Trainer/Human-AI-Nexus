# SKILL: DATABASE DESIGN & OPTIMIZATION STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk perancangan dan optimasi database.

## 1. Skema & Tipe Data
- **Primary Keys:** Gunakan UUID untuk keamanan dan skalabilitas, atau BigIncrements untuk performa internal.
- **Data Types:** Gunakan tipe data yang paling efisien (misal: `unsignedInteger` untuk ID, `boolean` untuk status).
- **Naming:** Gunakan snake_case untuk nama tabel dan kolom, jamak (plural) untuk nama tabel.

## 2. Relasi & Integritas
- **Foreign Keys:** Selalu definisikan relasi antar tabel secara eksplisit di migrasi.
- **Constraints:** Gunakan `nullable`, `default`, dan `unique` secara bijak untuk menjaga kualitas data.
- **Soft Deletes:** Gunakan fitur Soft Deletes untuk data penting yang mungkin perlu dipulihkan.

## 3. Optimasi Query & Indexing
- **Indexing:** Berikan Index pada kolom yang sering muncul di klausa `WHERE`, `ORDER BY`, dan `JOIN`.
- **Eager Loading:** Selalu cek penggunaan `with()` untuk menghindari masalah N+1.
- **Aggregations:** Hindari melakukan perhitungan berat di level aplikasi jika bisa dilakukan di level database.

## 4. Checklist Database
- [ ] Tabel sudah ternormalisasi (minimal 3NF).
- [ ] Relasi Foreign Key sudah memiliki aturan `onDelete`.
- [ ] Kolom sensitif (jika ada) sudah direncanakan metode enkripsinya.
- [ ] Migrasi dapat dilakukan secara *rollback* tanpa merusak data lain.

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `docs/agent/database-architect.md`.*
