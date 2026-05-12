<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\ErpMiniSystem;

class ErpMiniSystem extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        ErpMiniSystem::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.erp-mini-system', [
            'items' => ErpMiniSystem::latest()->get()
        ]);
    }
}
