const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const NexusClock = require('./NexusClock');
const SemanticEngine = require('./SemanticEngine');
// FIX #25 — NativeBridge masih dipakai di applySemanticLinking, tapi tidak diinstansiasi di constructor
// Import tetap ada karena diperlukan saat native binary tersedia
const NativeBridge = require('./NativeBridge');

class Distiller {
    constructor(knowledgePath) {
        this.knowledgePath = knowledgePath;
        this.prefix = 'NEXUS_';
        this.semanticEngine = new SemanticEngine(knowledgePath);
        // FIX #25 — this.native dihapus dari constructor; lazy-init hanya saat dibutuhkan
        // this.native akan dibuat on-demand di applySemanticLinking()
        this._rootPath = path.join(knowledgePath, '..', '..');
    }

    /**
     * Get all knowledge files recursively
     */
    getFiles() {
        const fg = require('fast-glob');
        const normalizedPath = this.knowledgePath.replace(/\\/g, '/');
        return fg.sync('**/*.{md,MD}', { 
            cwd: normalizedPath, 
            ignore: ['NEXUS_HUB_INDEX.md', 'NEXUS_NEURAL_MAP.md'],
            onlyFiles: true 
        });
    }

    /**
     * Standardize all filenames in HUB to NEXUS_ prefix recursively
     */
    async standardizeNames() {
        console.log('🏷️ Distiller: Standardizing HUB filenames recursively...');
        const files = this.getFiles();
        
        for (const file of files) {
            const basename = path.basename(file);
            if (basename === '.gitkeep') continue;
            
            if (!basename.startsWith(this.prefix)) {
                const oldPath = path.join(this.knowledgePath, file);
                const newBasename = this.prefix + basename.toUpperCase();
                const newPath = path.join(path.dirname(oldPath), newBasename);
                
                if (!(await fs.pathExists(newPath))) {
                    await fs.move(oldPath, newPath);
                    console.log(`   ✅ Renamed: ${basename} ➔ ${newBasename}`);
                } else {
                    const oldContent = await fs.readFile(oldPath, 'utf8');
                    const existingContent = await fs.readFile(newPath, 'utf8');
                    
                    const merged = `
# 🛠 NEXUS AUTO-MERGE: ${newBasename}
> Gabungan otomatis antara file lama (${basename}) dan file eksisting.

### 🧩 Pilihan Opsi Tak Terbatas:

#### Opsi A: Konten Eksisting
${existingContent.trim()}

---

#### Opsi B: Konten Baru (${basename})
${oldContent.trim()}

---
*Merged by Nexus Distiller | Protokol: Multi-Option | Date: ${new Date().toLocaleDateString()}*
`;
                    await this.updateVersionHeader(newPath, merged);
                    await fs.remove(oldPath);
                    console.log(`   🔄 Multi-Option Merge: ${basename} into ${newBasename}`);
                }
            }
        }
    }

