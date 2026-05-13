
    <div class="max-w-3xl mx-auto space-y-12">
        <div class="text-center">
            <h1 class="text-5xl font-black text-slate-900 dark:text-white mb-2">Hello, Today?</h1>
            <p class="text-slate-400 italic">Capture your thoughts, clear your mind.</p>
        </div>

        <form wire:submit.prevent="save" class="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-6">
            <textarea wire:model="content" rows="6" placeholder="Start writing..." class="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-3xl px-8 py-6 text-xl focus:ring-2 focus:ring-indigo-500 transition-all resize-none"></textarea>
            <div class="flex justify-between items-center">
                <div class="flex gap-4">
                    @foreach(['happy' => '😊', 'neutral' => '😐', 'sad' => '😔'] as $m => $emoji)
                        <button type="button" wire:click="$set('mood', '{{ $m }}')" class="w-12 h-12 rounded-full border-2 {{ $mood == $m ? 'border-indigo-500 bg-indigo-50' : 'border-transparent' }} text-2xl transition-all">
                            {{ $emoji }}
                        </button>
                    @endforeach
                </div>
                <button type="submit" class="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-10 py-4 rounded-3xl font-black hover:scale-105 transition-all">Save Entry</button>
            </div>
        </form>

        <div class="space-y-6">
            @foreach($items as $item)
                <div class="bg-white dark:bg-slate-900 p-8 rounded-[35px] border border-slate-50 dark:border-slate-800 shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-xs font-black uppercase tracking-widest text-slate-400">{{ $item->created_at->format('M d, Y - H:i') }}</span>
                        <span class="text-2xl">{{ $item->mood == 'happy' ? '😊' : ($item->mood == 'sad' ? '😔' : '😐') }}</span>
                    </div>
                    <p class="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{{ $item->content }}</p>
                </div>
            @endforeach
        </div>
    </div>