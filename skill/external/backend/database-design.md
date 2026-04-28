# SKILL: DATABASE DESIGN & OPTIMIZATION STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk perancangan dan optimasi database.

## 1. Skema & Identitas (Nexus Golden Standard)
- **Primary Keys:** WAJIB gunakan UUID untuk entitas utama. Implementasikan trait `HasUuids` pada model. Ini adalah standar mutlak untuk kesiapan Web 3.0 dan skalabilitas.
- **Naming:** Gunakan snake_case untuk kolom dan jamak (plural) untuk nama tabel.
- **Indexing:** Setiap Foreign Key WAJIB memiliki INDEX eksplisit di file migrasi untuk performa query yang optimal.

## 2. Keamanan & Integritas (Nexus Golden Standard)
- **Mass Assignment:** WAJIB gunakan `$fillable` secara eksplisit. Penggunaan `$guarded = []` DILARANG KERAS karena melanggar prinsip "Zero Flaws".
- **Soft Deletes:** Gunakan fitur Soft Deletes untuk data penting yang memiliki nilai sejarah atau audit.
- **Constraints:** Gunakan `nullable`, `default`, dan `unique` untuk memastikan integritas data di level skema.

## 3. Optimasi Query & Indexing

- **Indexing:** Berikan Index pada kolom yang sering muncul di klausa `WHERE`, `ORDER BY`, dan `JOIN`.
- **Eager Loading:** Selalu cek penggunaan `with()` untuk menghindari masalah N+1.
- **Aggregations:** Hindari melakukan perhitungan berat di level aplikasi jika bisa dilakukan di level database.

## 4. Checklist Database

- [ ] Tabel sudah ternormalisasi (minimal 3NF).
- [ ] Relasi Foreign Key sudah memiliki aturan `onDelete`.
- [ ] Kolom sensitif (jika ada) sudah direncanakan metode enkripsinya.
- [ ] Migrasi dapat dilakukan secara _rollback_ tanpa merusak data lain.

---

_Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `docs/agent/database-architect.md`._
