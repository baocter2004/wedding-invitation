<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['wedding_id', 'guest_name', 'phone', 'email', 'side', 'attendance_status', 'guest_count', 'message', 'ip_address', 'user_agent', 'submitted_at'])]
class WeddingRsvp extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'submitted_at' => 'datetime',
        ];
    }

    public function wedding()
    {
        return $this->belongsTo(Wedding::class);
    }
}
