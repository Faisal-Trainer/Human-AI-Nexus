# Human-AI Nexus Installer for Windows
$repoUrl = "https://github.com/Faisal-Trainer/Human-AI-Nexus/archive/refs/heads/main.zip"
$tempZip = "$env:TEMP\nexus.zip"
$tempDir = "$env:TEMP\nexus_extracted"

Write-Host "🤖 Menginstall Human-AI Nexus Framework..." -ForegroundColor Cyan

# 1. Download Repository
Write-Host "📥 Mendownload file dari GitHub..."
Invoke-WebRequest -Uri $repoUrl -OutFile $tempZip

# 2. Extract ZIP
if (Test-Path $tempDir) { Remove-Item -Path $tempDir -Recurse -Force }
Expand-Archive -Path $tempZip -DestinationPath $tempDir

# 3. Pindahkan folder framework
$sourcePath = Get-ChildItem -Path $tempDir -Filter "Human-AI-Nexus-main" | Select-Object -First 1

Write-Host "📂 Menata folder dokumentasi..."
if (-not (Test-Path "nexus")) {
    New-Item -ItemType Directory -Path "nexus" -Force | Out-Null
    
    # Daftar folder yang akan disalin ke dalam /nexus
    $folders = @("agent", "algorithms", "design", "planning", "skill", "records", "summary", "legal")
    
    foreach ($folder in $folders) {
        if (Test-Path "$($sourcePath.FullName)\$folder") {
            Copy-Item -Path "$($sourcePath.FullName)\$folder" -Destination "nexus" -Recurse -Force
        }
    }
    
    # Salin file utama ke root proyek
    if (Test-Path "$($sourcePath.FullName)\ALGORITMA_INTEGRASI.md") {
        Copy-Item -Path "$($sourcePath.FullName)\ALGORITMA_INTEGRASI.md" -Destination "." -Force
    }
    
    Write-Host "✅ Instalasi Berhasil! Folder /nexus dan ALGORITMA_INTEGRASI.md telah ditambahkan." -ForegroundColor Green
} else {
    Write-Host "⚠️ Folder /nexus sudah ada. Instalasi dibatalkan untuk mencegah penimpaan data." -ForegroundColor Yellow
}

# 4. Cleanup
Remove-Item $tempZip
Remove-Item $tempDir -Recurse -Force

Write-Host "🚀 Siap berkolaborasi dengan AI! Silakan baca ALGORITMA_INTEGRASI.md untuk memulai." -ForegroundColor Cyan
