/**
 * 🧩 Schema-lock guards — mengunci artefak generated (model/migration/seeder/
 * User) ke blueprint.schema sehingga LLM tidak pernah bisa drop kolom atau
 * invent field yang menyimpang. Semua murni teks (kecuali derivasi), hanya
 * MENAMBAH yang hilang, dan idempoten.
 */

const U = require("./utils");

// ── pure functions ─────────────────────────────────────────────────────────

// Deterministic cleanup of hallucinated Faker usage in seeders/factories.
function sanitizeSeeder(code) {
  if (!code) return code;
  let out = code;
  out = out.replace(/\$faker\s*->/g, "fake()->");
  out = out.replace(
    /\$faker\s*=\s*Faker(?:\\Factory)?::create\(\)\s*;?\s*\n?/gi,
    "",
  );
  out = out.replace(/use\s+Faker\\Factory\s*;\s*\n/gi, "");
  out = out.replace(/->realistic\s*\([^)]*\)/gi, "->sentence(3)");
  return out;
}

// Deterministic cleanup of hallucinated migration code.
// Local models sometimes emit column MODIFIERS as standalone Blueprint calls
// (e.g. `$table->nullable();` with the bogus rationale "nullable for all
// columns by default"). Those methods live on the column definition, not on
// Illuminate\Database\Schema\Blueprint, so `php artisan migrate` throws
// BadMethodCallException. We strip only unambiguous zero-arg bare modifiers
// and never touch valid no-arg Blueprint helpers (timestamps/softDeletes/id).
function sanitizeMigration(code) {
  if (!code || !code.includes("Schema::create")) return code;
  const BARE_INVALID =
    /\n[ \t]*\$table\s*->\s*(nullable|unsigned|useCurrent|after|default|comment|charset|collation|change)\s*\(\s*\)\s*;?[^\n]*/gi;
  return code.replace(BARE_INVALID, "");
}

function dedupeMigrationBlock(block, CALL) {
  const hasHelper = (name) =>
    block.some((l) => new RegExp(`\\$table\\s*->\\s*${name}\\s*\\(`).test(l));
  const timestamps = hasHelper("timestamps");
  const softDeletes = hasHelper("softDeletes");
  const seen = new Set();
  const result = [];
  for (const line of block) {
    const m = line.match(CALL);
    if (m) {
      const call = m[2].replace(/\s+/g, "");
      const colName = (line.match(/\$table\s*->\s*\w+\s*\(\s*['"](\w+)['"]/) ||
        [])[1];
      if (
        colName &&
        ((timestamps && /^(created_at|updated_at)$/.test(colName)) ||
          (softDeletes && colName === "deleted_at"))
      ) {
        continue; // explicit column collides with a helper that defines it
      }
      if (seen.has(call)) continue; // exact duplicate call
      seen.add(call);
    }
    result.push(line);
  }
  return result;
}

// Collapse duplicate column/helper calls inside every Schema::create(...) block.
// (1) An exact-duplicated `$table->...` call (e.g. timestamps() twice) is always
//     a migrate error, so keep only the first. (2) When timestamps() is present,
//     drop explicit created_at/updated_at columns; when softDeletes() is present,
//     drop an explicit deleted_at column — those helpers already define them.
function dedupeMigrationColumns(code) {
  if (!code || !code.includes("Schema::create")) return code;
  const lines = code.split(/\r?\n/);
  const CALL =
    /^(\s*)(\$table\s*->\s*\w+\s*\([^)]*\)(?:\s*->\s*\w+\s*\([^)]*\))*\s*;)/;
  const out = [];
  let i = 0;
  while (i < lines.length) {
    out.push(lines[i]);
    if (/Schema::create\s*\(/.test(lines[i])) {
      let j = i + 1;
      const block = [];
      while (j < lines.length && !/^\s*\}\s*\)\s*;/.test(lines[j])) {
        block.push(lines[j]);
        j++;
      }
      out.push(...dedupeMigrationBlock(block, CALL));
      i = j; // closing `});` line is emitted on the next loop iteration
      continue;
    }
    i++;
  }
  return out.join("\n");
}

// Inject any real schema columns missing from a generated migration body.
function ensureMigrationColumns(tableName, schemaObj, code) {
  if (!code || !code.includes("Schema::create")) return { code, injected: [] };
  const { columns } = U.parseSchemaColumns(schemaObj);
  const injected = [];
  const lines = [];
  for (const col of columns) {
    const re = new RegExp(
      `\\$table\\s*->\\s*\\w+\\s*\\(\\s*['"]${col.name}['"]`,
    );
    if (re.test(code)) continue;
    lines.push("            " + U.columnMigrationCall(col));
    injected.push(col.name);
  }
  if (lines.length === 0) return { code, injected };
  const block = lines.join("\n");
  if (/\$table->timestamps\(\);/.test(code)) {
    code = code.replace(/([ \t]*\$table->timestamps\(\);)/, `${block}\n$1`);
  } else {
    code = code.replace(
      /(\}\s*;\s*\n\s*public function down)/,
      `\n${block}\n        $1`,
    );
  }
  return { code, injected };
}

