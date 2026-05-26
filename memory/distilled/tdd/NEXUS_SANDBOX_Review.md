# 🧪 Analisis & Saran Perbaikan: `nexus sandbox`
> **VERSION**: v1 | **Last Updated**: 26/05/2026



> **Project:** Human-AI Nexus v3.3.0
> **Tanggal Review:** 15 Mei 2026
> **Fokus:** Command `nexus sandbox` — alur eksekusi, temuan bug, dan saran perbaikan

---

## Cara Kerja `nexus sandbox`

```
nexus sandbox [--section 1-10] [--distill]
       ↓
cli.js  →  agent/main.js  (case 'sandbox')
       ↓
spawn('node', ['tests/TDD/sandbox-master-runner.js', ...args])
       ↓
sandbox-master-runner.js → setup_section[1/2/3].js / setup_dynamic_section.js
       ↓
Untuk setiap project dari 100-projects-data.js:
  NexusEngine.runCycle()
    ├── blueprintApp()         ← Generate TALL stack dari README via Ollama
    ├── audit()                ← Scan dengan 6 specialist agents
    ├── plan()                 ← Susun rencana perbaikan
    ├── execute()              ← Eksekusi perubahan kode
    ├── cleanCodeAndVerify()   ← Cleanup + stability loop 5x
    └── record()               ← Simpan hasil ke memory / HUB
```

---

## Ringkasan Temuan

| # | Prioritas | Masalah | Dampak |
|---|---|---|---|
| 1 | 🔴 Kritis | Tidak ada `.on('error')` dan validasi file runner sebelum `spawn` | Silent crash tanpa pesan jelas ke user |
| 2 | 🔴 Kritis | Stability loop `50 detik × 100 project` = ~83 menit hanya untuk health check | Total waktu sandbox bisa 8+ jam |
| 3 | 🟠 Penting | Port `8001` hardcoded di `cleanCodeAndVerify()` | Gagal jika port sudah dipakai proses lain |
| 4 | 🟠 Penting | Tidak ada abort otomatis jika Ollama offline | 100 project berjalan percuma, hasil kosong semua |
| 5 | 🟡 Sedang | Tidak ada konfirmasi sebelum `--distill` overwrite HUB | Data knowledge bisa tertimpa tanpa sengaja |
| 6 | 🟡 Sedang | Tidak ada progress bar / ETA selama proses berjalan | UX buruk untuk proses yang berjalan sangat lama |

---

## Temuan Detail & Saran Perbaikan

---

### 🔴 Temuan 1 — Tidak Ada Validasi File Runner & Error Handler Sebelum Spawn

**Lokasi:** `agent/main.js` — `case 'sandbox'`

**Kode Bermasalah:**
```javascript
const runnerPath = path.join(__dirname, '..', 'tests', 'TDD', 'sandbox-master-runner.js');
const sandboxArgs = args.slice(1);
const sandboxProc = spawnChild('node', [runnerPath, ...sandboxArgs], { stdio: 'inherit', shell: false });
sandboxProc.on('exit', code => { rl.close(); process.exit(code || 0); });
// ❌ Tidak ada: fs.pathExists(runnerPath) sebelum spawn
// ❌ Tidak ada: sandboxProc.on('error', ...) untuk tangkap kegagalan spawn
```

**Dampak:** Jika `sandbox-master-runner.js` tidak ditemukan (contoh: install bersih tanpa folder `tests/`), proses akan diam-diam exit tanpa pesan error yang membantu user.

**Saran Perbaikan:**
```javascript
case 'sandbox': {
    const { spawn: spawnChild } = require('child_process');
    const fs = require('fs-extra');
    const runnerPath = path.join(__dirname, '..', 'tests', 'TDD', 'sandbox-master-runner.js');

    // ✅ Validasi keberadaan file runner sebelum spawn
    if (!fs.existsSync(runnerPath)) {
        console.error(`❌ Sandbox runner tidak ditemukan: ${runnerPath}`);
        console.error(`   Pastikan folder tests/TDD/ tersedia di instalasi Nexus.`);
        rl.close();
        process.exit(1);
    }

    console.log('\x1b[36m%s\x1b[0m', '🧪 Nexus Sandbox Master Runner: Starting...');
    const sandboxProc = spawnChild('node', [runnerPath, ...sandboxArgs], { stdio: 'inherit', shell: false });

    // ✅ Tangkap error spawn (misal: node tidak ada di PATH)
    sandboxProc.on('error', (err) => {
        console.error(`❌ Gagal menjalankan sandbox: ${err.message}`);
        rl.close();
        process.exit(1);
    });

    sandboxProc.on('exit', code => { rl.close(); process.exit(code || 0); });
    return;
}
```

---

### 🔴 Temuan 2 — Stability Loop Blocking ~50 Detik Per Project × 100 Projects

**Lokasi:** `agent/core/NexusEngine.js` — `cleanCodeAndVerify()`

