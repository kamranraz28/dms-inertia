<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'imei1',
        'imei2',
        'warranty',
        'status',
    ];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function imeis()
    {
        return $this->hasMany(Orderimei::class);
    }
    public function prisales()
    {
        return $this->hasMany(Prisale::class);
    }
    public function secsales()
    {
        return $this->hasMany(Secsale::class);
    }
    public function tersales()
    {
        return $this->hasMany(Tersale::class);
    }
    public function returnProduct()
    {
        return $this->hasOne(ReturnProduct::class);
    }
}
