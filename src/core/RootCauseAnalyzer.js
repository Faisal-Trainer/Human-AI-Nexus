/**
 * RootCauseAnalyzer - Systematic Debugging Machine.
 * Codifies NEXUS_SYSTEMATIC_DEBUGGING.md.
 */
class RootCauseAnalyzer {
    /**
     * Analyze a stack trace to find the root cause coordinate.
     */
    analyze(stackTrace) {
        if (!stackTrace) return { file: 'unknown', line: 0 };

        // Simple regex to find the first file:line in the stack trace
        const match = stackTrace.match(/\((.*):(\d+):(\d+)\)/) || stackTrace.match(/at (.*):(\d+):(\d+)/);
        
        if (match) {
            return {
                file: match[1],
                line: parseInt(match[2]),
                column: parseInt(match[3]),
                insight: `Akar masalah terdeteksi di ${match[1]} baris ${match[2]}.`
            };
        }

        return { file: 'unknown', line: 0, insight: 'Gagal mendeteksi koordinat akar masalah.' };
    }
}

module.exports = RootCauseAnalyzer;
