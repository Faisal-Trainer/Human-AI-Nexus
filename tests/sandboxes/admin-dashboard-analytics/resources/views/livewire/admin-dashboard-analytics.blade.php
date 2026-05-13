
    <div class="max-w-6xl mx-auto space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Visits</p>
                <h2 class="text-3xl font-black text-slate-800 dark:text-white">{{ number_format($total_visits) }}</h2>
                <div class="mt-2 text-green-500 text-xs font-bold">↑ 12.5%</div>
            </div>
            <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Conversion</p>
                <h2 class="text-3xl font-black text-slate-800 dark:text-white">{{ $conversion_rate }}%</h2>
                <div class="mt-2 text-rose-500 text-xs font-bold">↓ 0.4%</div>
            </div>
            <div class="md:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-3xl text-white shadow-xl shadow-indigo-500/20 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-black">Nexus Insights</h2>
                    <p class="text-indigo-100 text-sm">Your traffic is peaking on Tuesdays.</p>
                </div>
                <button class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md transition-all">View Report</button>
            </div>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
            <div class="flex justify-between items-center mb-8">
                <h3 class="text-xl font-bold">Live Activity</h3>
                <div class="flex gap-2">
                    <span class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span class="text-xs font-bold text-slate-400 uppercase">1,240 Users Online</span>
                </div>
            </div>
            <div class="h-64 flex items-end gap-2 px-4 border-b border-slate-50 dark:border-slate-800 pb-4">
                @foreach([40, 70, 45, 90, 65, 80, 55, 100, 75, 85, 60, 95] as $val)
                    <div class="flex-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-t-lg transition-all hover:bg-indigo-500 cursor-pointer" style="height: {{ $val }}%"></div>
                @endforeach
            </div>
        </div>
    </div>