<?php

namespace App\Http\Controllers;

use App\Events\WarrantyActivated;
use App\Models\Secsale;
use App\Models\Stock;
use App\Models\Tersale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RetailerController extends Controller
{
    //
    public function myStocks()
    {
        $stocks = Secsale::with('stock.product')
            ->where('retailer_id', auth()->id())
            ->get();

        return Inertia::render('Retailers/Stocks', [
            'stocks' => $stocks,
        ]);
    }
    public function tertiarySales()
    {
        return Inertia::render('Retailers/TertiarySales');
    }

    public function checkImei(Request $request)
    {
        $imei = $request->input('imei');

        $stock = Stock::where(function ($q) use ($imei) {
            $q->where('imei1', $imei)->orWhere('imei2', $imei);
        })->first();

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

    public function storeTertiarySales(Request $request)
    {
        $request->validate([
            'imei' => 'required|string',
            'customer_name' => 'required|string',
            'customer_phone' => 'required|string',
            'customer_address' => 'required|string',
            'remarks' => 'nullable|string',
        ]);

        $imei = $request->input('imei');
        $stock = Stock::where(function ($q) use ($imei) {
            $q->where('imei1', $imei)->orWhere('imei2', $imei);
        })->first();

        if (!$stock) {
            return redirect()->back()->withErrors(['imei' => 'Invalid IMEI.']);
        }

        Tersale::create([
            'user_id'=> auth()->id(),
            'stock_id' => $stock->id,
            'name' => $request->input('customer_name'),
            'phone' => $request->input('customer_phone'),
            'address' => $request->input('customer_address'),
            'remarks' => $request->input('remarks', ''), // Optional field
        ]);

        $stock->status = 3;
        $stock->save();

        event(new WarrantyActivated($stock, $request->customer_phone, $request->customer_name));

        return redirect()->back()->with('success', 'Tertiary sales recorded successfully.');
    }


}
