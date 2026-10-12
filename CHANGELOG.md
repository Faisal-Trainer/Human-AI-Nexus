# Changelog

Semua perubahan dan update penting pada framework Human-AI Nexus akan didokumentasikan di sini.

## [v3.4.8] - 2026-10-12 (Livewire Action & Schema Guards — penguatan runtime url-shortener-app)

### Fixed

- **`Typed property ... must not be accessed before initialization` (`ImplementationPhase.js`)**: properti publik bertipe (`public ShortUrl $shortUrl;`) tanpa default & tanpa assignment di `mount()`, dibaca di `render()`/view → fatal. Guard deterministik baru **`_ensureLivewirePropertyInit()`** (+ `_injectMountInits()`) pada `_reconcileLivewireComponent` langkah **3.5**: prop bertipe model → `new Model()` di `mount()`; tipe lain → default nullable `public ?T $x = null;`.
- **`SQLSTATE[HY000] duplicate column name: created_at` → `no such table` (`ImplementationPhase.js`)**: migration `create_<table>` menghasilkan `$table->timestamps()` dua kali (plus bentrok dengan `softDeletes()`), `migrate` gagal → tabel tak pernah terbentuk. Guard baru **`_dedupeMigrationColumns()`/`_dedupeMigrationBlock()`** pada `generateMigration()`: drop pemanggilan `$table->...` duplikat persis per blok `Schema::create`, dan drop `created_at`/`updated_at`/`deleted_at` eksplisit bila `timestamps()`/`softDeletes()` hadir.
- **`Class "App\Livewire\X" not found` (`ImplementationPhase.js`)**: kelas memakai model dengan nama pendek (`ShortUrl::paginate()`, `ClickStat::all()`, type-hint) tanpa `use App\Models\X;`, sehingga PHP mencari class di namespace komponen. Guard baru **`_ensureLivewireModelImports()`** langkah **0.5**: deteksi pemakaian bare (`::`, `(`, type-hint `$`; FQN `\App\Models\X` dilewati via negative-lookbehind) → sisipkan impor setelah statement `use` terakhir (atau setelah baris `namespace`). Idempoten.
- **`Unable to call component method` saat tombol diklik (`ImplementationPhase.js`)**: Blade memanggil `wire:click="deleteShortUrl(...)"`/`removeClickStat(...)` yang tak didefinisikan kelas — halaman tampil saat collection kosong (`@empty`), fatal saat tombol diklik. Guard baru **`_ensureLivewireActionMethods()`** langkah **3.6**: scan directive aksi (`wire:click|submit|change|input|key*|focus|blur|action|request|dblclick|mouse*`), ambil identifier pertama nilai, lewati `$refresh`/`$emit`/`$dispatch` & `wire:model`, sisipkan stub zero-arg untuk method yang hilang. Clause kontrak baru mewajibkan tiap action punya method yang cocok.
- **Bug laten `_injectRenderData()` (`ImplementationPhase.js`)**: regex cabang (b) tak seimbang kurung (`view\(...\])`) melempar exception di dalam try/catch reconcile (tersilent-kan jadi pesan `reconcile skipped`) begitu `render()` sudah memuat array literal → injeksi data jamak nonaktif diam-diam. Regex diperbaiki; bug double-comma akibat trailing-comma ikut dibereskan (body di-slice + trailing comma di-strip).

### Verified

- Tiap guard diuji scratch throwaway (lalu dihapus): typed-property init (mount + jamak + `@forelse`, idempoten, kasus negatif), dedup migration (2→1 `timestamps`, kolom lain & `down()` utuh, helper-drop), model imports (bare→impor, FQN→skip, sudah-impor→no-op, idempoten), action methods (stub benar, `save`/`delete` tak dobel, magic & `wire:model` diabaikan, `php -l` valid).
- `node --check` `ImplementationPhase.js` bersih; `php -l` komponen sandbox (`UrlShortenerManager`, `LinkAnalyticsTable`) bersih; `php artisan view:clear` & `migrate` sandbox berhasil (semua migrasi `Ran`).

### Changed

- **README.md** & **package.json**: Versi disinkronkan ke `3.4.8`.

