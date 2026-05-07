# Audit Workflow
1. Orchestrator triggers audit cycle via EventBus (`AUDIT_REQUESTED`).
2. Target source is evaluated.
3. Relevant Scanners are executed via SandboxExecutor.
4. Results are consolidated into an AuditReport.
5. Emits `PLAN_GENERATED` upon completion.
