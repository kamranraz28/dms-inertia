<?php

namespace App\Repositories;

use App\Models\Stock;

class StockRepository
{
    public function allStocks()
    {
        return Stock::with('product.brand', 'product.category')->get();
    }
}
