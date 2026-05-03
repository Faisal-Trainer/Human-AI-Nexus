# Human-AI Nexus Installer for Windows (Modern Structure)
$repoUrl = "https://github.com/Faisal-Trainer/Human-AI-Nexus/archive/refs/heads/main.zip"
$tempZip = "$env:TEMP\nexus.zip"
$tempDir = "$env:TEMP\nexus_extracted"

Write-Host "🤖 Menginstall Human-AI Nexus Framework (Modern)..." -ForegroundColor Cyan

# 1. Download Repository
Write-Host "📥 Mendownload file dari GitHub..."
Invoke-WebRequest -Uri $repoUrl -OutFile $tempZip

# 2. Extract ZIP
if (Test-Path $tempDir) { Remove-Item -Path $tempDir -Recurse -Force }
Expand-Archive -Path $tempZip -DestinationPath $tempDir

# 3. Cari folder source
$sourcePath = Get-ChildItem -Path $tempDir -Filter "Human-AI-Nexus-main" | Select-Object -First 1

$confirm = Read-Host "Pasang Nexus Framework (Modern Structure) di proyek ini? (y/n)"
if ($confirm.ToLower() -ne "y") {
    Write-Host "Instalasi dibatalkan." -ForegroundColor Red
    Remove-Item $tempZip
    Remove-Item $tempDir -Recurse -Force
    exit
}

# 1. Pasang Brain (agent/)
Write-Host "🧠 Memasang Brain (Agent & Tools)..."
if (-not (Test-Path "agent")) {
    New-Item -ItemType Directory -Path "agent" -Force | Out-Null
    
    $agentComponents = @("core", "tools", "prompts/external", "workflows/external")
    foreach ($comp in $agentComponents) {
        $src = "$($sourcePath.FullName)\agent\$comp"
        $dest = "agent\$comp"
        if (Test-Path $src) {
            $parent = Split-Path -Path $dest -Parent
            if (-not (Test-Path $parent)) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }
            Copy-Item -Path $src -Destination $parent -Recurse -Force
        }
    }
    
    if (Test-Path "$($sourcePath.FullName)\agent\main.js") {
        Copy-Item -Path "$($sourcePath.FullName)\agent\main.js" -Destination "agent\main.js" -Force
    }
    Write-Host "   ✅ Folder /agent terpasang." -ForegroundColor Green
} else {
    Write-Host "   ⚠️ Folder /agent sudah ada. Lewati." -ForegroundColor Yellow
}

# 2. Pasang Memory (memory/)
Write-Host "🧠 Menyiapkan Memory..."
if (-not (Test-Path "memory")) {
    New-Item -ItemType Directory -Path "memory\long_term" -Force | Out-Null
    New-Item -ItemType Directory -Path "memory\short_term" -Force | Out-Null
    Write-Host "   ✅ Folder /memory terpasang." -ForegroundColor Green
}

# 3. Pasang Dokumentasi (documentation/)
Write-Host "📂 Menata Dokumentasi (HUB)..."
if (-not (Test-Path "documentation")) {
    New-Item -ItemType Directory -Path "documentation" -Force | Out-Null
}
$docSubfolders = @("summary", "algorithms", "audit", "knowledge", "planning", "records", "legal", "docs")
foreach ($sub in $docSubfolders) {
    if (-not (Test-Path "documentation\$sub")) {
        New-Item -ItemType Directory -Path "documentation\$sub" -Force | Out-Null
    }
}
Write-Host "   ✅ Struktur /documentation siap." -ForegroundColor Green

# 4. Salin file utama ke root proyek
$algoFile = "ALGORITMA_INTEGRASI.md"
$algoSrc = "$($sourcePath.FullName)\documentation\algorithms\$algoFile"
if (Test-Path $algoSrc) {
    Copy-Item -Path $algoSrc -Destination "." -Force
    Write-Host "   ✅ File $algoFile terpasang di root." -ForegroundColor Green
}

# 5. Cleanup
Remove-Item $tempZip
Remove-Item $tempDir -Recurse -Force

Write-Host "`n✅ Instalasi Berhasil! Struktur modern (/agent, /memory, /documentation) telah siap." -ForegroundColor Green
Write-Host "🚀 Jalankan 'nexus run' untuk memulai kolaborasi dengan AI." -ForegroundColor Cyan
