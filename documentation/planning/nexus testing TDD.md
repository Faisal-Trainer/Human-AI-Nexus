# NEXUS — TDD Project Modules (Project-Based Learning)

## Focus: TALL Stack + Multi-Agent Behavior

---

# 1. Project: Intelligent CRUD Auditor

## Objective

Agent mampu:

- membaca struktur Laravel (Model, Migration, Controller)
- menguji CRUD secara otomatis
- mendeteksi inkonsistensi

## Scope

- Laravel routes
- Controller logic
- Database interaction

## Success Criteria

```text
CRUD berjalan benar
validasi terdeteksi
error dilaporkan + dijelaskan
```

---

# 2. Project: Livewire Reactive Validator

## Objective

Menguji apakah:

- state Livewire sinkron dengan backend
- perubahan UI benar-benar reactive

## Scenario

- input form
- update state
- observe DOM

## Success Criteria

```text
tidak ada desync
tidak perlu reload
state konsisten
```

---

# 3. Project: Alpine Behavior Simulator

## Objective

Agent memahami interaksi frontend:

- toggle state
- conditional rendering
- event handling

## Success Criteria

```text
event berjalan benar
state berubah sesuai logika
tidak terjadi UI inconsistency
```

---

# 4. Project: Tailwind Layout Integrity Checker

## Objective

Mendeteksi:

- broken layout
- conflicting classes
- responsiveness issue

## Success Criteria

```text
layout stabil
class tidak konflik
UI tetap konsisten di berbagai kondisi
```

---

# 5. Project: Full Stack Interaction Test (TALL Flow)

## Objective

Uji alur lengkap:

```text
UI → Alpine → Livewire → Laravel → DB → kembali ke UI
```

## Success Criteria

```text
tidak ada break di chain
data sinkron end-to-end
```

---

# 6. Project: Multi-Agent Debugging System

## Objective

Beberapa agent bekerja sama:

```text
Analyzer → Diagnoser → Fixer
```

## Scenario

- inject bug
- agent harus:
  - menemukan
  - menjelaskan
  - memperbaiki

## Success Criteria

```text
bug ditemukan
penyebab dijelaskan
fix valid
```

---

# 7. Project: Failure Recovery Engine

## Objective

Uji resilience sistem

## Scenario

- API error
- DB failure
- Livewire crash

## Success Criteria

```text
system tidak collapse
agent retry / fallback
error terklasifikasi
```

---

# 8. Project: Memory Consistency Test

## Objective

Pastikan:

- knowledge tidak konflik
- memory tidak corrupt

## Scenario

- simpan data
- update
- retrieve ulang

## Success Criteria

```text
data konsisten
tidak ada semantic drift
```

---

# 9. Project: Adaptive Strategy Agent

## Objective

Agent harus:

- mencoba solusi
- gagal
- mencoba pendekatan baru

## Success Criteria

```text
tidak mengulang solusi sama
ada perubahan strategi
```

---

# 10. Project: Anti-Prompt-Replay Validation

## Objective

Menguji bahwa agent:

- tidak sekadar mengulang
- benar-benar reasoning

## Scenario

- ubah sedikit input
- jalankan ulang

## Success Criteria

```text
output berbeda secara logis
bukan copy sebelumnya
```

---

# 11. Project: Autonomous Trigger System

## Objective

System bisa berjalan tanpa manual trigger

## Scenario

- memory anomaly
- performance drop

## Success Criteria

```text
agent aktif otomatis
task dijalankan tanpa user
```

---

# 12. Project: Agent Collaboration Stress Test

## Objective

Uji banyak agent sekaligus

## Scenario

- parallel execution
- shared resource

## Success Criteria

```text
tidak ada race condition
tidak corrupt memory
```

---

# 13. Project: Code Generation Safety Test (Forge)

## Objective

Uji fitur "Machine Forging"

## Scenario

- generate scanner/tool baru

## Success Criteria

```text
code valid
tidak merusak core
terisolasi
```

---

# 14. Project: Governance Enforcement Test

## Objective

Pastikan rule system jalan

## Scenario

- agent mencoba aksi terlarang

## Success Criteria

```text
action ditolak
log tercatat
system tetap aman
```

---

# 15. Project: End-to-End Intelligent Audit System

## Objective (Final Boss)

Agent melakukan:

```text
scan project
detect issue
prioritize
fix
verify ulang
```

## Success Criteria

```text
issue ditemukan
fix berhasil
tidak muncul error baru
```

---

# 16. Struktur PBL (Untuk Kamu sebagai Pendidik)

Setiap project harus punya:

## 1. Problem Statement

## 2. Agent Roles

## 3. Input Scenario

## 4. Expected Behavior

## 5. Metrics

## 6. Documentation (VERY IMPORTANT)

## 7. Reflection (VERY IMPORTANT)

---

# 17. Final Principle

```text
Test bukan untuk membuktikan system bekerja.

Test untuk membuktikan system berpikir.
```
