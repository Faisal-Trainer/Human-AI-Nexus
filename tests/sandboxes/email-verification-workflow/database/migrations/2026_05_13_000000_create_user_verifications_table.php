<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('user_verifications', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->default(1);
            $table->string('email');
            $table->timestamp('verified_at')->nullable();
            $table->string('token')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('user_verifications');
    }
};
