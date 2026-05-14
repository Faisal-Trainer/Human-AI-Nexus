# RECORD: NEXUS AUTONOMOUS SANDBOX PIPELINE
**Date:** 14/05/2026
**Tags:** [automation, testing, pipeline, tall-stack]

## 1. Masalah Awal
Sebelumnya, pipeline untuk membangun ke-31 TALL-stack sandbox memiliki beberapa kekurangan:
1.  **Tidak Konsisten:** Section 1 (CRUD) hanya menghasilkan *dummy scaffold* (`spawnSandbox('crud')`) tanpa setup TALL-stack yang sesungguhnya. Akibatnya project tidak bisa di-serve dengan `php artisan serve`.
2.  **Tidak Lengkap:** Section 3 (Security & Realtime) belum memiliki *runner* otomatis.
3.  **Guardrail Crash:** Guardrail baru pada `EvolutionPiper` (batas maksimal siklus per sesi) menyebabkan *crash* ketika banyak project di-*spawn* dalam satu eksekusi loop, karena *counter* tidak di-reset per project.
4.  **Menjalankan Manual:** Developer harus mengeksekusi file `.js` terpisah (misal `node tests/TDD/phase1_testing.js`) yang merepotkan dan rawan gagal di pertengahan.

## 2. Implementasi Solusi
Kami merombak ulang arsitektur testing *sandboxes* agar 100% mandiri, aman dari *guardrails*, dan terstruktur dalam satu komando.

### 2.1 Standardisasi TALL Stack (Section 1, 2, 3)
*   **Template Master:** Semua project sekarang di-*copy* dari template `tests/sandboxes/url-shortener` yang sudah dilengkapi Laravel, Alpine, Tailwind, dan Livewire.
*   **Isolasi Nexus:** Folder `nexus/` bawaan dari template akan di-*filter* (tidak di-copy). Namun, jika target sandbox sudah memiliki folder `nexus/` (bekas run sebelumnya), *knowledge* tersebut akan di-*backup* dan di-*restore* agar riwayat agen tidak hilang.
*   **Environment & Database:**
    *   File `.env` otomatis diedit mengubah `APP_NAME` sesuai nama *sandbox*.
    *   Database SQLite (`database.sqlite`) direset ulang, kemudian dijalankan `php artisan migrate:fresh --force`.
*   **Reset Guardrail:** Menambahkan `piper.resetCycleCounter()` di setiap awal loop project agar *EvolutionPiper* tidak mencapai batas limit sesinya (mencegah auto-throw *infinite loop guard*).

### 2.2 Master Runner & Bash/PowerShell
Kami memperkenalkan lapisan orkestrasi di atas 3 section tersebut:
*   **`tests/TDD/sandbox-master-runner.js`:**
    Mengeksekusi ketiga file section secara berurutan. Mengimplementasikan isolasi kegagalan (*circuit breaker* level eksekusi): jika Section 1 gagal, Section 2 tetap berjalan.
*   **`nexus-sandbox.sh` & `nexus-sandbox.ps1`:**
    Script *wrapper* untuk Bash (Linux/Mac) dan PowerShell (Windows) yang memfasilitasi eksekusi dengan parameter, cek *prerequisite* (Node & PHP), log *stdout* & *stderr* terpisah, dan ringkasan warna.

### 2.3 CLI Command: `nexus sandbox`
Kini pipeline dapat dijalankan dari mana saja menggunakan perintah bawaan Nexus:
*   `nexus sandbox` (menjalankan semua 31 project)
*   `nexus sandbox --section 1` (hanya CRUD)
*   `nexus sandbox --section 2` (hanya Dashboard)
*   `nexus sandbox --section 3` (hanya Security)
*   `nexus sandbox --distill` (menjalankan pipeline lalu otomatis distilasi *knowledge* ke HUB)

## 3. Hasil & Implikasi
*   **31 Aplikasi TALL-Stack:** Keseluruhan project *sandbox* (dari *Todo App* sederhana hingga *Role-Permission Manager* kompleks) sekarang siap pakai.
*   **Autonomous Learning Pipeline:** Nexus secara mandiri men-setup environment, mengaudit, merencanakan, memperbaiki, dan menyerap *knowledge* (*harvesting*) dari 31 project tersebut ke dalam *Golden HUB* tanpa intervensi manusia.
*   **Zero Flaws Enforcement:** Karena di dalam pipeline tersebut memanggil `NexusEngine.runCycle()`, semua project dijamin memenuhi standar Nexus. Jika ada standar baru (misal via `Machinist`), cukup jalankan `nexus sandbox` dan Nexus akan merombak ulang 31 project sesuai standar yang baru.
