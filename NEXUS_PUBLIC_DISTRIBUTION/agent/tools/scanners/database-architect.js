const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

/**
 * Database Architect Scanner
 */
async function scan(targetPath) {
    const findings = [];

    // 1. Scan for hardcoded DB connection strings
    const files = glob.sync('**/*.{js,php,py}', { cwd: targetPath, ignore: ['node_modules/**', 'vendor/**', 'cli.js'] });
    const dbTokens = [
        Buffer.from('bXlzcWw6aG9zdD0=', 'base64').toString(),
        Buffer.from('cG9zdGdyZXM6Ly8=', 'base64').toString(),
        Buffer.from('bW9uZ29kYjovLw==', 'base64').toString(),
        Buffer.from('c3FsaXRlOg==', 'base64').toString()
    ];
    const dbRegex = new RegExp(dbTokens.join('|'), 'i');

    for (const file of files) {
        const fullPath = path.join(targetPath, file);
        const content = await fs.readFile(fullPath, 'utf8');
        if (dbRegex.test(content)) {
            findings.push({
                severity: 'WARNING',
                message: `Hardcoded database connection string detected.`,
                file: file,
                rationale: 'Menyimpan kredensial database langsung di dalam kode adalah celah keamanan besar. Jika kode ini diakses pihak luar, mereka bisa mengontrol database Anda.',
                recommendation: 'Pindahkan string koneksi ke file .env dan gunakan process.env untuk memanggilnya.'
            });
        }
    }

    // 2. Scan for potentially missing indexes (look for foreign key patterns in migrations/models)
    const dbFiles = glob.sync('**/*.{sql,php,js}', { cwd: targetPath, ignore: ['node_modules/**', 'vendor/**'] });
    const fkRegex = /unsignedBigInteger\(['"]([^'"]+)_id['"]\)|foreign\(['"]([^'"]+)_id['"]\)/gi;
    const indexRegex = /index\(/i;

    for (const file of dbFiles) {
        const fullPath = path.join(targetPath, file);
        const content = await fs.readFile(fullPath, 'utf8');
        
        let match;
        while ((match = fkRegex.exec(content)) !== null) {
            if (!indexRegex.test(content)) { // Very simple heuristic
                 findings.push({
                    severity: 'INFO',
                    message: `Foreign key '${match[1] || match[2]}_id' detected. Ensure an index is created for better query performance.`,
                    file: file
                });
            }
        }
    }

    return findings;
}

module.exports = { scan };
