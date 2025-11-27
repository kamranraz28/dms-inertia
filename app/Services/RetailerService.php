<?php

namespace App\Services;

use App\Repositories\RetailerRepository;
use App\Repositories\SecondaryRepository;

class RetailerService
{
    protected $secondarySaleRepository;
    protected $retailerRepository;

    public function __construct(
        SecondaryRepository $secondarySaleRepository,
        RetailerRepository $retailerRepository,
        )
    {
        $this->secondarySaleRepository = $secondarySaleRepository;
        $this->retailerRepository = $retailerRepository;
    }

    public function stocksByRetailer($retailerId)
    {
        return $this->secondarySaleRepository->allSecondaries()
            ->where('retailer_id', $retailerId);
    }
    public function getDealerIdByRetailerId($retailerId)
    {
        return $this->retailerRepository->getDealerIdByRetailerId($retailerId);
    }
}
