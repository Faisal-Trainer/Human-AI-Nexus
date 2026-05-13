<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\ApiToken;
use Illuminate\Support\Str;

class ApiTokenManager extends Component
{
    public $name = '';
    public $newToken = null;

    public function createToken() {
        $this->validate(['name' => 'required']);
        
        $token = Str::random(64);
        ApiToken::create([
            'name' => $this->name,
            'token' => hash('sha256', $token)
        ]);

        $this->newToken = $token;
        $this->name = '';
    }

    public function revoke($id) {
        ApiToken::find($id)->delete();
    }

    public function render()
    {
        return view('livewire.api-token-manager', [
            'tokens' => ApiToken::where('user_id', 1)->get()
        ]);
    }
}
