<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Todo;

class TodoList extends Component
{
    public $title = '';

    public function addTodo()
    {
        $this->validate([
            'title' => 'required|min:3'
        ]);

        Todo::create([
            'title' => $this->title,
        ]);

        $this->title = '';
    }

    public function toggleTodo($id)
    {
        $todo = Todo::find($id);
        $todo->completed = !$todo->completed;
        $todo->save();
    }

    public function deleteTodo($id)
    {
        Todo::find($id)->delete();
    }

    public function render()
    {
        return view('livewire.todo-list', [
            'todos' => Todo::latest()->get()
        ]);
    }
}
