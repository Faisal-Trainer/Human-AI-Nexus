# Aturan Main Route di Laravel
> **VERSION**: v1 | **Last Updated**: 27/05/2026



> Panduan lengkap routing Laravel — dari dasar sampai advanced.

---

## 1. Lokasi File Route

```
routes/
├── web.php        → HTTP routes (session, cookie, CSRF)
├── api.php        → API routes (prefix /api, stateless)
├── console.php    → Artisan command routes
└── channels.php   → Broadcasting channels
```

Route didaftarkan otomatis oleh Laravel lewat `bootstrap/app.php`.

---

## 2. Basic Routes

```php
Route::get('/uri', function () { return 'Hello'; });
Route::post('/uri', function () {});
Route::put('/uri', function () {});
Route::patch('/uri', function () {});
Route::delete('/uri', function () {});
Route::options('/uri', function () {});
```

### Match Beberapa Method Sekaligus

```php
Route::match(['get', 'post'], '/uri', function () {});
Route::any('/uri', function () {});  // semua method
```

---

## 3. Route ke Controller

```php
use App\Http\Controllers\UserController;

// Method spesifik
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);

// Single Action Controller (pakai __invoke)
Route::get('/dashboard', DashboardController::class);
```

---

## 4. Route Parameters

```php
// Required
Route::get('/user/{id}', function (string $id) {
    return "User ID: $id";
});

// Optional (pakai ?)
Route::get('/user/{name?}', function (string $name = 'Guest') {
    return $name;
});

// Multiple parameters
Route::get('/posts/{post}/comments/{comment}', function ($postId, $commentId) {
    return "Post $postId, Comment $commentId";
});
```

### Constraints pada Parameter

```php
// Regex manual
Route::get('/user/{id}', fn($id) => $id)->where('id', '[0-9]+');
Route::get('/user/{name}', fn($name) => $name)->where('name', '[A-Za-z]+');

// Helper bawaan
Route::get('/user/{id}', fn($id) => $id)->whereNumber('id');
Route::get('/user/{name}', fn($name) => $name)->whereAlpha('name');
Route::get('/user/{slug}', fn($slug) => $slug)->whereAlphaNumeric('slug');
Route::get('/user/{uuid}', fn($uuid) => $uuid)->whereUuid('uuid');
Route::get('/category/{cat}', fn($cat) => $cat)->whereIn('cat', ['news', 'blog']);

// Global constraint (ditulis di RouteServiceProvider / AppServiceProvider)
Route::pattern('id', '[0-9]+');
```

---

## 5. Named Routes

```php
// Memberi nama ke route
Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');

// Menggunakan nama route
$url = route('profile.show');
$url = route('profile.show', ['id' => 1]);  // dengan parameter

// Redirect ke named route
return redirect()->route('profile.show');

// Cek nama route saat ini
if (request()->routeIs('profile.*')) { ... }
```

---

## 6. Route Groups

### Prefix

```php
Route::prefix('admin')->group(function () {
    Route::get('/users', fn() => 'Admin Users');   // /admin/users
    Route::get('/posts', fn() => 'Admin Posts');   // /admin/posts
});
```

### Middleware

```php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => 'Dashboard');
    Route::get('/profile', fn() => 'Profile');
});
```

### Namespace Controller

```php
Route::controller(UserController::class)->group(function () {
    Route::get('/users', 'index');
    Route::post('/users', 'store');
    Route::get('/users/{id}', 'show');
});
```

### Name Prefix

```php
Route::name('admin.')->group(function () {
    Route::get('/users', fn() => '...')->name('users');  // → admin.users
    Route::get('/posts', fn() => '...')->name('posts');  // → admin.posts
});
```

### Gabungan (chaining)

```php
Route::prefix('admin')
    ->middleware('auth')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', fn() => '...')->name('dashboard');
    });
// URL: /admin/dashboard | Name: admin.dashboard
```

---

## 7. Resource Routes

```php
// Daftarkan 7 route sekaligus (CRUD)
Route::resource('posts', PostController::class);
```

