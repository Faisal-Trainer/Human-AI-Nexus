
    <div class="max-w-6xl mx-auto space-y-8">
        <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center shadow-sm">
            <div>
                <h1 class="text-3xl font-black">Inventory</h1>
                <p class="text-slate-400 font-medium">{{ $items->count() }} Total SKUs in warehouse</p>
            </div>
            <div class="flex gap-4">
                <div class="text-right">
                    <p class="text-xs font-bold text-slate-400 uppercase">Value</p>
                    <p class="text-2xl font-black text-indigo-600">$ {{ number_format($items->sum(fn($i) => $i->stock * $i->amount)) }}</p>
                </div>
            </div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach($items as $item)
                <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                    <div class="flex justify-between items-start mb-4">
                        <span class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-[10px] font-black font-mono text-slate-500 uppercase">{{ $item->sku }}</span>
                        <span class="font-black text-slate-800 dark:text-slate-100">$ {{ number_format($item->amount, 2) }}</span>
                    </div>
                    <h3 class="text-lg font-bold mb-6 text-slate-700 dark:text-slate-200">{{ $item->name }}</h3>
                    
                    <div class="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                        <div class="text-center">
                            <p class="text-[10px] font-black text-slate-400 uppercase mb-1">Available</p>
                            <p class="text-xl font-black {{ $item->stock < 10 ? 'text-rose-500' : 'text-slate-800 dark:text-white' }}">{{ $item->stock }}</p>
                        </div>
                        <div class="flex gap-2">
                            <button wire:click="adjust({{ $item->id }}, -1)" class="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 hover:bg-rose-500 hover:text-white transition-all font-bold">-</button>
                            <button wire:click="adjust({{ $item->id }}, 1)" class="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 hover:bg-indigo-600 hover:text-white transition-all font-bold">+</button>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>