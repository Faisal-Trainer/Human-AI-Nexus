<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\SecuritySetting;
use Illuminate\Support\Str;

class TwoFactorAuthSystem extends Component
{
    public $enabled = false;
    public $codes = [];

    public function mount() {
        $setting = SecuritySetting::first();
        if ($setting) {
            $this->enabled = $setting->two_factor_enabled;
            $this->codes = json_decode($setting->recovery_codes ?? '[]', true);
        }
    }

    public function toggle() {
        $this->enabled = !$this->enabled;
        if ($this->enabled && empty($this->codes)) {
            $this->generateCodes();
        }
        
        SecuritySetting::updateOrCreate(['user_id' => 1], [
            'two_factor_enabled' => $this->enabled,
            'recovery_codes' => json_encode($this->codes)
        ]);
    }

    public function generateCodes() {
        $this->codes = [];
        for($i=0; $i<8; $i++) {
            $this->codes[] = strtoupper(Str::random(10));
        }
    }

    public function render()
    {
        return view('livewire.two-factor-auth-system');
    }
}
