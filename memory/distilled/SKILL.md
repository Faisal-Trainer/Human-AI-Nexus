---
name: laravel-pivot-table
description: Panduan lengkap dan sangat detail untuk membuat, mengelola, dan menggunakan tabel pivot (pivot table) pada relasi Many-to-Many di framework Laravel. Gunakan skill ini setiap kali user menyebut "tabel pivot", "pivot table", "relasi many-to-many", "belongsToMany", "intermediate table", "tabel perantara", "tabel penghubung", atau butuh bantuan menghubungkan dua model dengan kolom tambahan (extra columns) seperti quantity, role, status pada relasi. Cocok juga dipakai saat user membuat migration untuk relasi many-to-many, attach/detach/sync data relasi, atau butuh contoh kasus nyata seperti relasi User-Role, Product-Order, Student-Course.
---

# Laravel Pivot Table — Panduan Lengkap

Skill ini berisi tata cara lengkap membuat dan menggunakan tabel pivot pada relasi **Many-to-Many** di Laravel, mulai dari konsep dasar, migration, model, sampai teknik lanjutan (custom pivot model, extra columns, timestamps, sync, dsb).

## Daftar Isi
1. Konsep Dasar Tabel Pivot
2. Konvensi Penamaan Laravel
3. Membuat Migration Tabel Pivot
4. Mendefinisikan Relasi di Model (`belongsToMany`)
5. Operasi CRUD pada Relasi Pivot (attach, detach, sync, toggle)
6. Menambahkan Kolom Tambahan (Extra Columns) di Pivot
7. Menggunakan Timestamps pada Pivot
8. Custom Pivot Model (`using()`)
9. Query & Filtering Berdasarkan Pivot
10. Studi Kasus Lengkap (Student-Course dengan nilai)
11. Best Practice & Kesalahan Umum

---

## 1. Konsep Dasar Tabel Pivot

Tabel pivot adalah tabel perantara yang menghubungkan dua tabel dalam relasi **Many-to-Many**. Contoh: satu `User` bisa punya banyak `Role`, dan satu `Role` bisa dimiliki banyak `User`. Relasi ini tidak bisa disimpan langsung dengan foreign key biasa, sehingga butuh tabel ketiga yang berisi pasangan ID dari kedua tabel.

```
users            role_user           roles
+----+------+    +---------+--------+    +----+--------+
| id | name |    | user_id | role_id|    | id | name   |
+----+------+    +---------+--------+    +----+--------+
| 1  | Budi |    |    1    |    1   |    | 1  | Admin  |
| 2  | Sari |    |    1    |    2   |    | 2  | Editor |
+----+------+    |    2    |    2   |    +----+--------+
                 +---------+--------+
```

## 2. Konvensi Penamaan Laravel

Laravel sangat mengandalkan konvensi (*convention over configuration*). Ikuti aturan ini agar relasi otomatis terdeteksi tanpa konfigurasi tambahan:

| Elemen | Aturan | Contoh |
|---|---|---|
| Nama tabel pivot | Nama model **singular**, urut **alfabetis**, digabung underscore | `Role` + `User` → `role_user` |
| Foreign key | Nama model singular + `_id` | `user_id`, `role_id` |
| Primary key tabel pivot | Biasanya **tidak perlu** primary key `id` sendiri (opsional) | - |

> **Catatan penting:** Jika nama tabel tidak mengikuti konvensi (misal `user_roles` bukan `role_user`), kamu **wajib** menuliskan nama tabel secara eksplisit di method `belongsToMany()`.

---

## 3. Membuat Migration Tabel Pivot

### Langkah 1: Generate migration

```bash
php artisan make:migration create_role_user_table
```

