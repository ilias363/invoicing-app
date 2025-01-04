<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('invoice_product', function (Blueprint $table) {
            $table->foreignId('invoice_id')->references("invoice_id")->on('invoices')->onDelete('cascade');
            $table->foreignId('product_id')->references("product_id")->on('products')->onDelete('cascade');
            $table->integer('quantity');
            $table->primary(['invoice_id', 'product_id']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('invoice_product');
    }
};

