# Incident Recap & Technical Debt Log - 2026-05-04

This document serves as a record of UI/UX regressions and technical errors encountered during the modernizing of the NexusLore authentication and profile interfaces. These notes are critical for preventing recurrence in future development phases.

## 1. Tailwind v4 Design Token Collision
- **Error**: Named a custom spacing variable `--spacing-xl`.
- **Consequence**: Tailwind v4 uses a CSS variable-first engine. By defining `--spacing-xl` in the `@theme` block, it globally overrode the value used by `max-w-xl`. This caused the profile container to shrink to **3.5rem (56px)**, making the UI look like a thin vertical line where every word occupied its own row.
- **Correction**: All custom project tokens must use a prefix (e.g., `n-` for Nexus). The token is now `--spacing-n-xl`.

## 2. Automated Script Regressions (Regex Fail)
- **Error**: Used a PowerShell script to bulk-rename classes that resulted in corrupted naming patterns like `m-n-md` when it should have been `m-4` or similar if it wasn't a custom token.
- **Consequence**: Layouts broke because Tailwind could not parse the corrupted class names.
- **Correction**: Always perform a "dry run" with regex and manually verify complex component wrappers like `form-section` before committing.

## 3. Livewire DOM Misplacement
- **Error**: Moved `@livewire('navigation-menu')` outside of the primary `min-h-screen` wrapper in `app.blade.php`.
- **Consequence**: Livewire v3 requires components to be rendered within a stable root for proper hydration. Moving it outside caused the navigation to "teleport" or render below the content area during state updates.
- **Correction**: Keep navigation within the main layout wrapper and use `sticky top-0` for visual persistence.

## 4. Blade Template Syntax Error (The "Ghost" Nav)
- **Error**: Left a duplicate `<x-slot name="content">` tag in `logout-other-browser-sessions-form.blade.php`.
- **Consequence**: This created an unclosed slot state that broke the entire DOM tree following the component. This is why the Navigation Bar suddenly appeared at the bottom of the page or between sections—it was being sucked into the broken HTML hierarchy.
- **Correction**: Always audit Blade slots when UI elements appear in impossible locations.

## 5. Mobile Responsiveness (360px)
- **Error**: Used static `grid-cols-6` in forms without responsive prefixes.
- **Consequence**: On a 360px screen, the form tried to maintain 6 columns, making inputs practically invisible.
- **Correction**: Use `grid-cols-1 sm:grid-cols-6`. Default to single column (stacking) for mobile-first integrity.

---
*Documented by Antigravity AI Assistant.*
