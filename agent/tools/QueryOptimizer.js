const fs = require("fs-extra");
const path = require("path");
const fg = require("fast-glob");

/**
 * QueryOptimizer - Performance Indexing Machine.
 */
class QueryOptimizer {
  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  async scanMigrations() {
    const migrationsPath = path.join(this.rootPath, "database/migrations");
    if (!(await fs.pathExists(migrationsPath))) return [];

    const files = fg.sync("**/*.php", {
      cwd: migrationsPath.replace(/\\/g, "/"),
    });
    const findings = [];

    for (const file of files) {
      const content = await fs.readFile(
        path.join(migrationsPath, file),
        "utf8",
      );

      // FIX #20 — Use matchAll() instead of exec() loop to prevent infinite loop
      // when regex matches zero-length string or lastIndex doesn't advance
      const foreignKeyRegex = /foreignId\(['"](.*)['"]\)/g;
      const matches = [...content.matchAll(foreignKeyRegex)];

      for (const match of matches) {
        if (
          !content.includes(`index(['"${match[1]}"'])`) &&
          !content.includes(`constrained()`)
        ) {
          findings.push({
            severity: "WARNING",
            message: `Foreign Key '${match[1]}' may be missing an index.`,
            file: `database/migrations/${file}`,
          });
        }
      }
    }

    return findings;
  }
}

module.exports = QueryOptimizer;
