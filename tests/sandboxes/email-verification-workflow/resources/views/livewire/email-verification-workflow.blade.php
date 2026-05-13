
    <div class="max-w-xl mx-auto py-20 text-center">
        <div class="bg-white dark:bg-slate-900 p-16 rounded-[60px] shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            @if($status == 'pending')
                <div class="w-32 h-32 bg-indigo-50 dark:bg-indigo-900/30 rounded-[40px] flex items-center justify-center text-5xl mx-auto mb-10 animate-pulse">✉️</div>
                <h1 class="text-4xl font-black text-slate-900 dark:text-white mb-4">Verify Your Email</h1>
                <p class="text-slate-400 font-medium mb-12 text-lg leading-relaxed">We've sent a verification link to <span class="text-slate-900 dark:text-white font-black italic">user@example.com</span>. Please click the link to confirm your account.</p>
                
                <div class="space-y-6">
                    <button wire:click="verify" class="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">Verify Now (Simulated)</button>
                    <button class="text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-all">Resend Verification Email</button>
                </div>
            @else
                <div class="w-32 h-32 bg-green-50 dark:bg-green-900/30 text-green-500 rounded-[40px] flex items-center justify-center text-5xl mx-auto mb-10">✅</div>
                <h1 class="text-4xl font-black text-green-600 mb-4">Email Verified!</h1>
                <p class="text-slate-400 font-medium mb-12 text-lg leading-relaxed">Thank you for confirming your email address. Your account is now fully active.</p>
                <button class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-3xl font-black hover:scale-105 transition-all">Continue to Dashboard</button>
            @endif
        </div>

        <div class="mt-12 flex justify-center gap-8">
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">SMTP Server Online</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
                <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">TLS Encryption Active</span>
            </div>
        </div>
    </div>
