# Nexus UI/UX Design Standards
> **VERSION**: v1 | **Last Updated**: 26/05/2026



To maintain the "Premium & State of the Art" look across all Nexus projects, adhere to the following design tokens and patterns.

## Color Palette (Glassmorphism & Dark Mode)
- **Primary**: `indigo-600` (`#4F46E5`)
- **Accent**: `purple-600` (`#9333EA`)
- **Success**: `green-500` (`#22C55E`)
- **Danger**: `rose-500` (`#F43F5E`)
- **Surface (Dark)**: `slate-900` (`#0F172A`)
- **Surface (Light)**: `white` (`#FFFFFF`)

## Typography & Grids
- **Headings**: `font-black` (Extra Bold) with `tracking-tight`.
- **Labels**: `font-black uppercase tracking-widest text-[10px]`.
- **Corners**: Minimum `rounded-2xl`, preferred `rounded-[40px]` for cards.
- **Shadows**: Use colored shadows for primary buttons: `shadow-indigo-500/20`.

## Interactive States
- **Hovers**: `hover:scale-[1.02] transition-all duration-300`.
- **Buttons**: `active:scale-95 transition-transform`.
- **Empty States**: Use emojis (`👤`, `🔐`, `⚡`) in large font sizes (e.g., `text-6xl`) inside soft-colored containers.

## TALL Stack Integration
- **Blade Components**: Keep logic inside `@livewire` components; avoid heavy logic in `.blade.php`.
- **Alpine.js**: Use for simple UI toggles (e.g., `x-data="{ show: false }"`).
- **Tailwind**: Strictly use utility classes; avoid custom CSS unless absolutely necessary.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux]
