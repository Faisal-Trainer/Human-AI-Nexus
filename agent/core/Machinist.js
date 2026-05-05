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

    /**
     * Forge a new scanner machine based on HUB knowledge.
     * @param {string} name - Name of the new machine (e.g., BrandingScanner).
     * @param {string} knowledgeFilePath - Path to the distilled knowledge file.
     */
    async forge(name, knowledgeFilePath) {
        console.log(`🔥 Machinist Forge: Building '${name}' from wisdom at ${path.basename(knowledgeFilePath)}...`);
        
        if (!(await fs.pathExists(knowledgeFilePath))) {
            throw new Error(`Wisdom not found at ${knowledgeFilePath}`);
        }

        const content = await fs.readFile(knowledgeFilePath, 'utf8');
        
        // Extract logic/rules (looking for Actionable Steps or Core Insights)
        const rulesMatch = content.match(/#### (?:Actionable Steps|Core Insights \(Distilled\)):\s*([\s\S]*?)(?=\n#|\n---|\n\Z)/i);
        const rules = rulesMatch ? rulesMatch[1].trim().split('\n').map(r => r.replace(/^[*-]\s*/, '').trim()) : [];

        if (rules.length === 0) {
            console.log('⚠️ No specific actionable steps found. Building generic scanner...');
            rules.push('Verify general adherence to standards mentioned in knowledge source.');
        }

        // 1. Scaffold the physical file
        const scannerPath = path.join(this.rootPath, 'agent/tools/scanners', `${this.toKebabCase(name)}.js`);
        const scannerContent = this.getScannerTemplate(name, rules, path.basename(knowledgeFilePath));
        
        await fs.writeFile(scannerPath, scannerContent);
        console.log(`   📂 File forged: ${scannerPath}`);

        // 2. Integrate into Engine (Auditor flow)
        // Note: For scanners, integration happens dynamically in the engine, 
        // but we can register it as a named tool if needed.
        console.log(`✅ Machinist Forge: '${name}' is now alive.`);
    }

    /**
     * Scanner Template Generator
     */
    getScannerTemplate(name, rules, source) {
        return `const fs = require('fs-extra');
const path = require('path');

/**
 * ${name} - Automatically Forged by Nexus Machinist
 * Source Wisdom: ${source}
 */
async function scan(targetPath) {
    const findings = [];
    const rules = ${JSON.stringify(rules, null, 4)};

    // Forged Logic Execution
    // This machine was built to monitor:
    // ${rules.join('\n    // ')}

    // Generic implementation for forged machines
    // In a real scenario, the AI would generate specific regex/checks here.
    findings.push({
        severity: 'INFO',
        message: \`Machine '${name}' activated. Wisdom Source: ${source}\`,
        file: 'system'
    });

    return findings;
}

module.exports = { scan };
`;
    }

    toKebabCase(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
}

module.exports = Machinist;
