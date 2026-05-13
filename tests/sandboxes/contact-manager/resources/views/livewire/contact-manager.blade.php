
    <div class="max-w-5xl mx-auto space-y-10">
        <div class="flex justify-between items-end">
            <div>
                <h1 class="text-4xl font-black text-slate-900 dark:text-white">Contacts</h1>
                <p class="text-slate-500">Manage your professional network.</p>
            </div>
            <button class="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all">Export CSV</button>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
            <div class="lg:col-span-1">
                <form wire:submit.prevent="save" class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                    <h3 class="text-lg font-bold mb-4">New Contact</h3>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                        <input type="text" wire:model="name" class="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500">
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-slate-400 uppercase ml-1">Email</label>
                        <input type="email" wire:model="email" class="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500">
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-slate-400 uppercase ml-1">Phone</label>
                        <input type="text" wire:model="phone" class="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500">
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-slate-400 uppercase ml-1">Company</label>
                        <input type="text" wire:model="company" class="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500">
                    </div>
                    <button type="submit" class="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold py-4 rounded-2xl mt-4 hover:opacity-90 transition-all">Save Contact</button>
                </form>
            </div>

            <div class="lg:col-span-2">
                <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                    <table class="w-full text-left border-collapse">
                        <thead class="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Contact</th>
                                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Company</th>
                                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
                            @foreach($items as $item)
                                <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                {{ substr($item->name, 0, 1) }}
                                            </div>
                                            <div>
                                                <div class="font-bold text-slate-800 dark:text-slate-100">{{ $item->name }}</div>
                                                <div class="text-xs text-slate-400">{{ $item->email }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="text-sm text-slate-600 dark:text-slate-400 font-medium">{{ $item->company ?? 'Freelance' }}</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button class="text-indigo-600 hover:text-indigo-700 font-bold text-sm">Call</button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>