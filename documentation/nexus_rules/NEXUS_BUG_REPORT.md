# NEXUS-AI Bug Report — Pipeline `distill` & `update-skills`

> **Scope**: `agent/core/Distiller.js`, `agent/core/NexusEngine.js`, `agent/core/MemoryPipeline.js`, `agent/core/SemanticEngine.js`, `agent/core/NativeBridge.js`, `nexus/native/`  
> **Tanggal analisis**: 2026-05-28  
> **Status**: Pre-fix (semua bug masih ada)

---

## Bagian A — Bug Aktif (Primary Bugs)

---

### B1 — Python Distiller: Timeout 5 menit per file

**File**: `agent/core/Distiller.js` → `distillAcademics()` + `agent/core/NativeBridge.js` → `callPython()`  
**Severity**: 🔴 Critical  
**Dampak**: Seluruh pipeline `distill` bisa hang selama puluhan menit kalau Ollama lambat atau OOM. Ini sumber utama CPU overload di hardware 8GB RAM.

**Root cause**:
```js
// NativeBridge.js — timeout default 300 detik (5 menit) per file
async callPython(scriptPath, args = [], timeoutMs = 300000) {
```

`distillAcademics()` memanggil Python per file secara sequential. Kalau ada 10 file academic dan Ollama lambat (atau crash), total wait bisa 50 menit sebelum fallback ke regex.

**Tambahan**: `distiller.py` pakai `llama_index` + `Ollama` — dependency berat yang mudah OOM di 8GB RAM ketika Node.js juga aktif.

**Fix**:
```js
// NativeBridge.js — turunkan ke 30 detik
async callPython(scriptPath, args = [], timeoutMs = 30000) {

// distillAcademics() — jalankan parallel dengan concurrency limit
const CONCURRENCY = 2;
for (const chunk of chunkArray(files, CONCURRENCY)) {
    await Promise.all(chunk.map(f => distillOneFile(f)));
}
```

```python
# distiller.py — ganti llama_index dengan httpx langsung ke Ollama REST
import httpx, sys

def distill(content):
    r = httpx.post("http://localhost:11434/api/generate", json={
        "model": "llama3",
        "prompt": f"Extract insights:\n{content[:3000]}",
        "stream": False
    }, timeout=25)
    return r.json()["response"]
```

---

### B2 — `identifyCategory()`: Sanitasi nama folder tidak lengkap

**File**: `agent/core/Distiller.js` → `identifyCategory()` + `agent/core/SemanticEngine.js` → `extractMultiTags()`  
**Severity**: 🔴 Critical  
**Dampak**: Ini adalah **symptom** dari B3. Nama folder menjadi string seperti `'confidence' = $schema-string()-enum(['low'/` karena karakter berbahaya tidak disanitasi.

**Root cause**:
```js
// Distiller.js — sanitasi tidak lengkap, masih lolos karakter: [ ] ' = $ ( )
return primary.replace(/[<>:"/\\|?*]/g, '').trim() || 'other';
```

Ditambah, `extractMultiTags()` di SemanticEngine langsung mempercayai konten METADATA dari file tanpa whitelist:
```js
// SemanticEngine.js — tidak ada validasi bahwa tag adalah domain yang dikenal
const metaMatch = content.match(/METADATA.*\[([^\]]+)\]/i);
if (metaMatch) {
    metaMatch[1].split(',').forEach(t => tags.add(t.trim().toLowerCase()));
}
```

Kalau sebuah file punya konten seperti `METADATA: ['confidence' = $schema-string()...]`, regex ini langsung memperlakukannya sebagai nama tag/folder.

**Fix**:
```js
// Distiller.js — sanitasi lengkap
identifyCategory(content) {
    const tags = this.semanticEngine.extractMultiTags(content);
    let primary = tags.length > 0 ? tags[0] : 'other';
    return primary
        .replace(/[<>:"/\\|?*\[\]'=$(){}@#%^&+,;]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 32)
        .toLowerCase()
        .trim() || 'other';
}
```

