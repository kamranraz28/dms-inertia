<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Cat;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Example: Ensure I have these categories and brands
        $cat = Cat::firstOrCreate(['name' => 'Smart Phone']);
        $brand = Brand::firstOrCreate(['name' => 'Nokia']);

        Product::firstOrCreate(
            [
                'product_code' => 'DMSP01',
            ],
            [
                'cat_id' => $cat->id,
                'brand_id' => $brand->id,
                'name' => 'NOKIA 105 TA-1570 DS',
                'model' => 'NOKIA 105 TA-1570 DS_Charcoal',
                'color' => 'Charcoal',
                'dp' => 2280.00,
            ],
        );
        // Add more products as I needed

    }
}
