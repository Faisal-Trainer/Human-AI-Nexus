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
                    // Collision logic: Merge using Multi-Option format
                    const oldContent = await fs.readFile(oldPath, 'utf8');
                    const existingContent = await fs.readFile(newPath, 'utf8');
                    
                    const merged = `
# 🛠 NEXUS AUTO-MERGE: ${newName}
> Gabungan otomatis antara file lama (${file}) dan file eksisting.

### 🧩 Pilihan Opsi Tak Terbatas:

#### Opsi A: Konten Eksisting
${existingContent.trim()}

---

#### Opsi B: Konten Baru (${file})
${oldContent.trim()}

---
*Merged by Nexus Distiller | Protokol: Multi-Option | Date: ${new Date().toLocaleDateString()}*
`;
                    await fs.writeFile(newPath, merged);
                    await fs.remove(oldPath);
                    console.log(`   🔄 Multi-Option Merge: ${file} into ${newName}`);
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
                
                // Intelligent Extraction: Look for H1/H2 and key sections
                const headerMatch = content.match(/^#+\s+(.*)$/m);
                const title = headerMatch ? headerMatch[1] : file;
                
                // Extracting sections (Simulated NLP via Regex patterns)
                const insights = content.match(/(?:insight|temuan|hasil|conclusion)[\s\S]*?(?=\n#|\n---|\n\Z)/i);
                const recs = content.match(/(?:recommendation|saran|pembelajaran|lesson)[\s\S]*?(?=\n#|\n---|\n\Z)/i);
                
                const body = content.replace(/^#+.*$/gm, '').trim();

                consolidatedKnowledge += `### 📄 Asset: ${title}\n`;
                consolidatedKnowledge += `> **Source**: \`${file}\` | **Type**: Academic Distillation\n\n`;
                
                if (insights) consolidatedKnowledge += `#### 🧐 Core Insights:\n${insights[0].trim().substring(0, 800)}...\n\n`;
                if (recs) consolidatedKnowledge += `#### 🛠 Recommendations:\n${recs[0].trim().substring(0, 500)}...\n\n`;
                
                if (!insights && !recs) {
                    consolidatedKnowledge += `#### 💡 Content Summary:\n${body.substring(0, 1000)}...\n\n`;
                }

                consolidatedKnowledge += `#### 🔗 Contextual Anchors:\n- [Lihat Standar Terkait](NEXUS_CORE_PRINCIPLES.md)\n- [Jejak Evolusi](NEXUS_LESSONS_LEARNED.MD)\n\n---\n`;
                
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
     * Add semantic tags to HUB documents based on content keywords.
     */
    async applySemanticTagging() {
        console.log('🏷️ Distiller: Applying Semantic Tagging to HUB...');
        const files = await fs.readdir(this.knowledgePath);
        const tagMap = {
            'security': ['auth', 'encryption', 'vulnerability', 'password', 'secure', 'guard', 'keamanan'],
            'performance': ['speed', 'caching', 'latency', 'optimize', 'fast', 'parallel', 'performa'],
            'ui-ux': ['design', 'aesthetic', 'layout', 'user', 'interface', 'frontend', 'estetika'],
            'database': ['query', 'schema', 'sql', 'migration', 'store', 'data', 'database'],
            'tdd': ['test', 'unit', 'quality', 'verification', 'mock', 'pengujian'],
            'vcs': ['git', 'commit', 'branch', 'merge', 'repo', 'repository']
        };

        for (const file of files) {
            if (!file.endsWith('.md')) continue;
            const filePath = path.join(this.knowledgePath, file);
            let content = await fs.readFile(filePath, 'utf8');
            
            const foundTags = new Set();
            const lowerContent = content.toLowerCase();

            for (const [tag, keywords] of Object.entries(tagMap)) {
                if (keywords.some(kw => lowerContent.includes(kw))) {
                    foundTags.add(tag);
                }
            }

            if (foundTags.size > 0) {
                const tagStr = `\n\n---\n> **METADATA (NEXUS SEMANTIC TAGS)**: [${Array.from(foundTags).join(', ')}]\n`;
                // Prevent duplicate tagging
                if (!content.includes('METADATA (NEXUS SEMANTIC TAGS)')) {
                    content += tagStr;
                    await fs.writeFile(filePath, content);
                    console.log(`   ✅ Tagged: ${file} with [${Array.from(foundTags).join(', ')}]`);
                }
            }
        }
    }

    /**
     * Automatically link technical keywords to related documents in HUB (Phase 4).
     */
    async applySemanticLinking() {
        console.log('🔗 Distiller: Applying Semantic Cross-Linking to HUB...');
        const files = await fs.readdir(this.knowledgePath);
        const mdFiles = files.filter(f => f.endsWith('.md'));
        
        const linkMap = {};
        mdFiles.forEach(f => {
            const clean = f.replace(this.prefix, '').replace('.md', '');
            if (clean.length > 3) linkMap[clean.toLowerCase()] = f;
        });

        for (const file of mdFiles) {
            const filePath = path.join(this.knowledgePath, file);
            let content = await fs.readFile(filePath, 'utf8');
            let modified = false;

            for (const [keyword, targetFile] of Object.entries(linkMap)) {
                if (file === targetFile) continue;
                
                // Avoid linking if it's already a link or in a header
                const regex = new RegExp(`(?<!\\[)\\b${keyword}\\b(?![\\]\\(])`, 'gi');
                
                if (regex.test(content) && !content.includes(`](${targetFile})`)) {
                    content = content.replace(regex, (match) => `[${match}](${targetFile})`);
                    modified = true;
                }
            }

            if (modified) {
                await fs.writeFile(filePath, content);
                console.log(`   🔗 Linked concepts in ${file}`);
            }
        }
    }

    /**
     * Run full distillation pipeline
     */
    async run() {
        await this.distillAcademics();
        await this.standardizeNames();
        await this.applySemanticTagging();
        await this.applySemanticLinking();
    }
}

module.exports = Distiller;
