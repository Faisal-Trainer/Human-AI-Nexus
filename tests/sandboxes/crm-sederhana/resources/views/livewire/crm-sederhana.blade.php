
    <div class="max-w-7xl mx-auto space-y-8">
        <h1 class="text-3xl font-black">Sales Pipeline</h1>
        
        <div class="grid lg:grid-cols-3 gap-6">
            @foreach(['lead', 'negotiation', 'closed'] as $stage)
                <div class="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-3xl space-y-4">
                    <div class="flex justify-between items-center px-2">
                        <h3 class="font-black uppercase text-xs text-slate-400 tracking-widest">{{ $stage }}</h3>
                        <span class="bg-slate-200 dark:bg-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full">{{ $items->where('status', $stage)->count() }}</span>
                    </div>
                    
                    <div class="space-y-3">
                        @foreach($items->where('status', $stage) as $deal)
                            <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md transition-all cursor-move">
                                <h4 class="font-bold text-slate-800 dark:text-slate-100">{{ $deal->client_name }}</h4>
                                <p class="text-indigo-600 font-bold text-lg mt-1">$ {{ number_format($deal->value) }}</p>
                                <div class="flex gap-1 mt-4">
                                    @if($stage != 'closed')
                                        <button wire:click="updateStatus({{ $deal->id }}, '{{ $stage == 'lead' ? 'negotiation' : 'closed' }}')" class="w-full bg-slate-50 dark:bg-slate-700 hover:bg-indigo-600 hover:text-white py-2 rounded-lg text-[10px] font-black uppercase transition-all">Move Forward</button>
                                    @endif
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>
    </div>