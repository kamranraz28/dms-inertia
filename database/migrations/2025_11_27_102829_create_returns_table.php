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
        Schema::create('returns', function (Blueprint $table) {
            $table->id();

            $table->foreignId('dealer_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('retailer_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('stock_id')
                ->constrained('stocks')
                ->onDelete('cascade');

            $table->tinyInteger('type');
            $table->tinyInteger('status')->default(0);

            $table->foreignId('approve_by')
                ->nullable()
                ->constrained('users')
                ->onDelete('cascade');

            $table->string('remarks')->nullable();

            $table->tinyInteger('status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('returns');
    }
};
