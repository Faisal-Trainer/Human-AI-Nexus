
    <div class="max-w-7xl mx-auto space-y-10">
        <header class="flex justify-between items-center bg-slate-900 p-8 rounded-[40px] text-white">
            <div>
                <h1 class="text-3xl font-black">Watchtower</h1>
                <p class="text-slate-400 font-mono text-xs uppercase tracking-widest mt-1">Status: Operational</p>
            </div>
            <div class="flex gap-4">
                <div class="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center animate-pulse">📡</div>
            </div>
        </header>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            @foreach($items as $item)
                <div class="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-1 h-full {{ $item->load > 80 ? 'bg-rose-500' : ($item->load > 50 ? 'bg-amber-500' : 'bg-green-500') }}"></div>
                    <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{{ $item->hostname }}</h3>
                    <p class="text-sm font-mono text-slate-500 mb-8">{{ $item->ip }}</p>
                    
                    <div class="space-y-4">
                        <div class="flex justify-between items-end">
                            <span class="text-xs font-bold text-slate-400 uppercase">CPU Load</span>
                            <span class="text-2xl font-black text-slate-800 dark:text-white">{{ $item->load }}%</span>
                        </div>
                        <div class="w-full h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full {{ $item->load > 80 ? 'bg-rose-500' : ($item->load > 50 ? 'bg-amber-500' : 'bg-green-500') }} transition-all duration-1000" style="width: {{ $item->load }}%"></div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>