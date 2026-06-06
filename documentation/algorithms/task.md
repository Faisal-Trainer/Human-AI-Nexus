# Task: Refactor Prompts Directory

- `[/]` **Step 1**: Modify `NexusEngine.js` to skip `_stubs` and `_shared` folders during `update-skills`.
- `[ ]` **Step 2**: Create `_stubs` folder and move 35 stub files into it.
- `[ ]` **Step 3**: Create `_shared/governance.md` by extracting the `NEXUS GOVERNANCE & HARD BOUNDARIES` block.
- `[ ]` **Step 4**: Strip the hardcoded Governance blocks from the 8 massive agent prompts and replace them with a link to `_shared/governance.md`.
- `[ ]` **Step 5**: Create domain subfolders (`laravel`, `infrastructure`, `security`, `frontend`, etc.) and organize the remaining files.
- `[ ]` **Step 6**: Verify `update-skills` speed and agent prompt integrity.
