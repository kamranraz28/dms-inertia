<?php

namespace App\Repositories;

use App\Models\Brand;


class BrandRepository
{
    // Brand repository methods would go here
    public function all()
    {
        return Brand::all();
    }
    public function create(array $data)
    {
        return Brand::create($data);
    }
    public function update(Brand $brand, array $data)
    {
        return $brand->update($data);
    }
    public function delete(Brand $brand)
    {
        return $brand->delete();
    }
}
