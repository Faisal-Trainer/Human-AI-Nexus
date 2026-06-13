> **VERSION**: v1 | **Last Updated**: 6/13/2026

---
name: livewire-routing
description: >
  Panduan lengkap mapping rules untuk Livewire routing dalam stack TALL (Laravel + Livewire + Alpine.js + Tailwind).
  Gunakan skill ini setiap kali NEXUS AI perlu men-generate atau memvalidasi route definitions yang melibatkan
  Livewire components — termasuk full-page components, nested layouts, route parameter binding, middleware,
  named routes, dan integrasi dengan Laravel route model binding. Wajib dikonsultasikan sebelum agent manapun
  menulis baris `Route::get()` yang mereturn atau me-render Livewire component, atau ketika agent mendeteksi
  keyword: route, livewire, full-page component, layout, wire:navigate, SPA mode.
---

# Livewire Routing Mapping Rules

> **Scope**: Livewire v3 (default target NEXUS). Catatan perbedaan v2 disertakan di bagian akhir.

---

## 1. Konsep Dasar: Livewire Route vs Blade Route

Livewire tidak punya router sendiri. Semua routing tetap di **`routes/web.php`** milik Laravel.
Yang membedakan adalah *apa yang dikembalikan* oleh route closure atau controller.

| Tipe Route | Return Value | Kapan Dipakai |
|---|---|---|
| Blade biasa | `view('nama-blade')` | Static page, tanpa interaktivitas |
| Full-page Livewire | `Route::get(...)->uses(NamaComponent::class)` | Satu component = satu halaman penuh |
| Blade + embedded | `view('nama-blade')` (blade-nya include `<livewire:...>`) | Layout kompleks, banyak component |

---

## 2. Full-Page Component Route — Sintaks Wajib

### 2.1 Cara Benar (Livewire v3)

```php
// routes/web.php

use App\Livewire\Pages\Dashboard;
use App\Livewire\Pages\UserProfile;

Route::get('/dashboard', Dashboard::class)->name('dashboard');
Route::get('/profile/{user}', UserProfile::class)->name('profile');
```

**Aturan NEXUS:**
- Class component harus berada di `App\Livewire\Pages\` untuk full-page components.
- Non-page components (reusable, embedded) diletakkan di `App\Livewire\` atau subfolder tematik.
- Selalu gunakan `->name()` pada setiap route — dibutuhkan oleh `wire:navigate` dan `redirect()->route()`.

### 2.2 Cara Salah — JANGAN Generate Ini

```php
// ❌ SALAH — return view dari Livewire full-page
Route::get('/dashboard', function () {
    return view('livewire.dashboard'); // ini pola lama / v2
});

// ❌ SALAH — memanggil make() secara manual
Route::get('/dashboard', function () {
    return app(Dashboard::class)->render();
});
```

---

## 3. Route Parameter Binding

### 3.1 Implicit Binding via `mount()`

Ketika route punya parameter `{model}`, Livewire otomatis meneruskannya ke method `mount()`.

```php
// routes/web.php
Route::get('/posts/{post}', \App\Livewire\Pages\ShowPost::class)->name('posts.show');
```

```php
// app/Livewire/Pages/ShowPost.php
class ShowPost extends Component
{
    public Post $post; // typed property = route model binding otomatis

    public function mount(Post $post): void
    {
        $this->post = $post;
    }

    public function render()
    {
        return view('livewire.pages.show-post');
    }
}
```

**Aturan NEXUS:**
- Typed property (`public Post $post`) mengaktifkan implicit route model binding Laravel secara otomatis.
- Jika tidak butuh typed binding, gunakan `public int $postId` dan query manual di `mount()`.
- `mount()` hanya dipanggil **sekali** (saat halaman pertama kali dimuat). Bukan di setiap request Livewire.

### 3.2 Multiple Parameters

```php
Route::get('/teams/{team}/members/{member}', \App\Livewire\Pages\TeamMember::class)
    ->name('teams.members.show');
