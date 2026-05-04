# 🛠 STRATEGIC PLAN: Search Enhancement (Laravel Scout)

**Ref Roadmap**: Phase 5 (Social & Discovery Engine)  
**Status**: APPROVED by USER  
**Date**: 2026-05-03

---

## 📋 1. Tujuan (Objectives)
Meningkatkan *discoverability* konten novel di platform NEXUS LORE dengan menyediakan fitur pencarian teks lengkap yang responsif dan akurat.

---

## 🏗 2. Arsitektur Teknis

### A. Search Engine
- **Engine**: Laravel Scout.
- **Driver**: `database` (Optimasi pencarian menggunakan database SQL standar tanpa layanan pihak ketiga).

### B. Indexing Strategy
- **Model**: `App\Models\Franchise`.
- **Fields**: 
    - `title`: Prioritas tinggi.
    - `synopsis`: Untuk pencarian berbasis konten.
    - `status`: Sebagai filter tambahan.

---

## 🛠 3. Tahapan Implementasi

### Tahap 1: Konfigurasi Core
- [ ] Penambahan `SCOUT_DRIVER=database` di `.env`.
- [ ] Integrasi trait `Searchable` pada model `Franchise`.
- [ ] Definisi method `toSearchableArray()`.

### Tahap 2: UI & UX Integration
- [ ] Penambahan property `$search` pada Livewire `Franchise\Index`.
- [ ] Implementasi input pencarian di halaman katalog.
- [ ] Sinkronisasi query: `Franchise::search($this->search)->paginate()`.

### Tahap 3: Optimization
- [ ] Implementasi *Debouncing* pada input search untuk mengurangi beban server.
- [ ] Penanganan state "No Results Found" dengan desain yang menarik.

---

## ⚠️ Standards & Safety
- **Zero Flaws**: Memastikan pencarian tidak mengabaikan validasi input.
- **Traceability**: Mencatat hasil implementasi ke dalam Technical Record.
- **Privacy**: Memastikan novel dengan status 'draft' tidak muncul dalam hasil pencarian publik.

---
**STATUS**: SIAP EKSEKUSI  
**ACTION**: Approve / Revise / Reject
