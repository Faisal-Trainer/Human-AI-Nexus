const fs = require('fs-extra');
const path = require('path');

async function pushWisdom() {
    console.log('🚀 Starting Wisdom Injection Pipeline: Memory ➔ Agent & Skill...');
    
    const rootPath = process.cwd();
    const memoryPath = path.join(rootPath, 'memory', 'long_term');
    const agentKnowledgePath = path.join(rootPath, 'agent', 'prompts', 'external', 'knowledge_base');
    const skillPath = path.join(rootPath, 'skill');

    if (!(await fs.pathExists(memoryPath))) {
        console.error('❌ Error: Memory folder not found.');
        return;
    }

    // 1. Prepare Targets
    await fs.ensureDir(agentKnowledgePath);
    await fs.ensureDir(skillPath);

    const files = await fs.readdir(memoryPath);
    let count = 0;

    for (const file of files) {
        if (!file.endsWith('.md') && !file.endsWith('.MD')) continue;
        
        const src = path.join(memoryPath, file);
        const destAgent = path.join(agentKnowledgePath, file);
        const destSkill = path.join(skillPath, file);

        await fs.copy(src, destAgent);
        await fs.copy(src, destSkill);
        count++;
    }

    console.log(`✅ Successfully pushed ${count} wisdom artifacts to Agent and Skill folders.`);

    // 2. Update AI Assistant Prompt to be "Wisdom-Aware"
    const assistantPromptPath = path.join(rootPath, 'agent', 'prompts', 'external', 'core', 'ai-assistant.md');
    if (await fs.pathExists(assistantPromptPath)) {
        let content = await fs.readFile(assistantPromptPath, 'utf8');
        if (!content.includes('## 7. Knowledge Access')) {
            const wisdomSection = `
---

## 7. Knowledge Access (Wisdom Rack)

AI Assistant memiliki akses ke basis pengetahuan institusional di folder \`prompts/knowledge_base/\`. 
- **INSTRUKSI**: Sebelum melakukan tugas teknis yang kompleks (Refactor, DB Migration, UI Update), periksa dokumen relevan di folder tersebut untuk memastikan kepatuhan terhadap standar "Zero Flaws".
- **SUMBER**: Seluruh kebijakan di folder tersebut adalah hasil distilasi dari sesi-sesi sebelumnya.
`;
            content += wisdomSection;
            await fs.writeFile(assistantPromptPath, content);
            console.log('✨ AI Assistant prompt updated with Knowledge Access awareness.');
        }
    }

    // 3. Update internal Machinist prompt to also be aware
    const machinistPath = path.join(rootPath, 'agent', 'prompts', 'internal', 'machinist.md');
    if (await fs.pathExists(machinistPath)) {
        let content = await fs.readFile(machinistPath, 'utf8');
        if (!content.includes('Knowledge Access')) {
            content += '\n\n---\n## Knowledge Access\nAnda wajib merujuk pada `memory/long_term/` untuk instruksi spesifik mengenai standardisasi file.';
            await fs.writeFile(machinistPath, content);
            console.log('✨ Machinist prompt updated.');
        }
    }
}

pushWisdom().catch(err => console.error(`❌ Pipeline Error: ${err.message}`));
