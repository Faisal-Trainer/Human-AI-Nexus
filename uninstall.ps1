# Human-AI Nexus Safe Uninstaller for Windows
Write-Host "🤖 Memulai Nexus Safe Uninstaller..." -ForegroundColor Cyan

$targetDir = Get-Location
$nexusBase = "nexus"
$nexusPath = Join-Path $targetDir $nexusBase

if (Test-Path $nexusPath) {
    Write-Host "⚠️ PERINGATAN: Anda akan menghapus komponen engine Nexus dari $targetDir" -ForegroundColor Red
    Write-Host "ℹ️ Info: Folder 'documentation' akan tetap dipertahankan." -ForegroundColor Cyan
    
    $confirm = Read-Host "Apakah Anda yakin ingin melanjutkan? (y/n)"
    if ($confirm.ToLower() -ne "y") {
        Write-Host "Uninstall dibatalkan." -ForegroundColor Yellow
        exit
    }

    Write-Host "`n🚀 Menghapus komponen engine..." -ForegroundColor Yellow
    
    # Ambil semua item di dalam folder nexus
    $items = Get-ChildItem -Path $nexusPath
    
    foreach ($item in $items) {
        if ($item.Name -ne "documentation") {
            Remove-Item -Path $item.FullName -Recurse -Force
            Write-Host "   🗑️ Deleted: nexus/$($item.Name)" -ForegroundColor Gray
        }
    }

    Write-Host "`n✅ Nexus Engine & Memory telah dihapus." -ForegroundColor Green
    Write-Host "ℹ️ Folder 'nexus/documentation/' tetap dipertahankan untuk riwayat audit." -ForegroundColor Cyan
    Write-Host "`n✨ Uninstall Berhasil (Dokumentasi Aman).`n" -ForegroundColor Green
} else {
    Write-Host "❌ Folder '$nexusBase' tidak ditemukan di direktori ini." -ForegroundColor Red
}
