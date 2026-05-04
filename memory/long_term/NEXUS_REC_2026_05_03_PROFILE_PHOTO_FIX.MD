# RECORD: Technical Changes - Profile Photo Fix

## 1. Configuration Change
- **File**: `.env`
- **Change**: `APP_URL=http://localhost` -> `APP_URL=http://127.0.0.1:8000`
- **Reason**: Jetstream's `profile_photo_url` accessor relies on `Storage::url()`, which uses `APP_URL` to generate absolute paths. Misalignment between `APP_URL` and the actual access address causes resource loading failures (404/Connection Refused).

## 2. Maintenance Action
- Executed `php artisan config:clear` to invalidate any cached configuration that might still point to `localhost`.

## 3. Impact Analysis
- **Fixed**: Broken profile image links.
- **Improved**: System-wide URL generation accuracy (emails, notifications, storage links).

---
**STATUS**: MENUNGGU PERSETUJUAN  
**ACTION**: Approve / Revise / Reject
