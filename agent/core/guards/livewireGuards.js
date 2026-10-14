/**
 * 🧩 Livewire component guards — diedarkan oleh GuardRunner sebagai pipeline
 * berurutan (menggantikan langkah bernomor 0/0.5/2.5/3/3.5/3.6/4 di
 * _reconcileLivewireComponent, metrics plan #3).
 *
 * ctx pipeline: { className, kebabName, classCode, viewCode, knownModels }
 * Tiap guard = { id, fields?, run(ctx, host) -> { ctx, changed, notes } },
 * idempoten: menjalankan guard yang sama dua kali = no-op pada panggilan kedua.
 */

const U = require("./utils");

// ── pure text transforms (dipakai juga langsung oleh phase) ────────────────

// Repair mismatched Blade loop directives: @foreach closed by @empty/@endforelse
// → @forelse; @forelse closed by @endforeach → @endforelse. Stack-based.
function fixBladeLoopDirectives(code) {
  if (!code) return code;
  const re = /@(foreach|forelse|endforeach|endforelse|endempty|empty)\b/g;
  const tokens = [];
  let m;
  while ((m = re.exec(code)) !== null) {
    tokens.push({ name: m[1], index: m.index, len: m[0].length });
  }
  if (tokens.length === 0) return code;

  const renames = [];
  const stack = [];
  for (const t of tokens) {
    if (t.name === "foreach" || t.name === "forelse") {
      stack.push(t);
    } else if (t.name === "empty") {
      const top = stack[stack.length - 1];
      if (top && top.name === "foreach") {
        renames.push({ i: top.index, len: top.len, to: "forelse" });
        top.name = "forelse";
      }
    } else if (t.name === "endforelse") {
      const top = stack[stack.length - 1];
      if (top && top.name === "foreach") {
        renames.push({ i: top.index, len: top.len, to: "forelse" });
        top.name = "forelse";
      }
      if (top) stack.pop();
    } else if (t.name === "endforeach") {
      const top = stack[stack.length - 1];
      if (top && top.name === "forelse") {
        renames.push({ i: top.index, len: top.len, to: "endforelse" });
      }
      if (top) stack.pop();
    }
    // endempty closes a standalone @empty-if; nothing to repair.
  }
  if (renames.length === 0) return code;

  let out = code;
  // Same-length renames (@foreach<->@forelse, @endforeach<->@endforelse),
  // apply right-to-left so earlier offsets stay valid.
  renames
    .sort((a, b) => b.i - a.i)
    .forEach((r) => {
      out = out.slice(0, r.i) + "@" + r.to + out.slice(r.i + r.len);
    });
  return out;
}

// Guard EVERY hop, not just the first: `$user->shortUrls->first()->title`
// must become `$user?->shortUrls?->first()?->title`. A first-hop-only fix
// still crashes with "Call to a member function first() on null" when an
// intermediate relation is missing or unpopulated.
function nullSafeViewReads(viewCode) {
  return viewCode.replace(/\$\w+(?:\??->[\w()]+)+/g, (chain) =>
    chain.replace(/(?<!\?)->/g, "?->"),
  );
}

// Supply missing render() data for the collections the view iterates:
// a) view('livewire.x') -> view('livewire.x', [data])
// b) view('livewire.x', [ ... ]) -> append into the existing array
// c) view('livewire.x', compact(...)) -> array_merge(compact(...), [data])
function injectRenderData(classCode, kebabName, entries) {
  if (!entries.length) return classCode;
  const dataLiteral = entries.map((e) => `'${e.key}' => ${e.php}`).join(", ");
  const vn = `livewire.${kebabName}`;
  const esc = vn.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const noData = new RegExp(`view\\(\\s*(['"])${esc}\\1\\s*\\)`);
  if (noData.test(classCode)) {
    return classCode.replace(
      noData,
      (_m, q) => `view(${q}${vn}${q}, [${dataLiteral}])`,
    );
  }

  const arrRe = new RegExp(
    `(view\\(\\s*(['"])${esc}\\2\\s*,\\s*)(\\[[\\s\\S]*?\\])`,
  );
  if (arrRe.test(classCode)) {
    return classCode.replace(arrRe, (_m, head, _q, arr) => {
      // Strip the brackets and any trailing comma so an existing
      // `['k' => v,]` (trailing comma) does not become `..., , 'new' => ...`.
      const body = arr.slice(1, -1).replace(/,\s*$/, "");
      const sep = body.trim() ? "," : "";
      return `${head}[${body}${sep} ${dataLiteral}]`;
    });
  }

  const compRe = new RegExp(
    `(view\\(\\s*(['"])${esc}\\2\\s*,\\s*)(compact\\([^)]*\\))(\\s*\\)))`,
  );
  if (compRe.test(classCode)) {
    return classCode.replace(
      compRe,
      (_m, head, _q, c, tail) =>
        `${head}array_merge(${c}, [${dataLiteral}])${tail}`,
    );
  }

  return classCode;
}

