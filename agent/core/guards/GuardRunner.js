/**
 * 🛡️ GuardRunner — satu-satunya pengatur urutan eksekusi guard (metrics plan #3).
 *
 * Kontrak tiap guard (detect / fix / idempoten):
 *   { id: 'nama-guard', run(ctx, host) -> { ctx, changed, notes } }
 *   - detect : guard memutuskan sendiri apakah ada yang harus diperbaiki
 *              (tidak ada efek saat `changed === false`).
 *   - fix    : memperbaiki ctx (objek artefak mutable) secara in-place/return.
 *   - idempoten: run(ctx) setelah run(ctx) pertama = no-op (changed false).
 *
 * Telemetri (#4): tiap pipeline run mencatat {guard, fired, notes} ke
 * logs/guard-telemetry/guard-telemetry-YYYY-MM-DD.json + total kumulatif per
 * guard. Guard yang fired juga menulis pasangan rusak→terperbaiki ke
 * pairs.jsonl (bahan fine-tuning LoRA — alur RetroDatasetExtractor).
 * Pencatatan bersifat best-effort: kegagalan fs tidak pernah memutus pipeline.
 */

const fs = require("fs");
const path = require("path");

const MAX_ARTIFACT = 16000; // per-side truncation for pairs.jsonl entries
const MAX_RUNS = 500; // rolling window of run records in the daily JSON

function readVersion() {
  try {
    return (
      JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "..", "..", "..", "package.json"),
          "utf8",
        ),
      ).version || "unknown"
    );
  } catch {
    return "unknown";
  }
}

class GuardRunner {
  constructor(opts = {}) {
    this.telemetryDir =
      opts.telemetryDir ||
      path.join(__dirname, "..", "..", "..", "logs", "guard-telemetry");
    this.getProject = opts.getProject || (() => "unknown");
    this.version = readVersion();
  }

  /**
   * Jalankan daftar guard berurutan pada ctx. Perilaku identik dengan urutan
   * pemanggilan manual — runner hanya menambahkan pencatatan telemetri.
   * Return { ctx, report } dengan report = [{ id, fired, notes }].
   */
  run(pipeline, guards, ctx, host = {}) {
    const report = [];
    for (const g of guards) {
      const before = snapshot(g, ctx);
      let res;
      try {
        res = g.run(ctx, host) || {};
      } catch (e) {
        // Guard adalah perbaikan best-effort — jangan pernah membunuh pipeline.
        report.push({
          id: g.id,
          fired: false,
          error: String(e.message).slice(0, 160),
        });
        continue;
      }
      if (res.ctx) ctx = res.ctx;
      const fired = !!res.changed;
      report.push({ id: g.id, fired, notes: res.notes || [] });
      if (fired) this._recordPair(pipeline, g.id, before, snapshot(g, ctx));
    }
    this._emitRun(pipeline, report);
    return { ctx, report };
  }

  /** Guard tunggal (convenience) — sama dengan run([g]). */
  runOne(guard, ctx, host = {}, pipeline = "single") {
    return this.run(pipeline, [guard], ctx, host);
  }

  /**
   * Catat telemetri untuk guard yang dipanggil sebagai fungsi murni di luar
   * pipeline (wrapper ImplementationPhase). fired=false tetap dihitung "runs"
   * supaya rasio firing per guard bisa dibaca (#4).
   */
  record(pipeline, id, { fired, notes = [], before, after } = {}) {
    this._emitRun(pipeline, [{ id, fired: !!fired, notes }]);
    if (
      fired &&
      before !== undefined &&
      after !== undefined &&
      before !== after
    ) {
      this._appendPair({
        ts: new Date().toISOString(),
        project: this.getProject(),
        pipeline,
        guard: id,
        before: truncate(before),
        after: truncate(after),
      });
    }
  }

  // ── internals ────────────────────────────────────────────────────────────

  _dailyFile() {
    const d = new Date().toISOString().slice(0, 10);
    return path.join(this.telemetryDir, `guard-telemetry-${d}.json`);
  }

  _emitRun(pipeline, report) {
    try {
      fs.mkdirSync(this.telemetryDir, { recursive: true });
      const file = this._dailyFile();
      let doc = {
        version: this.version,
        updatedAt: null,
        totals: {},
        runs: [],
      };
      if (fs.existsSync(file)) {
        try {
          const prev = JSON.parse(fs.readFileSync(file, "utf8"));
          if (prev && typeof prev === "object") doc = { ...doc, ...prev };
        } catch {
          /* corrupt file → start fresh rather than crash the build */
        }
      }
      const firedCount = report.filter((r) => r.fired).length;
      for (const r of report) {
        const key = `${pipeline}/${r.id}`;
        doc.totals[key] = doc.totals[key] || { runs: 0, fired: 0 };
        doc.totals[key].runs++;
        if (r.fired) doc.totals[key].fired++;
      }
      doc.runs = (doc.runs || []).concat([
        {
          ts: new Date().toISOString(),
          project: this.getProject(),
          pipeline,
          guards: report,
        },
      ]);
      if (doc.runs.length > MAX_RUNS) doc.runs = doc.runs.slice(-MAX_RUNS);
      doc.version = this.version;
      doc.updatedAt = new Date().toISOString();
      doc.summary = {
        runs: doc.runs.length,
        firedRuns: (doc.runs || []).filter((r) =>
          (r.guards || []).some((g) => g.fired),
        ).length,
        firedThisCall: firedCount,
      };
      fs.writeFileSync(file, JSON.stringify(doc, null, 2));
    } catch {
      /* telemetry is best-effort */
    }
  }

  _recordPair(pipeline, id, before, after) {
    // Langsung tulis pasangan; _emitRun SUDAH dipanggil oleh run() sehingga
    // memakai record() di sini akan menghitung "runs" dua kali per fire.
    this._appendPair({
      ts: new Date().toISOString(),
      project: this.getProject(),
      pipeline,
      guard: id,
      before: truncate(before),
      after: truncate(after),
    });
  }

  _appendPair(entry) {
    try {
      fs.mkdirSync(this.telemetryDir, { recursive: true });
      fs.appendFileSync(
        path.join(this.telemetryDir, "pairs.jsonl"),
        JSON.stringify(entry) + "\n",
      );
    } catch {
      /* pairs capture is best-effort */
    }
  }
}

// Snapshot hanya field string yang relevan bagi guard, untuk pasangan dataset.
function snapshot(guard, ctx) {
  const keys = guard.fields || Object.keys(ctx);
  const out = {};
  for (const k of keys) {
    if (typeof ctx[k] === "string") out[k] = ctx[k];
  }
  return out;
}

function truncate(v) {
  const s = typeof v === "string" ? v : JSON.stringify(v);
  return s.length > MAX_ARTIFACT ? s.slice(0, MAX_ARTIFACT) + "…[trunc]" : s;
}

module.exports = GuardRunner;
