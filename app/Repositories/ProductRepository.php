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
    public function create(array $data)
    {
        return Product::create($data);
    }
    public function update(Product $product, array $data)
    {
        return $product->update($data);
    }
    public function delete(Product $product)
    {
        return $product->delete();
    }
}
