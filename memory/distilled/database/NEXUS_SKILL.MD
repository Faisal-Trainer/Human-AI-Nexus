> **VERSION**: v1 | **Last Updated**: 6/13/2026

---
name: tall-blueprint
description: >
  Panduan lengkap membuat blueprint project web app berbasis TALL stack (Laravel + Livewire + Alpine.js + Tailwind CSS).
  Wajib dikonsultasikan setiap kali NEXUS AI menerima permintaan generate project baru, membuat struktur aplikasi,
  atau merancang arsitektur fitur — termasuk ketika user menyebut kata: "project baru", "bikin app", "scaffold",
  "blueprint", "struktur aplikasi", "fitur apa saja", "generate TALL", atau ketika fase planning/architecture
  dimulai. Skill ini mendefinisikan format output blueprint yang harus dihasilkan, urutan kerja agent,
  konvensi penamaan seluruh artefak, dan skema JSON yang wajib dipakai NEXUS saat menyimpan blueprint.
---

# TALL Stack Project Blueprint

> **Target stack**: Laravel 11+ · Livewire 3 · Alpine.js 3 · Tailwind CSS 3  
> **Scope**: Dari permintaan user → blueprint siap eksekusi oleh agent NEXUS

---

## 1. Apa itu Blueprint di NEXUS?

Blueprint adalah **dokumen perencanaan terstruktur** yang menjadi kontrak antara user dan NEXUS sebelum satu baris kode digenerate. Blueprint mencakup:

- Daftar fitur dan modul
- Skema database lengkap (tabel, kolom + tipe detail, relasi)
- Daftar route dengan named route dan middleware
- Daftar Livewire component (full-page dan reusable) beserta layout
- Daftar Filament resource (jika ada panel admin)
- Naming conventions yang akan dipakai
- Urutan eksekusi oleh agent

Blueprint **bukan** kode — blueprint adalah *rencana* yang, jika disetujui user, langsung bisa dieksekusi oleh agent pipeline NEXUS.

---

## 2. JSON Schema Blueprint (Format Wajib)

NEXUS menyimpan blueprint sebagai file `.json`. Berikut adalah **JSON schema** yang harus diikuti — tidak boleh ada field placeholder seperti `"YourRealModelName"` atau `"your-real-route"` di output akhir.

```json
{
  "project_name": "kebab-case-nama-project",
  "description": "Satu kalimat deskripsi aplikasi",
  "stack": {
    "framework": "Laravel 11",
    "livewire": "3.x",
    "alpine": "3.x",
    "tailwind": "3.x",
    "auth": "breeze|jetstream|custom",
    "admin_panel": "filament-v3|none",
    "database": "mysql|sqlite|pgsql"
  },
  "models": [
    {
      "name": "PascalCase",
      "table": "snake_case_plural",
      "soft_deletes": true,
      "extra_columns_on_users": false,
      "schema": {
        "kolom_name": {
          "type": "string|text|integer|bigInteger|boolean|decimal|enum|foreignId|date|timestamp",
          "length": 100,
          "nullable": false,
          "default": null,
          "unique": false,
          "enum_values": [],
          "decimal_precision": [12, 2],
          "foreign_key": {
            "references": "id",
            "on": "nama_tabel"
          }
        }
      },
      "relationships": [
        {
          "type": "hasMany|belongsTo|belongsToMany|hasOne|morphMany",
          "target": "ModelName",
          "pivot_table": "nama_pivot (jika belongsToMany)"
        }
      ]
    }
  ],
  "migrations": [
    {
      "name": "create_nama_tabel_table",
      "type": "create|alter",
      "table": "nama_tabel",
      "note": "Keterangan opsional"
    }
  ],
  "pivot_tables": [
    {
      "name": "alphabetical_snake_case",
      "model_a": "ModelA",
      "model_b": "ModelB",
      "extra_columns": {}
    }
  ],
  "routes": [
    {
      "method": "GET",
      "uri": "/contoh/{param?}",
      "component": "App\\Livewire\\Pages\\Contoh\\Index",
      "name": "contoh.index",
      "middleware": ["auth", "verified"],
      "layout": "components.layouts.app"
    }
  ],
  "livewire_components": [
    {
      "class": "App\\Livewire\\Pages\\Contoh\\Index",
      "type": "full-page|reusable",
      "tag": "livewire:contoh-index (hanya untuk reusable)",
      "blade_view": "livewire/pages/contoh/index",
      "layout": "components.layouts.app",
      "route_name": "contoh.index (hanya untuk full-page)",
      "description": "Deskripsi singkat fungsi component"
    }
  ],
  "filament_resources": [
    {
      "name": "ContohResource",
      "model": "Contoh",
      "panel": "admin",
      "features": ["list", "create", "edit", "delete", "search", "filter"]
    }
  ],
  "seeders": [
    {
      "name": "ContohSeeder",
      "model": "Contoh",
      "count": 10
    }
  ],
  "factories": [
    {
      "name": "ContohFactory",
      "model": "Contoh"
    }
  ],
  "execution_order": [
    "scaffold",
    "install-dependencies",
    "generate-migrations",
    "generate-models",
    "generate-factories",
    "generate-seeders",
    "generate-layouts",
    "generate-auth",
    "generate-livewire-pages",
    "generate-livewire-components",
    "generate-routes",
    "generate-filament-resources",
    "migrate-seed",
    "validate"
  ]
}
```

