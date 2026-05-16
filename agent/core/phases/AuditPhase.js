const fs = require('fs-extra');
const path = require('path');
const { AuditReport } = require('../Contract');
const NexusClock = require('../NexusClock');
const BasePhase = require('./BasePhase');
const CoreUtils = require('./CoreUtils');

class AuditPhase extends BasePhase {
    async run(options = {}) {
        const targetPath = options.targetPath || this.engine.rootPath;
        const mode = options.mode || 'learning';
        const allowSensitive = options.allowSensitive || false;

        this.log(`🔍 Phase 1: Audit Initiation [Mode: ${mode}]...`, 'info');
        const auditID = `AUDIT-${Date.now()}`;
        const consolidatedFindings = [];

        // Core Structure Scan
        const pathMapping = [
            { name: 'agent', path: this.engine.agentPath },
            { name: 'skill', path: this.engine.skillPath },
            { name: 'knowledge', path: this.engine.knowledgePath },
            { name: 'records', path: this.engine.recordsPath },
            { name: 'planning', path: this.engine.planningPath },
            { name: 'summary', path: this.engine.summaryPath }
        ];

        for (const item of pathMapping) {
            if (!(await fs.pathExists(item.path))) {
                consolidatedFindings.push({ severity: 'WARNING', message: `Nexus standard folder [${item.name}/] is missing or path is invalid.`, file: 'root' });
            }
        }

        const files = await fs.readdir(targetPath);
        if (!files.includes('README.md')) consolidatedFindings.push({ severity: 'CRITICAL', message: 'README.md missing', file: 'root' });
        if (allowSensitive && files.includes('.env')) consolidatedFindings.push({ severity: 'SECURITY', message: '.env detected', file: '.env' });
        if (!files.some(f => f.toLowerCase().includes('license'))) consolidatedFindings.push({ severity: 'WARNING', message: 'LICENSE file missing (Standard compliance)', file: 'root' });

        await fs.ensureDir(this.engine.auditPath);

        if (mode === 'learning') {
            const specialists = [
                { id: 'cyber-security', focus: 'Keamanan & Autentikasi' },
                { id: 'ux-engineer', focus: 'User Experience & Estetika' },
                { id: 'seo-performance-specialist', focus: 'Performa & SEO' },
                { id: 'database-architect', focus: 'Arsitektur Data' },
                { id: 'vcs-architect', focus: 'Version Control & Repository Health' },
                { id: 'documentation-architect', focus: 'Dokumentasi & Standar Kode' }
            ];

            this.log('🕵️ Activating Specialist Parallel Audit...', 'warning');

            // FIX #14 — Batasi concurrency ke 2 agar tidak OOM pada 8GB RAM
            // Ganti Promise.all dengan ParallelRunner yang sudah ada
            const ParallelRunner = require('../ParallelRunner');

            const auditResults = await ParallelRunner.run(
                specialists,
                async (spec) => {
                    try {
                        await this.engine.loadAgent(spec.id);

                        const scannerPath = path.join(__dirname, '..', '..', 'tools', 'scanners', `${spec.id}.js`);
                        let specFindings = [];

                        const agentStart = Date.now();
                        if (await fs.pathExists(scannerPath)) {
                            specFindings = await this.engine.orchestrator.executeTask(spec.id, scannerPath, targetPath);
                            this.log(`   🔍 [${spec.id}] Deep Scan: ${specFindings.length} findings found.`, 'success');
                        }
                        const agentDuration = Date.now() - agentStart;
                        this.engine.metrics[spec.id] = { duration_ms: agentDuration, findings: specFindings.length };
                        await this.engine.logger.log('agents', 'INFO', spec.id, auditID, 'AGENT_PROFILED', `Completed in ${agentDuration}ms`, agentDuration, {}, this.engine.currentCorrelationId);

                        if (specFindings.length === 0) {
                            specFindings.push({ severity: 'INFO', message: `Audit completed by ${spec.id} for ${spec.focus}.`, file: 'project' });
                        }

                        const specReport = new AuditReport(`${auditID}-${spec.id.toUpperCase()}`, targetPath, specFindings, { mode, agent: spec.id });
                        await fs.writeJson(path.join(this.engine.auditPath, `report_${spec.id}_${auditID}.json`), specReport.toJSON(), { spaces: 2 });
                        
                        const mdSpec = this.generateMarkdownReport(spec, auditID, specFindings);
                        await fs.writeFile(path.join(this.engine.auditPath, `report_${spec.id}_${auditID}.md`), mdSpec, 'utf8');
                        
                        return specFindings.map(f => ({ ...f, message: `[${spec.id}] ${f.message}` }));
                    } catch (e) {
                        this.log(`⚠️ Agent ${spec.id} skipped: ${e.message}`, 'error');
                        this.engine.agentRegistry.markFailed(spec.id, e.message);
                        return [];
                    }
                },
                2 // FIX #14 — max 2 concurrent untuk hemat RAM (8GB / Vega 8 shared)
            );

            auditResults.forEach((result) => {
                if (result && Array.isArray(result)) {
                    consolidatedFindings.push(...result);
                }
            });
        }

        // Autonomous Machine Audit
        this.log('🤖 Activating Autonomous Machine Audit...', 'warning');
        
        const schemaFindings = await this.engine.schemaGuard.validateModels();
        if (schemaFindings.length > 0) {
            consolidatedFindings.push(...schemaFindings.map(f => ({ ...f, message: `[SchemaGuard] ${f.message}` })));
        }

        const queryFindings = await this.engine.queryOptimizer.scanMigrations();
        if (queryFindings.length > 0) {
            consolidatedFindings.push(...queryFindings.map(f => ({ ...f, message: `[QueryOptimizer] ${f.message}` })));
        }

        const viewFiles = await CoreUtils.globRecursive(this.engine.rootPath, 'resources/views/**/*.blade.php');
        for (const file of viewFiles.slice(0, 5)) {
            const a11yFindings = await this.engine.a11yScanner.scan(path.relative(this.engine.rootPath, file));
            if (a11yFindings.length > 0) {
                consolidatedFindings.push(...a11yFindings.map(f => ({ ...f, message: `[A11yScanner] ${f.message}` })));
            }
        }

        const report = new AuditReport(auditID, targetPath, consolidatedFindings, { mode, allowSensitive });
        this.engine.currentAudit = report;

        const baseName = `audit_SUMMARY_${auditID}`;
        await fs.writeJson(path.join(this.engine.auditPath, `${baseName}.json`), report.toJSON(), { spaces: 2 });
        
        const mdContent = `
# Audit Summary: ${auditID}
**Mode**: ${mode}
**Timestamp**: ${NexusClock.getLocalTimestamp()}

## 📊 Consolidated Findings
${consolidatedFindings.map(f => `- [${f.severity}] ${f.message} (\`${f.file}\`)`).join('\n')}

---
*Generated by Nexus Autonomous Governance Engine*
`;
        await fs.writeFile(path.join(this.engine.auditPath, `${baseName}.md`), mdContent, 'utf8');

        this.log(`✅ Audit Complete: ${auditID}.`, 'success');
        return report;
    }

    generateMarkdownReport(spec, auditID, specFindings) {
        return `
# 🎓 Specialist Audit: ${spec.id.toUpperCase()}
**Focus**: ${spec.focus}
**Agent**: ${spec.id}

---

## 🔍 Findings & Developer Insights
${specFindings.map(f => `
### [${f.severity}] ${f.message}
- **Apa**: ${f.message}
- **Di mana**: \`${f.file}\`
- **Mengapa**: ${f.rationale || 'N/A'}
- **Bagaimana**: ${f.recommendation || 'N/A'}
`).join('\n')}

---
*Generated by Nexus Engine | Mode: Learning*
`;
    }
}

module.exports = AuditPhase;
