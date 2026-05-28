memory/
├── INDEX.md # master map seluruh memory/
│
├── short*term/ # ephemeral, per-session
│ ├── sessions/ # session*_.json (pindah dari root)
│ └── cache/ # link*cache.json, vector_index.json
│
├── raw/ # unprocessed agent output (pipeline input)
│ ├── audits/ # audit_SUMMARY*_.json/.md
│ └── reports/ # report\_\*.json/.md
│
├── operational/ # live runtime state
│ ├── records/ # completed plans, mission reports
│ ├── indexes/ # archive_index.json, semantic_tag_index.json
│ └── blueprints/ # reusable project blueprints (pindah dari cache)
│
├── distilled/ # curated, agent-readable knowledge
│ ├── core/ # standards, contracts, principles
│ ├── laravel/ # TALL stack: Laravel, Livewire, Filament
│ ├── frontend/ # Alpine, CSS, UI/UX, Tailwind
│ ├── api/ # API patterns, Chrome ext, MCP
│ ├── database/ # Eloquent, query, schema, MongoDB
│ ├── security/ # auth, CSRF, encryption, REAL security only
│ ├── tdd/ # testing, quality, TDD sessions
│ ├── devops/ # VCS, Docker, deployment, CI
│ ├── performance/ # optimization, caching, analytics
│ └── planning/ # roadmaps, evolution plans
│
├── cache/ # generated code output (hash-named files)
│ └── generated_code/
│
├── archived/ # graduated/deprecated, low-access
│
└── references/ # external repos/skills (READ-ONLY, tidak didistilasi)
├── amplifier-bundle-superpowers-main/
└── ui-ux-pro-max-skill-main/
