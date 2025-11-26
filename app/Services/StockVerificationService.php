<?php

namespace App\Services;

use App\Repositories\StockRepository;

class StockVerificationService
{
    protected $stockRepository;

    public function __construct(StockRepository $stockRepository)
    {
        $this->stockRepository = $stockRepository;
    }

    public function verifyStockByImei($imei)
    {
        $stock= $this->stockRepository->findStockByImei($imei);
        if(!$stock){
            return null;
        }
        return $stock;
    }
}
