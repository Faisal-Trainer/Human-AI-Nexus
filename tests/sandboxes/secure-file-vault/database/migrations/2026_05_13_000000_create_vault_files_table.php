<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('vault_files', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->default(1);
            $table->string('name');
            $table->string('size');
            $table->string('type');
            $table->string('encryption_key')->nullable();
            $table->boolean('is_locked')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('vault_files');
    }
};
