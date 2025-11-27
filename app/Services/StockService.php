<?php

namespace App\Services;

use App\Repositories\StockRepository;

class StockService
{
    protected $stockRepository;

    public function __construct(StockRepository $stockRepository)
    {
        $this->stockRepository = $stockRepository;
    }

    public function allStocks()
    {
        return $this->stockRepository->allStocks();
    }

    public function stocksByImei($imei)
    {
        return $this->stockRepository->findStockByImei($imei);
    }

    public function stocksDetailsByImei($imei)
    {
        return $this->stockRepository->findStockDetailsByImei($imei);
    }

    public function statusUpdate($id, $status)
    {
        return $this->stockRepository->statusUpdate($id, $status);
    }

    public function findById($id)
    {
        return $this->stockRepository->findById($id);
    }
    public function storeStocks($request)
    {
        foreach ($request->stocks as $item) {
            $this->stockRepository->create([
                'product_id' => $request->product_id,
                'imei1' => $item['imei1'],
                'imei2' => $item['imei2'],
                'warranty' => $item['warranty'],
            ]);
        }
    }
}
