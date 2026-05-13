<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\NexusUser;

class UserManagementSystem extends Component
{
    public function render()
    {
        return view('livewire.user-management-system', [
            'items' => NexusUser::latest()->get()
        ]);
    }
}