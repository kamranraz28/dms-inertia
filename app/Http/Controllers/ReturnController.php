<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReturnProductRequest;
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
use App\Services\StockService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReturnController extends Controller
{
    //
    protected $returnProductService;
    public function __construct(
        ReturnProductService $returnProductService,
    ) {
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
        $result = $this->returnProductService->checkImei($request->input('imei'));

        // If not valid, return fail response
        if (!$result['valid']) {
            return response()->json([
                'valid' => false,
                'error' => $result['message'],
            ]);
        }
        // valid → return stock data
        $stock = $result['stock'];

        return response()->json([
            'valid' => true,
            'product_model' => $stock->product->model ?? 'N/A',
            'message' => $result['message'],
        ]);
    }

    public function returnProductStore(StoreReturnProductRequest $request)
    {
        $this->returnProductService->storeByDealer($request->validated());
        return redirect()->route('products.return')->with('success', 'Return product(s) saved successfully.');
    }

    public function action(Request $request, $id)
    {
        $this->returnProductService->approveRetailerReturnByDealer($request, $id);
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
        return Inertia::render('Returns/Retailer/Index', [
            'returnProducts' => $this->returnProductService->returnByRetailer(auth()->id())
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

    public function returnProductRequestsStore(StoreReturnProductRequest $request)
    {
        $this->returnProductService->storeByRetailer($request->validated());

        return redirect()->route('products.returnRequest')->with('success', 'Return product request(s) saved successfully.');
    }

}
