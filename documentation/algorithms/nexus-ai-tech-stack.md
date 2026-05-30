# NEXUS AI - Tech Stack Reference Guide
## Multi-Agent AI Framework for Web Development

**Status:** Research & Architecture Reference  
**Target:** Portfolio Showcase + API Endpoint for Landing Page Generation  
**Stack:** Ollama + CrewAI/LangChain + FastAPI + Next.js/React  
**Hardware:** 8GB RAM (constraint-aware architecture)

---

## 📋 Core Architecture Pattern

```
┌─────────────────────────────────────────────┐
│       NEXUS AI Multi-Agent Framework        │
├─────────────────────────────────────────────┤
│                                             │
│  1. Requirements Agent  → Analyze brief    │
│  2. Design Agent       → Create mockup     │
│  3. Code Generator     → Produce HTML/CSS  │
│  4. QA Agent          → Validate output    │
│                                             │
├─────────────────────────────────────────────┤
│          Orchestration Layer (CrewAI)       │
├─────────────────────────────────────────────┤
│     FastAPI Endpoint (/api/generate-page)   │
├─────────────────────────────────────────────┤
│     Portfolio Showcase (Next.js + Demo)     │
└─────────────────────────────────────────────┘
```

---

## 🎯 Critical Skills to Study

### **Tier 1: Multi-Agent Orchestration**
Primary framework choice between CrewAI (recommended) and LangChain

#### CrewAI (Recommended)
- **Why:** Standalone, fast (5.76x faster vs LangGraph), lean, perfect for Ollama local inference
- **Repo:** https://github.com/crewAIInc/crewAI
- **Key Features:**
  - Role-based agent architecture (perfect for web builder roles)
  - Task-based workflows with clear dependencies
  - Crew composition (hierarchical + sequential processes)
  - Memory management (short-term + long-term + shared)
  - Tool integration (both CrewAI toolkit + LangChain tools)
  - Async task execution for parallel processing
  
- **Examples to Study:**
  - https://github.com/crewAIInc/crewAI-examples → `landing_page_generator/` (MOST RELEVANT)
  - https://github.com/akj2018/Multi-AI-Agent-Systems-with-crewAI → Hierarchical process patterns
  - https://github.com/aws-samples/sample-multi-agent-builder-bedrock-crewai → Specialized agent roles

#### LangChain (Alternative)
- **Repo:** https://github.com/langroid/langroid
- **Key Features:**
  - More mature, production-hardened
  - Better for complex reasoning chains
  - Supports local Ollama via `chat_model="ollama/mistral"`
  - Vector store integrations (Qdrant, Chroma, etc.)
  
- **Good For:** RAG pipelines, knowledge-grounded responses

---

### **Tier 2: Local LLM Infrastructure (Ollama)**

#### Ollama Core
- **Repo:** https://github.com/ollama/ollama
- **Purpose:** Local, privacy-first model serving
- **Recommended Models for 8GB RAM:**
  - `mistral:7b` (balanced, fast)
  - `neural-chat:7b` (instruction-tuned, good for coding)
  - `codellama:7b` (code generation specialist)
  - `llama2:7b` (reliable baseline)

#### Ollama + Multi-Agent Patterns
- https://github.com/curlyphries/Crew.AI-Ollama-Multi-Agent-System
  - **Pattern:** CrewAI + Ollama integration
  - **Key Learning:** Handling privacy-first local inference
  - **Stability:** Addresses CPU overload with resource limits
  
- https://github.com/AIAnytime/AI-Agents-from-Scratch-using-Ollama
  - **Pattern:** Streamlit UI + Multi-agent workflow
  - **Key Learning:** Agent coordination without cloud APIs
  
- https://github.com/shivamr021/ollama-langchain-agents
  - **Pattern:** LangChain + Ollama combinations
  - **Includes:** Voice assistants, web scrapers, document readers

---

### **Tier 3: Web Generation (Code Output)**

#### AI Landing Page Generators
These repos show how to turn requirements → HTML/CSS/React output

