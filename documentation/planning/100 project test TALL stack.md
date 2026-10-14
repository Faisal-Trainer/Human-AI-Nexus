<!-- STATUS LEGEND (diverifikasi vs kode pipeline, 14/10/2026) -->

> **✅ Hijau** = selesai & terverifikasi lokal (`php artisan serve` + HTTP 200 + TDDGuard), tanpa paket eksternal/internet.
> **⚠️ Kuning** = butuh ekspansi mesin (scripted `composer require ...`) dan/atau tak bisa diverifikasi penuh (realtime/eksternal); kualitas keluaran 4B belum terjamin.
> **❌ Merah** = butuh API/internet eksternal (mustahil diverifikasi lokal) atau arsitektur di luar kapasitas model 4B. Batas ini desain & verifikasi, bukan prompt.
>
> Catatan: `max_tables`/white-list composer TIDAK ada di kode; penentu sebenarnya = verifikasi lokal-only + kualitas 4B.

## 1. Fundamental CRUD & Auth Projects [Tags: crud, auth, basic, phase-1]

⚠️ Todo App realtime — bagian realtime tak terverifikasi lokal; inti CRUD ✅
✅ Notes App dengan tagging
✅ Bookmark manager
✅ Habit tracker
✅ Expense tracker pribadi
✅ Daily journal app
✅ Contact manager
✅ Password manager UI — UI-only (tanpa vault terenkripsi nyata)
✅ URL shortener — sudah terbukti FULL APP READY
✅ Personal portfolio CMS

## 2. Dashboard & Admin Panel [Tags: dashboard, admin, analytics, phase-1]

✅ Admin dashboard analytics — Chart.js via CDN (aset lokal)
✅ User management system
⚠️ Role & permission manager — perlu `spatie/laravel-permission` (belum di-script install)
✅ Audit log dashboard
⚠️ System monitoring dashboard — telemetri/realtime sukar diverifikasi
✅ Inventory dashboard
⚠️ Multi-tenant admin panel — perlu pola tenancy (lihat nota vault Multi-Tenancy)
⚠️ Subscription management dashboard — status langganan, tanpa payment nyata
✅ CRM sederhana
⚠️ ERP mini system — RBAC + banyak modul, kualitas 4B berisiko

## 3. Authentication & Security Focus [Tags: security, auth, oauth, phase-2]

⚠️ 2FA authentication system — perlu Fortify/`google2fa` + verifikasi QR
⚠️ OAuth login integration — perlu `laravel/socialite` + provider eksternal
⚠️ Magic link authentication — alur auth kustom + kirim email nyata
✅ Session management dashboard
✅ API token manager — Sanctum (lokal)
✅ Device activity tracker
⚠️ Login anomaly detector — butuh heuristik/logika di luar CRUD
✅ Email verification workflow — bawaan Breeze
✅ Password reset flow custom — bawaan Breeze (templat bisa dikustom)
✅ Secure file vault — UI-only (enkripsi nyata di luar cakupan)

## 4. Realtime & Livewire Intensive [Tags: realtime, livewire, websocket, phase-2]

   <!-- Seluruh seksi: broadcast + Reverb/Echo tak terverifikasi via HTTP 200 lokal -->

⚠️ Live chat application
⚠️ Realtime notification center
⚠️ Collaborative notes app
⚠️ Multiplayer quiz app
⚠️ Live polling system
⚠️ Realtime kanban board
⚠️ Customer support dashboard — modul tiket ✅, sinkron realtime ⚠️
⚠️ Stock monitoring dashboard
⚠️ Realtime queue monitor
⚠️ Live auction platform

## 5. SaaS-Oriented Projects [Tags: saas, billing, multi-tenant, phase-3]

⚠️ Invoice SaaS — tanpa payment gateway (`cashier` + internet) → demo UI-only
⚠️ Subscription billing platform — butuh `cashier`/Paddle + API key eksternal
⚠️ Project management SaaS — multi-tenant + RBAC
⚠️ Team collaboration app — realtime + tenancy
✅ Time tracking SaaS — inti CRUD (tanpa pembayaran)
⚠️ Appointment booking SaaS — penjadwalan/konflik kompleks
❌ Social media scheduler — API media sosial eksternal, tak terverifikasi lokal
⚠️ File sharing SaaS — upload/storage lokal bisa, tenancy/berbagi lintas-akun ⚠️
✅ Resume builder SaaS — form + render PDF (UI lokal)
⚠️ Form builder SaaS — generator form dinamis kompleks

## 6. E-Commerce Systems [Tags: ecommerce, marketplace, pos, phase-3]

   <!-- Tidak ada cap max_tables di kode; pembatas sebenarnya = jumlah tabel banyak + logika + verifikasi -->

❌ Toko online lengkap — cart+catalog+order+user+payment => terlalu luas utk 4B
❌ Multi-vendor marketplace — tenancy vendor + payout eksternal
❌ POS system — concurrency/inventory transaksi nyata
❌ Digital product marketplace — katalog+order+payment eksternal
❌ Food ordering app — multi-role + pembayaran + realtime
❌ Flash sale platform — concurrency di luar single-process lokal
❌ Membership ecommerce — RBAC + billing
❌ Dropshipping dashboard — integrasi supplier eksternal
❌ Affiliate tracking system — pelacakan eksternal + attribution
❌ Warehouse management app — puluhan tabel + workflow

## 7. Advanced Livewire Components [Tags: ui, components, alpine, phase-2]

