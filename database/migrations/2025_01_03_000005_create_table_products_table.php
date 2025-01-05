<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->string('name', 50);
            $table->text('description')->nullable();
            $table->double('price');
            $table->double('discount')->min(0)->max(100)->default(0);
            $table->integer('stock_quantity');
            $table->enum('category', [
                'Categorie 1',
                'Categorie 2',
                'Categorie 3',
                'Categorie 4',
                'Categorie 5',
            ])->nullable();
            $table->boolean('is_deleted')->default(true);
        });
    }

    public function down(): void {
        Schema::dropIfExists('products');
    }
};

