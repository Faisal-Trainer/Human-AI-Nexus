const fs = require('fs-extra');
const path = require('path');

/**
 * VCS Architect Scanner
 */
async function scan(targetPath) {
    const findings = [];

    // 1. Check for .gitignore existence and common misses
    const gitignorePath = path.join(targetPath, '.gitignore');
    if (!(await fs.pathExists(gitignorePath))) {
        findings.push({
            severity: 'CRITICAL',
            message: '.gitignore file is missing. This risks committing environment secrets and dependencies.',
            file: 'root'
        });
    } else {
        const content = await fs.readFile(gitignorePath, 'utf8');
        const commonIgnores = ['node_modules', '.env', '.DS_Store', 'dist'];
        
        for (const item of commonIgnores) {
            if (!content.includes(item)) {
                findings.push({
                    severity: 'WARNING',
                    message: `Missing '${item}' in .gitignore.`,
                    file: '.gitignore'
                });
            }
        }
    }

    // 2. Scan for merge conflict markers
    const { glob } = require('glob');
    const files = glob.sync('**/*.{js,php,py,md,txt,html}', { cwd: targetPath, ignore: ['node_modules/**', '.git/**', 'vendor/**'] });
    
    for (const file of files) {
        const fullPath = path.join(targetPath, file);
        const content = await fs.readFile(fullPath, 'utf8');
        if (content.includes('<<' + '<<<<<') && content.includes('>>' + '>>>>>')) {
            findings.push({
                severity: 'CRITICAL',
                message: `Git merge conflict markers detected. File is in a broken state.`,
                file: file
            });
        }
    }

    // 3. Junk Detection (Mata Sampah)
    const junkPatterns = ['**/*.log', '**/.DS_Store', '**/Thumbs.db', '**/desktop.ini', 'src/*_test.*', 'src/test_*.*'];
    const junkFiles = glob.sync(`{${junkPatterns.join(',')}}`, { cwd: targetPath, ignore: ['node_modules/**', 'vendor/**'] });

    for (const junk of junkFiles) {
        findings.push({
            severity: 'INFO',
            message: `Potential junk or temporary file detected.`,
            file: junk,
            rationale: 'File sampah atau temporary (seperti .log atau .DS_Store) mengotori repository dan bisa menyebabkan masalah performa pada Git.',
            recommendation: 'Hapus file ini atau tambahkan polanya ke dalam .gitignore agar tidak terlacak oleh Version Control.'
        });
    }

    return findings;
}

module.exports = { scan };
