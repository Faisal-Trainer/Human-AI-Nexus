const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

class MemoryGovernor {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.memoryPath = path.join(this.rootPath, 'memory');
        this.ensureDirectories();
    }

    ensureDirectories() {
        const dirs = ['raw', 'normalized', 'semantic', 'distilled', 'operational', 'archived', 'short_term'];
        dirs.forEach(dir => {
            fs.ensureDirSync(path.join(this.memoryPath, dir));
        });
    }

    generateChecksum(content) {
        return crypto.createHash('sha256').update(content).digest('hex');
    }

    async acquireLock(filename, timeoutMs = 5000) {
        const lockFile = path.join(this.memoryPath, `${filename}.lock`);
        const start = Date.now();
        while (await fs.pathExists(lockFile)) {
            if (Date.now() - start > timeoutMs) {
                throw new Error(`MemoryGovernor: Lock timeout on ${filename}`);
            }
            await new Promise(r => setTimeout(r, 100));
        }
        await fs.writeJson(lockFile, { locked_at: new Date().toISOString() });
    }

    async releaseLock(filename) {
        const lockFile = path.join(this.memoryPath, `${filename}.lock`);
        if (await fs.pathExists(lockFile)) {
            await fs.remove(lockFile);
        }
    }

    async validateAndStore(category, filename, content, metadata = {}) {
        const validCategories = ['raw', 'normalized', 'semantic', 'distilled', 'operational', 'archived', 'short_term'];
        if (!validCategories.includes(category)) {
            throw new Error(`MemoryGovernor: Invalid category '${category}'`);
        }

        const targetDir = path.join(this.memoryPath, category);
        const targetFile = path.join(targetDir, filename);

        await this.acquireLock(filename);
        try {
            const checksum = this.generateChecksum(typeof content === 'string' ? content : JSON.stringify(content));
            
            let version = 1;
            if (await fs.pathExists(targetFile)) {
                const existingContent = await fs.readFile(targetFile, 'utf8');
                const existingChecksum = this.generateChecksum(existingContent);
                if (existingChecksum === checksum) {
                    return { status: 'unchanged', file: targetFile, version };
                }
                version = (metadata.version || 1) + 1;
            }

            const fileData = {
                content: content,
                metadata: {
                    ...metadata,
                    version: version,
                    checksum: checksum,
                    timestamp: new Date().toISOString()
                }
            };

            const outputFilename = filename.endsWith('.json') ? filename : `${filename}.json`;
            const outputPath = path.join(targetDir, outputFilename);

            if (await fs.pathExists(outputPath)) {
                const backupPath = path.join(this.memoryPath, 'archived', `${outputFilename}.v${version - 1}.bak.json`);
                await fs.copy(outputPath, backupPath);
            }

            await fs.writeJson(outputPath, fileData, { spaces: 2 });
            return { status: 'stored', file: outputPath, version, checksum };
        } finally {
            await this.releaseLock(filename);
        }
    }
}

module.exports = MemoryGovernor;
