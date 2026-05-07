<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['wedding_id', 'image_path', 'caption', 'sort_order'])]
class WeddingPhoto extends Model
{
    use HasFactory;

    public function wedding()
    {
        return $this->belongsTo(Wedding::class);
    }
}