### Aturan Kritis JSON Schema

**`models`:**
- Model `User` WAJIB ada di array `models`, tapi `extra_columns_on_users: true` berarti buat migration `alter` terpisah — **bukan** `create_users_table` baru.
- Setiap kolom HARUS punya `type` yang spesifik — tidak boleh cuma `"string"` tanpa length untuk kolom yang punya batasan.
- FK kolom wajib isi `foreign_key.on` dengan nama tabel target.

**`migrations`:**
- `create_users_table` TIDAK BOLEH ada di array `migrations`. Laravel sudah membuatnya.
- Jika `User` butuh kolom tambahan, buat entry dengan `"type": "alter"` dan nama `add_fields_to_users_table`.

**`pivot_tables`:**
- Nama pivot harus alphabetical: `note_tag` bukan `tag_note`, `post_user` bukan `user_post`.
- Pivot TIDAK perlu masuk ke array `models`, `seeders`, dan `factories` — kecuali pivot punya kolom extra yang butuh dikelola.

**`routes`:**
- Setiap route WAJIB punya `name` — tidak ada exception.
- `middleware` harus array, tidak boleh string tunggal: `["auth"]` bukan `"auth"`.
- Route admin (Filament) tidak perlu masuk ke array `routes` — Filament generate otomatis.

**`livewire_components`:**
- `type: "full-page"` → wajib isi `route_name`, tidak perlu `tag`.
- `type: "reusable"` → wajib isi `tag`, tidak perlu `route_name`.
- `layout` harus isi dengan path lengkap: `"components.layouts.app"`.

---

## 3. Proses Membuat Blueprint

### Step 1 — Ekstrak Kebutuhan dari Input User

Sebelum menulis blueprint, NEXUS harus mengidentifikasi minimal:

| Info | Cara Ekstrak | Default jika Tidak Disebutkan |
|------|-------------|-------------------------------|
| Nama project | Dari input langsung | `my-app` |
| Jenis aplikasi | Kata kunci: "toko", "blog", "sistem", "platform" | CRUD App |
| Jumlah user role | "admin", "user", "kasir", "guru" | 2 role (admin, user) |
| Fitur utama | Kata benda + kata kerja: "kelola produk", "lihat laporan" | CRUD dasar |
| Perlu admin panel? | Mention "admin", "dashboard admin", "Filament" | Ya (Filament v3) |
| Auth system | "login", "register", "sosial login" | Breeze (email+password) |
| Database preference | "MySQL", "SQLite", "PostgreSQL" | MySQL |

### Step 2 — Buat Struktur Modul

Setiap modul terdiri dari:
- 1 atau lebih tabel database
- 1 atau lebih Livewire full-page component
- Route yang bersesuaian
- (Opsional) Filament resource untuk admin

**Contoh dekomposisi "Aplikasi Blog":**

