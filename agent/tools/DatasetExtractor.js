const fs = require('fs-extra');
const path = require('path');

class DatasetExtractor {
    constructor(rootPath) {
        this.rootPath = rootPath;
        // Default to the generated code cache
        this.cachePath = path.join(this.rootPath, 'agent', 'memory', 'cache', 'generated_code');
        this.outPath = path.join(this.rootPath, 'memory', 'datasets', 'nexus-sft-dataset.jsonl');
        fs.ensureDirSync(path.join(this.rootPath, 'memory', 'datasets'));
    }

    async extract() {
        console.log('🚀 NEXUS DATASET EXTRACTOR');
        console.log('Scanning for generated code caches...');

        if (!(await fs.pathExists(this.cachePath))) {
            console.error(`❌ Cache directory not found: ${this.cachePath}`);
            return;
        }

        const files = await fs.readdir(this.cachePath);
        const jsonFiles = files.filter(f => f.endsWith('.json'));

        if (jsonFiles.length === 0) {
            console.warn('⚠️ No .json cache files found. (Generations created before this feature was added only have .txt files)');
            return;
        }

        console.log(`Found ${jsonFiles.length} JSON cache records. Extracting...`);

        let validRecords = 0;
        let outStream = fs.createWriteStream(this.outPath, { flags: 'w' });

        for (const file of jsonFiles) {
            try {
                const filePath = path.join(this.cachePath, file);
                const data = await fs.readJson(filePath);

                if (data && data.prompt && data.output) {
                    // Convert to ShareGPT / Alpaca JSONL format
                    const record = {
                        instruction: data.prompt,
                        output: data.output,
                        task_type: data.taskType || 'unknown'
                    };
                    outStream.write(JSON.stringify(record) + '\n');
                    validRecords++;
                }
            } catch (e) {
                console.error(`⚠️ Failed to parse ${file}: ${e.message}`);
            }
        }

        outStream.end();

        console.log(`✅ Extraction complete!`);
        console.log(`📂 Dataset saved to: ${this.outPath}`);
        console.log(`📊 Total usable records: ${validRecords}`);
        console.log(`\nYou can now use this .jsonl file for LoRA/QLoRA fine-tuning using Unsloth or Llama.cpp!`);
    }
}

module.exports = DatasetExtractor;
