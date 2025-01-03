<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('invoice', function (Blueprint $table) {
            $table->id('invoice_id');
            $table->date('invoice_date');
            $table->double('total_amount');
            $table->string('status', 50)->nullable();
            $table->string('payment_status', 50)->nullable();
            $table->text('notes')->nullable();
            $table->date('due_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('payment_method', 50)->nullable();
            $table->double('tax')->nullable();
            $table->foreignId('customer_id')->references('customer_id')->on('customer')->onDelete('cascade');
            $table->foreignId('doc_style_id')->references('doc_style_id')->on('doc_style')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('invoice');
    }
};

