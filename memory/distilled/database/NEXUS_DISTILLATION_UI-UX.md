

## 🎓 UI-UX WISDOM DISTILLATION [v1109] - 26/05/2026
> **Protocol**: Autonomous Intelligence Extraction | **Focus**: Actionable Tech Insights

### 📄 Sandbox UI/UX Distilled Findings
> **Origin**: `ui-ux/NEXUS_SANDBOX_UI_FINDINGS.md` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
> **VERSION**: v4 | **Last Updated**: 26/05/2026



**Date**: 2026-05-23
**Context**: NEXUS Sandbox Section 1 generated 11 TALL Stack web applications, all of which failed the UX/UI quality check. The resulting applications were merely default Laravel boilerplate pages with haphazardly injected Livewire components.


1. **Broken Boilerplate**: Agen tidak menghapus halaman dokumentasi bawaan Laravel (`welcome.blade.php` dengan link ke Laracasts/Laravel News). Hal ini membuat aplikasi terlihat seperti *scaffold* awal, bukan produk akhir (MVP).
2. **Missing Application Shell**: Tidak ada satupun aplikasi yang menggunakan struktur `layouts/app.blade.php`. Akibatnya, aplikasi tidak memiliki *navbar*, *footer*, navigasi, atau kerangka UI (Shell) yang layak.
3. **Mangled HTML Injection**: Karena struktur HTML yang kacau, injeksi tag `<livewire:...>` malah merusak *tag* `<body>` dan `<div>`.


Untuk generasi kode selanjutnya (terutama agen `ux-engineer` dan `pipeline-architect`), **patuhi aturan ketat berikut**:

1. **Wajib Hapus Boilerplate**: Setiap kali membuat aplikasi baru, halaman bawaan `welcome.blade.php` **HARUS DIHAPUS TOTAL** isinya dan diganti dengan desain halaman depan/Dashbo...

#### 🔗 Traceability:
- [Source Context](NEXUS_SANDBOX_UI_FINDINGS.md)
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation
> **Origin**: `guides/user-experience/[animate-to-from-top-layer.md](../ui-ux/NEXUS_ANIMATE-TO-FROM-TOP-LAYER.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Elements that render in the "top layer" (like `<dialog>`, elements with the `popover` attribute, or tooltips) have historically been difficult to animate because they toggle between `display: none` and a visible state. Modern CSS provides `@starting-style`, `transition-behavior: allow-discrete`, and the `overlay` property to enable smooth entry and exit transitions for these elements. Note that native CSS nesting is used in the examples below.





To animate the `display` property, you must set `transition-behavior: allow-discrete`. This allows the element to remain visible during its exit transition. If using transition shorthands, be sure to place the `transition-behavior: allow-discrete` afterwards to prevent the shorthand from negating it.



When an element moves in or out of the top layer, it must transition the `overlay` property. This ensures the element stays in the top layer for the duration of the animation, preventing it from being clipped by other elements or the viewport prematurely.



Use the `@starting-style` at-rule to define the styles an element should transition *from* when it is first rendered or its `display` changes from `none`.



The `::...

