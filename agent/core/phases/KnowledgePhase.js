const fs = require('fs-extra');
const path = require('path');
const BasePhase = require('./BasePhase');
const NexusError = require('../NexusError');

class KnowledgePhase extends BasePhase {
    async run() {
        this.log('🧪 Starting HUB Distillation & Optimization Pipeline...', 'info');
        
        // 1. Memory Pipeline: Pull data from harvest -> HUB and archive sessions
        await this.engine.memoryPipeline.optimize();
        
        // 2. Distiller: Standardize names and simplify content in HUB
        await this.engine.distiller.run();
        
        this.log('✨ HUB Distillation & Optimization Complete.', 'success');
    }

    async harvest(sourcePath) {
        if (!sourcePath) throw new NexusError('HARVESTING', 'Source path is required.');
        
        const projectName = path.basename(sourcePath);
        this.log(`🌾 Phase 6: Harvesting Knowledge from [${projectName}]...`, 'info');
        
        const docSource = path.join(sourcePath, 'documentation');
        const nexusSource = path.join(sourcePath, 'nexus');
        
        let primarySource = null;
        if (await fs.pathExists(nexusSource)) {
            primarySource = nexusSource;
        } else if (await fs.pathExists(docSource)) {
            primarySource = docSource;
        } else {
            primarySource = sourcePath;
        }

        const harvestRoot = path.join(this.engine.rootPath, 'golden', 'harvest', projectName);
        await fs.ensureDir(harvestRoot);

        const foldersToHarvest = [
            { id: 'raw' }, { id: 'audit' }, { id: 'planning' }, { id: 'summary' },
            { id: 'algorithms' }, { id: 'records', alt: 'short_term' },
            { id: 'operational', alt: 'records' }, { id: 'knowledge', alt: 'long_term' },
            { id: 'nexus_rules' }, { id: 'legal' }
        ];

        let filesHarvested = 0;
        for (const folder of foldersToHarvest) {
            const srcFolder = await this.findRemoteFolder(sourcePath, primarySource, folder.id, folder.alt);
            if (srcFolder) {
                const destFolder = path.join(harvestRoot, folder.id);
                await fs.ensureDir(destFolder);
                
                const files = await fs.readdir(srcFolder);
                for (const file of files) {
                    if (file.endsWith('.md')) {
                        const targetPath = path.join(destFolder, file);
                        if (await fs.pathExists(targetPath)) {
                            const oldContent = await fs.readFile(targetPath, 'utf8');
                            const newContent = await fs.readFile(path.join(srcFolder, file), 'utf8');
                            const merged = this.engine.wrapAsConditional(oldContent, newContent, `Collision in ${file} during harvest from ${projectName}`);
                            await fs.writeFile(targetPath, merged);
                        } else {
                            await fs.copy(path.join(srcFolder, file), targetPath);
                        }
                        filesHarvested++;
                    }
                }
            }
        }

        this.log(`✅ Harvesting Complete: ${filesHarvested} knowledge artifacts collected.`, 'success');
        return filesHarvested;
    }

    async findRemoteFolder(sourcePath, primarySource, folderName, altName) {
        const potentials = [
            path.join(primarySource, folderName),
            path.join(primarySource, 'memory', folderName),
            path.join(primarySource, 'memory', altName || folderName),
            path.join(primarySource, 'documentation', folderName),
            path.join(sourcePath, 'documentation', folderName),
            path.join(sourcePath, 'memory', folderName),
            path.join(sourcePath, folderName)
        ];
        for (const p of potentials) {
            if (await fs.pathExists(p)) {
                const files = await fs.readdir(p);
                if (files.length > 0) return p;
            }
        }
        return null;
    }

    async updateStatus() {
        this.log('📝 Updating System Status in README.md...', 'info');
        const readmePath = path.join(this.engine.rootPath, 'README.md');
        await this.engine.distiller.updateReadme(readmePath);
        this.log('✅ System Status Updated.', 'success');
    }
}

module.exports = KnowledgePhase;
