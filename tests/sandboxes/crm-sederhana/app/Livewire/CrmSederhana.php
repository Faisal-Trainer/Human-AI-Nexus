<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\CrmSederhana;

class CrmSederhana extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        CrmSederhana::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.crm-sederhana', [
            'items' => CrmSederhana::latest()->get()
        ]);
    }
}
