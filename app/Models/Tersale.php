<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tersale extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'stock_id',
        'name',
        'phone',
        'address',
        'remarks'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }
}
