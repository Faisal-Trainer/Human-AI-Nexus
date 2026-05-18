// NEXUS Internal Pipeline Test Suite — v1.0
// Tests all 27 fixes from architecture audit

const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const fs = require('fs');

// Helper: read source file from root
const src = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const LocalIntelligence = require(path.join(ROOT, 'agent/core/LocalIntelligence'));
const RedisMemory = require(path.join(ROOT, 'agent/core/RedisMemory'));
const Orchestrator = require(path.join(ROOT, 'agent/core/Orchestrator'));
const SemanticEngine = require(path.join(ROOT, 'agent/core/SemanticEngine'));
const EvolutionPiper = require(path.join(ROOT, 'agent/core/EvolutionPiper'));
const WorktreeManager = require(path.join(ROOT, 'agent/core/WorktreeManager'));
const AgentRegistry = require(path.join(ROOT, 'agent/core/AgentRegistry'));

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    const result = fn();
    if (result && typeof result.then === 'function') {
      return result
        .then(() => { console.log('  \u2705 ' + name); passed++; })
        .catch(e => { console.log('  \u274c ' + name + ': ' + e.message); failed++; });
    }
    console.log('  \u2705 ' + name); passed++;
  } catch(e) {
    console.log('  \u274c ' + name + ': ' + e.message); failed++;
  }
}

