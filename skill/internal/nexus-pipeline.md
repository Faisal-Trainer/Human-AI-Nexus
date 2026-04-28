# SKILL: NEXUS KNOWLEDGE INTEGRATION (Evolution Pipeline)

Dokumen ini berisi standar teknis untuk melakukan integrasi pengetahuan antar lapisan di dalam Human-AI Nexus.

## 1. Prosedur Distilasi (Golden ➔ HUB)
- **Filter Relevansi**: Hanya ambil standar yang bersifat umum dan dapat diterapkan di berbagai proyek (Reusable).
- **Format HUB**: Gunakan prefix `NEXUS_` untuk setiap file di folder `knowledge/`.
- **Metadata**: Cantumkan `Referenced from: [nama folder golden]` di bagian bawah dokumen HUB.

## 2. Prosedur Internalisasi (HUB ➔ Brain)
- **Target Identification**:
    - Standar Database ➔ `skill/backend/database-design.md`.
    - Standar UI/UX ➔ `skill/frontend/ux-design.md`.
    - Standar Workflow ➔ `agent/core/orchestrator.md`.
    - Standar Keamanan ➔ `skill/security/*`.
- **Injection Style**: Gunakan kalimat imperatif (WAJIB, DILARANG) untuk memastikan kepatuhan Agent terhadap standar baru.

## 3. Verifikasi Konteks
- Setelah internalisasi, jalankan simulasi singkat: "Bagaimana jika Agent [X] menghadapi situasi [Y] dengan standar baru ini?".
- Pastikan tidak terjadi *Context Bloat* (instruksi terlalu panjang). Gunakan distilasi jika perlu.

---
*Dokumen ini adalah referensi teknis untuk Pipeline Architect.*