// Enforce $fillable + relationship methods on a generated model.
function ensureModelFillable(modelName, schemaObj, knownModels, code) {
  if (!code) return code;
  const { columns, relationships } = U.parseSchemaColumns(schemaObj);
  let out = code;

  // 1. $fillable = every real schema column
  const fillableNames = columns.map((c) => c.name);
  if (fillableNames.length > 0) {
    const body = fillableNames.map((n) => `'${n}'`).join(", ");
    if (/protected\s+\$fillable\s*=\s*\[[\s\S]*?\]/.test(out)) {
      out = out.replace(
        /protected\s+\$fillable\s*=\s*\[[\s\S]*?\]/,
        `protected $fillable = [${body}]`,
      );
    } else {
      out = out.replace(
        /(class\s+\w+\s+extends\s+\w+[\s\S]*?\{)/,
        `$1\n    protected $fillable = [${body}];\n`,
      );
    }
  }

  // 2. Relationship methods (only when target model is known to exist)
  const methods = [];
  const hasMethod = (name) =>
    new RegExp(`function\\s+${name}\\s*\\(`).test(out);
  for (const c of columns) {
    if (c.baseType === "foreignid" || c.baseType === "foreignuuid") {
      const target = U.fkToModel(c.name);
      if (target && (target === "User" || knownModels.includes(target))) {
        const method = c.name.replace(/_id$/, "").replace(/s$/, "");
        if (method && !hasMethod(method)) {
          methods.push(
            `    public function ${method}()\n    {\n        return $this->belongsTo(${target}::class);\n    }`,
          );
        }
      }
    }
  }
  for (const r of relationships) {
    if (!r.target || !knownModels.includes(r.target)) continue;
    if (hasMethod(r.name)) continue;
    if (r.type === "hasmany") {
      methods.push(
        `    public function ${r.name}()\n    {\n        return $this->hasMany(${r.target}::class);\n    }`,
      );
    } else if (r.type === "hasone") {
      methods.push(
        `    public function ${r.name}()\n    {\n        return $this->hasOne(${r.target}::class);\n    }`,
      );
    } else if (r.type === "belongsto") {
      methods.push(
        `    public function ${r.name}()\n    {\n        return $this->belongsTo(${r.target}::class);\n    }`,
      );
    }
  }

  if (methods.length > 0) {
    // Remove the placeholder relationship TODO comment lines (whole lines).
    out = out.replace(
      /[ \t]*\/\/[^\n]*(?:TODO|relationship methods|Replace this comment)[^\n]*\n/gi,
      "",
    );
    const lastBrace = out.lastIndexOf("}");
    if (lastBrace !== -1) {
      out =
        out.slice(0, lastBrace) +
        "\n" +
        methods.join("\n\n") +
        "\n" +
        out.slice(lastBrace);
    }
  }
  return out;
}

// Columns a blueprint declares for User that are NOT in Laravel's core
// users table. Generic (any extra attribute), never role-specific.
function extraUserColumns(schemaObj) {
  const RESERVED = new Set([
    "id",
    "name",
    "email",
    "password",
    "email_verified_at",
    "remember_token",
    "created_at",
    "updated_at",
    "deleted_at",
  ]);
  const { columns } = U.parseSchemaColumns(schemaObj);
  return columns.filter((c) => !RESERVED.has(c.name));
}

// Inject inverse hasMany() relations into the preserved User model for every
// blueprint model that declares a user_id foreign key. Without these, views
// reading `$user->shortUrls` get null and chained calls crash with
// "Call to a member function first() on null". Generic & schema-driven:
// any model with a *_user_id/user_id FK gets a camelPlural() relation.
function ensureUserRelations(code, blueprint) {
  const added = [];
  if (!code || !blueprint || !blueprint.schema) return { code, added };
  let out = code;
  const relMethods = [];
  for (const modelName of Object.keys(blueprint.schema)) {
    if (modelName === "User") continue;
    const { columns } = U.parseSchemaColumns(blueprint.schema[modelName]);
    const hasUserFk = columns.some(
      (c) =>
        (c.baseType === "foreignid" || c.baseType === "foreignuuid") &&
        (/(^|_)user_id$/i.test(c.name) || /\buser\b/i.test(c.name)),
    );
    if (!hasUserFk) continue;
    const method = U.camelPlural(modelName);
    if (new RegExp(`function\\s+${method}\\s*\\(`).test(out)) continue;
    relMethods.push(
      `    public function ${method}()\n    {\n        return $this->hasMany(${modelName}::class);\n    }`,
    );
    added.push(`${method}() -> ${modelName}`);
  }
  if (relMethods.length === 0) return { code, added };
  const lastBrace = out.lastIndexOf("}");
  out =
    out.slice(0, lastBrace) +
    "\n" +
    relMethods.join("\n\n") +
    "\n" +
    out.slice(lastBrace);
  return { code: out, added };
}

// Additively register extra columns in the preserved User model's fillable,
// supporting both Laravel 12 `#[Fillable([...])]` and `protected $fillable`.
function ensureUserFillable(code, extraNames) {
  if (!code || !extraNames || extraNames.length === 0) return code;
  const attrMatch = code.match(/#\[Fillable\(\[([^\]]*)\]\)\]/);
  if (attrMatch) {
    const existing = [...attrMatch[1].matchAll(/'([^']*)'/g)].map((m) => m[1]);
    const merged = [...existing];
    for (const n of extraNames) if (!merged.includes(n)) merged.push(n);
    const body = merged.map((n) => `'${n}'`).join(", ");
    return code.replace(
      /#\[Fillable\(\[[^\]]*\]\)\]/,
      `#[Fillable([${body}])]`,
    );
  }
  if (/protected\s+\$fillable\s*=\s*\[[\s\S]*?\]/.test(code)) {
    const block = code.match(/protected\s+\$fillable\s*=\s*\[([\s\S]*?)\]/)[1];
    const existing = [...block.matchAll(/'([^']*)'/g)].map((m) => m[1]);
    const merged = [...existing];
    for (const n of extraNames) if (!merged.includes(n)) merged.push(n);
    const body = merged.map((n) => `'${n}'`).join(", ");
    return code.replace(
      /protected\s+\$fillable\s*=\s*\[[\s\S]*?\]/,
      `protected $fillable = [${body}]`,
    );
  }
  return code;
}

// ── guard objects (kontrak detect/fix/idempoten utk telemetri runner) ──────

const migrationColumns = {
  id: "migration-columns-ensure",
  fields: ["code"],
  run(ctx) {
    const r = ensureMigrationColumns(ctx.tableName, ctx.schemaObj, ctx.code);
    const changed = r.injected.length > 0;
    ctx.code = r.code;
    return {
      ctx,
      changed,
      notes: changed
        ? [`injected missing column(s): ${r.injected.join(", ")}`]
        : [],
      extra: r,
    };
  },
};

const migrationSanitize = {
  id: "migration-sanitize",
  fields: ["code"],
  run(ctx) {
    const out = sanitizeMigration(ctx.code);
    const changed = out !== ctx.code;
    ctx.code = out;
    return {
      ctx,
      changed,
      notes: changed ? ["stripped bare Blueprint modifiers"] : [],
    };
  },
};

const migrationDedupe = {
  id: "migration-dedupe",
  fields: ["code"],
  run(ctx) {
    const out = dedupeMigrationColumns(ctx.code);
    const changed = out !== ctx.code;
    ctx.code = out;
    return {
      ctx,
      changed,
      notes: changed ? ["collapsed duplicate column calls"] : [],
    };
  },
};

const modelFillableLock = {
  id: "model-fillable-lock",
  fields: ["code"],
  run(ctx) {
    const out = ensureModelFillable(
      ctx.modelName,
      ctx.schemaObj,
      ctx.knownModels || [],
      ctx.code,
    );
    const changed = out !== ctx.code;
    ctx.code = out;
    return {
      ctx,
      changed,
      notes: changed ? ["$fillable/relations locked to schema"] : [],
    };
  },
};

const seederSanitize = {
  id: "seeder-sanitize",
  fields: ["code"],
  run(ctx) {
    const out = sanitizeSeeder(ctx.code);
    const changed = out !== ctx.code;
    ctx.code = out;
    return { ctx, changed, notes: changed ? ["normalized Faker usage"] : [] };
  },
};

module.exports = {
  sanitizeSeeder,
  sanitizeMigration,
  dedupeMigrationColumns,
  dedupeMigrationBlock,
  ensureMigrationColumns,
  ensureModelFillable,
  extraUserColumns,
  ensureUserRelations,
  ensureUserFillable,
  guards: {
    migrationColumns,
    migrationSanitize,
    migrationDedupe,
    modelFillableLock,
    seederSanitize,
  },
};
