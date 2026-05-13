<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('user_sessions', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->default(1);
            $table->string('ip_address');
            $table->string('user_agent');
            $table->string('location')->nullable();
            $table->string('device_type')->default('Desktop');
            $table->timestamp('last_activity');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('user_sessions');
    }
};
