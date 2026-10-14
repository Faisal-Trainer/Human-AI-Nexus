#!/usr/bin/env node
/**
 * scripts/version.js — Sinkronkan satu sumber kebenaran versi di 4 tempat:
 *   1. package.json        -> field "version"
 *   2. package-lock.json   -> dua field root: "version" top-level & packages[""].version
 *   3. README.md           -> baris "> **Version**: vX.Y.Z (judul)" dan "> **Updated**: tanggal"
 *   4. CHANGELOG.md        -> scaffold header "## [vX.Y.Z] - YYYY-MM-DD (judul)" (isi manual)
 *
 * Konvensi repo: versi HARUS konsisten keempat file ini supaya npm-link deteksi benar.
 *
 * Pemakaian:
 *   node scripts/version.js <x.y.z> ["judul entri"] [--dry]
 *   node scripts/version.js --patch|--minor|--major ["judul entri"] [--dry]
 *   node scripts/version.js                    # tanpa arg => cetak versi saat ini
 *
 * --dry  : cetak rencana perubahan TANPA menulis file.
 *
 * Catatan: skrip TIDAK menaikkan versi secara otomatis dan TIDAK mengubah
 * konten naratif CHANGELOG (hanya menyisipkan header + stub TODO untuk diisi).
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PKG = path.join(ROOT, "package.json");
const LOCK = path.join(ROOT, "package-lock.json");
const README = path.join(ROOT, "README.md");
const CHANGELOG = path.join(ROOT, "CHANGELOG.md");

const SEMVER = /^\d+\.\d+\.\d+$/;

function fail(msg) {
  console.error(`\u274c ${msg}`);
  process.exit(1);
}

function parseSemver(v) {
  if (!SEMVER.test(v))
    fail(`Versi harus format x.y.z (dapat angka), dapat: "${v}"`);
  const [maj, min, pat] = v.split(".").map(Number);
  return { maj, min, pat };
}

function bumpKind(cur, kind) {
  const n = parseSemver(cur);
  if (kind === "major") {
    n.maj++;
    n.min = 0;
    n.pat = 0;
  } else if (kind === "minor") {
    n.min++;
    n.pat = 0;
  } else {
    n.pat++;
  }
  return `${n.maj}.${n.min}.${n.pat}`;
}

function currentVersion() {
  return JSON.parse(fs.readFileSync(PKG, "utf8")).version;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function isoDate(d = new Date()) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function slashDate(d = new Date()) {
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

// ── Transform tiap file (murni: terima teks, keluar { text, changed, note }) ──
function nextPackageJson(text, oldV, newV) {
  // Ganti HANYA field versi paket top-level (baris `"version": "old",` dengan indent
  // 2 spasi). Jangan sentuh dependensi.
  const re = new RegExp(`(^\\s{2}"version":\\s*")${oldV}(",?$)`, "m");
  if (!re.test(text))
    return {
      text,
      changed: false,
      note: "package.json: pola versi tak ditemukan",
    };
  return {
    text: text.replace(re, `$1${newV}$2`),
    changed: true,
    note: "package.json: version",
  };
}

function nextPackageLock(text, oldV, newV) {
  let out = text;
  let hits = 0;
  const esc = oldV.replace(/\./g, "\\.");
  // (a) top-level:  "version": "old",  (indent tepat 2 spasi)
  const top = new RegExp(`(^  "version":\\s*")${esc}(",?$)`, "m");
  if (top.test(out)) {
    out = out.replace(top, `$1${newV}$2`);
    hits++;
  }
  // (b) packages[""] root:  "": { "name": "...", "version": "old", ...
  const pkgRoot = new RegExp(
    '(""\\s*:\\s*\\{\\s*"name"\\s*:\\s*"[^"]*"\\s*,\\s*"version"\\s*:\\s*")[^"]*(")',
  );
  if (pkgRoot.test(out)) {
    out = out.replace(pkgRoot, `$1${newV}$2`);
    hits++;
  }
  if (hits < 2) {
    return {
      text,
      changed: false,
      note: `package-lock.json: hanya ${hits}/2 field root versi ketemu (berhenti, tidak menulis)`,
    };
  }
  return {
    text: out,
    changed: true,
    note: 'package-lock.json: version + packages[""].version',
  };
}

function nextReadme(text, newV, title) {
  let out = text;
  let changed = false;
  const verRe = /^> \*\*Version\*\*: v\d+\.\d+\.\d+.*$/m;
  if (verRe.test(out)) {
    out = out.replace(
      verRe,
      `> **Version**: v${newV}${title ? ` (${title})` : ""}`,
    );
    changed = true;
  }
  const updRe = /^> \*\*Updated\*\*:.*$/m;
  if (updRe.test(out)) {
    out = out.replace(updRe, `> **Updated**: ${slashDate()}`);
    changed = true;
  }
  return {
    text: out,
    changed,
    note: changed
      ? "README.md: baris Version + Updated"
      : "README.md: baris versi tak ditemukan",
  };
}

function nextChangelog(text, newV, title) {
  if (text.includes(`## [v${newV}]`)) {
    return {
      text,
      changed: false,
      note: "CHANGELOG.md: entri sudah ada, lewati",
    };
  }
  const header = `## [v${newV}] - ${isoDate()}${title ? ` (${title})` : ""}

### Added

- _TODO: isi changelog entri v${newV}_

`;
  // Sisipkan entri baru TEPAT sebelum entri "## [v" terdahulu (paling atas).
  const firstEntry = text.search(/^## \[v/m);
  if (firstEntry === -1) {
    return {
      text: text + "\n" + header,
      changed: true,
      note: "CHANGELOG.md: header baru (append, tak ada entri lama)",
    };
  }
  const out =
    text.slice(0, firstEntry) + header + "\n" + text.slice(firstEntry);
  return {
    text: out,
    changed: true,
    note: "CHANGELOG.md: scaffold entri baru (isi = TODO)",
  };
}

// ── CLI ───────────────────────────────────────────────────────────────────
function main() {
  const argv = process.argv.slice(2);
  const dry = argv.includes("--dry");
  const bumpFlag = ["--patch", "--minor", "--major"].find((a) =>
    argv.includes(a),
  );
  // Token versi/judul: apa pun yang bukan flag. Dengan --patch, token[0] = judul;
  // dengan versi eksplisit, token[0] = versi, token[1] = judul.
  const tokens = argv.filter((a) => !a.startsWith("--"));
  const oldV = currentVersion();

  if (!bumpFlag && tokens.length === 0) {
    console.log(`Versi saat ini: v${oldV}`);
    console.log(
      'Naikkan: node scripts/version.js <x.y.z|--patch|--minor|--major> ["judul"] [--dry]',
    );
    return;
  }

  let newV;
  let title;
  if (bumpFlag) {
    newV = bumpKind(oldV, bumpFlag.replace("--", ""));
    title = tokens[0] || "WIP";
  } else {
    parseSemver(tokens[0]); // validasi
    newV = tokens[0];
    title = tokens[1] || "WIP";
  }

  if (newV === oldV)
    fail(`Versi baru (${newV}) sama dengan yang lama (${oldV}).`);
  console.log(
    `\n\ud83d\udcdc Sinkron versi: v${oldV} \u2192 v${newV}${dry ? "  [DRY-RUN]" : ""}`,
  );

  const jobs = [
    {
      file: PKG,
      label: "package.json",
      fn: (t) => nextPackageJson(t, oldV, newV),
    },
    {
      file: LOCK,
      label: "package-lock.json",
      fn: (t) => nextPackageLock(t, oldV, newV),
    },
    { file: README, label: "README.md", fn: (t) => nextReadme(t, newV, title) },
    {
      file: CHANGELOG,
      label: "CHANGELOG.md",
      fn: (t) => nextChangelog(t, newV, title),
    },
  ];

  let anyBlock = false;
  for (const job of jobs) {
    if (!fs.existsSync(job.file)) {
      console.warn(`  \u26a0\ufe0f ${job.label}: file tidak ada, lewati`);
      continue;
    }
    const before = fs.readFileSync(job.file, "utf8");
    const res = job.fn(before);
    console.log(`  ${res.changed ? "\u2705" : "\u23ed\ufe0f"} ${res.note}`);
    if (
      !res.changed &&
      /tak ditemukan|tidak ada|berhenti|sudah ada/.test(res.note)
    )
      anyBlock = true;
    if (res.changed && !dry) fs.writeFileSync(job.file, res.text);
  }

  if (dry) {
    console.log("\n[DRY-RUN] tidak ada file yang ditulis.");
    return;
  }

  console.log(
    `\n\u2705 Versi disinkron ke v${newV}.` +
      (anyBlock
        ? "\n  \u26a0\ufe0f Sebagian file tidak berubah (lihat \u23ed\ufe0f di atas) — periksa manual."
        : ""),
  );
  console.log(
    "  Langkah berikutnya: isi entri CHANGELOG.md (TODO), lalu commit 4 file ini.",
  );
}

if (require.main === module) main();
module.exports = {
  parseSemver,
  bumpKind,
  nextPackageJson,
  nextPackageLock,
  nextReadme,
  nextChangelog,
};
