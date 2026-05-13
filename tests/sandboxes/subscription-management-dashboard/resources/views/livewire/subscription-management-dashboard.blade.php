
    <div class="max-w-6xl mx-auto space-y-12">
        <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-slate-900 text-white p-10 rounded-[50px] shadow-2xl relative overflow-hidden">
                <div class="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
                <p class="text-[10px] font-black uppercase text-slate-500 mb-2">Monthly Spending</p>
                <h2 class="text-4xl font-black">$ {{ number_format($items->sum('price'), 2) }}</h2>
            </div>
            
            @foreach($items as $item)
                <div class="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start mb-6">
                            <div class="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-2xl">⚡</div>
                            <span class="text-xs font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
                        </div>
                        <h3 class="text-2xl font-black mb-1 text-slate-900 dark:text-white">{{ $item->service_name }}</h3>
                        <p class="text-slate-400 font-medium">Billed every month</p>
                    </div>
                    <div class="mt-10 pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                        <span class="text-2xl font-black text-slate-800 dark:text-white">$ {{ number_format($item->price, 2) }}</span>
                        <span class="text-[10px] font-black text-slate-400 uppercase">Next: {{ $item->next_billing }}</span>
                    </div>
                </div>
            @endforeach
        </div>
    </div>