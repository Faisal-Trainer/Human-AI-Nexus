const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

class CacheManager {
  constructor(projectRoot = null) {
    this.projectRoot = projectRoot || path.resolve(__dirname, "..", "..");
    
    // Resolve Obsidian Vault destination
    const defaultVaultPath = "C:\\Users\\ACER\\Documents\\Obsidian Vault";
    const envVault = process.env.OBSIDIAN_VAULT_PATH || defaultVaultPath;
    this.vaultCacheDir = path.join(envVault, "chace nexus");

    // Local source cache paths
    this.sources = {
      blueprints: path.join(this.projectRoot, "memory", "operational", "blueprints"),
      generated_code: path.join(this.projectRoot, "memory", "cache", "generated_code"),
      generated_code_backup: path.join(this.projectRoot, "memory", "cache", "generated_code_backup"),
      preheal: path.join(this.projectRoot, "memory", "cache", "preheal_cache.json"),
    };
  }

  /**
   * Backup all cache to Obsidian Vault and clear local cache.
   */
  async clearAndBackup(options = {}) {
    console.log(chalk.cyan.bold("\n╔══════════════════════════════════════════════════════════╗"));
    console.log(chalk.cyan.bold("║   🧹 NEXUS CACHE MANAGER & OBSIDIAN VAULT SYNC           ║"));
    console.log(chalk.cyan.bold("╚══════════════════════════════════════════════════════════╝"));

    await fs.ensureDir(this.vaultCacheDir);
    console.log(chalk.yellow(`\n💾 Target Backup Obsidian Vault: ${this.vaultCacheDir}`));

    const stats = {
      blueprints: 0,
      generated_code: 0,
      generated_code_backup: 0,
    };

    // ── 1. BACKUP & CLEAR BLUEPRINTS ──
    if (await fs.pathExists(this.sources.blueprints)) {
      const targetDir = path.join(this.vaultCacheDir, "blueprints");
      await fs.ensureDir(targetDir);
      const files = await fs.readdir(this.sources.blueprints);
      for (const file of files) {
        const src = path.join(this.sources.blueprints, file);
        const dest = path.join(targetDir, file);
        await fs.copy(src, dest);
        await fs.remove(src);
        stats.blueprints++;
      }
    }

    // ── 2. BACKUP & CLEAR GENERATED CODE ──
    if (await fs.pathExists(this.sources.generated_code)) {
      const targetDir = path.join(this.vaultCacheDir, "generated_code");
      await fs.ensureDir(targetDir);
      const files = await fs.readdir(this.sources.generated_code);
      for (const file of files) {
        const src = path.join(this.sources.generated_code, file);
        const dest = path.join(targetDir, file);
        await fs.copy(src, dest);
        await fs.remove(src);
        stats.generated_code++;
      }
    }

    // ── 3. BACKUP & CLEAR GENERATED CODE BACKUP ──
    if (await fs.pathExists(this.sources.generated_code_backup)) {
      const targetDir = path.join(this.vaultCacheDir, "generated_code_backup");
      await fs.ensureDir(targetDir);
      const files = await fs.readdir(this.sources.generated_code_backup);
      for (const file of files) {
        const src = path.join(this.sources.generated_code_backup, file);
        const dest = path.join(targetDir, file);
        await fs.copy(src, dest);
        await fs.remove(src);
        stats.generated_code_backup++;
      }
    }

    // ── 4. BACKUP PREHEAL CACHE ──
    if (await fs.pathExists(this.sources.preheal)) {
      const dest = path.join(this.vaultCacheDir, "preheal_cache.json");
      await fs.copy(this.sources.preheal, dest);
      await fs.remove(this.sources.preheal);
    }

    // ── 5. OPTIONALLY FLUSH REDIS IN-MEMORY BANK ──
    try {
      const redis = require("redis");
      const client = redis.createClient();
      await client.connect().catch(() => {});
      if (client.isOpen) {
        await client.flushAll();
        await client.disconnect();
        console.log(chalk.gray("   ⚡ Redis in-memory cache flushed."));
      }
    } catch (_) {}

    console.log(chalk.green("\n📊 Laporan Pembersihan & Backup:"));
    console.log(chalk.white(`   • Blueprints diarsipkan & dibersihkan      : ${chalk.bold.yellow(stats.blueprints)} file`));
    console.log(chalk.white(`   • Kode tergenerate diarsipkan & dibersihkan: ${chalk.bold.yellow(stats.generated_code)} file`));
    console.log(chalk.white(`   • Backup cache diarsipkan & dibersihkan   : ${chalk.bold.yellow(stats.generated_code_backup)} file`));
    console.log(chalk.green(`\n✅ Seluruh cache berhasil diarsipkan ke Obsidian Vault dan cache lokal NEXUS telah bersih!`));
    console.log(chalk.cyan(`👉 Anda sekarang dapat menjalankan: ${chalk.bold('nexus sandbox')} untuk fresh generation.\n`));
  }
}

module.exports = CacheManager;
