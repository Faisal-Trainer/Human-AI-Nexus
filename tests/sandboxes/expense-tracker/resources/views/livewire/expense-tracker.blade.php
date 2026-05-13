
    <div class="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        <div class="md:col-span-1 space-y-6">
            <div class="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-500/40">
                <p class="text-indigo-100 text-sm font-medium mb-1">Total Balance</p>
                <h2 class="text-3xl font-black">$ {{ number_format($items->sum('amount'), 2) }}</h2>
            </div>

            <form wire:submit.prevent="save" class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 shadow-sm">
                <h3 class="font-bold text-slate-800 dark:text-slate-100">Add Transaction</h3>
                <input type="text" wire:model="description" placeholder="Description" class="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all">
                <input type="number" step="0.01" wire:model="amount" placeholder="Amount" class="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all">
                <select wire:model="category" class="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all">
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Entertainment</option>
                    <option>Utilities</option>
                </select>
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all">Record Expense</button>
            </form>
        </div>

        <div class="md:col-span-2 space-y-4">
            <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100">Recent History</h3>
            <div class="space-y-3">
                @foreach($items as $item)
                    <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center group hover:scale-[1.02] transition-all">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg">
                                {{ $item->category == 'Food' ? '🍔' : ($item->category == 'Transport' ? '🚗' : '✨') }}
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-800 dark:text-slate-100">{{ $item->description }}</h4>
                                <p class="text-xs text-slate-400">{{ $item->created_at->format('M d, Y') }}</p>
                            </div>
                        </div>
                        <span class="font-black text-rose-500">- $ {{ number_format($item->amount, 2) }}</span>
                    </div>
                @endforeach
            </div>
        </div>
    </div>