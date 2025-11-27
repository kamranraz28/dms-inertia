<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Example Roles
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $retailerRole = Role::firstOrCreate(['name' => 'Retailer']);
        $dealerRole = Role::firstOrCreate(['name' => 'Dealer']);
        $warehouseRole = Role::firstOrCreate(['name' => 'Warehouse']);
        $accountsRole = Role::firstOrCreate(['name' => 'Accounts']);

        //Create an admin user
        $admin = User::firstOrCreate(
            [
                'email' => 'admin@gmail.com'
            ],
            [
                'name' => 'Kamran',
                'photo' => null,
                'office_id' => 'DMSAD01',
                'phone' => '01609758377',
                'password' => Hash::make('12345678'),
            ]
        );

        // Assign role using Spatie
        $admin->assignRole($adminRole);

        //Create a retailer user
        $retailer = User::firstOrCreate(
            [
                'email' => 'retailer@gmail.com'
            ],
            [
                'name' => 'Retailer',
                'photo' => null,
                'office_id' => 'DMSRT01',
                'phone' => '01609758378',
                'password' => Hash::make('12345678'),
            ]
        );

        // Assign role using Spatie
        $retailer->assignRole($retailerRole);

        //Create a dealer user
        $dealer = User::firstOrCreate(
            [
                'email' => 'dealer@gmail.com'
            ],
            [
                'name' => 'Dealer',
                'photo' => null,
                'office_id' => 'DMSLD01',
                'phone' => '01609758379',
                'password' => Hash::make('12345678'),
            ]
        );

        // Assign role using Spatie
        $dealer->assignRole($dealerRole);

        //Create a warehouse user
        $warehouse = User::firstOrCreate(
            [
                'email' => 'warehouse@gmail.com'
            ],
            [
                'name' => 'Warehouse',
                'photo' => null,
                'office_id' => 'DMSWH01',
                'phone' => '01609758380',
                'password' => Hash::make('12345678'),
            ]
        );

        // Assign role using Spatie
        $warehouse->assignRole($warehouseRole);

        //Create an accounts user
        $accounts = User::firstOrCreate(
            [
                'email' => 'accounts@gmail.com'
            ],
            [
                'name' => 'Accounts',
                'photo' => null,
                'office_id' => 'DMSAC01',
                'phone' => '01609758381',
                'password' => Hash::make('12345678'),
            ]
        );

        // Assign role using Spatie
        $accounts->assignRole($accountsRole);

    }
}
