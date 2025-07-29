<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_by',
        'status',
        'remarks',
    ];
    public function details()
    {
        return $this->hasMany(Orderdetail::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function orderBy()
    {
        return $this->belongsTo(User::class, 'order_by');
    }
    public function imeis()
    {
        return $this->hasMany(Orderimei::class);
    }
    public function prisales()
    {
        return $this->hasMany(Prisale::class);
    }

}
