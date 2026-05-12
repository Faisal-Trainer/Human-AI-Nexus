<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\UserManagementSystem;

class UserManagementSystem extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        UserManagementSystem::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.user-management-system', [
            'items' => UserManagementSystem::latest()->get()
        ]);
    }
}
