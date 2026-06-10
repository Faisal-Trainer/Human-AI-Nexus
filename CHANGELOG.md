# Changelog

Semua perubahan dan update penting pada framework Human-AI Nexus akan didokumentasikan di sini.

## [v3.3.1] - 2026-06-11 (Performance & Stability Patch)

### Added
- **ModelTrainer**: Menambahkan _timeout_ tanpa batas (ditetapkan ke 24 jam) untuk eksekusi Python guna mendukung _training_ di CPU dan _dataset_ berskala besar.
- **SemanticEngine**: Menambahkan _stagger delay_ 1000ms di sela-sela iterasi _batch_ Ollama Embedding untuk memberi ruang pada CPU dan menghindari _spike_ berlebihan.
- **ParallelRunner**: Menambahkan _stagger delay_ 500ms pada inisialisasi _worker_ untuk mencegah lonjakan CPU 100% yang diakibatkan oleh beberapa proses LLM yang "terbangun" di milidetik yang sama persis.

### Changed
- **LocalIntelligence**: `contextSize` diturunkan drastis dan dipatok ke `4096` (sebelumnya `8192` dan `16384`) guna mengeliminasi kasus _Swap Thrashing_ (bocornya VRAM/RAM ke SSD) pada mesin kelas menengah (8GB RAM). Kecepatan inferensi naik signifikan tanpa mengorbankan kualitas kode _scaffolding_.
- **LocalIntelligence**: Alokasi _logical cores_ diseimbangkan menjadi `threads: 6` agar laptop/OS pengguna tetap responsif meskipun _node-llama-cpp_ sedang menahan beban penuh.
- **LocalIntelligence**: Kapasitas *GPU Offloading* disesuaikan ke `gpuLayers: 24` untuk arsitektur Llama 3.2 1B dan Qwen 2.5 Coder 3B.
- **ModelTrainer**: Merombak total mekanisme fallback Python (_Unsloth_) saat fitur native `llama.cpp` tidak tersedia. Proses _Merge_ (F16) dan _Quantize_ (Q4) yang tadinya 2 step kini dijadikan **1-pass execution**. Ini menghemat waktu I/O secara drastis dan membuang ancaman OOM (_Out-of-Memory_ akibat meload file 6GB dua kali).

### Fixed
- **EventBus**: Memperbaiki _Timer Leak_ (_Memory Leak_) parah yang membuat ribuan `setTimeout` tertinggal di _Event Loop_. Logika *event tracking* ditulis ulang dari `Set` menjadi `Map` dengan skema _lazy cleanup_ berbasis kalender waktu (timestamp).
