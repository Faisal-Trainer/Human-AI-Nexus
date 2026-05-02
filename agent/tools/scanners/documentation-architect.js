const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

/**
 * Documentation Architect Scanner
 */
async function scan(targetPath) {
    const findings = [];

    // 1. Check for core documentation folders
    const docPath = path.join(targetPath, 'documentation');
    const docsPath = path.join(targetPath, 'docs');
    
    if (!(await fs.pathExists(docPath)) && !(await fs.pathExists(docsPath))) {
        findings.push({
            severity: 'WARNING',
            message: `No 'documentation/' or 'documentation/docs/' folder found. Standardizing project knowledge is recommended.`,
            file: 'root'
        });
    }

    // 2. Scan code files for JSDoc/Docstring coverage
    const codeFiles = glob.sync('**/*.{js,php,py}', { cwd: targetPath, ignore: ['node_modules/**', 'vendor/**', 'cli.js'] });
    const docRegex = /\/\*\*|\/\*\*[\s\S]*?\*\/|"""[\s\S]*?"""|#\s+\w+/;

    for (const file of codeFiles) {
        const fullPath = path.join(targetPath, file);
        const content = await fs.readFile(fullPath, 'utf8');
        
        // Very basic check: If file is > 50 lines but has no docstring
        const lines = content.split('\n').length;
        if (lines > 50 && !docRegex.test(content)) {
            findings.push({
                severity: 'INFO',
                message: `File has over 50 lines but no detected documentation/docstrings.`,
                file: file
            });
        }
    }

    return findings;
}

module.exports = { scan };
