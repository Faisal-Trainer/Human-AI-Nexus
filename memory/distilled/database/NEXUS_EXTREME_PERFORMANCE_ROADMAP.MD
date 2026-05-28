# 🔬 NEXUS Pipeline — Extreme Performance Scan & Optimization Roadmap
> **VERSION**: v2 | **Last Updated**: 28/05/2026



**Auditor**: AI Engineering (Extreme Scan Mode)
**Tanggal**: 2026-05-19
**Baseline**: Section 1 (10 proyek) = ~8422 detik (~2 jam 20 menit)
**Target**: Section 1 (10 proyek) < 30 menit (~80% reduksi)

---

## 📊 Dekomposisi Waktu Per Proyek (Estimasi)

Setiap proyek melewati pipeline berikut secara **sekuensial**:

| Fase | File Sumber | Estimasi Waktu | Bottleneck? |
|------|-------------|----------------|-------------|
| Template Copy (`fs.copy`) | `phase1_testing.js:62` | ~5-10 detik | ⚠️ Sedang |
| DB Migrate (awal) | `phase1_testing.js:101` | ~3-5 detik | ✅ Cepat |
| Blueprint Generation (Ollama) | `NexusEngine.js:395` | ~30-60 detik | 🔴 **BERAT** |
| Audit Phase (6 spesialis + scanner) | `AuditPhase.js:76` | ~20-40 detik | 🔴 **BERAT** |
| Planning Phase | `PlanningPhase.js` | ~10-20 detik | ⚠️ Sedang |
| **Implementation Phase (14x Ollama calls)** | `ImplementationPhase.js:8-63` | **~5-8 menit** | 🔴🔴 **KRITIS** |
| `composer install` | `ImplementationPhase.js:87` | ~20-30 detik | ⚠️ (cached) |
| `composer require breeze` | `ImplementationPhase.js:92` | ~15-25 detik | ⚠️ |
| `npm install` | `ImplementationPhase.js:105` | ~15-30 detik | ⚠️ (cached) |
| `npm run build` | `ImplementationPhase.js:108` | ~10-20 detik | ⚠️ |
| `php artisan migrate` | `ImplementationPhase.js:102` | ~3-5 detik | ✅ Cepat |
| Clean Code & Legacy Cleanup | `ExecutionPhase.js:102` | ~5-10 detik | ✅ Cepat |
| **5-Cycle Stability Loop** | `ExecutionPhase.js:201-245` | **~3-5 menit** | 🔴🔴 **KRITIS** |
| Self-Healing (jika gagal, 3x retry) | `ExecutionPhase.js:388-466` | ~1-3 menit | 🔴 **BERAT** |
| Post-Generation Audit (ulang) | `phase1_testing.js:170-182` | ~20-40 detik | ⚠️ Sedang |
| Knowledge Harvest | `phase1_testing.js:119-120` | ~5-10 detik | ✅ Cepat |
| **TOTAL per proyek** | | **~12-15 menit** | |
| **TOTAL 10 proyek (sekuensial)** | | **~120-150 menit** | |

---

## 🔴 TOP 3 BOTTLENECK KRITIS

### 1. Implementation Phase — 14x Ollama Sequential Calls (~5-8 menit/proyek)

**Lokasi**: `ImplementationPhase.js` baris 19-58

**Masalah**: Setiap proyek membutuhkan ~14 panggilan Ollama secara **sekuensial**:
- 2x Model generation (2 model × ~30 detik = ~60 detik)
- 2x Policy generation (~60 detik)
- 2x API Controller generation (~60 detik)
- 2x Migration generation (~60 detik)
- 2x Factory generation (~40 detik)
- 2x Seeder generation (~40 detik)
- 2x Livewire Component (PHP + Blade = 4 calls) (~120 detik)
- 1x Routes generation (~30 detik)
- 1x API Routes generation (~30 detik)
- 1x Layout generation (~30 detik)

**Total**: ~14 panggilan × ~30 detik rata-rata = **~7 menit murni Ollama inference**.

**Recode yang diperlukan**:

```
┌─────────────────────────────────────────────────────────┐
│  RECODE R-01: Template Code Cache (Eliminasi ~70%)      │
│  File: ImplementationPhase.js                           │
│  Prioritas: ★★★★★ (KRITIS)                             │
│  Estimasi Penghematan: 5-6 menit per proyek             │
└─────────────────────────────────────────────────────────┘
```

