<?php

namespace App\Repositories;

use App\Models\Tersale;

class TertiaryRepository
{
    public function allTertiaries()
    {
        return Tersale::with('stock.product', 'user')->get();
    }

    public function findTertiaryByStockId($stockId)
    {
        return Tersale::with('stock.product', 'user')
            ->where('stock_id', $stockId)
            ->first();
    }

    public function create(array $data)
    {
        return Tersale::create($data);
    }
}
