---
name: NEXUS LORE
colors:
    surface: "#f7f9fb"
    surface-dim: "#d8dadc"
    surface-bright: "#f7f9fb"
    surface-container-lowest: "#ffffff"
    surface-container-low: "#f2f4f6"
    surface-container: "#eceef0"
    surface-container-high: "#e6e8ea"
    surface-container-highest: "#e0e3e5"
    on-surface: "#191c1e"
    on-surface-variant: "#464555"
    inverse-surface: "#2d3133"
    inverse-on-surface: "#eff1f3"
    outline: "#777587"
    outline-variant: "#c7c4d8"
    surface-tint: "#4d44e3"
    primary: "#3525cd"
    on-primary: "#ffffff"
    primary-container: "#4f46e5"
    on-primary-container: "#dad7ff"
    inverse-primary: "#c3c0ff"
    secondary: "#00687a"
    on-secondary: "#ffffff"
    secondary-container: "#57dffe"
    on-secondary-container: "#006172"
    tertiary: "#684000"
    on-tertiary: "#ffffff"
    tertiary-container: "#885500"
    on-tertiary-container: "#ffd4a4"
    error: "#ba1a1a"
    on-error: "#ffffff"
    error-container: "#ffdad6"
    on-error-container: "#93000a"
    primary-fixed: "#e2dfff"
    primary-fixed-dim: "#c3c0ff"
    on-primary-fixed: "#0f0069"
    on-primary-fixed-variant: "#3323cc"
    secondary-fixed: "#acedff"
    secondary-fixed-dim: "#4cd7f6"
    on-secondary-fixed: "#001f26"
    on-secondary-fixed-variant: "#004e5c"
    tertiary-fixed: "#ffddb8"
    tertiary-fixed-dim: "#ffb95f"
    on-tertiary-fixed: "#2a1700"
    on-tertiary-fixed-variant: "#653e00"
    background: "#f7f9fb"
    on-background: "#191c1e"
    surface-variant: "#e0e3e5"
typography:
    display-xl:
        fontFamily: Inter
        fontSize: 48px
        fontWeight: "700"
        lineHeight: 56px
        letterSpacing: -0.02em
    headline-lg:
        fontFamily: Inter
        fontSize: 32px
        fontWeight: "600"
        lineHeight: 40px
        letterSpacing: -0.01em
    headline-md:
        fontFamily: Inter
        fontSize: 24px
        fontWeight: "600"
        lineHeight: 32px
    reading-lg:
        fontFamily: Newsreader
        fontSize: 20px
        fontWeight: "400"
        lineHeight: 34px
    reading-md:
        fontFamily: Newsreader
        fontSize: 18px
        fontWeight: "400"
        lineHeight: 30px
    ui-body:
        fontFamily: Inter
        fontSize: 16px
        fontWeight: "400"
        lineHeight: 24px
    ui-medium:
        fontFamily: Inter
        fontSize: 16px
        fontWeight: "500"
        lineHeight: 24px
    label-sm:
        fontFamily: Inter
        fontSize: 14px
        fontWeight: "500"
        lineHeight: 20px
        letterSpacing: 0.01em
    caption:
        fontFamily: Inter
        fontSize: 12px
        fontWeight: "400"
        lineHeight: 16px
rounded:
    sm: 0.25rem
    DEFAULT: 0.5rem
    md: 0.75rem
    lg: 1rem
    xl: 1.5rem
    full: 9999px
spacing:
    base: 8px
    container-max: 1280px
    gutter: 24px
    margin-mobile: 16px
    stack-xs: 4px
    stack-sm: 12px
    stack-md: 24px
    stack-lg: 48px
---

## Brand & Style

This design system is built for a bridge between creative expression and financial investment. It balances the reliability required by Web3 investors with the expressive freedom sought by storytellers. The aesthetic is categorized as **Corporate / Modern** with subtle **Glassmorphism** and futuristic accents, conveying a sense of high-tech security and visionary potential.

