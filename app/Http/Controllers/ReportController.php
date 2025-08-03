<?php

namespace App\Http\Controllers;

use App\Models\Prisale;
use App\Models\Product;
use App\Models\Secsale;
use App\Models\Stock;
use App\Models\Tersale;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ReportController extends Controller
{
    //
    public function primarySalesReport()
    {
        $primarySales = Prisale::with('user','stock.product')->get();
        $dealers = User::role('Dealer')->get();

        return Inertia::render('Reports/Admin/PrimarySalesReport',[
            'primarySales' => $primarySales,
            'dealers' => $dealers
        ]);
    }

    public function secondarySalesReport()
    {
        $secondarySales = Secsale::with('dealer','retailer','stock.product')->get();
        $dealers= User::role('Dealer')->get();
        $retailers= User::role('Retailer')->get();

        return Inertia::render('Reports/Admin/SecondarySalesReport',[
            'secondarySales' => $secondarySales,
            'dealers' => $dealers,
            'retailers' => $retailers,
        ]);
    }

    public function tertiarySalesReport()
    {
        $tertiarySales = Tersale::with('user','stock.product')->get();

        return Inertia::render('Reports/Admin/TertiarySalesReport',[
            'tertiarySales' => $tertiarySales,
        ]);
    }

   public function dealerImeiStockReport()
    {
        $dealerStocks = Prisale::with(['user', 'stock.product'])
            ->whereHas('stock', function ($query) {
                $query->where('status', 1);
            })
            ->get();
        $dealers = User::role('Dealer')->get();
        $products = Product::all();

        return Inertia::render('Reports/Admin/DealerImeiStockReport', [
            'dealerStocks' => $dealerStocks,
            'dealers' => $dealers,
            'products' => $products
        ]);
    }

    public function retailerImeiStockReport()
    {
        $retailerStocks = Secsale::with(['retailer', 'stock.product'])
            ->whereHas('stock', function ($query) {
                $query->where('status', 2);
            })
            ->get();
        $retailers = User::role('Retailer')->get();
        $products = Product::all();

        return Inertia::render('Reports/Admin/RetailerImeiStockReport', [
            'retailerStocks' => $retailerStocks,
            'retailers' => $retailers,
            'products' => $products
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

    $imei = trim($request->imei);

    $stock = Stock::with([
        'product.brand',
        'product.cat',
        'prisales.user',
        'secsales.retailer',
        'tersales.user',
    ])
    ->where(function ($query) use ($imei) {
        $query->where('imei1', $imei)->orWhere('imei2', $imei);
    })
    ->first();

    if (!$stock) {
        return response()->json(['verified' => false, 'records' => []]);
    }

    $records = [];

    // Step 1: Stock Received
    $records[] = [
        'stage' => 'Stock Received',
        'user' => 'Warehouse',
        'location' => 'Warehouse',
        'date' => $stock->created_at->format('Y-m-d H:i:s'),
        'remarks' => 'Product stocked in system',
    ];

    // Step 2: Primary Sales (loop if multiple)
    foreach ($stock->prisales as $primarySale) {
        if ($primarySale->user) {
            $records[] = [
                'stage' => 'Primary Sale (Dealer)',
                'user' => $primarySale->user->name,
                'location' => $primarySale->user->office_id,
                'date' => $primarySale->created_at->format('Y-m-d H:i:s'),
                'remarks' => 'Sold to dealer',
            ];
        }
    }

    // Step 3: Secondary Sales (loop)
    foreach ($stock->secsales as $secondarySale) {
        if ($secondarySale->retailer) {
            $records[] = [
                'stage' => 'Secondary Sale (Retailer)',
                'user' => $secondarySale->retailer->name,
                'location' => $secondarySale->retailer->office_id,
                'date' => $secondarySale->created_at->format('Y-m-d H:i:s'),
                'remarks' => 'Sold to retailer',
            ];
        }
    }

    // Step 4: Tertiary Sales (loop)
    foreach ($stock->tersales as $tertiarySale) {
        $records[] = [
            'stage' => 'Tertiary Sale (Customer)',
            'user' => $tertiarySale->name,
            'location' => $tertiarySale->phone,
            'date' => $tertiarySale->created_at->format('Y-m-d H:i:s'),
            'remarks' => 'Sold to customer',
        ];
    }

    // Warranty calculation (in days)
    $warrantyDays = (int) $stock->warranty;
    $warrantyEndDate = $stock->created_at->addDays($warrantyDays)->format('Y-m-d');

    // Product summary info
    $productInfo = [
        'product_model' => $stock->product->model ?? '',
        'brand' => $stock->product->brand->name ?? '',
        'category' => $stock->product->cat->name ?? '',
        'imei1' => $stock->imei1,
        'imei2' => $stock->imei2,
        'warranty_period_days' => $warrantyDays,
        'warranty_end_date' => $warrantyEndDate,
    ];

    return response()->json([
        'verified' => true,
        'product' => $productInfo,
        'records' => $records,
    ]);
}

}
