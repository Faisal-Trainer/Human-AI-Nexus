<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Expense;

class ExpenseTracker extends Component
{
    public $description = '';
    public $amount = '';
    public $category = 'Food';

    public function save() {
        $this->validate([
            'description' => 'required',
            'amount' => 'required|numeric',
            'category' => 'required'
        ]);
        Expense::create([
            'description' => $this->description,
            'amount' => $this->amount,
            'category' => $this->category
        ]);
        $this->reset(['description', 'amount']);
    }

    public function render()
    {
        return view('livewire.expense-tracker', [
            'items' => Expense::latest()->get()
        ]);
    }
}