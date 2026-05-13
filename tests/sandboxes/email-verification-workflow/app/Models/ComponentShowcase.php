<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ComponentShowcase extends Model
{
    protected $table = 'components';
    protected $fillable = ['name', 'type'];
}