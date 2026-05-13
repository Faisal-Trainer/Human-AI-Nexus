
    <div class="max-w-6xl mx-auto space-y-6">
        <header class="flex justify-between items-center">
            <h1 class="text-3xl font-black text-slate-900 dark:text-white">Security Audit</h1>
            <div class="flex gap-4">
                <input type="text" wire:model.live="search" placeholder="Search logs..." class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500">
                <button class="bg-rose-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition-all">Clear Logs</button>
            </div>
        </header>

        <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <table class="w-full text-left border-collapse">
                <thead class="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                        <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Timestamp</th>
                        <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase">User</th>
                        <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Action</th>
                        <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Severity</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 dark:divide-slate-800 font-mono text-sm">
                    @forelse($items as $item)
                        <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                            <td class="px-6 py-4 text-slate-400">{{ $item->created_at->format('Y-m-d H:i:s') }}</td>
                            <td class="px-6 py-4 font-bold text-slate-700 dark:text-slate-200">{{ $item->user }}</td>
                            <td class="px-6 py-4 text-slate-600 dark:text-slate-400">{{ $item->action }}</td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-1 rounded text-[10px] font-black uppercase {{ $item->severity == 'critical' ? 'bg-rose-100 text-rose-600' : ($item->severity == 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600') }}">
                                    {{ $item->severity }}
                                </span>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="4" class="px-6 py-12 text-center text-slate-400">No logs found for the current period.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>