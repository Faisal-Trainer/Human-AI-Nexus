<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserVerification extends Model
{
    protected $fillable = ['user_id', 'email', 'verified_at', 'token'];
}
