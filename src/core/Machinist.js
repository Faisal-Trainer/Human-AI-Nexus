const fs = require('fs-extra');
const path = require('path');

/**
 * Machinist - The Evolution Engine.
 * Handles the physical registration and integration of new core machines.
 */
class Machinist {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.enginePath = path.join(this.rootPath, 'src/core/NexusEngine.js');
    }

    /**
     * Integrate a new machine into the core engine.
     * @param {string} name - Name of the class (e.g., Validator).
     * @param {string} fileName - File name (e.g., Validator.js).
     */
    async integrate(name, fileName) {
        console.log(`🦾 Machinist: Integrating new engine component '${name}'...`);
        
        let content = await fs.readFile(this.enginePath, 'utf8');
        const instanceName = name.charAt(0).toLowerCase() + name.slice(1);

        // 1. Add Require
        if (!content.includes(`require('./${name}')`)) {
            content = content.replace(
                "const RootCauseAnalyzer = require('./RootCauseAnalyzer');",
                `const RootCauseAnalyzer = require('./RootCauseAnalyzer');\nconst ${name} = require('./${name}');`
            );
        }

        // 2. Add Initialization in Constructor
        if (!content.includes(`this.${instanceName} = new ${name}`)) {
            content = content.replace(
                "this.rcAnalyzer = new RootCauseAnalyzer();",
                `this.rcAnalyzer = new RootCauseAnalyzer();\n        this.${instanceName} = new ${name}(this.rootPath);`
            );
        }

        await fs.writeFile(this.enginePath, content);
        console.log(`✅ Machinist: ${name} successfully integrated into NexusEngine.`);
    }
}

module.exports = Machinist;
