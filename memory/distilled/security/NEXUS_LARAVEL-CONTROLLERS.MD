# Aturan Main Controller di Laravel
> **VERSION**: v1 | **Last Updated**: 27/05/2026



> Berlaku untuk Laravel 11, 12, dan 13.

---

## 1. Membuat Controller

```bash
# Controller kosong
php artisan make:controller UserController

# Resource Controller (lengkap 7 method CRUD)
php artisan make:controller UserController --resource

# API Resource Controller (tanpa create & edit)
php artisan make:controller UserController --api

# Single Action Controller
php artisan make:controller ShowDashboard --invokable

# Controller dengan Model binding
php artisan make:controller UserController --model=User --resource

# Controller + Request (auto generate Form Request)
php artisan make:controller UserController --model=User --resource --requests
```

---

## 2. Struktur Dasar Controller

```php
<?php

namespace App\Http\Controllers;

// Laravel 11+ tidak perlu extends Controller lagi (opsional)
class UserController extends Controller
{
    public function index() {}
    public function create() {}
    public function store() {}
    public function show() {}
    public function edit() {}
    public function update() {}
    public function destroy() {}
}
```

> ⚠️ **Laravel 11+**: Base `Controller` class disederhanakan. Trait `AuthorizesRequests` dan `ValidatesRequests` sudah dihapus dari base controller — perlu di-import manual jika masih dipakai.

---

## 3. Dependency Injection di Controller

### Constructor Injection

```php
class UserController extends Controller
{
    public function __construct(
        private UserRepository $users,
        private MailService $mail,
    ) {}

    public function index()
    {
        return $this->users->all();
    }
}
```

### Method Injection

```php
public function store(Request $request)
{
    // $request otomatis di-inject
}

public function show(UserService $service, string $id)
{
    // bisa campur type-hint service + parameter route
    return $service->find($id);
}
```

---

## 4. Single Action Controller

Untuk controller yang hanya punya satu tugas, gunakan method `__invoke`.

```php
class ShowDashboard extends Controller
{
    public function __invoke()
    {
        return view('dashboard');
    }
}
```

```php
// Route-nya
Route::get('/dashboard', ShowDashboard::class);
```

---

## 5. Resource Controller

### 7 Method Standar

| Method    | URI                  | Action  | Kegunaan              |
|-----------|----------------------|---------|-----------------------|
| GET       | /users               | index   | Tampilkan semua data  |
| GET       | /users/create        | create  | Form tambah data      |
| POST      | /users               | store   | Simpan data baru      |
| GET       | /users/{user}        | show    | Tampilkan satu data   |
| GET       | /users/{user}/edit   | edit    | Form edit data        |
| PUT/PATCH | /users/{user}        | update  | Update data           |
| DELETE    | /users/{user}        | destroy | Hapus data            |

### Contoh Implementasi Lengkap

```php
class UserController extends Controller
{
    public function index()
    {
        return view('users.index', [
            'users' => User::paginate(15),
        ]);
    }

    public function create()
    {
        return view('users.create');
    }

    public function store(StoreUserRequest $request)
    {
        User::create($request->validated());
        return redirect()->route('users.index')->with('success', 'User dibuat!');
    }

    public function show(User $user)
    {
        return view('users.show', compact('user'));
    }

    public function edit(User $user)
    {
        return view('users.edit', compact('user'));
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        return redirect()->route('users.index')->with('success', 'User diperbarui!');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User dihapus!');
    }
}
```

---

## 6. API Controller

```php
class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::paginate(15));
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());
        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->noContent(); // 204
    }
}
```

---

## 7. Middleware di Controller

### Laravel 11+ — Gunakan Route (Recommended)

```php
// web.php / api.php
Route::middleware('auth')->group(function () {
    Route::resource('users', UserController::class);
});

// Atau per-route
Route::get('/profile', [UserController::class, 'show'])->middleware('auth');
```

### Via `middleware()` di Controller (masih bisa)

```php
class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('verified')->only(['create', 'store']);
        $this->middleware('log')->except(['index', 'show']);
    }
}
```

> 💡 Laravel 11+ merekomendasikan middleware dipasang di route, bukan di constructor controller, untuk lebih eksplisit dan testable.

---

## 8. Form Request (Validasi Terpisah)

```bash
php artisan make:request StoreUserRequest
```

