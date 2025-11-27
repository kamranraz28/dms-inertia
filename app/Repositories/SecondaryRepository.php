<?php

namespace App\Repositories;

use App\Models\Secsale;

class SecondaryRepository
{
    public function allSecondaries()
    {
        return Secsale::with('stock.product', 'retailer', 'dealer')->get();
    }
    public function availableSecondaryStock()
    {
        return Secsale::with(['stock.product', 'retailer'])
            ->whereHas('stock', function ($query) {
                $query->where('status', 2);
            })
            ->get();
    }
    public function secondariesByRetailer($retailerId)
    {
        return Secsale::with(['retailer', 'stock.product'])
            ->where('retailer_id', $retailerId)
            ->get();
    }
    public function secondaryStockByRetailer($retailerId)
    {
        return Secsale::with(['stock.product', 'retailer'])
            ->where('retailer_id', $retailerId)
            ->whereHas('stock', function ($query) {
                $query->where('status', 2);
            })
            ->get();
    }
    public function deleteByStock($stockId)
    {
        return Secsale::where('stock_id', $stockId)->delete();
    }
}
