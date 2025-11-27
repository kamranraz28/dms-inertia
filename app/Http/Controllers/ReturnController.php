<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Cat;
use App\Models\Prisale;
use App\Models\Product;
use App\Models\Retailer;
use App\Models\ReturnProduct;
use App\Models\Secsale;
use App\Models\Stock;
use App\Models\Tersale;
use App\Services\ReturnProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReturnController extends Controller
{
    //
    protected $returnProductService;
    public function __construct(ReturnProductService $returnProductService)
    {
        $this->returnProductService = $returnProductService;
    }
    public function returnProduct()
    {
        $returnProducts = ReturnProduct::with('dealer', 'retailer', 'stock.product')
            ->where('dealer_id', auth()->id())->get();

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

        $return = ReturnProduct::where('stock_id', $stock->id)->first();

        if ($return) {
            return response()->json([
                'valid' => false,
                'error' => 'This IMEI is available in returning system.',
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

        foreach ($validated['imeis'] as $imeiData) {
            $imei = $imeiData['imei'];

            $stock = Stock::where('imei1', $imei)
                ->orWhere('imei2', $imei)
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

    public function action(Request $request, $id)
    {
        $returnProduct = ReturnProduct::findOrFail($id);

        if ($request->action === 'approve') {
            $returnProduct->status = 1; // Approved

            Stock::findOrFail($returnProduct->stock_id)->update([
            'status' => 1
            ]);

            Secsale::where('stock_id', $returnProduct->stock_id)->delete();

        } elseif ($request->action === 'decline') {
            $returnProduct->status = 5; // Declined
        }

        $returnProduct->save();

        return back()->with('success', 'Return product status updated.');
    }


    public function returnProductList()
    {
        return Inertia::render('Returns/Admin/Index', [
            'returnProducts' => $this->returnProductService->allReturnProducts()
        ]);
    }
    public function approve($id)
    {
        $this->returnProductService->approveReturnProduct($id);
        return back()->with('success', 'Return product request approved.');
    }
    public function decline($id)
    {
        $this->returnProductService->declineReturnProduct($id);
        return back()->with('success', 'Return product request declined.');
    }

    public function returnProductRequest()
    {
        $returnProducts = ReturnProduct::with('dealer', 'retailer', 'stock.product')
            ->where('retailer_id', auth()->id())
            ->get();

        return Inertia::render('Returns/Retailer/Index', [
            'returnProducts' => $returnProducts
        ]);
    }
    public function returnProductRequestCreate()
    {
        return Inertia::render('Returns/Retailer/Create');
    }

    public function checkRequestedImei(Request $request)
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

        $secondarySale = Secsale::where('stock_id', $stock->id)
            ->where('retailer_id', auth()->id())
            ->first();

        if (!$secondarySale) {
            return response()->json([
                'valid' => false,
                'error' => 'You are not eligible to return this.',
            ]);
        }

        $tertiarySale = Tersale::where('stock_id', $stock->id)->first();

        if ($tertiarySale) {
            return response()->json([
                'valid' => false,
                'error' => 'This IMEI is available in Tertiary Sales, delete that first.',
            ]);
        }

        $return = ReturnProduct::where('stock_id', $stock->id)->first();

        if ($return) {
            return response()->json([
                'valid' => false,
                'error' => 'This IMEI is available in returning system.',
            ]);
        }

        return response()->json([
            'valid' => true,
            'product_model' => $stock->product->model ?? 'N/A',
        ]);
    }

    public function returnProductRequestsStore(Request $request)
    {
        $validated = $request->validate([
            'imeis' => 'required|array|min:1',
            'imeis.*.imei' => 'required|string',
            'remarks' => 'nullable|string',
        ]);

        foreach ($validated['imeis'] as $imeiData) {
            $imei = $imeiData['imei'];

            $stock = Stock::where('imei1', $imei)
                ->orWhere('imei2', $imei)
                ->first();

            $dealerId = Retailer::where('retailer_id', auth()->id())
                ->first()
                    ?->dealer_id;

            ReturnProduct::create([
                'dealer_id' => $dealerId,
                'retailer_id' => auth()->id(),
                'stock_id' => $stock->id,
                'type' => 1,
                'remarks' => $validated['remarks'],
            ]);
        }

        return redirect()->route('products.returnRequest')->with('success', 'Return product request(s) saved successfully.');


    }

}
