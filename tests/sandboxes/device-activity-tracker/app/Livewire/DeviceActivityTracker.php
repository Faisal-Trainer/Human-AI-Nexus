<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\ActivityLog;

class DeviceActivityTracker extends Component
{
    public function render()
    {
        return view('livewire.device-activity-tracker', [
            'logs' => ActivityLog::where('user_id', 1)->latest()->get()
        ]);
    }
}
