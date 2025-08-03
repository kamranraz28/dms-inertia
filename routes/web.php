<?php

use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\RetailerController;
use App\Http\Controllers\DistributorController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\ReturnController;

// Public routes
Route::get('/', fn() => redirect('/login'));
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Authenticated routes
Route::middleware(['auth'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');

    // Logout
    Route::post('/logout', function () {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect('/login')->with('success', 'Logged out successfully!');
    })->name('logout');

    // Profile
    Route::get('/profile', [AuthController::class, 'profile'])->name('profile');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');

    // Product verification
    Route::get('/products/verify', [ProductController::class, 'verify'])->name('products.verify');
    Route::post('/products/verify', [ProductController::class, 'verifyCheck'])->name('products.verify.check');

    /*
    |--------------------------------------------------------------------------
    | Admin Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware(['admin'])->group(function () {
        // Role, Permission, User
        Route::resource('roles', RoleController::class);
        Route::resource('permissions', PermissionController::class);
        Route::resource('users', UserController::class);

        // Settings
        Route::get('/settings/logo', [SettingController::class, 'logoForm'])->name('settings.logo');
        Route::post('/settings/logo', [SettingController::class, 'uploadLogo'])->name('settings.logo.upload');

        Route::get('/settings/color', [SettingController::class, 'colorForm'])->name('settings.color');
        Route::post('/settings/color', [SettingController::class, 'updateColor'])->name('settings.color.upload');

        // Products
        Route::resource('products', ProductController::class);
        Route::resource('brands', BrandController::class);
        Route::resource('categories', CategoryController::class);

        // Bulk Upload
        Route::get('/bulk-upload', [UploadController::class, 'index'])->name('bulk.upload.index');
        Route::post('/bulk-upload', [UploadController::class, 'upload'])->name('bulk.upload');

        // Dealer-Retailer Mapping
        Route::get('/dealer-retailer-mapping', [UserController::class, 'dealerRetailerMapping'])->name('dealer-retailer-mapping');
        Route::get('/dealer-retailer/create', [UserController::class, 'createMapping'])->name('dealer-retailer.create');
        Route::post('/dealer-retailer/store', [UserController::class, 'storeMapping'])->name('mapping.store');

        // Return Product Admin
        Route::prefix('returns')->group(function () {
            Route::get('/list', [ReturnController::class, 'returnProductList'])->name('returns.list');
            Route::post('/{id}/approve', [ReturnController::class, 'approve'])->name('returns.approve');
            Route::post('/{id}/decline', [ReturnController::class, 'decline'])->name('returns.decline');
        });

        Route::prefix('reports')->group(function () {
            Route::get('/primary-and-secondary-dl-report', [ReportController::class, 'primaryAndSecondaryDlReport'])->name('reports.psdl');
            Route::get('/imei-life-cycle-report', [ReportController::class, 'imeiLifeCycleReport'])->name('reports.imeiLifeCycleReport');
            Route::post('/imei-life-cycle-report', [ReportController::class, 'imeiLifeCycleReportSearch'])->name('reports.imeiLifeCycleReportSearch');

        });


    });

    /*
    |--------------------------------------------------------------------------
    | Retailer Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware(['retailer'])->group(function () {
        // Stocks
        Route::get('/my-stocks', [RetailerController::class, 'myStocks'])->name('retailer.stocks');

        // Retailer IMEI check
        Route::post('/retailers/check-imei', [RetailerController::class, 'checkImei'])->name('retailers.checkImei');

        // Return Products
        Route::prefix('returns')->group(function () {
            Route::get('/request', [ReturnController::class, 'returnProductRequest'])->name('returns.request');
            Route::get('/request/create', [ReturnController::class, 'returnProductRequestCreate'])->name('returns.request.create');
            Route::post('/requests/check-imei', [ReturnController::class, 'checkRequestedImei'])->name('returns.request.checkImei');
            Route::post('/requests/store', [ReturnController::class, 'returnProductRequestsStore'])->name('returns.request.store');
        });

    });

    /*
    |--------------------------------------------------------------------------
    | Dealer (Distributor) Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware(['dealer'])->group(function () {
        // Orders
        Route::resource('orders', OrderController::class);
        Route::post('/orders/{order}/confirm', [OrderController::class, 'confirm'])->name('orders.confirm');

        // Product Receive / Sale
        Route::get('/products/receive', [DistributorController::class, 'receiveProduct'])->name('products.receive');
        Route::post('/distributor/receive-confirm', [DistributorController::class, 'confirmReceive'])->name('distributor.receive.confirm');
        Route::get('/sales/create', [DistributorController::class, 'createSale'])->name('sales.create');
        Route::post('/check-imei', [DistributorController::class, 'checkImei'])->name('check-imei');
        Route::post('/distributors/sale', [DistributorController::class, 'saleStore'])->name('distributors.sale.store');

        Route::prefix('returns')->group(function () {
            Route::get('/', [ReturnController::class, 'returnProduct'])->name('returns.index');
            Route::get('/create', [ReturnController::class, 'returnProductCreate'])->name('returns.create');
            Route::post('/check-imei', [ReturnController::class, 'checkImei'])->name('returns.checkImei');
            Route::post('/store', [ReturnController::class, 'returnProductStore'])->name('returns.store');
            Route::post('/{id}/action', [ReturnController::class, 'action'])->name('returns.action');
        });

    });

    /*
    |--------------------------------------------------------------------------
    | Accounts Middleware
    |--------------------------------------------------------------------------
    */
    Route::middleware(['accounts'])->group(function () {
        Route::get('/order-list', [OrderController::class, 'orderList'])->name('order.list');
        Route::post('/orders/{order}/approve', [OrderController::class, 'approve'])->name('orders.approve');
        Route::post('/orders/{order}/decline', [OrderController::class, 'decline'])->name('orders.decline');
    });

    /*
    |--------------------------------------------------------------------------
    | Admin or Warehouse Shared Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware(['adminOrWarehouse'])->group(function () {
        Route::resource('stocks', StockController::class);

        Route::prefix('reports')->group(function () {
            Route::get('/primary-sales-report', [ReportController::class, 'primarySalesReport'])->name('reports.primarySales');
            Route::get('/secondary-sales-report', [ReportController::class, 'secondarySalesReport'])->name('reports.secondarySales');
            Route::get('/tertiary-sales-report', [ReportController::class, 'tertiarySalesReport'])->name('reports.tertiarySales');
            Route::get('/dealer-imei-stock-report', [ReportController::class, 'dealerImeiStockReport'])->name('reports.dealerImeiStock');
            Route::get('/retailer-imei-stock-report', [ReportController::class, 'retailerImeiStockReport'])->name('reports.retailerImeiStock');

        });
    });

    /*
    |--------------------------------------------------------------------------
    | Warehouse Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware(['warehouse'])->group(function () {
        Route::get('/stockout', [WarehouseController::class, 'stockout'])->name('stockout.index');
        Route::get('/stock/out/{detail}', [WarehouseController::class, 'stockupload'])->name('stockout.upload');
        Route::get('/stock/check-imei', [WarehouseController::class, 'checkImei'])->name('stock.check-imei');
        Route::post('/stock/out/upload/{detail}', [WarehouseController::class, 'store'])->name('stockout.upload.store');
        Route::get('/stock/view/{detail}', [WarehouseController::class, 'viewUploadedImeis'])->name('stockout.view');
        Route::get('/stockout/confirm-delivery/{detail}', [WarehouseController::class, 'confirmDelivery'])->name('stockout.confirmDelivery');
    });

    /*
    |--------------------------------------------------------------------------
    | Tertiary Sales (Retailer)
    |--------------------------------------------------------------------------
    */
    Route::get('/tertiary-sales', [RetailerController::class, 'tertiarySales'])->name('tertiary.sales.index');
    Route::post('/tertiary-sales', [RetailerController::class, 'storeTertiarySales'])->name('tertiary.sales.store');

    Route::get('/check-warranty', [ProductController::class, 'checkWarranty'])->name('warranty.check');
    Route::post('/check-warranty', [ProductController::class, 'verifyWarranty'])->name('warranty.verify');


});

// Debug/Test route
Route::middleware('auth')->get('/test-auth', function () {
    return response()->json([
        'user' => Auth::user(),
        'id' => Auth::id(),
    ]);
});

// Laravel Breeze/Fortify/etc.
require __DIR__ . '/auth.php';
