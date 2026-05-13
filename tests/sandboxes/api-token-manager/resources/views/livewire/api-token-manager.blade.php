
    <div class="max-w-4xl mx-auto space-y-12">
        <div class="bg-slate-900 text-white p-12 rounded-[50px] shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/20 skew-x-12 translate-x-1/2"></div>
            <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                <div class="space-y-4 text-center md:text-left">
                    <h1 class="text-5xl font-black leading-tight">API Access<br>Tokens</h1>
                    <p class="text-slate-400 font-medium">Generate secure tokens to access the Nexus API programmatically.</p>
                </div>
                <div class="bg-white/10 backdrop-blur-md p-8 rounded-[40px] border border-white/10 w-full md:w-80">
                    <form wire:submit.prevent="createToken" class="space-y-4">
                        <input type="text" wire:model="name" placeholder="Token Name (e.g. Production)" class="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-indigo-500 outline-none transition-all">
                        <button type="submit" class="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all">Create Token</button>
                    </form>
                </div>
            </div>
        </div>

        @if($newToken)
            <div class="bg-amber-50 border-2 border-amber-200 p-8 rounded-[40px] animate-in zoom-in duration-500">
                <div class="flex items-center gap-4 mb-4">
                    <span class="text-2xl">⚠️</span>
                    <h3 class="text-xl font-black text-amber-900">Make sure to copy your new API token now.</h3>
                </div>
                <p class="text-amber-700 text-sm mb-6 font-medium">You won't be able to see it again for security reasons.</p>
                <div class="bg-white border border-amber-200 p-6 rounded-2xl font-mono text-sm break-all text-amber-900 shadow-inner">
                    {{ $newToken }}
                </div>
                <button wire:click="$set('newToken', null)" class="mt-6 text-amber-900 font-black text-sm uppercase tracking-widest hover:underline">I've saved it</button>
            </div>
        @endif

        <div class="space-y-6">
            <h2 class="text-2xl font-black text-slate-900 dark:text-white px-4">Existing Tokens</h2>
            <div class="grid gap-4">
                @foreach($tokens as $token)
                    <div class="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 flex justify-between items-center group transition-all hover:shadow-lg">
                        <div class="flex items-center gap-6">
                            <div class="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl">
                                {{ substr($token->name, 0, 1) }}
                            </div>
                            <div>
                                <h3 class="font-black text-slate-900 dark:text-white">{{ $token->name }}</h3>
                                <p class="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                    Last used: {{ $token->last_used_at ? $token->last_used_at->diffForHumans() : 'Never' }}
                                </p>
                            </div>
                        </div>
                        <button wire:click="revoke({{ $token->id }})" class="px-6 py-2 text-rose-600 font-black text-xs uppercase tracking-widest hover:bg-rose-50 rounded-xl transition-all">Revoke</button>
                    </div>
                @endforeach

                @if($tokens->isEmpty())
                    <div class="py-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
                         <p class="text-slate-400 font-black italic">No API tokens created yet.</p>
                    </div>
                @endif
            </div>
        </div>
    </div>
