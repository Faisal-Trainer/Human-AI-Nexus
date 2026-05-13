
    <div class="max-w-6xl mx-auto space-y-12">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="space-y-2">
                <h1 class="text-5xl font-black text-slate-900 dark:text-white tracking-tight">Anomaly Detector</h1>
                <p class="text-slate-500 font-medium italic">Nexus AI is monitoring login patterns to identify suspicious behavior.</p>
            </div>
            <div class="bg-indigo-600 px-8 py-4 rounded-[30px] text-white shadow-xl shadow-indigo-500/20">
                <p class="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Global Risk Level</p>
                <p class="text-2xl font-black italic">LOW / SECURE</p>
            </div>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-[50px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <table class="w-full text-left">
                <thead>
                    <tr class="bg-slate-50 dark:bg-slate-800/50">
                        <th class="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                        <th class="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</th>
                        <th class="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Location / IP</th>
                        <th class="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Risk Score</th>
                        <th class="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
                    @foreach($attempts as $attempt)
                        <tr class="hover:bg-slate-50/50 transition-all group">
                            <td class="px-8 py-6">
                                <span class="text-sm font-bold text-slate-900 dark:text-white">{{ $attempt->created_at->format('H:i:s') }}</span>
                                <span class="block text-[10px] text-slate-400 font-medium">{{ $attempt->created_at->format('M d, Y') }}</span>
                            </td>
                            <td class="px-8 py-6">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-xs">👤</div>
                                    <span class="text-sm font-black text-slate-700 dark:text-slate-300">{{ $attempt->email }}</span>
                                </div>
                            </td>
                            <td class="px-8 py-6">
                                <span class="text-sm font-medium text-slate-600 dark:text-slate-400">{{ $attempt->location }}</span>
                                <span class="block text-[10px] text-slate-400 font-mono italic">{{ $attempt->ip }}</span>
                            </td>
                            <td class="px-8 py-6">
                                <div class="w-full max-w-[100px] bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <div class="h-full {{ $attempt->risk_score > 70 ? 'bg-rose-500' : ($attempt->risk_score > 30 ? 'bg-amber-500' : 'bg-green-500') }}" style="width: {{ $attempt->risk_score }}%"></div>
                                </div>
                                <span class="text-[10px] font-black mt-1 block {{ $attempt->risk_score > 70 ? 'text-rose-500' : ($attempt->risk_score > 30 ? 'text-amber-500' : 'text-green-500') }}">
                                    {{ $attempt->risk_score }}% {{ $attempt->risk_score > 70 ? 'Critical' : ($attempt->risk_score > 30 ? 'Warning' : 'Safe') }}
                                </span>
                            </td>
                            <td class="px-8 py-6">
                                <div class="flex flex-col">
                                    <span class="text-xs font-black {{ $attempt->status == 'Success' ? 'text-green-600' : 'text-rose-600' }}">{{ $attempt->status }}</span>
                                    @if($attempt->failure_reason)
                                        <span class="text-[10px] text-slate-400 italic">{{ $attempt->failure_reason }}</span>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-rose-50 dark:bg-rose-900/10 p-8 rounded-[40px] border border-rose-100 dark:border-rose-800">
                <h4 class="text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-widest mb-4">Brute Force Alert</h4>
                <p class="text-rose-900 dark:text-rose-200 text-sm font-medium leading-relaxed">No unusual login frequency detected from single IP sources in the last 24 hours.</p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-[40px] border border-amber-100 dark:border-amber-800">
                <h4 class="text-amber-600 dark:text-amber-400 font-black text-xs uppercase tracking-widest mb-4">Geo-Location Warning</h4>
                <p class="text-amber-900 dark:text-amber-200 text-sm font-medium leading-relaxed">1 login attempt from a new country (Russia) was flagged for verification.</p>
            </div>
            <div class="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-800">
                <h4 class="text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest mb-4">Device Fingerprint</h4>
                <p class="text-indigo-900 dark:text-indigo-200 text-sm font-medium leading-relaxed">98% of users are using recognized and verified devices for access.</p>
            </div>
        </div>
    </div>
