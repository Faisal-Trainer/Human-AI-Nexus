const pLimit = require('p-limit');

/**
 * ParallelRunner - Concurrency Controller for Nexus Engine.
 * Optimized for SSD throughput and multi-core AI execution.
 */
class ParallelRunner {
    /**
     * Run tasks in parallel with a concurrency limit.
     * @param {Array} items - Data items to process.
     * @param {Function} taskFn - Async function to run for each item.
     * @param {number} limit - Max concurrent tasks (default 3 for SSD/Ollama balance).
     */
    static async run(items, taskFn, limit = 3) {
        const limiter = pLimit(limit);
        const tasks = items.map(item => limiter(() => taskFn(item)));
        return await Promise.all(tasks);
    }
}

module.exports = ParallelRunner;
