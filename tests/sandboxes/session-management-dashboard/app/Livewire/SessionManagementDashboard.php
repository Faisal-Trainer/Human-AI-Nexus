<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\UserSession;

class SessionManagementDashboard extends Component
{
    public function logout($id) {
        UserSession::find($id)->delete();
    }

    public function logoutAll() {
        UserSession::where('user_id', 1)->delete();
    }

    public function render()
    {
        return view('livewire.session-management-dashboard', [
            'sessions' => UserSession::where('user_id', 1)->latest()->get()
        ]);
    }
}
