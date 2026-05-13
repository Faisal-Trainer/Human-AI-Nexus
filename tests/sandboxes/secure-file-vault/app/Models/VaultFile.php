<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VaultFile extends Model
{
    protected $fillable = ['user_id', 'name', 'size', 'type', 'encryption_key', 'is_locked'];
}
