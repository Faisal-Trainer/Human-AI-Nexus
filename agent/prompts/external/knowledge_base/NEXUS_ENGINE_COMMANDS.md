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


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, vcs]
