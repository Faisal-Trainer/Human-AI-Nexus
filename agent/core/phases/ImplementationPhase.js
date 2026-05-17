const fs = require('fs-extra');
const path = require('path');
const BasePhase = require('./BasePhase');
const localAI = require('../LocalIntelligence');
const NexusError = require('../NexusError');

class ImplementationPhase extends BasePhase {
    async run() {
        this.log(`🏗️ Phase 2.5: Implementation (Code Generation)...`, 'info');
        
        const blueprintPath = path.join(this.engine.rootPath, 'NEXUS_BLUEPRINT.json');
        if (!(await fs.pathExists(blueprintPath))) {
            this.log(`⚠️ No blueprint found. Skipping implementation.`, 'warning');
            return;
        }

        const blueprint = await fs.readJson(blueprintPath);
        
        // 1. Generate Models
        const models = blueprint.models || [];
        for (const model of models) {
            await this.generateModel(model);
        }

        // 2. Generate Migrations
        const migrations = blueprint.migrations || [];
        for (const migration of migrations) {
            await this.generateMigration(migration, blueprint);
        }

        // 3. Generate Livewire Components
        const components = blueprint.livewire_components || [];
        for (const component of components) {
            await this.generateLivewireComponent(component, blueprint);
        }

        this.log(`✅ Implementation Phase complete. Web app realized.`, 'success');
    }

    async generateModel(modelName) {
        this.log(`   🧠 Generating Model: ${modelName}...`, 'info');
        const prompt = `Write a complete Laravel Model class for '${modelName}'. Use namespace App\\Models. Include necessary traits like HasFactory and HasUuids. Include fillable fields based on a typical ${modelName}. Output ONLY the raw PHP code, starting with <?php. No markdown blocks.`;
        
        const response = await localAI.generate(prompt, 'build_model_migration');
        if (response) {
            const cleanCode = this.cleanLLMOutput(response);
            const modelPath = path.join(this.engine.rootPath, 'app', 'Models', `${modelName}.php`);
            await fs.ensureDir(path.dirname(modelPath));
            await fs.writeFile(modelPath, cleanCode);
            this.log(`      ✅ Saved ${modelName}.php`, 'success');
        } else {
            this.log(`      ❌ Failed to generate model ${modelName}.`, 'error');
        }
    }

    async generateMigration(migrationName, blueprint) {
        this.log(`   🗄️ Generating Migration: ${migrationName}...`, 'info');
        const prompt = `Write a complete Laravel database migration for '${migrationName}'. Use anonymous class syntax: "return new class extends Migration". Include $table->uuid('id')->primary() and timestamps(). Add relevant columns for a ${blueprint.project_name}. Output ONLY the raw PHP code, starting with <?php. No markdown blocks.`;
        
        const response = await localAI.generate(prompt, 'build_model_migration');
        if (response) {
            const cleanCode = this.cleanLLMOutput(response);
            const timestamp = new Date().toISOString().replace(/[-:T]/g, '_').slice(0, 14);
            const migrationFilename = `2026_06_01_${timestamp}_${migrationName}.php`;
            const migrationPath = path.join(this.engine.rootPath, 'database', 'migrations', migrationFilename);
            await fs.ensureDir(path.dirname(migrationPath));
            await fs.writeFile(migrationPath, cleanCode);
            this.log(`      ✅ Saved ${migrationFilename}`, 'success');
        } else {
            this.log(`      ❌ Failed to generate migration ${migrationName}.`, 'error');
        }
    }

    async generateLivewireComponent(componentName, blueprint) {
        this.log(`   🔌 Generating Livewire Component: ${componentName}...`, 'info');
        const className = this.toPascalCase(componentName);
        
        // Generate PHP Class
        const phpPrompt = `Write a complete Livewire component class for '${className}'. Namespace: App\\Livewire. It should handle the logic for a ${blueprint.project_name}. Include public properties and basic methods (like save/delete). Output ONLY the raw PHP code, starting with <?php. No markdown blocks.`;
        const phpResponse = await localAI.generate(phpPrompt, 'build_livewire_component');
        
        if (phpResponse) {
            const cleanPhp = this.cleanLLMOutput(phpResponse);
            const phpPath = path.join(this.engine.rootPath, 'app', 'Livewire', `${className}.php`);
            await fs.ensureDir(path.dirname(phpPath));
            await fs.writeFile(phpPath, cleanPhp);
            this.log(`      ✅ Saved ${className}.php`, 'success');
        }

        // Generate Blade View
        const bladePrompt = `Write a complete Livewire blade view for the '${className}' component. Use Tailwind CSS for styling and Alpine.js where appropriate. Make it look professional and beautiful. Use wire:model and wire:click for interactions. Output ONLY the raw HTML/Blade code. No markdown blocks.`;
        const bladeResponse = await localAI.generate(bladePrompt, 'build_view');
        
        if (bladeResponse) {
            const cleanBlade = this.cleanLLMOutput(bladeResponse);
            const bladePath = path.join(this.engine.rootPath, 'resources', 'views', 'livewire', `${this.toKebabCase(componentName)}.blade.php`);
            await fs.ensureDir(path.dirname(bladePath));
            await fs.writeFile(bladePath, cleanBlade);
            this.log(`      ✅ Saved ${this.toKebabCase(componentName)}.blade.php`, 'success');
        }
    }

    cleanLLMOutput(output) {
        let clean = output.trim();
        if (clean.startsWith('\`\`\`php')) clean = clean.substring(6);
        else if (clean.startsWith('\`\`\`html')) clean = clean.substring(7);
        else if (clean.startsWith('\`\`\`blade')) clean = clean.substring(8);
        else if (clean.startsWith('\`\`\`')) clean = clean.substring(3);
        
        if (clean.endsWith('\`\`\`')) clean = clean.substring(0, clean.length - 3);
        return clean.trim();
    }

    toPascalCase(str) {
        return str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    }

    toKebabCase(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
}

module.exports = ImplementationPhase;
