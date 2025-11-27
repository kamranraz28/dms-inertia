<?php

namespace App\Services;

use App\Repositories\PrimaryRepository;

class PrimarySaleService
{
    protected $primarySaleRepository;

    public function __construct(PrimaryRepository $primarySaleRepository)
    {
        $this->primarySaleRepository = $primarySaleRepository;
    }

    public function allPrimarySales()
    {
        return $this->primarySaleRepository->allPrimaries();
    }
    public function searchByDealerStock($imei)
    {
        return $this->primarySaleRepository->searchByDealerStock(auth()->id(),$imei);
    }
    public function availablePrimaryStock()
    {
        return $this->primarySaleRepository->availablePrimaryStock();
    }
    public function primarySalesByUser()
    {
        return $this->primarySaleRepository->primariesByUser(auth()->id());
    }
    public function primaryStockByUser()
    {
        return $this->primarySaleRepository->primaryStocksByUser(auth()->id());
    }
    public function deleteByStock($stockId)
    {
        return $this->primarySaleRepository->deleteByStock($stockId);
    }
}
