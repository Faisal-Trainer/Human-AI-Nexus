<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\BookmarkManager;

class BookmarkManager extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        BookmarkManager::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.bookmark-manager', [
            'items' => BookmarkManager::latest()->get()
        ]);
    }
}
