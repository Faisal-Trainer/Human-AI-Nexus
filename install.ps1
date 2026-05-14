# ============================================================
# Human-AI Nexus Installer for Windows (PowerShell)
# Version: 3.2.0 — Stability Guardrail Edition
# ============================================================
$repoUrl = "https://github.com/Faisal-Trainer/Human-AI-Nexus/archive/refs/heads/main.zip"
$tempZip = "$env:TEMP\nexus.zip"
$tempDir = "$env:TEMP\nexus_extracted"

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "  ║     🤖 Human-AI Nexus Installer v3.2.0      ║" -ForegroundColor Cyan
Write-Host "  ║     Stability Guardrail Edition              ║" -ForegroundColor Cyan
Write-Host "  ╚══════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# 1. Download Repository
Write-Host "📥 Mendownload dari GitHub..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $repoUrl -OutFile $tempZip -UseBasicParsing
    Write-Host "   ✅ Download selesai." -ForegroundColor Green
} catch {
    Write-Host "   ❌ Gagal download: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 2. Extract ZIP
Write-Host "📦 Mengekstrak file..." -ForegroundColor Yellow
if (Test-Path $tempDir) { Remove-Item -Path $tempDir -Recurse -Force }
Expand-Archive -Path $tempZip -DestinationPath $tempDir
$sourcePath = Get-ChildItem -Path $tempDir -Filter "Human-AI-Nexus-main" | Select-Object -First 1

if (-not $sourcePath) {
    Write-Host "   ❌ Gagal menemukan folder sumber dalam ZIP." -ForegroundColor Red
    exit 1
}

# 3. Konfirmasi
Write-Host ""
$confirm = Read-Host "Pasang Nexus External Brain & Docs di proyek ini? (y/n)"
if ($confirm.ToLower() -ne "y") {
    Write-Host "Instalasi dibatalkan." -ForegroundColor Red
    Remove-Item $tempZip -Force
    Remove-Item $tempDir -Recurse -Force
    exit
}

# Folder Utama Nexus
$nexusBase = "nexus"
if (-not (Test-Path $nexusBase)) {
    New-Item -ItemType Directory -Path $nexusBase -Force | Out-Null
    Write-Host "   📁 Folder /$nexusBase dibuat." -ForegroundColor Gray
}

# ─── SECURITY HARDENING ───────────────────────────────────────────
Write-Host ""
Write-Host "🛡️  Menyiapkan Keamanan..." -ForegroundColor Yellow

# Auto-Gitignore
$gitignorePath = ".gitignore"
$entry = "`n# Human-AI Nexus`nnexus/`n"
if (Test-Path $gitignorePath) {
    $content = Get-Content $gitignorePath -Raw
    if (-not $content.Contains("nexus/")) {
        Add-Content -Path $gitignorePath -Value $entry
        Write-Host "   ✅ Security: 'nexus/' ditambahkan ke .gitignore." -ForegroundColor Green
    }
} else {
    Set-Content -Path $gitignorePath -Value $entry
    Write-Host "   ✅ Security: .gitignore baru dibuat." -ForegroundColor Green
}

# Access Protection (.htaccess)
$htaccessPath = "$nexusBase\.htaccess"
if (-not (Test-Path $htaccessPath)) {
    Set-Content -Path $htaccessPath -Value "Deny from all"
    Write-Host "   ✅ Security: .htaccess (Deny from all) terpasang." -ForegroundColor Green
}

# ─── EXTERNAL BRAIN (agent/prompts + workflows) ───────────────────
Write-Host ""
Write-Host "🧠 Memasang External Brain..." -ForegroundColor Yellow
$agentPath = "$nexusBase\agent"
if (-not (Test-Path $agentPath)) {
    New-Item -ItemType Directory -Path $agentPath -Force | Out-Null

    $pSrc = $sourcePath.FullName + "\agent\prompts\external"
    if (Test-Path $pSrc) {
        New-Item -ItemType Directory -Path "$agentPath\prompts" -Force | Out-Null
        Copy-Item -Path ($pSrc + "\*") -Destination "$agentPath\prompts" -Recurse -Force
        Write-Host "   ✅ Prompts eksternal terpasang." -ForegroundColor Green
    }

    $wSrc = $sourcePath.FullName + "\agent\workflows\external"
    if (Test-Path $wSrc) {
        New-Item -ItemType Directory -Path "$agentPath\workflows" -Force | Out-Null
        Copy-Item -Path ($wSrc + "\*") -Destination "$agentPath\workflows" -Recurse -Force
        Write-Host "   ✅ Workflows eksternal terpasang." -ForegroundColor Green
    }
} else {
    Write-Host "   ⚠️  Folder /agent sudah ada. Lewati." -ForegroundColor Yellow
}

# ─── MEMORY (Multi-Agent Standard v2.0) ──────────────────────────
Write-Host ""
Write-Host "🧠 Menyiapkan Memory (Multi-Agent Standard v2.0)..." -ForegroundColor Yellow
$memPath = "$nexusBase\memory"
if (-not (Test-Path $memPath)) {
    $folders = @("raw", "normalized", "semantic", "distilled", "operational", "archived", "short_term")
    foreach ($folder in $folders) {
        New-Item -ItemType Directory -Path "$memPath\$folder" -Force | Out-Null
    }
    # Rack structure di dalam distilled
    $racks = @("security", "performance", "ui-ux", "standards", "database", "academics", "other")
    foreach ($rack in $racks) {
        New-Item -ItemType Directory -Path "$memPath\distilled\$rack" -Force | Out-Null
    }
    Write-Host "   ✅ Memory terpasang (7 folders + distilled racks)." -ForegroundColor Green
} else {
    # Pastikan short_term ada (upgrade dari v3.1)
    if (-not (Test-Path "$memPath\short_term")) {
        New-Item -ItemType Directory -Path "$memPath\short_term" -Force | Out-Null
        Write-Host "   ✅ Upgrade: memory/short_term/ ditambahkan." -ForegroundColor Green
    }
}

# ─── LOGS + DEAD LETTER QUEUE (Observability v2.0) ───────────────
Write-Host ""
Write-Host "📊 Menyiapkan Logs & Observability v2.0..." -ForegroundColor Yellow
$logsPath = "$nexusBase\logs"
if (-not (Test-Path $logsPath)) {
    $logFolders = @("agents", "orchestration", "memory", "scanners", "plugins", "errors")
    foreach ($folder in $logFolders) {
        New-Item -ItemType Directory -Path "$logsPath\$folder" -Force | Out-Null
    }
    # Dead Letter Queue — file JSON kosong untuk menyimpan task gagal
    $dlqPath = "$logsPath\dead_letter_queue.json"
    Set-Content -Path $dlqPath -Value "[]"
    Write-Host "   ✅ Logs + Dead Letter Queue terpasang." -ForegroundColor Green
} else {
    # Pastikan DLQ ada (upgrade dari v3.1)
    $dlqPath = "$logsPath\dead_letter_queue.json"
    if (-not (Test-Path $dlqPath)) {
        Set-Content -Path $dlqPath -Value "[]"
        Write-Host "   ✅ Upgrade: dead_letter_queue.json ditambahkan." -ForegroundColor Green
    }
}

# ─── DOKUMENTASI ──────────────────────────────────────────────────
Write-Host ""
Write-Host "📂 Menata Dokumentasi..." -ForegroundColor Yellow
$docPath = "$nexusBase\documentation"
if (-not (Test-Path $docPath)) {
    New-Item -ItemType Directory -Path "$docPath\nexus_rules" -Force | Out-Null
}
$docSubfolders = @("security", "performance", "ui-ux", "standards", "database", "academics", "planning", "audit")
foreach ($sub in $docSubfolders) {
    if (-not (Test-Path "$docPath\$sub")) {
        New-Item -ItemType Directory -Path "$docPath\$sub" -Force | Out-Null
    }
}
Write-Host "   ✅ Struktur dokumentasi siap." -ForegroundColor Green

# ─── FILE UTAMA ────────────────────────────────────────────────────
$algoFile = "ALGORITMA_INTEGRASI.md"
$readmeFile = "README.md"
$algoSrc = $sourcePath.FullName + "\documentation\algorithms\" + $algoFile
$readmeSrc = $sourcePath.FullName + "\" + $readmeFile

if (Test-Path $algoSrc) {
    Copy-Item -Path $algoSrc -Destination "." -Force
    Copy-Item -Path $algoSrc -Destination $nexusBase -Force
    Write-Host "   ✅ $algoFile terpasang." -ForegroundColor Green
}
if (Test-Path $readmeSrc) {
    Copy-Item -Path $readmeSrc -Destination $nexusBase -Force
    Write-Host "   ✅ $readmeFile terpasang di /$nexusBase/." -ForegroundColor Green
}

# ─── CLEANUP ──────────────────────────────────────────────────────
Remove-Item $tempZip -Force
Remove-Item $tempDir -Recurse -Force

# ─── RINGKASAN AKHIR ──────────────────────────────────────────────
Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "  ║     ✅ Instalasi Berhasil! v3.2.0            ║" -ForegroundColor Green
Write-Host "  ╚══════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "  📁 Semua komponen ada di: ./$nexusBase/" -ForegroundColor Cyan
Write-Host ""
Write-Host "  🚀 Perintah yang tersedia:" -ForegroundColor White
Write-Host "     nexus run           — Full cycle: Audit → Plan → Execute" -ForegroundColor Gray
Write-Host "     nexus status        — Real-time health (CPU, RAM, agents)" -ForegroundColor Gray
Write-Host "     nexus audit         — Hanya fase Audit" -ForegroundColor Gray
Write-Host "     nexus harvest <dir> — Panen dokumen dari proyek lain" -ForegroundColor Gray
Write-Host "     nexus distill       — Distilasi knowledge HUB" -ForegroundColor Gray
Write-Host "     nexus think <query> — Tanya local AI" -ForegroundColor Gray
Write-Host "     nexus help          — Lihat semua perintah" -ForegroundColor Gray
Write-Host ""
Write-Host "  💡 Jalankan via NPX:" -ForegroundColor Yellow
Write-Host "     npx @faisal-trainer/human-ai-nexus nexus run" -ForegroundColor Yellow
Write-Host ""
