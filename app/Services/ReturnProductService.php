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
    protected $secondarySaleService;
    public function __construct(
        ReturnProductRepository $returnProductRepository,
        StockService $stockService,
        PrimarySaleService $primarySaleService,
        RetailerService $retailerService,
        SecondarySaleService $secondarySaleService,
    ) {
        $this->returnProductRepository = $returnProductRepository;
        $this->stockService = $stockService;
        $this->primarySaleService = $primarySaleService;
        $this->retailerService = $retailerService;
        $this->secondarySaleService = $secondarySaleService;
    }
    public function allReturnProducts()
    {
        return $this->returnProductRepository->getAllReturnProduct();
    }
    public function storeByRetailer($validated)
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
    public function storeByDealer($validated)
    {
        foreach ($validated['imeis'] as $imeiData) {
            $imei = $imeiData['imei'];

            $stock = $this->stockService->stocksByImei($imei);

            $this->returnProductRepository->create([
                'dealer_id' => auth()->id(),
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
    public function approveRetailerReturnByDealer($request, $id)
    {
        $returnProduct = $this->returnProductRepository->approveretailerReturnByDealer($id);
        if ($request->action === 'approve') {
            $this->stockService->statusUpdate($returnProduct->stock_id, 1);
            $this->secondarySaleService->deleteByStock($returnProduct->stock_id);
        } elseif ($request->action === 'decline') {
            $this->returnProductRepository->declineReturnProduct($id);
        }
        return true;
    }
    public function checkImei($imei)
    {
        $stock = $this->stockService->stocksByImei($imei);

        if (!$stock) {
            return [
                'valid' => false,
                'message' => 'This IMEI is not available.',
            ];
        }

        $primarySale = $this->primarySaleService->searchByDealerStock($stock->id);
        if (!$primarySale) {
            return [
                'valid' => false,
                'message' => 'You are not eligible to return this.',
            ];
        }

        $secondarySale = $this->secondarySaleService->searchBystock($stock->id);
        if (!$secondarySale) {
            return [
                'valid' => false,
                'message' => 'This IMEI is available in Secondary Sales, delete that first.',
            ];
        }

        $returnProduct = $this->returnProductRepository->searchByStock($stock->id);
        if ($returnProduct) {
            return [
                'valid' => false,
                'message' => 'This IMEI is available in returning system.',
            ];
        }

        return [
            'valid' => true,
            'stock' => $stock,
            'message' => 'IMEI is Valid',
        ];
    }

}