**Kode Bermasalah:**
```javascript
for (let i = 1; i <= 5; i++) {
    const serveProc = spawn('php', ['artisan', 'serve', '--port=8001'], { cwd: projectPath, shell: true });
    const devProc   = spawn('npm', ['run', 'dev'], { cwd: projectPath, shell: true });

    await new Promise(resolve => setTimeout(resolve, 8000)); // ← tunggu 8 detik flat
    // ... cek status ...
    await new Promise(resolve => setTimeout(resolve, 2000)); // ← cooldown 2 detik flat
}
// Total per project : (8 + 2) × 5 iterasi = 50 detik MINIMUM
// Total 100 projects: 50 × 100 = 5.000 detik = ±83 MENIT hanya untuk stability loop
```

**Dampak:** Untuk 100 project, `nexus sandbox` bisa membutuhkan **8+ jam** hanya dari bagian stability loop — belum termasuk waktu audit, plan, dan execute.

**Saran Perbaikan:**
```javascript
// ✅ Ganti setTimeout flat dengan active polling
async waitForService(url, timeoutMs = 8000) {
    const axios = require('axios');
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        try {
            await axios.get(url, { timeout: 500 });
            return true; // ← Langsung lanjut begitu service ready (bisa 1-2 detik)
        } catch (_) {
            await new Promise(r => setTimeout(r, 300)); // polling tiap 300ms
        }
    }
    return false; // timeout
}

// Penggunaan di dalam loop:
const port = await getAvailablePort(8001); // (lihat Temuan 3)
const serveProc = spawn('php', ['artisan', 'serve', `--port=${port}`], { cwd: projectPath, shell: false });
const devProc   = spawn('npm', ['run', 'dev'], { cwd: projectPath, shell: false });

const [serveReady, devReady] = await Promise.all([
    this.waitForService(`http://localhost:${port}`, 8000),
    this.waitForService('http://localhost:5173', 8000) // default Vite port
]);

if (!serveReady || !devReady) {
    serveProc.kill();
    devProc.kill();
    throw new Error(`Stability check failed at iteration ${i} — service tidak respond dalam 8 detik.`);
}
```

> **Estimasi penghematan waktu:** Dari 50 detik/project menjadi rata-rata 5-10 detik/project — sekitar **80% lebih cepat**.

---

### 🟠 Temuan 3 — Port `8001` Hardcoded, Tidak Aman untuk Eksekusi Paralel

**Lokasi:** `agent/core/NexusEngine.js` — `cleanCodeAndVerify()`

**Kode Bermasalah:**
```javascript
// ❌ Port hardcoded — crash jika sudah dipakai
spawn('php', ['artisan', 'serve', '--port=8001'], { cwd: projectPath, shell: true });
```

**Dampak:** Jika dua section sandbox dijalankan bersamaan, atau ada proses lain yang sudah memakai port 8001, stability check akan **selalu gagal** dengan error yang membingungkan.

**Saran Perbaikan:**
```javascript
// ✅ Deteksi port yang tersedia secara dinamis
async getAvailablePort(start = 8001) {
    const net = require('net');
    return new Promise((resolve) => {
        const server = net.createServer();
        server.listen(start, () => {
            server.close(() => resolve(start));
        });
        server.on('error', () => {
            resolve(this.getAvailablePort(start + 1)); // coba port berikutnya
        });
    });
}

// Penggunaan:
const port = await this.getAvailablePort(8001);
const serveProc = spawn('php', ['artisan', 'serve', `--port=${port}`], {
    cwd: projectPath,
    shell: false // ✅ Sekalian perbaiki shell: true → shell: false
});
```

---

### 🟠 Temuan 4 — Tidak Ada Abort Otomatis Jika Ollama Offline

**Lokasi:** `agent/core/NexusEngine.js` — `blueprintApp()`

**Kode Bermasalah:**
```javascript
const response = await LocalIntelligence.generate(prompt, 'generate_architecture');

if (!response) {
    this.log(`❌ LLM failed to generate blueprint.`, 'error');
    return; // ❌ Silent return — sandbox tetap lanjut ke 99 project berikutnya
}
```

**Dampak:** Jika Ollama tidak aktif saat `nexus sandbox` dijalankan, **semua 100 project berjalan tanpa blueprint** — tidak ada peringatan abort, user baru sadar hasilnya kosong setelah berjam-jam menunggu.

**Saran Perbaikan:**
```javascript
// ✅ Hitung failure, abort jika Ollama jelas offline
if (!response) {
    this.metrics.blueprintFailures = (this.metrics.blueprintFailures || 0) + 1;
    this.log(
        `⚠️  Blueprint skipped — LLM tidak merespons. Project: ${path.basename(this.rootPath)}`,
        'warning'
    );

    // Jika 3 project berturut-turut gagal, kemungkinan besar Ollama offline
    if (this.metrics.blueprintFailures >= 3) {
        throw new NexusError(
            'BLUEPRINT',
            '❌ Ollama tampaknya tidak aktif (3 kegagalan berturut-turut). ' +
            'Jalankan `ollama serve` lalu coba kembali.'
        );
    }
    return;
}

