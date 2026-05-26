# Nexus Sandbox Evolution Pipeline Protocol (v2.1)
> **VERSION**: v2 | **Last Updated**: 26/05/2026



This document defines the automated orchestration rules for evolving Nexus sandboxes from basic scaffolds into professional-grade web applications. Following this protocol ensures "Zero Flaws" architectural standards and maximum visual fidelity.

## 1. Evolution Stage: "The hardening"
Every sandbox must undergo a feature-injection phase where basic CRUD is replaced by sophisticated business logic.

- **Models**: Must include semantic properties (e.g., `streak` for habits, `load` for nodes).
- **Migrations**: Use the `2026_05_13_000000_` timestamp prefix for consistency.
- **Livewire Components**: Must handle state logic (e.g., `toggleStatus()`, `adjustStock()`).
- **Premium UI**: 
    - Use `bg-slate-900` for dark mode excellence.
    - Implement `rounded-[40px]` or `3xl` for modern aesthetics.
    - Use HSL-curated gradients (`from-indigo-500 to-purple-600`).
    - Add micro-animations (`hover:scale-105`, `animate-pulse`).

## 2. Build Stage: "The Independent Build"
To ensure portability and stability, each sandbox must be built independently.

- **NPM**: Run `npm install --ignore-scripts` directly within the project directory. 
- **Laravel**: 
    - `php artisan key:generate`
    - `php artisan migrate:fresh --force`
- **Isolation**: Avoid symbolic links or junctions if storage allows (as per user preference v2.1).

## 3. Initialization Stage: "The Real App Feel"
Sandboxes must never be empty. Use `php artisan tinker` to seed "Anchor Records".

- **Contextual Seeding**:
    - **Finance**: Add 2-3 sample transactions.
    - **Users**: Add "Nexus Prime" super-admin.
    - **Monitoring**: Add active server nodes.
- **Verification**: Ensure tables and models are aligned (Model `$table` property must match migration).

## 4. Maintenance & Cleanup
- **Scratch Files**: Delete all temporary `.js` or `.sh` scripts after a successful build batch.
- **Documentation**: Update `documentation/records/[tes.md](../ui-ux/NEXUS_TES.MD)` with the latest build timestamp.
- **Hygiene**: Ensure `.sqlite` databases are fresh and not carrying legacy data from previous versions.

## Summary Checklist for Agents:
1. [ ] Apply Premium Blade + Livewire Logic.
2. [ ] Define explicit Schema & Model relationships.
3. [ ] Execute `npm install` in-folder.
4. [ ] Run `migrate:fresh`.
5. [ ] Seed 2-5 "Real" records via Tinker.
6. [ ] Wipe scratch files.


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, tdd]
