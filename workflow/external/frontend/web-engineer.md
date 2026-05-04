
# 🛠 NEXUS COLLISION RESOLVED: Update from HUB: NEXUS_ENGINE_COMMANDS.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Update from HUB: NEXUS_ENGINE_COMMANDS.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # SKILL: WEB ENGINEERING STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis pengembangan web dan best practices untuk proyek **Human-AI Nexus**.

## 1. Arsitektur & Struktur Folder
- Ikuti standar struktur folder framework yang digunakan.
- Gunakan penamaan file yang konsisten (PascalCase untuk Class, snake_case untuk view).
- Pisahkan logika bisnis dari UI (Gunakan Service Pattern atau Action jika perlu).

## 2. Database & Eloquent (Laravel Context)
- Gunakan UUID sebagai primary key jika diperlukan untuk skalabilitas.
- Selalu cegah masalah `N+1 Query` dengan Eager Loading (`with()`).
- Gunakan Database Transactions untuk operasi yang melibatkan banyak tabel.

## 3. Frontend & Interaksi (Livewire/Alpine)
- **Livewire Attributes:** WAJIB gunakan PHP Attributes (`#[Layout('layouts.app')]`) untuk mendefinisikan layout. Dilarang menggunakan method chaining `->layout()` untuk menghindari linting error.
- **Interaction Security:** Setiap aksi (update/delete) dalam komponen Livewire wajib melewati pengecekan otorisasi (`Gate` atau `$user->can()`).
- **Feedback:** Gunakan Loading States untuk memberikan feedback ke user.
- **Responsiveness:** Terapkan Throttling/Debouncing pada input yang memicu request server.

## 4. Performance & Quality
- Gunakan Pagination untuk daftar data yang besar.
- Terapkan caching untuk data yang jarang berubah tapi sering diakses.
- Tulis Feature Test minimal untuk alur kerja utama (Happy Path).

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `documentation/docs/agent/web-engineer.md`.*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Refactor from Golden: NEXUS_ENGINE_COMMANDS.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 Nexus Engine: Command Reference

Dokumen ini berisi daftar perintah resmi untuk **Human-AI Nexus Core Engine** beserta fungsinya masing-masing.

## 📋 Daftar Perintah (CLI Commands)

| Perintah | Deskripsi |
| :--- | :--- |
| `nexus run` | Menjalankan siklus penuh: **Audit** → **Plan** → **Execute**. |
| `nexus audit` | Hanya menjalankan fase **Audit** untuk memindai kondisi proyek saat ini. |
| `nexus harvest <dir>` | Mengambil (*harvesting*) dokumen Nexus dari proyek lain untuk dimasukkan ke Golden HUB. |
| `nexus refactor` | **[Protocol 1]** Melakukan *Mass Refactor* dari data Golden ke HUB. |
| `nexus update-skills` | **[Protocol 2]** Melakukan *Mass Update* dari HUB ke instruksi Agent (Skills). |
| `nexus skills` | Menampilkan daftar skill/modul agent yang tersedia dalam sistem. |
| `nexus help` | Menampilkan panduan bantuan CLI. |

## ⚙️ Cara Menjalankan (Execution)

Jika perintah `nexus` tidak terinstal secara global atau mengalami masalah pada symlink, gunakan perintah `npx` langsung dari repositori sumber:

```powershell
# Contoh menjalankan audit
npx -y github:Faisal-Trainer/Human-AI-Nexus audit
```

