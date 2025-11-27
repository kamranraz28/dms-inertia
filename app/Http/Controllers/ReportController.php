<?php

namespace App\Http\Controllers;

use App\Models\Prisale;
use App\Models\Product;
use App\Models\Secsale;
use App\Models\Stock;
use App\Models\Tersale;
use App\Models\User;
use App\Services\ImeiLifeCycleService;
use App\Services\PrimarySaleService;
use App\Services\ProductService;
use App\Services\SecondarySaleService;
use App\Services\TertiarySaleService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ReportController extends Controller
{
    //
    protected $primarySaleService, $userService;
    protected $secondarySaleService;
    protected $tertiarySaleService;
    protected $productService;
    protected $imeiLifeCycleService;
    public function __construct(
        PrimarySaleService $primarySaleService,
        UserService $userService,
        SecondarySaleService $secondarySaleService,
        TertiarySaleService $tertiarySaleService,
        ProductService $productService,
        ImeiLifeCycleService $imeiLifeCycleService,
    )
    {
        $this->primarySaleService = $primarySaleService;
        $this->userService = $userService;
        $this->secondarySaleService = $secondarySaleService;
        $this->tertiarySaleService = $tertiarySaleService;
        $this->productService = $productService;
        $this->imeiLifeCycleService = $imeiLifeCycleService;
    }
    public function primarySalesReport()
    {
        return Inertia::render('Reports/Admin/PrimarySalesReport',[
            'primarySales' => $this->primarySaleService->allPrimarySales(),
            'dealers' => $this->userService->dealers(),
        ]);
    }

    public function secondarySalesReport()
    {
        return Inertia::render('Reports/Admin/SecondarySalesReport',[
            'secondarySales' => $this->secondarySaleService->allSecondarySales(),
            'dealers' => $this->userService->dealers(),
            'retailers' => $this->userService->retailers(),
        ]);
    }

    public function tertiarySalesReport()
    {
        return Inertia::render('Reports/Admin/TertiarySalesReport',[
            'tertiarySales' => $this->tertiarySaleService->allTertiarySales(),
        ]);
    }

   public function dealerImeiStockReport()
    {
        return Inertia::render('Reports/Admin/DealerImeiStockReport', [
            'dealerStocks' => $this->primarySaleService->availablePrimaryStock(),
            'dealers' => $this->userService->dealers(),
            'products' => $this->productService->allProducts(),
        ]);
    }

    public function retailerImeiStockReport()
    {
        return Inertia::render('Reports/Admin/RetailerImeiStockReport', [
            'retailerStocks' => $this->secondarySaleService->availableSecondaryStock(),
            'retailers' => $this->userService->retailers(),
            'products' => $this->productService->allProducts()
        ]);
    }

    public function imeiLifeCycleReport()
    {
        return Inertia::render('Reports/Admin/IMEILifeCycleReport');
    }

    public function imeiLifeCycleReportSearch(Request $request)
    {
        $request->validate([
            'imei' => 'required|string',
        ]);

        $result = $this->imeiLifeCycleService->findImeiLifeCycle($request->imei);
        return response()->json($result);

    }

}
