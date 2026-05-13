
    <div class="max-w-xl mx-auto space-y-10">
        <div class="text-center space-y-4">
            <h1 class="text-4xl font-black text-slate-900 dark:text-white">Social Connections</h1>
            <p class="text-slate-500 font-medium">Manage your linked accounts for faster sign-in.</p>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            @php
                $providers = [
                    ['name' => 'GitHub', 'icon' => '🐱', 'color' => 'bg-slate-900'],
                    ['name' => 'Google', 'icon' => '🎨', 'color' => 'bg-rose-500'],
                    ['name' => 'Twitter', 'icon' => '🐦', 'color' => 'bg-sky-500'],
                    ['name' => 'Discord', 'icon' => '🎮', 'color' => 'bg-indigo-500']
                ];
            @endphp

            @foreach($providers as $provider)
                @php $linked = $identities->where('provider_name', $provider['name'])->first(); @endphp
                <div class="p-8 border-b border-slate-50 dark:border-slate-800 last:border-0 flex justify-between items-center group hover:bg-slate-50/50 transition-all">
                    <div class="flex items-center gap-6">
                        <div class="w-14 h-14 {{ $provider['color'] }} text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-{{ str_replace('bg-', '', $provider['color']) }}/20">
                            {{ $provider['icon'] }}
                        </div>
                        <div>
                            <h3 class="font-black text-slate-800 dark:text-white">{{ $provider['name'] }}</h3>
                            <p class="text-xs font-bold uppercase tracking-widest {{ $linked ? 'text-green-500' : 'text-slate-400' }}">
                                {{ $linked ? 'Linked as ' . $linked->provider_id : 'Not Connected' }}
                            </p>
                        </div>
                    </div>
                    
                    @if($linked)
                        <button wire:click="unlink({{ $linked->id }})" class="px-6 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-black hover:bg-rose-600 hover:text-white transition-all">Disconnect</button>
                    @else
                        <button class="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:scale-105 transition-all">Connect</button>
                    @endif
                </div>
            @endforeach
        </div>

        <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-800 flex items-center gap-4">
            <span class="text-2xl">💡</span>
            <p class="text-sm text-indigo-700 dark:text-indigo-300 font-medium leading-relaxed">Linking social accounts allows you to log in instantly without a password while keeping your account secure.</p>
        </div>
    </div>
