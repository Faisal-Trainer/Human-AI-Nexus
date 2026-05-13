
    <div class="max-w-6xl mx-auto grid lg:grid-cols-4 gap-10">
        <div class="lg:col-span-1 space-y-6">
            <h1 class="text-3xl font-black">Nexus Notes</h1>
            <form wire:submit.prevent="save" class="space-y-4">
                <input type="text" wire:model="title" placeholder="Note Title" class="w-full bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-2xl px-6 py-4 font-bold">
                <textarea wire:model="content" placeholder="Write something..." class="w-full bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-2xl px-6 py-4 h-40 resize-none"></textarea>
                <input type="text" wire:model="tags" placeholder="tags (comma separated)" class="w-full bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-2xl px-6 py-4 text-xs font-mono">
                <button type="submit" class="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-500/30">Save Note</button>
            </form>
        </div>

        <div class="lg:col-span-3 grid md:grid-cols-2 gap-6">
            @foreach($items as $item)
                <div class="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                    <h3 class="text-xl font-black mb-4 text-slate-900 dark:text-white">{{ $item->title }}</h3>
                    <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{{ $item->content }}</p>
                    <div class="flex flex-wrap gap-2">
                        @foreach(explode(',', $item->tags) as $tag)
                            @if(trim($tag))
                                <span class="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">#{{ trim($tag) }}</span>
                            @endif
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>
    </div>