# Human-AI Nexus Installer for Windows (External Only - Unified & Lean)
$repoUrl = "https://github.com/Faisal-Trainer/Human-AI-Nexus/archive/refs/heads/main.zip"
$tempZip = "$env:TEMP\nexus.zip"
$tempDir = "$env:TEMP\nexus_extracted"

Write-Host "🤖 Menginstall Nexus External Framework (Unified & Lean)..." -ForegroundColor Cyan

# 1. Download Repository
Write-Host "📥 Mendownload file dari GitHub..."
Invoke-WebRequest -Uri $repoUrl -OutFile $tempZip

# 2. Extract ZIP
if (Test-Path $tempDir) { Remove-Item -Path $tempDir -Recurse -Force }
Expand-Archive -Path $tempZip -DestinationPath $tempDir

# 3. Cari folder source
$sourcePath = Get-ChildItem -Path $tempDir -Filter "Human-AI-Nexus-main" | Select-Object -First 1

$confirm = Read-Host "Pasang Nexus External Brain & Docs di proyek ini? (y/n)"
if ($confirm.ToLower() -ne "y") {
    Write-Host "Instalasi dibatalkan." -ForegroundColor Red
    Remove-Item $tempZip
    Remove-Item $tempDir -Recurse -Force
    exit
}

# Folder Utama Nexus
$nexusBase = "nexus"
if (-not (Test-Path $nexusBase)) {
    New-Item -ItemType Directory -Path $nexusBase -Force | Out-Null
}

# 1. Pasang Brain (nexus/agent/) - HANYA EKSTERNAL
Write-Host "🧠 Memasang External Brain (Prompts & Workflows)..."
$agentPath = "$nexusBase\agent"
if (-not (Test-Path $agentPath)) {
    New-Item -ItemType Directory -Path $agentPath -Force | Out-Null
    
    # Salin Prompts Eksternal
    $pSrc = $sourcePath.FullName + "\agent\prompts\external"
    if (Test-Path $pSrc) {
        New-Item -ItemType Directory -Path "$agentPath\prompts" -Force | Out-Null
        Copy-Item -Path ($pSrc + "\*") -Destination "$agentPath\prompts" -Recurse -Force
    }

    # Salin Workflows Eksternal
    $wSrc = $sourcePath.FullName + "\agent\workflows\external"
    if (Test-Path $wSrc) {
        New-Item -ItemType Directory -Path "$agentPath\workflows" -Force | Out-Null
        Copy-Item -Path ($wSrc + "\*") -Destination "$agentPath\workflows" -Recurse -Force
    }
    
    Write-Host "   ✅ Brain Eksternal terpasang." -ForegroundColor Green
} else {
    Write-Host "   ⚠️ Folder /$agentPath sudah ada. Lewati." -ForegroundColor Yellow
}

# 2. Pasang Memory (nexus/memory/)
Write-Host "🧠 Menyiapkan Memory (Recursive Rack Structure)..."
$memPath = "$nexusBase\memory"
if (-not (Test-Path $memPath)) {
    $racks = @("security", "performance", "ui-ux", "standards", "database", "academics", "other")
    foreach ($rack in $racks) {
        New-Item -ItemType Directory -Path "$memPath\long_term\$rack" -Force | Out-Null
    }
    New-Item -ItemType Directory -Path "$memPath\short_term" -Force | Out-Null
    Write-Host "   ✅ Folder /$memPath terpasang dengan struktur Rak Pintar." -ForegroundColor Green
}

# 3. Pasang Dokumentasi (nexus/documentation/)
Write-Host "📂 Menata Dokumentasi (HUB & Governance)..."
$docPath = "$nexusBase\documentation"
if (-not (Test-Path $docPath)) {
    New-Item -ItemType Directory -Path "$docPath\nexus_rules" -Force | Out-Null
}
# Struktur Lean sesuai permintaan user
$docSubfolders = @("security", "performance", "ui-ux", "standards", "database", "academics")
foreach ($sub in $docSubfolders) {
    if (-not (Test-Path "$docPath\$sub")) {
        New-Item -ItemType Directory -Path "$docPath\$sub" -Force | Out-Null
    }
}
Write-Host "   ✅ Struktur /$docPath siap (Mirror Rack Mode)." -ForegroundColor Green

# 4. Salin file utama ke root proyek (Akses Cepat)
$algoFile = "ALGORITMA_INTEGRASI.md"
$algoSrc = $sourcePath.FullName + "\documentation\algorithms\" + $algoFile
if (Test-Path $algoSrc) {
    Copy-Item -Path $algoSrc -Destination "." -Force
    Write-Host "   ✅ File $algoFile terpasang di root proyek." -ForegroundColor Green
}

# 5. Cleanup
Remove-Item $tempZip
Remove-Item $tempDir -Recurse -Force

Write-Host "`n✅ Instalasi Berhasil! Komponen eksternal rapi di dalam /$nexusBase/." -ForegroundColor Green
Write-Host "🚀 Gunakan npx untuk menjalankan engine (Documentation Assistant)." -ForegroundColor Cyan
