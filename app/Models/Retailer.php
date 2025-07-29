<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Retailer extends Model
{
    use HasFactory;

    protected $fillable = [
        'dealer_id',
        'retailer_id',
        'status',
    ];

    public function dealer()
    {
        return $this->belongsTo(User::class, 'dealer_id');
    }
    public function retailer()
    {
        return $this->belongsTo(User::class, 'retailer_id');
    }
}
