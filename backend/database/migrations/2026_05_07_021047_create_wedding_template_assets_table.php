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
        Schema::create('wedding_template_assets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('template_id')->constrained('wedding_templates')->cascadeOnDelete();
            $table->string('asset_type', 100);
            $table->string('file_path', 500);
            $table->string('alt_text')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wedding_template_assets');
    }
};
