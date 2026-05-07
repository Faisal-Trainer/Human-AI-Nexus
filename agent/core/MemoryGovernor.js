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
        const dirs = ['raw', 'normalized', 'semantic', 'distilled', 'operational', 'archived'];
        dirs.forEach(dir => {
            fs.ensureDirSync(path.join(this.memoryPath, dir));
        });
    }

    generateChecksum(content) {
        return crypto.createHash('sha256').update(content).digest('hex');
    }

    async validateAndStore(category, filename, content, metadata = {}) {
        const validCategories = ['raw', 'normalized', 'semantic', 'distilled', 'operational', 'archived'];
        if (!validCategories.includes(category)) {
            throw new Error(`MemoryGovernor: Invalid category '${category}'`);
        }

        const targetDir = path.join(this.memoryPath, category);
        const targetFile = path.join(targetDir, filename);

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

        await fs.writeJson(outputPath, fileData, { spaces: 2 });
        return { status: 'stored', file: outputPath, version, checksum };
    }
}

module.exports = MemoryGovernor;