#### 🔗 Traceability:
- [Source Context]([animate-to-from-top-layer.md](../ui-ux/NEXUS_ANIMATE-TO-FROM-TOP-LAYER.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Animate to Intrinsic Sizes
> **Origin**: `guides/user-experience/[animate-to-intrinsic-sizes.md](../ui-ux/NEXUS_ANIMATE-TO-INTRINSIC-SIZES.MD)` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action (e.g., `:hover` or a state class).
4.  **Perform calculations (Optional)**: Use `calc-size()` if you need to perform math on an intrinsic size (e.g., `auto + 2rem`). `calc-size()` also supports the `any` keyword for basis-agnostic calculations.

#### 🔗 Traceability:
- [Source Context]([animate-to-intrinsic-sizes.md](../ui-ux/NEXUS_ANIMATE-TO-INTRINSIC-SIZES.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Apply WebGL shaders to HTML content
> **Origin**: `guides/user-experience/[apply-webgl-shaders.md](../ui-ux/NEXUS_APPLY-WEBGL-SHADERS.MD)` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
Action</button>
  </div>
</canvas>

<script>
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");
  const uiElement = document.getElementById("ui-element");

  // Setup WebGL texture...
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  canvas.onpaint = () => {
    // 1. Update texture with HTML content
    if (gl.texElementImage2D) {
      gl.texElementImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        uiElement,
      );
    }

    // ... Render your 3D scene here, calculating htmlElementMVP matrix ...

    // 2. Sync DOM position with 3D scene
    if (canvas.getElementTransform) {
      const mvpDOM = new DOMMatrix(Array.from(h

#### 🔗 Traceability:
- [Source Context]([apply-webgl-shaders.md](../ui-ux/NEXUS_APPLY-WEBGL-SHADERS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Core implementation
> **Origin**: `guides/user-experience/[carousel-snap-highlights.md](../ui-ux/NEXUS_CAROUSEL-SNAP-HIGHLIGHTS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
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
  /* Define where the item snaps within the container...

#### 🔗 Traceability:
- [Source Context]([carousel-snap-highlights.md](../ui-ux/NEXUS_CAROUSEL-SNAP-HIGHLIGHTS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementing state-based container styling
> **Origin**: `guides/user-experience/[child-state-based-styling.md](../ui-ux/NEXUS_CHILD-STATE-BASED-STYLING.MD)` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
actions, such as a localized theme toggle reacting to a checkbox (`:checked`), a form group highlighting an error (`:invalid`), or a card elevating when a child link is focused (`:focus-within`).

#### 🔗 Traceability:
- [Source Context]([child-state-based-styling.md](../ui-ux/NEXUS_CHILD-STATE-BASED-STYLING.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `guides/user-experience/[complex-shapes.md](../ui-ux/NEXUS_COMPLEX-SHAPES.MD)` | **Distilled At**: 26/05/2026

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
- [Source Context]([complex-shapes.md](../ui-ux/NEXUS_COMPLEX-SHAPES.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Component-specific light/dark themes
> **Origin**: `guides/user-experience/[component-specific-light-dark-theme.md](../ui-ux/NEXUS_COMPONENT-SPECIFIC-LIGHT-DARK-THEME.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
While more commonly set on the root, the `color-scheme` property can be set on individual elements to force them into a different color scheme from the rest of the page.
This can be useful for components that must always be viewed in a specific color scheme (e.g. always in dark or light mode).

Example use cases include:
- Elements that are often in dark mode even on light mode pages for aesthetic reasons, e.g. code blocks, media players, photo galleries
- Areas that contain media designed for a light background (e.g. images, videos, illustrations, print previews) can be set to light mode even if the rest of the page is in dark mode.
- Elements whose color-scheme is controlled by a user-level setting, such as component previews
- Embeds that don't support both light and dark modes
- Design tools, maps, visualizations, games etc.



Not every element that uses lighter text on darker background in light mode or darker text on lighter background in dark mode needs a different `color-scheme`.
For example, a primary button may be rendered as blue with white text in light mode, but that does not warrant a `color-scheme: dark`.

As a rule of thumb, typically elements using ...

#### 🔗 Traceability:
- [Source Context]([component-specific-light-dark-theme.md](../ui-ux/NEXUS_COMPONENT-SPECIFIC-LIGHT-DARK-THEME.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Consistent Cross-Document Transitions
> **Origin**: `guides/user-experience/[consistent-cross-document-transitions.md](../ui-ux/NEXUS_CONSISTENT-[CROSS-DOCUMENT-TRANSITIONS.MD](../other/NEXUS_CROSS-DOCUMENT-TRANSITIONS.MD))` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Cross-document view transitions animate elements between two pages during a same-origin navigation. The browser captures a snapshot of the old page, navigates, then animates from the snapshot to the new page. If the new page has not finished loading critical resources — stylesheets, layout scripts, or key DOM elements — the transition animates to an incomplete or unstyled state. This causes visual glitches such as elements morphing to wrong positions, content reflowing mid-animation, or fallback fonts flashing to web fonts after the transition completes.



Use `blocking="render"` on critical `<link>` and `<script>` elements in the new page's `<head>`, and use `<link rel="expect">` to block rendering until specific DOM elements have been parsed. This ensures the browser does not begin the view transition animation until the new page's visual state is stable. The browser continues parsing the HTML in the background — only painting is deferred.



1. **MANDATORY:** Opt in to cross-document view transitions with the `@view-transition` CSS at-rule on both pages.
2. **MANDATORY:** Ensure critical stylesheets are in the `<head>`. Stylesheets in the `<head>` are render-blocking b...

#### 🔗 Traceability:
- [Source Context]([consistent-cross-document-transitions.md](../ui-ux/NEXUS_CONSISTENT-[CROSS-DOCUMENT-TRANSITIONS.MD](../other/NEXUS_CROSS-DOCUMENT-TRANSITIONS.MD)))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementing content-based container styling
> **Origin**: `guides/user-experience/[content-based-styling.md](../ui-ux/NEXUS_CONTENT-BASED-STYLING.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Historically, applying different layouts to a component based on its content required either JavaScript or conditional logic in your HTML templating language to inject modifier classes (like `.card--has-image` or `.card--text-only`).

The `:has()` pseudo-class eliminates this need by acting as a parent selector. It allows you to conditionally style a container element based on the presence or absence of specific descendant elements.

Using `:has()`, you can easily define distinct layout variations entirely in CSS based on a component's actual DOM content. You can also optionally combine it with `:not()` to explicitly target the *absence* of content to define default layouts.



**MANDATORY**: You must use the `:has()` selector on the container element to detect the presence of specific child content.

To build a component that changes its layout based on its content:

1. **Define the default styling**: Apply the base layout styles to the container element (e.g., a simple single-column stack).
2. **Apply content-based overrides**: Target the container with `:has([child-selector])` and apply the new layout styles for when that content is present (e.g., a multi-column gri...

#### 🔗 Traceability:
- [Source Context]([content-based-styling.md](../ui-ux/NEXUS_CONTENT-BASED-STYLING.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `guides/user-experience/[declarative-dialog-popover-control.md](../ui-ux/NEXUS_DECLARATIVE-DIALOG-POPOVER-CONTROL.MD)` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action) attributes to a `<button>`, the browser automatically handles open/close state changes, focus management, and accessibility bindings (such as `aria-expanded`). This declarative approach is recommended because it removes brittle boilerplate code, ensures interactions are functional immediately upon HTML parsing, and guarantees a robust, natively accessible user experience.

#### 🔗 Traceability:
- [Source Context]([declarative-dialog-popover-control.md](../ui-ux/NEXUS_DECLARATIVE-DIALOG-POPOVER-CONTROL.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation Steps
> **Origin**: `guides/user-experience/[directional-navigation-transitions.md](../ui-ux/NEXUS_DIRECTIONAL-NAVIGATION-TRANSITIONS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Single Page Applications (SPAs) provide the appearance of navigation by replacing the content of the page without navigating to a new page. By default, the content is simply replaced, without any transitions. Directional transitions can visually reinforce a spatial relationship between views. 

By sliding new content in from the direction the user is moving you create a mental map of the application structure. For instance, a product site may show a transition to the right for "forward," and to the left for "back", or a slideshow may transition up and down to show next and previous slides.



1. **Detect Navigation Direction**: Determine if the user is moving "forward" or "backward" in the application flow. How you detect the direction depends on your use case.
2. **Trigger Transition with Types**: Pass the direction in a `types` array to `document.startViewTransition()` to categorize the transition.
3. **Define Directional Animations with CSS**: Use the `:active-view-transition-type()` pseudo-class to apply specific animations based on the navigation type.



Define sliding animations to and from each direction. For best performance, animate position changes using the ...

#### 🔗 Traceability:
- [Source Context]([directional-navigation-transitions.md](../ui-ux/NEXUS_DIRECTIONAL-NAVIGATION-TRANSITIONS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Export HTML content from canvas
> **Origin**: `guides/user-experience/[export-html-media-from-canvas.md](../ui-ux/NEXUS_EXPORT-HTML-MEDIA-FROM-CANVAS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Web applications frequently need to capture and export rich HTML content—such as customized dashboards, styled documents, or interactive charts—as static images or video recordings. Historically, achieving this required bulky third-party libraries that manually parse DOM nodes and CSS properties to reconstruct a visual facsimile on a canvas. This approach is computationally expensive, error-prone, and frequently fails to support modern CSS layout features. With the HTML-in-Canvas API, developers can render real DOM elements directly into the canvas context. Because the browser's native rendering engine paints the HTML subtree with pixel-perfect accuracy, capturing the exact visual output as an image or video stream is highly efficient using built-in canvas methods like `toDataURL()`, `toBlob()`, or `captureStream()`.



1. Check if HTML-in-Canvas is supported in the browser:

```
if ('requestPaint' in HTMLCanvasElement.prototype) {
  // Use HTML in Canvas API
} else {
  // Use fallback strategy
}
```

2. Initialize the canvas to support rendering of descendant HTML elements by adding the `layoutsubtree` attribute to the `<canvas>` HTML element. Place your HTML content...

#### 🔗 Traceability:
- [Source Context]([export-html-media-from-canvas.md](../ui-ux/NEXUS_EXPORT-HTML-MEDIA-FROM-CANVAS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `guides/user-experience/[fluid-scaling.md](../ui-ux/NEXUS_FLUID-SCALING.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Fluid scaling allows components to adjust their internal proportions (like font sizes and spacing) based on their current dimensions. This creates a more cohesive design than jumping between fixed breakpoints.

While fluid scaling was historically achieved using viewport units (scaling based on the screen size), modern container query units allow components to scale relative to their parent container instead. This ensures components look good regardless of where they are placed in a layout, promoting better component isolation and reusability.





To use container query units, you must first define a containment context on a parent element.

```css
.component-wrapper {
  /* Define the container type. Use 'inline-size' for width-based scaling. */
  /* You can also use 'size' for both width and height, but it requires explicit sizing. */
  container-type: inline-size;
  
  /* Optional: Name the container for specific targeting */
  container-name: fluid-card;
}
```



Use container query units (`cqi`, `cqb`, etc.) to set sizes relative to the container's dimensions.

*   `cqi`: 1% of the container's inline size (width in horizontal writing modes).
*   `cqb`...

#### 🔗 Traceability:
- [Source Context]([fluid-scaling.md](../ui-ux/NEXUS_FLUID-SCALING.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation steps
> **Origin**: `guides/user-experience/[group-element-transitions.md](../ui-ux/NEXUS_GROUP-ELEMENT-TRANSITIONS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
As items are added or removed from a list, or rearranged, transitions can help users maintain context. View transitions provide a way to transition between two states of an element by giving the element a unique `view-transition-name`. When multiple elements on a page share the same transition behavior, `view-transition-class` allows you to define that logic once in CSS rather than repeating it for every unique `view-transition-name`. This keeps your stylesheets maintainable while ensuring consistent animations across a group of elements.



1. **Assign unique names and a shared class**

Each element that needs to be tracked individually during a transition must have a unique `view-transition-name`.

```html
<!-- Mandatory: Each element must have a unique view-transition-name -->
<li style="view-transition-name: item-1" class="item">Item 1</li>
<li style="view-transition-name: item-2" class="item">Item 2</li>
```

To apply shared styles, also assign a `view-transition-class`.

```css
.item {
  view-transition-class: list-item;
}
```

2. **Define the shared transition logic**
   
Use the `::view-transition-group()` pseudo-element with the class selector to ap...

#### 🔗 Traceability:
- [Source Context]([group-element-transitions.md](../ui-ux/NEXUS_GROUP-ELEMENT-TRANSITIONS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Improve Text Layout and Legibility
> **Origin**: `guides/user-experience/[improve-text-layout-and-legibility.md](../ui-ux/NEXUS_IMPROVE-TEXT-LAYOUT-AND-LEGIBILITY.MD)` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action with Width:** `text-wrap: balance` does not change the container's width (`inline-size`). It only affects how text wraps *within* that width. This can leave empty space at the end of the container, which may affect layouts relying on full-width text blocks.

#### 🔗 Traceability:
- [Source Context]([improve-text-layout-and-legibility.md](../ui-ux/NEXUS_IMPROVE-TEXT-LAYOUT-AND-LEGIBILITY.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Key Implementation Details
> **Origin**: `guides/user-experience/[individual-transform-properties.md](../ui-ux/NEXUS_INDIVIDUAL-TRANSFORM-PROPERTIES.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
The `transform` property allows you to apply multiple transformations in a specified order, but any changes to a single transformation require re-specifying the entire transformation chain. This makes it tricky to animate or transition a single transformation.

The individual CSS transform properties (`translate`, `rotate`, and `scale`) allow you to apply transformations independently of the `transform` property. This approach makes it simpler to override a single transformation, for instance on `:hover`.



Individual transform properties are always applied in a **fixed order**, regardless of their order in your CSS:
1. `translate`
2. `rotate`
3. `scale`
4. `transform` (applied last)

If you require a different order (e.g., scaling *before* rotating), you must continue using the `transform` property functions.

Transform functions do not override the individual transform properties. In other words, `scale: 2; transform: scale(3);` will first scale by 2x, then again by 3x, for a total of 6x.



The `transform` property and individual transform properties impact the layout and rendering of the page and may cause unexpected behavior with the z-index or anchor positi...

#### 🔗 Traceability:
- [Source Context]([individual-transform-properties.md](../ui-ux/NEXUS_INDIVIDUAL-TRANSFORM-PROPERTIES.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Enable interactive HTML content in 3D scenes
> **Origin**: `guides/user-experience/[interactive-content-in-3d-scenes.md](../ui-ux/NEXUS_INTERACTIVE-CONTENT-IN-3D-SCENES.MD)` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
Action</button>
  </div>
</canvas>

<script>
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");
  const uiElement = document.getElementById("ui-element");

  // Setup WebGL texture...
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  canvas.onpaint = () => {
    // 1. Update texture with HTML content
    if (gl.texElementImage2D) {
      gl.texElementImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        uiElement,
      );
    }

    // ... Render your 3D scene here, calculating htmlElementMVP matrix ...

    // 2. Sync DOM position with 3D scene
    if (canvas.getElementTransform) {
      const mvpDOM = new DOMMatrix(Array.from(h

#### 🔗 Traceability:
- [Source Context]([interactive-content-in-3d-scenes.md](../ui-ux/NEXUS_INTERACTIVE-CONTENT-IN-3D-SCENES.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation
> **Origin**: `guides/user-experience/[interactive-content-reveal.md](../ui-ux/NEXUS_INTERACTIVE-CONTENT-REVEAL.MD)` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action */
.reveal-layer:hover {
  --inner-size: 100px;
  --outer-size: 120px;
}  
```

#### 🔗 Traceability:
- [Source Context]([interactive-content-reveal.md](../ui-ux/NEXUS_INTERACTIVE-CONTENT-REVEAL.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Show a tooltip when hovering
> **Origin**: `guides/user-experience/[interest-triggered-tooltips.md](../ui-ux/NEXUS_INTEREST-TRIGGERED-TOOLTIPS.MD)` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action an icon-only button will take, or provide additional form field guidance.

#### 🔗 Traceability:
- [Source Context]([interest-triggered-tooltips.md](../ui-ux/NEXUS_INTEREST-TRIGGERED-TOOLTIPS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation
> **Origin**: `guides/user-experience/[light-dismiss-a-dialog.md](../ui-ux/NEXUS_LIGHT-DISMISS-A-DIALOG.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Modern modal dialogs often support "light-dismiss," allowing users to close a dialog by clicking or tapping the backdrop (the area outside the dialog). The `closedby` attribute provides a declarative way to enable this behavior without custom JavaScript.



To enable light-dismiss:

1. Add `closedby="any"` to the `<dialog>` element.
2. Open the dialog using `dialog.showModal()`.



- `any`: Enables light-dismiss (clicking the backdrop), "close requests" (the `Esc` key), and developer mechanisms (e.g., `dialog.close()`).
- `closerequest`: Enables "close requests" and developer mechanisms only. This is the default for modal dialogs.
- `none`: Only developer mechanisms can close the dialog.


When a dialog is opened as a modal using `showModal()`, the browser generates a `::backdrop` pseudo-element. This backdrop covers the entire viewport and sits directly behind the dialog.

```css
/* Style the backdrop to indicate the dialog is modal */
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px); /* Optional: add blur for modern browsers */
}
```



```html
<!-- MANDATORY: Use closedby="any" to enable light-dismiss behavior -...

#### 🔗 Traceability:
- [Source Context]([light-dismiss-a-dialog.md](../ui-ux/NEXUS_LIGHT-DISMISS-A-DIALOG.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Modeling Partial Time Concepts with Temporal
> **Origin**: `guides/user-experience/[model-partial-time-concepts.md](../ui-ux/NEXUS_MODEL-PARTIAL-TIME-CONCEPTS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
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
const duration = currentMonth.until(expiry, { largestUnit: 'years' });

if (...

#### 🔗 Traceability:
- [Source Context]([model-partial-time-concepts.md](../ui-ux/NEXUS_MODEL-PARTIAL-TIME-CONCEPTS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Moving an element with state
> **Origin**: `guides/user-experience/[move-dom-element-without-losing-state.md](../ui-ux/NEXUS_MOVE-DOM-ELEMENT-WITHOUT-LOSING-STATE.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
When reparenting DOM elements using traditional methods like `appendChild()` or `insertBefore()`, the browser implicitly removes the element from the DOM and then inserts it into its new location. This "remove and insert" operation resets many internal states, causing `<iframe>` elements to reload, CSS animations to restart, and input fields to lose focus.

To move an element while preserving its state, use the `moveBefore()` API. This method performs an atomic move, completely bypassing the removal and insertion steps.



Use `moveBefore()` exactly as you would use `insertBefore()`. It requires two arguments: the node to move, and a reference node to insert before (or `null` to append to the end of the new parent).

```javascript
const newParent = document.getElementById('new-parent');
const elementWithState = document.getElementById('iframe-or-focused-input');

// MANDATORY: Use moveBefore to preserve state. 
// Passing null as the second argument appends the element to the end of newParent.
newParent.moveBefore(elementWithState, null);
```



If you are moving custom elements using `moveBefore()`, their `connectedCallback` and `disconnectedCallback` lifecycle ...

#### 🔗 Traceability:
- [Source Context]([move-dom-element-without-losing-state.md](../ui-ux/NEXUS_MOVE-DOM-ELEMENT-WITHOUT-LOSING-STATE.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overflow Clipping Control
> **Origin**: `guides/user-experience/[overflow-clipping-control.md](../ui-ux/NEXUS_OVERFLOW-CLIPPING-CONTROL.MD)` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action logic.
- **DO** configure `overflow-clip-margin` with a specified length offset when applying external visual effects (like `filter: drop-shadow()`) to prevent sharp bounding box truncation without altering or expanding layout geometry.
- **DO NOT** apply `overflow: clip` if the container requires programmatic scroll manipulation via JavaScript or serves as the immediate layout context for `position: sticky` elements, as `clip` completely disables scrolling.

#### 🔗 Traceability:
- [Source Context]([overflow-clipping-control.md](../ui-ux/NEXUS_OVERFLOW-CLIPPING-CONTROL.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Implementation Steps
> **Origin**: `guides/user-experience/[physics-based-easing.md](../ui-ux/NEXUS_PHYSICS-BASED-EASING.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Traditional CSS easing functions like `ease-in` or `cubic-bezier()` are limited to simple curves, making it impossible to create complex physics-based effects like bounces or springs. The `linear()` timing function solves this by allowing you to provide a series of stops that can approximate complex curves. Transitions and animations are interpolated based on straight lines between the stops, but within enough stops, it can appear smooth.



1.  **Generate the curve stops:**
    Manually plotting dozens of points for a spring or bounce is impractical. Use a timing function from an external library, or use a  tool to convert an existing JavaScript easing function or an SVG path into the `linear()` syntax. Optional: store these timing functions as CSS custom properties for reuse throughout your site.
2.  **Define the timing function:**
    Apply the generated stops to the `transition-timing-function` or `animation-timing-function` property, or through the `transition` or `animation` shorthands.
3.  **Adjust the duration:**
    Unlike JavaScript physics engines where duration is derived from physical properties (mass, stiffness), CSS still requires a fixed `duration`. You may...

#### 🔗 Traceability:
- [Source Context]([physics-based-easing.md](../ui-ux/NEXUS_PHYSICS-BASED-EASING.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Fallback strategies
> **Origin**: `guides/user-experience/[platform-controls-dismiss-dialog.md](../ui-ux/NEXUS_PLATFORM-CONTROLS-DISMISS-DIALOG.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
When a modal dialog is open, users expect to use familiar controls to dismiss them: pressing the <kbd>Esc</kbd> key on a keyboard, using the back button or gesture on mobile platforms, or a dismiss gesture with assistive technologies.

When the `<dialog>` element was first introduced, it could be dismissed with the <kbd>Esc</kbd> key, but not other platform controls such as a back button/gesture on mobile. With the addition of the `closedby` attribute for `<dialog>` elements, the extended behavior of responding to more platform-specific controls for close requests has been applied for `<dialog>` elements that are opened in a modal state (i.e. when opened imperatively with the `<dialog>` element’s `showModal()` method in JavaScript or declaratively with the `show-modal` invoker command). So, there is no specific change developers need to make if they are already using the `<dialog>` element.

```html
<!-- MANDATORY: must be opened with either `showModal()` with JavaScript or the `show-modal` command using declarative command invokers in order respond to close requests including platform-specific controls. -->
<dialog aria-labelledby="example">
  <h1 id="example">Example</h1>...

#### 🔗 Traceability:
- [Source Context]([platform-controls-dismiss-dialog.md](../ui-ux/NEXUS_PLATFORM-CONTROLS-DISMISS-DIALOG.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Precise Text Alignment
> **Origin**: `guides/user-experience/[precise-text-alignment.md](../ui-ux/NEXUS_PRECISE-TEXT-ALIGNMENT.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Browsers automatically add extra whitespace above and below text characters to accommodate line-height and font-specific metrics like ascenders and descenders. This "ghost space" makes it impossible to achieve pixel-perfect vertical alignment using standard CSS.

Common issues include:
- **Misaligned Icons**: Text appears visually lower or higher than an adjacent icon even when using `align-items: center`.
- **Inaccurate Padding**: A button with `padding: 12px` visually appears to have more space on top or bottom because of the font's internal leading.
- **Flush Alignment**: You cannot align the top of a capital letter exactly with the top of a container or an adjacent image without using "magic number" negative margins.



The `text-box-trim` and `text-box-edge` properties (shorthand `text-box`) allow you to trim this internal leading based on specific font metrics. By trimming the text box to the **cap-height** (top of capital letters) and the **alphabetic baseline** (bottom of most letters), you can ensure that the element's bounding box matches its visual content.



1. **MANDATORY**: Apply `text-box-trim: trim-both` (or the `text-box` shorthand) to the element con...

#### 🔗 Traceability:
- [Source Context]([precise-text-alignment.md](../ui-ux/NEXUS_PRECISE-TEXT-ALIGNMENT.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Prevent text wrapping
> **Origin**: `guides/user-experience/[prevent-text-wrapping.md](../ui-ux/NEXUS_PREVENT-TEXT-WRAPPING.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Modern CSS provides the `text-wrap` property to control how text breaks within its container. To ensure text stays on a single line and ignores container boundaries, use `text-wrap: nowrap`. This is the modern, more semantic replacement for `white-space: nowrap`.

Preventing text wrapping is useful for UI elements like navigation tabs, horizontal scrolling chips, or any scenario where a line break would break the layout or visual design.





To prevent any automatic line breaks, apply `text-wrap: nowrap` to the element containing the text.

1. **MANDATORY**: Apply `text-wrap: nowrap` to the target element.
2. **OPTIONAL**: Use an `overflow` property (such as `hidden`, `scroll`, or `auto`) to manage the resulting overflow.
3. **OPTIONAL**: Use `text-overflow: ellipsis` to provide a visual cue when text is truncated. Note: This requires `overflow: hidden`.



```css
.no-wrap-text {
  /* MANDATORY: Prevents automatic line breaks */
  text-wrap: nowrap;

  /* OPTIONAL: Handles the overflow visually */
  overflow: hidden;
  text-overflow: ellipsis;

  /* OPTIONAL: Constrain width to force and handle overflow within this element */
  max-width: 200px;
}
```
...

#### 🔗 Traceability:
- [Source Context]([prevent-text-wrapping.md](../ui-ux/NEXUS_PREVENT-TEXT-WRAPPING.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Pull to Reveal
> **Origin**: `guides/user-experience/[pull-to-reveal.md](../ui-ux/NEXUS_PULL-TO-REVEAL.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
"Pull to reveal" is a UI pattern where content (such as a search bar or refresh control) is hidden above the top of a scrollable area on initial load, and the user can pull down (scroll up) to reveal it. This pattern is commonly used in mobile apps and web apps for search bars, filters, and other secondary controls that should be accessible but not immediately visible.

The CSS property `scroll-initial-target` offers a declarative, CSS-only way to implement this pattern. By setting `scroll-initial-target: nearest` on the main content element, the scroll container will render with the hidden content scrolled out of view. Previously, developers relied on JavaScript (`Element.scrollIntoView()`) or URL fragment identifiers (`#content-id`) to achieve this, both of which have limitations and are tricky to implement.



To implement a pull-to-reveal pattern:

1. **Ensure a scroll container:** The target element must be inside a scroll container (an element with overflow that allows scrolling, such as `overflow: auto`). This can be any ancestor element, including the root `<html>` element.
2. **Define the hidden element:** Place the content you want to hide (e.g., a search bar) as...

#### 🔗 Traceability:
- [Source Context]([pull-to-reveal.md](../ui-ux/NEXUS_PULL-TO-REVEAL.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Reduce Style Repetition with CSS Functions
> **Origin**: `guides/user-experience/[reduce-style-repetition.md](../ui-ux/NEXUS_REDUCE-STYLE-REPETITION.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Maintaining large stylesheets often leads to repetitive logic, especially when dealing with design system tokens like gradients or responsive layout patterns.

The CSS `@function` at-rule allows you to encapsulate this logic into reusable, parameterized functions, making your CSS more maintainable, consistent and DRY (Don't Repeat Yourself).



A custom function is defined using the `@function` rule followed by a dashed name and a list of parameters. The function returns a value using the `result` property. 

```css
@function --my-function(--input1 <length>, --input2: default-value) returns <length> {
  /* Logic goes here */
  result: var(--input1);
}
```


- **Parameters:** Must start with a double dash (`--`).
- **Defaults:** You can provide default values using a colon (`:`).
- **Result:** The `result` property determines the value the function returns. The last `result` declared in the function body wins.
- **Scoping:** Parameters and variables defined inside the function are locally scoped.
- **Types:** You can require parameters and the returned value to match a CSS type with bracket notation (e.g., `<color>`) and allow multiple types with the `type` funct...

#### 🔗 Traceability:
- [Source Context]([reduce-style-repetition.md](../ui-ux/NEXUS_REDUCE-STYLE-REPETITION.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Set a scroll target for the initial render
> **Origin**: `guides/user-experience/[scroll-target-on-load.md](../ui-ux/NEXUS_SCROLL-TARGET-ON-LOAD.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
The CSS property `scroll-initial-target` offers a declarative, CSS-only way to bring a specific descendant element into the visible area of its scroll container as soon as that container is rendered. Previously, developers relied on JavaScript (`Element.scrollIntoView()`) or URL fragment identifiers (`#item-id`), both of which have limitations and are tricky to implement.



To implement this successfully:

1. **Ensure a scroll container:** The target element must be inside a scroll container (an element with overflow that allows scrolling, such as `overflow: auto`). This can be any ancestor element, including the root `<html>` element.
2. **Target the Item:** Apply `scroll-initial-target: nearest` to the specific descendant element you want to bring into view.



In this example, a feed starts scrolled to a specific "featured" item rather than the very top of the list.

```css
/** 
 * TARGET: The item that should be visible on initial load.
 */
.item.target {
  scroll-initial-target: nearest;
}
```



- **DO** use `scroll-initial-target` for "middle-start" experiences, such as a calendar starting on the current day or a gallery starting on a specific image....

#### 🔗 Traceability:
- [Source Context]([scroll-target-on-load.md](../ui-ux/NEXUS_SCROLL-TARGET-ON-LOAD.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `guides/user-experience/[shaped-cutouts.md](../ui-ux/NEXUS_SHAPED-CUTOUTS.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
CSS Masking allows you to clip an element to a custom shape, such as adding a notch to a card or creating a shaped border. When combining shapes for complex layouts, choose your masking strategy based on the type of content the element contains:

| Masking strategy                | Best For                        | Text Impact                    |
| ------------------------------- | ------------------------------- | ------------------------------ |
| Direct Element SVG Masking      | Images, Icons, Decorative shapes, Complex shapes | Not recommended (can crop text) |
| Adjacent Element SVG Masking    | Cards with Text, Crucial content | Text remains fully readable    |
| Pure CSS Gradients              | Simple Geometric Shapes           | Not recommended (can crop text) |

---


To implement shaped cutouts:


SVG masks allow you to define shapes that subtract from or add to the visible area using white (reveal) and black (hide) fills.

> **Luminance vs. Alpha Masking**: SVG masks default to **luminance** (brightness) mode, which is why we use `fill="white"` to reveal areas and `fill="black"` to cut them out. If you prefer to use the SVG's transparency (alpha channe...

#### 🔗 Traceability:
- [Source Context]([shaped-cutouts.md](../ui-ux/NEXUS_SHAPED-CUTOUTS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Overview
> **Origin**: `guides/user-experience/[size-aware-styling.md](../ui-ux/NEXUS_SIZE-AWARE-STYLING.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
Size-aware styling allows components to change their layout or appearance based on the space available to them, rather than the size of the whole screen. This is useful for components like cards or navigation bars that might be placed in different parts of a layout (like a narrow sidebar or a wide main area).

Using container queries is recommended because it makes components truly modular. You do not need to know where the component will live or write complex media queries to handle every possible layout.





MANDATORY: You must first tell the browser which element is the container to be measured.

```css
.card-container {
  /* Define the container type. Use 'inline-size' for width-based queries. */
  /* You can also use 'size' for both width and height, but it requires explicit sizing. */
  container-type: inline-size;
}
```



Use the `@container` rule to apply styles when the container reaches a certain size.

```css
/* Default styles for small containers (stacked layout) */
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Styles for larger containers (side-by-side layout) */
/* This triggers when the container is wider than ...

#### 🔗 Traceability:
- [Source Context]([size-aware-styling.md](../ui-ux/NEXUS_SIZE-AWARE-STYLING.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Stabilize Reactive State with Temporal
> **Origin**: `guides/user-experience/[stabilize-reactive-state.md](../ui-ux/NEXUS_STABILIZE-REACTIVE-STATE.MD)` | **Distilled At**: 26/05/2026

#### 💡 Content Summary:
While some reactive systems (like [React](https://react.dev/)) rely strictly on reference equality to detect state changes, others (like [Vue](https://vuejs.org/) and [Svelte](https://svelte.dev/)) can track mutations to plain objects. However, for built-in objects like the legacy `Date` object, internal mutations (like `setHours()`) do not change the object's reference and are generally not tracked by any framework's default reactivity system. This leads to missed UI updates and hard-to-debug side effects.

The `Temporal` API solves this by providing immutable objects. Any operation that modifies a value (such as adding time or setting a field) returns a new instance with a new memory reference. This guarantees that state updates are always detected by reactive systems, ensuring UI stability.



To stabilize reactive state using Temporal:

1. **Use Temporal types for state:** Store `Temporal` objects (like `Temporal.PlainDateTime` or `Temporal.PlainDate`) in your reactive state instead of legacy `Date` objects.
2. **Perform immutable updates:** When updating the state, use Temporal methods like `.add()`, `.subtract()`, or `.with()`. These methods return a new object.
3. ...

#### 🔗 Traceability:
- [Source Context]([stabilize-reactive-state.md](../ui-ux/NEXUS_STABILIZE-REACTIVE-STATE.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---
### 📄 Style Parent with :has()
> **Origin**: `guides/user-experience/[style-parent-with-has.md](../ui-ux/NEXUS_STYLE-PARENT-WITH-HAS.MD)` | **Distilled At**: 26/05/2026

#### 🛠 Actionable Steps:
action state using a `WeakMap`. This avoids polluting the DOM with "dirty" classes or data attributes.

```javascript
const UserInvalidFallback = (() => {
  const dirtyState = new WeakMap();

  const updateState = (input) => {
    const isValid = input.checkValidity();

    // Update both visual and ARIA state
    input.classList.toggle('user-invalid-fallback', !isValid);
    input.classList.toggle('user-valid-fallback', isValid);

    if (!isValid) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  };

  const handleEvent = (event) => {
    const input = event.target;

    if (event.type === 'reset') {
      const controls = input.elements || [];
      for (const control of controls) {
        dir

#### 🔗 Traceability:
- [Source Context]([style-parent-with-has.md](../ui-ux/NEXUS_STYLE-PARENT-WITH-HAS.MD))
- [Related Standards](NEXUS_CORE_PRINCIPLES.md)

---


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, tdd, vcs, api]
