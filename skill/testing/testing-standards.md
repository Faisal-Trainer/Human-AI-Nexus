# SKILL: TESTING & QUALITY STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk pengujian aplikasi dan penjaminan kualitas.

## 1. Tipe Pengujian
- **Unit Testing:** Menguji logika kecil secara terisolasi (Service, Helper, Model).
- **Feature/Integration Testing:** Menguji alur fitur secara utuh (Controller, Livewire Component, API Endpoint).
- **End-to-End (E2E):** Menguji journey user dari browser (jika diperlukan).

## 2. Skenario Pengujian (The Holy Trinity)
1. **Happy Path:** Skenario di mana user melakukan segalanya dengan benar.
2. **Edge Case:** Skenario di mana user melakukan hal yang tidak biasa (misal: input sangat panjang, klik berkali-kali).
3. **Error Case:** Skenario di mana sistem gagal (misal: DB down, API timeout) dan bagaimana aplikasi merespon.

## 3. Best Practices Testing
- **Arrange, Act, Assert:** Gunakan struktur ini dalam setiap test case agar mudah dibaca.
- **Fakes & Mocks:** Gunakan Mocking untuk layanan eksternal (Mail, Payment Gateway, SMS).
- **Clean State:** Pastikan setiap test berjalan dengan database yang bersih/reset.

## 4. Checklist QA
- [ ] Test coverage mencakup minimal 80% logika bisnis utama.
- [ ] Pengujian mencakup pengecekan autentikasi dan otorisasi (Role access).
- [ ] Validasi input diuji dengan berbagai variasi data (valid & invalid).
- [ ] Test dapat dijalankan dengan satu perintah tunggal secara otomatis.

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `docs/agent/qa-specialist.md`.*
