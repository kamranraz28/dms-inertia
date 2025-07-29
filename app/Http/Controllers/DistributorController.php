<?php

namespace App\Http\Controllers;

use App\Models\Prisale;
use App\Models\Retailer;
use App\Models\Secsale;
use App\Models\Stock;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class DistributorController extends Controller
{
    //
    public function receiveProduct()
    {
        $user = auth()->user();
        $products = Prisale::with('stock.product','user')->where('status',0)->where('user_id',$user->id)->get();
        return Inertia::render('Distributors/ReceiveProduct', [
            'products' => $products,
        ]);
    }

    public function confirmReceive(Request $request)
    {
        $ids = $request->input('selected', []);
        \Log::info('Selected IDs:', $ids);


        Prisale::whereIn('id', $ids)
            ->update(['status' => 1]);

        return redirect()->back()->with('success', 'Products received successfully.');
    }
    public function createSale()
    {
        $user = auth()->user();

        // Get all retailer mappings where this user is the dealer
        $retailerMappings = Retailer::with('retailer')
            ->where('dealer_id', $user->id)
            ->get();

        $retailers = $retailerMappings->pluck('retailer')->filter(); // filter to remove nulls if any

        return Inertia::render('Distributors/CreateSale', [
            'retailers' => $retailers->values(), // Re-index array for frontend
        ]);
    }



    public function checkImei(Request $request)
    {
        $imei = $request->input('imei');
        $user = auth()->user();

        // Find stock by IMEI
        $stock = Stock::where('imei1', $imei)
                    ->orWhere('imei2', $imei)
                    ->first();

        if (!$stock) {
            return response()->json(['status' => 'not_found', 'message' => 'Not Available in this system']);
        }

        // Check stock status
        if ($stock->status != 1) {
            return response()->json(['status' => 'not_available', 'message' => 'This IMEI is not available to sale']);
        }

        // Check Prisale for this stock and user
        $prisale = Prisale::where('stock_id', $stock->id)
                        ->where('user_id', $user->id)
                        ->first();

        if (!$prisale) {
            return response()->json(['status' => 'not_in_your_stock', 'message' => 'Product is not in your stock']);
        }

        // If all good, return product model
        $productModel = $stock->product->model ?? 'Unknown Model';

        return response()->json([
            'status' => 'available',
            'message' => "Available: {$productModel}",
            'product_model' => $productModel,
        ]);
    }

    public function saleStore(Request $request)
    {
        $request->validate([
            'retailer_id' => 'required|exists:users,id',
            'imeis' => 'required|array|min:1',
            'imeis.*.imei' => 'required|string',
        ]);

        $dealerId = Auth::id();
        $retailerId = $request->retailer_id;

        $inserted = [];

        foreach ($request->imeis as $item) {
            $imeiValue = $item['imei'];

            // Step 1: Find the stock
            $stock = Stock::where('imei1', $imeiValue)
                    ->orWhere('imei2', $imeiValue)
                    ->where('status', 1) // Ensure stock is available
                    ->first();

            if (!$stock) continue; // IMEI not found

            // Step 2: Check stock is available
            if ($stock->status != 1) continue;

            // Step 3: Check Prisale for current dealer
            $prisale = Prisale::where('stock_id', $stock->id)
                ->where('user_id', $dealerId)
                ->first();

            if (!$prisale) continue;

            // Step 4: Check if this stock already sold
            $alreadySold = Secsale::where('stock_id', $stock->id)->exists();
            if ($alreadySold) continue;

            // Step 5: Save
            Secsale::create([
                'dealer_id' => $dealerId,
                'retailer_id' => $retailerId,
                'stock_id' => $stock->id,
            ]);

            $inserted[] = $imeiValue;

            // Step 6: Update stock status
            $stock->update(['status' => 2]); // Mark as sold
            $stock->save();
        }

        if (count($inserted) > 0) {
            return redirect()->back()->with('success', 'Sales submitted successfully.');
        } else {
            return redirect()->back()->withErrors(['imeis' => 'No valid IMEIs were submitted.']);
        }
    }

}
