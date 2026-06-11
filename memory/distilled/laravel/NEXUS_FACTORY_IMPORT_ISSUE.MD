> **METADATA (NEXUS SEMANTIC TAGS)**: [laravel, factory, bug, import, ai-hallucination, database-seeding, migrate-fresh-error]

# ⚠️ KNOWN ISSUE: Laravel Factory Missing Import (AI Hallucination)

## 📌 Deskripsi Masalah
Dalam beberapa kasus pembuatan aplikasi Laravel secara otomatis (misalnya saat membangun *sandbox* seperti `url-shortener-app`), proses migrasi database dan *seeding* (`php artisan migrate:fresh --seed`) dapat **gagal dan berhenti di tengah jalan**.

Efek dari kegagalan ini adalah hilangnya tabel-tabel penting seperti `sessions`, yang memicu error saat Laravel diakses melalui browser:
> `SQLSTATE[HY000]: General error: 1 no such table: sessions`

## 🔍 Akar Penyebab (Root Cause)
Setelah dilakukan investigasi log, penyebab utamanya adalah **AI LLM (terutama model berparameter kecil seperti Qwen 3B) sering melupakan *import* (use statement) untuk class bawaan Laravel `Factory` saat melakukan *code generation***.

File yang dihasilkan oleh AI (contoh: `database/factories/UserFactory.php`) sering kali terlihat seperti ini:

```php
<?php

namespace Database\Factories;

use App\Models\User;
// ❌ MISSING: use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory // <--- PHP Error: Class "Database\Factories\Factory" not found
{
    // ...
}
```

Karena `use Illuminate\Database\Eloquent\Factories\Factory;` tidak ada, PHP mendeteksi class tersebut berada di *namespace* yang salah dan mengeluarkan Fatal Error. Error ini terjadi saat `DatabaseSeeder` berjalan, yang pada akhirnya menggagalkan *pipeline* eksekusi `migrate:fresh --seed` milik Nexus.

## 🛠️ Solusi & Pencegahan (Prevention Rule)

### 1. Manual Fix (Untuk Proyek yang Sudah Terlanjur Dibuat)
Buka file `UserFactory.php` (atau file factory lainnya yang bermasalah) di dalam `database/factories/`. Tambahkan baris ini di bagian atas file:
```php
use Illuminate\Database\Eloquent\Factories\Factory;
```
Setelah itu, jalankan ulang:
```bash
php artisan migrate:fresh --seed
```

### 2. Pencegahan Sistemik untuk Nexus (Penting untuk Agent/Distiller)
Saat menginstruksikan atau menyempurnakan *prompt* pembuatan Factory untuk AI, Nexus **HARUS SECARA EKSPLISIT MENEKANKAN ATURAN INI**:

> **Aturan Wajib Laravel Factory:**
> Setiap kali men-generate file Factory (misal `UserFactory.php`), kamu WAJIB menyertakan `use Illuminate\Database\Eloquent\Factories\Factory;` di atas deklarasi class. Jangan pernah mengabaikan import ini!

Aturan ini akan mencegah "halusinasi" dari LLM lokal dan menjaga kestabilan *pipeline database seeding* Nexus Engine.
