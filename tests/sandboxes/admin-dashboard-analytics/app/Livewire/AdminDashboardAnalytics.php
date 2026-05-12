<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\AdminDashboardAnalytics;

class AdminDashboardAnalytics extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        AdminDashboardAnalytics::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.admin-dashboard-analytics', [
            'items' => AdminDashboardAnalytics::latest()->get()
        ]);
    }
}
