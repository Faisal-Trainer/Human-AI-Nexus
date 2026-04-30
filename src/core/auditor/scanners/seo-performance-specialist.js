const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

/**
 * SEO & Performance Scanner
 */
async function scan(targetPath) {
    const findings = [];
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

    // 1. Scan for Large Assets (Performance)
    const assets = glob.sync('**/*.{png,jpg,jpeg,gif,svg,mp4,pdf}', { cwd: targetPath, ignore: ['node_modules/**', 'vendor/**', '.git/**'] });
    
    for (const asset of assets) {
        const fullPath = path.join(targetPath, asset);
        const stats = await fs.stat(fullPath);
        
        if (stats.size > MAX_FILE_SIZE) {
            findings.push({
                severity: 'WARNING',
                message: `Large asset detected (${(stats.size / 1024 / 1024).toFixed(2)} MB).`,
                file: asset,
                rationale: 'File media yang besar memperlambat waktu muat halaman (LCP), yang berdampak buruk pada pengalaman pengguna dan ranking Google.',
                recommendation: 'Kompres gambar menggunakan tool seperti TinyPNG atau ubah formatnya menjadi WebP/WebM yang lebih ringan.'
            });
        }
    }

    // 2. Scan HTML/JSX/Blade for SEO best practices
    const views = glob.sync('**/*.{html,htm,jsx,tsx,blade.php,vue}', { cwd: targetPath, ignore: ['node_modules/**', 'vendor/**'] });
    
    for (const view of views) {
        const fullPath = path.join(targetPath, view);
        const content = await fs.readFile(fullPath, 'utf8');

        // Check for missing ALT tags in images
        const imgRegex = /<img\s+[^>]*>/gi;
        const altRegex = /\salt\s*=/i;
        let match;
        while ((match = imgRegex.exec(content)) !== null) {
            if (!altRegex.test(match[0])) {
                findings.push({
                    severity: 'WARNING',
                    message: `Image missing 'alt' attribute. This affects SEO and accessibility.`,
                    file: view
                });
            }
        }

        // Check for missing Meta Description in HTML files
        if (view.endsWith('.html') || view.endsWith('.htm')) {
            if (!/<meta\s+name=["']description["']/i.test(content)) {
                findings.push({
                    severity: 'INFO',
                    message: `Missing meta description tag.`,
                    file: view
                });
            }
            if (!/<title>/i.test(content)) {
                findings.push({
                    severity: 'CRITICAL',
                    message: `Missing <title> tag.`,
                    file: view
                });
            }
        }
    }

    return findings;
}

module.exports = { scan };
