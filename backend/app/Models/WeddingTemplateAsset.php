<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['template_id', 'asset_type', 'file_path', 'alt_text', 'sort_order'])]
class WeddingTemplateAsset extends Model
{
    use HasFactory;

    public function template()
    {
        return $this->belongsTo(WeddingTemplate::class, 'template_id');
    }
}
