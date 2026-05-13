<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('security_settings', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->default(1);
            $table->boolean('two_factor_enabled')->default(false);
            $table->text('recovery_codes')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('security_settings');
    }
};