### Langkah 2: Isi struktur migration

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('role_user', function (Blueprint $table) {
            $table->id(); // opsional, tapi disarankan untuk kemudahan debugging
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
            $table->timestamps(); // opsional, lihat bagian 7

            // Mencegah duplikasi pasangan user_id + role_id
            $table->unique(['user_id', 'role_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('role_user');
    }
};
```

**Penjelasan baris penting:**
- `foreignId('user_id')->constrained()` — otomatis membuat foreign key ke tabel `users` kolom `id`, dan otomatis menebak nama tabel dari nama kolom (`user_id` → `users`).
- `onDelete('cascade')` — jika user dihapus, baris pivot terkait ikut terhapus otomatis (hindari data yatim/orphan).
- `unique(['user_id', 'role_id'])` — mencegah relasi ganda yang sama tersimpan dua kali.

### Jalankan migration

```bash
php artisan migrate
```

---

## 4. Mendefinisikan Relasi di Model (`belongsToMany`)

### Model `User`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Model
{
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
        // Jika nama tabel/kolom tidak standar, tulis eksplisit:
        // return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id');
    }
}
```

### Model `Role`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
```

**Parameter lengkap `belongsToMany()`:**

```php
belongsToMany(
    string $related,            // model tujuan
    string $table = null,       // nama tabel pivot (opsional jika ikuti konvensi)
    string $foreignPivotKey = null, // FK model ini di tabel pivot
    string $relatedPivotKey = null  // FK model terkait di tabel pivot
);
```

### Contoh Penggunaan

```php
$user = User::find(1);

// Mengambil semua role milik user
$roles = $user->roles; // Collection of Role

foreach ($user->roles as $role) {
    echo $role->name;
}
```

---

## 5. Operasi CRUD pada Relasi Pivot

### a. `attach()` — Menambahkan relasi baru

```php
$user = User::find(1);

// Attach satu ID
$user->roles()->attach(1);

// Attach beberapa ID sekaligus
$user->roles()->attach([1, 2, 3]);

// Attach dengan data tambahan di pivot
$user->roles()->attach(1, ['assigned_by' => auth()->id()]);
```

### b. `detach()` — Menghapus relasi

```php
// Hapus satu relasi
$user->roles()->detach(1);

// Hapus beberapa relasi
$user->roles()->detach([1, 2]);

// Hapus SEMUA relasi user ini
$user->roles()->detach();
```

### c. `sync()` — Menyamakan relasi persis sesuai array yang diberikan

`sync()` akan **menghapus** relasi lama yang tidak ada di array baru, dan **menambahkan** yang belum ada. Sangat berguna untuk form multi-select (misal checkbox role di form edit user).

```php
// Setelah ini, user HANYA akan punya role id 2 dan 3 (yang lain otomatis terhapus)
$user->roles()->sync([2, 3]);

// sync dengan data tambahan per item
$user->roles()->sync([
    1 => ['assigned_by' => auth()->id()],
    2 => ['assigned_by' => auth()->id()],
]);
```

### d. `syncWithoutDetaching()` — Tambah tanpa menghapus yang lama

```php
$user->roles()->syncWithoutDetaching([4, 5]);
```

### e. `toggle()` — Membalik status relasi (ada → dihapus, tidak ada → ditambahkan)

```php
$user->roles()->toggle([1, 2]);
```

### f. Mengecek relasi

```php
if ($user->roles->contains($role)) {
    echo 'User punya role ini';
}

// Atau langsung query
$ada = $user->roles()->where('roles.id', 5)->exists();
```

---

## 6. Menambahkan Kolom Tambahan (Extra Columns) di Pivot

Kadang tabel pivot butuh data tambahan, contoh kasus *enrollment*: `student_course` perlu kolom `grade` (nilai).

### Migration dengan kolom tambahan

```php
Schema::create('course_student', function (Blueprint $table) {
    $table->id();
    $table->foreignId('student_id')->constrained()->onDelete('cascade');
    $table->foreignId('course_id')->constrained()->onDelete('cascade');
    $table->string('grade')->nullable(); // kolom tambahan
    $table->timestamps();
});
```

### Wajib deklarasikan `withPivot()` di model

```php
// Model Student
public function courses(): BelongsToMany
{
    return $this->belongsToMany(Course::class)
                ->withPivot('grade'); // bisa juga ->withPivot(['grade', 'kolom_lain'])
}
```

### Mengakses kolom pivot

```php
$student = Student::find(1);

foreach ($student->courses as $course) {
    echo $course->name . ' - Nilai: ' . $course->pivot->grade;
}
```

### Update kolom pivot

```php
$student->courses()->updateExistingPivot($courseId, [
    'grade' => 'A',
]);
```

> **Penting:** Tanpa `withPivot()`, kolom tambahan **tidak akan muncul** di objek `pivot`, meskipun datanya tersimpan di database.

---

## 7. Menggunakan Timestamps pada Pivot

Jika tabel pivot punya `created_at` dan `updated_at`, tambahkan `withTimestamps()` di relasi:

```php
public function courses(): BelongsToMany
{
    return $this->belongsToMany(Course::class)
                ->withPivot('grade')
                ->withTimestamps();
}
```

Tanpa ini, Laravel tidak akan mengisi otomatis kolom timestamp saat `attach()`/`sync()` dipanggil, walau kolomnya ada di database — bisa menyebabkan error "field doesn't have default value".

---

## 8. Custom Pivot Model (`using()`)

Untuk kasus kompleks (pivot punya banyak logika/accessor sendiri, atau kamu ingin pakai event/observer pada pivot), buat model pivot khusus.

### Buat model pivot

```bash
php artisan make:model CourseStudent
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CourseStudent extends Pivot
{
    protected $table = 'course_student';

    protected $casts = [
        'enrolled_at' => 'datetime',
    ];

    // Bisa tambahkan accessor, mutator, relasi tambahan, dsb
    public function isPassing(): bool
    {
        return in_array($this->grade, ['A', 'B', 'C']);
    }
}
```

### Pasang di relasi dengan `using()`

```php
public function courses(): BelongsToMany
{
    return $this->belongsToMany(Course::class)
                ->using(CourseStudent::class)
                ->withPivot('grade')
                ->withTimestamps();
}
```

### Penggunaan

```php
$pivot = $student->courses->first()->pivot; // instance dari CourseStudent

if ($pivot->isPassing()) {
    echo 'Lulus';
}
```

> Gunakan custom pivot model jika tabel pivot mulai punya "perilaku" sendiri (method, cast khusus, event), bukan sekadar penyimpan data.

---

## 9. Query & Filtering Berdasarkan Pivot

### `wherePivot()` — filter berdasarkan kolom pivot

```php
$student->courses()->wherePivot('grade', 'A')->get();
```

### `wherePivotIn()`

```php
$student->courses()->wherePivotIn('grade', ['A', 'B'])->get();
```

### `orderByPivot()`

```php
$student->courses()->orderByPivot('created_at', 'desc')->get();
```

### Eager loading dengan kondisi pivot

```php
$students = Student::with(['courses' => function ($query) {
    $query->wherePivot('grade', 'A');
}])->get();
```

### Menghitung jumlah relasi (`withCount`)

```php
$students = Student::withCount('courses')->get();
// akses: $student->courses_count
```

---

## 10. Studi Kasus Lengkap: Student – Course dengan Nilai

### Migration

```php
// create_courses_table
Schema::create('courses', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});

// create_students_table
Schema::create('students', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});

