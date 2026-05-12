<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\ContactManager;

class ContactManager extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        ContactManager::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.contact-manager', [
            'items' => ContactManager::latest()->get()
        ]);
    }
}
