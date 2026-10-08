/**
 * TypeSafeValidator.js
 * Wrapper untuk TypeSafe evaluation endpoint (POST /v1/systemone, model jev-latest).
 * Dipakai sebagai gate/validator opsional di pipeline NEXUS, bukan generator.
 *
 * - Opsional: tanpa TYPESAFE_API_KEY semua method mengembalikan { skipped: true }
 * - Fail-open: kalau API error/timeout, pipeline lanjut (skipped: true, error: ...)
 * - Retry exponential backoff untuk 429 dan 529
 * - Kompatibel dengan Node 18+ dan Bun (fetch bawaan)
 */

const DEFAULT_ENDPOINT = "https://api.typesafe.ai/v1/systemone";
const DEFAULT_MODEL = "jev-latest";

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
    this.endpoint = opts.endpoint || process.env.TYPESAFE_ENDPOINT || DEFAULT_ENDPOINT;
    this.model = opts.model || process.env.TYPESAFE_MODEL || DEFAULT_MODEL;
    this.timeoutMs = opts.timeoutMs ?? 20000;
    this.maxRetries = opts.maxRetries ?? 3;
    this.logger = opts.logger || console;
  }

  get enabled() {
    return Boolean(this.apiKey);
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

  /** Panggilan mentah. Return objek `answers`, atau throw kalau gagal. */
  async evaluate(state, questions) {
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
          body: JSON.stringify({ state, model: this.model, questions }),
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
          throw Object.assign(new Error(`TypeSafe ${res.status}: ${body}`), { fatal: true });
        }
        const data = await res.json();
        return data.answers;
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
      .filter((k) => a[k] && typeof a[k].noul === "number" && a[k].noul > threshold)
      .map((k) => `${labels[k]} (p=${a[k].noul.toFixed(2)})`);

    return {
      skipped: false,
      ok: issues.length === 0,
      issues,
      scores: Object.fromEntries(Object.keys(labels).map((k) => [k, a[k]?.noul])),
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
        instructions: "Skill mana yang paling tepat untuk mengerjakan task ini?",
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
