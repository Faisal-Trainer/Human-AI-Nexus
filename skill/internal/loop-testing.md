# SKILL: FORCED LOOP TESTING & BUG MINING

Dokumen ini berisi standar teknik untuk melakukan pengujian berulang (looping) dan ekstraksi pengetahuan dari debugging.

## 1. Loop Configuration
- **Stress Threshold**: Tentukan jumlah repetisi (misal: 50, 100, 500) berdasarkan beban sistem.
- **Variation**: Masukkan variasi data input pada setiap iterasi untuk memicu kondisi *edge case*.
- **Timeout**: Tetapkan batas waktu eksekusi agar loop tidak berjalan selamanya (infinite loop).

## 2. Systematic Debugging Protocol (Nexus Golden Standard)
Setiap kali loop gagal, WAJIB mengikuti 4 fase investigasi:
1. **Investigation**: Baca error log secara utuh, reproduksi secara konsisten, dan lacak data flow hingga ke sumbernya.
2. **Pattern Analysis**: Bandingkan dengan kode yang bekerja dan identifikasi perbedaan terkecil sekalipun.
3. **Hypothesis**: Buat hipotesis tunggal (misal: "X penyebabnya karena Y") dan uji secara minimal.
4. **Implementation**: Perbaiki akar masalah (*Root Cause*), bukan gejalanya (*Symptom*).

## 3. Knowledge Feedback Loop
- Kirim hasil RCA ke `Pipeline Architect` untuk diperbarui ke dalam HUB Pengetahuan.
- Pastikan standar koding di-update agar bug yang sama tidak terulang.

---
*Dokumen ini adalah referensi teknis untuk Looping Tester.*
