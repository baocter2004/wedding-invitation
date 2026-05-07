<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['wedding_id', 'event_type', 'title', 'event_time', 'venue_name', 'address', 'map_url', 'latitude', 'longitude', 'note', 'sort_order'])]
class WeddingEvent extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'event_time' => 'datetime',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
        ];
    }

    public function wedding()
    {
        return $this->belongsTo(Wedding::class);
    }
}
