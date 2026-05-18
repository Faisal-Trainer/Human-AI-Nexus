const { spawn } = require('child_process');
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

        // ⛔ GUARD: Diaktifkan dinamis berdasarkan konfigurasi env
        this.isActive = process.env.NEXUS_GIT_ISOLATION === 'true';
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
            // FIX #13 — Async git call, tidak memblok event loop
            await this._execGit(['worktree', 'add', '-b', `feature/${featureName}`, targetPath, 'main'], this.rootPath);
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
            // FIX #13 — Sequential async calls, tidak memblok event loop
            await this._execGit(['checkout', 'main'], this.rootPath);
            await this._execGit(['merge', `feature/${featureName}`], this.rootPath);
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
            // FIX #13 — Async git call
            await this._execGit(['worktree', 'remove', targetPath], this.rootPath).catch(() => {});
            await fs.remove(targetPath);
        }
    }

    // FIX #13 — Async git wrapper: tidak memblok event loop, ada timeout 30 detik
    async _execGit(args, cwd, timeoutMs = 30000) {
        return new Promise((resolve, reject) => {
            const proc = spawn('git', args, { cwd, shell: false });
            let out = '', err = '';
            const timer = setTimeout(() => {
                proc.kill();
                reject(new Error(`WorktreeManager: git ${args.join(' ')} timed out after ${timeoutMs}ms`));
            }, timeoutMs);
            proc.stdout.on('data', d => out += d.toString());
            proc.stderr.on('data', d => err += d.toString());
            proc.on('close', code => {
                clearTimeout(timer);
                code === 0 ? resolve(out.trim()) : reject(new Error(err.trim() || `git exit code ${code}`));
            });
            proc.on('error', e => { clearTimeout(timer); reject(e); });
        });
    }
}

module.exports = WorktreeManager;
