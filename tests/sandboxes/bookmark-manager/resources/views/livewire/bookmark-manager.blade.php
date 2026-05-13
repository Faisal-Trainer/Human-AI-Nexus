
    <div class="max-w-4xl mx-auto space-y-10">
        <h1 class="text-4xl font-black text-slate-900 dark:text-white text-center">Your Library</h1>
        
        <form wire:submit.prevent="save" class="bg-white dark:bg-slate-900 p-4 rounded-3xl border-4 border-slate-50 dark:border-slate-800 flex flex-wrap md:flex-nowrap gap-4 shadow-2xl shadow-indigo-500/10">
            <input type="text" wire:model="title" placeholder="Site Name" class="flex-1 bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl px-6 py-4 font-bold">
            <input type="text" wire:model="url" placeholder="https://..." class="flex-[2] bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl px-6 py-4">
            <button type="submit" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">Save</button>
        </form>

        <div class="grid md:grid-cols-2 gap-6">
            @foreach($items as $item)
                <a href="{{ $item->url }}" target="_blank" class="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
                    <div class="flex items-start gap-4">
                        <div class="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:scale-110 transition-all">
                            🔖
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="font-bold text-slate-800 dark:text-slate-100 truncate">{{ $item->title }}</h3>
                            <p class="text-xs text-slate-400 truncate">{{ $item->url }}</p>
                        </div>
                        <div class="text-slate-200 group-hover:text-indigo-500 transition-colors">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                        </div>
                    </div>
                </a>
            @endforeach
        </div>
    </div>