<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoginAttempt extends Model
{
    protected $fillable = ['email', 'ip', 'location', 'risk_score', 'status', 'failure_reason'];
}
