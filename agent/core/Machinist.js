const fs = require('fs-extra');
const path = require('path');
const NexusClock = require('./NexusClock');

// ⛔ PAGAR 3 — PATH WHITELIST: Hanya folder ini yang boleh di-write Machinist
const FORGE_ALLOWED_PATHS = [
    'agent/tools/scanners/', // ✅ Scanner plugins — aman
];

// ⛔ BLACKLIST ABSOLUT: Tidak pernah boleh disentuh Machinist
const FORGE_FORBIDDEN_PATHS = [
    'agent/core/',       // ❌ Core engine
    'agent/main.js',     // ❌ Entry point
    'cli.js',            // ❌ CLI
    'agent/prompts/',    // ❌ Agent prompts (bisa manipulasi behavior)
    'memory/distilled/', // ❌ Knowledge HUB (hanya lewat Distiller)
];

// ⛔ Modul core yang TIDAK boleh di-import oleh scanner yang di-forge
const FORBIDDEN_CORE_IMPORTS = [
    'NexusEngine', 'MemoryPipeline', 'Orchestrator', 'EvolutionPiper',
    'Distiller', 'Machinist', 'RedisMemory', 'LocalIntelligence'
];

/**
 * Machinist - The Evolution Engine.
 * Handles the physical registration and integration of new core machines.
 * ⛔ GUARDRAIL v2.0: Path whitelist + forbidden import check enforced.
 */
class Machinist {
    constructor(rootPath, tddScaffolder) {
        this.rootPath = rootPath;
        this.enginePath = path.join(this.rootPath, 'agent/core/NexusEngine.js');
        this.tddScaffolder = tddScaffolder;
        this.wisdomPath = path.join(this.rootPath, 'memory', 'distilled');
    }

    /**
     * ⛔ INTERNAL GUARD: Validate output path sebelum forge.
     * @param {string} outputPath - Relative path dari rootPath.
     * @throws {Error} jika path tidak di whitelist atau di blacklist.
     */
    _validateForgePath(outputPath) {
        // Resolve absolute path to prevent ../../ traversal
        const absoluteResolved = path.resolve(this.rootPath, outputPath);
        const normalizedPath = path.relative(this.rootPath, absoluteResolved)
                                   .replace(/\\/g, '/');

        // Ensure it doesn't escape the rootPath
        if (normalizedPath.startsWith('..')) {
            throw new Error(`Machinist: Path traversal detected: ${outputPath}`);
        }

        const isAllowed = FORGE_ALLOWED_PATHS.some(p => normalizedPath.startsWith(p));
        const isForbidden = FORGE_FORBIDDEN_PATHS.some(p => normalizedPath.startsWith(p));

        if (!isAllowed || isForbidden) {
            throw new Error(
                `🚧 MACHINIST BOUNDARY VIOLATION: ` +
                `Attempted to forge into forbidden path: "${normalizedPath}". ` +
                `Forge is restricted to: [${FORGE_ALLOWED_PATHS.join(', ')}]`
            );
        }
    }

    /**
     * ⛔ INTERNAL GUARD: Validate wisdom source harus dari memory/distilled/.
     * @param {string} wisdomPath - Path ke file wisdom.
     * @throws {Error} jika bukan dari HUB resmi.
     */
    _validateWisdomSource(wisdomPath) {
        const absoluteWisdom = path.resolve(wisdomPath);
        const absoluteHub = path.resolve(this.wisdomPath);

        if (!absoluteWisdom.startsWith(absoluteHub)) {
            throw new Error(
                `🚧 MACHINIST BOUNDARY VIOLATION: ` +
                `Wisdom source must come from memory/distilled/. ` +
                `Got: "${wisdomPath}"`
            );
        }
    }

    /**
     * ⛔ INTERNAL GUARD: Check generated code tidak import modul core.
     * @param {string} generatedCode - Source code yang akan ditulis.
     * @param {string} scannerName - Nama scanner untuk pesan error.
     * @throws {Error} jika ada forbidden import.
     */
    _validateGeneratedCode(generatedCode, scannerName) {
        for (const forbidden of FORBIDDEN_CORE_IMPORTS) {
            if (generatedCode.includes(forbidden)) {
                throw new Error(
                    `🚧 MACHINIST BOUNDARY VIOLATION: ` +
                    `Scanner "${scannerName}" tried to import core module: "${forbidden}". ` +
                    `Forged scanners must be fully isolated. Remove the import and retry.`
                );
            }
        }
    }

    /**
     * Machinist 2.0: Analyze findings to identify recurring patterns for skill forging.
     */
    analyzePatterns(findings) {
        const patternMap = new Map();
        findings.forEach(f => {
            const key = f.message.split(':')[0];
            patternMap.set(key, (patternMap.get(key) || 0) + 1);
        });
        return Array.from(patternMap.entries())
            .filter(([, count]) => count >= 2)
            .map(([key]) => key);
    }