```
Modul Auth       → tabel: users (alter, bukan create)
Modul Post       → tabel: posts, categories
Modul Comment    → tabel: comments
Modul Tag        → tabel: tags + pivot: post_tag
Modul Dashboard  → (aggregate, tidak butuh tabel sendiri)
Modul Admin      → Filament resources untuk semua tabel di atas
```

### Step 3 — Tentukan Naming Convention

NEXUS **wajib** konsisten dengan konvensi ini di seluruh blueprint:

#### Database
```
Tabel          : snake_case, plural          → posts, blog_categories
Kolom FK       : {singular_model}_id         → user_id, category_id
Pivot table    : alphabetical, snake_case    → category_post, note_tag
Soft delete    : tambah deleted_at           → wajib untuk semua tabel utama
Timestamps     : created_at, updated_at      → selalu ada
```

#### PHP / Laravel
```
Model          : PascalCase, singular        → Post, BlogCategory
Migration      : create_{table}_table        → create_posts_table
Controller     : {Model}Controller           → PostController
Form Request   : {Action}{Model}Request      → StorePostRequest
Policy         : {Model}Policy               → PostPolicy
```

#### Livewire
```
Full-page      : App\Livewire\Pages\{Module}\{Action}  → Pages\Posts\Index
Reusable       : App\Livewire\Components\{Name}         → Components\PostCard
Blade view     : livewire/{kebab-path}                  → livewire/pages/posts/index
```

#### Routes
```
Named route    : {resource}.{action}         → posts.index, posts.show
Admin route    : admin.{resource}.{action}   → admin.posts.index
Route prefix   : /admin                      → admin routes
```

#### Filament
```
Resource       : {Model}Resource             → PostResource
Panel          : admin                       → default panel ID
```

---

## 4. Database Blueprint Rules

### 4.1 Kolom Wajib Setiap Tabel

```php
$table->id();                     // bigIncrements — selalu ada
$table->timestamps();             // created_at + updated_at — selalu ada
$table->softDeletes();            // deleted_at — untuk tabel utama (bukan pivot)
```

### 4.2 Tabel `users` — Tidak Boleh Di-create Ulang

Tabel `users` sudah dibuat oleh Laravel default migration. NEXUS **DILARANG** membuat `create_users_table`. Jika butuh kolom tambahan, entry di `migrations` harus:

```json
{
  "name": "add_profile_fields_to_users_table",
  "type": "alter",
  "table": "users"
}
```

Dan schema tambahannya di model `User` dengan `extra_columns_on_users: true`:

```json
"schema": {
  "phone": { "type": "string", "length": 20, "nullable": true },
  "avatar": { "type": "string", "nullable": true },
  "role": { "type": "enum", "enum_values": ["admin", "user"], "default": "user" }
}
```

### 4.3 Tipe Kolom — Mapping Lengkap

| Kebutuhan | Tipe di JSON | Laravel Migration |
|-----------|-------------|-------------------|
| Nama, judul pendek | `string` + `length` | `string(100)` |
| Konten panjang | `text` | `text()` |
| Angka bulat | `integer` | `integer()` |
| ID/count besar | `bigInteger` | `bigInteger()` |
| Harga/desimal | `decimal` + `decimal_precision: [12,2]` | `decimal(12,2)` |
| Status/enum | `enum` + `enum_values` | `enum(['a','b'])` |
| FK ke tabel lain | `foreignId` + `foreign_key` | `foreignId()->constrained()` |
| True/false | `boolean` | `boolean()->default(false)` |
| Tanggal saja | `date` | `date()` |
| Tanggal + waktu | `timestamp` | `timestamp()->nullable()` |
| Slug/unique string | `string` + `unique: true` | `string()->unique()` |

### 4.4 Enum vs Lookup Table

| Kondisi | Solusi |
|---------|--------|
| Nilai tetap, ≤ 5 opsi, tidak berubah | `enum` kolom |
| Nilai bisa bertambah, dikelola admin | Lookup table (misal: `statuses`) |
| Relasi many-to-many | Pivot table |

### 4.5 Relasi — Aturan Pivot

