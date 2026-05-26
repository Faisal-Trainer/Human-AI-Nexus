# Standard Workflow PBL TALL Stack
> **VERSION**: v2 | **Last Updated**: 26/05/2026



Workflow ini dirancang agar setiap project:

- memiliki struktur engineering yang konsisten,
- scalable,
- mudah direfactor,
- dan membangun habit developer level production.

---

# GLOBAL DEVELOPMENT FLOW

```text
Ide Project
    ↓
Problem Definition
    ↓
Requirement Breakdown
    ↓
Project Setup
    ↓
Install TALL Dependencies
    ↓
Database Design
    ↓
UI/UX Planning
    ↓
Feature Development
    ↓
Testing
    ↓
Refactor
    ↓
Optimization
    ↓
Deployment
    ↓
Documentation
    ↓
Portfolio Publish
```

---

# 1. PROJECT INITIALIZATION

## Create Laravel Project

```bash
composer create-project laravel/laravel project-name
```

atau:

```bash
laravel new project-name
```

---

## Masuk ke Project

```bash
cd project-name
```

---

# 2. INSTALL TALL STACK

# Install Tailwind CSS

## Install dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
```

## Init Tailwind

```bash
npx tailwindcss init -p
```

---

## Configure tailwind.config.js

```js
content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
],
```

---

## Import Tailwind

### resources/css/app.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

# Install Alpine.js

```bash
npm install alpinejs
```

---

## resources/js/app.js

```js
import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.start();
```

---

# Install Livewire

## Livewire v3

```bash
composer require livewire/livewire
```

---

## Publish assets

```bash
php artisan livewire:publish --assets
```

---

# Install Additional Core Packages

## Laravel Debugbar

```bash
composer require barryvdh/laravel-debugbar --dev
```

---

## Laravel Pint

```bash
composer require laravel/pint --dev
```

---

## Laravel IDE Helper

```bash
composer require --dev barryvdh/laravel-ide-helper
```

---

## Spatie Permission

```bash
composer require spatie/laravel-permission
```

---

## Laravel Telescope (optional)

```bash
composer require laravel/telescope --dev
```

---

# Frontend Build

## Install NPM

```bash
npm install
```

---

## Run Vite

```bash
npm run dev
```

---

# 3. ENVIRONMENT SETUP

# Configure .env

## Database

```env
DB_DATABASE=project_db
DB_USERNAME=root
DB_PASSWORD=
```

---

## App URL

```env
APP_URL=http://localhost:8000
```

---

## Queue

```env
QUEUE_CONNECTION=database
```

---

## Cache

```env
CACHE_DRIVER=database
```

---

# Generate App Key

```bash
php artisan key:generate
```

---

# Run Migration

```bash
php artisan migrate
```

---

# 4. PROJECT ARCHITECTURE PLANNING

# Sebelum Coding

WAJIB buat:

## Feature List

Contoh:

```text
- Authentication
- Dashboard
- CRUD Task
- Realtime Notification
- Activity Log
```

---

## Database Schema

Contoh:

```text
users
tasks
task_comments
task_labels
notifications
```

---

## Relationship Mapping

Contoh:

```text
User
 └── hasMany Tasks

Task
 └── belongsTo User
 └── hasMany Comments
```

---

# 5. UI/UX PLANNING

# Wajib Sebelum Coding UI

## Tentukan:

- layout app
- navigation
- component reusable
- responsive behavior
- state interaction

---

# Recommended Structure

```text
resources/views/
    layouts/
    pages/
    components/
```

---

# Livewire Structure

```text
app/Livewire/
    Dashboard/
    Tasks/
    Users/
```

---

# 6. FEATURE DEVELOPMENT FLOW

# Standard Flow

```text
Migration
    ↓
Model
    ↓
Seeder
    ↓
Factory
    ↓
Policy
    ↓
Livewire Component
    ↓
Blade UI
    ↓