## [v3.4.7] - 2026-10-12 (Hallucination Guards, Pipeline Cleanup & Tailwind v4 Migration)

### Fixed

- **ParseError `unexpected token "="` HTTP 500 pada app generated (`ImplementationPhase.js`)**: model lokal menghasilkan direktif loop Blade tidak seimbang (`@foreach ... @empty ... @endforelse`). `@empty` hanya valid di dalam `@forelse`; pasangan tak seimbang meracuni counter `loopLevel` BladeCompiler sehingga view yang di-compile setelahnya (termasuk error page framework) menghasilkan variabel invalid `$__empty_-2`.
  - Guard deterministik baru **`_fixBladeLoopDirectives()`** (stack-based): `@foreach` yang ditutup `@empty`/`@endforelse` → `@forelse`; `@forelse` ditutup `@endforeach` → `@endforelse`. Dipanggil di `cleanLivewireBladeOutput()` dan via `_reconcileLivewireComponent()` (self-healing saat re-run pada file di disk).
  - Prompt blade Rule 5 diperbaiki: wajib `@forelse ... @empty ... @endforelse`, larang pairing `@foreach` dengan `@empty`.
- **`BadMethodCallException: Blueprint::nullable does not exist` saat `artisan migrate` (`ImplementationPhase.js`)**: halusinasi modifier kolom berdiri sendiri (`$table->nullable();`) di migration generated. Guard baru **`_sanitizeMigration()`** menghapus pemanggilan modifier Blueprint tanpa argumen (`nullable|unsigned|useCurrent|after|default|comment|charset|collation|change`) sebelum file ditulis — `->nullable()` berantai dan helper sah (`timestamps()`, `softDeletes()`) tidak tersentuh.
- **`foreach() argument must be of type array|object, null given` (`ImplementationPhase.js`)**: `HandleComponents::getView()` Livewire menerapkan `->with($publicProperties)` **setelah** data `render()`, sehingga `public $users;` kosong menimpa `'users' => User::all()` dengan null. Rekonsiliasi langkah **2.5** baru menghapus deklarasi public property yang men-shadow collection yang di-iterasi view (hanya bila `$this->prop` tidak dipakai di tempat lain); View Variable Contract di prompt melarang pola ini secara eksplisit.
- **`Call to a member function first() on null` (2 perbaikan engine)**:
  - **`_nullSafeViewReads()` kini melindungi SELURUH hop** (`$user->shortUrls->first()->title` → `$user?->shortUrls?->first()?->title`), bukan hanya hop pertama.
  - **`_ensureUserRelations()` baru** — model User yang di-preserve otomatis mendapat relasi inverse `hasMany()` (camelPlural) untuk setiap model blueprint dengan FK `user_id`/`*_user_id`; skema-driven & idempoten.
- **Tailwind v4 vs config v3 (`laravel-fresh-template`)**: template menginstal `tailwindcss@4.3.3` + `@tailwindcss/vite` tetapi file konfigurasi masih gaya v3 → error PostCSS "tailwindcss directly as a PostCSS plugin". Migrasi penuh: `vite.config.js` registrasi `tailwindcss()`, `app.css` → `@import 'tailwindcss'; @plugin '@tailwindcss/forms'; @custom-variant dark; @theme Figtree`, `postcss.config.js` & `tailwind.config.js` dihapus. CDN fallback di prompt layout & template welcome hardcoded ExecutionPhase diganti dari `cdn.tailwindcss.com` (v3-only) ke `@tailwindcss/browser@4`.

### Added

- **Deduplikasi temuan audit (`PlanningPhase.js`)**: temuan identik (`severity` + `message` sama) dikonsolidasikan menjadi SATU task plan; daftar file dipertahankan di rationale ("Berlaku untuk N file: ..."). Menghilangkan 26× task duplikat + 26× lookup GraphRAG/Redis identik per siklus.

### Changed

- **Noise log Redis dihapus (`SemanticEngine.js`)**: `⚡ Redis: Cache hit for query ...` tidak dicetak per-hit lagi (jalur normal cache menghasilkan spam puluhan baris per fase).
- **README.md** & **package.json**: Versi disinkronkan ke `3.4.7`.

