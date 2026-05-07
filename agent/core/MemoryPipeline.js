const fs = require('fs-extra');
const path = require('path');

/**
 * MemoryPipeline - Automated Storage Optimization.
 * Implements Phase 4 (Compression) of the Memory Optimization Protocol.
 */
class MemoryPipeline {
    constructor(rootPath, knowledgePath, auditPath, planningPath) {
        this.rootPath = rootPath;
        this.knowledgePath = knowledgePath;
        this.auditPath = auditPath || path.join(this.rootPath, 'memory', 'operational', 'audit');
        this.planningPath = planningPath || path.join(this.rootPath, 'memory', 'operational', 'planning');
        this.archiveFile = path.join(this.knowledgePath, 'SESSION_HISTORY_ARCHIVE.md');
    }

    /**
     * Run the optimization pipeline
     */
    async optimize() {
        console.log('🧹 Memory Pipeline: Starting storage optimization...');
        
        await this.archiveAuditReports();
        await this.archiveImplementationPlans();
        await this.processHarvestData(); // New: Takes data from harvest
        
        console.log('✅ Memory Pipeline: Optimization complete.');
    }

    /**
     * Takes data from golden/harvest and moves it to archive or HUB
     */
    async processHarvestData() {
        const harvestPath = path.join(this.rootPath, 'golden', 'harvest');
        if (!(await fs.pathExists(harvestPath))) return;

        console.log('🌾 Memory Pipeline: Processing data from harvest folder with Cleansing Protocol...');
        const projects = await fs.readdir(harvestPath);
        
        for (const project of projects) {
            const projectPath = path.join(harvestPath, project);
            if (!(await fs.lstat(projectPath)).isDirectory()) continue;

            console.log(`🌾 Memory Pipeline: Ingesting artifacts from [${project}]...`);
            
            // Collect all MD files recursively from this project harvest
            const files = await this.globRecursive(projectPath, '**/*.md');
            for (const file of files) {
                let content = await fs.readFile(file, 'utf8');
                content = this.cleanseContent(content);
                
                // Determine destination: standard folders or distilled HUB
                const relativePath = path.relative(projectPath, file);
                const isRecords = ['records', 'summary', 'audit', 'planning'].some(k => relativePath.includes(k));
                
                const fileName = path.basename(file);
                const dest = isRecords ? path.join(this.recordsPath, fileName) : path.join(this.knowledgePath, fileName);
                
                await fs.ensureDir(path.dirname(dest));
                await fs.writeFile(dest, content);
                console.log(`   📦 Harvested: ${fileName} ➔ ${path.basename(path.dirname(dest))}/`);
            }
        }

        // Cleanup: Empty the harvest folder
        await fs.emptyDir(harvestPath);
        console.log('   🧹 Harvest folder recycled (cleared).');
    }

    /**
     * Remove sensitive patterns from content
     */
    cleanseContent(content) {
        const patterns = [
            /(?:key|api|secret|token|pass|password|auth)[\s:=]+['"]?([a-z0-9-_]{16,})['"]?/gi,
            /(?:https?:\/\/)[a-z0-9]+:[a-z0-9]+@[a-z0-9.]+/gi, // URL with credentials
            /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g // IPv4
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

    /**
     * Helper to find files recursively
     */
    async globRecursive(dir, pattern) {
        const glob = require('glob');
        return new Promise((resolve, reject) => {
            glob(path.join(dir, pattern).replace(/\\/g, '/'), (err, files) => {
                if (err) reject(err);
                else resolve(files);
            });
        });
    }

    async archiveAuditReports() {
        const auditDir = this.auditPath;
        if (!(await fs.pathExists(auditDir))) return;

        const files = await fs.readdir(auditDir);
        let archiveContent = `\n\n## 📁 ARCHIVED AUDITS - ${new Date().toLocaleDateString()}\n`;
        let count = 0;

        for (const file of files) {
            if (file === '.gitkeep' || !file.endsWith('.json')) continue;

            const filePath = path.join(auditDir, file);
            const data = await fs.readJson(filePath);
            
            archiveContent += `- **Audit ID**: ${data.id} | **Target**: ${data.target} | **Findings**: ${data.findings.length}\n`;
            
            // Delete the files (JSON and matching MD)
            await fs.remove(filePath);
            const mdPath = filePath.replace('.json', '.md');
            if (await fs.pathExists(mdPath)) await fs.remove(mdPath);
            
            count++;
        }

        if (count > 0) {
            await this.appendToArchive(archiveContent);
            console.log(`   📦 Archived ${count} audit reports to ${path.basename(await this.getArchiveFile())}`);
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

            const filePath = path.join(planningDir, file);
            const data = await fs.readJson(filePath);
            
            archiveContent += `- **Plan ID**: ${data.id} | **Audit Ref**: ${data.auditRef} | **Tasks**: ${data.tasks.length}\n`;
            
            // Delete the files (JSON and matching MD)
            await fs.remove(filePath);
            const mdPath = filePath.replace('.json', '.md');
            if (await fs.pathExists(mdPath)) await fs.remove(mdPath);
            
            count++;
        }

        if (count > 0) {
            await this.appendToArchive(archiveContent);
            console.log(`   📦 Archived ${count} implementation plans to ${path.basename(await this.getArchiveFile())}`);
        }
    }

    /**
     * Appends content to the current archive file, rotating if it exceeds 100KB.
     */
    async appendToArchive(content) {
        const archiveFile = await this.getArchiveFile();
        await fs.ensureFile(archiveFile);
        
        let existingContent = await fs.readFile(archiveFile, 'utf8');
        
        // Inject Tags if missing to ensure cross-pollination
        const tags = '\n\n---\n> **METADATA (NEXUS SEMANTIC TAGS)**: [audit, performance, testing, tdd]\n';
        if (!existingContent.includes('METADATA')) {
            await fs.appendFile(archiveFile, content + tags);
        } else {
            // Append content before tags if possible, or just append
            await fs.appendFile(archiveFile, content);
        }
    }

    /**
     * Determines the current archive file based on size and index.
     */
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
            if (stats.size > 100 * 1024) { // 100 KB threshold
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
