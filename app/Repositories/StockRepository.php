<?php

namespace App\Repositories;

use App\Models\Stock;

class StockRepository
{
    public function allStocks()
    {
        return Stock::with('product.brand', 'product.cat')->get();
    }

    public function findStockByImei($imei)
    {
        return Stock::with('product.brand', 'product.cat')
            ->where('imei1', $imei)
            ->orWhere('imei2', $imei)
            ->first();
    }

    public function findById($id)
    {
        return Stock::find($id);
    }
    public function create(array $data)
    {
        return Stock::create($data);
    }
}
