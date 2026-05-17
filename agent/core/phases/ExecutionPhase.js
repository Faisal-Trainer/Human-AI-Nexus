const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const NexusClock = require('../NexusClock');
const BasePhase = require('./BasePhase');
const NexusError = require('../NexusError');
const CoreUtils = require('./CoreUtils');

class ExecutionPhase extends BasePhase {
    async run(plan) {
        const activePlan = plan || this.engine.currentPlan;
        if (!activePlan) {
            throw new NexusError('EXECUTION', 'Pipeline Violation: Execution requires an approved Plan.');
        }
        
        this.log(`🚀 Phase 3: Executing Plan ${activePlan.id}...`, 'info');
        
        for (const task of activePlan.tasks) {
            this.log(`🛠 Executing: ${task.description}`, 'warning');
            
            if (task.action) {
                try {
                    // TDD Enforcement
                    if (task.action.type === 'FILE_REPLACE' || task.action.type === 'FILE_APPEND') {
                        const validation = await this.engine.tddGuard.validate(task.action.target);
                        if (!validation.allowed) {
                            this.log(`   🛑 TDD Block: ${validation.reason}`, 'error');
                            this.log(`   🏗️ [Phase 4] Autonomous Intelligence: Generating test scaffold...`, 'info');
                            const scaffold = await this.engine.tddScaffolder.generate(task.action.target);
                            if (scaffold.success) {
                                this.log(`   ✅ Scaffold created at ${scaffold.path}. Proceeding with action.`, 'success');
                            } else {
                                this.log(`   ⚠️ Scaffolding skipped: ${scaffold.reason}`, 'warning');
                            }
                        } else {
                            this.log(`   🛡️ TDD Verified: ${validation.reason}`, 'success');
                        }
                    }

                    // Asset Optimization
                    if (task.action.type === 'ASSET_OPTIMIZE') {
                        await this.engine.assetEngine.process(task.action);
                        this.log(`   🖼️ Asset optimized via AssetEngine`, 'success');
                    } else {
                        const success = await this.engine.modifier.apply(task.action);
                        if (success) {
                            this.log(`   ✅ Physical modification applied: ${task.action.type} on ${task.action.target}`, 'success');
                            
                            if (task.action.type === 'RESOLVE_OPTIONS') {
                                await this.updateRecapStatus(`Resolved Multi-Option collision in ${task.action.target}`);
                            }
                        }
                    }
                } catch (e) {
                    this.log(`   ❌ Execution Error: ${e.message}`, 'error');
                    task.status = 'failed';
                    continue;
                }
            }

            // Legacy Support
            if (task.description.startsWith('UPDATE_BACKLOG:')) {
                const backlogPath = path.join(this.engine.knowledgePath, 'ENGINE_DEBT_BACKLOG.md');
                if (await fs.pathExists(backlogPath)) {
                    let content = await fs.readFile(backlogPath, 'utf8');
                    content += `\n- [x] Resolved via ${activePlan.id}: ${task.description.split(':')[1]}`;
                    await fs.writeFile(backlogPath, content);
                    this.log(`   ✅ Physical modification applied to ENGINE_DEBT_BACKLOG.md`, 'success');
                }
            }

            task.status = 'done';
        }

        this.log('✅ Execution phase completed.', 'success');
    }

    async verify(plan) {
        this.log('🔍 Phase 5: Verification Phase...', 'info');
        const activePlan = plan || this.engine.currentPlan;
        const results = [];

        for (const task of activePlan.tasks) {
            if (task.status === 'done' && task.action) {
                const verification = await this.engine.validator.verifyAction(task.action);
                results.push({ id: task.id, ...verification });
                if (!verification.success) {
                    this.log(`   ❌ Verification Failed for Task ${task.id}: ${verification.message}`, 'error');
                    task.status = 'failed_verification';
                } else {
                    this.log(`   ✅ Verification Success for Task ${task.id}: ${verification.message}`, 'success');
                }
            } else {
                results.push({ id: task.id, success: task.status === 'done', message: 'Non-physical task.' });
            }
        }
        
        this.log(`✅ Verification complete: ${results.filter(r => r.success).length}/${results.length} tasks verified.`, 'success');
        return results;
    }

