# Nexus Architecture Structure
## Documentation-First Approach

### 📁 Directory Mapping
- `nexus/docs/audit/`: Hasil pemindaian sistem otomatis dan manual.
- `nexus/docs/planning/`: Rencana implementasi teknis (Implementation Plans).
- `nexus/docs/records/`: Log sejarah eksekusi per siklus.
- `nexus/docs/knowledge/`: Basis pengetahuan jangka panjang (Best Practices, Business Rules).

### 🛠️ Core Components
1. **NexusEngine (JS)**: Mesin orkestrasi yang mendeteksi struktur folder dan mengelola memori.
2. **MCP (Laravel)**: Jembatan komunikasi antara AI Agent eksternal dengan Database proyek.
3. **Observers & Commands**: Automasi SEO dan Performa yang terintegrasi di level kernel Laravel.

### 🛡️ Security Protocols
- Semua akses API eksternal wajib menggunakan `X-MCP-Token`.
- CSRF dinonaktifkan secara eksklusif hanya pada endpoint yang divalidasi oleh Token.

---
*Maintained by Nexus Orchestrator*
