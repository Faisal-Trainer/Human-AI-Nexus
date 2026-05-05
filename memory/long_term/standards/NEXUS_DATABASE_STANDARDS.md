# 💾 NEXUS DATABASE STANDARDS (Distilled from Golden Standard)

Standar ini wajib diikuti untuk memastikan integritas data dan kesiapan skalabilitas (Web 3.0 Ready).

## 1. Identity Management
- **UUID as Primary Key**: Gunakan `uuid()` untuk seluruh tabel utama.
- **Trait Implementation**: Gunakan `HasUuids` pada model Laravel untuk otomatisasi.
- **Benefit**: Menghindari kebocoran jumlah data melalui ID integer dan mempermudah migrasi ke sistem terdesentralisasi.

## 2. Mass Assignment Security
- **Explicit Fillable**: Seluruh kolom yang dapat diisi oleh user **WAJIB** didefinisikan dalam array `$fillable`.
- **Forbidden Guarded**: Penggunaan `$guarded = []` dilarang keras karena melanggar prinsip "Zero Flaws".

## 3. Relationship Architecture
- Gunakan Eloquent Relationship dengan definisi yang jelas (One-to-Many, Many-to-Many).
- Gunakan tabel pivot untuk relasi interaksi (like, bookmark, follow).

## 4. Indexing for Performance
- Setiap Foreign Key (`user_id`, `author_id`, dll) **WAJIB** memiliki index untuk kecepatan query.

---
*Status: Institutional Knowledge (Database Layer).*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, performance, ui-ux, database]
