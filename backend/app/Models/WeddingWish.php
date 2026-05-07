<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['wedding_id', 'guest_name', 'message', 'is_approved'])]
class WeddingWish extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_approved' => 'boolean',
        ];
    }

    public function wedding()
    {
        return $this->belongsTo(Wedding::class);
    }
}
