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
        Schema::create('retailers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('dealer_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('retailer_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->timestamps();

            // unique constraint to avoid duplicate dealer-retailer pairs
            $table->unique(['dealer_id', 'retailer_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('retailers');
    }
};
