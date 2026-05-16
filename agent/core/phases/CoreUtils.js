const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

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
     * Helper for recursive file scanning
     */
    static async globRecursive(dir, pattern) {
        return new Promise((resolve, reject) => {
            const fullPattern = path.join(dir, pattern).replace(/\\/g, '/');
            glob(fullPattern, (err, files) => {
                if (err) reject(err);
                else resolve(files);
            });
        });
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
