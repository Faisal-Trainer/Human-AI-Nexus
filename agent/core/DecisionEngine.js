/**
 * DecisionEngine - The "Supreme Court" of Nexus AI.
 * Resolves conflicts between multiple agent suggestions using weighted criteria.
 * v2.0: Context-aware weight profiles — different contexts, different priorities.
 */

// Weight profiles — setiap context punya prioritas berbeda
const WEIGHT_PROFILES = {
    default:     { security: 0.5, stability: 0.3, performance: 0.1, readability: 0.1 },
    saas:        { security: 0.3, stability: 0.4, performance: 0.2, readability: 0.1 },
    security:    { security: 0.6, stability: 0.3, performance: 0.05, readability: 0.05 },
    performance: { security: 0.2, stability: 0.2, performance: 0.5, readability: 0.1 },
    refactor:    { security: 0.2, stability: 0.3, performance: 0.1, readability: 0.4 },
    api:         { security: 0.4, stability: 0.3, performance: 0.2, readability: 0.1 },
    learning:    { security: 0.2, stability: 0.2, performance: 0.1, readability: 0.5 },
};

class DecisionEngine {
    constructor() {
        // Default weights (tetap ada untuk backward compat)
        this.weights = WEIGHT_PROFILES.default;
    }

    /**
     * Evaluate options and pick the best one.
     * @param {Array} options - List of { id, scores: { security, stability, performance, readability }, content }
     * @param {string} [context='default'] - Weight profile to use. Must be a key of WEIGHT_PROFILES.
     */
    resolve(options, context = 'default') {
        if (!options || options.length === 0) return null;
        if (options.length === 1) return { winner: options[0], runner_up: null, diff_score: 0, context_used: context };

        // Pilih profile — fallback ke default kalau context tidak dikenal
        const weights = WEIGHT_PROFILES[context] || WEIGHT_PROFILES.default;
        if (!WEIGHT_PROFILES[context]) {
            console.warn(
                `⚠️  DecisionEngine: Unknown context "${context}". ` +
                `Falling back to "default". Available: [${Object.keys(WEIGHT_PROFILES).join(', ')}]`
            );
        }

        const ranked = options.map(opt => {
            let totalScore = 0;
            for (const criteria in weights) {
                totalScore += (opt.scores?.[criteria] || 0) * weights[criteria];
            }
            return { ...opt, final_score: parseFloat(totalScore.toFixed(4)), context_used: context };
        });

        ranked.sort((a, b) => b.final_score - a.final_score);

        return {
            winner: ranked[0],
            runner_up: ranked[1] || null,
            diff_score: ranked[1]
                ? parseFloat((ranked[0].final_score - ranked[1].final_score).toFixed(4))
                : ranked[0].final_score,
            context_used: context,
            weights_applied: weights
        };
    }

    /**
     * List available weight profiles.
     * @returns {string[]}
     */
    getAvailableContexts() {
        return Object.keys(WEIGHT_PROFILES);
    }
}

module.exports = DecisionEngine;
