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
        const fullPath = path.join(this.rootPath, targetFile);
        if (!(await fs.pathExists(fullPath))) {
            return { allowed: true, reason: 'New file creation allowed.' };
        }

        // 2. Check for TDD_LIST.md or TDD_TASKS.md (The user's "TDD list")
        const tddListFiles = ['TDD_LIST.md', 'TDD_TASKS.md', 'documentation/planning/TDD_LIST.md'];
        for (const listFile of tddListFiles) {
            const listPath = path.join(this.rootPath, listFile);
            if (await fs.pathExists(listPath)) {
                const content = await fs.readFile(listPath, 'utf8');
                // If the target file is mentioned in the TDD list, assume it's part of an active TDD cycle
                if (content.includes(targetFile) || content.includes(path.basename(targetFile))) {
                    return { allowed: true, reason: `File found in '${listFile}'. TDD planning verified.` };
                }
            }
        }

        // 3. Identify matching test patterns
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
            reason: `TDD Violation: No test file found for '${targetFile}' and not listed in TDD_LIST.md. As per NEXUS_TDD_IRON_LAWS, you must write a failing test or document it in the TDD list before modifying production code.` 
        };
    }
}

module.exports = TDDGuard;