- Pivot table tidak perlu Model, Factory, atau Seeder — kecuali ada kolom extra.
- Nama pivot: alphabetical dari dua model. `Note + Tag` → `note_tag`, bukan `tag_note`.
- Jika pivot punya kolom extra (misal `quantity` di `order_product`), barulah buat Model `OrderProduct`.

---

## 5. Livewire Component Blueprint Rules

### 5.1 Pola Standar per Modul CRUD

```
Pages\{Module}\Index   ← List + create (via modal) + delete
Pages\{Module}\Show    ← Detail view (jika diperlukan)
Pages\{Module}\Edit    ← Edit form (untuk form kompleks > 5 field)
```

Komponen reusable yang mungkin muncul:
```
Components\{Module}Card        ← Card display
Components\{Module}Form        ← Reusable form (dipakai di Create dan Edit)
Components\Modals\Confirm      ← Konfirmasi hapus
```

### 5.2 Kapan Pakai Modal vs Halaman Baru

| Skenario | Solusi |
|----------|--------|
| Form ≤ 5 field | Modal dalam Index |
| Form > 5 field | Halaman Edit terpisah (`posts.edit`) |
| Multi-step form | Wizard component dengan halaman sendiri |
| Preview detail | Modal atau slide-over |
| Konfirmasi hapus | `wire:confirm` atau modal sederhana |

### 5.3 Layout per Component — Wajib Eksplisit

Setiap component di blueprint WAJIB mencantumkan layout-nya:

| Context | Layout |
|---------|--------|
| Halaman publik / user | `components.layouts.app` |
| Halaman login, register | `components.layouts.guest` |
| Halaman admin custom | `components.layouts.admin` |
| Halaman Filament | Filament handle sendiri |

---

## 6. Filament Blueprint Rules

### 6.1 Kapan Generate Filament Resource

Generate untuk setiap model yang:
- Punya tabel sendiri (bukan pivot)
- Data-nya berubah secara operasional
- Perlu dikelola admin

### 6.2 Features yang Wajib Didefinisikan

Setiap resource di JSON harus isi array `features`:

```json
"features": ["list", "create", "edit", "delete", "search", "filter"]
```

Jika resource read-only (misal log):
```json
"features": ["list", "search", "filter"]
```

---

## 7. Blueprint Validation Checklist

Sebelum JSON blueprint diserahkan ke agent eksekusi, wajib diverifikasi:

**JSON Integrity:**
- [ ] Tidak ada nilai placeholder (`YourRealModelName`, `your-real-route`, `your-real-component`)
- [ ] Semua field wajib terisi (tidak ada `null` di `project_name`, `models[].name`, dll.)
- [ ] JSON valid (tidak ada syntax error)

**Database:**
- [ ] `create_users_table` TIDAK ada di `migrations`
- [ ] Jika `User` butuh kolom extra, ada entry `add_fields_to_users_table` dengan `type: "alter"`
- [ ] Semua tabel punya `id`, `timestamps`, `soft_deletes: true` (kecuali pivot)
- [ ] Semua FK kolom punya `foreign_key.on` terisi
- [ ] Pivot table: nama alphabetical, tidak ada di `models`/`seeders`/`factories` (kecuali ada extra columns)
- [ ] Kolom `type` spesifik — tidak cuma `"string"` tanpa `length` untuk kolom dengan batasan

**Routes:**
- [ ] Setiap route punya `name` terisi
- [ ] `middleware` berupa array `["auth"]`, bukan string `"auth"`
- [ ] Admin routes Filament tidak dimasukkan ke array `routes`

**Livewire:**
- [ ] `type: "full-page"` → `route_name` terisi, `tag` kosong/null
- [ ] `type: "reusable"` → `tag` terisi, `route_name` kosong/null
- [ ] Semua component punya `layout` terisi dengan path lengkap

**Naming:**
- [ ] Model: PascalCase singular
- [ ] Tabel: snake_case plural
- [ ] Route name: `resource.action` pattern
- [ ] Pivot: alphabetical

---

## 8. Contoh Blueprint JSON — Aplikasi "Notes App dengan Tagging"

