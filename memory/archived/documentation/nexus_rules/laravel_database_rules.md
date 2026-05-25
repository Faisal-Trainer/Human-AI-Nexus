# 🗄️ Laravel Database Rules — Panduan Lengkap

> Dokumen ini adalah aturan baku untuk semua operasi database di project Laravel.
> Dari buat tabel baru, seeder, sampai modifikasi kolom (tambah/hapus).
> **Berlaku untuk: Laravel 10+ / Laravel 12 (TALL Stack)**

---

## 📋 Daftar Isi

1. [Aturan Umum](#1-aturan-umum)
2. [Membuat Tabel Baru (Migration)](#2-membuat-tabel-baru-migration)
3. [Tipe Kolom yang Umum Dipakai](#3-tipe-kolom-yang-umum-dipakai)
4. [Seeder & Factory](#4-seeder--factory)
5. [Menambah Kolom Baru](#5-menambah-kolom-baru)
6. [Menghapus Kolom](#6-menghapus-kolom)
7. [Mengganti Nama Kolom](#7-mengganti-nama-kolom)
8. [Rollback & Fresh Migration](#8-rollback--fresh-migration)
9. [Contoh Kasus: Tabel Users — Tambah `phone`, Hapus `email`](#9-contoh-kasus-tabel-users--tambah-phone-hapus-email)
10. [Aturan Penamaan](#10-aturan-penamaan)

---

## 1. Aturan Umum

- **Jangan pernah edit file migration yang sudah di-commit.** Kalau mau ubah, buat migration baru.
- Setiap perubahan database = 1 file migration baru. Tidak boleh ada perubahan langsung via SQL manual di production.
- Selalu jalankan `php artisan migrate` — jangan pernah alter tabel langsung lewat phpMyAdmin/Adminer di production.
- Nama migration harus **deskriptif** — cerita apa yang dilakukan, bukan nama tabelnya saja.
- Selalu sertakan method `down()` yang kebalikan dari `up()` — wajib bisa di-rollback.
- Setiap tabel wajib punya `$table->timestamps()` kecuali ada alasan teknis yang kuat.

---

## 2. Membuat Tabel Baru (Migration)

### Perintah Artisan

```bash
php artisan make:migration create_nama_tabel_table
```

Contoh untuk tabel `products`:

```bash
php artisan make:migration create_products_table
```

### Struktur File Migration

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();                              // BIGINT UNSIGNED AUTO INCREMENT (Primary Key)
            $table->string('name');                    // VARCHAR 255
            $table->text('description')->nullable();   // TEXT, boleh kosong
            $table->unsignedBigInteger('price');       // angka positif
            $table->boolean('is_active')->default(true);
            $table->timestamps();                      // created_at & updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

### Jalankan Migration

```bash
php artisan migrate
```

---

## 3. Tipe Kolom yang Umum Dipakai

| Kebutuhan | Method |
|---|---|
| ID auto increment | `$table->id()` |
| UUID sebagai primary key | `$table->uuid('id')->primary()` |
| Teks pendek (max 255) | `$table->string('name')` |
| Teks pendek custom length | `$table->string('code', 10)` |
| Teks panjang | `$table->text('bio')` |
| Teks sangat panjang | `$table->longText('content')` |
| Angka bulat | `$table->integer('qty')` |
| Angka bulat besar | `$table->bigInteger('views')` |
| Angka positif saja | `$table->unsignedBigInteger('price')` |
| Desimal | `$table->decimal('rating', 3, 2)` — total 3 digit, 2 desimal |
| Boolean | `$table->boolean('is_active')->default(false)` |
| Tanggal saja | `$table->date('birth_date')` |
| Tanggal + waktu | `$table->dateTime('published_at')` |
| Timestamp (auto) | `$table->timestamps()` |
| Soft delete | `$table->softDeletes()` |
| Foreign key | `$table->foreignId('user_id')->constrained()` |
| Enum | `$table->enum('status', ['draft', 'published', 'archived'])` |
| JSON | `$table->json('metadata')->nullable()` |
| Nomor HP | `$table->string('phone', 20)->nullable()` |

> **Catatan nomor HP:** Selalu pakai `string`, bukan `integer`. Nomor HP bisa diawali `0` atau `+62`, angka tidak bisa menyimpan itu.

---

## 4. Seeder & Factory

### Membuat Seeder

```bash
php artisan make:seeder ProductSeeder
```

Isi `database/seeders/ProductSeeder.php`:

```php
<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name'        => 'Produk Contoh',
            'description' => 'Deskripsi produk pertama',
            'price'       => 50000,
            'is_active'   => true,
        ]);
    }
}
```

Daftarkan di `DatabaseSeeder.php`:

```php
public function run(): void
{
    $this->call([
        ProductSeeder::class,
    ]);
}
```

Jalankan:

```bash
php artisan db:seed
# atau spesifik satu seeder:
php artisan db:seed --class=ProductSeeder
```

---

### Membuat Factory (untuk data dummy massal)

```bash
php artisan make:factory ProductFactory --model=Product
```

Isi `database/factories/ProductFactory.php`:

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'        => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(),
            'price'       => $this->faker->numberBetween(10000, 500000),
            'is_active'   => $this->faker->boolean(80), // 80% kemungkinan true
        ];
    }
}
```

Pakai di Seeder:

```php
// Generate 50 data dummy
Product::factory()->count(50)->create();
```

---

## 5. Menambah Kolom Baru

### ⚠️ Aturan Penting

> **Jangan edit file migration lama yang sudah di-migrate.**
> Selalu buat file migration baru dengan prefix `add_` atau `add_kolom_to_`.

### Perintah

```bash
php artisan make:migration add_phone_to_users_table
```

### Struktur File

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Tambah kolom phone setelah kolom 'name'
            $table->string('phone', 20)->nullable()->after('name');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('phone');
        });
    }
};
```

> **`->after('nama_kolom')`** — opsional tapi bagus untuk menjaga urutan kolom rapi.
> **`->nullable()`** — wajib kalau data lama belum punya value untuk kolom ini. Kalau tidak nullable, migration akan gagal karena row lama tidak punya value.

### Jalankan

```bash
php artisan migrate
```

---

## 6. Menghapus Kolom

### Perintah

```bash
php artisan make:migration remove_email_from_users_table
```

### Struktur File

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('email');
        });
    }

    public function down(): void
    {
        // Kembalikan kolom kalau di-rollback
        Schema::table('users', function (Blueprint $table) {
            $table->string('email')->unique()->after('name');
        });
    }
};
```

### Hapus Beberapa Kolom Sekaligus

```php
$table->dropColumn(['email', 'email_verified_at']);
```

> **Catatan:** Kalau ada index atau unique constraint di kolom tersebut, harus drop index-nya dulu sebelum drop kolom.

```php
// Drop unique index dulu, baru drop kolom
$table->dropUnique(['email']);
$table->dropColumn('email');
```

---

## 7. Mengganti Nama Kolom

```bash
php artisan make:migration rename_phone_number_to_phone_in_users_table
```

```php
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->renameColumn('phone_number', 'phone');
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->renameColumn('phone', 'phone_number');
    });
}
```

---

## 8. Rollback & Fresh Migration

| Perintah | Fungsi |
|---|---|
| `php artisan migrate` | Jalankan migration yang belum dijalankan |
| `php artisan migrate:rollback` | Undo batch migration terakhir |
| `php artisan migrate:rollback --step=3` | Undo 3 batch terakhir |
| `php artisan migrate:reset` | Rollback semua migration |
| `php artisan migrate:fresh` | Drop semua tabel, migrate ulang dari awal |
| `php artisan migrate:fresh --seed` | Fresh + jalankan semua seeder |
| `php artisan migrate:status` | Lihat status tiap migration |

> **⚠️ `migrate:fresh` akan menghapus semua data.** Hanya boleh dipakai di local/development. **Dilarang keras di production.**

---

## 9. Contoh Kasus: Tabel Users — Tambah `phone`, Hapus `email`

Ini skenario nyata: kamu punya tabel `users` default Laravel yang punya kolom `email`, dan sekarang mau:
- ✅ Tambah kolom `phone`
- ❌ Hapus kolom `email` dan `email_verified_at`

### Langkah 1 — Buat migration untuk tambah `phone`

```bash
php artisan make:migration add_phone_to_users_table
```

```php
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('phone', 20)->nullable()->unique()->after('name');
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('phone');
    });
}
```

### Langkah 2 — Buat migration untuk hapus `email`

```bash
php artisan make:migration remove_email_from_users_table
```

```php
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        // Drop unique index email dulu sebelum drop kolom
        $table->dropUnique(['email']);
        $table->dropColumn(['email', 'email_verified_at']);
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('email')->unique()->after('name');
        $table->timestamp('email_verified_at')->nullable()->after('email');
    });
}
```

### Langkah 3 — Update Model `User.php`

Setelah migration, update `$fillable` di Model:

```php
protected $fillable = [
    'name',
    'phone',     // ✅ tambah
    'password',
    // 'email',  // ❌ hapus
];
```

Kalau pakai `$hidden`:

```php
protected $hidden = [
    'password',
    'remember_token',
    // 'email', // ❌ hapus dari hidden juga kalau ada
];
```

### Langkah 4 — Update Seeder (kalau ada)

```php
User::create([
    'name'     => 'Admin',
    'phone'    => '08123456789',   // ✅ pakai phone
    'password' => bcrypt('secret'),
    // 'email' => tidak perlu lagi
]);
```

### Langkah 5 — Jalankan

```bash
php artisan migrate
```

---

## 10. Aturan Penamaan

| Yang dibuat | Format | Contoh |
|---|---|---|
| File migration buat tabel | `create_{nama_tabel}_table` | `create_products_table` |
| File migration tambah kolom | `add_{kolom}_to_{tabel}_table` | `add_phone_to_users_table` |
| File migration hapus kolom | `remove_{kolom}_from_{tabel}_table` | `remove_email_from_users_table` |
| File migration ubah kolom | `change_{kolom}_in_{tabel}_table` | `change_price_in_products_table` |
| File migration rename kolom | `rename_{lama}_to_{baru}_in_{tabel}_table` | `rename_phone_number_to_phone_in_users_table` |
| Nama tabel di database | `snake_case`, plural | `user_profiles`, `order_items` |
| Nama kolom | `snake_case` | `created_at`, `phone_number` |
| Nama Model | `PascalCase`, singular | `UserProfile`, `OrderItem` |
| Nama Seeder | `{Model}Seeder` | `UserSeeder`, `ProductSeeder` |
| Nama Factory | `{Model}Factory` | `UserFactory`, `ProductFactory` |

---

> 📌 **Ingat selalu:** Database migration adalah *sejarah* perubahan skema. Jangan hapus, jangan edit yang lama — cukup tambah yang baru.

---

*Dokumen ini bagian dari NEXUS Rules — TALL Stack Standards*
