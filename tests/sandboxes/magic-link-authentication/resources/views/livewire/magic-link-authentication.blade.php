
    <div class="max-w-md mx-auto py-20">
        <div class="bg-white dark:bg-slate-900 p-12 rounded-[50px] shadow-2xl border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            
            @if(!$sent)
                <div class="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8">✨</div>
                <h1 class="text-3xl font-black mb-2">Magic Link</h1>
                <p class="text-slate-400 font-medium mb-10">We'll email you a magic link for a password-free sign in.</p>
                
                <form wire:submit.prevent="sendLink" class="space-y-4">
                    <input type="email" wire:model="email" placeholder="name@company.com" class="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl transition-all text-center font-bold">
                    <button type="submit" class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-all">Send Magic Link</button>
                </form>
            @else
                <div class="w-20 h-20 bg-green-50 dark:bg-green-900/30 text-green-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">📧</div>
                <h1 class="text-3xl font-black mb-2 text-green-600">Check your mail</h1>
                <p class="text-slate-400 font-medium mb-10">We've sent a secure login link to <span class="text-slate-900 dark:text-white font-black">{{ $email }}</span>.</p>
                <button wire:click="$set('sent', false)" class="text-indigo-600 font-black hover:underline">Try another email</button>
            @endif
        </div>

        <div class="mt-10 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            Nexus Magic Auth v1.0
        </div>
    </div>
