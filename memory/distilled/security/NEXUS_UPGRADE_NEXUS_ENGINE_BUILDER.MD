# 🏗️ PLAN: UPGRADE NEXUS ENGINE DARI "AUDITOR" MENJADI "APP BUILDER"
> **VERSION**: v2 | **Last Updated**: 28/05/2026



**Lokasi Dokumen**: `documentation/planning/UPGRADE_NEXUS_ENGINE_BUILDER.md`
**Status**: `Draft / Menunggu Persetujuan`

---

## 🛑 Akar Masalah Saat Ini
Sistem Nexus AI secara default diprogram ketat dengan arsitektur **Zero-Flaw Auditor**. Artinya:
1. `LocalIntelligence.js` mengunci *prompt* model (Ollama deepseek-coder) dengan larangan mutlak: `"You MUST NOT generate code autonomously..."`.
2. `NexusEngine.js` pada metode `runCycle()` hanya memindai (*audit*) folder yang sudah ada (yaitu *template* `url-shortener` yang dikloning), memperbaiki sedikit celah keamanan/linting, dan langsung melabelinya sebagai selesai.
3. **Hasilnya**: Ke-100 project di folder `sandboxes` isinya 100% sama dengan *template* dasar `url-shortener`.

---

## 🎯 Tujuan Pembaruan (Upgrade Goal)
Mengubah batasan arsitektur sehingga Nexus memiliki kemampuan **App Scaffolding & Code Generation**. AI tidak hanya mengaudit, tetapi juga secara otonom mendesain database, membuat rute, dan merakit komponen Livewire berdasarkan **Nama Project dan Tag** yang diminta.

---

## 🛠️ Langkah-Langkah Eksekusi (Action Plan)

### PHASE 1: Membuka Gembok "Local Intelligence"
**File Target**: `agent/core/LocalIntelligence.js`
- **Ubah `ALLOWED_TASKS`**: Menambahkan *task* baru seperti `'generate_architecture'`, `'build_model_migration'`, `'build_livewire_component'`, dan `'build_view'`.
- **Modifikasi `LOCKED_SYSTEM_PROMPT`**: Membuat *prompt* dinamis. Jika *task* adalah audit, gunakan *prompt* auditor ketat. Jika *task* adalah *build*, gunakan instruksi **TALL Pipeline Agent** yang mengizinkan AI menulis dan mendesain kode secara mandiri.
- **Tingkatkan Limit Output**: Karena men-*generate* kode satu halaman *view* atau *controller* butuh karakter yang panjang, batas `MAX_OUTPUT_LENGTH` (saat ini 2000) perlu dinaikkan menjadi `8000` atau `10000`.

### PHASE 2: Menambahkan "Fase Desain & Konstruksi" di Nexus Engine
**File Target**: `agent/core/NexusEngine.js`
- **Modifikasi `runCycle()`**:
  Menyuntikkan fase baru sebelum "Audit".
  1. **Phase 0.5: Context Awareness**: Membaca file `[README.md](../vcs/NEXUS_README.MD)` di dalam *sandbox* untuk mengenali bahwa AI sedang membangun (misal) `E-Commerce System` dengan *tag* `livewire, payment`.
  2. **Phase 0.8: Blueprint Generation**: AI menghasilkan kerangka kerja (Blueprint) berupa daftar Migrasi, Model, dan Komponen Livewire apa saja yang dibutuhkan project tersebut.
  3. **Phase 0.9: Autonomous Code Generation**: Mengirim perintah (*task action* `FILE_WRITE`) ke *Pipeline/Machinist* untuk menciptakan file `.php` dan `.blade.php` secara otomatis.
- Setelah kode aplikasi utama selesai ditulis, barulah masuk ke fase **Audit (Phase 1)** untuk memastikan *Zero Flaw* pada kode yang baru saja ia ciptakan.

### PHASE 3: Penyediaan "Alat Tulis" untuk AI
**File Target**: `agent/core/NexusEngine.js` (di dalam `execute()` method)
- Memastikan tipe aksi `FILE_WRITE` (membuat file baru dari nol) sudah tertangani dengan baik oleh AI (*saat ini AI baru fokus ke `FILE_APPEND` dan `FILE_REPLACE`*).
- Membuat skrip penghapus otomatis (opsional) untuk menghapus sisa-sisa *controller* `url-shortener` yang tidak terpakai agar aplikasi benar-benar murni sesuai nama project-nya.

---

## ⚠️ Risiko & Mitigasi
- **Waktu Eksekusi Membengkak**: Jika satu aplikasi dibangun dari nol, satu *cycle* yang biasanya 4 detik bisa memakan waktu 1-3 menit per project tergantung kecepatan RAM/VRAM untuk memproses Ollama.
- **Halusinasi Kode**: AI mungkin menghasilkan kode *syntax error*.
  *Mitigasi*: Tetap mempertahankan `TDDGuard` dan eksekusi `php artisan test` / `artisan serve` untuk memaksa AI memperbaiki *error*-nya sendiri jika terdeteksi gagal pada Fase Verifikasi.

---
*Apakah rencana di atas sudah sesuai dengan arah pengembangan TALL Pipeline Anda? Beri tahu saya jika kita bisa mulai mengeksekusi Phase 1!*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, tdd, saas]
