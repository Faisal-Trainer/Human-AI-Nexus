# 📦 Laravel Dependencies & Packages — Panduan Lengkap
> **VERSION**: v1 | **Last Updated**: 26/05/2026



> Referensi semua package Laravel yang umum dipakai — dari UI framework, auth,
> role & permission, media, sampai utility. Lengkap dengan kegunaan, install command,
> dan kapan harus pakai / tidak pakai.
>
> **Berlaku untuk: Laravel 10+ / Laravel 12 (TALL Stack)**

---

## 📋 Daftar Isi

1. [UI & Component Framework](#1-ui--component-framework)
2. [Authentication & Authorization](#2-authentication--authorization)
3. [Admin Panel](#3-admin-panel)
4. [Role & Permission](#4-role--permission)
5. [Media & File Management](#5-media--file-management)
6. [Activity Log & Audit Trail](#6-activity-log--audit-trail)
7. [Settings & Configuration](#7-settings--configuration)
8. [SEO & Metadata](#8-seo--metadata)
9. [Image Processing](#9-image-processing)
10. [PDF & Export](#10-pdf--export)
11. [Notification & Email](#11-notification--email)
12. [API & Utility](#12-api--utility)
13. [Testing](#13-testing)
14. [Development Tools](#14-development-tools)
15. [Tabel Perbandingan Cepat](#15-tabel-perbandingan-cepat)
16. [Stack Rekomendasi per Jenis Project](#16-stack-rekomendasi-per-jenis-project)

---

## 1. UI & Component Framework

---

### 🔵 Livewire

| Detail | Info |
|---|---|
| **Package** | `livewire/livewire` |
| **Versi Stabil** | v3.x |
| **Dibuat oleh** | Caleb Porzio |

**Kegunaan:**
Framework full-stack untuk membangun UI interaktif di Laravel tanpa menulis JavaScript. Komponen PHP yang bereaksi seperti JavaScript — form realtime, live search, counter, wizard step, modal, dan sebagainya.

**Install:**
```bash
composer require livewire/livewire
```

**Buat komponen:**
```bash
php artisan make:livewire NamaKomponen
```

**Kapan pakai:**
- App internal, dashboard, CRUD yang butuh interaktivitas tanpa SPA penuh
- Tim yang kuat PHP tapi tidak terlalu dalam JS
- Cocok dikombinasi dengan Alpine.js untuk UI ringan

**Kapan TIDAK pakai:**
- Butuh realtime ekstrem (chat live, collaborative editing) — pertimbangkan WebSocket
- App yang sangat berat di sisi client

---

### 🟡 Alpine.js

| Detail | Info |
|---|---|
| **Package** | CDN / via npm: `alpinejs` |
| **Versi Stabil** | v3.x |
| **Dibuat oleh** | Caleb Porzio |

**Kegunaan:**
JavaScript minimal (disebut "Tailwind-nya JavaScript") untuk interaksi UI ringan: toggle, dropdown, modal, tab, accordion — langsung di HTML attribute. Tidak butuh build step kalau pakai CDN.

**Install via npm:**
```bash
npm install alpinejs
```

**Via CDN (taruh di layout blade):**
```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

**Kapan pakai:**
- Semua project TALL Stack — Alpine adalah bagian dari stack
- Interaksi sederhana yang tidak perlu full Vue/React

---

### 🔵 Inertia.js

| Detail | Info |
|---|---|
| **Package** | `inertiajs/inertia-laravel` |
| **Frontend** | React / Vue / Svelte |

**Kegunaan:**
Jembatan antara Laravel backend dan React/Vue frontend — tanpa REST API terpisah. Routing tetap di Laravel, tapi view di-render oleh React/Vue. Disebut "the modern monolith".

**Install:**
```bash
composer require inertiajs/inertia-laravel
npm install @inertiajs/react  # atau @inertiajs/vue3
```

**Kapan pakai:**
- Tim yang sudah familiar React/Vue tapi tidak mau buat API terpisah
- App yang butuh UX SPA penuh tapi tetap pakai Laravel routing

**Kapan TIDAK pakai:**
- Project yang sudah pakai Livewire — pilih salah satu, jangan campur tanpa alasan kuat

---

### 🟠 Tailwind CSS

| Detail | Info |
|---|---|
| **Package** | `npm install tailwindcss` |
| **Versi Stabil** | v4.x |

**Kegunaan:**
Utility-first CSS framework. Tidak ada class `.btn-primary` yang pre-defined — semua dibangun dari utility class seperti `flex`, `p-4`, `text-lg`, `bg-blue-500`.

**Install:**
```bash
npm install tailwindcss @tailwindcss/vite
```

**Kapan pakai:**
- Semua project TALL Stack — Tailwind adalah bagian dari stack
- Custom design yang tidak mau terikat Bootstrap/Bulma

---

---

## 2. Authentication & Authorization

---

### 🟢 Laravel Breeze

| Detail | Info |
|---|---|
| **Package** | `laravel/breeze` |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
Starter kit auth yang **minimal dan ringan** — login, register, forgot password, email verification. Stack pilihan: Blade, Livewire, React (Inertia), Vue (Inertia), atau API-only.

**Install:**
```bash
composer require laravel/breeze --dev
php artisan breeze:install

# Pilih stack:
# blade | livewire | react | vue | api
php artisan breeze:install livewire

php artisan migrate
npm install && npm run dev
```

**Kapan pakai:**
- Project baru yang butuh auth sederhana dan bisa dikustomisasi bebas
- Titik awal yang bersih, tidak banyak bloat

---

### 🔴 Laravel Jetstream

| Detail | Info |
|---|---|
| **Package** | `laravel/jetstream` |
| **Dibuat oleh** | Laravel Official |
| **Stack** | Livewire atau Inertia (Vue) |

**Kegunaan:**
Starter kit auth yang **lengkap dan fitur-rich** — login, register, 2FA, session management, profile photo, API token (Sanctum), dan **team management** (opsional).

**Install:**
```bash
composer require laravel/jetstream
php artisan jetstream:install livewire   # atau: inertia

# Dengan fitur teams:
php artisan jetstream:install livewire --teams

php artisan migrate
npm install && npm run dev
```

**Fitur bawaan Jetstream:**
- ✅ Login / Register / Forgot Password
- ✅ Email Verification
- ✅ Two-Factor Authentication (2FA)
- ✅ Session Management (lihat semua device aktif)
- ✅ Profile Management + Upload Foto
- ✅ API Token via Laravel Sanctum
- ✅ Team Management (opsional)

**Kapan pakai:**
- SaaS app, project yang butuh 2FA, multi-user dengan teams
- Tidak mau setup auth dari awal

**Kapan TIDAK pakai:**
- App sederhana — terlalu berat, banyak file yang tidak dipakai
- Lebih baik pakai Breeze kalau tidak butuh semua fitur ini

---

### 🟣 Laravel Sanctum

| Detail | Info |
|---|---|
| **Package** | `laravel/sanctum` |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
Autentikasi ringan untuk SPA (Single Page Application) dan API. Bisa issue API token sederhana tanpa OAuth penuh. Jetstream sudah include Sanctum.

**Install:**
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

**Kapan pakai:**
- REST API yang dikonsumsi mobile app atau frontend SPA
- Token-based auth yang sederhana

---

### 🔵 Laravel Passport

| Detail | Info |
|---|---|
| **Package** | `laravel/passport` |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
OAuth 2.0 server penuh untuk Laravel. Bisa buat authorization server sendiri dengan grant types: Authorization Code, Client Credentials, Password Grant, Implicit, Refresh Token.

**Install:**
```bash
composer require laravel/passport
php artisan passport:install
```

**Kapan pakai:**
- Platform yang butuh OAuth 2.0 standar — misalnya third-party app perlu akses API user-mu
- Enterprise, marketplace, ekosistem yang punya banyak client

**Kapan TIDAK pakai:**
- App internal biasa — terlalu overkill, pakai Sanctum saja

---

---

## 3. Admin Panel

---

### 🟠 Filament

| Detail | Info |
|---|---|
| **Package** | `filament/filament` |
| **Versi Stabil** | v3.x |
| **Dibuat oleh** | Dan Harrin & Community |

**Kegunaan:**
Admin panel lengkap berbasis TALL Stack (Tailwind + Alpine + Livewire) — bisa generate CRUD resource, form builder, table builder, widget dashboard, dan banyak plugin ekosistem. Salah satu admin panel terpopuler di Laravel.

**Install (panel admin):**
```bash
composer require filament/filament:"^3.2" -W
php artisan filament:install --panels
php artisan make:filament-user
```

**Buat Resource (CRUD otomatis):**
```bash
php artisan make:filament-resource Product --generate
```

**Komponen utama Filament:**
| Komponen | Kegunaan |
|---|---|
| **Resource** | CRUD otomatis untuk 1 model |
| **Page** | Halaman custom (dashboard, settings) |
| **Widget** | Widget statistik di dashboard |
| **Form Builder** | Form component (TextInput, Select, FileUpload, dll) |
| **Table Builder** | Tabel dengan filter, sort, bulk action |
| **Action** | Tombol + modal (confirm, form, redirect) |
| **Notification** | Toast notification |
| **Infolist** | Detail view read-only |

**Plugin populer Filament:**
```bash
# Shield — Role & Permission terintegrasi Filament
composer require bezhansalleh/filament-shield

# Excel Export
composer require pxlrbt/filament-excel

# Activity Log
composer require z3d0x/filament-logger
```

**Kapan pakai:**
- Admin panel untuk client / internal tim
- Butuh CRUD cepat tanpa banyak custom code
- Dashboard dengan statistik dan widget

---

### 🟡 Nova (Laravel Official)

| Detail | Info |
|---|---|
| **Package** | `laravel/nova` |
| **Harga** | **Berbayar** ($199/project atau $299 unlimited) |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
Admin panel resmi dari Laravel team. Lebih "official" dari Filament, desain lebih premium, tapi berbayar.

**Kapan pakai:**
- Budget ada, mau admin panel dengan support resmi Laravel
- Tim yang lebih nyaman dengan ekosistem official

**Kapan TIDAK pakai:**
- Budget terbatas — Filament gratis dan fiturnya tidak kalah jauh

---

---

## 4. Role & Permission

---

### 🟣 Spatie Laravel Permission

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-permission` |
| **Dibuat oleh** | Spatie |

**Kegunaan:**
Role & permission management untuk Laravel. Bisa assign role ke user, bisa assign permission ke role atau langsung ke user. Terintegrasi dengan gate/policy Laravel.

**Install:**
```bash
composer require spatie/laravel-permission
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
php artisan migrate
```

**Setup Model User:**
```php
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;
}
```

**Penggunaan dasar:**
```php
// Buat role & permission
Role::create(['name' => 'admin']);
Permission::create(['name' => 'edit posts']);

// Assign ke user
$user->assignRole('admin');
$user->givePermissionTo('edit posts');

// Cek di blade
@role('admin') ... @endrole
@can('edit posts') ... @endcan

// Cek di controller
$user->hasRole('admin');
$user->can('edit posts');
```

**Kapan pakai:**
- Hampir semua project yang punya lebih dari 1 tipe user
- Admin panel, SaaS, dashboard multi-role

---

---

## 5. Media & File Management

---

### 🟢 Spatie Laravel Media Library

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-medialibrary` |
| **Dibuat oleh** | Spatie |

**Kegunaan:**
Manajemen file/media yang powerful — upload file, attach ke model Eloquent, konversi otomatis (resize, crop, watermark), support disk (local, S3, R2, dll).

**Install:**
```bash
composer require spatie/laravel-medialibrary
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"
php artisan migrate
```

**Setup Model:**
```php
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia;

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images');
        $this->addMediaCollection('documents')->singleFile();
    }
}
```

**Penggunaan:**
```php
// Upload
$product->addMedia($request->file('image'))->toMediaCollection('images');

// Ambil
$product->getFirstMediaUrl('images');
$product->getMedia('images');
```

**Kapan pakai:**
- Project yang punya banyak upload file (foto produk, dokumen, avatar)
- Butuh resize/konversi otomatis
- Mau file terorganisir per model

---

### 🔵 Intervention Image

| Detail | Info |
|---|---|
| **Package** | `intervention/image` |
| **Versi** | v3.x |

**Kegunaan:**
Manipulasi gambar — resize, crop, rotate, filter, watermark, convert format. Biasanya dipakai bersamaan dengan Media Library untuk konversi otomatis.

**Install:**
```bash
composer require intervention/image
```

**Penggunaan:**
```php
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

$manager = new ImageManager(new Driver());
$image = $manager->read('foto.jpg');
$image->resize(300, 200)->save('thumb.jpg');
```

---

---

## 6. Activity Log & Audit Trail

---

### 📋 Spatie Laravel Activity Log

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-activitylog` |
| **Dibuat oleh** | Spatie |

**Kegunaan:**
Mencatat semua aktivitas user di aplikasi — siapa yang create/update/delete model apa, kapan, dan apa yang berubah (before/after). Essential untuk audit trail.

**Install:**
```bash
composer require spatie/laravel-activitylog
php artisan vendor:publish --provider="Spatie\Activitylog\ActivitylogServiceProvider" --tag="activitylog-migrations"
php artisan migrate
```

**Setup Model (auto log):**
```php
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Product extends Model
{
    use LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'price', 'is_active'])  // kolom yang dicatat
            ->logOnlyDirty();                           // hanya yang berubah
    }
}
```

**Log manual:**
```php
activity()
    ->causedBy($user)
    ->performedOn($product)
    ->log('updated price');
```

---

---

## 7. Settings & Configuration

---

### ⚙️ Spatie Laravel Settings

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-settings` |
| **Dibuat oleh** | Spatie |

**Kegunaan:**
Menyimpan settings aplikasi di database (bukan `.env`), dengan type-safety. Cocok untuk settings yang bisa diubah via admin panel — nama app, SMTP, toggle fitur, dll.

**Install:**
```bash
composer require spatie/laravel-settings
php artisan vendor:publish --provider="Spatie\LaravelSettings\LaravelSettingsServiceProvider" --tag="migrations"
php artisan migrate
```

**Buat Settings Class:**
```php
// php artisan make:settings GeneralSettings
use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $site_name;
    public string $site_tagline;
    public bool   $maintenance_mode;

    public static function group(): string
    {
        return 'general';
    }
}
```

**Pakai di mana saja:**
```php
$settings = app(GeneralSettings::class);
echo $settings->site_name;

$settings->site_name = 'Nama Baru';
$settings->save();
```

---

---

## 8. SEO & Metadata

---

### 🔍 Spatie Laravel Sitemap

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-sitemap` |
| **Dibuat oleh** | Spatie |

**Kegunaan:**
Generate sitemap XML otomatis dari route/model Laravel. Support multi-sitemap, image sitemap, news sitemap.

**Install:**
```bash
composer require spatie/laravel-sitemap
```

**Generate sitemap:**
```php
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

Sitemap::create()
    ->add(Url::create('/'))
    ->add(Url::create('/about'))
    ->add(Post::all())   // kalau model implement toSitemapTag()
    ->writeToFile(public_path('sitemap.xml'));
```

---

### 🏷️ RalphJSmit Laravel SEO

| Detail | Info |
|---|---|
| **Package** | `ralphjsmit/laravel-seo` |

**Kegunaan:**
Manajemen meta tag SEO (title, description, OG tags, Twitter card, JSON-LD) per halaman/model. Terintegrasi dengan Filament.

**Install:**
```bash
composer require ralphjsmit/laravel-seo
php artisan vendor:publish --tag="seo-migrations"
php artisan migrate
```

---

---

## 9. Image Processing

---

### 🖼️ Spatie Image

| Detail | Info |
|---|---|
| **Package** | `spatie/image` |
| **Dibuat oleh** | Spatie |

**Kegunaan:**
Manipulasi gambar berbasis Intervention Image tapi dengan API yang lebih bersih dan terintegrasi baik dengan Media Library.

**Install:**
```bash
composer require spatie/image
```

---

---

## 10. PDF & Export

---

### 📄 DomPDF (Laravel Snappy / Barryvdh)

| Detail | Info |
|---|---|
| **Package** | `barryvdh/laravel-dompdf` |
| **Dibuat oleh** | Barry vd. Heuvel |

**Kegunaan:**
Generate PDF dari Blade view. Paling mudah di-setup, tapi kurang baik untuk layout kompleks dengan CSS modern.

**Install:**
```bash
composer require barryvdh/laravel-dompdf
```

**Penggunaan:**
```php
use Barryvdh\DomPDF\Facade\Pdf;

$pdf = Pdf::loadView('pdf.invoice', ['data' => $data]);
return $pdf->download('invoice.pdf');
```

---

### 📊 Maatwebsite Laravel Excel

| Detail | Info |
|---|---|
| **Package** | `maatwebsite/excel` |
| **Dibuat oleh** | Maatwebsite |

**Kegunaan:**
Import & export Excel/CSV dari/ke Laravel. Support collection, query builder, generator untuk data besar, event system.

**Install:**
```bash
composer require maatwebsite/excel
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider" --tag=config
```

**Export:**
```php
// php artisan make:export UsersExport --model=User
use Maatwebsite\Excel\Facades\Excel;

return Excel::download(new UsersExport, 'users.xlsx');
```

**Import:**
```php
// php artisan make:import UsersImport --model=User
Excel::import(new UsersImport, $request->file('file'));
```

---

---

## 11. Notification & Email

---

### 📧 Laravel Notification Channels

| Detail | Info |
|---|---|
| **Package** | Berbeda per channel |
| **Sumber** | [laravel-notification-channels.com](https://laravel-notification-channels.com) |

**Channel populer:**
```bash
# WhatsApp via Twilio
composer require laravel-notification-channels/twilio

# Telegram
composer require laravel-notification-channels/telegram

# Firebase Push Notification
composer require laravel-notification-channels/fcm

# Slack
composer require laravel-notification-channels/slack
```

---

### 📬 Spatie Laravel Mailcoach

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-mailcoach` |
| **Dibuat oleh** | Spatie |
| **Harga** | Freemium (self-hosted gratis, SaaS berbayar) |

**Kegunaan:**
Email marketing & newsletter platform yang bisa self-hosted di Laravel sendiri. List management, campaign, automation, analytics.

---

---

## 12. API & Utility

---

### 🔄 Laravel Telescope

| Detail | Info |
|---|---|
| **Package** | `laravel/telescope` |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
Debug tool untuk development — monitor semua request, query, job, mail, notification, log, exception, dll via UI web. **Hanya untuk development.**

**Install:**
```bash
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate
```

---

### 🔎 Laravel Debugbar

| Detail | Info |
|---|---|
| **Package** | `barryvdh/laravel-debugbar` |

**Kegunaan:**
Toolbar debug di browser — query count, query time, views yang diload, binding, dll. Sangat berguna untuk optimasi.

**Install:**
```bash
composer require barryvdh/laravel-debugbar --dev
```

---

### ⚡ Laravel Horizon

| Detail | Info |
|---|---|
| **Package** | `laravel/horizon` |
| **Requirement** | Redis |

**Kegunaan:**
Dashboard monitoring untuk queue/job Laravel yang pakai Redis driver. Lihat job pending, failed, throughput, waktu eksekusi.

**Install:**
```bash
composer require laravel/horizon
php artisan horizon:install
php artisan horizon
```

---

### 🔗 Laravel Socialite

| Detail | Info |
|---|---|
| **Package** | `laravel/socialite` |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
OAuth login via provider eksternal — Google, Facebook, GitHub, Twitter, LinkedIn, dll.

**Install:**
```bash
composer require laravel/socialite
# Provider tambahan:
composer require socialiteproviders/google
```

---

### 🌐 Spatie Laravel Translatable

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-translatable` |

**Kegunaan:**
Multi-language support untuk model — simpan terjemahan di kolom JSON, akses dengan `$model->getTranslation('name', 'id')`.

**Install:**
```bash
composer require spatie/laravel-translatable
```

---

### 🔢 Spatie Laravel Query Builder

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-query-builder` |

**Kegunaan:**
Build Eloquent query dari request parameter — filter, sort, include relasi, semua via URL parameter. Sangat berguna untuk REST API.

**Install:**
```bash
composer require spatie/laravel-query-builder
```

**Contoh:**
```php
// GET /users?filter[name]=john&sort=-created_at&include=posts
$users = QueryBuilder::for(User::class)
    ->allowedFilters(['name', 'email'])
    ->allowedSorts(['name', 'created_at'])
    ->allowedIncludes(['posts'])
    ->paginate();
```

---

### 🗂️ Laravel Sluggable (Spatie)

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-sluggable` |

**Kegunaan:**
Auto-generate slug dari field model — `"Judul Artikel Ini"` → `"judul-artikel-ini"`. Support unique slug otomatis.

**Install:**
```bash
composer require spatie/laravel-sluggable
```

---

### 🔐 Spatie Laravel Backup

| Detail | Info |
|---|---|
| **Package** | `spatie/laravel-backup` |

**Kegunaan:**
Backup database + file ke berbagai storage (local, S3, Dropbox, dll). Bisa di-schedule otomatis. Support notifikasi kalau backup gagal.

**Install:**
```bash
composer require spatie/laravel-backup
php artisan vendor:publish --provider="Spatie\Backup\BackupServiceProvider"
```

**Jalankan:**
```bash
php artisan backup:run
php artisan backup:run --only-db   # hanya database
```

---

---

## 13. Testing

---

### 🧪 Pest PHP

| Detail | Info |
|---|---|
| **Package** | `pestphp/pest` |

**Kegunaan:**
Testing framework modern untuk PHP — syntax lebih bersih dari PHPUnit, support plugin (Coverage, Livewire, Faker, Stress, dll). Laravel 11+ sudah default Pest.

**Install:**
```bash
composer require pestphp/pest --dev --with-all-dependencies
php artisan pest:install

# Plugin:
composer require pestphp/pest-plugin-laravel --dev
composer require pestphp/pest-plugin-livewire --dev
```

**Contoh test:**
```php
it('can create a product', function () {
    $response = $this->post('/products', [
        'name'  => 'Test Product',
        'price' => 10000,
    ]);

    $response->assertRedirect('/products');
    $this->assertDatabaseHas('products', ['name' => 'Test Product']);
});
```

---

---

## 14. Development Tools

---

### 🛠️ Laravel IDE Helper

| Detail | Info |
|---|---|
| **Package** | `barryvdh/laravel-ide-helper` |

**Kegunaan:**
Generate file helper untuk IDE (PHPStorm, VS Code) agar autocomplete model, facade, dan method bekerja dengan benar.

**Install:**
```bash
composer require barryvdh/laravel-ide-helper --dev
php artisan ide-helper:generate     # facade
php artisan ide-helper:models       # model
php artisan ide-helper:eloquent     # eloquent builder
```

---

### 🎨 Laravel Pint

| Detail | Info |
|---|---|
| **Package** | `laravel/pint` |
| **Dibuat oleh** | Laravel Official |

**Kegunaan:**
Code style fixer otomatis berbasis PHP-CS-Fixer. Sudah include di Laravel 9+. Jalankan untuk format ulang kode sesuai standar.

**Jalankan:**
```bash
./vendor/bin/pint
./vendor/bin/pint --dirty    # hanya file yang berubah
```

---

---

## 15. Tabel Perbandingan Cepat

| Package | Vendor | Harga | Kegunaan Utama |
|---|---|---|---|
| Livewire | Caleb Porzio | Gratis | UI interaktif tanpa JS |
| Alpine.js | Caleb Porzio | Gratis | Interaksi UI ringan |
| Inertia.js | Jonathan Reinink | Gratis | SPA dengan backend Laravel |
| Tailwind CSS | Tailwind Labs | Gratis | Utility-first CSS |
| Breeze | Laravel | Gratis | Auth starter kit minimal |
| Jetstream | Laravel | Gratis | Auth starter kit lengkap + teams |
| Sanctum | Laravel | Gratis | Auth API / SPA ringan |
| Passport | Laravel | Gratis | OAuth 2.0 server penuh |
| Filament | Dan Harrin | Gratis | Admin panel TALL Stack |
| Nova | Laravel | **Berbayar** | Admin panel official |
| Spatie Permission | Spatie | Gratis | Role & permission |
| Spatie Media Library | Spatie | Gratis | Upload & manajemen file |
| Spatie Activity Log | Spatie | Gratis | Audit trail |
| Spatie Settings | Spatie | Gratis | Settings di database |
| Spatie Backup | Spatie | Gratis | Backup DB & file |
| Spatie Sitemap | Spatie | Gratis | Generate sitemap XML |
| Spatie Query Builder | Spatie | Gratis | Filter/sort API via URL |
| Spatie Sluggable | Spatie | Gratis | Auto-generate slug |
| Spatie Translatable | Spatie | Gratis | Multi-language model |
| Barryvdh DomPDF | Barry vd. Heuvel | Gratis | Generate PDF |
| Maatwebsite Excel | Maatwebsite | Gratis | Import/export Excel |
| Intervention Image | Oliver Vogel | Gratis | Manipulasi gambar |
| Telescope | Laravel | Gratis | Debug tool (dev only) |
| Debugbar | Barry vd. Heuvel | Gratis | Debug toolbar (dev only) |
| Horizon | Laravel | Gratis | Queue dashboard (Redis) |
| Socialite | Laravel | Gratis | OAuth login (Google, dll) |
| Pest PHP | Pest | Gratis | Testing modern |
| Pint | Laravel | Gratis | Code style fixer |
| IDE Helper | Barry vd. Heuvel | Gratis | Autocomplete IDE |

---

## 16. Stack Rekomendasi per Jenis Project

---

### 🏢 Admin Panel / Dashboard Internal

```
Laravel + Filament + Spatie Permission + Spatie Activity Log + Spatie Media Library
```

---

### 🛒 E-Commerce / Toko Online

```
Laravel + Livewire + Alpine.js + Tailwind
+ Spatie Media Library (foto produk)
+ Spatie Permission (admin/customer/staff)
+ Maatwebsite Excel (export order)
+ DomPDF (cetak invoice)
+ Spatie Backup
```

---

### 🔌 REST API (Mobile App / Frontend SPA)

```
Laravel + Sanctum (auth) + Spatie Query Builder
+ Spatie Permission + Spatie Media Library
+ Telescope (dev)
```

---

### 🏗️ SaaS Multi-Tenant

```
Laravel + Jetstream (--teams) + Inertia + Vue/React
+ Spatie Permission + Spatie Settings
+ Horizon (queue) + Spatie Backup
+ Socialite (OAuth login)
```

---

### 📰 Blog / CMS

```
Laravel + Filament (editor) + Livewire (frontend)
+ Spatie Media Library + Spatie Sluggable
+ Spatie Sitemap + Spatie Translatable (kalau multi-bahasa)
```

---

### 🧪 NEXUS AI — Autonomous TALL Stack Generator

```
Laravel + Livewire + Alpine.js + Tailwind (target sandbox)
+ Filament (admin monitoring)
+ Spatie Permission + Spatie Activity Log
+ Spatie Media Library + Pest PHP
```

---

> 📌 **Prinsip pemilihan package:**
> Pilih yang paling minimal untuk kebutuhan yang ada.
> Jangan install yang tidak dipakai — setiap package adalah dependency baru yang harus di-maintain.

---

*Dokumen ini bagian dari NEXUS Rules — TALL Stack Standards*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, vcs, saas, api]
