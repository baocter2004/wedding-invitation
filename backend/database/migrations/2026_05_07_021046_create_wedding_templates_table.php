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
        Schema::create('wedding_templates', function (Blueprint $table) {
            $table->id();
            $table->string('code', 100)->unique();
            $table->string('name');
            $table->string('category', 100)->nullable();
            $table->text('description')->nullable();

            $table->string('thumbnail_path', 500)->nullable();
            $table->string('preview_image_path', 500)->nullable();

            $table->string('component_name');

            $table->json('default_config_json')->nullable();
            $table->json('supported_sections_json')->nullable();

            $table->string('version', 50)->default('1.0.0');
            $table->boolean('is_premium')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_default')->default(false);

            $table->decimal('price', 12, 2)->default(0);
            $table->string('status', 30)->default('active');
            $table->integer('sort_order')->default(0);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wedding_templates');
    }
};
