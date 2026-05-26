flowchart TD
A[Goal dari User]
A --> B[LLM Reasoning]
B --> C[Planning]
C --> D[Use Tools/API]
D --> E[Observe Result]
E --> F{Task selesai?}
F -- No --> B
F -- Yes --> G[Final Output]
