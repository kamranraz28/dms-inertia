<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Stock;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    //
    public function index()
    {
        $stocks = Stock::with('product')->get();

        return Inertia::render('Stocks/Index', [
            'stocks' => $stocks,
        ]);
    }

    public function create()
    {
        $products = Product::all();

        return Inertia::render('Stocks/Create', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'stocks' => 'required|array|min:1',
            'stocks.*.imei1' => 'required|string',
            'stocks.*.imei2' => 'required|string',
            'stocks.*.warranty' => 'required|string',
        ]);

        foreach ($request->stocks as $item) {
            Stock::create([
                'product_id' => $request->product_id,
                'imei1' => $item['imei1'],
                'imei2' => $item['imei2'],
                'warranty' => $item['warranty'],
            ]);
        }

        return redirect()->route('stocks.index')->with('success', 'Stocks created successfully.');
    }
    public function show($id)
    {
        $stock = Stock::with('product')->findOrFail($id);

        return Inertia::render('Stocks/Show', [
            'stock' => $stock,
        ]);
    }


}
