const fs = require('fs-extra');
const path = require('path');
const TypeSafeValidator = require('./TypeSafeValidator');

class DatasetExtractor {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.typeSafeValidator = new TypeSafeValidator();
        // Default to the generated code cache
        this.cachePath = path.join(this.rootPath, 'memory', 'cache', 'generated_code');
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
                    // Optional quality filter via TypeSafeValidator
                    if (this.typeSafeValidator && this.typeSafeValidator.enabled) {
                        const samplePayload = `Prompt:\n${data.prompt}\n\nOutput:\n${data.output}`;
                        const qScore = await this.typeSafeValidator.scoreSample(samplePayload);
                        if (!qScore.skipped && typeof qScore.score === 'number' && qScore.score < 3) {
                            console.log(`   ⏭️ Skipping low-quality sample (score: ${qScore.score}/5)`);
                            continue;
                        }
                    }

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

        await new Promise((resolve) => outStream.end(resolve));

        console.log(`✅ Extraction complete!`);
        console.log(`📂 Dataset saved to: ${this.outPath}`);
        console.log(`📊 Total usable records: ${validRecords}`);
        console.log(`\nYou can now use this .jsonl file for LoRA/QLoRA fine-tuning using Unsloth or Llama.cpp!`);
    }
}

module.exports = DatasetExtractor;
