const fs = require('fs-extra');
const path = require('path');

async function deepRewrite() {
    console.log('🔥 Starting Agent Deep Rewrite & Skill Injection...');
    const rootPath = process.cwd();
    const workflowsPath = path.join(rootPath, 'agent', 'workflows', 'external');
    const promptsPath = path.join(rootPath, 'agent', 'prompts', 'external');
    const skillPath = path.join(rootPath, 'skill');

    // 1. REWRITE SKILL FOLDER (Source of Knowledge)
    console.log('📂 Populating /skill folder from workflows...');
    await fs.ensureDir(skillPath);
    await fs.copy(workflowsPath, skillPath);
    console.log('   ✅ /skill folder populated.');

    // 2. REWRITE AGENT PROMPTS (Injection)
    const mappings = [
        {
            agent: 'core/ai-assistant.md',
            workflows: [
                'core/orchestrator.md',
                'core/project-manager.md',
                'core/memory-manager.md'
            ],
            title: 'MASTER WORKFLOW & ORCHESTRATION PROTOCOL'
        },
        {
            agent: 'engineering/web-engineer.md',
            workflows: ['frontend/web-engineer.md', 'frontend/ui-design-system.md'],
            title: 'WEB ENGINEERING & UI ARCHITECTURE STANDARDS'
        },
        {
            agent: 'engineering/database-architect.md',
            workflows: ['backend/database-design.md'],
            title: 'DATABASE DESIGN & ARCHITECTURE STANDARDS'
        },
        {
            agent: 'engineering/devops-specialist.md',
            workflows: ['devops/devops-specialist.md'],
            title: 'DEVOPS & INFRASTRUCTURE STANDARDS'
        },
        {
            agent: 'engineering/vcs-architect.md',
            workflows: ['devops/vcs-management.md'],
            title: 'VCS & WORKFLOW ISOLATION STANDARDS'
        },
        {
            agent: 'security/cyber-security.md',
            workflows: ['security/cyber-security.md', 'security/security-architect.md'],
            title: 'CYBER SECURITY & THREAT PROTECTION PROTOCOLS'
        },
        {
            agent: 'engineering/qa-specialist.md',
            workflows: ['testing/testing-standards.md'],
            title: 'QA & TESTING STANDARDS'
        },
        {
            agent: 'engineering/web3-specialist.md',
            workflows: ['backend/web3-specialist.md'],
            title: 'WEB3 & BLOCKCHAIN INTEGRATION STANDARDS'
        }
    ];

    for (const map of mappings) {
        const agentFile = path.join(promptsPath, map.agent);
        if (!(await fs.pathExists(agentFile))) {
            console.warn(`   ⚠️ Agent file not found: ${map.agent}`);
            continue;
        }

        let agentContent = await fs.readFile(agentFile, 'utf8');
        
        // Remove old Knowledge Access section if exists to prevent duplication
        agentContent = agentContent.split('## 7. Knowledge Access')[0].trim();

        let injection = `\n\n---\n\n# 🧠 INSTITUTIONAL SKILLS: ${map.title}\n\n`;
        injection += `Dokumen ini berisi aturan main mendalam dan perilaku teknis wajib bagi Agent ini.\n\n`;

        for (const wf of map.workflows) {
            const wfFile = path.join(workflowsPath, wf);
            if (await fs.pathExists(wfFile)) {
                const wfContent = await fs.readFile(wfFile, 'utf8');
                injection += `\n## 📋 Workflow: ${path.basename(wf)}\n\n`;
                injection += wfContent.trim() + "\n\n";
            }
        }

        agentContent += injection;
        agentContent += `\n\n---\n*Status: Deep Knowledge Injected | Protocol: Zero Flaws Compliance*\n`;

        await fs.writeFile(agentFile, agentContent);
        console.log(`   ✅ Rewritten: ${map.agent} (Injected ${map.workflows.length} workflows)`);
    }

    console.log('\n✨ All Agent Prompts are now LONG, DETAILED, and SKILL-AWARE.');
}

deepRewrite().catch(err => console.error(`❌ Rewrite Error: ${err.message}`));
