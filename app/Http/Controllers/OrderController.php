<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\OrderDetail;

class OrderController extends Controller
{
    //
    public function index()
    {
        $orders = Order::with('user') // optional: eager load related user if needed
            ->latest()
            ->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['details.product', 'user'])->findOrFail($id);

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    public function create()
    {
        $products = Product::all();

        return Inertia::render('Orders/Create', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'remarks' => 'nullable|string|max:500',
        ]);

        // Start transaction to ensure data integrity
        DB::beginTransaction();

        try {
            // Create order header
            $order = Order::create([
                'user_id' => auth()->id(),
                'order_by' => auth()->id(),
                'remarks' => $validated['remarks'] ?? null,
            ]);

            // Loop through each item and create order details
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);

                $price = $product->dp;
                $quantity = $item['quantity'];

                // Create order detail
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $price,
                ]);
            }

            DB::commit();

            return redirect()->route('orders.index')->with('success', 'Order created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors('Failed to create order: ' . $e->getMessage());
        }
    }

    public function orderList()
    {
        $orders = Order::with('user')
            ->where('status', '!=', 0)
            ->latest()
            ->get();

        return Inertia::render('Accounts/OrderList', [
            'orders' => $orders,
        ]);
    }

    public function approve(Order $order)
    {
        $order->update(['status' => '2']);
        return redirect()->back()->with('success', 'Order approved successfully.');
    }

    public function decline(Order $order)
    {
        $order->update(['status' => '7']);
        return redirect()->back()->with('success', 'Order declined successfully.');
    }

    public function confirm(Order $order)
    {
        $order->update(['status' => '1']);
        return redirect()->back()->with('success', 'Order confirmed successfully.');
    }
}
