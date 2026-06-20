---
name: blueprint-architect
description: >
  Skill khusus untuk menghasilkan NEXUS_BLUEPRINT.json yang valid, konsisten,
  dan bebas dari "AI slop" (placeholder, relasi terbalik, phantom model).
  Digunakan oleh NexusEngine.blueprintApp() saat fase 0.5 scaffolding.
---

# Blueprint Architect — NEXUS Skill

## 1. TUJUAN

Skill ini memastikan setiap `NEXUS_BLUEPRINT.json` yang dihasilkan oleh
LocalIntelligence **100% konsisten secara internal** sebelum ditulis ke disk.
Blueprint adalah *single source of truth* untuk seluruh pipeline Nexus —
jika blueprint salah, seluruh output (Model, Migration, Controller, Livewire,
Seeder, Factory) akan ikut salah.

---

## 2. FORMAT OUTPUT

Blueprint harus berupa **JSON murni** — tanpa markdown, tanpa komentar,
tanpa teks pengantar. Struktur wajib:

```json
{
  "project_name": "kebab-case-name",
  "models": ["User", "ModelA", "ModelB"],
  "schema": {
    "User": { "name": "string", "email": "string", "password": "string" },
    "ModelA": { "field1": "type", "field2": "type" },
    "ModelB": { "field1": "type", "user_id": "foreignId" }
  },
  "migrations": [
    "create_users_table",
    "create_model_as_table",
    "create_model_bs_table"
  ],
  "livewire_components": ["model-a-list", "model-b-detail"],
  "seeders": ["UserSeeder", "ModelASeeder", "ModelBSeeder"],
  "factories": ["UserFactory", "ModelAFactory", "ModelBFactory"],
  "routes": ["/dashboard", "/model-as", "/model-bs"],
  "pivot_tables": [],
  "relationships": [
    { "model": "User", "type": "hasMany", "target": "ModelA" },
    { "model": "ModelA", "type": "belongsTo", "target": "User" }
  ]
}
```

---

## 3. ATURAN WAJIB (HARD RULES)

Setiap blueprint yang dihasilkan **WAJIB** mematuhi seluruh aturan di bawah.
Jika ada pelanggaran, blueprint HARUS ditolak dan di-regenerate.

### 3.1 — Anti-Placeholder

| ❌ DILARANG | ✅ YANG BENAR |
|---|---|
| `"YourRealModelName"` | `"Product"`, `"Invoice"`, `"Task"` |
| `"create_your_real_tables_table"` | `"create_products_table"` |
| `"your-real-component"` | `"product-list"` |
| `"YourRealModelSeeder"` | `"ProductSeeder"` |
| `"/your-real-route"` | `"/products"` |

**RULE**: Jika string apapun mengandung kata `"your"`, `"real"`,
`"placeholder"`, `"example"`, `"sample"`, `"foo"`, `"bar"`, `"baz"`,
`"test"`, `"dummy"`, `"temp"`, atau `"ModelName1"` — blueprint INVALID.

### 3.2 — Setiap Model WAJIB Punya Schema

Semua model yang terdaftar di `"models"` **WAJIB** memiliki entry di `"schema"`.

```
✅ models: ["User", "Todo"]     → schema: { "User": {...}, "Todo": {...} }
❌ models: ["User", "Contact"]  → schema: { "User": {...} }  ← Contact hilang!
```

### 3.3 — Tidak Boleh Ada Phantom Model

Setiap model yang disebut di `"relationships"` (baik sebagai `"model"` maupun
`"target"`) **WAJIB** ada di array `"models"`.

```
❌ { "model": "Expense", "type": "belongsToMany", "target": "Category" }
   ← "Category" tidak ada di models[] — INVALID
```

### 3.4 — Relationship Harus Simetris dan Benar Arah

Gunakan panduan ini untuk menentukan arah relasi:

