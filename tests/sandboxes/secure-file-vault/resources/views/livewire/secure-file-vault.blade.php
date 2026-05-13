
    <div class="max-w-6xl mx-auto space-y-12">
        <div class="bg-indigo-900 p-16 rounded-[60px] shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 24px 24px;"></div>
            
            <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-white">
                <div class="space-y-4 text-center md:text-left">
                    <div class="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                        AES-256 Military Grade
                    </div>
                    <h1 class="text-6xl font-black tracking-tight">Secure Vault</h1>
                    <p class="text-indigo-200 font-medium text-lg">Your private files, encrypted and accessible only by you.</p>
                </div>
                
                <button class="bg-white text-indigo-900 px-10 py-5 rounded-[30px] font-black shadow-xl hover:scale-105 transition-all">Upload New File</button>
            </div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            @foreach($files as $file)
                <div class="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group relative">
                    @if($file->is_locked)
                        <div class="absolute inset-0 bg-slate-900/5 backdrop-blur-[2px] rounded-[40px] z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button wire:click="toggleLock({{ $file->id }})" class="bg-white px-6 py-3 rounded-2xl font-black text-xs shadow-xl">Unlock File</button>
                        </div>
                    @endif

                    <div class="flex flex-col h-full">
                        <div class="flex justify-between items-start mb-6">
                            <div class="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                                @if($file->type == 'PDF') 📄 @elseif($file->type == 'Image') 🖼️ @else 📁 @endif
                            </div>
                            <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">{{ $file->size }}</span>
                        </div>
                        
                        <div class="flex-1">
                            <h3 class="text-lg font-black text-slate-900 dark:text-white mb-1 truncate">{{ $file->name }}</h3>
                            <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">{{ $file->type }} DOCUMENT</p>
                        </div>

                        <div class="mt-8 flex justify-between items-center border-t border-slate-50 dark:border-slate-800 pt-6">
                            <div class="flex items-center gap-2">
                                <div class="w-2 h-2 rounded-full {{ $file->is_locked ? 'bg-amber-500' : 'bg-green-500' }}"></div>
                                <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">{{ $file->is_locked ? 'Locked' : 'Available' }}</span>
                            </div>
                            @if(!$file->is_locked)
                                <button class="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline">Download</button>
                            @endif
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        @if($files->isEmpty())
             <div class="py-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
                <span class="text-6xl mb-6 block">🔒</span>
                <p class="text-slate-400 font-black italic">Your vault is currently empty.</p>
            </div>
        @endif
    </div>
