/**
 * 🧪 TDD Fixtures: agent/core/guards — kontrak detect/fix/idempoten (plan #3)
 * + telemetri frekuensi menyala guard (plan #4).
 *
 * Target: GuardRunner.run/runOne/record dan seluruh guard murni
 * (livewire/php/route/schema). Tidak menyentuh ImplementationPhase maupun
 * sandbox — semua operasi di atas stringfixture + tmp telemetry dir.
 */

const fs = require("fs");
const os = require("os");
const path = require("path");

const Guards = require("../../agent/core/guards");
const GuardRunner = Guards.GuardRunner;

let failures = 0;
function check(name, cond) {
  if (cond) {
    console.log(`  ✅ ${name}`);
  } else {
    failures++;
    console.error(`  ❌ ${name}`);
  }
}

// ── 1. GuardRunner contract + telemetry (tmp dir, tidak menyentuh logs/) ───
(function runnerContract() {
  console.log("🚀 GuardRunner — contract, ordering, error-isolation...");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "nexus-guard-tel-"));
  const runner = new GuardRunner({
    telemetryDir: tmp,
    getProject: () => "fixture-project",
  });

  const upper = {
    id: "upper",
    fields: ["code"],
    run(ctx) {
      const out = ctx.code.toUpperCase();
      const changed = out !== ctx.code;
      ctx.code = out;
      return { ctx, changed, notes: changed ? ["uppercased"] : [] };
    },
  };
  const boom = {
    id: "boom",
    run() {
      throw new Error("guard exploded");
    },
  };

  // detect/fix: fires on broken input, no-op on clean input
  const r1 = runner.run("fixture-pipeline", [upper], { code: "abc" }, {});
  check("fix: ctx mutated", r1.ctx.code === "ABC");
  check("fix: report fired", r1.report[0].fired === true);
  const r2 = runner.run("fixture-pipeline", [upper], { code: "ABC" }, {});
  check(
    "idempoten: second run is no-op",
    r2.ctx.code === "ABC" && r2.report[0].fired === false,
  );

  // error isolation: a throwing guard must never kill the pipeline
  const r3 = runner.run("fixture-pipeline", [upper, boom], { code: "x" }, {});
  check(
    "error: throwing guard recorded, pipeline survives",
    r3.ctx.code === "X" &&
      r3.report.length === 2 &&
      r3.report[1].fired === false &&
      !!r3.report[1].error,
  );

  // telemetry file: totals keyed by pipeline/guardId
  // upper jalan 3x (fired, no-op, fired); record pair TIDAK menghitung runs.
  const day = new Date().toISOString().slice(0, 10);
  const doc = JSON.parse(
    fs.readFileSync(path.join(tmp, `guard-telemetry-${day}.json`), "utf8"),
  );
  const t = doc.totals["fixture-pipeline/upper"];
  check("telemetry: totals runs=3 fired=2", t && t.runs === 3 && t.fired === 2);
  check(
    "telemetry: runs window recorded",
    Array.isArray(doc.runs) &&
      doc.runs.length >= 3 &&
      doc.runs[0].project === "fixture-project",
  );

  // pairs.jsonl: broken→fixed dataset captured only when fired.
  // Snapshot objek ditruncate jadi string JSON oleh truncate().
  const pairs = fs
    .readFileSync(path.join(tmp, "pairs.jsonl"), "utf8")
    .trim()
    .split("\n")
    .map((l) => JSON.parse(l));
  check(
    "pairs: broken→fixed entry present",
    pairs.length === 2 &&
      JSON.parse(pairs[0].before).code === "abc" &&
      JSON.parse(pairs[0].after).code === "ABC" &&
      pairs[0].guard === "upper",
  );

  // record() API for function-style wrappers
  runner.record("migration-generation", "migration-sanitize", {
    fired: true,
    before: "a",
    after: "b",
  });
  runner.record("migration-generation", "migration-sanitize", { fired: false });
  const doc2 = JSON.parse(
    fs.readFileSync(path.join(tmp, `guard-telemetry-${day}.json`), "utf8"),
  );
  const t2 = doc2.totals["migration-generation/migration-sanitize"];
  check(
    "record(): fired+no-op both counted",
    t2 && t2.runs === 2 && t2.fired === 1,
  );
  check(
    "record(): fired pair appended",
    fs.readFileSync(path.join(tmp, "pairs.jsonl"), "utf8").trim().split("\n")
      .length === 3,
  );
  fs.rmSync(tmp, { recursive: true, force: true });
})();

