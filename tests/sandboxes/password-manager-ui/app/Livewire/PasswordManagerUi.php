<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Credential;

class PasswordManagerUi extends Component
{
    public $show = [];

    public function toggle($id) {
        if(isset($this->show[$id])) unset($this->show[$id]);
        else $this->show[$id] = true;
    }

    public function render()
    {
        return view('livewire.password-manager-ui', [
            'items' => Credential::latest()->get()
        ]);
    }
}