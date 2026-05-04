# Project Maturity Standards
## High-Performance & Security Baseline

### 🛡️ Security Best Practices (Applied)
1. **Zero Hardcoded Credentials**: Selalu gunakan `config()` dan `.env`. Jangan pernah menuliskan email atau token langsung di file PHP.
2. **MCP Tokenization**: Setiap endpoint API eksternal yang mengecualikan CSRF wajib divalidasi menggunakan `X-MCP-Token`.

### 🚀 SEO & Content Standards (Applied)
1. **Automated Indexing**: Setiap publikasi `Post` harus memicu perintah `seo:ping` untuk notifikasi mesin pencari (Google/Bing).
2. **Metadata Consistency**: Gunakan JSON-LD `@graph` untuk seluruh entitas halaman guna memperkuat skema Rich Snippets.

### 🖼️ Asset Optimization (Applied)
1. **WebP Conversion**: Seluruh gambar yang diupload untuk Proyek atau Blog wajib diproses melalui `ImageService` untuk konversi ke format WebP (Quality 80%).
2. **Lazy Loading**: Pastikan tag gambar di frontend selalu menyertakan atribut `loading="lazy"`.

### 🧠 Orchestration Workflow (Lessons Learned)
1. **Audit-First**: Selalu lakukan pemindaian multispesialis sebelum melakukan perubahan besar.
2. **Documentation-First**: Gunakan folder `nexus/docs/` sebagai sumber kebenaran teknis.

---
*Persisted by Nexus Orchestrator*
