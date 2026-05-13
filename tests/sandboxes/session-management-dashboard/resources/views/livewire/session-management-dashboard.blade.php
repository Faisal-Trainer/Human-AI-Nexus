
    <div class="max-w-5xl mx-auto space-y-10">
        <div class="flex justify-between items-end">
            <div class="space-y-2">
                <h1 class="text-4xl font-black text-slate-900 dark:text-white">Active Sessions</h1>
                <p class="text-slate-500 font-medium italic">Monitor and manage your login sessions across all devices.</p>
            </div>
            <button wire:click="logoutAll" class="px-8 py-4 bg-rose-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-rose-500/20 hover:scale-105 transition-all">Sign Out All Devices</button>
        </div>

        <div class="grid gap-6">
            @foreach($sessions as $session)
                <div class="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 flex justify-between items-center group transition-all hover:border-indigo-500/30">
                    <div class="flex items-center gap-8">
                        <div class="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[30px] flex items-center justify-center text-3xl">
                            @if($session->device_type == 'Mobile') 📱 @else 💻 @endif
                        </div>
                        <div class="space-y-1">
                            <h3 class="text-xl font-black text-slate-900 dark:text-white">{{ $session->device_type }} — {{ $session->location }}</h3>
                            <p class="text-slate-400 font-bold text-xs uppercase tracking-widest">{{ $session->ip_address }} • {{ $session->last_activity->diffForHumans() }}</p>
                            <p class="text-slate-500 text-xs truncate max-w-md">{{ $session->user_agent }}</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        @if($loop->first)
                            <span class="px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest">Current Session</span>
                        @endif
                        <button wire:click="logout({{ $session->id }})" class="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        </button>
                    </div>
                </div>
            @endforeach
        </div>

        @if($sessions->isEmpty())
             <div class="bg-slate-50 dark:bg-slate-900/50 p-20 rounded-[50px] text-center border-2 border-dashed border-slate-200 dark:border-slate-800">
                <span class="text-6xl mb-6 block">😴</span>
                <h3 class="text-2xl font-black text-slate-400">No active sessions found</h3>
            </div>
        @endif
    </div>
