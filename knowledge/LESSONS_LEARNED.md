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

## 5. Masalah: Bias Klasifikasi Nama File ("Judging by the Cover")

- **Temuan**: Agent cenderung menganggap file dengan nama generik (seperti `New Text Document.md`) sebagai file sampah tanpa memeriksa isinya.
- **Kejadian**: File yang berisi backlog teknis P0 hampir dihapus karena bernama "New Text Document".
- **Solusi**: Tambahkan protokol **Deep Scan** pada persona Agent. Dilarang merekomendasikan penghapusan file sebelum melakukan pembacaan isi secara utuh (Full Context Reading).

## 6. Kebijakan Memori: Institusionalisasi Folder `golden/`

- **Temuan**: Folder `golden/` menyimpan "DNA" kesuksesan dari proyek-proyek sebelumnya yang telah divalidasi oleh User.
- **Kebijakan**: Folder `golden/` bukan hanya arsip pasif, melainkan **Mandatory Checkpoint**.
- **Protokol**: Setiap siklus kerja (Audit/Plan) **WAJIB** diawali dengan "Golden Audit" untuk memastikan standar terbaru yang diletakkan User di sana (dari project manapun) diadopsi secara instan oleh Engine.

## 7. Masalah: Bias Narasi (Narrative vs Execution Bias)

- **Temuan**: AI (Orchestrator) terkadang melaporkan keberhasilan penulisan file dalam narasi sebelum benar-benar mengeksekusi fungsi fisik penulisan.
- **Kejadian**: Laporan audit mengklaim file knowledge baru sudah ada, padahal hanya ada dalam memori perencanaan AI.
- **Solusi**: Terapkan protokol **Verification Check**. AI wajib memverifikasi keberadaan file fisik (via `list_dir`) setelah penulisan sebelum memberikan laporan final kepada User. Jangan pernah menganggap narasi sebagai bukti eksekusi.

_Last Updated: 2026-04-28 | Referensi: Kasus Kelalaian Sinkronisasi HUB_
