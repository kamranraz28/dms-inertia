<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Cat;
use App\Models\Prisale;
use App\Models\Product;
use App\Models\ReturnProduct;
use App\Models\Secsale;
use App\Models\Stock;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    //
    public function index()
    {
        // Logic to list products
        $products = Product::with('cat', 'brand')->get();
        return Inertia::render(
            'Products/Index',
            [
                'products' => $products,
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
        $brands = Brand::all();
        $categories = Cat::all();
        return Inertia::render('Products/Create', [
            'brands' => $brands,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'dp' => 'required|numeric|min:0',
            'brand_id' => 'required|exists:brands,id',
            'cat_id' => 'required|exists:cats,id',
        ]);

        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }
    public function edit(Product $product)
    {
        $brands = Brand::all();
        $categories = Cat::all();
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'brands' => $brands,
            'categories' => $categories,
        ]);
    }
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'dp' => 'required|numeric|min:0',
            'brand_id' => 'required|exists:brands,id',
            'cat_id' => 'required|exists:cats,id',
        ]);

        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }
    public function destroy(Product $product)
    {
        $product->delete();
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

    public function returnProduct()
    {
        $returnProducts = ReturnProduct::with('dealer', 'retailer', 'stock.product')
            ->where('dealer_id',auth()->id())->get();

        return Inertia::render('Products/ReturnProducts', [
            'returnProducts' => $returnProducts
        ]);
    }

    public function returnProductCreate()
    {
        return Inertia::render('Products/CreateReturnProducts');
    }

    public function checkImei(Request $request)
    {
        $imei = $request->input('imei');

        $stock = Stock::with('product')
            ->where(function ($query) use ($imei) {
                $query->where('imei1', $imei)->orWhere('imei2', $imei);
            })
            ->first();

        if (!$stock) {
            return response()->json([
                'valid' => false,
                'error' => 'This IMEI is not available.',
            ]);
        }

        $primarySale = Prisale::where('stock_id', $stock->id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$primarySale) {
            return response()->json([
                'valid' => false,
                'error' => 'You are not eligible to return this.',
            ]);
        }

        $secondarySale = Secsale::where('stock_id', $stock->id)->first();

        if ($secondarySale) {
            return response()->json([
                'valid' => false,
                'error' => 'This IMEI is available in Secondary Sales, delete that first.',
            ]);
        }

        return response()->json([
            'valid' => true,
            'product_model' => $stock->product->model ?? 'N/A',
        ]);
    }

    public function returnProductStore(Request $request)
    {
        $validated = $request->validate([
            'imeis' => 'required|array|min:1',
            'imeis.*.imei' => 'required|string',
            'remarks' => 'nullable|string',
        ]);

        foreach($validated['imeis'] as $imeiData){
            $imei = $imeiData['imei'];

            $stock = Stock::where('imei1',$imei)
                ->orWhere('imei2',$imei)
                ->first();

            ReturnProduct::create([
                'dealer_id' => auth()->id(),
                'stock_id' => $stock->id,
                'type' => 1,
                'status' => 1,
                'remarks' => $validated['remarks'],
            ]);
        }

        return redirect()->route('products.return')->with('success', 'Return product(s) saved successfully.');


    }


}
