<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Clear cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ---- ALL PERMISSIONS LIST (from your data) ----
        $permissions = [
            'view_stocks',
            'system_settings',
            'user_configuration',
            'system_configuration',
            'bulk_upload_admin',
            'warranty_activation',
            'dashboard_user_data',
            'dashboard_brand_data',
            'dashboard_category_data',
            'dashboard_product_data',
            'dashboard_order_data',
            'dashboard_primary_sales',
            'dashboard_secondary_sales',
            'dashboard_tertiary_sales',
            'dashboard_total_stock',
            'dashboard_available_stock',
            'dashboard_sales_overview',
            'dashboard_distribution_ratio',
            'admin_return_product',
            'dashboard_total_return',
            'admin_reports',

            'retailer_stocks',
            'dashboard_retailer_purchase',
            'dashboard_retailer_stock',
            'retailer_return_product',

            'view_orders',
            'receive_products',
            'sale_product',
            'dashboard_dealer_stock',
            'dashboard_dealer_purchase',
            'dealer_return_product',

            'stock_out',

            'view_orders_acc',
        ];

        foreach ($permissions as $p) {
            Permission::firstOrCreate(['name' => $p]);
        }

        // ---- ROLES ----
        $roles = [
            'Admin',
            'Retailer',
            'Dealer',
            'Warehouse',
            'Accounts',
        ];

        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        // ---- PERMISSION ASSIGNMENTS ----

        // ADMIN
        Role::findByName('Admin')->syncPermissions([
            'view_stocks',
            'system_settings',
            'user_configuration',
            'system_configuration',
            'bulk_upload_admin',
            'warranty_activation',
            'dashboard_user_data',
            'dashboard_brand_data',
            'dashboard_category_data',
            'dashboard_product_data',
            'dashboard_order_data',
            'dashboard_primary_sales',
            'dashboard_secondary_sales',
            'dashboard_tertiary_sales',
            'dashboard_total_stock',
            'dashboard_available_stock',
            'dashboard_sales_overview',
            'dashboard_distribution_ratio',
            'admin_return_product',
            'dashboard_total_return',
            'admin_reports',
        ]);

        // RETAILER
        Role::findByName('Retailer')->syncPermissions([
            'retailer_stocks',
            'warranty_activation',
            'dashboard_tertiary_sales',
            'dashboard_retailer_stock',
            'dashboard_retailer_purchase',
            'retailer_return_product',
        ]);

        // DEALER
        Role::findByName('Dealer')->syncPermissions([
            'view_orders',
            'receive_products',
            'sale_product',
            'warranty_activation',
            'dashboard_brand_data',
            'dashboard_category_data',
            'dashboard_product_data',
            'dashboard_order_data',
            'dashboard_secondary_sales',
            'dashboard_tertiary_sales',
            'dashboard_dealer_stock',
            'dashboard_dealer_purchase',
            'dealer_return_product',
        ]);

        // WAREHOUSE
        Role::findByName('Warehouse')->syncPermissions([
            'stock_out',
            'view_stocks',
            'warranty_activation',
            'dashboard_user_data',
            'dashboard_brand_data',
            'dashboard_category_data',
            'dashboard_product_data',
            'dashboard_order_data',
            'dashboard_primary_sales',
            'dashboard_secondary_sales',
            'dashboard_tertiary_sales',
            'dashboard_total_stock',
            'dashboard_available_stock',
            'dashboard_sales_overview',
            'dashboard_distribution_ratio',
            'dashboard_total_return',
        ]);

        // ACCOUNTS
        Role::findByName('Accounts')->syncPermissions([
            'view_orders_acc',
            'warranty_activation',
            'dashboard_user_data',
            'dashboard_brand_data',
            'dashboard_category_data',
            'dashboard_product_data',
            'dashboard_order_data',
            'dashboard_primary_sales',
            'dashboard_secondary_sales',
            'dashboard_tertiary_sales',
            'dashboard_total_stock',
            'dashboard_available_stock',
            'dashboard_sales_overview',
            'dashboard_distribution_ratio',
            'dashboard_total_return',
        ]);

        // Refresh permission cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
