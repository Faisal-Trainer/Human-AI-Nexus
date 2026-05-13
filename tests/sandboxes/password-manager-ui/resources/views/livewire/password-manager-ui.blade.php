
    <div class="max-w-4xl mx-auto space-y-10">
        <div class="text-center space-y-2">
            <div class="w-20 h-20 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[30px] flex items-center justify-center text-4xl mx-auto shadow-2xl">🔐</div>
            <h1 class="text-4xl font-black">Nexus Vault</h1>
            <p class="text-slate-400 font-medium">Military-grade credential management.</p>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            @foreach($items as $item)
                <div class="p-8 border-b border-slate-50 dark:border-slate-800 last:border-0 flex justify-between items-center group">
                    <div class="flex items-center gap-6">
                        <div class="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                            {{ substr($item->site_name, 0, 1) }}
                        </div>
                        <div>
                            <h3 class="font-black text-slate-800 dark:text-slate-100">{{ $item->site_name }}</h3>
                            <p class="text-sm text-slate-400">{{ $item->username }}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-4">
                        <div class="bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-2xl font-mono text-sm">
                            @if(isset($show[$item->id]))
                                {{ $item->password }}
                            @else
                                ••••••••••••
                            @endif
                        </div>
                        <button wire:click="toggle({{ $item->id }})" class="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all">
                            👁️
                        </button>
                    </div>
                </div>
            @endforeach
        </div>
    </div>