```js
// SemanticEngine.js — whitelist domain yang valid
const VALID_DOMAINS = new Set([
    'security','database','ui-ux','performance',
    'tdd','vcs','saas','api','laravel','other'
]);
if (metaMatch) {
    metaMatch[1].split(',')
        .map(t => t.trim().toLowerCase())
        .filter(t => VALID_DOMAINS.has(t)) // ← whitelist
        .forEach(t => tags.add(t));
}
```

---

### B3 — `shelve()`: Nama kategori raw dijadikan path filesystem

**File**: `agent/core/Distiller.js` → `shelve()`  
**Severity**: 🔴 Critical  
**Dampak**: Ini adalah **root cause** dari folder-folder rusak yang terlihat di `memory/distilled/`. `shelve()` langsung pakai return value dari `identifyCategory()` sebagai argumen `fs.ensureDir()` tanpa validasi tambahan.

**Root cause**:
```js
async shelve() {
    const files = this.getFiles();
    for (const file of files) {
        const content = await fs.readFile(filePath, 'utf8');
        const category = isStandard ? 'standards' : this.identifyCategory(content);
        
        const targetDir = path.join(this.knowledgePath, category); // ← raw string langsung ke path!
        await fs.ensureDir(targetDir);                             // ← mkdir dengan nama rusak
        await fs.move(filePath, targetPath, { overwrite: true });
    }
}
```

**Fix**: Tambahkan validasi sebelum `ensureDir`:
```js
const VALID_RACKS = new Set([
    'standards','security','database','ui-ux','performance',
    'tdd','vcs','saas','api','laravel','other','academics','planning','audit'
]);

const rawCategory = isStandard ? 'standards' : this.identifyCategory(content);
const category = VALID_RACKS.has(rawCategory) ? rawCategory : 'other';
```

---

### B4 — `shelve()`: File yang sudah tershelve bisa dipindah ulang (infinite drift)

**File**: `agent/core/Distiller.js` → `shelve()`  
**Severity**: 🟡 Medium  
**Dampak**: Setiap kali `nexus distill` dijalankan, `shelve()` meng-scan ulang semua file termasuk yang sudah berada di subfolder (`security/`, `database/`, dll). Kalau konten file berubah (misalnya setelah semantic tagging ditambahkan), kategorinya bisa berubah — file berpindah rack setiap run.

**Root cause**:
```js
// getFiles() scan recursive semua .md termasuk yang sudah di subfolder
// shelve() tidak ada pengecekan "sudah tershelve?"
const files = this.getFiles(); // returns security/NEXUS_AUTH.md, database/NEXUS_DB.md, dll
for (const file of files) {
    // file yang sudah di security/ bisa di-move ke folder lain
    const category = this.identifyCategory(content);
    await fs.move(filePath, targetPath, ...);
}
```

**Fix**: Skip file yang sudah berada di rack yang dikenal:
```js
const VALID_RACKS = new Set([...]);
for (const file of files) {
    const currentRack = path.dirname(file); // path relatif dari knowledgePath
    if (VALID_RACKS.has(currentRack)) continue; // sudah tershelve, lewati
    // ... lanjut shelve
}
```

---

### B5 — `fast_linker.cpp`: Regex replace tidak sadar konteks Markdown

