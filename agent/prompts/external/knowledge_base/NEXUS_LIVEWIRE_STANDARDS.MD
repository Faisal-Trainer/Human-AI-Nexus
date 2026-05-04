# ⚡ LIVEWIRE & ARCHITECTURE STANDARDS

Dokumen ini mencatat standar penulisan komponen Livewire di dalam ekosistem Nexus untuk memastikan kompatibilitas IDE dan performa maksimal.

---

## 1. Layout Definition
**Masalah**: Penggunaan method chaining `->layout('layouts.app')` pada fungsi `render()` sering menyebabkan *Undefined Method* linting error di beberapa IDE meskipun secara fungsional valid di Livewire 3.

**Standar Nexus**: Gunakan **PHP Attributes** di atas metode `render()` atau di atas deklarasi class untuk mendefinisikan layout.

```php
// ✅ BENAR (Gunakan Attribute)
use Livewire\Attributes\Layout;

#[Layout('layouts.app')]
public function render()
{
    return view('livewire.component');
}

// ❌ HINDARI (Dapat menyebabkan lint error)
public function render()
{
    return view('livewire.component')->layout('layouts.app');
}
```

---

## 2. Mass Assignment Protection
Seluruh model interaksi (Rating, Bookmark, Follow) **WAJIB** menggunakan `$fillable` secara eksplisit. Penggunaan `$guarded = []` sangat dilarang untuk menjaga integritas "Zero Flaws".

---

## 3. Media Protocol (WebP)
Setiap komponen yang menangani unggahan gambar harus menyertakan logic konversi ke **WebP** menggunakan `Intervention/Image` sebelum disimpan ke storage untuk efisiensi bandwidth.

---

## 4. UUID Consistency
Seluruh tabel database menggunakan `UUID` sebagai Primary Key. Jangan pernah menggunakan `id` (integer) untuk entitas yang terekspos ke publik atau entitas yang akan menjadi aset IP.

---
*Last Updated: 2026-04-28 by Nexus Orchestrator.*


--- APPENDED FROM LIVEWIRE_STANDARDS.md ---
# ⚡ LIVEWIRE & ARCHITECTURE STANDARDS

Dokumen ini mencatat standar penulisan komponen Livewire di dalam ekosistem Nexus untuk memastikan kompatibilitas IDE dan performa maksimal.

---

## 1. Layout Definition
**Masalah**: Penggunaan method chaining `->layout('layouts.app')` pada fungsi `render()` sering menyebabkan *Undefined Method* linting error di beberapa IDE meskipun secara fungsional valid di Livewire 3.

**Standar Nexus**: Gunakan **PHP Attributes** di atas metode `render()` atau di atas deklarasi class untuk mendefinisikan layout.

```php
// ✅ BENAR (Gunakan Attribute)
use Livewire\Attributes\Layout;

#[Layout('layouts.app')]
public function render()
{
    return view('livewire.component');
}

// ❌ HINDARI (Dapat menyebabkan lint error)
public function render()
{
    return view('livewire.component')->layout('layouts.app');
}
```

---

## 2. Mass Assignment Protection
Seluruh model interaksi (Rating, Bookmark, Follow) **WAJIB** menggunakan `$fillable` secara eksplisit. Penggunaan `$guarded = []` sangat dilarang untuk menjaga integritas "Zero Flaws".

---

## 3. Media Protocol (WebP)
Setiap komponen yang menangani unggahan gambar harus menyertakan logic konversi ke **WebP** menggunakan `Intervention/Image` sebelum disimpan ke storage untuk efisiensi bandwidth.

---

## 4. UUID Consistency
Seluruh tabel database menggunakan `UUID` sebagai Primary Key. Jangan pernah menggunakan `id` (integer) untuk entitas yang terekspos ke publik atau entitas yang akan menjadi aset IP.

---
*Last Updated: 2026-04-28 by Nexus Orchestrator.*


--- APPENDED FROM LIVEWIRE_STANDARDS.md ---
# ⚡ LIVEWIRE & ARCHITECTURE STANDARDS

Dokumen ini mencatat standar penulisan komponen Livewire di dalam ekosistem Nexus untuk memastikan kompatibilitas IDE dan performa maksimal.

---

## 1. Layout Definition
**Masalah**: Penggunaan method chaining `->layout('layouts.app')` pada fungsi `render()` sering menyebabkan *Undefined Method* linting error di beberapa IDE meskipun secara fungsional valid di Livewire 3.

**Standar Nexus**: Gunakan **PHP Attributes** di atas metode `render()` atau di atas deklarasi class untuk mendefinisikan layout.

```php
// ✅ BENAR (Gunakan Attribute)
use Livewire\Attributes\Layout;

#[Layout('layouts.app')]
public function render()
{
    return view('livewire.component');
}

// ❌ HINDARI (Dapat menyebabkan lint error)
public function render()
{
    return view('livewire.component')->layout('layouts.app');
}
```

---

## 2. Mass Assignment Protection
Seluruh model interaksi (Rating, Bookmark, Follow) **WAJIB** menggunakan `$fillable` secara eksplisit. Penggunaan `$guarded = []` sangat dilarang untuk menjaga integritas "Zero Flaws".

---

## 3. Media Protocol (WebP)
Setiap komponen yang menangani unggahan gambar harus menyertakan logic konversi ke **WebP** menggunakan `Intervention/Image` sebelum disimpan ke storage untuk efisiensi bandwidth.

---

## 4. UUID Consistency
Seluruh tabel database menggunakan `UUID` sebagai Primary Key. Jangan pernah menggunakan `id` (integer) untuk entitas yang terekspos ke publik atau entitas yang akan menjadi aset IP.

---
*Last Updated: 2026-04-28 by Nexus Orchestrator.*
