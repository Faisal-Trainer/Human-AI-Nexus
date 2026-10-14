/**
 * 🧰 Guards shared utilities — PURE name/schema helpers used by the guard
 * modules AND by the deterministic generators in ImplementationPhase.
 * Extracted verbatim from ImplementationPhase (v3.4.11, metrics plan #3).
 * Every function is pure & idempotent-safe: no LLM, no fs, no logging.
 */

// camelCase plural of a model name -> view collection variable.
// ShortUrl -> shortUrls, ClickStat -> clickStats, Category -> categories
function camelPlural(model) {
  const camel = model.charAt(0).toLowerCase() + model.slice(1);
  if (/(s|x|z|ch|sh)$/i.test(camel)) return camel + "es";
  if (/[^aeiou]y$/i.test(camel)) return camel.slice(0, -1) + "ies";
  return camel + "s";
}

// Convert PascalCase model name to snake_case plural table name
// e.g. UrlShortener -> url_shorteners, ExpenseItem -> expense_items
function toSnakePlural(modelName) {
  const snake = modelName
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
  // Simple pluralization: add 's', handle common irregular endings
  if (
    snake.endsWith("y") &&
    !["ay", "ey", "iy", "oy", "uy"].some((e) => snake.endsWith(e))
  ) {
    return snake.slice(0, -1) + "ies";
  }
  if (
    snake.endsWith("s") ||
    snake.endsWith("sh") ||
    snake.endsWith("ch") ||
    snake.endsWith("x") ||
    snake.endsWith("z")
  ) {
    return snake + "es";
  }
  return snake + "s";
}

// user_id -> User, short_url_id -> ShortUrl
function fkToModel(colName) {
  const base = String(colName).replace(/_id$/, "");
  if (!base) return null;
  return base
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

// Relationship pseudo-types that are NOT real DB columns.
function isRelationType(baseType) {
  return [
    "hasmany",
    "hasone",
    "belongsto",
    "belongstomany",
    "morphmany",
    "morphone",
    "morphto",
    "hasmanythrough",
    "hasonethrough",
  ].includes(baseType);
}

// Parse a model's blueprint.schema object into real columns + relationships.
function parseSchemaColumns(schemaObj) {
  const columns = [];
  const relationships = [];
  if (!schemaObj || typeof schemaObj !== "object") {
    return { columns, relationships };
  }
  const SKIP_COLS = [
    "id",
    "created_at",
    "updated_at",
    "deleted_at",
    "remember_token",
  ];
  for (const [name, rawType] of Object.entries(schemaObj)) {
    const typeStr = String(rawType || "").trim();
    const [baseType, ...mods] = typeStr.split(":");
    const base = baseType.toLowerCase();
    if (isRelationType(base)) {
      relationships.push({ name, type: base, target: mods[0] || null });
      continue;
    }
    if (SKIP_COLS.includes(name)) continue;
    columns.push({ name, baseType: base, mods });
  }
  return { columns, relationships };
}

// Build a Laravel migration column declaration from a parsed schema column.
function columnMigrationCall(col) {
  const { name, baseType, mods } = col;
  const modStr = mods.join(":");
  let line;
  switch (baseType) {
    case "foreignid":
    case "foreignuuid":
      line =
        name === "user_id"
          ? "$table->foreignId('user_id')->nullable()->constrained()->nullOnDelete()"
          : fkToModel(name) === "User"
            ? `$table->foreignId('${name}')->constrained('users')->cascadeOnDelete()`
            : // sibling tables use HasUuids PKs — bigint foreignId would type-clash
              `$table->foreignUuid('${name}')->constrained()`;
      break;
    case "text":
    case "longtext":
      line = `$table->text('${name}')`;
      break;
    case "json":
      line = `$table->json('${name}')`;
      break;
    case "boolean":
      line = `$table->boolean('${name}')->default(false)`;
      break;
    case "integer":
    case "int":
      line = `$table->integer('${name}')->default(0)`;
      break;
    case "biginteger":
      line = `$table->unsignedBigInteger('${name}')->default(0)`;
      break;
    case "decimal":
    case "float":
    case "double":
      line = `$table->decimal('${name}', 10, 2)->default(0)`;
      break;
    case "date":
      line = `$table->date('${name}')->nullable()`;
      break;
    case "datetime":
    case "timestamp":
      line = `$table->timestamp('${name}')->nullable()`;
      break;
    case "enum":
      line = `$table->string('${name}')->nullable()`;
      break;
    case "string":
    default:
      line = `$table->string('${name}')`;
      break;
  }
  if (modStr.includes("nullable") && !line.includes("->nullable()")) {
    line += "->nullable()";
  }
  if (modStr.includes("unique")) line += "->unique()";
  const defMatch = mods.find((m) => m.startsWith("default("));
  if (defMatch) {
    const val = defMatch.slice(8, -1);
    line += `->default('${val}')`;
  }
  if (modStr.includes("index") || modStr.includes("indexed")) {
    line += "->index()";
  }
  return line + ";";
}

// Extract the body of a method from a class source string (brace-balanced).
function extractMethodBody(classCode, methodName) {
  const sig = new RegExp(`function\\s+${methodName}\\s*\\([^)]*\\)\\s*\\{`);
  const match = sig.exec(classCode);
  if (!match) return null;
  let i = match.index + match[0].length;
  let depth = 1;
  const start = i;
  while (i < classCode.length && depth > 0) {
    const ch = classCode[i];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    i++;
  }
  return depth === 0 ? classCode.slice(start, i - 1) : null;
}

module.exports = {
  camelPlural,
  toSnakePlural,
  fkToModel,
  isRelationType,
  parseSchemaColumns,
  columnMigrationCall,
  extractMethodBody,
};
