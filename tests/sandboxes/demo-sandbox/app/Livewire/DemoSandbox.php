<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\DemoSandbox;

class DemoSandbox extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        DemoSandbox::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.demo-sandbox', [
            'items' => DemoSandbox::latest()->get()
        ]);
    }
}
