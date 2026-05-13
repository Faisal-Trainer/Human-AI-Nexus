<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\LoginAttempt;

class LoginAnomalyDetector extends Component
{
    public function render()
    {
        return view('livewire.login-anomaly-detector', [
            'attempts' => LoginAttempt::latest()->get()
        ]);
    }
}
