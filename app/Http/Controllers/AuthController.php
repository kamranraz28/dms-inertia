<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Cat;
use App\Models\Order;
use App\Models\Prisale;
use App\Models\Product;
use App\Models\Secsale;
use App\Models\Stock;
use App\Models\Tersale;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    //

    public function login(Request $request)
    {
        // Validate the request data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Attempt to log the user in
        if (auth()->attempt($request->only('email', 'password'))) {
            // Redirect to the dashboard if successful
            return redirect()->route('dashboard')->with('success', 'Login successful!');
        }

        // Redirect back with an error message if login fails
        return redirect()->back()->withErrors(['email' => 'Invalid credentials'])->withInput();
    }

    public function profile()
    {
        // Return the profile view with the authenticated user
        return inertia('Profile/Index', [
            'status' => session('status'),
        ]);

    }

    public function dashboard()
    {
        $user = auth()->user();

        $role = $user->getRoleNames()->first();

        $orders = match ($role) {
            'Dealer' => Order::where('user_id', $user->id)->get(),
            default => Order::all(),
        };

        $primarySales = match ($role) {
            'Dealer' => Prisale::where('user_id', $user->id)->get(),
            default => Prisale::all(),
        };

        $secondarySales = match ($role) {
            'Dealer' => Secsale::where('dealer_id', $user->id)->get(),
            'Retailer' => Secsale::where('retailer_id', $user->id)->get(),
            default => Secsale::all(),
        };

        $tertiarySales = match ($role) {
            'Dealer' => Tersale::where('user_id', $user->id)->get(),
            'Retailer' => Tersale::where('user_id', $user->id)->get(),
            default => Tersale::all(),
        };

        $totalStockCount = Stock::count();
        $currentStockCount = Stock::where('status', 0)->count();

        $distributorCurrentStockCount = Prisale::where('user_id',$user->id)->whereHas('stock', function ($query) {
            $query->where('status', 1);
        })->count();

        $retailerCurrentStockCount = Secsale::where('retailer_id',$user->id)->whereHas('stock', function ($query) {
            $query->where('status', 2);
        })->count();

        $totalDealerPurchase = $primarySales->count();
        $totalRetailerPurchase = $secondarySales->count();

        return Inertia::render('Dashboard', [
            'users' => User::all(),
            'brands' => Brand::all(),
            'categories' => Cat::all(),
            'primarySales' => $primarySales,
            'secondarySales' => $secondarySales,
            'tertiarySales' => $tertiarySales,
            'orders' => $orders,
            'products' => Product::all(),
            'totalStock' => $totalStockCount,
            'totalCurrentStock' => $currentStockCount,
            'distributorCurrentStock' => $distributorCurrentStockCount,
            'retailerCurrentStock' => $retailerCurrentStockCount,
            'totalDealerPurchase' => $totalDealerPurchase,
            'totalRetailerPurchase' => $totalRetailerPurchase,
        ]);
    }

}