1. **Pinecone Landing Page Generator** (MOST RELEVANT)
   - https://github.com/sachink1729/LLM-Agent-Landing-Page-Generator-CrewAI-Qdrant-Langchain
   - **Tech:** CrewAI + Groq + Langchain + Qdrant
   - **Study:** Multi-agent coordination for page generation
   - **Adapt:** Replace Groq with Ollama for local inference

2. **AI Website Builder (React Focus)**
   - https://github.com/Ratna-Babu/Ai-Website-Builder
   - **Tech:** Next.js 14 + Tailwind CSS + Gemini AI + Convex
   - **Study:** Real-time collaboration patterns, export mechanisms
   - **Adapt:** Replace Gemini with Ollama endpoint

3. **Open-Source Landing Page Generator**
   - https://github.com/zinedkaloc/aipage.dev
   - **Tech:** FastAPI + AI (OpenAI, adaptable)
   - **Study:** Simple prompt-to-page generation flow
   - **Current State:** Early, good foundation

4. **AI Builder (Simple Approach)**
   - https://github.com/thewebalchemist/ai-builder
   - **Tech:** GPT-3 (adapt to Ollama) → HTML/CSS/JS
   - **Study:** Direct prompt → code generation pattern

---

### **Tier 4: FastAPI Deployment & API Patterns**

#### FastAPI + LLM Services
- **Repo:** https://github.com/wassim249/fastapi-langgraph-agent-production-ready-template
  - **Pattern:** Production-grade FastAPI template for agents
  - **Features:** 
    - LangGraph stateful agents with checkpointing
    - Long-term memory with pgvector
    - JWT auth + rate limiting
    - Structured logging + Prometheus metrics
    - Graceful LLM fallback strategies
  - **Adapt:** Replace LangGraph with CrewAI, remove Anthropic-specific parts

#### FastAPI + Async/Streaming
- Simple LLM API pattern: https://medium.com/@bhagyarana80/i-built-an-llm-powered-api-in-30-minutes-using-fastapi-and-langchain-dc2896f1e7e0
- Streaming responses: https://github.com/evalstate/fast-agent → `/agent/sse` streaming pattern
- ML inference with Celery: https://github.com/FerrariDG/async-ml-inference (for heavy async workloads)

#### Async Inference with vLLM
- https://medium.com/@wpan36/deploy-your-own-lightweight-llm-inference-api-with-vllm-fastapi-docker-on-your-laptop-220a74ead5b7
- **Key Learning:** Memory optimization for 8GB constraint
- **Config Pattern:** `swap_space`, `gpu_memory_utilization` tuning

---

### **Tier 5: Stability & Resilience Patterns**

#### Circuit Breaker Pattern (CRITICAL for agent deadlock prevention)
- **Repo:** https://github.com/fabfuel/circuitbreaker
  - Decorators for failure recovery
  - Configurable thresholds, recovery timeouts
  - Perfect for protecting Ollama inference calls

- **Async Alternative:** https://github.com/arlyon/aiobreaker
  - Native asyncio support
  - Key feature for multi-agent coordination safety

#### Implementation for NEXUS:
```python
from aiobreaker import CircuitBreaker

# Protect Ollama inference calls
ollama_breaker = CircuitBreaker(
    fail_max=3,                      # Fail after 3 consecutive errors
    reset_timeout=timedelta(seconds=30),  # Wait 30s before retry
    expected_exception=ConnectionError     # Only count connection errors
)

@ollama_breaker
async def call_ollama_inference(prompt: str):
    # Your Ollama call here
    pass
```

---

## 🔧 Agent Design for Web Builder

### **Recommended Agent Roles**

