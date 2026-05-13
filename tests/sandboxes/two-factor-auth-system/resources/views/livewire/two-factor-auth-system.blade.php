
    <div class="max-w-4xl mx-auto space-y-12">
        <div class="bg-white dark:bg-slate-900 p-12 rounded-[50px] shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <div class="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            
            <div class="relative flex flex-col md:flex-row justify-between items-center gap-10">
                <div class="space-y-4 text-center md:text-left">
                    <div class="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                        <span class="w-2 h-2 bg-indigo-600 rounded-full"></span>
                        Security Core
                    </div>
                    <h1 class="text-5xl font-black text-slate-900 dark:text-white leading-tight">Two-Factor<br>Authentication</h1>
                    <p class="text-slate-400 font-medium text-lg">Add an extra layer of security to your Nexus account.</p>
                </div>
                
                <div class="flex flex-col items-center gap-4">
                    <button wire:click="toggle" class="relative w-24 h-12 {{ $enabled ? 'bg-indigo-600' : 'bg-slate-200' }} rounded-full p-1 transition-all duration-500 group">
                        <div class="w-10 h-10 bg-white rounded-full shadow-lg transform {{ $enabled ? 'translate-x-12' : 'translate-x-0' }} transition-transform duration-500 flex items-center justify-center">
                            @if($enabled)
                                <span class="text-xs">🛡️</span>
                            @endif
                        </div>
                    </button>
                    <span class="font-black uppercase text-[10px] tracking-widest {{ $enabled ? 'text-indigo-600' : 'text-slate-400' }}">
                        {{ $enabled ? 'System Armed' : 'System Disarmed' }}
                    </span>
                </div>
            </div>
        </div>

        @if($enabled)
            <div class="grid md:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
                <div class="bg-indigo-600 p-10 rounded-[40px] text-white shadow-xl shadow-indigo-500/20">
                    <h3 class="text-2xl font-black mb-4">Recovery Codes</h3>
                    <p class="text-indigo-100 mb-8 text-sm leading-relaxed">Save these codes in a safe place. They can be used to access your account if you lose your 2FA device.</p>
                    <div class="grid grid-cols-2 gap-3">
                        @foreach($codes as $code)
                            <div class="bg-indigo-700/50 px-4 py-3 rounded-2xl font-mono text-xs border border-indigo-400/20 text-center">
                                {{ $code }}
                            </div>
                        @endforeach
                    </div>
                    <button wire:click="generateCodes" class="mt-8 w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all">Generate New Codes</button>
                </div>

                <div class="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center items-center text-center">
                    <div class="w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-[40px] flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-700">
                        <div class="w-20 h-20 bg-white dark:bg-slate-900 rounded-[30px] shadow-inner p-2">
                             <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Nexus2FA-Demo" class="w-full h-full opacity-50 grayscale">
                        </div>
                    </div>
                    <h3 class="text-xl font-black mb-2">Scan QR Code</h3>
                    <p class="text-slate-400 text-sm max-w-xs">Use Google Authenticator or Authy to scan this code and finalize setup.</p>
                </div>
            </div>
        @endif
    </div>
