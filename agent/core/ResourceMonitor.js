const os = require('os');
const NexusClock = require('./NexusClock');

/**
 * ResourceMonitor - The "Physical Senses" of Nexus AI.
 * Monitors system CPU and Memory usage to ensure stability in Docker.
 */
class ResourceMonitor {
    constructor(thresholds = {}) {
        this.cpuThreshold = thresholds.cpu || 80; // 80%
        this.memThreshold = thresholds.mem || 90; // 90%
    }

    /**
     * Get current system metrics
     */
    getMetrics() {
        const freeMem = os.freemem();
        const totalMem = os.totalmem();
        const memUsage = ((totalMem - freeMem) / totalMem) * 100;

        const cpus = os.cpus();
        let totalIdle = 0;
        let totalTick = 0;

        cpus.forEach(cpu => {
            for (const type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        });

        return {
            cpu_usage_pct: 0, // Placeholder for real-time calc if needed
            mem_usage_pct: memUsage.toFixed(2),
            timestamp: NexusClock.getISOTimestamp(),
            platform: os.platform(),
            load_avg: os.loadavg()
        };
    }

    /**
     * Check if system is under stress
     */
    async checkStress() {
        const metrics = this.getMetrics();
        const isStressed = metrics.mem_usage_pct > this.memThreshold || metrics.load_avg[0] > (os.cpus().length * 0.8);
        
        return {
            stressed: isStressed,
            metrics: metrics,
            recommendation: isStressed ? 'THROTTLE' : 'PROCEED'
        };
    }
}

module.exports = ResourceMonitor;
