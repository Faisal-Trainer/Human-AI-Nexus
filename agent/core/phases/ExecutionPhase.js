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
        this.log(`🧹 Phase 5.5: Clean Code & Stability Verification...`, 'info');
        
        this.log(`   📂 Identifying legacy template clutter (UrlShortener remnants)...`, 'warning');
        const legacyPatterns = ['UrlShortener', 'UrlMapping', 'ShortenUrl', 'UrlController'];
        const files = await CoreUtils.globRecursive(projectPath, '**/*');
        let deletedCount = 0;

        for (const file of files) {
            const fileName = path.basename(file);
            const isLegacyFile = legacyPatterns.some(p => fileName.includes(p));
            
            if (isLegacyFile && !file.includes('node_modules') && !file.includes('vendor') && !file.includes('.git')) {
                if (await fs.pathExists(file)) {
                    await fs.remove(file);
                    this.log(`      🗑️ Deleted legacy file: ${path.relative(projectPath, file)}`, 'error');
                    deletedCount++;
                }
            }
        }
        
        this.log(`   ✅ Cleanup complete: ${deletedCount} files removed.`, 'success');

        this.log(`   🔄 Starting 5-Cycle Stability Loop (Health Check)...`, 'info');
        for (let i = 1; i <= 5; i++) {
            this.log(`      [Iteration ${i}/5] Testing Artisan Serve & NPM Dev...`, 'warning');
            
            const port = await this.getAvailablePort(8001);
            const serveProc = spawn('php', ['artisan', 'serve', `--port=${port}`], { cwd: projectPath, shell: false });
            const devProc = spawn('npm', ['run', 'dev'], { cwd: projectPath, shell: false });

            const [serveReady, devReady] = await Promise.all([
                this.waitForService(`http://localhost:${port}`, 8000),
                this.waitForService('http://localhost:5173', 8000)
            ]);

            if (serveReady && devReady) {
                this.log(`      ✅ Iteration ${i} passed. Services are stable.`, 'success');
            } else {
                this.log(`      ❌ Iteration ${i} FAILED. Service timed out or crashed.`, 'error');
                serveProc.kill();
                devProc.kill();
                throw new Error(`Stability check failed at iteration ${i} for ${projectPath}`);
            }

            serveProc.kill();
            devProc.kill();
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        this.log(`   🎉 Stability Loop Passed: App is verified and clean.`, 'success');
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
                await axios.get(url, { timeout: 500 });
                return true;
            } catch (_) {
                await new Promise(r => setTimeout(r, 300));
            }
        }
        return false;
    }

    async getAvailablePort(start = 8001) {
        const net = require('net');
        return new Promise((resolve) => {
            const server = net.createServer();
            server.listen(start, () => {
                server.close(() => resolve(start));
            });
            server.on('error', () => {
                resolve(this.getAvailablePort(start + 1));
            });
        });
    }
}

module.exports = ExecutionPhase;
