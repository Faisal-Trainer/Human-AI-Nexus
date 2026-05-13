<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\UserVerification;

class EmailVerificationWorkflow extends Component
{
    public $status = 'pending';

    public function mount() {
        $v = UserVerification::where('user_id', 1)->first();
        if ($v && $v->verified_at) {
            $this->status = 'verified';
        }
    }

    public function verify() {
        $v = UserVerification::updateOrCreate(['user_id' => 1], [
            'email' => 'user@example.com',
            'verified_at' => now()
        ]);
        $this->status = 'verified';
    }

    public function render()
    {
        return view('livewire.email-verification-workflow');
    }
}
