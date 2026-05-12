<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\NotesAppTagging;

class NotesAppTagging extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        NotesAppTagging::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.notes-app-tagging', [
            'items' => NotesAppTagging::latest()->get()
        ]);
    }
}
