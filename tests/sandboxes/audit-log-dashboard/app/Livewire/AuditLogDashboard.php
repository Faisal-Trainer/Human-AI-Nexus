<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\AuditLog;

class AuditLogDashboard extends Component
{
    public $search = '';

    public function render()
    {
        return view('livewire.audit-log-dashboard', [
            'items' => AuditLog::where('action', 'like', "%{$this->search}%")->latest()->get()
        ]);
    }
}