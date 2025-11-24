<?php

namespace App\Services;

use App\Repositories\BrandRepository;

class BrandService
{
    protected $brandRepo;

    public function __construct(BrandRepository $brandRepo)
    {
        $this->brandRepo = $brandRepo;
    }

    public function allBrands()
    {
        return $this->brandRepo->all();
    }
    public function createBrand(array $data)
    {
        return $this->brandRepo->create($data);
    }
    public function updateBrand($brand, array $data)
    {
        return $this->brandRepo->update($brand, $data);
    }
    public function deleteBrand($brand)
    {
        return $this->brandRepo->delete($brand);
    }
}
