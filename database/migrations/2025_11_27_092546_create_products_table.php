<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            $table->foreignId('cat_id')
                ->constrained('cats')
                ->onDelete('cascade');

            $table->foreignId('brand_id')
                ->constrained('brands')
                ->onDelete('cascade');

            $table->string('name')->index();
            $table->string('model')->index();
            $table->string('product_code')->index();
            $table->string('color')->nullable();
            $table->decimal('dp',10,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
