<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'template_id', 'slug', 'title', 'bride_name', 'groom_name', 'bride_full_name', 'groom_full_name', 'bride_phone', 'groom_phone', 'bride_father_name', 'bride_mother_name', 'groom_father_name', 'groom_mother_name', 'cover_image_path', 'intro_text', 'love_story', 'wedding_date', 'lunar_date_text', 'music_url', 'language', 'theme_config_json', 'status', 'is_public', 'hide_watermark', 'published_at', 'expires_at'])]
class Wedding extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'wedding_date' => 'date',
            'theme_config_json' => 'array',
            'is_public' => 'boolean',
            'hide_watermark' => 'boolean',
            'published_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function template()
    {
        return $this->belongsTo(WeddingTemplate::class, 'template_id');
    }

    public function events()
    {
        return $this->hasMany(WeddingEvent::class)->orderBy('sort_order');
    }

    public function photos()
    {
        return $this->hasMany(WeddingPhoto::class)->orderBy('sort_order');
    }

    public function bankAccounts()
    {
        return $this->hasMany(WeddingBankAccount::class)->orderBy('sort_order');
    }

    public function rsvps()
    {
        return $this->hasMany(WeddingRsvp::class);
    }

    public function wishes()
    {
        return $this->hasMany(WeddingWish::class);
    }
}
