/**
 * ParallelRunner - Concurrency Controller for Nexus Engine.
 * Optimized for SSD throughput and multi-core AI execution.
 * (Custom implementation replacing p-limit to fix ES Module issues)
 */
class ParallelRunner {
    /**
     * Run tasks in parallel with a concurrency limit.
     * @param {Array} items - Data items to process.
     * @param {Function} taskFn - Async function to run for each item.
     * @param {number} limit - Max concurrent tasks (default 3 for SSD/Ollama balance).
     */
    static async run(items, taskFn, limit = 3) {
        const results = new Array(items.length);
        let index = 0;
        
        const worker = async () => {
            while (index < items.length) {
                const currentIndex = index++;
                // FIX: Stagger antar task paralel agar CPU LLM tidak langsung hit 100% dari 3 thread bersamaan
                await new Promise(r => setTimeout(r, 500));
                try {
                    results[currentIndex] = await taskFn(items[currentIndex]);
                } catch (e) {
                    results[currentIndex] = { error: e.message, severity: 'SCANNER_ERROR' };
                    // Jangan throw — catat error tapi lanjut ke item berikutnya
                }
            }
        };

        const workers = [];
        for (let i = 0; i < Math.min(limit, items.length); i++) {
            workers.push(worker());
        }

        await Promise.all(workers);
        return results;
    }
}

module.exports = ParallelRunner;
