<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Note;

class NotesAppTagging extends Component
{
    public $title = '';
    public $content = '';
    public $tags = '';

    public function save() {
        $this->validate(['title' => 'required', 'content' => 'required']);
        Note::create(['title' => $this->title, 'content' => $this->content, 'tags' => $this->tags]);
        $this->reset();
    }

    public function render()
    {
        return view('livewire.notes-app-tagging', [
            'items' => Note::latest()->get()
        ]);
    }
}