<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Orderdetail;
use App\Models\Stock;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Orderimei;
use App\Models\Prisale;
use Illuminate\Support\Facades\DB;


class WarehouseController extends Controller
{
    //
    public function stockout()
    {
        $orders = Order::with([
            'user',
            'details.product',
            'imeis.stock' // to match stock.product_id to detail.product_id
        ])
            ->where('status', '>=', 2) // Only show orders with status 2 or higher
            ->latest()
            ->get();

        return Inertia::render('Stockout/Index', [
            'orders' => $orders,
        ]);
    }



    public function stockupload(Orderdetail $detail)
    {
        // Load detail with product and its order and user if needed
        $detail->load('product', 'order.user');

        return Inertia::render('Stockout/Upload', [
            'detail' => $detail,
        ]);
    }

    public function checkImei(Request $request)
    {
        $imei = $request->input('imei');

        $stock = Stock::where(function ($query) use ($imei) {
            $query->where('imei1', $imei)
                ->orWhere('imei2', $imei);
        })->first();

        if (!$stock) {
            return response()->json(['status' => 'not_found', 'message' => 'This IMEI not available in stock']);
        }

        if ($stock->status != 0) {
            return response()->json(['status' => 'sold', 'message' => 'This IMEI has been sold.']);
        }

        // status == 0 means available
        return response()->json([
            'status' => 'available',
            'message' => $stock->product->model ?? 'Product model not found'
        ]);
    }

    public function store(Request $request, Orderdetail $detail)
    {
        $request->validate([
            'imeis' => 'required|array',
            'imeis.*' => 'required|string',
        ]);

        $order = $detail->order;

        $order->update(['status' => '3']);

        DB::beginTransaction();

        try {
            foreach ($request->imeis as $imei) {
                // Find stock where imei1 or imei2 matches and status = 0 (available)
                $stock = Stock::where(function ($q) use ($imei) {
                    $q->where('imei1', $imei)->orWhere('imei2', $imei);
                })->where('status', 0)->first();

                if (!$stock) {
                    // Either not found or sold; return error
                    return back()->withErrors(['imeis' => "IMEI $imei is not available or has been sold."])->withInput();
                }

                // Create Orderimei record
                Orderimei::create([
                    'order_id' => $order->id,
                    'stock_id' => $stock->id,
                    // add any other columns if needed
                ]);

                $stock->status = 1;
                $stock->save();
            }

            DB::commit();

            return redirect()->route('stockout.index')->with('success', 'IMEIs uploaded successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'An error occurred while saving IMEIs.'])->withInput();
        }
    }

    public function viewUploadedImeis(Orderdetail $detail)
    {
        $detail->load('product', 'order.user');

        $uploadedImeis = Orderimei::with('stock')
            ->where('order_id', $detail->order_id)
            ->get()
            ->filter(function ($item) use ($detail) {
                return $item->stock->product_id == $detail->product_id;
            })->values();

        return Inertia::render('Stockout/ViewUploaded', [
            'detail' => $detail,
            'imeis' => $uploadedImeis,
        ]);
    }

    public function confirmDelivery(Orderdetail $detail)
    {
        $order = $detail->order;

        // Get the uploaded IMEIs for this order and this product
        $uploadedImeis = Orderimei::with('stock')
            ->where('order_id', $order->id)
            ->get()
            ->filter(function ($imei) use ($detail) {
                return $imei->stock->product_id === $detail->product_id;
            });

        // Loop through and create Prisale entries
        foreach ($uploadedImeis as $imei) {
            Prisale::create([
                'user_id' => $order->user_id,
                'order_id' => $order->id,
                'stock_id' => $imei->stock_id,
            ]);
            // Update stock status to sold
            $imei->stock->update(['status' => 1]);
        }

        // Update the order status to 5 (Delivered)
        $order->update(['status' => 5]);

        return redirect()->route('stockout.index')->with('success', 'Delivery confirmed successfully.');
    }



}
