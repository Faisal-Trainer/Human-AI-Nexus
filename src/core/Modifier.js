const fs = require('fs-extra');
const path = require('path');

/**
 * Modifier - The "Muscles" of the Nexus Engine.
 * Handles atomic file operations requested by the Orchestrator.
 */
class Modifier {
    constructor(rootPath) {
        this.rootPath = rootPath;
    }

    /**
     * Apply an action to the file system
     * @param {Object} action - { type, target, content, replacement }
     */
    async apply(action) {
        if (!action || !action.type) return false;

        const targetPath = path.resolve(this.rootPath, action.target);
        
        // Security Guard: Prevent writing outside root
        if (!targetPath.startsWith(this.rootPath)) {
            throw new Error(`Security Violation: Attempted to write outside project root: ${action.target}`);
        }

        switch (action.type) {
            case 'FILE_CREATE':
                return await this.fileCreate(targetPath, action.content);
            case 'FILE_APPEND':
                return await this.fileAppend(targetPath, action.content);
            case 'FILE_REPLACE':
                return await this.fileReplace(targetPath, action.targetContent, action.replacementContent);
            default:
                throw new Error(`Unknown action type: ${action.type}`);
        }
    }

    async fileCreate(filePath, content) {
        await fs.ensureDir(path.dirname(filePath));
        await fs.writeFile(filePath, content || '');
        return true;
    }

    async fileAppend(filePath, content) {
        if (await fs.pathExists(filePath)) {
            await fs.appendFile(filePath, `\n${content}`);
            return true;
        }
        return await this.fileCreate(filePath, content);
    }

    async fileReplace(filePath, targetContent, replacementContent) {
        if (await fs.pathExists(filePath)) {
            let content = await fs.readFile(filePath, 'utf8');
            if (content.includes(targetContent)) {
                const newContent = content.replace(targetContent, replacementContent);
                await fs.writeFile(filePath, newContent);
                return true;
            }
            throw new Error(`Target content not found in file: ${filePath}`);
        }
        throw new Error(`File not found: ${filePath}`);
    }
}

module.exports = Modifier;
