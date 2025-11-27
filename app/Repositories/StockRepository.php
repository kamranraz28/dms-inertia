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
    public function findStockDetailsByImei($imei)
    {
        return Stock::with([
            'product.brand',
            'product.cat',
            'prisales.user',
            'secsales.retailer',
            'tersales.user',
        ])
        ->where(function ($query) use ($imei) {
            $query->where('imei1', $imei)->orWhere('imei2', $imei);
        })
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
    public function statusUpdate($id, $status)
    {
        return Stock::where('id', $id)
            ->update(['status' => $status]);
    }
}
