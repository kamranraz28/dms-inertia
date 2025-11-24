<?php

namespace App\Http\Controllers;

use App\Http\Requests\Brand\StoreBrandRequest;
use App\Http\Requests\Brand\UpdateBrandRequest;
use App\Models\Brand;
use App\Services\BrandService;
use Inertia\Inertia;

class BrandController extends Controller
{
    protected $brandService;

    public function __construct(BrandService $brandService)
    {
        $this->brandService = $brandService;
    }

    //
    public function index()
    {
        return Inertia::render('Brands/Index', [
            'brands' => $this->brandService->allBrands(),
        ]);
    }
    public function create()
    {
        return Inertia::render('Brands/Create');
    }
    public function store(StoreBrandRequest $request)
    {
        $this->brandService->createBrand($request->validated());
        return redirect()->route('brands.index')->with('success', 'Brand created successfully.');
    }
    public function edit(Brand $brand)
    {
        return Inertia::render('Brands/Edit', [
            'brand' => $brand,
        ]);
    }
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        $this->brandService->updateBrand($brand, $request->validated());

        return redirect()->route('brands.index')->with('success', 'Brand updated successfully.');
    }
    public function destroy(Brand $brand)
    {
        $this->brandService->deleteBrand($brand);

        return redirect()->route('brands.index')->with('success', 'Brand deleted successfully.');
    }
}
