/**
 * 🧪 TDD Fixtures: grammar GBNF blueprint (plan #5 — keputusan "grammar saja").
 *
 * Cakupan murni-logika (tanpa memuat runtime llama/native, agar aman di CI):
 *  1. Bentuk schema blueprintApp mencerminkan template prompt NexusEngine —
 *     `framework` fiktif dihapus dari required, inti semantik diwajibkan.
 *  2. _normalizeOptions me-resolve nama preset string → objek schema.
 *  3. Gerbang expectJson: override caller menjaga jalur repair+parse tetap ada
 *     (grammar boleh dipasang tanpa JSON-strict), sementara expectJson:true
 *     tetap menolak JSON tak sempurna.
 *
 * Kompilasi grammar native diverifikasi terpisah saat dev (GRAMMAR_OK), tidak
 * diuji di sini agar suite tidak bergantung pada unduhan/build llama.cpp.
 */

const li = require("../../agent/core/LocalIntelligence");

let failures = 0;
function check(name, cond) {
  if (cond) {
    console.log(`  \u2705 ${name}`);
  } else {
    failures++;
    console.error(`  \u274c ${name}`);
  }
}

// ── 1. Bentuk schema blueprintApp ──────────────────────────────────────────
(function schemaShape() {
  console.log("blueprintApp schema \u2014 bentuk & required...");
  const bp = li.schemas && li.schemas.blueprintApp;
  check("schema blueprintApp tersedia", !!bp);
  if (!bp) return;

  const req = bp.required || [];
  check("required TIDAK memuat 'framework' fiktif", !req.includes("framework"));
  [
    "project_name",
    "models",
    "schema",
    "routes",
    "livewire_components",
    "migrations",
    "seeders",
    "relationships",
  ].forEach((k) => check(`required memuat '${k}'`, req.includes(k)));

  const props = bp.properties || {};
  check("properties memuat 'schema' (map dinamis)", !!props.schema);
  check(
    "properties.schema menerima kunci bebas (additionalProperties)",
    props.schema && props.schema.additionalProperties != null,
  );
  check(
    "properties memuat 'relationships' array of object",
    props.relationships &&
      props.relationships.items &&
      props.relationships.items.properties,
  );
  [
    "api_endpoints",
    "security_policies",
    "async_jobs",
    "ui_design_system",
  ].forEach((k) => check(`properties memuat opsional '${k}'`, !!props[k]));
})();

// ── 2. _normalizeOptions: preset string → objek ────────────────────────────
(function normalize() {
  console.log("_normalizeOptions \u2014 resolusi preset schema...");
  const opts = li._normalizeOptions({ schema: "blueprintApp" });
  check(
    "'blueprintApp' di-resolve ke objek schema",
    opts.schema === li.schemas.blueprintApp,
  );

  const opts2 = li._normalizeOptions({ schema: "postMortem" });
  check(
    "'postMortem' di-resolve ke objek schema",
    opts2.schema === li.schemas.postMortem,
  );

  const optsUnknown = li._normalizeOptions({ schema: "nope-not-real" });
  check(
    "preset tak dikenal dibuang (lanjut tanpa schema)",
    !("schema" in optsUnknown),
  );
})();

// ── 3. Gerbang expectJson (override) ───────────────────────────────────────
(function expectJsonGate() {
  console.log("validateOutput \u2014 gerbang expectJson...");
  const broken = '{"project_name":"x"'; // JSON belum lengkap
  check(
    "expectJson:false => kembalikan teks mentah (jalur repair tetap hidup)",
    li.validateOutput(broken, "generate_architecture", {
      expectJson: false,
    }) === broken,
  );
  check(
    "expectJson:true => JSON tak sempurna menjadi null",
    li.validateOutput(broken, "generate_architecture", { expectJson: true }) ===
      null,
  );
  const valid = '{"a":1}';
  check(
    "expectJson:true => JSON valid lolos utuh",
    li.validateOutput(valid, "generate_architecture", { expectJson: true }) ===
      valid,
  );
})();

if (failures > 0) {
  console.error(`\n\u274c grammar-blueprint fixtures: ${failures} gagal`);
  process.exit(1);
}
console.log("\n\u2705 grammar-blueprint fixtures: semua lolos");