Ini adalah versi yang benar dari `notes-app-tagging.json` yang pernah digenerate NEXUS (diperbaiki dari versi lama yang bermasalah):

```json
{
  "project_name": "notes-app-tagging",
  "description": "Aplikasi catatan pribadi dengan sistem tagging dan filter berdasarkan tag",
  "stack": {
    "framework": "Laravel 11",
    "livewire": "3.x",
    "alpine": "3.x",
    "tailwind": "3.x",
    "auth": "breeze",
    "admin_panel": "filament-v3",
    "database": "mysql"
  },
  "models": [
    {
      "name": "User",
      "table": "users",
      "soft_deletes": false,
      "extra_columns_on_users": false,
      "schema": {},
      "relationships": [
        { "type": "hasMany", "target": "Note" },
        { "type": "hasMany", "target": "Tag" }
      ]
    },
    {
      "name": "Tag",
      "table": "tags",
      "soft_deletes": false,
      "extra_columns_on_users": false,
      "schema": {
        "user_id": {
          "type": "foreignId",
          "nullable": false,
          "foreign_key": { "references": "id", "on": "users" }
        },
        "name": { "type": "string", "length": 50, "nullable": false }
      },
      "relationships": [
        { "type": "belongsTo", "target": "User" },
        { "type": "belongsToMany", "target": "Note", "pivot_table": "note_tag" }
      ]
    },
    {
      "name": "Note",
      "table": "notes",
      "soft_deletes": true,
      "extra_columns_on_users": false,
      "schema": {
        "user_id": {
          "type": "foreignId",
          "nullable": false,
          "foreign_key": { "references": "id", "on": "users" }
        },
        "title": { "type": "string", "length": 200, "nullable": false },
        "content": { "type": "text", "nullable": false },
        "is_pinned": { "type": "boolean", "default": false, "nullable": false }
      },
      "relationships": [
        { "type": "belongsTo", "target": "User" },
        { "type": "belongsToMany", "target": "Tag", "pivot_table": "note_tag" }
      ]
    }
  ],
  "migrations": [
    { "name": "create_tags_table", "type": "create", "table": "tags" },
    { "name": "create_notes_table", "type": "create", "table": "notes" },
    { "name": "create_note_tag_table", "type": "create", "table": "note_tag" }
  ],
  "pivot_tables": [
    {
      "name": "note_tag",
      "model_a": "Note",
      "model_b": "Tag",
      "extra_columns": {}
    }
  ],
  "routes": [
    {
      "method": "GET", "uri": "/",
      "component": "App\\Livewire\\Pages\\Welcome",
      "name": "home", "middleware": [], "layout": "components.layouts.app"
    },
    {
      "method": "GET", "uri": "/login",
      "component": "App\\Livewire\\Pages\\Auth\\Login",
      "name": "login", "middleware": ["guest"], "layout": "components.layouts.guest"
    },
    {
      "method": "GET", "uri": "/register",
      "component": "App\\Livewire\\Pages\\Auth\\Register",
      "name": "register", "middleware": ["guest"], "layout": "components.layouts.guest"
    },
    {
      "method": "GET", "uri": "/dashboard",
      "component": "App\\Livewire\\Pages\\Dashboard",
      "name": "dashboard", "middleware": ["auth", "verified"], "layout": "components.layouts.app"
    },
    {
      "method": "GET", "uri": "/notes",
      "component": "App\\Livewire\\Pages\\Notes\\Index",
      "name": "notes.index", "middleware": ["auth", "verified"], "layout": "components.layouts.app"
    },
    {
      "method": "GET", "uri": "/notes/{note}",
      "component": "App\\Livewire\\Pages\\Notes\\Show",
      "name": "notes.show", "middleware": ["auth", "verified"], "layout": "components.layouts.app"
    },
    {
      "method": "GET", "uri": "/tags",
      "component": "App\\Livewire\\Pages\\Tags\\Index",
      "name": "tags.index", "middleware": ["auth", "verified"], "layout": "components.layouts.app"
    }
  ],
  "livewire_components": [
    {
      "class": "App\\Livewire\\Pages\\Notes\\Index",
      "type": "full-page",
      "tag": null,
      "blade_view": "livewire/pages/notes/index",
      "layout": "components.layouts.app",
      "route_name": "notes.index",
      "description": "List semua notes user, create via modal, delete, filter by tag"
    },
    {
      "class": "App\\Livewire\\Pages\\Notes\\Show",
      "type": "full-page",
      "tag": null,
      "blade_view": "livewire/pages/notes/show",
      "layout": "components.layouts.app",
      "route_name": "notes.show",
      "description": "Detail satu note, tampil tags"
    },
    {
      "class": "App\\Livewire\\Pages\\Tags\\Index",
      "type": "full-page",
      "tag": null,
      "blade_view": "livewire/pages/tags/index",
      "layout": "components.layouts.app",
      "route_name": "tags.index",
      "description": "Kelola tags milik user, create + edit inline, delete"
    },
    {
      "class": "App\\Livewire\\Components\\NoteCard",
      "type": "reusable",
      "tag": "livewire:note-card",
      "blade_view": "livewire/components/note-card",
      "layout": null,
      "route_name": null,
      "description": "Card preview satu note, dipakai di Notes\\Index"
    },
    {
      "class": "App\\Livewire\\Components\\TagBadge",
      "type": "reusable",
      "tag": "livewire:tag-badge",
      "blade_view": "livewire/components/tag-badge",
      "layout": null,
      "route_name": null,
      "description": "Badge satu tag dengan warna, dipakai di NoteCard dan Notes\\Show"
    }
  ],
  "filament_resources": [
    {
      "name": "NoteResource",
      "model": "Note",
      "panel": "admin",
      "features": ["list", "create", "edit", "delete", "search", "filter"]
    },
    {
      "name": "TagResource",
      "model": "Tag",
      "panel": "admin",
      "features": ["list", "create", "edit", "delete", "search"]
    },
    {
      "name": "UserResource",
      "model": "User",
      "panel": "admin",
      "features": ["list", "edit", "search", "filter"]
    }
  ],
  "seeders": [
    { "name": "UserSeeder", "model": "User", "count": 5 },
    { "name": "TagSeeder", "model": "Tag", "count": 20 },
    { "name": "NoteSeeder", "model": "Note", "count": 50 }
  ],
  "factories": [
    { "name": "UserFactory", "model": "User" },
    { "name": "TagFactory", "model": "Tag" },
    { "name": "NoteFactory", "model": "Note" }
  ],
  "execution_order": [
    "scaffold",
    "install-dependencies",
    "generate-migrations",
    "generate-models",
    "generate-factories",
    "generate-seeders",
    "generate-layouts",
    "generate-auth",
    "generate-livewire-pages",
    "generate-livewire-components",
    "generate-routes",
    "generate-filament-resources",
    "migrate-seed",
    "validate"
  ]
}
```

