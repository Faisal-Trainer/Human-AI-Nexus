# 🖼️ NEXUS MEDIA HANDLING PROTOCOL (Distilled from Golden Standard)

Protokol ini memastikan efisiensi bandwidth, kecepatan muat (LCP), dan keamanan aset visual.

## 1. Image Strategy
- **Format: WebP**: Gunakan WebP sebagai format standar untuk seluruh aset visual web.
- **Compression**: Gunakan kualitas 80% untuk keseimbangan antara ukuran file dan ketajaman visual.
- **Resizing**: Resize gambar ke dimensi maksimal yang dibutuhkan (misal: lebar 800px untuk cover buku).

## 2. Processing Pipeline
1. **Intercept Upload**: Tangkap file asli (PNG/JPG).
2. **Memory Management**: Gunakan `Intervention/Image` untuk memproses gambar di memori.
3. **Strip Metadata**: Hapus seluruh data EXIF untuk privasi dan pengurangan ukuran file.
4. **Encoding**: Konversi ke WebP.
5. **Storage**: Simpan dengan penamaan berbasis UUID.

## 3. Storage Structure & Hygiene
- **Logical Path**: Simpan dalam folder terstruktur: `public/storage/{category}/{uuid}.webp`.
- **Automated Cleanup**: Implementasikan skrip pembersihan otomatis untuk menghapus aset sementara (*temporary*) atau aset yang tidak lagi terikat pada record database guna menghemat ruang penyimpanan.
- **Permission**: Pastikan folder memiliki izin akses yang tepat dan akses publik dibatasi hanya pada aset yang benar-benar diperlukan.

---
*Status: Institutional Knowledge (Media Layer).*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database]
