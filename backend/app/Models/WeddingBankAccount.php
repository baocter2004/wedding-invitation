<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['wedding_id', 'owner_name', 'bank_name', 'bank_code', 'account_number', 'qr_image_path', 'transfer_note', 'is_active', 'sort_order'])]
class WeddingBankAccount extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function wedding()
    {
        return $this->belongsTo(Wedding::class);
    }
}
