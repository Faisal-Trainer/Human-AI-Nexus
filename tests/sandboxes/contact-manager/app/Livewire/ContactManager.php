<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Contact;

class ContactManager extends Component
{
    public $name = '';
    public $email = '';
    public $phone = '';
    public $company = '';

    public function save() {
        $this->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required'
        ]);
        Contact::create([
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'company' => $this->company
        ]);
        $this->reset();
    }

    public function render()
    {
        return view('livewire.contact-manager', [
            'items' => Contact::latest()->get()
        ]);
    }
}