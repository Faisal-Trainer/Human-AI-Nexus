// agent/core/ObsidianBridge.js
// NEXUS Obsidian Bridge v1.1 — Bidirectional Vault Integration (Read + Write-Back)
// Bridges the NEXUS AI Engine with an Obsidian Vault for unified knowledge access
// and continuous learning write-back (lessons, blueprints, LLM rewrites).

const fs = require("fs-extra");
const path = require("path");
const fg = require("fast-glob");

/**
 * ObsidianBridge — Bidirectional integration layer between NEXUS AI and Obsidian Vault.
 *
 * READ:  Knowledge files, agent prompts, workflows, and rules from the Obsidian Vault.
 * WRITE: Post-mortem lessons, blueprint archives, LLM rewrites, and Colab training
 *        datasets back to dedicated vault folders (NEXUS Update/, BLUEPRINT/).
 *
 * Configuration is loaded from `.nexus-vault.json` in the project root.
 */
class ObsidianBridge {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.configPath = path.join(rootPath, ".nexus-vault.json");
    this.enabled = false;
    this.vaultPath = null;
    this.readSources = {};
    this.syncBack = false;

    this._loadConfig();
  }

  /**
   * Load configuration from `.nexus-vault.json`.
   * If the file doesn't exist or is invalid, the bridge stays disabled.
   */
  _loadConfig() {
    try {
      if (!fs.pathExistsSync(this.configPath)) {
        this.enabled = false;
        return;
      }

      const config = fs.readJsonSync(this.configPath);
      
      // ENV variable overrides the JSON config if set
      if (process.env.NEXUS_VAULT_ENABLED !== undefined) {
        this.enabled = process.env.NEXUS_VAULT_ENABLED === 'true';
      } else {
        this.enabled = config.enabled === true;
      }
      
      this.vaultPath = config.vault_path || null;
      this.updateDir = config.update_path || "NEXUS Update";
      this.readSources = config.read_sources || {};
      this.syncBack = config.sync_back === true;

      // Validate vault path exists
      if (this.enabled && this.vaultPath) {
        if (!fs.pathExistsSync(this.vaultPath)) {
          console.warn(
            `⚠️  ObsidianBridge: Vault path not found: ${this.vaultPath}. Bridge disabled.`
          );
          this.enabled = false;
        }
      }
    } catch (err) {
      console.warn(
        `⚠️  ObsidianBridge: Failed to load config: ${err.message}. Bridge disabled.`
      );
      this.enabled = false;
    }
  }

  /**
   * Get connection status for display in `nexus status`.
   */
  getStatus() {
    if (!this.enabled) {
      return {
        connected: false,
        reason: this.vaultPath
          ? "Vault path not accessible"
          : "No .nexus-vault.json found",
      };
    }

    return {
      connected: true,
      vaultPath: this.vaultPath,
      sources: Object.keys(this.readSources),
      syncBack: this.syncBack,
    };
  }

  /**
   * Resolve a vault source key to an absolute path.
   * @param {string} sourceKey - Key from read_sources (e.g., "knowledge", "agents")
   * @returns {string|null} Absolute path or null if not configured/found
   */
  resolveSource(sourceKey) {
    if (!this.enabled || !this.readSources[sourceKey]) return null;

    const resolved = path.join(this.vaultPath, this.readSources[sourceKey]);
    return fs.pathExistsSync(resolved) ? resolved : null;
  }

  /**
   * Get all markdown knowledge files from a vault source.
   * @param {string} sourceKey - Key from read_sources
   * @param {string[]} [ignorePatterns] - Glob patterns to ignore
   * @returns {Promise<Array<{file: string, fullPath: string, source: string}>>}
   */
  async getKnowledgeFiles(sourceKey, ignorePatterns = []) {
    if (!this.enabled) return [];

    const sourcePath = this.resolveSource(sourceKey);
    if (!sourcePath) return [];

    const normalizedPath = sourcePath.replace(/\\/g, "/");
    const defaultIgnore = [
      "**/node_modules/**",
      "**/.obsidian/**",
      "**/*MOC*",
    ];
    const allIgnore = [...defaultIgnore, ...ignorePatterns];

    try {
      const files = fg.sync("**/*.{md,MD}", {
        cwd: normalizedPath,
        ignore: allIgnore,
        onlyFiles: true,
      });

      return files.map((file) => ({
        file,
        fullPath: path.join(sourcePath, file),
        source: "obsidian-vault",
      }));
    } catch (err) {
      console.warn(
        `⚠️  ObsidianBridge: Failed to scan ${sourceKey}: ${err.message}`
      );
      return [];
    }
  }

  /**
   * Read content of a specific file from the vault.
   * @param {string} sourceKey - Key from read_sources
   * @param {string} relativePath - Path relative to the source directory
   * @returns {Promise<string|null>}
   */
  async readFile(sourceKey, relativePath) {
    if (!this.enabled) return null;

    const sourcePath = this.resolveSource(sourceKey);
    if (!sourcePath) return null;

    const fullPath = path.join(sourcePath, relativePath);
    try {
      if (await fs.pathExists(fullPath)) {
        return await fs.readFile(fullPath, "utf8");
      }
    } catch (err) {
      console.warn(
        `⚠️  ObsidianBridge: Failed to read ${relativePath}: ${err.message}`
      );
    }
    return null;
  }

  /**
   * Get combined knowledge files from BOTH local memory AND vault.
   * Deduplicates by basename (vault files are secondary, local takes priority).
   *
   * @param {string} localPath - Local memory path (e.g., memory/distilled/)
   * @param {string} vaultSourceKey - Vault source key (e.g., "knowledge")
   * @param {string[]} [ignorePatterns] - Patterns to ignore
   * @returns {Promise<Array<{file: string, fullPath: string, source: string}>>}
   */
  async getMergedFiles(localPath, vaultSourceKey, ignorePatterns = []) {
    const results = [];
    const seenBasenames = new Set();

    // 1. Local files take priority
    if (localPath && (await fs.pathExists(localPath))) {
      const normalizedLocal = localPath.replace(/\\/g, "/");
      const defaultIgnore = [
        "NEXUS_HUB_INDEX.md",
        "NEXUS_NEURAL_MAP.md",
        "INDEX_NEURAL_MAP.md",
        "short_term/**",
        "cache/**",
        "operational/indexes/**",
        "references/**",
      ];
      const localFiles = fg.sync("**/*.{md,MD}", {
        cwd: normalizedLocal,
        ignore: [...defaultIgnore, ...ignorePatterns],
        onlyFiles: true,
      });

      for (const file of localFiles) {
        const basename = path.basename(file).toLowerCase();
        seenBasenames.add(basename);
        results.push({
          file,
          fullPath: path.join(localPath, file),
          source: "local",
        });
      }
    }

    // 2. Vault files (only add if not already present locally)
    const vaultFiles = await this.getKnowledgeFiles(
      vaultSourceKey,
      ignorePatterns
    );
    for (const vf of vaultFiles) {
      const basename = path.basename(vf.file).toLowerCase();
      if (!seenBasenames.has(basename)) {
        seenBasenames.add(basename);
        results.push(vf);
      }
    }

    return results;
  }

  /**
   * Strip Obsidian-specific syntax from content for NEXUS consumption.
   * Converts [[wikilinks]] to plain text, strips YAML frontmatter tags, etc.
   * @param {string} content - Raw markdown content from vault
   * @returns {string} Cleaned content
   */
  sanitizeContent(content) {
    if (!content) return "";

    let cleaned = content;

    // Convert [[wikilinks]] to plain text
    cleaned = cleaned.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2");
    cleaned = cleaned.replace(/\[\[([^\]]+)\]\]/g, "$1");

    return cleaned;
  }

  /**
   * Check if the bridge is active and the vault is accessible.
   * @returns {boolean}
   */
  isActive() {
    return this.enabled && this.vaultPath && fs.pathExistsSync(this.vaultPath);
  }

  /**
   * Get the root BLUEPRINT path in Obsidian Vault.
   * @returns {string|null}
   */
  getBlueprintVaultPath() {
    if (!this.isActive()) return null;
    return path.join(this.vaultPath, "BLUEPRINT");
  }

  /**
   * Get the root NEXUS Update path in Obsidian Vault for LLM rewrites & learnings.
   * Defaults to 'C:\Users\ACER\Documents\Obsidian Vault\NEXUS Update'.
   * @returns {string|null}
   */
  getUpdateVaultPath() {
    if (!this.isActive()) return null;
    return path.join(this.vaultPath, this.updateDir || "NEXUS Update");
  }

  /**
   * Save and organize blueprint into Obsidian Vault folders:
   * - new/: Newly created / updated blueprint
   * - archive/: Older versions with timestamp (archived before overwrite)
   * - 100 project/: Running sandbox project blueprints
   * - 3 qwen/: Multi-model blueprints formatted as CUDA dataset for Google Colab
   *
   * @param {string} projectName - Name of project
   * @param {object} blueprint - Full blueprint JSON object
   * @param {object} [options] - Additional options
   * @param {string} [options.category='new'] - 'new' | '100 project' | '3 qwen' | 'archive'
   * @param {string} [options.modelName='qwen2.5-coder-3b'] - Model identifier
   * @param {string} [options.readmeContent=''] - Project README for dataset input
   * @param {boolean} [options.isSandboxProject=true] - If true, sync to '100 project'
   * @returns {Promise<boolean>}
   */
  async saveBlueprint(projectName, blueprint, options = {}) {
    const bpVault = this.getBlueprintVaultPath();
    if (!bpVault) return false;

    try {
      const newDir = path.join(bpVault, "new");
      const archiveDir = path.join(bpVault, "archive");
      const sandboxDir = path.join(bpVault, "100 project");
      const qwenDir = path.join(bpVault, "3 qwen");

      await fs.ensureDir(newDir);
      await fs.ensureDir(archiveDir);
      await fs.ensureDir(sandboxDir);
      await fs.ensureDir(qwenDir);

      const jsonFileName = `${projectName}.json`;
      const targetNewFile = path.join(newDir, jsonFileName);

      // 1. ARCHIVE: If blueprint already exists in new/, archive old version with timestamp
      if (await fs.pathExists(targetNewFile)) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const archiveFile = path.join(archiveDir, `${projectName}_${timestamp}.json`);
        await fs.copy(targetNewFile, archiveFile).catch(() => {});
      }

      // 2. NEW: Save clean blueprint to 'new/'
      await fs.writeJson(targetNewFile, blueprint, { spaces: 2 });

      // 3. 100 PROJECT: Save to '100 project/' for active sandbox tracking
      if (options.isSandboxProject !== false) {
        const targetSandboxFile = path.join(sandboxDir, jsonFileName);
        await fs.writeJson(targetSandboxFile, blueprint, { spaces: 2 });
      }

      // 4. 3 QWEN: Save formatted dataset sample for Google Colab CUDA LLM training
      const modelName = options.modelName || process.env.NEXUS_MODEL_NAME || "qwen2.5-coder-3b";
      const qwenDatasetFile = path.join(qwenDir, `${projectName}_${modelName}.json`);
      const datasetEntry = {
        _dataset_metadata: {
          project_name: projectName,
          model_name: modelName,
          created_at: new Date().toISOString(),
          target_framework: "Laravel TALL Stack",
          purpose: "CUDA Fine-Tuning Dataset for Google Colab",
        },
        training_sample: {
          instruction: "You are a Senior TALL Stack Architect for NEXUS AI. Generate a complete, production-ready Laravel TALL Stack architecture blueprint.",
          input: options.readmeContent || `# ${projectName}\nLaravel TALL Stack Sandbox`,
          output: JSON.stringify(blueprint, null, 2),
        },
        blueprint: blueprint,
      };
      await fs.writeJson(qwenDatasetFile, datasetEntry, { spaces: 2 });

      // Also append to a consolidated training JSONL for Google Colab in '3 qwen/'
      const colabJsonl = path.join(qwenDir, "colab_cuda_training_dataset.jsonl");
      const jsonlLine = JSON.stringify({
        messages: [
          { role: "system", content: "You are a Senior TALL Stack Architect for NEXUS AI." },
          { role: "user", content: `Generate architecture blueprint for:\n${options.readmeContent || projectName}` },
          { role: "assistant", content: JSON.stringify(blueprint) }
        ]
      }) + "\n";
      await fs.appendFile(colabJsonl, jsonlLine, "utf8").catch(() => {});

      return true;
    } catch (err) {
      console.warn(`⚠️ ObsidianBridge: Failed to save blueprint to vault: ${err.message}`);
      return false;
    }
  }

  /**
   * Save a self-correction lesson to Obsidian Vault under 'NEXUS Update/Lessons' (or root of NEXUS Update).
   *
   * @param {string} lessonTitle - Short descriptive title (e.g. 'MIGRATION_FOREIGN_KEY_COLLISION')
   * @param {string} lessonContent - Markdown content of the lesson
   * @param {object} [options] - Additional options (e.g. subfolder)
   * @returns {Promise<boolean>}
   */
  async saveLesson(lessonTitle, lessonContent, options = {}) {
    if (!this.isActive()) return false;
    try {
      const updateRoot = this.getUpdateVaultPath();
      const lessonDir = options.subfolder
        ? path.join(updateRoot, options.subfolder)
        : path.join(updateRoot, "Lessons");
      await fs.ensureDir(lessonDir);
      const safeTitle = lessonTitle.replace(/[^a-zA-Z0-9_-]/g, "_").toUpperCase();
      const filePath = path.join(lessonDir, `NEXUS_LESSON_${safeTitle}.md`);
      await fs.writeFile(filePath, lessonContent, "utf8");
      return true;
    } catch (e) {
      console.warn(`⚠️ ObsidianBridge: Failed to save lesson to vault: ${e.message}`);
      return false;
    }
  }

  /**
   * Save an LLM rewrite, refined document, or distilled note directly to 'NEXUS Update'.
   *
   * @param {string} fileName - Target file name (e.g. 'Laravel-Migration-Fix.md')
   * @param {string} content - Markdown content rewritten/produced by LLM
   * @param {string} [subfolder] - Optional subfolder inside 'NEXUS Update' (e.g. 'Rewrites', 'Architecture')
   * @returns {Promise<string|null>} Absolute file path of saved file or null
   */
  async saveRewrite(fileName, content, subfolder = null) {
    if (!this.isActive()) return null;
    try {
      const updateRoot = this.getUpdateVaultPath();
      const targetDir = subfolder ? path.join(updateRoot, subfolder) : updateRoot;
      await fs.ensureDir(targetDir);
      const cleanName = fileName.endsWith(".md") ? fileName : `${fileName}.md`;
      const filePath = path.join(targetDir, cleanName);
      await fs.writeFile(filePath, content, "utf8");
      return filePath;
    } catch (e) {
      console.warn(`⚠️ ObsidianBridge: Failed to save LLM rewrite to '${fileName}': ${e.message}`);
      return null;
    }
  }

  /**
   * Gather comprehensive statistics of Obsidian Vault integration.
   * @returns {Promise<object>}
   */
  async getVaultStats() {
    if (!this.isActive()) {
      return { connected: false, vaultPath: this.vaultPath };
    }

    const bpVault = this.getBlueprintVaultPath();
    const stats = {
      connected: true,
      vaultPath: this.vaultPath,
      blueprints: { new: 0, archive: 0, "100_project": 0, "3_qwen": 0, total: 0 },
      dataset: { samples: 0, jsonlBytes: 0, colabReady: false },
      lessonsCount: 0,
      recentFiles: [],
    };

    if (bpVault && (await fs.pathExists(bpVault))) {
      const countDir = async (dirName) => {
        const d = path.join(bpVault, dirName);
        if (!(await fs.pathExists(d))) return 0;
        const files = await fs.readdir(d);
        return files.filter((f) => f.endsWith(".json")).length;
      };

      stats.blueprints.new = await countDir("new");
      stats.blueprints.archive = await countDir("archive");
      stats.blueprints["100_project"] = await countDir("100 project");
      stats.blueprints["3_qwen"] = await countDir("3 qwen");
      stats.blueprints.total =
        stats.blueprints.new +
        stats.blueprints.archive +
        stats.blueprints["100_project"] +
        stats.blueprints["3_qwen"];

      const jsonlPath = path.join(bpVault, "3 qwen", "colab_cuda_training_dataset.jsonl");
      if (await fs.pathExists(jsonlPath)) {
        const fileStat = await fs.stat(jsonlPath);
        stats.dataset.jsonlBytes = fileStat.size;
        const content = await fs.readFile(jsonlPath, "utf8");
        stats.dataset.samples = content.split("\n").filter((l) => l.trim()).length;
        stats.dataset.colabReady = stats.dataset.samples > 0;
      }
    }

    const lessonDir = path.join(this.vaultPath, "NEXUS AI", "NEXUS LESSONS");
    if (await fs.pathExists(lessonDir)) {
      const lFiles = await fs.readdir(lessonDir);
      stats.lessonsCount = lFiles.filter((f) => f.endsWith(".md")).length;
    }

    return stats;
  }
}

module.exports = ObsidianBridge;
