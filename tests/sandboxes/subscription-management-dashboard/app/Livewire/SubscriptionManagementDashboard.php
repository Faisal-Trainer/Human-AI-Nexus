<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\SubscriptionManagementDashboard;

class SubscriptionManagementDashboard extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        SubscriptionManagementDashboard::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.subscription-management-dashboard', [
            'items' => SubscriptionManagementDashboard::latest()->get()
        ]);
    }
}
