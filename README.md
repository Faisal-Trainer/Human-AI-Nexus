# 🤖 Human-AI Nexus: Documentation-First Framework

Pusat kendali dan dokumentasi terstruktur yang dirancang khusus untuk menjembatani kolaborasi antara **Human Developer** dan **AI Assistant**. Framework ini memastikan setiap tahap pengembangan—mulai dari perencanaan (planning), perancangan algoritma, hingga aspek legal—terdokumentasi dengan ketat sebelum satu baris kode pun ditulis.

## 🚀 Instruksi Penting untuk AI Assistant
Setiap kali Anda memulai sesi baru atau mengerjakan tugas di proyek ini, Anda **WAJIB**:
1.  Membaca `docs/agent/ai-assistant.md` untuk memahami alur kerja (Workflow).
2.  Membaca dokumen Role yang relevan di `docs/agent/` (Web Engineer, UX, atau Security).
3.  Memeriksa `docs/algorithms/` dan `docs/planning/` untuk melihat rencana fitur yang sedang berjalan.

## 📂 Struktur Folder
| Folder | Deskripsi |
| :--- | :--- |
| `📂 agent/` | Definisi Workflow dan Persona AI (Instruksi Utama). |
| `📂 algorithms/` | Logika fitur dan algoritma sebelum diimplementasikan ke kode. |
| `📂 design/` | Aset desain atau spesifikasi UI/UX. |
| `📂 planning/` | Rencana pengembangan fase demi fase. |
| `📂 skill/` | Modul spesialisasi teknis AI. |
| `📂 records/` | Laporan penyelesaian fitur (History pengembangan). |
| `📂 summary/` | Rangkuman sesi harian. |
| `📂 legal/` | Dokumen hukum (Privacy Policy & Terms of Service). |

## 🛠 Prinsip Utama
- **Documentation First**: Jangan menulis kode sebelum rancangan disetujui di folder `algorithms/` atau `planning/`.
- **Traceability**: Setiap perubahan harus bisa dilacak kembali ke dokumen dokumentasi.
- **No Approval, No Code**: AI dilarang melakukan perubahan besar tanpa konfirmasi.

---
*Dikelola oleh Faisal-Trainer & AI Assistant.*

## ⚡ Quick Start / Installation

Cara termudah untuk menginstall framework ini ke proyek Anda adalah menggunakan **npx**:

```bash
npx github:Faisal-Trainer/Human-AI-Nexus
```

Atau menggunakan PowerShell (Windows):

```powershell
iwr -useb https://raw.githubusercontent.com/Faisal-Trainer/Human-AI-Nexus/main/install.ps1 | iex
```