### Verified

- `_fixBladeLoopDirectives`: 3 negative case tak berubah, 3 positive case (termasuk nested) benar; memperbaiki 2 view rusak nyata di `url-shortener-app`.
- `_sanitizeMigration`: strip `$table->nullable();` dari migration rusak sambil pertahankan 2 `->nullable()` berantai + `timestamps`/`softDeletes`/`index`.
- Dedup PlanningPhase (stub engine, 28 findings): → 2 task unik, auto-fix `.env` tetap utuh.
- `_nullSafeViewReads` + `_ensureUserRelations`: chain penuh null-safe, idempoten, `php -l` bersih.
- `npm run build` pada `url-shortener-app`: sukses 15.99s, `app.css` 126.81 kB asli v4, tanpa error PostCSS. `node --check` semua file engine bersih.

## [v3.4.6] - 2026-10-12 (Livewire Component-View Coherence Guard)

### Fixed

- **500 `Attempt to read property "name" on null` + "undefined variable" pada halaman Livewire (`ImplementationPhase.js`)**: kelas komponen & blade view di-generate LLM dalam **dua panggilan terpisah** tanpa rekonsiliasi, sehingga view memakai variabel (`$shortUrls`, `$clickStats`) dan baca properti (`$user->name`) yang tidak pernah disediakan kelas (`render()` kosong, public prop null).
  - **Guard koherensi deterministik** baru (`_reconcileLivewireOnDisk` + `_reconcileLivewireComponent`): setelah kelas & view ditulis, engine memetakan variabel yang disediakan kelas (public props + key array `render()` + `compact()` + `->with()`), menemukan collection yang dipakai view (`@foreach/@forelse`), lalu **inject collection hilang ke `render()`** (`\App\Models\X::all()` via `blueprint.models`, fallback `collect([])`) dan mengubah **semua baca properti jadi null-safe** (`$x->` → `$x?->`).
  - Generik & name-agnostic — tak ada hardcode nama komponen/kolom; berlaku seragam ke semua project.

### Added

- **VIEW VARIABLE CONTRACT pada prompt** (`generateLivewireComponent`): prompt kelas & view kini berbagi daftar variabel collection yang diturunkan dari `blueprint.models` + aturan "tiap `@foreach` wajib disediakan `render()`; jangan baca `->prop` tanpa null-safe"; view diminta menyertakan branch `@empty`.

### Verified

- Harness rekonsiliasi pada file nyata `url-shortener-app`: `render()` menghasilkan `['shortUrls'=>ShortUrl::all(),'clickStats'=>ClickStat::all()]`, `@if ($user?->name && $user?->email)`, `php -l` bersih; `node --check` & GetProblems OK.
- Catatan: verifikasi `php artisan serve` end-to-end menunggu regenerasi komponen via siklus engine (output sandbox lama read-only).

### Changed

- **README.md** & **package.json**: Versi disinkronkan ke `3.4.6`.

## [v3.4.5] - 2026-10-12 (Junction Sandbox Autoload Fix)

### Fixed

