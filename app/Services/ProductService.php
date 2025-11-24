<?php

namespace App\Services;

use App\Repositories\ProductRepository;

class ProductService
{
    protected $productRepo;

    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    public function allProducts()
    {
        return $this->productRepo->all();
    }
    public function createProduct(array $data)
    {
        return $this->productRepo->create($data);
    }
    public function updateProduct($product, array $data)
    {
        return $this->productRepo->update($product, $data);
    }
    public function deleteProduct($product)
    {
        return $this->productRepo->delete($product);
    }
}
