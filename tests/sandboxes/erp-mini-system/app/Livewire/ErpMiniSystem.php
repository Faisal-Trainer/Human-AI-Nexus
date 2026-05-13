<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Order;

class ErpMiniSystem extends Component
{
    public function updateStatus($id, $status) {
        $order = Order::find($id);
        $order->status = $status;
        $order->save();
    }

    public function render()
    {
        return view('livewire.erp-mini-system', [
            'items' => Order::latest()->get()
        ]);
    }
}