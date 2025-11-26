<?php

namespace App\Repositories;

use App\Models\Stock;

class StockRepository
{
    public function allStocks()
    {
        return Stock::with('product.brand', 'product.category')->get();
    }

    public function findStockByImei($imei)
    {
        return Stock::where('imei1', $imei)
            ->orWhere('imei2', $imei)
            ->first();
    }
}
