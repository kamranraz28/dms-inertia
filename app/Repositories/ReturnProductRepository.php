<?php

namespace App\Repositories;

use App\Models\ReturnProduct;

class ReturnProductRepository
{
    //
    public function getAllReturnProduct()
    {
        return ReturnProduct::with('dealer', 'retailer', 'stock.product')
            ->get();
    }
    public function create(array $data)
    {
        return ReturnProduct::create($data);
    }
    public function returnByRetailer($retailerId)
    {
        return ReturnProduct::with('dealer', 'retailer', 'stock.product')
            ->where('retailer_id', $retailerId)
            ->get();
    }
    public function approveReturnProduct($id)
    {
        $returnProduct = ReturnProduct::find($id);

        if (!$returnProduct) {
            return null;
        }

        $returnProduct->update([
            'status' => 2
        ]);

        return $returnProduct;
    }

    public function declineReturnProduct($id)
    {
        $returnProduct = ReturnProduct::find($id);

        if (!$returnProduct) {
            return null;
        }

        $returnProduct->update([
            'status' => 5
        ]);

        return $returnProduct;
    }
    public function approveretailerReturnByDealer($id)
    {
        $returnProduct = ReturnProduct::find($id);

        if (!$returnProduct) {
            return null;
        }

        $returnProduct->update([
            'status' => 1
        ]);

        return $returnProduct;
    }
}
