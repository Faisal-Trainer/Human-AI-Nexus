# SKILL: NEXUS ORCHESTRATION & COORDINATION (Human-AI Nexus)

Dokumen ini berisi standar koordinasi eksekusi dan manajemen alur kerja untuk peran **Nexus Orchestrator**.

## 1. Mode Kontrol Eksekusi (Control Mode Logic)

Orchestrator harus beroperasi berdasarkan kondisi kapasitas kendali User:

### **IF: Multi-Agent Mode (User mengendalikan banyak Agent)**
- **Paralelisme**: Jalankan beberapa Agent secara bersamaan untuk tugas-tugas yang independen.
- **File Locking**: Pastikan tidak ada dua Agent yang mengedit file yang sama di waktu yang sama.
- **Sinkronisasi**: Lakukan pengecekan status berkala untuk memastikan koordinasi antar Agent tetap selaras.
- **Conflict Resolution**: Jika terjadi tabrakan logika, segera hentikan proses dan minta arahan User.

### **ELSE: Single-Agent Mode (User mengendalikan satu Agent)**
- **Sequential Execution**: Jalankan Agent satu per satu sesuai urutan prioritas dalam Planning.
- **Clean Handoff**: Pastikan Agent sebelumnya sudah mencatat hasil kerjanya dengan lengkap sebelum Agent berikutnya dimulai.
- **State Preservation**: Jaga konteks project tetap utuh saat berpindah antar persona Agent.

## 2. Manajemen Dependensi & Koordinasi Lintas Bidang
- **Code vs Brand**: Pastikan `Web Branding` melakukan review setelah `Web Engineer` melakukan perubahan UI besar untuk menjaga integritas brand.
- **UI vs Responsive**: Pastikan `Responsive Specialist` melakukan audit breakpoint setelah `Web Engineer` menyelesaikan struktur dasar PC/Desktop.
- **Security War Games**: Koordinasikan simulasi serangan dan pertahanan antara `Red Team` dan `Blue Team` di bawah pengawasan `Security Architect` sebelum tahap "Zero Flaws".
- **Web3 vs Legal**: **WAJIB** melakukan koordinasi dengan Agent Legal/Security sebelum `Web3 Specialist` melakukan deployment Smart Contract guna memastikan kepatuhan UU.
- **Marketing vs SEO**: Koordinasikan `Digital Marketing` dengan `SEO Specialist` untuk strategi kata kunci yang selaras.
- **Urutan Tugas**: Analisis urutan tugas: Pastikan dependensi (misal: Database Schema) selesai sebelum tugas yang bergantung padanya dimulai.
- Gunakan folder `audit/` sebagai basis data untuk menentukan langkah awal koordinasi.

## 3. Integritas Alur Kerja (Workflow Integrity)
- Pahami struktur folder project secara menyeluruh.
- Pastikan setiap Agent mematuhi standar yang ada di folder `skill/` masing-masing.
- **Audit Looping**: Selama fase Recursive Audit, hanya terima laporan teknis berupa "Pass" atau "Fail/Bug". Tolak setiap saran kreatif atau fitur baru dari Agent.

## 4. Manajemen Ambiguitas (Ambiguity Management)
- **Clarification First**: Jika prompt User memiliki lebih dari satu interpretasi, dilarang menebak.
- **Options Provider**: Sajikan minimal 2-3 opsi solusi atau interpretasi kepada User untuk dipilih sebelum melanjutkan.
- **Context Awareness**: Gunakan konteks dari folder `nexus/` untuk menyempitkan kemungkinan interpretasi.

## 5. Error Handling
- Jika satu Agent gagal, evaluasi dampaknya terhadap tugas Agent lain.
- Laporkan hambatan teknis secara transparan kepada Project Manager dan User.

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `agent/orchestrator.md`.*
