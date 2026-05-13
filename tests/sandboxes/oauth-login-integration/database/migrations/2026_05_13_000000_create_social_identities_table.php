<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('social_identities', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->default(1);
            $table->string('provider_name');
            $table->string('provider_id');
            $table->string('avatar')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('social_identities');
    }
};
