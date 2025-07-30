<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DistributorController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RetailerController;
use App\Http\Controllers\ReturnController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WarehouseController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth; // For Auth facade usage

// Public routes
Route::get('/', fn() => redirect('/login'));

Route::post('/login', [AuthController::class, 'login'])->name('login');

// Authenticated routes group
Route::middleware(['auth'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');

    // Logout route
    Route::post('/logout', function () {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect('/login')->with('success', 'Logged out successfully!');
    })->name('logout');

    // Profile routes
    Route::get('/profile', [AuthController::class, 'profile'])->name('profile');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');

    // Role, Permission, User CRUD
    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class);
    Route::resource('users', UserController::class);

    // Dealer-Retailer Mapping routes
    Route::get('/dealer-retailer-mapping', [UserController::class, 'dealerRetailerMapping'])->name('dealer-retailer-mapping');
    Route::get('/dealer-retailer/create', [UserController::class, 'createMapping'])->name('dealer-retailer.create');
    Route::post('/dealer-retailer/store', [UserController::class, 'storeMapping'])->name('mapping.store');

    // Settings routes
    Route::get('/settings/logo', [SettingController::class, 'logoForm'])->name('settings.logo');
    Route::post('/settings/logo', [SettingController::class, 'uploadLogo'])->name('settings.logo.upload');

    Route::get('/settings/color', [SettingController::class, 'colorForm'])->name('settings.color');
    // **IMPORTANT** - This was pointing to /settings/logo POST before, fixed to /settings/color POST
    Route::post('/settings/color', [SettingController::class, 'updateColor'])->name('settings.color.upload');

    // Orders resource & specific actions
    Route::resource('orders', OrderController::class);

    Route::post('/orders/{order}/confirm', [OrderController::class, 'confirm'])->name('orders.confirm');
    Route::post('/orders/{order}/decline', [OrderController::class, 'decline'])->name('orders.decline');
    Route::post('/orders/{order}/approve', [OrderController::class, 'approve'])->name('orders.approve');

    // Stocks resource
    Route::resource('stocks', StockController::class);

    // Warehouse stockout routes
    Route::get('/stockout', [WarehouseController::class, 'stockout'])->name('stockout.index');
    Route::get('/stock/out/{detail}', [WarehouseController::class, 'stockupload'])->name('stockout.upload');
    Route::get('/stock/check-imei', [WarehouseController::class, 'checkImei'])->name('stock.check-imei');
    Route::post('/stock/out/upload/{detail}', [WarehouseController::class, 'store'])->name('stockout.upload.store');

    // The below routes are outside the auth middleware group in your original code,
    // but they seem to require auth, so moved inside the group:
    Route::get('/stock/view/{detail}', [WarehouseController::class, 'viewUploadedImeis'])->name('stockout.view');
    Route::get('/stockout/confirm-delivery/{detail}', [WarehouseController::class, 'confirmDelivery'])->name('stockout.confirmDelivery');

    // Distributor product receiving and sales
    Route::get('/products/receive', [DistributorController::class, 'receiveProduct'])->name('products.receive');
    Route::post('/distributor/receive-confirm', [DistributorController::class, 'confirmReceive'])->name('distributor.receive.confirm');

    Route::get('/sales/create', [DistributorController::class, 'createSale'])->name('sales.create');
    Route::post('/check-imei', [DistributorController::class, 'checkImei'])->name('check-imei');
    Route::post('/distributors/sale', [DistributorController::class, 'saleStore'])->name('distributors.sale.store');

    // Orders list
    Route::get('/order-list', [OrderController::class, 'orderList'])->name('order.list');

    // Retailer stocks
    Route::get('/my-stocks', [RetailerController::class, 'myStocks'])->name('retailer.stocks');

    // Product verification
    Route::get('/products/verify', [ProductController::class, 'verify'])->name('products.verify');
    Route::post('/products/verify', [ProductController::class, 'verifyCheck'])->name('products.verify.check');

    //Return Product Dealer
    Route::get('/products/return', [ReturnController::class, 'returnProduct'])->name('products.return');
    Route::get('/products/return/create', [ReturnController::class, 'returnProductCreate'])->name('returnProducts.create');
    Route::post('/return-products/check-imei', [ReturnController::class, 'checkImei'])->name('returnProducts.checkImei');
    Route::post('/products/return/store', [ReturnController::class, 'returnProductStore'])->name('returnProducts.store');
    Route::post('/return-products/{id}/action', [ReturnController::class, 'action'])->name('returnProducts.action');

    //Return Product Admin
    Route::get('/products/return-list', [ReturnController::class, 'returnProductList'])->name('products.returnList');
    Route::post('/return-products/{id}/approve', [ReturnController::class, 'approve']);
    Route::post('/return-products/{id}/decline', [ReturnController::class, 'decline']);

    //Return Product Retailer
    Route::get('/products/return-request', [ReturnController::class, 'returnProductRequest'])->name('products.returnRequest');
    Route::get('/products/return-request/create', [ReturnController::class, 'returnProductRequestCreate'])->name('returnProductRequest.create');
    Route::post('/return-product-requests/check-imei', [ReturnController::class, 'checkRequestedImei'])->name('returnProductRequest.checkImei');
    Route::post('/products/return-requests/store', [ReturnController::class, 'returnProductRequestsStore'])->name('returnProductRequests.store');

    // Product, Brand, Category resource controllers
    Route::resource('products', ProductController::class);
    Route::resource('brands', BrandController::class);
    Route::resource('categories', CategoryController::class);

    // Bulk upload routes
    Route::get('/bulk-upload', [UploadController::class, 'index'])->name('bulk.upload.index');
    Route::post('/bulk-upload', [UploadController::class, 'upload'])->name('bulk.upload');

    // Tertiary sales
    Route::get('/tertiary-sales', [RetailerController::class, 'tertiarySales'])->name('tertiary.sales.index');
    Route::post('/tertiary-sales', [RetailerController::class, 'storeTertiarySales'])->name('tertiary.sales.store');

    // Retailer IMEI check
    Route::post('/retailers/check-imei', [RetailerController::class, 'checkImei'])->name('retailers.checkImei');
});

// Test authenticated user info route
Route::middleware('auth')->get('/test-auth', function () {
    return response()->json([
        'user' => Auth::user(),
        'id' => Auth::id(),
    ]);
});

// Include the default auth routes
require __DIR__.'/auth.php';