    /**
     * Integrate a new machine into the core engine.
     */
    async integrate(name, type = 'auditor') {
        console.log(`🦾 Machinist: Integrating new ${type} component '${name}'...`);

        let content = await fs.readFile(this.enginePath, 'utf8');
        const instanceName = name.charAt(0).toLowerCase() + name.slice(1);
        const relPath = type === 'orchestrator' ? `./${name}` : `./../tools/scanners/${name}`;

        if (!content.includes(`require('${relPath}')`)) {
            const requireAnchor = "const Distiller = require('./Distiller');";
            content = content.replace(
                requireAnchor,
                `${requireAnchor}\nconst ${name} = require('${relPath}');`
            );
        }

        if (!content.includes(`this.${instanceName} = new ${name}`)) {
            const initAnchor = "this.distiller = new Distiller(this.knowledgePath);";
            content = content.replace(
                initAnchor,
                `${initAnchor}\n        this.${instanceName} = new ${name}(this.rootPath);`
            );
        }

        await fs.writeFile(this.enginePath, content);
        console.log(`✅ Machinist: ${name} successfully integrated.`);
    }

    /**
     * Forge a new scanner machine based on HUB knowledge.
     * ⛔ All three guards run before any file is written.
     */
    async forge(name, knowledgeFilePath) {
        console.log(`🔥 Machinist Forge: Building '${name}' from ${path.basename(knowledgeFilePath)}...`);

        // ⛔ GUARD 1: Validate wisdom source path
        this._validateWisdomSource(knowledgeFilePath);

        if (!(await fs.pathExists(knowledgeFilePath))) {
            throw new Error(`Wisdom not found at ${knowledgeFilePath}`);
        }

        const content = await fs.readFile(knowledgeFilePath, 'utf8');
        const rulesMatch = content.match(/#### (?:Actionable Steps|Core Insights \(Distilled\)):\s*([\s\S]*?)(?=\n#|\n---|\n\Z)/i);
        const rules = rulesMatch
            ? rulesMatch[1].trim().split('\n').map(r => r.replace(/^[*\-]\s*/, '').trim())
            : ['Verify general adherence to standards mentioned in knowledge source.'];

        if (rules.length === 0 || (rules.length === 1 && rules[0] === '')) {
            rules[0] = 'Verify general adherence to standards mentioned in knowledge source.';
        }

        // ⛔ GUARD 2: Validate output path
        const outputRelPath = `agent/tools/scanners/${this.toKebabCase(name)}.js`;
        this._validateForgePath(outputRelPath);

        const scannerPath = path.join(this.rootPath, outputRelPath);
        const scannerContent = this.getScannerTemplate(name, rules, path.basename(knowledgeFilePath));

        // ⛔ GUARD 3: Validate generated code (no core imports)
        this._validateGeneratedCode(scannerContent, name);

        // All guards passed — safe to write
        await fs.writeFile(scannerPath, scannerContent);
        console.log(`   📂 File forged: ${scannerPath}`);

        if (this.tddScaffolder) {
            const relScannerPath = path.relative(this.rootPath, scannerPath);
            await this.tddScaffolder.generate(relScannerPath);
            console.log(`   🧪 Auto-TDD: Test scaffolded for ${name}.`);
        }

        console.log(`✅ Machinist Forge: '${name}' is now alive.`);
    }

    getScannerTemplate(name, rules, source) {
        const checkPoints = rules.map(r => {
            const words = r.split(' ').filter(w => w.length > 3);
            return words.slice(0, 2).join(' ').replace(/[^a-zA-Z0-9 ]/g, '').trim();
        }).filter(cp => cp.length > 2);

        // NOTE: Template deliberately does NOT import any core modules — GUARD 3 enforces this.
        return `const fs = require('fs-extra');
const path = require('path');
const fg = require('fast-glob');

/**
 * \${name} - Automatically Forged by Nexus Machinist
 * Source Wisdom: \${source}
 * Built At: \${NexusClock.getLocalTimestamp()}
 */
async function scan(targetPath) {
    const findings = [];
    const checkPoints = \${JSON.stringify(checkPoints, null, 4)};
    const normalizedTarget = targetPath.replace(/\\\\/g, '/');

    console.log(\\\`🔍 Forged Machine '\${name}' scanning for wisdom adherence...\\\`);

    try {
        const files = fg.sync('**/*.{js,php,html,css,md,json}', {
            cwd: normalizedTarget,
            ignore: ['node_modules/**', 'vendor/**', 'nexus/**', 'memory/**', 'documentation/**'],
            onlyFiles: true
        });

        let matchCount = 0;
        for (const file of files) {
            const fullPath = path.join(targetPath, file);
            const content = await fs.readFile(fullPath, 'utf8').catch(() => '');

            for (const cp of checkPoints) {
                if (content.toLowerCase().includes(cp.toLowerCase())) {
                    findings.push({
                        severity: 'INFO',
                        message: \`Adherence identified: Wisdom point '\${cp}' found in \${file}\`,
                        file: file
                    });
                    matchCount++;
                }
            }
        }

        findings.push({
            severity: matchCount > 0 ? 'SUCCESS' : 'WARNING',
            message: \`Machine '${name}' completed. Wisdom coverage: \${matchCount} matches found.\`,
            file: 'system'
        });
    } catch (err) {
        findings.push({
            severity: 'ERROR',
            message: \`Forged Machine Error: \${err.message}\`,
            file: 'system'
        });
    }

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
