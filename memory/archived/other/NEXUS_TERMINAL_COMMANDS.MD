# ⌨️ Nexus PowerShell Commands

Gunakan perintah-perintah berikut di PowerShell untuk mengoperasikan Nexus AI secara efisien.

## 🚀 Perintah Utama (Main Shortcuts)

| Tujuan | Perintah |
| :--- | :--- |
| **Buka Nexus (Menu)** | `node agent/main.js` |
| **Jalankan Audit & Plan** | `node agent/main.js run` |
| **Cek Status Sistem** | `node agent/main.js status` |
| **Jalankan 100 Sandbox** | `node agent/main.js sandbox` |
| **Tanya Arsitektur** | `node agent/main.js think "pertanyaan anda"` |

## 🧪 Perintah Sandbox (TALL Stack)

| Tujuan | Perintah |
| :--- | :--- |
| **Section 1 (Fundamental)** | `node agent/main.js sandbox --section 1` |
| **Section 2 (Dashboard)** | `node agent/main.js sandbox --section 2` |
| **Full Distill** | `node agent/main.js sandbox --distill` |

## 🛠 Troubleshooting PowerShell
Jika perintah `nexus` tidak dikenal, gunakan alias sementara ini di sesi PowerShell Anda:
```powershell
function nexus { node "C:\Users\ACER\Desktop\NEXUS AI\agent\main.js" $args }
```

---
*Dokumentasi ini dihasilkan secara otomatis oleh Nexus Engine v3.3.0*
