
    <div class="max-w-7xl mx-auto space-y-10">
        <div class="flex justify-between items-center bg-slate-900 text-white p-10 rounded-[50px] shadow-2xl">
            <div>
                <h1 class="text-4xl font-black mb-2">Nexus ERP</h1>
                <p class="text-slate-400">Inventory & Order Management System</p>
            </div>
            <div class="flex gap-8">
                <div class="text-center">
                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Revenue</p>
                    <p class="text-2xl font-black text-green-400">$ {{ number_format($items->where('status', 'shipped')->sum('total_amount')) }}</p>
                </div>
                <div class="text-center">
                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Orders</p>
                    <p class="text-2xl font-black">{{ $items->count() }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <table class="w-full text-left border-collapse">
                <thead class="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                        <th class="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Order #</th>
                        <th class="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Customer</th>
                        <th class="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Total</th>
                        <th class="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
                    @foreach($items as $item)
                        <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                            <td class="px-8 py-6 font-mono font-bold text-indigo-600">{{ $item->order_number }}</td>
                            <td class="px-8 py-6 font-bold text-slate-800 dark:text-slate-100">{{ $item->customer_name }}</td>
                            <td class="px-8 py-6 font-black">$ {{ number_format($item->total_amount, 2) }}</td>
                            <td class="px-8 py-6">
                                <div class="flex items-center gap-4">
                                    <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase {{ $item->status == 'shipped' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600' }}">
                                        {{ $item->status }}
                                    </span>
                                    @if($item->status == 'pending')
                                        <button wire:click="updateStatus({{ $item->id }}, 'shipped')" class="text-indigo-600 hover:text-indigo-700 font-bold text-xs uppercase tracking-widest">Ship Order</button>
                                    @endif
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>