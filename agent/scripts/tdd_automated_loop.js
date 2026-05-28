const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

/**
 * 🚀 NEXUS AUTOMATED TDD LOOP PIPELINE
 * Author: Antigravity (NEXUS AI Assistant)
 */

async function checkDiskSpace() {
    try {
        // Windows specific disk check
        const output = execSync('wmic logicaldisk get caption,freespace,size').toString();
        const lines = output.trim().split('\n').filter(l => l.includes('C:'));
        if (lines.length > 0) {
            const parts = lines[0].trim().split(/\s+/);
            const freeBytes = parseInt(parts[1]);
            const freeGB = freeBytes / (1024 * 1024 * 1024);
            
            console.log(`💾 Disk Status (C:): ${freeGB.toFixed(2)} GB Free`);
            
            if (freeGB < 1) { // Stop if less than 1GB
                console.error('🛑 CRITICAL: Disk space is low (<1GB). Force stopping to protect data.');
                process.exit(1);
            }
        }
    } catch (e) {
        console.warn('⚠️ Could not check disk space, proceeding with caution.');
    }
}

async function runPipeline(projectName, rootPath) {
    console.log(`\n\n=========================================`);
    console.log(`🎯 STARTING PROJECT: ${projectName}`);
    console.log(`📂 ROOT: ${rootPath}`);
    console.log(`=========================================\n`);

    await checkDiskSpace();

    try {
        // 1. RUN SDLC CYCLE (Audit -> Plan -> Execute)
        console.log('🔄 Executing SDLC Cycle...');
        execSync(`bun agent/main.js run --root "${rootPath}" --yes`, { stdio: 'inherit' });

        // 2. INTERNAL PIPELINE (Refactor -> Distill -> Update)
        console.log('\n🧠 Executing Internal Pipeline...');
        
        const harvestTarget = path.resolve('golden/harvest', projectName, 'knowledge');
        await fs.ensureDir(harvestTarget);

        // Harvest important artifacts with project-specific prefixes to avoid Distiller collisions
        const sources = ['audit', 'memory/operational', 'memory/distilled', 'documentation'];
        for (const src of sources) {
            const srcPath = path.join(rootPath, src);
            if (await fs.pathExists(srcPath)) {
                console.log(`🌾 Harvesting project ${src}...`);
                const files = await fs.readdir(srcPath);
                for (const f of files) {
                    const fullSrc = path.join(srcPath, f);
                    if ((await fs.stat(fullSrc)).isFile() && f.endsWith('.md')) {
                        const newName = `${projectName.toUpperCase().replace(/\s+/g, '_')}_${f}`;
                        let content = await fs.readFile(fullSrc, 'utf8');
                        
                        // Inject Tags to ensure agents "learn" from these specific test results
                        const tags = ['tdd', 'test_result', projectName.toLowerCase().replace(/\s+/g, '_')];
                        if (f.toLowerCase().includes('audit')) tags.push('audit');
                        if (f.toLowerCase().includes('plan')) tags.push('planning');
                        
                        content += `\n\n---\n> **METADATA (NEXUS SEMANTIC TAGS)**: [${tags.join(', ')}]\n`;
                        await fs.writeFile(path.join(harvestTarget, newName), content);
                    }
                }
            }
        }

        execSync('bun cli.js refactor', { stdio: 'inherit' });
        execSync('bun cli.js distill', { stdio: 'inherit' });
        execSync('bun cli.js update-skills', { stdio: 'inherit' });

        console.log(`\n✅ PROJECT ${projectName} COMPLETED SUCCESSFULLY.`);
    } catch (error) {
        console.error(`\n❌ ERROR in Project ${projectName}: ${error.message}`);
        // Continue to next project or stop? 
        // User said "sampai seluruh project jalan sepenuhnya", so we keep going but log error.
    }
}

async function startLoop() {
    const tddFile = 'documentation/planning/nexus testing TDD.md';
    const content = await fs.readFile(tddFile, 'utf8');
    
    // Extract project names
    const projectMatches = content.match(/# \d+\. Project: (.*)/g);
    if (!projectMatches) {
        console.error('No projects found in TDD file.');
        return;
    }

    const projects = projectMatches.map(m => m.replace(/# \d+\. Project: /, '').trim());

    for (const project of projects) {
        // Create dummy folder for testing if it doesn't exist
        const folderName = project.toLowerCase().replace(/\s+/g, '_');
        const projectPath = path.resolve('tests', folderName);
        
        if (!await fs.pathExists(projectPath)) {
            await fs.ensureDir(projectPath);
            // Basic Laravel-like structure for the auditor to find
            await fs.ensureDir(path.join(projectPath, 'app/Models'));
            await fs.ensureDir(path.join(projectPath, 'database/migrations'));
            await fs.writeFile(path.join(projectPath, 'README.md'), `# ${project}\nInitial state for TDD test.`);
        }

        await runPipeline(project, projectPath);
    }

    console.log('\n\n✨ ALL TDD PROJECTS COMPLETED.');
}

startLoop();
