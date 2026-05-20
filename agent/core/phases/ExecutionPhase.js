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
        let allowedModels = [];
        if (await fs.pathExists(blueprintPath)) {
            const blueprint = await fs.readJson(blueprintPath);
            allowedComponents = (blueprint.livewire_components || []).map(c => this.toKebabCase(c));
            allowedModels = (blueprint.models || []).map(m => m.toLowerCase());
        }

        // FIX #22 — Legacy patterns dibuat dinamis dari blueprint, bukan hardcoded
        // Hindari false-positive pada project non-UrlShortener
        let legacyPatterns = [];
        if (await fs.pathExists(blueprintPath)) {
            const bp = await fs.readJson(blueprintPath).catch(() => ({}));
            legacyPatterns = bp.legacy_patterns || [];
        }
        
        if (legacyPatterns.length === 0) {
            legacyPatterns = ['UrlShortener', 'UrlMapping', 'ShortenUrl', 'UrlController', 'Url.php', 'create_urls_table'];
        }
        
        const files = await CoreUtils.globRecursive(projectPath, '**/*');
        let deletedCount = 0;

        for (const file of files) {
            const fileName = path.basename(file);
            let isLegacyFile = legacyPatterns.some(p => file.includes(p));
            
            // Protect allowed models, components, and migrations from being treated as legacy template clutter
            if (isLegacyFile) {
                const lowerFileName = fileName.toLowerCase();
                const isAllowedModel = allowedModels.some(m => lowerFileName.startsWith(m));
                const isAllowedComponent = allowedComponents.some(c => lowerFileName.includes(c));
                const isMigrationForAllowedModel = allowedModels.some(m => lowerFileName.includes(`create_${m}s_table`) || lowerFileName.includes(`create_${m}_table`));
                if (isAllowedModel || isAllowedComponent || isMigrationForAllowedModel) {
                    isLegacyFile = false;
                }
            }
            
            // Special check for Livewire views: if it's not in the blueprint, it's unused
            let isUnusedLivewire = false;
            let isUnusedModel = false;
            let isUnusedMigration = false;
            
            if (file.includes('resources/views/livewire') && file.endsWith('.blade.php')) {
                const componentName = fileName.replace('.blade.php', '');
                if (!allowedComponents.includes(componentName)) isUnusedLivewire = true;
            }
            if (file.includes('app/Livewire') && file.endsWith('.php')) {
                const componentName = this.toKebabCase(fileName.replace('.php', ''));
                if (!allowedComponents.includes(componentName)) isUnusedLivewire = true;
            }
            if (file.includes('app/Models') && file.endsWith('.php') && fileName !== 'User.php') {
                const modelName = fileName.replace('.php', '').toLowerCase();
                if (!allowedModels.includes(modelName)) isUnusedModel = true;
            }
            if (file.includes('database/migrations') && file.endsWith('.php') && !file.includes('0001_01_01')) {
                // If migration doesn't match any allowed model name or doesn't have 2026_06_01, it's likely legacy.
                // Simple check for our timestamp generated in ImplementationPhase
                if (!file.includes('2026_06_01')) isUnusedMigration = true;
            }

            if ((isLegacyFile || isUnusedLivewire || isUnusedModel || isUnusedMigration) && !file.includes('node_modules') && !file.includes('vendor') && !file.includes('.git')) {
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

        // Run migrate:fresh to avoid table-already-exists collisions between
        // template migrations and generated migrations targeting the same table names.
        // FIX: execSync declared at function scope so it is accessible in all catch branches.
        const { execSync } = require('child_process');
        try {
            execSync('php artisan migrate:fresh --force', { cwd: projectPath, stdio: 'ignore' });
            this.log(`   🗄️ Database migrated (fresh) successfully.`, 'success');
        } catch (e) {
            // Fallback: try regular migrate in case fresh fails
            try {
                execSync('php artisan migrate --force', { cwd: projectPath, stdio: 'ignore' });
                this.log(`   🗄️ Database migrated (incremental) successfully.`, 'success');
            } catch (e2) {
                this.log(`   ⚠️ Migration failed: ${e2.message}`, 'warning');
            }
        }

        let hasSmokePassed = false;
        this.log(`   🕵️‍♂️ Running Artisan Smoke Test (route:list)...`, 'info');
        try {
            const { execSync } = require('child_process');
            execSync('php artisan route:list', { cwd: projectPath, stdio: 'ignore' });
            this.log(`      ✅ Smoke test passed.`, 'success');
            hasSmokePassed = true;
        } catch (e) {
            this.log(`      ⚠️ Smoke test failed: ${e.message}`, 'error');
        }

        // Fast-track validation: if smoke passed and no recent errors in laravel.log, skip serve loop
        let isLogClean = true;
        const logPath = path.join(projectPath, 'storage', 'logs', 'laravel.log');
        if (await fs.pathExists(logPath)) {
            try {
                const logs = await fs.readFile(logPath, 'utf8');
                const lastPart = logs.slice(-2000).toLowerCase();
                if (lastPart.includes('exception') || lastPart.includes('error') || lastPart.includes('fatal')) {
                    isLogClean = false;
                }
            } catch (_) {}
        }

        if (hasSmokePassed && isLogClean) {
            this.log(`   🎉 Fast-track Stability: Smoke test passed and log is clean. Skipping active service verification.`, 'success');
            return;
        }

        this.log(`   🔄 Starting 2-Cycle Stability Loop (Health Check)...`, 'info');
        let totalAttempts = 0;
        for (let i = 1; i <= 2; i++) {
            totalAttempts++;
            if (totalAttempts > 6) {
                throw new Error(`Stability check failed: exceeded 6 total attempts in stability loop for ${projectPath}.`);
            }
            this.log(`      [Iteration ${i}/2] Testing Artisan Serve & NPM Dev...`, 'warning');
            
            const port = await this.getAvailablePort(8001);
            const devPort = await this.getAvailablePort(5173);
            const isWin = process.platform === 'win32';
            const serveProc = spawn('php', ['artisan', 'serve', `--port=${port}`], { cwd: projectPath, shell: isWin });
            const devProc = spawn('npm', ['run', 'dev', '--', '--port', devPort.toString(), '--strictPort', '--host', '127.0.0.1'], { cwd: projectPath, shell: isWin });

            const [serveReady, devReady] = await Promise.all([
                this.waitForService(`http://127.0.0.1:${port}`, 10000),
                this.waitForService(`http://127.0.0.1:${devPort}`, 10000)
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
        const rawComponents = blueprint.livewire_components || [];
        
        // Filter out components that require mount parameters without defaults (child components)
        const components = [];
        for (const c of rawComponents) {
            const componentPath = path.join(projectPath, 'app', 'Livewire', `${c}.php`);
            if (await fs.pathExists(componentPath)) {
                const phpContent = await fs.readFile(componentPath, 'utf8');
                const mountMatch = phpContent.match(/public\s+function\s+mount\s*\(([^)]*)\)/i);
                if (mountMatch) {
                    const params = mountMatch[1].trim();
                    if (params.length > 0 && !params.includes('=')) {
                        this.log(`      ⚠️ Skipping root wiring for child component ${c} as it requires mount parameters.`, 'warning');
                        continue;
                    }
                }
            }
            components.push(c);
        }

        let content = await fs.readFile(welcomePath, 'utf8');
        
        // Update Title
        const titleRegex = /<title>[\s\S]*?<\/title>/;
        const projectName = path.basename(projectPath).replace(/-/g, ' ').toUpperCase();
        content = content.replace(titleRegex, `<title>Nexus | ${projectName}</title>`);

        // Replace the old <livewire:url-shortener /> or any previous injection or placeholder
        const livewireRegex = /<div class="w-full">[\s\S]*?<\/div>/;
        const placeholderRegex = /<!-- NEXUS_AUTO_WIRE_FRONTEND -->/;
        
        const newInjection = components.length > 0
            ? `<div class="w-full space-y-8">
            ${components.map(c => `<livewire:${this.toKebabCase(c)} />`).join('\n            ')}
        </div>`
            : `<div class="w-full text-center py-20 space-y-6">
                <div class="inline-flex bg-indigo-50 dark:bg-indigo-950/50 p-4 rounded-3xl text-indigo-600 dark:text-indigo-400 font-bold mb-4 shadow-sm">
                    ✨ Nexus Sandbox Ready
                </div>
                <h1 class="text-6xl font-black text-slate-900 dark:text-white leading-tight">Welcome to <span class="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">${projectName}</span></h1>
                <p class="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-lg">Your TALL stack sandbox application has been successfully generated, migrated, and is fully active.</p>
                <div class="flex justify-center gap-4 pt-4">
                    <a href="#" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-indigo-500/20 transition-all">Get Started</a>
                </div>
            </div>`;

        if (content.match(livewireRegex)) {
            content = content.replace(livewireRegex, newInjection);
        } else if (content.match(placeholderRegex)) {
            content = content.replace(placeholderRegex, newInjection);
        } else if (content.includes('<body')) {
             // Fallback: inject into body if div is missing
             content = content.replace('<body', `<body class="p-8"><div class="max-w-7xl mx-auto">${newInjection}</div>`);
        }

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

    // FIX #26 — Iterative port search to prevent stack overflow
    async getAvailablePort(start = 8001, maxPort = 9000) {
        const net = require('net');
        for (let port = start; port <= maxPort; port++) {
            try {
                await new Promise((resolve, reject) => {
                    const server = net.createServer();
                    server.listen(port, () => {
                        server.close(() => resolve());
                    });
                    server.on('error', reject);
                });
                return port;
            } catch (err) {
                // Port is in use or unavailable, try next
                continue;
            }
        }
        throw new Error(`No available port found in range ${start}-${maxPort}. Free up some ports and retry.`);
    }

    async selfHeal(projectPath, attempt) {
        this.log(`      🛠️ Self-Healing Attempt ${attempt}/3...`, 'warning');
        
        const logPath = path.join(projectPath, 'storage', 'logs', 'laravel.log');
        if (!(await fs.pathExists(logPath))) {
             this.log(`         ❌ No laravel.log found to diagnose.`, 'error');
             return false;
        }
        
        const logs = await fs.readFile(logPath, 'utf8');
        const lastError = logs.slice(-3000);
        
        if (!lastError || lastError.trim() === '') {
             this.log(`         ❌ No clear error found in logs.`, 'error');
             return false;
        }

        const projectFiles = await CoreUtils.globRecursive(projectPath, [
            'app/**/*.php',
            'routes/**/*.php',
            'database/**/*.php',
            'config/**/*.php',
            'resources/views/**/*.blade.php'
        ]);
        const fileListStr = projectFiles.map(f => path.relative(projectPath, f)).join('\n- ');
        
        // FIX: Use full-file-replacement strategy instead of search/replace.
        // This avoids "can't find exact search string" failures caused by whitespace/indent mismatches.
        const prompt = `The Laravel application crashed with this error:\n\n${lastError}\n\nExisting PHP/Blade files:\n- ${fileListStr}\n\nIdentify which file(s) need to be fixed and provide the COMPLETE corrected file content.\nRespond with ONLY a valid JSON array. Each element must have exactly these keys:\n[\n  {\n    "file": "app/Models/Habit.php",\n    "content": "<?php\\n\\nnamespace App\\\\Models;\\n... complete file content ..."\n  }\n]\nIMPORTANT:\n- "file" is the relative path from project root\n- "content" is the COMPLETE new file content (not a diff or partial snippet)\n- Escape all backslashes as \\\\\\\\ and all double quotes as \\" inside the JSON string\n- Do NOT use search/replace format\n- Do NOT include markdown code blocks\n- Output ONLY the JSON array, nothing else`;
        
        const localAI = require('../LocalIntelligence');
        const response = await localAI.generate(prompt, 'suggest_refactor');
        if (!response) return false;

        try {
            let jsonString = response.trim();
            
            // Layer 1: Extract from markdown code blocks if present
            const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)```/i;
            const match = jsonString.match(jsonBlockRegex);
            if (match && match[1]) {
                jsonString = match[1].trim();
            }
            
            // Layer 2: Extract JSON array boundaries
            const firstBracket = jsonString.indexOf('[');
            const lastBracket = jsonString.lastIndexOf(']');
            if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
                jsonString = jsonString.slice(firstBracket, lastBracket + 1);
            }
            
            // Layer 3: Robust sanitization for PHP code inside JSON strings
            // Fix unescaped backslashes that are NOT already part of valid JSON escapes
            jsonString = jsonString.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');
            // Remove literal control characters
            jsonString = jsonString.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
            
            let fixes;
            try {
                fixes = JSON.parse(jsonString);
            } catch (parseErr) {
                this.log(`         ❌ Self-healing failed to parse AI response: ${parseErr.message}`, 'error');
                return false;
            }

            if (!Array.isArray(fixes)) {
                this.log(`         ❌ Self-healing response is not an array.`, 'error');
                return false;
            }

            let applied = 0;
            for (const fix of fixes) {
                if (!fix.file) continue;
                const targetPath = path.join(projectPath, fix.file);

                // Strategy A: Full file replacement (preferred new format)
                if (fix.content !== undefined) {
                    await fs.ensureDir(path.dirname(targetPath));
                    await fs.writeFile(targetPath, fix.content, 'utf8');
                    this.log(`         ✅ Full file replacement applied to ${fix.file}`, 'success');
                    applied++;
                    continue;
                }

                // Strategy B: Search/replace fallback (legacy format)
                if (fix.search !== undefined && fix.replace !== undefined) {
                    if (!(await fs.pathExists(targetPath))) {
                        this.log(`         ⚠️ Target file ${fix.file} does not exist.`, 'warning');
                        continue;
                    }
                    let content = await fs.readFile(targetPath, 'utf8');
                    
                    // Exact match first
                    if (content.includes(fix.search)) {
                        content = content.replace(fix.search, fix.replace);
                        await fs.writeFile(targetPath, content, 'utf8');
                        this.log(`         ✅ Applied exact-match fix to ${fix.file}`, 'success');
                        applied++;
                        continue;
                    }

                    // Fuzzy match: normalize whitespace and try again
                    const normalize = s => s.replace(/\r\n/g, '\n').replace(/\t/g, '    ').trim();
                    const normContent = normalize(content);
                    const normSearch = normalize(fix.search);
                    if (normContent.includes(normSearch)) {
                        const lines = content.split('\n');
                        const searchLines = fix.search.trim().split('\n').map(l => l.trim());
                        const replaceLines = fix.replace.trim().split('\n');
                        let found = false;
                        for (let i = 0; i <= lines.length - searchLines.length; i++) {
                            const slice = lines.slice(i, i + searchLines.length).map(l => l.trim());
                            if (slice.join('\n') === searchLines.join('\n')) {
                                lines.splice(i, searchLines.length, ...replaceLines);
                                found = true;
                                break;
                            }
                        }
                        if (found) {
                            await fs.writeFile(targetPath, lines.join('\n'), 'utf8');
                            this.log(`         ✅ Applied fuzzy-match fix to ${fix.file}`, 'success');
                            applied++;
                            continue;
                        }
                    }

                    this.log(`         ⚠️ Could not find search string in ${fix.file} (exact or fuzzy)`, 'warning');
                }
            }
            
            return applied > 0;
        } catch (e) {
            this.log(`         ❌ Self-healing unexpected error: ${e.message}`, 'error');
            return false;
        }
    }
}

module.exports = ExecutionPhase;
