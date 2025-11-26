<?php

namespace App\Http\Controllers;

use App\Http\Requests\Sale\StoreStockRequest;
use App\Models\Product;
use App\Models\Stock;
use App\Services\ProductService;
use App\Services\StockService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    //
    protected $stockService, $productService;
    public function __construct(StockService $stockService, ProductService $productService)
    {
        $this->stockService = $stockService;
        $this->productService = $productService;
    }
    public function index()
    {
        return Inertia::render('Stocks/Index', [
            'stocks' => $this->stockService->allStocks(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Stocks/Create', [
            'products' => $this->productService->allProducts(),
        ]);
    }

    public function store(StoreStockRequest $request)
    {
        $this->stockService->storeStocks($request->validated());
        return redirect()->route('stocks.index')->with('success', 'Stocks created successfully.');
    }
    public function show($id)
    {
        return Inertia::render('Stocks/Show', [
            'stock' => $this->stockService->findById($id),
        ]);
    }


}
