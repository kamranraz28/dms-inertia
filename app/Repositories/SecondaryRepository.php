<?php

namespace App\Repositories;

use App\Models\Secsale;

class SecondaryRepository
{
    public function allSecondaries()
    {
        return Secsale::with('stock.product', 'retailer', 'dealer')->get();
    }
}
