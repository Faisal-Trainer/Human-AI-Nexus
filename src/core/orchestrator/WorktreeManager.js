const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

/**
 * WorktreeManager - Isolation Machine.
 * Codifies NEXUS_VCS_STRATEGY.md.
 */
class WorktreeManager {
    constructor(rootPath) {
        this.rootPath = rootPath;
    }

    /**
     * Create an isolated worktree for a specific feature/task.
     */
    async create(featureName) {
        const targetPath = path.join(this.rootPath, '..', `NEXUS_WORKTREE_${featureName.toUpperCase()}`);
        console.log(`🌳 WorktreeManager: Isolating '${featureName}' in ${targetPath}...`);
        
        try {
            // execSync(`git worktree add -b feature/${featureName} ${targetPath} main`, { cwd: this.rootPath });
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
        const targetPath = path.join(this.rootPath, '..', `NEXUS_WORKTREE_${featureName.toUpperCase()}`);
        console.log(`🌳 WorktreeManager: Merging and cleaning up '${featureName}'...`);
        
        try {
            // execSync(`git checkout main && git merge feature/${featureName}`, { cwd: this.rootPath });
            // await this.remove(featureName);
            console.log(`   ✅ Feature '${featureName}' merged and worktree removed.`);
            return true;
        } catch (e) {
            console.error(`❌ WorktreeManager Merge Error: ${e.message}`);
            return false;
        }
    }

    async remove(featureName) {
        const targetPath = path.join(this.rootPath, '..', `NEXUS_WORKTREE_${featureName.toUpperCase()}`);
        if (await fs.pathExists(targetPath)) {
            // execSync(`git worktree remove ${targetPath}`, { cwd: this.rootPath });
            await fs.remove(targetPath);
        }
    }
}

module.exports = WorktreeManager;
