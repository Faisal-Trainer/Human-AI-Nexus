<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\MultiTenantAdminPanel;

class MultiTenantAdminPanel extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        MultiTenantAdminPanel::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.multi-tenant-admin-panel', [
            'items' => MultiTenantAdminPanel::latest()->get()
        ]);
    }
}
