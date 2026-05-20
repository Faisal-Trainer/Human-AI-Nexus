// agent/core/NativeBridge.js — v2.1.0
// FIX #03 — Cross-platform: tidak hardcode .exe; FIX timeout pada spawn

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs-extra");

class NativeBridge {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.binPath = path.join(this.rootPath, "nexus", "native");
    this.pythonPath = "python";
  }

  // FIX #03 — Cross-platform extension + 60s timeout
  async callCpp(binaryName, args = [], timeoutMs = 60000) {
    const ext = process.platform === "win32" ? ".exe" : "";
    const baseName = binaryName.replace(/\.exe$/i, "");
    const fullPath = path.join(this.binPath, `${baseName}${ext}`);

    if (!(await fs.pathExists(fullPath))) {
      throw new Error(
        `NativeBridge: C++ binary not found at ${fullPath}. Did you compile it?`,
      );
    }

    return new Promise((resolve, reject) => {
      const proc = spawn(fullPath, args, { shell: false });
      let output = "",
        error = "";
      const timer = setTimeout(() => {
        proc.kill();
        reject(
          new Error(`NativeBridge: C++ binary timed out after ${timeoutMs}ms`),
        );
      }, timeoutMs);
      proc.stdout.on("data", (d) => (output += d.toString()));
      proc.stderr.on("data", (d) => (error += d.toString()));
      proc.on("close", (code) => {
        clearTimeout(timer);
        code === 0
          ? resolve(output.trim())
          : reject(
              new Error(`NativeBridge: C++ failed (code ${code}): ${error}`),
            );
      });
      proc.on("error", (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  // FIX #03 — Python timeout 120s (AI distillation butuh lebih lama)
  async callPython(scriptPath, args = [], timeoutMs = 300000) {
    return new Promise((resolve, reject) => {
      const proc = spawn(this.pythonPath, [scriptPath, ...args], {
        shell: false,
      });
      let output = "",
        error = "";
      const timer = setTimeout(() => {
        proc.kill();
        reject(
          new Error(`NativeBridge: Python timed out after ${timeoutMs}ms`),
        );
      }, timeoutMs);
      proc.stdout.on("data", (d) => (output += d.toString()));
      proc.stderr.on("data", (d) => (error += d.toString()));
      proc.on("close", (code) => {
        clearTimeout(timer);
        code === 0
          ? resolve(output.trim())
          : reject(
              new Error(`NativeBridge: Python failed (code ${code}): ${error}`),
            );
      });
      proc.on("error", (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
  }
}

module.exports = NativeBridge;