```php
class StoreUserRequest extends FormRequest
{
    // Siapa yang boleh akses
    public function authorize(): bool
    {
        return true; // atau cek policy/gate
    }

    // Aturan validasi
    public function rules(): array
    {
        return [
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:8', 'confirmed'],
        ];
    }

    // Custom pesan error (opsional)
    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi.',
            'email.unique'  => 'Email sudah terdaftar.',
        ];
    }

    // Custom attribute name (opsional)
    public function attributes(): array
    {
        return [
            'email' => 'alamat email',
        ];
    }

    // Hook sebelum validasi (opsional)
    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->name),
        ]);
    }
}
```

```php
// Gunakan di controller — otomatis validasi sebelum masuk method
public function store(StoreUserRequest $request)
{
    User::create($request->validated());
    // $request->safe()->only(['name', 'email']);
    // $request->safe()->except(['password']);
}
```

---

## 9. Response dari Controller

```php
// Return view
return view('users.index', compact('users'));

// Return JSON
return response()->json(['data' => $users], 200);

// Return dengan status code
return response()->json(['message' => 'Created'], 201);

// Redirect
return redirect('/users');
return redirect()->route('users.index');
return redirect()->back();
return redirect()->back()->withInput();

// Redirect with flash message
return redirect()->route('users.index')
    ->with('success', 'Berhasil disimpan!');

// Return file download
return response()->download(storage_path('file.pdf'));

// Return file stream (tampilkan di browser)
return response()->file(storage_path('file.pdf'));

// No content (untuk DELETE di API)
return response()->noContent(); // 204
```

---

## 10. Resource Response (API Resource)

```bash
php artisan make:resource UserResource
php artisan make:resource UserCollection  # untuk koleksi
```

```php
class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'email'      => $this->email,
            'created_at' => $this->created_at->toDateTimeString(),

            // Conditional field
            'token'    => $this->when($request->user()->isAdmin(), $this->token),

            // Relasi (hanya jika di-load)
            'posts'    => PostResource::collection($this->whenLoaded('posts')),
        ];
    }
}
```

---

## 11. Controller dengan Policy (Authorization)

```bash
php artisan make:policy UserPolicy --model=User
```

```php
class UserController extends Controller
{
    // Authorize semua method sekaligus
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    // Atau authorize per-method
    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);
        // lanjut logic update...
    }
}
```

---

## 12. Nested / Sub Controller

Untuk resource yang bersarang (contoh: komentar di dalam post):

```php
// Route
Route::resource('posts.comments', CommentController::class);
// → /posts/{post}/comments/{comment}

// Controller
class CommentController extends Controller
{
    public function index(Post $post)
    {
        return $post->comments()->paginate();
    }

    public function store(Request $request, Post $post)
    {
        $post->comments()->create($request->validated());
    }
}
```

---

## 13. Perubahan Penting per Versi

### Laravel 11

- Base `Controller` class **disederhanakan** — tidak lagi include `AuthorizesRequests` dan `ValidatesRequests` secara default
- File `app/Http/Kernel.php` **dihapus** — middleware global dikelola di `bootstrap/app.php`
- Middleware `auth`, `verified`, dll masih bisa dipakai seperti biasa
- `php artisan make:controller` menghasilkan controller lebih minimal

### Laravel 12

- Tidak ada breaking change signifikan di controller
- Starter kit baru (React, Vue, Livewire) memakai pola controller yang sama
- Peningkatan pada typed properties dan PHP 8.2+ features

### Laravel 13

- Estimasi rilis Q1 2026
- Pola controller diperkirakan konsisten dengan Laravel 11–12
- Ikuti official upgrade guide di [laravel.com/docs/upgrade](https://laravel.com/docs/upgrade)

---

## 14. Tips & Best Practices

| Tips | Keterangan |
|------|------------|
| Slim controller | Logika bisnis masuk ke Service/Repository, bukan controller |
| Pakai Form Request | Pisahkan validasi dari controller |
| Resource untuk API | Gunakan `JsonResource` agar response konsisten |
| Satu controller, satu resource | Hindari controller yang handle banyak resource sekaligus |
| Nama method standar | Ikuti convention 7 method resource Laravel |
| Inject lewat method | Lebih testable daripada constructor untuk service |
| Authorize di policy | Pisahkan logic otorisasi ke Policy class |

---

*Dokumentasi lengkap: [laravel.com/docs/controllers](https://laravel.com/docs/controllers)*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, tdd, api]
