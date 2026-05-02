const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

/**
 * NEXUS_SYSTEM_ORCHESTRATOR
 * 
 * Tool konsolidasi untuk manajemen ekosistem Nexus AI.
 * Menggabungkan fungsi Global Audit, Ingestion, dan Distillation.
 * 
 * @author Nexus AI Engine
 * @version 1.0.0
 */
async function runSystemOrchestration() {
    console.log('🚀 Activating NEXUS SYSTEM ORCHESTRATOR...');
    
    const rootPath = 'C:\\Users\\ACER\\Desktop\\NEXUS AI';
    const targets = [
        'C:\\xampp\\htdocs\\F-Novel',
        'C:\\xampp\\htdocs\\portofolio',
        'C:\\xampp\\htdocs\\talent-umkm-app',
        'C:\\xampp\\htdocs\\php native',
        'C:\\xampp\\htdocs\\public_html'
    ];

    // 1. Global Audit Phase
    console.log('\n🌐 Phase 1: Global Project Auditing...');
    for (const target of targets) {
        if (await fs.pathExists(target)) {
            console.log(`🔍 Auditing: ${target}...`);
            try {
                // Run nexus audit in the target folder
                execSync('nexus audit', { cwd: target, stdio: 'inherit' });
                
                // Harvest results back to golden
                console.log(`🌾 Harvesting results from ${target}...`);
                execSync(`nexus harvest "${target}"`, { cwd: rootPath, stdio: 'inherit' });
            } catch (e) {
                console.error(`❌ Error auditing ${target}: ${e.message}`);
            }
        }
    }

    // 2. Distillation Phase
    console.log('\n🧪 Phase 2: System Ingestion & Distillation...');
    try {
        execSync('nexus distill', { cwd: rootPath, stdio: 'inherit' });
    } catch (e) {
        console.error(`❌ Error during distillation: ${e.message}`);
    }

    // 3. Skill Synchronization Phase
    console.log('\n🧠 Phase 3: Skill Synchronization (HUB ➔ Skill)...');
    try {
        execSync('nexus update-skills', { cwd: rootPath, stdio: 'inherit' });
    } catch (e) {
        console.error(`❌ Error during skill synchronization: ${e.message}`);
    }

    // 4. Global Deployment Phase
    console.log('\n🚀 Phase 4: Global Deployment (Sync Core & Agents)...');
    for (const target of targets) {
        if (await fs.pathExists(target)) {
            console.log(`📦 Syncing latest Nexus to: ${target}...`);
            try {
                const coreDest = path.join(target, 'nexus', 'core');
                const agentDest = path.join(target, 'nexus', 'agent');
                
                await fs.ensureDir(coreDest);
                await fs.ensureDir(agentDest);
                
                await fs.copy(path.join(rootPath, 'src', 'core'), coreDest, { overwrite: true });
                await fs.copy(path.join(rootPath, 'agent'), agentDest, { overwrite: true });
                
                console.log(`   ✅ Successfully updated Nexus in ${target}`);
            } catch (e) {
                console.error(`❌ Error deploying to ${target}: ${e.message}`);
            }
        }
    }

    // 5. Final Status Phase
    console.log('\n📝 Phase 5: Final Status Update (README Timestamp)...');
    try {
        // We use a small script or call engine directly to update status
        const NexusEngine = require('../agent/core/NexusEngine');
        const engine = new NexusEngine({ rootPath });
        await engine.updateStatus();
    } catch (e) {
        console.error(`❌ Error updating README: ${e.message}`);
    }

    console.log('\n✨ NEXUS SYSTEM ORCHESTRATION COMPLETE. Ecosystem synchronized.');
}

runSystemOrchestration();
