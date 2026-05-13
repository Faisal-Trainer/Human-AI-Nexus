<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Deal;

class CrmSederhana extends Component
{
    public function updateStatus($id, $status) {
        $deal = Deal::find($id);
        $deal->status = $status;
        $deal->save();
    }

    public function render()
    {
        return view('livewire.crm-sederhana', [
            'items' => Deal::latest()->get()
        ]);
    }
}