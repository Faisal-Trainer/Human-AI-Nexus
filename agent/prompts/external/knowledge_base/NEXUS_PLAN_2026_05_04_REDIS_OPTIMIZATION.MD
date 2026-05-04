# PLANNING: Redis Infrastructure & Search Optimization

## 1. Konteks & Tujuan
Untuk mencapai performa "Elite" dan skala produksi, aplikasi memerlukan sistem caching dan queue yang lebih cepat daripada database tradisional. Tujuan fase ini adalah mengintegrasikan Redis ke dalam ekosistem NexusLore untuk menangani Session, Cache, dan Queue, serta mengoptimalkan fitur pencarian melalui mekanisme caching hasil query.

## 2. Rincian Perubahan

### Fase 1: Infrastruktur & Konfigurasi
- **Verifikasi Lingkungan**: Memastikan ekstensi PHP `redis` aktif dan server Redis berjalan pada port 6379.
- **Update Environment**: Mengubah driver utama di `.env`:
  - `CACHE_STORE=redis`
  - `SESSION_DRIVER=redis`
  - `QUEUE_CONNECTION=redis`

### Fase 2: Optimasi Pencarian (Nexus Scout Cache)
- **Implementasi Caching**: Mengintegrasikan `Illuminate\Support\Facades\Cache` pada komponen `Franchise\Index`.
- **Cache Key Strategy**: Membuat key unik berbasis MD5 dari parameter pencarian (keyword, genres, status, sortBy, dan page number).
- **TTL (Time To Live)**: Menetapkan durasi cache selama 5 menit untuk menjaga keseimbangan antara performa dan aktualitas data.

## 3. Langkah Verifikasi
1. Memastikan aplikasi tidak error setelah pergantian driver ke Redis.
2. Memverifikasi query database berkurang saat melakukan pencarian yang sama secara berulang (melalui monitoring query).
3. Memastikan Redis menyimpan data session dengan benar (user tetap login).

---
**STATUS**: SELESAI (COMPLETED)  
**ACTION**: Approve / Archive
