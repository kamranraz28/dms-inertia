<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prisale extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_id',
        'stock_id',
        'status',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }
}
