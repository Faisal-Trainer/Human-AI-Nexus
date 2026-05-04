# 🚀 HYBRID APP ARCHITECTURE: NEXUS LORE Unified Ecosystem

**Strategy**: Hybrid (Capacitor + PWA)  
**Status**: PLANNING  
**Date**: 2026-05-03

---

## 🏗 1. Core Architecture
NEXUS LORE akan tetap menggunakan **Laravel (Livewire/Blade)** sebagai basis utama. Untuk distribusi ke Store, kita akan menggunakan **Capacitor.js** sebagai jembatan (bridge) ke fitur native.

### A. Environment Awareness
Sistem akan mendeteksi platform pengguna secara otomatis:
- **Web Browser**: Menampilkan Header penuh dan navigasi tradisional.
- **App Wrapper (Android/iOS)**: Menghilangkan Header browser, mengaktifkan Bottom Nav, dan menangani Safe Area (Notch).

---

## 📂 2. Folder Organization (Frontend)
Untuk menjaga kode tetap bersih, kita akan mengadopsi struktur komponen adaptif:

```text
resources/views/
├── components/
│   ├── mobile/         # Navigasi Bawah, Tab Bar, Swipe Menu
│   ├── desktop/        # Sidebar, Header Luas, Mega Menu
│   └── shared/         # Novel Cards, Buttons, Form Inputs
└── layouts/
    ├── app.blade.php    # Layout Standar Desktop
    └── mobile.blade.php # Layout Imersif untuk Mobile App (No Scrollbar, No Browser UI)
```

---

## 📱 3. Store Readiness Checklist
Agar lolos review **App Store (Apple)** dan **Play Store (Google)**:

1.  **Navigasi**: Wajib memiliki navigasi yang jelas (Bottom Nav adalah standar emas).
2.  **Performance**: Transisi halaman harus cepat (Optimalisasi `wire:navigate` dan `v-prefetch`).
3.  **Account Management**: Tombol "Delete Account" wajib ada di dalam aplikasi (Syarat Apple).
4.  **Immersive UI**: Menghilangkan elemen yang berbau "website" (seperti link footer teks biru yang membingungkan).

---

## 🔔 4. Notification Strategy
- **Web**: Laravel Reverb + Toast Notifications.
- **App**: Reverb + Firebase Cloud Messaging (FCM) via Capacitor Push Plugin.
- **Hasil**: Penulis mendapat getaran (vibrasi) di HP saat ada komentar baru secara real-time.

---

## 🛠 5. Roadmap Eksekusi
1.  **Sprint 1**: Restrukturisasi folder komponen dan pembuatan Layout Mobile.
2.  **Sprint 2**: Pembuatan `manifest.json` dan Icon PWA.
3.  **Sprint 3**: Implementasi Bottom Navigation adaptif.
4.  **Sprint 4**: Pengujian transisi imersif dan penanganan Notch (Safe Area).

---
**STATUS**: MENUNGGU PERSETUJUAN  
**ACTION**: Approve / Revise / Reject
