const fs = require('fs-extra');
const path = require('path');

/**
 * MemoryPipeline - Automated Storage Optimization.
 * Implements Phase 4 (Compression) of the Memory Optimization Protocol.
 */
class MemoryPipeline {
    constructor(rootPath, knowledgePath) {
        this.rootPath = rootPath;
        this.knowledgePath = knowledgePath;
        this.archiveFile = path.join(this.knowledgePath, 'SESSION_HISTORY_ARCHIVE.md');
    }

    /**
     * Run the optimization pipeline
     */
    async optimize() {
        console.log('🧹 Memory Pipeline: Starting storage optimization...');
        
        await this.archiveAuditReports();
        await this.archiveImplementationPlans();
        
        console.log('✅ Memory Pipeline: Optimization complete.');
    }

    async archiveAuditReports() {
        const auditDir = path.join(this.rootPath, 'audit');
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
        const planningDir = path.join(this.rootPath, 'planning');
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
