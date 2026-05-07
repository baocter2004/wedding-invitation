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
        Schema::create('weddings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('template_id')->constrained('wedding_templates')->restrictOnDelete();

            $table->string('slug')->nullable()->unique();
            $table->string('title')->nullable();

            $table->string('bride_name');
            $table->string('groom_name');

            $table->string('bride_full_name')->nullable();
            $table->string('groom_full_name')->nullable();

            $table->string('bride_phone', 30)->nullable();
            $table->string('groom_phone', 30)->nullable();

            $table->string('bride_father_name')->nullable();
            $table->string('bride_mother_name')->nullable();
            $table->string('groom_father_name')->nullable();
            $table->string('groom_mother_name')->nullable();

            $table->string('cover_image_path', 500)->nullable();
            $table->text('intro_text')->nullable();
            $table->text('love_story')->nullable();

            $table->date('wedding_date')->nullable();
            $table->string('lunar_date_text')->nullable();

            $table->string('music_url', 500)->nullable();
            $table->string('language', 20)->default('vi');

            $table->json('theme_config_json')->nullable();

            $table->string('status', 30)->default('draft')->index();
            $table->boolean('is_public')->default(false)->index();
            $table->boolean('hide_watermark')->default(false);

            $table->timestamp('published_at')->nullable();
            $table->timestamp('expires_at')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weddings');
    }
};
