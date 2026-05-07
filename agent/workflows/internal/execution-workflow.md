# Execution Workflow
1. ImplementationPlan is reviewed.
2. Orchestrator dispatches actions via Modifiers and AssetEngine.
3. TDDGuard enforces tests before physical changes.
4. Changes are applied and logged.
5. Verification phase checks if goals were met.
6. Emits `EXECUTION_COMPLETED`.
