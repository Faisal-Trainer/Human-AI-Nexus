# launch_nexus.ps1
# Shortcut untuk menjalankan Nexus AI Orchestrator

$NexusRoot = "C:\Users\ACER\Desktop\NEXUS AI"
Set-Location $NexusRoot

Write-Host "🤖 Membuka Human-AI Nexus Core..." -ForegroundColor Cyan
node agent/main.js
