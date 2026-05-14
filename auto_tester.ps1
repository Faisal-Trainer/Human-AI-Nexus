$targetSuccesses = 3
$currentSuccesses = 0
$attempt = 1

while ($currentSuccesses -lt $targetSuccesses) {
    Write-Host "`n========================================================" -ForegroundColor Cyan
    Write-Host "⏳ STARTING ATTEMPT #$attempt (Success count: $currentSuccesses/$targetSuccesses)" -ForegroundColor Yellow
    Write-Host "========================================================" -ForegroundColor Cyan
    
    # Run the command and wait for it to finish
    node cli.js sandbox
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Attempt #$attempt SUCCEEDED!" -ForegroundColor Green
        $currentSuccesses++
    } else {
        Write-Host "`n❌ Attempt #$attempt FAILED with exit code: $LASTEXITCODE" -ForegroundColor Red
        Write-Host "⚠️ Resetting success count from $currentSuccesses to 0 as requested..." -ForegroundColor Yellow
        $currentSuccesses = 0
    }
    $attempt++
}

Write-Host "`n🎉 COMPLETELY SUCCESSFUL $targetSuccesses TIMES IN A ROW!" -ForegroundColor Green
