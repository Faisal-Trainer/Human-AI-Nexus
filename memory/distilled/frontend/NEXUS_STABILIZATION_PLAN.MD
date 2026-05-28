# Implementation Plan: Nexus Core Stabilization & Hygiene
> **VERSION**: v1 | **Last Updated**: 26/05/2026



This plan addresses the critical bugs, architectural redundancies, and repository hygiene issues identified during the system audit.

## 🛠 Phase 1: Core Engine Refactoring (NexusEngine.js)
**Goal**: Eliminate duplicate methods, fix undefined variables, and clean up constructor logic.

### Tasks:
- [x] **Fix Constructor Redundancy**:
    - Consolidate path assignments for `knowledgePath`, `recordsPath`, `summaryPath`, and `planningPath`.
    - Ensure `resolvePath()` is used consistently.
- [x] **Resolve `this.nexusPath` Bug**:
    - Map `this.nexusPath` to `this.nexusDataPath` or fix the reference to use the correct variable.
- [x] **Deduplicate Methods**:
    - Remove the second definition of `getSemanticTags()` (lines 956-963).
    - Remove the second definition of `globRecursive()` (lines 978-986).
    - Ensure the remaining implementations are robust (handle absolute paths and different OS environments).

## 📂 Phase 2: Repository Hygiene & Git Configuration
**Goal**: Prevent runtime artifacts and temporary scripts from cluttering the repository.

### Tasks:
- [x] **Update `.gitignore`**:
    - Add `scratch/` folder.
    - Add session history archives: `knowledge/*_SESSION_HISTORY_ARCHIVE.md`.
    - Add performance artifacts: `memory/distilled/performance/*.MD`.
    - Add log files: `logs/*.log`.
- [x] **Cleanup Command**: (Optional) Provide a script to purge existing untracked artifacts.

## 🏗 Phase 3: Workflow Consolidation
**Goal**: Establish a single "Source of Truth" for agent workflows to simplify maintenance.

### Tasks:
- [x] **Identify Primary Source**: Set `agent/workflows/` as the master directory.
- [x] **Merge Contents**: Ensure all unique workflows from `workflow/` and `NEXUS_PUBLIC_DISTRIBUTION/agent/workflows/` are migrated to the master.
- [x] **Redundancy Removal**: Propose removing the redundant directories or replacing them with a distribution build script.

## 🧪 Phase 4: Test Coverage Expansion
**Goal**: Increase stability by adding tests for missing core components.

### Tasks:
- [x] **Create Test Scaffolds**:
    - `MemoryGovernor.test.js`
    - `Orchestrator.test.js`
    - `Machinist.test.js`
- [x] **Integrate with CI/CD**: Ensure new tests are included in the `npm test` suite.

---
**Status**: ✅ Finished
**Completion Date**: 2026-05-10
**Lead Agent**: Antigravity


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [ui-ux, tdd, vcs]
