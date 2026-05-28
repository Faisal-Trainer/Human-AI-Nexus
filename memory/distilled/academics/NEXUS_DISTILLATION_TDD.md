

## 🎓 TDD WISDOM DISTILLATION [v9201] - 28/05/2026
> **Protocol**: Autonomous Intelligence Extraction | **Focus**: Actionable Tech Insights

### 📄 Core implementation
> **Origin**: `ui-ux/NEXUS_CAROUSEL-SNAP-HIGHLIGHTS.MD` | **Distilled At**: 28/05/2026

#### 💡 Content Summary:
> **VERSION**: v5 | **Last Updated**: 28/05/2026

Scroll-state container queries allow you to style elements based on their current scroll state, such as whether an element is "stuck" (via sticky positioning) or "snapped" (via scroll snapping). This enables carousel or gallery experiences where the active item can be visually distinguished without relying on JavaScript intersection observers or scroll event listeners.



To highlight snapped items, you must establish a scroll-snap container, define the snap targets as scroll-state containers, and then query that state to style descendants.


The parent container must have `scroll-snap-type` enabled.

```html
<div class="carousel">
  <div class="carousel-item">
    <div class="card">Product 1 content</div>
  </div>
  <div class="carousel-item">
    <div class="card">Product 2 content</div>
  </div>
</div>
```

```css
.carousel {
  display: flex;
  overflow-x: auto;
  /* MANDATORY: Enable scroll snapping on the container */
  scroll-snap-type: x mandatory;
}
```


Each item in the carousel that should be tracked for snapping must be declared as a `scroll-state` container.

```css
.carousel-item {
  /...

#### 🔗 Traceability:
- [Source Context](NEXUS_CAROUSEL-SNAP-HIGHLIGHTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `ui-ux/NEXUS_COMPLEX-SHAPES.MD` | **Distilled At**: 28/05/2026

#### 🛠 Actionable Steps:
actions from `0` to `1` (like `0.5` for 50%) instead of absolute pixels.

> **Luminance vs. Alpha Masking**: By default, SVG masks use **luminance** (brightness) to determine opacity, where white reveals, black hides, and gray creates semi-transparency. If you want the mask to use the **alpha channel** (transparency) of your SVG shapes instead, you can specify `mask-type: alpha;` in your CSS or `mask-type="alpha"` directly on the SVG `<mask>` element.

```html
<!-- White areas reveal content, gray creates semi-transparency, black or transparent hides it -->
<svg width="0" height="0">
  <defs>
    <!-- objectBoundingBox scales mask coordinates (0 to 1) with the element's size -->
    <mask id="custom-shape" maskContentUnits="objectBoundingBox">
      <!-- Use white shapes to defin

