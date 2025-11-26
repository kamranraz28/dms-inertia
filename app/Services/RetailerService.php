<?php

namespace App\Services;

use App\Repositories\SecondaryRepository;

class RetailerService
{
    protected $secondarySaleRepository;

    public function __construct(SecondaryRepository $secondarySaleRepository)
    {
        $this->secondarySaleRepository = $secondarySaleRepository;
    }

    public function stocksByRetailer($retailerId)
    {
        return $this->secondarySaleRepository->allSecondaries()
            ->where('retailer_id', $retailerId);
    }
}
