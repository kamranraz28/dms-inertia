<?php

namespace Database\Seeders;

use App\Models\Cat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $categoris = [
            'Smart Phone',
            'Feature Phone',
        ];

        foreach($categoris as $category){
            Cat::firstOrCreate([
                'name' => $category,
            ]);
        }
    }
}
