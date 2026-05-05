# 🤖 Human-AI Nexus: Knowledge Architect Edition
> **Version**: v3.5.0 (Phase 5: Knowledge Shelving)

[![Quick Guide](https://img.shields.io/badge/GUIDE-READ%20FIRST-blueviolet?style=for-the-badge)](documentation/nexus_rules/PANDUAN_CEPAT.md)

## 📌 Introduction: Why Human-AI Nexus?

Many developers fall into the trap of chaotic AI workflows: AI writing code without a plan, resulting in hard-to-track bugs, or ignoring security and compliance standards.

**Human-AI Nexus** is built to solve this. It is a structured control center and orchestration framework designed to bridge the collaboration between **Human Developers** and **AI Assistants**. This framework ensures every development stage is strictly documented through a **"Documentation-First"** principle before a single line of code is written.

### 🎯 Target Audience

- **Web Developers**: Maintain code quality and architectural security.
- **Project Managers**: Automatically monitor progress and technical documentation.
- **AI Enthusiasts**: Experiment with complex AI agent orchestration.
- **Trainers/Mentors**: Establish a disciplined software development standard.

---

## 🗺️ Table of Contents

- [🤖 What is Human-AI Nexus?](#-what-is-human-ai-nexus)
- [🏗️ System Architecture](#-system-architecture)
- [📂 Folder Structure (Organized)](#-folder-structure-organized)
- [🛠️ How to Use](#-how-to-use)
- [🌟 Core Principles](#-core-principles)
- [🤝 How to Contribute](#-how-to-contribute)

---

## 🤖 What is Human-AI Nexus?

Human-AI Nexus is more than just a collection of folders; it is an **Autonomous Governance Engine**. It features the **Nexus Engine**, which automatically coordinates various AI Agents and operates **8 Autonomous Machines** to perform audits, planning, and physical task execution.

### ⚙️ The Core Machines (Autonomous Specialists)

The system is powered by 8 specialized modules working independently:
1.  **Validator.js**: Verifies physical proof of task success.
2.  **BugHunter.js**: Enforces the "3-Fix Rule" to prevent hallucination loops.
3.  **Designer.js**: Automates design reasoning (Colors, Fonts, Styles).
4.  **AccessibilityScanner.js**: Automated WCAG/A11y compliance scanning.
5.  **SchemaGuard.js**: Enforces database standards (UUID/Fillable).
6.  **QueryOptimizer.js**: Detects foreign keys without indexes.
7.  **WorktreeManager.js**: Automated workspace isolation using Git Worktree.
8.  **RootCauseAnalyzer.js**: Automated root cause analysis from stack traces.

The system also features **Universal Collision Logic**, allowing the AI to store multiple solution alternatives (**Option A and Option B**) within a single document for smarter, contextual decision-making.

---

## 🏗️ System Architecture

```mermaid
graph TD
    User([User/Human]) -- Approval --> PM[Project Manager Agent]
    User -- Initial Request --> Orc[Nexus Orchestrator]

    subgraph "Core Engine (Executable)"
        Orc -- Trigger --> Audit[Audit Phase]
        Audit -- Results --> Plan[Planning Phase]
        Plan -- Tasks --> Exec[Execution Phase]
        Exec -- Success --> Record[Finalization Phase]
    end

    subgraph "Knowledge & Standards"
        Agent[(Agent Library)]
        Workflow[(Workflow/Skills)]
        Knowledge[(Knowledge Base)]
    end

    Audit -.-> Agent
    Plan -.-> Workflow
    Record -.-> Knowledge

    Record -- Recursive --> Audit
```

---

## 📂 Folder Structure (AI Agent System Structure)

| Folder                 | Description                                                               |
| :--------------------- | :------------------------------------------------------------------------ |
| `📂 agent/core/`       | **Core Logic**: NexusEngine, Orchestrator, and Smart Shelving Engine.     |
| `📂 agent/tools/`      | **Tools & Specialists**: Auditor, TDDGuard, Machinist, and Distiller.     |
| `📂 agent/prompts/`    | **The Brain**: Agent MD Library (Internal & External) with core DNA.      |
| `📂 workflow/`         | **Skill Rack**: Categorized set of operational workflows.                 |
| `📂 memory/long_term/` | **Smart HUB**: Knowledge organized into **Semantic Racks**.               |
| `📂 memory/long_term/security/` | **Rack**: Security, Auth, and Audit Protocols.                    |
| `📂 memory/long_term/performance/` | **Rack**: Optimization, Caching, and Speed.                       |
| `📂 documentation/`    | **The Mirror**: Manual-access knowledge racks.                            |
| `📂 tests/`            | **TDD Lab**: Automated testing based on the "Iron Laws".                  |

---

## 🛠️ How to Use

### 1. Installation

Use the automated command via `npx` (Recommended):

```bash
# Direct from GitHub (Public Distribution):
npx github:Faisal-Trainer/Human-AI-Nexus
```

Alternatively, copy the framework folder into your project root.

> **Tip**: To update an existing installation without deleting data, use the `--force` flag:
> `npx github:Faisal-Trainer/Human-AI-Nexus --force`

### 2. Run the Engine

Execute the following commands in your terminal:

```bash
nexus run           # Standard SDLC (Audit -> Plan -> Execute)
nexus audit         # Perform system-wide health scan
nexus harvest <dir> # Ingest documents from other projects to the HUB
nexus distill       # [Main Pipeline] Recursive Shelving -> Hub Index -> Neural Map
nexus distill --rack <name> # Run distillation only for a specific rack (e.g., security)
nexus update-skills # Synchronize HUB knowledge to Agent Skills (Cross-Pollination)
```

### 3. Workflow Lifecycle

1. **Audit**: Let the AI scan your project's health and compliance.
2. **Plan**: Approve the implementation plan generated in `documentation/planning/`.
3. **Execute**: Let the AI execute tasks based on the approved plan.
4. **Finalize**: Archive session records into long-term memory for future context.

---

## 🌟 Core Principles

- **Deep Wisdom Injection**: Every agent carries its own "Pocket Handbook" within its core prompt.
- **Knowledge Portability**: Institutional skills and knowledge are portable via the `workflow/` folder.
- **Deterministic Contracts**: Standard data interfaces ensure the AI behaves consistently.
- **Semantic Shelving**: Knowledge is automatically categorized for infinite scalability.

---

## 🤝 Contributing

We welcome contributions from everyone!

1. **Fork** the repository.
2. Create a new **Branch** (`git checkout -b feature/CoolFeature`).
3. **Commit** your changes (`git commit -m 'Add some cool feature'`).
4. **Push** to the branch (`git push origin feature/CoolFeature`).
5. Open a **Pull Request**.

---

_Maintained by Faisal-Trainer & AI Assistant. Let's build a more disciplined future for Human-AI collaboration!_

---
_Last Optimized: 05/05/2026 (Phase 5 - Knowledge Shelving)_