    async cleanCodeAndVerify(projectPath = this.engine.rootPath) {
        this.log(`扫 Phase 5.5: Clean Code & Stability Verification...`, 'info');
        
        this.log(`   📂 Identifying legacy template clutter (UrlShortener remnants)...`, 'warning');
        const blueprintPath = path.join(projectPath, 'NEXUS_BLUEPRINT.json');
        let allowedComponents = [];
        if (await fs.pathExists(blueprintPath)) {
            const blueprint = await fs.readJson(blueprintPath);
            allowedComponents = (blueprint.livewire_components || []).map(c => this.toKebabCase(c));
        }

        // FIX #22 — Legacy patterns dibuat dinamis dari blueprint, bukan hardcoded
        // Hindari false-positive pada project non-UrlShortener
        let legacyPatterns = [];
        if (await fs.pathExists(blueprintPath)) {
            const bp = await fs.readJson(blueprintPath).catch(() => ({}));
            legacyPatterns = bp.legacy_patterns || [];
        }
        
        if (legacyPatterns.length === 0) {
            legacyPatterns = ['UrlShortener', 'UrlMapping', 'ShortenUrl', 'UrlController'];
        }
        
        const files = await CoreUtils.globRecursive(projectPath, '**/*');
        let deletedCount = 0;

        for (const file of files) {
            const fileName = path.basename(file);
            const isLegacyFile = legacyPatterns.some(p => file.includes(p));
            
            // Special check for Livewire views: if it's not in the blueprint, it's unused
            let isUnusedLivewire = false;
            if (file.includes('resources/views/livewire') && file.endsWith('.blade.php')) {
                const componentName = fileName.replace('.blade.php', '');
                if (allowedComponents.length > 0 && !allowedComponents.includes(componentName)) {
                     isUnusedLivewire = true;
                }
            }
            if (file.includes('app/Livewire') && file.endsWith('.php')) {
                const componentName = this.toKebabCase(fileName.replace('.php', ''));
                if (allowedComponents.length > 0 && !allowedComponents.includes(componentName)) {
                     isUnusedLivewire = true;
                }
            }

            if ((isLegacyFile || isUnusedLivewire) && !file.includes('node_modules') && !file.includes('vendor') && !file.includes('.git')) {
                if (await fs.pathExists(file)) {
                    await fs.remove(file);
                    this.log(`      🗑️ Deleted legacy/unused file: ${path.relative(projectPath, file)}`, 'error');
                    deletedCount++;
                }
            }
        }
        
        // Clean up routes/web.php from legacy references
        const webRoutesPath = path.join(projectPath, 'routes', 'web.php');
        if (await fs.pathExists(webRoutesPath)) {
            const webRoutesContent = await fs.readFile(webRoutesPath, 'utf8');
            const newWebRoutes = webRoutesContent.split('\n').filter(line => {
                return !legacyPatterns.some(p => line.includes(p));
            }).join('\n');
            if (webRoutesContent !== newWebRoutes) {
                await fs.writeFile(webRoutesPath, newWebRoutes);
                this.log(`      🗑️ Removed legacy routes from routes/web.php`, 'warning');
            }
        }

        await this.autoWireFrontend(projectPath);
        
        this.log(`   ✅ Cleanup & Wiring complete: ${deletedCount} files removed.`, 'success');

        // Run migrate to ensure newly generated migrations from ImplementationPhase are applied
        try {
            const { execSync } = require('child_process');
            execSync('php artisan migrate --force', { cwd: projectPath, stdio: 'ignore' });
            this.log(`   🗄️ Database migrated successfully.`, 'success');
        } catch (e) {
            this.log(`   ⚠️ Migration failed: ${e.message}`, 'warning');
        }

        this.log(`   🔄 Starting 5-Cycle Stability Loop (Health Check)...`, 'info');
        for (let i = 1; i <= 5; i++) {
            this.log(`      [Iteration ${i}/5] Testing Artisan Serve & NPM Dev...`, 'warning');
            
            const port = await this.getAvailablePort(8001);
            const devPort = await this.getAvailablePort(5173);
            const isWin = process.platform === 'win32';
            const serveProc = spawn('php', ['artisan', 'serve', `--port=${port}`], { cwd: projectPath, shell: isWin });
            const devProc = spawn('npm', ['run', 'dev', '--', '--port', devPort.toString(), '--strictPort', '--host', '127.0.0.1'], { cwd: projectPath, shell: isWin });

            const [serveReady, devReady] = await Promise.all([
                this.waitForService(`http://127.0.0.1:${port}`, 30000),
                this.waitForService(`http://127.0.0.1:${devPort}`, 30000)
            ]);

            if (serveReady && devReady) {
                this.log(`      ✅ Iteration ${i} passed. Services are stable.`, 'success');
            } else {
                this.log(`      ❌ Iteration ${i} FAILED. Service timed out or crashed.`, 'error');
                if (isWin) { spawn('taskkill', ['/pid', serveProc.pid, '/f', '/t']); spawn('taskkill', ['/pid', devProc.pid, '/f', '/t']); } else { serveProc.kill(); devProc.kill(); }
                
                // Trigger Self-Healing loop
                let healed = false;
                for (let attempt = 1; attempt <= 3; attempt++) {
                    healed = await this.selfHeal(projectPath, attempt);
                    if (healed) {
                        this.log(`      🚀 Self-Healing succeeded on attempt ${attempt}. Retrying stability check...`, 'success');
                        i--; // Retry this iteration
                        break;
                    }
                }
                
                if (!healed) {
                    throw new Error(`Stability check failed at iteration ${i} for ${projectPath} after 3 self-healing attempts.`);
                }
            }

            if (isWin) { spawn('taskkill', ['/pid', serveProc.pid, '/f', '/t']); spawn('taskkill', ['/pid', devProc.pid, '/f', '/t']); } else { serveProc.kill(); devProc.kill(); }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        this.log(`   🎉 Stability Loop Passed: App is verified and clean.`, 'success');
    }

    /**
     * Automatically wires Livewire components from blueprint into welcome.blade.php
     */
    async autoWireFrontend(projectPath) {
        this.log(`   🔌 Auto-Wiring Frontend Components...`, 'info');
        const welcomePath = path.join(projectPath, 'resources/views/welcome.blade.php');
        const blueprintPath = path.join(projectPath, 'NEXUS_BLUEPRINT.json');

        if (!(await fs.pathExists(welcomePath)) || !(await fs.pathExists(blueprintPath))) return;

        const blueprint = await fs.readJson(blueprintPath);
        const components = blueprint.livewire_components || [];
        
        if (components.length === 0) return;

        let content = await fs.readFile(welcomePath, 'utf8');
        
        // Replace the old <livewire:url-shortener /> or any previous injection
        const livewireRegex = /<div class="w-full">[\s\S]*?<\/div>/;
        const newInjection = `<div class="w-full space-y-8">
            ${components.map(c => `<livewire:${this.toKebabCase(c)} />`).join('\n            ')}
        </div>`;

        if (content.match(livewireRegex)) {
            content = content.replace(livewireRegex, newInjection);
        } else if (content.includes('<body')) {
             // Fallback: inject into body if div is missing
             content = content.replace('<body', `<body class="p-8"><div class="max-w-7xl mx-auto">${newInjection}</div>`);
        }

        // Update Title
        const titleRegex = /<title>[\s\S]*?<\/title>/;
        const projectName = path.basename(projectPath).replace(/-/g, ' ').toUpperCase();
        content = content.replace(titleRegex, `<title>Nexus | ${projectName}</title>`);

        await fs.writeFile(welcomePath, content);
        this.log(`      ✅ welcome.blade.php updated with ${components.length} components.`, 'success');
    }

    toKebabCase(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }


    async updateRecapStatus(updateMessage) {
        const recapPath = path.join(this.engine.rootPath, 'documentation', 'docs', 'NEXUS_INTERNAL_PIPELINE_RECAP.md');
        if (await fs.pathExists(recapPath)) {
            let content = await fs.readFile(recapPath, 'utf8');
            const timestamp = NexusClock.getLocalTimestamp();
            const logEntry = `\n- [${timestamp}] **Self-Healing**: ${updateMessage}`;
            
            if (content.includes('## 🧐 Analisis & Rekomendasi Penyempurnaan')) {
                content = content.replace('## 🧐 Analisis & Rekomendasi Penyempurnaan', `## 🧠 Self-Healing Logs${logEntry}\n\n## 🧐 Analisis & Rekomendasi Penyempurnaan`);
            } else {
                content += logEntry;
            }
            await fs.writeFile(recapPath, content);
            this.log(`   📝 Self-Healing: RECAP documentation updated.`, 'success');
        }
    }

    async waitForService(url, timeoutMs = 8000) {
        const axios = require('axios');
        const start = Date.now();
        while (Date.now() - start < timeoutMs) {
            try {
                const res = await axios.get(url, { timeout: 500, validateStatus: () => true });
                if (res.status === 200 || res.status === 404) return true;
            } catch (_) {
                await new Promise(r => setTimeout(r, 300));
            }
        }
        return false;
    }

    // FIX #26 — Bounded port search: maxPort cap mencegah stack overflow rekursi tak terbatas
    async getAvailablePort(start = 8001, maxPort = 9000) {
        if (start > maxPort) {
            throw new Error(`No available port found in range 8001-${maxPort}. Free up some ports and retry.`);
        }
        const net = require('net');
        return new Promise((resolve, reject) => {
            const server = net.createServer();
            server.listen(start, () => {
                server.close(() => resolve(start));
            });
            server.on('error', () => {
                // FIX #26 — Iterasi, bukan rekursi tak terbatas
                this.getAvailablePort(start + 1, maxPort).then(resolve).catch(reject);
            });
        });
    }

    async selfHeal(projectPath, attempt) {
        this.log(`      🛠️ Self-Healing Attempt ${attempt}/3...`, 'warning');
        
        const logPath = path.join(projectPath, 'storage', 'logs', 'laravel.log');
        if (!(await fs.pathExists(logPath))) {
             this.log(`         ❌ No laravel.log found to diagnose.`, 'error');
             return false;
        }
        
        const logs = await fs.readFile(logPath, 'utf8');
        // Get the last 3000 characters of the log to find the latest error
        const lastError = logs.slice(-3000);
        
        if (!lastError || lastError.trim() === '') {
             this.log(`         ❌ No clear error found in logs.`, 'error');
             return false;
        }

        const prompt = `The Laravel application crashed with this error during stability check:\n\n${lastError}\n\nAnalyze this error and fix the PHP/Blade code. Provide ONLY a JSON array of file edits in this exact format:\n[\n  {\n    "file": "app/Livewire/Component.php",\n    "search": "old code exactly as it appears",\n    "replace": "new code to fix the error"\n  }\n]\nDo not include any explanation, markdown blocks, or other text outside the JSON array.`;
        
        // Using localAI from global scope if available, otherwise require it
        const localAI = require('../LocalIntelligence');
        const response = await localAI.generate(prompt, 'suggest_refactor');
        if (!response) return false;

        try {
            let jsonString = response.trim();
            if (jsonString.startsWith('\`\`\`json')) {
                jsonString = jsonString.split('\`\`\`json')[1].split('\`\`\`')[0].trim();
            } else if (jsonString.startsWith('\`\`\`')) {
                jsonString = jsonString.split('\`\`\`')[1].split('\`\`\`')[0].trim();
            }
            
            const fixes = JSON.parse(jsonString);
            let applied = 0;
            for (const fix of fixes) {
                const targetPath = path.join(projectPath, fix.file);
                if (await fs.pathExists(targetPath)) {
                    let content = await fs.readFile(targetPath, 'utf8');
                    if (content.includes(fix.search)) {
                        content = content.replace(fix.search, fix.replace);
                        await fs.writeFile(targetPath, content);
                        this.log(`         ✅ Applied fix to ${fix.file}`, 'success');
                        applied++;
                    } else {
                        this.log(`         ⚠️ Could not find exact search string in ${fix.file}`, 'warning');
                    }
                } else {
                    this.log(`         ⚠️ Target file ${fix.file} does not exist.`, 'warning');
                }
            }
            
            return applied > 0;
        } catch (e) {
            this.log(`         ❌ Self-healing failed to parse AI response: ${e.message}`, 'error');
            return false;
        }
    }
}

module.exports = ExecutionPhase;