```

```php
public function mount(Team $team, User $member): void
{
    $this->team = $team;
    $this->member = $member;
}
```

### 3.3 Optional Parameters

```php
Route::get('/search/{category?}', \App\Livewire\Pages\Search::class)->name('search');
```

```php
public function mount(?string $category = null): void
{
    $this->category = $category;
}
```

---

## 4. Layout System

### 4.1 Default Layout (App Layout)

Livewire v3 menggunakan Blade component sebagai layout wrapper. Default layout harus tersedia di:

```
resources/views/components/layouts/app.blade.php
```

Isi minimal:

```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? config('app.name') }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
</head>
<body>
    {{ $slot }}
    @livewireScripts
</body>
</html>
```

### 4.2 Menentukan Layout per Component

```php
// Cara 1: Attribute di atas class
#[\Livewire\Attributes\Layout('components.layouts.admin')]
class AdminDashboard extends Component { ... }

// Cara 2: Di dalam render()
public function render()
{
    return view('livewire.pages.admin-dashboard')
        ->layout('components.layouts.admin');
}

// Cara 3: Dengan title dinamis
public function render()
{
    return view('livewire.pages.show-post')
        ->layout('components.layouts.app')
        ->title('Judul Artikel - ' . $this->post->title);
}
```

**Aturan NEXUS:**
- Gunakan **Cara 1 (attribute)** sebagai default untuk konsistensi.
- Layout guest (login, register) → `components.layouts.guest`
- Layout admin (panel) → `components.layouts.admin` atau gunakan Filament jika ada
- Layout utama aplikasi → `components.layouts.app`

### 4.3 Slot Sections (Title, Header, dll.)

```php
// Di component
public function render()
{
    return view('livewire.pages.dashboard')
        ->layout('components.layouts.app', ['title' => 'Dashboard']);
}
```

```html
<!-- Di layout blade -->
<title>{{ $title ?? 'Default Title' }}</title>
```

---

## 5. Middleware pada Livewire Routes

### 5.1 Middleware Standar

```php
Route::get('/dashboard', Dashboard::class)
    ->name('dashboard')
    ->middleware(['auth', 'verified']);

Route::get('/admin', AdminPanel::class)
    ->name('admin')
    ->middleware(['auth', 'role:admin']);
```

### 5.2 Grup Route dengan Middleware

```php
// routes/web.php

// Guest routes
Route::middleware('guest')->group(function () {
    Route::get('/login', \App\Livewire\Pages\Auth\Login::class)->name('login');
    Route::get('/register', \App\Livewire\Pages\Auth\Register::class)->name('register');
});

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', \App\Livewire\Pages\Dashboard::class)->name('dashboard');
    Route::get('/profile', \App\Livewire\Pages\Profile::class)->name('profile');
});

// Admin routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/users', \App\Livewire\Pages\Admin\Users::class)->name('users');
    Route::get('/settings', \App\Livewire\Pages\Admin\Settings::class)->name('settings');
});
```

**Aturan NEXUS:**
- Selalu gunakan group untuk route yang punya middleware sama — jangan repeat middleware per route.
- Prefix `admin` + name prefix `admin.` harus selalu dipasangkan.
- Route model binding dengan middleware `can:` diletakkan setelah `auth`.

---

## 6. Nested & Resource-Style Routes

### 6.1 CRUD Pattern untuk Livewire

Livewire tidak butuh `Route::resource()` penuh karena create/edit biasanya handle dalam satu component via modal atau inline form. Pola yang direkomendasikan NEXUS:

```php
// Index (list + create via modal)
Route::get('/posts', \App\Livewire\Pages\Posts\Index::class)->name('posts.index');

// Show (detail view)
Route::get('/posts/{post}', \App\Livewire\Pages\Posts\Show::class)->name('posts.show');

// Edit (dedicated edit page, jika diperlukan)
Route::get('/posts/{post}/edit', \App\Livewire\Pages\Posts\Edit::class)->name('posts.edit');
```

### 6.2 Kapan Pakai Dedicated Route vs Modal

| Skenario | Rekomendasi |
|---|---|
| Form sederhana (< 5 field) | Modal dalam Index component |
| Form kompleks / multi-step | Dedicated route `posts.create` / `posts.edit` |
| Delete action | `wire:confirm` + method dalam Index, **tanpa route** |
| Bulk action | Method dalam Index component, tanpa route tambahan |

---

## 7. wire:navigate — SPA-like Navigation

### 7.1 Cara Pakai

```html
<!-- Link biasa dengan prefetch -->
<a href="{{ route('dashboard') }}" wire:navigate>Dashboard</a>