- **Livewire `ComponentNotFoundException` saat `php artisan serve` (`SandboxProjectSetup.js` & `laravel-fresh-template/vendor/autoload.php`)**: sandbox junction (vendor symlink ke template) gagal autoload kelas `App\Livewire\*` / `App\Models\*` milik project hanya saat diakses lewat web server, sementara `migrate`/`db:seed` (CLI) berjalan normal.
  - **Akar masalah**: `ServeCommand` menjalankan built-in server dengan working directory = `public_path()`, sehingga `getcwd()` saat request = `<project>/public`. Patch autoload lama mengecek `is_dir(getcwd().'/app')` → `public/app` → **false** → namespace `App\` sandbox tidak pernah didaftarkan.
  - **Solusi generik**: deteksi root project dengan **naik dari `getcwd()`** (maks 8 level) sampai ketemu folder yang punya `app/` + `artisan`/`composer.json`, baru daftarkan PSR-4. Bekerja untuk CWD=root maupun CWD=`public/`, tanpa hardcode nama project.
  - **Self-healing**: `_patchTemplateAutoloader()` kini selalu menimpa ulang blok patch (memotong setelah `$loader = ComposerAutoloaderInit...::getLoader();` lalu append blok kanonik), menggantikan guard marker yang justru mencegah pemulihan template lama.

### Verified

- Probe dari `url-shortener-app/public`: `UrlShortenerManager`, `LinkAnalyticsTable`, `ShortUrl`, `ClickStat` semuanya **FOUND**. `php -l` (template + output generator) bersih; `node --check` OK.

### Changed

- **README.md** & **package.json**: Versi disinkronkan ke `3.4.5`.

## [v3.4.4] - 2026-10-11 (Deterministic Schema Guards & Redis Capacity)

Perbaikan berpusat pada **engine** (bukan hasil sandbox) agar generasi kode berikutnya konsisten terhadap `blueprint.schema`. Semua guard dibuat **generik / name-agnostic** supaya sandbox tidak "manja" terhadap kasus tertentu.

### Fixed

- **Guard `Auth::routes()` salah kunci paket (`ImplementationPhase.js`)**: `Auth::routes()` adalah milik **laravel/ui**, bukan Breeze. Guard sebelumnya hanya men-strip saat `!hasBreeze`, sehingga pada semua project Breeze panggilan hasil halusinasi LLM tertinggal dan `artisan route:list`/`migrate` crash `RuntimeException`. Kini strip dideteksi lewat `!hasUi` (`vendor/laravel/ui`) secara independen dari Breeze; regex diperkuat menangani varian.
- **Redis cache double-prefix (`RedisMemory.js`)**: key `nexus:search:...` tersimpan jadi `nexus:nexus:search:...`. Kini prefix tidak digandakan bila key sudah berprefix.

### Added

- **Deterministic Schema Guards (`ImplementationPhase.js`)** — mengunci kode ke `blueprint.schema`:
  - `_ensureMigrationColumns`: menyuntik kolom nyata yang dijatuhkan LLM ke migration (tipe → `$table->...`, modifier `nullable/unique/default/index`), skip kolom relasi & timestamps.
  - `_ensureModelFillable`: rebuild `$fillable` + injeksi `belongsTo`/`hasMany` (hanya target yang ada di `models`), hapus komentar `// TODO` placeholder.
  - `_buildFactoryClass`: `definition()` Factory dibangun deterministik dari schema (FK → `Target::factory()`), kolom tak bisa lagi menyimpang.
  - `_sanitizeSeeder`: `$faker->` → `fake()->`, buang `Faker::create()`, `realistic()` → `sentence(3)`.
- **Relationship Closure generik (`NexusEngine.js`)**: `_ensureRelationshipClosure` memindai `hasMany/belongsTo` di schema & `relationships[].target`; model yang direferensi tapi tak didefinisikan dimaterialisasi dengan schema minimal (FK parent + timestamps) + migrasi + factory. Contoh: `ClickStat` otomatis terbentuk.
- **Kolom User ekstra generik (`ImplementationPhase.js`)**: migrasi **aditif** `add_attributes_to_users_table` untuk kolom User di luar tabel core (mis. `role`) tanpa menyentuh `0001_01_01` core; `_ensureUserFillable` mendaftarkan kolom ke `#[Fillable([...])]` (Laravel 12) maupun `protected $fillable`.
- **Kapasitas Redis terkonfigurasi (`.env`, `RedisMemory.js`, `SemanticEngine.js`)**: `NEXUS_REDIS_MAXMEMORY` (CONFIG SET maxmemory + `allkeys-lru`), `NEXUS_REDIS_CACHE_TTL`, `NEXUS_SEARCH_TOPK` menggantikan nilai hardcoded.
- **Prompt diperkuat**: blueprint (relationship completeness), seeder (Faker whitelist), routes (aturan redirect untuk route berparam).

### Housekeeping

- **`.gitignore`**: mengabaikan artefak runtime `NEXUS_BLUEPRINT.json`, `memory/distilled/short_term/cache/`, `memory/operational/blueprints/` (koreksi path cache lama), plus untrack file yang terlanjur ter-track via `git rm --cached`.
- **`package.json`**: Versi disinkronkan ke `3.4.4`.

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
