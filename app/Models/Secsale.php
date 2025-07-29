<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Secsale extends Model
{
    use HasFactory;

    protected $fillable = [
        'retailer_id',
        'dealer_id',
        'stock_id',
        'status',
    ];

    public function retailer()
    {
        return $this->belongsTo(User::class, 'retailer_id');
    }

    public function dealer()
    {
        return $this->belongsTo(User::class, 'dealer_id');
    }

    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }
}
