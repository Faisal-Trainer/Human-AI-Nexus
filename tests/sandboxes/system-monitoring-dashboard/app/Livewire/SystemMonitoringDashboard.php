<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Node;

class SystemMonitoringDashboard extends Component
{
    public function render()
    {
        return view('livewire.system-monitoring-dashboard', [
            'items' => Node::latest()->get()
        ]);
    }
}