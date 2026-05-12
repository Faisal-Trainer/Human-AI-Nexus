<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\PasswordManagerUi;

class PasswordManagerUi extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        PasswordManagerUi::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.password-manager-ui', [
            'items' => PasswordManagerUi::latest()->get()
        ]);
    }
}
