# NEXUS AI - Missing Agents Audit
## Identifying New Agents Needed to Close Skill Gaps

**Analysis Date:** May 30, 2026  
**Purpose:** Map skill gaps to new agent roles  
**Output:** New agents required for complete NEXUS AI system

---

## 🎯 Current Agent Roster (You Have)

Based on earlier discussion, NEXUS AI currently has **5 core agents**:

1. ✅ **Requirements Analyzer Agent**
2. ✅ **Design Strategist Agent**
3. ✅ **Frontend Code Generator Agent**
4. ✅ **QA & Validation Agent**
5. ✅ **Export & Delivery Agent**

---

## ❌ Missing Agents (Blocking Gaps)

### **Critical Layer: LLM Infrastructure Agents**
These agents manage the *technical infrastructure* of multi-agent system itself.

#### **Agent #6: Prompt Engineer Agent** 🔴 CRITICAL
**Purpose:** Craft and optimize prompts for other agents  
**Why Needed:** Gap: `prompt-engineering`

**Responsibilities:**
- Write task-specific system prompts for each agent
- Optimize prompts for token efficiency (8GB RAM constraint)
- Create few-shot examples for complex tasks
- Validate prompt effectiveness through testing
- Maintain prompt template library

**Tools This Agent Would Have:**
```python
- prompt_optimization_tool      # Reduce tokens, improve clarity
- few_shot_generator            # Create examples
- token_counter                 # Count tokens before execution
- prompt_validator              # Test prompts work as intended
- template_library              # Store reusable prompt patterns
```

