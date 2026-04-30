const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

/**
 * SchemaGuard - Identity & Security Machine.
 * Codifies NEXUS_DATABASE_STANDARDS.md.
 */
class SchemaGuard {
    constructor(rootPath) {
        this.rootPath = rootPath;
    }

    async validateModels() {
        const modelsPath = path.join(this.rootPath, 'app/Models');
        if (!(await fs.pathExists(modelsPath))) return [];

        const files = glob.sync('**/*.php', { cwd: modelsPath });
        const findings = [];

        for (const file of files) {
            const content = await fs.readFile(path.join(modelsPath, file), 'utf8');
            
            if (content.includes('$guarded = []')) {
                findings.push({
                    severity: 'CRITICAL',
                    message: 'Forbidden $guarded = [] detected. Use $fillable instead.',
                    file: `app/Models/${file}`
                });
            }

            if (!content.includes('HasUuids')) {
                findings.push({
                    severity: 'WARNING',
                    message: 'Model missing HasUuids trait for UUID consistency.',
                    file: `app/Models/${file}`
                });
            }
        }

        return findings;
    }
}

module.exports = SchemaGuard;