async function runTests() {
  console.log('\n\u2501\u2501\u2501 NEXUS INTERNAL PIPELINE TEST \u2501\u2501\u2501\n');

  test('Fix #01: Prompt OOM guard - MAX_TOKENS + prompt truncation exists', () => {
    if (!LocalIntelligence.MAX_TOKENS) throw new Error('No MAX_TOKENS');
    const s = src('agent/core/LocalIntelligence.js');
    if (!s.includes('MAX_PROMPT_CHARS')) throw new Error('No MAX_PROMPT_CHARS guard');
  });

  test('Fix #02: Orchestrator executeTask has timeout + clearTimeout', () => {
    const s = src('agent/core/Orchestrator.js');
    if (!s.includes('timeoutMs')) throw new Error('No timeoutMs param');
    if (!s.includes('clearTimeout(timeout)')) throw new Error('No clearTimeout on resolve/reject');
  });

  test('Fix #03: NativeBridge cross-platform (no .exe hardcode)', () => {
    const s = src('agent/core/NativeBridge.js');
    if (s.includes("binaryName.endsWith('.exe')")) throw new Error('Still has .exe hardcode');
    if (!s.includes('process.platform')) throw new Error('No platform check');
    if (!s.includes('clearTimeout(timer)')) throw new Error('No spawn timeout');
  });

  test('Fix #04: SandboxExecutor path traversal fixed + async readJson', () => {
    const s = src('agent/core/SandboxExecutor.js');
    if (!s.includes('path.resolve(pluginPath)')) throw new Error('No path.resolve');
    if (!s.includes('startsWith')) throw new Error('No startsWith check');
    if (s.includes('fs.readJsonSync(')) throw new Error('Still has blocking readJsonSync');
  });

  test('Fix #05: RedisMemory flush uses NEXUS prefix, not flushAll', () => {
    const s = src('agent/core/RedisMemory.js');
    if (s.includes('client.flushAll()')) throw new Error('Still has flushAll()');
    if (!s.includes('NEXUS_PREFIX')) throw new Error('No NEXUS_PREFIX namespace');
  });

  test('Fix #06: Logger _writeQueue properly chained (no race condition)', () => {
    const s = src('agent/core/Logger.js');
    if (!s.includes('_writeQueue')) throw new Error('No _writeQueue');
    if (!s.includes('this._writeQueue = this._writeQueue.then')) throw new Error('Queue not chained');
  });

  test('Fix #07: NexusEngine has lazy getters for heavy components', () => {
    const s = src('agent/core/NexusEngine.js');
    const lazyProps = ['designer', 'a11yScanner', 'queryOptimizer', 'worktreeManager', 'evolutionPiper', 'native'];
    for (const p of lazyProps) {
      if (!s.includes(`get ${p}()`)) throw new Error(`No lazy getter: ${p}`);
    }
  });

  test('Fix #08: LocalIntelligence has TTL availability cache', () => {
    if (!LocalIntelligence._availabilityCache) throw new Error('No _availabilityCache');
    if (typeof LocalIntelligence._availabilityCache.expiresAt !== 'number') throw new Error('No expiresAt in cache');
  });

  test('Fix #09: LocalIntelligence has circuit breaker (cb.state = CLOSED)', () => {
    if (!LocalIntelligence.cb) throw new Error('No cb object');
    if (!['CLOSED','OPEN','HALF-OPEN'].includes(LocalIntelligence.cb.state)) throw new Error('Invalid cb.state: ' + LocalIntelligence.cb.state);
  });

  test('Fix #10: Orchestrator has _handlers array + destroy() cleanup', () => {
    const o = new Orchestrator(ROOT);
    if (!Array.isArray(o._handlers)) throw new Error('No _handlers array');
    if (typeof o.destroy !== 'function') throw new Error('No destroy() method');
    const before = o._handlers.length;
    o.destroy();
    if (o._handlers.length !== 0) throw new Error('destroy() did not clear _handlers');
  });

  test('Fix #11: AgentRegistry wired to Orchestrator (markBusy/Idle/Failed)', () => {
    const s = src('agent/core/Orchestrator.js');
    if (!s.includes('AgentRegistry.markBusy')) throw new Error('No AgentRegistry.markBusy call');
    if (!s.includes('AgentRegistry.markIdle')) throw new Error('No AgentRegistry.markIdle call');
    if (!s.includes('AgentRegistry.markFailed')) throw new Error('No AgentRegistry.markFailed call');
  });

  test('Fix #12: EvolutionPiper has persistent cycle state', () => {
    const ep = new EvolutionPiper(ROOT);
    if (typeof ep.persistCycleState !== 'function') throw new Error('No persistCycleState');
    if (typeof ep.loadCycleState !== 'function') throw new Error('No loadCycleState');
    if (!ep._statePath) throw new Error('No _statePath defined');
    if (!ep._statePath.includes('.evolution_state.json')) throw new Error('Wrong state file name');
  });

  test('Fix #13: WorktreeManager async _execGit (no execSync)', () => {
    const wm = new WorktreeManager(ROOT);
    if (typeof wm._execGit !== 'function') throw new Error('No _execGit method');
    const s = src('agent/core/WorktreeManager.js');
    if (s.includes('execSync(')) throw new Error('Still has blocking execSync');
    if (!s.includes('clearTimeout(timer)')) throw new Error('No timeout in _execGit');
  });

  test('Fix #14: AuditPhase uses ParallelRunner limit=2 (not unbounded Promise.all)', () => {
    const s = src('agent/core/phases/AuditPhase.js');
    if (!s.includes('ParallelRunner.run')) throw new Error('No ParallelRunner.run call');
    if (s.includes('Promise.all(auditPromises)')) throw new Error('Still uses unbounded Promise.all');
    if (!s.match(/,\s*2\s*\/\/\s*FIX/)) throw new Error('No concurrency limit of 2 specified');
  });

  test('Fix #15: SemanticEngine cosineSimilarity zero-norm guard (returns 0 not NaN)', () => {
    const se = new SemanticEngine(ROOT);
    const zeroResult = se.cosineSimilarity([0,0,0],[0,0,0]);
    if (isNaN(zeroResult)) throw new Error('Returns NaN for zero vectors!');
    if (zeroResult !== 0) throw new Error('Expected 0 for zero vectors, got: ' + zeroResult);
    const ortho = se.cosineSimilarity([1,0,0],[0,1,0]);
    if (isNaN(ortho)) throw new Error('Returns NaN for orthogonal vectors');
    if (Math.abs(ortho) > 0.001) throw new Error('Orthogonal vectors should return 0, got: ' + ortho);
  });

  test('Fix #16: RedisMemory has _ensureConnected() lazy auto-connect', () => {
    if (typeof RedisMemory._ensureConnected !== 'function') throw new Error('No _ensureConnected method');
    const s = src('agent/core/RedisMemory.js');
    if (!s.includes('_ensureConnected')) throw new Error('_ensureConnected not in source');
  });

  test('Fix #17: NexusEngine runCycle has 10-min global timeout', () => {
    const s = src('agent/core/NexusEngine.js');
    if (!s.includes('Promise.race')) throw new Error('No Promise.race in runCycle');
    if (!s.includes('_doRunCycle')) throw new Error('No _doRunCycle delegate method');
    if (!s.includes('CYCLE_TIMEOUT_MS')) throw new Error('No CYCLE_TIMEOUT_MS constant');
  });

  test('Fix #18: EventBus dedup uses task_id (not full payload hash)', () => {
    const s = src('agent/core/EventBus.js');
    if (!s.includes('payload?.task_id')) throw new Error('No task_id-based dedup key');
    if (!s.includes('dedupKey')) throw new Error('No dedupKey variable');
  });

  test('Fix #21: Contract.js uses NexusClock (no raw new Date())', () => {
    const s = src('agent/core/Contract.js');
    if (!s.includes('NexusClock')) throw new Error('No NexusClock import');
    if (s.includes('new Date().toISOString()')) throw new Error('Still uses new Date().toISOString()');
  });

  test('Fix #22: ExecutionPhase legacy patterns dynamic from NEXUS_BLUEPRINT.json', () => {
    const s = src('agent/core/phases/ExecutionPhase.js');
    if (!s.includes('legacy_patterns')) throw new Error('No dynamic legacy_patterns from blueprint');
    if (!s.includes('bp.legacy_patterns')) throw new Error('No blueprint.legacy_patterns read');
  });

  test('Fix #23: main.js no duplicate Orchestrator instance', () => {
    const s = src('agent/main.js');
    if (s.includes('new Orchestrator(')) throw new Error('Still has duplicate Orchestrator instantiation!');
  });

  await test('Fix #24: spawnRealLaravel is implemented and executes correctly', async () => {
    const ep = new EvolutionPiper(ROOT);
    let spawnedCommands = [];
    ep._spawn = async (cmd, args) => {
      spawnedCommands.push(`${cmd} ${args.join(' ')}`);
      return '';
    };
    ep.generateSandboxDocumentation = async () => {};
    ep.checkEvolutionBoundary = async () => {};
    
    const targetPath = await ep.spawnRealLaravel('mock-laravel-test');
    if (!targetPath.includes('mock-laravel-test')) throw new Error('Wrong target path returned: ' + targetPath);
    if (spawnedCommands.length !== 3) throw new Error(`Expected 3 spawned commands, got ${spawnedCommands.length}`);
    if (!spawnedCommands[0].includes('create-project')) throw new Error('Expected first command to be create-project');
  });

  test('Fix #25: Distiller no eager NativeBridge in constructor (lazy _native)', () => {
    const s = src('agent/core/Distiller.js');
    if (s.includes('this.native = new NativeBridge')) throw new Error('Still has eager NativeBridge in constructor');
    if (!s.includes('this._native')) throw new Error('No lazy _native pattern in applySemanticLinking');
  });

  test('Fix #26: ExecutionPhase.getAvailablePort has maxPort upper bound', () => {
    const s = src('agent/core/phases/ExecutionPhase.js');
    if (!s.includes('maxPort')) throw new Error('No maxPort parameter');
    if (!s.includes('start > maxPort')) throw new Error('No upper bound check (start > maxPort)');
  });

  test('Fix #27B: EvolutionPiper generates dynamic APP_KEY (no hardcoded key)', () => {
    const s = src('agent/core/EvolutionPiper.js');
    if (s.includes('a7gkNyQZZ4HamHeiMoQ2gFJygojiFUCyzXDTKQ3YwG4=')) throw new Error('Hardcoded APP_KEY still present!');
    if (!s.includes('randomBytes')) throw new Error('No crypto.randomBytes for dynamic key generation');
  });

  // Wait for any pending async test promises
  await new Promise(r => setTimeout(r, 600));

  console.log(`\n\u2501\u2501\u2501 INTERNAL RESULT: ${passed} passed | ${failed} failed \u2501\u2501\u2501\n`);
  return failed;
}

runTests()
  .then(f => process.exit(f > 0 ? 1 : 0))
  .catch(e => { console.error('FATAL:', e.message); process.exit(1); });