## ⚠️ Troubleshooting
Jika muncul error `MODULE_NOT_FOUND` pada path `C:\xampp\nodejs\node_modules\@faisal-trainer\`, pastikan symlink global merujuk pada folder project engine yang benar atau gunakan metode `npx` di atas.

---
*Terakhir diperbarui: 29 April 2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in NEXUS_ENGINE_COMMANDS.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in NEXUS_ENGINE_COMMANDS.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in NEXUS_ENGINE_COMMANDS.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 Nexus Engine: Command Reference

Dokumen ini berisi daftar perintah resmi untuk **Human-AI Nexus Core Engine** beserta fungsinya masing-masing.

## 📋 Daftar Perintah (CLI Commands)

| Perintah              | Deskripsi                                                                               |
| :-------------------- | :-------------------------------------------------------------------------------------- |
| `nexus run`           | Menjalankan siklus penuh: **Audit** → **Plan** → **Execute**.                           |
| `nexus audit`         | Hanya menjalankan fase **Audit** untuk memindai kondisi proyek saat ini.                |
| `nexus harvest <dir>` | Mengambil (_harvesting_) dokumen Nexus dari proyek lain untuk dimasukkan ke Golden HUB. |
| `nexus refactor`      | **[Protocol 1]** Melakukan _Mass Refactor_ dari data Golden ke HUB.                     |
| `nexus update-skills` | **[Protocol 2]** Melakukan _Mass Update_ dari HUB ke instruksi Agent (Skills).          |
| `nexus skills`        | Menampilkan daftar skill/modul agent yang tersedia dalam sistem.                        |
| `nexus help`          | Menampilkan panduan bantuan CLI.                                                        |

## ⚙️ Cara Menjalankan (Execution)

Jika perintah `nexus` tidak terinstal secara global atau mengalami masalah pada symlink, gunakan perintah `npx` langsung dari repositori sumber:

```powershell
# Contoh menjalankan audit
npx -y github:Faisal-Trainer/Human-AI-Nexus audit
```

## ⚠️ Troubleshooting

Jika muncul error `MODULE_NOT_FOUND` pada path `C:\xampp\nodejs\node_modules\@faisal-trainer\`, pastikan symlink global merujuk pada folder project engine yang benar atau gunakan metode `npx` di atas.

---

_Terakhir diperbarui: 29 April 2026_
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # 🛠 Nexus Engine: Command Reference

Dokumen ini berisi daftar perintah resmi untuk **Human-AI Nexus Core Engine** beserta fungsinya masing-masing.

## 📋 Daftar Perintah (CLI Commands)

| Perintah | Deskripsi |
| :--- | :--- |
| `nexus run` | Menjalankan siklus penuh: **Audit** → **Plan** → **Execute**. |
| `nexus audit` | Hanya menjalankan fase **Audit** untuk memindai kondisi proyek saat ini. |
| `nexus harvest <dir>` | Mengambil (*harvesting*) dokumen Nexus dari proyek lain untuk dimasukkan ke Golden HUB. |
| `nexus refactor` | **[Protocol 1]** Melakukan *Mass Refactor* dari data Golden ke HUB. |
| `nexus update-skills` | **[Protocol 2]** Melakukan *Mass Update* dari HUB ke instruksi Agent (Skills). |
| `nexus skills` | Menampilkan daftar skill/modul agent yang tersedia dalam sistem. |
| `nexus help` | Menampilkan panduan bantuan CLI. |

## ⚙️ Cara Menjalankan (Execution)

Jika perintah `nexus` tidak terinstal secara global atau mengalami masalah pada symlink, gunakan perintah `npx` langsung dari repositori sumber:

```powershell
# Contoh menjalankan audit
npx -y github:Faisal-Trainer/Human-AI-Nexus audit
```

## ⚠️ Troubleshooting
Jika muncul error `MODULE_NOT_FOUND` pada path `C:\xampp\nodejs\node_modules\@faisal-trainer\`, pastikan symlink global merujuk pada folder project engine yang benar atau gunakan metode `npx` di atas.

---
*Terakhir diperbarui: 29 April 2026*
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # 🛠 Nexus Engine: Command Reference

Dokumen ini berisi daftar perintah resmi untuk **Human-AI Nexus Core Engine** beserta fungsinya masing-masing.

## 📋 Daftar Perintah (CLI Commands)

| Perintah | Deskripsi |
| :--- | :--- |
| `nexus run` | Menjalankan siklus penuh: **Audit** → **Plan** → **Execute**. |
| `nexus audit` | Hanya menjalankan fase **Audit** untuk memindai kondisi proyek saat ini. |
| `nexus harvest <dir>` | Mengambil (*harvesting*) dokumen Nexus dari proyek lain untuk dimasukkan ke Golden HUB. |
| `nexus refactor` | **[Protocol 1]** Melakukan *Mass Refactor* dari data Golden ke HUB. |
| `nexus update-skills` | **[Protocol 2]** Melakukan *Mass Update* dari HUB ke instruksi Agent (Skills). |
| `nexus skills` | Menampilkan daftar skill/modul agent yang tersedia dalam sistem. |
| `nexus help` | Menampilkan panduan bantuan CLI. |

## ⚙️ Cara Menjalankan (Execution)

Jika perintah `nexus` tidak terinstal secara global atau mengalami masalah pada symlink, gunakan perintah `npx` langsung dari repositori sumber:

```powershell
# Contoh menjalankan audit
npx -y github:Faisal-Trainer/Human-AI-Nexus audit
```

## ⚠️ Troubleshooting
Jika muncul error `MODULE_NOT_FOUND` pada path `C:\xampp\nodejs\node_modules\@faisal-trainer\`, pastikan symlink global merujuk pada folder project engine yang benar atau gunakan metode `npx` di atas.

---
*Terakhir diperbarui: 29 April 2026*
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # 🛠 Nexus Engine: Command Reference

Dokumen ini berisi daftar perintah resmi untuk **Human-AI Nexus Core Engine** beserta fungsinya masing-masing.

## 📋 Daftar Perintah (CLI Commands)

| Perintah | Deskripsi |
| :--- | :--- |
| `nexus run` | Menjalankan siklus penuh: **Audit** → **Plan** → **Execute**. |
| `nexus audit` | Hanya menjalankan fase **Audit** untuk memindai kondisi proyek saat ini. |
| `nexus harvest <dir>` | Mengambil (*harvesting*) dokumen Nexus dari proyek lain untuk dimasukkan ke Golden HUB. |
| `nexus refactor` | **[Protocol 1]** Melakukan *Mass Refactor* dari data Golden ke HUB. |
| `nexus update-skills` | **[Protocol 2]** Melakukan *Mass Update* dari HUB ke instruksi Agent (Skills). |
| `nexus skills` | Menampilkan daftar skill/modul agent yang tersedia dalam sistem. |
| `nexus help` | Menampilkan panduan bantuan CLI. |

## ⚙️ Cara Menjalankan (Execution)

Jika perintah `nexus` tidak terinstal secara global atau mengalami masalah pada symlink, gunakan perintah `npx` langsung dari repositori sumber:

```powershell
# Contoh menjalankan audit
npx -y github:Faisal-Trainer/Human-AI-Nexus audit
```

## ⚠️ Troubleshooting
Jika muncul error `MODULE_NOT_FOUND` pada path `C:\xampp\nodejs\node_modules\@faisal-trainer\`, pastikan symlink global merujuk pada folder project engine yang benar atau gunakan metode `npx` di atas.

---
*Terakhir diperbarui: 29 April 2026*
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Refactor from Golden: NEXUS_ENGINE_COMMANDS.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 Nexus Engine: Command Reference

Dokumen ini berisi daftar perintah resmi untuk **Human-AI Nexus Core Engine** beserta fungsinya masing-masing.

## 📋 Daftar Perintah (CLI Commands)

| Perintah | Deskripsi |
| :--- | :--- |
| `nexus run` | Menjalankan siklus penuh: **Audit** → **Plan** → **Execute**. |
| `nexus audit` | Hanya menjalankan fase **Audit** untuk memindai kondisi proyek saat ini. |
| `nexus harvest <dir>` | Mengambil (*harvesting*) dokumen Nexus dari proyek lain untuk dimasukkan ke Golden HUB. |
| `nexus refactor` | **[Protocol 1]** Melakukan *Mass Refactor* dari data Golden ke HUB. |
| `nexus update-skills` | **[Protocol 2]** Melakukan *Mass Update* dari HUB ke instruksi Agent (Skills). |
| `nexus skills` | Menampilkan daftar skill/modul agent yang tersedia dalam sistem. |
| `nexus help` | Menampilkan panduan bantuan CLI. |

## ⚙️ Cara Menjalankan (Execution)

Jika perintah `nexus` tidak terinstal secara global atau mengalami masalah pada symlink, gunakan perintah `npx` langsung dari repositori sumber:

```powershell
# Contoh menjalankan audit
npx -y github:Faisal-Trainer/Human-AI-Nexus audit
```

## ⚠️ Troubleshooting
Jika muncul error `MODULE_NOT_FOUND` pada path `C:\xampp\nodejs\node_modules\@faisal-trainer\`, pastikan symlink global merujuk pada folder project engine yang benar atau gunakan metode `npx` di atas.

---
*Terakhir diperbarui: 29 April 2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in NEXUS_ENGINE_COMMANDS.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in NEXUS_ENGINE_COMMANDS.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 NEXUS COLLISION RESOLVED: Collision in NEXUS_ENGINE_COMMANDS.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # 🛠 Nexus Engine: Command Reference

Dokumen ini berisi daftar perintah resmi untuk **Human-AI Nexus Core Engine** beserta fungsinya masing-masing.

## 📋 Daftar Perintah (CLI Commands)

| Perintah              | Deskripsi                                                                               |
| :-------------------- | :-------------------------------------------------------------------------------------- |
| `nexus run`           | Menjalankan siklus penuh: **Audit** → **Plan** → **Execute**.                           |
| `nexus audit`         | Hanya menjalankan fase **Audit** untuk memindai kondisi proyek saat ini.                |
| `nexus harvest <dir>` | Mengambil (_harvesting_) dokumen Nexus dari proyek lain untuk dimasukkan ke Golden HUB. |
| `nexus refactor`      | **[Protocol 1]** Melakukan _Mass Refactor_ dari data Golden ke HUB.                     |
| `nexus update-skills` | **[Protocol 2]** Melakukan _Mass Update_ dari HUB ke instruksi Agent (Skills).          |
| `nexus skills`        | Menampilkan daftar skill/modul agent yang tersedia dalam sistem.                        |
| `nexus help`          | Menampilkan panduan bantuan CLI.                                                        |

## ⚙️ Cara Menjalankan (Execution)

Jika perintah `nexus` tidak terinstal secara global atau mengalami masalah pada symlink, gunakan perintah `npx` langsung dari repositori sumber:

```powershell
# Contoh menjalankan audit
npx -y github:Faisal-Trainer/Human-AI-Nexus audit
```

## ⚠️ Troubleshooting

Jika muncul error `MODULE_NOT_FOUND` pada path `C:\xampp\nodejs\node_modules\@faisal-trainer\`, pastikan symlink global merujuk pada folder project engine yang benar atau gunakan metode `npx` di atas.

---

_Terakhir diperbarui: 29 April 2026_
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # 🛠 Nexus Engine: Command Reference

Dokumen ini berisi daftar perintah resmi untuk **Human-AI Nexus Core Engine** beserta fungsinya masing-masing.

## 📋 Daftar Perintah (CLI Commands)

| Perintah | Deskripsi |
| :--- | :--- |
| `nexus run` | Menjalankan siklus penuh: **Audit** → **Plan** → **Execute**. |
| `nexus audit` | Hanya menjalankan fase **Audit** untuk memindai kondisi proyek saat ini. |
| `nexus harvest <dir>` | Mengambil (*harvesting*) dokumen Nexus dari proyek lain untuk dimasukkan ke Golden HUB. |
| `nexus refactor` | **[Protocol 1]** Melakukan *Mass Refactor* dari data Golden ke HUB. |
| `nexus update-skills` | **[Protocol 2]** Melakukan *Mass Update* dari HUB ke instruksi Agent (Skills). |
| `nexus skills` | Menampilkan daftar skill/modul agent yang tersedia dalam sistem. |
| `nexus help` | Menampilkan panduan bantuan CLI. |

## ⚙️ Cara Menjalankan (Execution)

Jika perintah `nexus` tidak terinstal secara global atau mengalami masalah pada symlink, gunakan perintah `npx` langsung dari repositori sumber:

```powershell
# Contoh menjalankan audit
npx -y github:Faisal-Trainer/Human-AI-Nexus audit
```

## ⚠️ Troubleshooting
Jika muncul error `MODULE_NOT_FOUND` pada path `C:\xampp\nodejs\node_modules\@faisal-trainer\`, pastikan symlink global merujuk pada folder project engine yang benar atau gunakan metode `npx` di atas.

---
*Terakhir diperbarui: 29 April 2026*
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # 🛠 Nexus Engine: Command Reference

Dokumen ini berisi daftar perintah resmi untuk **Human-AI Nexus Core Engine** beserta fungsinya masing-masing.

## 📋 Daftar Perintah (CLI Commands)

| Perintah | Deskripsi |
| :--- | :--- |
| `nexus run` | Menjalankan siklus penuh: **Audit** → **Plan** → **Execute**. |
| `nexus audit` | Hanya menjalankan fase **Audit** untuk memindai kondisi proyek saat ini. |
| `nexus harvest <dir>` | Mengambil (*harvesting*) dokumen Nexus dari proyek lain untuk dimasukkan ke Golden HUB. |
| `nexus refactor` | **[Protocol 1]** Melakukan *Mass Refactor* dari data Golden ke HUB. |
| `nexus update-skills` | **[Protocol 2]** Melakukan *Mass Update* dari HUB ke instruksi Agent (Skills). |
| `nexus skills` | Menampilkan daftar skill/modul agent yang tersedia dalam sistem. |
| `nexus help` | Menampilkan panduan bantuan CLI. |

## ⚙️ Cara Menjalankan (Execution)

Jika perintah `nexus` tidak terinstal secara global atau mengalami masalah pada symlink, gunakan perintah `npx` langsung dari repositori sumber:

```powershell
# Contoh menjalankan audit
npx -y github:Faisal-Trainer/Human-AI-Nexus audit
```

## ⚠️ Troubleshooting
Jika muncul error `MODULE_NOT_FOUND` pada path `C:\xampp\nodejs\node_modules\@faisal-trainer\`, pastikan symlink global merujuk pada folder project engine yang benar atau gunakan metode `npx` di atas.

---
*Terakhir diperbarui: 29 April 2026*
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # 🛠 Nexus Engine: Command Reference

Dokumen ini berisi daftar perintah resmi untuk **Human-AI Nexus Core Engine** beserta fungsinya masing-masing.

## 📋 Daftar Perintah (CLI Commands)

| Perintah | Deskripsi |
| :--- | :--- |
| `nexus run` | Menjalankan siklus penuh: **Audit** → **Plan** → **Execute**. |
| `nexus audit` | Hanya menjalankan fase **Audit** untuk memindai kondisi proyek saat ini. |
| `nexus harvest <dir>` | Mengambil (*harvesting*) dokumen Nexus dari proyek lain untuk dimasukkan ke Golden HUB. |
| `nexus refactor` | **[Protocol 1]** Melakukan *Mass Refactor* dari data Golden ke HUB. |
| `nexus update-skills` | **[Protocol 2]** Melakukan *Mass Update* dari HUB ke instruksi Agent (Skills). |
| `nexus skills` | Menampilkan daftar skill/modul agent yang tersedia dalam sistem. |
| `nexus help` | Menampilkan panduan bantuan CLI. |

## ⚙️ Cara Menjalankan (Execution)

Jika perintah `nexus` tidak terinstal secara global atau mengalami masalah pada symlink, gunakan perintah `npx` langsung dari repositori sumber:

```powershell
# Contoh menjalankan audit
npx -y github:Faisal-Trainer/Human-AI-Nexus audit
```

## ⚠️ Troubleshooting
Jika muncul error `MODULE_NOT_FOUND` pada path `C:\xampp\nodejs\node_modules\@faisal-trainer\`, pastikan symlink global merujuk pada folder project engine yang benar atau gunakan metode `npx` di atas.

---
*Terakhir diperbarui: 29 April 2026*
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
}

---
*Generated by Nexus Engine | Date: 30/04/2026*
