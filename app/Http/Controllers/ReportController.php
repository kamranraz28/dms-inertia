<?php

namespace App\Http\Controllers;

use App\Models\Prisale;
use App\Models\Product;
use App\Models\Secsale;
use App\Models\Tersale;
use App\Models\User;
use Illuminate\Http\Request;
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
}
