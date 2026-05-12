<div class="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nexus URL Shortener</h2>
    
    <form wire:submit.prevent="shorten" class="space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Paste your long URL</label>
            <input type="text" wire:model="original_url" 
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="https://example.com/very/long/url/that/needs/shortening">
            @error('original_url') <span class="text-red-500 text-xs mt-1">{{ $message }}</span> @enderror
        </div>

        <button type="submit" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-lg shadow-blue-500/30">
            Generate Short URL
        </button>
    </form>

    @if($shortened)
        <div class="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
            <p class="text-sm text-green-800 dark:text-green-300 font-medium mb-1">Your short link is ready:</p>
            <div class="flex items-center gap-2">
                <input type="text" readonly value="{{ $shortened }}" id="shortUrl"
                    class="flex-1 bg-transparent border-none text-green-700 dark:text-green-400 font-bold focus:ring-0">
                <button onclick="navigator.clipboard.writeText('{{ $shortened }}')" 
                    class="px-3 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold rounded hover:bg-green-300 transition">
                    Copy
                </button>
            </div>
        </div>
    @endif
</div>
