<?php

namespace App\Services;

use App\Events\WarrantyActivated;
use App\Repositories\TertiaryRepository;

class TertiarySaleService
{
    protected $tertiarySaleRepository;
    protected $stockService;

    public function __construct(TertiaryRepository $tertiarySaleRepository, StockService $stockService)
    {
        $this->tertiarySaleRepository = $tertiarySaleRepository;
        $this->stockService = $stockService;
    }

    public function allTertiarySales()
    {
        return $this->tertiarySaleRepository->allTertiaries();
    }

    public function store($request)
    {
        $imei = $request->validated('imei');
        $stock = $this->stockService->stocksByImei($imei);
        if (!$stock)
        {
            return redirect()->back()->withErrors(['imei' => 'Invalid IMEI number.']);
        }
        $this->tertiarySaleRepository->create([
            'user_id'   => auth()->id(),
            'stock_id'  => $stock->id,
            'name'      => $request->customer_name,
            'phone'     => $request->customer_phone,
            'address'   => $request->customer_address,
            'remarks'   => $request->remarks ?? ''
        ]);

        $this->stockService->statusUpdate($stock, 3);

        event(new WarrantyActivated($stock, $request->customer_name, $request->customer_phone));

        return true;
    }
}
