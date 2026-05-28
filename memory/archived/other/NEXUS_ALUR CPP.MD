graph TD

    A[C++ Core Runtime]
    B[Scheduler]
    C[Plugin Loader]
    D[Memory Engine]

    E[Python Agent Layer]
    F[LLM Orchestration]
    G[Semantic Processing]

    A --> B
    A --> C
    A --> D

    D --> E
    E --> F
    F --> G