#### 🔗 Traceability:
- [Source Context](NEXUS_COMPLEX-SHAPES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Export HTML content from canvas
> **Origin**: `ui-ux/NEXUS_EXPORT-HTML-MEDIA-FROM-CANVAS.MD` | **Distilled At**: 28/05/2026

#### 🛠 Actionable Steps:
actions frame by frame, for example, for streaming, capture DOM mutations using libraries like `rrweb`. 

Alternatively, implement a warning that HTML media export is not supported in the browser because it doesn't support HTML-in-Canvas.

#### 🔗 Traceability:
- [Source Context](NEXUS_EXPORT-HTML-MEDIA-FROM-CANVAS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Modeling Partial Time Concepts with Temporal
> **Origin**: `ui-ux/NEXUS_MODEL-PARTIAL-TIME-CONCEPTS.MD` | **Distilled At**: 28/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



Modeling date concepts that lack a full calendar date—such as credit card expirations, annual renewals, or daily alarms—has historically been error-prone with the legacy `Date` object. Developers often resort to using arbitrary days (like the 1st of the month) or parsing strings, leading to "day leakage" or incorrect calculations due to leap years and varying month lengths.

The `Temporal` API provides dedicated types for these partial concepts: `Temporal.PlainYearMonth`, `Temporal.PlainMonthDay`, and `Temporal.PlainTime`. These types ensure precision and avoid leaking irrelevant date components.




Use `Temporal.PlainYearMonth` to represent a year and a month.

```javascript
// Create a PlainYearMonth from values
// Use explicit calendar to avoid mismatch issues in polyfill environments
const expiry = Temporal.PlainYearMonth.from({ year: 2027, month: 12, calendar: 'iso8601' });

// Get the current year/month
const currentMonth = Temporal.Now.plainDateISO().toPlainYearMonth();

// Calculate duration until expiry
// largestUnit ensures the difference is expressed in years if applicable
const duration = currentM...

#### 🔗 Traceability:
- [Source Context](NEXUS_MODEL-PARTIAL-TIME-CONCEPTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation Steps
> **Origin**: `ui-ux/NEXUS_PHYSICS-BASED-EASING.MD` | **Distilled At**: 28/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026

Traditional CSS easing functions like `ease-in` or `cubic-bezier()` are limited to simple curves, making it impossible to create complex physics-based effects like bounces or springs. The `linear()` timing function solves this by allowing you to provide a series of stops that can approximate complex curves. Transitions and animations are interpolated based on straight lines between the stops, but within enough stops, it can appear smooth.



1.  **Generate the curve stops:**
    Manually plotting dozens of points for a spring or bounce is impractical. Use a timing function from an external library, or use a  tool to convert an existing JavaScript easing function or an SVG path into the `linear()` syntax. Optional: store these timing functions as CSS custom properties for reuse throughout your site.
2.  **Define the timing function:**
    Apply the generated stops to the `transition-timing-function` or `animation-timing-function` property, or through the `transition` or `animation` shorthands.
3.  **Adjust the duration:**
    Unlike JavaScript physics engines where duration is derived from physical properties (mass, stiffnes...

#### 🔗 Traceability:
- [Source Context](NEXUS_PHYSICS-BASED-EASING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Processes
> **Origin**: `ui-ux/NEXUS_PROCESSES.MD` | **Distilled At**: 28/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 27/05/2026



- [Introduction](#introduction)
- [Invoking Processes](#invoking-processes)
    - [Process Options](#process-options)
    - [Process Output](#process-output)
    - [Pipelines](#process-pipelines)
- [Asynchronous Processes](#asynchronous-processes)
    - [Process IDs and Signals](#process-ids-and-signals)
    - [Asynchronous Process Output](#asynchronous-process-output)
    - [Asynchronous Process Timeouts](#asynchronous-process-timeouts)
- [Concurrent Processes](#concurrent-processes)
    - [Naming Pool Processes](#naming-pool-processes)
    - [Pool Process IDs and Signals](#pool-process-ids-and-signals)
- [Testing](#testing)
    - [Faking Processes](#faking-processes)
    - [Faking Specific Processes](#faking-specific-processes)
    - [Faking Process Sequences](#faking-process-sequences)
    - [Faking Asynchronous Process Lifecycles](#faking-asynchronous-process-lifecycles)
    - [Available Assertions](#available-assertions)
    - [Preventing Stray Processes](#preventing-stray-processes)

<a name="introduction"></a>


Laravel provides an expressive, minimal API around the [Symfony Process component](https://symfony.com/doc/curren...

#### 🔗 Traceability:
- [Source Context](NEXUS_PROCESSES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation Plan: Nexus Core Stabilization & Hygiene
> **Origin**: `ui-ux/NEXUS_STABILIZATION_PLAN.MD` | **Distilled At**: 28/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 26/05/2026



This plan addresses the critical bugs, architectural redundancies, and repository hygiene issues identified during the system audit.


**Goal**: Eliminate duplicate methods, fix undefined variables, and clean up constructor logic.


- [x] **Fix Constructor Redundancy**:
    - Consolidate path assignments for `knowledgePath`, `recordsPath`, `summaryPath`, and `planningPath`.
    - Ensure `resolvePath()` is used consistently.
- [x] **Resolve `this.nexusPath` Bug**:
    - Map `this.nexusPath` to `this.nexusDataPath` or fix the reference to use the correct variable.
- [x] **Deduplicate Methods**:
    - Remove the second definition of `getSemanticTags()` (lines 956-963).
    - Remove the second definition of `globRecursive()` (lines 978-986).
    - Ensure the remaining implementations are robust (handle absolute paths and different OS environments).


**Goal**: Prevent runtime artifacts and temporary scripts from cluttering the repository.


- [x] **Update `.gitignore`**:
    - Add `scratch/` folder.
    - Add session history archives: `knowledge/*_SESSION_HISTORY_ARCHIVE.md`.
    - Add performance artifacts: `memory/distilled/performa...

#### 🔗 Traceability:
- [Source Context](NEXUS_STABILIZATION_PLAN.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Asset Bundling (Vite)
> **Origin**: `ui-ux/NEXUS_VITE.MD` | **Distilled At**: 28/05/2026

#### 💡 Content Summary:
> **VERSION**: v1 | **Last Updated**: 27/05/2026



- [Introduction](#introduction)
- [Installation & Setup](#installation)
  - [Installing Node](#installing-node)
  - [Installing Vite and the Laravel Plugin](#installing-vite-and-laravel-plugin)
  - [Configuring Vite](#configuring-vite)
  - [Loading Your Scripts and Styles](#loading-your-scripts-and-styles)
- [Running Vite](#running-vite)
- [Working With JavaScript](#working-with-scripts)
  - [Aliases](#aliases)
  - [Vue](#vue)
  - [React](#react)
  - [Svelte](#svelte)
  - [Inertia](#inertia)
  - [URL Processing](#url-processing)
- [Working With Stylesheets](#working-with-stylesheets)
- [Working With Blade and Routes](#working-with-blade-and-routes)
  - [Processing Static Assets With Vite](#blade-processing-static-assets)
  - [Refreshing on Save](#blade-refreshing-on-save)
  - [Aliases](#blade-aliases)
- [Asset Prefetching](#asset-prefetching)
- [Custom Base URLs](#custom-base-urls)
- [Environment Variables](#environment-variables)
- [Disabling Vite in Tests](#disabling-vite-in-tests)
- [Server-Side Rendering (SSR)](#ssr)
- [Script and Style Tag Attributes](#script-and-style-attributes)
  - [Content Security Policy (CSP) Nonce](#co...

#### 🔗 Traceability:
- [Source Context](NEXUS_VITE.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, tdd, vcs, laravel]


## 🎓 TDD WISDOM DISTILLATION [v2968] - 28/05/2026
> **Protocol**: Autonomous Intelligence Extraction | **Focus**: Actionable Tech Insights

### 📄 Core implementation
> **Origin**: `ui-ux/NEXUS_CAROUSEL-SNAP-HIGHLIGHTS.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_CAROUSEL-SNAP-HIGHLIGHTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `ui-ux/NEXUS_COMPLEX-SHAPES.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_COMPLEX-SHAPES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Export HTML content from canvas
> **Origin**: `ui-ux/NEXUS_EXPORT-HTML-MEDIA-FROM-CANVAS.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_EXPORT-HTML-MEDIA-FROM-CANVAS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Modeling Partial Time Concepts with Temporal
> **Origin**: `ui-ux/NEXUS_MODEL-PARTIAL-TIME-CONCEPTS.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_MODEL-PARTIAL-TIME-CONCEPTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation Steps
> **Origin**: `ui-ux/NEXUS_PHYSICS-BASED-EASING.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_PHYSICS-BASED-EASING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Processes
> **Origin**: `ui-ux/NEXUS_PROCESSES.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_PROCESSES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation Plan: Nexus Core Stabilization & Hygiene
> **Origin**: `ui-ux/NEXUS_STABILIZATION_PLAN.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_STABILIZATION_PLAN.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Asset Bundling (Vite)
> **Origin**: `ui-ux/NEXUS_VITE.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_VITE.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---


## 🎓 TDD WISDOM DISTILLATION [v5766] - 28/05/2026
> **Protocol**: Autonomous Intelligence Extraction | **Focus**: Actionable Tech Insights

### 📄 Core implementation
> **Origin**: `distilled/ui-ux/NEXUS_CAROUSEL-SNAP-HIGHLIGHTS.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_CAROUSEL-SNAP-HIGHLIGHTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `distilled/ui-ux/NEXUS_COMPLEX-SHAPES.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_COMPLEX-SHAPES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Export HTML content from canvas
> **Origin**: `distilled/ui-ux/NEXUS_EXPORT-HTML-MEDIA-FROM-CANVAS.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_EXPORT-HTML-MEDIA-FROM-CANVAS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Modeling Partial Time Concepts with Temporal
> **Origin**: `distilled/ui-ux/NEXUS_MODEL-PARTIAL-TIME-CONCEPTS.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_MODEL-PARTIAL-TIME-CONCEPTS.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation Steps
> **Origin**: `distilled/ui-ux/NEXUS_PHYSICS-BASED-EASING.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_PHYSICS-BASED-EASING.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Processes
> **Origin**: `distilled/ui-ux/NEXUS_PROCESSES.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_PROCESSES.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation Plan: Nexus Core Stabilization & Hygiene
> **Origin**: `distilled/ui-ux/NEXUS_STABILIZATION_PLAN.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_STABILIZATION_PLAN.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Asset Bundling (Vite)
> **Origin**: `distilled/ui-ux/NEXUS_VITE.MD` | **Distilled At**: 28/05/2026



#### 🔗 Traceability:
- [Source Context](NEXUS_VITE.MD)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
