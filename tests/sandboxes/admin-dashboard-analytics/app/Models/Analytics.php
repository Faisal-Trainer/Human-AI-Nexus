<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Analytics extends Model
{
    protected $table = 'analytics_data';
    protected $fillable = ['metric_name', 'metric_value', 'category'];
}