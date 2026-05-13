<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Todo;

class TodoAppRealtime extends Component
{
    public $title = '';
    public $priority = 'medium';

    public function save() {
        $this->validate(['title' => 'required']);
        Todo::create([
            'title' => $this->title,
            'priority' => $this->priority
        ]);
        $this->title = '';
    }

    public function toggle($id) {
        $todo = Todo::find($id);
        $todo->completed = !$todo->completed;
        $todo->save();
    }

    public function delete($id) {
        Todo::find($id)->delete();
    }

    public function render()
    {
        return view('livewire.todo-app-realtime', [
            'items' => Todo::latest()->get()
        ]);
    }
}