| Method    | URI                  | Action  | Route Name     |
|-----------|----------------------|---------|----------------|
| GET       | /posts               | index   | posts.index    |
| GET       | /posts/create        | create  | posts.create   |
| POST      | /posts               | store   | posts.store    |
| GET       | /posts/{post}        | show    | posts.show     |
| GET       | /posts/{post}/edit   | edit    | posts.edit     |
| PUT/PATCH | /posts/{post}        | update  | posts.update   |
| DELETE    | /posts/{post}        | destroy | posts.destroy  |

### Resource Partial (pilih action tertentu)

```php
Route::resource('posts', PostController::class)->only(['index', 'show']);
Route::resource('posts', PostController::class)->except(['create', 'edit', 'destroy']);
```

### Nested Resource

```php
Route::resource('posts.comments', CommentController::class);
// → /posts/{post}/comments/{comment}
```

### API Resource (tanpa create & edit)

```php
Route::apiResource('posts', PostController::class);
Route::apiResources([
    'posts' => PostController::class,
    'users' => UserController::class,
]);
```

---

## 8. Redirect Routes

```php
// Redirect biasa (301)
Route::redirect('/here', '/there');

// Redirect dengan status code custom
Route::redirect('/here', '/there', 302);

// Permanent redirect (301)
Route::permanentRedirect('/old', '/new');
```

---

## 9. View Routes

```php
// Langsung return view tanpa controller
Route::view('/about', 'about');
Route::view('/about', 'about', ['name' => 'Faisal']);
```

---

## 10. Fallback Route

```php
// Menangkap semua request yang tidak cocok route manapun
// Harus diletakkan paling bawah
Route::fallback(function () {
    return response()->view('errors.404', [], 404);
});
```

---

## 11. Route Model Binding

### Implicit Binding

```php
// Laravel otomatis inject model berdasarkan nama parameter
Route::get('/users/{user}', function (User $user) {
    return $user;
});
// → Laravel cari User::find($id) otomatis
```

### Custom Key Binding

```php
// Pakai kolom selain id
Route::get('/posts/{post:slug}', function (Post $post) {
    return $post;
});

// Atau definisikan di model
public function getRouteKeyName(): string
{
    return 'slug';
}
```

### Explicit Binding (di RouteServiceProvider / AppServiceProvider)

```php
Route::bind('user', function (string $value) {
    return User::where('name', $value)->firstOrFail();
});
```

---

## 12. Subdomain Routing

```php
Route::domain('{account}.example.com')->group(function () {
    Route::get('/user/{id}', function (string $account, string $id) {
        return "$account - $id";
    });
});
```

---

## 13. Rate Limiting

```php
// Definisikan limiter (di AppServiceProvider)
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});

// Pasang ke route / group
Route::middleware('throttle:api')->group(function () {
    Route::get('/users', fn() => '...');
});
```

---

## 14. Middleware pada Route

```php
// Single middleware
Route::get('/dashboard', fn() => '...')->middleware('auth');

// Multiple middleware
Route::get('/dashboard', fn() => '...')->middleware(['auth', 'verified']);

// Exclude middleware dari group
Route::middleware('auth')->group(function () {
    Route::get('/public', fn() => '...')->withoutMiddleware('auth');
});
```

---

## 15. Route Caching (Production)

```bash
# Generate cache — wajib dijalankan tiap deploy
php artisan route:cache

# Hapus cache
php artisan route:clear

# Lihat semua route
php artisan route:list
php artisan route:list --path=api   # filter by prefix
php artisan route:list -v           # tampilkan middleware
```

> ⚠️ Jangan gunakan closure route (`function () {}`) kalau mau pakai route caching — harus pakai controller.

---

## 16. Tips & Best Practices

| Tips | Keterangan |
|------|------------|
| Gunakan named route | Hindari hardcode URL, pakai `route('name')` |
| Pakai resource route | Lebih konsisten dan hemat kode |
| Route caching di production | Wajib untuk performa |
| Jangan closure di production | Closure tidak bisa di-cache |
| Urutkan route dengan benar | Route spesifik di atas, fallback paling bawah |
| Group middleware logis | Kelompokkan route berdasarkan akses (guest/auth/admin) |
| Gunakan route model binding | Lebih clean daripada `findOrFail` manual |

---

*Dokumentasi lengkap: [laravel.com/docs/routing](https://laravel.com/docs/routing)*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, performance, api]
