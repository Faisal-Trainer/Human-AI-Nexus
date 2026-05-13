<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\SocialIdentity;

class OauthLoginIntegration extends Component
{
    public function unlink($id) {
        SocialIdentity::find($id)->delete();
    }

    public function render()
    {
        return view('livewire.oauth-login-integration', [
            'identities' => SocialIdentity::where('user_id', 1)->get()
        ]);
    }
}
