<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Entry;

class DailyJournal extends Component
{
    public $content = '';
    public $mood = 'neutral';

    public function save() {
        $this->validate(['content' => 'required']);
        Entry::create(['content' => $this->content, 'mood' => $this->mood]);
        $this->reset();
    }

    public function render()
    {
        return view('livewire.daily-journal', [
            'items' => Entry::latest()->get()
        ]);
    }
}