<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\SystemMonitoringDashboard;

class SystemMonitoringDashboard extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        SystemMonitoringDashboard::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.system-monitoring-dashboard', [
            'items' => SystemMonitoringDashboard::latest()->get()
        ]);
    }
}
