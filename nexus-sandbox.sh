#!/bin/bash
# ============================================================
# NEXUS AUTONOMOUS SANDBOX RUNNER — Bash Script
# Menjalankan seluruh pipeline sandbox secara mandiri.
# ============================================================
# Penggunaan:
#   chmod +x nexus-sandbox.sh
#   ./nexus-sandbox.sh              — semua section + distill
#   ./nexus-sandbox.sh --section 1  — hanya section 1
#   ./nexus-sandbox.sh --section 2  — hanya section 2
#   ./nexus-sandbox.sh --section 3  — hanya section 3
#   ./nexus-sandbox.sh --no-distill — tanpa distill setelah selesai
#   ./nexus-sandbox.sh --status     — cek status sistem dulu
# ============================================================

set +e  # Don't stop on errors — we track failures via FAILED_SECTIONS counter

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR"
TDD_DIR="$ROOT_DIR/tests/TDD"
LOG_DIR="$ROOT_DIR/logs"
LOG_FILE="$LOG_DIR/sandbox-runner-$(date +%Y%m%d-%H%M%S).log"
SECTION=""
NO_DISTILL=false

# ── Parse arguments ──────────────────────────────────────────
while [[ $# -gt 0 ]]; do
    case $1 in
        --section)
            SECTION="$2"
            shift 2
            ;;
        --no-distill)
            NO_DISTILL=true
            shift
            ;;
        --status)
            echo "🔍 Checking Nexus system status..."
            bun "$ROOT_DIR/agent/main.js" status
            exit 0
            ;;
        --help|-h)
            echo ""
            echo "  NEXUS Autonomous Sandbox Runner"
            echo ""
            echo "  Usage:"
            echo "    ./nexus-sandbox.sh               Run all sections + distill"
            echo "    ./nexus-sandbox.sh --section <1-10> Run a specific Section only"
            echo "    ./nexus-sandbox.sh --no-distill  Skip distill after run"
            echo "    ./nexus-sandbox.sh --status      Show system health"
            echo ""
            exit 0
            ;;
        *)
            shift
            ;;
    esac
done

# ── Ensure log dir exists ────────────────────────────────────
mkdir -p "$LOG_DIR"

# ── Utility functions ────────────────────────────────────────
log() { echo "$1" | tee -a "$LOG_FILE"; }
log_header() {
    log ""
    log "══════════════════════════════════════════════════════════"
    log "  $1"
    log "══════════════════════════════════════════════════════════"
}

# ── Header ───────────────────────────────────────────────────
log_header "🤖 NEXUS AUTONOMOUS SANDBOX RUNNER"
log "  Date     : $(date '+%Y-%m-%d %H:%M:%S')"
log "  Root     : $ROOT_DIR"
log "  Section  : ${SECTION:-ALL}"
log "  Log file : $LOG_FILE"
log ""

# ── Prerequisite checks ──────────────────────────────────────
log "🔎 Checking prerequisites..."

if ! command -v bun &> /dev/null; then
    log "❌ Bun tidak ditemukan. Install dulu: https://bun.sh"
    exit 1
fi
BUN_VER=$(bun --version)
log "   ✅ Bun: $BUN_VER"

if ! command -v php &> /dev/null; then
    log "⚠️  PHP tidak ditemukan — migrate:fresh akan di-skip tapi pipeline tetap lanjut."
else
    PHP_VER=$(php --version | head -1)
    log "   ✅ PHP: $PHP_VER"
fi

TEMPLATE_PATH="$ROOT_DIR/tests/sandboxes/laravel-fresh-template"
if [ ! -d "$TEMPLATE_PATH" ]; then
    log "⚠️  Template Laravel belum ada: $TEMPLATE_PATH"
    log "   SandboxProjectSetup akan membuatnya otomatis via 'composer create-project'."
fi
log "   ✅ Template check passed"
log ""

START_TIME=$(date +%s)

# ── Jalankan section berdasarkan argumen ─────────────────────
run_section() {
    local section_num="$1"
    local section_file="$2"
    local section_label="$3"
    shift 3
    local section_args=("$@")

    log_header "🚀 $section_label"
    log "   File: $TDD_DIR/$section_file"
    log ""

    if bun "$TDD_DIR/$section_file" "${section_args[@]}" 2>&1 | tee -a "$LOG_FILE"; then
        log ""
        log "   ✅ $section_label — BERHASIL"
        return 0
    else
        log ""
        log "   ❌ $section_label — GAGAL (lihat log untuk detail)"
        return 1
    fi
}

FAILED_SECTIONS=0

for i in {1..10}; do
    if [ -z "$SECTION" ] || [ "$SECTION" = "$i" ]; then
        if [ "$i" = "1" ]; then
            run_section 1 "phase1_testing.js" "Section 1 — Fundamental CRUD & Auth (10 projects)" || FAILED_SECTIONS=$((FAILED_SECTIONS + 1))
        elif [ "$i" = "2" ]; then
            run_section 2 "setup_section2.js" "Section 2 — Dashboard & Admin Panel (10 projects)" || FAILED_SECTIONS=$((FAILED_SECTIONS + 1))
        elif [ "$i" = "3" ]; then
            run_section 3 "setup_section3.js" "Section 3 — Security & Realtime (11 projects)" || FAILED_SECTIONS=$((FAILED_SECTIONS + 1))
        else
            run_section "$i" "setup_dynamic_section.js" "Section $i" "$i" || FAILED_SECTIONS=$((FAILED_SECTIONS + 1))
        fi
    fi
done

# ── Distill knowledge ke HUB ─────────────────────────────────
if [ "$NO_DISTILL" = false ] && [ -z "$SECTION" ]; then
    log_header "🧠 Distilasi Knowledge ke HUB"
    if bun "$ROOT_DIR/agent/main.js" distill 2>&1 | tee -a "$LOG_FILE"; then
        log "   ✅ Distilasi selesai."
    else
        log "   ⚠️  Distilasi gagal — lanjutkan secara manual: nexus distill"
    fi
fi

# ── Final report ─────────────────────────────────────────────
END_TIME=$(date +%s)
ELAPSED=$(( (END_TIME - START_TIME) / 60 ))

log ""
log_header "📊 LAPORAN AKHIR"
log "   Total waktu  : ${ELAPSED} menit"
log "   Section gagal: $FAILED_SECTIONS"
log "   Log tersimpan: $LOG_FILE"
log ""

if [ "$FAILED_SECTIONS" -gt 0 ]; then
    log "⚠️  Ada section yang gagal. Review log di atas untuk detail."
    log "   Jalankan ulang section spesifik dengan: ./nexus-sandbox.sh --section <1|2|3>"
    exit 1
else
    log "🎉 Semua section selesai! 100 sandboxes siap digunakan."
    log "   Jalankan: nexus status  — untuk melihat kondisi sistem"
    log "   Jalankan: php artisan serve  — di dalam folder sandbox manapun"
fi

log ""
