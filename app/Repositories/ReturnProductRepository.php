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
}