// create_course_student_table
Schema::create('course_student', function (Blueprint $table) {
    $table->id();
    $table->foreignId('student_id')->constrained()->onDelete('cascade');
    $table->foreignId('course_id')->constrained()->onDelete('cascade');
    $table->string('grade')->nullable();
    $table->timestamps();

    $table->unique(['student_id', 'course_id']);
});
```

### Model

```php
class Student extends Model
{
    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class)
                    ->using(CourseStudent::class)
                    ->withPivot('grade')
                    ->withTimestamps();
    }
}

class Course extends Model
{
    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class)
                    ->using(CourseStudent::class)
                    ->withPivot('grade')
                    ->withTimestamps();
    }
}
```

### Controller — Mendaftarkan student ke course

```php
public function enroll(Request $request, Student $student)
{
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
    ]);

    $student->courses()->syncWithoutDetaching([
        $validated['course_id'] => ['grade' => null],
    ]);

    return back()->with('success', 'Berhasil mendaftar kursus.');
}
```

### Controller — Update nilai

```php
public function updateGrade(Request $request, Student $student, Course $course)
{
    $validated = $request->validate([
        'grade' => 'required|string|max:2',
    ]);

    $student->courses()->updateExistingPivot($course->id, [
        'grade' => $validated['grade'],
    ]);

    return back()->with('success', 'Nilai diperbarui.');
}
```

### Blade — Menampilkan data

```blade
<table>
    <thead>
        <tr>
            <th>Kursus</th>
            <th>Nilai</th>
            <th>Terdaftar Sejak</th>
        </tr>
    </thead>
    <tbody>
        @foreach($student->courses as $course)
        <tr>
            <td>{{ $course->name }}</td>
            <td>{{ $course->pivot->grade ?? '-' }}</td>
            <td>{{ $course->pivot->created_at->format('d M Y') }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
```

---

## 11. Best Practice & Kesalahan Umum

✅ **Lakukan:**
- Selalu gunakan `constrained()->onDelete('cascade')` agar data pivot tidak jadi sampah (orphan) saat parent dihapus.
- Tambahkan `unique([...])` pada kombinasi foreign key untuk mencegah duplikasi data.
- Gunakan `withPivot()` setiap kali tabel pivot punya kolom selain dua foreign key.
- Gunakan `sync()` untuk form checkbox/multi-select agar logika hapus-tambah tertangani otomatis dalam satu baris.
- Gunakan custom Pivot Model (`using()`) begitu pivot mulai punya logika bisnis sendiri.
- Definisikan relasi di **kedua arah** (misal `User::roles()` dan `Role::users()`) agar query dari dua sisi sama mudahnya.

❌ **Hindari:**
- Lupa memanggil `withPivot()` — menyebabkan kolom tambahan `null`/hilang padahal data ada di database.
- Lupa `withTimestamps()` saat tabel pivot punya kolom timestamp — menyebabkan error insert.
- Menggunakan `attach()` berulang tanpa `unique constraint` — berisiko data duplikat.
- Menamai tabel pivot sembarangan tanpa menuliskannya eksplisit di `belongsToMany()` — relasi tidak akan terdeteksi otomatis.
- Mengakses kolom pivot langsung dari model utama (`$course->grade`) — yang benar selalu lewat `$course->pivot->grade`.

---

## Ringkasan Cepat (Cheat Sheet)

| Kebutuhan | Method |
|---|---|
| Tambah relasi | `attach()` |
| Hapus relasi | `detach()` |
| Samakan persis dengan array | `sync()` |
| Tambah tanpa hapus lama | `syncWithoutDetaching()` |
| Balik status (ada/tidak) | `toggle()` |
| Ambil kolom tambahan pivot | `withPivot('kolom')` |
| Auto timestamp pivot | `withTimestamps()` |
| Update kolom pivot tertentu | `updateExistingPivot()` |
| Pivot dengan logika custom | `using(CustomPivot::class)` |
| Filter berdasarkan kolom pivot | `wherePivot()`, `wherePivotIn()` |
