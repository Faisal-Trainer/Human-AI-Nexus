<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\VaultFile;

class SecureFileVault extends Component
{
    public function toggleLock($id) {
        $file = VaultFile::find($id);
        $file->is_locked = !$file->is_locked;
        $file->save();
    }

    public function render()
    {
        return view('livewire.secure-file-vault', [
            'files' => VaultFile::where('user_id', 1)->get()
        ]);
    }
}