⚠️ Drag-and-drop page builder — interop Alpine↔Livewire sering gagal di 4B
⚠️ Kanban drag-and-drop — sama, seret-lepas lintas-komponen
⚠️ Dynamic form generator — meta-form kompleks
❌ Reusable datatable package — ini _package_, bukan app → di luar cakupan sandbox
✅ Nested comments system — rekursi + Livewire lokal
✅ Dynamic filtering engine — query filter lokal
⚠️ Realtime search engine — kalau murni `wire:model` ✅; indeks realtime ⚠️
✅ Infinite scrolling feed — `wire:ignore`/paginasi lokal
✅ Media uploader with preview — upload lokal + preview
❌ Spreadsheet-like editor — interaktivitas sel terlalu berat utk 4B

## 8. API & Integration Heavy [Tags: api, integration, webhooks, phase-3]

   <!-- Verifikasi lokal tak bisa menyentuh API eksternal/API-key -->

❌ Payment gateway integration platform — butuh API key + internet
❌ Email campaign manager — SMTP/API eksternal
❌ WhatsApp gateway dashboard — provider eksternal (Fonze/WA)
❌ SMS broadcast platform — gateway SMS eksternal
⚠️ Weather dashboard API — API publik tanpa key; skeleton + `Http::fake()` bisa, live ⚠️
⚠️ Cryptocurrency tracker — API publik; sama batasnya
❌ AI chatbot dashboard — butuh API LLM eksternal
❌ OpenAI content generator — butuh key OpenAI + internet
❌ Social media analytics aggregator — API eksternal multi-provider
❌ Logistics tracking system — API kurir eksternal

## 9. Enterprise-Level Architectures [Tags: enterprise, hr, school, hospital, phase-4]

❌ HR management system — 30–60 tabel + role hierarchy + approval
❌ School management system — modul luas + RBAC
❌ Hospital management system — domain kompleks + audit + RBAC
❌ Manufacturing workflow app — mesin status + banyak entitas
❌ Procurement management app — alur persetujuan + katalog
❌ Legal document workflow — templating + approval + tenancy
❌ Enterprise approval workflow — state machine lintas-modul
⚠️ Internal ticketing system — pada dasarnya CRUD tiket (bisa bila discoping)
⚠️ Corporate knowledge base — notes/KB CRUD + RBAC (⚠️ bila tenancy)
❌ Enterprise document management — versi besar + permission granular

## 10. Expert-Level TALL Stack Challenges [Tags: expert, architecture, ddd, event-sourcing, phase-4]

⚠️ Multi-tenant SaaS architecture — single-DB scoping bisa; full-isolation ❌
❌ Event sourcing implementation — pola arsitektur manusia multi-hari
❌ CQRS dashboard system — pemisahan read/write model
❌ Laravel package generator — _package_ bukan app → di luar sandbox
❌ Custom Livewire component library — _library_, bukan app
❌ Full websocket collaboration suite — realtime + presence, tak terverifikasi
⚠️ Headless CMS with Livewire admin — CMS lokal bisa bila discoping sederhana
❌ Workflow automation engine — mesin aturan + state machine
❌ Visual automation builder — editor visual node, di luar 4B
❌ AI-powered productivity platform — butuh LLM/API eksternal + arsitektur berat

Roadmap Penguasaan TALL Stack

Kalau tujuanmu menjadi “master”, urutan pengerjaan project sangat penting.

Phase 1 — Fundamental Laravel + Livewire

Kerjakan:

1–10
Fokus:
CRUD
validation
authentication
migrations
Eloquent
Blade
Livewire basic state
Phase 2 — Intermediate Reactive UI

Kerjakan:

31–40
61–70
Fokus:
Livewire lifecycle
Alpine interop
realtime UX
event system
reusable components
optimization
Phase 3 — SaaS & Business Logic

Kerjakan:

41–60
Fokus:
subscription
payment
queues
notifications
policies
caching
scaling
Phase 4 — Enterprise Architecture

Kerjakan:

81–100
Fokus:
multi-tenancy
DDD
CQRS
event sourcing
websocket
testing strategy
CI/CD
deployment
observability

Stack Tambahan yang Sangat Direkomendasikan

Backend
Laravel Horizon
Laravel Reverb
Redis
Meilisearch
Elasticsearch
Frontend
Alpine Persist
Alpine Morph
Flux UI / Volt
Infra
Docker
Nginx
CI/CD GitHub Actions
VPS deployment
S3 object storage
Testing
Pest PHP
Laravel Dusk

---

## 🤖 Nexus Project Selection Protocol

Untuk memulai simulasi mandiri (Recursive Evolution), Nexus Agent harus mengikuti langkah berikut:

1. **Target Identification**: Pilih nomor proyek dari daftar di atas berdasarkan Phase yang sedang diuji.
2. **Tag Matching**: Pastikan `EvolutionPiper.js` memiliki template scenario yang cocok dengan `[Tags]` kategori tersebut.
3. **Sandbox Spawning**: Jalankan perintah `piper.spawnSandbox(project_name, tags)` untuk membuat lab pengujian.
4. **Learning Absorption**: Setelah siklus selesai, gunakan `Distiller` untuk menyerap pola kode TALL Stack yang berhasil diimplementasikan ke dalam HUB Utama.

> **Status**: Machine-Readable + Feasibility-Tiered | **Last Ingested**: 10/05/2026 | **Tiering**: 14/10/2026 (Hijau=26 / Kuning=37 / Merah=37; diverifikasi vs kode pipeline)
> **Petunjuk EvolutionPiper**: hanya rotasi proyek ✅ Hijau + ⚠️ Kuning; skip ❌ Merah (butuh ekspansi mesin / di luar kapasitas 4B / verifikasi eksternal).
