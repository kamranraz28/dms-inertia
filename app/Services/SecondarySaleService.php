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
}
