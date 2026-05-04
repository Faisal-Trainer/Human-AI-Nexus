# 🛠 STRATEGIC PLAN: Real-Time Ecosystem via Laravel Reverb

**Ref Roadmap**: Phase 5 (Social & Discovery Engine)  
**Status**: APPROVED by USER  
**Date**: 2026-05-03

---

## 📋 1. Tujuan (Objectives)
Mengubah interaksi statis menjadi dinamis dengan mengimplementasikan sistem WebSocket menggunakan **Laravel Reverb**. Target utama adalah pembaruan real-time pada Activity Feed dan sistem notifikasi.

---

## 🏗 2. Arsitektur Teknis

### A. Komponen Server
- **Server**: Laravel Reverb (Driver: `reverb`).
- **Channel Strategy**:
    - `author.{uuid}`: Privat, untuk follower penulis tertentu.
    - `franchise.{uuid}`: Publik, untuk update bab novel tertentu.
    - `user.{uuid}`: Privat, untuk notifikasi personal.

### B. Broadcasting Logic
- **Event**: `App\Events\ChapterPublished`.
- **Trigger**: Terjadi saat model `Chapter` dibuat (hook: `created`).
- **Payload**: UUID Franchise, Judul Bab, dan Timestamp.

---

## 🛠 3. Tahapan Implementasi (Action Plan)

### Tahap 1: Setup & Konfigurasi
- [ ] Eksekusi `php artisan install:broadcasting`.
- [ ] Verifikasi konfigurasi `REVERB_APP_ID`, `REVERB_APP_KEY`, dan `REVERB_APP_SECRET` di `.env`.
- [ ] Memastikan port Reverb (8080 default) terbuka di lingkungan lokal.

### Tahap 2: Backend Logic
- [ ] Pembuatan Event Class `ChapterPublished`.
- [ ] Konfigurasi `ShouldBroadcast` interface.
- [ ] Setup `channels.php` untuk otorisasi channel privat.

### Tahap 3: Frontend Integration (Livewire)
- [ ] Penambahan `wire:init` atau listener `$listeners` pada komponen `ActivityFeed`.
- [ ] Integrasi Laravel Echo di `resources/js/app.js`.
- [ ] Implementasi animasi "New Update available" sebelum refresh otomatis.

---

## ⚠️ Safety & Standards
- **Standard**: Zero Flaws. Seluruh Event harus menyertakan UUID, bukan auto-increment ID.
- **Traceability**: Setiap broadcast harus meninggalkan log di `storage/logs/laravel.log` selama fase development.
- **Constraint**: Patuhi `NEXUS_BOUNDARY_CONSTRAINTS.md` (Dilarang menghapus dokumentasi yang ada).

---
**STATUS**: SIAP EKSEKUSI (Menunggu Handoff)  
**ACTION**: Approve / Revise / Reject
