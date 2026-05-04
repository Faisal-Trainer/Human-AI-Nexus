# RECORD: Technical Changes - Tailwind CSS v4 Upgrade

## 1. Dependency Changes
- **Updated**: `tailwindcss` (^3.4.0 -> ^4.0.0)
- **Updated**: `@tailwindcss/vite` (^4.0.0 -> latest stable v4)
- **Removed**: `postcss`, `autoprefixer` (integrated into core v4)

## 2. Configuration Refactor

### `vite.config.js`
- **Before**: Only `laravel-vite-plugin`.
- **After**: Added `@tailwindcss/vite` plugin.
```javascript
import tailwindcss from '@tailwindcss/vite';
// ...
plugins: [
    tailwindcss(),
    laravel({ ... }),
],
```

### `resources/css/app.css`
- **Before**: 
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- **After**:
  ```css
  @import "tailwindcss";
  @theme {
      --font-sans: "Figtree", ...;
  }
  ```

## 3. Legacy Files Removed
- `tailwind.config.js` (Content, Theme, and Plugins moved to CSS or handled automatically by v4).
- `postcss.config.js` (No longer required).

## 4. Impact Analysis
- **Performance**: Faster build times due to native Vite integration.
- **Maintainability**: Configuration is now localized in the CSS file, reducing file scattering.
- **Visuals**: No change in visual output expected as existing design tokens and font families were preserved.

---
**STATUS**: MENUNGGU PERSETUJUAN  
**ACTION**: Approve / Revise / Reject
