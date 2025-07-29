<?php

namespace App\Http\Controllers;

use App\Models\Prisale;
use App\Models\Product;
use App\Models\Retailer;
use Spatie\Permission\Models\Role;
use App\Models\Secsale;
use App\Models\Stock;
use App\Models\Tersale;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UploadController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('BulkUpload');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt',
            'type' => 'required|string|in:stock,prisale,secsale,tersal,retailer,dealer,mapping',
        ]);

        $path = $request->file('csv_file')->getRealPath();
        $rows = array_map('str_getcsv', file($path));
        $csv_data = array_slice($rows, 1); // Skip header row

        switch ($request->type) {
            case 'stock':
                // Preload all product models
                $models = array_column($csv_data, 0);
                $products = Product::whereIn('model', $models)->get()->keyBy('model');

                foreach ($csv_data as $index => $row) {
                    $rowNumber = $index + 2;
                    $model = $row[0];
                    $product = $products->get($model);

                    if (!$product) {
                        return redirect()->back()->withErrors([
                            'csv_file' => "No product found for model: $model at row $rowNumber"
                        ]);
                    }

                    Stock::create([
                        'product_id' => $product->id,
                        'imei1' => $row[1],
                        'imei2' => $row[2],
                        'warranty' => $row[3] ?? null,
                    ]);
                }
                break;

            case 'prisale':
                // Preload office IDs and IMEIs
                $officeIds = array_column($csv_data, 0);
                $imeis = array_column($csv_data, 1);

                $users = User::whereIn('office_id', $officeIds)->get()->keyBy('office_id');

                $stocks = Stock::whereIn('imei1', $imeis)
                    ->orWhereIn('imei2', $imeis)
                    ->where('status', 0)
                    ->get();

                // Map IMEI to stock instance
                $imeiToStock = [];
                foreach ($stocks as $stock) {
                    if ($stock->imei1)
                        $imeiToStock[$stock->imei1] = $stock;
                    if ($stock->imei2)
                        $imeiToStock[$stock->imei2] = $stock;
                }

                foreach ($csv_data as $index => $row) {
                    $rowNumber = $index + 2;
                    $officeId = $row[0];
                    $imei = $row[1];

                    $user = $users->get($officeId);
                    if (!$user) {
                        return redirect()->back()->withErrors([
                            'csv_file' => "No user found for office ID: $officeId at row $rowNumber"
                        ]);
                    }

                    $stock = $imeiToStock[$imei] ?? null;
                    if (!$stock) {
                        return redirect()->back()->withErrors([
                            'csv_file' => "No stock found for IMEI: $imei at row $rowNumber"
                        ]);
                    }

                    Prisale::create([
                        'user_id' => $user->id,
                        'stock_id' => $stock->id,
                    ]);

                    $stock->update(['status' => 1]);
                }
                break;

            case 'secsale':
                $dealerIds = array_column($csv_data, 0);
                $retailerIds = array_column($csv_data, 1);
                $imeis = array_column($csv_data, 2);

                $dealers = User::whereIn('office_id', $dealerIds)->get()->keyBy('office_id');
                $retailers = User::whereIn('office_id', $retailerIds)->get()->keyBy('office_id');

                $stocks = Stock::whereIn('imei1', $imeis)
                    ->orWhereIn('imei2', $imeis)
                    ->get();

                // Map IMEIs to Stock instances
                $imeiToStock = [];
                foreach ($stocks as $stock) {
                    if ($stock->imei1)
                        $imeiToStock[$stock->imei1] = $stock;
                    if ($stock->imei2)
                        $imeiToStock[$stock->imei2] = $stock;
                }

                foreach ($csv_data as $index => $row) {
                    $rowNumber = $index + 3;
                    $dealerId = $row[0];
                    $retailerId = $row[1];
                    $imei = $row[2];

                    $dealer = $dealers->get($dealerId);
                    if (!$dealer) {
                        return redirect()->back()->withErrors([
                            'csv_file' => "No user found for office ID: $dealerId at row $rowNumber"
                        ]);
                    }

                    $retailer = $retailers->get($retailerId);
                    if (!$retailer) {
                        return redirect()->back()->withErrors([
                            'csv_file' => "No user found for office ID: $retailerId at row $rowNumber"
                        ]);
                    }

                    $stock = $imeiToStock[$imei] ?? null;
                    if (!$stock) {
                        return redirect()->back()->withErrors([
                            'csv_file' => "No stock found for IMEI: $imei at row $rowNumber"
                        ]);
                    }

                    Secsale::create([
                        'dealer_id' => $dealer->id,
                        'retailer_id' => $retailer->id,
                        'stock_id' => $stock->id,
                    ]);

                    $stock->update(['status' => 2]);
                }
                break;

            case 'tersale':
                $imeis = array_column($csv_data, 0);

                $stocks = Stock::whereIn('imei1', $imeis)
                    ->orWhereIn('imei2', $imeis)
                    ->get();

                // Map IMEIs to Stock instances
                $imeiToStock = [];
                foreach ($stocks as $stock) {
                    if ($stock->imei1)
                        $imeiToStock[$stock->imei1] = $stock;
                    if ($stock->imei2)
                        $imeiToStock[$stock->imei2] = $stock;
                }

                foreach ($csv_data as $index => $row) {
                    $rowNumber = $index + 2;
                    $imei = $row[0];
                    $name = $row[1] ?? null;
                    $phone = $row[2] ?? null;
                    $address = $row[3] ?? null;
                    $remarks = $row[4] ?? null;

                    $stock = $imeiToStock[$imei] ?? null;

                    if (!$stock) {
                        return redirect()->back()->withErrors([
                            'csv_file' => "No stock found for IMEI: $imei at row $rowNumber"
                        ]);
                    }

                    Tersale::create([
                        'user_id' => auth()->id(),
                        'stock_id' => $stock->id,
                        'name' => $name,
                        'phone' => $phone,
                        'address' => $address,
                        'remarks' => $remarks,
                    ]);

                    $stock->update(['status' => 3]);
                }
                break;

            case 'retailer':
                $retailerRole = Role::where('name', 'Retailer')->first();
                if (!$retailerRole) {
                    return redirect()->back()->withErrors(['csv_file' => 'Retailer role not found in system.']);
                }

                foreach ($csv_data as $index => $row) {
                    $officeId = $row[0];
                    $name = $row[1];
                    $phone = $row[2];
                    $email = $row[3];

                    // Check if office_id already exists
                    if (User::where('office_id', $officeId)->exists()) {
                        return redirect()->back()->withErrors([
                            'csv_file' => "User with office ID $officeId already exists."
                        ]);
                    }

                    $user = User::create([
                        'name' => $name,
                        'office_id' => $officeId,
                        'phone' => $phone,
                        'email' => $email,
                        'password' => Hash::make(12345678),
                    ]);

                    $user->assignRole($retailerRole);
                }
                break;

            case 'dealer':
                $dealerRole = Role::where('name', 'Dealer')->first();
                if (!$dealerRole) {
                    return redirect()->back()->withErrors(['csv_file' => 'Dealer role not found in system.']);
                }

                foreach ($csv_data as $index => $row) {
                    $rowNumber = $index + 2;
                    $officeId = $row[0];
                    $name = $row[1];
                    $phone = $row[2];
                    $email = $row[3];

                    // Check if office_id already exists
                    if (User::where('office_id', $officeId)->exists()) {
                        return redirect()->back()->withErrors([
                            'csv_file' => "User with office ID $officeId already exists."
                        ]);
                    }

                    $user = User::create([
                        'name' => $name,
                        'office_id' => $officeId,
                        'phone' => $phone,
                        'email' => $email,
                        'password' => Hash::make(12345678),
                    ]);

                    $user->assignRole($dealerRole);
                }
                break;

            case 'mapping':
                $dealerIds = array_column($csv_data, 0);
                $retailerIds = array_column($csv_data, 1);

                $dealers = User::whereIn('office_id', $dealerIds)->get()->keyBy('office_id');
                $retailers = User::whereIn('office_id', $retailerIds)->get()->keyBy('office_id');

                foreach ($csv_data as $index => $row) {
                    $rowNumber = $index + 1;
                    $dealerId = $row[0];
                    $retailerId = $row[1];

                    $dealer = $dealers->get($dealerId);
                    if (!$dealer) {
                        return redirect()->back()->withErrors([
                            'csv_file' => "No user found for office ID: $dealerId at row $rowNumber"
                        ]);
                    }

                    $retailer = $retailers->get($retailerId);
                    if (!$retailer) {
                        return redirect()->back()->withErrors([
                            'csv_file' => "No user found for office ID: $retailerId at row $rowNumber"
                        ]);
                    }

                    Retailer::create([
                        'dealer_id' => $dealer->id,
                        'retailer_id' => $retailer->id,
                    ]);
                }
                break;

        }

        return redirect()->back()->with('success', 'CSV uploaded and processed successfully.');
    }

}
