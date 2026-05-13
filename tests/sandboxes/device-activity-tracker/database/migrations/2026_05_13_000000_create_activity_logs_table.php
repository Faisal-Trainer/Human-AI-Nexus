<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->default(1);
            $table->string('event');
            $table->string('device');
            $table->string('location');
            $table->string('ip');
            $table->string('status');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('activity_logs');
    }
};
