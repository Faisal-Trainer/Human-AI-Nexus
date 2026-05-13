<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MagicToken extends Model
{
    protected $fillable = ['email', 'token', 'expires_at', 'used_at'];
}