// ── 2. RECONCILE_LIVEWIRE pipeline — urutan guard penuh ─────────────────────
(function reconcilePipeline() {
  console.log("🚀 RECONCILE_LIVEWIRE — pipeline order + idempotency...");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "nexus-guard-rec-"));
  const runner = new GuardRunner({ telemetryDir: tmp });
  const ids = Guards.RECONCILE_LIVEWIRE.map((g) => g.id);
  check(
    "order preserved (blade-loop first, null-safe last)",
    ids[0] === "blade-loop-directives" &&
      ids[ids.length - 1] === "blade-null-safe-reads",
  );

  const ctx = {
    className: "UrlShortener",
    kebabName: "url-shortener",
    knownModels: ["ShortUrl"],
    classCode: `<?php

namespace App\\Livewire;

use Livewire\\Component;

class UrlShortener extends Component
{
    public function render()
    {
        return view('livewire.url-shortener');
    }
}
`,
    viewCode: `<div>
    @foreach ($shortUrls as $url)
        <span>{{ $url->title }}</span>
    @empty
        <p>No urls yet.</p>
    @endforelse
</div>`,
  };
  const first = runner.run(
    "livewire-reconcile",
    Guards.RECONCILE_LIVEWIRE,
    ctx,
    {},
  );
  check(
    "pipeline: mismatched @foreach repaired",
    /@forelse/.test(first.ctx.viewCode) &&
      !/@endforeach/.test(first.ctx.viewCode),
  );
  check(
    "pipeline: render() supplies view data",
    /'\$shortUrls'|shortUrls/.test(first.ctx.classCode) &&
      /view\(/.test(first.ctx.classCode),
  );
  const second = runner.run(
    "livewire-reconcile",
    Guards.RECONCILE_LIVEWIRE,
    first.ctx,
    {},
  );
  check(
    "pipeline: idempoten — second run no-ops",
    second.report.every((r) => !r.fired),
  );
  fs.rmSync(tmp, { recursive: true, force: true });
})();

// ── 3. livewireGuards pure transforms ──────────────────────────────────────
(function livewirePure() {
  console.log("🚀 livewireGuards — pure transforms...");
  const L = Guards.livewireGuards;
  const broken = "@foreach ($a as $b)\n@empty\n@endforelse";
  const fixed = L.fixBladeLoopDirectives(broken);
  check(
    "blade-loop: @foreach+@empty -> @forelse",
    fixed.startsWith("@forelse") && L.fixBladeLoopDirectives(fixed) === fixed,
  );
  check(
    "blade-loop: clean code untouched",
    L.fixBladeLoopDirectives(
      "@forelse ($a as $b)\n@empty\n@endforelse",
    ).includes("@forelse"),
  );
  check(
    "null-safe: every hop guarded",
    L.nullSafeViewReads("{{ $user->shortUrls->first()->title }}") ===
      "{{ $user?->shortUrls?->first()?->title }}",
  );
  const once = L.nullSafeViewReads("{{ $a->b->c }}");
  check(
    "null-safe: idempoten",
    once === "{{ $a?->b?->c }}" && L.nullSafeViewReads(once) === once,
  );
})();

// ── 4. phpGuards.facadeImports ──────────────────────────────────────────────
(function phpGuard() {
  console.log("🚀 phpGuards — facade imports...");
  const code = `<?php\n\nnamespace App\\Livewire;\n\nuse Livewire\\Component;\n\nclass X extends Component\n{\n    public function mount()\n    {\n        $id = Auth::id();\n    }\n}\n`;
  const clean = Guards.phpGuards.facadeImports.run({ code }, {});
  check(
    "detect+fix: Auth import injected",
    clean.changed === true &&
      clean.ctx.code.includes("use Illuminate\\Support\\Facades\\Auth;"),
  );
  const again = Guards.phpGuards.facadeImports.run(
    { code: clean.ctx.code },
    {},
  );
  check("idempoten: no double import", again.changed === false);
  const fqcn = Guards.phpGuards.facadeImports.run(
    {
      code: `<?php\nnamespace A;\n$x = \\Illuminate\\Support\\Facades\\Auth::id();\n`,
    },
    {},
  );
  check("detect: FQCN usage skipped", fqcn.changed === false);
})();

