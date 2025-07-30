<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReturnProduct extends Model
{
    use HasFactory;

    protected $table = 'returns';

    protected $fillable = [
        'dealer_id',
        'retailer_id',
        'stock_id',
        'type',
        'status',
        'approve_by'
    ];

    public function dealer()
    {
        return $this->belongsTo(User::class, 'dealer_id');
    }
    public function retailer()
    {
        return $this->belongsTo(User::class, 'dealer_id');
    }
    public function approveBy()
    {
        return $this->belongsTo(User::class, 'approve_by');
    }
    public function stock()
    {
        return $this->belongsTo(User::class, 'stock_id');
    }

}
