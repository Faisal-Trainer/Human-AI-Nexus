# NEXUS AI — PROJECT BOUNDARY & CONSTRAINT README

## ⚠️ PURPOSE (NON-NEGOTIABLE)

NEXUS AI adalah **Documentation-First Pipeline Engine** untuk membantu menyusun, memvalidasi, dan mentransformasikan dokumentasi pembuatan project website.

**Tujuan utama:**

> Menghasilkan dokumentasi terstruktur, konsisten, dan dapat ditransformasikan ke berbagai format output.

**Bukan tujuan:**

- Membuat AI generatif
- Menjadi chatbot
- Menggantikan developer
- Menghasilkan aplikasi secara otomatis tanpa dokumentasi

---

## 🔒 HARD BOUNDARY (PAGAR SOLID)

### 1. DOCUMENTATION IS THE SOURCE OF TRUTH

- Semua proses **harus berasal dari dokumentasi**
- Tidak boleh ada proses yang berjalan tanpa input dokumentasi
- Tidak boleh ada “auto-guess” tanpa struktur eksplisit

---

### 2. NO REAL AI / NO MODEL DEPENDENCY

Project ini:

- ❌ Tidak menggunakan LLM
- ❌ Tidak menggunakan machine learning
- ❌ Tidak melakukan inferensi probabilistik

Semua proses:

> ✅ Deterministic
> ✅ Rule-based
> ✅ Reproducible

---

### 3. NO FULL APPLICATION GENERATION

Output hanya:

- struktur
- blueprint
- dokumentasi
- template (opsional, sebagai turunan dokumentasi)

❌ Dilarang:

- membuat sistem runtime lengkap
- membuat backend fully working
- membuat sistem produksi end-to-end

---

### 4. TERMINATION RULE (UJUNG WAJIB)

Pipeline HARUS berhenti di:

> **"Documentation Complete & Structured"**

Setelah itu:

- boleh export ke:
  - DOCX
  - PPTX
  - HTML summary

- **tidak boleh lanjut ke eksekusi aplikasi**

Jika pipeline mencoba lanjut ke:

- deployment
- runtime execution
- live system

→ **HARUS DITOLAK**

---

## 🧱 ARCHITECTURE RULES

### Layer Eksternal (Node.js / CLI)

Fungsi:

- input user
- manajemen command
- interaksi

Dilarang:

- logika parsing kompleks
- decision engine
- transformasi utama

---

### Layer Internal (C++)

Fungsi:

- parsing dokumentasi
- validasi struktur
- pipeline execution
- transformasi output

Wajib:

- deterministic
- modular
- tanpa dependency AI

---

## 🧠 SYSTEM MODEL

NEXUS AI adalah:

> **Documentation Compiler**

Bukan:

- AI assistant
- code generator bebas
- automation tanpa batas

---

## 🔄 PIPELINE FLOW (WAJIB DIKUNCI)

```
Documentation Input
→ Tokenization
→ Parsing
→ AST (Abstract Structure)
→ Validation
→ Transformation
→ Output (Documentation Only)
```

❌ Tidak boleh ada:

```
→ Execution
→ Deployment
→ Runtime generation
```

---

## 📄 OUTPUT SCOPE (TERBATAS)

Output yang diizinkan:

- Structured documentation
- Project blueprint
- Architecture breakdown
- Export:
  - DOCX
  - PPTX
  - HTML

Output yang dilarang:

- Running application
- Compiled system
- Live server
- Automation executor

---

## 🚫 ANTI-SCOPE (YANG HARUS DITOLAK)

Jika ada fitur mengarah ke:

- AI generation bebas
- self-improving system
- auto coding tanpa dokumentasi
- dynamic reasoning

→ **HARUS DIHENTIKAN**

---

## 🧭 DESIGN PRINCIPLE

1. Deterministic over intelligent
2. Structure over flexibility
3. Documentation over execution
4. Clarity over automation
5. Finish over expansion

---

## 🧨 FAILURE CONDITION

Project dianggap gagal jika:

- keluar dari domain dokumentasi
- mulai mengimplementasikan AI generatif
- menjadi framework web / runtime system
- kehilangan sifat deterministic

---

## 🏁 FINAL STATE (TARGET AKHIR)

Project dianggap selesai ketika:

- mampu menerima dokumentasi terstruktur
- mampu memvalidasi dan memperbaiki struktur
- mampu menghasilkan output dokumentasi dalam berbagai format
- tidak memiliki kebutuhan untuk ekspansi fitur tambahan

> **SETELAH TITIK INI: PROJECT HARUS BERHENTI (NO FEATURE CREEP)**

---

## 🔚 FINAL RULE

> Jika sebuah fitur tidak berkontribusi langsung ke kualitas atau struktur dokumentasi,
> maka fitur tersebut **tidak boleh ada**.

---
