
    <div class="max-w-7xl mx-auto space-y-12">
        <header class="flex justify-between items-end">
            <h1 class="text-5xl font-black text-slate-900 dark:text-white">User Base</h1>
            <button class="bg-indigo-600 text-white px-8 py-4 rounded-3xl font-black shadow-xl shadow-indigo-500/20">Add Member</button>
        </header>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            @foreach($items as $item)
                <div class="bg-white dark:bg-slate-900 p-8 rounded-[50px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                    <div class="flex items-center gap-6 mb-8">
                        <div class="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-3xl group-hover:bg-indigo-50 transition-all">
                            👤
                        </div>
                        <div>
                            <h3 class="text-xl font-black text-slate-900 dark:text-white">{{ $item->name }}</h3>
                            <p class="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{{ $item->role }}</p>
                        </div>
                    </div>
                    
                    <div class="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                        <span class="text-xs font-bold text-slate-500">Status</span>
                        <span class="flex items-center gap-2 text-xs font-black uppercase text-green-500">
                            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                            {{ $item->status }}
                        </span>
                    </div>

                    <div class="mt-8 flex gap-2">
                        <button class="flex-1 bg-slate-100 dark:bg-slate-800 py-3 rounded-2xl font-bold text-xs">Edit</button>
                        <button class="flex-1 bg-rose-50 text-rose-600 py-3 rounded-2xl font-bold text-xs">Revoke</button>
                    </div>
                </div>
            @endforeach
        </div>
    </div>