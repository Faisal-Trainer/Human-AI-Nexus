<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\PersonalPortfolio;

class PersonalPortfolio extends Component
{
    public $name = '';

    public function save()
    {
        $this->validate(['name' => 'required|min:3']);
        PersonalPortfolio::create(['name' => $this->name]);
        $this->name = '';
    }

    public function render()
    {
        return view('livewire.personal-portfolio', [
            'items' => PersonalPortfolio::latest()->get()
        ]);
    }
}
