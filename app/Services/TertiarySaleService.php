<?php

namespace App\Services;

use App\Repositories\TertiaryRepository;

class TertiarySaleService
{
    protected $tertiarySaleRepository;

    public function __construct(TertiaryRepository $tertiarySaleRepository)
    {
        $this->tertiarySaleRepository = $tertiarySaleRepository;
    }

    public function allTertiarySales()
    {
        return $this->tertiarySaleRepository->allTertiaries();
    }
}
