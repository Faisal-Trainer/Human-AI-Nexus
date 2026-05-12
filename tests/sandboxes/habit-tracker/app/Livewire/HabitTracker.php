<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\HabitTracker;

class HabitTracker extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        HabitTracker::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.habit-tracker', [
            'items' => HabitTracker::latest()->get()
        ]);
    }
}
