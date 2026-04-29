# 🎓 STANDAR AUDIT EDUKATIF (Developer Learning Protocol)

**Tujuan**: Memastikan setiap temuan audit tidak hanya memperbaiki kode, tetapi juga berfungsi sebagai bahan pembelajaran bagi tim pengembang (DEV).

## 📝 Struktur Laporan Wajib
Setiap temuan audit harus mencakup komponen berikut:

1.  **🔍 Temuan (Finding)**:
    - Apa masalahnya? Sebutkan file dan baris kodenya (jika ada).
    - Contoh: `PENGGUNAAN VARIABEL GLOBAL` di `src/index.js:45`.

2.  **💡 Mengapa Ini Penting? (Rationale/Learning)**:
    - Jelaskan dampak negatif jika tidak diperbaiki.
    - Jelaskan konsep teknis di baliknya (misal: Race condition, Security vulnerability, Scalability issue).
    - **Tujuan**: Agar DEV memahami "Kenapa" bukan hanya "Apa".

3.  **🛡️ Standar Nexus (Best Practice)**:
    - Rujuk ke dokumen di `knowledge/` atau `skill/` yang dilanggar.
    - Sebutkan standar industri yang relevan (misal: OWASP, SOLID, PSR-12).

4.  **🛠️ Rekomendasi Perbaikan**:
    - Berikan solusi kode yang bersih (*Clean Code*).
    - Jelaskan langkah-langkah perbaikannya secara sistematis.

5.  **📖 Referensi Lanjutan**:
    - Berikan link ke dokumentasi resmi atau artikel edukatif untuk dipelajari lebih lanjut oleh DEV.

## 🎭 Gaya Bahasa
- Gunakan bahasa yang profesional namun mudah dimengerti.
- Hindari jargon yang terlalu abstrak tanpa penjelasan.
- Bersikaplah seperti seorang **Mentor Senior** yang sedang melakukan *Code Review*.

---
*Ditetapkan oleh Nexus Orchestrator | Versi 1.0 - April 2026*
