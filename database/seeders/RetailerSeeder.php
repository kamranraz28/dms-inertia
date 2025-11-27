<?php

namespace Database\Seeders;

use App\Models\Retailer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RetailerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Retailer::updateOrCreate([
            'dealer_id' => 3,
            'retailer_id' => 2,
        ]);

        //Add more pair here similarly
    }
}