// Prepend `new Model()` initializers into mount() (existing or synthesized
// before render()/class end) for model-typed properties.
function injectMountInits(classCode, assignments) {
  if (!assignments.length) return classCode;
  const lines = assignments
    .map((a) => `        $this->${a.name} = new \\App\\Models\\${a.type}();`)
    .join("\n");
  const mountRe = /public\s+function\s+mount\s*\([^)]*\)\s*\{/;
  if (mountRe.test(classCode)) {
    return classCode.replace(mountRe, (sig) => `${sig}\n${lines}`);
  }
  const renderRe = /([ \t]*)public\s+function\s+render\s*\(/;
  if (renderRe.test(classCode)) {
    return classCode.replace(
      renderRe,
      (_m, ind) =>
        `${ind}public function mount()\n${ind}{\n${lines}\n${ind}}\n\n${ind}public function render(`,
    );
  }
  const idx = classCode.lastIndexOf("}");
  if (idx === -1) return classCode;
  return (
    classCode.slice(0, idx) +
    `\n    public function mount()\n    {\n${lines}\n    }\n` +
    classCode.slice(idx)
  );
}

// ── internal set computation (steps 1/2 analisis, dipakai guard 2.5 & 3) ───

function computeViewDataSets(classCode, viewCode) {
  let m;
  const publicProps = new Set();
  const propRe = /public\s+\$(\w+)/g;
  while ((m = propRe.exec(classCode))) publicProps.add(m[1]);

  const renderBody = U.extractMethodBody(classCode, "render") || "";
  const renderProvided = new Set();
  const keyRe = /['"](\w+)['"]\s*=>/g;
  while ((m = keyRe.exec(renderBody))) renderProvided.add(m[1]);
  const compactRe = /compact\(([^)]*)\)/g;
  let cm;
  while ((cm = compactRe.exec(renderBody))) {
    const nameRe = /['"](\w+)['"]/g;
    let nm;
    while ((nm = nameRe.exec(cm[1]))) renderProvided.add(nm[1]);
  }
  const withRe = /->with\(\s*['"](\w+)['"]/g;
  while ((m = withRe.exec(renderBody))) renderProvided.add(m[1]);

  const foreachVars = new Set();
  const feRe = /@(?:foreach|forelse)\s*\(\s*\$(\w+)\s+as\s+/gi;
  while ((m = feRe.exec(viewCode))) foreachVars.add(m[1]);

  return { publicProps, renderProvided, foreachVars };
}

// ── guards (urutan = urutan pipeline) ──────────────────────────────────────

const bladeLoopDirectives = {
  id: "blade-loop-directives",
  fields: ["viewCode"],
  run(ctx) {
    const fixedView = fixBladeLoopDirectives(ctx.viewCode);
    if (fixedView === ctx.viewCode) return { ctx, changed: false };
    ctx.viewCode = fixedView;
    return {
      ctx,
      changed: true,
      notes: ["repaired unbalanced Blade loop directives"],
    };
  },
};

// Add missing `use App\Models\X;` imports for Eloquent models the class
// references by short name (ShortUrl::all(), ClickStat::paginate(), a typed
// property, or `new X`). Without the import PHP resolves the bare class under
// the component's own namespace and throws "Class 'App\Livewire\X' not found".
const modelImports = {
  id: "livewire-model-imports",
  fields: ["classCode"],
  run(ctx) {
    const knownModels = ctx.knownModels || [];
    let classCode = ctx.classCode;
    if (!classCode || !knownModels.length) return { ctx, changed: false };
    const added = [];
    for (const model of knownModels) {
      if (new RegExp(`use\\s+App\\\\Models\\\\${model}\\s*;`).test(classCode))
        continue;
      // Bare (unqualified) reference: not preceded by a backslash or word char,
      // followed by `::`, `(`, or a `$` (typed-property hint). FQN uses such as
      // \App\Models\X are intentionally skipped (they need no import).
      const used = new RegExp(
        `(?<![\\\\\\w])${model}\\b\\s*(?:::|\\(|\\$)`,
      ).test(classCode);
      if (!used) continue;
      added.push(model);
    }
    if (!added.length) return { ctx, changed: false };
    const useLines = added.map((m) => `use App\\Models\\${m};`).join("\n");
    const useMatches = [...classCode.matchAll(/^use\s+[^;]+;/gm)];
    if (useMatches.length) {
      const last = useMatches[useMatches.length - 1];
      const idx = last.index + last[0].length;
      classCode =
        classCode.slice(0, idx) + "\n" + useLines + classCode.slice(idx);
    } else {
      classCode = classCode.replace(
        /(namespace\s+[^;]+;)/,
        `$1\n\n${useLines}`,
      );
    }
    ctx.classCode = classCode;
    return {
      ctx,
      changed: true,
      notes: [`imported model(s): ${added.join(", ")}`],
    };
  },
};

// Drop public properties that shadow an iterated collection. Livewire's
// HandleComponents::getView() applies ->with($publicProperties) AFTER the
// render() view data, so an unassigned `public $users;` overrides
// `'users' => User::all()` with null and the view crashes with
// "foreach() argument must be of type array|object, null given".
const shadowProperties = {
  id: "livewire-shadow-properties",
  fields: ["classCode"],
  run(ctx) {
    const { publicProps, foreachVars } = computeViewDataSets(
      ctx.classCode,
      ctx.viewCode,
    );
    let classCode = ctx.classCode;
    const notes = [];
    for (const varName of foreachVars) {
      if (!publicProps.has(varName)) continue;
      if (new RegExp(`\\$this->${varName}\\b`).test(classCode)) continue; // property in use elsewhere
      const next = classCode.replace(
        new RegExp(
          `[ \\t]*public\\s+\\$${varName}\\s*(?:=\\s*null)?;[ \\t]*\\r?\\n`,
        ),
        "",
      );
      if (next !== classCode) {
        classCode = next;
        notes.push(`removed public $${varName} shadowing render() data`);
      }
    }
    ctx.classCode = classCode;
    return { ctx, changed: notes.length > 0, notes };
  },
};

// Supply any collection the view iterates that render() does not provide,
// from the matching model (`'users' => \App\Models\User::all()`), so the page
// can never 500 with "Undefined variable".
const renderDataSupply = {
  id: "livewire-render-data",
  fields: ["classCode"],
  run(ctx) {
    const { renderProvided, foreachVars } = computeViewDataSets(
      ctx.classCode,
      ctx.viewCode,
    );
    const knownModels = ctx.knownModels || [];
    const entries = [];
    for (const varName of foreachVars) {
      if (renderProvided.has(varName)) continue;
      const model = knownModels.find((md) => U.camelPlural(md) === varName);
      const php = model ? `\\App\\Models\\${model}::all()` : "collect([])";
      entries.push({ key: varName, php });
    }
    if (!entries.length) return { ctx, changed: false };
    const next = injectRenderData(ctx.classCode, ctx.kebabName, entries);
    if (next === ctx.classCode) return { ctx, changed: false };
    ctx.classCode = next;
    return {
      ctx,
      changed: true,
      notes: [
        `render() supplies ${entries.map((e) => "$" + e.key).join(", ")}`,
      ],
    };
  },
};

// Initialize typed public properties that are read before assignment.
// A `public SomeModel $x;` with no default and no mount() assignment makes
// render()/the view throw "Typed property ... must not be accessed before
// initialization". Model-typed props get `new Model()` in mount(); the rest
// get a nullable null default so the read yields null (then null-safe below).
const propertyInit = {
  id: "livewire-property-init",
  fields: ["classCode"],
  run(ctx) {
    const knownModels = ctx.knownModels || [];
    let classCode = ctx.classCode;
    const notes = [];
    let changed = false;
    const modelInits = [];
    // Typed public property WITHOUT a default value: `public ?SomeType $name;`.
    // Untyped `public $x;` is intentionally skipped (already defaults to null).
    const re =
      /public\s+(?:static\s+)?(\?)?\s*([A-Za-z_][A-Za-z0-9_\\]*)\s+\$(\w+)\s*;/g;
    let m;
    while ((m = re.exec(classCode))) {
      const type = m[2];
      const name = m[3];
      const shortType = type.split("\\").pop();
      // Skip if the property is already assigned anywhere (mount/constructor/action).
      if (new RegExp(`\\$this->${name}\\s*=`).test(classCode)) continue;
      const isModel =
        knownModels.includes(shortType) ||
        new RegExp(`use\\s+App\\\\Models\\\\${shortType};`).test(classCode);
      if (isModel) {
        modelInits.push({ name, type: shortType });
      } else {
        const declRe = new RegExp(
          `public\\s+(?:static\\s+)?\\??\\s*${type.replace(
            /\\/g,
            "\\\\",
          )}\\s+\\$${name}\\s*;`,
        );
        const next = classCode.replace(
          declRe,
          `public ?${type} $${name} = null;`,
        );
        if (next !== classCode) {
          classCode = next;
          changed = true;
          notes.push(`default null on typed $${name}`);
        }
      }
    }
    if (modelInits.length) {
      const next = injectMountInits(classCode, modelInits);
      if (next !== classCode) {
        classCode = next;
        changed = true;
        notes.push(
          `mount() initializes ${modelInits.map((i) => "$" + i.name).join(", ")}`,
        );
      }
    }
    ctx.classCode = classCode;
    return { ctx, changed, notes };
  },
};

// Define action methods the view invokes through Livewire event directives
// (wire:click="deleteShortUrl(...)", wire:submit="save", ...). When the LLM
// generates the Blade but omits the matching public method, the click throws
// "Unable to call component method" at request time. Inject a safe stub so the
// component never fatals; real logic comes from the prompt.
const actionMethods = {
  id: "livewire-action-stubs",
  fields: ["classCode"],
  run(ctx) {
    const { classCode: input, viewCode } = ctx;
    if (!input || !viewCode) return { ctx, changed: false };
    const EVENT =
      "(?:click|submit|change|input|keydown|keyup|keypress|focus|blur|action|request|dblclick|mouseenter|mouseleave|mousedown|mouseup)";
    const dirRe = new RegExp(
      `wire:${EVENT}(?:\\.[\\w-]+)*\\s*=\\s*"([^"]*)"`,
      "g",
    );
    const needed = new Set();
    let dm;
    while ((dm = dirRe.exec(viewCode))) {
      // The invoked component method is the leading identifier of the value.
      // `$refresh`, `$emit(...)`, `$dispatch(...)` start with `$` and are skipped.
      const im = /^\s*([A-Za-z_]\w*)\s*\(?/.exec(dm[1]);
      if (!im) continue;
      const name = im[1];
      if (name === "if" || name === "true" || name === "false") continue;
      needed.add(name);
    }
    let classCode = input;
    const added = [];
    for (const name of needed) {
      if (new RegExp(`function\\s+${name}\\s*\\(`).test(classCode)) continue;
      added.push(name);
    }
    if (!added.length) return { ctx, changed: false };
    const stubs = added
      .map(
        (n) =>
          `\n    public function ${n}()\n    {\n        // TODO: action invoked by a wire directive in the component view.\n    }\n`,
      )
      .join("");
    const lastBrace = classCode.lastIndexOf("}");
    if (lastBrace === -1) return { ctx, changed: false };
    classCode =
      classCode.slice(0, lastBrace) + stubs + classCode.slice(lastBrace);
    ctx.classCode = classCode;
    return {
      ctx,
      changed: true,
      notes: [`stubbed missing action(s): ${added.join(", ")}`],
    };
  },
};

const nullSafeReads = {
  id: "blade-null-safe-reads",
  fields: ["viewCode"],
  run(ctx) {
    const nulled = nullSafeViewReads(ctx.viewCode);
    if (nulled === ctx.viewCode) return { ctx, changed: false };
    ctx.viewCode = nulled;
    return { ctx, changed: true, notes: ["null-safe property reads"] };
  },
};

// Urutan PERSIS pipeline lama (0, 0.5, 2.5, 3, 3.5, 3.6, 4) — jangan diubah
// tanpa fixture test yang membuktikan skor harness tidak turun.
const reconcileGuards = [
  bladeLoopDirectives,
  modelImports,
  shadowProperties,
  renderDataSupply,
  propertyInit,
  actionMethods,
  nullSafeReads,
];

module.exports = {
  reconcileGuards,
  fixBladeLoopDirectives,
  nullSafeViewReads,
  injectRenderData,
  injectMountInits,
  computeViewDataSets,
};
