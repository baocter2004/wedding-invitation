<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['code', 'name', 'category', 'description', 'thumbnail_path', 'preview_image_path', 'component_name', 'default_config_json', 'supported_sections_json', 'version', 'is_premium', 'is_featured', 'is_default', 'price', 'status', 'sort_order'])]
class WeddingTemplate extends Model
{
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'default_config_json' => 'array',
            'supported_sections_json' => 'array',
            'is_premium' => 'boolean',
            'is_featured' => 'boolean',
            'is_default' => 'boolean',
        ];
    }

    public function assets()
    {
        return $this->hasMany(WeddingTemplateAsset::class, 'template_id')->orderBy('sort_order');
    }

    public function weddings()
    {
        return $this->hasMany(Wedding::class, 'template_id');
    }
}