Testing
```

---

# Example Development

## Create Model + Migration

```bash
php artisan make:model Task -m
```

---

## Create Livewire Component

```bash
php artisan make:livewire Tasks/Index
```

---

## Create Policy

```bash
php artisan make:policy TaskPolicy --model=Task
```

---

## Create Seeder

```bash
php artisan make:seeder TaskSeeder
```

---

# 7. DEVELOPMENT RULES

# Rule 1 — Jangan Coding Tanpa Scope

Selalu definisikan:

- input
- output
- state
- edge case

---

# Rule 2 — Build MVP Dulu

Jangan:

- terlalu fokus UI
- premature optimization
- micro animation berlebihan

---

# Rule 3 — Refactor Berkala

Setelah feature selesai:

- pecah component
- optimize query
- reusable abstraction

---

# Rule 4 — Gunakan Service Layer

Untuk business logic besar:

```text
app/Services/
```

Contoh:

```text
TaskService.php
PaymentService.php
NotificationService.php
```

---

# 8. TESTING FLOW

# Minimal Testing

## Feature Test

```bash
php artisan make:test TaskTest
```

---

## Jalankan Test

```bash
php artisan test
```

---

# Yang Wajib Dites

- auth
- validation
- permission
- CRUD
- edge case

---

# 9. PERFORMANCE OPTIMIZATION

# Checklist

## Query Optimization

Gunakan:

```php
with()
load()
lazy()
```

---

## Cache

```php
Cache::remember()
```

---

## Queue

Untuk:

- email
- notification
- heavy process

---

## Pagination

```php
paginate()
```

---

## Debounce Input

```html
wire:model.live.debounce.500ms
```

---

# 10. SECURITY CHECKLIST

# Wajib

## Authorization

```php
Gate
Policy
```

---

## Validation

```php
$request->validate()
```

---

## Rate Limiting

```php
ThrottleRequests
```

---

## XSS Protection

Gunakan:

- escaped output
- sanitization

---

## CSRF Protection

Laravel sudah built-in.

---

# 11. REFACTOR PHASE

# Setelah MVP Selesai

## Evaluasi:

- duplicated code
- fat component
- long method
- N+1 query
- reusable UI

---

# Refactor Goal

Dari:

```text
messy app
```

menjadi:

```text
maintainable architecture
```

---

# 12. DEPLOYMENT FLOW

# Production Build

## Build assets

```bash
npm run build
```

---

## Optimize Laravel

```bash
php artisan optimize
```

---

## Queue Worker

```bash
php artisan queue:work
```

---

# Optional Deployment

- VPS
- Forge
- Ploi
- Docker
- Railway
- Laravel Cloud

---

# 13. DOCUMENTATION FLOW

# Wajib Ada

## README.md

Isi:

- project overview
- stack
- installation
- features
- screenshots

---

## Architecture Notes

Contoh:

```text
docs/[architecture.md](../ui-ux/NEXUS_ARCHITECTURE.MD)
```

---

## API Notes

Jika ada API:

```text
docs/api.md
```

---

## Database Diagram

Gunakan:

- dbdiagram.io
- drawSQL

---

# 14. POST PROJECT REVIEW

# Setelah Project Selesai

## Jawab:

### Technical

- bagian tersulit?
- bottleneck?
- scaling issue?

### Product

- UX problem?
- missing feature?
- usability issue?

### Engineering

- apakah code maintainable?
- apakah component reusable?
- apakah architecture scalable?

---

# 15. PORTFOLIO STRUCTURE

# Simpan Semua Project Dengan Struktur

```text
projects/
    01-todo-app
    02-habit-tracker
    03-kanban-board
```

---

# Setiap Project Harus Punya

```text
README.md
screenshots/
docs/
```

---

# GOLDEN RULE PBL

## Jangan Fokus:

- cepat selesai

## Fokus:

- problem solving
- architecture thinking
- maintainability
- scalability
- engineering habit

---

# TARGET OUTCOME

Jika workflow ini dilakukan terus-menerus, kamu akan berkembang dari:

```text
Coder
```

menjadi:

```text
Software Engineer
```

dan akhirnya:

```text
System Architect / SaaS Engineer
```


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, saas, api]
