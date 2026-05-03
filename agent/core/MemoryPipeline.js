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
        this.auditPath = auditPath || path.join(this.rootPath, 'memory', 'short_term', 'audit');
        this.planningPath = planningPath || path.join(this.rootPath, 'memory', 'short_term', 'planning');
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

        console.log('🌾 Memory Pipeline: Processing data from harvest folder...');
        const projects = await fs.readdir(harvestPath);
        
        for (const project of projects) {
            const projectPath = path.join(harvestPath, project);
            if (!(await fs.lstat(projectPath)).isDirectory()) continue;

            const folders = await fs.readdir(projectPath);
            for (const folder of folders) {
                const src = path.join(projectPath, folder);
                let dest = null;

                // Mapping harvest folders to project folders
                if (folder === 'knowledge' || folder === 'algorithms') {
                    dest = this.knowledgePath;
                } else if (folder === 'records' || folder === 'summary' || folder === 'audit' || folder === 'planning') {
                    dest = this.recordsPath; // Move to records for further distillation or archival
                }

                if (dest && await fs.pathExists(src)) {
                    await fs.copy(src, dest, { overwrite: false });
                    console.log(`   📦 Harvested [${folder}] from ${project} moved to ${path.basename(dest)}.`);
                }
            }
        }

        // Cleanup: Empty the harvest folder
        await fs.emptyDir(harvestPath);
        console.log('   🧹 Harvest folder recycled (cleared).');
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
            await fs.ensureFile(this.archiveFile);
            await fs.appendFile(this.archiveFile, archiveContent);
            console.log(`   📦 Archived ${count} audit reports to SESSION_HISTORY_ARCHIVE.md`);
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
            await fs.ensureFile(this.archiveFile);
            await fs.appendFile(this.archiveFile, archiveContent);
            console.log(`   📦 Archived ${count} implementation plans to SESSION_HISTORY_ARCHIVE.md`);
        }
    }
}

module.exports = MemoryPipeline;
