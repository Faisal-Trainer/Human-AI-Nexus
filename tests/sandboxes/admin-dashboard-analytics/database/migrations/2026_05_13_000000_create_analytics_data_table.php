<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('analytics_data', function (Blueprint $table) {
            $table->id();
            $table->string('metric_name');
            $table->integer('metric_value');
            $table->string('category');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('analytics_data');
    }
};