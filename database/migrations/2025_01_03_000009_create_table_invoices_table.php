<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id('invoice_id');
            $table->date('invoice_date');
            $table->double('total_amount');
            $table->enum('status', ['draft', 'issued', 'paid', 'cancelled'])->nullable();
            $table->enum('payment_status', ['pending', 'completed', 'failed'])->nullable();
            $table->text('notes')->nullable();
            $table->date('due_date')->nullable();
            $table->boolean('is_deleted')->default(false);
            $table->enum('payment_method', ['Credit Card', 'Bank Transfer', 'Cash'])->nullable();
            $table->double('tax')->nullable();
            $table->foreignId('customer_id')->references('customer_id')->on('customers')->onDelete('cascade');
            $table->foreignId('doc_style_id')->references('doc_style_id')->on('doc_styles')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('invoices');
    }
};

