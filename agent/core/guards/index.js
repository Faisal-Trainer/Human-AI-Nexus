/**
 * 🛡️ NEXUS Guards module (metrics plan #3)
 *
 * Semua guard deterministik Tinggal di folder ini dengan kontrak seragam:
 *   { id, fields?, run(ctx, host) -> { ctx, changed, notes } }
 *   detect   : guard memutuskan sendiri ada/tidaknya pekerjaan (changed=false
 *              bila bersih) — tanpa efek samping.
 *   fix      : memutas/mengembalikan ctx artefak yang sudah diperbaiki.
 *   idempoten: panggilan kedua di atas hasil pertama = no-op.
 *
 * GuardRunner adalah SATU-satunya pengatur urutan eksekusi + pencatat
 * telemetri frekuensi menyala (#4) ke logs/guard-telemetry/.
 * Pipeline utama: RECONCILE_LIVEWIRE (menggantikan langkah bernomor
 * 0/0.5/2.5/3/3.5/3.6/4 era lama ImplementationPhase).
 */

const GuardRunner = require("./GuardRunner");
const utils = require("./utils");
const livewireGuards = require("./livewireGuards");
const phpGuards = require("./phpGuards");
const routeGuards = require("./routeGuards");
const schemaGuards = require("./schemaGuards");

module.exports = {
  GuardRunner,
  utils,
  livewireGuards,
  phpGuards,
  routeGuards,
  schemaGuards,
  RECONCILE_LIVEWIRE: livewireGuards.reconcileGuards,
};
