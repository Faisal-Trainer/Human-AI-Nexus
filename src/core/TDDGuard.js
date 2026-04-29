const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

/**
 * TDDGuard - Enforcer of the Nexus TDD Iron Laws.
 * Ensures production code is only modified if a corresponding test exists.
 */
class TDDGuard {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.testDirs = ['tests', 'test', 'tests/Unit', 'tests/Feature'];
    }

    /**
     * Check if a file modification is allowed under TDD rules
     * @param {string} targetFile - Relative path to the file being modified
     * @returns {Object} - { allowed: boolean, reason: string }
     */
    async validate(targetFile) {
        // 1. If it's a new file, it might be allowed (Engine is creating it)
        // However, Iron Law says "Test first". But for bootstrapping, we might allow it.
        // For now, let's focus on MODIFICATIONS of existing code.
        
        const fullPath = path.join(this.rootPath, targetFile);
        if (!(await fs.pathExists(fullPath))) {
            return { allowed: true, reason: 'New file creation allowed.' };
        }

        // 2. Identify matching test patterns
        const fileName = path.basename(targetFile, path.extname(targetFile));
        const testPatterns = [
            `**/${fileName}.test.js`,
            `**/${fileName}Test.php`,
            `**/${fileName}.spec.js`,
            `**/test_${fileName}.py`
        ];

        let testFound = false;
        for (const dir of this.testDirs) {
            const dirPath = path.join(this.rootPath, dir);
            if (await fs.pathExists(dirPath)) {
                const matches = glob.sync(`{${testPatterns.join(',')}}`, { cwd: dirPath });
                if (matches.length > 0) {
                    testFound = true;
                    break;
                }
            }
        }

        if (testFound) {
            return { allowed: true, reason: 'Test found. TDD compliance verified.' };
        }

        return { 
            allowed: false, 
            reason: `TDD Violation: No test file found for '${targetFile}'. As per NEXUS_TDD_IRON_LAWS, you must write a failing test before modifying production code.` 
        };
    }
}

module.exports = TDDGuard;
