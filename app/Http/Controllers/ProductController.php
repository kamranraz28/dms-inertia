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
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;


class ProductController extends Controller
{
    protected $productService;
    protected $brandService;
    protected $categoryService;

    public function __construct(
        ProductService $productService,
        BrandService $brandService,
        CategoryService $categoryService,
    )
    {
        $this->productService = $productService;
        $this->brandService = $brandService;
        $this->categoryService = $categoryService;
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

        $stock = Stock::with('product.brand', 'product.cat')
            ->where('imei1', $request->imei)
            ->orWhere('imei2', $request->imei)
            ->first();

        if (!$stock) {
            return response()->json(['verified' => false]);
        }

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

        $stock = Stock::with('product.brand', 'product.cat')
            ->where('imei1', $request->imei)
            ->orWhere('imei2', $request->imei)
            ->first();

        if (!$stock) {
            return response()->json(['verified' => false]);
        }

        $terSale = Tersale::where('stock_id', $stock->id)->first();

        if (!$terSale) {
            return response()->json(['verified' => false]);
        }

        $activatedAt = Carbon::parse($terSale->created_at);
        $warrantyDays = $stock->warranty ?? 0;

        $expiryDate = $activatedAt->copy()->addDays($warrantyDays);
        $today = Carbon::now();

        $daysRemaining = $today->lt($expiryDate)
            ? $today->diffInDays($expiryDate)
            : 0;

        return response()->json([
            'verified' => true,
            'product' => [
                'name' => $stock->product->name,
                'model' => $stock->product->model,
                'color' => $stock->product->color,
                'brand' => $stock->product->brand->name ?? '-',
                'category' => $stock->product->cat->name ?? '-',
                'stocked_at' => $stock->created_at->format('Y-m-d'),
                'warranty_activated' => $activatedAt->toDateTimeString(),
                'warranty_period_days' => $warrantyDays,
                'warranty_expires_at' => $expiryDate->toDateString(),
                'warranty_remaining_days' => $daysRemaining,
            ],
        ]);
    }




}
