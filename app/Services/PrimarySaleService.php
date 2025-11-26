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
}
