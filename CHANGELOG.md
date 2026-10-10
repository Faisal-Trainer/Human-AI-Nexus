# Changelog

Semua perubahan dan update penting pada framework Human-AI Nexus akan didokumentasikan di sini.

## [v3.4.3] - 2026-10-10 (Local Inference Resilience & Jev Evaluation Gate)

### Fixed

- **Blueprint Inference Timeout pada Hardware Lemah (`LocalIntelligence.js` & `.env`)**:
  - Mengatasi `LocalIntelligence inference timed out` berulang (3× percobaan) pada generate blueprint via qwen2.5-coder-1.5B di Radeon Vega 8 (1GB VRAM).
  - `MAX_TOKENS_BUILDER` diturunkan 4096 → 2048: model kecil tidak pernah sanggup menuntaskan output raksasa dalam batas waktu — penyebab utama timeout.
  - Timeout kini dapat dikonfigurasi via `.env`: `NEXUS_INFER_TIMEOUT_MS` (reviewer, default 2 menit) dan `NEXUS_BUILDER_TIMEOUT_MS` (builder, default 10 menit) — tidak lagi hardcoded satu angka.
  - Logging durasi inferensi (`⏱️ Inference selesai dalam Xs`) + info budget waktu sebelum prompting, untuk diagnosis kecepatan.
  - `NEXUS_GPU_LAYERS` dikembalikan 28 → 18: full offload ke 1GB VRAM menyebabkan thrash/KV-cache overflow; 18 adalah nilai stabil teruji.
- **Guard Port Range (`ExecutionPhase.js`)**: `getAvailablePort()` kini menolak range invalid (`start > maxPort`) dengan pesan error eksplisit.

### Added

- **Provider OpenRouter untuk Jev Evaluation Gate (`TypeSafeValidator.js`)**:
  - Dukungan penuh model **Jev (typesafe/jev-router)** via Chat Completions API (gratis di OpenRouter) — deteksi provider otomatis dari endpoint `openrouter.ai`.
  - Primitif TypeSafe native (`noul` / `choice` / `score`) diterjemahkan ke prompt JSON terstruktur lalu dinormalisasi balik ke bentuk `answers` kanonik, sehingga keempat gate (`validateBlueprint`, `validateMigrationOutput`, `routeSkill`, `scoreSample`) berjalan tanpa perubahan pemanggil.
  - Retry/backoff bersama untuk 429/529, `temperature: 0` demi konsistensi keputusan, `response_format: json_object`.
  - Gate kini AKTIF di pipeline (fail-open tetap dipertahankan bila API bermasalah).

### Changed

- **Timeout `.env`**: `NEXUS_INFER_TIMEOUT_MS=180000`, `NEXUS_BUILDER_TIMEOUT_MS=600000`.
- **README.md**: Versi, diagram arsitektur (node `TypeSafeValidator`), dan tabel Reliability diperbarui.
- **package.json**: Versi disinkronkan ke `3.4.3`.

### Housekeeping

- Menghapus 5 file sisa backup `*.bak-2026-10-10` (main, GraphEngine, SemanticEngine, ExecutionPhase, .nexus-vault.json).
- Test Fix #01/#14: properti `MAX_TOKENS` di instance + regex toleran trailing comma hasil reformat Prettier. Suite internal kini 25/25 hijau.

## [v3.4.2] - 2026-10-09 (Preheal & Self-Healing Resilience + Dynamic Sandbox Autoloading)

### Fixed

