<?php

namespace App\Http\Controllers;

use App\Http\Requests\Sale\StoreTertiarySaleRequest;
use App\Services\RetailerService;
use App\Services\StockService;
use App\Services\TertiarySaleService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RetailerController extends Controller
{
    protected $retailerService, $stockService, $tertiarySaleService;

    public function __construct(RetailerService $retailerService, StockService $stockService, TertiarySaleService $tertiarySaleService)
    {
        $this->retailerService = $retailerService;
        $this->stockService = $stockService;
        $this->tertiarySaleService = $tertiarySaleService;
    }
    //
    public function myStocks()
    {
        return Inertia::render('Retailers/Stocks', [
            'stocks' => $this->retailerService->stocksByRetailer(auth()->id()),
        ]);
    }
    public function tertiarySales()
    {
        return Inertia::render('Retailers/TertiarySales');
    }

    public function checkImei(Request $request)
    {
        $imei = $request->input('imei');

        $stock = $this->stockService->stocksByImei($imei);

        if (!$stock) {
            return response()->json(['valid' => false, 'message' => 'This IMEI is not valid.']);
        }

        if ($stock->status == 3) {
            return response()->json(['valid' => false, 'message' => 'This IMEI is not valid.']);
        }

        return response()->json([
            'valid' => true,
            'message' => "Model: " . $stock->product->model,
        ]);
    }

    public function storeTertiarySales(StoreTertiarySaleRequest $request)
    {
        try {
            $this->tertiarySaleService->store($request);

            return redirect()->back()->with('success', 'Tertiary sales recorded successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['imei' => $e->getMessage()]);
        }
    }


}