The UI should evoke a sense of "Institutional Innovation"—it feels as stable as a premium banking app but as dynamic as a digital art gallery. Motion should be purposeful and crisp, utilizing swift easing to mirror the efficiency of blockchain technology.

## Colors

The palette is anchored by **Deep Indigo**, a color that symbolizes wisdom and institutional trust. **Cyber Teal** serves as the functional "tech" anchor, used for interactive states and data visualization, creating a high-energy contrast against the primary hue.

**Amber Gold** is reserved strictly for high-value accents: investment calls-to-action, "Golden Chapter" designations, and premium creator statuses. The background architecture uses **Off-White** for maximum clarity in light mode, while the **Dark Mode Slate** provides a low-strain environment for immersive night-time reading and high-stakes trading.

## Typography

This design system employs a dual-font strategy. **Inter** is the workhorse for the interface, chosen for its exceptional legibility in data-heavy environments and its neutral, systematic feel. It handles all navigation, buttons, and dashboard metrics.

For the core product experience—long-form reading—the system switches to **Newsreader**. This typeface introduces a literary, sophisticated atmosphere that honors the craft of writing. The line height for reading levels is intentionally generous (approx 1.6x - 1.7x) to reduce cognitive load during extended sessions.

## Layout & Spacing

The system utilizes a **Fixed Grid** model for desktop views to maintain a professional, organized structure for investors. A 12-column grid with 24px gutters ensures alignment across complex dashboards.

On mobile and reading-specific views, the system shifts to a focused, single-column layout with wide margins (minimum 16px) to prioritize content consumption. Spacing follows an 8px rhythmic scale, ensuring that every element—from the smallest icon to the largest content block—remains proportionally balanced.

## Elevation & Depth

To achieve the "Modern Professional" look, this design system uses **Ambient Shadows** and **Tonal Layers** rather than harsh outlines. Surfaces are elevated using soft, multi-layered shadows with a slight Indigo tint (#4F46E5 at 4-8% opacity) to create a cohesive bond between the element and the background.

In Dark Mode, depth is communicated through surface color lightening (Slate-800 to Slate-700) rather than shadows, maintaining a clean, futuristic aesthetic. Semi-transparent backdrop blurs (20px) are applied to navigation bars and floating modals to create a sense of persistent context.

## Shapes

The shape language is defined by "Soft Tech" geometry. A standard **12px radius** (mapped to Level 2/Rounded) is applied to all primary containers, input fields, and buttons. This specific curvature is sharp enough to appear professional and efficient, but soft enough to remain approachable for the creative community.

Smaller components like Tags or Chips should use a fully rounded (pill) shape to distinguish them from actionable buttons. Interactive icons within buttons should maintain a 4px internal radius to harmonize with the outer container.

## Components

### Buttons

Primary buttons use a solid **Deep Indigo** fill with white text. Secondary buttons utilize a **Cyber Teal** ghost style (border + text) for tech-forward actions. All buttons feature a subtle 2px lift on hover and a 1px inset on click.

### Input Fields

Fields utilize a light gray stroke in light mode and a deep slate stroke in dark mode. Upon focus, the stroke transitions to Cyber Teal with a soft glow effect. The 12px corner radius is strictly maintained.

### Cards & Containers

Cards are the primary vessel for novels and investment portfolios. They feature a white background (light mode) with a soft ambient shadow. In the reading interface, cards for "Next Chapter" use a Cyber Teal gradient border to signal progression.

### Novel Reader

The reader component must be stripped of all non-essential UI. It uses a centered text column (max-width 720px) with Newsreader typography. The background should be slightly off-white (#F8FAFC) to reduce the harsh contrast of pure white, mimicking high-quality paper.

### Investor Dashboard

Data visualizations and "Invest" buttons utilize the Cyber Teal and Amber Gold accents to highlight growth and opportunity areas within a structured Inter-based grid.
