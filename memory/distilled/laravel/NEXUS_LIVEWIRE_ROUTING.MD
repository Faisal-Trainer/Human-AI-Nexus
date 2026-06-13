> **VERSION**: v1 | **Last Updated**: 6/13/2026

---
title: "Livewire Route Mapping Rules"
category: "laravel"
date_created: "2026-06-13"
---

# Livewire Route Mapping Rules

## 🛑 THE PROBLEM (HALLUCINATION)
During the sandbox generation phase, the AI frequently creates **Livewire Components** (e.g., `App\Livewire\Dashboard`) but incorrectly sets up the routes in `routes/web.php` to point to non-existent traditional controllers (e.g., `App\Http\Controllers\DashboardController`).

This results in a fatal error during booting and testing:
`Invalid route action: [App\Http\Controllers\DashboardController]`

## ✅ THE RULE
When generating `routes/web.php` for a TALL stack application where UI components are built using **Livewire**, you MUST route directly to the Livewire component class. 

**DO NOT** generate routes pointing to standard HTTP Controllers unless you are explicitly generating that controller file in `app/Http/Controllers/`.

### ❌ Incorrect Pattern (Do Not Do This)
```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController; // This file doesn't exist!

Route::get('/dashboard', DashboardController::class)->name('dashboard');
```

### ✅ Correct Pattern (Full-Page Livewire Component)
```php
use Illuminate\Support\Facades\Route;
use App\Livewire\Dashboard; // Point to the generated Livewire component

Route::get('/dashboard', Dashboard::class)->name('dashboard');
```

## Self-Healing Reminder
If the application fails with `Invalid route action`, verify that the `use` statements in `routes/web.php` map to actual files in the `app/Livewire/` or `app/Http/Controllers/` directory.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, laravel]
