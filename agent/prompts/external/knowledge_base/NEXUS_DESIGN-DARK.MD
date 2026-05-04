---
name: Lumina Editorial Dark
colors:
    surface: "#13131b"
    surface-dim: "#13131b"
    surface-bright: "#393841"
    surface-container-lowest: "#0d0d15"
    surface-container-low: "#1b1b23"
    surface-container: "#1f1f27"
    surface-container-high: "#292932"
    surface-container-highest: "#34343d"
    on-surface: "#e4e1ed"
    on-surface-variant: "#c7c4d7"
    inverse-surface: "#e4e1ed"
    inverse-on-surface: "#303038"
    outline: "#908fa0"
    outline-variant: "#464554"
    surface-tint: "#c0c1ff"
    primary: "#c0c1ff"
    on-primary: "#1000a9"
    primary-container: "#8083ff"
    on-primary-container: "#0d0096"
    inverse-primary: "#494bd6"
    secondary: "#4cd7f6"
    on-secondary: "#003640"
    secondary-container: "#03b5d3"
    on-secondary-container: "#00424e"
    tertiary: "#ffb783"
    on-tertiary: "#4f2500"
    tertiary-container: "#d97721"
    on-tertiary-container: "#452000"
    error: "#ffb4ab"
    on-error: "#690005"
    error-container: "#93000a"
    on-error-container: "#ffdad6"
    primary-fixed: "#e1e0ff"
    primary-fixed-dim: "#c0c1ff"
    on-primary-fixed: "#07006c"
    on-primary-fixed-variant: "#2f2ebe"
    secondary-fixed: "#acedff"
    secondary-fixed-dim: "#4cd7f6"
    on-secondary-fixed: "#001f26"
    on-secondary-fixed-variant: "#004e5c"
    tertiary-fixed: "#ffdcc5"
    tertiary-fixed-dim: "#ffb783"
    on-tertiary-fixed: "#301400"
    on-tertiary-fixed-variant: "#703700"
    background: "#13131b"
    on-background: "#e4e1ed"
    surface-variant: "#34343d"
typography:
    h1:
        fontFamily: Merriweather
        fontSize: 40px
        fontWeight: "700"
        lineHeight: "1.2"
    h2:
        fontFamily: Merriweather
        fontSize: 32px
        fontWeight: "700"
        lineHeight: "1.3"
    h3:
        fontFamily: Merriweather
        fontSize: 24px
        fontWeight: "600"
        lineHeight: "1.4"
    body-lg:
        fontFamily: Inter
        fontSize: 18px
        fontWeight: "400"
        lineHeight: "1.6"
    body-md:
        fontFamily: Inter
        fontSize: 16px
        fontWeight: "400"
        lineHeight: "1.6"
    label-md:
        fontFamily: Inter
        fontSize: 14px
        fontWeight: "500"
        lineHeight: "1"
        letterSpacing: 0.02em
    caption:
        fontFamily: Inter
        fontSize: 12px
        fontWeight: "400"
        lineHeight: "1.4"
rounded:
    sm: 0.25rem
    DEFAULT: 0.5rem
    md: 0.75rem
    lg: 1rem
    xl: 1.5rem
    full: 9999px
spacing:
    unit: 4px
    xs: 4px
    sm: 8px
    md: 16px
    lg: 24px
    xl: 48px
    container-max: 1280px
    gutter: 24px
---

## Brand & Style

This design system is built for an immersive, long-form reading experience that prioritizes focus and visual comfort in low-light environments. The aesthetic blends **Modern Corporate** reliability with **Glassmorphism** accents to create a sense of depth and digital sophistication.

The target audience consists of avid readers and creators who value a premium, editorial feel. The UI should evoke a sense of "intellectual sanctuary"—calm, authoritative, and frictionless. By utilizing deep slate foundations and vibrant cyber-accents, the system maintains high legibility while feeling cutting-edge and literary.

## Colors

The palette is optimized for dark mode accessibility. The primary Indigo has been shifted to a slightly lighter shade (#6366F1) to ensure it meets WCAG contrast ratios against the dark slate background.

- **Primary (Deep Indigo):** Used for primary actions, active navigation states, and brand highlights.
- **Secondary (Cyber Teal):** Used for secondary interactions, data visualization, and progress indicators.
- **Accent (Amber Gold):** Reserved for high-priority notifications, bookmarks, and "premium" features.
- **Background & Surface:** The base uses a deep Slate-900 for the foundation and Slate-800 for elevated UI elements like cards and sidebars.
- **Typography:** Slate-50 is the standard for high-contrast body text to ensure maximum readability without the harshness of pure white.

## Typography

This design system employs a dual-font strategy to balance editorial tradition with functional clarity.

**Merriweather** is used for all headlines and long-form narrative text. Its classic serif proportions provide the "literary" feel essential for a novel-centric platform. **Inter** is the functional workhorse, used for UI labels, navigation, buttons, and metadata.

For the reading experience, ensure line heights are generous (1.6) to prevent eye fatigue on dark backgrounds.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop experiences to maintain optimal line lengths for reading, while transitioning to a **Fluid Grid** for mobile devices.

A 12-column system is standard, with 24px gutters. Use the 4px base unit to define all padding and margins. Vertical rhythm should prioritize white space (or "dark space") to keep the interface from feeling cluttered, especially in dense content areas like library views or chapter lists.

## Elevation & Depth

Depth is established through **Tonal Layering** and subtle **Glassmorphism**. Rather than relying on heavy shadows, which can appear muddy in dark mode, use background color shifts to indicate elevation.

- **Level 0 (Background):** #0F172A
- **Level 1 (Cards/Surfaces):** #1E293B
- **Level 2 (Modals/Popovers):** #334155 with a 1px border of #475569 at 20% opacity.

For floating headers or navigation bars, use a backdrop blur (12px) with a semi-transparent surface color to maintain context of the content scrolling beneath.

## Shapes

The design system utilizes a consistent **12px border radius** across all primary containers, cards, and buttons. This "Rounded" approach softens the technical feel of the dark palette, making the UI feel more approachable and modern. Smaller elements like chips and checkboxes should maintain a smaller 4px radius to stay visually aligned without appearing overly circular.

## Components

### Buttons

- **Primary:** Solid #6366F1 with Slate-50 text. 12px radius.
- **Secondary:** Outlined with a 1.5px border of #06B6D4.
- **Ghost:** Transparent background with Indigo or Teal text for tertiary actions.

### Inputs

- **Text Fields:** Surface color (#1E293B) with a subtle 1px border of Slate-700. On focus, the border transitions to Cyber Teal with a soft outer glow.

### Cards

- Use the 12px radius. Surfaces are #1E293B. Hover states should slightly lighten the surface or add a thin Indigo top-border to indicate interactivity.

### Reading-Specific Components

- **Progress Bar:** A thin 4px track using #1E293B, with the fill using the Cyber Teal (#06B6D4) gradient.
- **Chapter Navigation:** Clean lists with Inter Medium (14px) and generous 16px vertical padding for easy tapping on mobile.
- **Bookmarks:** Amber Gold (#F59E0B) dog-ear or icon indicators to contrast sharply against the deep slate backgrounds.
