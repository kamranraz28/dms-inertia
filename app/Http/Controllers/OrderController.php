<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\Product;
use App\Repositories\ProductRepository;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\OrderDetail;

class OrderController extends Controller
{
    protected $orderService;
    protected $productRepository;

    public function __construct(OrderService $orderService, ProductRepository $productRepository)
    {
        $this->orderService = $orderService;
        $this->productRepository = $productRepository;
    }
    //
    public function index()
    {
        return Inertia::render('Orders/Index', [
            'orders' => $this->orderService->allOrders(),
        ]);
    }

    public function show($id)
    {
        return Inertia::render('Orders/Show', [
            'order' => $this->orderService->allOrders()->find($id),
        ]);
    }

    public function create()
    {
        return Inertia::render('Orders/Create', [
            'products' => $this->productRepository->all(),
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
        return Inertia::render('Accounts/OrderList', [
            'orders' => $this->orderService->pendingOrders(),
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
