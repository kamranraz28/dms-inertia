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
        return $this->stockRepository->allStocks()
            ->where('imei1', $imei)
            ->orWhere('imei2', $imei)
            ->first();
    }

    public function statusUpdate($stock, $status)
    {
        $stock->status = $status;
        $stock->save();
    }
}
