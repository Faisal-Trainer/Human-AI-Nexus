<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Product;

class InventoryDashboard extends Component
{
    public function adjust($id, $amount) {
        $p = Product::find($id);
        $p->stock += $amount;
        $p->save();
    }

    public function render()
    {
        return view('livewire.inventory-dashboard', [
            'items' => Product::latest()->get()
        ]);
    }
}