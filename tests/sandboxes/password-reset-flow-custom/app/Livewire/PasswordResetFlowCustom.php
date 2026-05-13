<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\PasswordReset;
use Illuminate\Support\Str;

class PasswordResetFlowCustom extends Component
{
    public $step = 1; // 1: Email, 2: Token, 3: Success
    public $email = '';
    public $password = '';

    public function requestReset() {
        $this->validate(['email' => 'required|email']);
        PasswordReset::create([
            'email' => $this->email,
            'token' => Str::random(60),
            'expires_at' => now()->addHour()
        ]);
        $this->step = 2;
    }

    public function resetPassword() {
        $this->step = 3;
    }

    public function render()
    {
        return view('livewire.password-reset-flow-custom');
    }
}
