const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

/**
 * NativeBridge - The high-performance bridge between Node.js, Python, and C++.
 * Optimized for SSD-based IPC and Clang-compiled binaries.
 */
class NativeBridge {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.binPath = path.join(this.rootPath, 'nexus', 'native');
        this.pythonPath = 'python'; // Default to system python
    }

    /**
     * Execute a Clang-compiled C++ binary.
     * @param {string} binaryName - Name of the binary in nexus/native/
     * @param {Array} args - Arguments to pass.
     */
    async callCpp(binaryName, args = []) {
        const isWindows = process.platform === 'win32';
        const binaryFile = isWindows 
            ? (binaryName.endsWith('.exe') ? binaryName : `${binaryName}.exe`)
            : binaryName;
        const fullPath = path.join(this.binPath, binaryFile);
        if (!(await fs.pathExists(fullPath))) {
            throw new Error(`NativeBridge: C++ binary not found at ${fullPath}. Did you compile it?`);
        }

        return new Promise((resolve, reject) => {
            const proc = spawn(fullPath, args, { shell: false });
            let output = '';
            let error = '';

            proc.stdout.on('data', data => output += data.toString());
            proc.stderr.on('data', data => error += data.toString());

            proc.on('close', code => {
                if (code === 0) resolve(output.trim());
                else reject(new Error(`NativeBridge: C++ execution failed with code ${code}. Stderr: ${error}`));
            });
        });
    }

    /**
     * Execute a Python script (Intelligence Layer).
     * @param {string} scriptPath - Path to .py file.
     * @param {Array} args - Arguments to pass.
     */
    async callPython(scriptPath, args = []) {
        return new Promise((resolve, reject) => {
            const proc = spawn(this.pythonPath, [scriptPath, ...args], { shell: false });
            let output = '';
            let error = '';

            proc.stdout.on('data', data => output += data.toString());
            proc.stderr.on('data', data => error += data.toString());

            proc.on('close', code => {
                if (code === 0) resolve(output.trim());
                else reject(new Error(`NativeBridge: Python execution failed with code ${code}. Stderr: ${error}`));
            });
        });
    }
}

module.exports = NativeBridge;
