
    <div class="max-w-4xl mx-auto space-y-12">
        <div class="text-center">
            <h1 class="text-6xl font-black mb-4">Shrink It.</h1>
            <p class="text-slate-400 text-xl font-medium">Make your long URLs beautiful and trackable.</p>
        </div>

        <form wire:submit.prevent="shorten" class="bg-white dark:bg-slate-900 p-2 rounded-[30px] border-4 border-indigo-50 dark:border-slate-800 shadow-2xl flex gap-2">
            <input type="text" wire:model="original_url" placeholder="Paste your long link here..." class="flex-1 bg-transparent border-0 focus:ring-0 px-8 py-4 text-lg">
            <button type="submit" class="bg-indigo-600 text-white px-10 py-4 rounded-[20px] font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">Shorten</button>
        </form>

        <div class="space-y-4">
            @foreach($items as $item)
                <div class="bg-white dark:bg-slate-900 p-6 rounded-[30px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-wrap md:flex-nowrap justify-between items-center group">
                    <div class="min-w-0">
                        <p class="text-slate-800 dark:text-slate-100 font-bold truncate">{{ $item->original_url }}</p>
                        <p class="text-indigo-600 font-black text-lg mt-1">nexus.ai/{{ $item->short_code }}</p>
                    </div>
                    <div class="flex items-center gap-6 mt-4 md:mt-0">
                        <div class="text-right">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Clicks</p>
                            <p class="text-xl font-black text-slate-800 dark:text-white">{{ $item->clicks }}</p>
                        </div>
                        <button class="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all">📋</button>
                    </div>
                </div>
            @endforeach
        </div>
    </div>