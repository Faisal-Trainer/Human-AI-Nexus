const fs = require('fs-extra');
const path = require('path');

/**
 * Machinist - The Evolution Engine.
 * Handles the physical registration and integration of new core machines.
 */
class Machinist {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.enginePath = path.join(this.rootPath, 'agent/core/NexusEngine.js');
    }

    /**
     * Integrate a new machine into the core engine.
     * @param {string} name - Name of the class (e.g., Validator).
     * @param {string} type - 'orchestrator' or 'auditor'.
     */
    async integrate(name, type = 'auditor') {
        console.log(`🦾 Machinist: Integrating new ${type} component '${name}'...`);
        
        let content = await fs.readFile(this.enginePath, 'utf8');
        const instanceName = name.charAt(0).toLowerCase() + name.slice(1);
        const relPath = type === 'orchestrator' ? `./${name}` : `./../auditor/${name}`;

        // 1. Add Require (Smart Injection)
        if (!content.includes(`require('${relPath}')`)) {
            const requireAnchor = "const Distiller = require('./Distiller');";
            content = content.replace(
                requireAnchor,
                `${requireAnchor}\nconst ${name} = require('${relPath}');`
            );
        }

        // 2. Add Initialization in Constructor
        if (!content.includes(`this.${instanceName} = new ${name}`)) {
            const initAnchor = "this.distiller = new Distiller(this.knowledgePath);";
            content = content.replace(
                initAnchor,
                `${initAnchor}\n        this.${instanceName} = new ${name}(this.rootPath);`
            );
        }

        await fs.writeFile(this.enginePath, content);
        console.log(`✅ Machinist: ${name} successfully integrated into ${type} flow.`);
    }
}

module.exports = Machinist;