**Solusi**: Buat **Code Template Cache** per tipe komponen.
- Panggil Ollama SEKALI untuk menghasilkan template generik per tipe (Model, Policy, Controller, dll.) pada awal Section.
- Simpan hasilnya di `memory/cache/code_templates/`.
- Untuk proyek selanjutnya, gunakan **string interpolation** (replace nama model, tabel, field) daripada memanggil Ollama lagi.
- Ollama hanya dipanggil ulang jika cache miss atau blueprint sangat berbeda dari template.

```javascript
// SEBELUM (14 panggilan Ollama per proyek):
for (const model of models) {
    await this.generateModel(model, blueprint);     // Ollama call
    await this.generatePolicy(model, blueprint);    // Ollama call
    await this.generateApiController(model, blueprint); // Ollama call
}

// SESUDAH (0 Ollama calls jika cache hit):
for (const model of models) {
    await this.generateFromCache('model', model, blueprint);
    await this.generateFromCache('policy', model, blueprint);
    await this.generateFromCache('controller', model, blueprint);
}
```

---

### 2. Stability Loop — 5 Iterasi × 2 Service Startup (~3-5 menit/proyek)

**Lokasi**: `ExecutionPhase.js` baris 201-245

**Masalah**: Setiap iterasi:
1. Mencari port kosong (2x `net.createServer`)
2. `php artisan serve` — cold start ~3-5 detik
3. `npm run dev` (Vite) — cold start ~5-10 detik
4. Polling HTTP hingga 200/404 (timeout 30 detik masing-masing)
5. Kill proses (`taskkill`)
6. `setTimeout(1000)` delay antar iterasi

**5 iterasi × ~40 detik = ~200 detik = ~3.3 menit**

Dan jika ada kegagalan → Self-Healing (3 attempt × Ollama call + retry loop), bisa menambah 3 menit lagi.

```
┌─────────────────────────────────────────────────────────┐
│  RECODE R-02: Smart Stability Check (Eliminasi ~60%)    │
│  File: ExecutionPhase.js                                │
│  Prioritas: ★★★★☆ (TINGGI)                             │
│  Estimasi Penghematan: 2-3 menit per proyek             │
└─────────────────────────────────────────────────────────┘
```

**Solusi**:
- **Kurangi iterasi dari 5 ke 2** (health check + 1 confirmation).
- **Ganti `npm run dev`** (Vite cold start) dengan validasi statis: cek apakah `vite.config.js` valid dan `node_modules/.vite` ada.
- **Kurangi `waitForService` timeout** dari 30 detik ke 10 detik.
- **Skip stability loop** jika `php artisan route:list` sudah lolos DAN tidak ada error di `laravel.log`.

```javascript
// SESUDAH:
const smokeOk = await this.artisanSmokeTest(projectPath);
const logClean = await this.checkLaravelLog(projectPath);
if (smokeOk && logClean) {
    this.log(`   🎉 Fast-track: Smoke + Log clean. Skipping full stability loop.`, 'success');
    return;
}
// Hanya jalankan 2 iterasi jika smoke test gagal
```

---

### 3. Duplikasi Bootstrapping — composer/npm install berulang (~1-2 menit/proyek)

**Lokasi**: `ImplementationPhase.js` baris 84-113

**Masalah**: Meskipun template sudah punya `vendor/` dan `node_modules/`, pipeline tetap menjalankan:
- `composer install` (~20-30 detik)
- `composer require laravel/breeze --dev` (~15-25 detik)
- `npm install` (~15-30 detik)
- `npm run build` (~10-20 detik)

Total: ~60-105 detik per proyek yang **seharusnya bisa di-skip** jika dependensi sudah ada.

```
┌─────────────────────────────────────────────────────────┐
│  RECODE R-03: Conditional Bootstrapping                 │
│  File: ImplementationPhase.js                           │
│  Prioritas: ★★★★☆ (TINGGI)                             │
│  Estimasi Penghematan: 1-2 menit per proyek             │
└─────────────────────────────────────────────────────────┘
```

**Solusi**:
```javascript
async bootstrapApplication() {
    const root = this.engine.rootPath;
    const hasVendor = await fs.pathExists(path.join(root, 'vendor', 'autoload.php'));
    const hasNodeModules = await fs.pathExists(path.join(root, 'node_modules', '.package-lock.json'));
    const hasBreeze = await fs.pathExists(path.join(root, 'vendor', 'laravel', 'breeze'));

    if (!hasVendor) await this._run('composer', ['install', '--no-interaction'], root);
    if (!hasBreeze) {
        await this._run('composer', ['require', 'laravel/breeze', '--dev', '--no-interaction'], root);
        await this._run('php', ['artisan', 'breeze:install', 'livewire', '--no-interaction'], root);
    }
    if (!hasNodeModules) await this._run('npm', ['install'], root);
    // npm run build hanya jika tidak ada manifest
    if (!await fs.pathExists(path.join(root, 'public', 'build', 'manifest.json'))) {
        await this._run('npm', ['run', 'build'], root);
    }
}
```

