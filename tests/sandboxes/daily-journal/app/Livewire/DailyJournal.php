<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\DailyJournal;

class DailyJournal extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        DailyJournal::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.daily-journal', [
            'items' => DailyJournal::latest()->get()
        ]);
    }
}
