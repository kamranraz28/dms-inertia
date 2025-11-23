<?php

namespace App\Services;

use App\Repositories\OrderRepository;
use App\Repositories\OrderDetailRepository;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\DB;

class OrderService
{
    protected $orderRepo;
    protected $orderDetailRepo;
    protected $productRepo;

    public function __construct(
        OrderRepository $orderRepo,
        OrderDetailRepository $orderDetailRepo,
        ProductRepository $productRepo
    ) {
        $this->orderRepo = $orderRepo;
        $this->orderDetailRepo = $orderDetailRepo;
        $this->productRepo = $productRepo;
    }

    public function allOrders()
    {
        return $this->orderRepo->all();
    }

    public function pendingOrders()
    {
        return $this->orderRepo->pendingOrders();
    }

    public function createOrder(int $userId, array $items, ?string $remarks = null)
    {
        DB::beginTransaction();

        try {
            $order = $this->orderRepo->create([
                'user_id' => $userId,
                'order_by' => $userId,
                'remarks' => $remarks,
            ]);

            foreach ($items as $item) {
                $product = $this->productRepo->find($item['product_id']);

                $this->orderDetailRepo->create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->dp,
                ]);
            }

            DB::commit();

            return $order;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
