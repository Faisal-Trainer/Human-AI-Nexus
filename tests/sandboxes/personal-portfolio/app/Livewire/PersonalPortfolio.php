<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Project;

class PersonalPortfolio extends Component
{
    public function render()
    {
        return view('livewire.personal-portfolio', [
            'items' => Project::latest()->get()
        ]);
    }
}