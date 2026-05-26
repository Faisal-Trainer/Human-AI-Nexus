# Nexus TDD (Test-Driven Development) List
> **VERSION**: v1 | **Last Updated**: 26/05/2026


## 🛡️ TDD Guardrail Exemption & Backlog

File ini dibaca oleh `TDDGuard` di dalam sistem Nexus AI. 
Nexus secara bawaan akan **memblokir** segala perubahan pada *production code* jika tidak ada file *test* yang mendampinginya (sesuai hukum *TDD Iron Laws*). 

Jika Anda ingin agen AI mengabaikan aturan TDD untuk file tertentu, atau Anda ingin membuat daftar antrean fitur yang akan dibuatkan *test*-nya, Anda bisa menuliskan nama file tersebut di bawah ini.

### 📝 Backlog & Whitelist (Daftar Pengecualian)
Tuliskan nama file atau path yang diizinkan untuk dimodifikasi oleh AI tanpa harus diblokir oleh TDDGuard:

- `.gitignore`
- `README.md`
- `database/database.sqlite`
- `package.json`
- `vite.config.js`
- `tailwind.config.js`

### 🧪 Rencana Pembuatan Test (Test Planning)
Daftar *test* yang direncanakan untuk dibangun oleh agen:

- [ ] `tests/Feature/AuthTest.php` (Memastikan proses login berjalan)
- [ ] `tests/Feature/DashboardTest.php` (Memastikan dashboard render dengan benar)
- [ ] `tests/Unit/UserTest.php` (Memastikan relasi user dan model lain)

---
*Catatan: Selama nama file produksi (misal: `User.php`) tercantum di dalam file ini, `TDDGuard` akan mengizinkan modifikasi karena sistem menganggap file tersebut sedang dalam fase "Perencanaan TDD".*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, tdd]
