
    <div class="max-w-6xl mx-auto flex gap-10">
        <aside class="w-72 space-y-8">
            <div class="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl">
                <p class="text-[10px] font-black uppercase text-indigo-200 mb-1">Active Cluster</p>
                <h2 class="text-xl font-black">{{ $current_tenant }}</h2>
            </div>
            
            <nav class="space-y-2">
                <p class="text-[10px] font-black uppercase text-slate-400 px-4 mb-4">Switch Tenant</p>
                @foreach($items as $item)
                    <button wire:click="switch('{{ $item->name }}')" class="w-full text-left px-6 py-4 rounded-2xl font-bold {{ $current_tenant == $item->name ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100' }} transition-all">
                        {{ $item->name }}
                    </button>
                @endforeach
            </nav>
        </aside>

        <main class="flex-1 space-y-8">
            <header class="flex justify-between items-end">
                <h1 class="text-4xl font-black">Administration</h1>
                <div class="flex gap-2">
                    <div class="w-10 h-10 rounded-full bg-slate-200"></div>
                    <div class="w-10 h-10 rounded-full bg-slate-200"></div>
                </div>
            </header>

            <div class="grid grid-cols-2 gap-6">
                <div class="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 class="text-sm font-black uppercase text-slate-400 mb-6 tracking-widest">Resources</h3>
                    <div class="space-y-4">
                        @foreach(['Users', 'Orders', 'Reports', 'Settings'] as $res)
                            <div class="flex justify-between items-center group">
                                <span class="font-bold text-slate-700 dark:text-slate-200">{{ $res }}</span>
                                <span class="text-slate-300 group-hover:text-indigo-500 transition-all">→</span>
                            </div>
                        @endforeach
                    </div>
                </div>
                <div class="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 class="text-sm font-black uppercase text-slate-400 mb-6 tracking-widest">Performance</h3>
                    <div class="h-32 flex items-end gap-1">
                        @foreach([30, 50, 40, 70, 60, 90, 100, 80] as $h)
                            <div class="flex-1 bg-indigo-500 rounded-t-sm" style="height: {{ $h }}%"></div>
                        @endforeach
                    </div>
                </div>
            </div>
        </main>
    </div>