<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Url;
use Illuminate\Support\Str;

class UrlShortener extends Component
{
    public $original_url = '';

    public function shorten() {
        $this->validate(['original_url' => 'required|url']);
        Url::create([
            'original_url' => $this->original_url,
            'short_code' => Str::random(6)
        ]);
        $this->original_url = '';
    }

    public function render()
    {
        return view('livewire.url-shortener', [
            'items' => Url::latest()->get()
        ]);
    }
}