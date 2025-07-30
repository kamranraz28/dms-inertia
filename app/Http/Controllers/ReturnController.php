<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Cat;
use App\Models\Prisale;
use App\Models\Product;
use App\Models\ReturnProduct;
use App\Models\Secsale;
use App\Models\Stock;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReturnController extends Controller
{
    //
    public function returnProduct()
    {
        $returnProducts = ReturnProduct::with('dealer', 'retailer', 'stock.product')
            ->where('dealer_id',auth()->id())->get();

        return Inertia::render('Returns/Dealer/Index', [
            'returnProducts' => $returnProducts
        ]);
    }

    public function returnProductCreate()
    {
        return Inertia::render('Returns/Dealer/Create');
    }

    public function checkImei(Request $request)
    {
        $imei = $request->input('imei');

        $stock = Stock::with('product')
            ->where(function ($query) use ($imei) {
                $query->where('imei1', $imei)->orWhere('imei2', $imei);
            })
            ->first();

        if (!$stock) {
            return response()->json([
                'valid' => false,
                'error' => 'This IMEI is not available.',
            ]);
        }

        $primarySale = Prisale::where('stock_id', $stock->id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$primarySale) {
            return response()->json([
                'valid' => false,
                'error' => 'You are not eligible to return this.',
            ]);
        }

        $secondarySale = Secsale::where('stock_id', $stock->id)->first();

        if ($secondarySale) {
            return response()->json([
                'valid' => false,
                'error' => 'This IMEI is available in Secondary Sales, delete that first.',
            ]);
        }

        return response()->json([
            'valid' => true,
            'product_model' => $stock->product->model ?? 'N/A',
        ]);
    }

    public function returnProductStore(Request $request)
    {
        $validated = $request->validate([
            'imeis' => 'required|array|min:1',
            'imeis.*.imei' => 'required|string',
            'remarks' => 'nullable|string',
        ]);

        foreach($validated['imeis'] as $imeiData){
            $imei = $imeiData['imei'];

            $stock = Stock::where('imei1',$imei)
                ->orWhere('imei2',$imei)
                ->first();

            ReturnProduct::create([
                'dealer_id' => auth()->id(),
                'stock_id' => $stock->id,
                'type' => 1,
                'status' => 1,
                'remarks' => $validated['remarks'],
            ]);
        }

        return redirect()->route('products.return')->with('success', 'Return product(s) saved successfully.');


    }

    public function returnProductList()
    {
        $returnProducts = ReturnProduct::with('dealer', 'retailer', 'stock.product')->get();

        return Inertia::render('Returns/Admin/Index', [
            'returnProducts' => $returnProducts
        ]);
    }
    public function approve($id)
    {
        //dd($id);
        $return = ReturnProduct::findOrFail($id);
        $return->status = 2;
        $return->save();

        Stock::findOrFail($return->stock_id)->update([
            'status' => 0
        ]);

        Prisale::where('stock_id',$return->stock_id)->delete();

        return back()->with('success', 'Return product request approved.');
    }
    public function decline($id)
    {
        $return = ReturnProduct::findOrFail($id);
        $return->status = 5;
        $return->save();

        return back()->with('success', 'Return product request declined.');
    }
}