// ── 5. routeGuards ──────────────────────────────────────────────────────────
(function routeGuard() {
  console.log("🚀 routeGuards — Livewire full-page heal...");
  const R = Guards.routeGuards;
  const existing = [
    {
      className: "UrlShortener",
      kebab: "url-shortener",
      fullClass: "App\\Livewire\\UrlShortener",
    },
  ];
  const raw = `<?php\n\nRoute::view('/shorten', 'livewire.url-shortener');\n`;
  const healed = R.healLivewireRoutes.run(
    { code: raw, existingLivewire: existing },
    {},
  );
  check(
    "heal: Route::view string -> Route::get class invokable",
    healed.changed === true &&
      /Route::get\('\/shorten', \\App\\Livewire\\UrlShortener::class\)/.test(
        healed.ctx.code,
      ),
  );
  const again = R.healLivewireRoutes.run(
    { code: healed.ctx.code, existingLivewire: existing },
    {},
  );
  check("heal: idempoten", again.changed === false);
  // gate mendeteksi bentuk closure mentah dan Route::view(Class::class) legacy;
  // Route::get(...::class) hasil heal harus lolos gate.
  check(
    "gate: closure view(livewire.*) detected",
    R.hasRawLivewireViewRoutes(
      "Route::get('/p', function () { return view('livewire.x'); });",
    ) === true,
  );
  check(
    "gate: healed Route::get(class) passes",
    R.hasRawLivewireViewRoutes(healed.ctx.code) === false,
  );
  const legacy = `<?php\nRoute::view('/x', \\App\\Livewire\\UrlShortener::class);\n`;
  const legacyHealed = R.healLivewireRoutes.run(
    { code: legacy, existingLivewire: existing },
    {},
  );
  check(
    "heal: legacy Route::view(Class::class) -> Route::get",
    legacyHealed.changed === true &&
      /Route::get\('\/x'/.test(legacyHealed.ctx.code),
  );
  const phantoms = R.findPhantomControllers(
    `<?php\nRoute::get('/a', MissingController::class);\nRoute::get('/b', KnownController::class);\n`,
    ["App\\Http\\Controllers\\KnownController"],
  );
  check(
    "gate: phantom controllers listed (Known not flagged)",
    phantoms.length === 1 && phantoms[0] === "MissingController",
  );
})();

// ── 6. schemaGuards ─────────────────────────────────────────────────────────
(function schemaGuards() {
  console.log("🚀 schemaGuards — schema-lock detect/fix/idempoten...");
  const SG = Guards.schemaGuards;
  const G = SG.guards;

  // seeder sanitize
  const seeder = SG.sanitizeSeeder(
    `<?php\n$faker = Faker\\Factory::create();\n'title' => $faker->realistic(10),\n`,
  );
  check(
    "seeder: faker normalized to fake()->",
    seeder.includes("fake()->sentence(3)") && !seeder.includes("$faker"),
  );
  check("seeder: idempoten", SG.sanitizeSeeder(seeder) === seeder);

  // migration sanitize
  const mig = `<?php\nSchema::create('posts', function (Blueprint $table) {\n    $table->id();\n    $table->nullable();\n    $table->string('title');\n    $table->timestamps();\n});\n`;
  const sanitized = G.migrationSanitize.run({ code: mig }, {});
  check(
    "migration: bare modifier stripped",
    sanitized.changed === true &&
      !sanitized.ctx.code.includes("$table->nullable();") &&
      sanitized.ctx.code.includes("$table->timestamps();"),
  );
  check(
    "migration: idempoten",
    G.migrationSanitize.run({ code: sanitized.ctx.code }, {}).changed === false,
  );

  // dedupe
  const dup = `<?php\nSchema::create('posts', function (Blueprint $table) {\n    $table->id();\n    $table->string('title');\n    $table->string('title');\n    $table->timestamps();\n    $table->timestamp('created_at');\n});\n`;
  const dd = G.migrationDedupe.run({ code: dup }, {});
  check(
    "dedupe: duplicate+colliding columns collapsed",
    dd.changed === true &&
      (dd.ctx.code.match(/'title'/g) || []).length === 1 &&
      !dd.ctx.code.includes("timestamp('created_at')"),
  );

  // ensure missing columns
  const schema = { title: "string", price: "decimal:2" };
  const base = `<?php\nSchema::create('products', function (Blueprint $table) {\n    $table->id();\n    $table->string('title');\n    $table->timestamps();\n});\n`;
  const ec = SG.ensureMigrationColumns("products", schema, base);
  check(
    "columns-ensure: missing price injected with modifiers",
    ec.injected.join() === "price" && /decimal\('price', 10, 2\)/.test(ec.code),
  );
  check(
    "columns-ensure: idempoten",
    SG.ensureMigrationColumns("products", schema, ec.code).injected.length ===
      0,
  );

  // model fillable lock
  const modelCode = `<?php\nnamespace App\\Models;\nclass Product extends Model\n{\n    protected $fillable = ['title'];\n}\n`;
  const locked = SG.ensureModelFillable("Product", schema, [], modelCode);
  check(
    "fillable: locked to full schema",
    locked.includes("'price'") && locked.includes("'title'"),
  );
  check(
    "fillable: idempoten",
    SG.ensureModelFillable("Product", schema, [], locked) === locked,
  );

  // user relations + fillable
  const blueprint = {
    schema: { ShortUrl: { user_id: "foreignId", code: "string:unique" } },
  };
  const userModel = `<?php\nnamespace App;\nclass User extends Authenticatable\n{\n    protected $fillable = ['name'];\n}\n`;
  const rel = SG.ensureUserRelations(userModel, blueprint);
  check(
    "user-relations: hasMany injected",
    rel.added.length === 1 && /function shortUrls\(\)/.test(rel.code),
  );
  check(
    "user-relations: idempoten",
    SG.ensureUserRelations(rel.code, blueprint).added.length === 0,
  );
  const uf = SG.ensureUserFillable(userModel, ["theme"]);
  check(
    "user-fillable: additive merge",
    uf.includes("'name'") && uf.includes("'theme'"),
  );
  check(
    "user-fillable: idempoten",
    SG.ensureUserFillable(uf, ["theme"]) === uf,
  );
  const attr = `<?php\nclass User\n{\n    #[Fillable(['name'])]\n}\n`;
  check(
    "user-fillable: Laravel 12 #[Fillable] attr supported",
    SG.ensureUserFillable(attr, ["theme"]).includes(
      "#[Fillable(['name', 'theme'])]",
    ),
  );
})();

// ── 7. guards/utils ─────────────────────────────────────────────────────────
(function utilsCheck() {
  console.log("🚀 guards/utils — pure helpers...");
  const U = Guards.utils;
  check(
    "camelPlural",
    U.camelPlural("ShortUrl") === "shortUrls" &&
      U.camelPlural("Category") === "categories",
  );
  check(
    "toSnakePlural",
    U.toSnakePlural("UrlShortener") === "url_shorteners" &&
      U.toSnakePlural("ExpenseItem") === "expense_items",
  );
  check(
    "fkToModel",
    U.fkToModel("short_url_id") === "ShortUrl" &&
      U.fkToModel("user_id") === "User",
  );
  const parsed = U.parseSchemaColumns({
    title: "string",
    user_id: "foreignId:nullable",
    posts: "HasMany:Post",
  });
  check(
    "parseSchemaColumns: columns vs relationships split",
    parsed.columns.length === 2 &&
      parsed.relationships.length === 1 &&
      parsed.relationships[0].target === "Post",
  );
  const fkLine = U.columnMigrationCall({
    name: "category_id",
    baseType: "foreignuuid",
    mods: [],
  });
  check(
    "columnMigrationCall: sibling FK uses foreignUuid",
    fkLine.includes("foreignUuid('category_id')->constrained()"),
  );
  // baseType selalu lowercase hasil parseSchemaColumns — itulah input produksi
  const userIdLine = U.columnMigrationCall({
    name: "user_id",
    baseType: "foreignid",
    mods: [],
  });
  check(
    "columnMigrationCall: user_id keeps bigint nullable",
    userIdLine.includes("foreignId('user_id')->nullable()"),
  );
})();

if (failures > 0) {
  console.error(`\n❌ guards fixtures: ${failures} failure(s)`);
  process.exit(1);
}
console.log(
  "\n✅ guards fixtures: all checks passed (plan #3/#4 contract + telemetry)",
);
