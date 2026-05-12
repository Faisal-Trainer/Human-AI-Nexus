<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\RolePermissionManager;

class RolePermissionManager extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        RolePermissionManager::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.role-permission-manager', [
            'items' => RolePermissionManager::latest()->get()
        ]);
    }
}
