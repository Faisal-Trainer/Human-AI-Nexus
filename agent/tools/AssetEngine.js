const fs = require("fs-extra");
const path = require("path");

/**
 * AssetEngine - Media Optimization and Handling.
 * Automates the optimization of images and assets.
 * FIX #21 — Added explicit placeholder warnings. Requires 'sharp' package
 * for real image processing. Install: npm install sharp
 */
class AssetEngine {
  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  /**
   * Process an asset optimization request
   * @param {Object} request - { target, action }
   */
  async process(request) {
    const fullPath = path.join(this.rootPath, request.target);
    if (!(await fs.pathExists(fullPath))) return false;

    switch (request.action) {
      case "CONVERT_TO_WEBP":
        return await this.convertToWebP(fullPath);
      case "COMPRESS":
        return await this.compress(fullPath);
      default:
        console.warn(`AssetEngine: Unknown action ${request.action}`);
        return false;
    }
  }

  async convertToWebP(filePath) {
    console.log(
      `🖼️ AssetEngine: Converting ${path.basename(filePath)} to WebP...`,
    );
    // FIX #21 — Check if sharp is available for real conversion
    try {
      const sharp = require("sharp");
      const newPath = filePath.replace(path.extname(filePath), ".webp");
      await sharp(filePath).webp({ quality: 80 }).toFile(newPath);
      console.log(`   ✅ Converted to WebP: ${path.basename(newPath)}`);
      return true;
    } catch (e) {
      console.warn(
        `   ⚠️ AssetEngine: 'sharp' not installed. Skipping WebP conversion for ${path.basename(filePath)}.`,
      );
      console.warn(`   💡 Install with: npm install sharp`);
      return false; // FIX #21 — Return false instead of true (was silent no-op)
    }
  }

  async compress(filePath) {
    console.log(`📉 AssetEngine: Compressing ${path.basename(filePath)}...`);
    // FIX #21 — Check if sharp is available for real compression
    try {
      const sharp = require("sharp");
      const ext = path.extname(filePath).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        await sharp(filePath)
          .resize({ width: 1920, withoutEnlargement: true })
          .toFile(filePath + ".compressed" + ext);
        console.log(`   ✅ Compressed: ${path.basename(filePath)}`);
        return true;
      }
      console.warn(`   ⚠️ Unsupported format for compression: ${ext}`);
      return false;
    } catch (e) {
      console.warn(
        `   ⚠️ AssetEngine: 'sharp' not installed. Skipping compression for ${path.basename(filePath)}.`,
      );
      return false; // FIX #21 — Return false instead of true (was silent no-op)
    }
  }
}

module.exports = AssetEngine;
