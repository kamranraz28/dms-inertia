<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'cat_id',
        'brand_id',
        'name',
        'model',
        'product_code',
        'color',
        'dp',
        'rp',
        'mrp',
        'details',
        'photo',
        'chalan_type',
        'status',
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
    public function cat()
    {
        return $this->belongsTo(Cat::class);
    }
    public function orderDetails()
    {
        return $this->hasMany(Orderdetail::class);
    }
    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }
}
