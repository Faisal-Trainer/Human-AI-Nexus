# Changelog

Semua perubahan dan update penting pada framework Human-AI Nexus akan didokumentasikan di sini.

## [v3.4.0] - 2026-09-25 (LLM + RAG Architecture)

### Added
- **GraphRAG Topology (`GraphEngine.js` & `SemanticEngine.js`)**:
  - Rekonstruksi topologi pengetahuan dari file markdown dan Obsidian vault menggunakan parsing regex `[[Target|Alias]]`, pemetaan relasi dua arah (*bidirectional edge weight* 2.0), dan *degree centrality hub detection*.
  - *Hybrid Seeding*: Menggabungkan pencocokan entitas langsung (*Direct Entity Match*) dengan penelusuran semantik Vector / TF-IDF menggunakan algoritma *Reciprocal Rank Fusion* (RRF, $K = 60$).
  - *Token Budget Protection*: Pembatasan traversal konteks 3.500–4.500 karakter untuk mencegah ledakan konteks dan menjaga keamanan alokasi RAM 8GB.
- **Continuous Learning Loop (`ExecutionPhase.js` & `ObsidianBridge.js`)**:
  - *Automated TDD Feedback Loop*: Integrasi pengujian otomatis PHPUnit/Artisan. Saat terdeteksi kegagalan, `RootCauseAnalyzer` memetakan koordinat baris/file dan `LocalIntelligence` menghasilkan analisis post-mortem.
  - *Obsidian Vault Sync*: Menyimpan catatan post-mortem secara otomatis ke Obsidian Vault (`NEXUS Update/Lessons/NEXUS_LESSON_*.md`) berformat Frontmatter YAML, metadata tags, dan `[[wikilinks]]`.
  - *Real-Time Graph Re-Indexing*: Pembaruan inkremental Knowledge Graph secara real-time saat pelajaran baru tersimpan.
  - *Colab CUDA Dataset Logging*: Pencatatan sampel koreksi ke format JSONL di `3 qwen/colab_cuda_training_dataset.jsonl` untuk fine-tuning Colab CUDA.
- **Hierarchical / Tiered Model Routing (`LocalIntelligence.js` & `NexusEngine.js`)**:
  - *Tier 0 (Instant Heuristic Engine)*: Eksekusi validator regex dan aturan AST statis (< 1ms, 0 MB VRAM) untuk skema migrasi dan *code quality review*.
  - *Tier 1 (Fast Local Model)*: Inferensi model Qwen GGUF via `node-llama-cpp` (Qwen3-4B / Qwen2.5-Coder-3B) dengan alokasi context dinamis (512–1024), kontrol thread CPU, dan otomatisasi *graceful fallback* dari GPU Vulkan ke *pure CPU engine* jika alokasi VRAM penuh.
- **Agentic RAG (HyDE + Corrective RAG / CRAG) (`SemanticEngine.js`)**:
  - *HyDE (Hypothetical Document Embeddings)*: Sintesis pseudo-code zero-shot sesuai domain query untuk menjembatani *vocabulary gap* antara query singkat dengan dokumen teknis.
  - *CRAG Confidence Guard*: Evaluasi retrieval dengan skor keyakinan komposit:
    - $\ge 0.60$ (**DIRECT**): Dokumen langsung dipakai sebagai prompt context.
    - $0.35 - 0.60$ (**ENRICH_GRAPH_HYDE**): Ekspansi 1-hop GraphRAG + sintesis konteks HyDE.
    - $< 0.35$ (**REFORMULATE_EXPAND**): Pembersihan query + 2-hop Graph network expansion.
- **GBNF Grammar Constrained Decoding (`LocalIntelligence.js`)**:
  - Injeksi constraint grammar pada sampling layer menggunakan `LlamaJsonSchemaGrammar`.
  - Jaminan 100% keluaran JSON valid bebas dari syntax error, trailing commas, atau markdown code fence corrupt (` ```json `).
  - Skema terdefinisi siap pakai: `blueprintApp`, `postMortem`, `codeReview`, dan `schemaValidation`.

### Changed
- **ObsidianBridge.js**: Diperbarui dari v1.0 (Read-Only) menjadi v1.1 (Bidirectional Vault Integration) yang mendukung read sumber daya pengetahuan sekaligus write-back catatan pelajaran dan blueprint ke Obsidian Vault.
- **README.md**: Dokumentasi lengkap 5 Pilar Arsitektur LLM + RAG, diagram alur sistem, serta penambahan `GraphEngine.js` dan `ObsidianBridge.js` pada daftar Core Machines.
- **package.json**: Sinkronisasi versi package menjadi `3.4.0`.

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
