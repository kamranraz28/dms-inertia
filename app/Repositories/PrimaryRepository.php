<?php

namespace App\Repositories;

use App\Models\Prisale;

class PrimaryRepository
{
    public function allPrimaries()
    {
        return Prisale::with('stock.product', 'user')->get();
    }
    public function availablePrimaryStock()
    {
        return Prisale::with('stock.product', 'user')
                      ->whereHas('stock', function ($query) {
                          $query->where('status', 1);
                      })
                      ->get();
    }
    public function primariesByUser($userId)
    {
        return Prisale::with('stock.product', 'user')
                      ->where('user_id', $userId)
                      ->get();
    }
    public function primaryStocksByUser($userId)
    {
        return Prisale::with('stock.product', 'user')
                      ->where('user_id', $userId)
                      ->whereHas('stock', function ($query) {
                          $query->where('status', 1);
                      })
                      ->get();
    }
    public function deleteByStock($stockId)
    {
        return Prisale::where('stock_id', $stockId)->delete();
    }
}
