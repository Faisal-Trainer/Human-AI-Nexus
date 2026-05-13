
    <div class="max-w-2xl mx-auto space-y-8">
        <header class="text-center space-y-2">
            <h1 class="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-600">Habit Mastery</h1>
            <p class="text-slate-500 font-medium">Build consistency, unlock your potential.</p>
        </header>

        <form wire:submit.prevent="save" class="relative group">
            <input type="text" wire:model="title" placeholder="What habit to start?" class="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-indigo-500 transition-all shadow-xl shadow-indigo-500/5">
            <button type="submit" class="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl font-bold transition-all hover:scale-105 active:scale-95">Add</button>
        </form>

        <div class="grid gap-4">
            @foreach($items as $item)
                <div class="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-xl">
                            {{ $item->streak }}
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ $item->title }}</h3>
                            <p class="text-sm text-slate-400">Current Streak</p>
                        </div>
                    </div>
                    <button wire:click="toggle({{ $item->id }})" class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-green-500 hover:text-white transition-all text-slate-400">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </button>
                </div>
            @endforeach
        </div>
    </div>