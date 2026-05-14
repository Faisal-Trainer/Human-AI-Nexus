const os = require('os');
const NexusClock = require('./NexusClock');

/**
 * ResourceMonitor - The "Physical Senses" of Nexus AI.
 * Monitors system CPU and Memory usage to ensure stability in Docker.
 * v2.0: Fixed CPU=0% bug. Real CPU measurement via two-snapshot method.
 */
class ResourceMonitor {
    constructor(thresholds = {}) {
        this.cpuThreshold = thresholds.cpu || 80; // 80%
        this.memThreshold = thresholds.mem || 85; // Turun dari 90 ke 85 untuk safety margin
    }

    /**
     * Measure real CPU usage via two-snapshot delta method.
     * CPU usage requires 2 readings with a delay — this is the correct approach.
     * @param {number} [sampleMs=200] - Sampling interval in ms.
     * @returns {Promise<number>} CPU usage percentage (0-100).
     */
    async getCpuUsage(sampleMs = 200) {
        const measure = () => {
            const cpus = os.cpus();
            let idle = 0, total = 0;
            cpus.forEach(cpu => {
                for (const type in cpu.times) total += cpu.times[type];
                idle += cpu.times.idle;
            });
            return { idle, total };
        };

        const start = measure();
        await new Promise(r => setTimeout(r, sampleMs));
        const end = measure();

        const idleDiff = end.idle - start.idle;
        const totalDiff = end.total - start.total;

        if (totalDiff === 0) return 0;
        return parseFloat((100 - (idleDiff / totalDiff) * 100).toFixed(1));
    }

    /**
     * Get current system metrics (async — includes real CPU measurement).
     * @returns {Promise<Object>}
     */
    async getMetrics() {
        const freeMem = os.freemem();
        const totalMem = os.totalmem();
        const memUsage = ((totalMem - freeMem) / totalMem) * 100;
        const cpuUsage = await this.getCpuUsage();

        return {
            cpu_usage_pct: cpuUsage,
            mem_usage_pct: parseFloat(memUsage.toFixed(2)),
            timestamp: NexusClock.getISOTimestamp(),
            platform: os.platform(),
            load_avg: os.loadavg()
        };
    }

    /**
     * Check if system is under stress with tiered recommendations.
     * @returns {Promise<{stressed: boolean, metrics: Object, recommendation: string}>}
     */
    async checkStress() {
        const metrics = await this.getMetrics();
        const { cpu_usage_pct: cpuPct, mem_usage_pct: memPct } = metrics;

        const isMemStressed = memPct > this.memThreshold;
        const isCpuStressed = cpuPct > this.cpuThreshold;
        const isStressed = isMemStressed || isCpuStressed;

        // Tiered recommendation berdasarkan severity
        let recommendation;
        if (memPct > 95 || cpuPct > 95) {
            recommendation = 'PAUSE';       // ⛔ Darurat: hentikan semua operasi
        } else if (isStressed) {
            recommendation = 'THROTTLE';   // ⚠️  Kurangi paralel agent
        } else {
            recommendation = 'PROCEED';    // ✅ Aman
        }

        if (recommendation !== 'PROCEED') {
            console.warn(
                `⚠️  ResourceMonitor [${recommendation}]: CPU=${cpuPct}%, MEM=${memPct}% ` +
                `(thresholds: cpu>${this.cpuThreshold}%, mem>${this.memThreshold}%)`
            );
        }

        return {
            stressed: isStressed,
            metrics,
            recommendation
        };
    }
}

module.exports = ResourceMonitor;
