# 🌀 BLUEPRINT: RECURSIVE EVOLUTION MECHANISM (Mekanisme Evolusi Berantai)

Dokumen ini menjelaskan bagaimana Nexus AI akan menjalankan siklus pengembangan mandiri secara rekursif melintasi daftar 50 proyek PBL.

## 1. Alur Logika (The Infinite Loop)
Nexus akan menjalankan skrip pengontrol (`EvolutionPiper.js`) dengan alur sebagai berikut:

1.  **SCAN**: Membaca `50 project test TALL stack.md` untuk mencari baris `[ ]`.
2.  **SELECT**: Memilih satu proyek (misal: "Project 10: Finance Tracker").
3.  **SPAWN**: Menjalankan perintah shell untuk membuat folder `tests/sandboxes/finance-tracker` dan melakukan `composer create-project`.
4.  **OPERATE**: Menjalankan `node cli.js run --root tests/sandboxes/finance-tracker --yes`.
5.  **HARVEST**: Menjalankan `node cli.js harvest` untuk menarik data ke Golden HUB.
6.  **DISTILL**: Menyaring pengetahuan baru menjadi Skill Item.
7.  **UPDATE**: Mengubah baris di file daftar proyek dari `[ ]` menjadi `[x]` beserta link ke laporan misinya.
8.  **REPEAT**: Kembali ke langkah 1 sampai seluruh 50 proyek selesai.

## 2. Trigger Command (Usulan)
Untuk memicu evolusi berantai ini, Nexus akan memiliki perintah baru:
```bash
node cli.js evolve --board "documentation/planning/50 project test TALL stack.md"
```

## 3. Filosofi "Self-Improvement"
Setiap kali satu proyek selesai (Harvest), Nexus akan menggunakan pengetahuan baru tersebut untuk mengerjakan proyek berikutnya. 
*   **Contoh**: Jika Proyek 9 mengajarkan cara membuat penyingkat URL, maka di Proyek 10, Nexus mungkin akan menggunakan logika *URL validation* yang lebih canggih yang baru saja ia pelajari.

---
*Blueprint ini siap diimplementasikan pada sesi kita berikutnya.*
