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

# 🔒 Security Hardening: Auto-Gitignore
Write-Host "🛡️ Menyiapkan Keamanan (Gitignore)..."
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
    Write-Host "   ✅ Security: .gitignore baru dibuat dengan entri 'nexus/'." -ForegroundColor Green
}

# 🔒 Security Hardening: Access Protection (.htaccess)
Write-Host "🛡️ Menyiapkan Keamanan (Access Protection)..."
$htaccessPath = "$nexusBase\.htaccess"
if (-not (Test-Path $htaccessPath)) {
    Set-Content -Path $htaccessPath -Value "Deny from all"
    Write-Host "   ✅ Security: Access Protection (.htaccess) terpasang." -ForegroundColor Green
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
Write-Host "🧠 Menyiapkan Memory (Multi-Agent Standard)..."
$memPath = "$nexusBase\memory"
if (-not (Test-Path $memPath)) {
    $folders = @("raw", "normalized", "semantic", "distilled", "operational", "archived")
    foreach ($folder in $folders) {
        New-Item -ItemType Directory -Path "$memPath\$folder" -Force | Out-Null
    }
    # Tambahkan Racks di dalam distilled
    $racks = @("security", "performance", "ui-ux", "standards", "database", "academics", "other")
    foreach ($rack in $racks) {
        New-Item -ItemType Directory -Path "$memPath\distilled\$rack" -Force | Out-Null
    }
    Write-Host "   ✅ Folder /$memPath terpasang dengan struktur Multi-Agent." -ForegroundColor Green
}

# 2.5 Pasang Logs (nexus/logs/)
Write-Host "📊 Menyiapkan Logs Observability..."
$logsPath = "$nexusBase\logs"
if (-not (Test-Path $logsPath)) {
    $logFolders = @("agents", "orchestration", "memory", "scanners", "plugins", "errors")
    foreach ($folder in $logFolders) {
        New-Item -ItemType Directory -Path "$logsPath\$folder" -Force | Out-Null
    }
    Write-Host "   ✅ Folder /$logsPath terpasang." -ForegroundColor Green
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

# 4. Salin file utama ke root proyek & folder nexus
$algoFile = "ALGORITMA_INTEGRASI.md"
$readmeFile = "README.md"
$algoSrc = $sourcePath.FullName + "\documentation\algorithms\" + $algoFile
$readmeSrc = $sourcePath.FullName + "\" + $readmeFile

# Salin ke root (Akses Cepat)
if (Test-Path $algoSrc) {
    Copy-Item -Path $algoSrc -Destination "." -Force
    Write-Host "   ✅ File $algoFile terpasang di root proyek." -ForegroundColor Green
}

# Salin ke folder nexus (Mandiri)
if (Test-Path $algoSrc) {
    Copy-Item -Path $algoSrc -Destination $nexusBase -Force
    Write-Host "   ✅ File $algoFile terpasang di dalam /$nexusBase/." -ForegroundColor Green
}
if (Test-Path $readmeSrc) {
    Copy-Item -Path $readmeSrc -Destination $nexusBase -Force
    Write-Host "   ✅ File $readmeFile terpasang di dalam /$nexusBase/." -ForegroundColor Green
}

# 5. Cleanup
Remove-Item $tempZip
Remove-Item $tempDir -Recurse -Force

Write-Host "`n✅ Instalasi Berhasil! Komponen eksternal rapi di dalam /$nexusBase/." -ForegroundColor Green
Write-Host "🚀 Gunakan npx untuk menjalankan engine (Documentation Assistant)." -ForegroundColor Cyan