- **Dynamic PSR-4 Autoloading untuk Windows Junction Sandbox (`SandboxProjectSetup.js` & `vendor/autoload.php`)**:
  - Memperbaiki kegagalan fatal pada Windows Junction (`tests/sandboxes/*/vendor` -> `tests/sandboxes/laravel-fresh-template/vendor`), di mana Composer autoloader sebelumnya keliru mencari class ke direktori template `laravel-fresh-template/app` alih-alih folder sandbox yang sedang dieksekusi.
  - Memperbarui `vendor/autoload.php` di template dengan mekanisme deteksi pemanggil dinamis (`getcwd()`) yang mem-prepend direktori `App\`, `Database\Seeders\`, dan `Database\Factories\` ke Composer PSR-4.
  - Mengotomatiskan injeksi patch autoloader melalui metode `_patchTemplateAutoloader()` pada `SandboxProjectSetup.js` agar selalu aktif permanen setiap kali template disiapkan maupun proyek baru di-clone.
- **Auto-Recovery Missing Class pada Self-Healing (`ExecutionPhase.js`)**:
  - Mengatasi masalah `selfHeal` yang gagal mengidentifikasi file saat stack trace berasal dari vendor internal Laravel (`RouteListCommand.php`).
  - Menambahkan deteksi regex untuk `ReflectionException: Class "..." does not exist` yang secara otomatis menginstansiasi controller atau model fallback yang hilang (`_safeFallbackController` / fallback model).
- **Route-Aware Failure Targeting (`ExecutionPhase.js`)**:
  - Secara cerdas menyertakan file `routes/api.php` dan `routes/web.php` ke dalam antrean self-healing ketika error artisan terkait dengan routing atau controller resolusi.
- **LLM Markdown Code Block Fallback (`ExecutionPhase.js`)**:
  - Menambahkan fallback regex parser untuk mengekstrak kode PHP dari format markdown code fence biasa (`php ... `) jika model LLM tidak menyertakan tag XML `<file path="...">`.
- **Pembersihan Route Legacy pada API (`ExecutionPhase.js`)**:
  - Memperluas fungsi `cleanCodeAndVerify` untuk membersihkan endpoint dan impor usang pada `routes/api.php`, mencegah `ReflectionException` saat route list dijalankan.

## [v3.4.1] - 2026-09-28 (Sandbox Table User Stability & Core Auth Protection)

### Fixed

- **Laravel Core `User` Model Protection (`ImplementationPhase.js`)**:
  - Mencegah generator model generik menimpa `app/Models/User.php` bawaan Laravel dengan model generic `class User extends Model`, sehingga kontrak `Authenticatable`, trait `Notifiable`, dan auth state tetap terjaga.
  - Memperbaiki `_safeFallbackModel` untuk model `User` agar tetap meng-extend `Authenticatable` dengan `$fillable` lengkap (`name`, `email`, `password`, `role`) guna mencegah kegagalan mass-assignment (`SQLSTATE[23000]: NOT NULL constraint failed: users.email`) saat seeding database.
- **Tabel & Migrasi User (`ImplementationPhase.js`)**:
  - Memperluas proteksi migrasi tabel bawaan Laravel agar mencakup tabel `user` (singular) maupun `users` (plural), mencegah tabrakan atau duplikasi dengan `0001_01_01_000000_create_users_table.php`.
  - Mengubah foreign key `user_id` menjadi `foreignId('user_id')` untuk mencocokkan tipe kolom integer auto-increment bawaan Laravel `$table->id()`.
  - Menambahkan auto-sanitizer pada kode migrasi yang dihasilkan LLM agar `->foreignUuid('user_id')` otomatis dialihkan ke `->foreignId('user_id')`.
- **Policy & Authorization Guard (`ImplementationPhase.js`)**:
  - Mengeliminasi duplikasi import `use App\Models\User;` pada generator `UserPolicy.php` yang sebelumnya memicu fatal error compile PHP `Cannot use App\Models\User as User because the name is already in use`.
  - Memperbaiki logika pengecekan otorisasi kepemilikan user menjadi `$user->id === $model->id` (bukan `$model->user_id`).
- **Database Seeding Execution Order (`ImplementationPhase.js`)**:
  - Mengurutkan `UserSeeder` agar selalu dieksekusi paling pertama di dalam `DatabaseSeeder.php`, menjamin ketersediaan record referensi user sebelum domain seeder yang memerlukan `user_id = 1` dijalankan.
- **Factory Protection (`ImplementationPhase.js`)**:
  - Memproteksi `database/factories/UserFactory.php` bawaan Laravel agar tidak tertimpa oleh generic factory kosong.
  - Memperbaiki fallback `UserFactory` agar menyertakan atribut bawaan lengkap (`name`, `email`, `email_verified_at`, `password`, `remember_token`).
- **Blueprint Fallback Deduplication (`NexusEngine.js`)**:
  - Menangani kasus penamaan proyek bertema user pada `_generateFallbackBlueprint` dengan mengalihkan `primaryModel` ke `UserProfile` jika model utama adalah `User`, mencegah duplikasi model `["User", "User"]` dan relasi rekursif yang collision.
- **Schema Validation Tolerance (`SchemaGuard.js`)**:
  - Mengecualikan `User.php` dari peringatan wajib trait `HasUuids` karena tabel default Laravel menggunakan ID integer auto-increment.

## [v3.4.0] - 2026-09-25 (LLM + RAG Architecture)

### Added

- **GraphRAG Topology (`GraphEngine.js` & `SemanticEngine.js`)**:
  - Rekonstruksi topologi pengetahuan dari file markdown dan Obsidian vault menggunakan parsing regex `[[Target|Alias]]`, pemetaan relasi dua arah (_bidirectional edge weight_ 2.0), dan _degree centrality hub detection_.
  - _Hybrid Seeding_: Menggabungkan pencocokan entitas langsung (_Direct Entity Match_) dengan penelusuran semantik Vector / TF-IDF menggunakan algoritma _Reciprocal Rank Fusion_ (RRF, $K = 60$).
  - _Token Budget Protection_: Pembatasan traversal konteks 3.500–4.500 karakter untuk mencegah ledakan konteks dan menjaga keamanan alokasi RAM 8GB.
- **Continuous Learning Loop (`ExecutionPhase.js` & `ObsidianBridge.js`)**:
  - _Automated TDD Feedback Loop_: Integrasi pengujian otomatis PHPUnit/Artisan. Saat terdeteksi kegagalan, `RootCauseAnalyzer` memetakan koordinat baris/file dan `LocalIntelligence` menghasilkan analisis post-mortem.
  - _Obsidian Vault Sync_: Menyimpan catatan post-mortem secara otomatis ke Obsidian Vault (`NEXUS Update/Lessons/NEXUS_LESSON_*.md`) berformat Frontmatter YAML, metadata tags, dan `[[wikilinks]]`.
  - _Real-Time Graph Re-Indexing_: Pembaruan inkremental Knowledge Graph secara real-time saat pelajaran baru tersimpan.
  - _Colab CUDA Dataset Logging_: Pencatatan sampel koreksi ke format JSONL di `3 qwen/colab_cuda_training_dataset.jsonl` untuk fine-tuning Colab CUDA.
- **Hierarchical / Tiered Model Routing (`LocalIntelligence.js` & `NexusEngine.js`)**:
  - _Tier 0 (Instant Heuristic Engine)_: Eksekusi validator regex dan aturan AST statis (< 1ms, 0 MB VRAM) untuk skema migrasi dan _code quality review_.
  - _Tier 1 (Fast Local Model)_: Inferensi model Qwen GGUF via `node-llama-cpp` (Qwen3-4B / Qwen2.5-Coder-3B) dengan alokasi context dinamis (512–1024), kontrol thread CPU, dan otomatisasi _graceful fallback_ dari GPU Vulkan ke _pure CPU engine_ jika alokasi VRAM penuh.
- **Agentic RAG (HyDE + Corrective RAG / CRAG) (`SemanticEngine.js`)**:
  - _HyDE (Hypothetical Document Embeddings)_: Sintesis pseudo-code zero-shot sesuai domain query untuk menjembatani _vocabulary gap_ antara query singkat dengan dokumen teknis.
  - _CRAG Confidence Guard_: Evaluasi retrieval dengan skor keyakinan komposit:
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
- **LocalIntelligence**: Kapasitas _GPU Offloading_ disesuaikan ke `gpuLayers: 24` untuk arsitektur Llama 3.2 1B dan Qwen 2.5 Coder 3B.
- **ModelTrainer**: Merombak total mekanisme fallback Python (_Unsloth_) saat fitur native `llama.cpp` tidak tersedia. Proses _Merge_ (F16) dan _Quantize_ (Q4) yang tadinya 2 step kini dijadikan **1-pass execution**. Ini menghemat waktu I/O secara drastis dan membuang ancaman OOM (_Out-of-Memory_ akibat meload file 6GB dua kali).

### Fixed

- **EventBus**: Memperbaiki _Timer Leak_ (_Memory Leak_) parah yang membuat ribuan `setTimeout` tertinggal di _Event Loop_. Logika _event tracking_ ditulis ulang dari `Set` menjadi `Map` dengan skema _lazy cleanup_ berbasis kalender waktu (timestamp).