**File**: `nexus/native/fast_linker.cpp`  
**Severity**: 🟡 Medium  
**Dampak**: `fast_linker` mengganti semua kemunculan keyword dengan markdown link, termasuk keyword yang ada di dalam code blocks (` ``` `), inline code (`` `keyword` ``), dan heading. Ini merusak konten teknis.

**Contoh**:
````
```php
$model = User::find($id); // "model" di sini akan jadi [model](../database/NEXUS_MODEL.md)
```
````

**Root cause**: C++ `std::regex_replace` tidak punya konteks — tidak tahu apakah sedang di dalam code block atau tidak.

**Fix**: Tambahkan pre-processing untuk mask code blocks sebelum linking, kemudian restore:
```cpp
// Sebelum regex replace, mask semua code blocks
std::string masked = mask_code_blocks(content);
// Lakukan linking hanya pada bagian non-masked
std::string linked = apply_links(masked, keywords, nodes);
// Restore code blocks
content = restore_code_blocks(linked);
```

Atau gunakan JS fallback yang bisa lebih mudah handle konteks Markdown.

---

### B6 — `massUpdateSkills()`: Wildcard `*` tidak ada size guard

**File**: `agent/core/NexusEngine.js` → `massUpdateSkills()`  
**Severity**: 🔴 Critical  
**Dampak**: Agent `guru`, `orchestrator`, `pipeline-architect` semua pakai tag `'*'` yang match **semua** wisdom node di `distilled/`. Dengan 300+ file, setiap `update-skills` menambahkan ratusan KB ke prompt files. Ini yang menyebabkan `guru.md` = 6.2MB, `orchestrator.md` = 6.2MB, dll.

**Root cause**:
```js
const agentMappings = {
    'guru': ['*'],           // match semua node
    'orchestrator': ['*'],   // match semua node
    'pipeline-architect': ['*'], // match semua node
    ...
};

// Tidak ada batasan jumlah atau ukuran
const matchingWisdom = wisdomNodes.filter(node => {
    if (agentTags.includes('*')) return true; // semua masuk
    ...
});

// Terus tulis ke file tanpa cek ukuran
await fs.writeFile(fullPath, newPromptContent, 'utf8');
```

**Fix**:
```js
const MAX_NODES_PER_AGENT = 30;
const MAX_INJECT_KB = 200; // 200KB cap

const matchingWisdom = wisdomNodes
    .filter(node => agentTags.includes('*') || node.tags.some(t => agentTags.includes(t)))
    .sort((a, b) => b.relevanceScore - a.relevanceScore) // prioritas tertinggi dulu
    .slice(0, MAX_NODES_PER_AGENT);

let injectionContent = buildInjection(matchingWisdom);
const injectionKB = Buffer.byteLength(injectionContent, 'utf8') / 1024;
if (injectionKB > MAX_INJECT_KB) {
    injectionContent = injectionContent.substring(0, MAX_INJECT_KB * 1024) + '\n\n...[truncated]';
    this.log(`⚠️ Injection truncated at ${MAX_INJECT_KB}KB for ${agentName}`, 'warning');
}
```

---

### B7 — `agentMappings` dan `domainVocab` tidak sinkron

**File**: `agent/core/NexusEngine.js` → `massUpdateSkills()` + `agent/core/SemanticEngine.js` → `domainVocab`  
**Severity**: 🟡 Medium  
**Dampak**: `agentMappings` untuk `database-architect` berisi tag `'laravel'`, `'model'`, `'sql'` — tetapi `domainVocab` di SemanticEngine tidak punya domain `laravel`. Akibatnya, semua file Laravel docs tidak pernah mendapat tag `laravel` dan tidak akan di-inject ke agent `database-architect`.

**Root cause**:
```js
// NexusEngine.js — agentMappings berisi tag 'laravel'
'database-architect': ['database', 'db', 'migration', 'eloquent', 'laravel', 'sql', ...],

// SemanticEngine.js — domainVocab TIDAK punya entry 'laravel'
this.domainVocab = {
    security: [...],
    database: [...],
    'ui-ux': [...],
    // laravel: <-- TIDAK ADA
};
```

**Fix**: Tambahkan domain `laravel` ke `domainVocab`:
```js
// SemanticEngine.js
laravel: [
    'artisan', 'blade', 'eloquent', 'filament', 'livewire',
    'provider', 'facade', 'middleware', 'sanctum', 'route',
    'controller', 'migration', 'seeder', 'request', 'policy',
    'pennant', 'horizon', 'telescope', 'sail', 'octane'
],
```

---

### B8 — `fast_linker.cpp`: `std::regex` O(N²), tidak ada mtime cache

**File**: `nexus/native/fast_linker.cpp`  
**Severity**: 🟡 Medium  
**Dampak**: `fast_linker` mengiterasi setiap file terhadap setiap keyword dengan `std::regex` — complexity O(N × K) di mana N = jumlah file dan K = jumlah keyword. Dengan 500+ file di `distilled/`, ini berat. Berbeda dengan JS fallback di `Distiller.js` yang punya `link_cache.json` (skip file yang belum berubah), versi C++ tidak ada cache sama sekali — setiap run memproses semua file dari awal.

**Fix**: Tambahkan mtime check sebelum processing:
```cpp
// Simpan cache mtime ke file JSON
std::map<std::string, long long> mtimeCache = loadCache(cacheFile);

for (const auto& node : nodes) {
    auto mtime = fs::last_write_time(node.path).time_since_epoch().count();
    if (mtimeCache.count(node.path) && mtimeCache[node.path] == mtime) {
        continue; // skip file tidak berubah
    }
    // ... proses file
    mtimeCache[node.path] = mtime;
}
saveCache(cacheFile, mtimeCache);
```

---

## Bagian B — Secondary Bugs (Muncul Setelah Primary Fix Selesai)

> Ini adalah bug yang **tersembunyi sekarang** karena primary bugs mencegah pipeline mencapai tahap ini. Setelah B1–B8 diperbaiki, bug-bug ini akan muncul.

---

### S1 — `writeSemanticIndex()`: Non-recursive, tidak melihat subfolder

**File**: `agent/core/MemoryPipeline.js` → `writeSemanticIndex()`  
**Muncul setelah**: B3 + B4 diperbaiki (shelve mulai berjalan benar)  
**Severity**: 🔴 Critical  

Setelah `shelve()` diperbaiki, semua file akan benar-benar berpindah ke subfolder (`security/`, `database/`, `ui-ux/`, dll). Tapi `writeSemanticIndex()` menggunakan `fs.readdir()` yang **hanya membaca satu level** — tidak recursive.

**Root cause**:
```js
// MemoryPipeline.js — hanya baca root knowledgePath, tidak masuk subfolder
const files = await fs.readdir(knowledgeDir); // ← tidak recursive!
for (const file of files) {
    if (!file.endsWith('.md')) continue; // folder tidak diproses
    // ...
}
```

Setelah shelve berjalan benar, `files` akan isi `['security', 'database', 'ui-ux', ...]` — semuanya folder, bukan file `.md`. Semantic index akan **kosong**.

**Fix**: Gunakan `fast-glob` seperti pada method lain:
```js
async writeSemanticIndex() {
    const fg = require('fast-glob');
    const files = await fg('**/*.{md,MD}', {
        cwd: knowledgeDir,
        ignore: ['NEXUS_HUB_INDEX.md', 'NEXUS_NEURAL_MAP.md'],
        onlyFiles: true
    });
    // ...
}
```

---

### S2 — `readMemory()`: Non-recursive, agent buta terhadap knowledge base

**File**: `agent/core/NexusEngine.js` → `readMemory()`  
**Muncul setelah**: B3 + B4 diperbaiki  
**Severity**: 🔴 Critical  

Sama seperti S1, `readMemory()` menggunakan `fs.readdir()` non-recursive. Setelah shelve berjalan benar, engine akan membaca `memory/distilled/` dan hanya melihat folder — tidak ada file `.md` di root level. Agent akan memulai setiap cycle dengan knowledge base yang tampak kosong.

**Root cause**:
```js
// NexusEngine.js
const knowledgeFiles = await fs.readdir(this.knowledgePath); // ← tidak recursive
const lessons = knowledgeFiles.filter(k => k.endsWith('.md')); // ← hanya file root
```

**Fix**: Sama dengan S1 — ganti dengan `fast-glob`.

---

### S3 — `appendToArchive()`: Tag METADATA hardcoded salah

**File**: `agent/core/MemoryPipeline.js` → `appendToArchive()`  
**Muncul setelah**: B2 diperbaiki (whitelist METADATA parsing)  
**Severity**: 🟡 Medium  

Setelah whitelist validasi METADATA diterapkan, archive entries akan diparsing dengan benar — tapi isinya salah. Semua archive entries selalu mendapat tag `[audit, performance, testing, tdd]` terlepas dari konten aktualnya.

**Root cause**:
```js
// MemoryPipeline.js — HARDCODED, tidak digenerate dari konten
const tags = '\n\n---\n> **METADATA (NEXUS SEMANTIC TAGS)**: [audit, performance, testing, tdd]\n';
```

Entry audit laporan security akan ter-tag sebagai `tdd`. Entry planning laporan database akan ter-tag sebagai `performance`. Semantic index menjadi tidak akurat.

**Fix**: Generate tags dari konten aktual:
```js
const contentTags = this.semanticEngine
    ? this.semanticEngine.extractMultiTags(content)
    : ['audit'];
const tags = `\n\n---\n> **METADATA (NEXUS SEMANTIC TAGS)**: [${contentTags.join(', ')}]\n`;
```

---

### S4 — Output `distillAcademics()` ter-shelve ulang di run berikutnya

**File**: `agent/core/Distiller.js` → `distillAcademics()` + `shelve()`  
**Muncul setelah**: B1 + B3 diperbaiki  
**Severity**: 🟡 Medium  

`distillAcademics()` menulis output ke subfolder `academics/NEXUS_DISTILLATION_*.md`. Tapi saat `shelve()` berjalan (tahap berikutnya dalam `run()`), file-file di `academics/` ini akan di-scan ulang dan kemungkinan besar dipindah ke folder lain (karena kontennya mengandung keyword yang match domain lain).

**Root cause**: `shelve()` meng-scan semua subfolder termasuk `academics/`, dan `academics` bukan termasuk rack yang dikenal oleh whitelist.

**Fix**: Tambahkan `academics` ke `VALID_RACKS` dan ke skip-list shelve:
```js
const VALID_RACKS = new Set([
    'standards', 'security', 'database', 'ui-ux', 'performance',
    'tdd', 'vcs', 'saas', 'api', 'laravel', 'other',
    'academics', 'planning', 'audit' // ← tambahkan ini
]);
```

---

### S5 — Domain priority conflict setelah menambahkan `laravel` ke vocabulary

**File**: `agent/core/SemanticEngine.js` → `extractMultiTags()` + `Distiller.js` → `shelve()`  
**Muncul setelah**: B7 diperbaiki (menambahkan `laravel` ke domainVocab)  
**Severity**: 🟡 Medium  

Setelah `laravel` ditambahkan ke `domainVocab`, banyak file yang sebelumnya masuk ke `security/` (karena keyword `middleware`, `session`, `guard`) akan mendapat multi-tag: `['security', 'laravel']`. Tapi `shelve()` hanya menggunakan tag pertama sebagai folder tujuan:

```js
// Distiller.js
const category = isStandard ? 'standards' : this.identifyCategory(content);
// identifyCategory() return tags[0] — urutan iterasi Object.entries(domainVocab) menentukan prioritas
```

Karena `security` didefinisikan SEBELUM `laravel` di `domainVocab`, file Laravel yang punya keyword `middleware` akan tetap masuk ke `security/`.

**Fix**: Tentukan prioritas domain secara eksplisit berdasarkan hit count, bukan urutan definisi:
```js
identifyCategory(content) {
    const tagScores = this.semanticEngine.extractMultiTagsWithScores(content);
    // tagScores = [{ tag: 'laravel', score: 12 }, { tag: 'security', score: 3 }, ...]
    const primary = tagScores.sort((a, b) => b.score - a.score)[0]?.tag || 'other';
    return sanitize(primary);
}
```

---

### S6 — `processHarvestData()`: Setelah `emptyDir`, `.processed.json` ikut terhapus

**File**: `agent/core/MemoryPipeline.js` → `processHarvestData()`  
**Muncul setelah**: Pipeline berjalan lebih stabil  
**Severity**: 🟡 Medium  

`processHarvestData()` menyimpan checkpoint di `golden/harvest/.processed.json` untuk menghindari re-processing file yang sama. Di akhir proses, dipanggil `fs.emptyDir(harvestPath)` yang menghapus **semua** isi folder termasuk `.processed.json`. Ini sebenarnya ok karena folder harvest juga dikosongkan. Tapi jika harvest baru masuk **selama** proses berjalan, `emptyDir` akan menghapusnya juga.

**Root cause**:
```js
await fs.emptyDir(harvestPath); // menghapus SEMUA isi harvest/, termasuk folder baru yang baru masuk
```

**Fix**: Hanya hapus project yang sudah diproses, bukan seluruh folder:
```js
for (const project of projects) {
    if (processed.includes(project)) {
        await fs.remove(path.join(harvestPath, project));
    }
}
// Hapus .processed.json setelah semua selesai
await fs.remove(processedLog);
```

---

### S7 — Injection sentinel duplikat di prompt files

**File**: `agent/core/NexusEngine.js` → `massUpdateSkills()`  
**Muncul setelah**: B6 diperbaiki (size guard) + `distill` berjalan benar  
**Severity**: 🟡 Low-Medium  

Setelah `distill` + `update-skills` dijalankan berulang, ada kemungkinan teks sentinel `## 🧠 DEEP WISDOM INJECTION` muncul lebih dari sekali dalam satu prompt file — terutama jika `standardizeNames()` menjalankan "multi-option merge" pada file yang sudah punya injection block.

**Root cause**:
```js
// NexusEngine.js — hanya cari satu occurrence dari sentinel
const headerIndex = promptContent.indexOf(targetHeader);
if (headerIndex !== -1) {
    newPromptContent = promptContent.substring(0, headerIndex) + injectionContent;
} else {
    newPromptContent = promptContent.trim() + '\n\n' + injectionContent; // ← append jika tidak ketemu
}
```

Kalau file di-merge dan sentinel ada di `Opsi A` tapi bukan di `Opsi B`, `indexOf` mungkin tidak menemukan karena konteks berbeda, dan injection di-append ulang.

**Fix**: Gunakan regex yang lebih agresif untuk membersihkan semua injection blocks sebelum inject ulang:
```js
const cleanPrompt = promptContent.replace(
    /\n*## 🧠 DEEP WISDOM INJECTION[\s\S]*/,
    ''
).trimEnd();
newPromptContent = cleanPrompt + '\n\n' + injectionContent;
```

---

## Ringkasan Prioritas

| ID | Komponen | Severity | Urutan Fix |
|---|---|---|---|
| B3 | `shelve()` raw path | 🔴 Critical | 1 — root cause folder rusak |
| B2 | METADATA whitelist | 🔴 Critical | 2 — prerequisite B3 |
| B6 | Wildcard size guard | 🔴 Critical | 3 — sebelum jalankan update-skills lagi |
| B1 | Python timeout | 🔴 Critical | 4 — sebelum distillAcademics berguna |
| B4 | `shelve()` drift | 🟡 Medium | 5 — setelah B3 stabil |
| B7 | domainVocab sync | 🟡 Medium | 6 — setelah B2 |
| B5 | C++ code block | 🟡 Medium | 7 |
| B8 | C++ mtime cache | 🟡 Medium | 8 |
| S1 | `writeSemanticIndex` recursive | 🔴 Critical | 9 — muncul setelah B3+B4 |
| S2 | `readMemory` recursive | 🔴 Critical | 10 — muncul setelah B3+B4 |
| S4 | `academics/` re-shelved | 🟡 Medium | 11 — muncul setelah B1+B3 |
| S5 | Domain priority conflict | 🟡 Medium | 12 — muncul setelah B7 |
| S3 | Hardcoded archive tags | 🟡 Medium | 13 — muncul setelah B2 |
| S6 | `emptyDir` harvest race | 🟡 Medium | 14 |
| S7 | Injection sentinel duplikat | 🟡 Low | 15 — muncul setelah B6 |

---

*Generated by AI Engineering analysis — NEXUS-AI v1.x pipeline audit*
