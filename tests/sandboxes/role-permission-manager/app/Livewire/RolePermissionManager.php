<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Role;

class RolePermissionManager extends Component
{
    public function render()
    {
        return view('livewire.role-permission-manager', [
            'items' => Role::latest()->get()
        ]);
    }
}