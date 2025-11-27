<?php

namespace App\Services;

use App\Repositories\ReturnProductRepository;

class ReturnProductService
{
    //
    protected $returnProductRepository;
    protected $stockService;
    protected $primarySaleService;
    protected $retailerService;
    public function __construct(
        ReturnProductRepository $returnProductRepository,
        StockService $stockService,
        PrimarySaleService $primarySaleService,
        RetailerService $retailerService,
        )
    {
        $this->returnProductRepository = $returnProductRepository;
        $this->stockService = $stockService;
        $this->primarySaleService = $primarySaleService;
        $this->retailerService =$retailerService;
    }
    public function allReturnProducts()
    {
        return $this->returnProductRepository->getAllReturnProduct();
    }
    public function store($validated)
    {
        foreach ($validated['imeis'] as $imeiData) {
            $imei = $imeiData['imei'];

            $stock = $this->stockService->stocksByImei($imei);

            $dealerId = $this->retailerService->getDealerIdByRetailerId(auth()->id());

            $this->returnProductRepository->create([
                'dealer_id' => $dealerId,
                'retailer_id' => auth()->id(),
                'stock_id' => $stock->id,
                'type' => 1,
                'remarks' => $validated['remarks'],
            ]);
        }
    }
    public function returnByRetailer($retailerId)
    {
        return $this->returnProductRepository->returnByRetailer($retailerId);
    }
    public function approveReturnProduct($id)
    {
        $returnProduct = $this->returnProductRepository->approveReturnProduct($id);
        $this->stockService->statusUpdate($returnProduct->stock_id, 0);
        $this->primarySaleService->deleteByStock($returnProduct->stock_id);
        return true;
    }
    public function declineReturnProduct($id)
    {
        $returnProduct = $this->returnProductRepository->declineReturnProduct($id);
        $this->primarySaleService->deleteByStock($returnProduct->stock_id);
        return true;
    }
}
