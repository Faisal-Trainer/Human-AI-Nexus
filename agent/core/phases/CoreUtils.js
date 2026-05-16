const fs = require('fs-extra');
const path = require('path');
const fg = require('fast-glob');

/**
 * Core Utilities for Nexus Phases
 */
class CoreUtils {
    /**
     * Resolves project paths based on Nexus convention.
     */
    static resolvePath(rootPath, nexusDataPath, docsBase, folderName, alternative) {
        const possiblePaths = [
            path.join(rootPath, 'documentation', folderName),
            path.join(rootPath, 'memory', folderName),
            path.join(rootPath, 'memory', alternative || folderName),
            path.join(docsBase, folderName),
            path.join(nexusDataPath, folderName),
            path.join(rootPath, folderName)
        ];
        for (const p of possiblePaths) {
            if (fs.pathExistsSync(p)) return p;
        }
        return path.join(rootPath, 'memory', folderName); // Default to memory/
    }

    /**
     * Helper for recursive file scanning (Optimized for SSD)
     */
    static async globRecursive(dir, pattern) {
        // fast-glob is significantly faster on SSD than traditional glob
        const entries = await fg(pattern, {
            cwd: dir,
            absolute: true,
            onlyFiles: true,
            ignore: ['**/node_modules/**', '**/vendor/**', '**/.git/**']
        });
        return entries;
    }


    /**
     * Recursive deletion helper
     */
    static async removeRecursive(targetPath) {
        if (await fs.pathExists(targetPath)) {
            await fs.remove(targetPath);
        }
    }
}

module.exports = CoreUtils;
