<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wedding_rsvps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wedding_id')->constrained()->cascadeOnDelete();
            
            $table->string('guest_name');
            $table->string('phone', 30)->nullable();
            $table->string('email')->nullable();
            $table->string('side', 50)->nullable();
            
            $table->string('attendance_status', 50);
            $table->integer('guest_count')->default(1);
            $table->text('message')->nullable();
            
            $table->string('ip_address', 100)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('submitted_at')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wedding_rsvps');
    }
};
