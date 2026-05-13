
    <div class="max-w-xl mx-auto py-20">
        <div class="bg-white dark:bg-slate-900 p-12 rounded-[50px] shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-8">
                <span class="text-slate-200 dark:text-slate-800 font-black text-6xl select-none">0{{ $step }}</span>
            </div>

            @if($step == 1)
                <div class="relative space-y-8">
                    <h1 class="text-3xl font-black text-slate-900 dark:text-white">Forgot Password?</h1>
                    <p class="text-slate-400 font-medium">Enter your email and we'll send you a recovery link.</p>
                    
                    <form wire:submit.prevent="requestReset" class="space-y-4">
                        <input type="email" wire:model="email" placeholder="Email Address" class="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-5 font-bold transition-all">
                        <button type="submit" class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black shadow-xl hover:scale-[1.02] transition-all">Request Reset Link</button>
                    </form>
                    <a href="#" class="block text-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all">Back to Login</a>
                </div>
            @elseif($step == 2)
                <div class="relative space-y-8 animate-in slide-in-from-right duration-500">
                    <h1 class="text-3xl font-black text-slate-900 dark:text-white">New Password</h1>
                    <p class="text-slate-400 font-medium">Set a secure password for your account.</p>
                    
                    <form wire:submit.prevent="resetPassword" class="space-y-4">
                        <input type="password" wire:model="password" placeholder="New Password" class="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-5 font-bold transition-all">
                        <input type="password" placeholder="Confirm Password" class="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-5 font-bold transition-all">
                        <button type="submit" class="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-all">Update Password</button>
                    </form>
                </div>
            @else
                <div class="relative space-y-8 text-center animate-in zoom-in duration-500">
                    <div class="w-20 h-20 bg-green-50 dark:bg-green-900/30 text-green-500 rounded-3xl flex items-center justify-center text-4xl mx-auto">✨</div>
                    <h1 class="text-3xl font-black text-green-600">Password Updated</h1>
                    <p class="text-slate-400 font-medium">Your password has been reset successfully. You can now log in with your new credentials.</p>
                    <button class="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black hover:scale-[1.02] transition-all">Go to Login</button>
                </div>
            @endif
        </div>

        <div class="mt-8 text-center">
            <p class="text-slate-400 text-[10px] font-black uppercase tracking-widest">Nexus Recovery Protocol v3.4</p>
        </div>
    </div>
