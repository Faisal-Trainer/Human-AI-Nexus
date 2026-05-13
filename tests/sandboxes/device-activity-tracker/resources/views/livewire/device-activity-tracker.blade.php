
    <div class="max-w-4xl mx-auto space-y-12">
        <div class="space-y-4">
            <h1 class="text-4xl font-black text-slate-900 dark:text-white">Security Log</h1>
            <p class="text-slate-500 font-medium italic">Detailed history of security-related events on your Nexus account.</p>
        </div>

        <div class="relative">
            <div class="absolute left-10 top-0 bottom-0 w-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
            
            <div class="space-y-10">
                @foreach($logs as $log)
                    <div class="relative flex items-center gap-10 group">
                        <div class="w-20 h-20 bg-white dark:bg-slate-900 rounded-[30px] border-4 border-slate-50 dark:border-slate-800 shadow-sm flex items-center justify-center text-2xl z-10 transition-all group-hover:scale-110">
                            @if($log->event == 'Password Changed') 🔐 @elseif($log->event == 'New Login') 🚀 @else 🛡️ @endif
                        </div>
                        
                        <div class="flex-1 bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm group-hover:shadow-xl transition-all">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="text-xl font-black text-slate-900 dark:text-white">{{ $log->event }}</h3>
                                    <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">{{ $log->created_at->format('M d, Y • H:i') }}</p>
                                </div>
                                <span class="px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {{ $log->status }}
                                </span>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4 text-sm font-medium">
                                <div class="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <span class="opacity-50">📍</span> {{ $log->location }}
                                </div>
                                <div class="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <span class="opacity-50">🌐</span> {{ $log->ip }}
                                </div>
                                <div class="col-span-2 flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <span class="opacity-50">📱</span> {{ $log->device }}
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        @if($logs->isEmpty())
             <div class="py-20 text-center text-slate-400 italic">No activity recorded yet.</div>
        @endif
    </div>
