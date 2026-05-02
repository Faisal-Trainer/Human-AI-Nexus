# SKILL: KNOWLEDGE-SKILL LIAISON (Synapse Protocol)

Dokumen ini berisi standar teknik untuk menghubungkan lapisan Pengetahuan dengan lapisan Keahlian teknis.

## 1. Protokol Sinkronisasi (Synapse Protocol)
- **Direct Mapping**: Setiap file `NEXUS_*.md` di HUB harus memiliki minimal satu padanan target di folder `skill/`.
- **Instructional Translation**: 
    - HUB: "Gunakan UUID untuk keamanan."
    - Skill: "WAJIB menggunakan `HasUuids` trait pada model dan mendefinisikan `$keyType = 'string'`."

## 2. Pemetaan Target (Targeting Matrix)
| HUB Document | Target Skill File |
|--------------|-------------------|
| `NEXUS_DATABASE_STANDARDS.md` | `skill/external/backend/database-design.md` |
| `NEXUS_MEDIA_HANDLING.md` | `skill/external/creative/seo-performance.md` |
| `NEXUS_UIUX_INTELLIGENCE.md` | `skill/external/frontend/ux-design.md` |
| `NEXUS_TDD_IRON_LAWS.md` | `skill/external/testing/testing-standards.md` |
| `NEXUS_SYSTEMATIC_DEBUGGING.md` | `skill/internal/loop-testing.md` |
| `NEXUS_VCS_STRATEGY.md` | `skill/external/devops/vcs-management.md` |

## 3. Audit Integritas Jembatan
- Lakukan pengecekan setiap minggu: "Apakah ada standar baru di HUB yang belum masuk ke Otak Agent?".

---
*Dokumen ini adalah referensi teknis untuk Nexus Guru.*
