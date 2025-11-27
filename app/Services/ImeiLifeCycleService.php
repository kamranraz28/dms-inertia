<?php

namespace App\Services;

class ImeiLifeCycleService
{
    //
    protected $stockService;
    public function __construct(StockService $stockService)
    {
        $this->stockService = $stockService;
    }
    public function findImeiLifeCycle($imei)
    {
        $stock = $this->stockService->stocksDetailsByImei($imei);
        if (!$stock) {
            return [
                'verified' => false,
                'product'  => [],
                'records'  => [],
            ];
        }
        $records = [];
        // Step 1: Stock received
        $records[] = [
            'stage' => 'Stock Received',
            'user' => 'Warehouse',
            'location' => 'Warehouse',
            'date' => $stock->created_at->format('Y-m-d H:i:s'),
            'remarks' => 'Product stocked in system',
        ];

        // Step-2: Primary sales
        foreach ($stock->prisales as $ps) {
            $records[] = [
                'stage' => 'Primary Sale (Dealer)',
                'user' => $ps->user->name ?? '',
                'location' => $ps->user->office_id ?? '',
                'date' => $ps->created_at->format('Y-m-d H:i:s'),
                'remarks' => 'Sold to dealer',
            ];
        }

         // Step-3: Secondary sales
        foreach ($stock->secsales as $ss) {
            $records[] = [
                'stage' => 'Secondary Sale (Retailer)',
                'user' => $ss->retailer->name ?? '',
                'location' => $ss->retailer->office_id ?? '',
                'date' => $ss->created_at->format('Y-m-d H:i:s'),
                'remarks' => 'Sold to retailer',
            ];
        }

        // Step-4: Tertiary sales
        foreach ($stock->tersales as $ts) {
            $records[] = [
                'stage' => 'Tertiary Sale (Customer)',
                'user' => $ts->name,
                'location' => $ts->phone,
                'date' => $ts->created_at->format('Y-m-d H:i:s'),
                'remarks' => 'Sold to customer',
            ];
        }

        // Warranty
        $warrantyDays = (int) $stock->warranty;
        $warrantyEnd = $stock->created_at->addDays($warrantyDays)->format('Y-m-d');

        // Product summary
        $product = [
            'product_model' => $stock->product->model ?? '',
            'brand' => $stock->product->brand->name ?? '',
            'category' => $stock->product->cat->name ?? '',
            'imei1' => $stock->imei1,
            'imei2' => $stock->imei2,
            'warranty_period_days' => $warrantyDays,
            'warranty_end_date' => $warrantyEnd,
        ];

        return [
            'verified' => true,
            'product' => $product,
            'records' => $records,
        ];
    }
}