---

## 9. Aturan Tambahan untuk Agent NEXUS

### Yang BOLEH diasumsikan tanpa tanya ke user:
- Laravel Breeze sebagai auth (kecuali Jetstream eksplisit diminta)
- Filament v3 sebagai admin panel (kecuali user bilang tidak perlu)
- MySQL sebagai database
- Soft deletes untuk semua tabel utama (bukan pivot)
- `is_active` boolean untuk model yang punya tampilan publik (product, post, dll.)
- `is_pinned` / `is_featured` boolean jika ada fitur highlight

### Yang HARUS ditanyakan dulu:
- Berapa role user dan permission masing-masing
- Apakah perlu payment gateway
- Apakah perlu multi-tenancy
- Apakah ada integrasi pihak ketiga (API, webhook)

### Yang TIDAK BOLEH dilakukan:
- Output blueprint dengan nilai placeholder — semua field harus konkret
- Memasukkan `create_users_table` ke array `migrations`
- Membuat model / factory / seeder untuk pivot table yang tidak punya extra columns
- Menamai pivot table non-alphabetical (`tag_note` → salah, `note_tag` → benar)
- Route tanpa `name`
- Middleware sebagai string tunggal, bukan array
- Livewire component tanpa info `layout` dan `type`


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, tdd, laravel, saas, api]