| Hubungan Bisnis | Parent (punya `hasMany`) | Child (punya `belongsTo` + kolom `_id`) |
|---|---|---|
| User menulis banyak Post | `User → hasMany → Post` | `Post → belongsTo → User` |
| User punya banyak Todo | `User → hasMany → Todo` | `Todo → belongsTo → User` |
| User punya banyak Expense | `User → hasMany → Expense` | `Expense → belongsTo → User` |

**ATURAN ARAH**:
- Entity yang **memiliki banyak** = `hasMany` (Parent)
- Entity yang **dimiliki oleh satu** = `belongsTo` (Child, harus punya kolom `parent_id`)
- `belongsToMany` hanya boleh digunakan jika **kedua arah** bisa banyak-ke-banyak
  (contoh: Note ↔ Tag). Jika menggunakan `belongsToMany`, entry `"pivot_tables"`
  **WAJIB** diisi.

**LARANGAN KERAS**:
```
❌ User → belongsTo → JournalEntry    ← TERBALIK! User punya banyak journal
❌ ShortenedUrl → hasMany → User       ← TERBALIK! User punya banyak URL
```

### 3.5 — Pivot Table Hanya untuk belongsToMany

Jika semua relationship bertipe `hasMany`/`belongsTo` (one-to-many),
maka `"pivot_tables"` **WAJIB** kosong `[]`.

```
❌ relationships: hasMany/belongsTo  +  pivot_tables: ["user_habit"]  ← INVALID
✅ relationships: hasMany/belongsTo  +  pivot_tables: []              ← VALID
✅ relationships: belongsToMany      +  pivot_tables: ["note_tag"]    ← VALID
```

### 3.6 — Migration Naming Convention

Format migration: `create_{plural_snake_case_model}_table`

| Model | Migration |
|---|---|
| `Todo` | `create_todos_table` |
| `JournalEntry` | `create_journal_entries_table` |
| `ShortenedUrl` | `create_shortened_urls_table` |

### 3.7 — Schema Type Whitelist

Hanya tipe data berikut yang diizinkan dalam schema:

```
string, text, integer, bigInteger, unsignedBigInteger,
float, double, decimal, boolean, date, datetime, timestamp,
time, json, jsonb, uuid, foreignId, foreignUuid, enum(...)
```

**LARANGAN**: Jangan pernah gunakan `"password": "text"` untuk User.
Gunakan `"password": "string"` (karena bcrypt hash = 60 char, cukup string).

### 3.8 — Foreign Key Convention

Child model yang ber-relasi `belongsTo` **WAJIB** memiliki kolom foreign key
di schema-nya. Format: `{parent_snake_case}_id`

```
✅ Todo schema: { "title": "string", "user_id": "foreignId" }
❌ Todo schema: { "title": "string" }  ← missing user_id!
```

### 3.9 — Livewire Component Naming

Format: `kebab-case`, merepresentasikan fitur utama, **bukan** nama model mentah.

```
✅ "todo-list", "expense-tracker", "journal-editor"
❌ "Todo", "user-profile" (tanpa konteks fitur)
```

### 3.10 — Seeder & Factory Parity

Setiap model di `"models"` **WAJIB** punya entry di `"seeders"` DAN `"factories"`.
Format: `{ModelName}Seeder` dan `{ModelName}Factory`.

---

## 4. CHECKLIST VALIDASI (POST-GENERATION)

Setelah blueprint dihasilkan oleh AI, jalankan checklist ini secara berurutan.
Jika **ada satu saja** yang gagal, blueprint DITOLAK.

```
□ 1. Apakah semua string bebas dari kata placeholder?
□ 2. Apakah setiap models[] punya entry di schema{}?
□ 3. Apakah setiap model di relationships[] ada di models[]?
□ 4. Apakah arah hasMany/belongsTo sudah benar (Parent → hasMany, Child → belongsTo)?
□ 5. Apakah pivot_tables[] kosong jika tidak ada belongsToMany?
□ 6. Apakah child model punya kolom foreign key di schema?
□ 7. Apakah jumlah seeders[] == jumlah models[]?
□ 8. Apakah jumlah factories[] == jumlah models[]?
□ 9. Apakah migration names mengikuti konvensi create_{plural}_table?
□ 10. Apakah tipe data schema ada di whitelist?
```

