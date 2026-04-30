const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

/**
 * Cyber Security Scanner
 */
async function scan(targetPath) {
    const findings = [];

    // 1. Check for .env exposure
    const envPath = path.join(targetPath, '.env');
    if (await fs.pathExists(envPath)) {
        findings.push({
            severity: 'CRITICAL',
            message: '.env file detected in project root.',
            file: '.env',
            rationale: 'File .env berisi kredensial sensitif seperti API keys dan password database. Membiarkannya di root tanpa proteksi berisiko kebocoran data jika tersinkronisasi ke repository publik.',
            recommendation: 'Tambahkan .env ke dalam file .gitignore dan gunakan environment variables di tingkat server.'
        });
    }

    // 2. Scan for hardcoded credentials (basic regex)
    const files = glob.sync('**/*.{js,php,py,env}', { cwd: targetPath, ignore: ['node_modules/**', 'vendor/**'] });
    const secretRegex = /(password|api_key|secret|token)\s*[:=]\s*['"][^'"]+['"]/i;

    for (const file of files) {
        const fullPath = path.join(targetPath, file);
        const content = await fs.readFile(fullPath, 'utf8');
        if (secretRegex.test(content)) {
            findings.push({
                severity: 'WARNING',
                message: `Potential hardcoded credential or secret detected in file.`,
                file: file
            });
        }
    }

    return findings;
}

module.exports = { scan };
