// agent/core/ModelTrainer.js — v1.0
// NEXUS Model Training Pipeline
// Orchestrates: Dataset Extraction → LoRA Fine-Tuning → GGUF Conversion → Quantization
//
// Pipeline:
//   1. nexus extract-dataset  → memory/datasets/nexus-sft-dataset.jsonl
//   2. python train_lora.py   → LoRA adapter (adapters/)
//   3. llama.cpp merge        → merged model (FP16)
//   4. llama.cpp quantize     → GGUF Q4_K_M (models/)
//
// Requirements:
//   - Python 3.10+ with Unsloth (pip install -r train_requirements.txt)
//   - llama.cpp compiled (or pre-built binary in nexus/native/)
//   - Base model in models/ folder (e.g. qwen2.5-coder-3b-instruct-q4_k_m.gguf)
//   - GPU recommended but CPU training supported (slow)

const fs = require("fs-extra");
const path = require("path");
const { spawn } = require("child_process");

class ModelTrainer {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.modelsDir = path.join(rootPath, "models");
    this.datasetsDir = path.join(rootPath, "memory", "datasets");
    this.adaptersDir = path.join(rootPath, "models", "adapters");
    this.scriptsDir = path.join(rootPath, "agent", "scripts");
    this.nativeDir = path.join(rootPath, "nexus", "native");
  }

  /**
   * Full training pipeline: extract → train → merge → quantize
   */
  async train(options = {}) {
    const startTime = Date.now();
    const baseModel =
      options.baseModel || "qwen2.5-coder-3b-instruct-q4_k_m.gguf";
    const outputName = options.outputName || "nexus-custom-q4_k_m.gguf";
    const rank = options.rank || 16; // LoRA rank (8/16/32/64)
    const epochs = options.epochs || 3;
    const useGpu = options.gpu !== false;

    console.log("\n╔══════════════════════════════════════════════════════╗");
    console.log("║  🧠 NEXUS MODEL TRAINING PIPELINE                     ║");
    console.log("║  Dataset → LoRA → Merge → GGUF Quantization          ║");
    console.log("╚══════════════════════════════════════════════════════╝\n");

    console.log(`   Base Model : ${baseModel}`);
    console.log(`   Output     : ${outputName}`);
    console.log(`   LoRA Rank  : ${rank}`);
    console.log(`   Epochs     : ${epochs}`);
    console.log(`   GPU        : ${useGpu ? "Enabled" : "CPU only"}\n`);

    // ── STEP 1: Verify prerequisites ──
    console.log("📋 Step 1/5: Verifying prerequisites...");
    const prereqs = await this.checkPrerequisites(baseModel);
    if (!prereqs.ok) {
      console.error(
        `❌ Prerequisites check failed:\n${prereqs.errors.join("\n")}`,
      );
      console.log("\n💡 Fix the above issues and retry.\n");
      return false;
    }
    console.log("   ✅ All prerequisites met.\n");

    // ── STEP 2: Extract dataset ──
    console.log("📊 Step 2/5: Extracting training dataset...");
    const datasetPath = await this.extractDataset();
    if (!datasetPath) {
      console.error(
        "❌ Dataset extraction failed. No training data available.",
      );
      return false;
    }

    const recordCount = await this.countDatasetRecords(datasetPath);
    console.log(
      `   ✅ Dataset ready: ${recordCount} records at ${path.relative(this.rootPath, datasetPath)}\n`,
    );

    if (recordCount < 10) {
      console.warn(
        "⚠️  Dataset has fewer than 10 records. Training may produce poor results.",
      );
      console.warn(
        '   Run "nexus sandbox" first to generate more training data.\n',
      );
    }

    // ── STEP 3: LoRA Fine-Tuning ──
    console.log("🔬 Step 3/5: LoRA Fine-Tuning...");
    const adapterPath = await this.runLoRATraining({
      datasetPath,
      baseModel,
      rank,
      epochs,
      useGpu,
    });
    if (!adapterPath) {
      console.error("❌ LoRA training failed.");
      return false;
    }
    console.log(
      `   ✅ LoRA adapter saved: ${path.relative(this.rootPath, adapterPath)}\n`,
    );

    // ── STEP 4: Merge adapter into base model ──
    console.log("🔗 Step 4/5: Merging LoRA adapter into base model...");
    const mergedPath = await this.mergeAdapter({
      baseModel,
      adapterPath,
    });
    if (!mergedPath) {
      console.error("❌ Model merge failed.");
      return false;
    }
    console.log(
      `   ✅ Merged model: ${path.relative(this.rootPath, mergedPath)}\n`,
    );

    // ── STEP 5: Quantize to GGUF ──
    console.log("📦 Step 5/5: Quantizing to GGUF Q4_K_M...");
    const outputPath = await this.quantizeModel({
      mergedPath,
      outputName,
    });
    if (!outputPath) {
      console.error("❌ Quantization failed.");
      return false;
    }

    const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
    const outputSize = (await fs.stat(outputPath)).size / (1024 * 1024);

    console.log(
      `   ✅ Quantized model: ${path.relative(this.rootPath, outputPath)}`,
    );
    console.log(`   📦 Size: ${outputSize.toFixed(1)} MB\n`);

    console.log("═".repeat(56));
    console.log("🎉 TRAINING PIPELINE COMPLETE!");
    console.log("═".repeat(56));
    console.log(`   Model  : ${outputPath}`);
    console.log(`   Size   : ${outputSize.toFixed(1)} MB`);
    console.log(`   Time   : ${elapsed} minutes`);
    console.log(`   Records: ${recordCount}`);
    console.log(`\n   To use: Update LocalIntelligence.js modelPath to:`);
    console.log(`   "${outputName}"`);
    console.log("═".repeat(56));

    // Cleanup intermediate files
    await this.cleanup(mergedPath);

    return outputPath;
  }

  /**
   * Check all prerequisites before training
   */
  async checkPrerequisites(baseModel) {
    const errors = [];

    // Check Python
    try {
      await this._exec("python", ["--version"], { timeout: 5000 });
    } catch (e) {
      try {
        await this._exec("python3", ["--version"], { timeout: 5000 });
      } catch (e2) {
        errors.push(
          "   ❌ Python not found. Install Python 3.10+ from https://python.org",
        );
      }
    }

    // Check base model
    const modelPath = path.join(this.modelsDir, baseModel);
    if (!(await fs.pathExists(modelPath))) {
      errors.push(`   ❌ Base model not found: ${modelPath}`);
      errors.push(
        `   💡 Download with: curl -L -o models/${baseModel} "https://huggingface.co/Qwen/Qwen2.5-Coder-3B-Instruct-GGUF/resolve/main/${baseModel}"`,
      );
    }

    // Check training script
    const trainScript = path.join(this.scriptsDir, "train_lora.py");
    if (!(await fs.pathExists(trainScript))) {
      errors.push(`   ❌ Training script not found: ${trainScript}`);
    }

    // Check requirements.txt
    const reqFile = path.join(this.scriptsDir, "train_requirements.txt");
    if (!(await fs.pathExists(reqFile))) {
      errors.push(`   ❌ Requirements file not found: ${reqFile}`);
    }

    // Check Unsloth (Python package)
    try {
      await this._exec("python", ["-c", "import unsloth"], { timeout: 10000 });
    } catch (e) {
      errors.push(
        "   ⚠️  Unsloth not installed. Run: pip install -r agent/scripts/train_requirements.txt",
      );
    }

    return { ok: errors.length === 0, errors };
  }

  /**
   * Extract training dataset using existing DatasetExtractor
   */
  async extractDataset() {
    const DatasetExtractor = require("../tools/DatasetExtractor");
    const extractor = new DatasetExtractor(this.rootPath);
    await extractor.extract();

    const datasetPath = path.join(this.datasetsDir, "nexus-sft-dataset.jsonl");
    if (await fs.pathExists(datasetPath)) return datasetPath;

    // Fallback to retro dataset
    const retroPath = path.join(this.datasetsDir, "nexus-retro-dataset.jsonl");
    if (await fs.pathExists(retroPath)) return retroPath;

    return null;
  }

  /**
   * Count records in a JSONL file
   */
  async countDatasetRecords(datasetPath) {
    const content = await fs.readFile(datasetPath, "utf8");
    return content
      .trim()
      .split("\n")
      .filter((line) => line.trim().length > 0).length;
  }

  /**
   * Run LoRA fine-tuning via Python script
   */
  async runLoRATraining({ datasetPath, baseModel, rank, epochs, useGpu }) {
    await fs.ensureDir(this.adaptersDir);

    const trainScript = path.join(this.scriptsDir, "train_lora.py");
    const modelPath = path.join(this.modelsDir, baseModel);
    const adapterOutput = path.join(
      this.adaptersDir,
      `nexus-lora-r${rank}-e${epochs}`,
    );

    const args = [
      trainScript,
      "--dataset",
      datasetPath,
      "--model",
      modelPath,
      "--output",
      adapterOutput,
      "--rank",
      rank.toString(),
      "--epochs",
      epochs.toString(),
      useGpu ? "--gpu" : "--cpu",
    ];

    console.log(`   🐍 Running: python ${args.join(" ")}`);

    try {
      const pythonCmd = await this._findPython();
      const output = await this._exec(pythonCmd, args, {
        timeout: 86400000, // FIX: 24 hours max (was 1 hour)
        cwd: this.rootPath,
      });
      console.log(output);

      if (await fs.pathExists(adapterOutput)) {
        return adapterOutput;
      }

      // Check for adapter subdirectory
      const adapterFiles = await fs.readdir(this.adaptersDir);
      const latest = adapterFiles
        .filter((f) => f.startsWith("nexus-lora"))
        .sort()
        .pop();
      if (latest) return path.join(this.adaptersDir, latest);

      return null;
    } catch (e) {
      console.error(`   ❌ Training error: ${e.message}`);
      return null;
    }
  }

  /**
   * Merge LoRA adapter into base model using llama.cpp
   */
  async mergeAdapter({ baseModel, adapterPath }) {
    const mergedPath = path.join(this.modelsDir, "nexus-merged-f16.gguf");

    // Try llama.cpp export script
    const exportScript = await this._findLlamaCppExport();
    if (!exportScript) {
      console.warn("   ⚠️  llama.cpp export script not found.");
      console.warn(
        "   💡 Install llama.cpp: git clone https://github.com/ggerganov/llama.cpp",
      );
      console.warn(
        "   💡 Or use Python merge: python -m unsloth merge_and_save",
      );

      // Fallback: try Python merge
      return await this._pythonMerge(baseModel, adapterPath, mergedPath);
    }

    try {
      await this._exec(
        exportScript,
        [
          "--model",
          path.join(this.modelsDir, baseModel),
          "--lora",
          adapterPath,
          "--output",
          mergedPath,
        ],
        { timeout: 86400000 }, // FIX: 24 hours max
      );

      return mergedPath;
    } catch (e) {
      console.error(`   ❌ Merge error: ${e.message}`);
      return await this._pythonMerge(baseModel, adapterPath, mergedPath);
    }
  }

  /**
   * Fallback Python merge using Unsloth
   */
  async _pythonMerge(baseModel, adapterPath, mergedPath) {
    const pythonCmd = await this._findPython();
    // FIX: Langsung merge dan quantize ke Q4_K_M dalam 1 langkah (hemat I/O dan RAM ganda)
    // Kita tetap output nama "f16.gguf" sementara agar pipeline tidak pecah, lalu step quantize tinggal me-rename-nya
    const mergeScript = `
import sys
try:
    from unsloth import FastLanguageModel
    model, tokenizer = FastLanguageModel.from_pretrained("${path.join(this.modelsDir, baseModel).replace(/\\/g, "/")}")
    model.load_adapter("${adapterPath.replace(/\\/g, "/")}")
    model.save_pretrained_gguf("${mergedPath.replace(/\\/g, "/").replace(".gguf", "")}", tokenizer, quantization_method="q4_k_m")
    print("Merge & Quantize complete")
except Exception as e:
    print(f"Merge failed: {e}", file=sys.stderr)
    sys.exit(1)
`;
    try {
      const tmpScript = path.join(this.adaptersDir, "_merge_tmp.py");
      await fs.writeFile(tmpScript, mergeScript);
      await this._exec(pythonCmd, [tmpScript], { timeout: 86400000 }); // FIX: 24 hours max
      await fs.remove(tmpScript);

      // Unsloth outputs a file with -unsloth-Q4_K_M.gguf or -q4_k_m.gguf suffix
      const expectedPath1 = mergedPath.replace(".gguf", "") + "-q4_k_m.gguf";
      const expectedPath2 = mergedPath.replace(".gguf", "") + "-unsloth-Q4_K_M.gguf";
      
      if (await fs.pathExists(expectedPath1)) {
        await fs.move(expectedPath1, mergedPath, { overwrite: true });
        return mergedPath;
      }
      if (await fs.pathExists(expectedPath2)) {
        await fs.move(expectedPath2, mergedPath, { overwrite: true });
        return mergedPath;
      }
      if (await fs.pathExists(mergedPath)) return mergedPath;
      return null;
    } catch (e) {
      console.error(`   ❌ Python merge also failed: ${e.message}`);
      return null;
    }
  }

  /**
   * Quantize merged model to GGUF Q4_K_M
   */
  async quantizeModel({ mergedPath, outputName }) {
    const outputPath = path.join(this.modelsDir, outputName);

    // Try llama.cpp quantize binary
    const quantizeBin = await this._findQuantizeBin();
    if (quantizeBin) {
      try {
        await this._exec(quantizeBin, [mergedPath, outputPath, "Q4_K_M"], {
          timeout: 86400000, // FIX: 24 hours max
        });
        if (await fs.pathExists(outputPath)) return outputPath;
      } catch (e) {
        console.warn(
          `   ⚠️  Quantize binary failed: ${e.message}. Trying Python fallback...`,
        );
      }
    }

    // Fallback: Python quantization via Unsloth
    return await this._pythonQuantize(mergedPath, outputPath);
  }

  /**
   * Fallback Python quantization using Unsloth
   */
  async _pythonQuantize(mergedPath, outputPath) {
    // FIX: Karena _pythonMerge sekarang sudah langsung meng-output Q4_K_M (disamarkan sbg F16), 
    // kita cukup me-rename filenya saja di step ini. Memangkas proses load 6GB RAM kedua kali!
    try {
        if (await fs.pathExists(mergedPath)) {
            await fs.copy(mergedPath, outputPath);
            return outputPath;
        }
        return null;
    } catch (e) {
        console.error(`   ❌ Rename quantization failed: ${e.message}`);
        return null;
    }
  }

  /**
   * Cleanup intermediate files after successful training
   */
  async cleanup(mergedPath) {
    try {
      if (await fs.pathExists(mergedPath)) {
        await fs.remove(mergedPath);
        console.log("   🧹 Cleaned up intermediate merged model.");
      }
    } catch (_) {}
  }

  // ── Utility Methods ──

  async _findPython() {
    try {
      await this._exec("python", ["--version"], { timeout: 5000 });
      return "python";
    } catch (e) {
      try {
        await this._exec("python3", ["--version"], { timeout: 5000 });
        return "python3";
      } catch (e2) {
        throw new Error("Python not found");
      }
    }
  }

  async _findLlamaCppExport() {
    const candidates = [
      path.join(this.nativeDir, "llama-export-lora"),
      path.join(this.nativeDir, "llama-export-lora.exe"),
      path.join(this.nativeDir, "export-lora"),
      "llama-export-lora", // Try system PATH
    ];

    for (const candidate of candidates) {
      try {
        if (await fs.pathExists(candidate)) return candidate;
        await this._exec(candidate, ["--help"], { timeout: 5000 });
        return candidate;
      } catch (_) {}
    }
    return null;
  }

  async _findQuantizeBin() {
    const candidates = [
      path.join(this.nativeDir, "llama-quantize"),
      path.join(this.nativeDir, "llama-quantize.exe"),
      path.join(this.nativeDir, "quantize"),
      "llama-quantize", // Try system PATH
    ];

    for (const candidate of candidates) {
      try {
        if (await fs.pathExists(candidate)) return candidate;
        await this._exec(candidate, ["--help"], { timeout: 5000 });
        return candidate;
      } catch (_) {}
    }
    return null;
  }

  /**
   * Execute a command with timeout
   */
  _exec(command, args = [], options = {}) {
    return new Promise((resolve, reject) => {
      const timeoutMs = options.timeout || 60000;
      const proc = spawn(command, args, {
        cwd: options.cwd || this.rootPath,
        shell: process.platform === "win32",
      });

      let stdout = "",
        stderr = "";
      const timer = setTimeout(() => {
        proc.kill();
        reject(new Error(`Command timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      proc.stdout.on("data", (d) => {
        stdout += d.toString();
        // Stream training progress to console
        if (command.includes("python")) process.stdout.write(d);
      });
      proc.stderr.on("data", (d) => {
        stderr += d.toString();
        if (command.includes("python")) process.stderr.write(d);
      });

      proc.on("close", (code) => {
        clearTimeout(timer);
        if (code === 0) {
          resolve(stdout.trim());
        } else {
          reject(new Error(stderr.trim() || `Exit code ${code}`));
        }
      });

      proc.on("error", (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
  }
}

module.exports = ModelTrainer;
