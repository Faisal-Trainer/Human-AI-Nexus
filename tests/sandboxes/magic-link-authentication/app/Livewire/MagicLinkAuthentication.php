<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\MagicToken;
use Illuminate\Support\Str;

class MagicLinkAuthentication extends Component
{
    public $email = '';
    public $sent = false;

    public function sendLink() {
        $this->validate(['email' => 'required|email']);
        
        MagicToken::create([
            'email' => $this->email,
            'token' => Str::random(40),
            'expires_at' => now()->addMinutes(15)
        ]);

        $this->sent = true;
    }

    public function render()
    {
        return view('livewire.magic-link-authentication');
    }
}
