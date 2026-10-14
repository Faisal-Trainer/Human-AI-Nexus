/**
 * 🧩 Generic PHP file guards — berlaku untuk kelas Livewire, controller API,
 * dan file PHP ber-namespace mana pun.
 */

// Deterministic guard: bare Auth::/DB:: tanpa import → "Class not found"
// saat runtime (facade di-resolve relatif ke namespace file, mis.
// "Class App\Livewire\Auth not found" — temuan metrics harness di
// UrlShortenerBox::mount, 500 di semua halaman). Suntikkan import facade yang
// hilang; idempoten dan skip pemakaian FQCN (\DB::) maupun `use ...\Alias;`
// yang sudah ada.
const FACADES = {
  Auth: "Illuminate\\Support\\Facades\\Auth",
  Gate: "Illuminate\\Support\\Facades\\Gate",
  DB: "Illuminate\\Support\\Facades\\DB",
  Schema: "Illuminate\\Support\\Facades\\Schema",
  Hash: "Illuminate\\Support\\Facades\\Hash",
  Http: "Illuminate\\Support\\Facades\\Http",
  Mail: "Illuminate\\Support\\Facades\\Mail",
  Storage: "Illuminate\\Support\\Facades\\Storage",
  Cache: "Illuminate\\Support\\Facades\\Cache",
  Config: "Illuminate\\Support\\Facades\\Config",
  Log: "Illuminate\\Support\\Facades\\Log",
  Queue: "Illuminate\\Support\\Facades\\Queue",
  Session: "Illuminate\\Support\\Facades\\Session",
  Validator: "Illuminate\\Support\\Facades\\Validator",
  Str: "Illuminate\\Support\\Str",
  Arr: "Illuminate\\Support\\Arr",
};

function detectMissingFacades(code) {
  const missing = [];
  for (const [alias, fqcn] of Object.entries(FACADES)) {
    // Pemakaian bare `Alias::method` — lookbehind menolak \Alias:: (FQCN) dan
    // App\Alias:: yang sudah benar.
    if (!new RegExp(`(?<![\\\\\\w])${alias}::[a-zA-Z$]`).test(code)) continue;
    // Sudah ada import (termasuk `use ...\Alias;` berapapun prefix-nya)?
    if (new RegExp(`use\\s+[\\w\\\\]+\\\\${alias}\\s*;`).test(code)) continue;
    missing.push([alias, fqcn]);
  }
  return missing;
}

const facadeImports = {
  id: "facade-imports",
  fields: ["code"],
  run(ctx, host = {}) {
    let code = ctx.code;
    if (!code) return { ctx, changed: false };
    const missing = detectMissingFacades(code);
    if (missing.length === 0) return { ctx, changed: false };
    const imports = missing.map(([, fq]) => `use ${fq};`).join("\n");
    const nsRe = /^namespace [^;]+;/m;
    code = nsRe.test(code)
      ? code.replace(nsRe, (m) => `${m}\n${imports}`)
      : code.replace(/<\?php\s*/, `<?php\n${imports}\n`);
    ctx.code = code;
    if (host.log) {
      host.log(
        `      🩹 Injected ${missing.length} missing facade import(s): ${missing.map(([a]) => a).join(", ")}`,
        "warning",
      );
    }
    return {
      ctx,
      changed: true,
      notes: [
        `injected facade import(s): ${missing.map(([a]) => a).join(", ")}`,
      ],
    };
  },
};

module.exports = { facadeImports, FACADES, detectMissingFacades };
