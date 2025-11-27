<?php

namespace App\Services;

use App\Repositories\SecondaryRepository;

class SecondarySaleService
{
    protected $secondarySaleRepository;

    public function __construct(SecondaryRepository $secondarySaleRepository)
    {
        $this->secondarySaleRepository = $secondarySaleRepository;
    }

    public function allSecondarySales()
    {
        return $this->secondarySaleRepository->allSecondaries();
    }
    public function searchByStock($stockId)
    {
        return $this->secondarySaleRepository->searchBystock($stockId);
    }
    public function availableSecondaryStock()
    {
        return $this->secondarySaleRepository->availableSecondaryStock();
    }
    public function secondarySalesByRetailer()
    {
        return $this->secondarySaleRepository->secondariesByRetailer(auth()->id());
    }
    public function secondaryStockByRetailer($retailerId)
    {
        return $this->secondarySaleRepository->secondaryStockByRetailer(auth()->id());
    }
    public function deleteByStock($stockId)
    {
        return $this->secondarySaleRepository->deleteByStock($stockId);
    }
}
