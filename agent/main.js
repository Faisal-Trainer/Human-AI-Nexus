const NexusEngine = require("./core/NexusEngine");
// FIX #23 — Orchestrator dihapus dari main.js; NexusEngine sudah membuat instance internal
// Menggunakan engine.orchestrator jika perlu akses dari luar
const path = require("path");
const readline = require("readline");
const fs = require("fs-extra");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

/**
 * Main function to handle CLI arguments and execution
 */
async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const flags = {
    mode: args.includes("--mode")
      ? args[args.indexOf("--mode") + 1]
      : args.includes("-m")
        ? args[args.indexOf("-m") + 1]
        : null,
    root: args.includes("--root")
      ? args[args.indexOf("--root") + 1]
      : process.cwd(),
    target: args.includes("--target")
      ? args[args.indexOf("--target") + 1]
      : args.includes("-t")
        ? args[args.indexOf("-t") + 1]
        : args[1] && !args[1].startsWith("-")
          ? args[1]
          : null,
    yes: args.includes("--yes") || args.includes("-y"),
    command: args[0] && !args[0].startsWith("-") ? args[0] : "run",
  };

  const targetPath = flags.target
    ? path.resolve(flags.target)
    : path.resolve(flags.root);

  // FIX #23 — Hanya satu instance engine; gunakan engine.orchestrator jika perlu
  const engine = new NexusEngine({ rootPath: path.resolve(flags.root) });

  switch (flags.command) {
    case "run": {
      console.log(
        "\x1b[36m%s\x1b[0m",
        '🛡️ Nexus Orchestrator: "Selamat datang di Fase Audit."',
      );

      let mode = flags.mode || "learning";
      let allowSensitive = true;

      if (!flags.yes) {
        console.log("\n--- I/O DASAR NEXUS (CODER-FOCUSED) ---");
        console.log(
          "1. [Learning Mode] Saya developer baru/ingin belajar dari temuan tiap agent spesialis.",
        );
        console.log(
          "2. [Efficient Mode] Saya sudah senior/ingin laporan ringkas yang dikonsolidasi PM.",
        );

        const choice = await ask("\nPilih mode audit (1/2): ");
        mode = choice === "2" ? "efficient" : "learning";

        const allowSensitiveChoice = await ask(
          "Izinkan scan file sensitif (package.json, composer.json, .env)? (y/n): ",
        );
        allowSensitive = allowSensitiveChoice.toLowerCase() === "y";
      } else {
        console.log(
          `⚡ Mode Otomatis Aktif: Menggunakan mode "${mode}" dan mengizinkan scan file sensitif.`,
        );
      }

      // --- CORE I/O LOOP ---
      console.log("\n🧠 Inisialisasi Environment & Memory...");
      await engine.discoverSkills();
      await engine.readMemory();

      console.log("\n🏗️ [0.5/4] Memulai Fase Blueprint & Scaffolding...");
      await engine.blueprintApp({ mode, allowSensitive });

      console.log(
        `\n🔍 [1/4] Memulai Fase Audit pada target: ${targetPath}...`,
      );
      const report = await engine.audit(targetPath, { mode, allowSensitive });

      let approved = false;
      let plan;

      while (!approved) {
        console.log("\n📅 [2/4] Menyusun Planning Pengembangan...");
        plan = await engine.plan(report);

        console.log("\n=========================================");
        console.log("📑 USULAN PENGEMBANGAN (PLANNING)");
        console.log("=========================================");
        plan.tasks.forEach((t) => {
          console.log(`\n📌 Task ${t.id}: ${t.description}`);
          console.log(`   💡 Saran Perbaikan: ${t.recommendation}`);
        });
        console.log("=========================================\n");

        if (flags.yes) {
          console.log(
            "⚡ Mode Otomatis Aktif: Planning disetujui oleh sistem.",
          );
          approved = true;
        } else {
          const response = await ask(
            "🧑‍💻 DEV APPROVAL: Apakah Anda menyetujui planning pengembangan ini? (y/n): ",
          );
          if (response.toLowerCase() === "y") {
            approved = true;
            console.log("✅ Planning disetujui. Melanjutkan eksekusi...");
          } else {
            console.log("❌ Planning ditolak oleh Dev.");
            const feedback = await ask(
              "Tolong berikan feedback/alasan penolakan untuk menyesuaikan planning: ",
            );
            console.log(
              "🔄 Memproses ulang planning berdasarkan feedback Dev...",
            );
            // Inject feedback to influence next planning loop
            report.findings.push({
              severity: "INFO",
              message: `USER FEEDBACK: ${feedback}`,
              rationale: "Feedback dari Developer untuk iterasi planning.",
              recommendation: "Sesuaikan rencana berdasarkan feedback ini.",
            });
          }
        }
      }

      console.log("\n🏗️ [2.5/4] Memulai Fase Implementasi (Generasi Kode)...");
      await engine.implement();

      console.log("\n🚀 [3/4] Memulai Fase Eksekusi Perubahan...");
      await engine.execute(plan);
      await engine.verify(plan);

      console.log(
        "\n🧹 [3.5/4] Memulai Fase Clean Code & Verifikasi Stabilitas...",
      );
      await engine.cleanCodeAndVerify(targetPath);

      console.log("\n📝 [4/4] Memulai Fase Dokumentasi (Laporan untuk Dev)...");
      const cycleID = `CYCLE-${Date.now()}`;
      await engine.record(cycleID);
      await engine.generateCycleSummary(cycleID);

      console.log("\n✅ SIKLUS SELESAI.");
      console.log(
        `Laporan perubahan & dokumentasi telah disimpan di memory/operational. Sangat disarankan untuk membaca file MD terkait.`,
      );

      rl.close();
      break;
    }
    case "audit": {
      await engine.audit(targetPath);
      rl.close();
      break;
    }
    case "skills": {
      const registry = await engine.discoverSkills();
      console.log("\n📚 Nexus Skill Registry:");
      Object.entries(registry).forEach(([cat, skills]) => {
        console.log(
          `- \x1b[33m${cat.toUpperCase()}\x1b[0m: ${skills.join(", ")}`,
        );
      });
      rl.close();
      break;
    }
    case "agents": {
      const agentRegistry = await engine.discoverAgents();
      console.log("\n🤖 Nexus Agent Registry:");
      Object.entries(agentRegistry).forEach(([cat, agents]) => {
        console.log(
          `- \x1b[35m${cat.toUpperCase()}\x1b[0m: ${agents.join(", ")}`,
        );
      });
      rl.close();
      break;
    }
    case "harvest": {
      const sourcePath = flags.target;
      if (!sourcePath) {
        console.log(
          "Error: Path sumber proyek (source path) wajib disertakan.",
        );
        console.log("Usage: nexus harvest <path_to_project>");
      } else {
        await engine.harvest(path.resolve(sourcePath));
      }
      rl.close();
      break;
    }
    case "refactor": {
      await engine.massRefactor();
      rl.close();
      break;
    }
    case "update-skills": {
      await engine.massUpdateSkills();
      rl.close();
      break;
    }
    case "distill": {
      const rack = args.includes("--rack")
        ? args[args.indexOf("--rack") + 1]
        : null;
      if (rack) engine.setRack(rack);
      await engine.distill();
      rl.close();
      break;
    }
    case "forge": {
      const machineName = args[1];
      const wisdomPath = args[2];
      if (!machineName || !wisdomPath) {
        console.log("Error: Machine name and wisdom path are required.");
        console.log("Usage: nexus forge <MachineName> </path/to/wisdom.md>");
      } else {
        await engine.machinist.forge(machineName, path.resolve(wisdomPath));
      }
      rl.close();
      break;
    }
    case "status": {
      await engine.getSystemStatus();
      rl.close();
      break;
    }
    case "sandbox": {
      // nexus sandbox [--section 1|2|3] [--distill]
      const { spawn: spawnChild } = require("child_process");
      const fs = require("fs-extra");
      const runnerPath = path.join(
        __dirname,
        "..",
        "tests",
        "TDD",
        "sandbox-master-runner.js",
      );
      const sandboxArgs = args.slice(1); // --section X, --distill, etc.

      if (!fs.existsSync(runnerPath)) {
        console.error(
          `\x1b[31m❌ Sandbox runner tidak ditemukan: ${runnerPath}\x1b[0m`,
        );
        console.error(
          `   Pastikan folder tests/TDD/ tersedia di instalasi Nexus.`,
        );
        rl.close();
        process.exit(1);
      }

      console.log(
        "\x1b[36m%s\x1b[0m",
        "🧪 Nexus Sandbox Master Runner: Starting...",
      );
      let spawnCommand = "bun";
      let sArgs = [runnerPath, ...sandboxArgs];
      let shellOpt = false;

      if (process.platform === "win32") {
        spawnCommand = `bun "${runnerPath}" ${sandboxArgs.map((a) => `"${a}"`).join(" ")}`;
        sArgs = [];
        shellOpt = true;
      }

      const sandboxProc = spawnChild(spawnCommand, sArgs, {
        stdio: "inherit",
        shell: shellOpt,
      });

      sandboxProc.on("error", (err) => {
        console.error(
          `\x1b[31m❌ Gagal menjalankan sandbox: ${err.message}\x1b[0m`,
        );
        rl.close();
        process.exit(1);
      });

      sandboxProc.on("exit", (code) => {
        rl.close();
        process.exit(code || 0);
      });
      return new Promise(() => {}); // Handled in exit callback
    }
    case "dlq": {
      // nexus dlq — tampilkan Dead Letter Queue (task gagal permanen)
      const fs = require("fs-extra");
      const dlqPath = path.join(
        path.resolve(flags.root),
        "logs",
        "dead_letter_queue.json",
      );
      if (!(await fs.pathExists(dlqPath))) {
        console.log("✅ Dead Letter Queue: kosong (file tidak ditemukan).");
      } else {
        const dlq = await fs.readJson(dlqPath).catch(() => []);
        if (dlq.length === 0) {
          console.log(
            "✅ Dead Letter Queue: kosong — tidak ada task yang gagal permanen.",
          );
        } else {
          console.log(
            `\n💀 Dead Letter Queue — ${dlq.length} task gagal permanen:\n`,
          );
          dlq.forEach((t, i) => {
            console.log(`  [${i + 1}] Task ID  : ${t.task_id}`);
            console.log(`       Agent    : ${t.error?.agent || "unknown"}`);
            console.log(`       Error    : ${t.error?.message || t.error}`);
            console.log(`       Waktu    : ${t.failed_at}`);
            console.log("");
          });
          console.log(`  Hapus DLQ: rm logs/dead_letter_queue.json`);
        }
      }
      rl.close();
      break;
    }
    case "think": {
      const question = args.slice(1).join(" ");
      if (!question) {
        console.log("Usage: nexus think <your question>");
      } else {
        console.log("\x1b[36m%s\x1b[0m", `🤔 Nexus is retrieving context and thinking about: "${question}"...`);
        
        // 1. RAG Retrieval via Knowledge Graph & Vault
        let augmentedPrompt = question;
        try {
          if (!engine.semanticEngine.graphEngine.isBuilt) {
            await engine.semanticEngine.buildGraphOnly();
          }
          const graphResult = await engine.searchKnowledgeGraph(question, {
            maxHops: 1,
            maxNeighborsPerSeed: 3,
            maxTotalChars: 3000,
          });

          if (graphResult && graphResult.graphContextString) {
            const seedNames = (graphResult.seeds || []).map(s => `[[${s.title}]]`).join(", ");
            const neighborNames = (graphResult.connectedNotes || []).map(n => `[[${n.node.title}]]`).join(", ");
            console.log(`\x1b[33m📚 Knowledge Context Retrieved from Vault:\x1b[0m`);
            if (seedNames) console.log(`   🎯 Focus Notes: ${seedNames}`);
            if (neighborNames) console.log(`   🔗 Connected  : ${neighborNames}`);
            console.log("");

            augmentedPrompt = `Anda adalah NEXUS AI Assistant. Jawab pertanyaan user berdasarkan konteks knowledge graph berikut jika relevan.\n\n${graphResult.graphContextString}\n\n---\nPertanyaan: ${question}\nJawaban:`;
          }
        } catch (ragErr) {
          console.warn(`⚠️ RAG retrieval skipped: ${ragErr.message}`);
        }

        // 2. Inference via Local AI (Vulkan GPU backend)
        const answer = await engine.localAI.generate(augmentedPrompt, "explain_error");
        console.log("\n\x1b[32m%s\x1b[0m", "🤖 Answer:");
        console.log(answer || "No response from local AI.");
      }
      rl.close();
      break;
    }
    case "review": {
      const filePath = args[1];
      if (!filePath) {
        console.log("Usage: nexus review <file_path>");
      } else {
        const absolutePath = path.resolve(filePath);
        if (await fs.pathExists(absolutePath)) {
          const code = await fs.readFile(absolutePath, "utf8");
          console.log("\x1b[36m%s\x1b[0m", `🔍 Reviewing ${filePath}...`);
          const review = await engine.localAI.analyzeCode(code);
          console.log("\n\x1b[32m%s\x1b[0m", "📊 Code Review:");
          console.log(review || "No response from local AI.");
        } else {
          console.log(`Error: File ${filePath} not found.`);
        }
      }
      rl.close();
      break;
    }
    case "train": {
      // nexus train [--rank 16] [--epochs 3] [--base-model model.gguf] [--output name.gguf] [--cpu]
      const ModelTrainer = require("./core/ModelTrainer");
      const trainer = new ModelTrainer(path.resolve(flags.root));

      const trainOptions = {
        baseModel: args.includes("--base-model")
          ? args[args.indexOf("--base-model") + 1]
          : undefined,
        outputName: args.includes("--output")
          ? args[args.indexOf("--output") + 1]
          : undefined,
        rank: args.includes("--rank")
          ? parseInt(args[args.indexOf("--rank") + 1])
          : 16,
        epochs: args.includes("--epochs")
          ? parseInt(args[args.indexOf("--epochs") + 1])
          : 3,
        gpu: !args.includes("--cpu"),
      };

      await trainer.train(trainOptions);
      rl.close();
      break;
    }
    case "vault": {
      console.log("\x1b[36m%s\x1b[0m", "\n🏛️ NEXUS Obsidian Vault Status");
      console.log("==========================================");
      const vStats = await engine.obsidianBridge.getVaultStats();
      if (!vStats.connected) {
        console.log("\x1b[33m%s\x1b[0m", `⚠️ Vault is not connected or path not found: ${vStats.vaultPath}`);
        console.log("Pastikan konfigurasi .nexus-vault.json sudah sesuai.");
      } else {
        console.log(`📍 Vault Path    : ${vStats.vaultPath}`);
        console.log(`🔗 Connection    : \x1b[32mACTIVE / CONNECTED\x1b[0m`);
        console.log("\n📁 BLUEPRINT Folders:");
        console.log(`   ├─ 🆕 new/        : ${vStats.blueprints.new} blueprints`);
        console.log(`   ├─ 📦 archive/    : ${vStats.blueprints.archive} historical versions`);
        console.log(`   ├─ 🚀 100 project/: ${vStats.blueprints["100_project"]} active sandbox blueprints`);
        console.log(`   └─ 🤖 3 qwen/     : ${vStats.blueprints["3_qwen"]} model dataset entries`);
        console.log(`   📊 Total Files    : ${vStats.blueprints.total} blueprints`);
        console.log("\n🧪 CUDA / Colab Training Dataset:");
        console.log(`   ├─ Samples Count  : ${vStats.dataset.samples} conversations`);
        console.log(`   ├─ File Size      : ${(vStats.dataset.jsonlBytes / 1024).toFixed(1)} KB`);
        console.log(`   └─ Colab Ready    : ${vStats.dataset.colabReady ? "\x1b[32mYES\x1b[0m" : "\x1b[33mNO (Belum ada data)\x1b[0m"}`);
        console.log("\n🧠 Self-Correction Knowledge:");
        console.log(`   └─ Lessons Stored : ${vStats.lessonsCount} files in NEXUS LESSONS/`);
      }
      console.log("==========================================\n");
      rl.close();
      break;
    }
    case "dataset": {
      console.log("\x1b[36m%s\x1b[0m", "\n📊 NEXUS CUDA Training Dataset Analytics");
      console.log("==========================================");
      const bpVault = engine.obsidianBridge.getBlueprintVaultPath();
      const jsonlPath = bpVault ? path.join(bpVault, "3 qwen", "colab_cuda_training_dataset.jsonl") : null;

      if (jsonlPath && (await fs.pathExists(jsonlPath))) {
        const content = await fs.readFile(jsonlPath, "utf8");
        const lines = content.split("\n").filter((l) => l.trim());
        const totalChars = content.length;
        const estTokens = Math.round(totalChars / 4);

        console.log(`📍 Dataset Path   : ${jsonlPath}`);
        console.log(`📦 Format         : JSONL (ChatML / OpenAI / LLaMA-3 Format)`);
        console.log(`🎯 Target Platform: Google Colab + CUDA (Unsloth / Axolotl / LoRA)`);
        console.log(`📝 Total Samples  : ${lines.length} conversations`);
        console.log(`🔤 Approx Tokens  : ~${estTokens.toLocaleString()} tokens`);
        console.log(`💾 Disk Size      : ${(totalChars / 1024).toFixed(1)} KB`);
        console.log("\n🚀 Cara Training di Google Colab:");
        console.log("   1. Buka file colab_cuda_training_dataset.jsonl di vault.");
        console.log("   2. Upload ke Google Colab runtime GPU (T4 / A100 / L4).");
        console.log("   3. Load dengan Unsloth: `FastLanguageModel.from_pretrained('Qwen/Qwen2.5-Coder-3B-Instruct')`.");
      } else {
        console.log("⚠️ Dataset belum terisi. Jalankan sandbox: `nexus sandbox` untuk generate data.");
      }
      console.log("==========================================\n");
      rl.close();
      break;
    }
    case "blueprint": {
      const projectName = args[1];
      const bpVault = engine.obsidianBridge.getBlueprintVaultPath();

      if (!projectName) {
        console.log("\x1b[36m%s\x1b[0m", "\n📋 Available Blueprints in Vault (new/):");
        if (bpVault) {
          const newDir = path.join(bpVault, "new");
          if (await fs.pathExists(newDir)) {
            const files = (await fs.readdir(newDir)).filter((f) => f.endsWith(".json"));
            if (files.length === 0) {
              console.log("   (Belum ada blueprint di folder new/)");
            } else {
              files.forEach((f) => console.log(`   📄 ${f.replace(".json", "")}`));
            }
          }
        }
        console.log("\n💡 Untuk melihat detail arsitektur: nexus blueprint <nama_project>\n");
      } else {
        let bpFile = bpVault ? path.join(bpVault, "new", `${projectName}.json`) : null;
        if (!bpFile || !(await fs.pathExists(bpFile))) {
          bpFile = path.join(process.cwd(), "tests", "sandboxes", projectName, "NEXUS_BLUEPRINT.json");
        }
        if (!bpFile || !(await fs.pathExists(bpFile))) {
          bpFile = path.join(process.cwd(), "memory", "operational", "blueprints", `${projectName}.json`);
        }

        if (await fs.pathExists(bpFile)) {
          const bp = await fs.readJson(bpFile);
          console.log("\x1b[36m%s\x1b[0m", `\n🏗️ Blueprint Preview: ${bp.project_name || projectName}`);
          console.log("==========================================");
          console.log(`📦 Models         : ${(bp.models || []).join(", ")}`);
          console.log(`🗄️ Migrations      : ${(bp.migrations || []).join(", ")}`);
          console.log(`⚡ Livewire UI    : ${(bp.livewire_components || []).join(", ")}`);
          console.log(`🌐 Routes         : ${(bp.routes || []).join(", ")}`);
          console.log(`🌱 Seeders        : ${(bp.seeders || []).join(", ")}`);
          console.log(`🏭 Factories      : ${(bp.factories || []).join(", ")}`);
          if (bp.relationships && bp.relationships.length > 0) {
            console.log("🔗 Relationships  :");
            bp.relationships.forEach((r) => console.log(`   - ${r.model} --[${r.type}]--> ${r.target}`));
          }
          console.log("==========================================\n");
        } else {
          console.log(`❌ Blueprint untuk project "${projectName}" tidak ditemukan.`);
        }
      }
      rl.close();
      break;
    }
    case "lessons": {
      console.log("\x1b[36m%s\x1b[0m", "\n🧠 NEXUS Self-Correction Lessons & Wisdom");
      console.log("==========================================");
      const lessonDir = engine.obsidianBridge.isActive()
        ? path.join(engine.obsidianBridge.vaultPath, "NEXUS AI", "NEXUS LESSONS")
        : null;

      const localDir = engine.knowledgePath;
      const fg = require("fast-glob");

      const localLessons = await fg("**/NEXUS_LESSON_*.md", {
        cwd: localDir.replace(/\\/g, "/"),
        onlyFiles: true,
      });

      console.log(`📁 Local Memory Lessons   : ${localLessons.length} files`);
      localLessons.slice(0, 10).forEach((f) => console.log(`   📄 ${path.basename(f)}`));

      if (lessonDir && (await fs.pathExists(lessonDir))) {
        const vaultLessons = (await fs.readdir(lessonDir)).filter((f) => f.endsWith(".md"));
        console.log(`\n🔗 Obsidian Vault Lessons: ${vaultLessons.length} files`);
        vaultLessons.slice(0, 10).forEach((f) => console.log(`   📄 ${f}`));
      }
      console.log("==========================================\n");
      rl.close();
      break;
    }
    case "graph": {
      console.log("\x1b[36m%s\x1b[0m", "\n🌐 NEXUS Knowledge Graph & GraphRAG");
      console.log("==========================================");

      const query = args.slice(1).join(" ").trim();

      // Ensure graph is built (fast build without waiting for vector embeddings)
      if (!engine.semanticEngine.graphEngine.isBuilt) {
        console.log("⏳ Loading/Building knowledge graph from Obsidian Vault & Memory...");
        await engine.semanticEngine.buildGraphOnly();
      }

      const graph = engine.semanticEngine.graphEngine;
      const stats = graph.getStats();

      if (!query) {
        console.log(`📊 Total Nodes (Notes) : \x1b[32m${stats.totalNodes}\x1b[0m`);
        console.log(`🔗 Total Edges (Links) : \x1b[32m${stats.totalEdges}\x1b[0m (${stats.bidirectionalEdges} bidirectional)`);
        console.log(`🏷️  Total Tags Indexed : \x1b[32m${stats.totalTags}\x1b[0m`);
        console.log("\n🌟 Top Central Hubs (Highest Connected Notes):");
        stats.topHubs.slice(0, 8).forEach((hub, idx) => {
          console.log(`   ${idx + 1}. [[${hub.title}]] -> ${hub.totalDegree} connections (${hub.outlinks} out, ${hub.backlinks} back)`);
        });
        console.log("\n💡 Tip: Jalankan 'nexus graph <nama_note_atau_topik>' untuk visualisasi tree 1-hop/2-hop.");
      } else {
        console.log(`🔍 Searching Graph & Wikilinks for: "${query}"...\n`);
        
        // Find direct node matches
        const directNodes = graph.findNodes(query);
        if (directNodes.length > 0) {
          console.log(`🎯 Found matching note: [[${directNodes[0].title}]]\n`);
          console.log(graph.visualizeTree(directNodes[0].id));
        }

        // Run GraphRAG traversal
        const seeds = directNodes.length > 0 ? directNodes.slice(0, 2) : [query];
        const graphResult = graph.traverse(seeds, { maxHops: 1, maxNeighborsPerSeed: 4 });

        if (graphResult.connectedNotes.length > 0) {
          console.log("\n--- Graph Context Injected for LLM (GraphRAG) ---");
          console.log(graphResult.graphContextString);
        } else if (directNodes.length === 0) {
          console.log(`⚠️ Tidak ditemukan note atau koneksi yang cocok dengan query "${query}".`);
        }
      }
      console.log("==========================================\n");
      rl.close();
      break;
    }
    case "clear-cache":
    case "clear-chace":
    case "clear:cache":
    case "cache-clear": {
      const CacheManager = require("./tools/CacheManager");
      const cm = new CacheManager(path.resolve(__dirname, ".."));
      await cm.clearAndBackup();
      rl.close();
      break;
    }
    case "help":
    default:
      console.log(`
Human-AI Nexus Core Engine
Usage:
  nexus run [target]  - Start a full Audit -> Plan -> Execute cycle (on whole project or specific target folder)
  nexus audit [target]- Run only the Audit phase (on whole project or specific target folder)
  nexus status        - Show real-time system health (CPU, RAM, agents, evolution)
  nexus graph [query] - 🆕 Inspect Obsidian Knowledge Graph (Wikilinks, Backlinks, GraphRAG Context)
  nexus vault         - 🆕 Show Obsidian Vault status & Blueprint counts (new, archive, 100 project, 3 qwen)
  nexus dataset       - 🆕 Analytics for Colab CUDA fine-tuning dataset in 3 qwen/
  nexus blueprint [p] - 🆕 Inspect & preview project architecture blueprint
  nexus lessons       - 🆕 View self-correction lessons learned from automated TDD feedback
  nexus dlq           - View Dead Letter Queue (permanently failed tasks)
  nexus sandbox       - Run all 100 sandbox projects autonomously
  nexus sandbox --section <1-10> - Run a specific Section only
  nexus sandbox --distill     - Run all + distill knowledge to HUB
  nexus clear-cache   - 🧹 Backup all cache to Obsidian Vault & clear local cache
  nexus harvest <dir> - Harvest Nexus docs from another project to Golden HUB
  nexus refactor      - [Protocol 1] Mass Refactor from Golden to HUB
  nexus update-skills - [Protocol 2] Mass Update from HUB to Skills
  nexus skills        - List available agent skills
  nexus agents        - List available internal and external agents
  nexus distill       - Distill and standardize the HUB (NEXUS_ prefix)
  nexus forge <name> <file> - Forge a new machine from wisdom file
  nexus think <query> - Ask local AI for architectural advice
  nexus review <file> - Review specific code using local AI
  nexus train         - Train custom LoRA model from Nexus dataset → GGUF
  nexus help          - Show this help
            `);
      rl.close();
      break;
  }
}

// Export for library use
module.exports = NexusEngine;

// Run if called directly
if (require.main === module) {
  main()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
