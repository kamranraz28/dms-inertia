<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function find(int $id)
    {
        return Product::findOrFail($id);
    }
}
