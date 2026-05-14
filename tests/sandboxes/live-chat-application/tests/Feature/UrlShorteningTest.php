<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Url;
use Illuminate\Support\Str;

class UrlShorteningTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function test_it_can_shorten_a_url()
    {
        $originalUrl = 'https://google.com';
        $shortCode = Str::random(6);

        $url = Url::create([
            'original_url' => $originalUrl,
            'short_code' => $shortCode
        ]);

        $this->assertDatabaseHas('urls', [
            'original_url' => $originalUrl,
            'short_code' => $shortCode
        ]);
    }
}
