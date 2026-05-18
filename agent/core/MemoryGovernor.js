const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const NexusClock = require('./NexusClock');

class MemoryGovernor {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.memoryPath = path.join(this.rootPath, 'memory');
        this.initialized = this.ensureDirectories();
    }

    async ensureDirectories() {
        const dirs = ['raw', 'normalized', 'semantic', 'distilled', 'operational', 'archived', 'short_term'];
        for (const dir of dirs) {
            await fs.ensureDir(path.join(this.memoryPath, dir));
        }
    }

    generateChecksum(content) {
        return crypto.createHash('sha256').update(content).digest('hex');
    }

    /**
     * Acquire a file lock with stale lock detection and exponential backoff.
     * v2.0: Fixed permanent deadlock issue when process crashes while holding lock.
     *
     * @param {string} filename - The file to lock.
     * @param {number} [timeoutMs=5000] - Max wait time before throwing.
     */
    async acquireLock(filename, timeoutMs = 5000) {
        const lockFile = path.join(this.memoryPath, `${filename}.lock`);
        const start = Date.now();
        const STALE_THRESHOLD_MS = 30000; // Lock lebih dari 30 detik = stale

        while (await fs.pathExists(lockFile)) {
            // ⛔ STALE LOCK DETECTION: Kalau lock terlalu tua, prosesnya mungkin sudah mati
            try {
                const lockData = await fs.readJson(lockFile);
                const lockAge = Date.now() - new Date(lockData.locked_at).getTime();

                if (lockAge > STALE_THRESHOLD_MS) {
                    console.warn(
                        `⚠️  MemoryGovernor: Stale lock detected on "${filename}" ` +
                        `(age: ${Math.round(lockAge / 1000)}s, PID: ${lockData.process_pid || 'unknown'}). ` +
                        `Force releasing stale lock.`
                    );
                    await fs.remove(lockFile);
                    break; // Lock dihapus, lanjut acquire
                }
            } catch (e) {
                // Lock file corrupt atau tidak bisa dibaca — hapus saja
                console.warn(`⚠️  MemoryGovernor: Corrupt lock file on "${filename}". Removing.`);
                await fs.remove(lockFile).catch(() => {});
                break;
            }

            // Cek timeout
            if (Date.now() - start > timeoutMs) {
                throw new Error(
                    `MemoryGovernor: Lock timeout on "${filename}" after ${timeoutMs}ms. ` +
                    `Another process may be holding the lock.`
                );
            }

            // Exponential backoff — kurangi polling pressure saat banyak agent bersamaan
            const elapsed = Date.now() - start;
            const waitMs = Math.min(100 * Math.pow(1.5, Math.floor(elapsed / 500)), 1000);
            await new Promise(r => setTimeout(r, waitMs));
        }

        // Tulis lock dengan metadata untuk stale detection
        await fs.writeJson(lockFile, {
            locked_at: new Date().toISOString(),
            process_pid: process.pid // Track siapa yang memegang lock
        });
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
                    timestamp: NexusClock.getISOTimestamp()
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