---

## ⚠️ OPTIMASI LEVEL MENENGAH

### R-04: Post-Generation Audit Duplikasi

**Lokasi**: `phase1_testing.js` baris 168-183

**Masalah**: Setelah seluruh 10 proyek selesai, pipeline menjalankan audit **kedua kali** untuk semua proyek yang berhasil. Audit ini identik dengan audit yang sudah dijalankan di `runCycle()`.

**Solusi**: Hapus loop audit kedua, atau jadikan opsional via flag `--post-audit`.
**Penghematan**: ~3-6 menit total (10 proyek × 20-40 detik).

---

### R-05: Blueprint Generation Caching

**Lokasi**: `NexusEngine.js` baris 359-445

**Masalah**: Blueprint di-generate ulang via Ollama untuk setiap proyek, meskipun [README.md](../vcs/NEXUS_README.MD) hanya berisi nama proyek dan tags yang bisa di-derive secara deterministik.

**Solusi**: Buat lookup table `blueprintRegistry` yang memetakan `project-name + tags` → blueprint JSON. Ollama hanya dipanggil jika kombinasi belum pernah dilihat.

**Penghematan**: ~30-60 detik per proyek (setelah proyek pertama).

---

### R-06: NexusEngine Constructor Overhead

**Lokasi**: `NexusEngine.js` baris 60-137, `phase1_testing.js:112,175`

**Masalah**: `new NexusEngine()` diinstansiasi **per proyek** (1x di `setupTALLProject`, 1x lagi di post-audit loop). Setiap instansiasi melakukan:
- Redis connect
- Ollama availability check
- 15+ class instantiation (Modifier, SchemaGuard, QueryOptimizer, dll.)

**Solusi**: Gunakan satu instance NexusEngine yang di-reconfigure via `engine.setRootPath(newPath)` tanpa reinstansiasi semua komponen.

**Penghematan**: ~5-10 detik per proyek (overhead kecil tapi terakumulasi).

---

## 📈 Proyeksi Penghematan Total

| Recode | Per Proyek | 10 Proyek | Prioritas |
|--------|-----------|-----------|-----------|
| **R-01** Code Template Cache | -5 menit | **-50 menit** | ★★★★★ |
| **R-02** Smart Stability | -2.5 menit | **-25 menit** | ★★★★☆ |
| **R-03** Conditional Bootstrap | -1.5 menit | **-15 menit** | ★★★★☆ |
| R-04 Skip Post-Audit | -0.5 menit | **-5 menit** | ★★★☆☆ |
| R-05 Blueprint Cache | -0.5 menit | **-5 menit** | ★★★☆☆ |
| R-06 Engine Singleton | -0.15 menit | **-1.5 menit** | ★★☆☆☆ |
| **TOTAL PENGHEMATAN** | **~10 menit** | **~101 menit** | |

**Baseline**: ~140 menit → **Target**: ~39 menit (**72% reduksi**)

---

## 🗺️ Roadmap Implementasi (Selaras dengan NEXUS_HYBRID_CORE_ROADMAP.md)

### Phase A — Quick Wins (Bisa langsung recode)
1. ✅ **R-03**: Conditional Bootstrapping di `ImplementationPhase.js`
2. ✅ **R-04**: Skip/opsionalkan Post-Generation Audit di `phase1_testing.js`
3. ✅ **R-02**: Kurangi stability loop ke 2 iterasi + fast-track logic di `ExecutionPhase.js`

### Phase B — Code Template Cache System (Dampak terbesar)
4. 🔨 **R-01**: Buat `agent/core/CodeTemplateCache.js`
   - Sistem cache berbasis file di `memory/cache/code_templates/`
   - Template interpolation engine (replace model name, table name, fields)
   - Fallback ke Ollama jika cache miss
5. 🔨 **R-05**: Blueprint registry lookup table

### Phase C — Engine Architecture (Selaras dengan Hybrid Roadmap)
6. 🔧 **R-06**: Refactor `NexusEngine` menjadi singleton yang re-configurable
7. 🔧 Integrasi C++ `sandbox_orchestrator.exe` untuk `fs.copy` (sebagaimana tercantum di Hybrid Roadmap §2)

---

*Document generated by AI Engineering Extreme Scan — Nexus Pipeline Optimization Initiative*


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, tdd]
