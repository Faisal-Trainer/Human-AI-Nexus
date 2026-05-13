<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Tenant;

class MultiTenantAdminPanel extends Component
{
    public $current_tenant = 'Global';

    public function switch($name) {
        $this->current_tenant = $name;
    }

    public function render()
    {
        return view('livewire.multi-tenant-admin-panel', [
            'items' => Tenant::latest()->get()
        ]);
    }
}