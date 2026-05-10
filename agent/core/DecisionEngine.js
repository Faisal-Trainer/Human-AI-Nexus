/**
 * DecisionEngine - The "Supreme Court" of Nexus AI.
 * Resolves conflicts between multiple agent suggestions using weighted criteria.
 */
class DecisionEngine {
    constructor() {
        this.weights = {
            security: 0.5,
            stability: 0.3,
            performance: 0.1,
            readability: 0.1
        };
    }

    /**
     * Evaluate options and pick the best one.
     * @param {Array} options - List of { id, scores: { security, stability, performance, readability }, content }
     */
    resolve(options) {
        if (!options || options.length === 0) return null;
        if (options.length === 1) return options[0];

        const ranked = options.map(opt => {
            let totalScore = 0;
            for (const criteria in this.weights) {
                totalScore += (opt.scores[criteria] || 0) * this.weights[criteria];
            }
            return { ...opt, final_score: totalScore };
        });

        ranked.sort((a, b) => b.final_score - a.final_score);
        
        return {
            winner: ranked[0],
            runner_up: ranked[1],
            diff_score: ranked[0].final_score - ranked[1].final_score
        };
    }
}

module.exports = DecisionEngine;
