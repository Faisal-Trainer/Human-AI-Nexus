
    <div class="max-w-6xl mx-auto space-y-10">
        <header class="flex justify-between items-center">
            <h1 class="text-3xl font-black">Role Registry</h1>
            <button class="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold">Create New Role</button>
        </header>

        <div class="grid md:grid-cols-2 gap-8">
            @foreach($items as $item)
                <div class="bg-white dark:bg-slate-900 p-10 rounded-[50px] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div class="flex justify-between items-start mb-8">
                        <div>
                            <h3 class="text-2xl font-black text-slate-900 dark:text-white">{{ $item->name }}</h3>
                            <p class="text-slate-400 text-sm">System Level Access</p>
                        </div>
                        <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl">🛡️</div>
                    </div>

                    <div class="space-y-4">
                        @foreach(['read_files', 'write_files', 'delete_files', 'manage_users'] as $p)
                            <div class="flex justify-between items-center">
                                <span class="text-sm font-bold text-slate-600 dark:text-slate-300">{{ str_replace('_', ' ', $p) }}</span>
                                <div class="w-10 h-6 bg-green-500 rounded-full p-1"><div class="w-4 h-4 bg-white rounded-full ml-auto"></div></div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>
    </div>