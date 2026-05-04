# 🛠 STRATEGIC PLAN: Expanded Real-Time Ecosystem

**Ref Roadmap**: Phase 5 (Social & Discovery Engine)  
**Status**: INITIATED by USER  
**Date**: 2026-05-03

---

## 📋 1. Deskripsi Proyek
Ekspansi penggunaan **Laravel Reverb** untuk mencakup seluruh interaksi pengguna di platform NEXUS LORE. Tujuannya adalah menciptakan pengalaman pengguna yang responsif dan interaktif secara sosial.

---

## 🏗 2. Rincian Fitur & Komponen

### A. Real-Time Comments (Live Discussion)
- **Event**: `App\Events\CommentPosted`
- **Channel**: `franchise.{uuid}`
- **Behavior**: Komentar baru disisipkan secara dinamis ke dalam komponen `CommentSection` tanpa refresh.

### B. Live Interaction Counter (Social Proof)
- **Event**: `App\Events\InteractionCountUpdated`
- **Channel**: `franchise.{uuid}`
- **Behavior**: Angka Like, Dislike, dan Bookmark diperbarui secara instan pada seluruh UI pengguna yang sedang melihat novel tersebut.

### C. Instant Author Notifications (Engagement)
- **Event**: `App\Events\AuthorNotified`
- **Channel**: `App.Models.User.{author_id}` (Private)
- **Behavior**: Penulis menerima *toast notification* instan untuk setiap interaksi baru pada karyanya.

---

## 🛠 3. Tahapan Implementasi

### Tahap 1: Komentar & Diskusi
- [ ] Implementasi Event `CommentPosted`.
- [ ] Update `CommentSection.php` (Livewire) untuk mendengarkan broadcast.

### Tahap 2: Sinkronisasi Interaksi
- [ ] Logic penghitungan agregat interaksi pasca-update.
- [ ] Broadcast data agregat ke channel publik novel.

### Tahap 3: Sistem Notifikasi Global
- [ ] Integrasi dengan Laravel Notification system.
- [ ] Broadcast notifikasi melalui channel privat user.

---

## ⚠️ Standards & Security
- **Data Integrity**: Seluruh event harus membawa payload minimal (ID/UUID) untuk menghindari overhead bandwidth.
- **Privacy**: Channel privat harus melalui proses otorisasi ketat di `channels.php`.
- **Constraint Compliance**: Tidak ada penghapusan dokumentasi lama.

---
**STATUS**: SIAP EKSEKUSI  
**ACTION**: Approve / Revise / Reject
