<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\Product;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\OrderDetail;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }
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

    public function store(StoreOrderRequest $request)
    {
        try {
            $this->orderService->createOrder(
                auth()->id(),
                $request->validated()['items'],
                $request->validated()['remarks'] ?? null
            );

            return redirect()->route('orders.index')
                ->with('success', 'Order created successfully!');
        } catch (\Exception $e) {
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
