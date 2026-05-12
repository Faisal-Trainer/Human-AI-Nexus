<div class="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Nexus Task Manager</h2>

    <form wire:submit.prevent="addTodo" class="flex gap-2 mb-6">
        <input 
            type="text" 
            wire:model="title" 
            placeholder="What needs to be done?" 
            class="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
        <button 
            type="submit" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
            <span>Add</span>
        </button>
    </form>

    <div class="space-y-3">
        @foreach($todos as $todo)
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900 transition-all group">
                <div class="flex items-center gap-3">
                    <input 
                        type="checkbox" 
                        wire:click="toggleTodo({{ $todo->id }})" 
                        {{ $todo->completed ? 'checked' : '' }}
                        class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    >
                    <span class="{{ $todo->completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200' }} font-medium">
                        {{ $todo->title }}
                    </span>
                </div>
                <button 
                    wire:click="deleteTodo({{ $todo->id }})"
                    class="text-gray-400 hover:text-red-500 transition-colors"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        @endforeach
    </div>

    @if($todos->isEmpty())
        <div class="text-center py-10">
            <p class="text-gray-500 dark:text-gray-400">No tasks yet. Start by adding one above!</p>
        </div>
    @endif
</div>
