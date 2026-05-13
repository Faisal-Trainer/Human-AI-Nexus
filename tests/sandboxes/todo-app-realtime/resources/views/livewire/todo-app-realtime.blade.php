
    <div class="max-w-2xl mx-auto space-y-8">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Tasks</h1>
            <span class="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{{ $items->where('completed', false)->count() }} Pending</span>
        </div>

        <form wire:submit.prevent="save" class="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg flex gap-2">
            <input type="text" wire:model="title" placeholder="What needs to be done?" class="flex-1 bg-transparent border-0 focus:ring-0 px-4 py-2 text-slate-700 dark:text-slate-200">
            <select wire:model="priority" class="bg-slate-50 dark:bg-slate-800 border-0 rounded-xl text-xs font-bold uppercase">
                <option value="low">Low</option>
                <option value="medium">Med</option>
                <option value="high">High</option>
            </select>
            <button type="submit" class="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:opacity-90 transition-all">Add</button>
        </form>

        <div class="space-y-2">
            @foreach($items as $item)
                <div class="group flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500/50 transition-all">
                    <button wire:click="toggle({{ $item->id }})" class="w-6 h-6 rounded-full border-2 {{ $item->completed ? 'bg-green-500 border-green-500' : 'border-slate-200 dark:border-slate-700' }} flex items-center justify-center transition-all">
                        @if($item->completed)
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                        @endif
                    </button>
                    <span class="flex-1 {{ $item->completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200 font-medium' }}">
                        {{ $item->title }}
                    </span>
                    <span class="text-[10px] font-black uppercase px-2 py-1 rounded-md {{ $item->priority == 'high' ? 'bg-rose-100 text-rose-600' : ($item->priority == 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600') }}">
                        {{ $item->priority }}
                    </span>
                    <button wire:click="delete({{ $item->id }})" class="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-500 transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            @endforeach
        </div>
    </div>