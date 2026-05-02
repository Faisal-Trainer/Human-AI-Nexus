# Implementation Plan: Publish Nexus to NPM
Date: 2026-04-28
Status: Pending (Backlog)

## Goals:
Successfully publish the `@faisal-trainer/human-ai-nexus` package to the NPM registry for global accessibility via `npx`.

## Prerequisites:
- [ ] NPM Account with access to `@faisal-trainer` scope.
- [ ] Verified `package.json` (Binary mappings for `nexus` and `human-ai-nexus` point to `cli.js`).
- [ ] All framework folders (`agent`, `skill`, `algorithms`, etc.) included in the `files` array.

## Step-by-Step Instructions:

### Phase 1: Local Verification
1. Run `npm link` to test the command locally.
2. Try running `nexus run` in a separate dummy project.

### Phase 2: Publishing
1. Login to NPM:
   ```bash
   npm login
   ```
2. Publish with public access:
   ```bash
   npm publish --access public
   ```

### Phase 3: Post-Publish Testing
1. Test using `npx` from a clean environment:
   ```bash
   npx @faisal-trainer/human-ai-nexus nexus run
   ```

## Notes:
- Increment version using `npm version patch` before each new publish.
- Always check that `cli.js` has `#!/usr/bin/env node` as the first line.
