<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Habit;

class HabitTracker extends Component
{
    public $title = '';

    public function toggle($id) {
        $habit = Habit::find($id);
        $habit->streak++;
        $habit->last_completed_at = now();
        $habit->save();
    }

    public function save() {
        $this->validate(['title' => 'required|min:3']);
        Habit::create(['title' => $this->title]);
        $this->title = '';
    }

    public function render()
    {
        return view('livewire.habit-tracker', [
            'items' => Habit::latest()->get()
        ]);
    }
}