---

## 5. CONTOH BLUEPRINT YANG BENAR

### Contoh: Todo App Realtime

```json
{
  "project_name": "todo-app-realtime",
  "models": ["User", "Todo"],
  "schema": {
    "User": {
      "name": "string",
      "email": "string",
      "password": "string"
    },
    "Todo": {
      "title": "string",
      "description": "text",
      "priority": "integer",
      "is_completed": "boolean",
      "user_id": "foreignId",
      "completed_at": "datetime"
    }
  },
  "migrations": [
    "create_users_table",
    "create_todos_table"
  ],
  "livewire_components": [
    "todo-list",
    "todo-form"
  ],
  "seeders": ["UserSeeder", "TodoSeeder"],
  "factories": ["UserFactory", "TodoFactory"],
  "routes": ["/dashboard", "/todos"],
  "pivot_tables": [],
  "relationships": [
    { "model": "User", "type": "hasMany", "target": "Todo" },
    { "model": "Todo", "type": "belongsTo", "target": "User" }
  ]
}
```

### Contoh: Notes App dengan Tagging (Many-to-Many)

```json
{
  "project_name": "notes-app-tagging",
  "models": ["User", "Note", "Tag"],
  "schema": {
    "User": {
      "name": "string",
      "email": "string",
      "password": "string"
    },
    "Note": {
      "title": "string",
      "content": "text",
      "user_id": "foreignId"
    },
    "Tag": {
      "name": "string",
      "slug": "string"
    }
  },
  "migrations": [
    "create_users_table",
    "create_notes_table",
    "create_tags_table",
    "create_note_tag_table"
  ],
  "livewire_components": [
    "note-editor",
    "note-list",
    "tag-manager"
  ],
  "seeders": ["UserSeeder", "NoteSeeder", "TagSeeder"],
  "factories": ["UserFactory", "NoteFactory", "TagFactory"],
  "routes": ["/dashboard", "/notes", "/tags"],
  "pivot_tables": ["note_tag"],
  "relationships": [
    { "model": "User", "type": "hasMany", "target": "Note" },
    { "model": "Note", "type": "belongsTo", "target": "User" },
    { "model": "Note", "type": "belongsToMany", "target": "Tag", "through": "note_tag" },
    { "model": "Tag", "type": "belongsToMany", "target": "Note", "through": "note_tag" }
  ]
}
```

---

## 6. ANTI-PATTERN LOG (LEARNED FROM REAL FAILURES)

Berikut daftar kesalahan nyata yang pernah terjadi di production dan
**TIDAK BOLEH** terulang:

| Blueprint | Bug | Dampak |
|---|---|---|
| `admin-dashboard-analytics` | Model bernama `"YourRealModelName"` | File literal `YourRealModelName.php` dibuat |
| `url-shortener-app` | `User → belongsTo → ShortenedUrl` | User dianggap "dimiliki" URL, crash di controller |
| `daily-journal` | `User → belongsTo → JournalEntry` | Relasi 180° terbalik, query gagal |
| `expense-tracker` | `Expense → belongsToMany → Category` tanpa Category di models[] | Migration crash, model not found |
| `contact-manager` | Model `Contact` tidak punya schema | Migration kosong, kolom hilang |
| `habit-tracker` | `pivot_tables: ["user_habit"]` pada relasi `hasMany` | Pivot migration dibuat tanpa perlu |
| `bookmark-manager` | `pivot_tables: ["bookmark_user"]` pada relasi `hasMany` | Pivot migration dibuat tanpa perlu |
| `todo-app-realtime` | `"password": "text"` pada User | Password disimpan sebagai TEXT alih-alih STRING |
