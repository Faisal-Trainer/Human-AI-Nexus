<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Analytics;

class AdminDashboardAnalytics extends Component
{
    public function render()
    {
        return view('livewire.admin-dashboard-analytics', [
            'items' => Analytics::latest()->get(),
            'total_visits' => Analytics::where('metric_name', 'visit')->sum('metric_value'),
            'conversion_rate' => 3.5
        ]);
    }
}