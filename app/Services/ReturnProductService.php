<?php

namespace App\Services;

use App\Repositories\ReturnProductRepository;

class ReturnProductService
{
    //
    protected $returnProductRepository;
    protected $stockService;
    protected $primarySaleService;
    public function __construct(
        ReturnProductRepository $returnProductRepository,
        StockService $stockService,
        PrimarySaleService $primarySaleService
        )
    {
        $this->returnProductRepository = $returnProductRepository;
        $this->stockService = $stockService;
        $this->primarySaleService = $primarySaleService;
    }
    public function allReturnProducts()
    {
        return $this->returnProductRepository->getAllReturnProduct();
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