```python
# 1. Requirements Analyzer Agent
- Input: User brief (text)
- Tools: Content parsing, keyword extraction
- Output: Structured requirements JSON

# 2. Design Strategist Agent
- Input: Requirements JSON
- Tools: Design pattern library, color theory
- Output: Design mockup description + CSS color scheme

# 3. Frontend Code Generator Agent
- Input: Design spec + requirements
- Tools: Template library (React/HTML), code formatter
- Output: Production-ready React/HTML component

# 4. QA & Validation Agent
- Input: Generated code
- Tools: Syntax checker, accessibility validator
- Output: Issues list + refinement suggestions

# 5. Document & Export Agent
- Input: Validated code
- Tools: Code formatter, zip creator
- Output: Downloadable project files
```

### **Crew Setup Pattern (from CrewAI)**
```python
from crewai import Agent, Task, Crew, Process

crew = Crew(
    agents=[
        requirements_agent,
        design_agent,
        code_generator_agent,
        qa_agent,
        export_agent
    ],
    tasks=[
        requirements_task,
        design_task,
        code_task,
        qa_task,
        export_task
    ],
    process=Process.sequential,  # or hierarchical for manager oversight
    manager_llm=ollama_llm  # Only needed for hierarchical
)

result = crew.kickoff(inputs={
    "user_brief": "Create a modern SaaS landing page for a fitness app"
})
```

---

## 📡 API Design for Portfolio Integration

### **Endpoint: POST /api/nexus/generate-page**

```python
# Request Model
class GeneratePageRequest(BaseModel):
    brief: str  # User's requirements
    style_preference: Optional[str] = "modern"  # modern, minimal, corporate
    target_audience: Optional[str] = "startups"
    sections: List[str] = ["hero", "features", "cta"]  # Page sections

# Response Model
class GeneratePageResponse(BaseModel):
    status: str  # "processing" | "completed" | "failed"
    job_id: str  # For async polling
    generated_code: str  # HTML or React JSX
    design_explanation: str  # How design meets requirements
    error: Optional[str] = None

# FastAPI Implementation
@app.post("/api/nexus/generate-page")
async def generate_page(request: GeneratePageRequest):
    # 1. Validate input
    # 2. Trigger CrewAI workflow with circuit breaker
    # 3. Return streaming response or job_id for long-running
    # 4. Cache result for demo purposes
```

---

## 🚀 Deployment Architecture

### **Local Development (Your 8GB Machine)**
```
Ollama (localhost:11434)
    ↓
FastAPI Backend (localhost:8000)
    ↓
CrewAI Orchestration
    ├── Requirements Agent
    ├── Design Agent
    ├── Code Generator Agent
    └── QA Agent
    ↓
Cache (SQLite/Redis if available)
```

### **Portfolio Integration**
```
Frontend (Next.js at faisalyusra.my.id)
    ↓ (API call to)
Your FastAPI Instance (hosted or tunneled)
    ↓
NEXUS AI Agents
    ↓
Generated Landing Page (preview in iframe)
```

**Hosting Options:**
- **Local Machine:** ngrok tunnel for live demo
- **Cloud VM:** Render.com, Railway.app (cheap Ollama instances)
- **Docker:** Pre-built image with Ollama + FastAPI bundle

---

## 📊 Comparison: CrewAI vs LangChain vs AutoGen

| Feature | CrewAI | LangChain | AutoGen (Deprecated) |
|---------|--------|-----------|----------------------|
| **Local Ollama Support** | ✅ Native | ✅ Via integration | ✅ Yes |
| **Multi-Agent Coordination** | ✅ Excellent (Crews) | ⚠️ Complex (LangGraph) | ✅ Built-in |
| **Performance (local)** | ✅ 5.76x faster | ⚠️ Slower | ⚠️ Legacy |
| **Learning Curve** | ✅ Gentle | ⚠️ Steep | ❌ Deprecated |
| **Memory Management** | ✅ Built-in | ⚠️ Manual | ⚠️ Limited |
| **Task Dependencies** | ✅ Clear | ⚠️ Implicit | ⚠️ Complex |
| **Recommended for NEXUS** | ✅✅✅ | ⚠️ (if RAG needed) | ❌ No |

---

## 🛡️ Addressing Your Constraints

