const fs = require('fs-extra');
const path = require('path');

/**
 * AccessibilityScanner - WCAG Compliance Machine.
 */
class AccessibilityScanner {
    constructor(rootPath) {
        this.rootPath = rootPath;
    }

    async scan(file) {
        const fullPath = path.join(this.rootPath, file);
        if (!(await fs.pathExists(fullPath))) return [];

        const content = await fs.readFile(fullPath, 'utf8');
        const findings = [];

        // Simple pattern checks for a11y
        if (content.includes('<img') && !content.includes('alt=')) {
            findings.push({
                severity: 'WARNING',
                message: 'Image missing alt attribute (Accessibility Violation).',
                file: file
            });
        }

        if (content.includes('<a') && !content.includes('aria-label') && content.includes('href="#"')) {
            findings.push({
                severity: 'INFO',
                message: 'Interactive element may need descriptive aria-label.',
                file: file
            });
        }

        return findings;
    }
}

module.exports = AccessibilityScanner;
