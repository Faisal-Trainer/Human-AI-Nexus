const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

/**
 * UX/UI Engineer Scanner
 */
async function scan(targetPath) {
    const findings = [];

    const files = glob.sync('**/*.{html,jsx,tsx,blade.php,vue,css,scss}', { cwd: targetPath, ignore: ['node_modules/**'] });
    
    // 1. Scan for hardcoded colors (HEX/RGB) instead of variables
    const colorRegex = /#([a-f0-9]{3}){1,2}|rgba?\(\d+,\s*\d+,\s*\d+(,\s*\d+(\.\d+)?)?\)/gi;
    
    for (const file of files) {
        const fullPath = path.join(targetPath, file);
        const content = await fs.readFile(fullPath, 'utf8');

        // Logic: CSS files are allowed to define colors, but HTML/JSX should use classes/vars
        if (file.endsWith('.html') || file.endsWith('.jsx') || file.endsWith('.tsx') || file.endsWith('.blade.php')) {
            if (colorRegex.test(content)) {
                findings.push({
                    severity: 'INFO',
                    message: `Hardcoded color values detected. Consider using CSS variables or Tailwind classes for better UI consistency.`,
                    file: file
                });
            }
        }

        // 2. Scan for broken/empty links
        const linkRegex = /href=["']#["']/g;
        if (linkRegex.test(content)) {
            findings.push({
                severity: 'WARNING',
                message: `Empty/placeholder links (href="#") detected. Ensure all links point to real destinations.`,
                file: file
            });
        }
    }

    return findings;
}

module.exports = { scan };
