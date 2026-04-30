const fs = require('fs-extra');
const path = require('path');

/**
 * Distiller Engine - Responsibility: Compressing and standardizing Knowledge HUB.
 */
class Distiller {
    constructor(knowledgePath) {
        this.knowledgePath = knowledgePath;
        this.prefix = 'NEXUS_';
    }

    /**
     * Standardize all filenames in HUB to NEXUS_ prefix
     */
    async standardizeNames() {
        console.log('🏷️ Distiller: Standardizing HUB filenames...');
        const files = await fs.readdir(this.knowledgePath);
        
        for (const file of files) {
            if (file === '.gitkeep' || !file.endsWith('.md')) continue;
            
            if (!file.startsWith(this.prefix)) {
                const oldPath = path.join(this.knowledgePath, file);
                const newName = this.prefix + file.toUpperCase();
                const newPath = path.join(this.knowledgePath, newName);
                
                if (!(await fs.pathExists(newPath))) {
                    await fs.move(oldPath, newPath);
                    console.log(`   ✅ Renamed: ${file} ➔ ${newName}`);
                } else {
                    // Collision logic: Merge if file already exists with NEXUS_ prefix
                    const content = await fs.readFile(oldPath, 'utf8');
                    await fs.appendFile(newPath, `\n\n--- APPENDED FROM ${file} ---\n${content}`);
                    await fs.remove(oldPath);
                    console.log(`   🔄 Merged: ${file} into existing ${newName}`);
                }
            }
        }
    }

    /**
     * Distill academic papers into a single knowledge file
     */
    async distillAcademics() {
        console.log('📚 Distiller: Distilling academic documents...');
        const academicKeywords = ['paper', 'optimizing', 'experience', 'ux', 'dba2aea', 'artikel'];
        const files = await fs.readdir(this.knowledgePath);
        const targetFile = path.join(this.knowledgePath, 'NEXUS_ACADEMIC_DISTILLATION.md');
        
        let consolidatedKnowledge = `\n\n## 🎓 NEW ACADEMIC INSIGHTS - ${new Date().toLocaleDateString()}\n`;
        let count = 0;

        for (const file of files) {
            const lowerFile = file.toLowerCase();
            if (academicKeywords.some(kw => lowerFile.includes(kw)) && file !== 'NEXUS_ACADEMIC_DISTILLATION.md') {
                const content = await fs.readFile(path.join(this.knowledgePath, file), 'utf8');
                
                // Extract key points (simplified: take first 500 chars as summary)
                consolidatedKnowledge += `### Source: ${file}\n${content.substring(0, 1000)}...\n\n`;
                
                await fs.remove(path.join(this.knowledgePath, file));
                count++;
            }
        }

        if (count > 0) {
            await fs.ensureFile(targetFile);
            await fs.appendFile(targetFile, consolidatedKnowledge);
            console.log(`   ✅ Distilled ${count} academic files into NEXUS_ACADEMIC_DISTILLATION.md`);
        }
    }

    /**
     * Update README.md with the last optimization timestamp
     */
    async updateReadme(readmePath) {
        if (!(await fs.pathExists(readmePath))) return;
        
        console.log('📝 Distiller: Updating README.md status...');
        let content = await fs.readFile(readmePath, 'utf8');
        const timestamp = new Date().toLocaleString();
        
        const statusRegex = /_Terakhir Dioptimasi:.*_/i;
        const newStatus = `_Terakhir Dioptimasi: ${timestamp}_`;
        
        if (statusRegex.test(content)) {
            content = content.replace(statusRegex, newStatus);
        } else {
            content += `\n\n---\n${newStatus}\n`;
        }
        
        await fs.writeFile(readmePath, content);
    }

    /**
     * Run full distillation pipeline
     */
    async run() {
        await this.distillAcademics();
        await this.standardizeNames();
    }
}

module.exports = Distiller;
