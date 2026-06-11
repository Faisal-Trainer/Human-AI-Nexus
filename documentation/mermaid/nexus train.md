graph TD
A[Sandbox Berhasil] -->|Menyimpan history kode| B[(Memory Cache)]

    subgraph Nexus Train Pipeline
    C[1. Dataset Extraction] --> D[2. LoRA Fine-Tuning]
    D --> E[3. Merge & Quantize]
    end

    B -.->|Dibaca oleh| C

    C -->|Output: file .jsonl| D
    D -->|Belajar via Python Unsloth| E
    E -->|Output: Model Baru| F((Model GGUF Custom))

    style A fill:#4CAF50,color:white,stroke:#388E3C,stroke-width:2px
    style F fill:#9C27B0,color:white,stroke:#7B1FA2,stroke-width:2px
    style C fill:#2196F3,color:white,stroke:none
    style D fill:#2196F3,color:white,stroke:none
    style E fill:#2196F3,color:white,stroke:none
