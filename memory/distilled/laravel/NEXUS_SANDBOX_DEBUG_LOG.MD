> **VERSION**: v1 | **Last Updated**: 6/13/2026

---
title: "NEXUS Sandbox Hallucination & Debugging Log"
category: "laravel"
date_created: "2026-06-13"
project: "url-shortener-app"
---

# 🐞 NEXUS Sandbox Debugging Report
**Project:** URL Shortener App (TALL Stack)
**Context:** This document serves as a distilled memory of common AI hallucinations and bugs encountered during the `nexus sandbox` generation phase using the local LLM (Qwen 2.5 Coder 3B). 

---

## 1. 🔀 Route Mapping Hallucination
* **Error:** `Invalid route action: [App\Http\Controllers\DashboardController]`
* **Cause:** The AI generated full-page Livewire components (`ShortUrlList` and `ShortUrlCreate`) but wired `routes/web.php` to point to traditional Laravel Controllers that were never created.
* **Fix Applied:** Modified `routes/web.php` to route directly to the Livewire classes. Also added a default `/` route mapping to the `welcome.blade.php` view to prevent `404 Not Found`.

## 2. 📦 Missing Core Dependencies
* **Error:** `Class "Livewire\Component" not found` & `'vite' is not recognized`
* **Cause:** The AI failed to register `livewire/livewire` in `composer.json` and `npm install` was never executed to build the Node modules.
* **Fix Applied:** Manually ran `composer require livewire/livewire` and `npm install` in the background. *(Recommendation for future: implement a template/stub system to bypass offline constraints).*

## 3. 🗄️ Broken Database Migrations
* **Error:** `General error: 1 no such table: sessions` & `table users has no column named email_verified_at`
* **Cause:** The AI completely overwrote the default Laravel 11 `create_users_table` migration. In doing so, it missed adding the `email_verified_at` column, `remember_token`, and entirely forgot the `sessions` table (which is required since `SESSION_DRIVER=database` in Laravel 11).
* **Fix Applied:** Rewrote the `users` migration to standard Laravel 11 boilerplate (including the `password_reset_tokens` and `sessions` schema) and re-ran `php artisan migrate:fresh --seed`.

## 4. 🔠 Naming Convention Mismatch (Model vs Migration)
* **Error:** `no such table: short_u_r_ls`
* **Cause:** The AI attempted to be overly explicit in the `ShortURL` model by defining `protected $table = 'short_u_r_ls';`. It strictly snake-cased "URL" into `u_r_l`, causing a mismatch because the migration generated a table simply named `short_urls`.
* **Fix Applied:** Corrected the model property to `protected $table = 'short_urls';`.

## 5. 🌀 Infinite Recursive Loop (Memory Exhausted)
* **Error:** `PHP Fatal error: Allowed memory size of 1073741824 bytes exhausted` (1GB RAM limit reached).
* **Cause:** The AI generated the `short-url-list.blade.php` Livewire view but populated it with a single line: `<livewire:short-url-list />`. When rendered, the component endlessly called itself, triggering an infinite loop that crashed the PHP server.
* **Fix Applied:** Disassembled the recursive call and replaced it with a proper HTML table traversing `$shortUrlList` to display the database entries.

---
*End of Report.* 
**Status:** All critical generation bugs resolved. The application now serves correctly on port 8000.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, laravel]
