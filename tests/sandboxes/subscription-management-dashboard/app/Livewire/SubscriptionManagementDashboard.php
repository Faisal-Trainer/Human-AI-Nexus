<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Subscription;

class SubscriptionManagementDashboard extends Component
{
    public function render()
    {
        return view('livewire.subscription-management-dashboard', [
            'items' => Subscription::latest()->get()
        ]);
    }
}