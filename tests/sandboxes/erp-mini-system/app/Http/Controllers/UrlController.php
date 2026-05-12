<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Url;

class UrlController extends Controller
{
    public function show($short_code)
    {
        $url = Url::where('short_code', $short_code)->firstOrFail();
        
        $url->increment('visits');
        $url->update(['last_visited_at' => now()]);

        return redirect($url->original_url);
    }
}
