<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Bookmark;

class BookmarkManager extends Component
{
    public $url = '';
    public $title = '';

    public function save() {
        $this->validate(['url' => 'required|url', 'title' => 'required']);
        Bookmark::create(['url' => $this->url, 'title' => $this->title]);
        $this->reset();
    }

    public function render()
    {
        return view('livewire.bookmark-manager', [
            'items' => Bookmark::latest()->get()
        ]);
    }
}