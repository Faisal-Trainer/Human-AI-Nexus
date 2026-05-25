<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task', function (Blueprint $table) {
            $table->uuid('id')->primary();      // UUID primary key
            $table->foreignUuid('user_id')      // FK to users (if applicable)
                  ->constrained()->cascadeOnDelete();
            $table->string('name')->nullable();   // varchar 255
            $table->text('description')->nullable(); // long text
            $table->unsignedBigInteger('price')->nullable();  // integer
            $table->boolean('active')->default(true);
            $table->decimal('amount', 10, 2)->nullable();  // money/decimal
            $table->enum('status', ['active','inactive'])->nullable();
            $table->index(['name']);     // add index for searchable columns
            $table->timestamps();              // created_at, updated_at
            $table->softDeletes();             // deleted_at for soft delete
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task');
    }
};