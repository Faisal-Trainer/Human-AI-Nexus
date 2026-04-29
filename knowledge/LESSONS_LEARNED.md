
# 🧠 Lessons Learned: Nexus Intelligence Archive

Dokumen ini mencatat kegagalan sistem dan solusinya untuk memastikan kesalahan yang sama tidak terulang kembali.

## 1. Masalah: NPX Command 404
- **Temuan**: Perintah `npx <name>` gagal jika paket memiliki scope (misal: `@user/name`) namun dipanggil tanpa scope.
- **Solusi**: Selalu gunakan prefix `github:<user>/<repo>` untuk pemanggilan npx pada framework yang belum dipublikasikan ke NPM global.

## 2. Masalah: Konflik Binary (Installer vs Engine)
- **Temuan**: Node.js menjalankan binary pertama yang didefinisikan di `package.json`.
- **Kejadian**: `cli.js` terpanggil terus padahal user ingin menjalankan `src/index.js`.
- **Solusi**: Pastikan entry point engine utama (`nexus`) berada di urutan pertama pada properti `bin`.

## 3. Masalah: Kebocoran Pengetahuan (Brain vs Docs)
- **Temuan**: Instalasi awal menyertakan folder `knowledge` internal ke proyek eksternal.
- **Solusi**: Isolasi folder **Brain** (`nexus/`) dan folder **Documentation** (`documentation/`). Hanya copy folder `external` untuk deployment proyek luar.

## 4. Masalah: Bias Klasifikasi Nama File
- **Temuan**: Agent mengabaikan file dengan nama generik (misal: "New Text Document.md").
- **Solusi**: Protokol **Deep Scan** wajib dijalankan. Dilarang merekomendasikan penghapusan file sebelum pembacaan isi secara utuh.

## 5. Masalah: Pathing Engine Tak Terdefinisi (Regression)
- **Temuan**: Penggunaan variabel `this.nexusPath` yang tidak terdefinisi menyebabkan `TypeError` pada fungsi `massRefactor`.
- **Solusi**: Standarisasi penggunaan `this.nexusDataPath` di seluruh core engine untuk merujuk pada direktori basis data Nexus.

## 6. Masalah: Inkompatibilitas Glob di Windows
- **Temuan**: Package `glob` versi 8.x memerlukan forward slashes (`/`) bahkan di sistem Windows. Backslashes (`\`) menyebabkan hasil pencarian nol.
- **Solusi**: Gunakan `.replace(/\\/g, '/')` pada seluruh path yang akan diproses oleh fungsi `globRecursive`.

## 7. Kebijakan Memori: Institusionalisasi Folder `golden/`
- **Temuan**: Pengetahuan baru seringkali terabaikan jika tidak ada proses "penyerapan" aktif.
- **Kebijakan**: Folder `golden/` adalah **Mandatory Checkpoint**. Siklus audit wajib diawali dengan "Golden Audit" untuk mengadopsi standar terbaru.

## 8. Masalah: Narasi vs Eksekusi (Narrative Bias)
- **Temuan**: Orchestrator sering melaporkan keberhasilan sebelum melakukan penulisan fisik.
- **Solusi**: Protokol **Physical Verification**. Gunakan `list_dir` atau `command_status` untuk memverifikasi hasil sebelum memberikan laporan final.

## 9. Kebijakan Optimasi: Knowledge Bloat
- **Temuan**: HUB pengetahuan menjadi lambat dan sulit dipetakan jika dipenuhi file akademik/log historis yang besar.
- **Solusi**: Lakukan **Distill & Archive** secara berkala (Refactor Fase 6) untuk mengubah data mentah menjadi pola kecerdasan yang padat.

---
*Status: Institutional Memory Updated | Date: 29 April 2026*
04/2026*
