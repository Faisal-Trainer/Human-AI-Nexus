# 🔧 Setup Nexus Command Permanen (PowerShell)

Agar Anda bisa mengetik `nexus` langsung dari folder mana saja tanpa `node agent/main.js`, ikuti langkah ini:

1. Buka PowerShell Profile Anda:
   ```powershell
   notepad $PROFILE
   ```
   *(Jika file tidak ada, buat baru saat ditanya)*

2. Copy dan Paste baris berikut di akhir file:
   ```powershell
   function nexus { node "C:\Users\ACER\Desktop\NEXUS AI\agent\main.js" $args }
   ```

3. Simpan dan Restart PowerShell.

4. Sekarang Anda bisa menjalankan perintah singkat:
   ```powershell
   nexus status
   nexus sandbox --section 1
   nexus think "apa itu tall stack?"
   ```
