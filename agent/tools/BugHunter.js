const fs = require("fs-extra");
const path = require("path");

/**
 * BugHunter - Strategy Pivot Machine.
 * Codifies the '3 Fixes Rule' from NEXUS_VERIFICATION_CHECKLIST.md.
 * Persists state to memory/short_term/bug_attempts.json.
 * FIX #19 — Converted all sync I/O to async to prevent event loop blocking.
 */
class BugHunter {
  constructor(rootPath) {
    this.rootPath = rootPath || process.cwd();
    this.logPath = path.join(
      this.rootPath,
      "memory",
      "short_term",
      "bug_attempts.json",
    );
    this.attemptLog = new Map();
    this.MAX_ATTEMPTS = 3;
    this._loaded = false;
    this._loadPromise = null;
  }

  /**
   * FIX #19 — Async load: tidak memblok event loop
   */
  async loadLog() {
    if (this._loaded) return;
    if (this._loadPromise) return this._loadPromise;

    this._loadPromise = (async () => {
      try {
        if (await fs.pathExists(this.logPath)) {
          const data = await fs.readJson(this.logPath);
          this.attemptLog = new Map(Object.entries(data));
        }
      } catch (err) {
        console.error("⚠️ BugHunter: Failed to load attempt log:", err.message);
      }
      this._loaded = true;
    })();

    return this._loadPromise;
  }

  /**
   * FIX #19 — Async save: tidak memblok event loop
   */
  async saveLog() {
    try {
      await fs.ensureDir(path.dirname(this.logPath));
      const data = Object.fromEntries(this.attemptLog);
      await fs.writeJson(this.logPath, data, { spaces: 2 });
    } catch (err) {
      console.error("⚠️ BugHunter: Failed to save attempt log:", err.message);
    }
  }

  /**
   * Track a task attempt.
   * @param {string} taskId - Unique task ID or description.
   */
  async trackAttempt(taskId) {
    await this.loadLog(); // FIX #19 — Ensure loaded before access
    const current = this.attemptLog.get(taskId) || 0;
    this.attemptLog.set(taskId, current + 1);
    await this.saveLog();

    if (current + 1 >= this.MAX_ATTEMPTS) {
      return {
        shouldPivot: true,
        message: `CRITICAL: Task '${taskId}' has failed ${this.MAX_ATTEMPTS} times. Strategy Pivot REQUIRED. Stop and discuss with user.`,
      };
    }

    return { shouldPivot: false, attempts: current + 1 };
  }

  async reset(taskId) {
    await this.loadLog();
    this.attemptLog.delete(taskId);
    await this.saveLog();
  }
}

module.exports = BugHunter;