### **Problem: Agent Deadlock**
- **Solution:** Circuit breaker pattern (Tier 5 repos)
- **Implementation:** Wrap Ollama calls with `@aiobreaker` decorator
- **Config:** `fail_max=3`, `reset_timeout=30s`

### **Problem: CPU Overload from Local Inference**
- **Solution:** Model size + resource limits
- **Implementation:**
  - Use 7B models (not 13B+)
  - Ollama: `num_threads=4` (don't max out your CPU)
  - FastAPI: `max_concurrent_requests=2-3` (serialize Ollama calls)
  - Batch size: 1 (avoid parallel agent requests overwhelming inference)

### **Problem: Missing Circuit Breakers**
- **Solution:** `aiobreaker` library (Tier 5)
- **Prevents:** Cascading failures when Ollama hangs

### **Problem: Vector Semantic Search Upgrades**
- **Reference:** CrewAI memory management docs
- **Tools:** Qdrant (lightweight, self-hosted) or Chroma (embedded)
- **Pattern:** Store agent reflections + tool outputs in vector DB

---

## 🎓 Study Path (Sequential)

### **Week 1: Foundation**
1. Read CrewAI docs: https://docs.crewai.com
2. Run CrewAI landing page example locally
3. Study: https://github.com/crewAIInc/crewAI-examples/tree/main/landing_page_generator

### **Week 2: Local Inference**
1. Set up Ollama: https://github.com/ollama/ollama
2. Run: `ollama pull mistral:7b`
3. Study: https://github.com/curlyphries/Crew.AI-Ollama-Multi-Agent-System
4. Replace OpenAI calls with `chat_model="ollama/mistral"`

### **Week 3: API Deployment**
1. Study FastAPI template: https://github.com/wassim249/fastapi-langgraph-agent-production-ready-template
2. Adapt to CrewAI (replace LangGraph)
3. Build: `/api/nexus/generate-page` endpoint

### **Week 4: Stability & Showcase**
1. Add circuit breaker: https://github.com/arlyon/aiobreaker
2. Implement rate limiting + error handling
3. Create portfolio demo page
4. Write production-ready documentation

---

## 📚 Quick Reference: Repo Purposes

| Repo | Purpose | Language | Relevance |
|------|---------|----------|-----------|
| crewAI | Core orchestration | Python | ⭐⭐⭐ ESSENTIAL |
| crewAI-examples | Patterns & examples | Python | ⭐⭐⭐ ESSENTIAL |
| ollama | Local model server | Go/Python | ⭐⭐⭐ CRITICAL |
| Crew.AI-Ollama-Multi-Agent | CrewAI + local inference | Python | ⭐⭐⭐ CRITICAL |
| ai-website-builder | Web generation UI | React/TypeScript | ⭐⭐ Reference |
| fastapi-langgraph-agent-template | Production API | Python | ⭐⭐ Adapt |
| aiobreaker | Async circuit breaker | Python | ⭐⭐ Stability |
| langroid | LangChain alternative | Python | ⭐ If needed |

---

## 🔗 Useful Links & Resources

- **CrewAI Docs:** https://docs.crewai.com
- **Ollama Models:** https://ollama.ai/library
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **Circuit Breaker Pattern:** Michael Nygard's "Release It!" (book reference)
- **Compare Frameworks:** https://www.scalekit.com/blog/langchain-vs-crewai-multi-agent-workflows

---

## ✅ Checklist for Portfolio Showcase

- [ ] CrewAI crew defined with 4-5 agents
- [ ] Ollama running locally with mistral:7b
- [ ] FastAPI endpoint `/api/nexus/generate-page` working
- [ ] Circuit breaker protecting inference calls
- [ ] Example outputs cached for instant demo
- [ ] Portfolio page at `/projects/nexus-ai` or `/ai`
- [ ] GitHub README with comprehensive documentation
- [ ] Live demo (ngrok tunnel or deployed)
- [ ] Architecture diagram (Mermaid or Figma)

---

**Last Updated:** May 2026  
**Status:** Ready for implementation  
**Next Step:** Start with Week 1 study path
