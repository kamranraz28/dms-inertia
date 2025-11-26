<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Brand;
use App\Models\Cat;
use App\Models\Prisale;
use App\Models\Product;
use App\Models\ReturnProduct;
use App\Models\Secsale;
use App\Models\Stock;
use App\Models\Tersale;
use App\Services\BrandService;
use App\Services\CategoryService;
use App\Services\ProductService;
use App\Services\StockVerificationService;
use App\Services\TertiarySaleService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;


class ProductController extends Controller
{
    protected $productService;
    protected $brandService;
    protected $categoryService;
    protected $stockVerificationService;
    protected $tertiarySaleService;

    public function __construct(
        ProductService $productService,
        BrandService $brandService,
        CategoryService $categoryService,
        StockVerificationService $stockVerificationService,
        TertiarySaleService $tertiarySaleService
    )
    {
        $this->productService = $productService;
        $this->brandService = $brandService;
        $this->categoryService = $categoryService;
        $this->stockVerificationService = $stockVerificationService;
        $this->tertiarySaleService = $tertiarySaleService;
    }
    //
    public function index()
    {
        return Inertia::render(
            'Products/Index',
            [
                'products' => $this->productService->allProducts(),
            ]
        );
    }

    public function show(Product $product)
    {
        // Logic to show a single product
        return Inertia::render(
            'Products/Show',
            [
                'product' => $product,
            ]
        );
    }
    public function create()
    {
        return Inertia::render('Products/Create', [
            'brands' => $this->brandService->allBrands(),
            'categories' => $this->categoryService->getAllCategories(),
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $this->productService->createProduct($request->validated());
        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'brands' => $this->brandService->allBrands(),
            'categories' => $this->categoryService->getAllCategories(),
        ]);
    }
    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->productService->updateProduct($product, $request->validated());

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }
    public function destroy(Product $product)
    {
        $this->productService->deleteProduct($product);
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }

    public function verify()
    {
        return Inertia::render('Products/Verify');
    }

    public function verifyCheck(Request $request)
    {
        $request->validate([
            'imei' => 'required|string',
        ]);

        $stock = $this->stockVerificationService->verifyStockByImei($request->imei);

        return response()->json([
            'verified' => true,
            'product' => [
                'name' => $stock->product->name,
                'model' => $stock->product->model,
                'color' => $stock->product->color,
                'dp' => $stock->product->dp,
                'brand' => $stock->product->brand->name ?? '-',
                'category' => $stock->product->cat->name ?? '-',
                'stocked_at' => $stock->created_at->toDateTimeString(),
            ],
        ]);
    }

    public function checkWarranty()
    {
        return Inertia::render('Products/WarrantyCheck');
    }

    public function verifyWarranty(Request $request)
    {
        $request->validate([
            'imei' => 'required|string',
        ]);

        return $this->tertiarySaleService->findTertiaryByStockId($request->imei);
    }




}
