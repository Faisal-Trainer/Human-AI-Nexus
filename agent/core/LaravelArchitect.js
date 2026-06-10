const Modifier = require("./Modifier");

/**
 * 🛠️ Laravel Architect: The "Muscles" for PHP/Laravel Auto-Fixes
 * FIX #18 — Delegates shared operations to Modifier to eliminate code duplication.
 */
class LaravelArchitect {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this._modifier = new Modifier(rootPath);
  }

  /**
   * Inject a Trait into a Laravel Model
   * FIX #18 — Delegates to Modifier.injectTrait()
   */
  async injectTrait(modelFile, traitNamespace, traitName) {
    return await this._modifier.injectTrait(
      modelFile,
      traitNamespace,
      traitName,
    );
  }

  /**
   * Add a column to a migration file
   * FIX #18 — Delegates to Modifier.addMigrationColumn()
   */
  async addMigrationColumn(migrationFile, columnDefinition) {
    return await this._modifier.addMigrationColumn(
      migrationFile,
      columnDefinition,
    );
  }

  /**
   * Ensure environment variables exist
   * FIX #18 — Delegates to Modifier.ensureEnv()
   */
  async ensureEnv(key, value) {
    const envPath = require("path").join(this.rootPath, ".env");
    return await this._modifier.ensureEnv(envPath, key, value);
  }
}

module.exports = LaravelArchitect;