**Why It's Critical:**
- **All other agents depend on good prompts**
- Without this, code generator produces trash output
- Token optimization essential for 8GB RAM machine (can't waste tokens)
- Current gap: agents getting generic prompts → poor quality

**Current State in NEXUS:**
- ❌ Prompts probably hardcoded in each agent
- ❌ No optimization for local Ollama inference
- ❌ Token budget not tracked

**Example Workflow:**
```
Requirements Agent:
  Prompt Engineer creates: "Extract requirements in JSON format..."
  ↓
Code Generator Agent:
  Prompt Engineer creates: "Generate React component using only Tailwind..."
  ↓
QA Agent:
  Prompt Engineer creates: "Validate JSON structure, check accessibility..."
```

---

#### **Agent #7: Local LLM Orchestrator Agent** 🔴 CRITICAL
**Purpose:** Manage Ollama inference, model selection, resource allocation  
**Why Needed:** Gap: `ollama-integration`, `local-llm-inference`, `cpu-optimization`

**Responsibilities:**
- Monitor Ollama server health
- Select best model for task (mistral:7b for speed vs neural-chat:7b for quality)
- Manage inference queue (prevent deadlock)
- Track CPU/memory usage
- Implement circuit breaker for inference calls
- Handle model switching on errors
- Cache responses to reduce inference load

**Tools This Agent Would Have:**
```python
- ollama_health_monitor         # Is Ollama running? Response time?
- model_selector               # Pick best model for this task
- inference_queue_manager      # Queue requests, prevent deadlock
- resource_monitor             # CPU%, RAM%, inference queue depth
- circuit_breaker              # Fail gracefully when Ollama overloaded
- response_cache               # Cache LLM outputs (same prompt = no re-inference)
- model_fallback               # If mistral fails, try neural-chat
```

**Why It's Critical:**
- **Prevents deadlock** (your problem #1)
- **Prevents CPU overload** (your problem #2)
- **Circuit breaker implementation** (your problem #3)
- Without this, whole system crashes when Ollama hangs

**Current State in NEXUS:**
- ❌ Probably calling Ollama directly without health checks
- ❌ No fallback if model doesn't respond
- ❌ No circuit breaker
- ❌ No queue management

**Example Workflow:**
```
Requirements Agent needs inference:
  LLM Orchestrator checks:
    - Is Ollama running? (circuit breaker state)
    - How many requests in queue?
    - How much CPU available?
  ↓
  If all good → Execute with mistral:7b
  If CPU high → Queue request, try again in 5s
  If Ollama dead → Use cached response or error gracefully
```

---

#### **Agent #8: Output Validator & Formatter Agent** 🔴 CRITICAL
**Purpose:** Validate and reformat LLM outputs to match expected schemas  
**Why Needed:** Gap: `llm-output-validation`

**Responsibilities:**
- Parse LLM responses (handle hallucinations, format errors)
- Validate JSON structure
- Enforce output constraints (e.g., "only valid HTML")
- Reformat malformed output
- Generate structured responses
- Detect & handle LLM failures gracefully

**Tools This Agent Would Have:**
```python
- json_validator               # Is this valid JSON?
- json_fixer                   # Try to repair broken JSON
- schema_enforcer              # Does it match expected schema?
- html_validator               # Is generated HTML valid?
- html_beautifier              # Format code nicely
- constraint_enforcer          # No external dependencies? Check.
- error_detector               # Did LLM make mistakes?
- auto_corrector               # Try to fix common LLM errors
```

**Why It's Critical:**
- **LLMs hallucinate** → need validation
- **Code generation requires strict format** → must validate
- Without this, broken code reaches users
- Can't trust LLM output directly

**Current State in NEXUS:**
- ❌ Probably trusting LLM output directly
- ❌ No JSON validation
- ❌ No HTML validation
- ❌ Broken code likely reaching QA agent

**Example Workflow:**
```
Code Generator outputs:
  ```jsx
  import React from 'react'
  // Missing closing tag, broken JSON, extra imports
  
Output Validator:
  1. Parse response
  2. Detect: Missing closing tag
  3. Detect: Unused imports
  4. Auto-correct issues
  5. Validate final HTML/JSX
  6. Return clean, validated code
```

---

### **Enhancement Layer: Quality Improvement Agents**

#### **Agent #9: Component Template Library Agent** 🟠 HIGH
**Purpose:** Manage reusable component templates for consistent code generation  
**Why Needed:** Gap: `template-library-management`, `react-component-generation`

**Responsibilities:**
- Maintain library of React/HTML components
- Search templates by type (hero, card, form, etc.)
- Customize templates based on requirements
- Generate new templates from LLM
- Version and organize templates
- Document usage patterns

**Tools This Agent Would Have:**
```python
- template_search              # Find relevant templates
- template_customizer          # Adapt template to requirements
- template_generator           # Create new templates
- template_validator           # Is this template good?
- template_organizer           # Categorize & tag
- template_documentation       # Generate usage guide
```

**Why It Matters:**
- **Consistent output** → reuse patterns, not re-generate
- **Faster generation** → template + modify < generate from scratch
- **Higher quality** → validated templates vs LLM hallucinations
- Reduces inference load (less LLM calls)

**Example:**
```
Design Agent says: "Hero section with gradient background"
  ↓
Component Template Agent:
  1. Search: "hero sections with gradient"
  2. Found: 3 templates
  3. Pick: Modern dark gradient hero
  4. Customize: Use client's brand colors
  5. Return: Ready-to-use React component
```

---

#### **Agent #10: Memory & Context Manager Agent** 🟠 HIGH
**Purpose:** Manage multi-agent context, conversation history, shared state  
**Why Needed:** Gap: `agent-memory-patterns`, `inter-agent-communication`

**Responsibilities:**
- Store & retrieve agent memory (short-term, long-term)
- Manage conversation history between agents
- Track decisions made (for traceability)
- Share context efficiently
- Clean up old memory (prevent bloat on 8GB RAM)
- Enable agent self-reflection (did we solve it right?)

**Tools This Agent Would Have:**
```python
- memory_store                 # Store facts, decisions
- context_retriever            # Pull relevant context
- memory_compressor            # Summarize old conversations
- conversation_tracker         # Who said what, when
- shared_state_manager         # Global variables between agents
- memory_cleanup               # Delete old/irrelevant data
```

**Why It Matters:**
- **Prevents context loss** between agents
- **Enables learning** (remember what worked before)
- **Improves coherence** (all agents see same context)
- **Reduces re-work** (cache decisions)

**Current State in NEXUS:**
- ❌ Each agent probably isolated
- ❌ No shared context
- ❌ Agents don't know what others did

**Example:**
```
User submits: "Create landing page for fitness app"
  ↓
Memory Manager stores:
  {
    "project_id": "fitness_app_001",
    "brand_colors": ["#FF6B35", "#004E89"],
    "target_audience": "fitness enthusiasts",
    "sections_needed": ["hero", "pricing", "testimonials"]
  }
  ↓
Requirements Agent → reads this memory, doesn't ask again
Design Agent → reads colors, stays on-brand
Code Agent → reads sections, knows what to build
```

---

#### **Agent #11: Performance Optimizer Agent** 🟡 MEDIUM
**Purpose:** Optimize generated code for performance, accessibility, SEO  
**Why Needed:** Gap: `code-quality-metrics`, `accessibility-automation`

**Responsibilities:**
- Run accessibility audits (axe, pa11y)
- Check performance metrics (Lighthouse)
- Optimize images, CSS, JavaScript
- Generate SEO metadata
- Suggest improvements to generated code
- Report quality scores

**Tools This Agent Would Have:**
```python
- lighthouse_runner            # Run Lighthouse audit
- axe_accessibility_checker    # A11y validation
- performance_profiler         # Speed/size metrics
- seo_analyzer                 # Meta tags, keywords
- code_optimizer               # Minify, optimize
- suggestion_generator         # What to improve
```

**Why It Matters:**
- **User satisfaction** → fast pages, accessible to all
- **SEO ranking** → better discoverability
- **Portfolio showcase** → demonstrates quality
- Shows NEXUS produces *professional* output

---

#### **Agent #12: API Gateway & Streaming Agent** 🟡 MEDIUM
**Purpose:** Handle HTTP requests, stream responses, manage endpoints  
**Why Needed:** Gap: `api-design`, `streaming-sse`, `async-programming`

**Responsibilities:**
- Manage FastAPI endpoints
- Handle incoming requests
- Stream generation progress to client (real-time updates)
- Manage request/response validation
- Error handling & graceful failures
- Rate limiting & request queuing

**Tools This Agent Would Have:**
```python
- request_validator            # Is request well-formed?
- response_formatter           # Format response properly
- stream_manager               # Stream generation progress
- error_handler                # Convert errors to HTTP responses
- rate_limiter                 # Prevent abuse
- request_queue                # Queue excessive requests
```

**Why It Matters:**
- **User experience** → see progress in real-time (not blank screen)
- **Resource management** → queue requests, don't overload
- **Integration** → clean API for portfolio UI
- **Stability** → proper error responses

---

### **Infrastructure Layer: System Agents**

#### **Agent #13: Orchestration Coordinator Agent** 🟠 HIGH
**Purpose:** Manage agent lifecycle, task sequencing, error recovery  
**Why Needed:** Gap: `crew-ai-orchestration`, `execution-workflow`

**Responsibilities:**
- Define agent roles and responsibilities
- Sequence tasks in correct order
- Handle agent failures gracefully
- Retry failed tasks
- Escalate critical errors
- Monitor overall workflow health

**Tools This Agent Would Have:**
```python
- crew_manager                 # Create/manage Crew
- task_scheduler               # Sequence tasks
- error_recovery               # Retry logic
- agent_monitor                # Health checks
- escalation_handler           # Handle critical failures
- workflow_logger              # Log execution trace
```

**Why It Matters:**
- **Correctness** → ensures tasks run in right order
- **Reliability** → handles failures automatically
- **Debuggability** → logs help troubleshoot
- **Flexibility** → can adjust workflow as needed

---

#### **Agent #14: Caching & State Manager Agent** 🟡 MEDIUM
**Purpose:** Cache responses, avoid redundant inference, manage temporary state  
**Why Needed:** Gap: `caching-strategy`

**Responsibilities:**
- Cache LLM outputs (same prompt = instant response)
- Cache generated components (same design = reuse)
- Manage cache invalidation
- Track cache hits/misses
- Clean up stale cache (prevent RAM bloat)
- Enable session-based caching (per user)

**Tools This Agent Would Have:**
```python
- response_cache               # Store LLM outputs
- component_cache              # Store generated code
- cache_key_generator          # Create hash for cache lookup
- cache_invalidator            # Clear outdated cache
- cache_monitor                # Hit rate, memory usage
- session_manager              # Per-user cache
```

**Why It Matters:**
- **Performance** → 10x faster for repeated requests
- **Resource efficiency** → less Ollama inference
- **User experience** → instant regeneration of similar pages
- **Cost** (if cloud) → fewer API calls

---

#### **Agent #15: Monitoring & Logging Agent** 🟡 LOW (Nice-to-have)
**Purpose:** Track system health, performance, errors  
**Why Needed:** Gap: `error-logging`, `cpu-monitoring`

**Responsibilities:**
- Log all agent actions
- Track system metrics (CPU, RAM, inference time)
- Generate performance reports
- Alert on anomalies
- Maintain audit trail for debugging

**Tools This Agent Would Have:**
```python
- event_logger                 # Log all actions
- metrics_collector            # CPU, RAM, inference time
- performance_analyzer         # Identify bottlenecks
- alert_system                 # Notify on issues
- audit_logger                 # Track who did what
```

---

## 📊 Agent Priority Matrix

### **Phase 1: BLOCKING (Do These First)**
Must-haves for basic functionality:

| Agent | Priority | Effort | Impact | Status |
|-------|----------|--------|--------|--------|
| Prompt Engineer | 🔴 CRITICAL | 2-3 hrs | 100% | ❌ Missing |
| LLM Orchestrator | 🔴 CRITICAL | 4-5 hrs | 100% | ❌ Missing |
| Output Validator | 🔴 CRITICAL | 3-4 hrs | 90% | ❌ Missing |
| Orchestration Coordinator | 🔴 CRITICAL | 3-4 hrs | 80% | ❌ Missing |

**Time to implement:** ~12-16 hours  
**Impact:** **Fixes all 3 of your problems** (deadlock, CPU overload, missing circuit breaker)

---

### **Phase 2: HIGH (Add After Phase 1)**
Quality improvements:

| Agent | Priority | Effort | Impact | Status |
|-------|----------|--------|--------|--------|
| Component Template Library | 🟠 HIGH | 3-4 hrs | 70% | ❌ Missing |
| Memory & Context Manager | 🟠 HIGH | 3-4 hrs | 60% | ❌ Missing |
| API Gateway & Streaming | 🟠 HIGH | 2-3 hrs | 50% | ❌ Missing |

**Time to implement:** ~8-11 hours  
**Impact:** Better output quality, real-time UX, shared context

---

### **Phase 3: ENHANCEMENT (Polish)**
Nice-to-have:

| Agent | Priority | Effort | Impact | Status |
|-------|----------|--------|--------|--------|
| Performance Optimizer | 🟡 MEDIUM | 2-3 hrs | 30% | ❌ Missing |
| Caching & State Manager | 🟡 MEDIUM | 2-3 hrs | 40% | ❌ Missing |
| Monitoring & Logging | 🟡 LOW | 2-3 hrs | 20% | ❌ Missing |

**Time to implement:** ~6-9 hours  
**Impact:** Better observability, faster performance

---

## 🎯 Complete NEXUS AI Agent Roster (Vision)

### **Current (5 agents):**
1. ✅ Requirements Analyzer Agent
2. ✅ Design Strategist Agent
3. ✅ Frontend Code Generator Agent
4. ✅ QA & Validation Agent
5. ✅ Export & Delivery Agent

### **Phase 1 Additions (4 agents = 9 total):**
6. ❌ **Prompt Engineer Agent** ← Creates prompts for all others
7. ❌ **LLM Orchestrator Agent** ← Manages Ollama, prevents deadlock
8. ❌ **Output Validator Agent** ← Validates & fixes LLM output
9. ❌ **Orchestration Coordinator Agent** ← Manages agent workflow

### **Phase 2 Additions (3 agents = 12 total):**
10. ❌ **Component Template Library Agent** ← Reusable components
11. ❌ **Memory & Context Manager Agent** ← Shared context
12. ❌ **API Gateway & Streaming Agent** ← HTTP + real-time UX

### **Phase 3 Additions (3 agents = 15 total):**
13. ❌ **Performance Optimizer Agent** ← A11y, SEO, performance
14. ❌ **Caching & State Manager Agent** ← Speed optimization
15. ❌ **Monitoring & Logging Agent** ← Observability

---

## 🔧 Implementation Order (Recommended)

### **Week 1: Build Phase 1 (Critical Foundation)**

**Day 1-2: Prompt Engineer Agent**
- Tool: Prompt optimization system
- Create system prompts for each agent
- Set up few-shot example library
- Test prompt effectiveness

**Day 3-4: LLM Orchestrator Agent**
- Set up Ollama health monitoring
- Implement circuit breaker
- Add model selection logic
- Build inference queue

**Day 5: Output Validator Agent**
- JSON schema validation
- HTML/JSX validation
- Error detection & correction
- Integration test

**Day 6-7: Orchestration Coordinator Agent**
- Define agent roles in CrewAI
- Task sequencing
- Error recovery
- Test full workflow

**Test:** Can NEXUS generate a landing page without crashes?

---

### **Week 2: Build Phase 2 (Quality Layer)**

**Day 1-2: Component Template Library Agent**
- Build template database
- Integration with Code Generator

**Day 3: Memory & Context Manager Agent**
- Shared memory store
- Context retrieval

**Day 4-5: API Gateway & Streaming Agent**
- FastAPI endpoint
- Server-sent events streaming
- Request validation

**Test:** Can users see real-time generation progress?

---

### **Week 3: Build Phase 3 (Polish) + Testing**

**Test full system with all agents**

---

## 💡 Quick Reference: Agent Dependencies

```
┌─────────────────────────────────────────┐
│  User Request (Portfolio API)           │
└────────────────────┬────────────────────┘
                     ↓
        ┌────────────────────────────┐
        │ API Gateway & Streaming A. │ ← Phase 2
        └────────────┬───────────────┘
                     ↓
     ┌───────────────────────────────────┐
     │ Orchestration Coordinator A.      │ ← Phase 1 (critical)
     └─────────────────────────────────┬─┘
                   ↓
        ┌──────────────────────┐
        │ Prompt Engineer A.   │ ← Phase 1 (critical)
        └──────────────────────┘
                   ↓
     ┌─────────────────────────────────────┐
     │ Requirements Analyzer Agent (you have)
     ├─────────────────────────────────────┤
     │ Design Strategist Agent (you have)
     ├─────────────────────────────────────┤
     │ Code Generator Agent (you have)
     ├─────────────────────────────────────┤
     │ QA & Validation Agent (you have)
     └────────────┬──────────────────────┬┘
                  ↓                      ↓
       ┌─────────────────────┐  ┌──────────────────────┐
       │ LLM Orchestrator A. │  │ Output Validator A.  │
       │ (Phase 1, critical) │  │ (Phase 1, critical)  │
       └──────────┬──────────┘  └──────────┬───────────┘
                  ↓                        ↓
       ┌─────────────────────────────────────────┐
       │ Memory & Context Manager A.   (Phase 2) │
       ├─────────────────────────────────────────┤
       │ Component Template Library A. (Phase 2) │
       ├─────────────────────────────────────────┤
       │ Caching & State Manager A.    (Phase 3) │
       └─────────────────────────────────────────┘
                       ↓
           ┌───────────────────────────┐
           │ Performance Optimizer A.  │ (Phase 3)
           ├───────────────────────────┤
           │ Monitoring & Logging A.   │ (Phase 3)
           └───────────────────────────┘
                       ↓
       ┌─────────────────────────────────┐
       │ Export & Delivery Agent (you have)
       └─────────────────────────────────┘
                       ↓
           ┌───────────────────────────┐
           │ Generated Landing Page    │
           │ + Audit Trail + Logs      │
           └───────────────────────────┘
```

---

## ✅ Summary: Missing Agents

### **Total New Agents Needed:** 10
- Phase 1 (Critical): 4 agents
- Phase 2 (High): 3 agents  
- Phase 3 (Enhancement): 3 agents

### **Closes All 3 Major Gaps:**
- ✅ Agent deadlock → **LLM Orchestrator Agent** (circuit breaker)
- ✅ CPU overload → **LLM Orchestrator Agent** (resource monitoring)
- ✅ Missing circuit breakers → **LLM Orchestrator Agent** (built-in)

### **Estimated Total Build Time:** 26-35 hours
- Phase 1: 12-16 hours (you can do in 1-2 days solid coding)
- Phase 2: 8-11 hours (add in day 3-4)
- Phase 3: 6-9 hours (polish, add later)

---

## 🚀 Next Step: Decision

**Do you want to:**
1. **Start Phase 1 immediately?** (I'll give you detailed specs for each agent)
2. **Formalize these as skills first?** (Add to Nexus Skill Registry)
3. **See code templates?** (How each agent would look in CrewAI)

Pick one! 🎯
