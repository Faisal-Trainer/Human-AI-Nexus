const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const ImplementationPhase = require('../core/phases/ImplementationPhase');

class RetroDatasetExtractor {
    constructor(rootPath) {
        this.rootPath = rootPath;
        // Search in the main agent memory cache where legacy .txt files reside
        this.agentCachePath = path.join(this.rootPath, 'agent', 'memory', 'cache', 'generated_code');
        this.blueprintsPath = path.join(this.rootPath, 'memory', 'operational', 'blueprints');
        this.outPath = path.join(this.rootPath, 'memory', 'datasets', 'nexus-retro-dataset.jsonl');
        fs.ensureDirSync(path.join(this.rootPath, 'memory', 'datasets'));
        
        // A temporary directory for safe fallbacks to be written to during reconstruction
        this.dummyRoot = path.join(this.rootPath, 'scratch', 'dummy_retro_engine');
    }

    async extract() {
        console.log('🚀 NEXUS RETRO DATASET EXTRACTOR');
        console.log('Reconstructing legacy dataset from blueprints and .txt caches...\n');

        if (!(await fs.pathExists(this.blueprintsPath))) {
            console.error(`❌ Blueprints directory not found: ${this.blueprintsPath}`);
            return;
        }

        if (!(await fs.pathExists(this.agentCachePath))) {
            console.error(`❌ Cache directory not found: ${this.agentCachePath}`);
            return;
        }

        await fs.ensureDir(this.dummyRoot);
        const outStream = fs.createWriteStream(this.outPath, { flags: 'w' });
        let validRecords = 0;

        // Create a mock engine that logs nothing to keep console clean
        const mockEngine = {
            rootPath: this.dummyRoot,
            log: () => {}
        };

        const blueprints = await fs.readdir(this.blueprintsPath);
        const jsonBlueprints = blueprints.filter(f => f.endsWith('.json'));

        for (const file of jsonBlueprints) {
            console.log(`Processing Blueprint: ${file}`);
            const blueprint = await fs.readJson(path.join(this.blueprintsPath, file));
            
            // Instantiate ImplementationPhase
            const imp = new ImplementationPhase(mockEngine);
            
            // Intercept getCachedOrGenerate to reconstruct the prompt
            imp.getCachedOrGenerate = async (prompt, taskType) => {
                const hash = crypto.createHash("md5").update(prompt + taskType).digest("hex");
                const cacheFile = path.join(this.agentCachePath, `${hash}.txt`);
                
                if (await fs.pathExists(cacheFile)) {
                    try {
                        const output = await fs.readFile(cacheFile, "utf8");
                        const record = {
                            instruction: prompt,
                            output: output,
                            task_type: taskType,
                            reconstructed: true,
                            project: blueprint.project_name
                        };
                        outStream.write(JSON.stringify(record) + '\n');
                        validRecords++;
                    } catch (e) {
                        // ignore read errors
                    }
                }
                
                // Return null so the generator method writes safe fallbacks to dummyRoot instead of failing
                return null; 
            };

            // Run through the generators
            try {
                // Models, Policies, API Controllers
                for (const model of (blueprint.models || [])) {
                    await imp.generateModel(model, blueprint);
                    await imp.generatePolicy(model, blueprint);
                    await imp.generateApiController(model, blueprint);
                }
                
                // Migrations
                for (const migration of (blueprint.migrations || [])) {
                    await imp.generateMigration(migration, blueprint);
                }
                
                // Factories
                for (const factory of (blueprint.factories || [])) {
                    await imp.generateFactory(factory, blueprint);
                }
                
                // Seeders
                for (const seeder of (blueprint.seeders || [])) {
                    await imp.generateSeeder(seeder, blueprint);
                }
                
                // Livewire Components
                for (const component of (blueprint.livewire_components || [])) {
                    await imp.generateLivewireComponent(component, blueprint);
                }
                
                // Layout
                await imp.generateLayout(blueprint);
                
                // Routes
                if (blueprint.routes && blueprint.routes.web) {
                    await imp.generateRoutes(blueprint.routes.web, blueprint);
                }
            } catch (e) {
                console.error(`⚠️ Error parsing blueprint ${file}: ${e.message}`);
            }
        }

        outStream.end();

        // Clean up dummy root
        await fs.remove(this.dummyRoot);

        console.log(`\n✅ Retro Extraction complete!`);
        console.log(`📂 Dataset saved to: ${this.outPath}`);
        console.log(`📊 Total pairs reconstructed: ${validRecords}`);
    }
}

module.exports = RetroDatasetExtractor;
