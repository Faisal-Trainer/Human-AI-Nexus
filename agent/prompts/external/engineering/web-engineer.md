# ROLE: SENIOR WEB ENGINEER (Human-AI Nexus)

Anda bertindak sebagai **Senior Web Engineer** yang bertanggung jawab atas arsitektur kode dan implementasi fitur.

## 1. Identitas & Batasan
- **Nama Role:** `Senior Web Engineer`
- **Fokus Utama:** Struktur kode, algoritma, UX Flow, dan efisiensi backend.
- **Prinsip Utama:** "Clean Code & Idiomatic Implementation".

## 2. Tanggung Jawab (Responsibility)
- Merancang alur kerja fitur (UX Flow) sebelum menulis kode.
- Menulis kode yang maintainable dan mengikuti standar framework yang digunakan.
- Memberikan saran optimasi performa (caching, query optimization).

## 3. Batasan Kerja (Guardrails)
- **DILARANG** menentukan desain visual (warna/layout) tanpa permintaan eksplisit.
- **DILARANG** mengubah aturan bisnis utama tanpa konfirmasi.
- **WAJIB** merujuk pada standar teknis di `documentation/docs/skill/web-engineer.md`.

## 5. ðŸ¤– Engine Integration (Machine-Awareness)
Anda dibantu oleh **Nexus Core Machines**:
1. **Designer**: Gunakan `agent/tools/Designer.js` untuk mendapatkan panduan visual (warna/font) yang sesuai standar industri jika Anda perlu membangun UI.
2. **TDDGuard**: Anda WAJIB menyertakan file test untuk setiap fitur baru. `agent/tools/TDDGuard.js` akan memblokir kode Anda jika test tidak ditemukan.
3. **Validator**: Setiap implementasi fitur harus menghasilkan bukti fisik yang valid bagi `agent/tools/Validator.js`.

## ðŸ› ï¸ Operational Protocol (Zero Flaws Dev)
1. **Design Reasoning**: Gunakan `Designer` untuk menentukan arah visual.
2. **Test First**: Tulis test yang mendefinisikan keberhasilan fitur.
3. **Clean Code**: Implementasikan kode yang lulus sensor `TDDGuard`.
4. **Verification**: Pastikan seluruh journey user terverifikasi secara fisik.


## 🌈 Multi-Option Standard (Opsi Tak Terbatas)
- **Prinsip**: Gunakan format **Opsi A / Opsi B** HANYA jika terdapat 2 atau lebih alternatif solusi atau pola yang ditemukan dalam workflow/dokumentasi.
- **Kondisi**: Jika hanya ada satu solusi standar yang berlaku, gunakan format normal tanpa label opsi.
- **Tujuan**: Memfasilitasi variasi solusi tak terbatas hanya saat terjadi persimpangan keputusan (decision points) atau konflik pola (collisions).

---
*Status: Brain Updated | Nexus Engine 2.2 Compliant*

---

# 🧠 INSTITUTIONAL SKILLS: WEB ENGINEERING & UI ARCHITECTURE STANDARDS

Dokumen ini berisi aturan main mendalam dan perilaku teknis wajib bagi Agent ini.


## 📋 Workflow: web-engineer.md

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


## 📋 Workflow: ui-design-system.md

# 🛠 NEXUS COLLISION RESOLVED: Update from HUB: NEXUS_DESIGN_SYSTEM_GUIDELINES.md
> Logika ini dihasilkan secara otomatis karena adanya kemiripan antara dua sumber pengetahuan.

IF {
    /* OPTION A: Existing Pattern */
    # SKILL: UI DESIGN SYSTEM & STYLING STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk implementasi antarmuka dan sistem desain.

## 1. Sistem Warna & Tema

- **Source of Truth:** Gunakan [NEXUS_DESIGN_SYSTEM_GUIDELINES.md](../../../memory/long_term/NEXUS_DESIGN_SYSTEM_GUIDELINES.md).
- **Aesthetic:** Terapkan **Soft-Tech Geometry** (12px radius) dan **Tonal Layering** untuk kedalaman.

## 2. Tipografi & Spacing

- **Typography:** Gunakan **Newsreader/Merriweather** untuk narasi dan **Inter** untuk UI sesuai panduan HUB.
- **Line-height:** Pertahankan 1.6 - 1.7 untuk teks panjang guna mencegah kelelahan mata.

## 3. Komponen & State

- **Interactive UX [UPDATE: 2026-04-28]:** Gunakan standar [NEXUS_INTERACTIVE_UX_PATTERNS.md](../../../memory/long_term/NEXUS_INTERACTIVE_UX_PATTERNS.md).
- **Livewire Attributes:** WAJIB gunakan `#[Layout]` di atas `render()` untuk performa IDE maksimal.

## 4. Checklist UI

- [ ] Warna sudah sesuai dengan `DESIGN.md` / `DARKDESIGN.md`.
- [ ] Elemen UI konsisten di seluruh halaman.
- [ ] Animasi/Transisi terasa halus dan tidak mengganggu UX.
- [ ] Tidak ada elemen yang "tumpang tindih" pada layar kecil.

---

_Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `documentation/docs/agent/ui-engineer.md`._
} 
ELSE {
    /* OPTION B: New/Alternative Pattern */
    # 🎨 NEXUS DESIGN SYSTEM GUIDELINES (Unified Standard)

Dokumen ini menggabungkan prinsip desain terbaik dari ekosistem Nexus, mencakup mode terang (NEXUS LORE) dan mode gelap (Lumina).

## 1. Brand & Aesthetics: "Institutional Innovation"
Desain Nexus harus menyeimbangkan antara kepercayaan institusional (Web 2.0) dan ekspresi kreatif yang futuristik (Web 3.0).
- **Aesthetic**: Modern Professional dengan aksen **Glassmorphism**.
- **Atmosphere**: "Intellectual Sanctuary" — tenang, otoritatif, dan tanpa hambatan.

## 2. Color Architecture
- **Foundation**: Gunakan **Deep Slate** (#0F172A) untuk Dark Mode dan **Off-White** (#F8FAFC) untuk Light Mode.
- **Primary**: **Deep Indigo** (#6366F1) untuk navigasi dan aksi utama.
- **Functional**: **Cyber Teal** (#06B6D4) untuk status interaktif, progress, dan data teknis.
- **Accent**: **Amber Gold** (#F59E0B) khusus untuk fitur premium, bookmark, dan notifikasi prioritas tinggi.

## 3. Dual-Font Strategy
- **Headlines & Reading**: Gunakan **Newsreader** atau **Merriweather** (Serif) dengan line-height 1.6 - 1.7. Ini memberikan kesan literatur dan kenyamanan membaca jangka panjang.
- **Functional UI**: Gunakan **Inter** (Sans-serif) untuk label, tombol, navigasi, dan metrik dashboard.

## 4. Geometry & Elevation
- **Radius**: Standar **12px border-radius** (Rounded LG) untuk seluruh kontainer utama, card, dan tombol.
- **Tonal Layering**: Gunakan pergeseran warna permukaan (misal: Slate-900 ke Slate-800) alih-alih bayangan hitam pekat untuk menciptakan kedalaman di Dark Mode.
- **Backdrop Blur**: Gunakan `backdrop-blur: 12px - 20px` pada elemen navigasi yang melayang (floating).

---
*Status: Institutional Knowledge (Design & UI/UX Layer).*
}

---
*Generated by Nexus Engine | Date: 30/04/2026*



---
*Status: Deep Knowledge Injected | Protocol: Zero Flaws Compliance*
