const fs = require('fs-extra');
const path = require('path');

/**
 * Validator - Physical Task Verification Machine.
 * Codifies NEXUS_VERIFICATION_CHECKLIST.md.
 */
class Validator {
    constructor(rootPath) {
        this.rootPath = rootPath;
    }

    /**
     * Physically verify if a task change was applied.
     * @param {Object} action - The action that was supposed to be performed.
     */
    async verifyAction(action) {
        if (!action || !action.target) return { success: true, message: 'No physical action to verify.' };

        const fullPath = path.join(this.rootPath, action.target);
        const exists = await fs.pathExists(fullPath);

        if (!exists && action.type !== 'FILE_DELETE') {
            return { success: false, message: `Evidence missing: File '${action.target}' does not exist.` };
        }

        if (action.type === 'FILE_CREATE' || action.type === 'FILE_REPLACE' || action.type === 'FILE_APPEND') {
            const content = await fs.readFile(fullPath, 'utf8');
            if (action.content && !content.includes(action.content)) {
                return { success: false, message: `Evidence missing: Expected content not found in '${action.target}'.` };
            }
        }

        if (action.type === 'FILE_DELETE' && exists) {
            return { success: false, message: `Evidence missing: File '${action.target}' still exists after deletion.` };
        }

        return { success: true, message: 'Physical evidence verified.' };
    }
}

module.exports = Validator;
