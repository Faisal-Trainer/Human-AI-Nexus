<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SecuritySetting extends Model
{
    protected $fillable = ['user_id', 'two_factor_enabled', 'recovery_codes'];
}
