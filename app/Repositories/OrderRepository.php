<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{
    public function all()
    {
        return Order::with('user','details.product')->latest()->get();
    }

    public function pendingOrders()
    {
        return Order::with('user', 'details.product')->where('status', '!=', 0)->latest()->get();
    }
    public function create(array $data): Order
    {
        return Order::create($data);
    }
}
