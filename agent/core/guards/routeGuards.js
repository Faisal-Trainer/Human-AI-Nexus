/**
 * 🧩 Route (web.php) guards + gate validators — deterministik, tanpa LLM.
 * ctx pipeline: { code, existingLivewire } dengan host { rootPath, log }.
 */

const fs = require("fs");
const path = require("path");

/**
 * Full-page components need an HTML shell: inject
 * #[\Livewire\Attributes\Layout('layouts.app')] when the app layout exists
 * and the component has no Layout attribute yet. Idempotent, best-effort.
 */
function ensureFullPageLayout(className, host = {}) {
  try {
    const rootPath = host.rootPath;
    if (!rootPath) return;
    const layoutExists = fs.existsSync(
      path.join(rootPath, "resources", "views", "layouts", "app.blade.php"),
    );
    if (!layoutExists) return;
    const file = path.join(rootPath, "app", "Livewire", `${className}.php`);
    if (!fs.existsSync(file)) return;
    const src = fs.readFileSync(file, "utf8");
    if (/Attributes\\Layout|\#\[\s*Layout/i.test(src)) return; // already set
    const patched = src.replace(
      /^(\s*(?:final\s+|abstract\s+)?class\s+[A-Za-z0-9_]+)/m,
      "#[\\Livewire\\Attributes\\Layout('layouts.app')]\n$1",
    );
    if (patched !== src) fs.writeFileSync(file, patched);
  } catch {
    /* layout injection is best-effort — never block route generation */
  }
}

/**
 * Deterministic heal: rewrite routes that render Livewire Blade rawly —
 * `Route::get('/x', fn() { return view('livewire.x'); })` bypasses the
 * component class entirely, so render() never runs and every view variable
 * is undefined at runtime (HTTP 500). Rewritten to Livewire full-page
 * component routes: `Route::get('/x', \App\Livewire\X::class)` (Livewire 4
 * invokable-route form — Route::view does NOT resolve page components).
 * Runs on POST-processed output so stale global-cache generations (which
 * were prompted with the old anti-pattern) are healed instead of trusted.
 */
const healLivewireRoutes = {
  id: "livewire-route-heal",
  fields: ["code"],
  run(ctx, host = {}) {
    const existingLivewire = ctx.existingLivewire || [];
    let code = ctx.code;
    const byKebab = new Map(existingLivewire.map((c) => [c.kebab, c]));
    let healed = 0;

    const toFullPage = (routePath, kebab) => {
      const comp = byKebab.get(kebab);
      if (!comp) return null; // unknown class — hard gate will reject below
      if (routePath.includes("{") || routePath.includes(":")) return null; // full-page routes can't bind params
      healed++;
      ensureFullPageLayout(comp.className, host);
      return `Route::get('${routePath}', \\${comp.fullClass}::class)`;
    };

    // A) closure form: Route::get('/p', function () { return view('livewire.x'); })
    // NOTE: trailing \) consumes the OUTER Route::get(...) paren so the
    // replacement (which already closes Route::get) stays balanced.
    code = code.replace(
      /Route::get\(\s*(['"])((?:(?!\1).)*)\1\s*,\s*(?:function\s*\([^)]*\)|fn\s*\([^)]*\))\s*\{\s*(?:return\s+)?view\(\s*(['"])livewire\.([a-z0-9_-]+)\3\s*\)\s*;?\s*\}\s*\)/gi,
      (m, q1, routePath, q3, kebab) => toFullPage(routePath, kebab) || m,
    );

    // B) arrow form: Route::get('/p', fn() => view('livewire.x'))
    code = code.replace(
      /Route::get\(\s*(['"])((?:(?!\1).)*)\1\s*,\s*fn\s*\([^)]*\)\s*=>\s*view\(\s*(['"])livewire\.([a-z0-9_-]+)\3\s*\)\s*\)/gi,
      (m, q1, routePath, q3, kebab) => toFullPage(routePath, kebab) || m,
    );

    // C) Route::view('/p', 'livewire.x') string-view form → component class
    code = code.replace(
      /Route::view\(\s*(['"])((?:(?!\1).)*)\1\s*,\s*(['"])livewire\.([a-z0-9_-]+)\3\s*\)/gi,
      (m, q1, routePath, q3, kebab) => toFullPage(routePath, kebab) || m,
    );

    // D) LEGACY heal output Route::view('/p', \App\Livewire\X::class) → Route::get.
    //    Livewire 4 full-page komponen hanya di-resolve lewat route invokable
    //    (HandlesPageComponents::__invoke); Route::view melimpahkan class string ke
    //    view finder → "View [App\Livewire\X] not found" (HTTP 500) — temuan
    //    metrics harness 2026-10-14 pada url-shortener-app.
    const byClass = new Map(existingLivewire.map((c) => [c.className, c]));
    code = code.replace(
      /Route::view\(\s*(['"])((?:(?!\1).)*)\1\s*,\s*\\?App\\Livewire\\([A-Za-z0-9_]+)::class/gi,
      (m, q1, routePath, cls) => {
        const comp = byClass.get(cls);
        if (!comp) return m; // unknown class — hard gate rejects below
        if (routePath.includes("{") || routePath.includes(":")) return m;
        healed++;
        ensureFullPageLayout(comp.className, host);
        return `Route::get('${routePath}', \\${comp.fullClass}::class`;
      },
    );

    const changed = code !== ctx.code;
    ctx.code = code;
    if (healed > 0 && host.log) {
      host.log(
        `      🩹 Repaired ${healed} Livewire route(s): raw view('livewire.*') → Route::get(Component::class)`,
        "warning",
      );
    }
    return {
      ctx,
      changed: healed > 0,
      notes: healed > 0 ? [`healed ${healed} Livewire route(s)`] : [],
    };
  },
};

/**
 * HARD GATE detector: true if route code still renders Livewire templates
 * rawly (class bypass) or uses Route::view with a Class::class the Livewire 4
 * view finder cannot resolve as a page component.
 */
function hasRawLivewireViewRoutes(code) {
  return (
    /view\(\s*['"]livewire\./i.test(code) ||
    /Route::view\(\s*(['"])(?:(?!\1).)*\1\s*,\s*\\?[A-Za-z][A-Za-z0-9_\\]*::class/i.test(
      code,
    )
  );
}

/**
 * Gate: true when a view() call points at a Blade file that does not exist
 * on disk (welcome is always allowed).
 */
function hasNonExistentViews(code, rootPath) {
  const viewMatches = code.match(/view\(\s*['"]([^'"]+)['"]\s*(\)|,)/g);
  if (!viewMatches) return false;
  const viewsDir = path.join(rootPath, "resources", "views");
  for (const m of viewMatches) {
    const match = m.match(/view\(\s*['"]([^'"]+)['"]/);
    if (!match) continue;
    const vName = match[1];
    if (vName === "welcome") continue;
    const vPath = path.join(
      viewsDir,
      `${vName.replace(/\./g, path.sep)}.blade.php`,
    );
    if (!fs.existsSync(vPath)) {
      return true; // Found a view() call to a non-existent view file!
    }
  }
  return false;
}

/**
 * HARD GATE: routes pointing at a Controller class that was never generated
 * crash Laravel at boot with "Invalid route action" (todo-app-realtime case),
 * killing migrate + route:list + the whole project. Returns the short class
 * names referenced in the code but missing on disk.
 */
function findPhantomControllers(code, existingControllers) {
  const known = new Set(
    (existingControllers || []).map((fq) => fq.split("\\").pop()),
  );
  const refs = new Set();
  const patterns = [
    /([A-Za-z0-9_\\]*Controller)::class/g,
    /['"]([A-Za-z0-9_\\]+Controller)(?:@[A-Za-z0-9_]+)?['"]/g,
  ];
  for (const re of patterns) {
    for (const m of code.matchAll(re)) {
      const short = m[1].split("\\").pop();
      if (short && !known.has(short)) refs.add(short);
    }
  }
  return [...refs];
}

module.exports = {
  healLivewireRoutes,
  hasRawLivewireViewRoutes,
  hasNonExistentViews,
  findPhantomControllers,
  ensureFullPageLayout,
};
