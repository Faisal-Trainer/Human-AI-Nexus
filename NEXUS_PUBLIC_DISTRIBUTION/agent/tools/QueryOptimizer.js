const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

/**
 * QueryOptimizer - Performance Indexing Machine.
 */
class QueryOptimizer {
    constructor(rootPath) {
        this.rootPath = rootPath;
    }

    async scanMigrations() {
        const migrationsPath = path.join(this.rootPath, 'database/migrations');
        if (!(await fs.pathExists(migrationsPath))) return [];

        const files = glob.sync('**/*.php', { cwd: migrationsPath });
        const findings = [];

        for (const file of files) {
            const content = await fs.readFile(path.join(migrationsPath, file), 'utf8');
            
            // Regex to find foreign keys without index
            const foreignKeyRegex = /foreignId\(['"](.*)['"]\)/g;
            let match;
            while ((match = foreignKeyRegex.exec(content)) !== null) {
                if (!content.includes(`index(['"${match[1]}"'])`) && !content.includes(`constrained()`)) {
                    findings.push({
                        severity: 'WARNING',
                        message: `Foreign Key '${match[1]}' may be missing an index.`,
                        file: `database/migrations/${file}`
                    });
                }
            }
        }

        return findings;
    }
}

module.exports = QueryOptimizer;
