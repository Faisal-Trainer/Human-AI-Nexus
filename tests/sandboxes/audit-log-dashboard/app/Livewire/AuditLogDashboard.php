<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\AuditLogDashboard;

class AuditLogDashboard extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        AuditLogDashboard::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.audit-log-dashboard', [
            'items' => AuditLogDashboard::latest()->get()
        ]);
    }
}