<!-- Redirect dari PHP -->
public function save(): void
{
    $this->post->save();
    $this->redirect(route('posts.index'), navigate: true);
}
```

### 7.2 Syarat wire:navigate Berfungsi

1. Semua halaman yang di-navigate harus pakai layout yang **sama** (atau compatible).
2. `@livewireScripts` harus ada di layout — tidak boleh di-inject conditional.
3. Jangan pakai `wire:navigate` untuk link ke halaman yang butuh full page reload (misal: OAuth redirect, download file).

### 7.3 Aturan NEXUS untuk wire:navigate

```html
<!-- ✅ Gunakan ini di semua internal navigation -->
<a href="{{ route('posts.index') }}" wire:navigate>Kembali ke Daftar</a>

<!-- ❌ Jangan ini untuk internal link -->
<a href="{{ route('posts.index') }}">Kembali ke Daftar</a>
```

NEXUS **wajib** menambahkan `wire:navigate` di semua `<a>` tag yang mengarah ke route Livewire dalam aplikasi yang sama, kecuali:
- Link ke external URL
- Link yang trigger download
- Link ke route non-Livewire (API, OAuth)

---

## 8. Redirect dari Livewire Component

```php
// Redirect ke named route
$this->redirect(route('posts.index'));

// Redirect dengan wire:navigate (SPA mode)
$this->redirect(route('posts.index'), navigate: true);

// Redirect ke URL
$this->redirect('/some/url');

// Redirect kembali
$this->redirectRoute('posts.show', ['post' => $this->post]);
```

**Jangan gunakan:**
```php
// ❌ Ini tidak akan bekerja di Livewire context
return redirect()->route('posts.index');
```

---

## 9. URL & Query String

### 9.1 Binding Property ke URL Query String

```php
use Livewire\Attributes\Url;

class PostIndex extends Component
{
    #[Url]
    public string $search = '';

    #[Url(as: 'p')]
    public int $page = 1;

    #[Url(history: true)] // push ke browser history
    public string $tab = 'all';
}
```

URL akan otomatis update: `/posts?search=laravel&p=2&tab=published`

### 9.2 Aturan NEXUS untuk Url Attribute

- Pakai `#[Url]` untuk: search, filter, tab, page
- Pakai `history: true` untuk state yang "layak di-bookmark"
- Jangan expose field sensitif (user_id, token) via `#[Url]`

---

## 10. Route File Organization (NEXUS Standard)

```php
// routes/web.php — struktur yang diharapkan NEXUS

<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', \App\Livewire\Pages\Welcome::class)->name('home');

/*
|--------------------------------------------------------------------------
| Auth Routes (Guest Only)
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('/login', \App\Livewire\Pages\Auth\Login::class)->name('login');
    Route::get('/register', \App\Livewire\Pages\Auth\Register::class)->name('register');
    Route::get('/forgot-password', \App\Livewire\Pages\Auth\ForgotPassword::class)->name('password.request');
    Route::get('/reset-password/{token}', \App\Livewire\Pages\Auth\ResetPassword::class)->name('password.reset');
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', \App\Livewire\Pages\Dashboard::class)->name('dashboard');
    Route::get('/profile', \App\Livewire\Pages\Profile::class)->name('profile');

    // Posts
    Route::get('/posts', \App\Livewire\Pages\Posts\Index::class)->name('posts.index');
    Route::get('/posts/{post}', \App\Livewire\Pages\Posts\Show::class)->name('posts.show');
    Route::get('/posts/{post}/edit', \App\Livewire\Pages\Posts\Edit::class)->name('posts.edit');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', \App\Livewire\Pages\Admin\Dashboard::class)->name('dashboard');
        Route::get('/users', \App\Livewire\Pages\Admin\Users::class)->name('users');
    });
```

