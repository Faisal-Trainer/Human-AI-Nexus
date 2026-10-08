/**
 * TypeSafeValidator.js - Root Entrypoint
 *
 * Wrapper untuk TypeSafe evaluation endpoint (POST /v1/systemone, model jev-latest).
 * Canonical implementation resides in agent/tools/TypeSafeValidator.js.
 */

const TypeSafeValidator = require("./agent/tools/TypeSafeValidator");

module.exports = TypeSafeValidator;
