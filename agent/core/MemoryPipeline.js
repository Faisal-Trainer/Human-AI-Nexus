const fs = require('fs-extra');
const path = require('path');

/**
 * MemoryPipeline - Automated Storage Optimization.
 * v2.0: versionedWrite — backup before overwrite, no data loss.
 */
class MemoryPipeline {
    constructor(rootPath, knowledgePath, auditPath, planningPath) {
        this.rootPath = rootPath;
        this.knowledgePath = knowledgePath;
        this.auditPath = auditPath || path.join(this.rootPath, 'memory', 'operational', 'audit');
        this.planningPath = planningPath || path.join(this.rootPath, 'memory', 'operational', 'planning');
        this.recordsPath = path.join(this.rootPath, 'memory', 'operational', 'records');
        this.archiveFile = path.join(this.knowledgePath, 'SESSION_HISTORY_ARCHIVE.md');
        this.backupPath = path.join(this.rootPath, 'memory', 'archived');
    }

    async optimize() {
        console.log('🧹 Memory Pipeline: Starting storage optimization...');
        await this.archiveAuditReports();
        await this.archiveImplementationPlans();
        await this.processHarvestData();
        await this.writeSemanticIndex();
        console.log('✅ Memory Pipeline: Optimization complete.');
    }

    /**
     * ⛔ VERSIONED WRITE: Backup dulu sebelum overwrite.
     * Tidak ada data yang hilang tanpa backup.
     */
    async versionedWrite(destPath, content) {
        if (await fs.pathExists(destPath)) {
            const timestamp = Date.now();
            const basename = path.basename(destPath, path.extname(destPath));
            const ext = path.extname(destPath);
            const backupName = `${basename}_backup_${timestamp}${ext}`;
            const backupDest = path.join(this.backupPath, backupName);

            await fs.ensureDir(this.backupPath);
            await fs.copy(destPath, backupDest);
            console.log(`   💾 Versioned: ${path.basename(destPath)} → archived/${backupName}`);
        }
        await fs.writeFile(destPath, content);
    }

    async processHarvestData() {
        const harvestPath = path.join(this.rootPath, 'golden', 'harvest');
        if (!(await fs.pathExists(harvestPath))) return;

        console.log('🌾 Memory Pipeline: Processing harvest with Cleansing Protocol...');
        const projects = await fs.readdir(harvestPath);

        for (const project of projects) {
            const projectPath = path.join(harvestPath, project);
            if (!(await fs.lstat(projectPath)).isDirectory()) continue;

            console.log(`🌾 Memory Pipeline: Ingesting [${project}]...`);
            const files = await this.globRecursive(projectPath, '**/*.md');

            for (const file of files) {
                let content = await fs.readFile(file, 'utf8');
                content = this.cleanseContent(content);

                const relativePath = path.relative(projectPath, file);
                const isRecords = ['records', 'summary', 'audit', 'planning'].some(k => relativePath.includes(k));
                const fileName = path.basename(file);
                const dest = isRecords
                    ? path.join(this.recordsPath, fileName)
                    : path.join(this.knowledgePath, fileName);

                await fs.ensureDir(path.dirname(dest));
                // ⛔ Versioned write — bukan fs.writeFile langsung
                await this.versionedWrite(dest, content);
                console.log(`   📦 Harvested: ${fileName} ➔ ${path.basename(path.dirname(dest))}/`);
            }
        }

        await fs.emptyDir(harvestPath);
        console.log('   🧹 Harvest folder recycled.');
    }

