#!/usr/bin/env node
/**
 * score_section.js — NEXUS Metrics Harness
 * ------------------------------------------------------------------
 * Mengukur hasil generated sandbox app secara OBJEKTIF (bukan klaim log):
 *   1. lint   : php -l seluruh app/, routes/, database/
 *   2. boot   : php artisan migrate:status (aplikasi bisa boot + DB sehat)
 *   3. routes : php artisan route:list --json (jumlah route ter-registrasi)
 *   4. views  : php artisan view:cache → seluruh Blade terkompilasi
 *   5. http   : php artisan serve (port sementara) + GET tiap route web
 *               → status code per URL. 5xx = error nyata yang lolos TDDGuard.
 *
 * Output : tabel ringkasan + JSON skor ke logs/scores/v<version>-<ts>.json
 * Pemakaian:
 *   node scripts/score_section.js url-shortener-app todo-app-realtime
 *   node scripts/score_section.js --all          # semua project selesai
 *   node scripts/score_section.js --all --keep   # jangan clear view cache
 *
 * Catatan non-invasif: harness ini TIDAK menjalankan migrate:fresh, tidak
 * menyentuh node_modules, dan memakai port ephemeral (base 8123) agar aman
 * dijalankan sambil sandbox pipeline berjalan di project lain.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn, spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SANDBOX_DIR = path.join(ROOT, "tests", "sandboxes");
const SCORES_DIR = path.join(ROOT, "logs", "scores");
const TEMPLATE_SKIP = "laravel-fresh-template";

// Weights —_http is dominant karena incident url-shortener (FULL APP READY
// tapi /dashboard & /short-url 500) adalah alasan utama harness ini ada.
const WEIGHTS = { lint: 15, boot: 15, routes: 10, views: 15, http: 45 };

const VERSION = (() => {
  try {
    return require(path.join(ROOT, "package.json")).version;
  } catch {
    return "unknown";
  }
})();

function log(msg) {
  console.log(msg);
}

// ---------------------------------------------------------------- utils

function run(cmd, args, cwd, timeoutMs = 60000, cap = 8000) {
  const r = spawnSync(cmd, args, {
    cwd,
    shell: false,
    timeout: timeoutMs,
    windowsHide: true,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  const out = (r.stdout || "") + (r.stderr || "");
  return { ok: r.status === 0, code: r.status, out: out.slice(0, cap) };
}

function walkPhpFiles(dir, acc = []) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (
        ["vendor", "node_modules", "storage", "bootstrap/cache"].includes(
          e.name,
        )
      )
        continue;
      walkPhpFiles(full, acc);
    } else if (e.name.endsWith(".php")) {
      acc.push(full);
    }
  }
  return acc;
}

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function httpGet(url, timeoutMs = 15000) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: timeoutMs }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (c) => {
        if (body.length < 30000) body += c;
      });
      res.on("end", () => resolve({ status: res.statusCode || 0, body }));
    });
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", (err) =>
      resolve({ status: 0, body: String(err.message || err) }),
    );
  });
}

function findFreePort(base) {
  for (let p = base; p < base + 20; p++) {
    const r = run("netstat", ["-ano"], ROOT, 10000);
    if (!r.out.includes(`:${p} `)) return p;
  }
  return base;
}

// Ekstrak signature error dari body Laravel (Ignition/Whoops HTML/plain).
function errorSignature(body) {
  const patterns = [
    /Undefined variable \$?([a-zA-Z_][a-zA-Z0-9_]*)/,
    /Class "([^"]+)" not found/,
    /Cannot redeclare\s+(\S+)/,
    /SQLSTATE\[[^\]]+\]: [^\n<"]{0,80}/,
    /View \[[^\]]+\] not found/,
    /Call to undefined method\s+(\S+)/,
    /No query results for model \[([^\]]+)\]/,
  ];
  for (const re of patterns) {
    const m = body.match(re);
    if (m) return m[0].slice(0, 120);
  }
  return "";
}

// Ambil pesan ERROR terakhir dari laravel.log project (bukti paling jujur —
// halaman debug Ignition tidak selalu punya title yang informatif).
function tailLogErrors(projectDir) {
  try {
    const lg = fs
      .readFileSync(
        path.join(projectDir, "storage", "logs", "laravel.log"),
        "utf8",
      )
      .split("\n");
    const out = [];
    const seen = new Set();
    for (let i = lg.length - 1; i >= 0 && out.length < 5; i--) {
      const line = lg[i];
      const m = line.match(/\[([^\]]+)\] \w+\.ERROR: (.{0,160}?) (?:\{|$)/);
      if (!m) continue;
      const key = m[2].slice(0, 80);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(`${m[1]}  ${key}`);
    }
    return out;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------- checks

function checkLint(projectDir) {
  const dirs = ["app", "routes", "database"].filter((d) =>
    fs.existsSync(path.join(projectDir, d)),
  );
  const files = dirs.flatMap((d) => walkPhpFiles(path.join(projectDir, d)));
  const failures = [];
  for (const f of files) {
    const r = run("php", ["-l", f], projectDir, 15000);
    if (!r.ok)
      failures.push(
        path.relative(projectDir, f) +
          ": " +
          r.out.split("\n").filter(Boolean).slice(-1)[0],
      );
  }
  return {
    total: files.length,
    passed: files.length - failures.length,
    failures: failures.slice(0, 8),
    ratio: files.length ? (files.length - failures.length) / files.length : 0,
  };
}

function checkBoot(projectDir) {
  const r = run("php", ["artisan", "migrate:status"], projectDir, 60000);
  return {
    ok: r.ok,
    tail: r.out.split("\n").slice(-3).join(" | ").slice(0, 300),
  };
}

function checkRoutes(projectDir) {
  // route:list --json bisa >100KB — jangan sampai terpotong (bug truncation v1)
  const r = run(
    "php",
    ["artisan", "route:list", "--json"],
    projectDir,
    60000,
    4 * 1024 * 1024,
  );
  if (!r.ok)
    return { ok: false, count: 0, web: [], error: r.out.slice(0, 300) };
  try {
    const routes = JSON.parse(r.out);
    const web = routes
      .filter(
        (x) =>
          // method Laravel berupa "GET|HEAD" — pisahkan pada | dan ,
          String(x.method)
            .split(/[|,]/)
            .map((m) => m.trim())
            .includes("GET") &&
          !x.uri.includes("{") &&
          !x.uri.startsWith("_") &&
          !x.uri.startsWith("livewire/") &&
          !x.uri.startsWith("api/") &&
          x.uri !== "up",
      )
      .map((x) => "/" + x.uri)
      .filter((v, i, a) => a.indexOf(v) === i);
    return { ok: true, count: routes.length, web };
  } catch (e) {
    return {
      ok: false,
      count: 0,
      web: [],
      error: "route:list JSON parse: " + e.message,
    };
  }
}

function checkViews(projectDir, keepCache) {
  const r = run("php", ["artisan", "view:cache"], projectDir, 120000);
  if (!keepCache) run("php", ["artisan", "view:clear"], projectDir, 30000);
  return {
    ok: r.ok,
    tail: r.out.split("\n").filter(Boolean).slice(-1)[0] || "",
  };
}

// Hard-gate mirror: deteksi anti-pattern route closure + view('livewire.x')
function checkRouteBypass(projectDir) {
  const f = path.join(projectDir, "routes", "web.php");
  try {
    return /view\(\s*['"]livewire\./i.test(fs.readFileSync(f, "utf8"));
  } catch {
    return false;
  }
}

async function checkHttp(projectDir, webRoutes) {
  const port = findFreePort(8123);
  const base = `http://127.0.0.1:${port}`;
  const proc = spawn("php", ["artisan", "serve", `--port=${port}`], {
    cwd: projectDir,
    shell: false,
    windowsHide: true,
    detached: process.platform !== "win32",
    stdio: "ignore",
  });
  const results = [];
  try {
    // tunggu server hidup (status apa pun = hidup)
    let up = false;
    for (let i = 0; i < 40; i++) {
      const probe = await httpGet(base + "/", 4000);
      if (probe.status > 0) {
        up = true;
        break;
      }
      await sleep(500);
    }
    if (!up) return { started: false, results };
    for (const p of webRoutes) {
      const res = await httpGet(base + p, 20000);
      const entry = { path: p, status: res.status };
      if (res.status >= 500) {
        const sig = errorSignature(res.body);
        if (sig) entry.error = sig;
      }
      results.push(entry);
    }
  } finally {
    if (process.platform === "win32") {
      spawnSync("taskkill", ["/PID", String(proc.pid), "/T", "/F"], {
        shell: false,
        windowsHide: true,
      });
    } else {
      try {
        process.kill(-proc.pid);
      } catch {
        proc.kill();
      }
    }
  }
  return { started: true, results };
}

// ---------------------------------------------------------------- scoring

function scoreProject(name, checks) {
  const s = {};
  s.lint = checks.lint.ratio * WEIGHTS.lint;
  s.boot = checks.boot.ok ? WEIGHTS.boot : 0;
  s.routes = checks.routes.ok && checks.routes.count > 0 ? WEIGHTS.routes : 0;
  s.views = checks.views.ok ? WEIGHTS.views : 0;

  const res = checks.http.results;
  let hscore = 0;
  if (checks.http.started && res.length > 0) {
    let acc = 0;
    for (const r of res) {
      if (r.status >= 200 && r.status < 400) acc += 1;
      else if (r.status >= 400 && r.status < 500) acc += 0.5;
    }
    hscore = (acc / res.length) * WEIGHTS.http;
  }
  s.http = hscore;

  const total =
    Math.round(Object.values(s).reduce((a, b) => a + b, 0) * 10) / 10;
  const verdict =
    total >= 90
      ? "FULL_READY"
      : total >= 70
        ? "READY"
        : total >= 40
          ? "PARTIAL"
          : "BROKEN";
  return { sub: s, total, verdict };
}

async function scoreOne(projectDir, opts) {
  const name = path.basename(projectDir);
  log(`\n── Scoring ${name} ${"─".repeat(Math.max(0, 40 - name.length))}`);
  const lint = checkLint(projectDir);
  log(`   lint   : ${lint.passed}/${lint.total} php -l clean`);
  const boot = checkBoot(projectDir);
  log(`   boot   : migrate:status ${boot.ok ? "OK" : "FAIL"}`);
  const routes = checkRoutes(projectDir);
  log(
    `   routes : ${routes.ok ? routes.count + " registered, " + routes.web.length + " web-GET checkable" : "FAIL"}`,
  );
  const views = checkViews(projectDir, opts.keep);
  log(`   views  : view:cache ${views.ok ? "OK" : "FAIL"}`);
  const bypass = checkRouteBypass(projectDir);
  if (bypass)
    log(
      `   ⚠️ rawLivewireRoutes: closure+view('livewire.*') masih ada di web.php`,
    );
  const httpChecks = await checkHttp(projectDir, routes.web);
  for (const r of httpChecks.results) {
    log(
      `   http   : ${r.status === 0 ? "DOWN" : r.status} ${r.path}${r.error ? "  ← " + r.error : ""}`,
    );
  }
  const checks = {
    lint,
    boot,
    routes,
    views,
    http: httpChecks,
    routeBypass: bypass,
  };
  // tempel error log project (5 pesan ERROR unik terakhir) sebagai bukti 5xx
  if (httpChecks.results.some((r) => r.status >= 500 || r.status === 0)) {
    checks.lastLogErrors = tailLogErrors(projectDir);
    for (const e of checks.lastLogErrors) log(`   log    : ${e}`);
  }
  const score = scoreProject(name, checks);
  log(`   SCORE  : ${score.total}/100  →  ${score.verdict}`);
  return {
    name,
    path: projectDir,
    ...checks,
    ...score,
    scored_at: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------- main

function discoverProjects(argv) {
  if (!fs.existsSync(SANDBOX_DIR)) return [];
  const named = argv.filter((a) => !a.startsWith("--"));
  const all = fs
    .readdirSync(SANDBOX_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== TEMPLATE_SKIP)
    .map((d) => path.join(SANDBOX_DIR, d.name))
    .filter((p) => fs.existsSync(path.join(p, "artisan")));
  if (argv.includes("--all")) return all;
  const out = [];
  for (const n of named) {
    const p = path.join(SANDBOX_DIR, n);
    if (fs.existsSync(path.join(p, "artisan"))) out.push(p);
    else log(`   ⚠️ project tidak ditemukan: ${n}`);
  }
  // tanpa arg → semua project yang punya marker FULL APP READY di INDEX
  if (out.length === 0)
    return all.filter((p) => {
      try {
        const marker = fs.readFileSync(
          path.join(p, ".nexus-status.json"),
          "utf8",
        );
        return /FULL APP READY|COMPLETE/i.test(marker);
      } catch {
        return false;
      }
    });
  return out;
}

async function main() {
  const argv = process.argv.slice(2);
  const opts = { keep: argv.includes("--keep") };
  const projects = discoverProjects(argv);
  if (projects.length === 0) {
    log(
      "Tidak ada project untuk dinilai. Pakai: node scripts/score_section.js <nama> | --all",
    );
    process.exit(0);
  }
  log(`NEXUS Metrics Harness v${VERSION} — ${projects.length} project(s)`);
  const results = [];
  for (const p of projects) {
    try {
      results.push(await scoreOne(p, opts));
    } catch (e) {
      log(`   ❌ scoring error ${path.basename(p)}: ${e.message}`);
      results.push({
        name: path.basename(p),
        error: e.message,
        total: 0,
        verdict: "ERROR",
      });
    }
  }

  const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  fs.mkdirSync(SCORES_DIR, { recursive: true });
  const outFile = path.join(SCORES_DIR, `v${VERSION}-${ts}.json`);
  const avg =
    results.length > 0
      ? Math.round(
          (results.reduce((a, r) => a + (r.total || 0), 0) / results.length) *
            10,
        ) / 10
      : 0;
  fs.writeFileSync(
    outFile,
    JSON.stringify(
      {
        harness: 1,
        version: VERSION,
        scored_at: new Date().toISOString(),
        weights: WEIGHTS,
        avg,
        projects: results,
      },
      null,
      2,
    ),
  );

  log(`\n${"=".repeat(64)}`);
  log("RINGKASAN SKOR");
  for (const r of results) {
    log(
      `  ${String(r.total ?? 0).padStart(5, " ")} / 100  ${String(r.verdict).padEnd(10)} ${r.name}`,
    );
  }
  log(`  AVG  : ${avg}/100`);
  log(`  JSON : ${outFile}`);
  process.exit(0);
}

main().catch((e) => {
  console.error("harness fatal:", e);
  process.exit(1);
});
