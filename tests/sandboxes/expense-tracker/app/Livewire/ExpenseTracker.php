<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\ExpenseTracker;

class ExpenseTracker extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        ExpenseTracker::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.expense-tracker', [
            'items' => ExpenseTracker::latest()->get()
        ]);
    }
}