---

## 11. Folder Structure yang Diharapkan NEXUS

```
app/
└── Livewire/
    ├── Pages/              ← Full-page components (dipasangkan ke route)
    │   ├── Auth/
    │   │   ├── Login.php
    │   │   └── Register.php
    │   ├── Admin/
    │   │   └── Dashboard.php
    │   ├── Posts/
    │   │   ├── Index.php
    │   │   ├── Show.php
    │   │   └── Edit.php
    │   ├── Dashboard.php
    │   └── Welcome.php
    │
    └── Components/         ← Reusable, embedded components (TIDAK dipasangkan ke route)
        ├── PostCard.php
        ├── SearchBar.php
        └── Modals/
            └── ConfirmDelete.php

resources/views/
├── components/
│   └── layouts/
│       ├── app.blade.php
│       ├── guest.blade.php
│       └── admin.blade.php
└── livewire/
    ├── pages/
    │   ├── auth/
    │   ├── admin/
    │   ├── posts/
    │   └── dashboard.blade.php
    └── components/
        └── ...
```

---

## 12. Checklist Validasi Route (untuk NEXUS agents)

Sebelum finalisasi `routes/web.php`, agent wajib memvalidasi:

- [ ] Semua route full-page menggunakan `ClassName::class`, bukan `view()` atau closure
- [ ] Semua route punya `->name()`
- [ ] Middleware digroup — tidak direpeat per route
- [ ] Admin routes punya prefix `admin` dan name prefix `admin.`
- [ ] Guest-only routes dibungkus `middleware('guest')`
- [ ] Auth routes dibungkus `middleware(['auth', 'verified'])`
- [ ] Route parameter binding menggunakan typed property di `mount()`
- [ ] Tidak ada `Route::resource()` yang generate method tidak diperlukan
- [ ] `wire:navigate` ada di semua internal link di blade views

---

## 13. Perbedaan v2 vs v3 (Quick Reference)

| Aspek | Livewire v2 | Livewire v3 |
|---|---|---|
| Full-page route | `Route::get('/', NamaComponent::class)` | Sama |
| Layout directive | `->layout('layouts.app')` | `->layout('components.layouts.app')` atau `#[Layout]` attribute |
| Layout file path | `resources/views/layouts/app.blade.php` | `resources/views/components/layouts/app.blade.php` |
| SPA navigation | Tidak ada | `wire:navigate` |
| URL binding | `->queryString(['search'])` di component | `#[Url]` attribute |
| Redirect | `$this->redirect(route('...'))` | Sama, tambahan `navigate: true` |

> **NEXUS default target: Livewire v3.** Jangan generate sintaks v2 kecuali project secara eksplisit dinyatakan menggunakan v2.

---

## 14. Contoh Output Lengkap (Reference)

Untuk project dengan fitur **Blog** (CRUD posts), NEXUS harus generate route seperti ini:

```php
// routes/web.php

<?php

use Illuminate\Support\Facades\Route;

Route::get('/', \App\Livewire\Pages\Welcome::class)->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/login', \App\Livewire\Pages\Auth\Login::class)->name('login');
    Route::get('/register', \App\Livewire\Pages\Auth\Register::class)->name('register');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', \App\Livewire\Pages\Dashboard::class)->name('dashboard');

    // Blog Posts
    Route::get('/posts', \App\Livewire\Pages\Posts\Index::class)->name('posts.index');
    Route::get('/posts/{post}', \App\Livewire\Pages\Posts\Show::class)->name('posts.show');
    Route::get('/posts/{post}/edit', \App\Livewire\Pages\Posts\Edit::class)->name('posts.edit');
});
```

Dan component `ShowPost.php`:

```php
<?php

namespace App\Livewire\Pages\Posts;

use App\Models\Post;
use Livewire\Component;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;

#[Layout('components.layouts.app')]
#[Title('Detail Post')]
class Show extends Component
{
    public Post $post;

    public function mount(Post $post): void
    {
        $this->post = $post;
    }

    public function render()
    {
        return view('livewire.pages.posts.show');
    }
}
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, vcs, laravel, api]
