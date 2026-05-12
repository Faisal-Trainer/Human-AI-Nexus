<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\InventoryDashboard;

class InventoryDashboard extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        InventoryDashboard::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.inventory-dashboard', [
            'items' => InventoryDashboard::latest()->get()
        ]);
    }
}
