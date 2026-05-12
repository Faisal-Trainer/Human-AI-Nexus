
<div class="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Nexus UserManagementSystem</h2>

    <form wire:submit.prevent="save" class="flex gap-2 mb-6">
        <input type="text" wire:model="name" placeholder="Entry name..." class="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">Add</button>
    </form>

    <div class="space-y-3">
        @foreach($items as $item)
            <div class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <span class="text-gray-700 dark:text-gray-200 font-medium">{{ $item->name }}</span>
            </div>
        @endforeach
    </div>
</div>
        