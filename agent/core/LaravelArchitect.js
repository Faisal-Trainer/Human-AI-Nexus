const fs = require('fs-extra');
const path = require('path');

/**
 * 🛠️ Laravel Architect: The "Muscles" for PHP/Laravel Auto-Fixes
 */
class LaravelArchitect {
    constructor(rootPath) {
        this.rootPath = rootPath;
    }

    /**
     * Inject a Trait into a Laravel Model
     */
    async injectTrait(modelFile, traitNamespace, traitName) {
        const fullPath = path.resolve(this.rootPath, modelFile);
        if (!await fs.pathExists(fullPath)) return false;

        let content = await fs.readFile(fullPath, 'utf8');
        
        // 1. Add 'use' statement if missing
        if (!content.includes(traitNamespace)) {
            content = content.replace(/namespace .*;/g, (match) => `${match}\nuse ${traitNamespace};`);
        }

        // 2. Add 'use trait;' inside class if missing
        if (!content.includes(`use ${traitName};`)) {
            content = content.replace(/class .* {/g, (match) => `${match}\n    use ${traitName};`);
        }

        await fs.writeFile(fullPath, content);
        return true;
    }

    /**
     * Add a column to a migration file
     */
    async addMigrationColumn(migrationFile, columnDefinition) {
        const fullPath = path.resolve(this.rootPath, migrationFile);
        if (!await fs.pathExists(fullPath)) return false;

        let content = await fs.readFile(fullPath, 'utf8');
        
        // Inject before timestamps or at the end of the closure
        if (content.includes('$table->timestamps()')) {
            content = content.replace('$table->timestamps()', `${columnDefinition}\n            $table->timestamps()`);
        } else {
            content = content.replace(/}\);/g, `    ${columnDefinition}\n        });`);
        }

        await fs.writeFile(fullPath, content);
        return true;
    }

    /**
     * Ensure environment variables exist
     */
    async ensureEnv(key, value) {
        const envPath = path.join(this.rootPath, '.env');
        let content = '';
        if (await fs.pathExists(envPath)) {
            content = await fs.readFile(envPath, 'utf8');
        }

        if (content.includes(`${key}=`)) {
            content = content.replace(new RegExp(`${key}=.*`, 'g'), `${key}=${value}`);
        } else {
            content += `\n${key}=${value}`;
        }

        await fs.writeFile(envPath, content.trim() + '\n');
        return true;
    }
}

module.exports = LaravelArchitect;
