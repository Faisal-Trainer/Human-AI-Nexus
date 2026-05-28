# ============================================================
# NEXUS AUTONOMOUS SANDBOX RUNNER - PowerShell Script (Windows)
# Menjalankan seluruh pipeline sandbox secara mandiri.
# ============================================================
# Penggunaan:
#   .\nexus-sandbox.ps1                  - semua section + distill
#   .\nexus-sandbox.ps1 -Section <1-10>  - hanya jalankan section tertentu
#   .\nexus-sandbox.ps1 -NoDistill       - tanpa distill
#   .\nexus-sandbox.ps1 -Status          - cek status sistem
# ============================================================
param(
    [int]$Section = 0,          # 0 = semua
    [switch]$NoDistill,
    [switch]$Status
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir   = $ScriptDir
$TddDir    = Join-Path $RootDir "tests\TDD"
$LogDir    = Join-Path $RootDir "logs"
$LogFile   = Join-Path $LogDir "sandbox-runner-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"

# Pastikan log dir ada
if (-not (Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir -Force | Out-Null }

function Log {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
    Add-Content -Path $LogFile -Value $Message
}

function LogHeader {
    param([string]$Title)
    Log ""
    Log ("=" * 60) "DarkGray"
    Log "  $Title" "Cyan"
    Log ("=" * 60) "DarkGray"
}

# -- Status mode ----------------------------------------------
if ($Status) {
    Log "[STATUS] Checking Nexus system status..." "Yellow"
    bun "$RootDir\agent\main.js" status
    exit 0
}

# -- Header ---------------------------------------------------
LogHeader "[NEXUS] AUTONOMOUS SANDBOX RUNNER (Windows)"
Log "  Date     : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" "Gray"
Log "  Root     : $RootDir" "Gray"
Log "  Section  : $(if ($Section -eq 0) {'ALL'} else {$Section})" "Gray"
Log "  Log file : $LogFile" "Gray"
Log ""

# -- Prerequisite checks --------------------------------------
Log "[CHECK] Checking prerequisites..." "Yellow"

try {
    $bunVer = bun --version 2>&1
    Log "   [OK] Bun: $bunVer" "Green"
} catch {
    Log "   [ERROR] Bun tidak ditemukan. Install: https://bun.sh" "Red"
    exit 1
}

try {
    $phpVer = (php --version 2>&1)[0]
    Log "   [OK] PHP: $phpVer" "Green"
} catch {
    Log "   [WARN] PHP tidak ditemukan - migrate:fresh akan di-skip." "Yellow"
}

# -- C++ & Native Orchestrator Check ------------------------
try {
    $clangVer = (clang++ --version 2>&1)[0]
    Log "   [OK] Clang++: $clangVer" "Green"
} catch {
    Log "   [WARN] Clang++ tidak ditemukan. Kompilasi native tidak tersedia." "Yellow"
}

$orchPath = Join-Path $RootDir "nexus\native\sandbox_orchestrator.exe"
if (Test-Path $orchPath) {
    Log "   [OK] Native Orchestrator: Ready (C++)" "Green"
} else {
    Log "   [WARN] Native Orchestrator belum dikompilasi. Menggunakan Node.js fallback." "Yellow"
}


$templatePath = Join-Path $RootDir "tests\sandboxes\url-shortener"
if (-not (Test-Path $templatePath)) {
    Log "   [ERROR] Template TALL tidak ditemukan: $templatePath" "Red"
    Log "   Pastikan sandbox url-shortener sudah ada." "Red"
    exit 1
}
Log "   [OK] TALL Template: url-shortener ditemukan" "Green"
Log ""

$StartTime = Get-Date

# -- Run section function --------------------------------------
function Invoke-NexusSection {
    param([int]$Num, [string]$File, [string]$Label)

    LogHeader "[RUNNING] $Label"
    Log "   File: $TddDir\$File" "Gray"
    Log ""

    # Split file and arguments dynamically
    $fileParts  = $File -split " "
    $scriptFile = $fileParts[0]
    $scriptArgs = $fileParts[1..($fileParts.Length-1)]

    Log "   [INFO] Memuat modul Bun & inisialisasi AI agent... (mohon tunggu)" "Yellow"
    Log ""

    # Jalankan bun secara direct di foreground agar output mengalir real-time ke console
    $exitCode = 0
    try {
        if ($scriptArgs) {
            bun "$TddDir\$scriptFile" $scriptArgs
        } else {
            bun "$TddDir\$scriptFile"
        }
        $exitCode = $LASTEXITCODE
    } catch {
        $exitCode = 1
    }

    if ($exitCode -eq 0) {
        Log "   [OK] $Label - BERHASIL" "Green"
        return $true
    } else {
        Log "   [ERROR] $Label - GAGAL (exit code: $exitCode)" "Red"
        return $false
    }
}

$FailedCount = 0

for ($i = 1; $i -le 10; $i++) {
    if ($Section -eq 0 -or $Section -eq $i) {
        $ok = $false
        if ($i -eq 1) {
            $ok = Invoke-NexusSection -Num 1 -File "phase1_testing.js" -Label "Section 1 - Fundamental CRUD & Auth (9 projects)"
        } elseif ($i -eq 2) {
            $ok = Invoke-NexusSection -Num 2 -File "setup_section2.js" -Label "Section 2 - Dashboard & Admin Panel (10 projects)"
        } elseif ($i -eq 3) {
            $ok = Invoke-NexusSection -Num 3 -File "setup_section3.js" -Label "Section 3 - Security & Realtime (11 projects)"
        } else {
            # pass the section number as an argument to the file
            $ok = Invoke-NexusSection -Num $i -File "setup_dynamic_section.js $i" -Label "Section $i"
        }
        if (-not $ok) { $FailedCount++ }
    }
}


# -- Distill knowledge -----------------------------------------
if (-not $NoDistill -and $Section -eq 0) {
    LogHeader "[DISTILL] Distilasi Knowledge ke HUB"
    $exitCode = 0
    try {
        bun "$RootDir\agent\main.js" distill
        $exitCode = $LASTEXITCODE
    } catch {
        $exitCode = 1
    }
    if ($exitCode -eq 0) {
        Log "   [OK] Distilasi selesai." "Green"
    } else {
        Log "   [WARN] Distilasi gagal - jalankan manual: nexus distill" "Yellow"
    }
}

# -- Final Report ----------------------------------------------
$EndTime   = Get-Date
$Elapsed   = [math]::Round(($EndTime - $StartTime).TotalMinutes, 1)

LogHeader "[REPORT] LAPORAN AKHIR"
Log "   Total waktu  : $Elapsed menit" "Gray"
Log "   Section gagal: $FailedCount" "$(if ($FailedCount -gt 0) {'Red'} else {'Green'})"
Log "   Log tersimpan: $LogFile" "Gray"
Log ""

if ($FailedCount -gt 0) {
    Log "   [WARN] Ada section yang gagal. Review log di atas." "Yellow"
    Log "   Jalankan ulang: .\nexus-sandbox.ps1 -Section [1|2|3]" "Yellow"
    exit 1
} else {
    Log "   [SUCCESS] Semua section selesai! 100 sandboxes siap digunakan." "Green"
    Log "   Jalankan: bun agent\main.js status" "Cyan"
    Log "   Masuk ke sandbox: cd tests\sandboxes\[nama-project]" "Cyan"
    Log "   Jalankan server: php artisan serve && npm run dev" "Cyan"
}

Log ""
