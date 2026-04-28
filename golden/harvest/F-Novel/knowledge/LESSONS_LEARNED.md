# 🧠 Lessons Learned: NPX & Package Orchestration

## 1. Masalah: NPX Command 404
- **Temuan**: Perintah `npx <name>` gagal jika paket dipublikasikan dengan scope (misal: `@user/name`) namun dipanggil tanpa scope.
- **Solusi**: Dokumentasi harus selalu mencantumkan nama paket lengkap atau menggunakan prefix `github:<user>/<repo>` jika belum dipublikasikan ke NPM.

## 2. Masalah: Konflik Binary (Installer vs Engine)
- **Temuan**: Jika sebuah paket memiliki lebih dari satu binary di `package.json`, `npx` cenderung menjalankan yang pertama kali didefinisikan.
- **Kejadian**: `cli.js` (Installer) terpanggil terus padahal user ingin menjalankan `src/index.js` (Engine).
- **Solusi**: Urutan binary di `package.json` harus meletakkan Engine utama (`nexus`) di baris pertama.

## 3. Masalah: Folder Knowledge Terlewat
- **Temuan**: Folder `knowledge/` tidak ada di root dan tidak terdaftar di `cli.js`, sehingga memori AI tidak tersinkronisasi.
- **Solusi**: Tambahkan folder `knowledge` ke daftar sinkronisasi di `cli.js` dan pastikan folder tersebut ada di repository.

## 4. Masalah: Update Tidak Terjadi & Folder Sudah Ada
- **Temuan**: `npm update` tidak memperbarui folder dokumentasi yang sudah di-copy. `cli.js` membatalkan instalasi jika folder sudah ada.
- **Solusi**: Menambahkan dukungan flag `--force` atau `-f` di `cli.js` untuk mengizinkan penimpaan (overwrite) folder yang sudah ada saat update diperlukan.
*Dibuat pada: 2026-04-28 | Referensi: Kasus Error NPX Human-AI Nexus*
