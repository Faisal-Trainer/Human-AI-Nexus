const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

/**
 * WorktreeManager - Isolation Machine.
 * Codifies NEXUS_VCS_STRATEGY.md.
 *
 * ⚠️  STATUS: INACTIVE — Git worktree commands are commented out.
 *     isActive = false prevents misleading logs.
 *     To activate: set isActive = true AND uncomment execSync calls below.
 */
class WorktreeManager {
    constructor(rootPath) {
        this.rootPath = rootPath;

        // ⛔ GUARD: Set ke true hanya setelah git commands diuji dan siap production
        this.isActive = false;
    }

    /**
     * Internal guard — dipanggil di awal setiap method.
     * @param {string} methodName
     * @returns {boolean} true jika bisa lanjut, false jika harus abort
     */
    _checkActive(methodName) {
        if (!this.isActive) {
            console.warn(
                `⚠️  WorktreeManager [${methodName}]: Module is INACTIVE (isActive=false). ` +
                `Git worktree operation skipped. No changes were made.`
            );
            return false;
        }
        return true;
    }

    /**
     * Create an isolated worktree for a specific feature/task.
     */
    async create(featureName) {
        if (!this._checkActive('create')) return null;

        const targetPath = path.join(this.rootPath, '..', `NEXUS_WORKTREE_${featureName.toUpperCase()}`);
        console.log(`🌳 WorktreeManager: Isolating '${featureName}' in ${targetPath}...`);
        
        try {
            execSync(`git worktree add -b feature/${featureName} ${targetPath} main`, { cwd: this.rootPath });
            return targetPath;
        } catch (e) {
            console.error(`❌ WorktreeManager Error: ${e.message}`);
            return null;
        }
    }

    /**
     * Merge the worktree back to main and cleanup.
     */
    async finalize(featureName) {
        if (!this._checkActive('finalize')) return false;

        const targetPath = path.join(this.rootPath, '..', `NEXUS_WORKTREE_${featureName.toUpperCase()}`);
        console.log(`🌳 WorktreeManager: Merging and cleaning up '${featureName}'...`);
        
        try {
            execSync(`git checkout main && git merge feature/${featureName}`, { cwd: this.rootPath });
            await this.remove(featureName);
            console.log(`   ✅ Feature '${featureName}' merged and worktree removed.`);
            return true;
        } catch (e) {
            console.error(`❌ WorktreeManager Merge Error: ${e.message}`);
            return false;
        }
    }

    async remove(featureName) {
        if (!this._checkActive('remove')) return;

        const targetPath = path.join(this.rootPath, '..', `NEXUS_WORKTREE_${featureName.toUpperCase()}`);
        if (await fs.pathExists(targetPath)) {
            execSync(`git worktree remove ${targetPath}`, { cwd: this.rootPath });
            await fs.remove(targetPath);
        }
    }
}

module.exports = WorktreeManager;