// ✅ Reset counter jika berhasil
this.metrics.blueprintFailures = 0;
```

---

### 🟡 Temuan 5 — Tidak Ada Konfirmasi Sebelum `--distill` Overwrite Knowledge HUB

**Lokasi:** `agent/main.js` — alur `nexus sandbox --distill`

**Masalah:**
Dari help text:
```
nexus sandbox --distill   - Run all + distill knowledge to HUB
```
Proses distill di `NexusEngine.distill()` menulis ulang knowledge base HUB. Tidak ada konfirmasi apakah user benar-benar ingin menimpa data yang sudah ada.

**Dampak:** Knowledge HUB yang sudah dikurasi bisa tertimpa hasil sandbox yang belum tentu berkualitas, tanpa ada kesempatan untuk membatalkan.

**Saran Perbaikan:**
```javascript
// Di sandbox-master-runner.js sebelum menjalankan distill
if (sandboxArgs.includes('--distill')) {
    const existingFiles = await fs.readdir(hubPath).catch(() => []);
    if (existingFiles.length > 0) {
        console.log(`\n⚠️  Knowledge HUB saat ini berisi ${existingFiles.length} file.`);
        console.log(`   Flag --distill akan MENIMPA sebagian file tersebut.\n`);

        if (!sandboxArgs.includes('--yes')) {
            const confirm = await ask('Lanjutkan distill ke HUB? (y/n): ');
            if (confirm.toLowerCase() !== 'y') {
                console.log('🚫 Distill dibatalkan.');
                process.exit(0);
            }
        }
    }
}
```

---

### 🟡 Temuan 6 — Tidak Ada Progress Bar / ETA Selama Sandbox Berjalan

**Lokasi:** `tests/TDD/sandbox-master-runner.js` (diasumsikan berdasarkan struktur)

**Masalah:**
Saat `nexus sandbox` berjalan untuk 100 project, user hanya melihat log per-project yang terus scrolling tanpa tahu:
- Sudah di project ke berapa dari 100
- Berapa yang berhasil / gagal
- Estimasi waktu selesai

**Dampak:** UX yang buruk untuk proses yang berjalan 30-60+ menit. User tidak tahu apakah proses berjalan normal atau stuck.

**Saran Perbaikan:**
```javascript
// Di sandbox-master-runner.js — tambahkan progress tracker
const total = projects.length;
let passed = 0;
let failed = 0;
const startTime = Date.now();

for (let i = 0; i < total; i++) {
    const project = projects[i];
    const elapsed  = Math.round((Date.now() - startTime) / 1000);
    const eta      = i > 0 ? Math.round((elapsed / i) * (total - i)) : '?';
    const pct      = Math.round(((i + 1) / total) * 100);
    const bar      = '█'.repeat(Math.floor(pct / 5)) + '░'.repeat(20 - Math.floor(pct / 5));

    process.stdout.write(
        `\r[${bar}] ${pct}% | ` +
        `✅ ${passed} ❌ ${failed} | ` +
        `Project ${i + 1}/${total}: ${project.name.padEnd(30)} | ETA: ${eta}s    `
    );

    try {
        await runProjectCycle(project);
        passed++;
    } catch (e) {
        failed++;
        // Log ke file tanpa interrupt progress bar
        await fs.appendFile('logs/sandbox-errors.log', `[${project.name}] ${e.message}\n`);
    }
}

// ✅ Summary setelah selesai
console.log(`\n\n🏁 Sandbox Selesai: ${passed} berhasil, ${failed} gagal dari ${total} project.`);
console.log(`⏱  Total waktu: ${Math.round((Date.now() - startTime) / 1000)}s`);
```

---

## Checklist Perbaikan `nexus sandbox`

### Segera (Hari Ini)
- [ ] Tambahkan `fs.existsSync(runnerPath)` sebelum `spawn` di `main.js`
- [ ] Tambahkan `sandboxProc.on('error', ...)` untuk tangkap kegagalan spawn

### Sprint Ini
- [ ] Ganti `setTimeout(8000)` flat dengan active polling di `cleanCodeAndVerify()`
- [ ] Ganti port `8001` hardcoded dengan `getAvailablePort()` dinamis
- [ ] Ubah `shell: true` → `shell: false` di semua `spawn` dalam `cleanCodeAndVerify()`
- [ ] Tambahkan abort logic jika `blueprintFailures >= 3` (Ollama offline)

### Sprint Berikutnya
- [ ] Tambahkan konfirmasi interaktif sebelum `--distill` overwrite HUB
- [ ] Implementasi progress bar + ETA di `sandbox-master-runner.js`
- [ ] Tambahkan `logs/sandbox-errors.log` untuk capture kegagalan per-project

---

## Estimasi Dampak Setelah Perbaikan

| Aspek | Sebelum | Sesudah |
|---|---|---|
| **Waktu stability loop** (100 project) | ~83 menit | ~8-15 menit |
| **Deteksi Ollama offline** | Setelah semua selesai | Project ke-3 |
| **Kejelasan error** | Silent crash | Pesan jelas + exit code |
| **Risiko overwrite HUB** | Tidak ada perlindungan | Konfirmasi wajib |
| **Visibilitas progress** | Log scrolling tak terbaca | Progress bar + ETA |


---
> **METADATA (NEXUS SEMANTIC TAGS)**: [tdd]
