/**
 * TypeSafeValidator.js
 * Wrapper untuk evaluation gate opsional di pipeline NEXUS (bukan generator).
 *
 * Mendukung DUA provider (deteksi otomatis dari endpoint):
 *   1. TypeSafe native  — POST /v1/systemone, body {state, questions}, baca data.answers
 *      (primitif noul / choice / score)
 *   2. OpenRouter       — POST /api/v1/chat/completions, model "typesafe/jev-router"
 *      (Chat Completions + response_format json_object). Pertanyaan primitif
 *      diterjemahkan ke prompt JSON, lalu respons dinormalisasi kembali ke
 *      bentuk `answers` yang sama sehingga method pemanggil tidak perlu berubah.
 *
 * - Opsional: tanpa API key semua method mengembalikan { skipped: true }
 * - Fail-open: kalau API error/timeout, pipeline lanjut (skipped: true, error: ...)
 * - Retry exponential backoff untuk 429 dan 529
 * - Kompatibel dengan Node 18+ dan Bun (fetch bawaan)
 */

const DEFAULT_ENDPOINT = "https://api.typesafe.ai/v1/systemone";
const DEFAULT_MODEL = "jev-latest";

// Batas token output untuk keputusan Jev (sangat kecil — hanya JSON keputusan).
const OPENROUTER_MAX_TOKENS = 500;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class TypeSafeValidator {
  /**
   * @param {object} [opts]
   * @param {string} [opts.apiKey]      default: process.env.TYPESAFE_API_KEY
   * @param {string} [opts.endpoint]    default: process.env.TYPESAFE_ENDPOINT || DEFAULT_ENDPOINT
   * @param {string} [opts.model]       default: process.env.TYPESAFE_MODEL || DEFAULT_MODEL
   * @param {number} [opts.timeoutMs]   default 20000
   * @param {number} [opts.maxRetries]  default 3
   * @param {object} [opts.logger]      default: console
   */
  constructor(opts = {}) {
    this.apiKey = opts.apiKey || process.env.TYPESAFE_API_KEY || null;
    this.endpoint =
      opts.endpoint || process.env.TYPESAFE_ENDPOINT || DEFAULT_ENDPOINT;
    this.model = opts.model || process.env.TYPESAFE_MODEL || DEFAULT_MODEL;
    this.timeoutMs = opts.timeoutMs ?? 20000;
    this.maxRetries = opts.maxRetries ?? 3;
    this.logger = opts.logger || console;
  }

  get enabled() {
    return Boolean(this.apiKey);
  }

  /** True bila endpoint mengarah ke OpenRouter (mode Chat Completions). */
  get isOpenRouter() {
    return /openrouter\.ai/i.test(this.endpoint || "");
  }

  _logWarn(msg) {
    if (!this.logger) return;
    if (typeof this.logger.warn === "function") {
      this.logger.warn(`[TypeSafeValidator] ${msg}`);
    } else if (typeof this.logger.log === "function") {
      this.logger.log(`⚠️ [TypeSafeValidator] ${msg}`, "warning");
    }
  }

  _logInfo(msg) {
    if (!this.logger) return;
    if (typeof this.logger.info === "function") {
      this.logger.info(`[TypeSafeValidator] ${msg}`);
    } else if (typeof this.logger.log === "function") {
      this.logger.log(`ℹ️ [TypeSafeValidator] ${msg}`, "info");
    }
  }

  /**
   * Panggilan mentah. Return objek `answers`, atau throw kalau gagal.
   * Cabang otomatis ke OpenRouter (chat) vs TypeSafe native (systemone).
   */
  async evaluate(state, questions) {
    if (this.isOpenRouter) return this._evaluateOpenRouter(state, questions);
    return this._evaluateNative(state, questions);
  }

  /** Retry + POST bersama. `buildReq()` mengembalikan {body, parse(resText)} per provider. */
  async _postWithRetry(buildReq) {
    let lastErr;
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), this.timeoutMs);
      try {
        const res = await fetch(this.endpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buildReq.body),
          signal: ctrl.signal,
        });

        if (res.status === 429 || res.status === 529) {
          lastErr = new Error(`TypeSafe ${res.status} (retryable)`);
          await sleep(500 * 2 ** attempt);
          continue;
        }
        if (!res.ok) {
          const body = await res.text().catch(() => "");
          // 401 / 422 tidak ada gunanya di-retry
          throw Object.assign(new Error(`TypeSafe ${res.status}: ${body}`), {
            fatal: true,
          });
        }
        const text = await res.text();
        return buildReq.parse(text);
      } catch (err) {
        lastErr = err;
        if (err.fatal) break;
        await sleep(500 * 2 ** attempt);
      } finally {
        clearTimeout(timer);
      }
    }
    throw lastErr;
  }

  /** Jalur TypeSafe native (/v1/systemone). */
  _evaluateNative(state, questions) {
    return this._postWithRetry({
      body: { state, model: this.model, questions },
      parse: (text) => JSON.parse(text).answers,
    });
  }

  /** Jalur OpenRouter (/chat/completions): primitif → prompt JSON → normalisasi answers. */
  async _evaluateOpenRouter(state, questions) {
    const prompt = this._buildOpenRouterPrompt(state, questions);
    const answers = await this._postWithRetry({
      body: {
        model: this.model,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_tokens: OPENROUTER_MAX_TOKENS,
        temperature: 0,
      },
      parse: (text) => {
        const data = JSON.parse(text);
        const content = data?.choices?.[0]?.message?.content;
        if (!content)
          throw Object.assign(new Error("OpenRouter: kosong"), { fatal: true });
        return this._normalizeOpenRouterAnswers(JSON.parse(content), questions);
      },
    });
    return answers;
  }

  _buildOpenRouterPrompt(state, questions) {
    const lines = Object.entries(questions || {}).map(([key, q]) => {
      const type = q?.type || "noul";
      const instr = (q?.instructions || "").replace(/\s+/g, " ").trim();
      if (type === "choice") {
        const opts =
          q?.criteria && !Array.isArray(q.criteria)
            ? Object.entries(q.criteria)
                .map(([k, v]) => `"${k}"${v ? ` (${v})` : ""}`)
                .join(", ")
            : Array.isArray(q?.criteria)
              ? q.criteria.map((c) => `"${c}"`).join(", ")
              : "";
        return `- "${key}": type=choice. ${instr} Pilih SATU key persis dari: ${opts}. Format: {"choice": "<key>", "confidence": <0..1>}`;
      }
      if (type === "score") {
        const crit = Array.isArray(q?.criteria) ? q.criteria : [];
        const range = crit.length ? `1..${crit.length}` : "1..5";
        const labels = crit.map((c, i) => `${i + 1}=${c}`).join(", ");
        return `- "${key}": type=score. ${instr} Beri integer ${range}. Format: {"score": <int>, "confidence": <0..1>}${labels ? ` (skala: ${labels})` : ""}`;
      }
      // noul (default): probabilitas kebenaran 0..1
      return `- "${key}": type=noul. ${instr} Beri number 0.0..1.0 (peluang pernyataan BENAR). Format: {"noul": <0..1>}`;
    });

    const stateText = typeof state === "string" ? state : JSON.stringify(state);
    return (
      "You are a precise evaluation engine. Analyze the STATE and answer EVERY question.\n" +
      "Return ONLY a single JSON object whose top-level keys are exactly the question keys. No prose.\n\n" +
      `STATE:\n${stateText}\n\n` +
      "QUESTIONS:\n" +
      lines.join("\n")
    );
  }

  /** Petakan respons longgar model ke bentuk `answers` kanonik. */
  _normalizeOpenRouterAnswers(raw, questions) {
    const src = raw && typeof raw === "object" ? raw : {};
    const clamp01 = (n) => Math.max(0, Math.min(1, Number(n)));
    const answers = {};

    for (const [key, q] of Object.entries(questions || {})) {
      const type = q?.type || "noul";
      const v = src[key];

      if (type === "choice") {
        const choice = typeof v === "string" ? v : v?.choice;
        answers[key] = {
          choice: choice ?? null,
          confidence: clamp01(v?.confidence ?? (choice ? 1 : 0)),
          probabilities: v?.probabilities ?? undefined,
        };
      } else if (type === "score") {
        const crit = Array.isArray(q?.criteria) ? q.criteria : [];
        const max = crit.length || 5;
        let score = typeof v === "number" ? v : v?.score;
        score = Number.isFinite(score)
          ? Math.max(1, Math.min(max, Math.round(score)))
          : null;
        answers[key] = {
          score,
          confidence: clamp01(v?.confidence ?? (score ? 1 : 0)),
        };
      } else {
        // noul
        let noul;
        if (typeof v === "boolean") noul = v ? 1 : 0;
        else if (typeof v === "number") noul = v;
        else if (v && typeof v === "object")
          noul = v.noul ?? v.p ?? v.probability;
        else noul = 0;
        answers[key] = { noul: clamp01(noul ?? 0) };
      }
    }
    return answers;
  }

  /** Bungkus evaluate() dengan sifat opsional + fail-open. */
  async _safe(state, questions) {
    if (!this.enabled) return { skipped: true, reason: "no_api_key" };
    try {
      const answers = await this.evaluate(state, questions);
      return { skipped: false, answers };
    } catch (err) {
      this._logWarn(`dilewati: ${err.message}`);
      return { skipped: true, reason: "api_error", error: err.message };
    }
  }

  /**
   * Cek blueprint JSON (dipakai sebelum ImplementationPhase).
   * @returns {Promise<{skipped:boolean, ok?:boolean, issues?:string[], scores?:object, reason?:string, error?:string}>}
   */
  async validateBlueprint(blueprint, { threshold = 0.5 } = {}) {
    const r = await this._safe(blueprint, {
      has_placeholder: {
        type: "noul",
        instructions:
          "Apakah ada nilai placeholder atau generik seperti 'string', 'TODO', 'example', 'foo', atau field kosong?",
      },
      pivot_naming_wrong: {
        type: "noul",
        instructions:
          "Apakah ada nama pivot table yang tidak mengikuti konvensi Laravel (dua model singular, urut alfabet, snake_case, misalnya post_tag)?",
      },
      routes_incomplete: {
        type: "noul",
        instructions:
          "Apakah ada route yang tidak punya method HTTP, path, atau handler (komponen Livewire atau controller)?",
      },
    });
    if (r.skipped) return r;

    const a = r.answers || {};
    const labels = {
      has_placeholder: "Ada nilai placeholder",
      pivot_naming_wrong: "Nama pivot table tidak sesuai konvensi",
      routes_incomplete: "Ada route yang tidak lengkap",
    };
    const issues = Object.keys(labels)
      .filter(
        (k) => a[k] && typeof a[k].noul === "number" && a[k].noul > threshold,
      )
      .map((k) => `${labels[k]} (p=${a[k].noul.toFixed(2)})`);

    return {
      skipped: false,
      ok: issues.length === 0,
      issues,
      scores: Object.fromEntries(
        Object.keys(labels).map((k) => [k, a[k]?.noul]),
      ),
    };
  }

  /**
   * Cek output migrasi/sandbox (dipakai di ExecutionPhase) untuk menutup
   * false-positive "FULL TALL APP READY".
   * @returns {Promise<{skipped:boolean, ok?:boolean, migrationFailedP?:number, appReadyP?:number, reason?:string, error?:string}>}
   */
  async validateMigrationOutput(logText, { threshold = 0.5 } = {}) {
    const r = await this._safe(logText, {
      migration_failed: {
        type: "noul",
        instructions:
          "Apakah log ini menunjukkan migrasi database gagal, misalnya error SQL, tabel sudah ada, atau exception artisan?",
      },
      app_ready: {
        type: "noul",
        instructions:
          "Apakah log ini menunjukkan aplikasi benar-benar siap jalan tanpa error yang tersisa?",
      },
    });
    if (r.skipped) return r;

    const failed = r.answers?.migration_failed?.noul ?? 0;
    const ready = r.answers?.app_ready?.noul ?? 1;
    return {
      skipped: false,
      ok: failed <= threshold && ready > threshold,
      migrationFailedP: failed,
      appReadyP: ready,
    };
  }

  /**
   * Router skill: pilih satu skill dari daftar.
   * @param {string} task
   * @param {Object<string,string|null>} skills  { namaSkill: deskripsi }
   * @returns {Promise<{skipped:boolean, skill?:string, confidence?:number, probabilities?:object, reason?:string, error?:string}>}
   */
  async routeSkill(task, skills) {
    const r = await this._safe(task, {
      skill: {
        type: "choice",
        instructions:
          "Skill mana yang paling tepat untuk mengerjakan task ini?",
        criteria: skills,
      },
    });
    if (r.skipped) return r;
    const a = r.answers?.skill || {};
    return {
      skipped: false,
      skill: a.choice,
      confidence: a.confidence,
      probabilities: a.probabilities,
    };
  }

  /**
   * Skor kualitas satu sampel (untuk menyaring data distillation/training).
   * @returns {Promise<{skipped:boolean, score?:number, confidence?:number, reason?:string, error?:string}>}
   */
  async scoreSample(sample) {
    const r = await this._safe(sample, {
      quality: {
        type: "score",
        instructions:
          "Seberapa baik pasangan input-output ini sebagai contoh training untuk generator aplikasi Laravel + Livewire?",
        criteria: [
          "Salah atau tidak berguna",
          "Banyak masalah",
          "Cukup, ada kekurangan",
          "Baik",
          "Sangat baik dan siap pakai",
        ],
      },
    });
    if (r.skipped) return r;
    return {
      skipped: false,
      score: r.answers?.quality?.score,
      confidence: r.answers?.quality?.confidence,
    };
  }
}

module.exports = TypeSafeValidator;
