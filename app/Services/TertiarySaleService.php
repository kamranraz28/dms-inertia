<?php

namespace App\Services;

use App\Events\WarrantyActivated;
use App\Repositories\TertiaryRepository;
use Carbon\Carbon;

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

    public function findTertiaryByStockId($imei)
    {
        $stock = $this->stockService->stocksByImei($imei);
        $terSale = $this->tertiarySaleRepository->findTertiaryByStockId($stock->id);
        $activatedAt = Carbon::parse($terSale->created_at);
        $warrantyDays = $stock->warranty ?? 0;

        $expiryDate = $activatedAt->copy()->addDays($warrantyDays);
        $today = Carbon::now();

        $daysRemaining = $today->lt($expiryDate)
            ? $today->diffInDays($expiryDate)
            : 0;

        return response()->json([
            'verified' => true,
            'product' => [
                'name' => $stock->product->name,
                'model' => $stock->product->model,
                'color' => $stock->product->color,
                'brand' => $stock->product->brand->name ?? '-',
                'category' => $stock->product->cat->name ?? '-',
                'stocked_at' => $stock->created_at->format('Y-m-d'),
                'warranty_activated' => $activatedAt->toDateTimeString(),
                'warranty_period_days' => $warrantyDays,
                'warranty_expires_at' => $expiryDate->toDateString(),
                'warranty_remaining_days' => $daysRemaining,
            ],
        ]);
    }

    public function searchByStock($stockId)
    {
        return $this->tertiarySaleRepository->searchByStock($stockId);
    }
}