    /**
     * Distill academic papers into category-specific knowledge files.
     */
    async distillAcademics() {
        console.log('📚 Distiller: Distilling academic documents into Category-Based Wisdom...');
        
        const monolithicFile = path.join(this.knowledgePath, 'NEXUS_ACADEMIC_DISTILLATION.md');
        if (await fs.pathExists(monolithicFile)) await fs.remove(monolithicFile);

        const academicKeywords = ['paper', 'optimizing', 'experience', 'ux', 'dba2aea', 'artikel', 'journal'];
        const files = this.getFiles();
        
        const timestamp = new Date().toLocaleDateString();
        const version = `v${Date.now().toString().slice(-4)}`;
        const categoryData = {}; // { category: content }

        let count = 0;
        for (const file of files) {
            const lowerFile = file.toLowerCase();
            if (academicKeywords.some(kw => lowerFile.includes(kw)) && !path.basename(file).startsWith('NEXUS_DISTILLATION')) {
                const filePath = path.join(this.knowledgePath, file);
                const content = await fs.readFile(filePath, 'utf8');
                
                const category = this.identifyCategory(content);
                if (!categoryData[category]) {
                    categoryData[category] = `\n\n## 🎓 ${category.toUpperCase()} WISDOM DISTILLATION [${version}] - ${timestamp}\n`;
                    categoryData[category] += `> **Protocol**: Autonomous Intelligence Extraction | **Focus**: Actionable Tech Insights\n\n`;
                }

                const headerMatch = content.match(/^#+\s+(.*)$/m);
                const title = headerMatch ? headerMatch[1] : path.basename(file).replace(this.prefix, '').replace('.md', '');
                
                let block = `### 📄 ${title}\n`;
                block += `> **Origin**: \`${file}\` | **Distilled At**: ${timestamp}\n\n`;

                // Try Python-based AI Distillation first
                try {
                    console.log(`   🧠 AI Distilling: ${file}...`);
                    const aiResult = await this.native.callPython(path.join(this.native.binPath, 'distiller.py'), [filePath]);
                    block += aiResult + '\n\n';
                } catch (e) {
                    console.warn(`   ⚠️ AI Distillation failed, falling back to Regex: ${e.message}`);
                    const insights = content.match(/(?:insight|temuan|hasil|conclusion|key point)[\s\S]*?(?=\n#|\n---|\n\Z)/i);
                    const recs = content.match(/(?:recommendation|saran|pembelajaran|lesson|action)[\s\S]*?(?=\n#|\n---|\n\Z)/i);
                    const body = content.replace(/^#+.*$/gm, '').trim();

                    if (insights) block += `#### 🧐 Core Insights (Distilled):\n${insights[0].trim().substring(0, 1000)}\n\n`;
                    if (recs) block += `#### 🛠 Actionable Steps:\n${recs[0].trim().substring(0, 800)}\n\n`;
                    if (!insights && !recs) block += `#### 💡 Content Summary:\n${body.substring(0, 1200)}...\n\n`;
                }

                block += `#### 🔗 Traceability:\n- [Source Context](${path.basename(file)})\n- [Related Standards](NEXUS_CORE_PRINCIPLES.md)\n\n---\n`;
                
                categoryData[category] += block;
                count++;
            }
        }

        for (const [cat, distilled] of Object.entries(categoryData)) {
            // Distilled files go to academics rack
            const targetFile = path.join(this.knowledgePath, 'academics', `NEXUS_DISTILLATION_${cat.toUpperCase()}.md`);
            await fs.ensureFile(targetFile);
            const existing = (await fs.pathExists(targetFile)) ? await fs.readFile(targetFile, 'utf8') : '';
            await this.updateVersionHeader(targetFile, existing + distilled);
            console.log(`   ✅ Distilled into: academics/NEXUS_DISTILLATION_${cat.toUpperCase()}.md`);
        }
    }

    /**
     * Identify category based on content keywords
     */
    identifyCategory(content) {
        // Gunakan SemanticEngine.extractMultiTags untuk multi-label
        const tags = this.semanticEngine.extractMultiTags(content);
        // Return primary tag (pertama) untuk backward compat dengan shelve()
        return tags.length > 0 ? tags[0] : 'other';
    }

    /**
     * Return semua tags (multi-label) — dipakai untuk semantic tagging
     */
    identifyCategories(content) {
        return this.semanticEngine.extractMultiTags(content);
    }

    /**
     * Shelve files into semantic subfolders (Phase 5)
     */
    async shelve() {
        console.log('📂 Distiller: Shelving knowledge into semantic racks...');
        const files = this.getFiles();
        
        for (const file of files) {
            const filePath = path.join(this.knowledgePath, file);
            const content = await fs.readFile(filePath, 'utf8');
            
            // Standards stay in standards rack
            const isStandard = ['PRINCIPLES', 'STANDARDS', 'LAWS', 'PROTOCOL', 'CONTRACT', 'ALGORITHM', 'WORKFLOW'].some(kw => file.includes(kw));
            const category = isStandard ? 'standards' : this.identifyCategory(content);
            
            const targetDir = path.join(this.knowledgePath, category);
            const targetPath = path.join(targetDir, path.basename(file));
            
            if (filePath !== targetPath) {
                await fs.ensureDir(targetDir);
                await fs.move(filePath, targetPath, { overwrite: true });
                console.log(`   📂 Shelved: ${path.basename(file)} ➔ ${category}/`);
            }
        }
    }

    /**
     * Add semantic tags recursively
     */
    async applySemanticTagging() {
        console.log('🏷️ Distiller: Applying Multi-Label Semantic Tagging (Vector-Enhanced)...');
        const files = this.getFiles();

        for (const file of files) {
            const filePath = path.join(this.knowledgePath, file);
            let content = await fs.readFile(filePath, 'utf8');

            // Gunakan multi-label detection
            const foundTags = this.identifyCategories(content);

            if (foundTags.length > 0) {
                const tagStr = `\n\n---\n> **METADATA (NEXUS SEMANTIC TAGS)**: [${foundTags.join(', ')}]\n`;
                if (!content.includes('METADATA (NEXUS SEMANTIC TAGS)')) {
                    content += tagStr;
                    await this.updateVersionHeader(filePath, content);
                    console.log(`   ✅ Tagged: ${file} with [${foundTags.join(', ')}]`);
                }
            }
        }
    }

    /**
     * Optimized Semantic Linking with Native C++ Power (SSD-Aware)
     */
    async applySemanticLinking() {
        console.log('🔗 Distiller: Applying Path-Aware Semantic Cross-Linking (Native C++ Optimized)...');
        // FIX #25 — Lazy-init NativeBridge hanya saat benar-benar dibutuhkan
        if (!this._native) {
            this._native = new NativeBridge(this._rootPath);
        }
        try {
            const output = await this._native.callCpp('fast_linker', [this.knowledgePath]);
            console.log(output);
        } catch (e) {
            console.warn(`   ⚠️ Native linking failed, falling back to JS: ${e.message}`);
            await this.applySemanticLinkingJS();
        }
    }

    async applySemanticLinkingJS() {
        console.log('🔗 Distiller: Falling back to JS Semantic Linking...');
        
        const cachePath = path.join(this.knowledgePath, '..', 'short_term', 'link_cache.json');
        let cache = {};
        if (await fs.pathExists(cachePath)) {
            try { cache = await fs.readJson(cachePath); } catch (e) { cache = {}; }
        }

        const files = this.getFiles();
        
        // Build keyword map: { keyword: targetFileRelativePath }
        const linkMap = new Map();
        files.forEach(f => {
            const clean = path.basename(f).replace(this.prefix, '').replace('.md', '').toLowerCase();
            if (clean.length > 3) linkMap.set(clean, f);
        });

        const keywords = Array.from(linkMap.keys()).sort((a, b) => b.length - a.length); 
        let totalLinked = 0;

        for (const file of files) {
            const filePath = path.join(this.knowledgePath, file);
            const stats = await fs.stat(filePath);
            const lastLinked = cache[file] || 0;

            if (stats.mtimeMs <= lastLinked) continue;

            let content = await fs.readFile(filePath, 'utf8');
            let modified = false;

            for (const keyword of keywords) {
                const targetRelPath = linkMap.get(keyword);
                if (file === targetRelPath) continue;
                
                const regex = new RegExp(`(?<!\\[)\\b${this.escapeRegExp(keyword)}\\b(?![\\]\\(])`, 'gi');
                
                if (regex.test(content)) {
                    const relativeTarget = this.getRelativePath(file, targetRelPath);
                    if (!content.includes(`](${relativeTarget})`)) {
                        content = content.replace(regex, (match) => `[${match}](${relativeTarget})`);
                        modified = true;
                    }
                }
            }

            if (modified) {
                await this.updateVersionHeader(filePath, content);
                console.log(`   🔗 Linked: ${file} ➔ modules`);
                totalLinked++;
            }
            cache[file] = Date.now();
        }

        await fs.writeJson(cachePath, cache, { spaces: 2 });
    }
    
    getRelativePath(fromFile, toFile) {
        const fromDir = path.dirname(fromFile);
        const toDir = path.dirname(toFile);
        if (fromDir === toDir) return path.basename(toFile);
        
        const rel = path.relative(fromDir, toDir);
        return path.join(rel, path.basename(toFile)).replace(/\\/g, '/');
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    async updateVersionHeader(filePath, content) {
        const versionRegex = /> \*\*VERSION\*\*: v(\d+) \| \*\*Last Updated\*\*: .*/;
        const timestamp = new Date().toLocaleDateString();
        
        let newContent = content;
        const match = content.match(versionRegex);

        if (match) {
            const currentVersion = parseInt(match[1]);
            const newVersion = currentVersion + 1;
            newContent = content.replace(versionRegex, `> **VERSION**: v${newVersion} | **Last Updated**: ${timestamp}`);
        } else {
            const header = `> **VERSION**: v1 | **Last Updated**: ${timestamp}\n\n`;
            if (content.startsWith('# ')) {
                const lines = content.split('\n');
                lines.splice(1, 0, header);
                newContent = lines.join('\n');
            } else {
                newContent = header + content;
            }
        }
        await fs.writeFile(filePath, newContent);
    }

    async generateHubIndex() {
        console.log('📚 Distiller: Generating HUB Master Index recursively...');
        const files = this.getFiles();
        const semanticData = [];
        
        let indexContent = `# 🧠 NEXUS KNOWLEDGE HUB: Master Index\n`;
        indexContent += `> **Generated At**: ${NexusClock.getLocalTimestamp()} | **Total Knowledge Nodes**: ${files.length}\n\n`;
        indexContent += `| Rack | Knowledge Node | Size (KB) | Last Updated |\n`;
        indexContent += `| :--- | :--- | :--- | :--- |\n`;

        for (const file of files) {
            const filePath = path.join(this.knowledgePath, file);
            const content = await fs.readFile(filePath, 'utf8');
            const stats = await fs.stat(filePath);
            const rack = path.dirname(file) === '.' ? 'root' : path.dirname(file);
            const size = (stats.size / 1024).toFixed(1);
            const updated = stats.mtime.toLocaleDateString();

            // Extract tags for semantic index
            const tagMatch = content.match(/> \*\*Metadata \(NEXUS SEMANTIC TAGS\)\*\*: \[(.*)\]/i);
            const tags = tagMatch ? tagMatch[1].split(',').map(t => t.trim()) : [];

            indexContent += `| \`${rack}\` | [${path.basename(file)}](${file.replace(/\\/g, '/')}) | ${size} | ${updated} |\n`;
            
            semanticData.push({
                node: path.basename(file),
                path: file,
                rack: rack,
                tags: tags,
                last_updated: updated,
                checksum: crypto.createHash('sha256').update(content).digest('hex')
            });
        }

        const indexPath = path.join(this.knowledgePath, 'NEXUS_HUB_INDEX.md');
        await fs.writeFile(indexPath, indexContent);

        const semanticPath = path.join(this.knowledgePath, 'NEXUS_SEMANTIC_INDEX.json');
        await fs.writeJson(semanticPath, semanticData, { spaces: 2 });

        console.log(`   ✅ HUB Master Index & Semantic JSON generated.`);
    }

    async generateNeuralMap() {
        console.log('🧠 Distiller: Generating Neural Map recursively...');
        const files = this.getFiles();
        
        let mermaid = "graph TD\n";
        let connections = 0;

        for (const file of files) {
            const filePath = path.join(this.knowledgePath, file);
            const content = await fs.readFile(filePath, 'utf8');
            const nodeName = path.basename(file).replace(this.prefix, '').replace('.md', '').replace(/-/g, '_');
            
            const linkRegex = /\[.*?\]\((.*?\.md)\)/g;
            let match;
            const seenLinks = new Set();

            while ((match = linkRegex.exec(content)) !== null) {
                const targetPath = match[1];
                // Hapus pengecekan .includes('/') agar link dalam folder yang sama tetap terpetakan
                const targetNode = path.basename(targetPath).replace(this.prefix, '').replace('.md', '').replace(/-/g, '_');
                
                if (nodeName === targetNode) continue;
                const linkKey = `${nodeName}->${targetNode}`;
                if (!seenLinks.has(linkKey)) {
                    mermaid += `    ${nodeName} --> ${targetNode}\n`;
                    seenLinks.add(linkKey);
                    connections++;
                }
            }
        }

        const mapPath = path.join(this.knowledgePath, 'NEXUS_NEURAL_MAP.md');
        const finalContent = `# 🧠 NEXUS AI: Neural Knowledge Map\n\n\`\`\`mermaid\n${mermaid}\`\`\`\n\n> **Stats**: ${files.length} Nodes | ${connections} Connections | **Generated**: ${NexusClock.getLocalTimestamp()}\n`;
        
        await fs.writeFile(mapPath, finalContent);
    }

    async run() {
        await this.distillAcademics();
        await this.standardizeNames();
        await this.applySemanticTagging();
        await this.shelve();
        await this.applySemanticLinking();
        await this.generateHubIndex();
        await this.generateNeuralMap();

        // BARU: Rebuild vector index setelah distillation selesai
        await this.semanticEngine.invalidateCache();
        await this.semanticEngine.buildIndex();
        console.log('🧠 Vector index rebuilt after distillation.');
    }
}

module.exports = Distiller;