    cleanseContent(content) {
        const patterns = [
            /(?:key|api|secret|token|pass|password|auth)[\s:=]+['"]?([a-z0-9\-_]{16,})['"]?/gi,
            /(?:https?:\/\/)[a-z0-9]+:[a-z0-9]+@[a-z0-9.]+/gi,
            /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g
        ];
        let cleansed = content;
        for (const p of patterns) {
            cleansed = cleansed.replace(p, (match, p1) => {
                if (p1) return match.replace(p1, '[REDACTED_BY_NEXUS]');
                return '[REDACTED_BY_NEXUS]';
            });
        }
        return cleansed;
    }

    async globRecursive(dir, pattern) {
        const fg = require('fast-glob');
        const normalizedDir = dir.replace(/\\/g, '/');
        const fullPattern = path.join(normalizedDir, pattern).replace(/\\/g, '/');
        return await fg(fullPattern);
    }

    async archiveAuditReports() {
        const auditDir = this.auditPath;
        if (!(await fs.pathExists(auditDir))) return;

        const files = await fs.readdir(auditDir);
        let archiveContent = `\n\n## 📁 ARCHIVED AUDITS - ${new Date().toLocaleDateString()}\n`;
        let count = 0;

        for (const file of files) {
            if (file === '.gitkeep' || !file.endsWith('.json')) continue;
            const data = await fs.readJson(path.join(auditDir, file));
            archiveContent += `- **Audit ID**: ${data.id} | **Target**: ${data.target} | **Findings**: ${(data.findings || []).length}\n`;
            count++;
        }

        if (count > 0) {
            await this.appendToArchive(archiveContent);
            console.log(`   📦 Archived: ${count} audit reports.`);
        }
    }

    async archiveImplementationPlans() {
        const planningDir = this.planningPath;
        if (!(await fs.pathExists(planningDir))) return;

        const files = await fs.readdir(planningDir);
        let archiveContent = `\n\n## 🛠 ARCHIVED PLANS - ${new Date().toLocaleDateString()}\n`;
        let count = 0;

        for (const file of files) {
            if (file === '.gitkeep' || !file.endsWith('.json')) continue;
            const data = await fs.readJson(path.join(planningDir, file));
            archiveContent += `- **Plan ID**: ${data.id} | **Audit Ref**: ${data.auditRef} | **Tasks**: ${(data.tasks || []).length}\n`;
            count++;
        }

        if (count > 0) {
            await this.appendToArchive(archiveContent);
            console.log(`   📦 Archived: ${count} implementation plans.`);
        }
    }

    async appendToArchive(content) {
        const archiveFile = await this.getArchiveFile();
        await fs.ensureFile(archiveFile);
        let existingContent = await fs.readFile(archiveFile, 'utf8');
        
        const tags = '\n\n---\n> **METADATA (NEXUS SEMANTIC TAGS)**: [audit, performance, testing, tdd]\n';
        
        if (!existingContent.includes('METADATA')) {
            // First time: append content and then tags
            await fs.appendFile(archiveFile, content + tags);
        } else {
            // Already has tags: insert content BEFORE the tags
            const parts = existingContent.split('---\n> **METADATA');
            const newContent = parts[0] + content + '\n\n---\n> **METADATA' + parts[1];
            await fs.writeFile(archiveFile, newContent);
        }
    }

    async writeSemanticIndex() {
        const semanticDir = path.join(this.rootPath, 'memory', 'semantic');
        await fs.ensureDir(semanticDir);
        const knowledgeDir = this.knowledgePath;
        if (!(await fs.pathExists(knowledgeDir))) return;

        console.log('🏷️ Memory Pipeline: Building semantic index...');
        const tagIndex = {};

        let files;
        try { files = await fs.readdir(knowledgeDir); }
        catch (e) { return; }

        for (const file of files) {
            if (!file.endsWith('.md') || file.startsWith('NEXUS_HUB') || file.startsWith('NEXUS_NEURAL')) continue;
            try {
                const content = await fs.readFile(path.join(knowledgeDir, file), 'utf8');
                const match = content.match(/>\s*\*\*METADATA\s*\(NEXUS\s*SEMANTIC\s*TAGS\)\*\*:\s*\[(.*)\]/i);
                if (match) {
                    const tags = match[1].split(',').map(t => t.trim().toLowerCase());
                    for (const tag of tags) {
                        if (!tagIndex[tag]) tagIndex[tag] = [];
                        tagIndex[tag].push(file);
                    }
                }
            } catch (e) { /* skip unreadable */ }
        }

        await fs.writeJson(path.join(semanticDir, 'semantic_tag_index.json'), {
            generated_at: new Date().toISOString(),
            total_tags: Object.keys(tagIndex).length,
            index: tagIndex
        }, { spaces: 2 });

        console.log(`   ✅ Semantic index: ${Object.keys(tagIndex).length} tags written.`);
    }

    async getArchiveFile() {
        const indexPath = path.join(this.rootPath, 'memory', 'operational', 'archive_index.json');
        let indexData = { current_archive: 'SESSION_HISTORY_ARCHIVE.md', index: 1 };

        if (await fs.pathExists(indexPath)) {
            indexData = await fs.readJson(indexPath);
        } else {
            await fs.ensureDir(path.dirname(indexPath));
            await fs.writeJson(indexPath, indexData, { spaces: 2 });
        }

        const archivePath = path.join(this.knowledgePath, indexData.current_archive);
        if (await fs.pathExists(archivePath)) {
            const stats = await fs.stat(archivePath);
            if (stats.size > 100 * 1024) {
                indexData.index++;
                indexData.current_archive = `SESSION_HISTORY_ARCHIVE_${indexData.index}.md`;
                await fs.writeJson(indexPath, indexData, { spaces: 2 });
                return path.join(this.knowledgePath, indexData.current_archive);
            }
        }
        return archivePath;
    }
}

module.exports = MemoryPipeline;
