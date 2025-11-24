<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function all()
    {
        return Product::with('cat', 'brand')->get();
    }
    public function find(int $id)
    {
        return Product::findOrFail($id);
    }
}
